/**
 * Export .excalidraw files to SVG using Playwright + @excalidraw/excalidraw.
 *
 * Usage: node scripts/export-excalidraw-svg.mjs
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const EXCALIDRAW_DIR = join(ROOT, "assets", "excalidraw");

async function main() {
  // Find all .excalidraw files
  const files = readdirSync(EXCALIDRAW_DIR)
    .filter((f) => f.endsWith(".excalidraw"))
    .sort();

  console.log(`Found ${files.length} Excalidraw files to export.\n`);

  // Read the esbuild bundle
  const bundlePath = join(__dirname, "_browser-export-bundle.mjs");
  const bundleCode = readFileSync(bundlePath, "utf-8");

  // Launch browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on("console", (msg) => {
    if (msg.type() === "error") console.error("  [browser]", msg.text());
  });

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script type="module">
${bundleCode}
</script>
</body>
</html>`;

  await page.setContent(html, { waitUntil: "networkidle" });
  await page.waitForFunction("window._exportReady === true", {
    timeout: 30000,
  });
  console.log("Library loaded. Exporting SVGs...\n");

  let successCount = 0;
  for (const file of files) {
    const name = file.replace(".excalidraw", "");
    process.stdout.write(`  Exporting: ${name}...`);
    try {
      const filePath = join(EXCALIDRAW_DIR, file);
      const data = JSON.parse(readFileSync(filePath, "utf-8"));

      const svgHtml = await page.evaluate(
        async ({ elements, appState, files }) => {
          return await window._exportSvg(elements, appState, files);
        },
        { elements: data.elements, appState: data.appState, files: data.files }
      );

      const outPath = join(EXCALIDRAW_DIR, `${name}.svg`);
      writeFileSync(outPath, svgHtml);
      console.log(" OK");
      successCount++;
    } catch (err) {
      console.log(` FAILED: ${err.message}`);
    }
  }

  console.log(`\nDone: ${successCount}/${files.length} SVGs exported.`);
  console.log(`Output: assets/excalidraw/`);

  await browser.close();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
