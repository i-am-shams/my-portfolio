# Spec 01 — plate tokens, `<Plate>` wrapper, primitive library

Implement exactly what is written here. Every number is literal. Do not redesign, do not
relayout, do not add props that are not listed.

## Files to CREATE

- `components/diagrams/plate.js`
- `components/diagrams/primitives.js`

## Files to EDIT

- `styles/globals.css` — additive only, see step 1

## Files NOT to touch

`components/BuildProject.js`, `data/buildProjects.js`, `pages/index.js`, `pages/cv.js`,
`portfolio-smoke.spec.js`, `tailwind.config.js`, `next.config.mjs`, anything in `public/`.
Do not create any other file under `components/diagrams/`.

---

## Step 1 — `styles/globals.css`

Add the plate tokens to the **existing** `:root` block and the **existing** `.dark` block.
Do not remove or reorder anything already in those blocks.

Into the existing `:root { … }`:

```css
  --plate-ground: #efe9da;
  --plate-ink: #2f7a51;
  --plate-ink-text: #256640;
  --plate-label: #1a1a1a;
  --plate-rule: #2a2a2a;
```

Into the existing `.dark { … }`:

```css
  --plate-ground: #12180f;
  --plate-ink: #6fbf8f;
  --plate-ink-text: #8ed3a8;
  --plate-label: #e8e4d8;
  --plate-rule: #8a8f84;
```

Then, inside the **existing** `@media print { … }` block, add this rule as the last rule in
that block:

```css
  :root {
    --plate-ground: #ffffff;
    --plate-ink: #1a1a1a;
    --plate-ink-text: #1a1a1a;
    --plate-label: #1a1a1a;
    --plate-rule: #1a1a1a;
  }
```

---

## Step 2 — `components/diagrams/plate.js`

```jsx
const SERIF =
  'Georgia, "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, "Times New Roman", serif';

export const plateTokens = {
  serif: SERIF,
  ground: "var(--plate-ground)",
  ink: "var(--plate-ink)",
  inkText: "var(--plate-ink-text)",
  label: "var(--plate-label)",
  rule: "var(--plate-rule)",
};

/**
 * The fixed canvas every architecture figure is composed on. See
 * `docs/diagram-standard.md` — 1200x630, one ground, one accent, and an aphorism
 * positioned here rather than by each figure so it cannot drift between plates.
 */
export default function Plate({ title, desc, aphorism, children }) {
  return (
    <svg
      viewBox="0 0 1200 630"
      role="img"
      aria-labelledby={undefined}
      className="h-auto w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <desc>{desc}</desc>
      <rect x="0" y="0" width="1200" height="630" fill={plateTokens.ground} />
      {children}
      <text
        x="600"
        y="583"
        textAnchor="middle"
        fontFamily={SERIF}
        fontSize="23"
        fontStyle="italic"
        fill={plateTokens.label}
      >
        {aphorism}
      </text>
    </svg>
  );
}
```

Note: `role="img"` with a child `<title>` gives the SVG its accessible name. Leave
`aria-labelledby` off entirely rather than passing `undefined` if that reads cleaner — but do
not replace `<title>` with an `aria-label`, because the `<title>` is also what the Playwright
assertions match on.

---

## Step 3 — `components/diagrams/primitives.js`

One file, named exports, no default export. Import `plateTokens` from `./plate`.
All components are pure SVG fragments — no state, no effects.

Shared constants at the top of the file:

```js
const STROKE = 2;
const LABEL_GAP = 22;   // node label sits this far below a shape's bottom edge
const ANCHOR_GAP = 28;  // anchor label sits this far below a group's bottom edge
```

### `GroupBox({ x, y, w, h, cells = 1 })`

Dashed rectangle. If `cells > 1`, draw `cells - 1` horizontal dashed dividers at evenly
spaced fractions of `h`.

- `<rect>`: `fill="none"`, `stroke={plateTokens.rule}`, `strokeWidth={STROKE}`,
  `strokeDasharray="7 6"`, `rx="3"`
- each divider `<line>`: from `(x, y + h * i / cells)` to `(x + w, y + h * i / cells)` for
  `i` in `1..cells-1`, same stroke and dasharray

### `Actor({ cx, cy, r = 26, mood = 'neutral' })`

- `<circle>` `fill="none"`, `stroke={plateTokens.ink}`, `strokeWidth={STROKE}`
- left eye: `<circle cx={cx - r * 0.32} cy={cy - r * 0.22} r="2.6" fill={plateTokens.ink} />`
- right eye: same with `cx={cx + r * 0.32}`
- mouth: `<path>` `fill="none"` `stroke={plateTokens.ink}` `strokeWidth={STROKE}`
  `strokeLinecap="round"`, with `d` chosen by `mood`:
  - `'neutral'` (default) — a flat line,
    `"M {cx - r*0.3} {cy + r*0.34} L {cx + r*0.3} {cy + r*0.34}"`
  - `'unhappy'` — an upward-curving arc,
    `"M {cx - r*0.34} {cy + r*0.42} Q {cx} {cy + r*0.16} {cx + r*0.34} {cy + r*0.42}"`

  Neutral is the default on purpose. A frown is an editorial claim about the user's
  experience and belongs only in a before-state that is arguing exactly that.

### `Router({ cx, cy, half = 38 })`

Diamond. `<polygon>` with points
`{cx},{cy-half} {cx+half},{cy} {cx},{cy+half} {cx-half},{cy}`,
`fill="none"`, `stroke={plateTokens.ink}`, `strokeWidth={STROKE}`.

### `Instance({ cx, cy, w = 68, h = 46 })`

The only filled shape.

- `<rect x={cx - w/2} y={cy - h/2} width={w} height={h} rx="4" fill={plateTokens.ink} />`
- three bars, `fill={plateTokens.ground}`, each
  `x={cx - w*0.28}`, `width={w * 0.56}`, `height="3"`, `rx="1.5"`, at
  `y = cy - h/2 + h*0.28 - 1.5`, `cy - 1.5`, and `cy - h/2 + h*0.72 - 1.5`

### `Store({ cx, top, bottom, rx = 34, ry = 11 })`

Cylinder.

- body `<path>` `fill="none"` `stroke={plateTokens.ink}` `strokeWidth={STROKE}`,
  `d = "M {cx-rx} {top} L {cx-rx} {bottom} A {rx} {ry} 0 0 0 {cx+rx} {bottom} L {cx+rx} {top}"`
- top `<ellipse cx={cx} cy={top} rx={rx} ry={ry} fill="none" stroke={plateTokens.ink} strokeWidth={STROKE} />`

The `A ... 0 0 0` sweep must bulge **downward**. If it renders bulging up, change the sweep
flag from `0` to `1` and leave a one-line comment saying so.

### `Queue({ cx, cy, w = 56, h = 36 })`

Rect with an **open right edge** and three vertical ticks.

- outline `<path>` `fill="none"` `stroke={plateTokens.ink}` `strokeWidth={STROKE}`:
  `"M {cx+w/2} {cy-h/2} L {cx-w/2} {cy-h/2} L {cx-w/2} {cy+h/2} L {cx+w/2} {cy+h/2}"`
- three `<line>` ticks at `x = cx - w*0.18`, `cx`, `cx + w*0.18`, each from
  `y = cy - h/2 + 5` to `y = cy + h/2 - 5`, `stroke={plateTokens.ink}`, `strokeWidth="1.5"`

### `Arrow({ x1, y1, x2, y2, head = true, label, labelDx = 0, labelDy = -9 })`

- `<line>` `stroke={plateTokens.ink}` `strokeWidth={STROKE}` `strokeLinecap="round"`
- if `head`, draw a filled triangle at `(x2, y2)` rotated to the line's angle:
  compute `const a = Math.atan2(y2 - y1, x2 - x1);` then a `<polygon>` with the three points
  `(x2, y2)`,
  `(x2 - 11*Math.cos(a - 0.36), y2 - 11*Math.sin(a - 0.36))`,
  `(x2 - 11*Math.cos(a + 0.36), y2 - 11*Math.sin(a + 0.36))`,
  `fill={plateTokens.ink}`
- if `label`, a `<text>` at `((x1+x2)/2 + labelDx, (y1+y2)/2 + labelDy)`,
  `textAnchor="middle"`, `fontFamily={plateTokens.serif}`, `fontSize="13"`,
  `fontStyle="italic"`, `fill={plateTokens.inkText}`
- round every computed coordinate to 2 decimal places so server and client markup match
  exactly and React does not warn about hydration mismatch

### `Cross({ cx, cy, size = 9 })`

Two `<line>`s forming an ✕ — `(cx-size, cy-size)→(cx+size, cy+size)` and
`(cx-size, cy+size)→(cx+size, cy-size)`. `stroke={plateTokens.ink}`, `strokeWidth={STROKE}`,
`strokeLinecap="round"`.

### `Transform({ x1, x2, y, verb })`

The before→after hinge: one heavier arrow with an italic verb above it.

- `<line x1 y1={y} x2={x2 - 12} y2={y}>` `stroke={plateTokens.ink}` `strokeWidth="3"`
  `strokeLinecap="round"`
- `<polygon points="{x2},{y} {x2-14},{y-7} {x2-14},{y+7}" fill={plateTokens.ink} />`
- verb `<text>` at `((x1 + x2)/2, y - 22)`, `textAnchor="middle"`,
  `fontFamily={plateTokens.serif}`, `fontSize="15"`, `fontStyle="italic"`,
  `fill={plateTokens.inkText}`

### `NodeLabel({ x, y, children })`

`<text>` at `(x, y)`, `textAnchor="middle"`, `fontFamily={plateTokens.serif}`,
`fontSize="15"`, `fontStyle="italic"`, `fill={plateTokens.inkText}`.

### `CellLabel({ x, y, faint = false, children })`

Same as `NodeLabel` but with `opacity={faint ? 0.3 : 1}`.

### `Anchor({ x, y, children })`

`<text>` at `(x, y)`, `textAnchor="middle"`, `fontFamily={plateTokens.serif}`,
`fontSize="17"`, `fontStyle="italic"`, `fontWeight="700"`, `fill={plateTokens.label}`.

Also export the two gap constants so figures can position labels consistently:

```js
export { LABEL_GAP, ANCHOR_GAP };
```

---

## Done means

- [ ] `styles/globals.css` has 5 new tokens in `:root`, 5 in `.dark`, and a `:root` override
      inside the existing `@media print` block. Nothing pre-existing was removed.
- [ ] `components/diagrams/plate.js` default-exports `Plate` and named-exports `plateTokens`.
- [ ] `components/diagrams/primitives.js` named-exports exactly: `GroupBox`, `Actor`,
      `Router`, `Instance`, `Store`, `Queue`, `Arrow`, `Cross`, `Transform`, `NodeLabel`,
      `CellLabel`, `Anchor`, `LABEL_GAP`, `ANCHOR_GAP`.
- [ ] No component in either file uses `useState`, `useEffect`, or `"use client"`.
- [ ] Every colour is a `var(--plate-*)` reference via `plateTokens`. There is **no literal
      hex code** anywhere in either file.
- [ ] `npx eslint components/diagrams` passes.

Output edits only. Do not summarise.
