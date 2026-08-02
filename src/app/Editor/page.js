"use client";

import { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import AtsScoreMeter from "../Component/SEO/AtsScoreMeter";

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
import { MdGridView, MdClose, MdCheckCircle, MdMonitor, MdPhoneIphone } from "react-icons/md";
import { HiOutlineSave } from "react-icons/hi";
import Link from "next/link";
import { useResume } from "../context/ResumeContext";
import Header from "../Component/Header";

/* ──────────────────────────────────────────────
   Editor-Specific Top Bar Header
   ────────────────────────────────────────────── */
function EditorHeader({
  selectedName,
  draftStatus,
  draftSavedAt,
  undo,
  redo,
  canUndo,
  canRedo,
  onChangeTemplate,
  selectedTemplate,
  currentSection,
  onToggleSidebar,
}) {
  const [shareTooltip, setShareTooltip] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `Resume`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareTooltip(true);
      setTimeout(() => setShareTooltip(false), 2000);
    }
  };

  return (
    <Header
    undo ={undo}
    canUndo={canUndo}
    redo={redo}
    canRedo={canRedo}
    onChangeTemplate={onChangeTemplate}
    handleShare={handleShare}
    shareTooltip={shareTooltip}
    selectedTemplate={selectedTemplate}

    />
  );
}

// ── Template catalogue ─────────────────────────────────────────────────────
const TEMPLATE_CATEGORIES = [
  {
    label: "Modern",
    badgeStyle: { background: "#dbeafe", color: "#1e40af" },
    accentColor: "#60a5fa",
    templates: [
      { id: "resume1",  name: "Nova",      icon: "🌟" },
      { id: "resume2",  name: "Horizon",   icon: "🌅" },
      { id: "resume3",  name: "Elevate",   icon: "🚀" },
      { id: "resume4",  name: "Pulse",     icon: "⚡" },
      { id: "resume5",  name: "Vertex",    icon: "🔷" },
    ],
  },
  {
    label: "Professional",
    badgeStyle: { background: "#f1f5f9", color: "#334155" },
    accentColor: "#64748b",
    templates: [
      { id: "resume6",  name: "Executive", icon: "💼" },
      { id: "resume7",  name: "Prestige",  icon: "🏆" },
      { id: "resume8",  name: "Legacy",    icon: "📋" },
      { id: "resume9",  name: "Summit",    icon: "🏔️" },
      { id: "resume10", name: "Sterling",  icon: "✨" },
    ],
  },
  {
    label: "Creative",
    badgeStyle: { background: "#f3e8ff", color: "#7e22ce" },
    accentColor: "#a855f7",
    templates: [
      { id: "resume11", name: "Canvas",    icon: "🎨" },
      { id: "resume12", name: "Mosaic",    icon: "🧩" },
      { id: "resume13", name: "Prism",     icon: "🌈" },
      { id: "resume14", name: "Inspire",   icon: "💡" },
      { id: "resume15", name: "Vision",    icon: "👁️" },
    ],
  },
  {
    label: "Minimalist",
    badgeStyle: { background: "#d1fae5", color: "#065f46" },
    accentColor: "#10b981",
    templates: [
      { id: "resume16", name: "Pure",      icon: "⬜" },
      { id: "resume17", name: "Essence",   icon: "🍃" },
      { id: "resume18", name: "Mono",      icon: "◼" },
      { id: "resume19", name: "Slate",     icon: "🪨" },
      { id: "resume20", name: "Zenith",    icon: "🔝" },
    ],
  },
];

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
      {/* Simple loading header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-5 shadow-sm backdrop-blur-md">
        <span className="text-base font-extrabold text-slate-900">
          Easy<span className="text-sky-600">Resume</span>
        </span>
        <div className="h-8 w-28 animate-pulse rounded-lg bg-slate-100" />
      </header>
      <main className="min-h-screen bg-slate-100 pt-14" />
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
  const [showTemplateSwitcher, setShowTemplateSwitcher] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(100);
  const [previewDevice, setPreviewDevice] = useState("desktop"); // "desktop" | "mobile"
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const previewRef = useRef(null);

  const zoomIn  = () => setPreviewZoom((z) => Math.min(200, z + 10));
  const zoomOut = () => setPreviewZoom((z) => Math.max(50,  z - 10));

  const router = useRouter();
  const pathname = usePathname();

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

  const handleTemplateChange = useCallback((templateId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("template", templateId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setShowTemplateSwitcher(false);
  }, [searchParams, router, pathname]);

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
    const el = previewRef.current;
    const controls = document.querySelector(".editor-preview .absolute.bottom-0");
    el.classList.add("export-mode");

    // Save current inline styles to restore later
    const prevZoom = el.style.zoom;
    const prevWidth = el.style.width;
    const prevMinWidth = el.style.minWidth;
    const prevOverflow = el.style.overflow;

    try {
      controls?.classList.add("hidden");

      // Force full A4 size — override any CSS zoom so html2canvas captures at 100%
      el.style.zoom = "1";
      el.style.width = "794px";    // A4 width in px at 96dpi
      el.style.minWidth = "794px";
      el.style.overflow = "visible";

      // Small delay for browser to repaint at new size
      await new Promise((r) => setTimeout(r, 120));

      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: el.scrollWidth,
        height: el.scrollHeight,
        windowWidth: el.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Fit image width exactly to page (no side margins needed — resume already has its own padding)
      const imgWidthPt = pageWidth;
      const imgHeightPt = (canvas.height * imgWidthPt) / canvas.width;

      // Multi-page: slice canvas into A4-height chunks
      const pageHeightPx = (canvas.width * pageHeight) / pageWidth; // page height in canvas pixels
      let yOffset = 0;
      let pageIndex = 0;

      while (yOffset < canvas.height) {
        if (pageIndex > 0) pdf.addPage();

        const sliceHeight = Math.min(pageHeightPx, canvas.height - yOffset);

        // Create a temp canvas for this slice
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeight;
        const ctx = sliceCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, yOffset, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

        const sliceData = sliceCanvas.toDataURL("image/png");
        const sliceHeightPt = (sliceHeight * pageWidth) / canvas.width;
        pdf.addImage(sliceData, "PNG", 0, 0, pageWidth, sliceHeightPt, undefined, "FAST");

        yOffset += pageHeightPx;
        pageIndex++;
      }

      pdf.save(`${selectedName.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`);
    } catch (error) {
      console.error("PDF export failed", error);
      window.print();
    } finally {
      // Restore original styles
      el.style.zoom = prevZoom;
      el.style.width = prevWidth;
      el.style.minWidth = prevMinWidth;
      el.style.overflow = prevOverflow;

      setIsExportingPdf(false);
      controls?.classList.remove("hidden");
      el.classList.remove("export-mode");
    }
  };

  return (
    <>
      <EditorHeader
        selectedName={selectedName}
        draftStatus={draftStatus}
        draftSavedAt={draftSavedAt}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onChangeTemplate={() => setShowTemplateSwitcher(true)}
        selectedTemplate={selectedTemplate}
        isExportingPdf={isExportingPdf}
        currentSection={section.label}
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />
      <main className="min-h-screen bg-slate-100 pt-14 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Mobile Overlay */}
          <div
            className={`fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm transition-opacity md:hidden ${
              mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
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
                  className={`flex w-full hover:cursor-pointer items-center gap-3 rounded-xl md:px-2 xl:px-3 justify-start py-2.5 text-xs font-medium transition ${
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
                  <HiOutlineSave className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap opacity-0 w-0 overflow-hidden transition-all duration-300 group-hover:w-auto group-hover:opacity-100">
                  Save draft
                </span>
              </button>
            </div>
          </aside>

          <div className="w-full md:ml-[72px] lg:flex lg:h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
            {/* Form Section */}
            <section className="editor-panel bg-slate-100 min-w-0 w-full p-4 sm:p-6 lg:w-[48%] lg:h-full lg:overflow-y-auto lg:pb-12">
              <div className="mx-auto max-w-xl space-y-4">
                
                <div className="mb-2 border-b border-slate-200 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      
                      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                        {section.label}
                      </h1>
                      
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      
                      
                    </div>
                  </div>
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
              className="editor-preview relative flex min-w-0 w-full flex-col border-t border-slate-200 bg-slate-200/60 h-[800px] lg:h-full lg:w-[52%] lg:border-l lg:border-t-0"
            >
              {/* ── Top Toolbar ── */}
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">
                {/* Left: Live Preview indicator */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Live Preview</span>
                </div>

                {/* Center: Device Toggle */}
                <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-0.5">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    title="Desktop view"
                    className={`flex h-7 w-8 items-center justify-center rounded-lg text-sm transition ${
                      previewDevice === "desktop"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <MdMonitor className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    title="Mobile view"
                    className={`flex h-7 w-8 items-center justify-center rounded-lg text-sm transition ${
                      previewDevice === "mobile"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <MdPhoneIphone className="h-4 w-4" />
                  </button>
                </div>

                {/* Right: Zoom Controls */}
                <div className="flex items-center gap-0 rounded-xl border border-slate-200 bg-slate-50">
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={previewZoom <= 50}
                    title="Zoom out"
                    className="flex h-8 w-8 items-center justify-center rounded-l-xl text-base font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30"
                  >
                    &#8722;
                  </button>
                  <span className="min-w-[3rem] text-center text-[11px] font-bold text-slate-700 select-none">
                    {previewZoom}%
                  </span>
                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={previewZoom >= 200}
                    title="Zoom in"
                    className="flex h-8 w-8 items-center justify-center rounded-r-xl text-base font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30"
                  >
                    &#43;
                  </button>
                </div>
              </div>

              {/* Scrollable preview area */}
              <div className="flex-1 overflow-y-auto pb-16 px-3 pt-5 sm:px-6">
                <div className={`flex justify-center ${previewDevice === "mobile" ? "items-start" : ""}`}>
                  <div
                    className={`transition-all duration-200 ${
                      previewDevice === "mobile"
                        ? "w-[375px] rounded-[2.5rem] border-[6px] border-slate-700 shadow-2xl overflow-hidden"
                        : ""
                    }`}
                    style={{
                      transform: `scale(${previewZoom / 100})`,
                      transformOrigin: "top center",
                      marginBottom: `${-(100 - previewZoom)}%`,
                    }}
                  >
                    <div ref={previewRef} className="resume-preview-document bg-white">
                      <SelectedResume
                        data={resumeData}
                        theme={{ accent: themeAccent, fontFamily: themeFont }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Fixed Bottom Theme Bar ── */}
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-4 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md">
                
                {/* Left: Template & Actions */}
                <div className="flex   md:hidden  items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTemplateSwitcher(true)}
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-700 active:scale-95"
                  >
                    <MdGridView className="h-4 w-4 text-emerald-400" />
                    <span className="hidden sm:inline">Template</span>
                  </button>

                  <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

                  
                </div>

                {/* Right: Theme Controls */}
                <div className="flex items-center gap-4">
                  {/* Color Presets */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {accentPresets.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setThemeAccent(preset.value)}
                        className={`h-5 w-5 shrink-0 rounded-full transition-all cursor-pointer ${
                          themeAccent === preset.value
                            ? "ring-2 ring-slate-900 ring-offset-1 scale-110 shadow-sm"
                            : "hover:scale-110"
                        }`}
                        style={{ backgroundColor: preset.value }}
                        aria-label={`Use ${preset.label} accent`}
                      />
                    ))}
                    <label className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-400 hover:border-slate-500 transition">
                      <span className="text-[10px] font-bold leading-none">+</span>
                      <input type="color" value={themeAccent} onChange={(e) => setThemeAccent(e.target.value)} className="sr-only" />
                    </label>
                  </div>

                  <div className="h-5 w-px bg-slate-200" />

                  {/* Font Selector */}
                  <label className="flex shrink-0 items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hidden sm:inline">Font</span>
                    <select
                      value={themeFont}
                      onChange={(e) => setThemeFont(e.target.value)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500 cursor-pointer hover:bg-white transition"
                    >
                      {fontOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              {/* Template Switcher Drawer */}
              {showTemplateSwitcher && (
                <TemplateSwitcher
                  current={selectedTemplate}
                  onSelect={handleTemplateChange}
                  onClose={() => setShowTemplateSwitcher(false)}
                />
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

function Field({ label, value, onChange, type = "text", textarea = false, placeholder = "" }) {
  const className =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] font-medium text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 hover:border-slate-300";
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold tracking-wide text-slate-600">{label}</span>
      {textarea ? (
        <textarea
          className={`${className} min-h-24 resize-y leading-relaxed`}
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

function FormCard({ children, index = 0 }) {
  return (
    <div 
      className="animate-slide-up rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-6 transition-all hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] opacity-0 translate-y-4"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {children}
    </div>
  );
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
        <FormCard key={experience.id} index={index}>
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
        <FormCard key={entry.id} index={index}>
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
        <FormCard key={tool.id || index} index={index}>
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
        <FormCard key={cert.id} index={index}>
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
        <FormCard key={lang.id} index={index}>
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
        <FormCard key={award.id} index={index}>
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
        <FormCard key={proj.id} index={index}>
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
        <FormCard key={link.id} index={index}>
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


// ── Template Switcher Drawer ────────────────────────────────────────────────
function TemplateSwitcher({ current, onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Right Slide-over Panel */}
      <div
        className="relative z-10 w-full max-w-md h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out"
      >
        
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Templates</h2>
            <p className="text-xs font-medium text-slate-500 mt-1">Select from 20 premium layouts</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <input 
            type="text" 
            placeholder="Search templates (e.g. Modern, Canvas)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400"
          />
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          <div className="flex flex-col gap-8">
            {TEMPLATE_CATEGORIES.map((category) => {
              const filteredTemplates = category.templates.filter(t => 
                t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                category.label.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (filteredTemplates.length === 0) return null;

              return (
                <div key={category.label}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: category.accentColor }}>
                      {category.label}
                    </span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {filteredTemplates.map((tpl) => {
                      const isActive = current === tpl.id;
                      return (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => { onSelect(tpl.id); onClose(); }}
                          className={`group flex flex-col items-center gap-3 rounded-2xl border-2 p-3 transition-all hover:scale-[1.02] ${
                            isActive
                              ? `bg-slate-50 shadow-md`
                              : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50"
                          }`}
                          style={{ borderColor: isActive ? category.accentColor : undefined }}
                        >
                          {/* Mini resume mockup */}
                          <div className="relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-3 shadow-inner">
                            <span className="text-3xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300">{tpl.icon}</span>
                            
                            <div className="mt-4 flex w-full flex-col gap-1.5 opacity-60">
                              <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: isActive ? category.accentColor : "#94a3b8" }} />
                              <div className="h-1 w-1/2 rounded-full bg-slate-400" />
                              <div className="h-1 w-2/3 rounded-full bg-slate-400" />
                            </div>

                            {isActive && (
                              <div className="absolute right-2 top-2 rounded-full bg-white p-0.5 shadow-sm">
                                <MdCheckCircle size={18} color={category.accentColor} />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-center gap-0.5">
                            <span className={`text-sm font-bold ${isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>
                              {tpl.name}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

