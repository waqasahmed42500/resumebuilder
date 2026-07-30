import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-100 px-4 py-16 text-slate-700 sm:px-8 md:px-16 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2">
          <Link href="/" className="mb-4 inline-block text-2xl font-black text-slate-900">
            Easy<span className="text-sky-700">Resume</span>
          </Link>
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-600">
            Free ATS resume builder helping job seekers build recruiter-approved professional resumes, CVs, and cover letters.
          </p>
          <div className="flex gap-3">
            <a
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition-all hover:bg-slate-900 hover:text-white"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Page"
            >
              <FaTwitter size={16} />
            </a>
            <a
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition-all hover:bg-slate-900 hover:text-white"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Page"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition-all hover:bg-slate-900 hover:text-white"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
            >
              <FaGithub size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 font-bold text-slate-900">Resume Builder</p>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/builder">
                Online Resume Builder
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/ats-resume-builder">
                ATS Resume Builder
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/templates">
                Resume Templates
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/examples">
                Resume Examples
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/cover-letter">
                Cover Letter Generator
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/country">
                Regional Resume Standards (US/UK/CA/AU/IN)
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/open-source">
                Open Source JSON Schemas & Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-bold text-slate-900">Popular Industry Resumes</p>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/templates/software-engineer">
                Software Engineer Resume
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/templates/registered-nurse">
                Registered Nurse Resume
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/templates/teacher">
                Teacher Resume
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/templates/accountant">
                Accountant Resume
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/templates/data-analyst">
                Data Analyst Resume
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-bold text-slate-900">Resources & Blog</p>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/blog">
                Career Blog & Guides
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/blog/how-to-pass-ats-resume-scanners-2026">
                ATS Optimization Guide
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/blog/top-fonts-for-ats-resumes">
                ATS Friendly Fonts
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-sky-700" href="/resources">
                Career Advice
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-4 border-t border-slate-200 pt-8 text-xs font-semibold uppercase tracking-wider text-slate-500 md:flex-row">
        <p>© {new Date().getFullYear()} EasyResume. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link href="/resources" className="hover:text-sky-700">
            Terms of Service
          </Link>
          <Link href="/resources" className="hover:text-sky-700">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}