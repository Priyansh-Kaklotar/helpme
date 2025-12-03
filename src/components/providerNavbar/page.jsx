"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ThemeProvider } from "../ui/theme-provider";
import ThemeToggleButton from "../ui/theme-toggle-button";

const Provider_navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <ThemeProvider attribute="class">
      <div className="dark:bg-gray-900 bg-white">
        <nav className="dark:bg-gray-900 bg-white border-b dark:border-gray-700 ">
          <div className="max-w-full mx-auto">
            <div className="flex justify-between items-center bg-gray-800 text-white p-4">
              {/* Left Side - Theme Toggle */}
              <div className="flex items-center space-x-4">
                <ThemeToggleButton />
              </div>

              {/* Hamburger Menu (Mobile) */}
              <button
                className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative"
                onClick={toggleMenu}
              >
                {/* Top bar */}
                <span
                  className={`block w-6 h-0.5 bg-white transform transition-all duration-500 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-2"
                  }`}
                ></span>

                {/* Middle bar */}
                <span
                  className={`block w-6 h-0.5 bg-white my-1 transition-all duration-500 ease-in-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>

                {/* Bottom bar */}
                <span
                  className={`block w-6 h-0.5 bg-white transform transition-all duration-500 ease-in-out ${
                    isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-2"
                  }`}
                ></span>
              </button>

              {/* Desktop Navbar */}
              <ul className="hidden lg:flex gap-12 mx-4">
                <li className="relative group">
                  <Link
                    href="/provider/home"
                    className={`hover:text-gray-300 transition-colors`}
                  >
                    Home
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="relative group">
                  <Link
                    href="/provider/dashboard"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </li>
              </ul>
            </div>

            {/* Mobile Navbar */}
            <div
              className={`lg:hidden ${
                isOpen ? "block" : "hidden"
              } bg-gray-800 text-white`}
            >
              <ul className="flex flex-col items-end bg-gray-800 text-white p-4">
                <li>
                  <Link
                    href="/provider/home"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-gray-300 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/provider/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-gray-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>  
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </ThemeProvider>
  );
};

export default Provider_navbar;
