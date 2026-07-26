"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { MdBuild, MdPermContactCalendar, MdSchool, MdWork } from "react-icons/md";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const editorSections = [
    { id: "contact", label: "Contact", icon: <MdPermContactCalendar /> },
    { id: "experience", label: "Experience", icon: <MdWork /> },
    { id: "education", label: "Education", icon: <MdSchool /> },
    { id: "skills", label: "Skills", icon: <MdBuild /> },
    { id: "additional", label: "Certificates & Languages", icon: <MdBuild /> },
  ];

  const templateNames = {
    // Modern (5)
    resume1: "Nova",
    resume2: "Horizon",
    resume3: "Elevate",
    resume4: "Pulse",
    resume5: "Vertex",

    // Professional (5)
    resume6: "Executive",
    resume7: "Prestige",
    resume8: "Legacy",
    resume9: "Summit",
    resume10: "Sterling",

    // Creative (5)
    resume11: "Canvas",
    resume12: "Mosaic",
    resume13: "Prism",
    resume14: "Inspire",
    resume15: "Vision",

    // Minimalist (5)
    resume16: "Pure",
    resume17: "Essence",
    resume18: "Mono",
    resume19: "Slate",
    resume20: "Zenith",
  };

  const fontOptions = [
    { value: "Inter, sans-serif", label: "Inter" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "'Trebuchet MS', sans-serif", label: "Trebuchet" },
    { value: "'Times New Roman', serif", label: "Times New Roman" },
    { value: "'Outfit', sans-serif", label: "Outfit" },
    { value: "'Roboto', sans-serif", label: "Roboto" },
  ];

  const accentPresets = [
    { value: "#0f766e", label: "Teal" },
    { value: "#2563eb", label: "Blue" },
    { value: "#7c3aed", label: "Violet" },
    { value: "#0284c7", label: "Sky" },
    { value: "#d97706", label: "Amber" },
  ];

  const initialCuratorData = {
    contact: {
      fullName: "Alex Morgan",
      headline: "Senior Product Manager",
      email: "alex.morgan@email.com",
      phone: "+1 415 555 0198",
      location: "San Francisco, CA",
      website: "linkedin.com/in/alexmorgan",
      photo: "",
    },
    summary:
      "Customer-obsessed product manager with 7 years of experience shaping B2B software, aligning teams around outcomes, and turning insight into simple, valuable products.",
    experiences: [
      {
        id: "experience-1",
        role: "Senior Product Manager",
        company: "Bright Labs",
        startDate: "2022",
        endDate: "Present",
        description:
          "Own strategy for a workflow platform serving 3,000 weekly users. Launched a self-serve onboarding experience that improved trial-to-paid conversion by 18%.",
      },
      {
        id: "experience-2",
        role: "Product Manager",
        company: "Nimbus Health",
        startDate: "2019",
        endDate: "2022",
        description:
          "Led cross-functional squads across discovery, delivery, and measurement for a patient communications suite.",
      },
    ],
    education: [
      { id: "education-1", degree: "MBA, Product Strategy", school: "UC Berkeley", year: "2017" },
      { id: "education-2", degree: "BA, Economics", school: "UCLA", year: "2013" },
    ],
    skills: ["Roadmap strategy", "User research", "Go-to-market", "SQL & analytics", "Stakeholder alignment", "Experimentation"],
    certifications: [
      { id: "cert-1", title: "Certified Scrum Product Owner", issuer: "Scrum Alliance", year: "2021" },
    ],
    languages: [
      { id: "lang-1", name: "English", level: "Fluent" },
      { id: "lang-2", name: "Spanish", level: "Intermediate" },
    ],
  };

  const draftStorageKey = "resume-builder-draft-v1";
  const saveTimeoutRef = useRef(null);

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

  // Debounced LocalStorage saving for ultra-fast typing without UI lags
  const writeStoredDraft = useCallback((payload) => {
    if (typeof window === "undefined") return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(draftStorageKey, JSON.stringify(payload));
      } catch (error) {
        console.warn("Unable to save draft", error);
      }
    }, 400);
  }, []);

  const [themeFont, setThemeFont] = useState("Inter, sans-serif");
  const [themeAccent, setThemeAccent] = useState("#0f766e");

  // History stack for Undo / Redo
  const [history, setHistory] = useState([initialCuratorData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const resumeData = history[historyIndex] || initialCuratorData;

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const updateResumeData = useCallback(
    (updater, pushHistory = true) => {
      setHistory((prevHistory) => {
        const current = prevHistory[historyIndex] || initialCuratorData;
        const next = typeof updater === "function" ? updater(current) : updater;

        if (JSON.stringify(current) === JSON.stringify(next)) return prevHistory;

        if (pushHistory) {
          const sliced = prevHistory.slice(0, historyIndex + 1);
          if (sliced.length >= 40) sliced.shift();
          const updated = [...sliced, next];
          setHistoryIndex(updated.length - 1);
          return updated;
        } else {
          const copy = [...prevHistory];
          copy[historyIndex] = next;
          return copy;
        }
      });
    },
    [historyIndex]
  );

  const undo = useCallback(() => {
    if (canUndo) setHistoryIndex((prev) => prev - 1);
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) setHistoryIndex((prev) => prev + 1);
  }, [canRedo]);

  // Helper actions
  const updateContact = useCallback(
    (field, value) => {
      updateResumeData((current) => ({
        ...current,
        contact: { ...current.contact, [field]: value },
      }));
    },
    [updateResumeData]
  );

  const updateSummary = useCallback(
    (value) => {
      updateResumeData((current) => ({
        ...current,
        summary: value,
      }));
    },
    [updateResumeData]
  );

  const updateExperience = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        experiences: current.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
      }));
    },
    [updateResumeData]
  );

  const addExperience = useCallback(
    (index = null) => {
      updateResumeData((current) => {
        const newExp = {
          id: `experience-${Date.now()}`,
          role: "New Job Title",
          company: "Company Name",
          startDate: "2023",
          endDate: "Present",
          description: "Key responsibilities and achievements in this role.",
        };
        if (index === null) return { ...current, experiences: [...current.experiences, newExp] };
        const copy = [...current.experiences];
        copy.splice(index + 1, 0, newExp);
        return { ...current, experiences: copy };
      });
    },
    [updateResumeData]
  );

  const removeExperience = useCallback(
    (id) => {
      updateResumeData((current) => {
        if (current.experiences.length <= 1) return current;
        return { ...current, experiences: current.experiences.filter((exp) => exp.id !== id) };
      });
    },
    [updateResumeData]
  );

  const moveExperience = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const index = current.experiences.findIndex((exp) => exp.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= current.experiences.length) return current;

        const copy = [...current.experiences];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, experiences: copy };
      });
    },
    [updateResumeData]
  );

  const updateEducation = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        education: current.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
      }));
    },
    [updateResumeData]
  );

  const addEducation = useCallback(
    (index = null) => {
      updateResumeData((current) => {
        const newEdu = {
          id: `education-${Date.now()}`,
          degree: "Degree / Program",
          school: "University / Institution",
          year: "2022",
        };
        if (index === null) return { ...current, education: [...current.education, newEdu] };
        const copy = [...current.education];
        copy.splice(index + 1, 0, newEdu);
        return { ...current, education: copy };
      });
    },
    [updateResumeData]
  );

  const removeEducation = useCallback(
    (id) => {
      updateResumeData((current) => {
        if (current.education.length <= 1) return current;
        return { ...current, education: current.education.filter((edu) => edu.id !== id) };
      });
    },
    [updateResumeData]
  );

  const moveEducation = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const index = current.education.findIndex((edu) => edu.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= current.education.length) return current;

        const copy = [...current.education];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, education: copy };
      });
    },
    [updateResumeData]
  );

  const updateSkill = useCallback(
    (index, value) => {
      updateResumeData((current) => {
        const copy = [...current.skills];
        copy[index] = value;
        return { ...current, skills: copy };
      });
    },
    [updateResumeData]
  );

  const addSkill = useCallback(
    (skillName = "New Skill") => {
      updateResumeData((current) => ({
        ...current,
        skills: [...current.skills, skillName],
      }));
    },
    [updateResumeData]
  );

  const removeSkill = useCallback(
    (index) => {
      updateResumeData((current) => {
        if (current.skills.length <= 1) return current;
        return { ...current, skills: current.skills.filter((_, i) => i !== index) };
      });
    },
    [updateResumeData]
  );

  const moveSkill = useCallback(
    (index, direction) => {
      updateResumeData((current) => {
        const targetIndex = direction === "left" || direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= current.skills.length) return current;
        const copy = [...current.skills];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, skills: copy };
      });
    },
    [updateResumeData]
  );

  const updateCertification = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        certifications: current.certifications.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      }));
    },
    [updateResumeData]
  );

  const addCertification = useCallback(
    (index = null) => {
      updateResumeData((current) => {
        const newItem = { id: `cert-${Date.now()}`, title: "New Certification", issuer: "Issuer", year: "2024" };
        if (index === null) return { ...current, certifications: [...current.certifications, newItem] };
        const copy = [...current.certifications];
        copy.splice(index + 1, 0, newItem);
        return { ...current, certifications: copy };
      });
    },
    [updateResumeData]
  );

  const removeCertification = useCallback(
    (id) => {
      updateResumeData((current) => ({
        ...current,
        certifications: current.certifications.filter((item) => item.id !== id),
      }));
    },
    [updateResumeData]
  );

  const moveCertification = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const index = current.certifications.findIndex((item) => item.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= current.certifications.length) return current;
        const copy = [...current.certifications];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, certifications: copy };
      });
    },
    [updateResumeData]
  );

  const updateLanguage = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        languages: current.languages.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      }));
    },
    [updateResumeData]
  );

  const addLanguage = useCallback(
    (index = null) => {
      updateResumeData((current) => {
        const newItem = { id: `lang-${Date.now()}`, name: "New Language", level: "Fluent" };
        if (index === null) return { ...current, languages: [...current.languages, newItem] };
        const copy = [...current.languages];
        copy.splice(index + 1, 0, newItem);
        return { ...current, languages: copy };
      });
    },
    [updateResumeData]
  );

  const removeLanguage = useCallback(
    (id) => {
      updateResumeData((current) => ({
        ...current,
        languages: current.languages.filter((item) => item.id !== id),
      }));
    },
    [updateResumeData]
  );

  const moveLanguage = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const index = current.languages.findIndex((item) => item.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= current.languages.length) return current;
        const copy = [...current.languages];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, languages: copy };
      });
    },
    [updateResumeData]
  );

  // Load initial draft from localStorage
  useEffect(() => {
    const storedDraft = readStoredDraft();
    if (!storedDraft) return;

    if (storedDraft.resumeData) {
      setHistory([storedDraft.resumeData]);
      setHistoryIndex(0);
    }
    if (storedDraft.themeFont) setThemeFont(storedDraft.themeFont);
    if (storedDraft.themeAccent) setThemeAccent(storedDraft.themeAccent);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData: updateResumeData,
        themeAccent,
        setThemeAccent,
        themeFont,
        setThemeFont,
        templateNames,
        readStoredDraft,
        writeStoredDraft,
        editorSections,
        accentPresets,
        fontOptions,

        // History / Undo / Redo
        undo,
        redo,
        canUndo,
        canRedo,

        // Actions
        updateContact,
        updateSummary,
        updateExperience,
        addExperience,
        removeExperience,
        moveExperience,
        updateEducation,
        addEducation,
        removeEducation,
        moveEducation,
        updateSkill,
        addSkill,
        removeSkill,
        moveSkill,
        updateCertification,
        addCertification,
        removeCertification,
        moveCertification,
        updateLanguage,
        addLanguage,
        removeLanguage,
        moveLanguage,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);