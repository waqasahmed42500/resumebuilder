import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import { blogPostsData, getBlogPostBySlug } from '../blogPostsData';
import { createBlogMetadata, articleSchema, faqSchema, breadcrumbSchema } from '@/app/lib/seo';
import TableOfContents from '@/app/Component/Blog/TableOfContents';
import ReadingProgressBar from '@/app/Component/Blog/ReadingProgressBar';
import FAQAccordion from '@/app/Component/Blog/FAQAccordion';
import SocialShareButtons from '@/app/Component/Blog/SocialShareButtons';
import RelatedPosts from '@/app/Component/Blog/RelatedPosts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resuvix.com';

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return createBlogMetadata({ post });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.featuredImage ? `${siteUrl}${post.featuredImage}` : `${siteUrl}/home.png`;

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  const article = articleSchema({ post });

  const faq = post.faqs?.length ? faqSchema(post.faqs) : null;

  const imageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    url: imageUrl,
    width: 1200,
    height: 675,
    caption: post.imageCaption || post.imageAlt || post.title,
    description: post.excerpt,
    name: post.imageTitle || post.title,
  };

  return (
    <>
      <ReadingProgressBar />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={article} />
      <JsonLd data={imageObject} />
      {faq && <JsonLd data={faq} />}
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <article className="mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm font-medium text-slate-500 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <span className="text-slate-400">/</span>
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 truncate max-w-[200px] sm:max-w-sm md:max-w-md" title={post.title}>
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800">
              {post.category}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              {post.title}
            </h1>
            
            {/* E-E-A-T Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden relative border border-slate-300">
                    <Image src="/home.png" alt={post.author} fill className="object-cover" />
                  </div>
                  <span className="text-slate-900 font-bold">{post.author}</span>
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span>{post.publishDate}</span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span>{post.readTime}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Reviewed by Certified Resume Writer
              </div>
            </div>

            {/* Featured Image */}
            <div className="mt-8 relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200/60 bg-white group">
              <Image
                src={post.featuredImage || '/home.png'}
                alt={post.imageAlt || post.title}
                width={1200}
                height={675}
                priority={true}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </header>

          <div className="flex gap-10 lg:gap-14">
            {/* Sticky TOC sidebar - hidden on mobile */}
            <aside className="hidden lg:block lg:w-72 shrink-0">
              <div className="sticky top-28">
                <TableOfContents items={post.tableOfContents} />
              </div>
            </aside>
            
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
              
              {/* Social shares */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <SocialShareButtons url={`${siteUrl}/blog/${post.slug}`} title={post.title} description={post.excerpt} />
              </div>
              
              {/* FAQ Section */}
              {post.faqs?.length > 0 && (
                <section className="mt-16 pt-12 border-t border-slate-200">
                  <FAQAccordion faqs={post.faqs} />
                </section>
              )}

              {/* CTA Box */}
              <div className="mt-16 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-12 text-center text-white shadow-2xl overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black mb-4">Ready to Build Your ATS Resume?</h3>
                  <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed">
                    Test your resume formatting against recruiter-approved standards with Resuvix's free online builder.
                  </p>
                  <Link href="/builder" className="inline-block rounded-xl bg-emerald-500 px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5">
                    Build Resume Free Now →
                  </Link>
                </div>
              </div>

              {/* Related Posts */}
              <section className="mt-20 pt-16 border-t border-slate-200">
                <RelatedPosts currentSlug={post.slug} posts={blogPostsData} />
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
