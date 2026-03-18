import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (darkMode === null) {
      return;
    }

    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="p-6 border-b dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Khalid Shams
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/cv" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
              CV
            </Link>
            <button
              onClick={() => setDarkMode((prev) => !(prev ?? false))}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
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
      {children}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Khalid Shams. All rights reserved.
      </footer>
    </div>
  );
}
