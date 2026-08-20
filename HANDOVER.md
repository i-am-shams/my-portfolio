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

## Session 2 — hero photo + demo credential exposure fix

Reviewed the site as an interviewer would and proposed several bold changes
(LinkedIn wiring, hero photo, testimonial line, gated demo credentials,
recent-activity proof, plain-text resume, source-note parity on enterprise
cards). User picked two to act on this session; the rest are logged below as
still-open suggestions, not forgotten.

- **Hero photo added.** `pages/index.js`'s hero `<aside>` now leads with
  `siteProfile.image` (64px circular avatar) next to name and location,
  above the "Enterprise Systems Profile" bullets. Previously the only place
  a photo appeared was `og:image`/JSON-LD — invisible to a human reader of
  the page itself.
- **DentalPMS demo password no longer ships in the server-rendered HTML.**
  `components/BuildProject.js` now gates the password behind a "Click to
  reveal password" button (`useState`, default hidden); the username still
  renders directly since it's not the sensitive half. Verified with
  Playwright against a production build (`next build && next start`): the
  string `Demo@123` is absent from `page.content()` before the click and
  present after. This does not defend against a bot that executes JS and
  clicks buttons, and does nothing about rate-limiting on the login
  endpoint itself (that's server-side on `demo.dentflowbd.com`, outside
  this repo — still genuinely unverified, per the existing Open Items
  entry below). What it does fix: a plain `curl`/search-engine crawl of the
  static HTML no longer turns up the plaintext password.
- Both changes rendered and screenshotted via Playwright + headless
  Chromium (`next build && next start`, not dev mode) before being
  considered done — hero photo shows correctly in the card; reveal button
  toggles correctly.

**Still-open bold suggestions from this session's review, not yet
actioned:** LinkedIn URL (blocked — no URL supplied yet), a testimonial/
reference quote, a recent-activity signal near the GitHub link (commit
graph or direct link to repo activity once a repo goes public), a
plain-text resume alternative (`/resume.txt`) for ATS-style skimming, and a
one-line "why no link" note on `enterpriseProjects` cards for parity with
`sourceNote` on the build cards.

## Session 3 — full site review, PII in the PDF, reorder, favicon

Ran a structured review against first-impressions/case-study-depth/UX/
action-items criteria, then acted on findings across several rounds.

- **`data/resume.json`**: removed a home address and a third party's name
  + personal phone number (a professor listed under `references`) that
  were never rendered on the page but shipped in the public JS bundle
  regardless — confirmed by grepping the built `.next/static` chunk before
  and after. Also nulled `companyUrl` for the Simplexhub Ltd role — that
  domain's TLS certificate no longer matches its hostname, so the link
  threw a browser security warning; verified live with `curl` before
  touching it.
- **Homepage reorder**: Engineering Deep Dive now renders before Flagship
  Case Study. Reasoning: the site's own experience history has an 8+ year
  gap between the last "Software Engineer"-titled role (2016) and now — the
  Deep Dive is the one section that answers "does this person still code?"
  with something independently verifiable, so it shouldn't sit behind a
  self-reported case study. This also fixed an existing inconsistency: the
  hero's primary CTA already pointed at `#engineering` first, secondary at
  `#case-study` — document order hadn't matched that until now.
- **Closing CTA section rewritten**: copy no longer restates generic value
  props ("hands-on engineering depth... stakeholder discipline") — it now
  references the specific evidence already shown above it. "Download
  Resume" button replaced with "View CV", since the PDF was the weaker,
  staler artifact (see below) and the button was pointing at it from the
  single most-visible spot on the page.
- **Mobile nav**: the header's Contact button was `hidden` below the `sm`
  breakpoint; now visible at all widths. Checked for overflow at both
  390px and a narrow 320px viewport — name wraps, button row doesn't.
- **The resume PDF was regenerated from scratch, not just re-exported.**
  The old `public/Khalid_Shams_Resume.pdf` (last touched 2026-05-10) turned
  out to be a *different resume entirely* — a banking/AML/data-warehouse-
  framed CV, not the site's "Enterprise Software Engineering Leader"
  positioning — and it exposed a home address (different from the one in
  `resume.json`), plus date of birth, nationality, marital status, and
  religion in a "Personal Details" block, none of which appears anywhere
  else on the site. Confirmed by extracting its text with `pdftotext`, not
  by assuming staleness from the file date. Replaced by printing the live
  `/cv` page to PDF via Playwright (`page.pdf()`, print media, A4). First
  raw export was 8 pages with several blank ones; root cause was that
  `md:grid-cols-*` responsive grids need 768px width to activate, but the
  actual PDF content area is only ~672px (A4 minus margins) — every
  multi-column section was silently collapsing to one column. Added
  `print:grid-cols-*` overrides (which apply unconditionally under
  `@media print`, regardless of container width) plus density overrides
  across `pages/cv.js`, `components/Section.js`, and
  `components/SkillCategory.js`. Down to 6 pages (one of which is a nearly
  content-free trailing page — a page-break artifact, not investigated
  further). Getting to a literal 2-3 pages from here needs actual content
  cuts, not more CSS — flagged to the user rather than done unasked.
- **Favicon replaced.** The old one (`public/favicon.svg` /
  `public/favicon.ico`, a 16-color 64×64 `.ico`) was a generic briefcase
  icon with an unrelated heartbeat/EKG squiggle on it — a leftover
  template asset with no connection to the site's actual owner. New one is
  a bold "KS" monogram on the same gradient already used elsewhere on the
  site (`#0f172a` → `#1d4ed8`), so it's on-brand rather than generic.
  `favicon.ico` was hand-built as a proper multi-resolution ICO (16/32/48px,
  PNG-embedded RGBA) since no image tooling (ImageMagick, etc.) was
  available in this environment — verified by extracting each size back
  out of the finished `.ico` and viewing it, and by checking legibility of
  the 16px render specifically (the hardest size), not just the large
  preview. Cache-busting query bumped `?v=2` → `?v=3` in `pages/_document.js`
  so browsers don't keep serving the old cached icon.

All of the above verified the same way as session 2: full diffs read
before trusting Copilot's own summary (one round caught a mid-edit mistake
it had already self-corrected but left cosmetic whitespace behind; another
caught the exact same thing) — plus `npm run build`, `npm run lint`, and
the full Playwright smoke suite passing after every batch, not just the
last one.

Two Copilot Haiku calls this session (batched, one per logical spec): the
homepage/resume.json/mobile-nav batch, and the print-density batch.
0.66 premium requests combined, versus an estimated 12 for the same scope
done directly.

## Session 4 — resume PDF rebuilt from source, new project, dynamic years

- **The regenerated (webpage-print) resume PDF from Session 3 was rejected
  as "below par" construction** — a printed webpage is not a resume, no
  matter how tight the CSS. Rather than keep fighting that approach, the
  fix moved upstream: a native Word document (`python-docx`, not a PDF
  conversion) was built from scratch, first attempted as a redaction of
  the *old* banking/AML-framed PDF (removing only DOB, marital status,
  religion, and the wrong address, keeping nationality) — that redaction
  attempt is a cautionary note on its own: PyMuPDF's rectangle-based
  redaction removed the page header entirely on the first pass, because
  tightly-stacked lines' font-metric bounding boxes overlap even when the
  visible ink doesn't. Content-stream-level PDF surgery was abandoned as
  too fragile for a one-off edit.
  - The Word doc was then rewritten a second time to match the *current*
    site content (`data/resume.json` + `pages/cv.js`'s Selected Projects),
    not the old banking resume — verified programmatically, not by eye:
    every experience bullet and every technical-skill item in the live
    JSON was confirmed present verbatim in the generated document before
    it was handed over.
  - The user reviewed and edited that Word draft locally (LibreOffice),
    then exported and dropped their own PDF into `public/Khalid_Shams_
    Resume.pdf` directly — that final PDF is a manual export of their
    edited document, not anything generated by a script. Confirmed clean
    of the four sensitive fields before this was pushed.
  - **`Khalid_Shams_Resume_DRAFT.docx` and `Khalid_Shams_Cover_Letter_
    TEMPLATE.docx` sit at the repo root, deliberately untracked.** This
    repo is public; nothing in code references them, and they were kept
    out of the commit on that basis rather than added by default. If
    they should be version-controlled, that needs to be a deliberate
    ask, not an assumption.
- **A cover letter template was drafted** (not committed to the repo —
  handed over as a file and shown inline in chat) built around the same
  verification discipline as everything else this session: the "cut
  implementation cost roughly sixfold via AI-assisted tooling" line is
  the literal number from this repo's own git history, not an invented
  claim.
- **A third build project added: One-Page Commerce**
  (`https://one-page-commerce.vercel.app/`, repo `i-am-shams/Page1Com`,
  private). Chosen specifically because it closes a real gap — the only
  eCommerce evidence on the site before this was a two-line bullet from a
  2013–2015 job. Investigated via `gh api` against the private repo (file
  counts, commit count, language breakdown, no test files found) before
  writing any copy, and the card's `knownGaps` says plainly that it has
  no automated test suite, unlike the other two projects — not glossed
  over to make the three cards look uniform. The diagram image is a real
  Playwright screenshot of the live storefront (`public/onepagecommerce-
  storefront.png`), not a mockup. Admin panel demo
  (`/admin/login`) intentionally not linked from the card yet — on
  request only, per the user.
  - Adding a third project surfaced a latent test bug: `portfolio-smoke.
    spec.js` had assertions that assumed only one project would ever
    render "View live app" / "Source is private" text, which broke as
    soon as a second project shared that copy. Fixed by scoping those
    assertions to each project's own `<article>` card rather than the
    whole page - the kind of fix that should have been anticipated the
    first time a second project got `demo: null`, not discovered by
    breakage.
- **"14+ years" was hardcoded in six separate places** (`data/profile.js`
  summary, `data/resume.json` careerObjective, both pages' hero/proof-
  metric copy) and would have silently gone stale every year going
  forward. Replaced with `yearsOfExperience()` in `data/profile.js` —
  computed at build time from a fixed `new Date(2010, 3, 1)` start date
  (April 2010, matching the CACTS LTD entry in `resume.json`), not
  reactive to real time after that. Because `data/resume.json` is plain
  JSON and can't hold a function call, its `careerObjective` field uses a
  literal `{{YEARS}}` token, substituted at render time in `pages/cv.js`.
  The smoke test that hardcoded the literal `"14+"` was updated to assert
  the pattern (`/^\d+\+$/`) instead, so it won't need a yearly edit either.
  Verified computed correctly as **16+** as of this session (April 2010
  to present).

## Session 5 — synced the Job-Search Copilot card to its Project 2 work

The sibling `ai-jobsearch-copilot` repo shipped a real second phase since this
card was last written: a Node.js/TypeScript notifications microservice (its
own MongoDB Atlas cluster), Grafana Cloud observability, and real Terraform
for both Atlas and the VPS deploy path. Updated `data/buildProjects.js`'s
`ai-job-search-copilot` entry to match, done directly (not delegated —
positioning and which engineering story to lead with need judgment):

- **New `stats` row** (was `null`): 7 containers, 2 bounded contexts, 3
  environments verified, 4 CI/CD images — all real numbers pulled from that
  repo's own `docs/HANDOVER.md`, not invented.
- **`public/jobcopilot-architecture.png` replaced** with the sibling repo's
  freshly redrawn diagram (fanout exchange, notifications, MongoDB Atlas,
  Alloy, Grafana Cloud) — copied directly from its `docs/architecture.png`,
  not redrawn separately, so the two repos' diagrams can't drift apart.
- **New decision entries added**: "A queue is point-to-point; an exchange is
  pub/sub" (the fanout-exchange bug — judged the strongest single story from
  that phase: a real bug, caught before shipping, fixed at the architecture
  level, verified via RabbitMQ's own stats) and "Terraform adopted an
  already-live system without touching it" (import-first, `plan`-before-apply
  discipline, and the honest naming of a real security finding it surfaced
  rather than silently fixing).
- **`knownGaps` rewritten**: removed "No IaC layer" (now false) and "failed
  matches don't push SignalR" was already gone from an earlier sync; added
  the two new real gaps (the notifications DB user's excess privileges, no
  dead-letter queue) alongside the still-true ones (`:latest` deploys, single
  API instance).
- **`stack` gained**: Node.js, MongoDB Atlas, Terraform, Grafana Cloud.

**Real bug caught by the site's own image cache, not the code**: right after
swapping the diagram file, a screenshot still showed the *old* diagram.
`curl`ing the raw `/public` file and the `/_next/image` optimizer endpoint
separately showed the raw file was correct but the optimizer wasn't — a
stale entry in `.next/cache/images` from before the file swap. Fixed by
clearing that cache directory and restarting the server, then re-verified
with a second screenshot before trusting it.

**Real bug caught by running the test suite, not by writing the update**:
the existing smoke test asserted the literal old known-gap text ("No IaC
layer"), which the content update correctly removed — failed loudly instead
of silently passing on stale content. Updated the assertion to check for the
new fanout-exchange decision title and the new known-gap text instead of
just deleting the check.

Verified: `npm run lint` and `npm run build` clean, a real Playwright
screenshot of the rendered card (not just "build passed") confirmed both the
new diagram and the new copy before pushing, and all 10
`portfolio-smoke.spec.js` tests pass.

## Session 6 — patched Next.js CVE-2026-64641 dependency exposure

Reviewed GitHub Advisory GHSA-m99w-x7hq-7vfj / CVE-2026-64641. The vulnerable
path is App Router with at least one Server Action; this repo has no `app/`
directory and no `use server` / Server Action usage, so the live application
was not using the affected feature path. Still fixed the dependency declaration
because `package.json` advertised `next: ^16.2.6`, inside the advisory's
affected `>=16.0.0, <16.2.11` range, even though the lockfile had already
resolved a safe version.

- Updated `next` and `eslint-config-next` to `^16.3.1`; lockfile now resolves
  `next@16.3.1` and matching Next SWC / ESLint packages.
- Verified with `npm audit`, `npm run lint`, `npm run build`, and the full
  Playwright smoke suite (`10 passed`).

## Session 7 — architecture figure standard, three plates, count-copy drift

Uncommitted at time of writing. The site's writing carried its argument and
its images did not: only one of three build projects had an architecture
diagram at all, and that one was a Mermaid `flowchart TD` render at default
theme (`#FFFFDE` clusters, `#333` text), 784×1107 portrait, rasterised, and
copied in from the sibling `ai-jobsearch-copilot` repo so it could not even be
edited here. The other two projects filled the diagram slot with product
screenshots — good evidence, but of a different claim. A screenshot proves a
system exists; it does not show that anyone designed it.

**What landed:**

- **`docs/diagram-standard.md`** — the durable standard. 1200×630 canvas, one
  warm ground and one green accent as CSS custom properties, system serif in
  italic, a closed ten-shape vocabulary, and a hard rule that every figure
  draws exactly one decision as before → transform → after with a two-clause
  aphorism at the bottom. Read this before adding any figure.
- **`components/diagrams/`** — `plate.js` (the fixed canvas, which also draws
  the aphorism so it cannot drift between figures), `primitives.js` (the ten
  shapes), three plate components, and `index.js`, a registry that **throws**
  on an unknown key rather than rendering nothing.
- **Four plates.** Three decision plates, each drawing an argument already
  written in that project's `decisions[]`, plus one topology plate: DentalPMS *"One filter. Every query."* (hand-written
  `WHERE` → EF Core global query filter), the Copilot *"One publish. Two
  copies."* (queue round-robin → fanout exchange), One-Page Commerce
  *"Client asks. Server decides."* (client-posted price → server-recomputed).
  The fourth is the Copilot's deployment map, *"One box. Three clouds."*,
  which replaced the imported Mermaid PNG outright.
- **`diagram` and `screenshot` split into separate fields** on all three
  entries in `data/buildProjects.js`. Both render, plate first.
- **Count-copy drift fixed in four places.** One-Page Commerce made it three
  projects back in Session 4, but the hero lede, the Deep Dive intro, the
  closing CTA and `cv.js`'s `selectedProjects` all still said two.

**Things worth knowing next time:**

- **The plates are inline SVG React components, not `.svg` files.** That is
  deliberate and load-bearing: an `<img>` is an isolated document, so a
  `.svg` behind `next/image` would not inherit the page's theme tokens. Live
  `<text>` also means the labels stay crisp at any zoom and are selectable.
- **Two greens, on purpose.** `--plate-ink` (`#2f7a51`) on the cream ground
  is ~4.4:1 — fine for shapes under WCAG's 3:1 graphical bar, short of the
  4.5:1 text bar. Label text therefore uses `--plate-ink-text` (`#256640`,
  ~6:1). Do not collapse them back into one token.
- **The standard has two figure types, not one.** The first pass defined a
  plate as "one decision, before → transform → after", which left the
  Copilot's full-topology Mermaid PNG with nowhere to live — so it was kept
  in the `screenshot` slot and the card ended up looking half-converted. That
  was the wrong call and it was corrected in the same session: the standard
  now also defines a **topology plate** (same canvas, palette, typography and
  vocabulary; no before/after; sixteen shapes; margins relax to 60px), and
  `CopilotTopologyPlate.js` replaces the PNG entirely. A project may carry a
  decision plate and at most one topology plate — the Copilot is the only one
  that does, via the `topology` field on its data entry.
- **Solid vs outline now carries a second meaning in topology plates:** solid
  `Instance` is a container you operate, outlined `External` / `Store` is a
  managed service you consume. That is why the weight of the Copilot topology
  falls on the seven containers and not on Gemini, Atlas and Grafana.
- **`public/jobcopilot-architecture.png` is now unreferenced.** Left on disk
  rather than deleted (it is the sibling repo's own asset), but nothing on the
  site serves it, and a smoke test asserts it is no longer on the page.
- **The `next/image` CLS bug is gone as a side effect.** `BuildProject.js`
  used to hardcode `width={1600} height={900}` for all three images, whose
  real dimensions are 1400×900, 784×1107 and 1280×900 — the portrait diagram
  in particular reserved a landscape box and shifted the page on decode.
  `screenshot.width` / `screenshot.height` now carry the real values, and a
  smoke test asserts the declared ratio.
- **The new assertions were mutation-tested, not just run.** Reverting a
  count string and setting a width back to 1600 each produced a failure;
  typo-ing a registry key took the whole page down. Given this repo's history
  of tests that passed while asserting nothing (Sessions 1 and 5), a green
  run on its own was not treated as evidence.

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
| Resume PDF content | **Manual now, not generated.** `public/Khalid_Shams_Resume.pdf` is a hand-exported PDF from `Khalid_Shams_Resume_DRAFT.docx` (repo root, untracked). Edit the `.docx` in Word/LibreOffice, export to PDF, drop it in `public/`. The `print:` CSS overrides in `pages/cv.js` / `components/Section.js` / `components/SkillCategory.js` / `styles/globals.css` still exist and still work for the CV *web page's* own print button, but are no longer how the downloadable PDF gets made. |
| Favicon | `public/favicon.svg` (source of truth) + `public/favicon.ico` (hand-built multi-res fallback) + cache-busting version in `pages/_document.js` |
| Years of experience ("N+ years") | `yearsOfExperience()` in `data/profile.js` — computed from a fixed start date, not hardcoded anywhere. Change the start date there if it's ever wrong, not the individual strings. |
| Self-built project list | `data/buildProjects.js`, rendered by `components/BuildProject.js` — same pattern for a 4th project as the existing 3. |
| An architecture figure (a "plate") | `docs/diagram-standard.md` first — it defines two figure types and which to use. Then `components/diagrams/`: add the component, register it in `components/diagrams/index.js`, and point the project's `diagram.plate` (a decision) or `topology.plate` (a deployment map) at the key. Figures are inline SVG, never image files. |
| Plate colours (light, dark, print) | `styles/globals.css` — the `--plate-*` custom properties in `:root`, `.dark`, and the `@media print` block. Never hardcode a hex inside a plate component. |

## Open items — genuinely unfinished, not padding

- **`linkedin: null` in `data/profile.js`.** One-line change once there's a
  URL to put there; the header/footer already render it conditionally.
- **`repoUrl: null` for DentalPMS and One-Page Commerce.** Both are
  commercial products and should probably stay private indefinitely, per
  their own `sourceNote`s. *(Resolved for the third: the Job-Search Copilot
  repo went public in `f8cd2f6` and its `repoUrl` is set, which surfaces the
  "Source" button. This entry said "both projects" for two sessions after
  there were three of them — see the count-copy drift fixed in Session 7 for
  the same class of error in user-facing copy.)*
- **The demo panel's password is now gated behind a "click to reveal"
  button** (fixed in commit `eef244f`, prior session) rather than sitting
  in the static HTML — closes the search-engine-indexing exposure. What's
  still genuinely unverified: whether that login path has rate limiting /
  lockout independent of this being "just a demo."
- **The resume PDF is now a manually-maintained artifact** (see Session 4
  and the file map above), not generated from the site. It will drift
  from `data/resume.json` / `pages/cv.js` over time unless someone
  remembers to re-export it by hand after CV content changes. Worth
  deciding at some point whether that tradeoff (better construction
  quality, manual sync) is the permanent answer or a stopgap.
- **`Khalid_Shams_Resume_DRAFT.docx` and `Khalid_Shams_Cover_Letter_
  TEMPLATE.docx` are untracked at the repo root.** Deliberate, not an
  oversight (see Session 4) — but that also means they're one `git clean`
  or a fresh clone away from disappearing. Worth moving somewhere
  durable outside the repo if they need to survive long-term.
- **One-Page Commerce's admin-panel demo isn't linked from its card.**
  URL is known (`/admin/login`) — add it the same way DentalPMS's `demo`
  field works, on request.
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
