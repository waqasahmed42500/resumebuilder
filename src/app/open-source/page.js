import Link from 'next/link';
import JsonLd from '../Component/SEO/JsonLd';
import Header from '../Component/Header';
import Footer from '../Component/Home/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resuvix.com';

export const metadata = {
  title: 'Open Source ATS Resume Schemas & GitHub Repositories | Resuvix',
  description:
    'Explore open-source Markdown and JSON resume schemas built for developers and job seekers. Free GitHub resume templates with 100% client-side privacy.',
  alternates: {
    canonical: `${siteUrl}/open-source`,
  },
  openGraph: {
    title: 'Open Source ATS Resume Schemas & Developer Tools',
    description:
      'Open-source JSON and Markdown resume templates for developers. Zero cloud storage, 100% client-side privacy.',
    url: `${siteUrl}/open-source`,
  },
};

export default function OpenSourcePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Open Source',
        item: `${siteUrl}/open-source`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <header className="mb-12 border-b border-slate-200 pb-10">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
              Developer Ecosystem & Privacy
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Open Source ATS Resume Standards
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Resuvix is committed to privacy-first, developer-friendly open standards. Explore our GitHub repository, JSON schemas, and privacy-first local storage architecture.
            </p>
          </header>

          {/* Privacy Trust Banner */}
          <section className="mb-12 rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <span className="inline-block rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  🔒 100% Client-Side Privacy Guarantee
                </span>
                <h2 className="text-2xl font-black">Your Resume Data Never Leaves Your Browser</h2>
                <p className="text-slate-300 text-sm mt-2 max-w-xl">
                  Unlike traditional resume builders that store your personal contact details on remote database servers, Resuvix processes 100% of your data locally inside your browser session using HTML5 LocalStorage and vector PDF generation.
                </p>
              </div>

              <Link
                href="/builder"
                className="rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-emerald-400"
              >
                Test Offline Builder →
              </Link>
            </div>
          </section>

          {/* GitHub Repository Showcase */}
          <section className="mb-14 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">GitHub Open Source</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">awesome-ats-resume-templates</h2>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                <span>View on GitHub</span>
              </a>
            </div>

            <p className="text-slate-700 leading-relaxed mb-6">
              Our open-source GitHub repository provides raw Markdown resume templates, JSON resume schemas, and ATS parsing test cases for developers who prefer version-controlled resumes.
            </p>

            {/* Code Snippet Box */}
            <div className="rounded-xl bg-slate-900 p-5 font-mono text-xs text-emerald-400 overflow-x-auto">
              <pre>{`{
  "$schema": "https://resuvix.com/schema/resume.json",
  "basics": {
    "name": "Developer Candidate",
    "label": "Software Engineer",
    "privacyMode": "100% LocalStorage",
    "atsCompatibility": "100%"
  }
}`}</pre>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
