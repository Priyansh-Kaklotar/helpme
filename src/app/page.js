"use client";
import Image from "next/image";
import Navbar from "@/src/components/page";
import { easeIn, easeOut, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 px-4 py-16">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Connect with the Best{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Service Providers
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Discover, compare, and hire trusted professionals for any service
            you need. Fast, reliable, and tailored to your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition cursor-pointer"
              onClick={() => {
                router.push("/login/customer");
              }}
            >
              Find a Provider
            </button>
            <button
              className="px-8 py-3 bg-white dark:bg-gray-800 border border-purple-600 text-purple-700 dark:text-purple-400 rounded-lg font-semibold shadow hover:bg-purple-50 dark:hover:bg-gray-700 transition cursor-pointer"
              onClick={() => {
                router.push("/login/provider");
              }}
            >
              Become a Provider
            </button>
          </div>
          <Image
            src="/landing-illustration.png"
            alt="Service Provider Illustration"
            width={500}
            height={300}
            className="mx-auto rounded-lg shadow-lg"
            priority
          />
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50, x: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="text-3xl md:text-4xl font-bold text-center text-purple-700 dark:text-purple-400 mb-8"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -200, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ease: easeIn, duration: 0.5 }}
              className="bg-purple-50 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4 text-purple-600 dark:text-purple-400">
                🔍
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Easy Search
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quickly find trusted professionals for any service you need,
                from home repairs to tutoring.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 0, y: 200 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ease: easeIn, duration: 0.5, delay: 0.5 }}
              className="bg-purple-50 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4 text-purple-600 dark:text-purple-400">
                ⚖️
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Compare & Choose
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Compare providers by reviews, ratings, and pricing to make the
                best choice for your needs.
              </p>
            </motion.div>
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: 200, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ease: easeIn, duration: 0.5, delay: 1 }}
              className="bg-purple-50 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4 text-purple-600 dark:text-purple-400">
                🤝
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Secure Hiring
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hire with confidence using our secure platform and transparent
                communication tools.
              </p>
            </motion.div>
          </div>
          <motion.h2
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 50, x: 0 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center text-purple-700 dark:text-purple-400 mb-8"
          >
            App Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 0, x: -200 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut, delay: 1.0 }}
            >
              <span className="text-2xl text-purple-600 dark:text-purple-400">
                🛡️
              </span>
              <div>
                <h4 className="font-semibold mb-1 dark:text-white">
                  Verified Providers
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  All service providers are verified for quality and
                  reliability.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 0, x: 200 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut, delay: 1.5 }}
            >
              <span className="text-2xl text-purple-600 dark:text-purple-400">
                💬
              </span>
              <div>
                <h4 className="font-semibold mb-1 dark:text-white">
                  Instant Messaging
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Chat directly with providers to discuss your requirements.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 0, x: -200 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 1.0 }}
            >
              <span className="text-2xl text-purple-600 dark:text-purple-400">
                ⭐
              </span>
              <div>
                <h4 className="font-semibold mb-1 dark:text-white">
                  Ratings & Reviews
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Read honest feedback from real customers before you hire.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-4"
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 0, x: 200 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 1.5 }}
            >
              <span className="text-2xl text-purple-600 dark:text-purple-400">
                📅
              </span>
              <div>
                <h4 className="font-semibold mb-1 dark:text-white">
                  Easy Booking
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Schedule appointments and manage bookings with ease.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
