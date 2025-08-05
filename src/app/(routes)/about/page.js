"use client";
import React from "react";
import Image from 'next/image';
import Navbar from "@/src/components/page";
import Counter from "@/src/components/ui/Counter";
import { motion } from "framer-motion";

function Page() {
  const founders = [
    {
      name: "Sharad vyas",
      role: "Co-Founder",
      image: "/your-profile.jpg", // Add your image to public folder
      description: "I am Web Developer and Ml Enthusiast. I love to create innovative solutions using technology."
    },
    {
      name: "Priyansh Kaklotar",
      role: "Co-Founder",
      image: "/friend-image.jpg", // Add your friend's image to public folder
      description: "Brief description about your friend and their role in the project"
    }
  ];

  return (
    <>
      <Navbar />
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 min-h-screen text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 py-20 h-full flex flex-col justify-center items-center">
          {/* Hero Content */}
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold mb-6 text-center leading-tight drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Our Project
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-12 text-center leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our project aims to connect users with the best service providers in their area, making it easy to find, compare, and hire trusted professionals for any service you need.
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16 w-full max-w-5xl">
            <motion.div
              className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-5xl font-bold text-indigo-300 mb-2">
                <Counter from={0} to={500} duration={2} />+
              </h3>
              <p className="text-lg text-indigo-100">Active Service Providers</p>
            </motion.div>

            <motion.div
              className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-5xl font-bold text-indigo-300 mb-2">
                <Counter from={0} to={1000} duration={2} />+
              </h3>
              <p className="text-lg text-indigo-100">Happy Customers</p>
            </motion.div>

            <motion.div
              className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-5xl font-bold text-indigo-300 mb-2">
                <Counter from={0} to={24} duration={2} />/7
              </h3>
              <p className="text-lg text-indigo-100">Customer Support</p>
            </motion.div>
          </div>

          <motion.p
            className="text-xl max-w-2xl mx-auto mb-12 text-center text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            We believe in transparency, quality, and empowering both users and providers through technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a
              href="#founders"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-12 py-4 rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl"
            >
              Meet the Founders
            </a>
          </motion.div>
        </div>

        <section className="container mx-auto px-6 mb-12">
        <div className="rounded-xl  p-8 text-center">
          <h2 className="text-3xl font-bold mb-3 text-indigo-700 dark:text-indigo-300">Our Mission</h2>
          <p className="text-lg text-white dark:text-gray-200">
            Describe your project's mission and goals here. What problems are you solving?
          </p>
        </div>
      </section>

        {/* Improved Wave SVG */}
           <svg className="absolute bottom-0 left-0 w-full h-24" viewBox="0 0 1440 320">
          <path fill="#fff" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,229.3C840,235,960,213,1080,197.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </section>

      <section>
        <div className="container mx-auto px-6 py-16 bg-g ">
          <h2 className=" text-3xl md:text-4xl font-bold text-center text-purple-700 dark:text-purple-400 mb-8">
            Why Choose Us?
          </h2>
          <p className="text-lg text-black dark:text-white mb-6 text-center">
            We connect you with the best service providers in your area, ensuring quality and reliability for all your needs.
          </p>
          <p className="text-lg text-black dark:text-white mb-10 text-center">
            Our platform is designed to make finding, comparing, and hiring service providers easy and efficient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <motion.div
              className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 w-full sm:w-1/2
            hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-2">Easy Search</h3>
              <p className="text-lg text-white dark:text-white  mb-4">
                Find the best service providers in your area with our easy-to-use search feature.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white">
                <li>Search by service type, location, and ratings</li>
                <li>Filter results to find the perfect match</li>
                <li>View detailed profiles and reviews</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="container mx-auto px-6 ">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700 dark:text-indigo-300">Meet the Founders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-indigo-800 to-purple-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 text-center transform transition hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <div className="mb-6 flex justify-center">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-indigo-400 shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-1">{founder.name}</h3>
              <p className="text-lg text-indigo-200 mb-2">{founder.role}</p>
              <p className="text-gray-200">{founder.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add Contact Form Section */}
      <section id="contact" className="py-16 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Get in Touch</h2>
            <form className="space-y-6 bg-gradient-to-br from-indigo-800 to-purple-800 dark:from-gray-800 dark:to-gray-900 dark:bg-gray-900  p-8 rounded-lg shadow-md">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Page;
