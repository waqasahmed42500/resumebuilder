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
    
    <main className="pt-24 pb-12 min-h-screen bg-slate-200 text-black    flex flex-col items-center">

<div className="w-full max-w-6xl px-8 mb-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
<div className="space-y-1">
<Link href={`/Editor?template=${selectedTemplate}`} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4 group">
<span className="material-symbols-outlined text-lg"><FaArrowLeft /></span>
<span className="font-label text-sm font-semibold tracking-wide uppercase">Back to Editor</span>
</Link>
<h1 className="text-4xl font-extrabold tracking-tight text-primary">Your Masterpiece is Ready</h1>
<p className="text-on-surface-variant font-body">Review your editorial-grade resume and choose your preferred export format.</p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-on-secondary-container rounded-xl font-semibold hover:opacity-80 transition-all">
<span className="material-symbols-outlined">link</span>
                    <IoLinkOutline />
                </button>
<div className="h-8 w-px bg-outline-variant/30 hidden md:block mx-1"></div>
<button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold bg-linear-to-br from-primary to-primary-container shadow-md hover:scale-[1.02] transition-all">
<span className="material-symbols-outlined"><FaFilePdf /></span>
                    Download PDF
                </button>
</div>
</div>
<div className="w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
<section className="bg-gray-300 shadow-xl p-6 rounded-2xl space-y-6">
<h3 className="text-xs font-bold uppercase tracking-widest text-primary/60 border-l-4 border-surface-tint pl-3">Export Options</h3>
<div className="space-y-3">
<button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container transition-all group">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary"><TbFileDescription /></span>
<span className="font-semibold text-on-surface">Plain Text (.txt)</span>
</div>
<span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100">download</span>
</button>
<button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container transition-all group">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary"><FiGrid /></span>
<span className="font-semibold text-on-surface">JSON Format</span>
</div>
<span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100">code</span>
</button>
<button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container transition-all group">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary"><MdOutlineMailOutline /></span>
<span className="font-semibold text-on-surface">Send to Email</span>
</div>
<span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100">send</span>
</button>
</div>
</section>
<section className="bg-blue-950 text-white text-on-primary p-6 rounded-2xl space-y-4 relative overflow-hidden shadow-xl">
<div className="relative z-10">
<h4 className="font-headline font-bold text-lg">Pro Tip</h4>
<p className="font-body text-sm text-on-primary-container leading-relaxed">
                            Resumes with professional headshots receive 14% more views. Consider our AI Portrait tool.
                        </p>
<button className="mt-4 px-4 py-2 bg-white  text-black rounded-lg text-sm font-bold w-full">Upgrade to Pro</button>
</div>

<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container rounded-full blur-2xl opacity-50"></div>
</section>
</div>

<div className="lg:col-span-9 order-1 lg:order-2">
<div className="bg-surface-container-lowest resume-shadow min-h-275 w-full p-12 md:p-20 relative border border-outline-variant/10 rounded-sm">



<SelectedResume data={resumeData}
              theme={{
                  // accent: themeAccent,
                  fontFamily: themeFont,
              }}/>
</div>
</div>
</div>
</main>

<div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-linear-to-b from-sky-500 to-blue-950  px-6 py-4 rounded-full shadow-2xl border border-primary-container z-100">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined  text-green-400 text-on-secondary-fixed text-lg" style={{ "font-variation-settings": "'FILL' 1;" }}><FaCheckCircle /></span>
</div>
<p className="text-on-primary font-bold text-sm">Resume generated successfully. Ready for export.</p>
<button className="text-on-primary-container hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-xl"><IoClose /></span>
</button>
</div></>
  )
}

export default ExportPage