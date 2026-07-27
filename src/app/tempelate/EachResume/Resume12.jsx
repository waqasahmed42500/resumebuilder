"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";
import SocialIcon from "../../Component/SocialIcon";

const Resume12 = memo(function Resume12({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#7c3aed";

  const contact = data?.contact || {};
  const skills = data?.skills || [];
  const experiences = data?.experiences || [];
  const education = data?.education || [];
  const certifications = data?.certifications || [];
  const languages = data?.languages || [];
  const awards = data?.awards || [];
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
    updateAward,
    addAward,
    removeAward,
    moveAward,
    updateProject,
    addProject,
    removeProject,
    moveProject,
    updatePortfolio,
    addPortfolio,
    removePortfolio,
    movePortfolio,
  } = context || {};

  return (
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-slate-100 p-6 min-h-[1123px]">
      {/* Top Banner Box */}
      <header className="mb-4 rounded-2xl p-6 text-white flex justify-between items-center shadow-md" style={{ backgroundColor: accent }}>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] opacity-80">
            <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
          </span>
          <h1 className="mt-1 text-3xl font-black tracking-tight">
            <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
          </h1>
        </div>
        <div className="text-right text-xs leading-5 opacity-90 space-y-0.5">
          <p><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></p>
          <p><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></p>
          <p><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></p>
        </div>
      </header>

      {/* Grid of Cards */}
      <div className="grid grid-cols-12 gap-4">
        {/* Bio Card */}
        <section className="col-span-12 rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
          <h2 className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            Creative Direction & Profile
          </h2>
          <p className="text-xs leading-5 text-slate-700">
            <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
          </p>
        </section>

        {/* Experience Cards */}
        <section className="col-span-8 rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
          <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            Experience Track
          </h2>
          {experiences.map((exp, index) => (
            <div key={exp.id || index} className="group/item relative mb-4 last:mb-0 border-l-2 pl-3" style={{ borderColor: accent }}>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Role" />
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500">
                    <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                  </p>
                </div>
                <p className="text-[10px] font-medium text-slate-400 flex gap-1">
                  <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                  <span>-</span>
                  <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                </p>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-slate-600">
                <EditableText value={exp.description} onChange={(val) => updateExperience?.(exp.id, "description", val)} multiline readOnly={readOnly} placeholder="Description..." />
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

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <h2 className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                Featured Projects
              </h2>
              {projects.map((proj, index) => (
                <div key={proj.id || index} className="group/item relative mb-3 last:mb-0 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-slate-900">
                      <EditableText value={proj.title} onChange={(val) => updateProject?.(proj.id, "title", val)} readOnly={readOnly} placeholder="Project" />
                      <span className="text-[10px] font-normal text-slate-500 ml-1">({proj.tech})</span>
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      <EditableText value={proj.startDate} onChange={(val) => updateProject?.(proj.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                    </p>
                  </div>
                  <p className="mt-1 text-xs leading-4 text-slate-600">
                    <EditableText value={proj.description} onChange={(val) => updateProject?.(proj.id, "description", val)} multiline readOnly={readOnly} placeholder="Details..." />
                  </p>
                  {!readOnly && (
                    <SectionControls
                      className="absolute top-1 right-1"
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
            </div>
          )}
        </section>

        {/* Sidebar Cards */}
        <aside className="col-span-4 space-y-4">
          {/* Social Links Card */}
          {portfolio.length > 0 && (
            <section className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                Links & Portfolios
              </h2>
              <div className="space-y-1.5 text-xs">
                {portfolio.map((link, index) => (
                  <div key={link.id || index} className="group/item relative flex items-center justify-between">
                    <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-700 hover:text-purple-600 transition">
                      <SocialIcon platform={link.platform} url={link.url} className="text-xs" />
                      <EditableText value={link.platform} onChange={(val) => updatePortfolio?.(link.id, "platform", val)} readOnly={readOnly} placeholder="Platform" />
                    </a>
                    {!readOnly && (
                      <SectionControls
                        onMoveUp={() => movePortfolio?.(link.id, "up")}
                        onMoveDown={() => movePortfolio?.(link.id, "down")}
                        onAdd={() => addPortfolio?.("Dribbble", "")}
                        onDelete={() => removePortfolio?.(link.id)}
                        canMoveUp={index > 0}
                        canMoveDown={index < portfolio.length - 1}
                        canDelete={portfolio.length > 1}
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Toolkit / Skills */}
          <section className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              Toolkit
            </h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <div key={index} className="group/item relative inline-flex items-center">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-800">
                    <EditableText value={skill} onChange={(val) => updateSkill?.(index, val)} readOnly={readOnly} placeholder="Skill" />
                  </span>
                  {!readOnly && (
                    <SectionControls
                      className="absolute -top-7 right-0"
                      onMoveUp={() => moveSkill?.(index, "left")}
                      onMoveDown={() => moveSkill?.(index, "right")}
                      onAdd={() => addSkill?.("New Skill")}
                      onDelete={() => removeSkill?.(index)}
                      canMoveUp={index > 0}
                      canMoveDown={index < skills.length - 1}
                      canDelete={skills.length > 1}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education Card */}
          <section className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              Education
            </h2>
            {education.map((entry, index) => (
              <div key={entry.id || index} className="group/item relative mb-2 last:mb-0 text-xs">
                <p className="font-bold text-slate-900">
                  <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  <EditableText value={entry.school} onChange={(val) => updateEducation?.(entry.id, "school", val)} readOnly={readOnly} placeholder="School" />
                  <span> · </span>
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

          {/* Languages & Certifications Card */}
          {(languages.length > 0 || certifications.length > 0) && (
            <section className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              {languages.length > 0 && (
                <div className="mb-3">
                  <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                    Languages
                  </h2>
                  <div className="space-y-1 text-xs text-slate-700">
                    {languages.map((lang, index) => (
                      <div key={lang.id || index} className="group/item relative flex items-center justify-between">
                        <p className="font-medium">
                          <EditableText value={lang.name} onChange={(val) => updateLanguage?.(lang.id, "name", val)} readOnly={readOnly} placeholder="Language" />
                          <span className="font-normal text-slate-400 ml-1">({lang.proficiency})</span>
                        </p>
                        {!readOnly && (
                          <SectionControls
                            onMoveUp={() => moveLanguage?.(lang.id, "up")}
                            onMoveDown={() => moveLanguage?.(lang.id, "down")}
                            onAdd={() => addLanguage?.(index)}
                            onDelete={() => removeLanguage?.(lang.id)}
                            canMoveUp={index > 0}
                            canMoveDown={index < languages.length - 1}
                            canDelete={languages.length > 1}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </aside>
      </div>
    </TemplateWrapper>
  );
});

export default Resume12;
