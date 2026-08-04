import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import CoverLetterInteractive from './CoverLetterInteractive';
import { rolesData, getRoleBySlug } from '@/app/templates/roleData';

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

  const title = `Free ${role.title} Cover Letter Example & Generator (2026)`;
  const description = `Write an interview-winning ${role.title} cover letter in 5 minutes. Includes pre-written opening hooks, achievement paragraphs, and 1-click copy text.`;
  const imageUrl = role.heroImage ? `${siteUrl}${role.heroImage}` : `${siteUrl}/home.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/cover-letter/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/cover-letter/${slug}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: `Free ${role.title} Cover Letter Example`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function RoleCoverLetterPage({ params }) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) {
    notFound();
  }

  const imageUrl = role.heroImage ? `${siteUrl}${role.heroImage}` : `${siteUrl}/home.png`;

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
      {
        '@type': 'ListItem',
        position: 3,
        name: `${role.title} Cover Letter`,
        item: `${siteUrl}/cover-letter/${role.slug}`,
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Free ${role.title} Cover Letter Example & Generator`,
    description: `Write an interview-winning ${role.title} cover letter in 5 minutes.`,
    url: `${siteUrl}/cover-letter/${role.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Resuvix',
      url: siteUrl,
    },
  };

  const imageObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    url: imageUrl,
    caption: `Free ${role.title} Cover Letter Generator Illustration`,
  };

  const relatedRoles = (role.relatedSlugs || [])
    .map((rSlug) => getRoleBySlug(rSlug))
    .filter(Boolean);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={imageObjectSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/cover-letter" className="hover:text-slate-900 transition-colors">Cover Letters</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{role.title} Cover Letter</span>
          </nav>

          {/* Hero Section */}
          <header className="mb-12 border-b border-slate-200 pb-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                  {role.category} • Free Cover Letter Sample
                </span>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  Free {role.title} Cover Letter Generator
                </h1>
                
                {/* GEO Definition Box */}
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-slate-700 leading-relaxed">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                    Recruiter Tip for {role.title} Cover Letters
                  </p>
                  <p className="text-sm text-slate-800">
                    A great {role.title} cover letter should hook the hiring manager in the first 2 sentences by naming the job title, mentioning total years of experience, and citing 1 major quantified achievement matching the position requirements.
                  </p>
                </div>

                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Use this verified {role.title} cover letter template below. Copy the text with 1 click or customize it online for free.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/builder?role=${role.slug}`}
                    className="rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-slate-800"
                  >
                    Build Full Resume & Cover Letter →
                  </Link>
                  <Link
                    href={`/templates/${role.slug}`}
                    className="rounded-xl bg-sky-600 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-sky-500"
                  >
                    View {role.title} Resume Builder
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <Image
                  src={role.heroImage || '/home.png'}
                  alt={role.imageAlt || `${role.title} Cover Letter Example`}
                  width={600}
                  height={338}
                  priority={true}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </header>

          {/* Interactive 1-Click Copy Cover Letter Box */}
          <section className="mb-14">
            <CoverLetterInteractive role={role} />
          </section>

          {/* Role Cover Letter Writing Tips */}
          {role.coverLetterTips && (
            <section className="mb-14 rounded-2xl border border-sky-200 bg-sky-50/50 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                💡 Key Tips for Writing a {role.title} Cover Letter
              </h2>
              <ul className="space-y-3">
                {role.coverLetterTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-800 text-sm leading-relaxed">
                    <span className="text-sky-700 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Bidirectional Linking Grid */}
          <section className="mb-14 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
              Complete {role.title} Application Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href={`/templates/${role.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs hover:border-emerald-500 transition-all"
              >
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">ATS Builder</span>
                <strong className="text-slate-900 text-base block">{role.title} Resume Builder</strong>
                <span className="text-xs text-slate-500 mt-2 block">20+ Recruiter Templates →</span>
              </Link>
              <Link
                href={`/examples/${role.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs hover:border-sky-500 transition-all"
              >
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block mb-1">Verified Sample</span>
                <strong className="text-slate-900 text-base block">{role.title} Resume Example</strong>
                <span className="text-xs text-slate-500 mt-2 block">View Work Experience Bullets →</span>
              </Link>
              <Link
                href={`/builder?role=${role.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs hover:border-slate-900 transition-all"
              >
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Free PDF Export</span>
                <strong className="text-slate-900 text-base block">Create Online Now</strong>
                <span className="text-xs text-slate-500 mt-2 block">Zero Paywall Download →</span>
              </Link>
            </div>
          </section>

          {/* Related Cover Letters */}
          {relatedRoles.length > 0 && (
            <section className="mb-14 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                Explore More Cover Letter Examples
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedRoles.map((relRole) => (
                  <Link
                    key={relRole.slug}
                    href={`/cover-letter/${relRole.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-bold text-slate-800 shadow-xs hover:border-emerald-500 hover:text-emerald-700 transition-all"
                  >
                    {relRole.title} Cover Letter
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Banner */}
          <section className="rounded-3xl bg-slate-900 p-10 text-center text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-black sm:text-4xl">
              Build Your Resume & Cover Letter Now
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-slate-300">
              No registration fees. No credit card required. 100% free PDF download.
            </p>
            <Link
              href={`/builder?role=${role.slug}`}
              className="inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-emerald-400"
            >
              Start Building Free →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
