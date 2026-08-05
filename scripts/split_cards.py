#!/usr/bin/env python3
"""Split the July 21 flatbed scans into one master image per card.

The scans place 1–4 cards per page. Automatic detection was tried twice and
rejected: scanner seam lines are inconsistent (sometimes light, sometimes only
partial), and splitting purely on whitespace also splits the gaps *within* a
card's own paragraphs. The OCR pass already established the layout of every
scan, so that is the source of truth here — LAYOUT below records rows × columns
per scan, and we take the widest interior gaps to place the cuts.

The input scans are NOT in the repo (assets/scans/ is git-ignored — they were
14 MB of source for images that are already committed downstream). This script
is kept because it documents how the card images were produced and because it
can be re-run if the scans are ever restored.

Usage:
    python3 scripts/split_cards.py [--src inbox] [--out assets/cards-master]
"""

import argparse
import pathlib
import sys

try:
    import numpy as np
    from PIL import Image
except ImportError:
    sys.exit("needs Pillow and numpy:  pip3 install pillow numpy")

INK = 205        # pixel value below this counts as content
PAD = 45         # whitespace kept around trimmed content, px
NOISE = 0.004    # a row/col with less ink than this counts as blank
MARGIN = 0.09    # card margin kept around the ink, as a fraction of the panel

# scan stem -> (rows, cols), from inbox/OCR/. Anything unlisted is a single card.
LAYOUT = {
    # closing cards — "<city> finds hope in hard questions by tackling ___ first"
    "scan20260722": (2, 1),
    "scan20260722_20260722112109": (2, 1),
    "scan20260722_20260722113202": (2, 1),
    "scan20260722_20260722113418": (2, 1),
    "scan20260722_20260722113513": (2, 1),
    "scan20260722_20260722113614": (1, 1),
    # table worksheets — full printed pages, never split
    "scan20260722_20260722113737": (1, 1),
    "scan20260722_20260722113755": (1, 1),
    "scan20260722_20260722113815": (1, 1),
    "scan20260722_20260722113836": (1, 1),
    "scan20260722_20260722113857": (1, 1),
    "scan20260722_20260722113916": (1, 1),
    "scan20260722_20260722113948": (1, 1),
    "scan20260722_20260722114009": (1, 1),
    "scan20260722_20260722114034": (1, 1),
    "scan20260722_20260722114052": (1, 1),
    # the question wall
    "scan20260722_20260722114129": (2, 1),
    "scan20260722_20260722114204": (2, 1),
    "scan20260722_20260722114231": (2, 1),
    "scan20260722_20260722114258": (2, 1),
    "scan20260722_20260722114323": (5, 1),  # one dense hope/fear + four short entries
    "scan20260722_20260722114345": (2, 1),
    "scan20260722_20260722114423": (2, 1),
    "scan20260722_20260722114450": (2, 1),
    "scan20260722_20260722114515": (2, 1),
    "scan20260722_20260722114539": (2, 1),
    "scan20260722_20260722114603": (2, 1),
    "scan20260722_20260722114640": (2, 1),
    "scan20260722_20260722114703": (2, 1),
    "scan20260722_20260722114727": (2, 1),
    "scan20260722_20260722114809": (2, 1),
    "scan20260722_20260722114848": (2, 2),  # 2x2 arrangement
    "scan20260722_20260722115027": (1, 2),  # side by side
    "scan20260722_20260722115108": (1, 2),
    "scan20260722_20260722115140": (1, 2),
    "scan20260722_20260722115204": (3, 1),  # AI-usage card + regulatory-capture body + its tail line
    "scan20260722_20260722115224": (2, 1),
}


def runs(flags):
    """Contiguous True runs in a bool list -> [(start, end_exclusive), ...]."""
    out, start = [], None
    for i, f in enumerate(flags):
        if f and start is None:
            start = i
        elif not f and start is not None:
            out.append((start, i))
            start = None
    if start is not None:
        out.append((start, len(flags)))
    return out


def cuts_for(arr, axis, want):
    """Place `want - 1` cuts at the widest interior blank bands along `axis`."""
    if want < 2:
        return []
    ink = (arr < INK).mean(axis=1 - axis)
    n = len(ink)
    gaps = [
        (b - a, (a + b) // 2)
        for a, b in runs([v < NOISE for v in ink])
        if a > 0 and b < n                      # skip the page margins
    ]
    gaps.sort(reverse=True)
    return sorted(mid for _, mid in gaps[: want - 1])


def panels(length, cuts):
    bounds = [0, *cuts, length]
    return list(zip(bounds, bounds[1:]))


def card_box(panel):
    """The card's extent within this panel: the ink, generously padded.

    The cards are white on a white scanner bed, so the physical card edge is
    genuinely undetectable — only the ink is. Two earlier attempts were wrong in
    opposite directions: cropping tight to the ink clipped the printed starburst
    and left every card the same shape, and forcing a 3:2 index-card ratio
    produced absurd crops whenever the panel could not accommodate it.

    So: pad by a fraction of the panel rather than a fixed number of pixels, and
    let each card end up whatever shape it ends up. A card someone filled with
    seven lines and a card holding one question are not the same shape, and the
    difference is the point — it is evidence a person wrote it.
    """
    w, h = panel.size
    g = panel.convert("L")
    bbox = g.point(lambda v: 255 if v < INK else 0).getbbox()
    if not bbox:
        return None
    l, t, r, b = bbox
    if (r - l) < 150 or (b - t) < 70:
        return None

    pad = max(int(MARGIN * min(w, h)), PAD)
    return (max(l - pad, 0), max(t - pad, 0), min(r + pad, w), min(b + pad, h))


def split(path, out_dir):
    rows, cols = LAYOUT.get(path.stem, (1, 1))
    im = Image.open(path).convert("RGB")
    arr = np.asarray(im.convert("L"))

    written, n = [], 0
    for t, b in panels(im.height, cuts_for(arr, 0, rows)):
        band = arr[t:b]
        for l, r in panels(im.width, cuts_for(band, 1, cols)):
            panel = im.crop((l, t, r, b))
            box = card_box(panel)
            if box is None:
                continue
            panel = panel.crop(box)
            n += 1
            dest = out_dir / f"{path.stem}-{n}.jpg"
            panel.save(dest, quality=88, optimize=True)
            written.append(dest.name)
    return written


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", type=pathlib.Path, default=pathlib.Path("inbox"))
    ap.add_argument("--out", type=pathlib.Path, default=pathlib.Path("assets/cards-master"))
    args = ap.parse_args()

    args.out.mkdir(parents=True, exist_ok=True)
    scans = sorted(args.src.glob("scan*.jpg"))
    if not scans:
        sys.exit(f"no scan*.jpg under {args.src}")

    total = 0
    for scan in scans:
        made = split(scan, args.out)
        total += len(made)
        want = LAYOUT.get(scan.stem, (1, 1))
        flag = "" if len(made) == want[0] * want[1] else "   <-- CHECK"
        print(f"{scan.name}  ->  {len(made)}/{want[0] * want[1]}{flag}")
    print(f"\n{total} master images from {len(scans)} scans -> {args.out}")


if __name__ == "__main__":
    main()
