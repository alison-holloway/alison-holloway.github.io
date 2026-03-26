---
title: "This Portfolio Site"
layout: portfolio_item
product: alison-holloway.github.io
doc_type: Web Development
date: '2025-01-01'
date_completed: 'March 2026'
section: ai
tools:
- Jekyll
- HTML/CSS
- JavaScript
- Excalidraw
- Playwright
- esbuild
- GitHub Pages
- VS Code Dev Containers
doc_url: https://github.com/alison-holloway/alison-holloway.github.io
excerpt: A Jekyll-based portfolio and services site with a custom Excalidraw-to-SVG export pipeline, responsive design, and a VS Code dev container for reproducible development.
---

## Overview

This site is both a portfolio and a working example of what I build. It's a Jekyll static site hosted on GitHub Pages, built for two audiences: small businesses looking for AI consulting, and technology companies looking for technical documentation.

The source code is on GitHub.

## Technical Highlights

### Excalidraw diagram export pipeline

Portfolio diagrams are authored as `.excalidraw` files in VS Code and exported to SVG via a custom Node.js script. The pipeline uses esbuild to bundle the `@excalidraw/excalidraw` React library for browser use, then Playwright to render the component in a headless Chromium browser and capture the SVG output. This removes any dependency on the Excalidraw web app and keeps diagrams reproducible from source.

### Dev container

The repository includes a VS Code dev container that provisions the full environment automatically: Ruby (Jekyll), Node.js, Playwright, Chromium, and all dependencies. Opening the repo in VS Code and clicking "Reopen in Container" is enough to get a working local development environment.

### Design

- Responsive layout with mobile navigation toggle
- CSS custom properties for consistent theming
- Dark mode support
- Automatic table-of-contents generation from page headings
- No JavaScript frameworks, vanilla JS only where needed

## Structure

The site uses Jekyll collections for portfolio items. Each item is a Markdown file with YAML front matter that controls which section it appears in, its metadata, and links to source or published documentation. The portfolio listing page uses Jekyll templating to organise items into sections, with no client-side filtering.
