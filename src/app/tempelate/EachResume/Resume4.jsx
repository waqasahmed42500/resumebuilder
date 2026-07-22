const Resume4 = () => {
  return (
    <div className="w-[794px] -mt-[250px] scale-55 min-h-[1123px] bg-white shadow-2xl overflow-hidden">
      <div className="flex h-full">
        <div className="w-[230px] bg-rose-600 p-7 text-white">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[4px] text-rose-100">Engineering</p>
            <h1 className="mt-3 text-3xl font-black tracking-[0.08em]">NOOR KHAN</h1>
            <p className="mt-2 text-sm font-medium text-rose-50">Software Engineer</p>
          </div>

          <div className="space-y-6 text-sm">
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[4px] text-rose-100">Contact</h2>
              <p>noor@example.com</p>
              <p>+92 300 1122334</p>
            </div>
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[4px] text-rose-100">Skills</h2>
              <p>React • Node • APIs</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-50 p-8">
          <section className="mb-7">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-rose-700">Summary</h2>
            <p className="text-[15px] leading-7 text-slate-600">
              Software engineer focused on clean architecture, scalable systems, and high-quality user experiences.
            </p>
          </section>

          <section className="mb-7">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-rose-700">Experience</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-rose-100 bg-white p-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Frontend Engineer</h3>
                <p className="mt-1 text-sm text-slate-500">Swift Solutions</p>
              </div>
              <div className="rounded-xl border border-rose-100 bg-white p-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Backend Engineer</h3>
                <p className="mt-1 text-sm text-slate-500">Cloud Base</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-rose-700">Education</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">BS Computer Science</p>
              <p className="mt-1 text-sm text-slate-500">University of Management and Technology</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume4;
