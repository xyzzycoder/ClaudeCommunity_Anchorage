# Decision Log

Append-only. One entry per decision that would be expensive to reverse or that a
newcomer would otherwise re-litigate.

Format:

```
## D-00N — <decision, stated as the thing we're doing>
- **When:** HH:MM AKDT
- **Decided by:** <who was in the conversation>
- **Context:** what forced the choice
- **Alternatives:** what we didn't pick, and why not
- **Consequence:** what this commits us to
- **Revisit if:** the condition that would make us change our minds
```

---

## D-001 — Keep project memory as a hierarchy of markdown files under `memory/`

- **When:** 13:47 AKDT
- **Decided by:** Aaron
- **Context:** Team of strangers, ~4h build, a demo to non-technical guests, and a
  next cohort that will inherit this. Learnings evaporate unless written down live.
- **Alternatives:** single running notes file (loses structure fast); nothing
  (default outcome — nothing survives the day).
- **Consequence:** Claude maintains these files during the session; every decision
  and surprise gets a home.
- **Revisit if:** upkeep starts costing build time.

## D-002 — Persist pasted images and documents into `assets/`

- **When:** 13:50 AKDT
- **Decided by:** Aaron
- **Context:** Source material (event page, prior-attendee notes) is arriving as
  pastes, which live only in the session transcript.
- **Consequence:** `scripts/capture_pasted_assets.py` extracts pastes to
  `assets/pasted/`; re-runnable and content-hash deduped.
- **Revisit if:** pastes start including anything not meant to be kept on disk.

---

## D-003 — Build a guided companion for hard questions about AI, seeded from the July 21 card wall

- **When:** 14:05 AKDT
- **Decided by:** Aaron (team assumed in agreement)
- **Context:** About half the July 21 cards were *questions*, not fears — the room's
  dominant state is confusion and risk-aversion, which is addressable in an
  afternoon. Aaron proposed an interactive/guided tool covering nine topics.
- **Alternatives:** district policy starter, teacher classroom aid, Anchorage
  access map (see the candidate table in `charter.md`). Also considered and
  rejected: a straight FAQ / static decision tree about what AI can and can't do —
  generic, non-local, and the exact "makes us comfortable rather than stronger"
  failure the room warned about.
- **Consequence:** commits us to the three-part output structure (tradeoffs ·
  questions to ask yourself · where this might be wrong) and to using real card
  images as entry points.
- **Revisit if:** the output starts reading as a verdict — that means we've drifted
  into the thing we set out not to build.

## D-004 — Cut from nine topics to three

- **When:** 14:05 AKDT
- **Decided by:** Aaron, on recommendation
- **Context:** Aaron's original list had nine topics. ~3h45m of build time remains.
- **Alternatives:** all nine, shallow.
- **Consequence:** in scope — **kids & parenting · reliance vs. cognitive
  development · where AI gets things wrong**. The other six become the "what's
  next" slide, which makes the demo read as intentional.
- **Revisit if:** never today. If branches start multiplying after 3:00, that's the
  scope cut arriving early — refuse it.

## D-005 — Show the real handwritten cards, anonymously

- **When:** 14:05 AKDT
- **Decided by:** Claude, as a default in Aaron's absence of an explicit answer
- **Context:** Open question was whether users see the actual card image or just
  transcribed text.
- **Consequence:** the handwriting is the proof that a neighbor asked this, not a
  content team. No names shown.
- **Revisit if:** legibility hurts the demo, or a card writer objects — several are
  expected in the room tonight.

---

## D-006 — Adopt the "extroverted interviewer" persona; stage voice as output-only

- **When:** 14:22 AKDT
- **Decided by:** Aaron proposed a conversational vocal interface; scoped on recommendation
- **Context:** Aaron's framing — the AI as an engaging interviewer drawing the user
  out, rather than a tool the user queries. Two separable ideas were bundled: the
  **persona** and the **voice modality**.
- **Decision:**
  - **Persona: adopt now.** The flow becomes a short interview — the tool asks, the
    user answers. Nearly free (prompt + copy change) and it strengthens the thesis:
    an interviewer that asks questions *is* the anti-verdict design, not a coat of
    paint on it.
  - **Voice out (TTS): adopt.** Browser `speechSynthesis` — local, no key, no
    network, no recognition failure mode. ~20 minutes of work.
  - **Voice in (STT): stretch goal, gated at 16:15.** Not on the demo path.
- **Alternatives:** full two-way voice. Rejected for tonight because:
  1. **Room acoustics.** 6:00 PM demo, pizza, multiple teams, guests talking.
     Speech recognition in a loud room is the classic demo failure, and it's
     physics, not engineering.
  2. **It removes our strongest guardrail.** An open mic is free-text input by
     another name — unbounded, and you can't offer buttons to constrain it.
     See guardrail #1 in `../03-build/architecture.md`.
  3. **It kills the cache.** Finite inputs are what make pre-generating every path
     possible; that cache is our wifi-proof demo fallback.
  4. **Latency.** STT → model → TTS on shared venue wifi. Every pause reads as
     broken to an audience.
  5. **Time.** Voice turn-taking (when to stop listening, handling interruptions)
     is a known all-afternoon sink.
- **Consequence:** the tool *speaks* and feels conversational, while input stays
  structured — so every guardrail and the pre-generated cache survive intact.
  Degrades gracefully: if the room is too loud for the stretch mic, buttons still
  work and nobody watching can tell something was cut.
- **Also gained:** voice output is an accessibility win, which connects to the
  July 21 card hoping AI would "help people with disabilities," and to the Access
  thread generally.
- **Revisit if:** the room turns out to be quiet and we're ahead of schedule at
  16:15 — then try the mic as a bonus, never as the demo path.

---

## D-007 — Publish the repo publicly, including all card images

- **When:** 15:20 AKDT
- **Decided by:** Aaron, after the consent concern was raised
- **Context:** The repo contains ~50 attendees' handwriting — 11 cropped cards used
  by the app, plus the full board photo. Several cards are personal ("my kids 9,
  12, 15", "my grandchildren"). A public push is permanent and indexable, and the
  hosts had not yet weighed in (Q9).
- **Alternatives:** private repo until hosts confirm; public minus the full board
  photo; hold the push entirely.
- **Consequence:** repo is public at
  `github.com/xyzzycoder/ClaudeCommunity_Anchorage`. Mitigations in place: no card
  writer is named anywhere, and `README.md` carries a plain-language takedown offer.
- **Still worth doing:** mention it to Kyle and Blythe tonight. Cheap now,
  awkward later.
- **Revisit if:** a card writer objects — honor it immediately, no discussion needed.

---

## D-008 — Expand from 3 topics to 6, and 11 cards to 37

- **When:** 17:10 AKDT
- **Decided by:** Aaron — asked for the full question-and-answer map once better
  source material arrived
- **Context:** The inbox delivered flatbed scans of the whole room (closing cards,
  table worksheets, the full question wall) plus a complete OCR pass, and five
  cards photographed today that had never been transcribed.
- **Consequence:** reverses the narrowing in [D-004](#d-004--cut-from-nine-topics-to-three).
  Topics are now kids & school · reliance vs. thinking · when it's wrong · work &
  the ladder · power & sovereignty · environment & cost. Aaron's original nine
  topics are effectively covered.
- **Why this is safe now and wasn't at 14:05:** the cut existed because authored
  content is the expensive part under time pressure. The OCR removed the
  transcription cost, and the per-topic prompt design means 6 topics cost 54 short
  lines rather than 6 × 27 authored responses.
- **Revisit if:** never today. The freeze still holds at 17:15.

---

## D-009 — Let the card images stay uneven

- **When:** 17:40 AKDT
- **Decided by:** Aaron
- **Context:** The flatbed scans were being cropped tight to the handwriting and
  then normalised in CSS to a uniform 3:2 grid. It looked tidy and read as stock
  photography. Aaron's note: the earlier corkboard crops were *endearing* precisely
  because they were inconsistent.
- **Consequence:** three sources now coexist on the wall on purpose —
  1. **corkboard photo** (10 cards): pushpins, tilt, board edge
  2. **flatbed scans** (22 cards): clean, square-on, varied by how much was written
  3. **phone photos** (5 cards): countertop visible, shot on the day
  The CSS grid became a masonry column layout so nothing is stretched or cropped
  to fit. 32 distinct aspect ratios across 37 cards.
- **Why it matters beyond taste:** the whole product rests on these being real
  cards written by real neighbours. Uniformity actively undercuts that claim.
- **Revisit if:** a card becomes illegible at wall size — legibility wins over
  character.

---

## D-010 — Keep the original scans out of the repo

- **When:** 19:05 AKDT
- **Decided by:** Aaron
- **Context:** Filing the inbox committed 14 MB of flatbed scans, pushing the repo
  to 124 MB. They are pure source: everything derived from them — the per-card
  masters and the images the app serves — is already tracked.
- **Consequence:** `assets/scans/` is git-ignored. Tracked content drops from
  ~124 MB to ~43 MB. `scripts/split_cards.py` can no longer be re-run from a fresh
  clone, so the `LAYOUT` table in it and the masters in `assets/cards-master/`
  become the record of how the cards were cut.
- **Not done:** the scans remain in git *history*, so a fresh clone still pays for
  them. Purging requires rewriting history and force-pushing a public branch —
  destructive, and not something to do unasked.
- **Revisit if:** clone size actually becomes a problem, or the scans need
  re-splitting (get them from whoever ran the scanner).

---

## D-011 — Keep the handwriting flyover as an unlinked experiment

- **When:** 19:45 AKDT
- **Decided by:** Aaron
- **Context:** Asked for a "flyover display (humorous but respectful/kind) of
  handwriting analysis" on each card, explicitly as something to look at rather
  than ship. It landed well, so it stays.
- **Consequence:** three files — `src/flyover.{html,css,js}` — sharing the app's
  data and styles but **not linked from `index.html`**. Reachable by URL, invisible
  to a demo visitor. Deleting the three files leaves the app untouched.
- **The constraint that shaped it:** graphology is pseudoscience, and these cards
  were written by strangers who will be in the room. Every note is an observation
  about marks on paper; the panel states on screen that handwriting analysis tells
  you nothing real about a person. The authoring test — *would this make its writer
  wince if they read it over your shoulder?* — is written into the top of
  `flyover.js` so it survives whoever edits it next.
- **Revisit if:** anyone wants it linked from the app. That's a different decision
  from keeping it in the repo, and it should be made with the hosts, not by us.

---

## D-012 — Say only what the sources support about July 21

- **When:** 20:10 AKDT
- **Decided by:** Aaron, who asked to check before speaking
- **Context:** The first draft of the pitch contained three claims that did not
  survive an audit against the actual sources.
- **What was wrong:**
  1. *"About fifty people."* Invented — inferred from the card count. The only
     sourced phrase is the event page's **"a full room."** Attendees were asked for
     three items each, so 48 entries could be ~16 people.
  2. *"Every label was written by the person holding the pen."* False. Only **8 of
     39** cards carry an explicit Hope/Fear/Question heading. We assigned the rest.
  3. *"We counted the room: 30 / 12 / 4."* That counted **our 39 selected cards**,
     six of them written on August 4 — not the July room.
- **Consequence:** the demo script now carries a sourced/not-sourced table, the
  app's About dialog and the README were corrected, and the honest version of the
  finding (~24 of 48 entries read as questions, about twice the fears) is what
  gets said.
- **The general rule:** our topic assignments and most kind labels are **editorial,
  not measurement.** Anything phrased as a count needs to name what was counted.
- **Revisit if:** anyone gets real attendance numbers from the hosts.

---

## D-013 — _next decision goes here_
