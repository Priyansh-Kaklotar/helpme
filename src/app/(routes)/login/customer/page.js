"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import React from "react";
import ThemeToggleButton from "@/src/components/ui/theme-toggle-button";

function page() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 relative">

      <div className="absolute top-4 left-4">
        <ThemeToggleButton/>
      </div>

      {/* Background Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full"
      >
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Hello!
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            Sign in to your account
          </p>

          {/* Email */}
          <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full px-4 py-3 mb-4">
            <span className="text-purple-500 mr-3">📧</span>
            <input
              type="email"
              placeholder="E-mail"
              className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-full px-4 py-3 mb-2">
            <span className="text-purple-500 mr-3">🔒</span>
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none flex-1 text-gray-700 dark:text-gray-200"
            />
            <span className="text-purple-400 cursor-pointer">👁</span>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center text-gray-500 dark:text-gray-300">
              <input type="checkbox" className="mr-2 accent-purple-500" />{" "}
              Remember me
            </label>
            <a href="#" className="text-purple-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Sign in Button */}
          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:scale-105 transition-transform">
            SIGN IN
          </button>

          {/* Create account */}
          <p className="text-center mt-4 text-gray-500 dark:text-gray-300">
            Don’t have an account?{" "}
            <a href="#" className="text-purple-500 hover:underline">
              Create
            </a>
          </p>
        </div>

        {/* Right Gradient Section */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-tr from-purple-500 to-blue-500 flex flex-col items-center justify-center">
          {/* Top Wave */}
          <div className="absolute top-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,64L48,90.7C96,117,192,171,288,165.3C384,160,480,96,576,101.3C672,107,768,181,864,181.3C960,181,1056,107,1152,101.3C1248,96,1344,160,1392,192L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-white mt-24">
            Welcome Back!
          </h2>
          <p className="text-white text-center max-w-xs mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            pharetra magna nisl, at posuere sem dapibus sed.
          </p>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,64L48,90.7C96,117,192,171,288,165.3C384,160,480,96,576,101.3C672,107,768,181,864,181.3C960,181,1056,107,1152,101.3C1248,96,1344,160,1392,192L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default page;