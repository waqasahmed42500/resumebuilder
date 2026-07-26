"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";

const Resume18 = memo(function Resume18({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;

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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-white p-12 text-black">
      {/* Mono Black Box Header */}
      <header className="bg-black text-white p-8 mb-8">
        <h1 className="text-4xl font-mono font-bold tracking-tight">
          <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
        </h1>
        <p className="mt-1 text-xs font-mono uppercase tracking-[0.3em] text-slate-300">
          <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400 border-t border-slate-800 pt-3">
          <span><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></span>
          <span>/</span>
          <span><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></span>
          <span>/</span>
          <span><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] mb-2 border-b border-black pb-1">
          // SUMMARY
        </h2>
        <p className="text-xs leading-5 text-slate-800 font-mono">
          <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
        </p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] mb-4 border-b border-black pb-1">
          // EXPERIENCE
        </h2>
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="group/item relative mb-5 last:mb-0">
            <div className="flex justify-between items-baseline font-mono text-xs">
              <h3 className="font-bold text-black">
                <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Role" />
                <span className="font-normal text-slate-500"> @ </span>
                <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
              </h3>
              <p className="text-[10px] text-slate-500 flex gap-1">
                <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                <span>-</span>
                <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
              </p>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-slate-700">
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
      </section>

      {/* Skills & Education */}
      <div className="grid grid-cols-2 gap-8 border-t border-black pt-6">
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] mb-2 border-b border-black pb-1">
            // EDUCATION
          </h2>
          {education.map((entry, index) => (
            <div key={entry.id || index} className="group/item relative mb-3 last:mb-0 font-mono text-xs">
              <p className="font-bold text-black">
                <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
              </p>
              <p className="mt-0.5 text-[11px] text-slate-600">
                <EditableText value={entry.school} onChange={(val) => updateEducation?.(entry.id, "school", val)} readOnly={readOnly} placeholder="School" />
                <span> / </span>
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

        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] mb-2 border-b border-black pb-1">
            // SKILLS
          </h2>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {skills.map((skill, index) => (
              <div key={index} className="group/item relative inline-flex items-center">
                <span className="bg-black text-white px-2 py-0.5 text-[10px]">
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
      </div>
    </TemplateWrapper>
  );
});

export default Resume18;
