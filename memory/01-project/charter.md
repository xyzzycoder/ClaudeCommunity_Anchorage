# Project Charter

The one-pager. If this file is wrong, everything downstream is wasted.

**Chosen 14:05.** Design rationale: [idea-guided-questions.md](idea-guided-questions.md).
Decision record: [D-004](decisions.md).

## One-line pitch

**A guided companion for hard questions about AI** that helps **an Anchorage parent,
teacher, or neighbor** **think through their own actual situation** so that **they
leave with better judgment — not just an answer they took on faith.**

Entry point is a real handwritten question from the July 21 card wall.

## The problem

- **Who specifically has it:** the ~50 people who filled out cards on July 21.
  About half wrote *questions*, not fears. Confusion and risk-aversion, not
  opposition.
- **How we know it's real:** the cards are transcribed in
  [../00-context/prior-session-2026-07-21-cards.md](../00-context/prior-session-2026-07-21-cards.md).
  Some of the writers will be in the room at 6:00 PM tonight.
- **What they do today instead:** ask nobody, or search and get generic
  internet content written for a general audience with no stake in their situation.

## Users

| User | What they need | How they'd reach it |
|---|---|---|
| **Parent** (primary) | What to say to a 9 / 12 / 15-year-old, without pretending to certainty they don't have | Picks the card that matches their worry |
| **Teacher / school staff** | Guidance that costs them zero prep time | Same entry, different situation |
| **Curious neighbor** | Permission to be uncertain, and a way to reason about it | Browses the wall, finds their own fear reflected |

## Scope

**In — must exist by 5:15 PM:**
- Browse/select a real card from the July 21 wall (handwriting shown)
- 2–3 orienting questions to establish the user's actual situation
- Generated response in the fixed three-part structure:
  1. the tradeoffs, named honestly
  2. three questions to ask yourself
  3. where this tool might be wrong
- Coverage of the three chosen topics: **kids & parenting · reliance vs. cognitive
  development · where AI gets things wrong**

**Out — explicitly not doing today:**
- The other six topics from Aaron's original list (they become the "what's next" slide)
- Accounts, saving, history
- Anything that stores what a user typed
- A general-purpose chat box

**Nice-to-have if time remains:**
- "Add your own question to the wall"
- Print/share a summary a parent could bring to a conversation

## Success criteria

The demo works if a non-technical guest at 6:00 PM can:

1. Recognize a question on the wall as one they've actually had.
2. Watch it get taken seriously and walk away with something they'd genuinely use
   tonight — without the tool ever telling them what to conclude.
3. Answer "does this add work for a teacher?" with *no*.

**Anti-criterion:** if the output reads as a verdict, we've built the thing the
room warned about. See the irony check in
[idea-guided-questions.md](idea-guided-questions.md).

## Alaska-specificity check

The brief said "for Alaskans" twice. What makes this *not* a generic project?

- The content is seeded from **real questions asked by Anchorage residents**, in
  their own handwriting — not stock FAQ material.
- The July 21 wall is a dataset no other team has and nobody could reproduce
  outside this community.
- The demo audience includes people who wrote the cards.

## Candidate directions

Derived from the 07-21 card wall (see
[prior-events.md](../00-context/prior-events.md)).

| # | Direction | Audience | Why it might win | Risk | Status |
|---|---|---|---|---|---|
| 6 | **Guided companion for hard questions** (below, merges #1 + #5) | Parents, teachers, neighbors | Half the wall is questions; uses the card wall as a unique local asset; models critical thinking instead of preaching it | Tone slides preachy; nine-topic creep | ✅ **Chosen 14:05** |
| 1 | The conversation with your kids | Parents | Most concrete card; demos in 60 seconds | Easy to build something preachy | Folded into #6 as topic 1 |
| 5 | Critical-thinking sparring partner | Students, anyone | Answers "make us stronger, not more comfortable" | Abstract; hard to demo | Folded into #6 as the output design |
| 2 | District policy starter | District admins | Education vote card was entirely about missing policy | Audience not in the room tonight | Not chosen |
| 3 | Teacher-time-neutral classroom aid | Teachers | Answers "overwhelmed + underfunded" | Brutal constraint to satisfy in 4h | Not chosen — but its constraint survives as a success criterion |
| 4 | Anchorage AI access map | Anyone without access | Very Alaska-specific | Data collection is the whole project | Not chosen |
