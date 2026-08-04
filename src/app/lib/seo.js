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
