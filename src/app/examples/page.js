import Link from "next/link";
import Header from "../Component/Header";
import Footer from "../Component/Home/footer";

const examples = [
  {
    title: "Software Engineer",
    description: "A modern, accomplishment-focused layout built for technical roles and product teams.",
    tag: "Modern",
    img:"/images/software enginer.png"
},
{
    title: "Marketing Manager",
    description: "A polished, result-driven format designed to highlight campaigns, leadership, and growth.",
    tag: "Professional",
    img:"/images/marketing.png"
},
{
    title: "UX Designer",
    description: "A visually rich template that balances design storytelling with clear case-study structure.",
    tag: "Creative",
    img:"/images/desinger.png"
  },
];

export default function ExamplesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Examples</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Resume examples for every career path</h1>
            <p className="mt-4 text-lg text-slate-600">
              Browse polished examples that show how different resume styles can help you stand out for tech, marketing, design, and leadership roles.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {examples.map((example) => (
              <article key={example.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {example.tag}
                </span>
                <div className="mt-4 h-68 w-full overflow-hidden rounded-lg bg-slate-100">

                {example.img && (
                    <img src={example.img} alt={example.title} className=" rounded-lg shadow-md object-cover h-full w-full" />
                )}
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">{example.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{example.description}</p>
                <Link href="/tempelate" className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline decoration-emerald-600 underline-offset-4">
                  View matching templates
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
