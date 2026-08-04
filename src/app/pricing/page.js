import Link from "next/link";
import Header from "../Component/Header";
import Footer from "../Component/Home/footer";
import JsonLd from "../Component/SEO/JsonLd";
import { breadcrumbSchema, createMetadata } from "../lib/seo";

export const metadata = createMetadata({
  title: "Pricing - Free Resume Builder With PDF Download",
  description:
    "Resuvix is a free online resume builder with ATS resume templates, CV maker tools, and resume PDF download without credit card requirements.",
  path: "/pricing",
  keywords: ["Free Resume Builder", "Resume PDF Download", "Online Resume Builder"],
});

const features = [
  "ATS resume builder",
  "20+ professional resume templates",
  "Resume PDF download",
  "Cover letter builder",
  "Role-specific resume examples",
  "Client-side draft storage",
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <section className="mx-auto max-w-5xl">
          <header className="border-b border-slate-200 pb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
              Simple Pricing
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Free Resume Builder Pricing
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
              Build, customize, and download professional resumes for free. No trial trap, no credit card, and no paywall at export.
            </p>
          </header>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Resuvix Free
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Everything needed to create an ATS-friendly professional resume online.
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-5xl font-black text-slate-900">$0</p>
                <p className="text-sm font-semibold text-slate-500">forever</p>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-800" aria-hidden="true">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/builder" className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800">
                Build Resume Free
              </Link>
              <Link href="/templates" className="rounded-xl bg-slate-200 px-6 py-3 text-sm font-bold text-slate-800 hover:bg-slate-300">
                Browse Templates
              </Link>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
