const Resume7 = ({ data }) => {
  const contact = data?.contact ?? { fullName: "Ayesha Naz", headline: "Operations Coordinator", email: "ayesha.naz@email.com", phone: "+92 300 555 0168", location: "Lahore, Pakistan" };
  const skills = data?.skills?.length ? data.skills : ["Program coordination", "Vendor management", "Documentation", "Budget tracking", "Event operations", "Team support"];
  const experiences = data?.experiences?.length ? data.experiences : [{ id: "1", role: "Operations Coordinator", company: "Atlas Collective", startDate: "2022", endDate: "Present", description: "Coordinate delivery across client programs, internal operations, and vendor partners." }, { id: "2", role: "Program Associate", company: "Bright Path Foundation", startDate: "2020", endDate: "2022", description: "Supported program planning, reporting, partner communication, and event delivery." }];
  const education = data?.education?.length ? data.education : [{ id: "1", degree: "BBA, Management", school: "University of Lahore", year: "2018" }];
  return (
    <article className="min-h-[1123px] w-[794px] bg-white px-11 py-12 font-sans text-slate-700 shadow-2xl">
      <header className="rounded-2xl bg-violet-700 px-9 py-9 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.32em] text-violet-200">Operations & program coordination</p><div className="mt-3 flex items-end justify-between"><div><h1 className="text-5xl font-black tracking-tight">{contact.fullName}</h1><p className="mt-2 text-sm text-violet-100">{contact.headline}</p></div><p className="text-right text-[10px] leading-5 text-violet-100">{contact.email}<br />{contact.phone}<br />{contact.location}</p></div></header>
      <main className="pt-9">
        <CompactSection title="Profile"><p className="max-w-xl text-sm leading-6">{data?.summary || "Reliable, detail-oriented operations professional with experience keeping teams, timelines, and stakeholders moving in the same direction."}</p></CompactSection>
        <CompactSection title="Experience">
          {experiences.map((experience) => <CompactRole key={experience.id} title={experience.role} company={experience.company} dates={[experience.startDate, experience.endDate].filter(Boolean).join(" - ")} text={experience.description} />)}
        </CompactSection>
        <div className="grid grid-cols-2 gap-9 border-t border-slate-200 pt-8">
          <CompactSection title="Core capabilities"><div className="flex flex-wrap gap-2">{skills.map((item) => <span key={item} className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-medium text-violet-800">{item}</span>)}</div></CompactSection>
          <div><CompactSection title="Education">{education.map((entry) => <div key={entry.id} className="mb-3"><p className="text-xs font-bold text-slate-950">{entry.degree}</p><p className="mt-1 text-xs text-slate-500">{entry.school} · {entry.year}</p></div>)}</CompactSection><CompactSection title="Tools"><p className="text-xs leading-5">Asana · Notion · Google Workspace · Airtable</p></CompactSection></div>
        </div>
      </main>
    </article>
  );
};

function CompactSection({ title, children }) { return <section className="mb-8"><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-violet-700">{title}</h2>{children}</section>; }
function CompactRole({ title, company, dates, text }) { return <div className="mb-5 rounded-xl border border-slate-100 p-4"><div className="flex justify-between gap-4"><div><h3 className="text-sm font-bold text-slate-950">{title}</h3><p className="mt-1 text-xs text-violet-700">{company}</p></div><p className="shrink-0 text-[10px] text-slate-500">{dates}</p></div><p className="mt-2 text-xs leading-5">{text}</p></div>; }

export default Resume7;
