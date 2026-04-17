import React, { useEffect, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 transition-all shadow-md"
    >
      {darkMode ? <HiSun size={24} /> : <HiMoon size={24} />}
    </button>
  );
};

export default DarkModeToggle;