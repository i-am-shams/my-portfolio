# Spec 02 — the three plate components

Every coordinate below is literal. Do not relayout, do not "improve" spacing, do not add or
remove shapes. Read `components/diagrams/primitives.js` first for the exact prop names.

## Files to CREATE

- `components/diagrams/FanoutPlate.js`
- `components/diagrams/TenantFilterPlate.js`
- `components/diagrams/ServerPricePlate.js`

## Files NOT to touch

`components/diagrams/plate.js`, `components/diagrams/primitives.js`, `styles/globals.css`,
`components/BuildProject.js`, `data/buildProjects.js`, `pages/`, `portfolio-smoke.spec.js`.
Do **not** create `components/diagrams/index.js` — a later spec does that.

## Shape shared by all three files

```jsx
import Plate from "./plate";
import { /* only the primitives that file actually uses */ } from "./primitives";

export default function XxxPlate({ title, desc, aphorism }) {
  return (
    <Plate title={title} desc={desc} aphorism={aphorism}>
      {/* elements, in the order given in the table */}
    </Plate>
  );
}
```

`title`, `desc` and `aphorism` are **props**, passed in from the data file. Do not hardcode
them inside the component.

Emit elements in exactly the table order — arrows before the shapes they touch would let a
stroke sit on top of a filled `Instance`. Shapes first, then arrows, then labels.

---

## 1. `FanoutPlate.js` — AI Job-Search Copilot

A queue delivers each message to one consumer; an exchange delivers a copy to every bound
queue. Left: one queue round-robining between two consumers. Right: a fanout exchange, two
independent services, two independent stores.

| # | Element | Props |
|---|---|---|
| 1 | `GroupBox` | `x={110} y={205} w={230} h={210}` |
| 2 | `Queue` | `cx={170} cy={310} w={54} h={34}` |
| 3 | `Instance` | `cx={275} cy={268} w={62} h={44}` |
| 4 | `Instance` | `cx={275} cy={352} w={62} h={44}` |
| 5 | `Arrow` | `x1={197} y1={310} x2={244} y2={270}` `label="½"` `labelDy={-6}` |
| 6 | `Arrow` | `x1={197} y1={310} x2={244} y2={350}` `label="½"` `labelDy={14}` |
| 7 | `NodeLabel` | `x={170} y={366}` → `queue` |
| 8 | `Anchor` | `x={225} y={443}` → `round-robin` |
| 9 | `Transform` | `x1={375} x2={554} y={320}` `verb="fan out"` |
| 10 | `Router` | `cx={600} cy={320} half={38}` |
| 11 | `Instance` | `cx={790} cy={240} w={68} h={46}` |
| 12 | `Instance` | `cx={790} cy={400} w={68} h={46}` |
| 13 | `Store` | `cx={985} top={212} bottom={268}` |
| 14 | `Store` | `cx={985} top={372} bottom={428}` |
| 15 | `Arrow` | `x1={627} y1={297} x2={756} y2={240}` |
| 16 | `Arrow` | `x1={627} y1={343} x2={756} y2={400}` |
| 17 | `Arrow` | `x1={824} y1={240} x2={951} y2={240}` |
| 18 | `Arrow` | `x1={824} y1={400} x2={951} y2={400}` |
| 19 | `NodeLabel` | `x={600} y={380}` → `exchange` |
| 20 | `NodeLabel` | `x={790} y={285}` → `api` |
| 21 | `NodeLabel` | `x={790} y={445}` → `notifications` |
| 22 | `NodeLabel` | `x={985} y={292}` → `postgres` |
| 23 | `NodeLabel` | `x={985} y={452}` → `mongo` |

---

## 2. `TenantFilterPlate.js` — DentalPMS

Left: one dashed box of three hand-written `where clinic_id = ?` clauses, the third faded —
the one somebody forgets. Right: three modules whose every query passes through a single
global filter before it reaches the database.

| # | Element | Props |
|---|---|---|
| 1 | `GroupBox` | `x={110} y={215} w={250} h={200} cells={3}` |
| 2 | `CellLabel` | `x={235} y={254}` → `where clinic_id = ?` |
| 3 | `CellLabel` | `x={235} y={321}` → `where clinic_id = ?` |
| 4 | `CellLabel` | `x={235} y={388} faint` → `where clinic_id = ?` |
| 5 | `Anchor` | `x={235} y={443}` → `every query, by hand` |
| 6 | `Transform` | `x1={395} x2={500} y={315}` `verb="hoist"` |
| 7 | `Instance` | `cx={585} cy={235} w={80} h={44}` |
| 8 | `Instance` | `cx={585} cy={320} w={80} h={44}` |
| 9 | `Instance` | `cx={585} cy={405} w={80} h={44}` |
| 10 | `Router` | `cx={790} cy={320} half={42}` |
| 11 | `Store` | `cx={985} top={285} bottom={355} rx={36} ry={12}` |
| 12 | `Arrow` | `x1={625} y1={235} x2={750} y2={300}` |
| 13 | `Arrow` | `x1={625} y1={320} x2={746} y2={320}` |
| 14 | `Arrow` | `x1={625} y1={405} x2={750} y2={340}` |
| 15 | `Arrow` | `x1={832} y1={320} x2={947} y2={320}` |
| 16 | `NodeLabel` | `x={585} y={279}` → `appointments` |
| 17 | `NodeLabel` | `x={585} y={364}` → `billing` |
| 18 | `NodeLabel` | `x={585} y={449}` → `charting` |
| 19 | `NodeLabel` | `x={790} y={384}` → `global filter` |
| 20 | `NodeLabel` | `x={985} y={392}` → `postgres` |

`CellLabel` #4 takes the boolean prop `faint` — write it as `faint` (shorthand), not
`faint={true}`.

---

## 3. `ServerPricePlate.js` — One-Page Commerce

Left: the browser posts a total and checkout believes it. Right: the same request arrives,
its price is dropped on the floor, and checkout recomputes from the pricing table — landing
on a different number.

| # | Element | Props |
|---|---|---|
| 1 | `GroupBox` | `x={100} y={225} w={290} h={180}` |
| 2 | `Actor` | `cx={165} cy={315}` |
| 3 | `Instance` | `cx={322} cy={315} w={68} h={46}` |
| 4 | `Arrow` | `x1={191} y1={315} x2={288} y2={315}` `label="total: 499"` |
| 5 | `NodeLabel` | `x={322} y={360}` → `checkout` |
| 6 | `Anchor` | `x={245} y={433}` → `client-posted total` |
| 7 | `Transform` | `x1={425} x2={530} y={315}` `verb="recompute"` |
| 8 | `Actor` | `cx={610} cy={315}` |
| 9 | `Instance` | `cx={790} cy={315} w={76} h={48}` |
| 10 | `Store` | `cx={990} top={285} bottom={345}` |
| 11 | `Arrow` | `x1={636} y1={315} x2={694} y2={315}` `head={false}` `label="total: 499"` `labelDx={-6}` `labelDy={-14}` |
| 12 | `Cross` | `cx={706} cy={315}` |
| 13 | `Arrow` | `x1={954} y1={315} x2={832} y2={315}` |
| 14 | `NodeLabel` | `x={610} y={366}` → `client` |
| 15 | `NodeLabel` | `x={790} y={361}` → `checkout` |
| 16 | `NodeLabel` | `x={790} y={385}` → `total: 449` |
| 17 | `NodeLabel` | `x={990} y={369}` → `pricing` |

Element 11 is the only `Arrow` in any plate with `head={false}` — it stops at the `Cross`
rather than reaching checkout, which is the point of the drawing. Do not add a head to it.

---

## Done means

- [ ] Three files created, each default-exporting a component named for its file.
- [ ] Each takes exactly `{ title, desc, aphorism }` and forwards all three to `<Plate>`.
- [ ] No file contains a literal hex colour, a `viewBox`, a `<title>`, a `<desc>`, or the
      aphorism `<text>` — all of that belongs to `<Plate>`.
- [ ] Shape counts: Fanout 8, TenantFilter 6, ServerPrice 7 (a `GroupBox` counts as one;
      `Arrow`, `Cross`, `Transform` and all labels do not count).
- [ ] Every coordinate matches its table exactly. Grep one from each file to confirm.
- [ ] `npx eslint components/diagrams` passes.

Output edits only. Do not summarise.
