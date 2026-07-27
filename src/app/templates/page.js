import TemplateGalleryClient, { templatesData } from "../tempelate/TemplateGalleryClient";
import JsonLd from "../Component/SEO/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://resumearchitect.com";

export const metadata = {
  title: "20+ Free ATS Resume Templates & Professional CV Designs",
  description:
    "Browse 20 recruiter-tested, ATS-friendly resume templates. Designed for software engineers, marketing managers, executives, and creative professionals.",
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: "20+ Free ATS Resume Templates & Professional CV Designs",
    description:
      "Explore 20 recruiter-tested, ATS-optimized free resume templates. Modern, executive, creative, and minimalist layouts.",
    url: "/templates",
  },
};

export default function TemplatesPage() {
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
        name: "Templates",
        item: `${siteUrl}/templates`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free ATS Resume Templates",
    description: "20 Recruiter-tested professional resume and CV templates",
    numberOfItems: templatesData.length,
    itemListElement: templatesData.map((tmpl, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: tmpl.title,
      description: tmpl.description,
      url: `${siteUrl}/builder?template=${tmpl.id}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <TemplateGalleryClient />
    </>
  );
}
