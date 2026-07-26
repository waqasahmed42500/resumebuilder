"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import EditableImage from "../../Component/EditableImage";
import SectionControls from "../../Component/SectionControls";
import ResumeAdditionalSections from "../../Component/ResumeAdditionalSections";

const Resume1 = memo(function Resume1({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#0f766e";

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
      {/* Sidebar */}
      <aside className="w-[248px] shrink-0 bg-slate-900 px-6 py-10 text-slate-200 flex flex-col justify-between">
        <div>
          <div className="mb-6 flex justify-center">
            <EditableImage
              src={contact.photo}
              onChange={(val) => updateContact?.("photo", val)}
              onRemove={() => updateContact?.("photo", "")}
              name={contact.fullName}
              accentColor={accent}
              readOnly={readOnly}
            />
          </div>

          <div className="mb-8 border-l-2 pl-3" style={{ borderColor: accent }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              Profile
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              <EditableText
                value={data?.summary}
                onChange={(val) => updateSummary?.(val)}
                multiline
                readOnly={readOnly}
                placeholder="Professional summary..."
              />
            </p>
          </div>

          <div className="mb-8">
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Contact</h3>
            <div className="space-y-2 text-xs leading-5 text-slate-300">
              <p><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></p>
              <p><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></p>
              <p><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></p>
              <p><EditableText value={contact.website} onChange={(val) => updateContact?.("website", val)} readOnly={readOnly} placeholder="Website" /></p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <div key={index} className="group/item relative inline-flex items-center">
                  <span className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[10px] text-slate-200">
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
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-10">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
            <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Professional Headline" />
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
            <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
          </h1>
        </header>

        <section className="mb-8">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-l-2 pl-3" style={{ borderColor: accent }}>
            Work Experience
          </h2>
          {experiences.map((exp, index) => (
            <div key={exp.id || index} className="group/item relative mb-6 last:mb-0">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Job Title" />
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold" style={{ color: accent }}>
                    <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                  </p>
                </div>
                <p className="shrink-0 text-[10px] font-semibold uppercase text-slate-400 flex gap-1">
                  <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                  <span>-</span>
                  <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                </p>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">
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

        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-900 border-l-2 pl-3" style={{ borderColor: accent }}>
            Education
          </h2>
          {education.map((entry, index) => (
            <div key={entry.id || index} className="group/item relative mb-4 last:mb-0">
              <p className="text-sm font-semibold text-slate-900">
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

        <ResumeAdditionalSections data={data} accent={accent} readOnly={readOnly} />
      </main>
    </TemplateWrapper>
  );
});

export default Resume1;
