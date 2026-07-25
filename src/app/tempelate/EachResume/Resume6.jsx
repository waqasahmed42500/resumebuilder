const Resume6 = ({ data }) => {
  const contact = data?.contact ?? { fullName: "Hassan Raza", headline: "Senior Data Analyst", email: "hassan.raza@email.com", location: "Islamabad, Pakistan", website: "linkedin.com/in/hassanraza" };
  const skills = data?.skills?.length ? data.skills : ["SQL", "Python", "Power BI", "Tableau", "Excel", "dbt"];
  const experiences = data?.experiences?.length ? data.experiences : [{ id: "1", role: "Senior Data Analyst", company: "Meridian Retail", startDate: "2022", endDate: "Present", description: "Built a commercial performance model and executive dashboard suite." }, { id: "2", role: "Business Intelligence Analyst", company: "Orbit Telecom", startDate: "2019", endDate: "2022", description: "Partnered with growth and operations teams to measure performance." }];
  const education = data?.education?.length ? data.education : [{ id: "1", degree: "BS, Data Science", school: "FAST-NUCES", year: "2018" }];
  return (
    <article className="min-h-[1123px] w-[794px] bg-white font-sans text-slate-700 shadow-2xl">
      <header className="bg-slate-950 px-12 py-10 text-white"><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.32em] text-cyan-300">Data & business intelligence</p><h1 className="mt-3 text-5xl font-black tracking-tight">{contact.fullName}</h1><p className="mt-2 text-sm text-slate-300">{contact.headline}</p></div><p className="text-right text-[10px] leading-5 text-slate-400">{contact.email}<br />{contact.phone}<br />{contact.location}<br />{contact.website}</p></div></header>
      <div className="grid grid-cols-[0.9fr_1.45fr]">
        <aside className="bg-slate-100 px-8 py-10">
          <DataSection title="Technical toolkit"><div className="space-y-1">{skills.map((skill) => <p key={skill}>{skill}</p>)}</div></DataSection>
          <DataSection title="Areas of focus"><p>Decision systems<br />Experimentation<br />Forecasting<br />Dashboard design<br />Data quality</p></DataSection>
          <DataSection title="Education">{education.map((entry) => <div key={entry.id} className="mb-3"><p className="font-bold text-slate-900">{entry.degree}</p><p className="mt-1 text-slate-500">{entry.school} · {entry.year}</p></div>)}</DataSection>
          <DataSection title="Certifications"><p>Microsoft Power BI Data Analyst<br />Google Data Analytics<br />dbt Fundamentals</p></DataSection>
        </aside>
        <main className="px-10 py-10">
          <DataSection title="Summary"><p className="text-sm leading-6">{data?.summary || "Analyst who makes data practical. I build trusted reporting, uncover useful patterns, and help teams make faster, more confident decisions."}</p></DataSection>
          <DataSection title="Experience">
            {experiences.map((experience) => <DataRole key={experience.id} role={experience.role} company={experience.company} dates={[experience.startDate, experience.endDate].filter(Boolean).join(" - ")} text={experience.description} />)}
          </DataSection>
          <DataSection title="Business impact"><div className="grid grid-cols-3 gap-3"><DataMetric value="80%" label="faster reporting" /><DataMetric value="$620K" label="cost opportunity" /><DataMetric value="15+" label="data models" /></div></DataSection>
        </main>
      </div>
    </article>
  );
};

function DataSection({ title, children }) { return <section className="mb-8"><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-900">{title}</h2><div className="text-xs leading-5">{children}</div></section>; }
function DataRole({ role, company, dates, text }) { return <div className="mb-6 border-l border-cyan-500 pl-4"><div className="flex justify-between gap-4"><div><h3 className="text-sm font-bold text-slate-950">{role}</h3><p className="mt-1 text-xs text-cyan-700">{company}</p></div><p className="shrink-0 text-[10px] text-slate-500">{dates}</p></div><p className="mt-2 text-xs leading-5">{text}</p></div>; }
function DataMetric({ value, label }) { return <div className="rounded bg-slate-100 p-3"><p className="text-lg font-bold text-slate-950">{value}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">{label}</p></div>; }

export default Resume6;
