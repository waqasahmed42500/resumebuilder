const fallbackData = {
  contact: { fullName: "Alex Morgan", headline: "Senior Product Manager", email: "alex.morgan@email.com", phone: "+1 415 555 0198", location: "San Francisco, CA", website: "linkedin.com/in/alexmorgan" },
  summary: "Customer-obsessed product manager with 7 years of experience shaping B2B software, aligning teams around outcomes, and turning insight into simple, valuable products.",
  experiences: [
    { id: "experience-1", role: "Senior Product Manager", company: "Bright Labs", startDate: "2022", endDate: "Present", description: "Own strategy for a workflow platform serving 3,000 weekly users. Launched a self-serve onboarding experience that improved trial-to-paid conversion by 18%." },
    { id: "experience-2", role: "Product Manager", company: "Nimbus Health", startDate: "2019", endDate: "2022", description: "Led cross-functional squads across discovery, delivery, and measurement for a patient communications suite." },
  ],
  education: [{ id: "education-1", degree: "MBA, Product Strategy", school: "UC Berkeley", year: "2017" }, { id: "education-2", degree: "BA, Economics", school: "UCLA", year: "2013" }],
  skills: ["Roadmap strategy", "User research", "Go-to-market", "SQL & analytics", "Stakeholder alignment", "Experimentation"],
};

const Resume2 = ({ data = fallbackData }) => {

  
  const { contact, summary, experiences, education, skills } = data;

  return (
    <article className="min-h-[1123px] w-[794px] bg-white px-12 py-14 font-sans text-slate-700 shadow-2xl">
      <header className="flex items-end justify-between border-b border-emerald-700 pb-8">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.34em] text-emerald-700">Product management</p><h1 className="mt-3 text-5xl font-extrabold tracking-tight text-slate-950">{contact.fullName || "Your name"}</h1><p className="mt-2 text-base text-slate-500">{contact.headline || "Professional headline"}</p></div>
        <p className="mb-1 text-right text-[10px] leading-5 text-slate-500">{contact.email || "your.email@example.com"}<br />{contact.phone || "Phone number"}<br />{contact.location || "Your location"}<br />{contact.website || "Your website"}</p>
      </header>

      <div className="grid grid-cols-[1.55fr_0.85fr] gap-10 pt-9">
        <main>
          <Section title="Profile"><p className="text-sm leading-6">{summary || "Write a concise summary of your experience and the value you bring."}</p></Section>
          <Section title="Experience">
            {experiences.map((experience) => <Job key={experience.id} role={experience.role} company={experience.company} dates={[experience.startDate, experience.endDate].filter(Boolean).join(" - ")} text={experience.description} />)}
          </Section>
        </main>
        <aside className="border-l border-slate-200 pl-7">
          <Section title="Core strengths"><TagList items={skills} /></Section>
          <Section title="Education">{education.map((entry) => <div key={entry.id} className="mb-4 last:mb-0"><p className="text-xs font-bold text-slate-900">{entry.degree || "Degree"}</p><p className="mt-1 text-xs text-slate-500">{[entry.school, entry.year].filter(Boolean).join(" · ") || "School"}</p></div>)}</Section>
        </aside>
      </div>
    </article>
  );
};

function Section({ title, children }) { return <section className="mb-8"><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-emerald-700">{title}</h2>{children}</section>; }
function Job({ role, company, dates, text }) { return <div className="mb-6 last:mb-0"><div className="flex justify-between gap-3"><div><h3 className="text-sm font-bold text-slate-900">{role || "Role title"}</h3><p className="mt-1 text-xs text-slate-500">{company || "Company"}</p></div>{dates && <p className="shrink-0 text-[10px] font-semibold text-slate-500">{dates}</p>}</div><p className="mt-2 text-xs leading-5">{text || "Add your responsibilities and measurable impact."}</p></div>; }
function TagList({ items }) { return <div className="flex flex-wrap gap-2">{items.length ? items.map((item) => <span key={item} className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-900">{item}</span>) : <p className="text-xs text-slate-500">Add skills in the editor.</p>}</div>; }

export default Resume2;
