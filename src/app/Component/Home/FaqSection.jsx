"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import JsonLd from "../SEO/JsonLd";

const faqs = [
  {
    question: "What is an ATS Resume Builder and why do I need one?",
    answer:
      "An Applicant Tracking System (ATS) is software used by employers to screen job applications automatically before human recruiters review them. An ATS resume builder formats your resume with clean single/dual-column layouts, standard typography, clear heading tags, and readable text blocks so automated parsers correctly identify your work history, skills, and contact details without layout errors.",
  },
  {
    question: "Is EasyResume 100% free to use and download PDFs?",
    answer:
      "Yes! You can choose any of our 20+ professional templates, customize font styles and accent colors, edit your experience, and download pixel-perfect high-resolution PDF resumes with zero hidden charges or credit card requirements.",
  },
  {
    question: "Which resume format is best for ATS scanners?",
    answer:
      "A clean single-column or modern dual-column format with standard section titles (Work Experience, Education, Skills, Contact) is best for ATS scanners. Avoid complex graphic tables, embedded images for text, or non-standard fonts that ATS systems cannot extract.",
  },
  {
    question: "Can I download my resume as a PDF file?",
    answer:
      "Yes! Once you finish editing your resume in our builder, click the Download PDF button to generate a clean, ATS-tested vector PDF file ready for direct application on LinkedIn, Indeed, ZipRecruiter, or company career portals.",
  },
  {
    question: "How do I tailor my resume for a specific job description?",
    answer:
      "To tailor your resume, highlight key technical skills, tools, job titles, and action verbs from the employer's job description. Incorporate these keywords naturally into your executive summary, professional work bullet points, and dedicated skills sections.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-slate-50 px-4 py-20 text-slate-900 sm:px-8 md:px-16 lg:px-20">
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-widest text-sky-700">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
            Everything You Need to Know About ATS Resumes
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Get answers to common questions about ATS optimization, resume formatting, and PDF downloads.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-slate-900 transition-colors hover:text-sky-700"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <FiChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-700" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm sm:text-base leading-relaxed text-slate-600"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
