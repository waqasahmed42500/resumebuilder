const Resume4 = ({ data }) => {
  const contact = data?.contact ?? { fullName: "Noor Khan", headline: "Communications & Partnerships", email: "noor.khan@email.com", phone: "+92 300 555 0124", location: "Karachi, Pakistan" };
  const skills = data?.skills?.length ? data.skills : ["Strategic communications", "Partnership development", "Community programs", "Editorial direction", "Public speaking"];
  const experiences = data?.experiences?.length ? data.experiences : [{ id: "1", role: "Head of Communications", company: "The Common Ground", startDate: "2021", endDate: "Present", description: "Lead messaging, media relations, and partnership strategy for a national civic innovation organization." }, { id: "2", role: "Communications Manager", company: "Crescent Foundation", startDate: "2018", endDate: "2021", description: "Created integrated campaigns across digital, press, and events." }];
  const education = data?.education?.length ? data.education : [{ id: "1", degree: "MA, Media Studies", school: "University of Karachi", year: "2017" }];
  return (
    <article className="flex min-h-[1123px] w-[794px] bg-white font-serif text-slate-700 shadow-2xl">
      <aside className="w-[230px] shrink-0 bg-rose-700 px-7 py-10 text-rose-50">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-rose-200">Curriculum vitae</p>
        <h1 className="mt-4 text-4xl font-bold leading-none">{contact.fullName}</h1>
        <p className="mt-4 border-t border-rose-400 pt-4 text-sm italic text-rose-100">{contact.headline}</p>
        <SideBlock title="Contact"><p>{contact.location}</p><p>{contact.email}</p><p>{contact.phone}</p></SideBlock>
        <SideBlock title="Strengths">{skills.map((skill) => <p key={skill}>{skill}</p>)}</SideBlock>
        <SideBlock title="Education">{education.map((entry) => <div key={entry.id} className="mb-3"><p className="font-bold text-white">{entry.degree}</p><p className="mt-1 text-rose-200">{entry.school}</p><p className="mt-1 text-[10px]">{entry.year}</p></div>)}</SideBlock>
        <SideBlock title="Languages"><p>English — Fluent</p><p>Urdu — Native</p></SideBlock>
      </aside>
      <main className="flex-1 px-10 py-12">
        <header className="mb-9 border-b border-rose-200 pb-6"><p className="max-w-md text-sm leading-6">{data?.summary || "Communications leader with a record of building meaningful partnerships, clear narratives, and campaigns that move audiences to action."}</p></header>
        <EditorialSection title="Professional experience">
          {experiences.map((experience) => <EditorialRole key={experience.id} role={experience.role} company={experience.company} dates={[experience.startDate, experience.endDate].filter(Boolean).join(" - ")} text={experience.description} />)}
        </EditorialSection>
        <EditorialSection title="Selected work"><ul className="space-y-3 text-xs leading-5"><li><span className="font-bold text-rose-800">Annual Impact Report</span> — Editorial lead for a report distributed to 20,000 stakeholders.</li><li><span className="font-bold text-rose-800">Future Cities Forum</span> — Built the partnership and speaker narrative for a 700-person summit.</li><li><span className="font-bold text-rose-800">Youth Voices</span> — Campaign that generated 1.8M organic impressions.</li></ul></EditorialSection>
        <EditorialSection title="Recognition"><p className="text-xs leading-5">Pakistan Communications Award, Finalist · Women in Media Fellowship · Guest Lecturer, IBA Karachi</p></EditorialSection>
      </main>
    </article>
  );
};

function SideBlock({ title, children }) { return <section className="mt-9 text-xs leading-5"><h2 className="mb-3 text-[9px] font-bold uppercase tracking-[0.25em] text-rose-200">{title}</h2><div className="space-y-1">{children}</div></section>; }
function EditorialSection({ title, children }) { return <section className="mb-8"><h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-rose-800">{title}</h2>{children}</section>; }
function EditorialRole({ role, company, dates, text }) { return <div className="mb-6"><div className="flex items-baseline justify-between gap-4"><div><h3 className="text-base font-bold text-slate-950">{role}</h3><p className="mt-1 text-xs italic text-rose-700">{company}</p></div><p className="shrink-0 text-[10px] text-slate-500">{dates}</p></div><p className="mt-2 text-xs leading-5">{text}</p></div>; }

export default Resume4;
