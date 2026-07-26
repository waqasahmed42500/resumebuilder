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
  const [openPreview, setOpenPreview] = useState(false);
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
                    className={`rounded-full px-5 py-2 text-xs font-bold transition-all hover:cursor-pointer shadow-sm ${isActive
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
              filteredTemplates.map((templates, i) => (
                <article key={i} className="group  relative flex flex-col bg-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[3/4] p-2  bg-red-500-lowest  relative">
                    <img className="w-full h-full  shadow-lg group-hover:scale-[1.02] transition-transform duration-500 rounded-sm" data-alt="Clean and professional modern resume layout with sans-serif typography on premium white paper texture with blue accents" src={`/templates/${templates.id}.png`} alt={templates.title} />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-3 justify-center backdrop-blur-[2px]">
                      <Link
                        href={`/Editor?template=${templates.id}`}
                        className="group bg-white flex items-center gap-2 text-black px-6 py-2 rounded-md font-bold shadow-xl active:scale-95 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
                      >
                        Use Template
                        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <button
                        onClick={() => {setOpenPreview(true) ,setPreviewTemplate(templates)}}
                        className="group bg-white flex items-center gap-2 text-black px-6 py-2 rounded-md font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                      >
                        View Template
                        <FiEye className="transition-transform duration-300 group-hover:scale-110" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center bg-gray-200 text-black">
                    <div>
                      <h3 className="text-xl font-bold  font-headline">{templates.title}</h3>
                      <p className="text-sm ">{templates.subtitle}</p>
                    </div>
                    <div className="flex text-center gap-1">
                      <span className="px-2 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold rounded">TOP PICK</span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>


{openPreview && previewTemplate && (
  <div key={previewTemplate.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

    <div className="relative w-full max-w-6xl rounded-2xl bg-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h2 className="text-xl font-bold text-black">
            {previewTemplate.title}
          </h2>

          <p className="text-sm text-slate-500">
            ATS Friendly • A4 Ready • Professional Design
          </p>
        </div>

        <button
          onClick={() => setOpenPreview(false)}
          className="rounded-full p-2 hover:bg-slate-100 text-black hover:cursor-pointer transition-all duration-300"
        >
          ✕
        </button>
      </div>

      {/* Preview */}
      <div className="flex justify-center bg-slate-100 p-8 overflow-auto max-h-[70vh]">

        <div className="scale-90 origin-top">
          {/* resume Component */}
          <img src={`/templates/${previewTemplate.id}.png`} alt={previewTemplate.title} />
        </div>

      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 border-t p-5">

        <button
          onClick={() => setOpenPreview(false)}
          className="rounded-lg border text-gray-700 px-5 py-2 font-semibold hover:bg-slate-100"
        >
          Close
        </button>

        <Link
          href={`/Editor?template=${previewTemplate.id}`}
          className="rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white hover:bg-emerald-700"
        >
          Use This Template
        </Link>

      </div>

    </div>

  </div>
)}
       </main>
    </>
  );
}
