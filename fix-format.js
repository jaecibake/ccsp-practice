// fix-format.js — convert agent-generated files with wrong format to correct format
const fs = require('fs');
const vm = require('vm');
const LETTERS = ['A','B','C','D'];

function fixFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');

  // Step 1: Convert correct:"B" or correct:'B' -> correct:1
  src = src.replace(/correct:\s*["']([A-D])["']/g, (m, l) => 'correct:' + 'ABCD'.indexOf(l));

  // Step 2: Add option prefixes where missing using vm to load, fix, re-serialize
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(src, sandbox);
  } catch(e) {
    console.error('VM error in', filePath, e.message.slice(0, 80));
    // Write back what we have (at least correct: is fixed)
    fs.writeFileSync(filePath, src, 'utf8');
    return;
  }

  const key = Object.keys(sandbox.window).find(k => /^QUESTIONS_/.test(k));
  if (!key) {
    // Try to find variable directly
    const match = src.match(/const\s+(QUESTIONS_\w+)\s*=/);
    if (!match) { console.log('No var found in', filePath); return; }
    console.log('No window export found, skipping prefix fix for', filePath);
    fs.writeFileSync(filePath, src, 'utf8');
    return;
  }

  const questions = sandbox.window[key];
  if (!Array.isArray(questions)) { console.log('Not array in', filePath); return; }

  // Fix option prefixes
  const fixed = questions.map(q => {
    const opts = q.options.map((o, i) => {
      if (/^[A-D]\s/.test(o)) return o; // already prefixed
      return LETTERS[i] + ' ' + o;
    });
    return { ...q, options: opts };
  });

  // Re-serialize
  const lines = fixed.map(q => {
    const opts = q.options.map(o => JSON.stringify(o)).join(',');
    return `  { id:${q.id}, domain:${q.domain}, level:${q.level}, question:${JSON.stringify(q.question)}, options:[${opts}], correct:${q.correct}, explanation:${JSON.stringify(q.explanation)} }`;
  });
  const content = `const ${key} = [\n${lines.join(',\n')}\n];\nif (typeof window !== 'undefined') window.${key} = ${key};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed', filePath, '—', fixed.length, 'questions');
}

['js/q_cism_c4.js', 'js/q_cism_c5.js'].forEach(f => fixFile('C:\\Temp\\Test Project\\' + f));
