"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { MdBuild, MdPermContactCalendar, MdSchool, MdWork } from "react-icons/md";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  
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
      photo:""
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
  
  const [themeFont, setThemeFont] = useState("Inter, sans-serif");
  const [themeAccent, setThemeAccent] = useState("#0f766e");
  const [resumeData, setResumeData] = useState(initialCuratorData);

  useEffect(() => {
    const storedDraft = readStoredDraft();

    if (!storedDraft) return;

    if (storedDraft.resumeData) {
      setResumeData(storedDraft.resumeData);
    }

    if (storedDraft.themeFont) {
      setThemeFont(storedDraft.themeFont);
    }

    if (storedDraft.themeAccent) {
      setThemeAccent(storedDraft.themeAccent);
    }
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        themeAccent,
        setThemeAccent,
        themeFont,
        setThemeFont,
        templateNames,
        readStoredDraft,
        writeStoredDraft,
        editorSections,
        accentPresets,
        fontOptions
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);