"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/builder", label: "Resume Builder" },
  { href: "/templates", label: "Templates" },
  { href: "/ats-resume-builder", label: "ATS Resume Builder" },
  { href: "/examples", label: "Examples" },
  { href: "/resources", label: "Resources" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-slate-50/80 shadow-sm backdrop-blur-md">
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 tracking-tight sm:px-6 lg:px-8"
      >
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/"
            className="truncate text-lg font-extrabold text-slate-900 sm:text-xl"
            aria-label="ResumeArchitect Home"
          >
            Resume<span className="text-sky-600">Architect</span>
          </Link>
          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`pb-1 text-sm font-semibold transition-colors ${
                    active
                      ? "border-b-2 border-slate-900 text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link
            href="/builder"
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 sm:px-5 sm:text-sm"
          >
            Build Resume Free
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-b border-slate-200 bg-white px-4 pb-6 pt-3 shadow-lg lg:hidden"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                    active
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
