export default function Section({ title, children }) {
    return (
      <section className="mb-12 print:mb-4">
        <h2 className="mb-6 border-b border-slate-200 pb-3 text-3xl font-bold tracking-tight text-slate-950 dark:border-slate-700 dark:text-white print:mb-2 print:pb-1 print:text-lg">
          {title}
        </h2>
        <div className="space-y-6 print:space-y-2">{children}</div>
      </section>
    );
  }
