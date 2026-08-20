# Spec 06 — availability facts, hero restructure, historical certification

Every string below is **verbatim**. Do not reword, do not restyle, do not "improve" the copy.
Where a Tailwind class list is given, use it exactly.

## Files to EDIT

- `data/profile.js`
- `pages/index.js`

## Files NOT to touch

`data/resume.json`, `data/buildProjects.js`, `pages/cv.js`, `components/BuildProject.js`,
`components/diagrams/`, `styles/globals.css`, `portfolio-smoke.spec.js`, `public/`.

---

## Step 1 — `data/profile.js`

### 1a. Add an `availability` object

Inside `siteProfile`, immediately after the `location: "Dhaka, Bangladesh",` line, add:

```js
  // Answers the recruiter's first question - "can I actually hire this person?" -
  // before they have to ask it. Rendered in the hero panel.
  availability: {
    status: "Remote roles worldwide",
    base: "Dhaka, Bangladesh (UTC+6)",
    overlap: "Full European hours · US East Coast mornings",
    notice: "One month",
  },
```

### 1b. Make the certification historical

Find:

```js
  certification: "Certified ScrumMaster",
```

Replace with:

```js
  // Held 2023-2025, not currently renewed. Stated with its dates rather than in the
  // present tense - a lapsed credential asserted as current undermines every other
  // claim on a site whose whole argument is that its claims are checkable.
  certification: "Certified ScrumMaster (2023-2025)",
```

Do not change `personJsonLd()` — it already reads `siteProfile.certification`, so the dates
flow into the JSON-LD credential automatically.

---

## Step 2 — `pages/index.js`

### 2a. Shorten the headline

Find:

```
                I lead enterprise delivery — and I still build and operate the systems myself.
```

Replace with:

```
                I build and operate the systems I lead.
```

### 2b. Tighten the lede

Find the whole paragraph beginning `{yearsOfExperience()}+ years across .NET, ERP,` and
replace its text with:

```
                {yearsOfExperience()}+ years in enterprise .NET, ERP, and reporting platforms. Three of the systems on this page are running in production right now — architecture, deployment, and on-call, all mine.
```

Keep the surrounding `<p className="...">` exactly as it is.

### 2c. Add a three-metric strip inside the hero

Immediately **after** the closing `</p>` of the lede and **before** the
`<div className="flex flex-wrap gap-3">` that holds the CTA buttons, insert:

```jsx
              {/* Three numbers, inside the hero, so proof clears the fold on a
                  390px phone as well as on a desktop. The full five-metric band
                  below the hero is unchanged. */}
              <dl className="mb-7 flex flex-wrap gap-x-8 gap-y-3" aria-label="Headline proof metrics">
                {heroMetrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="text-2xl font-bold text-slate-950 dark:text-white">
                        {metric.value}
                      </span>
                      <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">
                        {metric.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
```

And define `heroMetrics` as a module-level constant next to the existing `proofMetrics`
array:

```js
// The three that survive a ten-second scan. proofMetrics keeps all five for the
// band below the hero.
const heroMetrics = [
  { value: `${yearsOfExperience()}+`, label: "years in enterprise software" },
  { value: "100k+", label: "utility users supported" },
  { value: "1M+", label: "monthly transactions" },
];
```

### 2c-bis. Mobile-only availability line

The aside is below the fold on a phone, so the same answer appears as one line in the left
column, hidden at `md` and up where the panel itself is visible. Insert immediately before
the CTA `<div className="flex flex-wrap gap-3">`:

```jsx
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-300 md:hidden">
                {siteProfile.availability.status} · {siteProfile.availability.base} ·{" "}
                {siteProfile.availability.notice} notice
              </p>
```

### 2d. Replace the `Enterprise Systems Profile` panel with an availability panel

In the hero's `<aside>`, find the block that renders the label
`Enterprise Systems Profile` together with its `<ul>` of four technology sentences. Replace
**that label and that entire `<ul>`** with the markup below. Leave the avatar/name/location
row above it exactly as it is.

```jsx
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                Availability
              </p>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Open to</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    {siteProfile.availability.status}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Based in</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    {siteProfile.availability.base}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Overlap</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    {siteProfile.availability.overlap}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Notice</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    {siteProfile.availability.notice}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-950 dark:text-white">Looking for</dt>
                  <dd className="text-slate-600 dark:text-slate-300">
                    Senior Software Engineer · Technical Lead · Solution Architect
                  </dd>
                </div>
              </dl>
```

The `·` characters are U+00B7 MIDDLE DOT.

### 2e. Make the credibility signal honest

Find:

```
  "Certified ScrumMaster with delivery governance and release-readiness experience.",
```

Replace with:

```
  "Certified ScrumMaster (2023-2025), with delivery governance and release-readiness experience.",
```

### 2f. Strengthen the weakest sentences on the page

The three `enterpriseProjects` `impact` strings are pure adjective with no figure. Replace
each `impact` value verbatim:

- Enterprise ERP Platform →
  ```
  "Replaced spreadsheet-based inventory, payroll, and accounts workflows with a single system of record, cutting manual handling and giving management consistent visibility across business functions.",
  ```
- Financial Analytics Systems →
  ```
  "Put real-time market signals and structured analytics in front of decision-makers, replacing end-of-day manual review with continuously updated positions.",
  ```
- OCR and Intelligent Data Capture →
  ```
  "Turned scanned documents into structured, searchable records without manual keying, removing the transcription step from the digitization workflow entirely.",
  ```

### 2g. Add a parity note to the enterprise projects section

Immediately after the opening of the `Selected Enterprise Systems` `<Section>` and before the
grid of project cards, insert:

```jsx
            <p className="mb-6 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              These are client and employer systems, so there is no link to open and no
              source to read — unlike the builds above, you are taking these on my word.
              They are described in terms of what was built rather than metrics I cannot
              evidence here.
            </p>
```

---

## Done means

- [ ] `siteProfile.availability` exists with all four keys and is rendered in the hero aside.
- [ ] `grep -c "Enterprise Systems Profile" pages/index.js` returns 0.
- [ ] `grep "I lead enterprise delivery" pages/index.js` returns nothing.
- [ ] `heroMetrics` has exactly 3 entries; `proofMetrics` still has 5 and its band still
      renders below the hero.
- [ ] No file asserts "Certified ScrumMaster" without the `(2023-2025)` suffix.
- [ ] `npm run lint` passes and `npm run build` succeeds.

Output edits only. Do not summarise.
