// Converts backtick-delimited spans to <code> elements so data strings stay plain text.
function renderText(text) {
  const parts = text.split(/`([^`]+)`/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded bg-slate-200 px-1 py-0.5 font-mono text-sm dark:bg-slate-700"
      >
        {part}
      </code>
    ) : (
      part
    )
  );
}

export default function KbEntry({ entry }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
        {entry.category.join(" · ")}
      </p>
      <h2 className="mb-6 text-xl font-semibold leading-snug text-slate-950 dark:text-white">
        {entry.title}
      </h2>
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            Context
          </p>
          <p className="leading-7 text-slate-600 dark:text-slate-300">
            {renderText(entry.context)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            Mechanism
          </p>
          <p className="leading-7 text-slate-600 dark:text-slate-300">
            {renderText(entry.mechanism)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            Correct pattern
          </p>
          <p className="leading-7 text-slate-600 dark:text-slate-300">
            {renderText(entry.pattern)}
          </p>
        </div>
      </div>
      <blockquote className="mt-6 border-l-2 border-amber-400 pl-4">
        <p className="font-serif italic text-slate-700 dark:text-slate-200">
          {entry.rule}
        </p>
      </blockquote>
    </article>
  );
}
