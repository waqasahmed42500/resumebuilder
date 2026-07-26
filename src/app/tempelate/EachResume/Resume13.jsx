"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import EditableImage from "../../Component/EditableImage";
import SectionControls from "../../Component/SectionControls";

const Resume13 = memo(function Resume13({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#d97706";

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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="flex">
      {/* Prism Color Block Sidebar */}
      <aside className="w-[260px] shrink-0 p-8 text-slate-900 flex flex-col justify-between" style={{ backgroundColor: accent }}>
        <div>
          <div className="mb-6 flex justify-center">
            <EditableImage
              src={contact.photo}
              onChange={(val) => updateContact?.("photo", val)}
              onRemove={() => updateContact?.("photo", "")}
              name={contact.fullName}
              accentColor="#ffffff"
              readOnly={readOnly}
              className="h-28 w-28 rounded-full border-4 border-slate-900"
            />
          </div>

          <div className="mb-6 border-b border-slate-900/20 pb-4">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 mb-2">Contact</h3>
            <div className="space-y-1.5 text-xs font-medium leading-5">
              <p><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></p>
              <p><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></p>
              <p><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></p>
              <p><EditableText value={contact.website} onChange={(val) => updateContact?.("website", val)} readOnly={readOnly} placeholder="Website" /></p>
            </div>
          </div>

          <div className="mb-6 border-b border-slate-900/20 pb-4">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 mb-2">Creative Focus</h3>
            <div className="space-y-1">
              {skills.map((skill, index) => (
                <div key={index} className="group/item relative flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-950">
                    <EditableText value={skill} onChange={(val) => updateSkill?.(index, val)} readOnly={readOnly} placeholder="Skill" />
                  </p>
                  {!readOnly && (
                    <SectionControls
                      onMoveUp={() => moveSkill?.(index, "up")}
                      onMoveDown={() => moveSkill?.(index, "down")}
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
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 mb-2">Education</h3>
            {education.map((entry, index) => (
              <div key={entry.id || index} className="group/item relative mb-3 last:mb-0">
                <p className="text-xs font-bold text-slate-950">
                  <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
                </p>
                <p className="text-[11px] font-medium opacity-80">
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
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-slate-50">
        <header className="mb-8 border-b-2 border-slate-900 pb-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: accent }}>
            <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
          </p>
          <h1 className="mt-2 text-5xl font-black tracking-tight text-slate-950">
            <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
          </h1>
        </header>

        <section className="mb-8">
          <h2 className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900">
            Artist Statement & Bio
          </h2>
          <p className="text-xs leading-6 text-slate-700">
            <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900">
            Selected Work Experience
          </h2>
          {experiences.map((exp, index) => (
            <div key={exp.id || index} className="group/item relative mb-6 border-l-2 border-slate-900 pl-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-xs font-bold text-slate-950">
                    <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Role" />
                  </h3>
                  <p className="text-[11px] font-bold" style={{ color: accent }}>
                    <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                  </p>
                </div>
                <p className="text-[10px] font-semibold text-slate-500 flex gap-1">
                  <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                  <span>-</span>
                  <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                </p>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-700">
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
      </main>
    </TemplateWrapper>
  );
});

export default Resume13;
