# Spec 07 — CV language pass, engineering-first

The two most recent roles cover ten years and every bullet in them opens with a
delivery-management verb: lead, translate, coordinate, own, establish. A recruiter screening
for a Senior Software Engineer verb-scans this and files it as delivery management, which
contradicts the homepage's central claim.

**No facts change.** These are re-verbings and reorderings of what is already there, so that
the first thing scanned in each role is a system, an architecture decision, or a technology.

## Files to EDIT

- `data/resume.json`

## Files NOT to touch

`pages/cv.js` (its section order is already correct — Selected Projects is already above
Professional Experience), `pages/index.js`, `data/profile.js`, `data/buildProjects.js`,
`components/`, `portfolio-smoke.spec.js`.

---

## Step 1 — Today's Tech, Solution Delivery Specialist

Replace the `responsibilities` array of the **first** entry in `experience` with exactly:

```json
      "Own end-to-end solution architecture — from discovery and estimation through architecture alignment, implementation, quality gates, and production release",
      "Translate business goals into technical roadmaps, system designs, release plans, and measurable delivery outcomes",
      "Set technical direction across product, engineering, QA, and operations to keep enterprise delivery predictable and transparent",
      "Own sprint planning, backlog prioritization, dependency management, delivery risks, and release readiness",
      "Establish delivery governance through status reporting, stakeholder demos, risk tracking, and proactive mitigation",
      "Drive continuous improvement in engineering quality, delivery process, team collaboration, and operational handoff"
```

Six bullets in, six out. Bullets 3 and 4 are unchanged from the original.

## Step 2 — BJIT LTD, Technical Project Manager

Replace the `responsibilities` array of the **second** entry in `experience` with exactly:

```json
      "Architected the CWASA Digital Ecosystem as project lead — billing, NRW analysis, management dashboards, predictive analytics, SCADA integration, GIS integration, and reporting workflows",
      "Delivered systems supporting 100k+ users, 1M+ monthly transactions, and a 65% reduction in manual reporting effort",
      "Conducted architecture reviews, code reviews, implementation guidance, dependency management, and production-readiness planning",
      "Designed and developed PDF creation software, educator content tools, and bridge inspection management systems",
      "Led a 30+ member cross-functional team of developers and QA engineers across planning, implementation, review, and release",
      "Led enterprise software delivery across utility, reporting, analytics, content-creation, and operational management domains",
      "Converted operational requirements into roadmaps, technical scope, and release plans with clients and business stakeholders"
```

Seven bullets in, seven out. This is a **reordering** — the architecture and hands-on
bullets, which were buried at positions 3, 5 and 6, move to the top; the team and delivery
bullets move down. The em dash in bullet 1 is U+2014.

## Step 3 — the certification

Find the `certifications` entry and replace the whole object with:

```json
    {
      "name": "Certified ScrumMaster®",
      "issuer": "SCRUM ALLIANCE®",
      "validity": "Dec 2023 - Dec 2025 (not currently renewed)"
    }
```

Only `validity` changes. Do not touch `name` or `issuer`.

---

## Done means

- [ ] `data/resume.json` still parses as valid JSON — run
      `node -e "JSON.parse(require('fs').readFileSync('data/resume.json','utf8'))"`.
- [ ] `experience[0].responsibilities` has 6 entries; `experience[1].responsibilities` has 7.
- [ ] `experience[1].responsibilities[0]` starts with `Architected`.
- [ ] `experience[1].responsibilities[3]` starts with `Designed and developed`.
- [ ] The `{{YEARS}}` token in `careerObjective` is untouched.
- [ ] Every other key in the file — `personalInfo`, `education`, `technicalSkills`,
      `management`, `languages`, and experience entries 3 through 7 — is byte-identical.
- [ ] `npm run lint` passes and `npm run build` succeeds.

Output edits only. Do not summarise.
