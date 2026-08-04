import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import { rolesData, getRoleBySlug } from '../../templates/roleData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resuvix.com';

export async function generateStaticParams() {
  return rolesData.map((role) => ({
    slug: role.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) return {};

  return {
    title: `${role.title} Resume Example & Writing Guide (2026)`,
    description: `View a verified ${role.title} resume example with recruiter-tested bullet points, top ATS skills, and summary statement. Copy and customize online for free.`,
    alternates: {
      canonical: `${siteUrl}/examples/${slug}`,
    },
    openGraph: {
      title: `${role.title} Resume Example | Resuvix`,
      description: `Real ${role.title} resume sample with recruiter-tested bullet points and top ATS skills. Customize and export free PDF.`,
      url: `${siteUrl}/examples/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${role.title} Resume Example & Writing Guide`,
      description: `Verified ${role.title} resume example with top ATS skills and bullet points.`,
    },
  };
}

export default async function RoleResumeExamplePage({ params }) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) {
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
        name: 'Examples',
        item: `${siteUrl}/examples`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${role.title} Resume Example`,
        item: `${siteUrl}/examples/${role.slug}`,
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${role.title} Resume Example & Writing Guide`,
    description: `View a verified ${role.title} resume example with recruiter-tested bullet points, top ATS skills, and summary statement.`,
    url: `${siteUrl}/examples/${role.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Resuvix',
      url: siteUrl,
    },
  };

  const relatedRoles = (role.relatedSlugs || [])
    .map((rSlug) => getRoleBySlug(rSlug))
    .filter(Boolean);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/examples" className="hover:text-slate-900 transition-colors">Examples</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{role.title} Sample</span>
          </nav>

          {/* Header with Hero Image */}
          <header className="mb-12 border-b border-slate-200 pb-10">
            {role.heroImage && (
              <div className="relative mb-8 w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={role.heroImage}
                  alt={role.imageAlt || `${role.title} resume example`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                  <span className="mb-2 inline-block rounded-full bg-sky-400/90 backdrop-blur-sm px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-slate-900 w-fit">
                    Sample Resume &amp; Writing Guide
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow">
                    {role.title} Resume Example
                  </h1>
                </div>
              </div>
            )}

            {!role.heroImage && (
              <>
                <span className="mb-3 inline-block rounded-full bg-sky-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-sky-800">
                  Sample Resume &amp; Writing Guide
                </span>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  {role.title} Resume Example
                </h1>
              </>
            )}

            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Use this verified {role.title} resume sample as a blueprint to format your own application. Designed according to modern ATS screening parameters and recruiter preferences.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/builder?role=${role.slug}&template=${role.template || 'resume1'}`}
                className="rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-slate-800"
              >
                Use This {role.title} Example →
              </Link>
              <Link
                href={`/templates/${role.slug}`}
                className="rounded-xl bg-slate-200 px-8 py-4 text-base font-bold text-slate-800 transition-all hover:bg-slate-300"
              >
                View {role.title} Builder Guide
              </Link>
            </div>
          </header>

          {/* Visual Resume Sample Mockup Card */}
          <article className="mb-14 rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
            <div className="border-b border-slate-200 pb-6 mb-6">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                Alex Morgan
              </h2>
              <p className="text-lg font-bold text-emerald-700">{role.title}</p>
              <p className="text-sm text-slate-500 mt-1">
                New York, NY • (555) 019-2834 • alex.morgan@email.com • linkedin.com/in/alex-morgan
              </p>
            </div>

            {/* Summary Mock */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                {role.summary}
              </p>
            </div>

            {/* Experience Mock */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                WORK EXPERIENCE
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline text-sm">
                    <strong className="text-slate-900 font-bold">Senior {role.title}</strong>
                    <span className="text-slate-500">2021 – Present</span>
                  </div>
                  <p className="text-xs text-slate-500 italic mb-2">Apex Global Solutions | New York, NY</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                    {role.bulletPoints.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills Mock */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                CORE SKILLS & TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill, i) => (
                  <span key={i} className="rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Related Role Examples */}
          {relatedRoles.length > 0 && (
            <section className="mb-14 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                More Industry Resume Examples
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedRoles.map((relRole) => (
                  <Link
                    key={relRole.slug}
                    href={`/examples/${relRole.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-bold text-slate-800 shadow-xs hover:border-sky-500 hover:text-sky-700 transition-all"
                  >
                    {relRole.title} Example
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Action CTA */}
          <section className="rounded-3xl bg-slate-900 p-10 text-center text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-black sm:text-4xl">
              Customize This {role.title} Resume
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-slate-300">
              Edit online, test ATS compliance in real time, and export vector PDF for free.
            </p>
            <Link
              href={`/builder?role=${role.slug}&template=${role.template || 'resume1'}`}
              className="inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-emerald-400"
            >
              Customize This Example Now
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
