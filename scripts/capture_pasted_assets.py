#!/usr/bin/env python3
"""Extract images and documents pasted into a Claude Code session into assets/.

Pasted files live as base64 blocks inside the session transcript (JSONL). This
pulls them out so they survive the session. Safe to re-run: files are named by a
content hash, so re-running after new pastes only adds what's new.

Usage:
    python3 scripts/capture_pasted_assets.py [--session PATH] [--out DIR]
"""

import argparse
import base64
import hashlib
import json
import pathlib
import sys

PROJECT = pathlib.Path(__file__).resolve().parent.parent
TRANSCRIPT_DIR = pathlib.Path.home() / ".claude/projects/-Users-amorse-Source-ClaudeCode-ClaudeCommunity"

EXT = {
    "image/webp": ".webp",
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
    "application/pdf": ".pdf",
    "text/plain": ".txt",
    "text/markdown": ".md",
}


def newest_transcript():
    files = sorted(TRANSCRIPT_DIR.glob("*.jsonl"), key=lambda p: p.stat().st_mtime)
    if not files:
        sys.exit(f"no transcript found in {TRANSCRIPT_DIR}")
    return files[-1]


def blocks(transcript):
    """Yield (media_type, raw_bytes) for every pasted image/document block."""
    for line in transcript.open():
        try:
            entry = json.loads(line)
        except json.JSONDecodeError:
            continue
        if entry.get("type") != "user":
            continue
        content = (entry.get("message") or {}).get("content")
        if not isinstance(content, list):
            continue
        for block in content:
            if not isinstance(block, dict):
                continue
            if block.get("type") not in ("image", "document"):
                continue
            source = block.get("source") or {}
            if source.get("type") != "base64":
                continue
            media = source.get("media_type", "application/octet-stream")
            try:
                yield media, base64.b64decode(source["data"])
            except (KeyError, ValueError):
                continue


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--session", type=pathlib.Path, default=None)
    ap.add_argument("--out", type=pathlib.Path, default=PROJECT / "assets/pasted")
    args = ap.parse_args()

    transcript = args.session or newest_transcript()
    args.out.mkdir(parents=True, exist_ok=True)

    existing = {p.stem.split("-")[-1] for p in args.out.iterdir() if p.is_file()}
    written, skipped = 0, 0
    for seq, (media, raw) in enumerate(blocks(transcript), start=1):
        digest = hashlib.sha256(raw).hexdigest()[:12]
        if digest in existing:
            skipped += 1
            continue
        path = args.out / f"paste-{seq:03d}-{digest}{EXT.get(media, '.bin')}"
        path.write_bytes(raw)
        existing.add(digest)
        written += 1
        print(f"wrote {path.relative_to(PROJECT)} ({len(raw):,} bytes, {media})")

    print(f"\n{written} new, {skipped} already captured -> {args.out.relative_to(PROJECT)}")


if __name__ == "__main__":
    main()
