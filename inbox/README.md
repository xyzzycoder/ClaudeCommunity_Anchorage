# inbox

Drop folder. Put new scans, photos, or documents here and they get filed into
`assets/` and, where relevant, into the wall.

**This folder should normally be empty.** Anything left here has not been
processed yet.

## What happens to what you drop

| You drop | Where it ends up | How |
|---|---|---|
| `scan*.jpg` — flatbed scans of cards | `assets/scans/` (local only, git-ignored) and `assets/cards-master/` (one image per card, tracked) | `python3 scripts/split_cards.py` — needs a row/column entry in that script's `LAYOUT` table |
| `*.heic` / `*.jpg` — phone photos of a card | `assets/prior-sessions/originals/` and `assets/cards-master/` | converted with `sips`, cropped, then read and transcribed by hand |
| `*.md` — transcriptions | `assets/OCR/` | copied as-is, kept as provenance |

A card only reaches the wall once it has an entry in `src/data.js` — image,
transcription, the writer's own Hope/Fear/Question label, three tradeoffs, and
an honest note on where the tool might be wrong. That last part is written, not
generated, so adding a card is a deliberate act rather than a drop.
