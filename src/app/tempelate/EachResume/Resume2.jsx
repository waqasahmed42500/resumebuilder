const Resume2 = () => {
  return (
    <div
    className="
    w-[794px]
    h-[1123px]
    bg-white
    shadow-2xl
    origin-top
    "
>
      <div className="bg-emerald-700 px-10 py-9 text-white">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[4px] text-emerald-100">Product Management</p>
            <h1 className="mt-3 text-4xl font-black tracking-[0.08em]">ALEX MORGAN</h1>
            <p className="mt-2 text-lg text-emerald-50">Senior Product Manager</p>
          </div>
          <div className="rounded-full border border-white/50 px-4 py-2 text-sm font-semibold">Available</div>
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr]">
        <div className="bg-slate-50 px-8 py-8">
          <section className="mb-7">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-emerald-700">Professional Summary</h2>
            <p className="text-[15px] leading-7 text-slate-600">
              Results-driven product manager with a proven record in roadmap strategy, cross-functional leadership, and customer-centric digital product delivery.
            </p>
          </section>

          <section className="mb-7">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-emerald-700">Experience</h2>
            <div className="space-y-5">
              <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Senior Product Manager</h3>
                    <p className="mt-1 text-sm text-slate-500">Bright Labs</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700">2022 - Present</span>
                </div>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Product Analyst</h3>
                    <p className="mt-1 text-sm text-slate-500">North Peak Studio</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700">2019 - 2022</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-emerald-700">Selected Projects</h2>
            <ul className="space-y-3 text-[15px] text-slate-600">
              <li>• Launch of a growth dashboard serving 3,000+ weekly users.</li>
              <li>• Delivered A/B test strategy that improved conversion by 18%.</li>
            </ul>
          </section>
        </div>

        <div className="bg-white px-8 py-8">
          <section className="mb-7">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-emerald-700">Contact</h2>
            <div className="space-y-3 text-[15px] text-slate-600">
              <p>alex@email.com</p>
              <p>+92 300 1234567</p>
              <p>Islamabad, Pakistan</p>
            </div>
          </section>

          <section className="mb-7">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-emerald-700">Core Skills</h2>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">Roadmaps</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">UX Strategy</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">SQL</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">Stakeholder Management</span>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-emerald-700">Education</h2>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">BS Software Engineering</p>
              <p className="mt-1 text-sm text-slate-500">University of Karachi</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume2;
