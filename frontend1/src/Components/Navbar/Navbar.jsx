import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed w-screen z-10">
      <nav className="bg-blue-900 text-white py-2 px-6 md:px-12 flex flex-col items-center justify-between w-full shadow-md">
        {/* Logo & Menu Button */}
        <div className="relative flex justify-between w-full items-center mb-2">
          <div className="text-2xl font-bold">
            <Link to="/">ROBO LAB</Link>
          </div>

          {/* Menu Button (Visible on all screens) */}
          <div className="flex items-center space-x-2 gap-5">
            <p className="font-bold">MENU</p>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FiMenu className="h-6 w-6 md:hidden cursor-pointer" />
            </button>
          </div>
        </div>

        <hr className="bg-white w-screen mb-2" />

        {/* Menu Links (Always visible but toggles in mobile) */}
        <div
          className={`flex flex-col md:flex-row md:space-x-4 w-full md:w-auto items-center ${
            isMenuOpen ? 'flex gap-2 items-end' : 'hidden md:flex ml-auto'
          }`}
        >
          <Link
            to="/login"
            className="bg-transparent border text-gray-100 border-white px-2 py-1 rounded-sm hover:bg-white hover:text-blue-700 transition duration-300"
          >
            For Staff
          </Link>
          <Link
            to="/login"
            className="text-white px-2 py-1 rounded-sm hover:bg-white hover:text-blue-700 border border-white transition duration-300"
          >
            For Student
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
