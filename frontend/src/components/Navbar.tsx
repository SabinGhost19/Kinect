import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  title: string; // Definim tipul pentru prop `title`
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full fixed top-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between px-8 py-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 w-auto"
            alt="Flowbite Logo"
          />
          <span className="ml-2 text-2xl font-semibold whitespace-nowrap dark:text-white">
            {title}
          </span>
        </a>
        <div className="hidden md:flex space-x-8">
          <a
            href="#"
            className="text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
          >
            About
          </a>
          <Link
            className="text-gray-900 hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
            to={'/login'}
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
