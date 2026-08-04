# Working Agreements

Proposed defaults for a team that met 20 minutes ago. Adopt, amend, or drop at
12:45 — but decide out loud rather than discovering them at 4:30.

## Time discipline

| Time | Gate |
|---|---|
| 1:15 | Charter one-liner agreed. If we're still debating the idea, pick the least-bad option and go. |
| 2:00 | Something runs end-to-end, however ugly. A walking skeleton beats a designed nothing. |
| 3:00 | **Scope cut.** Look at the "in scope" list and delete from it. Do not add. |
| 3:30 | Ice cream — actually go. Fresh eyes are cheaper than a 4:45 rewrite. |
| 5:15 | **Feature freeze.** Everything after this is demo rehearsal and bug triage only. |
| 5:45 | Dry run done, fallback recorded. |

## Decisions

- Anyone can propose; the **domain voice** decides on user questions, the
  **driver** decides on implementation. No consensus-seeking on small stuff.
- Disagreement lasting more than 5 minutes → pick the reversible option and move.
- Every decision that survives 10 minutes gets a line in
  `../01-project/decisions.md`.

## Working with Claude Code

- One person drives at a time; others read the diff out loud. Two people prompting
  the same repo from different laptops is how the afternoon disappears.
- If Claude produces something nobody on the team understands, that's a scope
  signal, not a win — the demo requires someone to explain it.
- Non-developers own the prompts for their domain. "Know the problem" was in the
  brief for a reason.

## Non-negotiables

- **No real personal data** in anything we build or demo. Made-up examples only —
  the audience includes parents and teachers, and this is a public room.
- Nothing we can't demo without internet has a plan B. Venue wifi is shared with
  every other team.
