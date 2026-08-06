import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import BlogCard from '@/app/Component/Blog/BlogCard';
import { blogPostsData } from './blogPostsData';
import { createMetadata } from '../lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resuvix.com';

export const metadata = createMetadata({
  title: 'Resume Tips, ATS Optimization Guides & Career Blog | Resuvix',
  description: 'Expert career advice, ATS resume optimization strategies, resume formatting guides, and free job search tips from Resuvix.',
  path: '/blog',
  keywords: ['Resume Tips', 'ATS Resume Guide', 'Career Blog', 'Resume Formatting', 'Job Search Tips'],
});

export default function BlogIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Resuvix Career Blog',
    description: 'Expert career advice, ATS resume optimization strategies, resume formatting guides, and free job search tips from Resuvix.',
    url: `${siteUrl}/blog`,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 pb-24 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-50 to-white px-4 py-16 sm:px-6 lg:px-12 mb-12">
          <div className="mx-auto max-w-6xl text-center">
            <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-800 shadow-sm">
              Career & ATS Insights
            </span>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Resuvix Career Blog
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl leading-relaxed">
              Actionable guides on passing ATS scanners, writing recruiter-tested bullet points, and optimizing your job application strategy.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {blogPostsData.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
