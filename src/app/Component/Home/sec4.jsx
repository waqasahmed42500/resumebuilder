import Link from "next/link";

export default function Sec4() {
  return (
    <section className="bg-slate-900 px-4 py-20 text-white sm:px-8 md:px-16 lg:px-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl md:text-5xl tracking-tight">
          Ready to Build Your Winning Resume?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
          Join over 50,000 job seekers who created professional, ATS-optimized resumes and landed interviews at leading companies.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/builder"
            className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-slate-900 shadow-lg transition-all hover:bg-slate-100 active:scale-95"
            aria-label="Build your resume for free now"
          >
            Create My Free Resume Now
          </Link>
          <Link
            href="/tempelate"
            className="rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-slate-800"
            aria-label="View all free resume templates"
          >
            View Free Templates
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          100% Free • No credit card required • Instant PDF Download
        </p>
      </div>
    </section>
  );
}