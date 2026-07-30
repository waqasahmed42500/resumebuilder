import Link from 'next/link';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import { blogPostsData } from './blogPostsData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esayresume.netlify.app';

export const metadata = {
  title: 'Resume Advice, ATS Optimization Guides & Career Blog | EasyResume',
  description: 'Expert career advice, ATS optimization strategies, resume formatting guides, and job search tips to help you land your dream job fast.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'EasyResume Career Blog & ATS Guides',
    description: 'Master ATS screening, resume formatting, and job applications with expert guides.',
    url: `${siteUrl}/blog`,
  },
};

export default function BlogIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
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
              Career & ATS Insights
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              EasyResume Career Blog
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Actionable guides on passing ATS scanners, writing recruiter-tested bullet points, and optimizing your job application strategy.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPostsData.map((post) => (
              <article key={post.slug} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">
                    {post.category} • {post.readTime}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-emerald-700">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.publishDate}</span>
                  <Link href={`/blog/${post.slug}`} className="font-bold text-slate-900 hover:text-emerald-600">
                    Read Article →
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
