// fix-bias.js — fix answer-length bias in js/q_ccsp_c4.js
// Mode 1 (no patch files in js/fixquestion): dump biased questions to js/fixquestion/c4_dump.txt
// Mode 2 (js/fixquestion/c4_patch*.json exist): apply patches, validate, rebuild js/q_ccsp_c4.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'js', 'q_ccsp_c4.js');
const FIXDIR = path.join(ROOT, 'js', 'fixquestion');
const KEY = 'QUESTIONS_CCSP_C4';
const LETTERS = ['A', 'B', 'C', 'D'];

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(SRC, 'utf8'), sandbox);
const qs = sandbox.window[KEY];

const patchFiles = fs.readdirSync(FIXDIR).filter(f => /^c4_patch.*\.json$/.test(f)).sort();

if (patchFiles.length === 0) {
  // DUMP MODE
  const out = [];
  let biased = 0;
  qs.forEach(q => {
    const c = q.options[q.correct].length;
    const wmax = Math.max(...q.options.filter((_, i) => i !== q.correct).map(o => o.length));
    if (c > wmax * 1.2) {
      biased++;
      const lines = q.options.map((o, i) =>
        (i === q.correct ? '*' : String(i)) + ' (' + o.length + ') ' + o);
      out.push('#' + q.id + ' correct=' + q.correct + ' clen=' + c + '\n' + lines.join('\n'));
    }
  });
  fs.writeFileSync(path.join(FIXDIR, 'c4_dump.txt'), out.join('\n\n'), 'utf8');
  console.log('total=' + qs.length + ' biased=' + biased + ' dumped to js/fixquestion/c4_dump.txt');
} else {
  // APPLY MODE
  const patch = {};
  patchFiles.forEach(f => {
    const p = JSON.parse(fs.readFileSync(path.join(FIXDIR, f), 'utf8'));
    Object.entries(p).forEach(([id, opts]) => {
      patch[id] = Object.assign(patch[id] || {}, opts);
    });
  });
  let applied = 0;
  qs.forEach(q => {
    const p = patch[String(q.id)];
    if (!p) return;
    Object.entries(p).forEach(([idx, text]) => {
      const i = Number(idx);
      if (i === q.correct) { console.log('ERROR: patch touches correct option of #' + q.id); return; }
      if (!text.startsWith(LETTERS[i] + ' ')) console.log('WARN: #' + q.id + ' opt ' + i + ' missing prefix ' + LETTERS[i]);
      q.options[i] = text;
      applied++;
    });
  });
  // Validate
  let biased = 0, longest = 0;
  const issues = [];
  qs.forEach(q => {
    const lens = q.options.map(o => o.length);
    const c = lens[q.correct];
    const w = lens.filter((_, i) => i !== q.correct);
    if (c === Math.max(...lens)) longest++;
    if (c > Math.max(...w) * 1.2) issues.push('#' + q.id + ' STILL-BIASED lens=' + lens.join(',') + ' correct=' + q.correct), biased++;
    const mn = Math.min(...lens), mx = Math.max(...lens);
    if (mx > mn * 1.45) issues.push('#' + q.id + ' WIDE-SPREAD lens=' + lens.join(',') + ' correct=' + q.correct);
  });
  // Rebuild file (one question per line)
  const lines = qs.map(q => {
    const opts = q.options.map(o => JSON.stringify(o)).join(',');
    return `  { id:${q.id}, domain:${q.domain}, level:${q.level}, question:${JSON.stringify(q.question)}, options:[${opts}], correct:${q.correct}, explanation:${JSON.stringify(q.explanation)} }`;
  });
  const content = `const ${KEY} = [\n${lines.join(',\n')}\n];\nif (typeof window !== 'undefined') window.${KEY} = ${KEY};\n`;
  fs.writeFileSync(SRC, content, 'utf8');
  fs.writeFileSync(path.join(FIXDIR, 'c4_lens.txt'),
    qs.map(q => q.id + ' c=' + q.correct + ' ' + q.options.map(o => o.length).join(',')).join('\n'), 'utf8');
  console.log('applied=' + applied + ' patched-questions=' + Object.keys(patch).length);
  console.log('total=' + qs.length + ' correctIsLongest=' + longest + ' biased20pct=' + biased);
  issues.forEach(s => console.log(s));
}
