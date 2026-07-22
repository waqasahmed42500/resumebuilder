const Resume5 = () => {
  return (
    <div className="w-[794px] -mt-[250px] scale-55 min-h-[1123px] bg-white shadow-2xl overflow-hidden">
      <div className="bg-slate-100 p-10">
        <div className="mb-8 border-b border-slate-300 pb-5">
          <p className="text-xs font-bold uppercase tracking-[4px] text-sky-700">Content & Brand</p>
          <h1 className="mt-3 text-4xl font-black tracking-[0.08em] text-slate-900">SARA HAMID</h1>
          <p className="mt-2 text-lg text-sky-700">Content Strategist</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <section className="mb-7">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-sky-700">Profile</h2>
              <p className="text-[15px] leading-7 text-slate-600">
                Strategist with expertise in audience growth, editorial planning, and brand storytelling across digital channels.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-sky-700">Experience</h2>
              <div className="space-y-4 rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Content Lead</h3>
                <p className="text-sm text-slate-500">Market Voice</p>
              </div>
            </section>
          </div>

          <div>
            <section className="mb-7">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-sky-700">Contact</h2>
              <div className="space-y-2 text-[15px] text-slate-600">
                <p>sara@example.com</p>
                <p>+92 333 9876543</p>
                <p>Karachi, Pakistan</p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[4px] text-sky-700">Skills</h2>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">SEO</span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">Copywriting</span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">Editorial Planning</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume5;
