import { useState } from 'react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
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
              {/* <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-gray-600" />
                )}
              </button> */}
            </div>
          </div>
        </nav>
        {children}
        <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Khalid Shams. All rights reserved.
        </footer>
      </div>
    </div>
  );
}