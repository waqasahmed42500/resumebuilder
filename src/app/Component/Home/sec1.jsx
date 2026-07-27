import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Sec1() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-slate-50 px-4 py-20 sm:px-8 md:px-16 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-16">
        <div className="z-10 max-w-2xl">
          <span className="mb-4 inline-flex items-center rounded-full bg-sky-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-sky-800">
            Free Online ATS Resume Builder
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl xl:text-7xl">
            Build your <span className="text-sky-700">ATS-friendly</span> resume for free.
          </h1>
          <p className="mb-8 max-w-lg text-base text-slate-600 sm:text-lg leading-relaxed">
            Create recruiter-approved resumes with 20+ professional templates. Engineered for maximum applicant tracking system (ATS) scores and instant PDF downloads.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/builder"
              className="rounded-xl bg-slate-900 px-6 py-3.5 text-base font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-95 sm:px-8 sm:text-lg"
              aria-label="Build your resume now for free"
            >
              Build My Resume Now
            </Link>
            <Link
              href="/tempelate"
              className="rounded-xl bg-slate-200 px-6 py-3.5 text-base font-bold text-slate-800 transition-all hover:bg-slate-300 sm:px-8 sm:text-lg"
              aria-label="Explore free professional resume templates"
            >
              Browse 20+ Templates
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-4 text-xs font-semibold text-slate-600 sm:text-sm">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-sky-500" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <span>Trusted by 50,000+ job seekers & professionals</span>
          </div>
        </div>

        <div className="relative hidden h-[520px] w-full max-w-[440px] lg:block lg:justify-self-end xl:h-[600px] xl:max-w-[480px]">
          <div className="absolute right-0 top-0 z-0 flex h-[520px] w-[360px] rotate-3 flex-col gap-6 rounded-sm bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] xl:h-[600px] xl:w-[420px] xl:p-12">
            <div className="h-4 w-24 rounded-full bg-slate-200" />
            <div className="h-8 w-48 rounded-sm bg-sky-600" />
            <div className="mt-4 space-y-3">
              <div className="h-2 w-full rounded-full bg-slate-200" />
              <div className="h-2 w-full rounded-full bg-slate-200" />
              <div className="h-2 w-2/3 rounded-full bg-slate-200" />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="h-32 rounded-lg bg-slate-100" />
              <div className="h-32 rounded-lg bg-slate-100" />
            </div>
          </div>
          <div className="absolute left-8 top-16 z-10 flex h-[520px] w-[360px] -rotate-3 flex-col gap-6 rounded-sm bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] xl:left-10 xl:top-20 xl:h-[600px] xl:w-[420px]">
            <Image
              className="h-full w-full rounded-sm object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2XYlD1_icCmMupYVTJpG5AO2jPMU2KmotOoZM51lv45voHOB2ZUe8R6914nKMjniriVlaJlp11lR4-Iz7-ONzovvrMz3Mqrm2W0XWKtGWg5pI8dA9NESpUhK_tk1ylyMBL2yaMHoL2mXktnDtTI0byNfS8N9z4yZiE7ctbgnJ3Zktd_wvfPe1BmdopRhoLbwPRQ2UzYfRC2mR48Qs4ka6NiGhEIzFF-c-YJX5rWhtL4zfGHdS_GFYy2TxJRiMFdzSi9kDNSdPclM"
              alt="Clean modern minimalist ATS resume template layout preview"
              width={420}
              height={600}
              priority={true}
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
