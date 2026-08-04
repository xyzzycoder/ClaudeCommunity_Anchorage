# Architecture

Proposed 14:15. ✅ **Built and verified end to end at 15:05.**

## What it is

A web **card wall**: a digital version of the physical July 21 corkboard. You pick
a real handwritten card, and it opens into a short guided conversation that ends in
the three-part output. One static page, no server, no key.

The card wall is not decoration — it is the guardrail. A wall of finite, curated
cards can't be taken off-topic the way a chat box can.

## Guardrails — what the word actually means here

Ranked by strength. **Structural guardrails are cheap and hard; prompt guardrails
are expensive and soft.** Lean on the top of this list.

| # | Guardrail | Kind | Cost | Strength |
|---|---|---|---|---|
| 1 | **No free-text input in v1.** Entry is card selection; orienting questions are buttons | Structural | Free | Hard — off-topic input is not expressible |
| 2 | **Bounded turns.** Card → 2–3 orienting choices → one output. No open-ended loop | Structural | Free | Hard — caps cost and drift |
| 3 | **Fixed output contract.** Every response renders the same three sections, always | Structural | Free | Hard — it's the markup, not a prompt |
| 4 | **Curated card set.** ~9–12 cards we've read, not all ~50 | Editorial | Low | Hard |
| 5 | **Scope refusals.** No medical, legal, or mental-health advice; no telling a parent what to decide | Prompt + keyword check | Low | Soft |
| 6 | **Anti-verdict tone.** The project thesis — output informs judgment, never issues one | Prompt + human review | Human time | Softest — needs a person reading outputs at 4:30 |

Guardrail 1 is the whole design. Adding a free-text box would remove the strongest
protection we have and cost us the most build time. **Don't.**

## Flow

Revised 14:22 — the orienting questions become a short **interview** (see
[D-006](../01-project/decisions.md)). The tool asks; the user answers.

```
card wall  →  pick a card  →  interview: 3 questions, spoken aloud   →  response
                              answered by tap (3 options each)          ├─ the tradeoffs, named
                                                                        ├─ three questions to ask yourself
                                                                        └─ where this tool might be wrong
```

**Voice is output-only.** `speechSynthesis` reads each question aloud — local, no
key, no network, no recognition failures. Input stays structured, which is what
keeps guardrail #1 and the cache intact. Mic input is a stretch goal gated at
16:15, never on the demo path.

**Keep the tree shallow — this is a hard constraint, not a preference.** As built:
the three questions you leave with *are* your three answers, mapped one-to-one
(9 authored prompts per topic). So the output genuinely varies with what you tap,
without needing 27 authored responses per card. If the interview ever starts
adapting freely, that property is the first thing lost.

## Stack

| Layer | Choice | Why |
|---|---|---|
| UI | Single static HTML page, vanilla CSS/JS, no build step | Runs anywhere; a non-developer on the team can read all of it — and someone has to explain it at 6:00 |
| Cards | Cropped from `assets/prior-sessions/2026-07-21-cards-IMG_6011.jpg` | The handwriting is the proof a neighbor asked this |
| Generation | **Authored content, shipped in `data.js`.** No API key needed or used | No key was available; this turned out to be the stronger demo — see below |
| Fallback | Not needed — there is no live path to fall back *from* | The whole page is the fallback |

**How this landed:** the plan was live generation with a pre-generated cache as the
wifi-proof fallback. No API key was available, so we built the cache *as* the
product — content authored into `data.js`. The result is strictly safer for a 6:00
demo in a room full of people on shared wifi: there is no live path that can fail.

The tradeoff we accepted: at an AI event, a fully static page invites the question
*"is this actually AI-powered?"* Answer honestly — the content was written by Claude
and the whole thing was built with Claude Code in an afternoon; what ships is a
finite, reviewed set rather than live calls, because every response a stranger sees
tonight is one a human on our team has read. That's a defensible choice, not a
limitation to hide.

## Data

- Card images and transcriptions from the July 21 wall.
- **Nothing the user does is stored.** No accounts, no logging of selections.
- No real personal data anywhere (working agreement).

## Known limitations — say these in the demo

- Curated card subset, not the full wall.
- Three topics of Aaron's original nine.
- Content is authored and finite, not generated live per visitor.
- Voice is output-only; there is no microphone input.

## Build order

| Time | Step | Gate |
|---|---|---|
| 14:30–15:15 | Crop ~9–12 cards; static wall renders | You can see the wall in a browser |
| ✅ 15:05 | Guided flow + output contract | One path works end to end |
| 15:15–16:15 | Content pass on the remaining cards; read every word aloud | No sentence sounds like a verdict |
| 16:45–17:15 | **Tone test with a real parent or teacher in the room** | Someone who isn't us says it isn't preachy |
| 17:15 | Freeze | Rehearsal only |

## How to run it

```bash
open src/index.html
```

That's it. No server, no install, no key. A local server is also configured
(`.claude/launch.json`, port 8787) but is only a convenience for development.

**Verified 15:05:** wall → interview → three-part output, no console errors, and
`grep` confirms zero `fetch`/`XHR`/`http` references in the source. 420 KB total,
15 files.

**Why `data.js` and not `data.json`:** `fetch()` of a local file is blocked by CORS
under `file://`. Loading content as a `<script>` is what makes the offline demo
actually work. Don't "fix" this into a JSON fetch.

## Repo

_TBD_
