const Resume7 = () => {
  return (
    <div className="w-[794px] -mt-[250px] scale-55 min-h-[1123px] bg-white shadow-2xl overflow-hidden">
      <div className="bg-violet-700 px-10 py-8 text-white">
        <p className="text-xs font-bold uppercase tracking-[4px] text-violet-100">Operations</p>
        <h1 className="mt-3 text-4xl font-black tracking-[0.08em]">AYESHA NAZ</h1>
        <p className="mt-2 text-lg text-violet-100">Project Coordinator</p>
      </div>

      <div className="p-8 bg-slate-50">
        <section className="mb-7">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-violet-700">Summary</h2>
          <p className="text-[15px] leading-7 text-slate-600">
            Organized and detail-oriented coordinator with experience supporting teams, managing timelines, and delivering projects efficiently.
          </p>
        </section>

        <section className="mb-7">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-violet-700">Experience</h2>
          <div className="rounded-xl border border-violet-100 bg-white p-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">Project Coordinator</h3>
            <p className="mt-1 text-sm text-slate-500">BrightBridge Ltd.</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-violet-700">Skills</h2>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-700">Scheduling</span>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-700">Documentation</span>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-700">Team Coordination</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume7;
