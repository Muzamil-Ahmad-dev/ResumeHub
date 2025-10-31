"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * ProfessionalForm Component
 * ----------------------------------------------------------------------------- 
 * A dynamic, multi-section form used for building a professional resume.
 * This component captures user input for personal details, education, experience,
 * skills, and projects — then stores data in localStorage for preview generation.
 *
 * Props:
 * - selectedTemplate: Object containing template metadata (e.g. title, design info)
 *
 * Navigation:
 * - On submit → navigates to /professionalPreview
 */

export default function ProfessionalForm({ selectedTemplate }) {
  const router = useRouter();

  /** -------------------------------------------------------------------------
   *  Component State
   *  -------------------------------------------------------------------------
   *  Each section (personal info, education, etc.) is managed via isolated
   *  state hooks for clarity and controlled re-renders.
   */
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [summary, setSummary] = useState("");

  const [education, setEducation] = useState([{ school: "", degree: "", year: "" }]);
  const [experience, setExperience] = useState([
    { company: "", role: "", duration: "", details: "" },
  ]);
  const [skills, setSkills] = useState([{ name: "", level: 75 }]);
  const [projects, setProjects] = useState([{ title: "", description: "", link: "" }]);

  /** -------------------------------------------------------------------------
   *  File Handling
   *  -------------------------------------------------------------------------
   *  Reads selected image file and stores as Base64 data for preview and export.
   */
  const handleProfilePicChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  /** -------------------------------------------------------------------------
   *  Form Submission
   *  -------------------------------------------------------------------------
   *  Compiles all user input into a structured resume object.
   *  Filters out empty fields and stores data in localStorage before navigation.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const resumeData = {
      template: selectedTemplate || { title: "Professional Resume" },
      personal: { name, title, email, phone, address, profilePic },
      summary,
      education: education.filter((edu) => edu.school || edu.degree || edu.year),
      experience: experience.filter(
        (exp) => exp.company || exp.role || exp.duration || exp.details
      ),
      skills: skills.filter((s) => s.name),
      projects: projects.filter(
        (proj) => proj.title || proj.description || proj.link
      ),
    };

    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    router.push("/professionalPreview");
  };

  /** -------------------------------------------------------------------------
   *  Dynamic Section Handlers
   *  -------------------------------------------------------------------------
   *  Used for adding and updating form fields dynamically.
   *  (Each section maintains its own CRUD operations.)
   */
  const addEducation = () =>
    setEducation([...education, { school: "", degree: "", year: "" }]);
  const addExperience = () =>
    setExperience([...experience, { company: "", role: "", duration: "", details: "" }]);
  const addSkill = () => setSkills([...skills, { name: "", level: 75 }]);
  const addProject = () =>
    setProjects([...projects, { title: "", description: "", link: "" }]);

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const updateSkill = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  /** -------------------------------------------------------------------------
   *  Render
   *  -------------------------------------------------------------------------
   *  The form layout is responsive, mobile-friendly, and sectioned logically.
   */
  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto py-12">
      {/* -----------------------------------------------------------------------
         * Header Section
         * ----------------------------------------------------------------------- */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-orange-600">
          {selectedTemplate?.title || "Build Your Resume"}
        </h2>
      
      </div>

      {/* -----------------------------------------------------------------------
         * Main Form Body
         * ----------------------------------------------------------------------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-6"
      >
        {/* ============================= PERSONAL INFO ============================= */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Professional Title (e.g. MERN Stack Developer)"
              className="p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              className="p-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="p-2 border rounded md:col-span-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="p-2 border rounded md:col-span-2"
              onChange={(e) => handleProfilePicChange(e.target.files[0])}
            />
          </div>
        </section>

        {/* ============================= SUMMARY ============================= */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Professional Summary</h3>
          <textarea
            placeholder="Write a short professional summary"
            className="w-full p-2 border rounded"
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </section>

        {/* ============================= EDUCATION ============================= */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Education</h3>
          {education.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
              <input
                type="text"
                placeholder="School"
                value={edu.school}
                onChange={(e) => updateEducation(i, "school", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(i, "degree", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => updateEducation(i, "year", e.target.value)}
                className="p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="text-orange-500 underline text-sm mt-2"
          >
            + Add Education
          </button>
        </section>

        {/* ============================= EXPERIENCE ============================= */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => updateExperience(i, "company", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => updateExperience(i, "role", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => updateExperience(i, "duration", e.target.value)}
                className="p-2 border rounded"
              />
              <textarea
                placeholder="Details"
                value={exp.details}
                onChange={(e) => updateExperience(i, "details", e.target.value)}
                className="p-2 border rounded md:col-span-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="text-orange-500 underline text-sm mt-2"
          >
            + Add Experience
          </button>
        </section>

        {/* ============================= SKILLS ============================= */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Skills</h3>
          {skills.map((skill, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 mb-2">
              <input
                type="text"
                placeholder="Skill Name"
                value={skill.name}
                onChange={(e) => updateSkill(i, "name", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Level (0–100)"
                value={skill.level}
                onChange={(e) => updateSkill(i, "level", e.target.value)}
                className="p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="text-orange-500 underline text-sm mt-2"
          >
            + Add Skill
          </button>
        </section>

        {/* ============================= PROJECTS ============================= */}
        <section>
          <h3 className="font-semibold text-lg mb-2">Projects</h3>
          {projects.map((proj, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => updateProject(i, "title", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Project Description"
                value={proj.description}
                onChange={(e) => updateProject(i, "description", e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Project Link"
                value={proj.link}
                onChange={(e) => updateProject(i, "link", e.target.value)}
                className="p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addProject}
            className="text-orange-500 underline text-sm mt-2"
          >
            + Add Project
          </button>
        </section>

        {/* ============================= ACTION BUTTONS ============================= */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Preview Resume
          </button>
        
        </div>
      </form>
    </div>
  );
}
