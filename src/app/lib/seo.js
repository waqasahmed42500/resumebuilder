export const siteConfig = {
  name: "Resuvix",
  url: "https://resuvix.com",
  title: "Resuvix – Free ATS Resume Builder, Professional CV Maker & Resume Templates",
  description:
  "Create ATS-friendly resumes online with Resuvix. Use free professional resume templates, build a modern CV, customize your resume, and download high-quality PDF resumes instantly. No signup or credit card required.",
  socialImage: "/home.png",
  themeColor: "#0f172a",
  twitterHandle: "@resuvix",
};

export const seoKeywords = [
  "Resume Builder",
  "CV Builder",
  "Online Resume Builder",
  "Free Resume Builder",
  "Professional Resume Builder",
  "CV Maker",
  "ATS Resume Builder",
  "Resume Maker",
  "Resume Templates",
  "CV Templates",
  "Resume Creator",
  "Job Resume Builder",
  "AI Resume Builder",
  "Resume PDF Download",
  "ATS Friendly Resume",
  "Resume Generator",
"Online CV Maker",
"Free CV Builder",
"Resume Creator Online",
"Modern Resume Templates",
"Professional CV Templates",
"Resume Design",
"Editable Resume",
"PDF Resume Maker",
"Job Winning Resume",
"Simple Resume Builder",
"Best Resume Builder",
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = [],
  image = siteConfig.socialImage,
  type = "website",
  robots = { index: true, follow: true },
} = {}) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...new Set([...seoKeywords, ...keywords])],
    alternates: {
      canonical,
    },
    robots: {
      ...robots,
      googleBot: {
        index: robots.index !== false,
        follow: robots.follow !== false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Resuvix Free ATS Resume Builder and Professional CV Maker"
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs = []) {
  if (!faqs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createBlogMetadata({ post, siteUrl = siteConfig.url }) {
  const canonical = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = `${siteUrl}${post.featuredImage}`;

  return {
    title: post.seoTitle || `${post.title} | Resuvix Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: [...new Set([...seoKeywords, post.focusKeyword, ...post.relatedKeywords])],
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      url: canonical,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      section: post.category,
      tags: post.relatedKeywords,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: post.imageAlt || post.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
    other: {
      'article:published_time': post.publishDate,
      'article:modified_time': post.modifiedDate,
      'article:author': post.author,
      'article:section': post.category,
      'twitter:label1': 'Reading time',
      'twitter:data1': post.readTime,
      'twitter:label2': 'Written by',
      'twitter:data2': post.author,
    },
  };
}

export function articleSchema({ post, siteUrl = siteConfig.url }) {
  const canonical = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = `${siteUrl}${post.featuredImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 675,
      caption: post.imageCaption || post.imageAlt,
    },
    datePublished: post.publishDate,
    dateModified: post.modifiedDate || post.publishDate,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Resuvix',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    wordCount: post.wordCount,
    inLanguage: 'en-US',
    keywords: post.relatedKeywords?.join(', '),
    articleSection: post.category,
  };
}
