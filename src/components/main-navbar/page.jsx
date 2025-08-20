import React from "react";
import { ThemeProvider } from "../ui/theme-provider";
import ThemeToggleButton from "../ui/theme-toggle-button";
import Link from "next/link";

const Main_navbar = () => {
  return (
    <>
      <ThemeProvider attribute="class"></ThemeProvider>
      <div className="dark:bg-gray-900 bg-white ">
        <nav className="dark:bg-gray-900 bg-white border-b dark:border-gray-700">
          <ul className="flex justify-between items-center bg-gray-800 text-white p-4">
            <div className="flex items-center space-x-4">
              <ThemeToggleButton />
            </div>
            <div className="flex gap-12 mx-4">
              <li>
                <Link href="/customer">Home</Link>
              </li>
              <li>
                <Link href="/customer/dashboard">Dashboard</Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li>
                <Link href={"/customer/find-provider"}>Find-Provider</Link>
              </li>
              <li>
                <Link href={"/customer/Profile"}>Profile</Link>
              </li>{" "}
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Main_navbar;
