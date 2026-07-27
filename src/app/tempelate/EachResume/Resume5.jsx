"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";
import SocialIcon from "../../Component/SocialIcon";

const Resume5 = memo(function Resume5({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#0284c7";

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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-slate-50 p-8 min-h-[1123px]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <header className="flex justify-between items-start border-b border-slate-200 pb-6">
          <div>
            <div className="mb-3 h-2 w-16 rounded-full" style={{ backgroundColor: accent }} />
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
            </h1>
            <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>
              <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
            </p>
          </div>
          <div className="text-right text-xs leading-5 text-slate-500 space-y-0.5">
            <p><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></p>
            <p><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></p>
            <p><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></p>
          </div>
        </header>

        {/* Social Links */}
        {portfolio.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-600 border-b border-slate-100 pb-3">
            {portfolio.map((link, index) => (
              <div key={link.id || index} className="group/item relative inline-flex items-center gap-1.5">
                <SocialIcon platform={link.platform} url={link.url} className="text-xs text-slate-700" />
                <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
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

        <div className="mt-6 grid grid-cols-[1.5fr_0.9fr] gap-8">
          <main>
            {/* Summary */}
            <section className="mb-6">
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                Profile Summary
              </h2>
              <div className="text-xs leading-6 text-slate-700">
                <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
              </div>
            </section>

            {/* Experience */}
            <section className="mb-6">
              <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                Experience
              </h2>
              {experiences.map((exp, index) => (
                <div key={exp.id || index} className="group/item relative mb-5 last:mb-0">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Role" />
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-500">
                        <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                      </p>
                    </div>
                    <div className="text-[10px] text-slate-400 flex gap-1">
                      <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                      <span>-</span>
                      <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                    </div>
                  </div>
                  <div className="mt-1.5 text-xs leading-5 text-slate-600">
                    <EditableText value={exp.description} onChange={(val) => updateExperience?.(exp.id, "description", val)} multiline readOnly={readOnly} placeholder="Responsibilities..." />
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
            </section>

            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-6">
                <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                  Projects
                </h2>
                {projects.map((proj, index) => (
                  <div key={proj.id || index} className="group/item relative mb-4 last:mb-0">
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
              </section>
            )}

            {/* Awards */}
            {awards.length > 0 && (
              <section>
                <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                  Honors & Awards
                </h2>
                {awards.map((award, index) => (
                  <div key={award.id || index} className="group/item relative mb-3 last:mb-0 text-xs">
                    <div className="flex justify-between items-baseline">
                      <div className="font-bold text-slate-900">
                        <EditableText value={award.title} onChange={(val) => updateAward?.(award.id, "title", val)} readOnly={readOnly} placeholder="Award Title" />
                        <span className="text-slate-500 font-normal"> — </span>
                        <EditableText value={award.issuer} onChange={(val) => updateAward?.(award.id, "issuer", val)} readOnly={readOnly} placeholder="Issuer" />
                      </div>
                      <div className="text-[10px] text-slate-400">
                        <EditableText value={award.year} onChange={(val) => updateAward?.(award.id, "year", val)} readOnly={readOnly} placeholder="Year" />
                      </div>
                    </div>
                    <div className="mt-0.5 text-xs text-slate-600">
                      <EditableText value={award.description} onChange={(val) => updateAward?.(award.id, "description", val)} multiline readOnly={readOnly} placeholder="Description..." />
                    </div>
                    {!readOnly && (
                      <SectionControls
                        className="absolute top-0 right-0"
                        onMoveUp={() => moveAward?.(award.id, "up")}
                        onMoveDown={() => moveAward?.(award.id, "down")}
                        onAdd={() => addAward?.(index)}
                        onDelete={() => removeAward?.(award.id)}
                        canMoveUp={index > 0}
                        canMoveDown={index < awards.length - 1}
                        canDelete={awards.length > 1}
                      />
                    )}
                  </div>
                ))}
              </section>
            )}
          </main>

          <aside className="border-l border-slate-100 pl-6 space-y-6">
            {/* Core Skills */}
            <section>
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                Core Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <div key={index} className="group/item relative inline-flex items-center">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-800">
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

            {/* Tools (Added) */}
            {tools.length > 0 && (
              <section>
                <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                  Tools
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {tools.map((tool, index) => (
                    <div key={tool.id || index} className="group/item relative flex flex-col items-center gap-1">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 overflow-hidden p-1">
                        {tool.image ? (
                          <img src={tool.image} alt={tool.name} className="h-full w-full object-contain" />
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300 uppercase">{tool.name?.charAt(0)}</span>
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

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                  Languages
                </h2>
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
              </section>
            )}

            {/* Education */}
            <section>
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                Education
              </h2>
              {education.map((entry, index) => (
                <div key={entry.id || index} className="group/item relative mb-3 last:mb-0">
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
                <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                  Certifications
                </h2>
                {certifications.map((cert, index) => (
                  <div key={cert.id || index} className="group/item relative mb-2 last:mb-0 text-xs">
                    <div className="font-bold text-slate-900">
                      <EditableText value={cert.name} onChange={(val) => updateCertification?.(cert.id, "name", val)} readOnly={readOnly} placeholder="Cert Title" />
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
          </aside>
        </div>
      </div>
    </TemplateWrapper>
  );
});

export default Resume5;
