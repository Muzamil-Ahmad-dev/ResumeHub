"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * SimpleForm Component
 * ------------------------------------------------------------
 * A single-page resume form that collects user data for 
 * ATS-optimized resume generation. 
 * Uses controlled inputs and dynamic field sections.
 * ------------------------------------------------------------
 */
export default function SimpleForm({ selectedTemplate }) {
  const router = useRouter();

  /**
   * ===============================
   *  STATE MANAGEMENT
   * ===============================
   */

  // Personal Information
  const [personal, setPersonal] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    linkedin: "",
    address: "",
  });

  // Resume Content Sections
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([
    { school: "", degree: "", startYear: "", endYear: "" },
  ]);
  const [experience, setExperience] = useState([
    { company: "", position: "", startDate: "", endDate: "", responsibilities: "" },
  ]);
  const [skills, setSkills] = useState([{ name: "" }]);
  const [certifications, setCertifications] = useState([
    { title: "", issuer: "", year: "" },
  ]);
  const [projects, setProjects] = useState([
    { title: "", description: "", link: "" },
  ]);

  /**
   * ===============================
   *  HANDLER UTILITIES
   * ===============================
   */

  // Handle input changes for personal info fields
  const handlePersonalChange = (field, value) =>
    setPersonal((prev) => ({ ...prev, [field]: value }));

  // Generic list field updater (used for education, experience, etc.)
  const handleListChange = (index, field, value, list, setter) => {
    const updated = [...list];
    updated[index][field] = value;
    setter(updated);
  };

  // Utility: add a new blank entry for any list-based section
  const handleAddField = (setter, template) =>
    setter((prev) => [...prev, template]);

  /**
   * ===============================
   *  FORM SUBMISSION
   * ===============================
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    const resumeData = {
      template: selectedTemplate || { title: "Simple ATS Resume" },
      personal,
      summary,
      education: education.filter((e) => e.school || e.degree),
      experience: experience.filter((e) => e.company || e.position),
      skills: skills.filter((s) => s.name),
      certifications: certifications.filter((c) => c.title || c.issuer),
      projects: projects.filter((p) => p.title || p.description),
    };

    // Persist resume data to localStorage for preview usage
    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    // Redirect to preview page
    router.push("/simplePreview");
  };

  /**
   * ===============================
   *  RENDER JSX
   * ===============================
   */

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600">
          {selectedTemplate?.title || "Simple ATS Resume Builder"}
        </h2>
        <p className="text-gray-500 mt-2">
          Fill in your professional details to generate an ATS-friendly resume.
        </p>
      </div>

      {/* Resume Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-10 bg-white shadow-md rounded-2xl p-8 border border-gray-100"
      >
        {/* ===============================
            PERSONAL INFORMATION
        =============================== */}
        <section className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "fullName", label: "Full Name", required: true },
              { name: "jobTitle", label: "Job Title" },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone" },
              { name: "linkedin", label: "LinkedIn Profile (optional)", colSpan: 2 },
              { name: "address", label: "Address", colSpan: 2 },
            ].map(({ name, label, type = "text", required, colSpan }) => (
              <input
                key={name}
                type={type}
                placeholder={label}
                required={required}
                value={personal[name]}
                onChange={(e) => handlePersonalChange(name, e.target.value)}
                className={`p-3 border rounded-lg ${
                  colSpan ? "md:col-span-2" : ""
                }`}
              />
            ))}
          </div>
        </section>

        {/* ===============================
            PROFESSIONAL SUMMARY
        =============================== */}
        <section className="border-l-4 border-green-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-green-600">
            Professional Summary
          </h3>
          <textarea
            rows={4}
            className="w-full border rounded-lg p-3"
            placeholder="Write a short summary highlighting your expertise and professional goals..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </section>

        {/* ===============================
            EDUCATION SECTION
        =============================== */}
        <section className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">Education</h3>
          {education.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
              {["school", "degree", "startYear", "endYear"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={
                    field === "school"
                      ? "School / University"
                      : field === "degree"
                      ? "Degree"
                      : field === "startYear"
                      ? "Start Year"
                      : "End Year"
                  }
                  className="p-3 border rounded-lg"
                  value={edu[field]}
                  onChange={(e) =>
                    handleListChange(i, field, e.target.value, education, setEducation)
                  }
                />
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddField(setEducation, {
                school: "",
                degree: "",
                startYear: "",
                endYear: "",
              })
            }
            className="text-blue-600 underline text-sm"
          >
            + Add Education
          </button>
        </section>

        {/* ===============================
            EXPERIENCE SECTION
        =============================== */}
        <section className="border-l-4 border-green-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-green-600">
            Work Experience
          </h3>
          {experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              {["company", "position", "startDate", "endDate"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={
                    field === "company"
                      ? "Company"
                      : field === "position"
                      ? "Position"
                      : field === "startDate"
                      ? "Start Date"
                      : "End Date"
                  }
                  className="p-3 border rounded-lg"
                  value={exp[field]}
                  onChange={(e) =>
                    handleListChange(i, field, e.target.value, experience, setExperience)
                  }
                />
              ))}
              <textarea
                placeholder="Responsibilities / Achievements"
                className="p-3 border rounded-lg md:col-span-2"
                value={exp.responsibilities}
                onChange={(e) =>
                  handleListChange(i, "responsibilities", e.target.value, experience, setExperience)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddField(setExperience, {
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                responsibilities: "",
              })
            }
            className="text-green-600 underline text-sm"
          >
            + Add Experience
          </button>
        </section>

        {/* ===============================
            SKILLS SECTION
        =============================== */}
        <section className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">Skills</h3>
          {skills.map((skill, i) => (
            <input
              key={i}
              type="text"
              placeholder="Skill"
              className="p-3 border rounded-lg w-full mb-2"
              value={skill.name}
              onChange={(e) =>
                handleListChange(i, "name", e.target.value, skills, setSkills)
              }
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField(setSkills, { name: "" })}
            className="text-blue-600 underline text-sm"
          >
            + Add Skill
          </button>
        </section>

        {/* ===============================
            CERTIFICATIONS SECTION
        =============================== */}
        <section className="border-l-4 border-green-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-green-600">
            Certifications
          </h3>
          {certifications.map((cert, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              {["title", "issuer", "year"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={
                    field === "title"
                      ? "Title"
                      : field === "issuer"
                      ? "Issuer"
                      : "Year"
                  }
                  className="p-3 border rounded-lg"
                  value={cert[field]}
                  onChange={(e) =>
                    handleListChange(i, field, e.target.value, certifications, setCertifications)
                  }
                />
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddField(setCertifications, { title: "", issuer: "", year: "" })
            }
            className="text-green-600 underline text-sm"
          >
            + Add Certification
          </button>
        </section>

        {/* ===============================
            PROJECTS SECTION
        =============================== */}
        <section className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">Projects</h3>
          {projects.map((proj, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              {["title", "description", "link"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={
                    field === "title"
                      ? "Project Title"
                      : field === "description"
                      ? "Description"
                      : "Project Link"
                  }
                  className="p-3 border rounded-lg"
                  value={proj[field]}
                  onChange={(e) =>
                    handleListChange(i, field, e.target.value, projects, setProjects)
                  }
                />
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAddField(setProjects, { title: "", description: "", link: "" })
            }
            className="text-blue-600 underline text-sm"
          >
            + Add Project
          </button>
        </section>

        {/* ===============================
            FORM ACTION BUTTONS
        =============================== */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-600 text-white py-2 px-8 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Preview ATS Resume
          </button>
       
        </div>
      </form>
    </div>
  );
}
