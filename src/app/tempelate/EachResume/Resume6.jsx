"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";
import SocialIcon from "../../Component/SocialIcon";

const Resume6 = memo(function Resume6({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#0f172a";

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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-white p-10 min-h-[1123px]">
      {/* Corporate Double Divider Header */}
      <header className="mb-6 border-b-2 border-t-4 py-5 text-center" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-900">
          <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
        </h1>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
          <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Professional Headline" />
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs text-slate-600">
          <span><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></span>
          <span>•</span>
          <span><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></span>
          <span>•</span>
          <span><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></span>
        </div>

        {/* Social Links Bar */}
        {portfolio.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-600 border-t border-slate-200 pt-2.5">
            {portfolio.map((link, index) => (
              <div key={link.id || index} className="group/item relative inline-flex items-center gap-1">
                <SocialIcon platform={link.platform} url={link.url} className="text-xs" />
                <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition">
                  <EditableText value={link.platform} onChange={(val) => updatePortfolio?.(link.id, "platform", val)} readOnly={readOnly} placeholder="Platform" />
                </a>
                {!readOnly && (
                  <SectionControls
                    onMoveUp={() => movePortfolio?.(link.id, "left")}
                    onMoveDown={() => movePortfolio?.(link.id, "right")}
                    onAdd={() => addPortfolio?.("LinkedIn", "")}
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
      </header>

      {/* Executive Summary */}
      <section className="mb-6">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-300 pb-1">
          Executive Summary
        </h2>
        <p className="text-xs leading-5 text-slate-700">
          <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Executive summary..." />
        </p>
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-300 pb-1">
          Professional Experience
        </h2>
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="group/item relative mb-5 last:mb-0">
            <div className="flex justify-between items-baseline">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Job Title" />
                </h3>
                <p className="text-[11px] font-semibold text-slate-700 italic">
                  <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                </p>
              </div>
              <p className="text-[11px] font-medium text-slate-500 flex gap-1">
                <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                <span>-</span>
                <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
              </p>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-slate-700">
              <EditableText value={exp.description} onChange={(val) => updateExperience?.(exp.id, "description", val)} multiline readOnly={readOnly} placeholder="Key achievements and responsibilities..." />
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

      {/* Strategic Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-300 pb-1">
            Key Projects & Initiatives
          </h2>
          {projects.map((proj, index) => (
            <div key={proj.id || index} className="group/item relative mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-slate-900">
                  <EditableText value={proj.title} onChange={(val) => updateProject?.(proj.id, "title", val)} readOnly={readOnly} placeholder="Project Title" />
                  <span className="text-[11px] font-normal text-slate-600 italic ml-1">
                    (<EditableText value={proj.tech} onChange={(val) => updateProject?.(proj.id, "tech", val)} readOnly={readOnly} placeholder="Tech Stack" />)
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 flex gap-1">
                  <EditableText value={proj.startDate} onChange={(val) => updateProject?.(proj.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                  <span>-</span>
                  <EditableText value={proj.endDate} onChange={(val) => updateProject?.(proj.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                </p>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-700">
                <EditableText value={proj.description} onChange={(val) => updateProject?.(proj.id, "description", val)} multiline readOnly={readOnly} placeholder="Impact..." />
              </p>
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

      {/* Grid for Education, Certifications, Skills, Awards, Languages */}
      <div className="grid grid-cols-2 gap-6 border-t border-slate-300 pt-5">
        <section>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-300 pb-1">
            Education
          </h2>
          {education.map((entry, index) => (
            <div key={entry.id || index} className="group/item relative mb-2 last:mb-0 text-xs">
              <p className="font-bold text-slate-900">
                <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
              </p>
              <p className="text-slate-600 text-[11px]">
                <EditableText value={entry.school} onChange={(val) => updateEducation?.(entry.id, "school", val)} readOnly={readOnly} placeholder="School" />
                <span>, </span>
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

          {certifications.length > 0 && (
            <div className="mt-4">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-300 pb-1">
                Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={cert.id || index} className="group/item relative mb-2 last:mb-0 text-xs">
                  <p className="font-bold text-slate-900">
                    <EditableText value={cert.name} onChange={(val) => updateCertification?.(cert.id, "name", val)} readOnly={readOnly} placeholder="Cert" />
                  </p>
                  <p className="text-[11px] text-slate-600">
                    <EditableText value={cert.authority} onChange={(val) => updateCertification?.(cert.id, "authority", val)} readOnly={readOnly} placeholder="Issuer" />
                    <span> · </span>
                    <EditableText value={cert.date} onChange={(val) => updateCertification?.(cert.id, "date", val)} readOnly={readOnly} placeholder="Year" />
                  </p>
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
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-300 pb-1">
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.map((skill, index) => (
              <div key={index} className="group/item relative inline-flex items-center">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-800">
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

          {languages.length > 0 && (
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-300 pb-1">
                Languages
              </h2>
              <div className="space-y-1 text-xs text-slate-700">
                {languages.map((lang, index) => (
                  <div key={lang.id || index} className="group/item relative flex items-center justify-between">
                    <p className="font-semibold">
                      <EditableText value={lang.name} onChange={(val) => updateLanguage?.(lang.id, "name", val)} readOnly={readOnly} placeholder="Language" />
                      <span className="font-normal text-slate-500 ml-1">
                        — <EditableText value={lang.proficiency} onChange={(val) => updateLanguage?.(lang.id, "proficiency", val)} readOnly={readOnly} placeholder="Level" />
                      </span>
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
      </div>
    </TemplateWrapper>
  );
});

export default Resume6;
