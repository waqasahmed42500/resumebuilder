import React from 'react';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDribbble, 
  FaBehance, FaYoutube, FaMedium, FaWhatsapp, FaTelegramPlane, FaMapMarkerAlt, FaCalendarCheck
} from 'react-icons/fa';

export default function ContactSection({ data, theme, variant, sectionId }) {
  if (!data) return null;
  const { contact = {}, socialLinks = {}, personalInfo = {} } = data;

  const title = contact.formTitle || 'Get In Touch';
  const description = contact.formDescription || "I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll get back to you promptly!";

  const activeSocials = Object.entries(socialLinks).filter(([_, url]) => Boolean(url));
  
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'github': return <FaGithub />;
      case 'linkedin': return <FaLinkedin />;
      case 'twitter': return <FaTwitter />;
      case 'instagram': return <FaInstagram />;
      case 'dribbble': return <FaDribbble />;
      case 'behance': return <FaBehance />;
      case 'youtube': return <FaYoutube />;
      case 'medium': return <FaMedium />;
      default: return null;
    }
  };

  return (
    <section data-editable-section="contact" className="portfolio-section py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-16 text-center w-full overflow-hidden" id={sectionId}>
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-500">Contact</span>
          <h2 data-editable-text="contact.formTitle" className="text-3xl sm:text-5xl font-black tracking-tight leading-tight inline-block">
            {title}
          </h2>
          <p data-editable-text="contact.formDescription" className="text-xs sm:text-base opacity-80 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {personalInfo.email && (
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-xl sm:text-3xl md:text-4xl font-extrabold hover:text-emerald-500 transition-colors break-all underline decoration-emerald-500 decoration-2 underline-offset-8 px-2"
          >
            {personalInfo.email}
          </a>
        )}

        {/* Direct Contact Links */}
        <div className="flex flex-wrap justify-center gap-3 w-full max-w-3xl pt-2">
          {contact.whatsapp && (
            <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-md">
              <FaWhatsapp className="text-base" /> WhatsApp
            </a>
          )}
          {contact.telegram && (
            <a href={`https://t.me/${contact.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-md">
              <FaTelegramPlane className="text-base" /> Telegram
            </a>
          )}
          {contact.googleMaps && (
            <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-md">
              <FaMapMarkerAlt className="text-base" /> Location
            </a>
          )}
          {personalInfo.calendlyUrl && (
            <a href={personalInfo.calendlyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-md">
              <FaCalendarCheck className="text-base" /> Book Call
            </a>
          )}
        </div>

        {/* Social Links List */}
        {activeSocials.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 pt-4 w-full max-w-2xl">
            {activeSocials.map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs capitalize transition-all hover:-translate-y-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm text-center flex items-center justify-center gap-2"
              >
                {getSocialIcon(platform)}
                {platform}
              </a>
            ))}
          </div>
        )}

        <div className="pt-12 mt-8 border-t border-slate-200 dark:border-slate-800 w-full text-xs opacity-60">
          © {new Date().getFullYear()} {personalInfo.firstName || 'User'} {personalInfo.lastName || ''}. All rights reserved.
        </div>
      </div>
    </section>
  );
}
