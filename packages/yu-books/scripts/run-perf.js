/*
 Simple performance runner for yu-books using Playwright.
 Usage:
   pnpm --filter yu-books perf:dev -- --baseURL=http://127.0.0.1:3000 --paths=/book-list,/book-list?query=react --label=feature/yoonu
 Requires local dev server running at baseURL.
*/

// Use @playwright/test to ensure availability in monorepo
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (const a of args) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

async function measureOnce(browser, baseURL, urlPath) {
  const context = await browser.newContext({ javaScriptEnabled: true, bypassCSP: true });
  const page = await context.newPage();

  await page.addInitScript(() => {
    window.__lcp = null;
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const last = entries[entries.length - 1];
        if (last) window.__lcp = last.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
  });

  const full = baseURL.replace(/\/$/, '') + urlPath;
  const resp = await page.goto(full, { waitUntil: 'load' });
  // Give time for LCP observer to flush
  await page.waitForTimeout(200);

  const nav = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || null;
    const lcp = window.__lcp || null;
    return {
      type: nav?.type,
      startTime: nav?.startTime ?? 0,
      duration: nav?.duration ?? 0,
      redirectCount: nav?.redirectCount ?? 0,
      // Core metrics
      ttfb: nav ? nav.responseStart - nav.requestStart : null,
      domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : null,
      loadEvent: nav ? nav.loadEventEnd - nav.startTime : null,
      fcp,
      lcp,
    };
  });

  await context.close();

  return {
    path: urlPath,
    metrics: nav,
    status: resp ? resp.status() : null,
  };
}

async function main() {
  const args = parseArgs();
  const baseURL = args.baseURL || 'http://127.0.0.1:3000';
  const paths = (args.paths ? args.paths.split(',') : ['/book-list']).map((p) => (p.startsWith('/') ? p : '/' + p));
  const label = args.label || execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  const commit = execSync('git rev-parse HEAD').toString().trim();

  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const p of paths) {
    const r = await measureOnce(browser, baseURL, p);
    results.push(r);
  }
  await browser.close();

  const outDir = path.join(__dirname, '..', 'perf-logs');
  fs.mkdirSync(outDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const outPath = path.join(outDir, `${label}-${ts}.json`);

  const payload = {
    app: 'yu-books',
    label,
    commit,
    baseURL,
    paths,
    results,
    meta: {
      node: process.version,
      playwright: require('@playwright/test/package.json').version,
      when: new Date().toISOString(),
    },
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
  console.log(`perf log written: ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
