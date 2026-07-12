// Usage: node scripts_merge_acronyms.mjs <certCode>
// Merges js/acronyms_<cert>_ext.js (ACRONYMS_<CERT>_EXT) into the main acronyms
// file (deduped by abbr, case-insensitive), rewrites it sorted, deletes the ext.
import fs from "fs";
import vm from "vm";

const cert = (process.argv[2] || "").toLowerCase();
if (!cert) { console.error("cert code required"); process.exit(1); }
const UP = cert.toUpperCase();
const mainFile = cert === "ccsp" ? "js/acronyms.js" : `js/acronyms_${cert}.js`;
const extFile = `js/acronyms_${cert}_ext.js`;

function loadGlobal(file, name) {
  if (!fs.existsSync(file)) return null;
  const sb = { window: {}, console }; sb.globalThis = sb;
  vm.runInNewContext(fs.readFileSync(file, "utf8") + `\n;globalThis.__O=(typeof ${name}!=='undefined'?${name}:null);`, sb);
  return sb.__O;
}

const norm = (x) => ({ abbr: (x?.abbr ?? x?.term ?? "").trim(), full: (x?.full ?? x?.definition ?? x?.def ?? "").trim() });
const ext = loadGlobal(extFile, `ACRONYMS_${UP}_EXT`);
if (!ext || !Array.isArray(ext)) { console.error(`no ext array in ${extFile}`); process.exit(2); }
const cur = (loadGlobal(mainFile, `ACRONYMS_${UP}`) || []).map(norm);
const have = new Set(cur.map((x) => x.abbr.toLowerCase()));
const add = [];
for (const raw of ext) {
  const x = norm(raw);
  if (!x.abbr || !x.full) continue;
  const k = x.abbr.toLowerCase();
  if (have.has(k)) continue;
  have.add(k); add.push(x);
}
const all = cur.concat(add);
const lines = all.map((x) => `  { abbr:${JSON.stringify(x.abbr)}, full:${JSON.stringify(x.full)} }`);
fs.writeFileSync(mainFile, `const ACRONYMS_${UP} = [\n${lines.join(",\n")}\n];\nACRONYMS_${UP}.sort((a, b) => a.abbr.localeCompare(b.abbr, undefined, { sensitivity: 'base' }));\n`);
fs.unlinkSync(extFile);
console.log(`${cert}: +${add.length} new (total ${all.length})`);
