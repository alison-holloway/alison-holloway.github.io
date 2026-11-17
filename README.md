# Alison Holloway - Technical Writing Portfolio

**Portfolio Site:** https://www.alison-holloway.com/

**Contact:** alison.holloway@pm.me

**LinkedIn:** [linkedin.com/in/alison-holloway-au](https://linkedin.com/in/alison-holloway-au)

A professional portfolio site for a senior technical writer. Showcases technical writing for developer and platform-engineering audiences across cloud-native platforms, container technologies, and enterprise Linux, alongside hands-on AI experiments that keep that writing current. Built with Jekyll and hosted on GitHub Pages.

## Table of Contents

- [About This Portfolio](#about-this-portfolio)
- [Directory Structure](#directory-structure)
- [Current Portfolio Items](#current-portfolio-items)
- [Local Development](#local-development)
- [Adding Portfolio Items](#adding-portfolio-items)
- [Deploying Changes](#deploying-changes)
- [Custom Domain and HTTPS](#custom-domain-and-https)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Interactive Features](#interactive-features)
- [Excalidraw Diagrams](#excalidraw-diagrams)
- [Resources](#resources)

## About This Portfolio

This site showcases documentation work across:
- Oracle Cloud Native Environment 2 (Kubernetes, containers)
- Oracle Linux products and tools
- Cloud infrastructure technologies
- Independent guides and hands-on AI projects (fine-tuned LLMs, a RAG system)

**Specializations:**
- Information architecture and structured authoring (DITA XML, content typing, reuse)
- Docs-as-code workflows (Markdown, Git, publishing pipelines)
- Installation, upgrade, and deployment guides
- CLI reference documentation
- Release notes and conceptual guides
- Content design for AI retrieval

## Directory Structure

```
alison-holloway.github.io/
├── .devcontainer/
│   └── devcontainer.json    # VS Code dev container configuration
├── _config.yml              # Site configuration
├── CNAME                    # Custom domain (managed by GitHub — see Custom Domain and HTTPS)
├── Gemfile                  # Ruby dependencies
├── package.json             # Node dependencies and the export-svg script
├── index.html               # Home page: hero with animated terminal, track cards, retrieval demo teaser
├── about.md                 # Professional background and expertise
├── services.md              # "What I do" page (/what-i-do/): technical writing + how I use AI
├── how-ai-reads-docs.md     # Interactive retrieval demo page (/how-ai-reads-docs/)
├── contact.md               # Contact page
├── 404.html                 # Error page
├── README.md                # This file
├── CLAUDE.md                # Claude Code instructions
├── _layouts/
│   ├── default.html         # Main layout with navigation
│   └── portfolio_item.html  # Portfolio project layout
├── _portfolio/              # Portfolio items (18 items, plus sample PDFs)
│   ├── ocne2_*.md           # Oracle Cloud Native Environment 2 docs
│   ├── ol_*.md              # Oracle Linux guides
│   ├── microk8s_*.md        # Independent guides
│   ├── *_fine_tuning.md     # AI fine-tuning projects
│   ├── rag_cli_project.md   # RAG CLI project
│   ├── portfolio_site.md    # This site
│   ├── underground_php.md   # Co-authored book
│   └── *.pdf                # Sample PDFs linked from portfolio items
├── portfolio/
│   └── index.html           # Portfolio listing organized by sections
├── github/
│   └── index.html           # GitHub projects listing (section: ai portfolio items)
├── scripts/
│   ├── export-excalidraw-svg.mjs  # Excalidraw → SVG export script
│   ├── restyle_excalidraw.py      # Batch-apply diagram design tokens to .excalidraw files
│   ├── _browser-export.mjs        # Browser entry point for export
│   └── _browser-export-bundle.mjs # esbuild bundle (generated)
└── assets/
    ├── css/
    │   └── main.css         # Site styling
    ├── js/
    │   ├── hero-terminal.js       # Home page hero terminal animation
    │   ├── diagrams.js            # Diagram draw-on animation and IA journey explorer
    │   ├── retrieval-demo.js      # Retrieval demo engine (BM25), UI, and home page teaser
    │   └── retrieval-demo-data.js # Retrieval demo questions and sample docs
    └── excalidraw/          # Diagram source files (.excalidraw) and exported SVGs
```

## Current Portfolio Items

### GitHub Projects
- This Portfolio Site
- RAG CLI
- Kubernetes Assistant: Fine-Tuned LLM
- Oracle Cloud Native Environment Assistant: Fine-Tuned LLM

### Independent Guides
- Access the Canonical MicroK8s Kubernetes Dashboard

### Oracle Cloud Native Environment 2
- Release Notes
- Quick Start Guide
- Concepts Guide
- Kubernetes Guide
- Kubernetes Clusters Guide
- Applications Guide
- Oracle Container Host for Kubernetes Image Builder
- Upgrade Guide
- CLI Reference
- **Information Architecture** - Documentation set design with Excalidraw diagrams

### Other Work
- Podman User's Guide (Oracle Linux)
- DTrace for System Tracing (Oracle Linux)
- The Underground PHP and Oracle Manual (co-author)

## Local Development

### Option A: Dev Container (Recommended)

The repository includes a dev container configuration for VS Code that sets up the full environment automatically — Ruby, Node.js, Playwright, and all dependencies.

**Prerequisites:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine on Linux)
- [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

**Setup:**

1. Clone the repository and open the folder in VS Code
2. When prompted, click **Reopen in Container** (or open the Command Palette and run `Dev Containers: Reopen in Container`)
3. Wait for the container to build and the `postCreateCommand` to finish — this installs all Ruby gems, Node packages, and Playwright browser dependencies automatically

**Running the site:**

```bash
bundle exec jekyll serve
```

View the site at `http://localhost:4000` (VS Code will offer to open the forwarded port automatically).

**Exporting SVGs after editing diagrams:**

```bash
npm run export-svg
```

No additional setup needed — Playwright and Chromium are pre-installed in the container.

---

### Option B: Local Setup (Manual)

**Prerequisites:**

- Ruby 2.7 or higher
- Bundler gem (`gem install bundler`)
- Node.js LTS
- Playwright Chromium and its system dependencies (required for SVG export only)

**Setup:**

```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
npm install

# Install Playwright browser and system dependencies (for SVG export)
npx playwright install chromium
sudo npx playwright install-deps chromium
```

**Running the site:**

```bash
bundle exec jekyll serve
```

View the site at `http://localhost:4000`

### Using Jekyll Admin

Access the admin interface at `http://localhost:4000/admin` for visual content management.

## Adding Portfolio Items

Create a new file in `_portfolio/` directory:

**Filename format:** `product-name-doc-type.md`

**File content template:**

```markdown
---
layout: portfolio_item
title: "Document Title"
product: "Product Name"
doc_type: "Installation Guide"
version: "1.0"
date: 2024-12-30
date_completed: "Month Year"
section: "independent"
tools:
  - DITA XML
  - Git
doc_url: "https://docs.oracle.com/path-to-online-docs"
excerpt: "Brief description of this documentation project"
---

## Overview

Description of the documentation project.

## Key Features

What makes this documentation valuable.
```

### Front Matter Fields

- **layout:** Always `portfolio_item`
- **title:** The document title
- **product:** Product or technology name
- **doc_type:** Type of document (Installation Guide, Release Notes, etc.)
- **version:** Product version (optional)
- **date:** Publication date (used for sorting)
- **date_completed:** Display date shown as "Last Publish Date" on the item page (optional — omit to hide the row)
- **section:** Portfolio section — `ai`, `independent`, `other`, or omit for Oracle Cloud Native Environment items
- **tools:** Tools used
- **doc_url:** Link to online documentation (optional)
- **pdf_url:** Link to PDF version (optional)
- **excerpt:** Brief description for listings

## Deploying Changes

```bash
# Test locally first
bundle exec jekyll serve

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

GitHub Pages automatically rebuilds the site within 1-2 minutes.

## Custom Domain and HTTPS

The site is served at **https://www.alison-holloway.com/**. The apex domain `alison-holloway.com` redirects to the `www` host.

**DNS (managed at VentraIP):**

| Record | Host | Value |
|--------|------|-------|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| CNAME | `www` | `alison-holloway.github.io` |

**Do not edit the `CNAME` file by hand.** GitHub writes it automatically when the custom domain is changed in **Settings → Pages**. Editing it directly causes Pages to reconfigure the domain, which can drop the TLS certificate.

### Checking certificate status

```bash
# What GitHub thinks the certificate state is
gh api repos/alison-holloway/alison-holloway.github.io/pages \
  --jq '{cname, https_enforced, cert: .https_certificate}'

# What the live site actually serves
echo | openssl s_client -connect www.alison-holloway.com:443 \
  -servername www.alison-holloway.com 2>/dev/null | openssl x509 -noout -dates

# DNS and HTTPS health as GitHub sees it
gh api repos/alison-holloway/alison-holloway.github.io/pages/health
```

### If the certificate expires

Certificates renew automatically. If the live site serves an expired certificate while the API reports `"state": "issued"`, GitHub has renewed it but not deployed it to its edge servers. Removing and re-adding the same domain does not fix this — GitHub re-attaches the same undeployed record.

The fix is to change the primary domain, which forces a genuinely new certificate request:

1. In **Settings → Pages**, change the custom domain to the other hostname (`alison-holloway.com` if currently `www`, or vice versa) and save.
2. Confirm the state changes to `new` ("The certificate request process will begin shortly").
3. Wait for issuance and edge rollout. This took about two hours when it last happened; GitHub allows up to 24.
4. Verify the serial number and expiry date have both changed, not just the expiry.
5. Re-enable **Enforce HTTPS** once the new certificate is live.

## Customization

### Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --primary-color:   #1c1008;  /* warm near-black — text, headings */
  --accent-color:    #b45309;  /* amber — buttons, links, accents */
  --accent-light:    #fef3c7;  /* light amber tint — pill badges, icon backgrounds */
  --accent-dark:     #92400e;  /* dark amber — hover states */
  --text-light:      #78716c;  /* muted warm grey — secondary text */
  --bg-color:        #fdf6ee;  /* warm cream — page background */
  --bg-light:        #faebd7;  /* warm mid — section backgrounds, fills */
  --bg-card:         #ffffff;  /* white — card backgrounds */
  --border-color:    #e8d5c4;  /* warm border */
}
```

### Typography

The site uses two typefaces loaded from Google Fonts:

- **Fraunces** — variable optical-size serif, used for all `h1`, `h2`, `h3` headings
- **Inter** — clean sans-serif, used for body text and UI elements

Both are loaded in `_layouts/default.html`. Small uppercase labels (`.toc-title`, competency card headings) override to Inter explicitly.

### Navigation

Edit `_layouts/default.html` to modify navigation links. The retrieval demo page is not in the nav; it is linked from the home page (track card 02 and the demo teaser), the What I do page, and the Kubernetes Clusters and Information Architecture portfolio pages.

### Home Page Layout

`index.html` runs, in order: the hero (availability pill, heading, intro, and the animated terminal), track cards 01 Technical Documentation and 02 AI in my practice, the 03 retrieval demo teaser, and the "View portfolio" and "Get in touch" buttons. Sections are spaced 48px apart.

### Page Banners

Main pages open with a banner under the page title: a cream panel with an amber left border and large lead text. Use the `.page-intro` class:

```html
<h1 class="page-title">Page Title</h1>

<div class="page-intro">
  <p class="lead">One or two short sentences that introduce the page.</p>
</div>
```

Keep the lead short; longer explanation belongs in the body below it. Portfolio item pages don't use a banner; they open with a breadcrumb, title, and details box.

### Spacing

Page content starts 32px below the header on desktop (24px on tablets, 20px on phones). This comes from the top padding on `main`; `.page-title` and `.hero` have no top margin or padding of their own.

### Portfolio Display

Edit `portfolio/index.html` to modify the portfolio listing. Items are organized into sections using the `section` front matter field (`independent`, `other`, or Oracle Cloud Native Environment).

## Troubleshooting

### Site Not Building Locally

1. Run `bundle install`
2. Check Ruby version: `ruby --version`
3. Clear cache: `bundle exec jekyll clean`

### Port 4000 In Use

```bash
bundle exec jekyll serve --port 4001
```

### GitHub Pages Not Updating

This site uses the legacy Pages build (no Actions workflow), so builds do not appear in the Actions tab. Check **Settings → Pages** in GitHub for the build status and any error message, or query the API:

```bash
gh api repos/alison-holloway/alison-holloway.github.io/pages/builds/latest \
  --jq '{status, error: .error.message, created_at}'
```

## Interactive Features

All interactive features are plain JavaScript with no build step or dependencies. Each one respects `prefers-reduced-motion` and falls back to static content when JavaScript is off.

### Hero Terminal

The home page hero shows a terminal that types out short procedures (starting an Oracle Cloud Native Environment cluster, running a Podman pod, and a RAG CLI query), prints their output, and ends each with a verified line. It loops, pauses when off screen or when the tab is hidden, and has a pause/play button. With reduced motion it shows the first scenario as a still.

Edit the scenarios in the `scenarios` array at the top of `assets/js/hero-terminal.js`. Keep lines to 46 characters or fewer so they fit on a phone. The sample output is illustrative, so keep it accurate to the real commands.

### Diagram Draw-On and Journey Explorer

`assets/js/diagrams.js` (loaded by `_layouts/portfolio_item.html`) swaps each Excalidraw `<img>` on a portfolio page for the same SVG inline and draws it in (strokes, then fills and labels) when it scrolls into view. Without JavaScript the original `<img>` stays.

On the Information Architecture page, the documentation set architecture diagram also has a **journey explorer**: persona buttons that dim the other books and light up a journey's books in order with numbered badges. Journey data lives in the button attributes in `_portfolio/ocne2_information_architecture.md`:

| Attribute | Purpose |
|-----------|---------|
| `data-steps` | Card labels in journey order, separated by `\|` (repeats allowed, shown as "2, 4") |
| `data-hub` | Optional hub card; `data-steps` are then its spokes |
| `data-caption` | Path text shown under the diagram |
| `data-target` | Heading anchor for the "Read the journey" link |

Card labels must match the text in the SVG exactly. The explorer only treats white-filled shapes as cards, so category containers aren't affected.

### Retrieval Demo

`/how-ai-reads-docs/` runs real BM25 keyword retrieval in the browser over two versions of the same cluster administration content, adapted from the Oracle Cloud Native Environment Release 2 Kubernetes Clusters guide: one structured by topic, one written as long pages and split into fixed-size chunks. For each question it shows the search terms, scores every chunk, lifts the top 3 into "all the model sees", and gives a computed verdict:

- **Pass** — every phrase a complete answer needs reached the model's context
- **Only just** — the answer reached the context but barely beat a chunk that was left out
- **Fail** — part of the answer never reached the model

Questions, the phrases each answer needs (`needs`), and both doc sets are in `assets/js/retrieval-demo-data.js`. Rankings recompute live, so editing the text changes the results. To check results without a browser:

```bash
node -e '
const vm=require("vm"),fs=require("fs");const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync("assets/js/retrieval-demo-data.js","utf8"),ctx);
const d=ctx.window.RETRIEVAL_DEMO,e=require("./assets/js/retrieval-demo.js");
for(const q of d.questions)for(const m of ["structured","unstructured"]){const r=e.run(d,m,q);
console.log(m.padEnd(12),r.complete?(r.close?"only just":"pass"):"fail",q.text)}'
```

The home page teaser (`data-rd-teaser="upgrade"` in `index.html`) runs the same engine for one question, so it never drifts from the demo. The static HTML inside it is the no-JS fallback; update it if the results change.

## Excalidraw Diagrams

Portfolio items use Excalidraw diagrams for visualizing information architecture, user flows, and documentation structure. Diagrams are authored as `.excalidraw` files and exported to SVG. On the site they animate in as they scroll into view; see [Diagram Draw-On and Journey Explorer](#diagram-draw-on-and-journey-explorer).

### Editing Diagrams

1. Open `.excalidraw` files in VS Code using the [Excalidraw extension](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor)
2. Source files are in `assets/excalidraw/`

### Applying the Design Tokens

`scripts/restyle_excalidraw.py` batch-applies the colour palette, Helvetica font, and zero roughness described below, so diagrams stay consistent without hand-editing each element:

```bash
# Single file
python3 scripts/restyle_excalidraw.py assets/excalidraw/diagram.excalidraw

# All .excalidraw files in a directory
python3 scripts/restyle_excalidraw.py assets/excalidraw/
```

Restyled copies are written alongside the originals with a `-restyled` suffix, so the source files are never overwritten. Review the output, then replace the original if it looks right. The design tokens are configurable at the top of the script.

### Exporting SVGs

After editing diagrams, re-export to SVG:

```bash
npm run export-svg
```

This bundles `@excalidraw/excalidraw` with esbuild and uses Playwright to render SVGs in a headless browser. Playwright and Chromium are pre-installed when using the dev container. For local setup, see [Option B: Local Setup](#option-b-local-setup-manual) for install steps.

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Warm near-black | `#1c1008` | Category headings, card labels, text |
| Amber | `#b45309` | Container borders, card borders, arrow strokes |
| Warm cream (mid) | `#faebd7` | Category container fills |
| White | `#FFFFFF` | Card fills |
| Warm cream (bg) | `#fdf6ee` | Canvas background |

Diagrams use Helvetica font (fontFamily: 2) and no roughness (roughness: 0).

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [Excalidraw](https://excalidraw.com/)

