import Link from 'next/link';
import { HiSearch, HiHome } from 'react-icons/hi';

export const metadata = {
  title: 'Page Not Found | Resuvix',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 text-center px-4 font-sans py-20">
      <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-8 relative">
        <HiSearch className="w-10 h-10 text-slate-500" />
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 font-black text-xl border-4 border-white">
          ?
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">404</h1>
      <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-4">Page Not Found</h2>
      
      <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg">
        We couldn't find the page you were looking for. It might have been moved, renamed, or deleted.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          href="/" 
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
        >
          <HiHome className="w-5 h-5" />
          Return to Homepage
        </Link>
        <Link 
          href="/builder" 
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-md"
        >
          Build a Resume
        </Link>
      </div>
    </div>
  );
}
