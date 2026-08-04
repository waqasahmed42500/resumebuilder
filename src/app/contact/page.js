import Link from "next/link";
import Header from "../Component/Header";
import Footer from "../Component/Home/footer";
import JsonLd from "../Component/SEO/JsonLd";
import { breadcrumbSchema, createMetadata } from "../lib/seo";

export const metadata = createMetadata({
  title: "Contact Resuvix",
  description:
    "Contact Resuvix for resume builder support, ATS resume template feedback, partnership questions, and privacy requests.",
  path: "/contact",
  keywords: ["Resume Builder Support", "ATS Resume Builder", "Professional Resume"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <section className="mx-auto max-w-4xl">
          <header className="border-b border-slate-200 pb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
              Contact
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Contact Resuvix
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Questions about the resume builder, templates, PDF export, or privacy can be sent through the support channel below.
            </p>
          </header>

          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Support</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                For product support, template feedback, and resume PDF download questions, email the Resuvix team.
              </p>
              <a
                href="mailto:support@resuvix.example"
                className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
              >
                Email Support
              </a>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Self-Service</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Need a faster path? Start with templates, ATS guidance, or the free builder.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/builder" className="text-sm font-bold text-sky-700 underline underline-offset-4">
                  Resume Builder
                </Link>
                <Link href="/ats-resume-builder" className="text-sm font-bold text-sky-700 underline underline-offset-4">
                  ATS Guide
                </Link>
                <Link href="/blog" className="text-sm font-bold text-sky-700 underline underline-offset-4">
                  Blog
                </Link>
              </div>
            </article>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
