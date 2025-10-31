"use client";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Register Page
 * -----------------------------------------------------------------------------
 * Page for new users to create an account.
 * - Includes Navbar and Footer for consistent layout
 * - Centered registration form with fade-in animation
 * - Gradient-styled register button with hover/tap animations
 * - Link to login page for existing users
 */
export default function Register() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* -----------------------------------------------------------------------
       * Navbar Component
       * -----------------------------------------------------------------------
       */}
      <Navbar />

      {/* -----------------------------------------------------------------------
       * Main Content
       * - Centered registration form with Framer Motion fade-in animation
       * -----------------------------------------------------------------------
       */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        >
          {/* -------------------------------------------------------------------
           * Page Header
           * - Gradient text title for visual appeal
           * -------------------------------------------------------------------
           */}
          <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Create Account
          </h1>

          {/* -------------------------------------------------------------------
           * Registration Form
           * - Full Name, Email, and Password inputs
           * - Submit button with hover/tap animations
           * -------------------------------------------------------------------
           */}
          <form className="flex flex-col gap-4">
            {/* Full Name Input */}
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all"
            >
              Register
            </motion.button>
          </form>

          {/* -------------------------------------------------------------------
           * Login Link
           * - Redirects users with existing accounts to login page
           * -------------------------------------------------------------------
           */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </main>

      {/* -----------------------------------------------------------------------
       * Footer Component
       * -----------------------------------------------------------------------
       */}
      <Footer />
    </div>
  );
}
