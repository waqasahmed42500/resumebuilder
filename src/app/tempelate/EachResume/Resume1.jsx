const Resume1 = ({ data, theme }) => {
  const accent = theme?.accent || "#0f766e";
  const fontFamily = theme?.fontFamily || "Inter, sans-serif";
  const contact = data?.contact ?? {
  fullName: "John Doe",
  headline: "Senior Product Designer",
  email: "john.doe@email.com",
  phone: "+1 212 555 0198",
  location: "New York, NY",
  website: "johndoe.design",
  photo: "",
};
  const skills = data?.skills?.length ? data.skills : ["Product strategy", "UX research", "Design systems", "Figma", "Mentoring", "Analytics"];
  const experiences = data?.experiences?.length ? data.experiences : [
    { id: "1", role: "Senior Product Designer", company: "Aesthetic Systems", startDate: "2021", endDate: "Present", description: "Led end-to-end design for a B2B platform used by 18,000+ teams." }, { id: "2", role: "Product Designer", company: "Northstar Studio", startDate: "2018", endDate: "2021", description: "Designed research-backed workflows, prototypes, and a shared component library." }];
  const education = data?.education?.length ? data.education : [{ id: "1", degree: "BFA, Interaction Design", school: "Parsons School of Design", year: "2018" }];

  return (
    <article className="flex min-h-[1123px] w-[794px] overflow-hidden bg-white text-slate-700 shadow-2xl" style={{ fontFamily }}>
      <aside className="w-[248px] shrink-0 bg-slate-900 px-8 py-12 text-slate-200">
        <div className="mb-8 flex justify-center">
  {contact.photo ? (
    <img
      src={contact.photo}
      alt={contact.fullName}
      className="h-28 w-28 rounded-full object-cover ring-4"
      style={{ "--tw-ring-color": accent }}
    />
  ) : (
    <div
      className="flex h-28 w-28 items-center justify-center rounded-full ring-4 text-2xl font-black text-white"
      style={{ backgroundColor: accent, "--tw-ring-color": accent }}
    >
      {getInitials(contact.fullName)}
    </div>
  )}
</div>

        <div className="mb-12 border-l-2 pl-4" style={{ borderColor: accent }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accent }}>Professional profile</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{data?.summary || "Strategic design leader who turns complex product problems into clear, useful experiences."}</p>
        </div>

        <ResumeSection title="Contact" dark>
          <div className="space-y-3 text-xs leading-5 text-slate-300">
            <p>{contact.location}</p><p>{contact.phone}</p><p>{contact.email}</p><p>{contact.website}</p>
          </div>
        </ResumeSection>

        <ResumeSection title="Expertise" dark>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => <span key={skill} className="rounded-full border border-slate-600 px-2.5 py-1 text-[10px] font-medium text-slate-200">{skill}</span>)}
          </div>
        </ResumeSection>

        

        <ResumeSection title="Languages" dark>
          <div className="space-y-2 text-xs"><p className="flex justify-between"><span>English</span><span className="text-slate-400">Native</span></p><p className="flex justify-between"><span>Spanish</span><span className="text-slate-400">Professional</span></p></div>
        </ResumeSection>
      </aside>

      <main className="flex-1 px-12 py-12">
        <header className="border-b-2 mb-3 border-slate-900 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.32em]" style={{ color: accent }}>{contact.headline}</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">{contact.fullName}</h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500">{data?.summary || "Building thoughtful digital products at the intersection of customer needs, business goals, and scalable systems."}</p>
        </header>

<ResumeSection title="Education" >
          {education.map((entry) => <div key={entry.id} className="mb-4 last:mb-0 text-black">
            <p className="text-sm font-semibold text-black">{entry.degree}</p>
            <p className="mt-1 text-xs text-black">{entry.school}</p><p className="mt-1 text-[10px] text-black">{entry.year}</p></div>)}
        </ResumeSection>

        <div className="pt-2">
          <ResumeSection title="Experience">
            {experiences.map((experience) => <Role key={experience.id} title={experience.role} company={experience.company} dates={[experience.startDate, experience.endDate].filter(Boolean).join(" - ")} description={experience.description} />)}
          </ResumeSection>

          <ResumeSection title="Selected impact">
            <div className="grid grid-cols-3 gap-3">
              {[['40%', 'higher activation'], ['25%', 'less churn'], ['4', 'designers mentored']].map(([value, label]) => <div key={label} className="border-l-2 pl-3" style={{ borderColor: accent }}><p className="text-xl font-bold text-slate-900">{value}</p><p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">{label}</p></div>)}
            </div>
          </ResumeSection>

          <ResumeSection title="Recognition">
            <p className="text-sm leading-6">Speaker, Design Systems Summit 2024 · Mentor, AIGA New York · Finalist, Fast Company Innovation by Design Awards</p>
          </ResumeSection>
        </div>
      </main>
    </article>
  );
};

function ResumeSection({ title, children, dark = false }) {
  return <section className="mb-8"><h2 className={`mb-4 text-[10px] font-bold uppercase tracking-[0.25em] ${dark ? 'text-slate-300' : 'text-slate-900'}`}>{title}</h2>{children}</section>;
}

function Role({ title, company, dates, description }) {
  return <div className="mb-6 last:mb-0"><div className="flex items-baseline justify-between gap-4"><div><h3 className="text-base font-bold text-slate-900">{title}</h3><p className="mt-1 text-xs font-semibold" style={{ color: '#0f766e' }}> {company}</p></div><p className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-slate-500">{dates}</p></div><p className="mt-3 text-xs leading-5 text-slate-600">{description}</p></div>;
}
function getInitials(fullName = "") {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
export default Resume1;
