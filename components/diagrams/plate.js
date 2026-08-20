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
