const Resume6 = () => {
  return (
    <div className="w-[794px] -mt-[250px] scale-55 min-h-[1123px] bg-white shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-slate-900 px-10 py-8 text-white">
        <p className="text-xs font-bold uppercase tracking-[4px] text-slate-300">Business Intelligence</p>
        <h1 className="mt-3 text-4xl font-black tracking-[0.08em]">HASSAN RAZA</h1>
        <p className="mt-2 text-lg text-slate-300">Data Analyst</p>
      </div>

      <div className="grid grid-cols-[0.95fr_1.05fr]">
        <div className="bg-slate-100 p-8">
          <section className="mb-7">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-slate-900">Contact</h2>
            <div className="space-y-2 text-[15px] text-slate-600">
              <p>hassan@example.com</p>
              <p>+92 300 3332222</p>
              <p>Islamabad, Pakistan</p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-slate-900">Skills</h2>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Power BI</span>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Excel</span>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-white">SQL</span>
            </div>
          </section>
        </div>

        <div className="bg-white p-8">
          <section className="mb-7">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-slate-900">Summary</h2>
            <p className="text-[15px] leading-7 text-slate-600">
              Analytical professional with a passion for business intelligence, dashboard reporting, and actionable insights.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-slate-900">Experience</h2>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Business Analyst</h3>
              <p className="mt-1 text-sm text-slate-500">Analytics Edge</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume6;
