import Link from 'next/link';
import { rolesData } from '../templates/roleData';
import JsonLd from '../Component/SEO/JsonLd';
import Header from '../Component/Header';
import Footer from '../Component/Home/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resuvix.com';

export const metadata = {
  title: '30+ Free Cover Letter Examples & Generators by Industry (2026)',
  description:
    'Browse 30+ free cover letter examples for software engineers, nurses, teachers, accountants, and executives. Copy 1-click text and customize online.',
  alternates: {
    canonical: `${siteUrl}/cover-letter`,
  },
  openGraph: {
    title: '30+ Free Cover Letter Examples & Generators by Industry',
    description:
      'Explore recruiter-approved cover letter samples across top industries. 1-click copy text, customize online, and download free PDF.',
    url: `${siteUrl}/cover-letter`,
  },
};

export default function CoverLettersIndexPage() {
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
        name: 'Cover Letters',
        item: `${siteUrl}/cover-letter`,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Cover Letter Generators & Samples by Profession',
    description: 'Recruiter-tested cover letter samples for 30+ professions',
    numberOfItems: rolesData.length,
    itemListElement: rolesData.map((role, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${role.title} Cover Letter`,
      description: `Free ${role.title} Cover Letter sample and generator`,
      url: `${siteUrl}/cover-letter/${role.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 border-b border-slate-200 pb-10">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
              Recruiter Approved Samples
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Free Cover Letter Examples by Profession
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Select your profession below to access pre-written opening hooks, achievement body paragraphs, and 1-click copy cover letter text tailored for your industry.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rolesData.map((role) => (
              <article
                key={role.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    {role.category}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-emerald-600">
                    <Link href={`/cover-letter/${role.slug}`}>
                      {role.title} Cover Letter
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {role.coverLetterSample?.opening || `High-impact cover letter sample tailored for ${role.title} applications.`}
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">1-Click Copy</span>
                  <Link
                    href={`/cover-letter/${role.slug}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    View Sample →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
