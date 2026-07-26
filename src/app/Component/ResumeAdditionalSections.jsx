"use client";

import React from "react";
import { useResume } from "../context/ResumeContext";
import EditableText from "./EditableText";
import SectionControls from "./SectionControls";

export default function ResumeAdditionalSections({ data: propData, accent, readOnly = false, className = "" }) {
  const context = useResume();
  const data = propData || context?.resumeData;
  const certificates = data?.certifications || [];
  const languages = data?.languages || [];

  const {
    updateCertification,
    addCertification,
    removeCertification,
    moveCertification,
    updateLanguage,
    addLanguage,
    removeLanguage,
    moveLanguage,
  } = context || {};

  return (
    <div className={`space-y-8 ${className}`}>
      <section>
        <h2 className="mb-4 border-l-2 pl-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-900" style={{ borderColor: accent }}>
          Certifications
        </h2>
        {certificates.map((item, index) => (
          <div key={item.id || index} className="group/item relative mb-4 last:mb-0">
            <p className="text-sm font-semibold text-slate-900">
              <EditableText
                value={item.title}
                onChange={(val) => updateCertification?.(item.id, "title", val)}
                readOnly={readOnly}
                placeholder="Certification name"
              />
            </p>
            <p className="mt-1 text-xs text-slate-600">
              <EditableText
                value={item.issuer}
                onChange={(val) => updateCertification?.(item.id, "issuer", val)}
                readOnly={readOnly}
                placeholder="Issuer"
              />
              {item.year ? <span> · </span> : null}
              <EditableText
                value={item.year}
                onChange={(val) => updateCertification?.(item.id, "year", val)}
                readOnly={readOnly}
                placeholder="Year"
              />
            </p>
            {!readOnly && (
              <SectionControls
                className="absolute top-0 right-0"
                onMoveUp={() => moveCertification?.(item.id, "up")}
                onMoveDown={() => moveCertification?.(item.id, "down")}
                onAdd={() => addCertification?.(index)}
                onDelete={() => removeCertification?.(item.id)}
                canMoveUp={index > 0}
                canMoveDown={index < certificates.length - 1}
                canDelete={certificates.length > 1}
              />
            )}
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 border-l-2 pl-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-900" style={{ borderColor: accent }}>
          Languages
        </h2>
        {languages.map((item, index) => (
          <div key={item.id || index} className="group/item relative mb-3 last:mb-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">
                <EditableText
                  value={item.name}
                  onChange={(val) => updateLanguage?.(item.id, "name", val)}
                  readOnly={readOnly}
                  placeholder="Language"
                />
              </p>
              <p className="text-xs font-medium text-slate-600">
                <EditableText
                  value={item.level}
                  onChange={(val) => updateLanguage?.(item.id, "level", val)}
                  readOnly={readOnly}
                  placeholder="Proficiency"
                />
              </p>
            </div>
            {!readOnly && (
              <SectionControls
                className="absolute top-0 right-0"
                onMoveUp={() => moveLanguage?.(item.id, "up")}
                onMoveDown={() => moveLanguage?.(item.id, "down")}
                onAdd={() => addLanguage?.(index)}
                onDelete={() => removeLanguage?.(item.id)}
                canMoveUp={index > 0}
                canMoveDown={index < languages.length - 1}
                canDelete={languages.length > 1}
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
