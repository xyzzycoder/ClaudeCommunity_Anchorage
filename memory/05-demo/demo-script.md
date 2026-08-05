# Demo — The Wall

Everything you need to talk about this for thirty seconds or ten minutes.

**Audience:** builders, plus guests who arrived at 5:30 with no context. Assume
non-technical. Assume parents and teachers — that's who the July 21 room was, and
some of them wrote the cards on the screen.

---

## The thirty-second pitch

> On July 21, about fifty people in Anchorage each wrote a hope, a fear, or a
> question about AI on an index card and pinned it to a board.
>
> We counted them. **Thirty were questions. Twelve were fears. Four were hopes.**
>
> That's not a frightened room. That's a room that doesn't know how to think about
> this yet and is asking for help — and that's a completely different problem.
>
> So we built the wall. You pick a real card, in the original handwriting, answer
> three questions about your own situation, and you get the tradeoffs, three
> questions to take away, and an honest note about where the tool might be wrong.
>
> **It never tells you what to conclude.** One of the cards on that wall asks how
> we make these tools *resist us, to make us stronger rather than making us more
> comfortable.* We took that as the spec.

## The two-minute version

Add, in this order:

1. **Where it came from.** The July 21 room ended by naming where Alaska should
   start. The published summary said "education and access." We read all eleven
   closing cards, and six of them were some form of *ask the community first* —
   community values, community voice, missing community input, more conversations.
   Reading the primary source changed what we built.
2. **What it does.** Walk one card end to end. Kids 9, 12, 15 is the strongest.
3. **What it refuses to do.** The three-part output, especially *"where this might
   be wrong"* — which on some cards says *this tool is the problem.*
4. **What it cost.** One afternoon, seven strangers, no API key, no server.

---

## Goals and objectives

**Goal** — help an Anchorage parent, teacher, or neighbour think through a hard
question about AI, and leave with better judgment rather than a borrowed answer.

**Objectives, and whether we hit them:**

| Objective | Status |
|---|---|
| Ground it in what this community actually asked, not generic AI content | ✅ 39 real cards, in the writers' own hands |
| Never issue a verdict | ✅ Output is tradeoffs + questions + an admission of fallibility |
| Cost a teacher zero prep time | ✅ Nothing to install, no account, no setup |
| Survive a demo on shared venue wifi | ✅ Fully static — no server, no key, no network calls at all |
| Store nothing about a visitor | ✅ No logging, no analytics, no localStorage |
| Be explainable by a non-developer on the team | ✅ One HTML page, one stylesheet, two scripts |

**Non-goals, say them before you're asked:** it isn't a chatbot, it doesn't answer
the questions, and it doesn't claim the six topics are the only ones that matter.

---

## The numbers

| | |
|---|---|
| Cards on the wall | **39** |
| Self-applied labels | **30 questions · 12 fears · 4 hopes** |
| Cards carrying more than one label | 4 |
| Topics | 6 |
| Distinct paths through the interview | **1,053** |
| Cards gathered from other teams today | 6, all by Megan |
| Network calls the app makes | **0** |

**The line that matters:** more than twice as many questions as fears and hopes
combined. Every one of those labels was written by the person holding the pen —
we didn't classify anything.

> **If someone suggests sentiment analysis**, the answer is that the writers
> already did it, in their own handwriting. A classifier could only agree with them
> (redundant) or disagree with them (telling someone their fear was neutral, in a
> room where they're standing). We show what they wrote.

---

## Speaker's notes — anecdotes that actually happened

Pick two or three. They're all true and all short.

**"The summary was wrong."**
The event page compressed two hours into four words: *education and access.* We
transcribed the actual card wall and found six of the eleven closing cards were
about being *asked* — community voice, missing community input, more conversations.
The room's real answer was closer to *"education and access, arrived at with us
rather than for us."* We nearly built the wrong thing from the summary.

**"The tool got a card wrong, and the card was about the tool being wrong."**
Early on we transcribed a card as *"how can we make these tools resistive."* It
actually reads *"resist us."* We only caught it when better scans arrived. The card
that became our design thesis was a card we'd misread — which is exactly the
failure mode the wall is worried about.

**"A card was hiding inside another card."**
One crop had quietly swallowed a second physical card. Its text was sitting there
in the image and existed nowhere in our data. A verification pass over all 37
images found it — *Regulatory Capture and Ignorance* — and it's on the wall now.
Nobody would ever have known.

**"The demo can't fail, because there's nothing to fail."**
We had no API key. So instead of live generation with a cached fallback, the cache
*became* the product. No server, no key, zero network calls. You could unplug the
building and this still runs. Best constraint we got all day.

**"Megan created a whole topic."**
Six cards on this wall were written today, not in July — Megan walked the room and
asked other teams for them. Four of the six are about energy, water and
infrastructure, which the July board had barely touched. The Environment & Cost
topic exists because she went and asked.

**"Two people, same night, same metaphor."**
A card arrived at the very end of the build: *"How can we put the genie back in the
bottle if things get out of hand?"* It landed on the wall next to one from July:
*"Is the cat out of the bag already?"* Different people, same worry, same reach for
a folk metaphor. We left that as the card's own commentary.

**Small ones, if you need a beat:**
- The only card written in pencil is the one asking what a query costs.
- The smallest handwriting on the wall belongs to the person worried about
  competitors rushing — most words per square inch of anyone there.
- An instructional designer struck out "learn" and wrote "learning." Correcting
  their own copy, on an index card, at an evening event.

---

## The live path — rehearse this verbatim

1. Land on the wall. Let it sit for three seconds. **Say nothing** — the
   handwriting does the work.
2. "These are real. Same handwriting, same board." Point at a pushpin.
3. Pick **kids-9-12-15**. Read the card out loud, including the crossings-out —
   *"that AI **has** — no, **will have** — on the world."*
4. Answer the three questions as yourself.
5. Read **one** tradeoff and **one** of the three questions. Don't read all six.
6. Scroll to *"where this might be wrong"* and read it in full. **This is the
   moment.** It ends with *"You know your kids; it doesn't."*
7. Stop talking.

**Do not** demo the handwriting flyover unless someone asks. It's unlinked on
purpose — some of these writers are in the room.

## Fallbacks

- [ ] It's a static page; the only real failure is the browser closing. Reopen it.
- [ ] Have `v0.1.0` checked out in a second tab if a late change broke something.
- [ ] Screen recording of the working path, saved locally.

## Questions to expect

From the July 21 cards — this room asks these:

| They'll ask | Answer honestly |
|---|---|
| "Does this add work for teachers?" | No. Nothing to install, no account, no prep. |
| "How do you know it doesn't just give kids the answer?" | It structurally can't — there's no free-text box and the output ends in questions. |
| "Who did you consult? Did you talk to Alaska Native communities?" | **We didn't.** Two cards on this wall are about data sovereignty and we have no standing on them. It's written into the app's own "where this might be wrong." |
| "Is this actually AI-powered?" | Content was written by Claude; the app ships it rather than generating live, so every response a stranger sees has been read by a human on our team. |
| "What does it cost to run?" | Nothing. It's a static page. |
| "What happens to it after tonight?" | Open question — see the handoff notes. |
