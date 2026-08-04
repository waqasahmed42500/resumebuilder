import { CiEdit } from "react-icons/ci";
import { GoUpload } from "react-icons/go";
import { MdOutlinePalette, MdOutlineVerified } from "react-icons/md";

export default function Sec3() {
  return (
    <section className="overflow-hidden bg-slate-200 px-8 py-32 text-black md:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-24 -top-24 aspect-square w-full rounded-full bg-sky-200/60 blur-3xl"></div>
            <div className="relative z-10 space-y-12">
              <div className="group flex gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm transition-colors group-hover:bg-sky-700 group-hover:text-white">
                  <CiEdit size={28} />
                </div>
                <div>
                  <h4 className="mb-2 text-2xl font-bold">Architect Your Content</h4>
                  <p className="leading-relaxed text-slate-600">
                    Input your history using our guided editorial assistant. We help you find the right words to describe your impact, not just your duties.
                  </p>
                </div>
              </div>

              <div className="group flex gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm transition-colors group-hover:bg-sky-700 group-hover:text-white">
                  <MdOutlinePalette size={28} />
                </div>
                <div>
                  <h4 className="mb-2 text-2xl font-bold">Select Your Framework</h4>
                  <p className="leading-relaxed text-slate-600">
                    Choose from our gallery of high-end layouts. Each one is mathematically balanced for white space and readability.
                  </p>
                </div>
              </div>

              <div className="group flex gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm transition-colors group-hover:bg-sky-700 group-hover:text-white">
                  <GoUpload size={28} />
                </div>
                <div>
                  <h4 className="mb-2 text-2xl font-bold">Publish with Precision</h4>
                  <p className="leading-relaxed text-slate-600">
                    Export to ATS-optimized PDF or share a private web-link with custom analytics to see when employers view your profile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="mb-8 text-5xl font-extrabold leading-tight tracking-tighter">
              Sophistication <br /> made simple.
            </h2>
            <p className="mb-12 max-w-md text-lg text-slate-600">
              We&apos;ve removed the technical friction of document design so you can focus on what truly matters: your career progression.
            </p>
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <MdOutlineVerified size={24} />
                </div>
                <div>
                  <p className="font-bold">ATS Optimized</p>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Guaranteed Compatibility
                  </p>
                </div>
              </div>
              <p className="text-sm italic text-slate-600">
                &quot;The editorial approach at Resuvix helped me land my Senior Product role at a top-tier tech firm. The layout stood out immediately.&quot;
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm font-bold">Sarah Jenkins</span>
                <span className="text-xs text-slate-500">— Product Lead</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}