#!/usr/bin/env bash
# Runs once after the dev container is created (postCreateCommand).
# Installs gems, Node packages, and Playwright's Chromium, plus the system
# libraries and fonts Chromium needs to render text. Fonts matter for
# `npm run social-cards` (link-preview images) and any screenshot checks:
# without them, headless Chromium draws pages with no text.
set -euo pipefail

# ~/.claude and ~/.config/gh are named Docker volumes (see devcontainer.json)
# so Claude Code's settings and memory, and the GitHub CLI sign-in, survive
# rebuilds. Docker creates them (and a missing ~/.config) owned by root.
echo "==> Config volumes"
sudo chown -R vscode:vscode /home/vscode/.claude /home/vscode/.config/gh
sudo chown vscode:vscode /home/vscode/.config

echo "==> Ruby gems"
bundle install

echo "==> Node packages"
npm install

echo "==> Playwright Chromium"
npx playwright install chromium

echo "==> Chromium system dependencies and fonts"
sudo apt-get update
# sudo resets PATH, and npx (from the Node feature) lives under nvm, so pass
# PATH through or sudo can't find it.
sudo env "PATH=$PATH" npx playwright install-deps chromium
sudo apt-get install -y --no-install-recommends fontconfig fonts-dejavu-core

if [ "$(fc-list | wc -l)" -eq 0 ]; then
  echo "WARNING: no fonts found; headless Chromium won't render text." >&2
  exit 1
fi

echo "==> Done: $(fc-list | wc -l) fonts available"
