"use client";

import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Loader2,
} from "lucide-react";

/**
 * ModernResumePreview Component
 * --------------------------------------
 * Displays a modern resume preview based on user input.
 * Supports multi-page PDF export via jsPDF + html2canvas.
 * Designed for a SaaS-grade resume builder with responsive layout and error handling.
 */

export default function ModernResumePreview({ data }) {
  const router = useRouter();
  const resumeRef = useRef();
  const [downloading, setDownloading] = useState(false);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg mb-4">No preview available.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  /**
   * Handles multi-page PDF generation from the current resume preview.
   */
  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      const html2canvas = (await import("html2canvas-pro")).default;
      const originalElement = resumeRef.current;
      if (!originalElement) return;

      // Clone the resume element and append to body (hidden)
      const clone = originalElement.cloneNode(true);
      clone.style.width = "794px"; // A4 width
      clone.style.height = "auto";
      clone.style.overflow = "visible";
      clone.style.position = "absolute";
      clone.style.top = "-9999px";
      clone.style.left = "-9999px";
      document.body.appendChild(clone);

      // Render the clone to canvas
      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Remove clone after rendering
      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgPropsHeight = (canvas.height * pdfWidth) / canvas.width;

      // Calculate number of pages
      const totalPages = Math.ceil(imgPropsHeight / pdfHeight);

      // Add image to PDF page by page
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          -page * pdfHeight,
          pdfWidth,
          imgPropsHeight
        );
      }

      pdf.save(`${data.personal.name || "Modern_Resume"}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  const { personal, summary, education, experience, skills, projects } = data;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4">
      {/* Loader */}
      {downloading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />
          <p className="text-blue-700 font-semibold text-lg">
            Preparing your PDF, please wait...
          </p>
        </div>
      )}

      {/* Top Controls */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Home
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className={`${
            downloading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
          } text-white px-4 py-2 rounded-lg transition flex items-center gap-2`}
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Downloading…
            </>
          ) : (
            "Download Resume"
          )}
        </button>
      </div>

      {/* Resume Preview */}
      <div
        ref={resumeRef}
        className="max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200"
        style={{
          width: "794px",
          minHeight: "1123px",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white px-10 py-8 flex flex-col md:flex-row items-center md:items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold">{personal.name}</h1>
            <p className="text-blue-100 text-lg">{personal.title}</p>
          </div>
          {personal.profilePic && (
            <img
              src={personal.profilePic}
              alt={personal.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg mt-4 md:mt-0"
            />
          )}
        </header>

        {/* Body */}
        <main className="grid grid-cols-3 h-auto">
          {/* Left Sidebar */}
          <aside className="col-span-1 bg-gray-50 p-8 border-r border-gray-200 overflow-hidden">
            {/* Contact */}
            <div className="mb-8">
              <h3 className="text-blue-700 font-semibold text-lg mb-3 border-b border-blue-200 pb-1">
                Contact
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                {personal.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <p>{personal.email}</p>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <p>{personal.phone}</p>
                  </div>
                )}
                {personal.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <p>{personal.address}</p>
                  </div>
                )}
                {personal.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <a
                      href={
                        personal.website.startsWith("http")
                          ? personal.website
                          : `https://${personal.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-700 hover:text-blue-900"
                    >
                      {personal.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills?.length > 0 && (
              <section>
                <h3 className="text-blue-700 font-semibold text-lg mb-3 border-b border-blue-200 pb-1">
                  Skills
                </h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <p className="text-sm font-medium text-gray-700">
                        {skill.name}
                      </p>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full"
                          style={{ width: `${skill.level || 70}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Social */}
            <div className="flex justify-start gap-4 mt-8">
              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5 text-blue-700 hover:text-indigo-700 transition" />
                </a>
              )}
              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 text-blue-700 hover:text-indigo-700 transition" />
                </a>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <section className="col-span-2 p-10 overflow-y-auto">
            {summary && (
              <section className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                  About Me
                </h3>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </section>
            )}

            {education?.length > 0 && (
              <section className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                  Education
                </h3>
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4 mb-3">
                    <p className="font-bold text-gray-800">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    <p className="text-sm text-blue-600 font-medium">{edu.year}</p>
                  </div>
                ))}
              </section>
            )}

            {experience?.length > 0 && (
              <section className="mb-6">
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                  Experience
                </h3>
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4 mb-3">
                    <p className="font-bold text-gray-800">{exp.role}</p>
                    <p className="text-sm text-gray-700">{exp.company}</p>
                    <p className="text-sm text-blue-600">{exp.duration}</p>
                    {exp.details && (
                      <p className="text-sm text-gray-600 mt-1">{exp.details}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {projects?.length > 0 && (
              <section>
                <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                  Projects
                </h3>
                {projects.map((proj, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4 mb-3">
                    <h4 className="font-semibold text-gray-800">{proj.title}</h4>
                    {proj.description && (
                      <p className="text-sm text-gray-600">{proj.description}</p>
                    )}
                    {proj.link && (
                      <a
                        href={
                          proj.link.startsWith("http")
                            ? proj.link
                            : `https://${proj.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm hover:text-indigo-700 transition"
                      >
                        {proj.link}
                      </a>
                    )}
                  </div>
                ))}
              </section>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
