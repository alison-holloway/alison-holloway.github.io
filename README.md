# Alison Holloway - Technical Writing Portfolio

A professional portfolio site showcasing 30+ years of technical writing experience in virtualization, cloud-native platforms, and container technologies. Built with Jekyll and hosted on GitHub Pages.

## Table of Contents

- [About This Portfolio](#about-this-portfolio)
- [Directory Structure](#directory-structure)
- [Current Portfolio Items](#current-portfolio-items)
- [Local Development](#local-development)
- [Adding Portfolio Items](#adding-portfolio-items)
- [Deploying Changes](#deploying-changes)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Mermaid Diagrams](#mermaid-diagrams)
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
├── _config.yml              # Site configuration
├── Gemfile                  # Ruby dependencies
├── index.html               # Home page with featured projects
├── about.md                 # Professional background and expertise
├── 404.html                 # Error page
├── README.md                # This file
├── _layouts/
│   ├── default.html         # Main layout with navigation (includes Mermaid.js)
│   └── portfolio_item.html  # Portfolio project layout
├── _portfolio/              # Portfolio items (13 items)
│   ├── ocne2_*.md           # Oracle Cloud Native Environment 2 docs
│   ├── ol_*.md              # Oracle Linux guides
│   └── underground_php.md   # Co-authored book
├── portfolio/
│   └── index.html           # Portfolio listing with category filter
├── docs/
│   └── mermaid-style-guide.md  # Mermaid diagram formatting standards
├── scripts/
│   └── format-mermaid.py    # Mermaid diagram formatter
└── assets/
    └── css/
        └── main.css         # Site styling
```

## Current Portfolio Items

### Oracle Cloud Native Environment 2
- OCNE 2 Release Notes
- Quick Start Guide
- Concepts Guide
- Kubernetes Guide
- Managing Kubernetes Clusters
- Managing Applications
- OCK Image Builder Guide
- Upgrade Guide
- CLI Reference
- **Information Architecture** - Documentation set design with Mermaid diagrams

### Oracle Linux
- Podman Guide
- DTrace Guide

### Publications
- The Underground PHP and Oracle Manual (co-author)

## Local Development

### Prerequisites

- Ruby 2.7 or higher
- Bundler gem (`gem install bundler`)

### Running Locally

```bash
# Install dependencies
bundle install

# Start local server
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
featured: true
tags:
  - Installation
  - Cloud Native
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
- **featured:** Set to `true` to display on home page
- **tags:** Categories for filtering
- **tools:** Tools used
- **doc_url:** Link to online documentation (optional)
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

Edit `portfolio/index.html` to modify the portfolio listing. Items can be filtered by category tags.

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

## Mermaid Diagrams

Portfolio items can include Mermaid diagrams for visualizing information architecture, user flows, and documentation structure. The site uses Mermaid.js for rendering.

### Formatting Diagrams

A Python formatter ensures consistent styling across all diagrams:

```bash
# Preview changes without modifying files
python3 scripts/format-mermaid.py --dry-run

# Check conformance (returns exit code 1 if issues found)
python3 scripts/format-mermaid.py --validate

# Apply formatting to all diagrams
python3 scripts/format-mermaid.py

# Show diff of changes
python3 scripts/format-mermaid.py --diff
```

See `docs/mermaid-style-guide.md` for the complete style guide.

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Blue | `#235789` | Main arrows, node text |
| Yellow | `#F1D302` | Content node borders |
| Red | `#C1292E` | Workflow node borders, cross-references |

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [Mermaid Documentation](https://mermaid.js.org/)

---

**Portfolio Site:** https://alison-holloway.github.io/
**Contact:** alison.holloway@pm.me
**LinkedIn:** [linkedin.com/in/alison-holloway-au](https://linkedin.com/in/alison-holloway-au)
