"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiShare, 
  HiMenu,
  HiX,
  HiChevronDown,
  HiChevronRight,
  HiDocumentText,
  HiTemplate,
  HiLightningBolt,
   
  HiClipboardCheck,
  HiBookOpen,
  HiGlobe,
  HiCode,
  HiInformationCircle,
  HiMail,
  HiAcademicCap,
  HiUserGroup,
  HiPencilAlt,
  HiBriefcase,
  HiSparkles,
  HiShieldCheck,
  HiQuestionMarkCircle,
  HiCollection,
  HiColorSwatch,
  HiViewGrid,
  HiEye,
} from "react-icons/hi";
import { MdRedo, MdUndo ,MdGridView, } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
/* ──────────────────────────────────────────────
   Navigation data structure
   ────────────────────────────────────────────── */

const navigation = [
  { label: "Home", href: "/" },
  {
    label: "Resume",
    children: [
      { label: "Resume Builder", href: "/builder", icon: HiDocumentText, desc: "Build your ATS resume online" },
      { label: "ATS Resume Builder", href: "/ats-resume-builder", icon: HiShieldCheck, desc: "Optimized for applicant tracking" },
      { label: "Cover Letter Builder", href: "/cover-letter", icon: HiPencilAlt, desc: "Matching cover letters for 30+ roles" },
      { label: "Resume Checker", href: "#", icon: HiClipboardCheck, desc: "Coming Soon", comingSoon: true },
    ],
  },
  {
    label: "Templates",
    children: [
      { label: "Resume Templates", href: "/templates", icon: HiTemplate, desc: "Browse all profession templates" },
      { label: "ATS Resume Templates", href: "/templates/software-engineer", icon: HiShieldCheck, desc: "Engineered to pass ATS filters" },
      { label: "Modern Templates", href: "/templates/frontend-developer", icon: HiSparkles, desc: "Clean & contemporary designs" },
      { label: "Professional Templates", href: "/templates/project-manager", icon: HiBriefcase, desc: "Corporate & executive styles" },
      { label: "Creative Templates", href: "/templates/ui-ux-designer", icon: HiColorSwatch, desc: "Stand out with creative flair" },
      { label: "Simple Templates", href: "/templates/student", icon: HiViewGrid, desc: "Minimalist & entry-level friendly" },
    ],
  },
  {
    label: "Examples",
    children: [
      { label: "Resume Examples", href: "/examples", icon: HiCollection, desc: "Full resume samples by role" },
      { label: "Software Engineer Resume", href: "/examples/software-engineer", icon: HiCode, desc: "Tech industry sample" },
      { label: "Teacher Resume", href: "/examples/teacher", icon: HiAcademicCap, desc: "Education sector sample" },
      { label: "Nurse Resume", href: "/examples/nurse", icon: HiUserGroup, desc: "Healthcare industry sample" },
      { label: "Student Resume", href: "/examples/student", icon: HiBookOpen, desc: "Entry-level / fresh graduate" },
      { label: "View All Examples →", href: "/examples", icon: HiEye, desc: "Browse all 30+ professions", highlight: true },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", icon: HiBookOpen, desc: "ATS guides & career articles" },
      { label: "Career Guides", href: "/resources", icon: HiLightningBolt, desc: "Step-by-step career resources" },
      { label: "Resume Tips", href: "/blog/how-to-pass-ats-resume-scanners-2026", icon: HiClipboardCheck, desc: "Beat ATS screening software" },
      { label: "FAQ", href: "/resources#faq", icon: HiQuestionMarkCircle, desc: "Common questions answered" },
      { label: "Pricing", href: "/pricing", icon: HiDocumentText, desc: "Free PDF download details" },
    ],
  },
  {
    label: "More",
    children: [
      { label: "Regional Resume Builders", href: "/country", icon: HiGlobe, desc: "US, UK, CA, AU & IN standards" },
      { label: "Open Source", href: "/open-source", icon: HiCode, desc: "GitHub schemas & developer tools" },
      { label: "About", href: "/resources#about", icon: HiInformationCircle, desc: "Our mission & team" },
      { label: "Contact", href: "/contact", icon: HiMail, desc: "Get in touch with us" },
    ],
  },
];

/* ──────────────────────────────────────────────
   Desktop Dropdown Component
   ────────────────────────────────────────────── */



function DesktopDropdown({ item, isOpen, onToggle, onClose, pathname }) {
  const dropdownRef = useRef(null);

  const isChildActive = item.children?.some(
    (child) => child.href !== "#" && pathname.startsWith(child.href) && child.href !== "/"
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={onToggle}
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
          isOpen || isChildActive
            ? "bg-slate-100 text-slate-900"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <HiChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute left-1/2 top-full z-50 pt-2 -translate-x-1/2 transition-all duration-200 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        onMouseLeave={onClose}
      >
        <div className="min-w-[320px] rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl shadow-slate-900/8">
          {item.children.map((child) => {
            const Icon = child.icon;
            const active =
              child.href !== "#" &&
              child.href !== "/" &&
              pathname.startsWith(child.href);

            return (
              <Link
                key={child.href + child.label}
                href={child.comingSoon ? "#" : child.href}
                onClick={onClose}
                className={`group flex items-start gap-3.5 rounded-xl px-3.5 py-3 transition-colors ${
                  child.comingSoon
                    ? "cursor-default opacity-50"
                    : active
                    ? "bg-sky-50 text-sky-800"
                    : child.highlight
                    ? "bg-emerald-50/60 hover:bg-emerald-50"
                    : "hover:bg-slate-50"
                }`}
                aria-current={active ? "page" : undefined}
                tabIndex={child.comingSoon ? -1 : 0}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    active
                      ? "bg-sky-100 text-sky-700"
                      : child.highlight
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <span
                    className={`block text-sm font-semibold leading-tight ${
                      active ? "text-sky-800" : child.highlight ? "text-emerald-800" : "text-slate-800"
                    }`}
                  >
                    {child.label}
                    {child.comingSoon && (
                      <span className="ml-2 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                        Soon
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                    {child.desc}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Mobile Accordion Group
   ────────────────────────────────────────────── */

function MobileAccordion({ item, pathname, onNavigate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50"
        aria-expanded={expanded}
      >
        {item.label}
        <HiChevronRight
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            expanded ? "rotate-90" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-250 ease-in-out ${
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-2 pl-4 pr-4">
          {item.children.map((child) => {
            const Icon = child.icon;
            const active =
              child.href !== "#" &&
              child.href !== "/" &&
              pathname.startsWith(child.href);

            return (
              <Link
                key={child.href + child.label}
                href={child.comingSoon ? "#" : child.href}
                onClick={() => !child.comingSoon && onNavigate()}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  child.comingSoon
                    ? "cursor-default opacity-40"
                    : active
                    ? "bg-sky-50 font-semibold text-sky-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                aria-current={active ? "page" : undefined}
                tabIndex={child.comingSoon ? -1 : 0}
              >
                <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                <span>{child.label}</span>
                {child.comingSoon && (
                  <span className="ml-auto rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Header Component
   ────────────────────────────────────────────── */

export default function Header({undo,canUndo,redo,canRedo,onChangeTemplate,handleShare,shareTooltip,selectedTemplate}) {
  const pathname = usePathname();
  const isEditorRoute = ["/builder", "/editor"].includes(pathname.toLowerCase()) || pathname.toLowerCase().startsWith("/builder/") || pathname.toLowerCase().startsWith("/editor/");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  /* Scroll detection for sticky shrink effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Close dropdown on Escape key */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* Close mobile menu on route change */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMobileMenuOpen(false);
      setOpenDropdown(null);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-md backdrop-blur-xl"
            : "bg-slate-50/80 shadow-sm backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 tracking-tight transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="shrink-0 text-lg font-extrabold text-slate-900 sm:text-xl"
            aria-label="Resuvix Home"
          >
            Easy<span className="text-sky-600">Resume</span>
          </Link>


          {/* ── Desktop Navigation ── */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navigation.map((item) => {
              if (!item.children) {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
                      active
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  isOpen={openDropdown === item.label}
                  onToggle={() =>
                    setOpenDropdown((prev) =>
                      prev === item.label ? null : item.label
                    )
                  }
                  onClose={() => setOpenDropdown(null)}
                  pathname={pathname}
                />
              );
            })}
          </div>

          {/* ── Right Section: CTA + Mobile Toggle ── */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {!isEditorRoute ? (
              <Link
                href="/builder"
                className={`rounded-xl bg-slate-900 font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-[0.97] ${
                  scrolled
                    ? "px-4 py-1.5 text-xs sm:px-5 sm:text-sm"
                    : "px-4 py-2 text-xs sm:px-5 sm:text-sm"
                }`}
              >
                Build Resume Free
              </Link>
            ):<div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            aria-label="Undo resume edit"
            className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition disabled:opacity-30 active:bg-slate-100"
          >
            <MdUndo className="h-4 w-4" />
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            aria-label="Redo resume edit"
            className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition disabled:opacity-30 active:bg-slate-100"
          >
            <MdRedo className="h-4 w-4" />
          </button>
        </div>

        {/* Change Template */}
        <button
          type="button"
          onClick={() => onChangeTemplate()}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition active:scale-95"
          title="Change Template"
          aria-label="Change resume template"
        >
          <MdGridView className="h-4 w-4 text-emerald-600" />
          <span className="hidden sm:inline">Template</span>
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={handleShare}
            className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:flex"
            title="Share"
            aria-label="Share resume builder link"
          >
            <HiShare className="h-3.5 w-3.5" />
            <span className="md:hidden inline ">Share</span>
          </button>
          {shareTooltip && (
            <div className="absolute right-0 top-full mt-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg whitespace-nowrap">
              Link copied!
            </div>
          )}
        </div>

        {/* Export PDF */}
        <Link
          href={`/export?template=${selectedTemplate}`}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition hover:shadow-md active:scale-95"
          aria-label="Export resume as PDF"
        >
          <IoMdDownload className="h-4 w-4" />
          <span className="hidden  md:inline">Export PDF</span>
        </Link>
      </div>
          
          }

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Full-Screen Slide-Out Menu ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        id="mobile-navigation"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Mobile Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
          <Link href="/" onClick={closeMobile} className="text-lg font-extrabold text-slate-900">
            Easy<span className="text-sky-600">Resume</span>
          </Link>
          <button
            type="button"
            onClick={closeMobile}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close navigation menu"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable nav items */}
        <div className="flex-1 overflow-y-auto overscroll-contain pb-28">
          {navigation.map((item) => {
            if (!item.children) {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobile}
                  className={`block border-b border-slate-100 px-4 py-3.5 text-base font-semibold transition-colors ${
                    active
                      ? "bg-sky-50 text-sky-800"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <MobileAccordion
                key={item.label}
                item={item}
                pathname={pathname}
                onNavigate={closeMobile}
              />
            );
          })}
        </div>

        {/* Sticky CTA at bottom */}
        {!isEditorRoute && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-4">
            <Link
              href="/builder"
              onClick={closeMobile}
              className="block w-full rounded-xl bg-slate-900 px-6 py-3.5 text-center text-base font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
              Build Resume Free →
            </Link>
            <p className="mt-2 text-center text-xs text-slate-500">
              🔒 100% Free · No Credit Card · Client-Side Privacy
            </p>
          </div>
        )}
      </div>
    </>
  );
}
