import Link from 'next/link';
import TemplateGalleryClient from '../tempelate/TemplateGalleryClient';
import { templatesData } from '../tempelate/templatesData';
import { rolesData } from './roleData';
import JsonLd from '../Component/SEO/JsonLd';
import Header from '../Component/Header';
import Footer from '../Component/Home/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esayresume.netlify.app';

export const metadata = {
  title: '20+ Free ATS Resume Templates & 30+ Industry Role Builders (2026)',
  description:
    'Browse 20+ recruiter-tested, ATS-friendly resume templates and 30+ role-specific resume builders for software engineers, nurses, teachers, accountants, and executives.',
  alternates: {
    canonical: `${siteUrl}/templates`,
  },
  openGraph: {
    title: '20+ Free ATS Resume Templates & Professional CV Designs',
    description:
      'Explore recruiter-tested, ATS-optimized free resume templates and industry role builders. Modern, executive, creative, and minimalist layouts.',
    url: `${siteUrl}/templates`,
  },
};

export default function TemplatesPage() {
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
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free ATS Resume Templates & Role Builders',
    description: 'Recruiter-tested professional resume templates and role-specific resume generators',
    numberOfItems: templatesData.length + rolesData.length,
    itemListElement: [
      ...templatesData.map((tmpl, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: tmpl.title,
        description: tmpl.description,
        url: `${siteUrl}/builder?template=${tmpl.id}`,
      })),
      ...rolesData.map((role, idx) => ({
        '@type': 'ListItem',
        position: templatesData.length + idx + 1,
        name: `${role.title} Resume Builder`,
        description: role.description,
        url: `${siteUrl}/templates/${role.slug}`,
      })),
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <Header />
      <main className="pt-20">
        <TemplateGalleryClient />

        {/* 30 High-Demand Industry Role Builders Grid */}
        <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-12 border-t border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Programmatic ATS Builders
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-3 sm:text-4xl">
                Browse Resume Builders by Profession
              </h2>
              <p className="text-slate-600 mt-2">
                Select your industry role to generate a pre-formatted ATS resume with recruiter-approved skills, summary statements, and bullet points.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rolesData.map((role) => (
                <Link
                  key={role.slug}
                  href={`/templates/${role.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      {role.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 hover:text-emerald-700">
                      {role.title} Resume
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {role.description}
                    </p>
                  </div>
                  <span className="mt-4 text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                    Build {role.title} Resume →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
