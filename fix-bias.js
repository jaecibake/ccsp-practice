// fix-bias.js — redistributes correct answers evenly (0,1,2,3) in existing chunk files
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const LETTERS = ['A', 'B', 'C', 'D'];
const BASE = 'C:\\Temp\\Test Project';

function loadFile(rel) {
  const src = fs.readFileSync(path.join(BASE, rel), 'utf8');
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(src, sandbox);
    const key = Object.keys(sandbox.window).find(k => /^QUESTIONS_/.test(k));
    if (key && Array.isArray(sandbox.window[key]) && sandbox.window[key].length > 0)
      return { name: key, questions: sandbox.window[key] };
  } catch(e) { console.error('Load error', rel, e.message); }
  return null;
}

function moveCorrect(q, newPos) {
  if (q.correct === newPos) return q;
  const opts = [...q.options];
  const cur = q.correct;
  const strip = s => s.replace(/^[A-D]\s+/, '');
  const cContent = strip(opts[cur]);
  const sContent = strip(opts[newPos]);
  opts[cur]  = LETTERS[cur]  + ' ' + sContent;
  opts[newPos] = LETTERS[newPos] + ' ' + cContent;
  return { ...q, options: opts, correct: newPos };
}

function redistribute(questions) {
  const n = questions.length;
  const base = Math.floor(n / 4);
  const rem  = n % 4;
  // build target list
  const targets = [];
  for (let p = 0; p < 4; p++)
    for (let j = 0; j < base + (p < rem ? 1 : 0); j++)
      targets.push(p);
  // Fisher-Yates shuffle targets so distribution is random (not sequential)
  for (let i = targets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [targets[i], targets[j]] = [targets[j], targets[i]];
  }
  return questions.map((q, i) => moveCorrect(q, targets[i]));
}

function serializeQ(q) {
  const opts = q.options.map(o => JSON.stringify(o)).join(',');
  return `  { id:${q.id}, domain:${q.domain}, level:${q.level}, question:${JSON.stringify(q.question)}, options:[${opts}], correct:${q.correct}, explanation:${JSON.stringify(q.explanation)} }`;
}

function writeBack(rel, name, questions) {
  const content =
    `const ${name} = [\n` +
    questions.map(serializeQ).join(',\n') +
    `\n];\nif (typeof window !== 'undefined') window.${name} = ${name};\n`;
  fs.writeFileSync(path.join(BASE, rel), content, 'utf8');
}

const FILES = [
  'js/q_ccsp_c1.js',
  'js/q_ccsp_c2.js',
  'js/q_ccsp_c3.js',
  'js/q_ccsp_c4.js',
  'js/q_ccsp_c5.js',
  'js/q_cism_c1.js',
  'js/q_cism_c2.js',
  'js/q_cism_c3.js',
  'js/q_cism_c4.js',
  'js/q_cism_c5.js',
  'js/q_cissp_c1.js',
  'js/q_cissp_c2.js',
  'js/q_cissp_c3.js',
  'js/q_cissp_c4.js',
  'js/q_cissp_c5.js',
  'js/q_issap_c1.js',
  'js/q_issap_c2.js',
  'js/q_issap_c3.js',
  'js/q_issap_c4.js',
  'js/q_issap_c5.js',
];

FILES.forEach(rel => {
  const loaded = loadFile(rel);
  if (!loaded) { console.log(`SKIP (empty) ${rel}`); return; }
  const { name, questions } = loaded;
  const before = {};
  questions.forEach(q => before[q.correct] = (before[q.correct]||0)+1);
  const fixed = redistribute(questions);
  const after = {};
  fixed.forEach(q => after[q.correct] = (after[q.correct]||0)+1);
  writeBack(rel, name, fixed);
  console.log(`${rel}: ${questions.length}q  before=${JSON.stringify(before)}  after=${JSON.stringify(after)}`);
});
console.log('Done.');
