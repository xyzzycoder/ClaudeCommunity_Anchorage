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

## D-007 — _next decision goes here_
