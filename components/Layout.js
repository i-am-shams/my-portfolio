import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function getInitialDarkMode() {
  if (typeof window === 'undefined') {
    return false;
  }

  const storedTheme = window.localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950 focus:shadow"
      >
        Skip to content
      </a>
      <nav className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-slate-950 transition-colors hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-white dark:hover:text-blue-300"
          >
            Khalid Shams
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/#case-study"
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-slate-300 dark:hover:text-blue-300 sm:inline"
            >
              Case Study
            </Link>
            <Link
              href="/cv"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-slate-300 dark:hover:text-blue-300"
            >
              CV
            </Link>
            <a
              href="mailto:i.am.shams@gmail.com"
              className="hidden rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100 sm:inline-flex"
            >
              Contact
            </a>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="rounded-lg border border-slate-300 bg-white p-2 text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-300 dark:hover:text-blue-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </nav>
      <div id="main-content">{children}</div>
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} Khalid Shams. Enterprise software engineering,
        reporting systems, and technical leadership.
      </footer>
    </div>
  );
}
