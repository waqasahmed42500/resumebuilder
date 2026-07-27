"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";
import SocialIcon from "../../Component/SocialIcon";

const Resume4 = memo(function Resume4({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#dc2626";

  const contact = data?.contact || {};
  const skills = data?.skills || [];
  const tools = data?.tools || [];
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
    updateTool,
    addTool,
    removeTool,
    moveTool,
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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-white p-10 min-h-[1123px]">
      {/* Header */}
      <header className="mb-6 border-b-2 pb-5 flex justify-between items-end" style={{ borderColor: accent }}>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
          </h1>
          <div className="mt-1 text-xs font-semibold" style={{ color: accent }}>
            <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
          </div>
        </div>
        <div className="text-right text-xs leading-5 text-slate-500 space-y-0.5">
          <p><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></p>
          <p><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></p>
          <p><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></p>
        </div>
      </header>

      {/* Social Links Banner */}
      {portfolio.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-4 text-xs font-medium text-slate-600 bg-slate-50 p-2.5 rounded-lg">
          {portfolio.map((link, index) => (
            <div key={link.id || index} className="group/item relative inline-flex items-center gap-1.5">
              <SocialIcon platform={link.platform} url={link.url} className="text-sm text-slate-700" />
              <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                <EditableText value={link.platform} onChange={(val) => updatePortfolio?.(link.id, "platform", val)} readOnly={readOnly} placeholder="Platform" />
              </a>
              {!readOnly && (
                <SectionControls
                  onMoveUp={() => movePortfolio?.(link.id, "left")}
                  onMoveDown={() => movePortfolio?.(link.id, "right")}
                  onAdd={() => addPortfolio?.("GitHub", "")}
                  onDelete={() => removePortfolio?.(link.id)}
                  canMoveUp={index > 0}
                  canMoveDown={index < portfolio.length - 1}
                  canDelete={portfolio.length > 1}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Profile */}
      <section className="mb-6 rounded-xl bg-slate-50 p-3.5 border-l-4" style={{ borderColor: accent }}>
        <div className="text-xs leading-5 text-slate-700">
          <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Professional summary..." />
        </div>
      </section>

      {/* Timeline Experience */}
      <section className="mb-6">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
          Career Timeline
        </h2>
        <div className="relative border-l-2 pl-5 space-y-5" style={{ borderColor: accent }}>
          {experiences.map((exp, index) => (
            <div key={exp.id || index} className="group/item relative">
              <div className="absolute -left-[27px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white" style={{ borderColor: accent }} />
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Role" />
                  </h3>
                  <div className="text-[11px] font-semibold" style={{ color: accent }}>
                    <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                  </div>
                </div>
                <div className="text-[10px] font-semibold uppercase text-slate-500 flex gap-1">
                  <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                  <span>-</span>
                  <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                </div>
              </div>
              <div className="mt-1.5 text-xs leading-5 text-slate-600">
                <EditableText value={exp.description} onChange={(val) => updateExperience?.(exp.id, "description", val)} multiline readOnly={readOnly} placeholder="Description..." />
              </div>
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
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
            Featured Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, index) => (
              <div key={proj.id || index} className="group/item relative border-l-2 pl-3" style={{ borderColor: accent }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">
                    <EditableText value={proj.title} onChange={(val) => updateProject?.(proj.id, "title", val)} readOnly={readOnly} placeholder="Project Title" />
                    <span className="text-[10px] font-normal text-slate-500 ml-1">
                      (<EditableText value={proj.tech} onChange={(val) => updateProject?.(proj.id, "tech", val)} readOnly={readOnly} placeholder="Tech Stack" />)
                    </span>
                  </h3>
                  <div className="text-[10px] text-slate-400 flex gap-1">
                    <EditableText value={proj.startDate} onChange={(val) => updateProject?.(proj.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                    <span>-</span>
                    <EditableText value={proj.endDate} onChange={(val) => updateProject?.(proj.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                  </div>
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-600">
                  <EditableText value={proj.description} onChange={(val) => updateProject?.(proj.id, "description", val)} multiline readOnly={readOnly} placeholder="Details..." />
                </div>
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
          </div>
        </section>
      )}

      {/* Grid for Skills, Education, Certifications, Languages */}
      <div className="grid grid-cols-2 gap-6 border-t border-slate-200 pt-5">
        <section>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <div key={index} className="group/item relative inline-flex items-center">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-800">
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

        {/* Tools Section (Added) */}
        {tools.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Tools</h2>
            <div className="grid grid-cols-4 gap-3">
              {tools.map((tool, index) => (
                <div key={tool.id || index} className="group/item relative flex flex-col items-center gap-1">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 overflow-hidden p-1">
                    {tool.image ? (
                      <img src={tool.image} alt={tool.name} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{tool.name?.charAt(0)}</span>
                    )}
                  </div>
                  <p className="text-[8px] text-slate-500 text-center truncate w-full">
                    <EditableText value={tool.name} onChange={(val) => updateTool?.(tool.id, "name", val)} readOnly={readOnly} placeholder="Tool" />
                  </p>
                  {!readOnly && (
                    <SectionControls
                      className="absolute -top-8 left-1/2 -translate-x-1/2"
                      onMoveUp={() => moveTool?.(tool.id, "up")}
                      onMoveDown={() => moveTool?.(tool.id, "down")}
                      onAdd={() => addTool?.()}
                      onDelete={() => removeTool?.(tool.id)}
                      canMoveUp={index > 0}
                      canMoveDown={index < tools.length - 1}
                      canDelete={tools.length > 1}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Education</h2>
          {education.map((entry, index) => (
            <div key={entry.id || index} className="group/item relative mb-2 last:mb-0">
              <div className="text-xs font-bold text-slate-900">
                <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                <EditableText value={entry.school} onChange={(val) => updateEducation?.(entry.id, "school", val)} readOnly={readOnly} placeholder="School" />
                <span> · </span>
                <EditableText value={entry.year} onChange={(val) => updateEducation?.(entry.id, "year", val)} readOnly={readOnly} placeholder="Year" />
              </div>
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Certifications</h2>
            {certifications.map((cert, index) => (
              <div key={cert.id || index} className="group/item relative mb-1.5 last:mb-0 text-xs">
                <div className="font-bold text-slate-900">
                  <EditableText value={cert.name} onChange={(val) => updateCertification?.(cert.id, "name", val)} readOnly={readOnly} placeholder="Cert" />
                </div>
                <div className="text-[10px] text-slate-500">
                  <EditableText value={cert.authority} onChange={(val) => updateCertification?.(cert.id, "authority", val)} readOnly={readOnly} placeholder="Issuer" />
                  <span> · </span>
                  <EditableText value={cert.date} onChange={(val) => updateCertification?.(cert.id, "date", val)} readOnly={readOnly} placeholder="Year" />
                </div>
                {!readOnly && (
                  <SectionControls
                    className="absolute top-0 right-0"
                    onMoveUp={() => moveCertification?.(cert.id, "up")}
                    onMoveDown={() => moveCertification?.(cert.id, "down")}
                    onAdd={() => addCertification?.(index)}
                    onDelete={() => removeCertification?.(cert.id)}
                    canMoveUp={index > 0}
                    canMoveDown={index < certifications.length - 1}
                    canDelete={certifications.length > 1}
                  />
                )}
              </div>
            ))}
          </section>
        )}

        {/* Languages & Awards */}
        {(languages.length > 0 || awards.length > 0) && (
          <section>
            {languages.length > 0 && (
              <div className="mb-3">
                <h2 className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Languages</h2>
                <div className="space-y-1 text-xs">
                  {languages.map((lang, index) => (
                    <div key={lang.id || index} className="group/item relative flex items-center justify-between">
                      <div className="text-slate-800 font-medium">
                        <EditableText value={lang.name} onChange={(val) => updateLanguage?.(lang.id, "name", val)} readOnly={readOnly} placeholder="Language" />
                        <span className="text-[10px] text-slate-400 ml-1">
                          (<EditableText value={lang.proficiency} onChange={(val) => updateLanguage?.(lang.id, "proficiency", val)} readOnly={readOnly} placeholder="Level" />)
                        </span>
                      </div>
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
      </div>
    </TemplateWrapper>
  );
});

export default Resume4;
