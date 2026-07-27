"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import EditableImage from "../../Component/EditableImage";
import SectionControls from "../../Component/SectionControls";
import SocialIcon from "../../Component/SocialIcon";

const Resume13 = memo(function Resume13({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#d97706";

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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="flex min-h-[1123px]">
      {/* Prism Color Block Sidebar */}
      <aside className="w-[260px] shrink-0 p-6 text-slate-900 flex flex-col justify-between" style={{ backgroundColor: accent }}>
        <div>
          <div className="mb-5 flex justify-center">
            <EditableImage
              src={contact.photo}
              onChange={(val) => updateContact?.("photo", val)}
              onRemove={() => updateContact?.("photo", "")}
              name={contact.fullName}
              accentColor="#ffffff"
              readOnly={readOnly}
              className="h-24 w-24 rounded-full border-4 border-slate-900"
            />
          </div>

          <div className="mb-5 border-b border-slate-900/20 pb-3">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 mb-1.5">Contact</h3>
            <div className="space-y-1 text-xs font-medium leading-5">
              <p><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></p>
              <p><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></p>
              <p><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></p>
            </div>
          </div>

          {/* Social Links */}
          {portfolio.length > 0 && (
            <div className="mb-5 border-b border-slate-900/20 pb-3">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 mb-1.5">Links</h3>
              <div className="space-y-1 text-xs">
                {portfolio.map((link, index) => (
                  <div key={link.id || index} className="group/item relative flex items-center justify-between">
                    <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-bold text-slate-950 hover:underline">
                      <SocialIcon platform={link.platform} url={link.url} className="text-xs" />
                      <EditableText value={link.platform} onChange={(val) => updatePortfolio?.(link.id, "platform", val)} readOnly={readOnly} placeholder="Platform" />
                    </a>
                    {!readOnly && (
                      <SectionControls
                        onMoveUp={() => movePortfolio?.(link.id, "up")}
                        onMoveDown={() => movePortfolio?.(link.id, "down")}
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
            </div>
          )}

          {/* Creative Focus / Skills */}
          <div className="mb-5 border-b border-slate-900/20 pb-3">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 mb-1.5">Creative Focus</h3>
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

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-5 border-b border-slate-900/20 pb-3">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 mb-1.5">Languages</h3>
              <div className="space-y-1 text-xs">
                {languages.map((lang, index) => (
                  <div key={lang.id || index} className="group/item relative flex items-center justify-between">
                    <p className="font-bold text-slate-950">
                      <EditableText value={lang.name} onChange={(val) => updateLanguage?.(lang.id, "name", val)} readOnly={readOnly} placeholder="Lang" />
                      <span className="font-normal opacity-80 ml-1">({lang.proficiency})</span>
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

          {/* Education */}
          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900 mb-1.5">Education</h3>
            {education.map((entry, index) => (
              <div key={entry.id || index} className="group/item relative mb-2 last:mb-0">
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
      <main className="flex-1 p-8 bg-slate-50">
        <header className="mb-6 border-b-2 border-slate-900 pb-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: accent }}>
            <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
          </p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-slate-950">
            <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
          </h1>
        </header>

        {/* Bio */}
        <section className="mb-6">
          <h2 className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900">
            Artist Statement & Bio
          </h2>
          <p className="text-xs leading-5 text-slate-700">
            <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
          </p>
        </section>

        {/* Work Experience */}
        <section className="mb-6">
          <h2 className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900">
            Selected Work Experience
          </h2>
          {experiences.map((exp, index) => (
            <div key={exp.id || index} className="group/item relative mb-5 border-l-2 border-slate-900 pl-3 last:mb-0">
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

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900">
              Featured Projects
            </h2>
            {projects.map((proj, index) => (
              <div key={proj.id || index} className="group/item relative mb-3 last:mb-0 border-l-2 border-slate-900 pl-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-950">
                    <EditableText value={proj.title} onChange={(val) => updateProject?.(proj.id, "title", val)} readOnly={readOnly} placeholder="Project Title" />
                    <span className="text-[10px] font-normal text-slate-500 ml-1">({proj.tech})</span>
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    <EditableText value={proj.startDate} onChange={(val) => updateProject?.(proj.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                  </p>
                </div>
                <p className="mt-1 text-xs leading-4 text-slate-700">
                  <EditableText value={proj.description} onChange={(val) => updateProject?.(proj.id, "description", val)} multiline readOnly={readOnly} placeholder="Details..." />
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

        {/* Awards */}
        {awards.length > 0 && (
          <section>
            <h2 className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-900">
              Honors & Awards
            </h2>
            {awards.map((award, index) => (
              <div key={award.id || index} className="group/item relative mb-2 last:mb-0 text-xs">
                <p className="font-bold text-slate-950">
                  <EditableText value={award.title} onChange={(val) => updateAward?.(award.id, "title", val)} readOnly={readOnly} placeholder="Award Title" />
                  <span> — </span>
                  <EditableText value={award.issuer} onChange={(val) => updateAward?.(award.issuer, "issuer", val)} readOnly={readOnly} placeholder="Issuer" />
                </p>
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
    </TemplateWrapper>
  );
});

export default Resume13;
