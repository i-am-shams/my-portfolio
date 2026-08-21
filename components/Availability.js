import { siteProfile } from "../data/profile";

/**
 * The compact form of the availability answer, for places that do not have room
 * for the hero's full panel: the `/cv` header and the homepage's mobile layout.
 *
 * It exists as a component rather than as markup repeated in two pages because
 * the two copies had already drifted - one said "Dhaka (UTC+6)" after already
 * saying "on-site in Dhaka", repeating the city in the same sentence. Reading the
 * timezone rather than the full base string is what avoids that, and it should
 * only have to be got right once.
 */
export default function Availability({ className = "" }) {
  const { status, timezone, notice } = siteProfile.availability;

  return (
    <p
      className={`inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 print:border-0 print:bg-transparent print:px-0 print:py-0 ${className}`}
    >
      <span className="inline-flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
        {/* Green status dot is the convention recruiters already read as "open to
            work"; it is decorative, so the label beside it carries the meaning. */}
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 print:hidden"
        />
        Available
      </span>
      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
        |
      </span>
      <span>{status}</span>
      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
        |
      </span>
      <span>{timezone}</span>
      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
        |
      </span>
      <span>{notice} notice</span>
    </p>
  );
}
