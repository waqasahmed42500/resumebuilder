"use client";

import { useState } from "react";
import { HiClipboardCheck, HiDuplicate, HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

export default function CoverLetterInteractive({ role }) {
  const [copied, setCopied] = useState(false);

  const sample = role.coverLetterSample || {
    salutation: 'Dear Hiring Manager,',
    opening: `I am writing to express my strong interest in the ${role.title} position...`,
    body: `Throughout my career as a ${role.title}, I have successfully led key projects and driven results...`,
    closing: 'I look forward to discussing how my qualifications align with your goals.',
    signoff: 'Sincerely,\nCandidate Name'
  };

  const fullText = `${sample.salutation}\n\n${sample.opening}\n\n${sample.body}\n\n${sample.closing}\n\n${sample.signoff}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy cover letter text", err);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
            1-Click Copy Sample Cover Letter
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            Sample {role.title} Cover Letter Text
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
          >
            {copied ? (
              <>
                <HiClipboardCheck className="text-emerald-400 text-lg" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <HiDuplicate className="text-lg" />
                <span>Copy Cover Letter</span>
              </>
            )}
          </button>

          <Link
            href={`/builder?role=${role.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-emerald-400 active:scale-95"
          >
            <HiPencilAlt className="text-lg" />
            <span>Customize Online</span>
          </Link>
        </div>
      </div>

      {/* Formatted Editable Cover Letter Box */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 font-mono text-sm leading-relaxed text-slate-800 whitespace-pre-line shadow-inner">
        {fullText}
      </div>
    </div>
  );
}
