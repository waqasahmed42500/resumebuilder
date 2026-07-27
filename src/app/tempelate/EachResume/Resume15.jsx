"use client";

import React, { memo } from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateWrapper from "../../Component/TemplateWrapper";
import EditableText from "../../Component/EditableText";
import SectionControls from "../../Component/SectionControls";
import SocialIcon from "../../Component/SocialIcon";

const Resume15 = memo(function Resume15({ data: propData, theme, readOnly = false }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const accent = theme?.accent || context?.themeAccent || "#0f766e";

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
    <TemplateWrapper theme={theme} readOnly={readOnly} className="bg-slate-900 text-slate-100 p-8 flex flex-col min-h-[1123px]">
      <header className="mb-6 border-b border-slate-800 pb-5 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: accent }}>
            <EditableText value={contact.headline} onChange={(val) => updateContact?.("headline", val)} readOnly={readOnly} placeholder="Headline" />
          </span>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-white">
            <EditableText value={contact.fullName} onChange={(val) => updateContact?.("fullName", val)} readOnly={readOnly} placeholder="Full Name" />
          </h1>
        </div>
        <div className="text-right text-xs text-slate-400 leading-5 space-y-0.5">
          <p><EditableText value={contact.email} onChange={(val) => updateContact?.("email", val)} readOnly={readOnly} placeholder="Email" /></p>
          <p><EditableText value={contact.phone} onChange={(val) => updateContact?.("phone", val)} readOnly={readOnly} placeholder="Phone" /></p>
          <p><EditableText value={contact.location} onChange={(val) => updateContact?.("location", val)} readOnly={readOnly} placeholder="Location" /></p>
        </div>
      </header>

      {/* Social Links Banner */}
      {portfolio.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-4 text-xs font-medium text-slate-300 bg-slate-800/80 p-2.5 rounded-lg border border-slate-800">
          {portfolio.map((link, index) => (
            <div key={link.id || index} className="group/item relative inline-flex items-center gap-1.5">
              <SocialIcon platform={link.platform} url={link.url} className="text-xs" style={{ color: accent }} />
              <a href={link.url || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
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

      <section className="mb-6 rounded-xl bg-slate-800/60 p-3.5 border border-slate-800">
        <p className="text-xs leading-5 text-slate-300">
          <EditableText value={data?.summary} onChange={(val) => updateSummary?.(val)} multiline readOnly={readOnly} placeholder="Summary..." />
        </p>
      </section>

      <div className="grid grid-cols-[1.5fr_0.9fr] gap-8 flex-1">
        <main>
          {/* Work Experience */}
          <section className="mb-6">
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Selected Work & Leadership
            </h2>
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className="group/item relative mb-5 border-l border-slate-800 pl-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-xs font-bold text-white">
                      <EditableText value={exp.role} onChange={(val) => updateExperience?.(exp.id, "role", val)} readOnly={readOnly} placeholder="Role" />
                    </h3>
                    <p className="text-[11px] font-semibold" style={{ color: accent }}>
                      <EditableText value={exp.company} onChange={(val) => updateExperience?.(exp.id, "company", val)} readOnly={readOnly} placeholder="Company" />
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-500 flex gap-1">
                    <EditableText value={exp.startDate} onChange={(val) => updateExperience?.(exp.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                    <span>-</span>
                    <EditableText value={exp.endDate} onChange={(val) => updateExperience?.(exp.id, "endDate", val)} readOnly={readOnly} placeholder="End" />
                  </p>
                </div>
                <p className="mt-1.5 text-xs leading-5 text-slate-400">
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
            <section className="mb-6">
              <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Projects Showcase
              </h2>
              {projects.map((proj, index) => (
                <div key={proj.id || index} className="group/item relative mb-4 last:mb-0 border-l border-slate-800 pl-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-white">
                      <EditableText value={proj.title} onChange={(val) => updateProject?.(proj.id, "title", val)} readOnly={readOnly} placeholder="Project" />
                      <span className="text-[10px] font-normal text-slate-500 ml-1">({proj.tech})</span>
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      <EditableText value={proj.startDate} onChange={(val) => updateProject?.(proj.id, "startDate", val)} readOnly={readOnly} placeholder="Start" />
                    </p>
                  </div>
                  <p className="mt-1 text-xs leading-4 text-slate-400">
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
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Awards & Recognition
              </h2>
              {awards.map((award, index) => (
                <div key={award.id || index} className="group/item relative mb-2 last:mb-0 text-xs">
                  <p className="font-bold text-white">
                    <EditableText value={award.title} onChange={(val) => updateAward?.(award.id, "title", val)} readOnly={readOnly} placeholder="Award Title" />
                    <span className="text-slate-500 font-normal"> — </span>
                    <EditableText value={award.issuer} onChange={(val) => updateAward?.(award.id, "issuer", val)} readOnly={readOnly} placeholder="Issuer" />
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

        <aside className="border-l border-slate-800 pl-6 space-y-6">
          {/* Core Skills */}
          <section>
            <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <div key={index} className="group/item relative inline-flex items-center">
                  <span className="rounded-md bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-medium text-slate-200">
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

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Languages
              </h2>
              <div className="space-y-1 text-xs text-slate-300">
                {languages.map((lang, index) => (
                  <div key={lang.id || index} className="group/item relative flex items-center justify-between">
                    <p className="font-semibold">
                      <EditableText value={lang.name} onChange={(val) => updateLanguage?.(lang.id, "name", val)} readOnly={readOnly} placeholder="Language" />
                      <span className="font-normal text-slate-500 ml-1">({lang.proficiency})</span>
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
            </section>
          )}

          {/* Education */}
          <section>
            <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Education
            </h2>
            {education.map((entry, index) => (
              <div key={entry.id || index} className="group/item relative mb-3 last:mb-0 text-xs">
                <p className="font-bold text-white">
                  <EditableText value={entry.degree} onChange={(val) => updateEducation?.(entry.id, "degree", val)} readOnly={readOnly} placeholder="Degree" />
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
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

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={cert.id || index} className="group/item relative mb-2 last:mb-0 text-xs">
                  <p className="font-bold text-white">
                    <EditableText value={cert.name} onChange={(val) => updateCertification?.(cert.id, "name", val)} readOnly={readOnly} placeholder="Cert Title" />
                  </p>
                  <p className="text-[10px] text-slate-400">
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
            </section>
          )}
        </aside>
      </div>
    </TemplateWrapper>
  );
});

export default Resume15;
