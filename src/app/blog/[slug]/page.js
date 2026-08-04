import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import { blogPostsData, getBlogPostBySlug } from '../blogPostsData';
import { seoKeywords } from '@/app/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://resuvix.com';

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  const imageUrl = post.featuredImage ? `${siteUrl}${post.featuredImage}` : `${siteUrl}/home.png`;

  return {
    title: `${post.title} | Resuvix Blog`,
    description: post.excerpt,
    keywords: [...seoKeywords, post.category, 'Resume Blog', 'ATS Resume Guide'],
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.featuredImage ? `${siteUrl}${post.featuredImage}` : `${siteUrl}/home.png`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Resuvix',
      url: siteUrl,
    },
    image: imageUrl,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  const faqSchema = post.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const imageObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    url: imageUrl,
    caption: post.imageAlt || post.title,
    description: post.excerpt,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={imageObjectSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <article className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-900">Blog</Link>
            <span>/</span>
            <span className="font-semibold text-slate-800 truncate max-w-xs">{post.title}</span>
          </nav>

          <header className="mb-10 border-b border-slate-200 pb-8">
            <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
              {post.category}
            </span>
            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl leading-tight">
              {post.title}
            </h1>
            
            {/* E-E-A-T Author & Reviewer Badge */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <span>Written by <strong>{post.author}</strong></span>
                <span className="mx-2">•</span>
                <span>Published: {post.publishDate}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <div className="ml-auto text-emerald-700 font-bold flex items-center gap-1">
                ✓ Reviewed by Certified Resume Writer
              </div>
            </div>

            {/* Optimized Next.js Featured Image */}
            <div className="mt-8 relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <Image
                src={post.featuredImage || '/home.png'}
                alt={post.imageAlt || post.title}
                width={1200}
                height={675}
                priority={true}
                className="w-full h-auto object-cover"
              />
            </div>
          </header>

          {/* Body Content */}
          <div 
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Box */}
          <div className="mt-14 rounded-3xl bg-slate-900 p-8 text-center text-white shadow-xl">
            <h3 className="text-2xl font-black mb-3">Ready to Build Your ATS Resume?</h3>
            <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
              Test your resume formatting against recruiter-approved standards with Resuvix.
            </p>
            <Link
              href="/builder"
              className="inline-block rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-emerald-400"
            >
              Build Resume Free Now
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
