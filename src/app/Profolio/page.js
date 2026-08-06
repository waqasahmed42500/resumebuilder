import React from 'react';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import Link from 'next/link';
import { createMetadata } from '@/app/lib/seo';
import { templateConfigs } from '@/app/Component/PortfolioTemplates/templateConfigs';
import dynamic from 'next/dynamic';

const TemplateMiniPreview = dynamic(() => import('@/app/Component/PortfolioTemplates/TemplateMiniPreview'), {
  ssr: true,
  loading: () => <div className="h-64 flex items-center justify-center bg-slate-900"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>
});

export const metadata = createMetadata({
  title: 'Resuvix — Publish Your Narrative | Free Editorial Portfolio Builder',
  description: 'Craft a high-end, recruiter-approved editorial portfolio in minutes. Pick from 25+ professional templates, live preview, and download PDFs.',
  path: '/Profolio',
  keywords: ['Portfolio Builder', 'Free Portfolio Maker', 'Developer Portfolio', 'Designer Portfolio'],
});

export default function ProfolioLandingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Resuvix Portfolio Builder',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    description: 'Editorial portfolio builder with 25+ templates, live preview, and instant publishing.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const previewTemplates = Object.values(templateConfigs || {}).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-grow flex flex-col pt-16">
        
        {/* Main Website Matched Hero Section (#F0F4FD background) */}
        <section className="relative -mt-18 flex min-h-[85vh] items-center overflow-hidden bg-[#F0F4FD] px-4 xl:py-20 md:py-16 sm:px-8 md:px-14 lg:px-12">
          <div className="mx-auto md:mt-10 grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-15">
            <div className="z-10 max-w-2xl">
              <span className="mb-4 inline-flex items-center rounded-full bg-sky-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-sky-800">
                Free Online Portfolio Builder
              </span>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl xl:text-[60px]">
                Build your <br /> <span className="text-sky-700">job-winning</span> <br /> portfolio for free.
              </h1>
              <p className="mb-8 max-w-lg xl:text-base md:text-sm text-slate-600 sm:text-lg leading-relaxed">
                Elevate your professional narrative with 25+ recruiter-approved editorial templates. Engineered for maximum impact, real-time live editing, and instant PDF exports.
              </p>

              <div className="flex flex-col md:flex-row md:gap-3 gap-4 max-w-xl">
                <Link
                  href="/Profolio/tempelate"
                  className="flex-1 rounded-xl bg-slate-900 xl:px-6 md:px-3 py-4 text-center text-base font-bold text-white shadow-md hover:bg-slate-800 transition-all hover:scale-[1.02]"
                >
                  Start Building Free
                </Link>

                <Link
                  href="/Profolio/tempelate"
                  className="flex-1 rounded-xl bg-slate-200 xl:px-6 md:px-3 py-4 text-center text-base font-bold text-slate-800 hover:bg-slate-300 transition-all"
                >
                  Browse 25+ Templates
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-800">
                  🔒 100% Client-Side Privacy (Zero Paywall)
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-sky-800">
                  ⚡ Real-Time Live Preview
                </span>
              </div>
            </div>

            {/* Interactive Preview Mockup Box */}
            <div className="relative h-full hidden w-full lg:flex items-center justify-end">
              <div className="w-full max-w-lg bg-white rounded-3xl p-4 shadow-2xl border border-slate-200/80 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                <div className="bg-slate-900 rounded-2xl overflow-hidden text-white">
                  <div className="h-10 bg-slate-800 px-4 flex items-center gap-2 border-b border-slate-700">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                    <span className="mx-auto text-[10px] font-mono text-slate-400">resuvix.com/p/johndoe</span>
                  </div>
                  <div className="p-8 space-y-4">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">Featured Portfolio</span>
                    <h2 className="text-3xl font-black text-white">Jane Doe</h2>
                    <p className="text-sm text-slate-300 leading-relaxed">Full Stack Developer & Product Designer. Architecting digital experiences for 50K+ global users.</p>
                    <div className="pt-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-xs text-sky-400 font-bold border border-slate-700">React</span>
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-xs text-emerald-400 font-bold border border-slate-700">Next.js</span>
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-xs text-purple-400 font-bold border border-slate-700">Tailwind</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Resuvix Section */}
        <section className="py-20 px-6 lg:px-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-100 px-4 py-1.5 rounded-full inline-block mb-3">
                Built For Professionals
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Why Build Your Portfolio With Resuvix?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '🆓', title: 'Zero Paywall', desc: 'Core features, PDF downloads, and public sharing are completely free.' },
                { icon: '🎨', title: '25+ Master Templates', desc: 'Meticulously crafted templates for developers, designers, and founders.' },
                { icon: '⚡', title: 'Real-Time Preview', desc: 'Instant feedback loop with Framer & Webflow level split-screen preview.' },
                { icon: '📄', title: 'PDF Export', desc: 'Export high-resolution, print-ready PDF portfolios with one click.' },
                { icon: '🚀', title: 'SEO Optimized', desc: 'Dynamic OpenGraph, Twitter Cards, and JSON-LD Person schema built-in.' },
                { icon: '📱', title: 'Mobile First', desc: '100% mobile-first responsive architecture on all 320px–1920px viewports.' }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured 25 Templates Preview */}
        <section className="bg-[#F0F4FD] py-20 px-6 lg:px-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-100 px-4 py-1.5 rounded-full inline-block mb-3">
                  25 Master Templates
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                  Featured Portfolio Architectures
                </h2>
              </div>
              <Link
                href="/Profolio/tempelate"
                className="text-sky-700 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm sm:text-base"
              >
                Browse All 25 Templates →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {previewTemplates.map((template) => (
                <article
                  key={template.id}
                  className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 h-full"
                >
                  {/* Live Proportionally Scaled Template Thumbnail Container */}
                  <div className="h-64 p-3 relative overflow-hidden bg-slate-900 shrink-0">
                    <TemplateMiniPreview templateId={template.id} />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-950/80 text-emerald-400 border border-slate-700/80 backdrop-blur-md">
                        {template.badge || template.category}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-900 backdrop-blur-md shadow-sm">
                        📱 Live Scaled
                      </span>
                    </div>

                    {/* Hover Quick Action Buttons Overlay */}
                    <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-30 p-4">
                      <Link
                        href={`/Profolio/ProfolioEditor?template=${template.id}`}
                        className="w-full max-w-[200px] text-center px-6 py-3 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl transition-all hover:scale-105"
                      >
                        Use Template →
                      </Link>
                      <Link
                        href={`/p/demo?template=${template.id}`}
                        target="_blank"
                        className="w-full max-w-[200px] text-center px-6 py-2.5 rounded-xl text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md transition-all"
                      >
                        Live Preview ↗
                      </Link>
                    </div>
                  </div>

                  {/* Card Information Body */}
                  <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                          {template.name}
                        </h3>
                        
                        {/* Color Palette Swatches */}
                        <div className="flex items-center gap-1 shrink-0" title="Template Palette">
                          {template.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-6">
                        {template.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500">{template.category}</span>
                      <Link
                        href={`/Profolio/ProfolioEditor?template=${template.id}`}
                        className="text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
                      >
                        <span>Use Template</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-200  px-6 lg:px-38  mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900 mb-16 tracking-tight">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-8">
            {[
              { q: 'Is the Portfolio Builder 100% free?', a: 'Yes! Core portfolio creation, PDF exports, and public sharing are completely free with zero hidden paywalls.' },
              { q: 'How many templates can I choose from?', a: 'We offer 25 recruiter-approved templates specifically tailored for developers, UI/UX designers, founders, photographers, and executives.' },
              { q: 'Can I download my portfolio as a PDF?', a: 'Yes, you can export your portfolio as a pixel-perfect A4 PDF at any time.' },
              { q: 'Is it mobile responsive?', a: 'Yes, every template is built with a mobile-first responsive architecture for 320px–1920px viewports.' }
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-200 pb-6">
                <dt className="text-lg font-bold text-slate-900 mb-2">{faq.q}</dt>
                <dd className="text-slate-600 text-sm leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-900 py-20 px-6 lg:px-16 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black mb-6">Ready to Build Your Portfolio?</h2>
            <p className="text-slate-300 text-base sm:text-lg mb-10">Join thousands of professionals elevating their career narrative with Resuvix.</p>
            <Link href="/Profolio/tempelate" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-5 rounded-xl text-base font-extrabold shadow-xl hover:scale-105 transition-all">
              Get Started for Free →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}