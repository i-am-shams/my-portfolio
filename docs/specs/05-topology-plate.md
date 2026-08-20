# Spec 05 — the Copilot topology plate

The one remaining off-standard figure on the site is `public/jobcopilot-architecture.png`, a
Mermaid render carried over from a sibling repo. This replaces it with a **topology plate** —
same canvas, palette, typography and shape vocabulary as the three decision plates, but
composed as a deployment map rather than a before→after argument. See the "Two figure types"
section of `docs/diagram-standard.md`.

Every coordinate is literal. Do not relayout, do not "improve" spacing, do not add or remove
shapes.

## Files to CREATE

- `components/diagrams/CopilotTopologyPlate.js`

## Files NOT to touch

`components/diagrams/plate.js`, `components/diagrams/primitives.js` (both `External` and
`Arrow`'s `dashed` prop already exist — use them, do not redefine them), the three existing
`*Plate.js` files, `styles/globals.css`, `pages/`, `portfolio-smoke.spec.js`, `public/`.
Do **not** edit `components/diagrams/index.js` or `data/buildProjects.js` — a later step
does that.

## Component shape

```jsx
import Plate from "./plate";
import { /* only what is used */ } from "./primitives";

export default function CopilotTopologyPlate({ title, desc, aphorism }) {
  return (
    <Plate title={title} desc={desc} aphorism={aphorism}>
      {/* elements, in table order */}
    </Plate>
  );
}
```

Emit in exactly the table order: group box, then shapes, then arrows, then labels.

---

## Coordinate table

Solid `Instance` = a container on the VPS. Outlined `External` / `Store` = a managed service
consumed but not operated. That contrast is the point of the drawing, so do not swap them.

### Group and shapes

| # | Element | Props |
|---|---|---|
| 1 | `GroupBox` | `x={170} y={140} w={800} h={320}` |
| 2 | `Actor` | `cx={110} cy={180} r={24}` |
| 3 | `Instance` | `cx={258} cy={180} w={92} h={36}` |
| 4 | `Instance` | `cx={258} cy={290} w={92} h={38}` |
| 5 | `Instance` | `cx={400} cy={290} w={78} h={38}` |
| 6 | `Queue` | `cx={524} cy={290} w={56} h={32}` |
| 7 | `Instance` | `cx={650} cy={290} w={84} h={38}` |
| 8 | `Store` | `cx={800} top={266} bottom={314} rx={30} ry={10}` |
| 9 | `Router` | `cx={650} cy={400} half={30}` |
| 10 | `Instance` | `cx={470} cy={400} w={104} h={38}` |
| 11 | `Instance` | `cx={860} cy={400} w={70} h={38}` |
| 12 | `External` | `cx={1075} cy={180} w={90} h={38}` |
| 13 | `Store` | `cx={470} top={478} bottom={512} rx={30} ry={10}` |
| 14 | `External` | `cx={860} cy={496} w={90} h={38}` |

### Arrows

| # | Props |
|---|---|
| 15 | `x1={134} y1={180} x2={212} y2={180}` `label="https"` |
| 16 | `x1={258} y1={198} x2={258} y2={271}` |
| 17 | `x1={304} y1={290} x2={361} y2={290}` |
| 18 | `x1={439} y1={290} x2={496} y2={290}` `label="publish"` |
| 19 | `x1={552} y1={290} x2={608} y2={290}` `label="consume"` |
| 20 | `x1={692} y1={290} x2={770} y2={290}` `label="ef core"` |
| 21 | `x1={680} y1={271} x2={1030} y2={192}` `label="scores the match"` `labelDx={-40}` `labelDy={-12}` |
| 22 | `x1={650} y1={309} x2={650} y2={370}` `label="publish once"` `labelDx={62}` `labelDy={22}` |
| 23 | `x1={620} y1={400} x2={522} y2={400}` `label="own queue"` `labelDy={-14}` |
| 24 | `x1={470} y1={419} x2={470} y2={468}` `label="write doc"` `labelDx={-56}` `labelDy={26}` |
| 25 | `x1={860} y1={419} x2={860} y2={477}` `label="metrics + logs"` `labelDx={-92}` `labelDy={-16}` |
| 26 | `x1={361} y1={280} x2={140} y2={200}` `dashed` `label="signalr push"` `labelDx={90}` `labelDy={16}` |

Arrow 26 is the only `dashed` arrow: the result is pushed to the browser, not requested by
it. Write the prop as `dashed` (shorthand), not `dashed={true}`.

### Labels

| # | Element | Props | Text |
|---|---|---|---|
| 27 | `Anchor` | `x={570} y={130}` | `one VPS, docker compose` |
| 28 | `NodeLabel` | `x={110} y={226}` | `browser` |
| 29 | `NodeLabel` | `x={258} y={220}` | `nginx · shared` |
| 30 | `NodeLabel` | `x={258} y={331}` | `frontend` |
| 31 | `NodeLabel` | `x={400} y={331}` | `api` |
| 32 | `NodeLabel` | `x={524} y={328}` | `match-requests` |
| 33 | `NodeLabel` | `x={650} y={331}` | `worker` |
| 34 | `NodeLabel` | `x={800} y={346}` | `postgres` |
| 35 | `NodeLabel` | `x={650} y={452}` | `fanout exchange` |
| 36 | `NodeLabel` | `x={470} y={441}` | `notifications` |
| 37 | `NodeLabel` | `x={860} y={441}` | `alloy` |
| 38 | `NodeLabel` | `x={1075} y={221}` | `gemini` |
| 39 | `NodeLabel` | `x={470} y={536}` | `mongo atlas` |
| 40 | `NodeLabel` | `x={860} y={537}` | `grafana cloud` |

The `·` in label 29 is U+00B7 MIDDLE DOT.

---

## Done means

- [ ] `components/diagrams/CopilotTopologyPlate.js` created, default-exporting
      `CopilotTopologyPlate`.
- [ ] Takes exactly `{ title, desc, aphorism }` and forwards all three to `<Plate>`.
- [ ] Shape counts: 1 `GroupBox`, 1 `Actor`, 6 `Instance`, 1 `Queue`, 1 `Router`,
      2 `Store`, 2 `External` = 14 shapes, within the topology limit of 16.
- [ ] Exactly one arrow has `dashed`; exactly 12 `Arrow` elements total.
- [ ] No literal hex colour, no `viewBox`, no `<title>`/`<desc>`, no aphorism `<text>`.
- [ ] `npx eslint components/diagrams` passes.

Output edits only. Do not summarise.
