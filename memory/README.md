# Project Memory — Anchorage Claude Impact Lab (2026-08-04)

Durable notes for this build. Written so a teammate who walks up cold — or the
next Anchorage cohort — can get oriented in five minutes.

## Structure

| Folder | Holds | Update when |
|---|---|---|
| `00-context/` | The event itself, and what came before it | Rarely — mostly seeded up front |
| `01-project/` | What we're building and why; decisions; open questions | Every time a decision is made or a question opens/closes |
| `02-team/` | Who's here, what they own, how we work | At team formation, then as roles shift |
| `03-build/` | Architecture, environment, running worklog | Continuously during the build |
| `04-learnings/` | What worked, what didn't, handoff to the next cohort | Whenever something is learned, not just at the end |
| `05-demo/` | The 6:00 PM demo | Late afternoon |

Assets (pasted screenshots, docs, reference material) live in `../assets/`.
See [assets/README.md](../assets/README.md).

## Conventions

- **One fact per bullet.** Short beats complete. This is a few-hour project.
- **Mark unknowns `TBD`** rather than guessing. A TBD is useful; a wrong fact is not.
- **Timestamp entries in `03-build/worklog.md`** (AKDT, 24h) — the schedule is tight
  and "when did that break" matters.
- **Learnings are captured live.** Anything surprising goes into `04-learnings/`
  the moment it happens; nobody remembers it at 7:00 PM.
- **Attribution over anonymity.** If a teammate contributed an idea or a fix,
  name them — this doc set is partly a record of who knew what.

## Maintenance

Claude maintains these files during the session. To refresh captured pastes:

```bash
python3 scripts/capture_pasted_assets.py
```

## Status

- Seeded: 2026-08-04 13:47 AKDT
- Prior-session material captured and transcribed: 13:52
- Team formed: TBD
- **Project chosen: 14:05** — guided companion for hard questions about AI ([charter](01-project/charter.md))

## Start here

New to the project? Read in this order:

1. [00-context/event-brief.md](00-context/event-brief.md) — what today is
2. [00-context/prior-events.md](00-context/prior-events.md) — what the community already said
3. [01-project/charter.md](01-project/charter.md) — what we're building
