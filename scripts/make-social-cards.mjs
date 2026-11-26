/**
 * Generate link-preview images (Open Graph / social cards) for the site.
 *
 * Usage: npm run social-cards
 *        npm run social-cards -- --list   (print each card's text, no rendering)
 *
 * Writes 1200×630 PNGs to assets/images/social/:
 *   - default.png and one card per main page (listed in PAGES below)
 *   - one card per portfolio item, named after its file (ocne2_quickstart.png),
 *     using the item's title, product, and excerpt from its front matter
 *
 * Pages point at their card with `image:` in front matter; jekyll-seo-tag
 * turns that into og:image / twitter:image. Any page without its own card
 * falls back to default.png (set in _config.yml defaults).
 *
 * Needs internet access (fonts load from Google Fonts, as on the site) and a
 * machine that can render text, such as a Mac. The script stops with an error
 * if the fonts don't load, instead of writing cards with missing text.
 * Re-run it after changing a portfolio item's title, product, or excerpt.
 */

import { chromium } from "playwright";
import { readFileSync, readdirSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PORTFOLIO_DIR = join(ROOT, "_portfolio");
const OUT_DIR = join(ROOT, "assets", "images", "social");

const SITE = "alison-holloway.com";
const NAME = "Alison Holloway";
const ROLE = "Senior Technical Writer";

// Main pages. `name` is the output file (and what the page's `image:` points to).
const PAGES = [
  {
    name: "default",
    eyebrow: ROLE,
    title: "Documentation that makes complex software make sense.",
    subtitle: "Docs-as-code, Kubernetes, enterprise Linux, and content designed so people and AI assistants can find and use it.",
  },
  {
    name: "what-i-do",
    eyebrow: "What I Do",
    title: "Technical writing for developer and platform-engineering audiences",
    subtitle: "Documentation strategy, information architecture, docs-as-code, and AI woven into how I work.",
  },
  {
    name: "portfolio",
    eyebrow: "Portfolio",
    title: "Documentation Portfolio",
    subtitle: "Technical documentation for cloud-native platforms, container technologies, and enterprise software.",
  },
  {
    name: "github",
    eyebrow: "GitHub Projects",
    title: "Building what I document",
    subtitle: "Fine-tuned LLMs, a RAG system, and developer tools I've built and documented end to end.",
  },
  {
    name: "about",
    eyebrow: "About",
    title: "About Alison",
    subtitle: "A senior technical writer based in Melbourne, Australia.",
  },
  {
    name: "contact",
    eyebrow: "Contact",
    title: "Let's Talk",
    subtitle: "Open to contract or full-time work: Melbourne hybrid, or remote across Australia and globally.",
  },
  {
    name: "how-ai-reads-docs",
    eyebrow: "Interactive Demo",
    title: "How AI Reads Your Docs",
    subtitle: "An AI assistant retrieves a few chunks that look relevant and answers from those alone. Try it.",
  },
];

/* ---------- portfolio front matter ---------- */

function frontMatter(file) {
  const text = readFileSync(file, "utf-8");
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const data = {};
  let key = null;
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      data[key] = kv[2];
    } else if (key && /^\s+\S/.test(line) && !/^\s*-/.test(line)) {
      data[key] += " " + line.trim(); // folded continuation line
    }
  }
  for (const k of Object.keys(data)) {
    data[k] = data[k].trim().replace(/^(['"])([\s\S]*)\1$/, "$2");
  }
  return data;
}

function portfolioCards() {
  return readdirSync(PORTFOLIO_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const fm = frontMatter(join(PORTFOLIO_DIR, f));
      const ai = fm.section === "ai";
      return {
        name: f.replace(/\.md$/, ""),
        eyebrow: ai ? "GitHub Project" : fm.product || "Portfolio",
        title: (fm.title || "").replace(/^Oracle Cloud Native Environment Release 2 - /, ""),
        subtitle: fm.excerpt || fm.doc_type || "",
      };
    });
}

/* ---------- card template ---------- */

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function cardHtml(card) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fraunces:opsz,wght@9..144,600&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    position: relative;
    overflow: hidden;
    background: #fdf6ee;
    font-family: 'Inter', sans-serif;
    color: #1c1008;
  }
  .bar { position: absolute; inset: 0 0 auto 0; height: 14px; background: linear-gradient(90deg, #b45309, #d97706); }

  /* Decorative stack of doc pages, echoing the site's diagrams */
  .pages { position: absolute; right: 64px; top: 92px; width: 280px; height: 360px; }
  .page {
    position: absolute; inset: 0;
    background: #fff; border: 3px solid #b45309; border-radius: 18px;
    padding: 34px 30px;
  }
  .page.back { transform: rotate(6deg) translate(26px, 10px); background: #faebd7; }
  .page .h { height: 18px; width: 62%; background: #1c1008; border-radius: 6px; margin-bottom: 26px; }
  .page .l { height: 11px; background: #e8d5c4; border-radius: 6px; margin-bottom: 15px; }
  .page .l.s { width: 72%; }
  .page .mark { display: inline-block; height: 13px; width: 58%; background: #fef3c7; box-shadow: inset 0 -3px 0 #b45309; border-radius: 3px; vertical-align: middle; }
  .page .num {
    display: inline-flex; align-items: center; justify-content: center;
    width: 26px; height: 26px; margin-left: 8px; vertical-align: middle;
    border-radius: 50%; background: #b45309; color: #fff;
    font: 700 15px 'Inter', sans-serif;
  }

  .content { position: absolute; left: 72px; top: 78px; width: 700px; height: 410px; display: flex; flex-direction: column; }
  .eyebrow {
    font-weight: 600; font-size: 24px; letter-spacing: 0.12em; text-transform: uppercase;
    color: #b45309; margin-bottom: 22px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .title {
    font-family: 'Fraunces', serif; font-weight: 600;
    font-size: 68px; line-height: 1.08; letter-spacing: -0.015em;
    color: #1c1008;
  }
  .subtitle {
    margin-top: 24px;
    font-size: 28px; line-height: 1.4; color: #44403c;
    display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;
  }

  .footer {
    position: absolute; left: 72px; right: 72px; bottom: 52px;
    display: flex; justify-content: space-between; align-items: baseline;
    padding-top: 22px; border-top: 2px solid #e8d5c4;
    font-size: 26px;
  }
  .who b { font-weight: 700; color: #1c1008; }
  .who span { color: #78716c; font-weight: 400; }
  .site { font-weight: 600; color: #b45309; }
</style></head>
<body>
  <div class="bar"></div>
  <div class="pages" aria-hidden="true">
    <div class="page back"></div>
    <div class="page">
      <div class="h"></div>
      <div class="l"></div><div class="l s"></div>
      <div style="margin: 6px 0 17px"><span class="mark"></span><span class="num">1</span></div>
      <div class="l"></div><div class="l"></div><div class="l s"></div>
      <div style="margin: 6px 0 17px"><span class="mark" style="width:44%"></span><span class="num">2</span></div>
      <div class="l s"></div>
    </div>
  </div>
  <div class="content">
    <div class="eyebrow">${esc(card.eyebrow)}</div>
    <div class="title">${esc(card.title)}</div>
    ${card.subtitle ? `<div class="subtitle">${esc(card.subtitle)}</div>` : ""}
  </div>
  <div class="footer">
    <div class="who"><b>${esc(NAME)}</b> <span>· ${esc(ROLE)}</span></div>
    <div class="site">${esc(SITE)}</div>
  </div>
</body></html>`;
}

/* ---------- render ---------- */

async function main() {
  const cards = [...PAGES, ...portfolioCards()];

  // `npm run social-cards -- --list` prints each card's text without rendering.
  if (process.argv.includes("--list")) {
    for (const c of cards) console.log(`${c.name}\n  ${c.eyebrow}\n  ${c.title}\n  ${c.subtitle}\n`);
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

  for (const card of cards) {
    await page.setContent(cardHtml(card), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const fontsOk = await page.evaluate(
      () => document.fonts.check("600 68px Fraunces") && document.fonts.check("400 28px Inter")
    );
    const textOk = await page.evaluate(() => document.querySelector(".title").getBoundingClientRect().height > 0);
    if (!fontsOk || !textOk) {
      await browser.close();
      throw new Error(
        "Fonts didn't load or text didn't render. This script needs internet access " +
          "(for Google Fonts) and a machine that can render text, such as a Mac."
      );
    }

    // Shrink long titles so the title and subtitle fit above the footer.
    await page.evaluate(() => {
      const content = document.querySelector(".content");
      const title = document.querySelector(".title");
      let size = 68;
      while (content.scrollHeight > content.clientHeight && size > 40) {
        size -= 2;
        title.style.fontSize = size + "px";
      }
    });

    const out = join(OUT_DIR, `${card.name}.png`);
    await page.screenshot({ path: out, type: "png" });
    console.log(`  ✓ ${card.name}.png`);
  }

  await browser.close();
  console.log(`\nWrote ${cards.length} cards to assets/images/social/`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
