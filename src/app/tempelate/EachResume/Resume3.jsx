const Resume3 = () => {
  return (
    <div className="w-[794px] -mt-[250px] scale-55 min-h-[1123px] bg-white shadow-2xl overflow-hidden">
      <div className="bg-amber-500 px-10 py-8 text-slate-900">
        <p className="text-xs font-bold uppercase tracking-[4px] text-slate-800">Creative Portfolio</p>
        <h1 className="mt-3 text-4xl font-black tracking-[0.08em]">MIA ALI</h1>
        <p className="mt-2 text-lg font-semibold text-slate-800">Graphic Designer</p>
      </div>

      <div className="grid grid-cols-[0.9fr_1.1fr]">
        <div className="bg-slate-900 p-8 text-white">
          <section className="mb-7">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-amber-300">Profile</h2>
            <p className="text-[15px] leading-7 text-slate-300">
              Creative designer with a strong visual eye for branding, layout systems, and polished product storytelling.
            </p>
          </section>

          <section className="mb-7">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-amber-300">Contact</h2>
            <div className="space-y-3 text-[15px] text-slate-300">
              <p>mia.design@example.com</p>
              <p>+92 321 4567890</p>
              <p>Lahore, Pakistan</p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-amber-300">Tools</h2>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-white/10 px-3 py-1">Figma</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Illustrator</span>
              <span className="rounded-full bg-white/10 px-3 py-1">Photoshop</span>
            </div>
          </section>
        </div>

        <div className="bg-slate-50 p-8">
          <section className="mb-7">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-amber-700">Experience</h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Lead Designer</h3>
                <p className="mt-1 text-sm text-slate-500">Creative & Co.</p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Visual Designer</h3>
                <p className="mt-1 text-sm text-slate-500">Studio Frontier</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[4px] text-amber-700">Education</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">BFA in Visual Arts</p>
              <p className="mt-1 text-sm text-slate-500">National College of Arts</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume3;
