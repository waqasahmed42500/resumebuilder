"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import EditableImage from "../../Component/EditableImage";
import SectionControls from "../../Component/SectionControls";

const Resume3 = memo(function Resume3({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#7c3aed";

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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="min-h-[1123px] bg-slate-950 text-slate-100 flex flex-col">
      <header className="px-10 py-10 border-b border-slate-800 flex justify-between items-center" style={{ borderTop: `4px solid ${accent}` }}>
        <div className="flex items-center gap-6">
          <EditableImage
            src={contact.photo}
            onChange={(val) => updateContact?.("photo", val)}
            onRemove={() => updateContact?.("photo", "")}
            name={contact.fullName}
            accentColor={accent}
            readOnly={readOnly}
            className="h-20 w-20 rounded-xl"
          />
          <div>
            <h1 className="text-3xl font-black tracking-tight text-black">
              <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
            </h1>
            <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>
              <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
            </p>
          </div>
        </div>
        <div className="text-right text-xs leading-5 text-slate-600 space-y-0.5">
          <p><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></p>
          <p><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></p>
          <p><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></p>
          <p><EditableText value={contact.website} onChange={(val) => updateContact?.("website", val)} readOnly={readOnly} placeholder="Website" /></p>
        </div>
      </header>

      <div className="grid grid-cols-[1.6fr_0.9fr] gap-10 px-10 py-10 flex-1">
        <main>
          <section className="mb-8">
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              Executive Summary
            </h2>
            <p className="text-sm leading-6 text-slate-700">
              <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              Professional Experience
            </h2>
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className="group/item relative mb-6 border-l border-slate-800 pl-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-sm font-bold text-black">
                      <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Job Title" />
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-800">
                      <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-800 flex gap-1">
                    <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                    <span>-</span>
                    <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                  </p>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-400">
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
        </main>

        <aside className="border-l border-slate-800 pl-8">
          <section className="mb-8">
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              Skills & Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="group/item relative inline-flex items-center">
                  <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-[10px] font-medium text-slate-200">
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

          <section>
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              Education
            </h2>
            {education.map((entry, index) => (
              <div key={entry.id || index} className="group/item relative mb-4 last:mb-0">
                <p className="text-xs font-bold text-black">
                  <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
                </p>
                <p className="mt-1 text-xs text-slate-600">
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
        </aside>
      </div>
    </TemplateWrapper>
  );
});

export default Resume3;
