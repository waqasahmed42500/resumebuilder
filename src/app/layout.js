import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "./context/ResumeContext";
import JsonLd from "./Component/SEO/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://esayresume.netlify.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Free Resume Builder & ATS Resume Maker | EasyResume",
    template: "%s | EasyResume",
  },
  description:
    "Build a free ATS resume in 5 minutes. Choose from 20+ professional resume templates, customize with our online resume maker, and download a pixel-perfect PDF — no credit card required.",
  keywords: [
    "Resume Builder",
    "Free Resume Builder",
    "ATS Resume Builder",
    "Online Resume Maker",
    "Professional Resume Builder",
    "AI Resume Builder",
    "Resume Templates",
    "CV Builder",
    "Free CV Maker",
    "ATS Resume Checker",
    "Resume Generator",
    "Resume Creator",
    "Free Resume Download PDF",
    "ATS Friendly Resume",
    "Resume Builder Free",
    "Best Resume Builder",
    "Online CV Maker",
    "Resume Maker",
  ],
  authors: [{ name: "EasyResume Team" }],
  creator: "EasyResume",
  publisher: "EasyResume",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Free Resume Builder & ATS Resume Maker | EasyResume",
    description:
      "Build a free ATS resume in 5 minutes. 20+ professional resume templates, live editor, instant PDF download — no paywall, no signup.",
    url: siteUrl,
    siteName: "EasyResume",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/home.png",
        width: 1200,
        height: 630,
        alt: "EasyResume — Free Online ATS Resume Builder with 20+ Professional Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder & ATS Resume Maker | EasyResume",
    description:
      "Build a free ATS resume in 5 minutes. 20+ professional resume templates, live editor, instant PDF download — no paywall, no signup.",
    images: ["/home.png"],
    creator: "@easyresume",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }) {
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "EasyResume",
        url: siteUrl,
        // Full ImageObject for logo — required for Google Knowledge Panel eligibility
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icon.png`,
          width: 512,
          height: 512,
        },
        description:
          "EasyResume is a free online platform for building recruiter-tested, ATS-friendly professional resumes and CVs.",
        sameAs: [
          "https://twitter.com/easyresume",
          "https://linkedin.com/company/easyresume",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "EasyResume",
        description: "Free ATS Resume Builder & Professional CV Maker",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        // SearchAction enables Google Sitelinks Search Box
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/templates?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#webapp`,
        name: "EasyResume Resume Builder",
        url: siteUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free — no subscription, no credit card required",
        },
        description:
          "Free online resume builder with 20+ ATS-optimized templates, live custom styling, and PDF download.",
        featureList: [
          "20+ ATS-Optimized Resume Templates",
          "Live Online Resume Editor",
          "Free PDF Download — No Paywall",
          "100% Client-Side Privacy",
          "30+ Profession-Specific Resume Builders",
          "Cover Letter Generator",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={globalSchema} />
        {/* Preconnect to external image CDN used in hero + template cards — improves LCP */}
        <link
          rel="preconnect"
          href="https://lh3.googleusercontent.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
