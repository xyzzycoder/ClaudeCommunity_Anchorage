# Worklog

Running log. Timestamps AKDT, 24h. Append at the bottom. Keep entries to a line
or two — this is for "when did that break," not prose.

| Time | Entry |
|---|---|
| 13:47 | Memory folder scaffolded. |
| 13:49 | July 21 card-wall photo captured to `assets/prior-sessions/`; 4 event screenshots to `assets/pasted/`. |
| 13:52 | Card wall transcribed (11 vote cards, ~40 hope/fear/question cards). Candidate directions drafted in charter. |
| 14:40 | 11 cards cropped from the board photo to `src/cards/`; one dropped as unreadable. Transcription fixes: "resist us" (not "resistive"), brains card ends "...help people with disabilities." |
| 15:05 | **Walking skeleton done.** Wall → interview → three-part output works end to end. Zero network calls, zero dependencies, opens from `file://`. |
| 14:05 | **Project chosen** — guided companion for hard questions, seeded from the card wall. Cut nine topics to three. D-003/004/005 recorded; charter filled. |
| 15:20 | Repo initialized and pushed public: `xyzzycoder/ClaudeCommunity_Anchorage`. Card-consent question raised; Aaron's call to publish everything (D-007). |
| 15:28 | **Tagged `v0.1.0` — first functional demo.** Annotated tag pushed; lists what works and what's explicitly out. |
| 16:20 | Inbox processed. 66 master card images split from 37 flatbed scans (`scripts/split_cards.py`). Seam-line detection failed twice — scans have inconsistent rules — so the splitter is driven by an explicit layout table taken from the OCR. |
| 17:00 | 5 HEIC cards (photographed today, never OCR'd) converted, cropped off the countertop, transcribed, and added. |
| 17:10 | **Card set expanded 11 -> 37 across 6 topics.** 999 answer paths validated, zero missing content. Grid normalised to 3:2 crops. |
| 17:35 | **Crops redone to show whole cards.** Ink-tight trimming was clipping the printed starburst and flattening every card to the same shape; a forced 3:2 ratio was worse. Now: proportional margin, no target ratio. |
| 17:40 | Restored the original corkboard-photo crops for 10 cards — pushpins, tilt, board edge. Wall is now board photos + flatbed scans + phone photos, deliberately uneven. |
| 18:20 | **Full OCR verification pass** — re-read all 37 card images against stored text. Found one real defect: the `not-challenged` crop contained a second, unlogged card. |
| 18:25 | Recovered that card (`regulatory-capture`) — 38 cards. Writers' own Hope/Fear/Question labels now shown, including 4 cards labelled with more than one. |
| 18:45 | Team credited in the app, README and roster: Mary, Sam, Anna, Teresa, Cory, **Megan** (in stars), Aaron. Q2 closed. |
| 18:50 | Inbox filed and cleared — scans to `assets/scans/`, phone originals to `assets/prior-sessions/originals/`, OCR to `assets/OCR/`. `inbox/README.md` documents the drop-folder workflow. |
| 18:55 | New card added from the floor: *"How can we put the genie back in the bottle if things get out of hand?"* — **39 cards**, 1053 paths. |
| 19:05 | Original scans untracked (`assets/scans/` git-ignored). Tracked content 124 MB → 43 MB. Files kept on Aaron's disk; still present in git history. |
| | |

## Blockers hit

| Time | Blocker | Resolution |
|---|---|---|
| | | |
