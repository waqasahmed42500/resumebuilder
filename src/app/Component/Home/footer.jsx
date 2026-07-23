export default function Footer() {
  return (
    <footer className="border-t-0 bg-slate-100 px-8 py-16 text-slate-700 md:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2">
          <span className="mb-6 block text-2xl font-bold text-slate-900">ResumeArchitect</span>
          <p className="mb-8 max-w-xs leading-relaxed text-slate-600">
            Elevating professional identities through architectural design principles and editorial excellence.
          </p>
          <div className="flex gap-4">
            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all hover:bg-sky-600 hover:text-white" href="#">
              <span className="material-symbols-outlined text-xl">share</span>
            </a>
            <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all hover:bg-sky-600 hover:text-white" href="#">
              <span className="material-symbols-outlined text-xl">language</span>
            </a>
          </div>
        </div>
        <div>
          <h5 className="mb-6 font-bold text-slate-900">Product</h5>
          <ul className="space-y-4 text-sm font-medium text-slate-600">
            <li><a className="transition-colors hover:text-sky-700" href="#">Templates</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Resume Builder</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Cover Letters</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-6 font-bold text-slate-900">Support</h5>
          <ul className="space-y-4 text-sm font-medium text-slate-600">
            <li><a className="transition-colors hover:text-sky-700" href="#">Help Center</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Guidebook</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Contact Us</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-6 font-bold text-slate-900">Company</h5>
          <ul className="space-y-4 text-sm font-medium text-slate-600">
            <li><a className="transition-colors hover:text-sky-700" href="#">About Us</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Careers</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Blog</a></li>
            <li><a className="transition-colors hover:text-sky-700" href="#">Press Kit</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-4 border-t border-slate-200 pt-8 text-xs font-bold uppercase tracking-widest text-slate-500 md:flex-row">
        <p>© 2024 ResumeArchitect. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-sky-700">Terms of Service</a>
          <a href="#" className="hover:text-sky-700">Cookies Policy</a>
        </div>
      </div>
    </footer>
  );
}