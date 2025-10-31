"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { motion } from "framer-motion";
import SimpleForm from "../../../components/simpleFrom/SimpleFrom";
import { FaArrowLeft } from "react-icons/fa"; 

/**
 * SimpleTemplates Page
 * -----------------------------------------------------------------------------
 * Page for displaying Simple Resume Templates.
 * - Users can select a template to start building a simple resume.
 * - Smooth fade-in animation using Framer Motion.
 * - Includes Navbar and Footer for consistent layout.
 */
export default function SimpleTemplates() {
  /** -----------------------------------------------------------------------
   * Component State
   * - selectedTemplate: boolean to toggle between template preview and form
   * -----------------------------------------------------------------------
   */
  const [selectedTemplate, setSelectedTemplate] = useState(false);

  /** -----------------------------------------------------------------------
   * Scroll to top on mount
   * -----------------------------------------------------------------------
   */
  useEffect(() => window.scrollTo(0, 0), []);

  /** -----------------------------------------------------------------------
   * Handle Template Selection
   * - Sets selectedTemplate to true and scrolls smoothly to top
   * -----------------------------------------------------------------------
   */
  const handleSelect = () => {
    setSelectedTemplate(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* -------------------------------------------------------------------
       * Navbar Component
       * -------------------------------------------------------------------
       */}
      <Navbar />

      {/* -------------------------------------------------------------------
       * Main Content
       * -------------------------------------------------------------------
       */}
      <motion.main
        className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* -------------------------------------------------------------------
         * Conditional Rendering
         * - If template selected, show form
         * - Else, show template preview card
         * -------------------------------------------------------------------
         */}
        {selectedTemplate ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* -----------------------------------------------------------------
             * Form Header
             * -----------------------------------------------------------------
             */}
            <h1 className="text-2xl font-bold mb-4 text-center text-purple-600">
              Build Your Resume
            </h1>

            {/* -----------------------------------------------------------------
             * Simple Resume Form Component
             * -----------------------------------------------------------------
             */}
            <SimpleForm />

            {/* -----------------------------------------------------------------
             * Back Button with Icon
             * -----------------------------------------------------------------
             */}
            <div className="text-center mt-6">
              <button
                onClick={() => setSelectedTemplate(false)}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* -----------------------------------------------------------------
             * Page Header
             * -----------------------------------------------------------------
             */}
            <h1 className="text-3xl font-bold mb-6 text-center">
              Simple Resume Template
            </h1>

            {/* -----------------------------------------------------------------
             * Template Preview Card
             * -----------------------------------------------------------------
             */}
            <div
              onClick={handleSelect}
              className="flex justify-center cursor-pointer"
            >
              <motion.div
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group w-full max-w-sm"
                whileHover={{ scale: 1.03 }}
              >
                {/* -----------------------------------------------------------------
                 * Image Preview with Hover Overlay
                 * -----------------------------------------------------------------
                 */}
                <div className="relative">
                  <img
                    src="/simple.png"
                    alt="Simple Resume Template"
                    className="w-full h-64 object-cover group-hover:opacity-90 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <button
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
                    >
                      Use This Template
                    </button>
                  </div>
                </div>

                {/* -----------------------------------------------------------------
                 * Card Info
                 * -----------------------------------------------------------------
                 */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Simple Classic
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Click to start building your simple resume.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </motion.main>

      {/* -----------------------------------------------------------------------
       * Footer Component
       * -----------------------------------------------------------------------
       */}
      <Footer />
    </div>
  );
}
