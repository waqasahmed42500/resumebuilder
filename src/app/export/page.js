import React from 'react'
import Header from '../Component/Header'
import { IoLinkOutline } from 'react-icons/io5'
import { FaArrowLeft, FaFilePdf } from 'react-icons/fa'
import { TbFileDescription } from 'react-icons/tb'
import { FiGrid } from 'react-icons/fi'

const ExportPage = () => {
  return (
    <>
    <Header />
    
    <main className="pt-24 pb-12 min-h-screen bg-slate-200 text-black    flex flex-col items-center">

<div className="w-full max-w-6xl px-8 mb-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
<div className="space-y-1">
<button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4 group">
<span className="material-symbols-outlined text-lg"><FaArrowLeft /></span>
<span className="font-label text-sm font-semibold tracking-wide uppercase">Back to Editor</span>
</button>
<h1 className="text-4xl font-extrabold tracking-tight text-primary">Your Masterpiece is Ready</h1>
<p className="text-on-surface-variant font-body">Review your editorial-grade resume and choose your preferred export format.</p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-xl font-semibold hover:opacity-80 transition-all">
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
<section className="bg-surface-container-high p-6 rounded-2xl space-y-6">
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
<span className="material-symbols-outlined text-secondary">mail</span>
<span className="font-semibold text-on-surface">Send to Email</span>
</div>
<span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100">send</span>
</button>
</div>
</section>
<section className="bg-primary text-on-primary p-6 rounded-2xl space-y-4 relative overflow-hidden shadow-xl">
<div className="relative z-10">
<h4 className="font-headline font-bold text-lg">Pro Tip</h4>
<p className="font-body text-sm text-on-primary-container leading-relaxed">
                            Resumes with professional headshots receive 14% more views. Consider our AI Portrait tool.
                        </p>
<button className="mt-4 px-4 py-2 bg-on-primary text-primary rounded-lg text-sm font-bold w-full">Upgrade to Pro</button>
</div>

<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container rounded-full blur-2xl opacity-50"></div>
</section>
</div>

<div className="lg:col-span-9 order-1 lg:order-2">
<div className="bg-surface-container-lowest resume-shadow min-h-275 w-full p-12 md:p-20 relative border border-outline-variant/10 rounded-sm">

<header className="mb-16 border-l-8 border-primary pl-8 py-2">
<h2 className="text-6xl font-extrabold tracking-tighter text-primary leading-none uppercase">Alexander<br/>Vanguard</h2>
<div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-on-surface-variant font-medium text-sm">
<span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">alternate_email</span> alexander.v@vanguard.com</span>
<span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">call</span> +1 (555) 234-5678</span>
<span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">location_on</span> San Francisco, CA</span>
<span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">public</span> vanguard.design</span>
</div>
</header>

<div className="grid grid-cols-1 md:grid-cols-12 gap-12">

<div className="md:col-span-8 space-y-12">
<section>
<h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
<span className="w-8 h-0.5 bg-primary"></span> Professional Profile
                                </h3>
<p className="text-on-surface leading-relaxed text-lg">
                                    Visionary Creative Director with 10+ years of experience steering high-impact design strategies for Fortune 500 companies. Expert in architectural UI systems and editorial-first brand narratives. Proven track record of scaling design teams and delivering award-winning digital experiences.
                                </p>
</section>
<section>
<h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
<span className="w-8 h-0.5 bg-primary"></span> Experience
                                </h3>
<div className="space-y-10">
<div className="relative pl-6">
<div className="absolute left-0 top-2 bottom-0 w-px bg-outline-variant"></div>
<div className="absolute -left-0.75 top-2 w-1.75 h-1.75 bg-primary rounded-full"></div>
<div className="flex justify-between items-baseline mb-2">
<h4 className="text-lg font-bold text-primary">Senior Design Lead</h4>
<span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">2020 — Present</span>
</div>
<p className="text-sm font-semibold text-surface-tint mb-3 italic">Nexus Interactive Studios</p>
<ul className="text-on-surface space-y-3 text-sm leading-relaxed">
<li className="flex gap-2"><span>•</span> Spearheaded the redesign of the core SaaS platform, resulting in a 35% increase in user retention.</li>
<li className="flex gap-2"><span>•</span> Mentored a team of 12 multidisciplinary designers across 3 time zones.</li>
<li className="flex gap-2"><span>•</span> Developed the "Aura" design system used across 5 sub-brands.</li>
</ul>
</div>
<div className="relative pl-6">
<div className="absolute left-0 top-2 bottom-0 w-px bg-outline-variant"></div>
<div className="absolute -left-0.75 top-2 w-1.75 h-1.75 bg-primary rounded-full"></div>
<div className="flex justify-between items-baseline mb-2">
<h4 className="text-lg font-bold text-primary">Interaction Designer</h4>
<span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">2016 — 2020</span>
</div>
<p className="text-sm font-semibold text-surface-tint mb-3 italic">Vertex Agency</p>
<ul className="text-on-surface space-y-3 text-sm leading-relaxed">
<li className="flex gap-2"><span>•</span> Delivered 20+ mobile applications for global fintech clients.</li>
<li className="flex gap-2"><span>•</span> Championed accessibility standards across all agency output.</li>
</ul>
</div>
</div>
</section>
</div>

<div className="md:col-span-4 space-y-12">
<section>
<h3 className="text-lg font-bold text-primary mb-6">Expertise</h3>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">Design Systems</span>
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">UI/UX Strategy</span>
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">Branding</span>
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">Art Direction</span>
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">Figma Maestro</span>
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">React/CSS</span>
</div>
</section>
<section>
<h3 className="text-lg font-bold text-primary mb-6">Education</h3>
<div className="space-y-6">
<div>
<p className="text-sm font-bold text-primary">MFA in Digital Arts</p>
<p className="text-xs text-on-surface-variant">Rhode Island School of Design</p>
<p className="text-[10px] font-bold text-surface-tint mt-1">2014 — 2016</p>
</div>
<div>
<p className="text-sm font-bold text-primary">BFA in Graphic Design</p>
<p className="text-xs text-on-surface-variant">Pratt Institute</p>
<p className="text-[10px] font-bold text-surface-tint mt-1">2010 — 2014</p>
</div>
</div>
</section>
<section>
<h3 className="text-lg font-bold text-primary mb-6">Recognition</h3>
<div className="space-y-4">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-on-tertiary-container" style={{"font-variation-settings": "'FILL' 1;"}}>workspace_premium</span>
<div>
<p className="text-xs font-bold text-primary">Awwwards SOTD</p>
<p className="text-[10px] text-on-surface-variant">Nexus Portfolio redesign, 2022</p>
</div>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-on-tertiary-container" style={{"font-variation-settings": "'FILL' 1;"}}>workspace_premium</span>
<div>
<p className="text-xs font-bold text-primary">Webby Awards Finalist</p>
<p className="text-[10px] text-on-surface-variant">Best User Experience, 2021</p>
</div>
</div>
</div>
</section>
</div>
</div>

<div className="absolute bottom-8 right-12 opacity-10 pointer-events-none select-none">
<span className="text-xl font-bold text-primary">ResumeArchitect</span>
</div>
</div>

<div className="mt-8 flex justify-center items-center gap-4">
<div className="flex gap-1.5">
<div className="w-8 h-1 bg-primary rounded-full"></div>
<div className="w-2 h-1 bg-outline-variant rounded-full"></div>
</div>
<span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Page 1 of 1</span>
</div>
</div>
</div>
</main>

<div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-primary px-6 py-4 rounded-full shadow-2xl border border-primary-container z-100">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-fixed text-lg" style={{ "font-variation-settings": "'FILL' 1;" }}>check_circle</span>
</div>
<p className="text-on-primary font-bold text-sm">Resume generated successfully. Ready for export.</p>
<button className="text-on-primary-container hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-xl">close</span>
</button>
</div></>
  )
}

export default ExportPage