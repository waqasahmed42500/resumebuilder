"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";
import SocialIcon from "../../Component/SocialIcon";

/**
 * Resume2 — Photo header + two-column sidebar/timeline layout
 * (photo, serif name, contact bar, left sidebar: Education/Skills/
 * Certifications/Languages, right column: Experience/Projects w/ timeline dots)
 */
const Resume2 = memo(function Resume2({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#2563eb";

  const contact = data?.contact || {};
  const skills = data?.skills || [];
  const experiences = data?.experiences || [];
  const education = data?.education || [];
  const certifications = data?.certifications || [];
  const languages = data?.languages || [];
  const projects = data?.projects || [];
  const portfolio = data?.portfolio || [];

  const {
    updateContact,
    updateSummary,
    updateExperience,
    addExperience,
    removeExperience,
    moveExperience,
    updateEducation,
    addEducation,
    removeEducation,
    moveEducation,
    updateSkill,
    addSkill,
    removeSkill,
    moveSkill,
    updateCertification,
    addCertification,
    removeCertification,
    moveCertification,
    updateLanguage,
    addLanguage,
    removeLanguage,
    moveLanguage,
    updateProject,
    addProject,
    removeProject,
    moveProject,
    updatePortfolio,
    addPortfolio,
    removePortfolio,
    movePortfolio,
  } = context || {};

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !updateContact) return;
    const reader = new FileReader();
    reader.onload = () => updateContact("photo", reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-white min-h-[1123px]">
      {/* Header */}
      <header className="px-10 pt-10 pb-6">
        <div className="flex items-start gap-6">
          {/* Photo */}
          <div className="relative shrink-0">
            <div
              className="h-24 w-24 rounded-full overflow-hidden bg-slate-100 border"
              style={{ borderColor: `${accent}30` }}
            >
              {contact.photo ? (
                <img src={contact.photo} alt={contact.fullName || "Profile"} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 text-2xl font-bold">
                  {(contact.fullName || "?").charAt(0)}
                </div>
              )}
            </div>
            {!readOnly && (
              <label className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white text-[10px] cursor-pointer shadow" style={{ backgroundColor: accent }}>
                +
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            )}
          </div>

          {/* Name + Title + Summary */}
          <div className="flex-1 pt-1">
             <h1 className="mt-1 text-3xl font-black tracking-tight">
            <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
          </h1>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
            </p>
            <p className="mt-2 max-w-xl text-[11px] leading-5 text-slate-500">
              <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
            </p>
          </div>
        </div>

        {/* Contact bar */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1.5 border-t pt-3 text-[11px] text-slate-600" style={{ borderColor: "#e2e8f0" }}>
          <span className="flex items-center gap-1.5">
            <span style={{ color: accent }}>☎</span>
            <EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" />
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: accent }}>✉</span>
            <EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" />
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: accent }}>📍</span>
            <EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" />
          </span>
          {contact.linkedin && (
            <span className="flex items-center gap-1.5">
              <SocialIcon platform="linkedin" url={contact.linkedin} className="text-xs" />
              <EditableText value={contact.linkedin} onChange={(val) => updateContact?.("linkedin", val)} readOnly={readOnly} placeholder="linkedin.com/in/you" />
            </span>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="grid grid-cols-[0.85fr_1.55fr] gap-8 px-10 pb-10">
        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Education */}
          <section className="relative border-l pl-4" style={{ borderColor: "#e2e8f0" }}>
            <h2 className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-800">
              <span className="-ml-[21px] h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              Education
            </h2>
            {education.map((entry, index) => (
              <div key={entry.id || index} className="group/item relative mb-3 last:mb-0">
                <p className="text-xs font-bold text-slate-900">
                  <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  <EditableText value={entry.school} onChange={(val) => updateEducation?.(entry.id, "school", val)} readOnly={readOnly} placeholder="School" />
                </p>
                <p className="text-[11px] text-slate-400">
                  <EditableText value={entry.year} onChange={(val) => updateEducation?.(entry.id, "year", val)} readOnly={readOnly} placeholder="Year" />
                </p>
                {!readOnly && (
                  <SectionControls
                    className="absolute top-0 right-0"
                    onMoveUp={() => moveEducation?.(entry.id, "up")}
                    onMoveDown={() => moveEducation?.(entry.id, "down")}
                    onAdd={() => addEducation?.(index)}
                    onDelete={() => removeEducation?.(entry.id)}
                    canMoveUp={index > 0}
                    canMoveDown={index < education.length - 1}
                    canDelete={education.length > 1}
                  />
                )}
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="relative border-l pl-4" style={{ borderColor: "#e2e8f0" }}>
            <h2 className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-800">
              <span className="-ml-[21px] h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              Skills
            </h2>
            <ul className="space-y-1">
              {skills.map((skill, index) => (
                <li key={index} className="group/item relative text-xs text-slate-700">
                  • <EditableText value={skill} onChange={(val) => updateSkill?.(index, val)} readOnly={readOnly} placeholder="Skill" />
                  {!readOnly && (
                    <SectionControls
                      className="absolute -top-1 right-0"
                      onMoveUp={() => moveSkill?.(index, "left")}
                      onMoveDown={() => moveSkill?.(index, "right")}
                      onAdd={() => addSkill?.("New Skill")}
                      onDelete={() => removeSkill?.(index)}
                      canMoveUp={index > 0}
                      canMoveDown={index < skills.length - 1}
                      canDelete={skills.length > 1}
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="relative border-l pl-4" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-800">
                <span className="-ml-[21px] h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                Certifications
              </h2>
              <ul className="space-y-1.5">
                {certifications.map((cert, index) => (
                  <li key={cert.id || index} className="group/item relative text-xs text-slate-700">
                    • <EditableText value={cert.name} onChange={(val) => updateCertification?.(cert.id, "name", val)} readOnly={readOnly} placeholder="Cert Title" />
                    {!readOnly && (
                      <SectionControls
                        className="absolute -top-1 right-0"
                        onMoveUp={() => moveCertification?.(cert.id, "up")}
                        onMoveDown={() => moveCertification?.(cert.id, "down")}
                        onAdd={() => addCertification?.(index)}
                        onDelete={() => removeCertification?.(cert.id)}
                        canMoveUp={index > 0}
                        canMoveDown={index < certifications.length - 1}
                        canDelete={certifications.length > 1}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="relative border-l pl-4" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-800">
                <span className="-ml-[21px] h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                Languages
              </h2>
              <ul className="space-y-1.5">
                {languages.map((lang, index) => (
                  <li key={lang.id || index} className="group/item relative text-xs text-slate-700">
                    • <EditableText value={lang.name} onChange={(val) => updateLanguage?.(lang.id, "name", val)} readOnly={readOnly} placeholder="Language" />
                    <span className="text-slate-400">
                      {" "}(<EditableText value={lang.proficiency} onChange={(val) => updateLanguage?.(lang.id, "proficiency", val)} readOnly={readOnly} placeholder="Level" />)
                    </span>
                    {!readOnly && (
                      <SectionControls
                        className="absolute -top-1 right-0"
                        onMoveUp={() => moveLanguage?.(lang.id, "up")}
                        onMoveDown={() => moveLanguage?.(lang.id, "down")}
                        onAdd={() => addLanguage?.(index)}
                        onDelete={() => removeLanguage?.(lang.id)}
                        canMoveUp={index > 0}
                        canMoveDown={index < languages.length - 1}
                        canDelete={languages.length > 1}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Portfolio / Social */}
          {portfolio.length > 0 && (
            <section className="relative border-l pl-4" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-800">
                <span className="-ml-[21px] h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                Links
              </h2>
              <ul className="space-y-1.5">
                {portfolio.map((link, index) => (
                  <li key={link.id || index} className="group/item relative flex items-center gap-1.5 text-xs">
                    <SocialIcon platform={link.platform} url={link.url} className="text-xs" />
                    <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-blue-600 transition">
                      <EditableText value={link.platform} onChange={(val) => updatePortfolio?.(link.id, "platform", val)} readOnly={readOnly} placeholder="Platform" />
                    </a>
                    {!readOnly && (
                      <SectionControls
                        onMoveUp={() => movePortfolio?.(link.id, "up")}
                        onMoveDown={() => movePortfolio?.(link.id, "down")}
                        onAdd={() => addPortfolio?.("GitHub", "")}
                        onDelete={() => removePortfolio?.(link.id)}
                        canMoveUp={index > 0}
                        canMoveDown={index < portfolio.length - 1}
                        canDelete={portfolio.length > 1}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Main column */}
        <main className="space-y-7">
          {/* Experience */}
          <section className="relative border-l pl-5" style={{ borderColor: "#e2e8f0" }}>
            <h2 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-800">
              <span className="-ml-[25px] h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
              Experience
            </h2>
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className="group/item relative mb-5 last:mb-0 pl-1">
                <span
                  className="absolute -left-[25px] top-1 h-2 w-2 rounded-full border-2 bg-white"
                  style={{ borderColor: accent }}
                />
                <h3 className="text-xs font-bold text-slate-900">
                  <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Role" />
                </h3>
                <p className="text-[11px] font-medium" style={{ color: accent }}>
                  <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                  <span className="text-slate-400 font-normal"> | </span>
                  <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                  <span className="text-slate-400 font-normal"> – </span>
                  <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                </p>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">
                  <EditableText value={exp.description} onChange={(val) => updateExperience?.(exp.id, "description", val)} multiline readOnly={readOnly} placeholder="• Bullet points describing impact..." />
                </p>
                {!readOnly && (
                  <SectionControls
                    className="absolute top-0 right-0"
                    onMoveUp={() => moveExperience?.(exp.id, "up")}
                    onMoveDown={() => moveExperience?.(exp.id, "down")}
                    onAdd={() => addExperience?.(index)}
                    onDelete={() => removeExperience?.(exp.id)}
                    canMoveUp={index > 0}
                    canMoveDown={index < experiences.length - 1}
                    canDelete={experiences.length > 1}
                  />
                )}
              </div>
            ))}
          </section>

          {/* Projects */}
          {projects.length > 0 && (
            <section className="relative border-l pl-5" style={{ borderColor: "#e2e8f0" }}>
              <h2 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-800">
                <span className="-ml-[25px] h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
                Projects
              </h2>
              {projects.map((proj, index) => (
                <div key={proj.id || index} className="group/item relative mb-4 last:mb-0 pl-1">
                  <span
                    className="absolute -left-[25px] top-1 h-2 w-2 rounded-full border-2 bg-white"
                    style={{ borderColor: accent }}
                  />
                  <h3 className="text-xs font-bold text-slate-900">
                    <EditableText value={proj.title} onChange={(val) => updateProject?.(proj.id, "title", val)} readOnly={readOnly} placeholder="Project Title" />
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    <EditableText value={proj.description} onChange={(val) => updateProject?.(proj.id, "description", val)} multiline readOnly={readOnly} placeholder="Project description..." />
                  </p>
                  {proj.link && (
                    <p className="text-[11px]">
                      GitHub:{" "}
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: accent }}>
                        <EditableText value={proj.link} onChange={(val) => updateProject?.(proj.id, "link", val)} readOnly={readOnly} placeholder="github.com/you/project" />
                      </a>
                    </p>
                  )}
                  {!readOnly && (
                    <SectionControls
                      className="absolute top-0 right-0"
                      onMoveUp={() => moveProject?.(proj.id, "up")}
                      onMoveDown={() => moveProject?.(proj.id, "down")}
                      onAdd={() => addProject?.(index)}
                      onDelete={() => removeProject?.(proj.id)}
                      canMoveUp={index > 0}
                      canMoveDown={index < projects.length - 1}
                      canDelete={projects.length > 1}
                    />
                  )}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </TemplateWrapper>
  );
});

export default Resume2;