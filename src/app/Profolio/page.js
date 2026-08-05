import React from 'react'
import Header from '../Component/Header'


export const metadata = {
  title: 'Resuvix — Publish Your Narrative | Editorial Portfolios for Creatives',
  description:
    'Build a high-end, editorial portfolio in minutes. Modern templates, one-click publishing, live preview, and built-in analytics — move beyond the standard resume with Resuvix.',
  keywords: [
    'portfolio builder',
    'editorial portfolio',
    'resume website',
    'creative portfolio',
    'one-click publish portfolio',
    'Resuvix',
  ],
  openGraph: {
    title: 'Resuvix — Publish Your Narrative',
    description:
      'Craft high-end, editorial portfolios with modern templates and one-click publishing.',
    url: 'https://resuvix.io',
    siteName: 'Resuvix',
    type: 'website',
    images: [
      {
        url: 'https://resuvix.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Resuvix editorial portfolio builder preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resuvix — Publish Your Narrative',
    description:
      'Craft high-end, editorial portfolios with modern templates and one-click publishing.',
    images: ['https://resuvix.io/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://resuvix.io',
  },
}
const page = () => {
  return (
    <>
    <Header/>
    <main className="grow flex flex-col">

<section className="w-full max-w-7xl mx-auto px-6 lg:px-16 pt-24 pb-32 flex flex-col lg:flex-row items-center gap-16 relative">
<div className="flex-1 flex flex-col z-10">
<h1 className="font-display text-5xl lg:text-7xl font-extrabold text-primary leading-[1.1] tracking-[-0.02em] mb-6">
                    Publish Your <br/> Narrative.
                </h1>
<p className="font-body text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
                    Elevate your professional presence. Craft high-end, editorial portfolios with modern templates and one-click publishing. Move beyond the standard resume.
                </p>
<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
<button className="bg-linear-to-r from-sky-600 via-indigo-600 to-violet-600 text-white px-8 py-4 rounded-xl text-base font-bold shadow-[0_8px_32px_rgba(25,28,30,0.06)] hover:-translate-y-1 transition-transform duration-300">
                        Start Building Free
                    </button>
<button className="px-8 py-4 rounded-xl text-slate-700 border border-slate-200 bg-white font-medium hover:text-sky-600 transition-colors flex items-center gap-2">
                        View Examples <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>

<div className="flex-1 relative w-full aspect-4/3 lg:aspect-3/4 max-h-200 z-10">

<div className="absolute inset-0 bg-surface-container rounded-3xl p-4 lg:p-8 overflow-hidden">

<div className="bg-surface-container-lowest w-full h-full rounded-2xl shadow-[0_8px_32px_rgba(25,28,30,0.06)] relative overflow-hidden flex flex-col">

<div className="h-12 border-b border-surface-variant/50 flex items-center px-4 gap-2 bg-surface-container/30">
<div className="w-3 h-3 rounded-full bg-outline-variant/40"></div>
<div className="w-3 h-3 rounded-full bg-outline-variant/40"></div>
<div className="w-3 h-3 rounded-full bg-outline-variant/40"></div>
<div className="mx-auto text-[10px] text-slate-500 tracking-widest uppercase">resuvix.io/johndoe</div>
</div>

<div className="grow p-8 flex flex-col relative">

<div className="w-32 h-1 bg-surface-tint mb-8"></div>
<h2 className="font-display text-4xl text-primary font-bold mb-4 tracking-tight">Jane<br/>Doe.</h2>
<p className="text-sm text-on-surface-variant max-w-[70%] mb-12">Architecting digital experiences. Focused on elegant systems and high-fidelity interactions.</p>

<div className="grid grid-cols-2 gap-4 grow">
<div className="bg-surface-container-low rounded-xl relative overflow-hidden group">
<img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" data-alt="A sophisticated digital rendering of a modern architectural interior, minimalist design, soft volumetric lighting, slate grey and cool white color palette, professional high-end aesthetic, perfectly suited for an editorial design portfolio mockup." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw35DMlBbeO0dyYtQ1ajRebvAoU_wvSGHCmTy7FBr8HdTJhgIkiqu8Rx0_m8rPZ5fWPabm1gTgSW_dw0AHsjL4el_u1C0WHQ7yi3dj1W63xVVbrc9z8IETETcPrJfVAHnIY47n1t_dbqTXI6NbxNXohTsAcGVLAb8vWhqD6vKwcbv6FUDNuTLfOTvrtmFf3RCEFjO-XXw70s26RzQ__lJuKTcrStIB9Jxc-gQ8dMBXY4ioQeQZzsKB"/>
</div>
<div className="bg-surface-container-low rounded-xl relative overflow-hidden group flex flex-col justify-end p-4">
<div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent z-0"></div>
<h3 className="relative z-10 text-on-primary font-display font-semibold text-sm">Project Alpha</h3>
<p className="relative z-10 text-on-primary/70 text-xs">Editorial Design</p>
</div>
</div>

<div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-slate-200/70 px-6 py-2 rounded-full shadow-sm flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-sky-600"></span>
<span className="text-xs font-medium text-slate-900">Available for work</span>
</div>
</div>
</div>
</div>

<div className="absolute -z-10 -right-12 -bottom-12 w-64 h-64 bg-secondary-container rounded-full blur-3xl opacity-50"></div>
<div className="absolute -z-10 -left-12 top-12 w-48 h-48 bg-sky-600/20 rounded-full blur-2xl opacity-30"></div>
</div>
</section>

<section className="bg-surface-container-low py-24 px-6 lg:px-16 border-t border-surface-variant/30">
<div className="max-w-7xl mx-auto">
<div className="mb-16 max-w-2xl">
<h2 className="font-display text-4xl font-extrabold text-primary mb-4 tracking-tight">The Toolkit for Creatives</h2>
<p className="font-body text-on-surface-variant text-lg">Leave the rigid constraints behind. Build a portfolio that actually reflects your design sensibility.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-70">

<div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 flex flex-col lg:flex-row gap-8 shadow-[0_4px_16px_rgba(25,28,30,0.03)] overflow-hidden relative group">
<div className="flex-1 flex flex-col justify-between z-10 relative">
<div>
<div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-sky-600">view_quilt</span>
</div>
<h3 className="font-display text-2xl font-bold text-primary mb-2">Modern Templates</h3>
<p className="text-on-surface-variant text-sm max-w-sm">Start with carefully curated, editorial-style layouts designed by industry experts. Never look like a template again.</p>
</div>
</div>
<div className="flex-1 relative translate-x-8 translate-y-8 group-hover:-translate-y-2 transition-transform duration-500">
<img className="rounded-xl shadow-lg border border-outline-variant/10" data-alt="A collage of three high-end, minimalist website template mockups displayed on floating digital devices, overlapping each other slightly. The style is sleek, corporate yet creative, utilizing deep slate blues, soft greys, and crisp whites. Soft ambient lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsJbIsWXT-U8dNMS3LMsrg3RtTL1VYD8WJnFp8a48BGlJw6eH7Bh-w1xEymmUPXXa9UFOsGxuunVrHJJ-_v3kt-TcABw1CkwJyBHE6YPuBmqYYXF28VQ7UC1ikEqxjKpw9i13bbdaQUigBiYwua0FGBUOxsqPk4jPFPrx34rMDSJi8RRsQMk5ofp7IiTV4jwlK7_tykCu54fFtoWJE47eMBP44G-iigcbgaPpsh2VSib54sOVglhy5"/>
</div>
</div>

<div className="bg-primary rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden text-on-primary">
<div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container rounded-full blur-2xl"></div>
<div>
<div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-slate-900">public</span>
</div>
<h3 className="font-display text-2xl font-bold mb-2">One-Click Publish</h3>
<p className="text-on-primary/80 text-sm">Push updates instantly to your custom Resuvix domain or connect your own.</p>
</div>
<div className="mt-8 bg-surface-container-lowest/10 p-4 rounded-xl backdrop-blur-sm border border-surface/10 flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></div>
<span className="text-sm font-mono tracking-wider opacity-90">LIVE: johndoe.resuvix.io</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col shadow-[0_4px_16px_rgba(25,28,30,0.03)] relative overflow-hidden group">
<div className="absolute inset-0 bg-linear-to-br from-surface-container-lowest to-surface-container/50"></div>
<div className="relative z-10 h-full flex flex-col">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-on-surface">preview</span>
</div>
<h3 className="font-display text-2xl font-bold text-primary mb-2">Live Preview</h3>
<p className="text-on-surface-variant text-sm mb-6">See your narrative unfold in real-time. No saving, no waiting, just designing.</p>
<div className="mt-auto h-24 bg-surface-container rounded-t-xl border-t border-x border-outline-variant/20 p-4 relative overflow-hidden">
<div className="w-full h-2 bg-outline-variant/30 rounded-full mb-3"></div>
<div className="w-2/3 h-2 bg-outline-variant/30 rounded-full"></div>
<div className="absolute bottom-0 right-4 w-8 h-8 bg-primary rounded-t-lg"></div>
</div>
</div>
</div>

<div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 flex flex-col lg:flex-row gap-8 shadow-[0_4px_16px_rgba(25,28,30,0.03)] items-center">
<div className="flex-1">
<h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Understand Your Impact</h3>
<p className="text-slate-600 text-sm mb-6">Built-in analytics show you exactly who is looking at your portfolio, which projects they linger on, and when they download your resume.</p>
<button className="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">Explore Analytics <span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
</div>
<div className="flex-1 w-full flex gap-4 h-32 items-end justify-center pb-4 border-b border-surface-variant">
<div className="w-8 bg-sky-600/50 rounded-t-sm h-1/4"></div>
<div className="w-8 bg-sky-600/50 rounded-t-sm h-1/2"></div>
<div className="w-8 bg-sky-600 rounded-t-sm h-full"></div>
<div className="w-8 bg-sky-600/50 rounded-t-sm h-3/4"></div>
<div className="w-8 bg-sky-600/50 rounded-t-sm h-1/3"></div>
</div>
</div>
</div>
</div>
</section>
</main>
    </>

  )
}

export default page
