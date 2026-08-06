'use client';

import { createContext, useContext, useReducer, useEffect, useCallback, useState } from 'react';

// ─── Default Portfolio Data ────────────────────────────────────────────────────
export const defaultPortfolio = {
  id: 'portfolio-1',
  templateId: 'minimalist',
  slug: '',
  isPublished: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  theme: {
    primaryColor: '#0f172a',
    accentColor: '#059669',
    backgroundColor: '#ffffff',
    textColor: '#334155',
    fontFamily: 'Inter',
    headingFont: 'Inter',
    borderRadius: 'md',
  },

  sectionsOrder: [
    'hero', 'about', 'skills', 'experience', 'education',
    'projects', 'services', 'testimonials', 'gallery',
    'certifications', 'awards', 'contact',
  ],

  sectionsVisible: {
    hero: true, about: true, skills: true, experience: true,
    education: true, projects: true, services: true,
    testimonials: true, gallery: false, certifications: true,
    awards: false, contact: true, footer: true,
  },

  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Full Stack Developer',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    avatar: '',
    tagline: 'Building digital experiences that matter.',
    resumeUrl: '',
    calendlyUrl: '',
  },

  about: {
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications and delightful user experiences. I specialize in React, Next.js, and Node.js, and I love turning complex problems into simple, elegant solutions.',
    highlights: ['5+ Years Experience', '50+ Projects Delivered', '20+ Happy Clients', 'Open Source Contributor'],
  },

  skills: [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Next.js', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 88, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'PostgreSQL', level: 80, category: 'Backend' },
    { name: 'Python', level: 75, category: 'Backend' },
    { name: 'AWS', level: 70, category: 'DevOps' },
    { name: 'Docker', level: 72, category: 'DevOps' },
    { name: 'Figma', level: 78, category: 'Design' },
  ],

  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Inc.',
      role: 'Senior Full Stack Developer',
      startDate: '2022-01',
      endDate: '',
      description: 'Lead development of customer-facing SaaS platform serving 50K+ users. Architected microservices backend and React frontend. Improved page load times by 60%.',
      current: true,
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      role: 'Frontend Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      description: 'Built responsive web applications with React and Next.js. Implemented real-time collaboration features using WebSockets. Mentored junior developers.',
      current: false,
    },
    {
      id: 'exp-3',
      company: 'Digital Agency Co.',
      role: 'Junior Developer',
      startDate: '2019-01',
      endDate: '2020-02',
      description: 'Developed client websites and e-commerce platforms. Worked with WordPress, Shopify, and custom React builds.',
      current: false,
    },
  ],

  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      year: '2019',
      description: 'Graduated with honors. Focus on software engineering and distributed systems.',
    },
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'AI Content Platform',
      description: 'A SaaS platform that uses AI to generate, optimize, and manage content at scale. Built with Next.js, OpenAI API, and PostgreSQL.',
      image: '',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      caseStudyUrl: '',
      videoDemoUrl: '',
      documentationUrl: '',
      tags: ['Next.js', 'AI', 'PostgreSQL', 'Tailwind CSS'],
    },
    {
      id: 'proj-2',
      title: 'Real-time Collaboration Tool',
      description: 'A Notion-like workspace with real-time editing, commenting, and task management. Supports multiple concurrent users.',
      image: '',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      caseStudyUrl: '',
      videoDemoUrl: '',
      documentationUrl: '',
      tags: ['React', 'WebSocket', 'Node.js', 'MongoDB'],
    },
    {
      id: 'proj-3',
      title: 'E-Commerce Dashboard',
      description: 'Full-featured admin dashboard for e-commerce with analytics, inventory management, and order processing.',
      image: '',
      liveUrl: '',
      githubUrl: 'https://github.com',
      caseStudyUrl: '',
      videoDemoUrl: '',
      documentationUrl: '',
      tags: ['React', 'Chart.js', 'Express', 'Stripe'],
    },
  ],

  services: [
    {
      id: 'svc-1',
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks like React, Next.js, and Node.js.',
      price: 'From $5,000',
      icon: 'code',
    },
    {
      id: 'svc-2',
      title: 'UI/UX Design',
      description: 'User-centered design with wireframes, prototypes, and polished interfaces in Figma.',
      price: 'From $3,000',
      icon: 'palette',
    },
    {
      id: 'svc-3',
      title: 'Technical Consulting',
      description: 'Architecture reviews, performance audits, and technology strategy for startups and enterprises.',
      price: '$200/hr',
      icon: 'lightbulb',
    },
  ],

  testimonials: [
    {
      id: 'test-1',
      name: 'Sarah Johnson',
      company: 'GrowthLab',
      role: 'CEO',
      text: 'John delivered an exceptional product that exceeded our expectations. His attention to detail and technical expertise made our project a success.',
      avatar: '',
    },
    {
      id: 'test-2',
      name: 'Mike Chen',
      company: 'DesignStudio',
      role: 'CTO',
      text: 'Working with John was a pleasure. He understood our requirements perfectly and delivered a scalable, well-architected solution.',
      avatar: '',
    },
  ],

  gallery: [],

  certifications: [
    { id: 'cert-1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023', credentialUrl: '' },
    { id: 'cert-2', name: 'Meta Frontend Developer', issuer: 'Meta (Coursera)', date: '2022', credentialUrl: '' },
  ],

  awards: [
    { id: 'award-1', title: 'Best Web App 2023', organization: 'DevAwards', year: '2023', description: 'Recognized for outstanding web application design and performance.' },
  ],

  contact: {
    showForm: true,
    formTitle: 'Let\'s Work Together',
    formDescription: 'Have a project in mind? I\'d love to hear about it. Send me a message and I\'ll get back to you within 24 hours.',
    whatsapp: '',
    telegram: '',
    googleMaps: '',
  },

  socialLinks: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    instagram: '',
    dribbble: '',
    behance: '',
    youtube: '',
    medium: '',
  },

  footer: {
    showFooter: true,
    privacyPolicyUrl: '',
    termsUrl: '',
  },

  seo: {
    title: '',
    description: '',
    keywords: [],
  },

  customStyles: {}, // Key: data-editable attribute, Value: CSS object
};

// ─── Reducer ───────────────────────────────────────────────────────────────────
function portfolioReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value, updatedAt: new Date().toISOString() };

    case 'UPDATE_NESTED': {
      const { section, field, value } = action;
      return {
        ...state,
        [section]: { ...state[section], [field]: value },
        updatedAt: new Date().toISOString(),
      };
    }

    case 'SET_TEMPLATE':
      return { ...state, templateId: action.templateId, updatedAt: new Date().toISOString() };

    case 'SET_THEME':
      return { ...state, theme: { ...state.theme, ...action.theme }, updatedAt: new Date().toISOString() };

    case 'UPDATE_STYLE': {
      const { elementKey, styles } = action;
      return {
        ...state,
        customStyles: {
          ...state.customStyles,
          [elementKey]: {
            ...(state.customStyles?.[elementKey] || {}),
            ...styles
          }
        },
        updatedAt: new Date().toISOString(),
      };
    }

    case 'ADD_ITEM': {
      const { section, item } = action;
      return {
        ...state,
        [section]: [...(state[section] || []), { ...item, id: `${section}-${Date.now()}` }],
        updatedAt: new Date().toISOString(),
      };
    }

    case 'UPDATE_ITEM': {
      const { section, id, updates } = action;
      return {
        ...state,
        [section]: state[section].map((item) => (item.id === id ? { ...item, ...updates } : item)),
        updatedAt: new Date().toISOString(),
      };
    }

    case 'REMOVE_ITEM': {
      const { section, id } = action;
      return {
        ...state,
        [section]: state[section].filter((item) => item.id !== id),
        updatedAt: new Date().toISOString(),
      };
    }

    case 'REORDER_SECTIONS':
      return { ...state, sectionsOrder: action.order, updatedAt: new Date().toISOString() };

    case 'TOGGLE_SECTION':
      return {
        ...state,
        sectionsVisible: { ...state.sectionsVisible, [action.section]: !state.sectionsVisible[action.section] },
        updatedAt: new Date().toISOString(),
      };

    case 'LOAD_PORTFOLIO':
      return { ...action.portfolio };

    case 'RESET':
      return { ...defaultPortfolio, id: state.id, createdAt: state.createdAt, updatedAt: new Date().toISOString() };

    default:
      return state;
  }
}

// ─── History Reducer Wrapper ─────────────────────────────────────────────────────
function useHistoryReducer(reducer, initialState, init) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  const dispatchWithHistory = useCallback((action) => {
    if (action.type === 'UNDO') {
      if (past.length === 0) return;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      
      setPast(newPast);
      setFuture([state, ...future]);
      
      dispatch({ type: 'LOAD_PORTFOLIO', portfolio: previous });
      return;
    }
    
    if (action.type === 'REDO') {
      if (future.length === 0) return;
      const next = future[0];
      const newFuture = future.slice(1);
      
      setPast([...past, state]);
      setFuture(newFuture);
      
      dispatch({ type: 'LOAD_PORTFOLIO', portfolio: next });
      return;
    }

    // Don't save history for rapid style updates if it's the exact same key to prevent bloat (optional, but good practice)
    // For now, we save everything up to 30 steps
    setPast(p => {
       const newPast = [...p, state];
       if (newPast.length > 30) newPast.shift();
       return newPast;
    });
    setFuture([]);
    dispatch(action);
  }, [state, past, future, dispatch]);

  return [state, dispatchWithHistory, { canUndo: past.length > 0, canRedo: future.length > 0 }];
}

// ─── Context ───────────────────────────────────────────────────────────────────
const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [portfolio, dispatch, { canUndo, canRedo }] = useHistoryReducer(portfolioReducer, defaultPortfolio, (initial) => {
    if (typeof window === 'undefined') return initial;
    try {
      const saved = localStorage.getItem('resuvix-portfolio');
      return saved ? { ...initial, ...JSON.parse(saved) } : initial;
    } catch {
      return initial;
    }
  });

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resuvix-portfolio', JSON.stringify(portfolio));
    } catch { /* localStorage full or unavailable */ }
  }, [portfolio]);

  // ─── Action helpers ──────────────────────────────────────────────────────────
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), [dispatch]);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), [dispatch]);

  const setField = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, [dispatch]);

  const updateNested = useCallback((section, field, value) => {
    dispatch({ type: 'UPDATE_NESTED', section, field, value });
  }, []);

  const setTemplate = useCallback((templateId) => {
    dispatch({ type: 'SET_TEMPLATE', templateId });
  }, []);

  const setTheme = useCallback((theme) => {
    dispatch({ type: 'SET_THEME', theme });
  }, []);

  const updateStyle = useCallback((elementKey, styles) => {
    dispatch({ type: 'UPDATE_STYLE', elementKey, styles });
  }, []);

  const addItem = useCallback((section, item) => {
    dispatch({ type: 'ADD_ITEM', section, item });
  }, []);

  const updateItem = useCallback((section, id, updates) => {
    dispatch({ type: 'UPDATE_ITEM', section, id, updates });
  }, []);

  const removeItem = useCallback((section, id) => {
    dispatch({ type: 'REMOVE_ITEM', section, id });
  }, []);

  const reorderSections = useCallback((order) => {
    dispatch({ type: 'REORDER_SECTIONS', order });
  }, []);

  const toggleSection = useCallback((section) => {
    dispatch({ type: 'TOGGLE_SECTION', section });
  }, []);

  const loadPortfolio = useCallback((portfolioData) => {
    dispatch({ type: 'LOAD_PORTFOLIO', portfolio: portfolioData });
  }, []);

  const resetPortfolio = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const value = {
    portfolio,
    dispatch,
    setField,
    updateNested,
    setTemplate,
    setTheme,
    updateStyle,
    addItem,
    updateItem,
    removeItem,
    reorderSections,
    toggleSection,
    loadPortfolio,
    resetPortfolio,
    undo,
    redo,
    canUndo,
    canRedo
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}

export default PortfolioContext;
