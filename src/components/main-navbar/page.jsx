// "use client";
// import React from "react";
// import { ThemeProvider } from "../ui/theme-provider";
// import { useState } from "react";
// import ThemeToggleButton from "../ui/theme-toggle-button";
// import Link from "next/link";

// const Main_navbar = () => {

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   }

//   return (
//     <>
//       <ThemeProvider attribute="class"></ThemeProvider>
//       <div className="dark:bg-gray-900 bg-white ">
//         <nav className="dark:bg-gray-900 bg-white border-b dark:border-gray-700">
//           <div className="max-w-full mx-auto px-4">
//             <ul className="flex justify-between items-center bg-gray-800 text-white p-4">
//               <div className="flex items-center space-x-4">
//                 <ThemeToggleButton />
//               </div>

//               {/* Hamburgue Menu button */}
//               <button
//                 className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative"
//                 onClick={toggleMenu}
//               >
//                 <span
//                   className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-1.5" : ""
//                     }`}
//                 ></span>
//                 <span
//                   className={`block w-6 h-0.5 bg-white mt-1.5 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
//                     }`}
//                 ></span>
//                 <span
//                   className={`block w-6 h-0.5 bg-white mt-1.5 transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-1.5" : ""
//                     }`}
//                 ></span>
//               </button>

//               {/* desktop navbar */}
//               <div className="hidden lg:flex gap-12 mx-4">
//                 <li>
//                   <Link href="/customer" className="hover:text-gray-300 transition-colors">Home</Link>
//                 </li>
//                 <li>
//                   <Link href="/customer/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
//                   <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
//                 </li>
//                 <li>
//                   <Link href="/customer/find-provider" className="hover:text-gray-300 transition-colors">Find-Provider</Link>
//                 </li>
//                 <li>
//                   <Link href="/customer/Profile" className="hover:text-gray-300 transition-colors">Profile</Link>
//                 </li>{" "}
//               </div>
//             </ul>

//             {/* mobile navbar */}
//             <div
//               className={`lg:hidden ${isOpen ? "block" : "hidden"} bg-gray-800 text-white `}
//             >
//               <ul className="flex flex-col  justify-center items-end bg-gray-800 text-white p-4">
//                 <li>
//                   <Link href="/customer" className="hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
//                 </li>
//                 <li>
//                   <Link href="/customer/dashboard" className="hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Dashboard</Link>
//                   <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
//                 </li>
//                 <li>
//                   <Link href="/customer/find-provider" className="hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Find-Provider</Link>
//                 </li>
//                 <li>
//                   <Link href="/customer/Profile" className="hover:text-gray-300 transition-colors" onClick={() => setIsOpen(false)}>Profile</Link>
//                 </li>{" "}
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div >
//     </>
//   );
// };

// export default Main_navbar;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ThemeProvider } from "../ui/theme-provider";
import ThemeToggleButton from "../ui/theme-toggle-button";

const Main_navbar = () => {
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
                  className={`block w-6 h-0.5 bg-white transform transition-all duration-500 ease-in-out ${isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-2"
                    }`}
                ></span>

                {/* Middle bar */}
                <span
                  className={`block w-6 h-0.5 bg-white my-1 transition-all duration-500 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
                    }`}
                ></span>

                {/* Bottom bar */}
                <span
                  className={`block w-6 h-0.5 bg-white transform transition-all duration-500 ease-in-out ${isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-2"
                    }`}
                ></span>
              </button>




              {/* Desktop Navbar */}
              <ul className="hidden lg:flex gap-12 mx-4">
                <li className="relative group">
                  <Link href="/customer" className="hover:text-gray-300 transition-colors">
                    Home
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="relative group">
                  <Link href="/customer/dashboard" className="hover:text-gray-300 transition-colors">
                    Dashboard
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="relative group">
                  <Link href="/customer/find-provider" className="hover:text-gray-300 transition-colors">
                    Find Provider
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="relative group">
                  <Link href="/customer/profile" className="hover:text-gray-300 transition-colors">
                    Profile
                  </Link>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </li>
              </ul>
            </div>

            {/* Mobile Navbar */}
            <div className={`lg:hidden ${isOpen ? "block" : "hidden"} bg-gray-800 text-white`}>
              <ul className="flex flex-col items-end bg-gray-800 text-white p-4">
                <li>
                  <Link href="/customer" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/customer/dashboard" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/customer/find-provider" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
                    Find Provider
                  </Link>
                </li>
                <li>
                  <Link href="/customer/profile" onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
                    Profile
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

export default Main_navbar;
