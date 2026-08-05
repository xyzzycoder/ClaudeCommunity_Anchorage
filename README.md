# The Wall

**Questions Anchorage asked about AI — and a way to think them through.**

Built on August 4, 2026 at the [Claude Impact Lab](memory/00-context/event-brief.md)
at Alaska Pacific University, by a team that met that afternoon:

**Mary · Sam · Anna · Teresa · Cory · ✳ Megan ✳ · Aaron**

Six of the cards here were written on the day of the build rather than at the July
session — ✳ **Megan** walked the room and brought them back from other teams. They
are marked as hers on the wall.

---

## What it is

On July 21, 2026, about fifty people in Anchorage each wrote a hope, a fear, or a
question about AI on an index card and pinned it to a board. The room's closing
question was *where should Alaska start?* — and the answer was education and access.

This is thirty-eight of those cards, in the original handwriting. Pick one, answer three
questions, and you get:

- **the tradeoffs**, named honestly
- **three questions to ask yourself** — drawn from the three answers you gave
- **where this might be wrong**, including where this tool itself is the problem

**It does not answer the questions.** That's the design, not a shortcut. One of the
cards on the wall asks how we make these tools *"resist us, to make us stronger
rather than making us more comfortable."* We took that literally.

## Run it

```bash
open src/index.html
```

No server, no build step, no dependencies, no API key. It works with the network
unplugged. Nothing a visitor taps is stored, logged, or transmitted.

## How it's built

One static HTML page, vanilla CSS and JS, ~420 KB. Content lives in
[`src/data.js`](src/data.js) — as a script rather than JSON so the page works from
`file://`, where `fetch()` of a local file is blocked.

**The guardrails are structural, not prompt-level.** There is no free-text input:
the only things a visitor can do are pick a card and tap three buttons. Off-topic
input isn't rejected — it isn't expressible. Turns are bounded at three. The output
always renders the same three sections. See
[memory/03-build/architecture.md](memory/03-build/architecture.md) for the full
reasoning.

## Repo layout

| Path | What |
|---|---|
| `src/` | The app. Start at `index.html`. |
| `src/flyover.*` | An experiment, not part of the app — see below |
| `src/cards/` | The eleven cards, cropped from the board photo |
| `memory/` | Project memory — context, decisions, learnings, handoff |
| `assets/` | Source material: the board photo, event screenshots |
| `scripts/` | `capture_pasted_assets.py` — persists files pasted into a Claude session |

**Start with [`memory/README.md`](memory/README.md)** if you're picking this up
cold. It has a read-this-first order and a decision log explaining why the project
is shaped the way it is.

## The handwriting experiment

`src/flyover.html` is a side experiment, deliberately **not linked from the app**.
It loads the same wall and adds a hover panel with a note on each card's
handwriting.

Two rules governed every note in `src/flyover.js`, and they're restated at the top
of that file:

1. **Graphology is not a real science.** It tells you nothing about a person's
   character, and the panel says so on screen.
2. **These are strangers who wrote something honest.** Every note is about the
   marks on the page — pressure, slant, corrections, what happened when someone
   ran out of room — and any leap beyond that is visibly a joke at nobody's
   expense.

The test while writing was *would this make its writer wince if they read it over
your shoulder?* Several drafts got cut on exactly that. If you extend it, keep the
test.

Delete `src/flyover.html`, `src/flyover.css` and `src/flyover.js` and the app is
untouched.

## Credit and consent

The cards were written by attendees of the July 21 Anchorage session. **No card
writer is named anywhere in this repo or in the app**, and card images are used as
the record of what a community asked — not as anyone's personal statement.

If you wrote one of these cards and would rather it not be here, that's a good
enough reason: open an issue or contact the team and it comes down.
