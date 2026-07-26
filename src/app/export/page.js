"use client";
import React, { useState } from 'react'
import Header from '../Component/Header'
import Resume1 from "../tempelate/EachResume/Resume1";
import Resume2 from "../tempelate/EachResume/Resume2";
import Resume3 from "../tempelate/EachResume/Resume3";
import Resume4 from "../tempelate/EachResume/Resume4";
import Resume5 from "../tempelate/EachResume/Resume5";
import Resume6 from "../tempelate/EachResume/Resume6";
import Resume7 from "../tempelate/EachResume/Resume7";
import { IoClose, IoLinkOutline } from 'react-icons/io5'
import { FaArrowLeft, FaCheckCircle, FaFilePdf } from 'react-icons/fa'
import { TbFileDescription } from 'react-icons/tb'
import { FiGrid } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { useResume } from '../context/ResumeContext';

const ExportPage = () => { 
const {themeFont,resumeData} =  useResume();

    const templateComponents = { resume1: Resume1, resume2: Resume2, resume3: Resume3, resume4: Resume4, resume5: Resume5, resume6: Resume6, resume7: Resume7 };
      const searchParams = useSearchParams();
    const selectedTemplate = searchParams.get("template") || "resume1";


    const SelectedResume = templateComponents[selectedTemplate] || Resume1;
    
  return (
    <>
    <Header />
    
    <main className="overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(248,250,252,1))] px-3 py-24 pb-12 text-slate-900 sm:px-4 lg:px-6 min-h-screen">

<div className="mx-auto mb-8 flex w-full max-w-6xl flex-col gap-6 px-1 sm:px-2 xl:flex-row xl:items-end xl:justify-between">
<div className="max-w-2xl space-y-2">
<Link href={`/Editor?template=${selectedTemplate}`} className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600 transition-colors hover:text-emerald-700">
<span className="text-lg"><FaArrowLeft /></span>
<span>Back to Editor</span>
</Link>
<h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Your Masterpiece is Ready</h1>
<p className="text-sm leading-6 text-slate-600 sm:text-base">Review your editorial-grade resume and choose your preferred export format.</p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
<span className="text-lg"><IoLinkOutline /></span>
<span>Copy link</span>
</button>
<button className="flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-2.5 font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800">
<span className="text-lg"><FaFilePdf /></span>
<span>Download PDF</span>
</button>
</div>
</div>
<div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-1 sm:px-2 md:grid-cols-12 xl:gap-8">

<div className="order-2 space-y-6 md:col-span-4 xl:col-span-3 xl:order-1">
<section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
<h3 className="border-l-4 border-emerald-600 pl-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-600">Export Options</h3>
<div className="mt-5 space-y-3">
<button className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 p-3 text-left transition hover:bg-slate-50">
<div className="flex items-center gap-3">
<span className="text-xl text-slate-600"><TbFileDescription /></span>
<span className="font-semibold text-slate-800">Plain Text (.txt)</span>
</div>
<span className="text-sm text-slate-400 opacity-0 transition group-hover:opacity-100">download</span>
</button>
<button className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 p-3 text-left transition hover:bg-slate-50">
<div className="flex items-center gap-3">
<span className="text-xl text-slate-600"><FiGrid /></span>
<span className="font-semibold text-slate-800">JSON Format</span>
</div>
<span className="text-sm text-slate-400 opacity-0 transition group-hover:opacity-100">code</span>
</button>
<button className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 p-3 text-left transition hover:bg-slate-50">
<div className="flex items-center gap-3">
<span className="text-xl text-slate-600"><MdOutlineMailOutline /></span>
<span className="font-semibold text-slate-800">Send to Email</span>
</div>
<span className="text-sm text-slate-400 opacity-0 transition group-hover:opacity-100">send</span>
</button>
</div>
</section>
<section className="relative overflow-hidden rounded-[24px] bg-slate-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
<div className="relative z-10">
<h4 className="text-lg font-bold">Pro Tip</h4>
<p className="mt-2 text-sm leading-6 text-slate-300">
                            Resumes with professional headshots receive 14% more views. Consider our AI Portrait tool.
                        </p>
<button className="mt-4 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100">Upgrade to Pro</button>
</div>
<div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-400/30 blur-3xl"></div>
</section>
</div>

<div className="order-1 min-w-0 md:col-span-8 xl:col-span-9 xl:order-2">
<div className="overflow-x-auto rounded-[28px] border border-slate-200 bg-slate-50/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-5 ">
<div className="mx-auto min-w-[280px] max-w-[920px] overflow-hidden  flex justify-center items-center p-1 sm:p-4 lg:p-4">
<SelectedResume data={resumeData}
              theme={{
                  // accent: themeAccent,
                  fontFamily: themeFont,
              }}/>
</div>
</div>
</div>
</div>
</main>

<div className="fixed bottom-6 left-1/2 z-[100] flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-3 rounded-full border border-emerald-200 bg-slate-900 px-4 py-3 shadow-2xl sm:bottom-8 sm:px-6">
<div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
<span className="text-lg text-emerald-400" style={{ "font-variation-settings": "'FILL' 1;" }}><FaCheckCircle /></span>
</div>
<p className="text-sm font-semibold text-white">Resume generated successfully. Ready for export.</p>
<button className="text-slate-300 transition hover:text-white">
<span className="text-xl"><IoClose /></span>
</button>
</div></>
  )
}

export default ExportPage