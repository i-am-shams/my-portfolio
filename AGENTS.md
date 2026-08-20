<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Working conventions for this repo

> Project state (what's done, what's open) lives in `HANDOVER.md` at the
> repo root — read that first. This file is standing conventions that don't
> change session to session.

## Coding workflow: direct vs. delegated

- **Decisions about what the site says and how it's positioned** (copy,
  which project leads, what a screenshot shows, hero structure) are made
  directly — these need judgment about the actual person and their history,
  not just correct code.
- **Routine implementation of an already-written spec** can go through
  GitHub Copilot CLI on the Haiku model
  (`copilot -p "..." --model claude-haiku-4.5`), with the spec written to a
  file and referenced by path rather than inlined in the prompt. Batch
  related file changes into one Copilot call rather than one call per file.
  This repo's Engineering Deep Dive / DentalPMS work (see `HANDOVER.md`) cost
  ≈0.99 premium requests across three batched Haiku calls, versus an
  estimated 6 for the same scope done directly — roughly 6× cheaper for
  work that's genuinely routine once the spec is written.
- **Never trust a delegated tool's own summary of what it did.** Read every
  diff yourself before committing. This is not optional even when the
  summary sounds complete and correct.

## Verification discipline

- **A passing build is not proof a visual change looks right.** Render the
  page (Playwright + a real headless browser — this repo already has
  `playwright.config.js` and `portfolio-smoke.spec.js` set up) and actually
  look at the screenshot before pushing.
- **A filled-in credential or claim is not verified until it's been tried.**
  If a page publishes a login, a URL, or a specific number, confirm it
  directly (a real login attempt, a real request) rather than trusting that
  someone typed it correctly. This caught a wrong demo password before it
  shipped — see `HANDOVER.md`.
- **Any project card added here needs its own `caption` on both its
  `diagram` and its `screenshot` field** (see `data/buildProjects.js` /
  `components/BuildProject.js`) — a shared/hardcoded caption across
  multiple projects' images was a real bug found in an earlier session.
- **A plate is only verified once it has been looked at in *both* themes.**
  The light palette is copied from a reference; the dark palette is
  invented, so it is where a figure goes wrong first.

## Content structure

- Self-built, independently-verifiable projects (things with a live URL the
  reader can open themselves) live in `data/buildProjects.js`, rendered by
  `components/BuildProject.js`. This is a different category of evidence
  from `enterpriseProjects` in `pages/index.js`, which is employer/client
  work presented as outcome claims the reader can't independently check —
  keep that distinction when deciding where a new project entry belongs.
- `sourceNote` on a project entry exists specifically so a missing public
  repo link reads as a stated decision ("this is commercial, source stays
  private") rather than an unexplained omission. Use it whenever `repoUrl`
  is `null` for a reason worth stating.
- **Architecture figures follow `docs/diagram-standard.md`.** They are
  inline-SVG React components under `components/diagrams/`, composed from a
  fixed shape vocabulary on a fixed 1200×630 canvas, and each one draws
  exactly one decision as before → transform → after. Do not add a Mermaid
  render, a screenshot of a whiteboard, or a PNG exported from another tool
  — the standard exists because the site previously carried one of each.
- **`diagram` and `screenshot` are different evidence and both belong on a
  card.** The plate proves the system was designed; the screenshot proves it
  exists and is running. Neither substitutes for the other.
