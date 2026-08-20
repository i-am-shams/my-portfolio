# Spec 03 — plate registry, data model split, `BuildProject` renderer

Splits each project's single `diagram` field into two: `diagram` (the architecture plate)
and `screenshot` (the raster image). They are different evidence and both stay on the card.

## Files to CREATE

- `components/diagrams/index.js`

## Files to EDIT

- `data/buildProjects.js`
- `components/BuildProject.js`

## Files NOT to touch

`components/diagrams/plate.js`, `components/diagrams/primitives.js`, the three `*Plate.js`
files, `styles/globals.css`, `pages/`, `portfolio-smoke.spec.js`, anything in `public/`.

---

## Step 1 — `components/diagrams/index.js`

```jsx
import FanoutPlate from "./FanoutPlate";
import TenantFilterPlate from "./TenantFilterPlate";
import ServerPricePlate from "./ServerPricePlate";

const plates = {
  fanout: FanoutPlate,
  "tenant-filter": TenantFilterPlate,
  "server-price": ServerPricePlate,
};

/**
 * Resolves a project's `diagram.plate` key to its figure. Throws rather than
 * rendering nothing, so a typo'd key fails `next build` instead of silently
 * leaving a project card with no architecture figure on it.
 */
export default function PlateFigure({ diagram }) {
  const Component = plates[diagram.plate];

  if (!Component) {
    throw new Error(
      `Unknown plate "${diagram.plate}" - register it in components/diagrams/index.js`
    );
  }

  return (
    <Component title={diagram.title} desc={diagram.desc} aphorism={diagram.aphorism} />
  );
}
```

---

## Step 2 — `data/buildProjects.js`

For each of the three entries, replace the existing `diagram: { src, alt, caption }` object
with **two** objects: `diagram` then `screenshot`.

**Rules that apply to all three:**

- The existing `alt` string moves **verbatim** to `screenshot.alt`. Do not reword it.
- Keep `screenshot.src` pointing at the same file it points at today.
- Everything else in each project entry — `slug`, `stats`, `summary`, `architecture`,
  `decisions`, `stack`, `knownGaps` — is unchanged.

### `dental-pms`

```js
    diagram: {
      plate: "tenant-filter",
      title:
        "Tenant isolation in DentalPMS: hand-written clinic filters hoisted into one global query filter",
      desc:
        "Before and after. On the left, a dashed box holding three separate hand-written 'where clinic_id = ?' clauses, the third faded to stand for the one a developer eventually forgets. An arrow labelled 'hoist' leads to the right, where the appointments, billing and charting modules all send their queries through a single diamond labelled 'global filter' before reaching one postgres database.",
      aphorism: "One filter. Every query.",
      caption:
        "Tenant scoping is applied by EF Core global query filters at the DbContext, not by a WHERE clause each developer has to remember. In a multi-tenant medical system a forgotten filter is not a bug, it is a data breach - so the design makes the unsafe query impossible to write by accident, and IgnoreQueryFilters() is permitted only in narrow, documented admin paths.",
    },
    screenshot: {
      src: "/dentalpms-dashboard.png",
      width: 1400,
      height: 900,
      alt: /* the existing alt string, moved verbatim */,
      caption: /* the existing caption string, moved verbatim */,
    },
```

### `ai-job-search-copilot`

The existing `caption` on this project is about the fanout decision, so it moves to
`diagram.caption` verbatim. The screenshot gets the **new** caption written below.

```js
    diagram: {
      plate: "fanout",
      title:
        "Fanout in the AI Job-Search Copilot: one queue round-robining between two consumers, replaced by an exchange that copies every event to both",
      desc:
        "Before and after. On the left, a dashed box labelled 'round-robin' in which one queue splits its deliveries between two consumers, each edge marked one half. An arrow labelled 'fan out' leads to the right, where a diamond labelled 'exchange' delivers to two independent services, api and notifications, each writing to its own store - postgres and mongo.",
      aphorism: "One publish. Two copies.",
      caption: /* the existing caption string, moved verbatim */,
    },
    screenshot: {
      src: "/jobcopilot-architecture.png",
      width: 784,
      height: 1107,
      alt: /* the existing alt string, moved verbatim */,
      caption:
        "The full deployed topology for reference - seven containers on one VPS, kept in sync with the project's own repo rather than redrawn here. It predates the figure standard above and is kept deliberately: the plate argues one decision, this documents the whole system.",
    },
```

### `one-page-commerce`

```js
    diagram: {
      plate: "server-price",
      title:
        "Checkout pricing in One-Page Commerce: the client-posted total is discarded and recomputed server-side",
      desc:
        "Before and after. On the left, a dashed box labelled 'client-posted total' in which a browser sends 'total: 499' straight into checkout. An arrow labelled 'recompute' leads to the right, where the same request arrives but its price is stopped by a cross before it reaches checkout; checkout instead reads from a pricing store and arrives at a different total, 449.",
      aphorism: "Client asks. Server decides.",
      caption:
        "Every checkout submission recalculates price, discount, and delivery fee from the database, never from what the client posts. A single-product storefront is exactly the kind of app where a client-trusted price field is the obvious attack - so the design closes it structurally rather than relying on validation someone could forget to add.",
    },
    screenshot: {
      src: "/onepagecommerce-storefront.png",
      width: 1280,
      height: 900,
      alt: /* the existing alt string, moved verbatim */,
      caption: /* the existing caption string, moved verbatim */,
    },
```

---

## Step 3 — `components/BuildProject.js`

Add to the imports at the top of the file:

```js
import PlateFigure from "@/components/diagrams";
```

Replace the **entire** existing `{project.diagram && ( … )}` block — currently the `<figure>`
containing an `<Image>` with `width={1600} height={900}` — with these two blocks, in this
order:

```jsx
      {project.diagram && (
        <figure className="mb-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <PlateFigure diagram={project.diagram} />
          </div>
          <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {project.diagram.caption}
          </figcaption>
        </figure>
      )}

      {project.screenshot && (
        <figure className="mb-8">
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={project.screenshot.width}
            height={project.screenshot.height}
            className="h-auto w-full rounded-2xl border border-slate-200 bg-white dark:border-slate-700"
          />
          <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {project.screenshot.caption}
          </figcaption>
        </figure>
      )}
```

Keep the `Image` import — it is still used. Change nothing else in this file: not the
header, not the stats row, not the demo credentials panel, not the two-column grid, not the
decisions grid, not the stack pills.

---

## Done means

- [ ] `components/diagrams/index.js` default-exports `PlateFigure` and throws on an unknown
      key.
- [ ] All three entries in `data/buildProjects.js` have both a `diagram` and a `screenshot`.
- [ ] No `diagram` object anywhere still has a `src` key. No `screenshot` object has a
      `plate` key.
- [ ] All three `screenshot.width` / `screenshot.height` pairs match the table above —
      1400×900, 784×1107, 1280×900. They are **not** all 1600×900.
- [ ] Every `alt` and every moved `caption` is byte-identical to what was there before.
- [ ] `components/BuildProject.js` renders the plate first, the screenshot second, each in
      its own `<figure>` with its own `<figcaption>`.
- [ ] `npm run lint` passes and `npm run build` succeeds.

Output edits only. Do not summarise.
