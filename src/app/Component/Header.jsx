"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tempelate", label: "Templates" },
  { href: "/examples", label: "Examples" },
  { href: "/resources", label: "Resources" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-slate-50/70 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-full items-center justify-between gap-3 px-4 tracking-tight sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" className="truncate text-base font-bold text-slate-900 sm:text-xl">
            ResumeArchitect
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`pb-1 text-sm font-semibold transition-colors ${active
                    ? "border-b-2 border-slate-900 text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
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
          <button className="hidden px-5 py-2 text-sm font-medium text-slate-900 transition-all duration-200 hover:opacity-80 sm:block">
            Log In
          </button>
          <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white shadow-sm transition-all active:scale-95 sm:px-5">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}
