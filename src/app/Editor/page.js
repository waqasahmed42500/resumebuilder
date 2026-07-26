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
  } = useResume();

  const [activeSection, setActiveSection] = useState("contact");
  const [skillInput, setSkillInput] = useState("");
  const [targetKeywords, setTargetKeywords] = useState("");
  const [showAtsScore, setShowAtsScore] = useState(false);
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
  const atsAnalysis = buildAtsAnalysis(resumeData, targetKeywords);

  const updateContact = (field, value) =>
    setResumeData((current) => ({ ...current, contact: { ...current.contact, [field]: value } }));
  const updateSummary = (value) => setResumeData((current) => ({ ...current, summary: value }));
  const updateCollection = (collection, id, field, value) =>
    setResumeData((current) => ({
      ...current,
      [collection]: current[collection].map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  const addExperience = () =>
    setResumeData((current) => ({
      ...current,
      experiences: [
        ...current.experiences,
        { id: `experience-${Date.now()}`, role: "", company: "", startDate: "", endDate: "", description: "" },
      ],
    }));
  const addEducation = () =>
    setResumeData((current) => ({
      ...current,
      education: [...current.education, { id: `education-${Date.now()}`, degree: "", school: "", year: "" }],
    }));
  const removeItem = (collection, id) =>
    setResumeData((current) =>
      current[collection].length > 1 ? { ...current, [collection]: current[collection].filter((item) => item.id !== id) } : current
    );
  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill || resumeData.skills.some((item) => item.toLowerCase() === skill.toLowerCase())) return;
    setResumeData((current) => ({ ...current, skills: [...current.skills, skill] }));
    setSkillInput("");
  };
  const removeSkill = (skill) =>
    setResumeData((current) => ({ ...current, skills: current.skills.filter((item) => item !== skill) }));

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
    setTargetKeywords(storedDraft.targetKeywords || "");
    setShowAtsScore(Boolean(storedDraft.showAtsScore));
    setDraftStatus("Draft restored");
    setDraftSavedAt(
      storedDraft.updatedAt
        ? new Date(storedDraft.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
        : ""
    );
  }, []);

  useEffect(() => {
    persistDraft("Auto-saved locally");
  }, [resumeData, skillInput, targetKeywords, activeSection, showAtsScore, themeAccent, themeFont]);

  const handleSaveDraft = () => {
    persistDraft("Draft saved");
  };

  // const handleDownloadPdf = async () => {
  //   if (!previewRef.current) return;

  //   setIsExportingPdf(true);
  //   const controls = document.querySelector(".theme-controls");
  //   previewRef.current.classList.add("export-mode");

  //   try {
  //     controls?.classList.add("hidden");

  //     const canvas = await html2canvas(previewRef.current, {
  //       scale: 2,
  //       useCORS: true,
  //       backgroundColor: "#ffffff",
  //       logging: false,
  //     });

  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const pageHeight = pdf.internal.pageSize.getHeight();
  //     const marginX = 24;
  //     const marginY = 24;
  //     const availableWidth = pageWidth - marginX * 2;
  //     const availableHeight = pageHeight - marginY * 2;
  //     const imgWidth = availableWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     const finalHeight = Math.min(imgHeight, availableHeight);
  //     const finalWidth = (canvas.width * finalHeight) / canvas.height;

  //     pdf.addImage(imgData, "PNG", marginX, marginY, finalWidth, finalHeight, undefined, "FAST");
  //     pdf.save(`${selectedName.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`);
  //   } catch (error) {
  //     console.error("PDF export failed", error);
  //     window.print();
  //   } finally {
  //     setIsExportingPdf(false);
  //     controls?.classList.remove("hidden");
  //     previewRef.current?.classList.remove("export-mode");
  //   }
  // };

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
            className="editor-sidebar group hover:w-55 fixed transition-[all_1s] h-[90vh] inset-y-16 left-0 z-30 hidden w-16 flex-col border-r border-slate-300 bg-gray-200 p-2 md:flex"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              {/* Circle Progress */}
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

              {/* Expanded Card */}
              <div className="hidden group-hover:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Resume Progress</p>
                <h2 className="mt-1 text-base font-semibold text-slate-900">{selectedName}</h2>
                <div className="mt-4 h-1.5 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{
                      width: `${((activeIndex + 1) / editorSections.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <nav className="mt-6 space-y-2">
              {editorSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full hover:cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    activeSection === item.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="text-2xl text-center font-bold">{item.icon}</span>
                  <span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto xl:w-auto group-hover:opacity-100 xl:opacity-100">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-auto space-y-3">
              <Link
                href={`/export?template=${selectedTemplate}`}
                className="w-full rounded-xl bg-slate-900 px-3 py-3 text-xs font-semibold text-white flex items-center gap-2 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 xl:text-sm"
              >
                <span>
                  <IoMdDownload className="text-xl" />
                </span>
                <span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto group-hover:opacity-100">
                  Export Resume
                </span>
              </Link>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-2 hover:cursor-pointer w-full rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-600"
              >
                <span className="text-xl text-center font-bold">
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
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Click text directly in the resume preview to edit instantly!
                    </p>
                    <p className="mt-2 text-xs font-medium text-slate-900">
                      {draftStatus}
                      {draftSavedAt ? ` • ${draftSavedAt}` : ""}
                    </p>
                  </div>
                  
                </div>

                <div className="mb-5 flex gap-2 overflow-x-auto pb-1 md:hidden">
                  {editorSections.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
                        activeSection === item.id ? "bg-slate-900 text-white" : "bg-white text-slate-600"
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
                    experiences={resumeData.experiences}
                    update={updateCollection}
                    add={addExperience}
                    remove={removeItem}
                  />
                )}
                {activeSection === "education" && (
                  <EducationForm
                    education={resumeData.education}
                    update={updateCollection}
                    add={addEducation}
                    remove={removeItem}
                  />
                )}
                {activeSection === "skills" && (
                  <SkillsForm
                    skills={resumeData.skills}
                    value={skillInput}
                    setValue={setSkillInput}
                    add={addSkill}
                    remove={removeSkill}
                  />
                )}
                {activeSection === "additional" && (
                  <AdditionalSectionsForm
                    certifications={resumeData.certifications || []}
                    languages={resumeData.languages || []}
                    updateCertification={(id, field, value) =>
                      setResumeData((current) => ({
                        ...current,
                        certifications: (current.certifications || []).map((item) => (item.id === id ? { ...item, [field]: value } : item)),
                      }))
                    }
                    addCertification={() =>
                      setResumeData((current) => ({
                        ...current,
                        certifications: [
                          ...(current.certifications || []),
                          { id: `cert-${Date.now()}`, title: "New Certification", issuer: "Issuer", year: "2024" },
                        ],
                      }))
                    }
                    removeCertification={(id) =>
                      setResumeData((current) => ({
                        ...current,
                        certifications: (current.certifications || []).filter((item) => item.id !== id),
                      }))
                    }
                    updateLanguage={(id, field, value) =>
                      setResumeData((current) => ({
                        ...current,
                        languages: (current.languages || []).map((item) => (item.id === id ? { ...item, [field]: value } : item)),
                      }))
                    }
                    addLanguage={() =>
                      setResumeData((current) => ({
                        ...current,
                        languages: [
                          ...(current.languages || []),
                          { id: `lang-${Date.now()}`, name: "New Language", level: "Fluent" },
                        ],
                      }))
                    }
                    removeLanguage={(id) =>
                      setResumeData((current) => ({
                        ...current,
                        languages: (current.languages || []).filter((item) => item.id !== id),
                      }))
                    }
                  />
                )}

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveSection(editorSections[activeIndex - 1].id)}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
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
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    {activeIndex === editorSections.length - 1 ? "Review contact" : `Next: ${editorSections[activeIndex + 1].label}`}
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
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white";
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
      {textarea ? (
        <textarea
          className={`${className} min-h-28 resize-y`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={className}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function FormCard({ children }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">{children}</div>;
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
            {data.contact.photo ? (
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
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {data.contact.photo ? "Change photo" : "Upload photo"}
              </button>
              {data.contact.photo ? (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Full name" value={data.contact.fullName} onChange={(value) => updateContact("fullName", value)} />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Professional headline"
            value={data.contact.headline}
            onChange={(value) => updateContact("headline", value)}
          />
        </div>
        <Field label="Email" type="email" value={data.contact.email} onChange={(value) => updateContact("email", value)} />
        <Field label="Phone" type="tel" value={data.contact.phone} onChange={(value) => updateContact("phone", value)} />
        <Field label="Location" value={data.contact.location} onChange={(value) => updateContact("location", value)} />
        <Field label="Website or LinkedIn" value={data.contact.website} onChange={(value) => updateContact("website", value)} />
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
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">Role {index + 1}</p>
            <button
              type="button"
              onClick={() => remove("experiences", experience.id)}
              disabled={experiences.length === 1}
              className="text-xs font-semibold text-rose-600 disabled:opacity-40"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
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
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
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
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">Education {index + 1}</p>
            <button
              type="button"
              onClick={() => remove("education", entry.id)}
              disabled={education.length === 1}
              className="text-xs font-semibold text-rose-600 disabled:opacity-40"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-4">
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
        className="w-full rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
      >
        + Add education
      </button>
    </div>
  );
}

function SkillsForm({ skills, value, setValue, add, remove }) {
  return (
    <FormCard>
      <p className="mb-5 text-sm leading-6 text-slate-600">Add skills that are specific to the role you want.</p>
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
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:bg-white"
          placeholder="e.g. Stakeholder management"
        />
        <button type="button" onClick={add} className="rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800">
          Add
        </button>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <button
            type="button"
            onClick={() => remove(skill)}
            key={skill}
            className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 transition hover:bg-rose-50 hover:text-rose-700"
          >
            {skill} <span aria-hidden="true">x</span>
          </button>
        ))}
      </div>
    </FormCard>
  );
}

function AdditionalSectionsForm({
  certifications,
  languages,
  updateCertification,
  addCertification,
  removeCertification,
  updateLanguage,
  addLanguage,
  removeLanguage,
}) {
  return (
    <div className="space-y-4">
      <FormCard>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Certifications</h3>
          <button type="button" onClick={addCertification} className="text-sm font-semibold text-emerald-700">
            + Add
          </button>
        </div>
        <div className="space-y-3">
          {certifications.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Certification" value={item.title} onChange={(value) => updateCertification(item.id, "title", value)} />
                <Field label="Issuer" value={item.issuer} onChange={(value) => updateCertification(item.id, "issuer", value)} />
                <Field label="Year" value={item.year} onChange={(value) => updateCertification(item.id, "year", value)} />
              </div>
              <button type="button" onClick={() => removeCertification(item.id)} className="mt-3 text-xs font-semibold text-rose-600">
                Remove
              </button>
            </div>
          ))}
        </div>
      </FormCard>

      <FormCard>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Languages</h3>
          <button type="button" onClick={addLanguage} className="text-sm font-semibold text-emerald-700">
            + Add
          </button>
        </div>
        <div className="space-y-3">
          {languages.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Language" value={item.name} onChange={(value) => updateLanguage(item.id, "name", value)} />
                <Field label="Proficiency" value={item.level} onChange={(value) => updateLanguage(item.id, "level", value)} />
              </div>
              <button type="button" onClick={() => removeLanguage(item.id)} className="mt-3 text-xs font-semibold text-rose-600">
                Remove
              </button>
            </div>
          ))}
        </div>
      </FormCard>
    </div>
  );
}

function buildAtsAnalysis(data, keywordInput) {
  const contactFields = [data.contact?.fullName, data.contact?.email, data.contact?.phone, data.contact?.location];
  const completeContact = contactFields.filter(Boolean).length;
  const summaryWords = (data.summary || "").trim().split(/\s+/).filter(Boolean).length;
  const completeExperiences = (data.experiences || []).filter(
    (item) => item.role && item.company && (item.description || "").trim().split(/\s+/).filter(Boolean).length >= 10
  );
  const completeEducation = (data.education || []).filter((item) => item.degree && item.school);
  const jobKeywords = keywordInput
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const resumeText = [
    data.summary,
    ...(data.skills || []),
    ...(data.experiences || []).flatMap((item) => [item.role, item.company, item.description]),
  ]
    .join(" ")
    .toLowerCase();
  const matchedKeywords = jobKeywords.filter((keyword) => resumeText.includes(keyword.toLowerCase()));
  const actionVerbs =
    /\b(led|built|launched|improved|managed|created|increased|reduced|delivered|developed|owned|designed|coordinated|implemented)\b/i;
  const hasResultsLanguage = (data.experiences || []).some(
    (item) => actionVerbs.test(item.description || "") && /\d|%|\$/.test(item.description || "")
  );

  const contactScore = completeContact * 4;
  const summaryScore = summaryWords >= 25 ? 12 : summaryWords >= 12 ? 7 : 2;
  const experienceScore = completeExperiences.length >= 2 ? 22 : completeExperiences.length === 1 ? 13 : 3;
  const educationScore = completeEducation.length ? 10 : 2;
  const skillsScore = (data.skills || []).length >= 6 ? 14 : (data.skills || []).length >= 4 ? 10 : (data.skills || []).length * 2;
  const keywordScore = jobKeywords.length
    ? Math.round((matchedKeywords.length / jobKeywords.length) * 14)
    : Math.min((data.skills || []).length, 6) * 2;
  const resultsScore = hasResultsLanguage ? 10 : 3;
  const readabilityScore = 6;
  const score = Math.min(
    100,
    contactScore + summaryScore + experienceScore + educationScore + skillsScore + keywordScore + resultsScore + readabilityScore
  );
  const checks = [
    { label: "Contact details", detail: `${completeContact}/4 essential details`, passed: completeContact === 4 },
    { label: "Professional summary", detail: summaryWords >= 25 ? `${summaryWords} words` : "Aim for 25+ words", passed: summaryWords >= 25 },
    {
      label: "Experience quality",
      detail: completeExperiences.length >= 2 ? `${completeExperiences.length} complete roles` : "Add role, company, and impact",
      passed: completeExperiences.length >= 2,
    },
    {
      label: "Skills and keywords",
      detail: jobKeywords.length ? `${matchedKeywords.length}/${jobKeywords.length} job keywords matched` : `${(data.skills || []).length} skills listed`,
      passed: jobKeywords.length ? matchedKeywords.length >= Math.ceil(jobKeywords.length / 2) : (data.skills || []).length >= 4,
    },
    {
      label: "Education",
      detail: completeEducation.length ? `${completeEducation.length} qualification${completeEducation.length > 1 ? "s" : ""}` : "Add education",
      passed: Boolean(completeEducation.length),
    },
    { label: "ATS-safe format", detail: "Clear headings and readable type", passed: true },
    { label: "Results language", detail: hasResultsLanguage ? "Action verbs and metrics found" : "Add numbers or outcomes", passed: hasResultsLanguage },
  ];
  return { score, checks, jobKeywords, matchedKeywords };
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
      {/* Undo / Redo */}
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
