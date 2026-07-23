"use client";
import Link from 'next/link';
import React from 'react';

export default function Sec1() {
  return (
    <section className="relative flex min-h-[921px] items-center overflow-hidden bg-slate-50 px-8 md:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-16">
        <div className="z-10 max-w-2xl">
          <span className="mb-6 block text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
            The Editorial Architect
          </span>
          <h1 className="mb-8 text-6xl font-extrabold leading-[1.1] tracking-tighter text-slate-900 md:text-6xl xl:text-7xl">
            Design your <br /> <span className="text-sky-700">professional</span> legacy.
          </h1>
          <p className="mb-10 max-w-lg font-body text-lg leading-relaxed text-slate-600">
            Moving beyond basic forms into curated professional storytelling. Create a resume that captures not just your history, but your future.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link  href={"/tempelate"} className="rounded-xl bg-slate-900 md:px-6 xl:px-8 md:py-4 py-2 px-4 md:text-ms xl:text-xl font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95 flex items-center">
              Create Your Resume
            </Link >
            <Link href={"/tempelate"} className="rounded-xl bg-slate-200 px-8 py-4 md:text-ms xl:text-xl  font-bold text-slate-700 transition-all hover:bg-slate-300">
              View Templates
              
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-4 text-sm font-medium text-slate-600">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300"></div>
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400"></div>
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-500"></div>
            </div>
            <span>Trusted by 50,000+ professionals globally</span>
          </div>
        </div>

        <div className="relative hidden h-[520px] w-full max-w-[440px] lg:block lg:justify-self-end xl:h-[600px] xl:max-w-[480px]">
          <div className="absolute right-0 top-0 z-0 flex h-[520px] w-[360px] rotate-3 flex-col gap-6 rounded-sm bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] xl:h-[600px] xl:w-[420px] xl:p-12">
            <div className="h-4 w-24 rounded-full bg-slate-200"></div>
            <div className="h-8 w-48 rounded-sm bg-sky-600"></div>
            <div className="mt-4 space-y-3">
              <div className="h-2 w-full rounded-full bg-slate-200"></div>
              <div className="h-2 w-full rounded-full bg-slate-200"></div>
              <div className="h-2 w-2/3 rounded-full bg-slate-200"></div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="h-32 rounded-lg bg-slate-100"></div>
              <div className="h-32 rounded-lg bg-slate-100"></div>
            </div>
          </div>
          <div className="absolute left-8 top-16 z-10 flex h-[520px] w-[360px] -rotate-3 flex-col gap-6 rounded-sm bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] xl:left-10 xl:top-20 xl:h-[600px] xl:w-[420px] xl:p-12">
            <img
              className="h-full w-full rounded-sm object-cover"
              data-alt="Close up of a modern minimalist professional resume with clean typography on high quality textured white paper"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2XYlD1_icCmMupYVTJpG5AO2jPMU2KmotOoZM51lv45voHOB2ZUe8R6914nKMjniriVlaJlp11lR4-Iz7-ONzovvrMz3Mqrm2W0XWKtGWg5pI8dA9NESpUhK_tk1ylyMBL2yaMHoL2mXktnDtTI0byNfS8N9z4yZiE7ctbgnJ3Zktd_wvfPe1BmdopRhoLbwPRQ2UzYfRC2mR48Qs4ka6NiGhEIzFF-c-YJX5rWhtL4zfGHdS_GFYy2TxJRiMFdzSi9kDNSdPclM"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
