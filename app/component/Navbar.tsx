"use client";
import { useState } from "react";
import CartButton from "./cartButton";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegistorButton";
import StaffButton from "./StaffButton";


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#8FDDE7] to-[#FFC2C7]  py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg text-white">
          <li>
            <a href="/" className="hover:text-gray-100 transition duration-200">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-100 transition duration-200">
              About
            </a>
          </li>
          <li>
            <a href="/books" className="hover:text-gray-100 transition duration-200">
              Books
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-100 transition duration-200">
              Contact
            </a>
          </li>
        </ul>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <LoginButton />
          <RegisterButton />
          <CartButton />
         
        <StaffButton />
      
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex-grow flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black focus:outline-none ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black py-4">
          <ul className="flex flex-col space-y-4 text-center">
            <li>
              <a href="/" className="hover:text-gray-700 transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-700 transition duration-200">
                About
              </a>
            </li>
            <li>
              <a href="/books" className="hover:text-gray-700 transition duration-200">
                Books
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-700 transition duration-200">
                Contact
              </a>
            </li>
          </ul>
          <div className="flex flex-col items-center mt-4 space-y-2">
            <LoginButton />
            <RegisterButton />
            <CartButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;