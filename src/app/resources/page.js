import Link from "next/link";
import Header from "../Component/Header";
import Footer from "../Component/Home/footer";
import JsonLd from "../Component/SEO/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easyresume.com";

export const metadata = {
  title: "Resume Writing Guides & ATS Optimization Checklist",
  description:
    "Expert guides on writing professional resumes, tailoring work history to job descriptions, and optimizing formatting for Applicant Tracking Systems (ATS).",
  keywords: [
    "Resume Writing Guide",
    "ATS Checklist",
    "Resume Tailoring Tips",
    "How to Write a Resume",
    "Cover Letter Advice",
  ],
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resume Writing Guides & ATS Optimization Checklist",
    description:
      "Practical guides and checklists to help you build stronger resumes and land interviews faster.",
    url: "/resources",
  },
};

const resources = [
  {
    title: "Resume Writing Guide",
    description:
      "Learn how to structure your experience, highlight quantifiable achievements, and tailor your resume to the job description.",
    href: "/builder",
    cta: "Start Building Now →",
  },
  {
    title: "ATS Optimization Checklist",
    description:
      "Make sure your resume passes applicant tracking systems with clean formatting, standard headings, and keyword-friendly content.",
    href: "/ats-resume-builder",
    cta: "View ATS Checklist →",
  },
  {
    title: "Cover Letter & Application Advice",
    description:
      "Explore practical advice for writing cover letters that complement your resume and strengthen your total job application.",
    href: "/templates",
    cta: "Browse Templates →",
  },
];

export default function ResourcesPage() {
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
        name: "Resources",
        item: `${siteUrl}/resources`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
              Career & Resume Guides
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Practical Guides to Build a Stronger Resume
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Use these practical guides, checklists, and expert tips to write smarter, tailor your application, and present your experience with confidence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {resources.map((resource) => (
              <article
                key={resource.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{resource.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {resource.description}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href={resource.href}
                    className="inline-flex items-center text-sm font-bold text-slate-900 underline decoration-emerald-600 underline-offset-4 hover:text-emerald-700"
                  >
                    {resource.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
