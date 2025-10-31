"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SimpleResumePreview from "../../components/simplePreview/SimplePreview"; // ✅ Resume preview component

/**
 * SimpleResumePreview Page
 * -----------------------------------------------------------------------------
 * Page for previewing and downloading a simple-style resume.
 * - Fetches resume data from localStorage
 * - Renders a preview using the SimpleResumePreview component
 * - Uses fade-in animation via Framer Motion
 */
export default function SimplePreview() {
  /** -----------------------------------------------------------------------
   * Component State
   * - resumeData: stores the user's resume information
   * -----------------------------------------------------------------------
   */
  const [resumeData, setResumeData] = useState(null);

  /** -----------------------------------------------------------------------
   * Load resume data from localStorage on component mount
   * -----------------------------------------------------------------------
   */
  useEffect(() => {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      setResumeData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* -------------------------------------------------------------------
       * Main Content
       * - Centered container with fade-in animation
       * -------------------------------------------------------------------
       */}
      <motion.main
        className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* -------------------------------------------------------------------
         * Page Header
         * - Title and description for guidance
         * -------------------------------------------------------------------
         */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Download Your Simple Resume
          </h1>
          <p className="text-gray-500">
            Preview your resume before downloading the final version.
          </p>
        </div>

        {/* -------------------------------------------------------------------
         * Resume Preview Card
         * - Displays SimpleResumePreview if data exists
         * - Shows fallback message if no data is available
         * -------------------------------------------------------------------
         */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {resumeData ? (
            <SimpleResumePreview data={resumeData} />
          ) : (
            <p className="text-center text-gray-500">
              No resume data found. Please fill the form first.
            </p>
          )}
        </div>
      </motion.main>
    </div>
  );
}
