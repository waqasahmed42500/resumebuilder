const Resume5 = ({ data }) => {
  const contact = data?.contact ?? { fullName: "Sara Hamid", headline: "Content Marketing Lead", email: "sara.hamid@email.com", location: "Lahore, Pakistan", website: "sarahamid.co" };
  const skills = data?.skills?.length ? data.skills : ["Content strategy", "SEO", "Editorial planning", "Copywriting", "Email lifecycle", "GA4"];
  const experiences = data?.experiences?.length ? data.experiences : [{ id: "1", role: "Content Marketing Lead", company: "Lumen Commerce", startDate: "2022", endDate: "Present", description: "Own the content engine for a fast-growing marketplace." }, { id: "2", role: "Senior Content Strategist", company: "Tangent Studio", startDate: "2019", endDate: "2022", description: "Directed editorial strategy and campaign production." }];
  const education = data?.education?.length ? data.education : [{ id: "1", degree: "BA, English Literature", school: "LUMS", year: "2017" }];
  return (
    <article className="min-h-[1123px] w-[794px] bg-slate-50 p-0 font-sans text-slate-700 shadow-2xl">
      <div className="min-h-[1043px] bg-white px-10 py-11">
        <header className="flex items-start justify-between"><div><div className="mb-4 h-2 w-12 bg-sky-500" /><h1 className="text-5xl font-black tracking-tight text-slate-950">{contact.fullName}</h1><p className="mt-2 text-base font-medium text-sky-700">{contact.headline}</p></div><p className="text-right text-[10px] leading-5 text-slate-500">{contact.email}<br />{contact.phone}<br />{contact.location}<br />{contact.website}</p></header>
        <div className="mt-8 grid grid-cols-[1.55fr_0.85fr] gap-9 border-t border-slate-200 pt-8">
          <main>
            <CleanSection title="Profile"><p className="text-sm leading-6">{data?.summary || "Content strategist who combines editorial craft with performance insight to build useful brand stories and sustainable growth engines."}</p></CleanSection>
            <CleanSection title="Experience">
              {experiences.map((experience) => <CleanRole key={experience.id} role={experience.role} company={experience.company} dates={[experience.startDate, experience.endDate].filter(Boolean).join(" - ")} text={experience.description} />)}
            </CleanSection>
            <CleanSection title="Campaign highlights"><div className="grid grid-cols-2 gap-4"><Metric number="72%" label="organic growth" /><Metric number="3.4x" label="newsletter revenue" /><Metric number="48" label="articles shipped / quarter" /><Metric number="11" label="markets localized" /></div></CleanSection>
          </main>
          <aside>
            <CleanSection title="Core skills"><Pills items={skills} /></CleanSection>
            <CleanSection title="Education">{education.map((entry) => <div key={entry.id} className="mb-3"><p className="text-xs font-bold text-slate-900">{entry.degree}</p><p className="mt-1 text-xs text-slate-500">{entry.school} · {entry.year}</p></div>)}</CleanSection>
            <CleanSection title="Selected tools"><p className="text-xs leading-6">Ahrefs<br />Google Analytics<br />HubSpot<br />Notion<br />Figma</p></CleanSection>
          </aside>
        </div>
      </div>
    </article>
  );
};

function CleanSection({ title, children }) { return <section className="mb-8"><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-sky-700">{title}</h2>{children}</section>; }
function CleanRole({ role, company, dates, text }) { return <div className="mb-6"><div className="flex justify-between gap-4"><div><h3 className="text-sm font-bold text-slate-950">{role}</h3><p className="mt-1 text-xs text-slate-500">{company}</p></div><p className="shrink-0 text-[10px] text-slate-500">{dates}</p></div><p className="mt-2 text-xs leading-5">{text}</p></div>; }
function Pills({ items }) { return <div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-medium text-sky-800">{item}</span>)}</div>; }
function Metric({ number, label }) { return <div className="border-l-2 border-sky-400 pl-3"><p className="text-xl font-bold text-slate-900">{number}</p><p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">{label}</p></div>; }

export default Resume5;
