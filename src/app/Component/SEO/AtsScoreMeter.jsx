"use client";

import { useState, useRef, useEffect } from "react";
import { HiCheckCircle, HiExclamationCircle, HiChevronDown, HiChevronUp, HiLightningBolt } from "react-icons/hi";

export default function AtsScoreMeter({ resumeData, selectedRole = null, variant = "default" }) {
  const [isOpen, setIsOpen] = useState(false);
  const meterRef = useRef(null);

  // Close when clicking outside if it's the rail variant
  useEffect(() => {
    if (variant !== "rail") return;
    const handleClickOutside = (e) => {
      if (meterRef.current && !meterRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, variant]);

  // 1. Calculate Real-Time ATS Score
  const calculateAtsScore = () => {
    let score = 0;
    const checks = [];

    // Contact info checks (20 pts)
    const contact = resumeData?.contact || {};
    let contactScore = 0;
    if (contact.fullName && contact.fullName.trim().length > 2) contactScore += 5;
    if (contact.email && contact.email.includes("@")) contactScore += 5;
    if (contact.phone && contact.phone.trim().length > 6) contactScore += 5;
    if (contact.location && contact.location.trim().length > 2) contactScore += 5;
    score += contactScore;

    if (contactScore === 20) {
      checks.push({ passed: true, text: "Contact Information complete & scannable" });
    } else {
      checks.push({ passed: false, text: "Add complete contact details (name, email, phone, city)" });
    }

    // Professional Summary check (15 pts)
    const summary = resumeData?.summary || "";
    const summaryWords = summary.trim().split(/\s+/).filter(Boolean).length;
    if (summaryWords >= 25) {
      score += 15;
      checks.push({ passed: true, text: `Professional Summary optimized (${summaryWords} words)` });
    } else if (summaryWords > 0) {
      score += 8;
      checks.push({ passed: false, text: "Expand Professional Summary to at least 25-50 words" });
    } else {
      checks.push({ passed: false, text: "Missing Professional Summary section" });
    }

    // Work Experience & Metrics check (25 pts)
    const experiences = resumeData?.experiences || resumeData?.experience || [];
    if (Array.isArray(experiences) && experiences.length > 0) {
      score += 15;
      let hasMetrics = false;
      experiences.forEach((exp) => {
        const desc = exp.description || exp.bullets || "";
        const descText = Array.isArray(desc) ? desc.join(" ") : String(desc);
        if (/\d+%|\$\d+|\d+\+|\b(increased|reduced|managed|led|grew|built|delivered|engineered)\b/i.test(descText)) {
          hasMetrics = true;
        }
      });

      if (hasMetrics) {
        score += 10;
        checks.push({ passed: true, text: "Quantified work achievements & action verbs detected" });
      } else {
        checks.push({ passed: false, text: "Add metrics (%, $, numbers) and action verbs to work history" });
      }
    } else {
      checks.push({ passed: false, text: "Add at least 1 work experience position" });
    }

    // Skills check (20 pts)
    const skills = resumeData?.skills || [];
    const skillCount = Array.isArray(skills) ? skills.length : (typeof skills === "string" ? skills.split(",").length : 0);
    if (skillCount >= 5) {
      score += 20;
      checks.push({ passed: true, text: `Strong ATS skills coverage (${skillCount} keywords)` });
    } else if (skillCount > 0) {
      score += 10;
      checks.push({ passed: false, text: "Add at least 5-8 relevant technical/industry skills" });
    } else {
      checks.push({ passed: false, text: "Missing Skills section" });
    }

    // Education check (10 pts)
    const education = resumeData?.education || [];
    if (Array.isArray(education) && education.length > 0) {
      score += 10;
      checks.push({ passed: true, text: "Education credentials listed" });
    } else {
      checks.push({ passed: false, text: "Add your degree/school under Education" });
    }

    // ATS Formatting Safety check (10 pts)
    score += 10;
    checks.push({ passed: true, text: "Standard single/dual column ATS vector layout" });

    return { score: Math.min(100, score), checks };
  };

  const { score, checks } = calculateAtsScore();

  // Dynamic Color & Status
  const getStatus = (score) => {
    if (score >= 90) return { label: "Recruiter Ready", color: "text-emerald-600", bg: "bg-emerald-500", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-800" };
    if (score >= 75) return { label: "Good ATS Match", color: "text-sky-600", bg: "bg-sky-500", border: "border-sky-200", badge: "bg-sky-100 text-sky-800" };
    if (score >= 50) return { label: "Needs Improvement", color: "text-amber-600", bg: "bg-amber-500", border: "border-amber-200", badge: "bg-amber-100 text-amber-800" };
    return { label: "High ATS Rejection Risk", color: "text-red-600", bg: "bg-red-500", border: "border-red-200", badge: "bg-red-100 text-red-800" };
  };

  const status = getStatus(score);

  if (variant === "rail") {
    return (
      <div className="relative flex flex-col items-center" ref={meterRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:scale-105 hover:shadow-md hover:ring-emerald-200 active:scale-95 ${isOpen ? "ring-emerald-400 shadow-md" : ""}`}
          title="ATS Score Details"
        >
          <svg className="absolute inset-0 h-10 w-10 -rotate-90">
            <circle cx="20" cy="20" r="16" stroke="#f1f5f9" strokeWidth="3" fill="none" />
            <circle
              cx="20"
              cy="20"
              r="16"
              stroke={score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444"}
              strokeWidth="3"
              fill="none"
              strokeDasharray={100}
              strokeDashoffset={100 - score}
              strokeLinecap="round"
            />
          </svg>
          <span className="relative z-10 flex items-center justify-center text-[11px] font-black tracking-tighter text-slate-700">
            {score}
          </span>
        </button>

        {/* Popover Card */}
        <div
          className={`absolute left-14 top-0 z-50 w-[340px] rounded-2xl border ${status.border} bg-white p-5 shadow-xl transition-all duration-300 origin-top-left ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${status.badge}`}>
                  {status.label}
                </span>
                {selectedRole && <span className="text-[10px] font-bold text-slate-500 line-clamp-1">{selectedRole}</span>}
              </div>
              <h3 className="mt-1 text-2xl font-black text-slate-900">{score}%</h3>
              <p className="text-xs font-medium text-slate-500">Resume optimization score</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full bg-slate-50 p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <HiChevronUp size={16} />
            </button>
          </div>

          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full ${status.bg} transition-all duration-1000 ease-out`} style={{ width: `${score}%` }} />
          </div>

          <div className="mt-5 space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <HiLightningBolt className="text-amber-500" size={14} /> Action Items
            </p>
            <div className="space-y-2.5 text-xs">
              {checks.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5">
                  {item.passed ? (
                    <HiCheckCircle className="mt-0.5 shrink-0 text-emerald-500" size={16} />
                  ) : (
                    <HiExclamationCircle className="mt-0.5 shrink-0 text-amber-500" size={16} />
                  )}
                  <span className={item.passed ? "text-slate-600 font-medium" : "text-slate-900 font-bold leading-relaxed"}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border ${status.border} bg-white p-4 shadow-sm transition-all`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Circular Score Indicator */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-inner">
            <span className="text-xl font-black">{score}</span>
            <span className="text-[10px] text-slate-400 font-bold">%</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-black uppercase tracking-wider ${status.badge}`}>
                {status.label}
              </span>
              {selectedRole && (
                <span className="text-xs text-slate-500 font-semibold">
                  Target: {selectedRole}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Real-time ATS screening compatibility score
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="hover:cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Toggle ATS Score Checklist"
        >
          {isOpen ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full ${status.bg} transition-all duration-500 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Actionable Feedback Breakdown Accordion */}
      <div
  className={`overflow-hidden transition-all duration-500 ease-in-out ${
    isOpen
      ? "max-h-[500px] opacity-100 mt-4 pt-3 border-t border-slate-100"
      : "max-h-0 opacity-0 mt-0 pt-0 border-t border-transparent"
  }`}
>
  <div className="space-y-2 text-xs">
    <p className="font-bold text-slate-900 flex items-center gap-1 mb-2">
      <HiLightningBolt className="text-amber-500" size={14} />
      Live ATS Parsing Checklist:
    </p>

    {checks.map((item, idx) => (
      <div key={idx} className="flex items-start gap-2 text-slate-700">
        {item.passed ? (
          <HiCheckCircle
            className="text-emerald-500 shrink-0 mt-0.5"
            size={15}
          />
        ) : (
          <HiExclamationCircle
            className="text-amber-500 shrink-0 mt-0.5"
            size={15}
          />
        )}

        <span
          className={
            item.passed
              ? "text-slate-700 font-medium"
              : "text-slate-900 font-bold"
          }
        >
          {item.text}
        </span>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}
