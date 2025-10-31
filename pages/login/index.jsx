"use client";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Login Page
 * -----------------------------------------------------------------------------
 * Page for users to log into their account.
 * Includes:
 * - Navbar and Footer components for consistent layout
 * - Centered login form card with fade-in animation
 * - Gradient-styled login button with hover/tap animations
 * - Link to registration page for new users
 */
export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* -----------------------------------------------------------------------
       * Navbar Component
       * -----------------------------------------------------------------------
       */}
      <Navbar />

      {/* -----------------------------------------------------------------------
       * Main Content
       * - Centered login form with fade-in animation using Framer Motion
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
           * - Gradient text for visual appeal
           * -------------------------------------------------------------------
           */}
          <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Welcome Back
          </h1>

          {/* -------------------------------------------------------------------
           * Login Form
           * - Includes email and password inputs
           * - Button with hover/tap animations
           * -------------------------------------------------------------------
           */}
          <form className="flex flex-col gap-4">
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

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all"
            >
              Login
            </motion.button>
          </form>

          {/* -------------------------------------------------------------------
           * Registration Link
           * - For users without an account
           * -------------------------------------------------------------------
           */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-purple-500 font-semibold hover:underline"
            >
              Register
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
