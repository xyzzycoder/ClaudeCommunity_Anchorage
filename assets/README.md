# Assets

Source material for the project. Everything pasted into a Claude session or
dropped in from a phone gets persisted here — session transcripts are not storage.

## Contents

### `prior-sessions/`

| File | What it is |
|---|---|
| `2026-07-21-cards-IMG_6011.HEIC` | Original iPhone photo of the July 21 Anchorage session card wall — ~50 index cards (hopes / fears / questions, plus 11 "where should Alaska start" cards) |
| `2026-07-21-cards-IMG_6011.jpg` | JPG conversion of the above, for tools that can't read HEIC |

Transcribed in
[memory/00-context/prior-session-2026-07-21-cards.md](../memory/00-context/prior-session-2026-07-21-cards.md).

### `pasted/`

Screenshots of the Luma event page for **Anchorage | Claude Impact Lab**
(2026-08-04), extracted from the session transcript. Named
`paste-<seq>-<sha256-prefix>.<ext>`.

| File | Shows |
|---|---|
| `paste-001-*.webp` | Day schedule (12:00–7:30), what to bring, guest ticket note |
| `paste-002-*.webp` | "About Event" — the brief, and the July 21 backstory |
| `paste-003-*.webp` | Location (APU Atwood Center), hosts, start of About |
| `paste-004-*.webp` | Event header, date/time, ticket status |

Summarized in [memory/00-context/event-brief.md](../memory/00-context/event-brief.md).

### `scans/` — not in the repo

The 37 original flatbed scans live here locally but are **git-ignored**. They are
only needed to re-run `scripts/split_cards.py`; everything downstream of them is
tracked — the per-card masters in `cards-master/` and the images the app serves in
`src/cards/`.

If you need to re-split, get the scans from whoever ran the scanner. If you only
need the cards, you already have them.

## Adding more

Pastes into the Claude session:

```bash
python3 scripts/capture_pasted_assets.py
```

Content-hash deduped, so re-running only picks up what's new. Files referenced by
path (like a photo in `~/Downloads`) get copied in manually — put them in a
descriptive subfolder and add a row above.

HEIC photos: convert for readability with

```bash
sips -s format jpeg input.HEIC --out output.jpg
```
