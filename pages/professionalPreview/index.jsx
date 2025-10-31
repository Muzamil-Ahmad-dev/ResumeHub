"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfessionalPreview from "@/components/professionalPreview/professionalPreview";

/**
 * ProfessionalResumePreview Page
 * -----------------------------------------------------------------------------
 * Page for previewing and downloading a professional-style resume.
 * - Retrieves resume data from localStorage
 * - Displays preview using the ProfessionalPreview component
 * - Smooth fade-in animation on page load using Framer Motion
 */
export default function Create() {
  /** -----------------------------------------------------------------------
   * Component State
   * - resumeData: holds the user's resume information retrieved from localStorage
   * -----------------------------------------------------------------------
   */
  const [resumeData, setResumeData] = useState(null);

  /** -----------------------------------------------------------------------
   * Fetch stored resume data on mount
   * - Parse JSON data from localStorage if available
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
         * - Title and subtitle guiding the user
         * -------------------------------------------------------------------
         */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Download Your Resume
          </h1>
          <p className="text-gray-500">
            Preview your resume before downloading the final version.
          </p>
        </div>

        {/* -------------------------------------------------------------------
         * Resume Preview Card
         * - Shows ProfessionalPreview component if data exists
         * - Displays fallback message if no data is available
         * -------------------------------------------------------------------
         */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {resumeData ? (
            <ProfessionalPreview data={resumeData} />
          ) : (
            <p className="text-center text-gray-500">No resume data found.</p>
          )}
        </div>
      </motion.main>
    </div>
  );
}
