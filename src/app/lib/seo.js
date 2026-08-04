export const siteConfig = {
  name: "EasyResume",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://geteasyresume.netlify.app",
  title: "EasyResume | Free AI Resume Builder",
  description:
    "Build an ATS-friendly professional resume online for free with AI-guided sections, recruiter-tested templates, and instant PDF download.",
  socialImage: "/home.png",
  themeColor: "#0f172a",
  twitterHandle: "@easyresume",
};

export const seoKeywords = [
  "AI Resume Builder",
  "Resume Builder",
  "ATS Resume Builder",
  "CV Maker",
  "Resume Templates",
  "Resume Generator",
  "Professional Resume",
  "Online Resume Builder",
  "Free Resume Builder",
  "Resume PDF Download",
  "ATS Friendly Resume",
  "Resume Maker",
  "CV Builder",
  "Free Resume Download PDF",
  "Professional Resume Templates",
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
          alt: `${siteConfig.name} resume builder preview`,
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
