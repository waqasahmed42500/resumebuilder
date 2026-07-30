import Link from 'next/link';
import { rolesData } from '../templates/roleData';
import JsonLd from '../Component/SEO/JsonLd';
import Header from '../Component/Header';
import Footer from '../Component/Home/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esayresume.netlify.app';

export const metadata = {
  title: '500+ Resume Examples by Industry & Profession (2026)',
  description:
    'Explore real resume examples for Software Engineers, Nurses, Teachers, Accountants, Data Analysts, and 30+ professions. Copy expert bullet points for free.',
  alternates: {
    canonical: `${siteUrl}/examples`,
  },
  openGraph: {
    title: '500+ Professional Resume Examples by Industry',
    description:
      'Explore verified resume examples across top industries. Copy pre-written bullet points and skills, then edit online for free.',
    url: `${siteUrl}/examples`,
  },
};

export default function ExamplesIndexPage() {
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
        name: 'Examples',
        item: `${siteUrl}/examples`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <header className="mb-12 border-b border-slate-200 pb-10">
            <span className="mb-3 inline-block rounded-full bg-sky-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-sky-800">
              Verified Samples & Guides
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Professional Resume Examples
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Explore job-winning resume samples across tech, healthcare, education, finance, marketing, trades, and entry-level positions. Select a role below to view sample bullet points, top skills, and customize online.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rolesData.map((role) => (
              <article
                key={role.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block mb-1">
                    {role.category}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 hover:text-sky-600">
                    <Link href={`/examples/${role.slug}`}>
                      {role.title} Resume Example
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {role.summary}
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{role.experienceLevel}</span>
                  <Link
                    href={`/examples/${role.slug}`}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900"
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
