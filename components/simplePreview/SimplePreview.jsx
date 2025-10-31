"use client";

import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Linkedin, Loader2 } from "lucide-react";

/**
 * SimpleResumePreview Component
 * ------------------------------------------------------------------
 * Displays a clean, print-optimized resume preview with the ability
 * to export it as a multi-page PDF using html2canvas and jsPDF.
 * ------------------------------------------------------------------
 */
export default function SimpleResumePreview({ data }) {
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

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);

      const html2canvas = (await import("html2canvas-pro")).default;
      const element = resumeRef.current;
      if (!element) return;

      window.scrollTo({ top: 0, behavior: "instant" });

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add remaining pages if necessary
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${data.personal?.fullName || "Simple_Resume"}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  const {
    personal,
    summary,
    education = [],
    experience = [],
    skills = [],
    certifications = [],
    projects = [],
  } = data;

  return (
    <div className="relative min-h-screen bg-gray-50 py-8 px-4">
      {/* LOADING OVERLAY */}
      {downloading && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
          <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
          <p className="text-white text-lg font-medium">
            Preparing your resume...
          </p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-6">
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
              <Loader2 className="w-4 h-4 animate-spin" /> Downloading...
            </>
          ) : (
            "Download Resume"
          )}
        </button>
      </div>

      {/* RESUME PREVIEW CONTAINER */}
      <div className="overflow-x-auto">
        <div
          ref={resumeRef}
          className="bg-white shadow-lg rounded-xl border border-gray-200 mx-auto"
          style={{
            minWidth: "794px", // Keep A4 width
            padding: "40px",
            overflow: "visible", // allow content to expand
          }}
        >
          {/* HEADER SECTION */}
          <header className="border-b-2 border-gray-300 pb-4 mb-6 text-center">
            <h1 className="text-3xl font-bold uppercase text-gray-900">
              {personal?.fullName || "Your Name"}
            </h1>
            {personal?.jobTitle && (
              <p className="text-lg text-gray-700 font-medium">
                {personal.jobTitle}
              </p>
            )}

            {/* Contact details */}
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-600">
              {personal?.email && (
                <span className="flex items-center gap-1">
                  <Mail size={14} /> {personal.email}
                </span>
              )}
              {personal?.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {personal.phone}
                </span>
              )}
              {personal?.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin size={14} /> {personal.linkedin}
                </span>
              )}
              {personal?.address && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {personal.address}
                </span>
              )}
            </div>
          </header>

          {/* SUMMARY */}
          {summary && (
            <Section title="Professional Summary">
              <p className="text-gray-700 text-sm whitespace-pre-line">{summary}</p>
            </Section>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <Section title="Education">
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-bold text-sm">
                    {edu.degree || "Degree"} - {edu.school || "Institution"}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))}
            </Section>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <Section title="Work Experience">
              {experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-bold text-sm">
                    {exp.position || "Position"} - {exp.company || "Company"}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  {exp.responsibilities && (
                    <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                      {exp.responsibilities}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <Section title="Skills">
              <ul className="flex flex-wrap gap-2 text-sm">
                {skills.filter((s) => s.name).map((skill, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-gray-800"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <Section title="Certifications">
              {certifications.filter((c) => c.title).map((cert, i) => (
                <div key={i} className="mb-2">
                  <p className="text-sm font-bold">
                    {cert.title}
                    {cert.issuer && <span className="font-normal"> - {cert.issuer}</span>}
                  </p>
                  {cert.year && <p className="text-xs text-gray-600">{cert.year}</p>}
                </div>
              ))}
            </Section>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <Section title="Projects">
              {projects.filter((p) => p.title).map((proj, i) => (
                <div key={i} className="mb-3">
                  <h3 className="text-sm font-bold text-gray-900">{proj.title}</h3>
                  {proj.description && (
                    <p className="text-sm text-gray-700">{proj.description}</p>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link.startsWith("http") ? proj.link : `https://${proj.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Section Component
 */
function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">{title}</h2>
      {children}
    </section>
  );
}
