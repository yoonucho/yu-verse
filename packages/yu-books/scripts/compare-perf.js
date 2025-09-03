/*
 Compare two perf logs produced by scripts/run-perf.js
 Usage:
   pnpm --filter yu-books perf:compare -- path/to/logA.json path/to/logB.json
 Output:
   Prints comparison and writes a markdown summary alongside the newer log.
*/

const fs = require('fs');
const path = require('path');

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function formatDelta(a, b) {
  if (a == null || b == null) return 'n/a';
  const d = b - a;
  const sign = d > 0 ? '+' : '';
  return `${sign}${d.toFixed(1)} ms`;
}

function main() {
  const [, , logAPath, logBPath] = process.argv;
  if (!logAPath || !logBPath) {
    console.error('Usage: perf:compare -- <logA.json> <logB.json>');
    process.exit(1);
  }
  const A = readJSON(logAPath);
  const B = readJSON(logBPath);

  const idx = new Map(B.results.map((r) => [r.path, r]));
  const lines = [];
  lines.push(`# yu-books Perf Compare`);
  lines.push(`A: ${A.label} (${A.commit.slice(0, 7)})`);
  lines.push(`B: ${B.label} (${B.commit.slice(0, 7)})`);
  lines.push('');
  lines.push(`| Path | TTFB (A→B) | FCP (A→B) | LCP (A→B) | DCL (A→B) | Load (A→B) |`);
  lines.push(`| ---- | ----------:| ---------:| ---------:| ---------:| ---------:|`);
  for (const a of A.results) {
    const b = idx.get(a.path);
    if (!b) continue;
    const row = [
      a.path,
      `${(a.metrics.ttfb ?? NaN).toFixed?.(1) ?? 'n/a'} → ${(b.metrics.ttfb ?? NaN).toFixed?.(1) ?? 'n/a'} (${formatDelta(a.metrics.ttfb, b.metrics.ttfb)})`,
      `${(a.metrics.fcp ?? NaN).toFixed?.(1) ?? 'n/a'} → ${(b.metrics.fcp ?? NaN).toFixed?.(1) ?? 'n/a'} (${formatDelta(a.metrics.fcp, b.metrics.fcp)})`,
      `${(a.metrics.lcp ?? NaN).toFixed?.(1) ?? 'n/a'} → ${(b.metrics.lcp ?? NaN).toFixed?.(1) ?? 'n/a'} (${formatDelta(a.metrics.lcp, b.metrics.lcp)})`,
      `${(a.metrics.domContentLoaded ?? NaN).toFixed?.(1) ?? 'n/a'} → ${(b.metrics.domContentLoaded ?? NaN).toFixed?.(1) ?? 'n/a'} (${formatDelta(a.metrics.domContentLoaded, b.metrics.domContentLoaded)})`,
      `${(a.metrics.loadEvent ?? NaN).toFixed?.(1) ?? 'n/a'} → ${(b.metrics.loadEvent ?? NaN).toFixed?.(1) ?? 'n/a'} (${formatDelta(a.metrics.loadEvent, b.metrics.loadEvent)})`,
    ];
    lines.push(`| ${row.join(' | ')} |`);
  }

  const outDir = path.join(path.dirname(logBPath));
  const mdPath = path.join(outDir, `compare-${A.label}-vs-${B.label}.md`);
  fs.writeFileSync(mdPath, lines.join('\n'));
  console.log(lines.join('\n'));
  console.log(`\nMarkdown report written: ${mdPath}`);
}

main();

