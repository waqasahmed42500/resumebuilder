import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "./context/ResumeContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import JsonLd from "./Component/SEO/JsonLd";
import { seoKeywords, siteConfig } from "./lib/seo";

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

const siteUrl = siteConfig.url;

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Resuvix – Free Resume Builder, ATS Resume Maker & Professional CV Builder",
    template: "%s | Resuvix",
  },
  description:
    "Create a professional ATS-friendly resume online with Resuvix. Use free resume templates, build a modern CV in minutes, customize your resume, and download high-quality PDF resumes for free. No signup or credit card required.",
  keywords: seoKeywords,
  authors: [{ name: "Resuvix Team" }],
  creator: "Resuvix",
  publisher: "Resuvix",

    other: {
    "google-adsense-account": "ca-pub-5103683580698340",
  },
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Free Resume Builder & ATS Resume Maker | Resuvix",
    description:
      "Build a free ATS resume in 5 minutes. 20+ professional resume templates, live editor, instant PDF download - no paywall, no signup.",
    url: siteUrl,
    siteName: "Resuvix",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/home.png",
        width: 1200,
        height: 630,
        alt: "Resuvix free online ATS resume builder with professional templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder & ATS Resume Maker | Resuvix",
    description:
      "Build a free ATS resume in 5 minutes. 20+ professional resume templates, live editor, instant PDF download - no paywall, no signup.",
    images: ["/home.png"],
    creator: siteConfig.twitterHandle,
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
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }) {
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Resuvix",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icon.png`,
          width: 512,
          height: 512,
        },
        description:
          "Resuvix is a free online platform for building recruiter-tested, ATS-friendly professional resumes and CVs.",
        sameAs: [
          "https://twitter.com/resuvix",
          "https://linkedin.com/company/resuvix",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Resuvix",
        description: "Free ATS Resume Builder & Professional CV Maker",
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
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "Resuvix Resume Builder",
        url: siteUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript and HTML5.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free - no subscription, no credit card required",
        },
        description:
          "Free online resume builder with ATS-optimized templates, live custom styling, and PDF download.",
        featureList: [
          "ATS-optimized resume templates",
          "Live online resume editor",
          "Free resume PDF download",
          "Client-side privacy",
          "Profession-specific resume builders",
          "Cover letter generator",
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
        {/* SEO/CWV: Preconnect to the remote image origin used above the fold to improve LCP. */}
        <link
          rel="preconnect"
          href="https://lh3.googleusercontent.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        {/* SEO: Google Search Console placeholder. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in production. */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        ) : null}
        {/* Analytics: GA4 placeholder. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in production. */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { anonymize_ip: true });
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <ResumeProvider><PortfolioProvider>{children}</PortfolioProvider></ResumeProvider>
      </body>
    </html>
  );
}
