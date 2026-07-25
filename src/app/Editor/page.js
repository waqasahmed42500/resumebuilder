"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Header from "../Component/Header";
import Resume1 from "../tempelate/EachResume/Resume1";
import Resume2 from "../tempelate/EachResume/Resume2";
import Resume3 from "../tempelate/EachResume/Resume3";
import Resume4 from "../tempelate/EachResume/Resume4";
import Resume5 from "../tempelate/EachResume/Resume5";
import Resume6 from "../tempelate/EachResume/Resume6";
import Resume7 from "../tempelate/EachResume/Resume7";
import { MdBuild, MdPermContactCalendar, MdSchool, MdWork } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { VscSaveAs } from "react-icons/vsc";

const editorSections = [
  { id: "contact", label: "Contact" , icon: <MdPermContactCalendar  />  },
  { id: "experience", label: "Experience" , icon: <MdWork /> },
  { id: "education", label: "Education" , icon: <MdSchool /> },
  { id: "skills", label: "Skills" , icon: <MdBuild /> },
];

const templateNames = {
  resume1: "Modernist",
  resume2: "The Curator",
  resume3: "Executive",
  resume4: "Zenith",
  resume5: "The Blueprint",
  resume6: "Helvetica",
  resume7: "Northstar",
};

const fontOptions = [
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Trebuchet MS', sans-serif", label: "Trebuchet" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
];

const accentPresets = [
  { value: "#0f766e", label: "Teal" },
  { value: "#2563eb", label: "Blue" },
  { value: "#7c3aed", label: "Violet" },
  { value: "#dc2626", label: "Red" },
];

const initialCuratorData = {
  contact: {
    fullName: "Alex Morgan",
    headline: "Senior Product Manager",
    email: "alex.morgan@email.com",
    phone: "+1 415 555 0198",
    location: "San Francisco, CA",
    website: "linkedin.com/in/alexmorgan",
  },
  summary: "Customer-obsessed product manager with 7 years of experience shaping B2B software, aligning teams around outcomes, and turning insight into simple, valuable products.",
  experiences: [
    { id: "experience-1", role: "Senior Product Manager", company: "Bright Labs", startDate: "2022", endDate: "Present", description: "Own strategy for a workflow platform serving 3,000 weekly users. Launched a self-serve onboarding experience that improved trial-to-paid conversion by 18%." },
    { id: "experience-2", role: "Product Manager", company: "Nimbus Health", startDate: "2019", endDate: "2022", description: "Led cross-functional squads across discovery, delivery, and measurement for a patient communications suite." },
  ],
  education: [
    { id: "education-1", degree: "MBA, Product Strategy", school: "UC Berkeley", year: "2017" },
    { id: "education-2", degree: "BA, Economics", school: "UCLA", year: "2013" },
  ],
  skills: ["Roadmap strategy", "User research", "Go-to-market", "SQL & analytics", "Stakeholder alignment", "Experimentation"],
};

const draftStorageKey = "resume-builder-draft-v1";

function readStoredDraft() {
  if (typeof window === "undefined") return null;

  try {
    const rawDraft = window.localStorage.getItem(draftStorageKey);
    return rawDraft ? JSON.parse(rawDraft) : null;
  } catch (error) {
    console.warn("Unable to read saved draft", error);
    return null;
  }
}

function writeStoredDraft(payload) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(draftStorageKey, JSON.stringify(payload));
  } catch (error) {
    console.warn("Unable to save draft", error);
  }
}

export default function Editor() {
  return <Suspense fallback={<EditorLoading />}><EditorContent /></Suspense>;
}

function EditorLoading() {
  return <><Header /><main className="min-h-screen bg-slate-100 pt-16" /></>;
}

function EditorContent() {
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get("template") || "resume1";
  const storedDraft = readStoredDraft();
  const [activeSection, setActiveSection] = useState(storedDraft?.activeSection || "contact");
  const [resumeData, setResumeData] = useState(storedDraft?.resumeData || initialCuratorData);
  const [skillInput, setSkillInput] = useState(storedDraft?.skillInput || "");
  const [targetKeywords, setTargetKeywords] = useState(storedDraft?.targetKeywords || "");
  const [showAtsScore, setShowAtsScore] = useState(Boolean(storedDraft?.showAtsScore));
  const [themeAccent, setThemeAccent] = useState(storedDraft?.themeAccent || "#0f766e");
  const [themeFont, setThemeFont] = useState(storedDraft?.themeFont || "Inter, sans-serif");
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [draftStatus, setDraftStatus] = useState(storedDraft ? "Draft restored" : "Auto-saves locally");
  const [draftSavedAt, setDraftSavedAt] = useState(storedDraft?.updatedAt ? new Date(storedDraft.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "");
  const previewRef = useRef(null);
  
  const templateComponents = { resume1: Resume1, resume2: Resume2, resume3: Resume3, resume4: Resume4, resume5: Resume5, resume6: Resume6, resume7: Resume7 };
  const SelectedResume = templateComponents[selectedTemplate] || Resume1;
  const selectedName = templateNames[selectedTemplate] || "Resume Builder";
  const activeIndex = editorSections.findIndex((section) => section.id === activeSection);
  const section = editorSections[activeIndex];
  const atsAnalysis = buildAtsAnalysis(resumeData, targetKeywords);
  
  const updateContact = (field, value) => setResumeData((current) => ({ ...current, contact: { ...current.contact, [field]: value } }));
  const updateSummary = (value) => setResumeData((current) => ({ ...current, summary: value }));
  const updateCollection = (collection, id, field, value) => setResumeData((current) => ({ ...current, [collection]: current[collection].map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  const addExperience = () => setResumeData((current) => ({ ...current, experiences: [...current.experiences, { id: `experience-${Date.now()}`, role: "", company: "", startDate: "", endDate: "", description: "" }] }));
  const addEducation = () => setResumeData((current) => ({ ...current, education: [...current.education, { id: `education-${Date.now()}`, degree: "", school: "", year: "" }] }));
  const removeItem = (collection, id) => setResumeData((current) => current[collection].length > 1 ? { ...current, [collection]: current[collection].filter((item) => item.id !== id) } : current);
  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill || resumeData.skills.some((item) => item.toLowerCase() === skill.toLowerCase())) return;
    setResumeData((current) => ({ ...current, skills: [...current.skills, skill] }));
    setSkillInput("");
  };
  const removeSkill = (skill) => setResumeData((current) => ({ ...current, skills: current.skills.filter((item) => item !== skill) }));

  const persistDraft = (statusMessage = "Auto-saved locally") => {
    const payload = {
      resumeData,
      skillInput,
      targetKeywords,
      activeSection,
      showAtsScore,
      themeAccent,
      themeFont,
      updatedAt: Date.now(),
    };

    writeStoredDraft(payload);
    setDraftStatus(statusMessage);
    setDraftSavedAt(new Date(payload.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
  };
  
  const [sideBarHOver, setsideBarHOver] = useState(false)
  const [ShowResumeScore, setShowResumeScore] = useState(false)
  useEffect(() => {
    persistDraft("Auto-saved locally");
  }, [resumeData, skillInput, targetKeywords, activeSection, showAtsScore, themeAccent, themeFont]);

  const handleSaveDraft = () => {
    persistDraft("Draft saved");
  };
  
  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    setIsExportingPdf(true);
    const controls = document.querySelector(".theme-controls");

    try {
      
      
      
controls?.classList.add("hidden");

const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      controls?.classList.remove("hidden");
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const marginX = 24;
      const marginY = 24;
      const availableWidth = pageWidth - marginX * 2;
      const availableHeight = pageHeight - marginY * 2;
      const imgWidth = availableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const finalHeight = Math.min(imgHeight, availableHeight);
      const finalWidth = (canvas.width * finalHeight) / canvas.height;

      pdf.addImage(imgData, "PNG", marginX, marginY, finalWidth, finalHeight, undefined, "FAST");
      pdf.save(`${selectedName.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`);
    } catch (error) {
      console.error("PDF export failed", error);
      window.print();
    } finally {
      setIsExportingPdf(false);
      controls?.classList.remove("hidden");
    }
  };
  
  return (
    <>
      <Header />
      <main className="min-h-screen  bg-slate-100 pt-16">
        <div className="flex">
          <div
  className={`fixed left-0 top-0 z-20 h-screen w-full bg-black/60 pt-16 transition-all duration-300
  ${sideBarHOver || ShowResumeScore ? "block" : "hidden"}
  `}
>

          </div>

          <aside 
          onMouseEnter={()=> setsideBarHOver(true)}
          onMouseLeave={()=> setsideBarHOver(false)}
          className={`editor-sidebar ${ShowResumeScore ? 'brightness-50' :'brightness-100'} group hover:w-55 fixed transition-[all_1s] h-[90vh] inset-y-16 left-0 z-30 hidden w-16 flex-col border-r border-slate-200 bg-white p-2 md:flex  `}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">

  {/* Circle Progress */}
  <div className="flex justify-center group-hover:hidden">
    <div className="relative h-10 w-10">
      <svg className="h-10  w-10 -rotate-90">
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="#10b981"
          strokeWidth="4"
          fill="none"
          strokeDasharray={100}
          strokeDashoffset={100 - (((activeIndex + 1) / editorSections.length) * 100)}
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute inset-0 text-black flex items-center justify-center text-[10px] font-bold">
        {Math.round(((activeIndex + 1) / editorSections.length) * 100)}%
      </span>
    </div>
  </div>

  {/* Expanded Card */}
  <div className="hidden group-hover:block ">
    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
      Resume Progress
    </p>

    <h2 className="mt-1 text-base font-semibold text-slate-900">
      {selectedName}
    </h2>

    <div className="mt-4 h-1.5 rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-emerald-600"
        style={{
          width: `${((activeIndex + 1) / editorSections.length) * 100}%`,
        }}
      />
    </div>
  </div>
</div>
            <nav className="mt-6 space-y-2 ">
              {editorSections.map((item, index) => <button key={item.id} type="button" onClick={() => setActiveSection(item.id)} className={`flex w-full hover:cursor-pointer items-center  gap-3 rounded-xl px-3 py-3 text-sm font-medium transition  ${activeSection === item.id ? "bg-emerald-700 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}><span className="text-2xl text-center font-bold">{item.icon}</span><span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto xl:w-auto group-hover:opacity-100 xl:opacity-100">{item.label}</span></button>)}
            </nav>
            <div className="mt-auto space-y-3">
              <button type="button" onClick={handleDownloadPdf} disabled={isExportingPdf} className="w-full rounded-xl bg-slate-900 px-3 py-3 text-xs font-semibold text-white flex items-center gap-2 transition hover:bg-slate-800 disabled:cursor-not-allowed hover:cursor-pointer disabled:opacity-70 xl:text-sm">
                <span><IoMdDownload className="text-xl" /> </span> 
                <span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto  group-hover:opacity-100 ">
                  
                  {isExportingPdf ? "Preparing PDF..." : "Download PDF"}</span>
              </button>
              <button type="button" onClick={handleSaveDraft} className="flex items-center gap-2 hover:cursor-pointer w-full rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-600 ">
                <span className="text-xl text-center font-bold"><VscSaveAs /></span>
                <span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto  group-hover:opacity-100 ">Save draft</span>
              </button>
            </div>
          </aside>

          <div className=" w-full md:ml-16  lg:flex ">
            <section className="editor-panel bg-slate-100  min-w-0 w-full p-4 sm:p-6 lg:w-[48%] lg:pb-12">
              <div className="mx-auto max-w-xl">
                <>
                  <div className="mb-6    flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">{selectedName}</p>
                      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{section.label}</h1>
                      <p className="mt-2 text-sm leading-6 text-slate-600">Your edits appear immediately in the live resume preview.</p>
                      <p className="mt-2 text-xs font-medium text-emerald-700">{draftStatus}{draftSavedAt ? ` • ${draftSavedAt}` : ""}</p>
                      </div>
                      <button type="button" onClick={handleDownloadPdf} disabled={isExportingPdf} className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">{isExportingPdf ? "Preparing..." : "Download PDF"}</button>
                      </div>
                  <AtsScore setShowResumeScore={setShowResumeScore} analysis={atsAnalysis} keywords={targetKeywords} setKeywords={setTargetKeywords} ShowResumeScore={ShowResumeScore} isOpen={showAtsScore} onToggle={() => setShowAtsScore((current) => !current)} />
                  {/* <ThemeControls accent={themeAccent} setAccent={setThemeAccent} font={themeFont} setFont={setThemeFont} /> */}
                  <div className="mb-5 flex gap-2 overflow-x-auto pb-1 md:hidden">{editorSections.map((item) => <button key={item.id} onClick={() => setActiveSection(item.id)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${activeSection === item.id ? "bg-emerald-700 text-white" : "bg-white text-slate-600"}`}>{item.label}</button>)}</div>
                  {activeSection === "contact" && <ContactForm data={resumeData} updateContact={updateContact} updateSummary={updateSummary} />}
                  {activeSection === "experience" && <ExperienceForm experiences={resumeData.experiences} update={updateCollection} add={addExperience} remove={removeItem} />}
                  {activeSection === "education" && <EducationForm education={resumeData.education} update={updateCollection} add={addEducation} remove={removeItem} />}
                  {activeSection === "skills" && <SkillsForm skills={resumeData.skills} value={skillInput} setValue={setSkillInput} add={addSkill} remove={removeSkill} />}
                  <div className="mt-8 flex items-center justify-between gap-3"><button type="button" disabled={activeIndex === 0} onClick={() => setActiveSection(editorSections[activeIndex - 1].id)} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">Previous</button><button type="button" onClick={() => activeIndex === editorSections.length - 1 ? setActiveSection("contact") : setActiveSection(editorSections[activeIndex + 1].id)} className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">{activeIndex === editorSections.length - 1 ? "Review contact" : `Next: ${editorSections[activeIndex + 1].label}`}</button></div>
                </>
              </div>
            </section>

          <section aria-label="Live resume preview" className="editor-preview flex min-w-0 w-full flex-col items-center border-t border-slate-100 bg-slate-100 px-3 py-6 sm:px-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-[52%] lg:border-l lg:border-t-0 lg:overflow-auto">

  <div className="mb-4 w-full max-w-2xl theme-controls">
    <ThemeControls
      accent={themeAccent}
      setAccent={setThemeAccent}
      font={themeFont}
      setFont={setThemeFont}
      setShowResumeScore={setShowResumeScore}
    />
  </div>

  <div className="flex justify-center">
      <div
          ref={previewRef}
          className="resume-preview-document bg-white"
      >
          <SelectedResume
              data={resumeData}
              theme={{
                  accent: themeAccent,
                  fontFamily: themeFont,
              }}
          />
      </div>
  </div>

</section>
          </div>
        </div>
      </main>
    </>
  );
}

function Field({ label, value, onChange, type = "text", textarea = false, placeholder = "" }) {
  const className = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white";
  return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>{textarea ? <textarea className={`${className} min-h-28 resize-y`} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /> : <input className={className} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />}</label>;
}

function FormCard({ children }) { return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">{children}</div>; }
function ContactForm({ data, updateContact, updateSummary }) { return <FormCard><div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Full name" value={data.contact.fullName} onChange={(value) => updateContact("fullName", value)} /></div><div className="sm:col-span-2"><Field label="Professional headline" value={data.contact.headline} onChange={(value) => updateContact("headline", value)} /></div><Field label="Email" type="email" value={data.contact.email} onChange={(value) => updateContact("email", value)} /><Field label="Phone" type="tel" value={data.contact.phone} onChange={(value) => updateContact("phone", value)} /><Field label="Location" value={data.contact.location} onChange={(value) => updateContact("location", value)} /><Field label="Website or LinkedIn" value={data.contact.website} onChange={(value) => updateContact("website", value)} /><div className="sm:col-span-2"><Field label="Professional summary" textarea value={data.summary} onChange={updateSummary} /></div></div></FormCard>; }
function ExperienceForm({ experiences, update, add, remove }) { return <div className="space-y-4">{experiences.map((experience, index) => <FormCard key={experience.id}><div className="mb-5 flex items-center justify-between"><p className="text-sm font-bold text-slate-900">Role {index + 1}</p><button type="button" onClick={() => remove("experiences", experience.id)} disabled={experiences.length === 1} className="text-xs font-semibold text-rose-600 disabled:opacity-40">Remove</button></div><div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Job title" value={experience.role} onChange={(value) => update("experiences", experience.id, "role", value)} /></div><Field label="Company" value={experience.company} onChange={(value) => update("experiences", experience.id, "company", value)} /><div className="hidden sm:block" /><Field label="Start year" value={experience.startDate} onChange={(value) => update("experiences", experience.id, "startDate", value)} /><Field label="End year" value={experience.endDate} onChange={(value) => update("experiences", experience.id, "endDate", value)} /><div className="sm:col-span-2"><Field label="Impact and responsibilities" textarea value={experience.description} onChange={(value) => update("experiences", experience.id, "description", value)} /></div></div></FormCard>)}<button type="button" onClick={add} className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">+ Add another role</button></div>; }
function EducationForm({ education, update, add, remove }) { return <div className="space-y-4">{education.map((entry, index) => <FormCard key={entry.id}><div className="mb-5 flex items-center justify-between"><p className="text-sm font-bold text-slate-900">Education {index + 1}</p><button type="button" onClick={() => remove("education", entry.id)} disabled={education.length === 1} className="text-xs font-semibold text-rose-600 disabled:opacity-40">Remove</button></div><div className="grid gap-4"><Field label="Degree or qualification" value={entry.degree} onChange={(value) => update("education", entry.id, "degree", value)} /><Field label="School or university" value={entry.school} onChange={(value) => update("education", entry.id, "school", value)} /><Field label="Graduation year" value={entry.year} onChange={(value) => update("education", entry.id, "year", value)} /></div></FormCard>)}<button type="button" onClick={add} className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">+ Add education</button></div>; }
function SkillsForm({ skills, value, setValue, add, remove }) { return <FormCard><p className="mb-5 text-sm leading-6 text-slate-600">Add skills that are specific to the role you want. They will appear in The Curator&apos;s sidebar.</p><div className="flex gap-2"><input value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); add(); } }} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white" placeholder="e.g. Stakeholder management" /><button type="button" onClick={add} className="rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800">Add</button></div><div className="mt-5 flex flex-wrap gap-2">{skills.map((skill) => <button type="button" onClick={() => remove(skill)} key={skill} className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 transition hover:bg-rose-50 hover:text-rose-700">{skill} <span aria-hidden="true">x</span></button>)}</div></FormCard>; }

function buildAtsAnalysis(data, keywordInput) {
  const contactFields = [data.contact.fullName, data.contact.email, data.contact.phone, data.contact.location];
  const completeContact = contactFields.filter(Boolean).length;
  const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
  const completeExperiences = data.experiences.filter((item) => item.role && item.company && item.description.trim().split(/\s+/).filter(Boolean).length >= 12);
  const completeEducation = data.education.filter((item) => item.degree && item.school);
  const jobKeywords = keywordInput.split(",").map((keyword) => keyword.trim()).filter(Boolean);
  const resumeText = [data.summary, ...data.skills, ...data.experiences.flatMap((item) => [item.role, item.company, item.description])].join(" ").toLowerCase();
  const matchedKeywords = jobKeywords.filter((keyword) => resumeText.includes(keyword.toLowerCase()));
  const actionVerbs = /\b(led|built|launched|improved|managed|created|increased|reduced|delivered|developed|owned|designed|coordinated|implemented)\b/i;
  const hasResultsLanguage = data.experiences.some((item) => actionVerbs.test(item.description) && /\d|%|\$/.test(item.description));

  const contactScore = completeContact * 4;
  const summaryScore = summaryWords >= 25 ? 12 : summaryWords >= 12 ? 7 : 2;
  const experienceScore = completeExperiences.length >= 2 ? 22 : completeExperiences.length === 1 ? 13 : 3;
  const educationScore = completeEducation.length ? 10 : 2;
  const skillsScore = data.skills.length >= 6 ? 14 : data.skills.length >= 4 ? 10 : data.skills.length * 2;
  const keywordScore = jobKeywords.length ? Math.round((matchedKeywords.length / jobKeywords.length) * 14) : Math.min(data.skills.length, 6) * 2;
  const resultsScore = hasResultsLanguage ? 10 : 3;
  const readabilityScore = 6;
  const score = Math.min(100, contactScore + summaryScore + experienceScore + educationScore + skillsScore + keywordScore + resultsScore + readabilityScore);
  const checks = [
    { label: "Contact details", detail: `${completeContact}/4 essential details`, passed: completeContact === 4 },
    { label: "Professional summary", detail: summaryWords >= 25 ? `${summaryWords} words` : "Aim for 25+ words", passed: summaryWords >= 25 },
    { label: "Experience quality", detail: completeExperiences.length >= 2 ? `${completeExperiences.length} complete roles` : "Add role, company, and impact", passed: completeExperiences.length >= 2 },
    { label: "Skills and keywords", detail: jobKeywords.length ? `${matchedKeywords.length}/${jobKeywords.length} job keywords matched` : `${data.skills.length} skills listed`, passed: jobKeywords.length ? matchedKeywords.length >= Math.ceil(jobKeywords.length / 2) : data.skills.length >= 4 },
    { label: "Education", detail: completeEducation.length ? `${completeEducation.length} qualification${completeEducation.length > 1 ? "s" : ""}` : "Add education", passed: Boolean(completeEducation.length) },
    { label: "ATS-safe format", detail: "Clear headings and readable type", passed: true },
    { label: "Results language", detail: hasResultsLanguage ? "Action verbs and metrics found" : "Add numbers or outcomes", passed: hasResultsLanguage },
  ];
  return { score, checks, jobKeywords, matchedKeywords };
}

function ThemeControls({setShowResumeScore, accent, setAccent, font, setFont }) {
  return (
    <section className="mb-3 flex max-h-[150px] items-center justify-between md:gap-3 gap-2 rounded-b-2xl border -mt-6 border-slate-200 bg-white md:px-3 px-2 py-3  shadow-sm">
      <div className="  xl:flex items-center gap-2">
        <span className="text-[10px] xl:text-[12px] font-bold uppercase tracking-[0.18em] text-slate-500">Color</span>
        <div className="flex xl:gap-1.5 gap-1">
          {accentPresets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setAccent(preset.value)}
              className={`h-6 w-6 rounded-full border-2 transition ${accent === preset.value ? "border-slate-900" : "border-slate-200"}`}
              style={{ backgroundColor: preset.value }}
              aria-label={`Use ${preset.label} accent`}
            />
          ))}
        </div>
      </div>
      <div className="h-8 w-px bg-slate-200" />
      <label className=" xl:flex  items-center gap-2">
        <span className=" text-[10px] xl:text-[12px] font-bold uppercase tracking-[0.18em] text-slate-500">Font</span> <br/>
        <select
          value={font}
          onChange={(event) => setFont(event.target.value)}
          className="min-w-0 text-black flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs outline-none focus:border-emerald-500"
        >
          {fontOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
      <div className="h-8 w-px bg-slate-200" />
      <button onClick={()=> setShowResumeScore(true)} className="text-white  px-2 py-1.5 hover:cursor-pointer rounded-md text-sm bg-emerald-700 text-nowrap">Resume score</button>
    </section>
  );
}
function AtsScore({setShowResumeScore,ShowResumeScore, analysis, keywords, setKeywords, isOpen, onToggle }) {
  const improvements = analysis.checks.filter((check) => !check.passed).slice(0, 3);

  return (
    <section className="mb-5 relative">

      <div className={`${ShowResumeScore ? 'block' : 'hidden'}  grid transition-all duration-500 ease-out mt-3 grid-rows-[1fr] z-20  fixed top-[15%] left-[25%] -translate-X-[50%]  -translate-Y-[70%]`}>
        <div className="overflow-hidden">
          <div className="rounded-2xl border  border-emerald-100 bg-emerald-50 p-4 sm:p-5">
            <div className="flex items-start  gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[5px] border-emerald-600 bg-white text-lg font-black  text-emerald-800">{analysis.score}</div>
      <button onClick={()=>setShowResumeScore(false)} className="absolute rounded-tr-2xl top-0 hover:cursor-pointer right-0 bg-black text-white px-3 rounded-bl-xl py-1">X</button>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Current score</p>
                <p className="mt-1 text-sm leading-5 text-slate-600">A practical check for keywords, standard sections, readable formatting, and missing details.</p>
              </div>
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Target job keywords (optional)</span>
              <input
                value={keywords}
                onChange={(event) => setKeywords(event.target.value)}
                className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-500"
                placeholder="e.g. product strategy, SQL, stakeholder management"
              />
            </label>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {analysis.checks.map((check, index) => (
                <div key={check.label} style={{ transitionDelay: `${index * 45}ms` }} className="rounded-xl bg-white px-3 py-2.5 transition duration-300">
                  <p className={`text-xs font-bold ${check.passed ? "text-emerald-700" : "text-amber-700"}`}>{check.passed ? "Ready" : "Needs attention"} · {check.label}</p>
                  <p className="mt-1 text-[11px] text-slate-500">{check.detail}</p>
                </div>
              ))}
            </div>
            {improvements.length > 0 && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-900">
                <span className="font-bold">Next improvements:</span> {improvements.map((item) => item.detail).join(" · ")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
