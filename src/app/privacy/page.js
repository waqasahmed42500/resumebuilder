import Header from "../Component/Header";
import Footer from "../Component/Home/footer";
import JsonLd from "../Component/SEO/JsonLd";
import { breadcrumbSchema, createMetadata } from "../lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read the EasyResume privacy policy for the free online resume builder, local draft storage, analytics placeholders, and contact options.",
  path: "/privacy",
  keywords: ["Resume Builder Privacy", "Online Resume Builder", "Free Resume Builder"],
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <article className="mx-auto max-w-4xl">
          <header className="border-b border-slate-200 pb-10">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm font-semibold text-slate-500">Last updated: August 3, 2026</p>
          </header>
          <div className="mt-10 space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Resume Data</h2>
              <p className="mt-3 leading-relaxed">
                EasyResume stores resume drafts locally in your browser so you can continue editing without creating an account. Resume content is not intentionally sold or shared.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>
              <p className="mt-3 leading-relaxed">
                The site includes optional Google Analytics 4 placeholders. Analytics only load when a production measurement ID is configured.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
              <p className="mt-3 leading-relaxed">
                For privacy requests, contact support@easyresume.example.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
