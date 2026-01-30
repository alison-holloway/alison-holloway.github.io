# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jekyll-based professional portfolio website for a senior technical writer, hosted on GitHub Pages at alison-holloway.github.io.

## Common Commands

```bash
# Install dependencies
bundle install

# Start local development server (http://localhost:4000)
bundle exec jekyll serve

# Clear build cache if needed
bundle exec jekyll clean

# Format Mermaid diagrams in portfolio items
python3 scripts/format-mermaid.py              # Apply formatting
python3 scripts/format-mermaid.py --dry-run    # Preview changes
python3 scripts/format-mermaid.py --validate   # Check conformance
```

## Architecture

### Jekyll Collections

Portfolio items are managed as a Jekyll collection in `_portfolio/`. Each `.md` file generates a page at `/portfolio/:title/`.

### Layout Hierarchy

- `_layouts/default.html` - Base layout with header, nav, footer, Mermaid.js CDN integration
- `_layouts/portfolio_item.html` - Portfolio detail pages with metadata display

### Key Files

| File | Purpose |
|------|---------|
| `_config.yml` | Site config, author info, collection definitions |
| `portfolio/index.html` | Portfolio listing with client-side tag filtering (JavaScript) |
| `index.html` | Home page with featured projects grid |
| `assets/css/main.css` | Full stylesheet with CSS variables and dark mode support |
| `scripts/format-mermaid.py` | Mermaid diagram formatter enforcing style guide |
| `docs/mermaid-style-guide.md` | Mermaid diagram formatting standards |

### Portfolio Item Front Matter

```yaml
---
title: "Document Title"
layout: portfolio_item
product: "Product Name"
doc_type: "Guide Type"
version: "1.0"
date: 2024-12-30
date_completed: 'Month Year'
featured: true  # Shows on home page
tags: [Tag1, Tag2]
tools: [DITA XML, Git]
pdf_url: "https://..."
doc_url: "https://..."
excerpt: "Brief description"
---
```

### Mermaid Diagrams

Mermaid code blocks in portfolio items are converted to rendered diagrams via JavaScript in default.html. Follow `docs/mermaid-style-guide.md` for formatting standards:
- No init blocks (template-driven)
- 2-space indentation
- Define nodes before connections
- Use standard color classes: `chapter` (yellow border), `workflowNode` (red border)

## Deployment

Push to `main` branch triggers automatic GitHub Pages build. Changes appear within 1-2 minutes.
