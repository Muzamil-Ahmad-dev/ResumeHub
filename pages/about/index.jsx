"use client";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FaLaptopCode, FaPalette, FaDownload, FaUserCheck } from "react-icons/fa";
import { motion } from "framer-motion";

/**
 * About Page
 * -----------------------------------------------------------------------------
 * Landing page describing the Resume Builder product.
 * Includes:
 * - Hero section with headline and description
 * - Features section with icon cards
 * - How It Works section with step-by-step guide
 * - Call-to-Action section
 * Animations handled via Framer Motion for smooth UX.
 */
export default function About() {
  /** -------------------------------------------------------------------------
   * Framer Motion animation configs
   * - container: stagger children animations
   * - item: individual fade-up animation for cards/elements
   */
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  /** -------------------------------------------------------------------------
   * Features Section Data
   * - Array of objects representing individual feature cards
   * - Includes icon, title, and description
   */
  const features = [
    { icon: <FaLaptopCode className="mx-auto text-purple-500 mb-4 text-4xl" />, title: "Easy to Use", desc: "Intuitive interface to create resumes quickly without any hassle." },
    { icon: <FaPalette className="mx-auto text-pink-500 mb-4 text-4xl" />, title: "Customizable Templates", desc: "Choose from professional, creative, or simple templates that fit your style." },
    { icon: <FaDownload className="mx-auto text-purple-500 mb-4 text-4xl" />, title: "Export Easily", desc: "Download your resume in PDF format with just a click." },
    { icon: <FaUserCheck className="mx-auto text-pink-500 mb-4 text-4xl" />, title: "Professional Quality", desc: "Ensure your resume looks polished and professional to impress employers." },
  ];

  /** -------------------------------------------------------------------------
   * How It Works Section Data
   * - Step-by-step guide on using the Resume Builder
   * - Icons indicate action, with description for clarity
   */
  const steps = [
    { icon: <FaLaptopCode className="text-4xl text-purple-500" />, step: "Step 1: Choose Template", desc: "Select the template that suits your profession and personal style." },
    { icon: <FaPalette className="text-4xl text-pink-500" />, step: "Step 2: Customize", desc: "Add your personal information, skills, experience, and customize colors and fonts." },
    { icon: <FaDownload className="text-4xl text-purple-500" />, step: "Step 3: Export", desc: "Download your resume in high-quality PDF and share it with potential employers." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* -----------------------------------------------------------------------
       * Navbar Component
       * -----------------------------------------------------------------------
       */}
      <Navbar />

      <main className="flex-grow">
        {/* -------------------------------------------------------------------
         * Hero Section
         * - Headline and subtext introducing the Resume Builder
         * - Background gradient with text gradient for visual impact
         * -------------------------------------------------------------------
         */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white py-20 px-6 text-center"
        >
          {/* Hero Headline */}
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200"
          >
            About Resume Builder
          </motion.h1>

          {/* Hero Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/90"
          >
            Build your professional resume in minutes with our modern and easy-to-use Resume Builder.
          </motion.p>
        </motion.section>

        {/* -------------------------------------------------------------------
         * Features Section
         * - Grid of cards highlighting key product features
         * - Hover and tap animations for interactivity
         * -------------------------------------------------------------------
         */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-16 px-6 max-w-7xl mx-auto"
        >
          {/* Section Title */}
          <motion.h2 variants={item} className="text-3xl font-bold text-center mb-12">
            Features
          </motion.h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center"
              >
                {feature.icon}
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* -------------------------------------------------------------------
         * How It Works Section
         * - Step-by-step visual guide
         * - Alternating slide-in animations for better flow
         * -------------------------------------------------------------------
         */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="py-16 px-6 bg-gray-100"
        >
          {/* Section Title */}
          <motion.h2 variants={item} className="text-3xl font-bold text-center mb-12">
            How It Works
          </motion.h2>

          {/* Steps List */}
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-6"
              >
                {/* Step Icon */}
                <div className="flex-shrink-0">{step.icon}</div>

                {/* Step Description */}
                <div>
                  <h3 className="font-semibold text-xl mb-2">{step.step}</h3>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* -------------------------------------------------------------------
         * Call-to-Action Section
         * - Encourage user to start building resume
         * - Animated button for better engagement
         * -------------------------------------------------------------------
         */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 px-6 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Start Building Your Resume Today</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Create a professional resume that helps you stand out in the job market.
          </p>

          {/* CTA Button */}
          <motion.a
            href="/templates"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(128,0,128,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
        </motion.section>
      </main>

      {/* -----------------------------------------------------------------------
       * Footer
       * -----------------------------------------------------------------------
       */}
      <Footer />
    </div>
  );
}
