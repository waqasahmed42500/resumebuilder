"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";

const Resume8 = memo(function Resume8({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#0f172a";

  const contact = data?.contact || {};
  const skills = data?.skills || [];
  const experiences = data?.experiences || [];
  const education = data?.education || [];

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
  } = context || {};

  return (
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-white p-12 text-slate-900">
      {/* Recruiter-Friendly Traditional ATS Header */}
      <header className="mb-6 text-center border-b pb-4 border-slate-900">
        <h1 className="text-3xl font-bold tracking-tight uppercase">
          <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-700 uppercase tracking-wider">
          <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
        </p>
        <p className="mt-2 text-xs text-slate-600 flex justify-center gap-3">
          <span><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></span>
          <span>•</span>
          <span><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></span>
          <span>•</span>
          <span><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></span>
          <span>•</span>
          <span><EditableText value={contact.website} onChange={(val) => updateContact?.("website", val)} readOnly={readOnly} placeholder="Website" /></span>
        </p>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-2 pb-0.5">
          Summary
        </h2>
        <p className="text-xs leading-5 text-slate-800">
          <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
        </p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-3 pb-0.5">
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
            <p className="mt-1.5 text-xs leading-5 text-slate-700">
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

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-2 pb-0.5">
          Education
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
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-900 mb-2 pb-0.5">
          Technical & Core Skills
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
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
      </section>
    </TemplateWrapper>
  );
});

export default Resume8;
