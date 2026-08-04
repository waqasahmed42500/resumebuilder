import Header from "../Component/Header";
import Footer from "../Component/Home/footer";
import Link from "next/link";
import JsonLd from "../Component/SEO/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://resuvix.com";

export const metadata = {
  title: "Free ATS Resume Builder | Pass Applicant Tracking Systems 100%",
  description:
    "Build a 100% ATS-friendly resume for free. Recruiter-tested formatting, clean section structures, and instant PDF download to pass automated screening software.",
  keywords: [
    "ATS Resume Builder",
    "ATS Resume Maker",
    "Free ATS Resume",
    "Applicant Tracking System Resume",
    "ATS Friendly Resume Templates",
    "Pass ATS Resume",
  ],
  alternates: {
    canonical: "/ats-resume-builder",
  },
  openGraph: {
    title: "Free ATS Resume Builder | Pass Applicant Tracking Systems 100%",
    description:
      "Create resumes engineered to pass automated applicant tracking systems (ATS). Free PDF download.",
    url: "/ats-resume-builder",
  },
};

const atsFaqs = [
  {
    question: "What is an ATS (Applicant Tracking System)?",
    answer:
      "An Applicant Tracking System (ATS) is recruitment software used by over 98% of Fortune 500 companies to store, scan, rate, and rank job applications automatically before a human recruiter reads them.",
  },
  {
    question: "How does Resuvix guarantee ATS compatibility?",
    answer:
      "All Resuvix templates use standard HTML5 typography hierarchies, standard section headings (Work Experience, Education, Skills), single/dual clean text blocks, and vector PDF encoding that ATS parsers extract without layout corruption.",
  },
  {
    question: "What formatting mistakes break ATS parsing?",
    answer:
      "Using non-standard section titles, embedding text inside image files, placing vital contact info in headers/footers, using unreadable tables, or using exotic fonts cause ATS software to drop candidates.",
  },
];

export default function AtsResumeBuilderPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ATS Resume Builder",
        item: `${siteUrl}/ats-resume-builder`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: atsFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          {/* Hero Section */}
          <header className="mb-14 border-b border-slate-200 pb-10">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
              Recruiter Approved & ATS Tested
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Free ATS Resume Builder
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
              Ensure your resume passes automated screening software and lands on the recruiter&apos;s desk. Designed with mathematically precise layout parameters for 100% ATS readability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/builder"
                className="rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-slate-800"
              >
                Create ATS Resume Now
              </Link>
              <Link
                href="/templates"
                className="rounded-xl bg-slate-200 px-8 py-4 text-base font-bold text-slate-800 transition-all hover:bg-slate-300"
              >
                Browse ATS Templates
              </Link>
            </div>
          </header>

          {/* Key Guidelines Section */}
          <section className="mb-16 space-y-8">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Why 75% of Resumes Are Rejected by ATS Systems
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Applicant Tracking Systems parse candidate resumes into raw data fields. When a resume contains complex graphics, nested text boxes, or non-standard fonts, the ATS parser fails to read essential details, resulting in immediate rejection.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700 font-bold text-lg">
                  01
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">Clean Header Structure</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Clear contact info placement without hiding details inside non-scannable header tags.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold text-lg">
                  02
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">Standard Headings</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Recruiter-standard section names like Work Experience, Education, and Skills so parsers map fields correctly.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-bold text-lg">
                  03
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">Vector PDF Output</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Clean text encoding ensuring software can read every character, metric, and date range.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 border-t border-slate-200 pt-12">
            <h2 className="mb-8 text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions About ATS Resumes
            </h2>
            <div className="space-y-6">
              {atsFaqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{faq.question}</h3>
                  <p className="text-base text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="rounded-3xl bg-slate-900 p-10 text-center text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-black sm:text-4xl">Start Building Your ATS Resume Today</h2>
            <p className="mx-auto mb-8 max-w-xl text-slate-300">
              No registration fees. No credit card required. 100% free PDF download.
            </p>
            <Link
              href="/builder"
              className="inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-emerald-400"
            >
              Build ATS Resume Now
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
