# Architecture figure standard — "plates"

Every architecture figure on this site is a **plate**: a composed drawing rendered as inline
SVG, in one shared visual language. Most plates draw a single engineering decision; a few
draw a deployment. This document is the standard. A new figure conforms to it or it does not
ship.

## Why plates and not Mermaid

The site previously carried one architecture diagram: a Mermaid `flowchart TD` render at
default theme, rasterised to PNG, 784×1107 portrait, copied in from a sibling repo. It had
four problems, and they are the four things this standard exists to prevent:

1. It showed **topology only**. The interesting content of this portfolio lives in each
   project's `decisions[]` — a queue that should have been an exchange, a `WHERE` clause
   that should have been a global filter, a price that should never have been trusted. A
   box-and-arrow inventory of services draws none of that. Topology is worth drawing, but
   it is not a substitute for the argument, which is why the two are separate figure types
   below rather than one compromise.
2. Its **palette was an accident** of the tool's defaults (`#FFFFDE`, `#333333`), so it read
   as a screenshot of someone else's software rather than as part of this site.
3. It was **raster**, so its text blurred on zoom, could not be selected, and could not
   restyle for dark mode.
4. Its **source of truth was in another repository**, so it could not be edited here.

Plates are React components. Live text, theme-reactive tokens, versioned in this repo,
and shaped by a fixed grammar rather than by an autolayout engine.

## Canvas

`1200 × 630`, always, `viewBox="0 0 1200 630"`.

One aspect ratio for every figure keeps the page rhythm even down the Engineering Deep Dive
section, and makes layout shift structurally impossible — there is no intrinsic-size
guessing because there is no image request.

Margins are part of the standard, not a suggestion:

| Edge | Minimum |
|---|---|
| left / right | 110px |
| top | 150px |
| bottom | 100px |

The usable band is therefore roughly `x ∈ [110, 1090]`, `y ∈ [150, 530]`, with the aphorism
alone below it. The whitespace is the design. A decision plate that fills its canvas has
failed. A topology plate may relax the left/right minimum to 60px — see the two figure types
below — but nothing may encroach on the aphorism's band.

## Palette

Tokens live in `styles/globals.css` beside `--background` / `--foreground`. Plates read them
through `var()`. This is the reason plates are inline SVG rather than `.svg` files behind
`next/image`: an `<img>` is an isolated document and would not inherit the page theme.

```css
:root {
  --plate-ground:   #efe9da;   /* warm cream */
  --plate-ink:      #2f7a51;   /* deep green — strokes and Instance fills */
  --plate-ink-text: #256640;   /* darker green — label text only */
  --plate-label:    #1a1a1a;   /* near-black — bold anchor labels, aphorism */
  --plate-rule:     #2a2a2a;   /* dashed group outlines */
}
```

**Why two greens.** `#2f7a51` on `#efe9da` lands at roughly 4.4:1. That clears the WCAG 3:1
bar for graphical objects but misses the 4.5:1 bar for text. Label text therefore uses
`--plate-ink-text` at roughly 6:1. Strokes and fills keep the lighter green, so the plate
still looks the way it is supposed to.

Dark mode inverts the ground and lifts the ink. Print forces a white ground and near-black
ink so a plate does not come out of a printer as a cream rectangle.

## Typography

System serif only. No webfont — the site loads none today and a figure is not worth a
network request or a CSP exception.

```
Georgia, "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino,
"Times New Roman", serif
```

| Role | Size | Style | Colour |
|---|---|---|---|
| node label | 15 | italic | `--plate-ink-text` |
| cell label (inside a GroupBox) | 15 | italic | `--plate-ink-text` |
| edge label | 13 | italic | `--plate-ink-text` |
| transform verb | 15 | italic | `--plate-ink-text` |
| anchor (names a group) | 17 | **bold** italic | `--plate-label` |
| aphorism | 23 | italic | `--plate-label` |

Node labels sit **22px below** their shape's bottom edge. Anchor labels sit **28px below**
their group's bottom edge. The aphorism is centred at `(600, 583)` and is positioned by
`<Plate>` itself, not by the figure — so it cannot drift between plates.

## Shape vocabulary

Fixed and closed. A figure that needs a shape not in this table needs a new row in this
table first, with a stated meaning — not an ad-hoc `<path>`.

| Primitive | Drawn as | Means |
|---|---|---|
| `GroupBox` | dashed rect, optional dashed internal dividers | one deployable unit, or a before-state being taken apart |
| `Actor` | circle, two dot eyes, arc mouth | a human or an external client |
| `Router` | diamond | a dispatch point — load balancer, exchange, gateway, filter |
| `Instance` | **solid** ink rect with three ground-coloured bars | a running compute process |
| `Store` | cylinder | a datastore |
| `External` | outlined rect, no bars | a managed service you call but do not operate |
| `Queue` | rect with an open right edge and three vertical ticks | a buffer or ordered channel |
| `Arrow` | thin line, optional head, optional italic label; `dashed` for a pushed rather than requested flow | flow |
| `Cross` | small ✕ terminating an arrow | this path is deliberately not taken |
| `Transform` | one heavy arrow with an italic verb above it | the before→after hinge |
| `Anchor` | bold italic label under a group | names the group |

`Instance` is the only filled shape. That is the whole fill rule: **`Instance` is solid,
everything else is outline.** It is what makes running code read as the substance of a
drawing and everything else as scaffolding.

In a topology plate the same rule carries a second meaning worth being deliberate about:
**solid marks what you operate, outline marks what you consume.** A container on your own
host is an `Instance`; a managed cluster or a vendor API is an `External` or a `Store`. The
weight of the drawing then falls exactly on the surface you are responsible for.

## Two figure types

Everything above — canvas, palette, typography, vocabulary — is shared. What differs is the
composition, and there are exactly two allowed shapes for a figure.

### Decision plate (the default)

Draws **one** engineering decision as before → transform → after. This is the type the
sample sets, and the type most figures should be. Nine shapes maximum.

Use it when there is an argument to make: a design that was chosen over an obvious
alternative, and a reason.

### Topology plate

Draws **what actually runs, and where the boundaries are**. No before state, no transform
arrow — a deployment is not an argument, it is a fact. Sixteen shapes maximum, and margins
relax to 60px left/right because the canvas is genuinely fuller.

Use it sparingly: at most one per project, and only when the deployment shape is itself
evidence — a claim like "seven containers in production" is worth showing rather than
asserting. A topology plate that only restates the stack pills has not earned its space.

Its extra obligations, since it is the type that most easily turns into a mess:

- **Group by deployment boundary, not by layer.** The dashed `GroupBox` should mean "this
  is one host" or "this is one deployment", never "these are the backend ones".
- **Anything outside the boundary is outline.** See the fill rule above.
- **Label every edge that carries a protocol or a guarantee** — `https`, `publish once`,
  `own bound queue`. An unlabelled arrow in a topology plate is a missed opportunity; an
  unlabelled arrow in a decision plate is usually correct restraint.

The aphorism rule is unchanged for both. A topology plate's aphorism should name the shape
of the deployment, not its contents.

## Composition rules

1. **One decision per decision plate.** Not the system — one argument from `decisions[]`.
2. **Decision plates run before → transform → after, left to right.** The before state is
   what a reasonable person would have built. The verb on the transform arrow is the
   decision. A figure with no before state must be a topology plate, or it is drawing
   nothing.
3. **Nine shapes maximum for a decision plate, sixteen for a topology plate**, counting a
   `GroupBox` as one. Text labels are not shapes.
4. **`Instance` is solid; everything else is outline.** No second accent colour.
5. **No legend, no logos, no colour-coding by technology.** Product names go in labels. If a
   plate needs a legend to be read, it is drawing too much.
6. **Aphorism: two clauses, six words maximum.** It states the takeaway, it does not
   describe the picture. *"One box. Many tiers."*

## Three layers of text, three jobs

A plate carries three distinct pieces of writing and they must not duplicate each other.

| Layer | Job | Lives in |
|---|---|---|
| `<title>` + `<desc>` | the accessible description — what a screen reader gets instead of the picture | `diagram.title` / `diagram.desc` in `data/buildProjects.js` |
| in-plate aphorism | the memorable takeaway, read in one second | `diagram.aphorism` |
| `<figcaption>` | the decision, the reasoning, and the evidence it was verified | `diagram.caption` |

The `<desc>` should be a faithful readout of the drawing. The `<figcaption>` should be able
to stand alone as prose with the image removed. The existing caption voice in
`data/buildProjects.js` is already correct and should be preserved — concrete, specific
about what was actually verified, and honest about what went wrong.

## Diagram vs screenshot

They are different evidence and both belong on a project card:

- **`screenshot`** — a real capture of the running product. Proves it exists.
- **`diagram`** — a plate. Proves it was designed.

Neither substitutes for the other. A card may carry both; the plate goes first.

## Authoring a new plate

1. Pick one entry from that project's `decisions[]`. If none of them is drawable as
   before→after, do not add a plate.
2. Write the aphorism first. If it will not compress to two clauses, the plate is trying to
   say too much.
3. Lay out on paper against the margins above, then write the coordinate table.
4. Add the component under `components/diagrams/`, register it in
   `components/diagrams/index.js`, and point the project's `diagram.plate` at the key.
5. Render it and look at it **in both themes**. The light plate is the one this standard
   describes; the dark plate is the one that will be wrong first.
