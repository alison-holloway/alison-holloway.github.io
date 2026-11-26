#!/usr/bin/env bash
# Runs once after the dev container is created (postCreateCommand).
# Installs gems, Node packages, and Playwright's Chromium, plus the system
# libraries and fonts Chromium needs to render text. Fonts matter for
# `npm run social-cards` (link-preview images) and any screenshot checks:
# without them, headless Chromium draws pages with no text.
set -euo pipefail

# ~/.claude is a named Docker volume (see devcontainer.json) so Claude Code's
# settings and memory survive rebuilds. Docker creates it owned by root.
echo "==> Claude Code config volume"
sudo chown -R vscode:vscode /home/vscode/.claude

echo "==> Ruby gems"
bundle install

echo "==> Node packages"
npm install

echo "==> Playwright Chromium"
npx playwright install chromium

echo "==> Chromium system dependencies and fonts"
sudo apt-get update
sudo npx playwright install-deps chromium
sudo apt-get install -y --no-install-recommends fontconfig fonts-dejavu-core

if [ "$(fc-list | wc -l)" -eq 0 ]; then
  echo "WARNING: no fonts found; headless Chromium won't render text." >&2
  exit 1
fi

echo "==> Done: $(fc-list | wc -l) fonts available"
