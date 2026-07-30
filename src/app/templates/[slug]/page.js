import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import AtsScoreMeter from '@/app/Component/SEO/AtsScoreMeter';
import { rolesData, getRoleBySlug } from '../roleData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esayresume.netlify.app';

export async function generateStaticParams() {
  return rolesData.map((role) => ({
    slug: role.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) return {};

  const imageUrl = role.heroImage ? `${siteUrl}${role.heroImage}` : `${siteUrl}/home.png`;

  return {
    title: role.seoTitle || `Free ${role.title} Resume Builder & Examples (2026)`,
    description: role.metaDescription || `Build an ATS-optimized ${role.title} resume in 5 minutes. Includes recruiter-tested skills, pre-written bullet points, and 100% free PDF download.`,
    alternates: {
      canonical: `${siteUrl}/templates/${slug}`,
    },
    openGraph: {
      title: role.seoTitle || `Free ${role.title} Resume Builder | EasyResume`,
      description: role.metaDescription,
      url: `${siteUrl}/templates/${slug}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: role.imageAlt || `Free ${role.title} Resume Builder`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: role.seoTitle,
      description: role.metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function RoleResumeBuilderPage({ params }) {
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
        name: 'Templates',
        item: `${siteUrl}/templates`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${role.title} Resume Builder`,
        item: `${siteUrl}/templates/${role.slug}`,
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: role.seoTitle,
    description: role.metaDescription,
    url: `${siteUrl}/templates/${role.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'EasyResume',
      url: siteUrl,
    },
  };

  const imageObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    url: imageUrl,
    caption: role.imageAlt || `Free ${role.title} Resume Builder Vector Illustration`,
    description: role.metaDescription,
  };

  const faqSchema = role.faqs && role.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: role.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const relatedRoles = (role.relatedSlugs || [])
    .map((rSlug) => getRoleBySlug(rSlug))
    .filter(Boolean);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={imageObjectSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb Visual Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-slate-900 transition-colors">Templates</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800">{role.title} Resume</span>
          </nav>

          {/* Hero Section with AI Hero Illustration */}
          <header className="mb-12 border-b border-slate-200 pb-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                  {role.category} • Recruiter Approved
                </span>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  Free {role.title} Resume Builder
                </h1>
                
                {/* GEO Direct Answer Definition Block */}
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-slate-700 leading-relaxed">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                    ATS Screening Summary for {role.title} Resumes
                  </p>
                  <p className="text-sm text-slate-800">
                    An ATS-friendly {role.title} resume uses recruiter-tested section titles, standard single-column text formatting, and vector PDF encoding. This ensures 100% keyword parsing accuracy across Applicant Tracking Systems like Taleo, Workday, Greenhouse, and Lever.
                  </p>
                </div>

                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  {role.description} Designed for <strong className="text-slate-900">{role.experienceLevel}</strong> positions with an average national salary of <strong className="text-slate-900">{role.averageSalary}</strong>.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/builder?role=${role.slug}`}
                    className="rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-slate-800"
                  >
                    Build My {role.title} Resume Now
                  </Link>
                  <Link
                    href={`/examples/${role.slug}`}
                    className="rounded-xl bg-sky-600 px-8 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-sky-500"
                  >
                    View {role.title} Example →
                  </Link>
                </div>
              </div>

              {/* Optimized Hero Image Component */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <Image
                  src={role.heroImage || '/home.png'}
                  alt={role.imageAlt || `${role.title} Resume Builder illustration`}
                  width={600}
                  height={338}
                  priority={true}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </header>

          {/* Interactive Real-Time ATS Score Meter Gauge */}
          <section className="mb-14">
            <AtsScoreMeter 
              resumeData={{
                contact: { fullName: 'Candidate Name', email: 'candidate@email.com', phone: '(555) 019-2834', location: 'City, State' },
                summary: role.summary,
                experiences: role.bulletPoints.map((b, i) => ({ id: `exp-${i}`, description: b })),
                skills: role.skills,
                education: [{ id: 1, degree: 'Bachelor Degree' }]
              }} 
              selectedRole={role.title} 
            />
          </section>

          {/* Deep Content Guide Section (600-1000 Words) */}
          <section className="mb-14 space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900">
              How to Write an ATS-Friendly {role.title} Resume
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              {role.overview.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-base text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Sample Professional Summary */}
          <section className="mb-14 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Recruiter-Approved {role.title} Professional Summary Example
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Copy and adapt this industry-tested summary statement into your resume:
            </p>
            <blockquote className="border-l-4 border-emerald-500 bg-slate-50 p-5 rounded-r-xl italic text-slate-800 leading-relaxed text-base">
              &quot;{role.summary}&quot;
            </blockquote>
          </section>

          {/* Key ATS Keywords & Skills Grid */}
          <section className="mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Top ATS Keywords & Core Skills for {role.title} Resumes
            </h2>
            <p className="text-slate-600 mb-6">
              Applicant Tracking Systems match your candidate profile against job description terminology. Include these technical and functional skills on your {role.title} resume:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {role.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-xs flex items-center gap-2 hover:border-emerald-400"
                >
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Quantified Work Experience Bullets */}
          <section className="mb-14 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Quantified {role.title} Experience Bullet Points
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Use these action-oriented, metrics-backed bullet points to showcase your achievements:
            </p>
            <ul className="space-y-4">
              {role.bulletPoints.map((bullet, idx) => (
                <li key={idx} className="flex gap-3 text-slate-700 text-base leading-relaxed">
                  <span className="text-emerald-600 font-bold text-lg">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ATS Formatting Guidelines */}
          {role.atsFormattingTips && (
            <section className="mb-14 rounded-2xl border border-sky-200 bg-sky-50/50 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>🛡️</span> ATS Formatting Rules for {role.title} Resumes
              </h2>
              <ul className="space-y-3">
                {role.atsFormattingTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-800 text-sm leading-relaxed">
                    <span className="text-sky-700 font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Key Sections Breakdown */}
          {role.keySectionsGuide && (
            <section className="mb-14 space-y-6">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Step-by-Step {role.title} Resume Section Breakdown
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">1. Contact Header</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{role.keySectionsGuide.header}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">2. Professional Summary</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{role.keySectionsGuide.summary}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">3. Work Experience</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{role.keySectionsGuide.experience}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">4. Education & Credentials</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{role.keySectionsGuide.education}</p>
                </div>
              </div>
            </section>
          )}

          {/* Internal Links to Related Role Pages */}
          {relatedRoles.length > 0 && (
            <section className="mb-14 border-t border-slate-200 pt-10">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                Explore Related Profession Resume Builders
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedRoles.map((relRole) => (
                  <Link
                    key={relRole.slug}
                    href={`/templates/${relRole.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-bold text-slate-800 shadow-xs hover:border-emerald-500 hover:text-emerald-700 transition-all"
                  >
                    {relRole.title} Resume
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQs Section */}
          {role.faqs && role.faqs.length > 0 && (
            <section className="mb-14 border-t border-slate-200 pt-12">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Frequently Asked Questions: {role.title} Resumes
              </h2>
              <div className="space-y-6">
                {role.faqs.map((faq, idx) => (
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
              Create Your {role.title} Resume Today
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-slate-300">
              No registration required. Instant vector PDF download. 100% free forever.
            </p>
            <Link
              href={`/builder?role=${role.slug}`}
              className="inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-900 transition-all hover:bg-emerald-400"
            >
              Build My {role.title} Resume Free →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
