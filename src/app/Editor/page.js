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
import Resume8 from "../tempelate/EachResume/Resume8";
import Resume9 from "../tempelate/EachResume/Resume9";
import Resume10 from "../tempelate/EachResume/Resume10";
import Resume11 from "../tempelate/EachResume/Resume11";
import Resume12 from "../tempelate/EachResume/Resume12";
import Resume13 from "../tempelate/EachResume/Resume13";
import Resume14 from "../tempelate/EachResume/Resume14";
import Resume15 from "../tempelate/EachResume/Resume15";
import Resume16 from "../tempelate/EachResume/Resume16";
import Resume17 from "../tempelate/EachResume/Resume17";
import Resume18 from "../tempelate/EachResume/Resume18";
import Resume19 from "../tempelate/EachResume/Resume19";
import Resume20 from "../tempelate/EachResume/Resume20";

import { IoMdDownload } from "react-icons/io";
import { VscSaveAs } from "react-icons/vsc";
import { MdUndo, MdRedo } from "react-icons/md";
import Link from "next/link";
import { useResume } from "../context/ResumeContext";

export default function Editor() {
  return (
    <Suspense fallback={<EditorLoading />}>
      <EditorContent />
    </Suspense>
  );
}

function EditorLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 pt-16" />
    </>
  );
}

function EditorContent() {
  const {
    resumeData,
    setResumeData,
    themeAccent,
    themeFont,
    setThemeFont,
    setThemeAccent,
    readStoredDraft,
    writeStoredDraft,
    templateNames,
    editorSections,
    accentPresets,
    fontOptions,
    undo,
    redo,
    canUndo,
    canRedo,
    updateCertification,
    addCertification,
    removeCertification,
    updateLanguage,
    addLanguage,
    removeLanguage,
    updateAward,
    addAward,
    removeAward,
    updateProject,
    addProject,
    removeProject,
    updatePortfolio,
    addPortfolio,
    removePortfolio,
    updateTool,
    addTool,
    removeTool,
  } = useResume();

  const [activeSection, setActiveSection] = useState("contact");
  const [skillInput, setSkillInput] = useState("");
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [draftStatus, setDraftStatus] = useState("Auto-saves locally");
  const [draftSavedAt, setDraftSavedAt] = useState("");
  const previewRef = useRef(null);

  const templateComponents = {
    resume1: Resume1,
    resume2: Resume2,
    resume3: Resume3,
    resume4: Resume4,
    resume5: Resume5,
    resume6: Resume6,
    resume7: Resume7,
    resume8: Resume8,
    resume9: Resume9,
    resume10: Resume10,
    resume11: Resume11,
    resume12: Resume12,
    resume13: Resume13,
    resume14: Resume14,
    resume15: Resume15,
    resume16: Resume16,
    resume17: Resume17,
    resume18: Resume18,
    resume19: Resume19,
    resume20: Resume20,
  };

  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get("template") || "resume1";

  const SelectedResume = templateComponents[selectedTemplate] || Resume1;
  const selectedName = templateNames[selectedTemplate] || "Resume Builder";
  const activeIndex = editorSections.findIndex((section) => section.id === activeSection);
  const section = editorSections[activeIndex] || editorSections[0];

  const updateContact = (field, value) =>
    setResumeData((current) => ({ ...current, contact: { ...current.contact, [field]: value } }));
  const updateSummary = (value) => setResumeData((current) => ({ ...current, summary: value }));
  const updateCollection = (collection, id, field, value) =>
    setResumeData((current) => ({
      ...current,
      [collection]: (current[collection] || []).map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  const addExperience = () =>
    setResumeData((current) => ({
      ...current,
      experiences: [
        ...(current.experiences || []),
        { id: `experience-${Date.now()}`, role: "", company: "", startDate: "", endDate: "", description: "" },
      ],
    }));
  const addEducation = () =>
    setResumeData((current) => ({
      ...current,
      education: [...(current.education || []), { id: `education-${Date.now()}`, degree: "", school: "", year: "" }],
    }));
  const removeItem = (collection, id) =>
    setResumeData((current) =>
      (current[collection] || []).length > 1
        ? { ...current, [collection]: current[collection].filter((item) => item.id !== id) }
        : current
    );
  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill || (resumeData.skills || []).some((item) => item.toLowerCase() === skill.toLowerCase())) return;
    setResumeData((current) => ({ ...current, skills: [...(current.skills || []), skill] }));
    setSkillInput("");
  };
  const removeSkill = (skill) =>
    setResumeData((current) => ({ ...current, skills: (current.skills || []).filter((item) => item !== skill) }));

  const persistDraft = (statusMessage = "Auto-saved locally") => {
    const payload = {
      resumeData,
      skillInput,
      activeSection,
      themeAccent,
      themeFont,
      updatedAt: Date.now(),
    };

    writeStoredDraft(payload);
    setDraftStatus(statusMessage);
    setDraftSavedAt(new Date(payload.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
  };

  const [sideBarHOver, setsideBarHOver] = useState(false);

  // Keyboard undo / redo listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (!isInput) {
          e.preventDefault();
          if (e.shiftKey) redo();
          else undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        if (!isInput) {
          e.preventDefault();
          redo();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  useEffect(() => {
    const storedDraft = readStoredDraft();
    if (!storedDraft) return;

    setActiveSection(storedDraft.activeSection || "contact");
    setSkillInput(storedDraft.skillInput || "");
    setDraftStatus("Draft restored");
    setDraftSavedAt(
      storedDraft.updatedAt
        ? new Date(storedDraft.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
        : ""
    );
  }, []);

  useEffect(() => {
    persistDraft("Auto-saved locally");
  }, [resumeData, skillInput, activeSection, themeAccent, themeFont]);

  const handleSaveDraft = () => {
    persistDraft("Draft saved");
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    setIsExportingPdf(true);
    const controls = document.querySelector(".theme-controls");
    previewRef.current.classList.add("export-mode");

    try {
      controls?.classList.add("hidden");

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

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
      previewRef.current?.classList.remove("export-mode");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 pt-16">
        <div className="flex">
          <div
            className={`fixed left-0 top-0 z-20 h-screen w-full bg-black/60 pt-16 transition-all duration-300 ${
              sideBarHOver ? "block" : "hidden"
            }`}
          />

          <aside
            onMouseEnter={() => setsideBarHOver(true)}
            onMouseLeave={() => setsideBarHOver(false)}
            className="editor-sidebar group hover:w-55 fixed transition-[all_1s] h-[90vh] inset-y-16 left-0 z-30 hidden w-16 flex-col border-r border-slate-300 bg-blue-100 p-2 md:flex overflow-y-auto"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex justify-center group-hover:hidden">
                <div className="relative h-10 w-10">
                  <svg className="h-10 w-10 -rotate-90">
                    <circle cx="20" cy="20" r="16" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke="#10b981"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={100}
                      strokeDashoffset={100 - ((activeIndex + 1) / editorSections.length) * 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 text-black flex items-center justify-center text-[10px] font-bold">
                    {Math.round(((activeIndex + 1) / editorSections.length) * 100)}%
                  </span>
                </div>
              </div>

              <div className="hidden group-hover:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Progress</p>
                <h2 className="mt-1 text-base font-semibold text-slate-900">{selectedName}</h2>
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

            <nav className="mt-4 space-y-1.5">
              {editorSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full hover:cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                    activeSection === item.id
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="text-xl text-center font-bold">{item.icon}</span>
                  <span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto group-hover:opacity-100">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-auto space-y-2 pt-4">
              <Link
                href={`/export?template=${selectedTemplate}`}
                className="w-full rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white flex items-center gap-2 transition hover:bg-slate-800"
              >
                <span>
                  <IoMdDownload className="text-lg" />
                </span>
                <span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto group-hover:opacity-100">
                  Export Resume
                </span>
              </Link>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-2 hover:cursor-pointer w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600"
              >
                <span className="text-lg text-center font-bold">
                  <VscSaveAs />
                </span>
                <span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto group-hover:opacity-100">
                  Save draft
                </span>
              </button>
            </div>
          </aside>

          <div className="w-full md:ml-16 lg:flex">
            {/* Form Section Sidebar / Drawer */}
            <section className="editor-panel bg-slate-100 min-w-0 w-full p-4 sm:p-6 lg:w-[48%] lg:pb-12">
              <div className="mx-auto max-w-xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">{selectedName}</p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {section.label}
                    </h1>
                    <p className="mt-2 text-xs font-medium text-emerald-700">
                      {draftStatus}
                      {draftSavedAt ? ` • ${draftSavedAt}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isExportingPdf}
                    className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-70 flex items-center gap-1.5"
                  >
                    <IoMdDownload />
                    <span>Download PDF</span>
                  </button>
                </div>

                <div className="mb-5 flex gap-2 overflow-x-auto pb-1 md:hidden">
                  {editorSections.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        activeSection === item.id ? "bg-emerald-700 text-white" : "bg-white text-slate-600"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {activeSection === "contact" && (
                  <ContactForm
                    data={resumeData}
                    updateContact={updateContact}
                    updateSummary={updateSummary}
                    selectedTemplate={selectedTemplate}
                  />
                )}
                {activeSection === "experience" && (
                  <ExperienceForm
                    experiences={resumeData.experiences || []}
                    update={updateCollection}
                    add={addExperience}
                    remove={removeItem}
                  />
                )}
                {activeSection === "education" && (
                  <EducationForm
                    education={resumeData.education || []}
                    update={updateCollection}
                    add={addEducation}
                    remove={removeItem}
                  />
                )}
                {activeSection === "skills" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="mb-4 text-lg font-bold text-slate-900">Professional Skills</h2>
                      <SkillsForm
                        skills={resumeData.skills || []}
                        value={skillInput}
                        setValue={setSkillInput}
                        add={addSkill}
                        remove={removeSkill}
                      />
                    </div>
                    <div>
                      <h2 className="mb-4 text-lg font-bold text-slate-900">Tools & Software</h2>
                      <ToolsForm
                        tools={resumeData.tools || []}
                        update={updateTool}
                        add={addTool}
                        remove={removeTool}
                      />
                    </div>
                  </div>
                )}
                {activeSection === "certifications" && (
                  <CertificationsForm
                    certifications={resumeData.certifications || []}
                    update={updateCertification}
                    add={addCertification}
                    remove={removeCertification}
                  />
                )}
                {activeSection === "languages" && (
                  <LanguagesForm
                    languages={resumeData.languages || []}
                    update={updateLanguage}
                    add={addLanguage}
                    remove={removeLanguage}
                  />
                )}
                {activeSection === "awards" && (
                  <AwardsForm
                    awards={resumeData.awards || []}
                    update={updateAward}
                    add={addAward}
                    remove={removeAward}
                  />
                )}
                {activeSection === "projects" && (
                  <ProjectsForm
                    projects={resumeData.projects || []}
                    update={updateProject}
                    add={addProject}
                    remove={removeProject}
                  />
                )}
                {activeSection === "portfolio" && (
                  <PortfolioForm
                    portfolio={resumeData.portfolio || []}
                    update={updatePortfolio}
                    add={addPortfolio}
                    remove={removePortfolio}
                  />
                )}

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveSection(editorSections[activeIndex - 1].id)}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-white disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      activeIndex === editorSections.length - 1
                        ? setActiveSection("contact")
                        : setActiveSection(editorSections[activeIndex + 1].id)
                    }
                    className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    {activeIndex === editorSections.length - 1
                      ? "Review contact"
                      : `Next: ${editorSections[activeIndex + 1].label}`}
                  </button>
                </div>
              </div>
            </section>

            {/* Live Interactive Resume Preview */}
            <section
              aria-label="Live resume preview"
              className="editor-preview flex min-w-0 w-full flex-col items-center border-t border-slate-100 bg-slate-100 px-3 py-6 sm:px-6 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-[52%] lg:border-l lg:border-t-0 lg:overflow-auto"
            >
              <div className="mb-4 w-full max-w-2xl theme-controls">
                <ThemeControls
                  accent={themeAccent}
                  setAccent={setThemeAccent}
                  font={themeFont}
                  setFont={setThemeFont}
                  accentPresets={accentPresets}
                  fontOptions={fontOptions}
                  undo={undo}
                  redo={redo}
                  canUndo={canUndo}
                  canRedo={canRedo}
                />
              </div>

              <div className="flex justify-center">
                <div ref={previewRef} className="resume-preview-document bg-white">
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
  const className =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      {textarea ? (
        <textarea
          className={`${className} min-h-20 resize-y`}
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={className}
          type={type}
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function FormCard({ children }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">{children}</div>;
}

const PHOTO_ENABLED_TEMPLATES = ["resume1", "resume3", "resume11", "resume13"];

function ContactForm({ data, updateContact, updateSummary, selectedTemplate }) {
  const fileInputRef = useRef(null);
  const showPhotoUpload = PHOTO_ENABLED_TEMPLATES.includes(selectedTemplate);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;
    if (file.size > 3 * 1024 * 1024) {
      alert("Please choose an image under 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => updateContact("photo", reader.result);
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleRemovePhoto = () => {
    updateContact("photo", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <FormCard>
      {showPhotoUpload ? (
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
            {data.contact?.photo ? (
              <img src={data.contact.photo} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[10px] font-semibold uppercase text-slate-400">No photo</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {data.contact?.photo ? "Change photo" : "Upload photo"}
              </button>
              {data.contact?.photo ? (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="rounded-xl border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <p className="text-[11px] text-slate-500">PNG or JPG, up to 3MB.</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
        </div>
      ) : null}

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full name" value={data.contact?.fullName} onChange={(value) => updateContact("fullName", value)} />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Professional headline"
            value={data.contact?.headline}
            onChange={(value) => updateContact("headline", value)}
          />
        </div>
        <Field label="Email" type="email" value={data.contact?.email} onChange={(value) => updateContact("email", value)} />
        <Field label="Phone" type="tel" value={data.contact?.phone} onChange={(value) => updateContact("phone", value)} />
        <Field label="Location" value={data.contact?.location} onChange={(value) => updateContact("location", value)} />
        <Field label="Website or Portfolio" value={data.contact?.website} onChange={(value) => updateContact("website", value)} />
        <div className="sm:col-span-2">
          <Field label="Professional summary" textarea value={data.summary} onChange={updateSummary} />
        </div>
      </div>
    </FormCard>
  );
}

function ExperienceForm({ experiences, update, add, remove }) {
  return (
    <div className="space-y-4">
      {experiences.map((experience, index) => (
        <FormCard key={experience.id}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900">Role {index + 1}</p>
            <button
              type="button"
              onClick={() => remove("experiences", experience.id)}
              disabled={experiences.length === 1}
              className="text-xs font-semibold text-rose-600 disabled:opacity-40"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field
                label="Job title"
                value={experience.role}
                onChange={(value) => update("experiences", experience.id, "role", value)}
              />
            </div>
            <Field
              label="Company"
              value={experience.company}
              onChange={(value) => update("experiences", experience.id, "company", value)}
            />
            <div className="hidden sm:block" />
            <Field
              label="Start year"
              value={experience.startDate}
              onChange={(value) => update("experiences", experience.id, "startDate", value)}
            />
            <Field
              label="End year"
              value={experience.endDate}
              onChange={(value) => update("experiences", experience.id, "endDate", value)}
            />
            <div className="sm:col-span-2">
              <Field
                label="Impact and responsibilities"
                textarea
                value={experience.description}
                onChange={(value) => update("experiences", experience.id, "description", value)}
              />
            </div>
          </div>
        </FormCard>
      ))}
      <button
        type="button"
        onClick={add}
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
      >
        + Add another role
      </button>
    </div>
  );
}

function EducationForm({ education, update, add, remove }) {
  return (
    <div className="space-y-4">
      {education.map((entry, index) => (
        <FormCard key={entry.id}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900">Education {index + 1}</p>
            <button
              type="button"
              onClick={() => remove("education", entry.id)}
              disabled={education.length === 1}
              className="text-xs font-semibold text-rose-600 disabled:opacity-40"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3">
            <Field
              label="Degree or qualification"
              value={entry.degree}
              onChange={(value) => update("education", entry.id, "degree", value)}
            />
            <Field
              label="School or university"
              value={entry.school}
              onChange={(value) => update("education", entry.id, "school", value)}
            />
            <Field
              label="Graduation year"
              value={entry.year}
              onChange={(value) => update("education", entry.id, "year", value)}
            />
          </div>
        </FormCard>
      ))}
      <button
        type="button"
        onClick={add}
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
      >
        + Add education
      </button>
    </div>
  );
}

function SkillsForm({ skills, value, setValue, add, remove }) {
  return (
    <FormCard>
      <p className="mb-4 text-xs leading-5 text-slate-600">Add skills that are relevant to your target role.</p>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-emerald-500 focus:bg-white"
          placeholder="e.g. Stakeholder management"
        />
        <button type="button" onClick={add} className="rounded-xl bg-emerald-700 px-3.5 text-xs font-semibold text-white hover:bg-emerald-800">
          Add
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <button
            type="button"
            onClick={() => remove(skill)}
            key={skill}
            className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 transition hover:bg-rose-50 hover:text-rose-700"
          >
            {skill} <span aria-hidden="true">x</span>
          </button>
        ))}
      </div>
    </FormCard>
  );
}

function ToolsForm({ tools, update, add, remove }) {
  const fileInputRefs = useRef({});

  const handleImageChange = (id, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;
    if (file.size > 1 * 1024 * 1024) {
      alert("Please choose an image under 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => update(id, "image", reader.result);
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <div className="space-y-4">
      {tools.map((tool, index) => (
        <FormCard key={tool.id || index}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900">Tool {index + 1}</p>
            <button
              type="button"
              onClick={() => remove(tool.id)}
              className="text-xs font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-2">
               <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                {tool.image ? (
                  <img src={tool.image} alt={tool.name} className="h-full w-full object-contain p-1" />
                ) : (
                  <span className="text-[8px] font-semibold uppercase text-slate-400 text-center">No icon</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRefs.current[tool.id]?.click()}
                className="text-[10px] font-bold text-emerald-700 hover:underline"
              >
                Upload
              </button>
              <input
                ref={(el) => (fileInputRefs.current[tool.id] = el)}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(tool.id, e)}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <Field
                label="Tool Name"
                value={tool.name}
                onChange={(val) => update(tool.id, "name", val)}
                placeholder="e.g. Figma, VS Code"
              />
            </div>
          </div>
        </FormCard>
      ))}
      <button
        type="button"
        onClick={() => add()}
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
      >
        + Add Tool
      </button>
    </div>
  );
}

function CertificationsForm({ certifications, update, add, remove }) {
  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <FormCard key={cert.id}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900">Certification {index + 1}</p>
            <button
              type="button"
              onClick={() => remove(cert.id)}
              className="text-xs font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Certification Title" value={cert.name} onChange={(val) => update(cert.id, "name", val)} />
            </div>
            <Field label="Issuing Organization" value={cert.authority} onChange={(val) => update(cert.id, "authority", val)} />
            <Field label="Issue Date / Year" value={cert.date} onChange={(val) => update(cert.id, "date", val)} />
            <Field label="Credential ID (Optional)" value={cert.credentialId} onChange={(val) => update(cert.id, "credentialId", val)} />
            <Field label="Credential URL (Optional)" value={cert.url} onChange={(val) => update(cert.id, "url", val)} />
          </div>
        </FormCard>
      ))}
      <button
        type="button"
        onClick={() => add()}
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
      >
        + Add Certification
      </button>
    </div>
  );
}

function LanguagesForm({ languages, update, add, remove }) {
  const levels = ["Native", "Fluent", "Professional", "Intermediate", "Basic"];

  return (
    <div className="space-y-4">
      {languages.map((lang, index) => (
        <FormCard key={lang.id}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900">Language {index + 1}</p>
            <button
              type="button"
              onClick={() => remove(lang.id)}
              className="text-xs font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Language Name" value={lang.name} onChange={(val) => update(lang.id, "name", val)} />
            <label className="block">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Proficiency Level
              </span>
              <select
                value={lang.proficiency || "Fluent"}
                onChange={(e) => update(lang.id, "proficiency", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-500 focus:bg-white"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </FormCard>
      ))}
      <button
        type="button"
        onClick={() => add()}
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
      >
        + Add Language
      </button>
    </div>
  );
}

function AwardsForm({ awards, update, add, remove }) {
  return (
    <div className="space-y-4">
      {awards.map((award, index) => (
        <FormCard key={award.id}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900">Award / Achievement {index + 1}</p>
            <button
              type="button"
              onClick={() => remove(award.id)}
              className="text-xs font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Award / Honor Title" value={award.title} onChange={(val) => update(award.id, "title", val)} />
            </div>
            <Field label="Granting Organization" value={award.issuer} onChange={(val) => update(award.id, "issuer", val)} />
            <Field label="Year Awarded" value={award.year} onChange={(val) => update(award.id, "year", val)} />
            <div className="sm:col-span-2">
              <Field label="Description (Optional)" textarea value={award.description} onChange={(val) => update(award.id, "description", val)} />
            </div>
          </div>
        </FormCard>
      ))}
      <button
        type="button"
        onClick={() => add()}
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
      >
        + Add Award or Achievement
      </button>
    </div>
  );
}

function ProjectsForm({ projects, update, add, remove }) {
  return (
    <div className="space-y-4">
      {projects.map((proj, index) => (
        <FormCard key={proj.id}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900">Project {index + 1}</p>
            <button
              type="button"
              onClick={() => remove(proj.id)}
              className="text-xs font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Project Title" value={proj.title} onChange={(val) => update(proj.id, "title", val)} />
            </div>
            <Field label="Your Role" value={proj.role} onChange={(val) => update(proj.id, "role", val)} />
            <Field label="Technologies Used" value={proj.tech} onChange={(val) => update(proj.id, "tech", val)} placeholder="React, Node.js, AWS" />
            <Field label="Start Date" value={proj.startDate} onChange={(val) => update(proj.id, "startDate", val)} />
            <Field label="End Date" value={proj.endDate} onChange={(val) => update(proj.id, "endDate", val)} />
            <Field label="Live Demo URL (Optional)" value={proj.liveUrl} onChange={(val) => update(proj.id, "liveUrl", val)} />
            <Field label="GitHub Repository URL (Optional)" value={proj.githubUrl} onChange={(val) => update(proj.id, "githubUrl", val)} />
            <div className="sm:col-span-2">
              <Field label="Project Description & Results" textarea value={proj.description} onChange={(val) => update(proj.id, "description", val)} />
            </div>
          </div>
        </FormCard>
      ))}
      <button
        type="button"
        onClick={() => add()}
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
      >
        + Add Project
      </button>
    </div>
  );
}

function PortfolioForm({ portfolio, update, add, remove }) {
  const presetPlatforms = ["LinkedIn", "GitHub", "Dribbble", "Behance", "Twitter", "Medium", "Stack Overflow", "YouTube", "Portfolio Website"];

  return (
    <div className="space-y-4">
      {portfolio.map((link, index) => (
        <FormCard key={link.id}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-900">Social Link {index + 1}</p>
            <button
              type="button"
              onClick={() => remove(link.id)}
              className="text-xs font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Platform Name" value={link.platform} onChange={(val) => update(link.id, "platform", val)} placeholder="e.g. LinkedIn" />
            <Field label="Profile URL" value={link.url} onChange={(val) => update(link.id, "url", val)} placeholder="https://..." />
          </div>
        </FormCard>
      ))}
      <div className="flex flex-wrap gap-2">
        {presetPlatforms.map((plat) => (
          <button
            key={plat}
            type="button"
            onClick={() => add(plat, "")}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            + Add {plat}
          </button>
        ))}
      </div>
    </div>
  );
}

function ThemeControls({
  accent,
  setAccent,
  font,
  setFont,
  accentPresets,
  fontOptions,
  undo,
  redo,
  canUndo,
  canRedo,
}) {
  return (
    <section className="mb-3 flex max-h-[150px] items-center justify-between md:gap-3 gap-2 rounded-b-2xl border -mt-6 border-slate-200 bg-white md:px-3 px-2 py-3 shadow-sm">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={undo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 transition disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <MdUndo className="text-base" />
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 transition disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <MdRedo className="text-base" />
        </button>
      </div>

      <div className="h-8 w-px bg-slate-200" />

      <div className="flex items-center gap-2">
        <span className="text-[10px] xl:text-[12px] font-bold uppercase tracking-[0.18em] text-slate-500">Color</span>
        <div className="flex xl:gap-1.5 gap-1">
          {accentPresets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setAccent(preset.value)}
              className={`h-6 w-6 rounded-full border-2 transition cursor-pointer ${
                accent === preset.value ? "border-slate-900 scale-110 shadow-sm" : "border-slate-200"
              }`}
              style={{ backgroundColor: preset.value }}
              aria-label={`Use ${preset.label} accent`}
            />
          ))}
        </div>
      </div>

      <div className="h-8 w-px bg-slate-200" />

      <label className="flex items-center gap-2">
        <span className="text-[10px] xl:text-[12px] font-bold uppercase tracking-[0.18em] text-slate-500">Font</span>
        <select
          value={font}
          onChange={(event) => setFont(event.target.value)}
          className="min-w-0 text-slate-900 font-medium cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs outline-none focus:border-emerald-500"
        >
          {fontOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}
