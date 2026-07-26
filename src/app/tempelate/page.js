"use client";

import { useState, useMemo } from "react";
import { IoSearchSharp, IoCloseOutline } from "react-icons/io5";
import { FiEye, FiCheck, FiArrowRight } from "react-icons/fi";
import Header from "../Component/Header";
import Image from "next/image";
import Link from "next/link";

const templateCategories = ["All", "Modern", "Professional", "Creative", "Minimalist"];

const templatesData = [
  // Modern (5)
  {
    id: "resume1",
    title: "Nova",
    subtitle: "High-impact split layout for tech & product leads",
    category: "Modern",
    badge: "Top Pick",
    description: "Features a sleek dark sidebar, crisp typography, and teal accent badges. Ideal for software engineers and technology leaders.",
  },
  {
    id: "resume2",
    title: "Horizon",
    subtitle: "Top header banner with structured content cards",
    category: "Modern",
    badge: "Popular",
    description: "Designed with a vibrant brand top banner and structured dual-column layout for product managers and strategic roles.",
  },
  {
    id: "resume3",
    title: "Elevate",
    subtitle: "Tech-forward dark mode layout with contrast sidebar",
    category: "Modern",
    badge: "Featured",
    description: "High-contrast dark mode design system with accent progress indicators and clean grid hierarchy.",
  },
  {
    id: "resume4",
    title: "Pulse",
    subtitle: "Timeline-based career flow for dynamic roles",
    category: "Modern",
    badge: "Trending",
    description: "Connects your career progression along a clean vertical timeline. Perfect for showcasing rapid growth and achievements.",
  },
  {
    id: "resume5",
    title: "Vertex",
    subtitle: "Asymmetric layout with modern geometric header",
    category: "Modern",
    badge: "ATS 100%",
    description: "Asymmetric content arrangement with subtle color accents and spacious card boundaries for clarity.",
  },

  // Professional (5)
  {
    id: "resume6",
    title: "Executive",
    subtitle: "Formal corporate header for C-suite & senior directors",
    category: "Professional",
    badge: "Recruiter Pick",
    description: "Classic double-line border divider with centralized executive header. Highly recommended for executive & management roles.",
  },
  {
    id: "resume7",
    title: "Prestige",
    subtitle: "Traditional recruiter-grade corporate template",
    category: "Professional",
    badge: "Corporate",
    description: "Traditional corporate formatting with Georgia typography, subtle margins, and formal section dividers.",
  },
  {
    id: "resume8",
    title: "Legacy",
    subtitle: "High-ATS single column layout for maximum compatibility",
    category: "Professional",
    badge: "ATS Best",
    description: "Strictly single-column, recruiter-tested layout guaranteed to parse effortlessly through all ATS scanners.",
  },
  {
    id: "resume9",
    title: "Summit",
    subtitle: "Corporate sidebar with top contact info banner",
    category: "Professional",
    badge: "Featured",
    description: "Combines a clean top contact header with structured side columns for finance, HR, and consulting professionals.",
  },
  {
    id: "resume10",
    title: "Sterling",
    subtitle: "Sleek business grid system for management & operations",
    category: "Professional",
    badge: "Popular",
    description: "Structured border grid presentation giving a polished, highly organized appearance to long career histories.",
  },

  // Creative (5)
  {
    id: "resume11",
    title: "Canvas",
    subtitle: "Bold portfolio header with vibrant accent tags",
    category: "Creative",
    badge: "Designer Pick",
    description: "Vibrant header with floating skill pills and portfolio callouts tailored for UI/UX designers and art directors.",
  },
  {
    id: "resume12",
    title: "Mosaic",
    subtitle: "Multi-block modular grid layout for creatives",
    category: "Creative",
    badge: "Featured",
    description: "Modular card-based grid layout that presents work history, portfolio highlights, and skillsets in distinct cards.",
  },
  {
    id: "resume13",
    title: "Prism",
    subtitle: "Dual-tone color-block sidebar for brand leaders",
    category: "Creative",
    badge: "Creative",
    description: "Dual-tone color block layout providing immediate visual impact without compromising ATS scannability.",
  },
  {
    id: "resume14",
    title: "Inspire",
    subtitle: "Editorial magazine-style layout with large typography",
    category: "Creative",
    badge: "Editorial",
    description: "Editorial magazine layout with prominent summary quotes, serif typography, and elegant spacing.",
  },
  {
    id: "resume15",
    title: "Vision",
    subtitle: "Modern visual identity style with dark accent hero",
    category: "Creative",
    badge: "New",
    description: "Sophisticated dark theme visual identity system with high contrast text and highlighted metric callouts.",
  },

  // Minimalist (5)
  {
    id: "resume16",
    title: "Pure",
    subtitle: "Ultra-clean whitespace focus with single-column type",
    category: "Minimalist",
    badge: "Minimalist",
    description: "Maximum whitespace, refined single-column hierarchy, and zero clutter for a timeless, elegant presentation.",
  },
  {
    id: "resume17",
    title: "Essence",
    subtitle: "Balanced minimalist design with subtle left accent line",
    category: "Minimalist",
    badge: "Popular",
    description: "Frame your narrative along a delicate vertical accent line with lightweight headings and crisp margins.",
  },
  {
    id: "resume18",
    title: "Mono",
    subtitle: "High-contrast monochrome code & design aesthetic",
    category: "Minimalist",
    badge: "Monochrome",
    description: "Monochrome aesthetic with bold black header block, slash dividers, and high-contrast typography.",
  },
  {
    id: "resume19",
    title: "Slate",
    subtitle: "Muted slate palette with light section dividers",
    category: "Minimalist",
    badge: "Sleek",
    description: "Muted slate palette with soft borders, rounded container cards, and subtle typography hierarchy.",
  },
  {
    id: "resume20",
    title: "Zenith",
    subtitle: "Timeless typography-first layout for maximum clarity",
    category: "Minimalist",
    badge: "Classic",
    description: "Centered minimalist header with clean body text alignment. Built for timeless readability across all industries.",
  },
];

export default function TemplatePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const filteredTemplates = useMemo(() => {
    let result = templatesData.filter((template) => {
      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
      const searchTerm = searchValue.trim().toLowerCase();

      const matchesSearch =
        searchTerm === "" ||
        template.title.toLowerCase().includes(searchTerm) ||
        template.subtitle.toLowerCase().includes(searchTerm) ||
        template.category.toLowerCase().includes(searchTerm) ||
        template.description.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "alphabetical") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "category") {
      result = [...result].sort((a, b) => a.category.localeCompare(b.category));
    }

    return result;
  }, [selectedCategory, searchValue, sortBy]);

  const categoryColor = (cat) => {
    switch (cat) {
      case "Modern":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Professional":
        return "bg-slate-100 text-slate-800 border-slate-300";
      case "Creative":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Minimalist":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <>
      <Header />
      <main className="mx-auto min-h-screen bg-slate-50 px-4 pb-24 pt-24 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header Banner */}
          <header className="mb-12 border-b border-slate-200 pb-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-emerald-600" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                20 Premium Templates
              </p>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Template Gallery
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600 leading-relaxed">
              Explore 20 editorially crafted, ATS-optimized resume designs across Modern, Professional, Creative, and Minimalist styles.
            </p>
          </header>

          {/* Filter & Search Bar */}
          <section className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {templateCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-5 py-2 text-xs font-bold transition-all shadow-sm ${
                      isActive
                        ? "bg-slate-900 text-white shadow-slate-900/20"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:w-72">
                <IoSearchSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                  placeholder="Search templates..."
                  type="text"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="category">Group by Category</option>
              </select>
            </div>
          </section>

          {/* Grid of Templates */}
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-sm">
                <p className="text-xl font-bold text-slate-900">No templates match your search.</p>
                <p className="mt-2 text-sm">Try clearing your filters or searching for another title.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchValue("");
                  }}
                  className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredTemplates.map((template,i) => (
                <article key={i} className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

  {/* Resume Preview */}
  <Link href={`/Editor?template=${template.id}`}>
    <div className="relative bg-slate-100 p-5">
      <div className="overflow-hidden rounded-md bg-white shadow-lg">
        <Image
          src={`/templates/${template.id}.png`}
          
          alt={template.title}
          width={500}
          height={700}
          className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </div>
  </Link>

  {/* Footer */}
  <div className="flex items-start justify-between border-t border-slate-100 px-5 py-4">

    <div>
      <h3 className="text-2xl font-bold text-slate-900">
        {template.title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {template.subtitle}
      </p>
    </div>

    {template.badge === "Top Pick" && (
      <span className="rounded bg-sky-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700">
        TOP PICK
      </span>
    )}

  </div>

</article>
              ))
            )}
          </section>
        </div>

        {/* Modal Quick Preview */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8 animate-in fade-in zoom-in duration-200">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <IoCloseOutline className="text-2xl" />
              </button>

              <div className="mb-4">
                <span className={`inline-block rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${categoryColor(previewTemplate.category)}`}>
                  {previewTemplate.category}
                </span>
                <h3 className="mt-3 text-2xl font-black text-slate-900">{previewTemplate.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-600">{previewTemplate.subtitle}</p>
              </div>

              <p className="mb-6 text-xs leading-6 text-slate-600 border-t border-slate-100 pt-4">
                {previewTemplate.description}
              </p>

              <div className="mb-6 space-y-2 rounded-2xl bg-slate-50 p-4 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <FiCheck className="text-emerald-600" />
                  <span>Fully editable inline text preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-emerald-600" />
                  <span>100% ATS & recruiter friendly format</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-emerald-600" />
                  <span>Dynamic font & color theme customization</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <Link
                  href={`/Editor?template=${previewTemplate.id}`}
                  className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                >
                  Use {previewTemplate.title} Template
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
