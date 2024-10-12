// components/Header.js
import React from 'react';
import Link from 'next/link';
import { useTheme } from '../app/context/ThemeProvider'; // Import the useTheme hook

const Header = () => {
  const { toggleTheme, theme } = useTheme(); // Access theme and toggleTheme from context

  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white text-center">Bible Reader</h1>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-blue-300">Home</Link>
            </li>
            <li>
              <Link href="/bible" className="text-white hover:text-blue-300">Bible</Link>
            </li>
            <li>
              {/* <button
                onClick={toggleTheme}
                className="text-white hover:text-blue-300"
              >
                Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button> */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
