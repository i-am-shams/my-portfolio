# Recruiter review — Aug 2026

Written from three seats: the agency/in-house recruiter who screens first, the hiring
manager who reads second, and the ATS that parses before either. The portfolio performs very
differently for each, and that gap is the whole story.

---

## 1. Assessment

### The one-line verdict

**This portfolio is built for the hiring manager and under-built for the recruiter.** The
evidence layer is top-decile — genuinely better than most senior candidates produce. But a
recruiter screens before a hiring manager ever sees it, and the recruiter's four questions
are unanswered on the first screen. Most of what needs fixing is not engineering. It is
process hygiene, and it is cheap.

### Where it stands against the field

**Well above standard**

- Three systems with live URLs, and demo credentials that actually work. Most "portfolios"
  link to dead Vercel deploys and archived repos.
- `knownGaps` on every project. Naming "no dead-letter queue", "the notifications DB user is
  over-privileged, found via Terraform and deliberately not silently fixed", and "no
  automated test suite yet" is the single most senior thing on the site. Very few candidates
  will volunteer a weakness before being asked, and it is the fastest way to earn technical
  trust.
- `decisions[]` prose reads like an actual engineer wrote it. "A queue is point-to-point; an
  exchange is pub/sub" with the bug it prevented and how it was verified in RabbitMQ's own
  per-queue stats — that is a whiteboard answer already written down.
- The custom architecture plates now put it ahead of essentially everyone. A recruiter will
  not grasp the fanout argument, but they register "this person makes things that look
  considered", and a hiring manager reads the actual decision.

**At or below standard**

- **No LinkedIn.** `linkedin: null` in `data/profile.js`. This is the single most damaging
  omission on the site and it is one line. Recruiters source, verify, and forward candidates
  on LinkedIn. Its absence reads as either "not really looking" or "something to hide", and
  neither is the intent.
- **No work-authorization or location-flexibility statement anywhere.** The hero says
  "Dhaka, Bangladesh" under the name and stops. For any non-Bangladeshi role, the recruiter's
  first question — *can I even hire this person?* — has no answer, and silence is read as the
  bad answer. There is an untracked `Khalid_Shams_Cover_Letter_US_Based_Agro.docx` at the repo
  root, so US roles are clearly a target. Nothing on the site supports that.
- **An expired certification asserted in the present tense.** `resume.json` says the CSM is
  valid "Dec 2023 - Dec 2025". It is Aug 2026. The site still lists "Certified ScrumMaster"
  under credibility signals and emits it as a live `hasCredential` in JSON-LD. This is small
  in isolation and disproportionately expensive here, because the entire brand of this
  portfolio is *everything on this page is checkable*. One stale claim invites doubt about
  the ones that are true.
- **2.0 MB resume PDF.** Above several ATS upload limits and awkward to forward. A senior
  candidate's CV should be well under 500 KB.
- **No plain-text resume.** Recruiters routinely copy-paste into their ATS. There is no
  `/resume.txt`.
- **No recency signal.** Nothing says when this was last touched. A portfolio with no date
  is assumed stale.

### The contradiction that will actually cost interviews

The homepage says:

> *"I lead enterprise delivery — and I still build and operate the systems myself."*

Then `resume.json` describes the last ten years like this:

- *Lead end-to-end solution delivery from discovery and estimation through architecture
  alignment...*
- *Translate business goals into technical roadmaps, milestones, release plans...*
- *Coordinate product, engineering, QA, and operations teams...*
- *Own sprint planning, backlog prioritization, dependency management...*

Every bullet in the two most recent roles is a **delivery-management** verb. Lead, translate,
coordinate, own, oversee. There is no code in the last decade of the CV. The titles say the
same thing: Software Engineer until 2016, then Technical Project Manager, then Solution
Delivery Specialist.

A recruiter screening for *Senior Software Engineer* does a title-and-verb scan and files
this as a delivery manager. The build projects are the counter-evidence, but on the CV they
sit in a "Selected Projects" section below the experience, and in the ATS they are three
short blurbs against seven roles of management language.

**The hero makes a claim the CV then contradicts.** That is the highest-value thing to fix
on the entire site, and it costs nothing but rewriting.

### The 10-second test, scored

What a recruiter checks, in order, and how this page does:

| Question | Answered on first screen? |
|---|---|
| Who is this, what level? | **Yes** — title, headline, 16+ years are all clear |
| Can I hire them — location, auth, notice? | **No** — city only, no availability, no auth |
| Do they match my req? | **Partly** — desktop shows tech nouns; mobile shows nothing |
| Where do I verify them? | **No** — GitHub only, no LinkedIn |
| Proof they can do it? | **Desktop: barely.** Metrics band sits right at the 900px fold. **Mobile: no.** The H1 and lede fill the entire first screen; zero numbers visible |

Desktop scrapes a pass. Mobile fails — and a large share of first-touch recruiter traffic is
mobile, often from a link in a message thread.

### Wasted real estate

The hero's right-hand panel — *Enterprise Systems Profile* — is four paragraphs of
comma-separated technology nouns. It occupies the most valuable rectangle on the site and
answers none of the five questions above. Recruiters do not read keyword lists; ATS parse
them from the CV, not the site. That panel should be the recruiter panel: availability,
LinkedIn, notice period, what you are looking for.

---

## 2. Priority list

Ranked by impact per unit of effort. Do them in this order.

### P0 — you are losing screens to these right now

1. **Add a work-authorization / availability line to the hero.** One sentence. Whatever the
   truth is — "Open to remote roles worldwide; based in Dhaka (UTC+6), overlapping US
   mornings and full EU hours" or "Seeking sponsorship for X" — say it. The cost of an
   unfavourable-but-clear answer is far lower than the cost of silence.
2. **Add the LinkedIn URL.** One line in `data/profile.js`. The header, footer and JSON-LD
   `sameAs` all already render it conditionally — nothing else needs to change.
3. **Resolve the ScrumMaster claim.** Renew it, or change it to "Certified ScrumMaster
   (2023–2025)", or remove it. Do not leave a lapsed credential asserted in the present tense
   on a site whose entire argument is verifiability.

### P1 — the 10-second fixes

4. **Rewrite the current-role CV bullets to lead with engineering.** See §3. This is the
   single highest-value edit on the site.
5. **Replace the tech-noun aside with a recruiter panel** — availability, notice, target
   roles, LinkedIn, "currently building".
6. **Get proof above the mobile fold.** Shorten the H1, tighten the lede, and pull a compact
   three-metric strip up into the hero.

### P2 — ATS and process hygiene

7. **Slim the resume PDF** from 2.0 MB to under 500 KB.
8. **Publish `/resume.txt`** — plain text, generated from `resume.json` so it cannot drift.
9. **Add a "last updated" line** in the footer, driven by build date or a committed constant.

### P3 — trust polish

10. **Add a parity note to `enterpriseProjects`**, the way `sourceNote` works for build
    projects — say plainly that this is employer work presented as outcome claims the reader
    cannot independently verify. Naming it converts an unexplained weakness into visible
    integrity, which is exactly the move that already works elsewhere on this site.
11. **Add one reference or testimonial quote.** Currently every claim is self-asserted.

---

## 3. HR impact plan — the first ten seconds

### What the first screen must contain

In priority order, above the fold, on **both** desktop and mobile:

1. **Name + level.** Already good.
2. **One headline that makes a claim a hiring manager cares about.** Current one is good but
   too long — it wraps to four lines on desktop and six on mobile, pushing everything else
   down. Cut it to something that fits two lines.
3. **Three numbers.** Not five. `16+ years · 100k+ users · 1M+ transactions/mo`. Five metric
   cards is a wall; three is a scan.
4. **Availability, in plain language.** Location, remote posture, time-zone overlap, notice.
5. **Two links: LinkedIn and GitHub.** Side by side, in the header.
6. **One CTA.** "See systems running in production" is strong — keep it.

### The headline rewrite

The current line is a good sentence and a bad headline:

> I lead enterprise delivery — and I still build and operate the systems myself.

It buries the differentiator at the end and takes four lines to get there. Lead with what is
rare, and keep it to two lines:

> **I build and operate the systems I lead.**
>
> 16+ years in enterprise .NET, ERP and reporting platforms. Three of the systems on this
> page are running in production right now — architecture, deployment and on-call, all mine.

Same claim, half the height, and the differentiator lands first.

### The CV rewrite — the important one

The fix is not to hide the management experience. It is to lead each role with the
engineering inside it. Same facts, different first verb.

Currently:

> Lead end-to-end solution delivery from discovery and estimation through architecture
> alignment, implementation, quality gates, and production release

Rewritten:

> Own the architecture and delivery of enterprise integrations end to end — data models,
> API contracts and release gating — from discovery through production

And for BJIT, put the system before the team:

> Architected the CWASA Digital Ecosystem — billing, NRW analysis, SCADA and GIS
> integration, and predictive analytics — serving 100k+ users and 1M+ monthly transactions,
> and led the 30+ engineer and QA team that delivered it

The rule: **every role should open with a bullet naming a system, an architecture decision or
a technology, and only then describe the team.** A recruiter's verb-scan then reads
architected / designed / built / owned rather than coordinated / oversaw / facilitated.

*(Correction to an earlier draft of this review: Selected Projects is already above
Professional Experience on `/cv`. That ordering is right and needs no change.)*

### Language rules to apply site-wide

- **Numbers before adjectives.** "Supported 100k+ users" beats "improved administrative
  visibility". The `enterpriseProjects` impact lines are currently all adjective —
  *"Improved process consistency"*, *"Helped users work with faster financial signals"*,
  *"supported more efficient digitization workflows"*. These are the weakest sentences on the
  site. Either attach a number or cut them.
- **Cut hedges.** "Helped", "supported", "involved in", "contributed to" all read as distance
  from the work.
- **Name technologies in outcome sentences**, not only in pill lists — ATS keyword matching
  weights body text.

---

## 4. CLI implementation plan

Same working split as the figure work: judgment and copy authored directly, mechanical
transcription delegated to Haiku with a spec file referenced by path. Per `AGENTS.md`, read
every diff before committing.

### Blocking inputs — three facts only you have

Batches R1 and R3 cannot be written until these are answered. Everything else can proceed.

**Answered Aug 2026:**

1. **LinkedIn** — a profile exists but is out of date. Deliberately **not** linked from the
   site until it is refreshed; a stale profile that contradicts this portfolio is worse than
   no link. Refreshing it remains the highest-value action outside this repo.
2. **Availability** — open to remote roles worldwide **and** to on-site roles in Dhaka,
   based in Dhaka (UTC+6). Both, not either. An earlier draft of this review recorded
   "remote only", which was an artefact of the question being asked as a single choice; the
   site briefly carried that narrower claim and it has been corrected.
3. **ScrumMaster** — shown as historical, "2023–2025". No longer asserted in the present
   tense anywhere, including JSON-LD.
4. **Notice** — approximately one month.

### Batches

**R0 — direct, no Copilot.** Write `docs/specs/06-recruiter-hero.md`, `07-cv-language.md`,
`08-ats.md`. All headline, bullet and availability copy is authored here, verbatim, so Haiku
only ever pastes strings. Copy is judgment; it does not get delegated.

**R1 — profile and availability facts** *(needs inputs 1–3)*
`data/profile.js` gains `linkedin`, `availability`, `timezone`, and a corrected
`certification`. `data/resume.json` certification block corrected. Purely mechanical once the
facts exist.

```
copilot -p "Implement docs/specs/06-recruiter-hero.md exactly. Strings are verbatim; do not reword. Output edits only." --model claude-haiku-4.5
```

**R2 — hero restructure**
`pages/index.js`: shorter H1, tightened lede, the `Enterprise Systems Profile` aside replaced
by a recruiter panel, five metric cards reduced to three above the fold with the full five
retained below. `components/Layout.js`: LinkedIn beside GitHub in the header.

**R3 — CV language pass**
`data/resume.json`: rewritten `responsibilities` for the two most recent roles, engineering-
first. `pages/cv.js`: Selected Projects moved above Professional Experience. Every rewritten
bullet supplied verbatim in the spec — Haiku must not compose CV copy.

**R4 — ATS artifacts**
A `scripts/build-resume-txt.mjs` that renders `data/resume.json` to `public/resume.txt` at
build time, wired into the `build` script so it cannot drift. Footer gains a "last updated"
line. PDF slimming is manual — re-export from the `.docx` with downsampled images, then
confirm under 500 KB.

**R5 — direct.** Playwright assertions, written by hand rather than delegated, for the same
reason as last time: this repo has two recorded cases of a test that passed while asserting
nothing. Assert the availability line renders, LinkedIn resolves in header and footer and
JSON-LD `sameAs`, three metrics sit above the fold at 390×844, `/resume.txt` returns non-empty
text, and no page asserts an expired credential.

### Why this shape suits Haiku 4.5

- Every user-visible string is supplied verbatim in the spec. Haiku is reliable at pasting
  and unreliable at writing CV copy — and CV copy is the deliverable here.
- Each batch is one coherent file set with an explicit do-not-touch list.
- Each spec ends in a "done means" checklist it can self-verify against.
- Anything requiring taste — headline length, which metric leads, how to phrase availability
  — is decided before the CLI is invoked, not inside it.

### Verification

Beyond lint/build/tests: re-screenshot the hero at 1440×900 **and 390×844** and confirm a
number is visible above the fold on both. That is the actual acceptance criterion for this
work, and no test can judge it.
