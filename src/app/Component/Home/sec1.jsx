import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Sec1() {
  return (
    <section className="relative -mt-18  flex min-h-[85vh] items-center overflow-hidden bg-[#F0F4FD]  px-4 xl:py-20 md:py-16 sm:px-8 md:px-14 lg:px-12 ">
      <div className="mx-auto md:mt-10 grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2  xl:gap-15">
        <div className="z-10 max-w-2xl">
          <span className="mb-4 inline-flex items-center rounded-full bg-sky-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-sky-800">
            Free Online ATS Resume Builder
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl xl:text-[60px]">
            Build your <br /> <span className="text-sky-700">ATS-friendly</span> <br /> resume for free.
          </h1>
          <p className="mb-8 max-w-lg xl:text-base md:text-sm text-slate-600 sm:text-lg leading-relaxed">
            Create recruiter-approved resumes with 20+ professional templates. Engineered for maximum applicant tracking system (ATS) scores and instant PDF downloads.
          </p>
      <div className="flex flex-col md:flex-row md:gap-3 gap-4 max-w-xl">
  <Link
    href="/builder"
    className="flex-1 rounded-xl bg-slate-900 xl:px-6 md:px-3 py-4 text-center text-base font-bold text-white"
  >
    Build My Resume Now
  </Link>

  <Link
    href="/templates"
    className="flex-1 rounded-xl bg-slate-200 xl:px-6 md:px-3 py-4 text-center text-base font-bold text-slate-800"
  >
    Browse 20+ Templates
  </Link>
</div>
          {/* Privacy Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-800">
              🔒 100% Client-Side Privacy (Zero Server Storage)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-sky-800">
              ⚡ Zero Paywall PDF Export
            </span>
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-slate-600 sm:text-sm">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-sky-500" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <span>Trusted by 50,000+ job seekers & professionals worldwide</span>
          </div>
        </div>

          <div className="relative h-full hidden w-full lg:flex border items-center justify-end">
  <Image
    src="/images/right-side.png"
    alt="Resuvix Resume Builder Preview"
    width={1267}
    height={1122}
    priority
    className="h-auto md:-mr-5 md:w-[490px] md:max-w-[500px] xl:w-[650px] xl:max-w-[690px] object-contain"
  />
</div>
      </div>
    </section>
  );
}
