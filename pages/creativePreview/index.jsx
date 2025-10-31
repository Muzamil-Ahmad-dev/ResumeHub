"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreativeResumePreview from "@/components/creativePreview/CreativeResumePreview";

/**
 * CreativeResumePreview Page
 * -----------------------------------------------------------------------------
 * Page for previewing and downloading the user's creative resume.
 * - Fetches resume data from localStorage
 * - Displays a preview using the CreativeResumePreview component
 * - Includes fade-in animation on page load via Framer Motion
 */
export default function CreativePreview() {
  /** -----------------------------------------------------------------------
   * Component State
   * - resumeData: holds the user's resume data retrieved from localStorage
   * -----------------------------------------------------------------------
   */
  const [resumeData, setResumeData] = useState(null);

  /** -----------------------------------------------------------------------
   * Fetch stored resume data on component mount
   * - JSON parse localStorage data if it exists
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
       * - Centered container for page content
       * - Includes page heading, description, and preview card
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
         * - Title and subtitle for user guidance
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
         * - Displays the CreativeResumePreview component if data exists
         * - Shows fallback message if no data is found
         * -------------------------------------------------------------------
         */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {resumeData ? (
            <CreativeResumePreview data={resumeData} />
          ) : (
            <p className="text-center text-gray-500">No resume data found.</p>
          )}
        </div>
      </motion.main>
    </div>
  );
}
