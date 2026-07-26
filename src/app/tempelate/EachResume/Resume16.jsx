"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";

const Resume16 = memo(function Resume16({ data: propData, theme, readOnly = false }) {
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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-white p-14 text-slate-900">
      {/* Pure Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-light tracking-tight text-slate-950">
          <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] font-semibold text-slate-600" style={{ color: accent }}>
          <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
        </p>
        <p className="mt-3 text-xs text-slate-600 space-x-3">
          <span><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></span>
          <span>·</span>
          <span><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></span>
          <span>·</span>
          <span><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></span>
          <span>·</span>
          <span><EditableText value={contact.website} onChange={(val) => updateContact?.("website", val)} readOnly={readOnly} placeholder="Website" /></span>
        </p>
      </header>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
          Profile Summary
        </h2>
        <p className="text-xs leading-6 text-slate-600 max-w-2xl font-light">
          <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
        </p>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h2 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
          Experience
        </h2>
        {experiences.map((exp, index) => (
          <div key={exp.id || index} className="group/item relative mb-6 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xs font-bold text-slate-900">
                <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Role" />
                <span className="font-normal text-slate-600">, </span>
                <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
              </h3>
              <p className="text-[10px] font-normal text-slate-600 flex gap-1">
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
      </section>

      {/* Education & Skills */}
      <div className="grid grid-cols-2 gap-10">
        <section>
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
            Education
          </h2>
          {education.map((entry, index) => (
            <div key={entry.id || index} className="group/item relative mb-3 last:mb-0 text-xs">
              <p className="font-bold text-slate-900">
                <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
              </p>
              <p className="mt-0.5 text-slate-600 text-[11px]">
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

        <section>
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
            {skills.map((skill, index) => (
              <div key={index} className="group/item relative inline-flex items-center">
                <span>
                  <EditableText value={skill} onChange={(val) => updateSkill?.(index, val)} readOnly={readOnly} placeholder="Skill" />
                  {index < skills.length - 1 ? " / " : ""}
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

export default Resume16;
