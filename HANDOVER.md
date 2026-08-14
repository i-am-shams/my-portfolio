# Portfolio Site — Handover

> Read this before touching the site again. It records what changed, why, what
> was verified vs. assumed, and what's genuinely still open. Update it after
> any session that changes the site materially — that's the whole point of
> having it.

## Live site

**https://khalid-shams.vercel.app** — Next.js (pages router) + Tailwind CSS,
deployed on Vercel, auto-deploys on push to `master`. Zero build-time secrets;
everything in `data/` is plain committed content.

## What this session did

Starting point: a strong enterprise-delivery CV site with **no visible GitHub
link anywhere**, five equal-weight hero buttons, a dated skills list, and no
evidence anywhere on the site of anything self-built. Reviewed as an outside
interviewer would read it, then fixed what that review found — three commits,
in order:

### 1. `eeeee6a` — Surface GitHub, lead with DentalPMS, speak to both audiences

- **The GitHub link existed in code but not on the page.**
  `siteProfile.github` was only ever emitted into JSON-LD `sameAs` — invisible
  to a human reader. Added to header and footer. `linkedin` field added
  alongside it, wired to render automatically the moment it's set to a URL
  (currently `null` — see Open Items).
- **Hero rebuilt around one primary CTA** ("See systems running in
  production") instead of five competing buttons. Headline changed from a
  generic "I build enterprise systems" claim to naming the actual
  differentiator: *"I lead enterprise delivery — and I still build and
  operate the systems myself."* This is deliberate dual-audience
  positioning — the leadership framing stays in the eyebrow/first clause,
  hands-on proof carries the second clause and the primary button.
- **DentalPMS added as the lead self-built project**, above the AI
  Job-Search Copilot, in a new `data/buildProjects.js` entry: 127k lines of
  C#, 41 domain entities, 167 tests, 33 EF Core migrations, 13 operational
  runbooks. `components/BuildProject.js` gained three optional fields to
  support it — a `stats` row, a `sourceNote` (explains *why* there's no
  public repo link, rather than the absence just looking like an omission),
  and a `demo` credentials panel that renders only once both `username` and
  `password` are set.

### 2. `bbe2cd0` — Add an Engineering Deep Dive section

(Actually landed *before* commit 1 chronologically in the git log, but
described second here because commit 1's dual-audience rewrite is what makes
sense of why the section exists.) Added the original Job-Search Copilot
project card with its architecture diagram, decisions/tradeoffs, and known
gaps — the template that DentalPMS's card above was later built to match.

### 3. `9e7ab55` — Enable DentalPMS demo access, add a real dashboard screenshot

- **Demo credentials were verified by an actual login, not copied in on
  trust.** The first password given did not authenticate — caught by driving
  the real login form in a real browser before publishing anything, not by
  assuming a filled-in field is a correct one. Corrected pair
  (`demo.dentflowbd@gmail.com` / see `data/buildProjects.js`) confirmed
  working — signs in, lands on `/scheduler` as Admin.
- **Screenshot swapped from Scheduler to Dashboard.** The scheduler (the page
  a fresh login lands on) was empty for the capture day and made a weak
  image. The Clinic Admin Dashboard shows real computed metrics from the
  seeded data (month charges, collection efficiency, no-show rate, dues
  aging, active treatment cycles) — evidence the product actually
  functions, not a static mockup.
- **Bug found while wiring the screenshot in:** `BuildProject.js`'s diagram
  caption was hardcoded to the Copilot's "request flow" text. Adding a second
  project's diagram would have silently mislabeled it with unrelated
  architecture prose. Fixed: both projects' diagrams now carry their own
  `caption` field alongside `alt`, and the component renders whichever the
  data supplies.
- **A second bug, in the test suite itself:** the smoke test asserting the
  Copilot's diagram loads (`naturalWidth > 0`) was passing only by accident —
  `next/image` lazy-loads, and once DentalPMS was added above it in the page,
  the diagram sat far enough below the fold that the assertion ran before the
  image had decoded. It never actually proved anything by that point. Fixed
  to scroll the element into view and poll for `naturalWidth`, so it still
  fails on a genuinely broken image.

## How the work was actually produced

- **Copy, positioning, and architecture decisions (what to say, where to put
  it, which screenshot to use) were done directly**, not delegated.
- **The React/Tailwind implementation was delegated to GitHub Copilot CLI
  running Claude Haiku**, in three batched calls (one per commit above),
  each under a written spec file rather than an inlined prompt. Total cost:
  **≈0.99 premium requests** (3 × 0.33), versus an estimated 6 for doing the
  same work directly in a single larger-model pass. Haiku followed all three
  specs with zero drift on review.
- **Every diff was read in full before trusting it** — Copilot's own
  end-of-run summary was never taken as verification. This caught nothing
  wrong in the code itself, but it's the discipline that would have.
- **Every visual change was confirmed with an actual rendered screenshot**
  (Playwright + headless Edge) before pushing, not just "the build passed."
  This is what caught the diagram-caption bug and confirmed the finished
  card actually looked right.
- **The demo credentials were verified with a real login attempt** before
  publishing them, which is what caught the wrong password.

## File map (what to touch for what)

| Want to change... | Edit... |
|---|---|
| Any project's copy, stats, decisions, stack, demo creds | `data/buildProjects.js` |
| How a project card renders (layout, new optional fields) | `components/BuildProject.js` |
| Hero copy, CTA structure, section order | `pages/index.js` |
| CV skills, experience, Selected Projects | `data/resume.json`, `pages/cv.js` |
| Header/footer links, dark mode | `components/Layout.js` |
| Name, email, GitHub/LinkedIn URLs, SEO metadata | `data/profile.js` |
| Smoke-test coverage | `portfolio-smoke.spec.js` |

## Open items — genuinely unfinished, not padding

- **`linkedin: null` in `data/profile.js`.** One-line change once there's a
  URL to put there; the header/footer already render it conditionally.
- **`repoUrl: null` for both projects in `data/buildProjects.js`.** Both
  source repos are currently private. DentalPMS should probably stay
  private indefinitely (commercial product, per its own `sourceNote`); the
  Job-Search Copilot repo is a candidate to make public — if/when that
  happens, setting this one field surfaces the "Source" button, nothing else
  needs to change.
- **The demo panel publishes a real password in plaintext on a public page.**
  That was the explicit ask (maximum conversion — an interviewer clicks
  straight through), and the tenant is seeded/isolated with no real patient
  data. But a public plaintext credential on a page search engines will
  index *will* get found by bots within days, not months. Worth a look at
  whether that specific login path has rate limiting / lockout independent
  of this being "just a demo" — not verified this session.
- **No accessibility audit beyond the elements this session touched.** The
  new sections were built with explicit ARIA/contrast/focus-ring asks in
  their specs and were checked for those. The pre-existing template markup
  around them (the enterprise case study, capability cards, etc.) was not
  re-audited.
- **No Lighthouse / performance pass.** `public/avatar.png` is 304KB — both
  images added this session (32KB, 135KB) are far smaller for comparable or
  larger dimensions; the avatar is a plausible first place to look if
  performance ever gets checked.
- **No mobile-specific visual review of the new sections.** The generic
  "mobile viewport keeps primary content accessible" smoke test passed, but
  nobody looked at a phone-width screenshot of the Engineering Deep Dive
  cards or the CV's Selected Projects section specifically.
- **`npm audit` is clean as of this session** (0 vulnerabilities) — but this
  repo's git history shows a pattern of *reactive* CVE-fix commits
  (`4518ca0`, `a8ad52c`, `eb81431`, `94471f7`, `b4771f1`). Worth setting up
  Dependabot or an equivalent proactive check rather than waiting for the
  next CVE announcement to notice.
- **UptimeRobot monitor — not this project's task.** Came up in the same
  session but belongs to the sibling `ai-jobsearch-copilot` repo (monitoring
  `jobcopilot.dentflowbd.com/health`, keyword-matched on `Healthy`, not
  status-code). Left unregistered there — see that project's own
  `docs/HANDOVER.md`. Noting it here only so it isn't mistakenly assumed to
  be a portfolio item.

## Handover prompt for the next session

Paste this to start a fresh session picking up from here:

```
Read HANDOVER.md at the root of this repo (my-portfolio) first — it's the
single source of truth for what changed last session and what's still open.
Then read AGENTS.md for working conventions.

Priorities, roughly in order:
1. If I've given you a LinkedIn URL, set it in data/profile.js and confirm
   it renders in the header and footer.
2. Review the "Open items" section in HANDOVER.md and ask me which of those
   I want tackled this session, rather than assuming.
3. Any new copy/positioning decisions should be made directly, not
   delegated. Routine implementation of an already-agreed spec can go
   through Copilot CLI on the Haiku model (see AGENTS.md for the pattern
   and why) — but read every diff yourself before trusting it, same as last
   session.
4. Before pushing anything visual, render it and actually look at it
   (Playwright + headless browser, screenshot, read the image yourself).
   Before publishing any credential or claim, verify it directly rather
   than trusting that a filled-in field is correct — both caught real
   mistakes last session.
5. Update HANDOVER.md with what changed before ending the session.
```
