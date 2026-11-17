#!/usr/bin/env python3
"""
restyle_excalidraw.py
---------------------
Batch restyle Excalidraw files: removes roughness, fixes colours, unifies fonts.

Usage (single file):
    python3 restyle_excalidraw.py diagram.excalidraw

Usage (batch - all .excalidraw files in a directory):
    python3 restyle_excalidraw.py ./diagrams/

Output files are written alongside the originals with a '-restyled' suffix,
e.g. ia-information-flow.excalidraw → ia-information-flow-restyled.excalidraw

-----------------------------------------------------------------------------
CONFIGURATION — edit this section to change the design tokens
-----------------------------------------------------------------------------
"""

import json
import sys
from pathlib import Path

# ── Design tokens ────────────────────────────────────────────────────────────

CATEGORY_FILL   = "#EEF2F7"   # soft blue-grey tint for grouping containers
CATEGORY_STROKE = "#4A6FA5"   # medium blue for container borders
CARD_FILL       = "#FFFFFF"   # white for book/node cards
CARD_STROKE     = "#4A6FA5"   # same blue for card borders
HEADER_TEXT     = "#1B3A5C"   # dark navy for category heading labels
CARD_TEXT       = "#1B3A5C"   # dark navy for card labels
ARROW_COLOR     = "#4A6FA5"   # arrows match the design system
ARROW_LABEL_FONT_SIZE = 16    # smaller than card labels (20px) for hierarchy
CANVAS_BG       = "#F8FAFC"   # barely-there off-white canvas

# ── Element classification ────────────────────────────────────────────────────
#
# The script auto-detects element roles based on their properties:
#
#   CATEGORY container  →  rectangle with transparent/no background fill
#                          (the outer grouping boxes like "Core Operations")
#
#   CARD                →  rectangle with a white/coloured background fill
#                          (the individual book boxes like "Release Notes")
#
#   ARROW               →  type == "arrow"
#
#   ARROW LABEL         →  type == "text" where containerId points to an arrow
#
#   CATEGORY LABEL      →  type == "text" where containerId points to a category rect
#
# If your diagrams use a different convention, override by listing IDs explicitly:

FORCE_CATEGORY_IDS = set()   # e.g. {"Advanced", "Core", "Entry"}
FORCE_CARD_IDS     = set()   # e.g. {"RN", "KC", "CLI"}
# Leave both sets empty to use auto-detection (recommended).

# ── Core transform ────────────────────────────────────────────────────────────

def classify_elements(elements):
    """Return sets of IDs for categories, cards, and arrows."""
    if FORCE_CATEGORY_IDS or FORCE_CARD_IDS:
        return FORCE_CATEGORY_IDS, FORCE_CARD_IDS

    rect_ids      = {e["id"] for e in elements if e["type"] == "rectangle"}
    arrow_ids     = {e["id"] for e in elements if e["type"] == "arrow"}
    text_container_ids = {
        e.get("containerId") for e in elements
        if e["type"] == "text" and e.get("containerId")
    }

    category_ids = set()
    card_ids     = set()

    for el in elements:
        if el["type"] != "rectangle":
            continue
        bg = el.get("backgroundColor", "transparent")
        # Heuristic: transparent/no-fill rects that contain other rects = categories
        if bg in ("transparent", "", None):
            category_ids.add(el["id"])
        else:
            card_ids.add(el["id"])

    return category_ids, card_ids


def restyle(data: dict) -> dict:
    elements     = data.get("elements", [])
    category_ids, card_ids = classify_elements(elements)
    arrow_ids    = {e["id"] for e in elements if e["type"] == "arrow"}

    for el in elements:
        # Kill roughness and enforce solid strokes everywhere
        el["roughness"]    = 0
        el["strokeStyle"]  = "solid"

        if el["type"] == "rectangle":
            el["strokeWidth"] = 2
            el["fillStyle"]   = "solid"

            if el["id"] in category_ids:
                el["backgroundColor"] = CATEGORY_FILL
                el["strokeColor"]     = CATEGORY_STROKE

            elif el["id"] in card_ids:
                el["backgroundColor"] = CARD_FILL
                el["strokeColor"]     = CARD_STROKE

        elif el["type"] == "arrow":
            el["strokeColor"] = ARROW_COLOR
            el["strokeWidth"] = 2

        elif el["type"] == "text":
            el["fontFamily"] = 2   # clean sans-serif (Helvetica/Normal in Excalidraw)
            container = el.get("containerId", "")

            if container in category_ids:
                el["strokeColor"] = HEADER_TEXT

            elif container in card_ids:
                el["strokeColor"] = CARD_TEXT

            elif container in arrow_ids:
                # Arrow labels: smaller and same colour as the arrow
                el["strokeColor"] = ARROW_COLOR
                el["fontSize"]    = ARROW_LABEL_FONT_SIZE

    data["appState"]["viewBackgroundColor"] = CANVAS_BG
    return data


# ── File I/O ──────────────────────────────────────────────────────────────────

def process_file(path: Path) -> Path:
    with open(path) as f:
        data = json.load(f)

    restyled = restyle(data)

    out_path = path.with_stem(path.stem + "-restyled")
    with open(out_path, "w") as f:
        json.dump(restyled, f, indent=2)

    return out_path


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 restyle_excalidraw.py <file.excalidraw | directory>")
        sys.exit(1)

    target = Path(sys.argv[1])

    if target.is_dir():
        files = sorted(target.glob("*.excalidraw"))
        if not files:
            print(f"No .excalidraw files found in {target}")
            sys.exit(1)
        print(f"Found {len(files)} file(s) in {target}\n")
        for f in files:
            out = process_file(f)
            print(f"  ✓  {f.name}  →  {out.name}")

    elif target.is_file():
        out = process_file(target)
        print(f"✓  {target.name}  →  {out.name}")

    else:
        print(f"Error: {target} is not a file or directory")
        sys.exit(1)

    print("\nDone. Open the -restyled files in Excalidraw to preview.")
    print("Tip: export SVG with 'Embed fonts' checked to lock in the clean look.")


if __name__ == "__main__":
    main()
