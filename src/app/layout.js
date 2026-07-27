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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easyresume.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free Resume Builder & ATS Resume Maker | EasyResume",
    template: "%s | EasyResume",
  },
  description:
    "Build job-winning, ATS-friendly resumes for free in minutes. Choose from 20+ recruiter-tested professional templates, customize online, and download pixel-perfect PDFs.",
  keywords: [
    "Resume Builder",
    "Free Resume Builder",
    "ATS Resume Builder",
    "Resume Templates",
    "Professional Resume Maker",
    "Online Resume Builder",
    "CV Builder",
    "Resume Creator",
    "Resume Download PDF",
    "ATS Friendly Resume",
  ],
  authors: [{ name: "EasyResume Team" }],
  creator: "EasyResume",
  publisher: "EasyResume",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Resume Builder & ATS Resume Maker | EasyResume",
    description:
      "Create professional, ATS-optimized resumes in minutes. 20+ designer templates, live PDF preview, 100% free export.",
    url: siteUrl,
    siteName: "EasyResume",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/home.png",
        width: 1200,
        height: 630,
        alt: "EasyResume - Free Online ATS Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder & ATS Resume Maker | EasyResume",
    description:
      "Create professional, ATS-optimized resumes in minutes. 20+ designer templates, live PDF preview, 100% free export.",
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
        logo: `${siteUrl}/favicon.ico`,
        description:
          "EasyResume is an online platform for building recruiter-tested, ATS-friendly professional resumes and CVs.",
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
        description: "Free ATS Resume Builder & Professional CV Creator",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
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
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Free online resume builder with 20+ ATS-optimized templates, live custom styling, and PDF download.",
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
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
