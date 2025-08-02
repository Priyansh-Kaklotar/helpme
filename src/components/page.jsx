"use client"
import React from "react";
import Link from 'next/link';
import { ThemeProvider } from "./ui/theme-provider";
import ThemeToggleButton from "@/src/components/ui/theme-toggle-button";

function Navbar() {
  return (
    <>
    {/* <div className="fixed w-full z-50"></div>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <div className="max-w-7xl mx-auto">
          <nav>
            <ul className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ThemeToggleButton />
              </div>
              <div className="flex items-center space-x-8">
                <li><Link href="/home" className="text-white hover:text-gray-200 transition">Home</Link></li>
                <li><Link href="/contact" className="text-white hover:text-gray-200 transition">Contact</Link></li>
                <li><Link href="/about" className="text-white hover:text-gray-200 transition">About</Link></li>
              </div>
            </ul>
          </nav>
        </div>
      </div> */}
      <ThemeProvider attribute="class"></ThemeProvider>
      <div className="dark:bg-gray-900 bg-white ">
          <nav className="dark:bg-gray-900 bg-white border-b dark:border-gray-700">
            <ul className="flex justify-between items-center bg-gray-800 text-white p-4">
              <div>
                <ThemeToggleButton />
              </div>
              <div className="flex gap-12">
                <li><Link href={"/home"}>Home</Link></li>
                <li>contact</li>
                <li><Link href="/about">About</Link></li>
              </div>
            </ul>
          </nav>
        </div>
    </>
  );
}

export default Navbar;
