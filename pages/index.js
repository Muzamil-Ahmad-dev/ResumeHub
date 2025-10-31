"use client";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

/**
 * Home Page
 * -----------------------------------------------------------------------------
 * Landing page for Resume Builder application.
 * Features:
 * - Hero section with heading, description, features list, and CTA buttons.
 * - Animated elements using Framer Motion.
 * - Responsive layout with a right-side image.
 */
export default function Home() {
  /** -----------------------------------------------------------------------
   * Animation Variants
   * -----------------------------------------------------------------------
   */
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  /** -----------------------------------------------------------------------
   * Features / Highlights
   * -----------------------------------------------------------------------
   */
  const features = [
    "10+ modern resume templates",
    "Easy drag-and-drop section editing",
    "Export to PDF or shareable link",
    "Fully responsive and browser friendly",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black/95">
      {/* -------------------------------------------------------------------
       * Navbar
       * -------------------------------------------------------------------
       */}
      <Navbar />

      {/* -------------------------------------------------------------------
       * Hero Section
       * -------------------------------------------------------------------
       */}
      <section className="relative min-h-screen bg-gradient-to-r from-black via-black to-purple-950 overflow-hidden">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/20 to-pink-900/30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-sm font-medium text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                What's New?
              </span>
              <span className="text-sm text-gray-400">
                Introducing Resume Builder 2.0
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-white">Build your professional</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                resume in minutes
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-400 max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Resume Builder is a simple, intuitive web app that helps you create professional resumes quickly.
              Choose from templates, customize your sections, and export your resume as PDF—all in one place.
            </motion.p>

            {/* Features List */}
            <motion.ul
              className="text-gray-300 space-y-2 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {features.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-500" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* Call-to-Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-gray-400 hover:bg-white/5 transition-colors duration-200"
              >
                View Templates
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <img
              src="/Resume-hero.jpg"
              alt="Resume preview"
              className="max-w-md w-full rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
