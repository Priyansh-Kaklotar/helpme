"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  RiUser3Fill,
  RiListCheck2,
  RiWallet3Fill,
  RiSettings4Fill,
  RiCustomerService2Fill,
} from "react-icons/ri";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/Loader/page";
const Page = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchName() {
      try {
        const res = await axios.get("/api/get-name");
        const data = res.data;
        if (data.success) {
          setName(data.name);
        } else {
          console.error("Error fetching name:", data.message);
        }
      } catch (err) {
        console.error("Request failed:", err);
      }
    }
    if (name === "") {
      // Fetch name only if not already set
      fetchName();
    }
  }, [name, setName]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const navigate = useRouter();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 px-4 py-16">
      <div className="absolute top-4 left-4 z-50">
        {/* <ThemeToggleButton /> */}
      </div>
      {/* Welcome Message */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100"
      >
        {name ? `Welcome, ${name}!` : "Welcome to Your Dashboard!"}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mb-10"
      >
        Manage your profile, track services, and explore all your account
        features from one place.
      </motion.p>

      {/* Top Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <RiUser3Fill />,
            title: "Profile",
            text: "View and update your personal information.",
            color: "blue",
          },
          {
            icon: <RiListCheck2 />,
            title: "My Services",
            text: "Track and manage your service requests.",
            color: "red",
          },
          {
            icon: <RiWallet3Fill />,
            title: "Wallet",
            text: "Check your balance and payment history.",
            color: "blue",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition transform hover:scale-105`}
          >
            <span className={`text-${card.color}-500 text-4xl mb-3`}>
              {card.icon}
            </span>
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
              {card.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">
              {card.text}
            </p>
            <button
              className={`bg-${card.color}-500 text-white px-4 py-2 rounded hover:bg-${card.color}-600 transition`}
              onClick={() => {
                setLoading(true);
                card.title === "Profile"
                  ? navigate.push("/customer/Profile")
                  : card.title === "Wallet"
                  ? navigate.push("/customer/my-wallet")
                  : navigate.push("/customer/bookservice");
                setLoading(false);
              }}
            >
              {card.title === "Wallet"
                ? "Go to Wallet"
                : card.title === "Profile"
                ? "Manage Profile"
                : "View Services"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Bottom Cards */}
      <div className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: <RiSettings4Fill />,
            title: "Settings",
            text: "Customize your preferences and notifications.",
            color: "purple",
          },
          {
            icon: <RiCustomerService2Fill />,
            title: "Support",
            text: "Contact support for help and assistance.",
            color: "red",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center hover:shadow-lg transition transform hover:scale-105`}
          >
            <span className={`text-${card.color}-500 text-3xl mr-4`}>
              {card.icon}
            </span>
            <div>
              <h3 className="font-semibold text-md text-gray-800 dark:text-gray-100 mb-1">
                {card.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {card.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {loading && <Loader />}
    </section>
  );
};

export default Page;
