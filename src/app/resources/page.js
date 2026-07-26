import Link from "next/link";
import Header from "../Component/Header";
import Footer from "../Component/Home/footer";

const resources = [
  {
    title: "Resume writing guide",
    description: "Learn how to structure your experience, highlight achievements, and tailor your resume to the job description.",
  },
  {
    title: "ATS checklist",
    description: "Make sure your resume passes applicant tracking systems with clean formatting and keyword-friendly content.",
  },
  {
    title: "Cover letter tips",
    description: "Explore quick advice for writing cover letters that complement your resume and strengthen your application.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Resources</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Useful resources to build a stronger resume</h1>
            <p className="mt-4 text-lg text-slate-600">
              Use these practical guides and tips to write smarter, tailor better, and present your experience with confidence.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((resource) => (
              <article key={resource.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">{resource.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{resource.description}</p>
                <Link href="/Editor" className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline decoration-emerald-600 underline-offset-4">
                  Start building now
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
