import { plateTokens } from "./plate";

const STROKE = 2;
const LABEL_GAP = 22;   // node label sits this far below a shape's bottom edge
const ANCHOR_GAP = 28;  // anchor label sits this far below a group's bottom edge

export function GroupBox({ x, y, w, h, cells = 1 }) {
  const dividers = [];
  for (let i = 1; i < cells; i++) {
    dividers.push(
      <line
        key={`divider-${i}`}
        x1={x}
        y1={y + (h * i) / cells}
        x2={x + w}
        y2={y + (h * i) / cells}
        stroke={plateTokens.rule}
        strokeWidth={STROKE}
        strokeDasharray="7 6"
      />
    );
  }
  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        stroke={plateTokens.rule}
        strokeWidth={STROKE}
        strokeDasharray="7 6"
        rx="3"
      />
      {dividers}
    </>
  );
}

/**
 * A human or external client. Neutral by default.
 *
 * `mood="unhappy"` draws a frown, and is only correct when the person's
 * dissatisfaction is the thing the figure is arguing about - a before-state where
 * the current design is failing them. It was previously the unconditional default,
 * copied from the reference figure where the client really was unhappy with the
 * monolith, which left a sad user standing in the middle of a topology plate whose
 * whole point is that the system works.
 */
export function Actor({ cx, cy, r = 26, mood = 'neutral' }) {
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={plateTokens.ink}
        strokeWidth={STROKE}
      />
      <circle
        cx={cx - r * 0.32}
        cy={cy - r * 0.22}
        r="2.6"
        fill={plateTokens.ink}
      />
      <circle
        cx={cx + r * 0.32}
        cy={cy - r * 0.22}
        r="2.6"
        fill={plateTokens.ink}
      />
      <path
        fill="none"
        stroke={plateTokens.ink}
        strokeWidth={STROKE}
        strokeLinecap="round"
        d={
          mood === 'unhappy'
            ? `M ${cx - r * 0.34} ${cy + r * 0.42} Q ${cx} ${cy + r * 0.16} ${cx + r * 0.34} ${cy + r * 0.42}`
            : `M ${cx - r * 0.3} ${cy + r * 0.34} L ${cx + r * 0.3} ${cy + r * 0.34}`
        }
      />
    </>
  );
}

export function Router({ cx, cy, half = 38 }) {
  return (
    <polygon
      points={`${cx},${cy - half} ${cx + half},${cy} ${cx},${cy + half} ${cx - half},${cy}`}
      fill="none"
      stroke={plateTokens.ink}
      strokeWidth={STROKE}
    />
  );
}

export function Instance({ cx, cy, w = 68, h = 46 }) {
  return (
    <>
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx="4"
        fill={plateTokens.ink}
      />
      <rect
        x={cx - w * 0.28}
        y={cy - h / 2 + h * 0.28 - 1.5}
        width={w * 0.56}
        height="3"
        rx="1.5"
        fill={plateTokens.ground}
      />
      <rect
        x={cx - w * 0.28}
        y={cy - 1.5}
        width={w * 0.56}
        height="3"
        rx="1.5"
        fill={plateTokens.ground}
      />
      <rect
        x={cx - w * 0.28}
        y={cy - h / 2 + h * 0.72 - 1.5}
        width={w * 0.56}
        height="3"
        rx="1.5"
        fill={plateTokens.ground}
      />
    </>
  );
}

export function Store({ cx, top, bottom, rx = 34, ry = 11 }) {
  return (
    <>
      <path
        fill="none"
        stroke={plateTokens.ink}
        strokeWidth={STROKE}
        d={`M ${cx - rx} ${top} L ${cx - rx} ${bottom} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bottom} L ${cx + rx} ${top}`}
      />
      <ellipse
        cx={cx}
        cy={top}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={plateTokens.ink}
        strokeWidth={STROKE}
      />
    </>
  );
}

export function Queue({ cx, cy, w = 56, h = 36 }) {
  return (
    <>
      <path
        fill="none"
        stroke={plateTokens.ink}
        strokeWidth={STROKE}
        d={`M ${cx + w / 2} ${cy - h / 2} L ${cx - w / 2} ${cy - h / 2} L ${cx - w / 2} ${cy + h / 2} L ${cx + w / 2} ${cy + h / 2}`}
      />
      <line
        x1={cx - w * 0.18}
        y1={cy - h / 2 + 5}
        x2={cx - w * 0.18}
        y2={cy + h / 2 - 5}
        stroke={plateTokens.ink}
        strokeWidth="1.5"
      />
      <line
        x1={cx}
        y1={cy - h / 2 + 5}
        x2={cx}
        y2={cy + h / 2 - 5}
        stroke={plateTokens.ink}
        strokeWidth="1.5"
      />
      <line
        x1={cx + w * 0.18}
        y1={cy - h / 2 + 5}
        x2={cx + w * 0.18}
        y2={cy + h / 2 - 5}
        stroke={plateTokens.ink}
        strokeWidth="1.5"
      />
    </>
  );
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  head = true,
  dashed = false,
  label,
  labelDx = 0,
  labelDy = -9,
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  
  const arrowHead = head ? (
    <polygon
      points={`${x2.toFixed(2)},${y2.toFixed(2)} ${(x2 - 11 * Math.cos(a - 0.36)).toFixed(2)},${(y2 - 11 * Math.sin(a - 0.36)).toFixed(2)} ${(x2 - 11 * Math.cos(a + 0.36)).toFixed(2)},${(y2 - 11 * Math.sin(a + 0.36)).toFixed(2)}`}
      fill={plateTokens.ink}
    />
  ) : null;
  
  const labelElement = label ? (
    <text
      x={((x1 + x2) / 2 + labelDx).toFixed(2)}
      y={((y1 + y2) / 2 + labelDy).toFixed(2)}
      textAnchor="middle"
      fontFamily={plateTokens.serif}
      fontSize="13"
      fontStyle="italic"
      fill={plateTokens.inkText}
    >
      {label}
    </text>
  ) : null;

  return (
    <>
      <line
        x1={x1.toFixed(2)}
        y1={y1.toFixed(2)}
        x2={x2.toFixed(2)}
        y2={y2.toFixed(2)}
        stroke={plateTokens.ink}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={dashed ? "5 5" : undefined}
      />
      {arrowHead}
      {labelElement}
    </>
  );
}

/**
 * A managed service consumed but not operated - outline only, deliberately
 * distinct from the solid `Instance`, which marks a container you run yourself.
 */
export function External({ cx, cy, w = 90, h = 38 }) {
  return (
    <rect
      x={cx - w / 2}
      y={cy - h / 2}
      width={w}
      height={h}
      rx="4"
      fill="none"
      stroke={plateTokens.ink}
      strokeWidth={STROKE}
    />
  );
}

export function Cross({ cx, cy, size = 9 }) {
  return (
    <>
      <line
        x1={cx - size}
        y1={cy - size}
        x2={cx + size}
        y2={cy + size}
        stroke={plateTokens.ink}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <line
        x1={cx - size}
        y1={cy + size}
        x2={cx + size}
        y2={cy - size}
        stroke={plateTokens.ink}
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    </>
  );
}

export function Transform({ x1, x2, y, verb }) {
  return (
    <>
      <line
        x1={x1}
        y1={y}
        x2={x2 - 12}
        y2={y}
        stroke={plateTokens.ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polygon
        points={`${x2},${y} ${x2 - 14},${y - 7} ${x2 - 14},${y + 7}`}
        fill={plateTokens.ink}
      />
      <text
        x={((x1 + x2) / 2).toFixed(2)}
        y={(y - 22).toFixed(2)}
        textAnchor="middle"
        fontFamily={plateTokens.serif}
        fontSize="15"
        fontStyle="italic"
        fill={plateTokens.inkText}
      >
        {verb}
      </text>
    </>
  );
}

export function NodeLabel({ x, y, children }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily={plateTokens.serif}
      fontSize="15"
      fontStyle="italic"
      fill={plateTokens.inkText}
    >
      {children}
    </text>
  );
}

export function CellLabel({ x, y, faint = false, children }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily={plateTokens.serif}
      fontSize="15"
      fontStyle="italic"
      fill={plateTokens.inkText}
      opacity={faint ? 0.3 : 1}
    >
      {children}
    </text>
  );
}

export function Anchor({ x, y, children }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily={plateTokens.serif}
      fontSize="17"
      fontStyle="italic"
      fontWeight="700"
      fill={plateTokens.label}
    >
      {children}
    </text>
  );
}

export { LABEL_GAP, ANCHOR_GAP };
