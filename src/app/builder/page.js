import Editor from "../Editor/page";
import JsonLd from "../Component/SEO/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easyresume.com";

export const metadata = {
  title: "Free Online Resume Builder & Professional CV Creator",
  description:
    "Build a job-winning, ATS-friendly resume online for free. Interactive editor, live PDF preview, custom font selection, accent color picker, and instant export.",
  keywords: [
    "Resume Builder",
    "Online Resume Builder",
    "Free Resume Maker",
    "Create Resume Online",
    "CV Builder",
    "Resume Creator",
  ],
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "Free Online Resume Builder & Professional CV Creator",
    description:
      "Interactive free online resume builder. Build ATS-tested resumes in minutes and download vector PDFs.",
    url: "/builder",
  },
};

export default function BuilderPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EasyResume Online Resume Builder",
    url: `${siteUrl}/builder`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Online resume builder tool with live preview, ATS templates, customizable styling, and instant PDF download.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resume Builder",
        item: `${siteUrl}/builder`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Editor />
    </>
  );
}
