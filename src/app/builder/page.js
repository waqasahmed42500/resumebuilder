import ClientEditorWrapper from "./ClientEditorWrapper";
import JsonLd from "../Component/SEO/JsonLd";
import { breadcrumbSchema, createMetadata, siteConfig } from "../lib/seo";

const siteUrl = siteConfig.url;

export const metadata = createMetadata({
  title: "Free Online Resume Builder & Professional CV Creator",
  description:
    "Build a job-winning, ATS-friendly resume online for free. Interactive editor, live PDF preview, custom font selection, accent color picker, and instant export.",
  path: "/builder",
  keywords: ["Resume Builder", "Online Resume Builder", "Free Resume Builder", "CV Maker"],
});

export default function BuilderPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resuvix Online Resume Builder",
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

  const builderBreadcrumbSchema = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resume Builder", path: "/builder" },
  ]);

  return (
    <>
      <JsonLd data={webAppSchema} />
      <JsonLd data={builderBreadcrumbSchema} />
      <ClientEditorWrapper />
    </>
  );
}
