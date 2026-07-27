import Link from "next/link";
import Image from "next/image";
import Header from "../Component/Header";
import Footer from "../Component/Home/footer";
import JsonLd from "../Component/SEO/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easyresume.com";

export const metadata = {
  title: "Professional Resume Examples & Samples by Industry",
  description:
    "Browse recruiter-approved professional resume examples for Software Engineers, Marketing Managers, UX Designers, and Executives. Copy proven structures and land job interviews.",
  keywords: [
    "Resume Examples",
    "Professional Resume Samples",
    "Software Engineer Resume Example",
    "Marketing Resume Sample",
    "UX Designer Resume Format",
    "ATS Resume Examples",
  ],
  alternates: {
    canonical: "/examples",
  },
  openGraph: {
    title: "Professional Resume Examples & Samples by Industry",
    description:
      "Real industry-tailored resume examples with proven achievement bullets and ATS-friendly layouts.",
    url: "/examples",
  },
};

const examples = [
  {
    title: "Software Engineer",
    description: "A modern, accomplishment-focused layout built for technical roles, full-stack developers, and tech leads.",
    tag: "Tech & Engineering",
    img: "/images/software enginer.png",
    alt: "Software engineer professional resume example template design",
  },
  {
    title: "Marketing Manager",
    description: "A polished, result-driven format designed to highlight digital campaigns, leadership, and growth metrics.",
    tag: "Marketing & Sales",
    img: "/images/marketing.png",
    alt: "Marketing manager ATS resume sample design",
  },
  {
    title: "UX Designer",
    description: "A visually rich template that balances portfolio case study storytelling with clear typography structure.",
    tag: "Design & Product",
    img: "/images/desinger.png",
    alt: "UX UI designer creative resume example template design",
  },
];

export default function ExamplesPage() {
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
        name: "Resume Examples",
        item: `${siteUrl}/examples`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Professional Resume Examples",
    description: "Industry-specific resume examples for software, marketing, and design",
    itemListElement: examples.map((ex, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: ex.title,
      description: ex.description,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
              Industry Resume Examples
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Professional Resume Examples for Every Career Path
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Browse recruiter-tested resume examples tailored for technology, marketing, design, and executive roles. Learn how to highlight key accomplishments and structure your experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {examples.map((example) => (
              <article key={example.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {example.tag}
                  </span>
                  <div className="relative mt-4 h-64 w-full overflow-hidden rounded-xl bg-slate-100">
                    {example.img && (
                      <Image
                        src={example.img}
                        alt={example.alt}
                        fill
                        className="object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-slate-900">{example.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{example.description}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/templates"
                    className="inline-flex items-center text-sm font-bold text-slate-900 underline decoration-emerald-600 underline-offset-4 hover:text-emerald-700"
                  >
                    View Matching Templates →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
