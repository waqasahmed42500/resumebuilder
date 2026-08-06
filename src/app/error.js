'use client';

import Link from 'next/link';
import { HiHome, HiExclamation } from 'react-icons/hi';

export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4 font-sans text-center">
      <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-6">
        <HiExclamation className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-black mb-4">Something went wrong!</h1>
      <p className="text-slate-600 max-w-md mb-8">
        An unexpected error occurred while rendering this page. We've been notified and are looking into it.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition shadow-md"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-md flex items-center gap-2"
        >
          <HiHome className="w-5 h-5" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
