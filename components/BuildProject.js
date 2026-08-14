import { useState } from "react";
import Image from "next/image";

/**
 * Renders one self-directed build. Deliberately heavier than the
 * `enterpriseProjects` cards: this work is publicly running, so it can afford to
 * show the architecture and the reasoning rather than summarise outcomes.
 */
export default function BuildProject({ project }) {
  const [credentialsRevealed, setCredentialsRevealed] = useState(false);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
            Self-directed build
          </p>
          <h3 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">{project.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
          >
            {project.demo ? "Open live demo" : "View live app"}
          </a>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-600 dark:text-slate-100 dark:hover:border-blue-300 dark:hover:text-blue-200"
            >
              Source
            </a>
          )}
        </div>
      </div>

      <p className="mb-6 leading-7 text-slate-700 dark:text-slate-300">{project.summary}</p>

      {project.stats && project.stats.length > 0 && (
        <div
          className="mb-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          aria-label={`${project.title} statistics`}
        >
          {project.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {!project.repoUrl && project.sourceNote && (
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">{project.sourceNote}</p>
      )}

      {project.demo && project.demo.username && project.demo.password && (
        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950">
          <h4 className="mb-4 font-semibold text-slate-950 dark:text-white">Demo access</h4>
          <div className="space-y-3 mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Username</p>
              <p className="font-mono text-sm text-slate-950 dark:text-white">{project.demo.username}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Password</p>
              {credentialsRevealed ? (
                <p className="font-mono text-sm text-slate-950 dark:text-white">{project.demo.password}</p>
              ) : (
                <button
                  type="button"
                  onClick={() => setCredentialsRevealed(true)}
                  className="mt-1 inline-flex items-center rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-200 dark:hover:bg-blue-900"
                >
                  Click to reveal password
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{project.demo.note}</p>
        </div>
      )}

      {project.diagram && (
        <figure className="mb-8">
          <Image
            src={project.diagram.src}
            alt={project.diagram.alt}
            width={1600}
            height={900}
            className="h-auto w-full rounded-2xl border border-slate-200 bg-white dark:border-slate-700"
          />
          <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            {project.diagram.caption}
          </figcaption>
        </figure>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h4 className="mb-3 text-lg font-semibold text-slate-950 dark:text-white">
            How it is built
          </h4>
          <ul className="space-y-3 leading-7 text-slate-600 dark:text-slate-300">
            {project.architecture.map((item) => (
              <li key={item} className="border-l-2 border-blue-500 pl-4">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold text-slate-950 dark:text-white">
            Why it was built this way
          </h4>
          <p className="mb-4 leading-7 text-slate-600 dark:text-slate-300">{project.why}</p>
          <h4 className="mb-3 text-lg font-semibold text-slate-950 dark:text-white">
            Known gaps
          </h4>
          <ul className="space-y-2 leading-7 text-slate-600 dark:text-slate-300">
            {project.knownGaps.map((gap) => (
              <li key={gap} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h4 className="mb-4 mt-8 text-lg font-semibold text-slate-950 dark:text-white">
        Engineering decisions and tradeoffs
      </h4>
      <div className="grid gap-5 md:grid-cols-2">
        {project.decisions.map((decision) => (
          <div
            key={decision.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="mb-2 font-semibold text-slate-950 dark:text-white">{decision.title}</p>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{decision.body}</p>
          </div>
        ))}
      </div>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
