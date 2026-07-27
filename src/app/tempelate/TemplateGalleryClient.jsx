"use client";

import { useState, useMemo } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FiEye, FiArrowRight } from "react-icons/fi";
import Header from "../Component/Header";
import Footer from "../Component/Home/footer";
import Image from "next/image";
import Link from "next/link";

import { templateCategories, templatesData } from "./templatesData";
export { templatesData };


export default function TemplateGalleryClient() {
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const filteredTemplates = useMemo(() => {
    let result = templatesData.filter((template) => {
      const matchesCategory =
        selectedCategory === "All" || template.category === selectedCategory;
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
                20+ Free Professional Templates
              </p>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Free ATS Resume Templates & Professional CV Designs
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
              Browse 20 editorially crafted, ATS-tested resume templates designed for tech, marketing, corporate leadership, and creative careers. Select a template and start building instantly for free.
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
                    className={`rounded-full px-5 py-2 text-xs font-bold transition-all hover:cursor-pointer shadow-sm ${
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
                <IoSearchSharp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-slate-400" />
                <input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white"
                  placeholder="Search templates..."
                  type="text"
                  aria-label="Search resume templates"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500"
                aria-label="Sort resume templates"
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
              filteredTemplates.map((template) => (
                <article
                  key={template.id}
                  className="group relative flex flex-col overflow-hidden rounded-xl bg-slate-200 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative aspect-[3/4] p-2">
                    <Image
                      className="h-full w-full rounded-sm object-cover shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                      src={`/templates/${template.id}.png`}
                      alt={`${template.title} - ${template.subtitle}`}
                      width={300}
                      height={400}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                      <Link
                        href={`/builder?template=${template.id}`}
                        className="group flex items-center gap-2 rounded-md bg-white px-6 py-2 font-bold text-black shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
                      >
                        Use Template
                        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenPreview(true);
                          setPreviewTemplate(template);
                        }}
                        className="group flex cursor-pointer items-center gap-2 rounded-md bg-white px-6 py-2 font-bold text-black shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                      >
                        Preview
                        <FiEye className="transition-transform duration-300 group-hover:scale-110" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-slate-200 p-4 text-black">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{template.title}</h2>
                      <p className="text-xs text-slate-600">{template.subtitle}</p>
                    </div>
                    {template.id === "resume1" && (
                      <span className="rounded bg-emerald-700 px-2 py-1 text-[10px] font-bold text-white uppercase">
                        TOP PICK
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 p-3 lg:hidden">
                    <Link
                      href={`/builder?template=${template.id}`}
                      className="flex-1 rounded-lg bg-emerald-600 py-2 text-center text-xs font-semibold text-white"
                    >
                      Use
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenPreview(true);
                        setPreviewTemplate(template);
                      }}
                      className="flex-1 rounded-lg border border-slate-500 py-2 text-xs font-semibold text-slate-700"
                    >
                      Preview
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>

        {/* Modal Preview */}
        {openPreview && previewTemplate && (
          <div
            key={previewTemplate.id}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b p-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{previewTemplate.title}</h2>
                  <p className="text-xs text-slate-500">
                    ATS Optimized • Recruiter Approved • High-Resolution PDF
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenPreview(false)}
                  className="rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-black"
                  aria-label="Close template preview"
                >
                  ✕
                </button>
              </div>

              <div className="flex max-h-[70vh] justify-center overflow-auto bg-slate-100 p-6">
                <div className="relative h-[650px] w-[500px]">
                  <Image
                    src={`/templates/${previewTemplate.id}.png`}
                    alt={`${previewTemplate.title} full template preview`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t p-5">
                <button
                  type="button"
                  onClick={() => setOpenPreview(false)}
                  className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Close
                </button>
                <Link
                  href={`/builder?template=${previewTemplate.id}`}
                  className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
