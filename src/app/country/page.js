import Link from 'next/link';
import { countryData } from './countryData';
import JsonLd from '../Component/SEO/JsonLd';
import Header from '../Component/Header';
import Footer from '../Component/Home/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esayresume.netlify.app';

export const metadata = {
  title: 'Country-Specific Resume Builders: US, UK, Canada, Australia & India (2026)',
  description:
    'Build resumes and CVs tailored to regional standards in the United States, United Kingdom, Canada, Australia, and India. 100% free PDF export.',
  alternates: {
    canonical: `${siteUrl}/country`,
  },
  openGraph: {
    title: 'Country-Specific Resume & CV Builders',
    description:
      'Explore regional hiring standards and paper size formats for US, UK, Canada, Australia, and India.',
    url: `${siteUrl}/country`,
  },
};

export default function CountryIndexPage() {
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
        name: 'Regional Builders',
        item: `${siteUrl}/country`,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Country-Specific Resume & CV Builders',
    description: 'Regional resume standards for top global hiring markets',
    numberOfItems: countryData.length,
    itemListElement: countryData.map((country, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: country.heroTitle,
      description: country.metaDescription,
      url: `${siteUrl}/country/${country.slug}`,
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
              Global Hiring Standards
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Country-Specific Resume & CV Builders
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Select your target job market to format your resume or CV according to regional paper sizes (US Letter vs A4), privacy laws, photo policies, and recruitment standards.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countryData.map((country) => (
              <article
                key={country.slug}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-black uppercase text-white">
                      {country.code} Standard
                    </span>
                    <span className="text-xs font-bold text-slate-500">{country.paperSize}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-emerald-700">
                    <Link href={`/country/${country.slug}`}>
                      {country.heroTitle}
                    </Link>
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {country.metaDescription}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-500">Photo Rule:</span>
                      <span className="font-bold text-slate-900 truncate max-w-[180px]">{country.photoRule.split(' (')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-500">Standard Length:</span>
                      <span className="font-bold text-slate-900">{country.standardLength}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5">
                  <Link
                    href={`/country/${country.slug}`}
                    className="block text-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Build {country.country} Resume →
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
