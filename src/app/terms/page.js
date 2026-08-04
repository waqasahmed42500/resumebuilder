import Header from "../Component/Header";
import Footer from "../Component/Home/footer";
import JsonLd from "../Component/SEO/JsonLd";
import { breadcrumbSchema, createMetadata } from "../lib/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Read the EasyResume terms of service for using the free AI resume builder, ATS resume templates, CV maker, and PDF export tools.",
  path: "/terms",
  keywords: ["Resume Builder Terms", "AI Resume Builder", "Resume PDF Download"],
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <article className="mx-auto max-w-4xl">
          <header className="border-b border-slate-200 pb-10">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm font-semibold text-slate-500">Last updated: August 3, 2026</p>
          </header>
          <div className="mt-10 space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Use of EasyResume</h2>
              <p className="mt-3 leading-relaxed">
                EasyResume provides free resume builder, CV maker, template, and PDF export tools for personal job search use.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-slate-900">User Content</h2>
              <p className="mt-3 leading-relaxed">
                You are responsible for the accuracy of resume, cover letter, and profile information you enter into the application.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-slate-900">No Hiring Guarantee</h2>
              <p className="mt-3 leading-relaxed">
                ATS optimization and professional templates can improve formatting quality, but EasyResume does not guarantee interviews, offers, or employment outcomes.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
