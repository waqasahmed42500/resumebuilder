import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import { countryData, getCountryBySlug } from '../countryData';
import { rolesData } from '@/app/templates/roleData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geteasyresume.netlify.app';

export async function generateStaticParams() {
  return countryData.map((country) => ({
    slug: country.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) return {};

  return {
    title: country.title,
    description: country.metaDescription,
    alternates: {
      canonical: `${siteUrl}/country/${slug}`,
    },
    openGraph: {
      title: country.title,
      description: country.metaDescription,
      url: `${siteUrl}/country/${slug}`,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/home.png`,
          width: 1200,
          height: 630,
          alt: country.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: country.title,
      description: country.metaDescription,
      images: [`${siteUrl}/home.png`],
    },
  };
}

export default async function CountryResumePage({ params }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: country.heroTitle,
        item: `${siteUrl}/country/${country.slug}`,
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: country.title,
    description: country.metaDescription,
    url: `${siteUrl}/country/${country.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'EasyResume',
      url: siteUrl,
    },
  };

  const faqSchema = country.faqs && country.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: country.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const featuredRoles = rolesData.slice(0, 8);
  const otherCountries = countryData.filter((c) => c.slug !== country.slug);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/country" className="hover:text-slate-900 transition-colors">Regional Builders</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{country.country} Standard</span>
          </nav>

          {/* Hero Header */}
          <header className="mb-12 border-b border-slate-200 pb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-full bg-slate-900 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-white">
                {country.code} Standard
              </span>
              <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                100% Free Export
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              {country.heroTitle}
            </h1>

            {/* Regional Specs Grid Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Paper Size Standard</span>
                <strong className="text-slate-900 text-sm mt-1 block">{country.paperSize}</strong>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Photo / Headshot Policy</span>
                <strong className="text-slate-900 text-sm mt-1 block">{country.photoRule}</strong>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Standard Document Length</span>
                <strong className="text-slate-900 text-sm mt-1 block">{country.standardLength}</strong>
              </div>
            </div>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              {country.metaDescription} Designed specifically to meet hiring expectations in <strong className="text-slate-900">{country.country}</strong>.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/builder"
                className="rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-slate-800"
              >
                Build {country.country} Resume Free →
              </Link>
              <Link
                href="/templates"
                className="rounded-xl bg-slate-200 px-8 py-4 text-base font-bold text-slate-800 transition-all hover:bg-slate-300"
              >
                Browse {country.code} Templates
              </Link>
            </div>
          </header>

          {/* Detailed Overview Guide */}
          <section className="mb-14 space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Understanding {country.country} Resume & CV Hiring Standards
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              {country.overview.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-base text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Regional Formatting Rules List */}
          <section className="mb-14 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>📋</span> Mandatory Rules for {country.country} Applications
            </h2>
            <ul className="space-y-3">
              {country.regionalRules.map((rule, idx) => (
                <li key={idx} className="flex gap-3 text-slate-800 text-sm leading-relaxed font-medium">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Popular Industry Role Builders in Country */}
          <section className="mb-14 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Popular {country.country} Profession Resume Builders
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featuredRoles.map((role) => (
                <Link
                  key={role.slug}
                  href={`/templates/${role.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-bold text-slate-800 shadow-xs hover:border-emerald-500 hover:text-emerald-700 transition-all"
                >
                  {role.title} {country.code}
                </Link>
              ))}
            </div>
          </section>

          {/* Other Regional Builders */}
          <section className="mb-14 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Other Country-Specific Resume & CV Builders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCountries.map((other) => (
                <Link
                  key={other.slug}
                  href={`/country/${other.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-900 transition-all"
                >
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{other.code} Standard</span>
                  <strong className="text-slate-900 text-base block">{other.heroTitle}</strong>
                  <span className="text-xs text-slate-500 mt-2 block">{other.paperSize} →</span>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs Section */}
          {country.faqs && country.faqs.length > 0 && (
            <section className="mb-14 border-t border-slate-200 pt-12">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Frequently Asked Questions: {country.country} Resumes
              </h2>
              <div className="space-y-6">
                {country.faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Banner */}
          <section className="rounded-3xl bg-slate-900 p-10 text-center text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-black sm:text-4xl">
              Start Building Your {country.country} Resume Now
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-slate-300">
              No registration fees. No credit card required. 100% free PDF export.
            </p>
            <Link
              href="/builder"
              className="inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-emerald-400"
            >
              Build Free Resume →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
