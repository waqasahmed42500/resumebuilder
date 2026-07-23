import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-slate-50/70 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-full items-center justify-between px-8 tracking-tight">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-slate-900">
            ResumeArchitect
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <a className="border-b-2 border-slate-900 pb-1 text-slate-900 transition-colors hover:text-slate-900" href="#">
              Templates
            </a>
            <a className="text-slate-500 transition-colors hover:text-slate-900" href="#">
              Examples
            </a>
            <a className="text-slate-500 transition-colors hover:text-slate-900" href="#">
              Resources
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 text-sm font-medium text-slate-900 transition-all duration-200 hover:opacity-80">
            Log In
          </button>
          <button className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-sm transition-all active:scale-95">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}