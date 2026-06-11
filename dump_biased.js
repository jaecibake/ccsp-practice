const fs = require('fs'), vm = require('vm');
const ids = {
  q_ccsp_c1: [1004, 1040],
  q_ccsp_c2: [1234, 1275, 1321, 1325, 1328, 1352, 1370, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380, 1389, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400],
  q_ccsp_c3: [1441, 1442, 1443, 1444, 1445, 1446, 1448, 1449, 1450, 1482, 1487, 1521, 1532, 1533, 1542, 1568, 1587, 1588, 1589, 1590],
  q_ccsp_c5: [1814, 1835, 1840, 1844, 1884, 1891, 1892, 1894, 1895, 1896, 1898, 1900, 1912, 1918, 1938, 1939, 1942, 1945, 1951, 1952, 1954, 1955, 1956, 1957, 1960, 1968, 1979]
};
const out = {};
Object.keys(ids).forEach(n => {
  const s = { window: {} };
  vm.runInNewContext(fs.readFileSync('C:/Temp/Test Project/js/' + n + '.js', 'utf8'), s, { filename: n });
  let qs = null;
  for (const k of Object.keys(s.window)) if (Array.isArray(s.window[k])) qs = s.window[k];
  if (!qs) for (const k of Object.keys(s)) if (Array.isArray(s[k])) qs = s[k];
  qs.forEach(q => { if (ids[n].includes(q.id)) out[q.id] = { file: n, c: q.correct, q: q.question, o: q.options }; });
});
fs.writeFileSync('C:/Temp/Test Project/biased_dump.json', JSON.stringify(out, null, 1));
console.log('dumped', Object.keys(out).length);
