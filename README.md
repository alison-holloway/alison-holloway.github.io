# Alison Holloway - AI and Technical Writing Portfolio

**Portfolio Site:** https://alison-holloway.github.io/

**Contact:** alison.holloway@pm.me

**LinkedIn:** [linkedin.com/in/alison-holloway-au](https://linkedin.com/in/alison-holloway-au)

A professional portfolio and services site for an AI consultant and senior technical writer. Showcases 30+ years of technical writing experience across cloud-native platforms, container technologies, and enterprise Linux, alongside AI consulting services for small businesses. Built with Jekyll and hosted on GitHub Pages.

## Table of Contents

- [About This Portfolio](#about-this-portfolio)
- [Directory Structure](#directory-structure)
- [Current Portfolio Items](#current-portfolio-items)
- [Local Development](#local-development)
- [Adding Portfolio Items](#adding-portfolio-items)
- [Deploying Changes](#deploying-changes)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Excalidraw Diagrams](#excalidraw-diagrams)
- [Resources](#resources)

## About This Portfolio

This site showcases documentation work across:
- Oracle Cloud Native Environment 2 (Kubernetes, containers)
- Oracle Linux products and tools
- Cloud infrastructure technologies

**Specializations:**
- DITA XML structured authoring
- Installation, upgrade, and deployment guides
- CLI reference documentation
- Release notes and conceptual guides

## Directory Structure

```
alison-holloway.github.io/
├── .devcontainer/
│   └── devcontainer.json    # VS Code dev container configuration
├── _config.yml              # Site configuration
├── Gemfile                  # Ruby dependencies
├── index.html               # Home page for AI consulting and technical writing services
├── about.md                 # Professional background and expertise
├── services.md              # AI consulting and technical writing services
├── contact.md               # Contact page
├── 404.html                 # Error page
├── README.md                # This file
├── CLAUDE.md                # Claude Code instructions
├── _layouts/
│   ├── default.html         # Main layout with navigation
│   └── portfolio_item.html  # Portfolio project layout
├── _portfolio/              # Portfolio items (14 items)
│   ├── ocne2_*.md           # Oracle Cloud Native Environment 2 docs
│   ├── ol_*.md              # Oracle Linux guides
│   ├── microk8s_*.md        # Independent guides
│   └── underground_php.md   # Co-authored book
├── portfolio/
│   └── index.html           # Portfolio listing organized by sections
├── github/
│   └── index.html           # GitHub projects listing (section: ai portfolio items)
├── scripts/
│   ├── export-excalidraw-svg.mjs  # Excalidraw → SVG export script
│   ├── _browser-export.mjs        # Browser entry point for export
│   └── _browser-export-bundle.mjs # esbuild bundle (generated)
└── assets/
    ├── css/
    │   └── main.css         # Site styling
    └── excalidraw/          # Diagram source files (.excalidraw) and exported SVGs
```

## Current Portfolio Items

### GitHub Projects
- This Portfolio Site

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

## Customization

### Colors

Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --primary-color: #2c3e50;
  --accent-color: #3498db;
  --text-color: #333;
  --bg-color: #ffffff;
}
```

### Navigation

Edit `_layouts/default.html` to modify navigation links.

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

Check the Actions tab in GitHub for build errors.

## Excalidraw Diagrams

Portfolio items use Excalidraw diagrams for visualizing information architecture, user flows, and documentation structure. Diagrams are authored as `.excalidraw` files and exported to SVG.

### Editing Diagrams

1. Open `.excalidraw` files in VS Code using the [Excalidraw extension](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor)
2. Source files are in `assets/excalidraw/`

### Exporting SVGs

After editing diagrams, re-export to SVG:

```bash
npm run export-svg
```

This bundles `@excalidraw/excalidraw` with esbuild and uses Playwright to render SVGs in a headless browser. Playwright and Chromium are pre-installed when using the dev container. For local setup, see [Option B: Local Setup](#option-b-local-setup-manual) for install steps.

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | `#1B3A5C` | Category headings, card labels |
| Medium blue | `#4A6FA5` | Container borders, card borders, arrow strokes |
| Blue-grey tint | `#EEF2F7` | Category container fills |
| White | `#FFFFFF` | Card fills |
| Off-white | `#F8FAFC` | Canvas background |

Diagrams use Helvetica font (fontFamily: 2) and no roughness (roughness: 0).

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [Excalidraw](https://excalidraw.com/)

