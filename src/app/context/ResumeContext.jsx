"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import {
  MdBuild,
  MdPermContactCalendar,
  MdSchool,
  MdWork,
  MdWorkspacePremium,
  MdTranslate,
  MdEmojiEvents,
  MdCode,
  MdLink,
} from "react-icons/md";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const editorSections = [
    { id: "contact", label: "Contact", icon: <MdPermContactCalendar /> },
    { id: "experience", label: "Experience", icon: <MdWork /> },
    { id: "education", label: "Education", icon: <MdSchool /> },
    { id: "skills", label: "Skills", icon: <MdBuild /> },
    { id: "certifications", label: "Certifications", icon: <MdWorkspacePremium /> },
    { id: "languages", label: "Languages", icon: <MdTranslate /> },
    { id: "awards", label: "Awards", icon: <MdEmojiEvents /> },
    { id: "projects", label: "Projects", icon: <MdCode /> },
    { id: "portfolio", label: "Portfolio", icon: <MdLink /> },
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
    { value: "#dc2626", label: "Red" },
    { value: "#059669", label: "Emerald" },
    { value: "#0284c7", label: "Sky" },
    { value: "#d97706", label: "Amber" },
    { value: "#475569", label: "Slate" },
  ];

  const initialCuratorData = {
    contact: {
      fullName: "Alex Morgan",
      headline: "Senior Product Manager",
      email: "alex.morgan@email.com",
      phone: "+1 415 555 0198",
      location: "San Francisco, CA",
      website: "alexmorgan.design",
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
    skills: [
      "Roadmap strategy",
      "User research",
      "Go-to-market",
      "SQL & analytics",
      "Stakeholder alignment",
      "Experimentation",
    ],
    tools: [
      { id: "tool-1", name: "Figma", image: "" },
      { id: "tool-2", name: "Adobe XD", image: "" },
    ],
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Solutions Architect",
        authority: "Amazon Web Services",
        date: "2024",
        expiryDate: "2027",
        credentialId: "AWS-849201",
        url: "https://aws.amazon.com/verification",
      },
      {
        id: "cert-2",
        name: "Google UX Design Professional Certificate",
        authority: "Google",
        date: "2023",
        expiryDate: "",
        credentialId: "GOOG-59102",
        url: "https://coursera.org/verify/google",
      },
    ],
    languages: [
      { id: "lang-1", name: "English", proficiency: "Native" },
      { id: "lang-2", name: "Spanish", proficiency: "Professional" },
      { id: "lang-3", name: "German", proficiency: "Intermediate" },
    ],
    awards: [
      {
        id: "award-1",
        title: "Employee of the Year",
        issuer: "Bright Labs",
        year: "2024",
        description: "Recognized for driving 18% improvement in platform conversion and team leadership.",
      },
      {
        id: "award-2",
        title: "Winner — National Product Hackathon",
        issuer: "TechCrunch Disrupt",
        year: "2023",
        description: "Built AI workflow tool selected 1st place among 120 competing teams.",
      },
    ],
    projects: [
      {
        id: "proj-1",
        title: "Resume Builder Platform",
        role: "Lead Creator",
        tech: "React, Next.js, Tailwind CSS",
        description: "Built a modern ATS-friendly resume builder supporting live inline editing and clean PDF export.",
        startDate: "2024",
        endDate: "Present",
        liveUrl: "https://resumebuilder.app",
        githubUrl: "https://github.com/alexmorgan/resume-builder",
      },
      {
        id: "proj-2",
        title: "Nimbus Patient Portal",
        role: "Product Lead",
        tech: "TypeScript, GraphQL, Node.js",
        description: "Redesigned patient dashboard enabling 40,000 users to schedule telehealth appointments seamlessly.",
        startDate: "2021",
        endDate: "2022",
        liveUrl: "https://nimbushealth.com",
        githubUrl: "",
      },
    ],
    portfolio: [
      { id: "link-1", platform: "LinkedIn", url: "https://linkedin.com/in/alexmorgan" },
      { id: "link-2", platform: "GitHub", url: "https://github.com/alexmorgan" },
      { id: "link-3", platform: "Dribbble", url: "https://dribbble.com/alexmorgan" },
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

  // Debounced LocalStorage saving
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

  // Contact & Summary
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

  // Experience
  const updateExperience = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        experiences: (current.experiences || []).map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
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
        const list = current.experiences || [];
        if (index === null) return { ...current, experiences: [...list, newExp] };
        const copy = [...list];
        copy.splice(index + 1, 0, newExp);
        return { ...current, experiences: copy };
      });
    },
    [updateResumeData]
  );

  const removeExperience = useCallback(
    (id) => {
      updateResumeData((current) => {
        const list = current.experiences || [];
        if (list.length <= 1) return current;
        return { ...current, experiences: list.filter((exp) => exp.id !== id) };
      });
    },
    [updateResumeData]
  );

  const moveExperience = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const list = current.experiences || [];
        const index = list.findIndex((exp) => exp.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;

        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, experiences: copy };
      });
    },
    [updateResumeData]
  );

  // Education
  const updateEducation = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        education: (current.education || []).map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
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
        const list = current.education || [];
        if (index === null) return { ...current, education: [...list, newEdu] };
        const copy = [...list];
        copy.splice(index + 1, 0, newEdu);
        return { ...current, education: copy };
      });
    },
    [updateResumeData]
  );

  const removeEducation = useCallback(
    (id) => {
      updateResumeData((current) => {
        const list = current.education || [];
        if (list.length <= 1) return current;
        return { ...current, education: list.filter((edu) => edu.id !== id) };
      });
    },
    [updateResumeData]
  );

  const moveEducation = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const list = current.education || [];
        const index = list.findIndex((edu) => edu.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;

        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, education: copy };
      });
    },
    [updateResumeData]
  );

  // Skills
  const updateSkill = useCallback(
    (index, value) => {
      updateResumeData((current) => {
        const copy = [...(current.skills || [])];
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
        skills: [...(current.skills || []), skillName],
      }));
    },
    [updateResumeData]
  );

  const removeSkill = useCallback(
    (index) => {
      updateResumeData((current) => {
        const list = current.skills || [];
        if (list.length <= 1) return current;
        return { ...current, skills: list.filter((_, i) => i !== index) };
      });
    },
    [updateResumeData]
  );

  const moveSkill = useCallback(
    (index, direction) => {
      updateResumeData((current) => {
        const list = current.skills || [];
        const targetIndex = direction === "left" || direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;
        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, skills: copy };
      });
    },
    [updateResumeData]
  );

  // Tools
  const updateTool = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        tools: (current.tools || []).map((tool) => (tool.id === id ? { ...tool, [field]: value } : tool)),
      }));
    },
    [updateResumeData]
  );

  const addTool = useCallback(
    (name = "New Tool", image = "") => {
      updateResumeData((current) => ({
        ...current,
        tools: [...(current.tools || []), { id: `tool-${Date.now()}`, name, image }],
      }));
    },
    [updateResumeData]
  );

  const removeTool = useCallback(
    (id) => {
      updateResumeData((current) => ({
        ...current,
        tools: (current.tools || []).filter((tool) => tool.id !== id),
      }));
    },
    [updateResumeData]
  );

  const moveTool = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const list = current.tools || [];
        const index = list.findIndex((tool) => tool.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;

        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, tools: copy };
      });
    },
    [updateResumeData]
  );

  // 1. Certifications
  const updateCertification = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        certifications: (current.certifications || []).map((cert) =>
          cert.id === id ? { ...cert, [field]: value } : cert
        ),
      }));
    },
    [updateResumeData]
  );

  const addCertification = useCallback(
    (index = null) => {
      updateResumeData((current) => {
        const newCert = {
          id: `cert-${Date.now()}`,
          name: "Certification Name",
          authority: "Issuing Organization",
          date: "2024",
          expiryDate: "",
          credentialId: "",
          url: "",
        };
        const list = current.certifications || [];
        if (index === null) return { ...current, certifications: [...list, newCert] };
        const copy = [...list];
        copy.splice(index + 1, 0, newCert);
        return { ...current, certifications: copy };
      });
    },
    [updateResumeData]
  );

  const removeCertification = useCallback(
    (id) => {
      updateResumeData((current) => ({
        ...current,
        certifications: (current.certifications || []).filter((cert) => cert.id !== id),
      }));
    },
    [updateResumeData]
  );

  const moveCertification = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const list = current.certifications || [];
        const index = list.findIndex((cert) => cert.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;

        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, certifications: copy };
      });
    },
    [updateResumeData]
  );

  // 2. Languages
  const updateLanguage = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        languages: (current.languages || []).map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
      }));
    },
    [updateResumeData]
  );

  const addLanguage = useCallback(
    (index = null) => {
      updateResumeData((current) => {
        const newLang = {
          id: `lang-${Date.now()}`,
          name: "Language",
          proficiency: "Fluent",
        };
        const list = current.languages || [];
        if (index === null) return { ...current, languages: [...list, newLang] };
        const copy = [...list];
        copy.splice(index + 1, 0, newLang);
        return { ...current, languages: copy };
      });
    },
    [updateResumeData]
  );

  const removeLanguage = useCallback(
    (id) => {
      updateResumeData((current) => ({
        ...current,
        languages: (current.languages || []).filter((lang) => lang.id !== id),
      }));
    },
    [updateResumeData]
  );

  const moveLanguage = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const list = current.languages || [];
        const index = list.findIndex((lang) => lang.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;

        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, languages: copy };
      });
    },
    [updateResumeData]
  );

  // 3. Awards & Achievements
  const updateAward = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        awards: (current.awards || []).map((award) => (award.id === id ? { ...award, [field]: value } : award)),
      }));
    },
    [updateResumeData]
  );

  const addAward = useCallback(
    (index = null) => {
      updateResumeData((current) => {
        const newAward = {
          id: `award-${Date.now()}`,
          title: "Award Title",
          issuer: "Organization Name",
          year: "2024",
          description: "Brief description of the recognition.",
        };
        const list = current.awards || [];
        if (index === null) return { ...current, awards: [...list, newAward] };
        const copy = [...list];
        copy.splice(index + 1, 0, newAward);
        return { ...current, awards: copy };
      });
    },
    [updateResumeData]
  );

  const removeAward = useCallback(
    (id) => {
      updateResumeData((current) => ({
        ...current,
        awards: (current.awards || []).filter((award) => award.id !== id),
      }));
    },
    [updateResumeData]
  );

  const moveAward = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const list = current.awards || [];
        const index = list.findIndex((award) => award.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;

        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, awards: copy };
      });
    },
    [updateResumeData]
  );

  // 4. Projects
  const updateProject = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        projects: (current.projects || []).map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
      }));
    },
    [updateResumeData]
  );

  const addProject = useCallback(
    (index = null) => {
      updateResumeData((current) => {
        const newProj = {
          id: `proj-${Date.now()}`,
          title: "Project Title",
          role: "Lead Developer / Creator",
          tech: "React, Node.js",
          description: "Project scope and key deliverables.",
          startDate: "2023",
          endDate: "Present",
          liveUrl: "",
          githubUrl: "",
        };
        const list = current.projects || [];
        if (index === null) return { ...current, projects: [...list, newProj] };
        const copy = [...list];
        copy.splice(index + 1, 0, newProj);
        return { ...current, projects: copy };
      });
    },
    [updateResumeData]
  );

  const removeProject = useCallback(
    (id) => {
      updateResumeData((current) => ({
        ...current,
        projects: (current.projects || []).filter((proj) => proj.id !== id),
      }));
    },
    [updateResumeData]
  );

  const moveProject = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const list = current.projects || [];
        const index = list.findIndex((proj) => proj.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;

        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, projects: copy };
      });
    },
    [updateResumeData]
  );

  // 5. Portfolio / Social Links
  const updatePortfolio = useCallback(
    (id, field, value) => {
      updateResumeData((current) => ({
        ...current,
        portfolio: (current.portfolio || []).map((link) => (link.id === id ? { ...link, [field]: value } : link)),
      }));
    },
    [updateResumeData]
  );

  const addPortfolio = useCallback(
    (platform = "LinkedIn", url = "") => {
      updateResumeData((current) => ({
        ...current,
        portfolio: [...(current.portfolio || []), { id: `link-${Date.now()}`, platform, url }],
      }));
    },
    [updateResumeData]
  );

  const removePortfolio = useCallback(
    (id) => {
      updateResumeData((current) => ({
        ...current,
        portfolio: (current.portfolio || []).filter((link) => link.id !== id),
      }));
    },
    [updateResumeData]
  );

  const movePortfolio = useCallback(
    (id, direction) => {
      updateResumeData((current) => {
        const list = current.portfolio || [];
        const index = list.findIndex((link) => link.id === id);
        if (index === -1) return current;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= list.length) return current;

        const copy = [...list];
        const [item] = copy.splice(index, 1);
        copy.splice(targetIndex, 0, item);
        return { ...current, portfolio: copy };
      });
    },
    [updateResumeData]
  );

  // Load initial draft from localStorage
  useEffect(() => {
    const storedDraft = readStoredDraft();
    if (!storedDraft) return;

    if (storedDraft.resumeData) {
      // Robust restoration ensuring collections exist
      const restored = {
        ...initialCuratorData,
        ...storedDraft.resumeData,
        skills: storedDraft.resumeData.skills || [],
        tools: storedDraft.resumeData.tools || [],
      };
      setHistory([restored]);
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

        // Core Actions
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

        // Tools
        updateTool,
        addTool,
        removeTool,
        moveTool,

        // New Section Actions
        updateCertification,
        addCertification,
        removeCertification,
        moveCertification,
        updateLanguage,
        addLanguage,
        removeLanguage,
        moveLanguage,
        updateAward,
        addAward,
        removeAward,
        moveAward,
        updateProject,
        addProject,
        removeProject,
        moveProject,
        updatePortfolio,
        addPortfolio,
        removePortfolio,
        movePortfolio,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);
