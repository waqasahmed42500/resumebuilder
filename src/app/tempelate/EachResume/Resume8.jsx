"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";
import SocialIcon from "../../Component/SocialIcon";

const Resume8 = memo(function Resume8({ data: propData, theme, readOnly = false }) {
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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-white p-10 text-slate-900 min-h-[1123px]">
      {/* Recruiter-Friendly Traditional ATS Header */}
      <header className="mb-5 text-center border-b pb-3 border-slate-900">
        <h1 className="text-3xl font-bold tracking-tight uppercase">
          <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-700 uppercase tracking-wider">
          <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
        </p>
        <p className="mt-2 text-xs text-slate-600 flex justify-center gap-3 flex-wrap">
          <span><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></span>
          <span>•</span>
          <span><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></span>
          <span>•</span>
          <span><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></span>
        </p>

        {portfolio.length > 0 && (
          <p className="mt-1.5 text-xs text-slate-600 flex justify-center gap-3 flex-wrap">
            {portfolio.map((link, index) => (
              <span key={link.id || index} className="group/item relative inline-flex items-center gap-1">
                <SocialIcon platform={link.platform} url={link.url} className="text-xs text-slate-700" />
                <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="hover:underline">
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
                {index < portfolio.length - 1 ? " •" : ""}
              </span>
            ))}
          </p>
        )}
      </header>

      {/* Summary */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-1.5 pb-0.5">
          Summary
        </h2>
        <p className="text-xs leading-5 text-slate-800">
          <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
        </p>
      </section>

      {/* Experience */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-2.5 pb-0.5">
          Work Experience
        </h2>
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="group/item relative mb-4 last:mb-0">
            <div className="flex justify-between items-baseline font-bold text-xs">
              <span>
                <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Job Title" />
                <span className="font-normal italic"> at </span>
                <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
              </span>
              <span className="font-semibold text-slate-600 flex gap-1">
                <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                <span>-</span>
                <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-700">
              <EditableText value={exp.description} onChange={(val) => updateExperience?.(exp.id, "description", val)} multiline readOnly={readOnly} placeholder="Responsibilities..." />
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
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-2 pb-0.5">
            Key Projects
          </h2>
          {projects.map((proj, index) => (
            <div key={proj.id || index} className="group/item relative mb-3 last:mb-0">
              <div className="flex justify-between items-baseline text-xs">
                <p className="font-bold">
                  <EditableText value={proj.title} onChange={(val) => updateProject?.(proj.id, "title", val)} readOnly={readOnly} placeholder="Project Title" />
                  <span className="font-normal italic text-slate-600"> ({proj.tech})</span>
                </p>
                <p className="text-slate-600 flex gap-1">
                  <EditableText value={proj.startDate} onChange={(val) => updateProject?.(proj.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                  <span>-</span>
                  <EditableText value={proj.endDate} onChange={(val) => updateProject?.(proj.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                </p>
              </div>
              <p className="mt-0.5 text-xs leading-5 text-slate-700">
                <EditableText value={proj.description} onChange={(val) => updateProject?.(proj.id, "description", val)} multiline readOnly={readOnly} placeholder="Project scope..." />
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

      {/* Education & Certifications */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-2 pb-0.5">
          Education & Credentials
        </h2>
        {education.map((entry, index) => (
          <div key={entry.id || index} className="group/item relative mb-2 last:mb-0">
            <div className="flex justify-between items-baseline text-xs">
              <p className="font-bold">
                <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
                <span>, </span>
                <EditableText value={entry.school} onChange={(val) => updateEducation?.(entry.id, "school", val)} readOnly={readOnly} placeholder="School" />
              </p>
              <p className="text-slate-600">
                <EditableText value={entry.year} onChange={(val) => updateEducation?.(entry.id, "year", val)} readOnly={readOnly} placeholder="Year" />
              </p>
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

        {certifications.map((cert, index) => (
          <div key={cert.id || index} className="group/item relative mb-1.5 last:mb-0 text-xs">
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-slate-900">
                <EditableText value={cert.name} onChange={(val) => updateCertification?.(cert.id, "name", val)} readOnly={readOnly} placeholder="Certification" />
                <span className="font-normal text-slate-600"> ({cert.authority})</span>
              </p>
              <p className="text-slate-500">
                <EditableText value={cert.date} onChange={(val) => updateCertification?.(cert.id, "date", val)} readOnly={readOnly} placeholder="Year" />
              </p>
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

      {/* Skills & Languages */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-2 pb-0.5">
          Skills & Languages
        </h2>
        <div className="flex flex-wrap gap-2 text-xs mb-2">
          {skills.map((skill, index) => (
            <div key={index} className="group/item relative inline-flex items-center">
              <span>
                <EditableText value={skill} onChange={(val) => updateSkill?.(index, val)} readOnly={readOnly} placeholder="Skill" />
                {index < skills.length - 1 ? " •" : ""}
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
          <p className="text-xs text-slate-700">
            <span className="font-bold">Languages: </span>
            {languages.map((lang, index) => (
              <span key={lang.id || index} className="group/item relative inline-flex items-center">
                <EditableText value={lang.name} onChange={(val) => updateLanguage?.(lang.id, "name", val)} readOnly={readOnly} placeholder="Lang" />
                <span className="text-[10px] text-slate-500"> ({lang.proficiency})</span>
                {index < languages.length - 1 ? ", " : ""}
                {!readOnly && (
                  <SectionControls
                    onMoveUp={() => moveLanguage?.(lang.id, "left")}
                    onMoveDown={() => moveLanguage?.(lang.id, "right")}
                    onAdd={() => addLanguage?.(index)}
                    onDelete={() => removeLanguage?.(lang.id)}
                    canMoveUp={index > 0}
                    canMoveDown={index < languages.length - 1}
                    canDelete={languages.length > 1}
                  />
                )}
              </span>
            ))}
          </p>
        )}
      </section>
    </TemplateWrapper>
  );
});

export default Resume8;
