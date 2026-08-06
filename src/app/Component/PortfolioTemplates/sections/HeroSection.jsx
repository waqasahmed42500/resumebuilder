import React from 'react';

// 25 Category-Matched Ultra-Realistic Professional Human Portraits & Workspaces
const CATEGORY_HERO_IMAGES = {
  'minimal-white': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  'dark-terminal': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
  'creative-designer': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  'photographer': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
  'agency': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
  'freelancer': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
  'corporate-professional': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80',
  'startup-founder': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
  'glass-portfolio': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
  'luxury-portfolio': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80',
  'architect': 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&w=1000&q=80',
  'interior-designer': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
  'fashion-portfolio': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80',
  'ai-engineer': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1000&q=80',
  'software-engineer': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
  'data-scientist': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
  'video-editor': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
  'digital-marketer': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  'personal-brand': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  'modern-resume': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
  'blog-portfolio': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80',
  'product-designer': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
  'medical-professional': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=80',
  'teacher-portfolio': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  'ultimate-portfolio': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80'
};

export default function HeroSection({ data, theme, variant, templateId, sectionId }) {
  if (!data) return null;

  const { firstName, lastName, title, email, phone, location, website, avatar, tagline, resumeUrl, calendlyUrl } = data;
  const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Professional';

  // Category-matched Hero human portrait image URL
  const categoryHeroImage = avatar || CATEGORY_HERO_IMAGES[templateId] || CATEGORY_HERO_IMAGES['minimal-white'];

  // 1. Dark Terminal Special Layout
  if (templateId === 'dark-terminal') {
    return (
      <section className="portfolio-section py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#0d1117] text-[#c9d1d9] font-mono border-b border-slate-800 w-full overflow-hidden" id={sectionId}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 rounded-2xl bg-[#161b22] border border-[#30363d] overflow-hidden shadow-2xl">
            <div className="bg-[#21262d] px-4 py-3 flex items-center justify-between border-b border-[#30363d]">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-400 truncate">bash - {fullName.toLowerCase().replace(/\s+/g, '')}.sh</span>
              <div className="w-4"></div>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-emerald-400 text-xs sm:text-sm">$ const developer = new Developer();</p>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight break-words">
                &gt; {fullName}<span className="animate-pulse text-emerald-400">_</span>
              </h1>
              <p className="text-base sm:text-xl text-sky-400 font-semibold">&gt; Role: {title}</p>
              {tagline && <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">&gt; {tagline}</p>}
              <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-3">
                {email && (
                  <a href={`mailto:${email}`} className="w-full sm:w-auto text-center px-5 py-3 rounded bg-emerald-600 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors">
                    $ mailto --send
                  </a>
                )}
                {resumeUrl && (
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-5 py-3 rounded bg-sky-600 text-slate-950 font-bold text-xs hover:bg-sky-400 transition-colors">
                    $ wget ./resume.pdf
                  </a>
                )}
                <a href="#projects" className="w-full sm:w-auto text-center px-5 py-3 rounded bg-slate-800 text-emerald-400 font-bold text-xs border border-slate-700 hover:bg-slate-700 transition-colors">
                  $ ls ./projects
                </a>
                {calendlyUrl && (
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-5 py-3 rounded bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors">
                    $ cron --book
                  </a>
                )}
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-5 py-3 rounded bg-slate-800 text-sky-400 font-bold text-xs border border-slate-700 hover:bg-slate-700 transition-colors">
                    $ curl --live-site
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Professional Human Portrait Hero Card */}
          <div className="lg:col-span-5 relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border-2 border-[#30363d] shadow-2xl group">
            <img
              src={categoryHeroImage}
              alt={fullName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-emerald-400">
              // Professional Workspace
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 2. Luxury Gold Special Layout
  if (templateId === 'luxury-portfolio') {
    return (
      <section className="portfolio-section py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 bg-[#09090b] text-[#f4f4f5] font-serif border-b border-amber-900/30 w-full overflow-hidden" id={sectionId}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-amber-400 border-b border-amber-400/40 pb-1 inline-block">
              Bespoke Portfolio & Executive Profile
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-normal text-amber-200 leading-tight break-words">
              {fullName}
            </h1>
            <p className="text-lg sm:text-2xl font-light text-slate-300 italic">{title}</p>
            {tagline && <p className="text-slate-400 font-sans text-xs sm:text-sm max-w-xl leading-relaxed">{tagline}</p>}
            <div className="pt-4 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <a href="#contact" className="w-full sm:w-auto px-8 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/10 text-center">
                Hire Me
              </a>
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest bg-transparent border border-amber-400/50 text-amber-400 hover:bg-amber-400/10 transition-all text-center">
                  Download CV
                </a>
              )}
              {calendlyUrl && (
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest bg-transparent border border-amber-400/50 text-amber-400 hover:bg-amber-400/10 transition-all text-center">
                  Book Call
                </a>
              )}
            </div>
          </div>

          {/* Right Luxury Executive Portrait Hero Card */}
          <div className="lg:col-span-5 relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10 group">
            <img
              src={categoryHeroImage}
              alt={fullName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-70" />
          </div>
        </div>
      </section>
    );
  }

  // 3. Mobile-First Default & Professional Hero (Right Human Image Card)
  return (
    <section data-editable-section="hero" className="portfolio-section py-12 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 flex items-center min-h-[70vh] sm:min-h-[80vh] w-full overflow-hidden" id={sectionId}>
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Headline & Content */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
          <h1 data-editable-text="personalInfo.firstName" className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight break-words inline-block">
            {firstName} <span style={{ color: theme.primaryColor || '#3b82f6' }}>{lastName}</span>
          </h1>
          <h2 data-editable-text="personalInfo.title" className="text-lg sm:text-2xl lg:text-3xl font-semibold opacity-90">{title}</h2>
          {tagline && <p data-editable-text="personalInfo.tagline" className="text-sm sm:text-lg opacity-80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">{tagline}</p>}
          {location && <p data-editable-text="personalInfo.location" className="text-xs sm:text-sm font-semibold opacity-70 flex items-center justify-center lg:justify-start gap-1.5">📍 {location}</p>}

          <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
            <a
              href="#contact"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: theme.primaryColor || '#3b82f6' }}
            >
              Contact Me
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-transform hover:scale-105 active:scale-95 bg-slate-900"
              >
                Download Resume
              </a>
            )}
            <a
              href="#projects"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              View Projects
            </a>
            {calendlyUrl && (
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Book a Call 📅
              </a>
            )}
            {website && (
              <a
                data-editable-button="personalInfo.website"
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                View Website ↗
              </a>
            )}
          </div>
        </div>

        {/* Right Category-Matched Professional Human Portrait Card */}
        <div className="lg:col-span-5 relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl group transition-all duration-500 hover:scale-[1.02]">
          <img
            data-editable-image="personalInfo.avatar"
            src={categoryHeroImage}
            alt={fullName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </section>
  );
}
