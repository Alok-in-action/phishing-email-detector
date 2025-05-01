import React from 'react';
import { Shield, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center space-x-2">
        <Shield className="w-8 h-8 text-blue-500" />
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
          Phishing Detector
        </h1>
      </div>
      
      <button 
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </header>
  );
};

export default Header