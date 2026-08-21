# Spec 09 — align the online CV with the generated resume

`data/resume.json` now carries a `projects` array with metric-led bullets, and it is what
`scripts/build_resume_docx.py` and `scripts/build-resume-txt.mjs` render from. But
`pages/cv.js` still holds its own hardcoded `selectedProjects` constant with different,
weaker copy — a second source of truth that will drift, exactly as the `.docx` did.

This makes `resume.json` the only source, and surfaces the project metrics on `/cv` where a
recruiter can see them.

## Files to EDIT

- `pages/cv.js`
- `scripts/build-resume-txt.mjs`

## Files NOT to touch

`data/resume.json`, `data/profile.js`, `data/buildProjects.js`, `pages/index.js`,
`components/`, `scripts/build_resume_docx.py`, `portfolio-smoke.spec.js`, `styles/`.

---

## Step 1 — `pages/cv.js`: delete the duplicate, render from data

### 1a. Remove the local constant

Delete the entire `const selectedProjects = [ ... ];` array (three entries: DentalPMS, AI
Job-Search Copilot, One-Page Commerce). It is replaced by `resumeData.projects`.

### 1b. Replace the Selected Projects section body

Find the `<Section title="Selected Projects">` block and replace its `{selectedProjects.map(...)}`
JSX with the following. Keep the `<Section>` wrapper and its existing grid/container classes
exactly as they are; only the mapped `<article>` changes.

```jsx
              {resumeData.projects.map((project) => (
                <article
                  key={project.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 print:rounded-none print:border-0 print:bg-transparent print:shadow-none print:p-0"
                >
                  <h3 className="mb-1 text-xl font-semibold text-slate-950 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="mb-3 text-slate-600 dark:text-slate-300">{project.tagline}</p>
                  <p className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} — live`}
                      className="font-medium text-blue-700 hover:underline dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 rounded"
                    >
                      Live
                    </a>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} — source`}
                        className="font-medium text-blue-700 hover:underline dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 rounded"
                      >
                        Source
                      </a>
                    )}
                  </p>
                  <ul className="mb-3 space-y-2 text-slate-600 dark:text-slate-300">
                    {project.bullets.map((item) => (
                      <li key={item} className="border-l-2 border-blue-500 pl-3 print:border-0 print:pl-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{project.stack}</p>
                </article>
              ))}
```

### 1c. Add availability to the CV header

The homepage states availability; `/cv` does not, and a recruiter often lands here first from
the PDF. Immediately after the paragraph rendering `careerObjective` in the hero card, insert:

```jsx
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {siteProfile.availability.status} · {siteProfile.availability.base} ·{" "}
                {siteProfile.availability.notice} notice
              </p>
```

`siteProfile` is already imported in this file. The `·` is U+00B7 MIDDLE DOT.

---

## Step 2 — `scripts/build-resume-txt.mjs`: add the projects section

The plain-text resume currently jumps from SUMMARY to EXPERIENCE, so an ATS paste loses the
three projects entirely. Insert a PROJECTS block **between** the SUMMARY block and the
EXPERIENCE block:

```js
rule();
lines.push("SELECTED PROJECTS");
for (const project of resume.projects) {
  lines.push("");
  lines.push(`${project.name} - ${project.tagline}`);
  lines.push(`  ${project.url}${project.repo ? ` | ${project.repo}` : ""}`);
  for (const item of project.bullets) lines.push(`  - ${item}`);
  lines.push(`  Stack: ${project.stack}`);
}
```

Also extend the header location line, which currently reads "open to remote roles worldwide,
or on-site in Dhaka" — leave it exactly as it is. Do not change anything else in this file.

---

## Done means

- [ ] `grep -c "const selectedProjects" pages/cv.js` returns 0.
- [ ] `/cv` renders 3 projects, each with 3 bullets and a stack line.
- [ ] The AI Job-Search Copilot card is the only one showing a "Source" link.
- [ ] `/cv` shows the availability line under the career objective.
- [ ] `npm run resume:txt` output contains "SELECTED PROJECTS" and all three project names.
- [ ] `public/resume.txt` still contains all 7 company names.
- [ ] `npm run lint` passes and `npm run build` succeeds.

Output edits only. Do not summarise.
