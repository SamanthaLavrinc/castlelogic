import { spawn } from "node:child_process";
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const DIST_DIR = path.resolve("dist");
const CASE_STUDIES_DIR = path.resolve("src/content/case-studies");

function getCaseStudySlugs() {
  return readdirSync(CASE_STUDIES_DIR)
    .filter((file) => file.endsWith(".json") && !file.startsWith("_"))
    .map((file) => JSON.parse(readFileSync(path.join(CASE_STUDIES_DIR, file), "utf-8")).slug);
}

const routes = [
  "/",
  "/home",
  "/projects",
  "/about",
  "/resume",
  "/contact",
  ...getCaseStudySlugs().map((slug) => `/projects/${slug}`),
];

function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        // server not up yet, keep polling
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error("Preview server did not start in time"));
      }
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

async function main() {
  console.log("Starting preview server...");
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "pipe",
  });

  try {
    await waitForServer(BASE_URL);

    console.log("Launching headless browser...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Render every route first and hold the HTML in memory. The dev/preview
    // server's SPA fallback always serves whatever is currently on disk at
    // dist/index.html for unmatched paths — writing a route's snapshot to
    // disk mid-loop would poison that fallback for every route crawled
    // afterward, compounding each Helmet-rendered <head> onto the next.
    const snapshots = [];
    for (const route of routes) {
      console.log(`Prerendering ${route}`);
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle0" });
      await page.waitForFunction(
        () => document.getElementById("root")?.childElementCount > 0,
        { timeout: 10000 }
      );

      snapshots.push({ route, html: await page.content() });
    }

    await browser.close();

    for (const { route, html } of snapshots) {
      const outDir = route === "/" ? DIST_DIR : path.join(DIST_DIR, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, "index.html"), html);
    }

    console.log(`Prerendered ${routes.length} routes.`);
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
