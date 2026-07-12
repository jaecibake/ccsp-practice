// Usage: node scripts_merge_glossary.mjs <certCode>
// Merges js/glossary_<cert>_ext.js (GLOSSARY_<CERT>_EXT) into the main glossary
// file (deduped by term, case-insensitive), rewrites it sorted, deletes the ext.
import fs from "fs";
import vm from "vm";

const cert = (process.argv[2] || "").toLowerCase();
if (!cert) { console.error("cert code required"); process.exit(1); }
const UP = cert.toUpperCase();
const mainFile = cert === "ccsp" ? "js/glossary.js" : `js/glossary_${cert}.js`;
const extFile = `js/glossary_${cert}_ext.js`;

function loadGlobal(file, name) {
  if (!fs.existsSync(file)) return null;
  const sb = { window: {}, console }; sb.globalThis = sb;
  vm.runInNewContext(fs.readFileSync(file, "utf8") + `\n;globalThis.__O=(typeof ${name}!=='undefined'?${name}:null);`, sb);
  return sb.__O;
}

const ext = loadGlobal(extFile, `GLOSSARY_${UP}_EXT`);
if (!ext || !Array.isArray(ext)) { console.error(`no ext array in ${extFile}`); process.exit(2); }
const cur = loadGlobal(mainFile, `GLOSSARY_${UP}`) || [];
const have = new Set(cur.map((x) => x.term.trim().toLowerCase()));
const add = [];
for (const x of ext) {
  const term = x?.term?.trim();
  const def = (x?.definition ?? x?.def ?? "").trim();
  if (!term || !def) continue;
  const k = term.toLowerCase();
  if (have.has(k)) continue;
  have.add(k); add.push({ term, definition: def });
}
const all = cur.map((x) => ({ term: x.term, definition: x.definition ?? x.def ?? "" })).concat(add);
const lines = all.map((x) => `  { term:${JSON.stringify(x.term)}, definition:${JSON.stringify(x.definition)} }`);
fs.writeFileSync(mainFile, `const GLOSSARY_${UP} = [\n${lines.join(",\n")}\n];\nGLOSSARY_${UP}.sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));\n`);
fs.unlinkSync(extFile);
console.log(`${cert}: +${add.length} new (total ${all.length})`);
