export default function Section({ title, children }) {
    return (
      <section className="mb-12">
        <h2 className="mb-6 border-b border-slate-200 pb-3 text-3xl font-bold tracking-tight text-slate-950 dark:border-slate-700 dark:text-white">
          {title}
        </h2>
        <div className="space-y-6">{children}</div>
      </section>
    );
  }
