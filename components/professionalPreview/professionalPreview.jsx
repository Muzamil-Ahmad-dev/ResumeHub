"use client";

import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";

export default function ProfessionalPreview({ data }) {
  const router = useRouter();
  const resumeRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg mb-4">No preview available.</p>
        <button
          onClick={() => router.push("/")}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const html2canvas = (await import("html2canvas-pro")).default;
      const element = resumeRef.current;
      if (!element) return;

      const originalStyle = {
        width: element.style.width,
        minHeight: element.style.minHeight,
        boxShadow: element.style.boxShadow,
        borderRadius: element.style.borderRadius,
        overflow: element.style.overflow,
        transform: element.style.transform,
      };

      element.style.width = "794px";
      element.style.minHeight = "1123px";
      element.style.boxShadow = "none";
      element.style.borderRadius = "0";
      element.style.overflow = "visible";
      element.style.transform = "none";
      element.style.WebkitPrintColorAdjust = "exact";
      element.style.printColorAdjust = "exact";
      element.style.backgroundColor = "#ffffff";

      window.scrollTo(0, 0);

      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgPropsHeight = (canvas.height * pdfWidth) / canvas.width;
      const totalPages = Math.ceil(imgPropsHeight / pdfHeight);

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

      pdf.save(`${data.personal.name || "My_Resume"}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsDownloading(false);
      const element = resumeRef.current;
      if (element) {
        Object.assign(element.style, {
          width: "",
          minHeight: "",
          boxShadow: "",
          borderRadius: "",
          overflow: "",
          transform: "",
          WebkitPrintColorAdjust: "",
          printColorAdjust: "",
          backgroundColor: "",
        });
      }
    }
  };

  const {
    personal,
    summary,
    education = [],
    experience = [],
    skills = [],
    projects = [],
  } = data;

  return (
    <div className="relative min-h-screen bg-orange-50 py-8 px-4">
      {isDownloading && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid mb-4"></div>
          <p className="text-white text-lg font-semibold">
            Downloading your resume...
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition w-full md:w-auto"
        >
          Back to Home
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-full md:w-auto"
        >
          Download Resume
        </button>
      </div>

      {/* Horizontal scroll wrapper for mobile/tablet */}
      <div className="overflow-x-auto">
        <div
          ref={resumeRef}
          className="min-w-[900px] max-w-6xl mx-auto grid grid-cols-3 gap-0 shadow-2xl rounded-lg overflow-hidden bg-white"
        >
          {/* LEFT COLUMN */}
          <div className="col-span-2 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              {personal.profilePic && (
                <img
                  src={personal.profilePic}
                  alt={personal.name}
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 md:border-8 border-gray-800"
                />
              )}
              <div className="flex-1 pt-4 text-center md:text-left">
                <div
                  className="bg-orange-500 px-4 py-2 md:px-6 md:py-4 mb-4 inline-block rounded-lg"
                  style={{
                    color: "#ffffff",
                    WebkitPrintColorAdjust: "exact",
                    printColorAdjust: "exact",
                    transform: "translateZ(0)",
                    willChange: "transform",
                  }}
                >
                  <h1
                    className="text-2xl md:text-3xl font-bold"
                    style={{
                      color: "#ffffff",
                      opacity: 1,
                      textShadow: "0 0 1px #00000030",
                    }}
                  >
                    {personal.name || "Your Name"}
                  </h1>
                  <p
                    className="text-md md:text-lg font-semibold"
                    style={{ color: "#fff6e0", opacity: 1 }}
                  >
                    {personal.title || "Professional"}
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            {education.length > 0 && (
              <section className="mb-6">
                <h3 className="bg-orange-500 text-white font-bold text-lg px-4 py-2 mb-4 inline-block rounded">
                  EDUCATION
                </h3>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="flex gap-4 flex-wrap">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-bold text-gray-800">{edu.year}</p>
                        <p className="font-semibold text-gray-700">{edu.degree}</p>
                        <p className="text-gray-600 text-sm">{edu.school}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <section className="mb-6">
                <h3 className="bg-orange-500 text-white font-bold text-lg px-4 py-2 mb-4 inline-block rounded">
                  EXPERIENCE
                </h3>
                <div className="space-y-4">
                  {experience.map((exp, i) => (
                    <div key={i} className="flex gap-4 flex-wrap">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-bold text-gray-800">{exp.role}</p>
                        <p className="text-gray-700 font-semibold">{exp.company}</p>
                        <p className="text-gray-600 text-sm">{exp.duration}</p>
                        {exp.details && (
                          <p className="text-gray-600 text-sm mt-1">{exp.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Summary */}
            {summary && (
              <section className="mb-6">
                <h3 className="bg-orange-500 text-white font-bold text-lg px-4 py-2 mb-4 inline-block rounded">
                  ABOUT ME
                </h3>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h3 className="bg-orange-500 text-white font-bold text-lg px-4 py-2 mb-4 inline-block rounded">
                  PROJECTS
                </h3>
                <div className="space-y-4">
                  {projects.map((proj, i) => (
                    <div key={i} className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-semibold text-gray-800">{proj.title}</h3>
                      {proj.description && (
                        <p className="text-gray-600 text-sm mb-1">{proj.description}</p>
                      )}
                      {proj.link && (
                        <p className="text-sm">
                          🔗{" "}
                          <a
                            href={
                              proj.link.startsWith("http")
                                ? proj.link
                                : `https://${proj.link}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 underline font-medium hover:text-orange-700 transition-all duration-200 break-all"
                          >
                            {proj.link}
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="bg-gray-800 text-white p-6 md:p-8 flex flex-col md:min-h-full">
            {/* Contact Info */}
            <div className="mb-6 md:mb-8">
              <div className="border-2 border-orange-500 px-4 py-3 mb-4 text-center rounded">
                <p className="font-bold text-lg">CONTACT ME</p>
              </div>
              <div className="space-y-4 text-sm">
                {personal.address && (
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-orange-500 font-semibold">ADDRESS</p>
                      <p className="text-gray-300">{personal.address}</p>
                    </div>
                  </div>
                )}
                {personal.email && (
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-orange-500 font-semibold">EMAIL</p>
                      <p className="text-gray-300">{personal.email}</p>
                    </div>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-orange-500 font-semibold">PHONE</p>
                      <p className="text-gray-300">{personal.phone}</p>
                    </div>
                  </div>
                )}
                {personal.website && (
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-orange-500 font-semibold">WEBSITE</p>
                      <a
                        href={
                          personal.website.startsWith("http")
                            ? personal.website
                            : `https://${personal.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 underline hover:text-orange-500"
                      >
                        {personal.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="flex-1">
                <div className="border-2 border-orange-500 px-4 py-3 mb-4 text-center rounded">
                  <p className="font-bold text-lg">PRO SKILLS</p>
                </div>
                <div className="space-y-4">
                  {skills.map((skill, i) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-gray-300 mb-1">
                        {skill.name}
                      </p>
                      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-orange-500 h-full"
                          style={{ width: `${skill.level || 75}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Icons */}
            <div className="flex justify-center gap-4 mt-6 md:mt-8 pt-6 border-t border-gray-700">
              {personal.instagram && (
                <a
                  href={
                    personal.instagram.startsWith("http")
                      ? personal.instagram
                      : `https://instagram.com/${personal.instagram}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6 text-white hover:text-orange-500 cursor-pointer transition" />
                </a>
              )}
              {personal.twitter && (
                <a
                  href={
                    personal.twitter.startsWith("http")
                      ? personal.twitter
                      : `https://twitter.com/${personal.twitter}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6 text-white hover:text-orange-500 cursor-pointer transition" />
                </a>
              )}
              {personal.whatsapp && (
                <a
                  href={`https://wa.me/${personal.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-6 h-6 text-white hover:text-orange-500 cursor-pointer transition" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
