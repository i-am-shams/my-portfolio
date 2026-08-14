export default function SkillCategory({ category, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 print:rounded-none print:border-0 print:bg-transparent print:p-0 print:shadow-none">
      <h3 className="mb-4 text-xl font-semibold text-slate-950 dark:text-white print:mb-1 print:text-sm">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2 print:gap-x-1 print:gap-y-0">
        {items.map((skill, index) => (
          <span
            key={index}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200 print:rounded-none print:bg-transparent print:px-0 print:py-0 print:text-xs print:font-normal print:text-slate-950"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
