const Resume3 = ({ data }) => {
  const contact = data?.contact ?? { fullName: "Mia Ali", headline: "Brand & Digital Designer", email: "mia.ali@studio.com", phone: "+92 300 555 0142", location: "Karachi, Pakistan", website: "miastudio.co" };
  const skills = data?.skills?.length ? data.skills : ["Visual identity", "Digital product design", "Editorial design", "Creative direction", "Campaign systems"];
  const experiences = data?.experiences?.length ? data.experiences : [{ id: "1", role: "Senior Brand Designer", company: "Rally Creative", startDate: "2022", endDate: "Present", description: "Direct identity and launch work for technology and cultural brands." }, { id: "2", role: "Visual Designer", company: "Studio Morrow", startDate: "2019", endDate: "2022", description: "Designed campaigns, publication systems, and websites for international clients." }];
  const education = data?.education?.length ? data.education : [{ id: "1", degree: "BDes, Visual Communication", school: "Indus Valley School", year: "2019" }];
  return (
    <article className="min-h-[1123px] w-[794px] bg-[#fbfaf8] font-sans text-slate-700 shadow-2xl">
      <header className="bg-slate-950 px-12 py-12 text-white">
        <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.32em] text-amber-300">{contact.headline}</p><h1 className="mt-3 text-5xl font-black tracking-tight">{contact.fullName}</h1><p className="mt-3 text-sm text-slate-300">{data?.summary || "Creating considered identities and digital experiences."}</p></div><div className="h-20 w-20 rounded-full border-[9px] border-amber-400" /></div>
      </header>
      <div className="grid grid-cols-[0.7fr_1.3fr]">
        <aside className="bg-amber-400 px-8 py-10 text-slate-950">
          <Block title="Contact"><p>{contact.email}</p><p className="mt-2">{contact.phone}</p><p className="mt-2">{contact.location}</p><p className="mt-2">{contact.website}</p></Block>
          <Block title="Capabilities"><div className="space-y-1">{skills.map((skill) => <p key={skill}>{skill}</p>)}</div></Block>
          <Block title="Tools"><p>Figma<br />Illustrator<br />Photoshop<br />After Effects<br />Webflow</p></Block>
          <Block title="Education">{education.map((entry) => <div key={entry.id} className="mb-3"><p className="font-bold">{entry.degree}</p><p className="mt-1 text-xs">{entry.school}<br />{entry.year}</p></div>)}</Block>
        </aside>
        <main className="px-10 py-10">
          <Block title="About"><p className="text-sm leading-6">{data?.summary || "Multidisciplinary designer with a sharp eye for visual systems and a pragmatic approach to digital experiences."}</p></Block>
          <Block title="Selected experience">
            {experiences.map((experience) => <CreativeRole key={experience.id} title={experience.role} company={experience.company} dates={[experience.startDate, experience.endDate].filter(Boolean).join(" - ")} text={experience.description} />)}
          </Block>
          <Block title="Featured work"><div className="grid grid-cols-2 gap-4"><Project name="Verdant" type="Brand identity · 2024" /><Project name="Forma" type="Digital product · 2023" /><Project name="Sidecar" type="Campaign system · 2022" /><Project name="Field Notes" type="Editorial · 2021" /></div></Block>
        </main>
      </div>
    </article>
  );
};

function Block({ title, children }) { return <section className="mb-8"><h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em]">{title}</h2><div className="text-xs leading-5">{children}</div></section>; }
function CreativeRole({ title, company, dates, text }) { return <div className="mb-6 border-l-2 border-amber-400 pl-4"><div className="flex justify-between gap-3"><div><h3 className="text-sm font-bold text-slate-950">{title}</h3><p className="mt-1 text-xs text-slate-500">{company}</p></div><p className="text-[10px] text-slate-500">{dates}</p></div><p className="mt-2 text-xs leading-5">{text}</p></div>; }
function Project({ name, type }) { return <div className="border border-slate-200 bg-white p-3"><div className="mb-6 h-10 bg-slate-100" /><h3 className="text-xs font-bold text-slate-950">{name}</h3><p className="mt-1 text-[10px] text-slate-500">{type}</p></div>; }

export default Resume3;
