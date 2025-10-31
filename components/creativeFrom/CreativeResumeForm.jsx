"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * CreativeResumeForm Component
 * ----------------------------------------------------------
 * A client-side form for building a creative resume.
 * Collects user details such as personal info, education,
 * experience, skills, and projects, then persists data to
 * localStorage before navigating to a preview page.
 */
export default function CreativeResumeForm({ selectedTemplate }) {
  const router = useRouter();

  /** =======================
   * State Management
   * ======================= */

  // Personal Information
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // Resume Sections
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);
  const [experience, setExperience] = useState([{ company: "", role: "", duration: "", details: "" }]);
  const [skills, setSkills] = useState([{ name: "", level: 75 }]);
  const [projects, setProjects] = useState([{ title: "", description: "", link: "" }]);

  /** =======================
   * Handlers
   * ======================= */

  // Handle profile image upload and convert to Base64
  const handleProfilePicChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct structured resume data
    const resumeData = {
      template: selectedTemplate || { title: "Creative Resume" },
      personal: { name, title, email, phone, address, profilePic },
      summary,
      education: education.filter((item) => item.school || item.degree || item.year),
      experience: experience.filter((item) => item.company || item.role || item.duration || item.details),
      skills: skills.filter((item) => item.name),
      projects: projects.filter((item) => item.title || item.description || item.link),
    };

    // Persist resume data in browser localStorage
    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    // Navigate to the preview page
    router.push("/creativePreview");
  };

  /** =======================
   * Dynamic Field Adders
   * ======================= */
  const addEducation = () => setEducation([...education, { school: "", degree: "", year: "" }]);
  const addExperience = () => setExperience([...experience, { company: "", role: "", duration: "", details: "" }]);
  const addSkill = () => setSkills([...skills, { name: "", level: 75 }]);
  const addProject = () => setProjects([...projects, { title: "", description: "", link: "" }]);

  /** =======================
   * Render
   * ======================= */
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">
          {selectedTemplate?.title || "Creative Resume Builder"}
        </h2>
        <p className="text-gray-500 mt-2">Design your unique creative resume below.</p>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-10 bg-white shadow-xl rounded-3xl p-8 border border-gray-100"
      >

        {/* ---------------- PERSONAL INFO ---------------- */}
        <section className="border-l-4 border-orange-500 pl-4">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Professional Title (e.g. UI/UX Designer)"
              className="p-3 border rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              className="p-3 border rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="p-3 border rounded-lg md:col-span-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="p-3 border rounded-lg md:col-span-2"
              onChange={(e) => handleProfilePicChange(e.target.files[0])}
            />
          </div>
        </section>

        {/* ---------------- SUMMARY ---------------- */}
        <section className="border-l-4 border-purple-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-orange-500">Professional Summary</h3>
          <textarea
            rows={4}
            className="w-full border rounded-lg p-3"
            placeholder="Write a brief creative summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </section>

        {/* ---------------- EDUCATION ---------------- */}
        <section className="border-l-4 border-orange-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-purple-600">Education</h3>
          {education.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              {["school", "degree", "year"].map((field, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="p-3 border rounded-lg"
                  value={edu[field]}
                  onChange={(e) => {
                    const updated = [...education];
                    updated[i][field] = e.target.value;
                    setEducation(updated);
                  }}
                />
              ))}
            </div>
          ))}
          <button type="button" onClick={addEducation} className="text-purple-600 underline text-sm">
            + Add Education
          </button>
        </section>

        {/* ---------------- EXPERIENCE ---------------- */}
        <section className="border-l-4 border-purple-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-orange-500">Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                placeholder="Company"
                className="p-3 border rounded-lg"
                value={exp.company}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[i].company = e.target.value;
                  setExperience(updated);
                }}
              />
              <input
                type="text"
                placeholder="Role"
                className="p-3 border rounded-lg"
                value={exp.role}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[i].role = e.target.value;
                  setExperience(updated);
                }}
              />
              <input
                type="text"
                placeholder="Duration"
                className="p-3 border rounded-lg md:col-span-2"
                value={exp.duration}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[i].duration = e.target.value;
                  setExperience(updated);
                }}
              />
              <textarea
                placeholder="Details"
                className="p-3 border rounded-lg md:col-span-2"
                value={exp.details}
                onChange={(e) => {
                  const updated = [...experience];
                  updated[i].details = e.target.value;
                  setExperience(updated);
                }}
              />
            </div>
          ))}
          <button type="button" onClick={addExperience} className="text-purple-600 underline text-sm">
            + Add Experience
          </button>
        </section>

        {/* ---------------- SKILLS ---------------- */}
        <section className="border-l-4 border-orange-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-purple-600">Skills</h3>
          {skills.map((skill, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Skill Name"
                className="p-3 border rounded-lg"
                value={skill.name}
                onChange={(e) => {
                  const updated = [...skills];
                  updated[i].name = e.target.value;
                  setSkills(updated);
                }}
              />
              <input
                type="number"
                placeholder="Level (0–100)"
                className="p-3 border rounded-lg"
                value={skill.level}
                onChange={(e) => {
                  const updated = [...skills];
                  updated[i].level = e.target.value;
                  setSkills(updated);
                }}
              />
            </div>
          ))}
          <button type="button" onClick={addSkill} className="text-purple-600 underline text-sm">
            + Add Skill
          </button>
        </section>

        {/* ---------------- PROJECTS ---------------- */}
        <section className="border-l-4 border-purple-500 pl-4">
          <h3 className="text-xl font-semibold mb-3 text-orange-500">Projects</h3>
          {projects.map((proj, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              {["title", "description", "link"].map((field, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Project ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  className="p-3 border rounded-lg"
                  value={proj[field]}
                  onChange={(e) => {
                    const updated = [...projects];
                    updated[i][field] = e.target.value;
                    setProjects(updated);
                  }}
                />
              ))}
            </div>
          ))}
          <button type="button" onClick={addProject} className="text-purple-600 underline text-sm">
            + Add Project
          </button>
        </section>

        {/* ---------------- ACTION BUTTONS ---------------- */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-2 px-8 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Preview Creative Resume
          </button>
       
        </div>
      </form>
    </div>
  );
}
