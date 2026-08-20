# Spec 04 — count copy

One-Page Commerce became the third build project, but four pieces of copy still say there
are two. Every replacement string below is **verbatim**. Do not reword, do not restyle, do
not change punctuation, and do not touch any line not named here.

## Files to EDIT

- `pages/index.js` — three replacements
- `pages/cv.js` — one addition

## Files NOT to touch

`data/buildProjects.js`, `components/`, `styles/`, `portfolio-smoke.spec.js`, `public/`,
`data/profile.js`, `data/resume.json`.

---

## `pages/index.js` — replacement 1 (hero lede, around line 126)

FIND:

```
                {yearsOfExperience()}+ years across .NET, ERP, reporting, and SCADA-integrated platforms for utilities and enterprise operations. Two of the systems on this page are running in production right now, on infrastructure I designed, deployed, and maintain.
```

REPLACE WITH:

```
                {yearsOfExperience()}+ years across .NET, ERP, reporting, and SCADA-integrated platforms for utilities and enterprise operations. Three of the systems on this page are running in production right now, on infrastructure I designed, deployed, and maintain.
```

Only the word `Two` becomes `Three`. Everything else on that line is identical.

---

## `pages/index.js` — replacement 2 (Engineering Deep Dive intro, around line 242)

FIND:

```
                Enterprise delivery is one kind of evidence; a system you can open in a browser is another. Both of these were designed, built, deployed, and operated end to end, and both are running in production right now.
```

REPLACE WITH:

```
                Enterprise delivery is one kind of evidence; a system you can open in a browser is another. All three were designed, built, deployed, and operated end to end, and all three are running in production right now.
```

---

## `pages/index.js` — replacement 3 (closing CTA, around lines 404-408)

FIND (the whole `<p>` element, five lines):

```
            <p className="mb-6 max-w-3xl leading-7 text-slate-300 dark:text-slate-700">
              DentalPMS and the AI Job-Search Copilot are running in production right now, and
              the CWASA ecosystem supported 100k+ users under my leadership. If that&apos;s the
              kind of ownership your team needs, let&apos;s talk.
            </p>
```

REPLACE WITH:

```
            <p className="mb-6 max-w-3xl leading-7 text-slate-300 dark:text-slate-700">
              DentalPMS, the AI Job-Search Copilot, and One-Page Commerce are running in
              production right now, and the CWASA ecosystem supported 100k+ users under my
              leadership. If that&apos;s the kind of ownership your team needs, let&apos;s talk.
            </p>
```

Keep both `&apos;` entities exactly as written. Do not convert them to `'`.

---

## `pages/cv.js` — add the third project

The `selectedProjects` array (starts around line 42) currently has two entries: DentalPMS
and AI Job-Search Copilot. Append a **third** entry after the AI Job-Search Copilot object,
so the order matches the homepage.

```js
  {
    name: "One-Page Commerce",
    blurb:
      "Single-product Cash-on-Delivery storefront with an admin panel a non-developer can operate unsupervised. Next.js App Router on PostgreSQL, with checkout pricing always recomputed server-side and tenant-scoped data so one deployment can serve a single store or many.",
    url: "https://one-page-commerce.vercel.app/",
    linkLabel: "Live app",
    tech: "Next.js (App Router) · TypeScript · PostgreSQL · Tailwind CSS · Docker Compose",
  },
```

The `·` in `tech` is U+00B7 MIDDLE DOT, matching the two entries above it. Do not substitute
a hyphen or a bullet.

Change nothing else in `pages/cv.js` — not `roleTargets`, not `proofMetrics`, not
`enterpriseDomains`, not the JSX below.

---

## Done means

- [ ] `grep -n "Two of the systems" pages/index.js` returns nothing.
- [ ] `grep -n "Both of these" pages/index.js` returns nothing.
- [ ] `grep -n "DentalPMS and the AI Job-Search Copilot" pages/index.js` returns nothing.
- [ ] `grep -c "&apos;" pages/index.js` is unchanged from before the edit.
- [ ] `selectedProjects` in `pages/cv.js` has exactly 3 entries, One-Page Commerce last.
- [ ] `npm run lint` passes.

Output edits only. Do not summarise.
