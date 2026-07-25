"use client";

import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Header from "../Component/Header";
import Link from "next/link";

const templateStyles = ["All", "Modern", "Professional", "Creative", "Minimalist"];

const templates = [
  {
    id: "resume1",
    title: "Modernist",
    subtitle: "High-impact tech roles",
    style: "Modern",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCv3M-5jSTVgOfPw80x4GkiMhKtPy5EIYiKcyRISwYecZK8WofUTbhCXdqGUnEfODDgiNbbiybKEDOXj2By6oYX5-YObcdfyH9abzufiw6lmgxxEbu91df3CIyRZGFG2Y78OqpAxFq-au3Cx4l-pbP3lxOWcQM7sjLe97htcj6vxD84t34JmnV3lH9XOnQW-7VRp6KxaWX23F2tVF2bVZlazwu-Re1rwnFxKj78TY1TWSRoO2KMsiO70Yy3Uv7ZY1h5ZLKHmIc5Ekk",
    label: "Top Pick",
  },
  {
    id: "resume2",
    title: "The Curator",
    subtitle: "Product & strategy leaders",
    style: "Professional",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_bh_uo4WmhZe_KDJ6EKubcbATqGi-oeBzoOAQ78Y5FWo2EJJ5MDJN-yfn4ujLjpxEE_UbUhFBGSUxwuq0HNSjI-Z2OIR7z2MqDGnw3S9Q1oA7kbTUEH-DmTXrrEI02z9pSlP4T_ICUTuiVz7460S2ixpOVWze0zwaJu8XeXWst80ZGV9x-eyQwQkhzXRWdUveSnHPeiTOWN2wLIiG1J98nx1nFYrJ4m_7jI1N6I7BUW_AppuTH4ZuRn2otLLKLUw0h1DWeQWAaBI",
  },
  {
    id: "resume3",
    title: "Executive",
    subtitle: "Banking & Management",
    style: "Professional",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2FXmaOFcyXINFgWmN6e4HP8zb5XqWxfO59FGAb2WLis62aSg9lK_21Cj5qVKRNiynxZUqUMGaEKOeMpRu0S-XvjQLjpuNK3m3WriEfBLmBAha9Qv0z_DEI0Js1wiUFkma4ilh1AiWMaAMfEYTHCE6SbyB8-GHXGJrx4HIj7poimlshzTnrzS4QGGCytBnIFqrT9qRINYOF78kzfoPaodJtmKayKlkvhyeiAbPZYqFRRIVDNM4gPzDdVwLCBib_SLVMxZ4Um9wcwk",
  },
  {
    id: "resume4",
    title: "Zenith",
    subtitle: "Focus on content",
    style: "Minimalist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB71Z6Afn4KWaoDoSkMAqcCxQykxehhVbwaCyBxnSH3QZ3YsAEWox1JbWtKUWeQ2gP4LlIi1JU8SkXUzp-NXxvwiJ14XS8WVyI6x0OME1zFRqVxNJPowQxxlKWI7bt73HRBUKPdrYAO9413RHe3HDod-wkXYT8E12lajozLYsXT0NRM7i8jhiDCLpoGugzr3xluvyBO-tVqxAuWQackRNwGReu6C-mNowx0H1wOpqOT7NvBzA8lO841m7IbdD4Xb8MpghwdtlNM7JY",
  },
  {
    id: "resume5",
    title: "The Blueprint",
    subtitle: "Architecture & Engineering",
    style: "Professional",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1lctFEzKoryEXkOS-6mUhI2ynilFgBXeaDBzJTWNo3dQX0BqsIfvXHf9YfDZ-0px3ZMt2h2Wwd_agDsrYNda8h39N9ph0d1u1YISQQ0h1Eem7rihjMyDXrgcM3K_ARZ2B1w6rMTpqqiiQtU_dCNHtRS0RJXk34d2CttE-HDYcOjIeivty8Xyn13C3gu_EAwbrXuh4HvigTSIJWRc9Aa-VrbjYPHZHoNpf0uBmJpWaIrEoC8jXeZyG5Y5Z_zy44Yjk1QS4720NIa0",
  },
  {
    id: "resume6",
    title: "Helvetica",
    subtitle: "Bold and direct",
    style: "Modern",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_XpsYfbPrGgtGay0HzsIW0hfnPldXzBw7n91YtKESm4GVOzzwcDXNprshAXop6ezCjIYktERHTi8nNphbyVgvg3-qQBbrMWOKUerLXNI3aPuOK26aAnedbUFwmldd2ic0qMoeo_5ZxSlc0Js35LT7Gy2UZwCCTDnpIhnD-KCyKWhV_Pchsxrrw6fo3ml1b2zmz2T4C7q5ljUNu1wVGW-yzz8l_2QDoVX5AgBfqBSppT4TzxPoa5OvxD0LFK413xmDEGgpgfqDk",
  },
  {
    id: "resume7",
    title: "Northstar",
    subtitle: "Balanced and polished",
    style: "Professional",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVBOLq1nq6dIzc4v0eLua42wLpMZfNqvPr3feJ8f_B0kTWc6d3i7u4z7g0bKCu6PnC0Lr6r0B3vG9lt3uNq2b0mZ5YxScOpaQ2z4B8MF4hV9qNQ7D7gJ7m5aOjt6Umk3wFI9K_25s1kN11vNqJ5wWp3kk6Gd8gF99TjA",
  },
];

export default function TemplatePage() {
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchesStyle = selectedStyle === "All" || template.style === selectedStyle;
    const searchTerm = searchValue.trim().toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      template.title.toLowerCase().includes(searchTerm) ||
      template.subtitle.toLowerCase().includes(searchTerm) ||
      template.style.toLowerCase().includes(searchTerm);

    return matchesStyle && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="mx-auto bg-gray-200 max-w-7xl px-6 pb-20 pt-24 md:px-12 lg:px-24">
        <header className="mb-16">
          <div className="mb-4 flex items-start gap-4">
            <div className="h-12 w-1 bg-sky-600"></div>
            <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900 md:text-6xl">
              Templates
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
            Select a foundation for your professional narrative. Each template is architected to prioritize clarity, hierarchy, and editorial impact.
          </p>
        </header>

        <section className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2">
            {templateStyles.map((style) => {
              const isActive = selectedStyle === style;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`rounded-full px-6 py-2 text-sm font-medium shadow-sm transition-colors ${
                    isActive ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>

          <div className="group relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <IoSearchSharp />
            </span>
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-700 transition-all placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
              placeholder="Search templates..."
              type="text"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-sm">
              <p className="text-xl font-semibold">No templates match your search.</p>
              <p className="mt-3 text-sm">Try a different style or keyword.</p>
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <article
                key={template.title}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] bg-slate-50 p-6">
                  <img
                    className="h-full w-full rounded-sm object-cover shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                    alt={`${template.title} template preview`}
                    src={template.image}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-sky-900/30 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                    <Link
                      href={`/Editor?template=${template.id}`}
                      className="rounded-xl bg-white px-8 py-3 font-bold text-sky-700 shadow-xl transition-all active:scale-95"
                    >
                      Use {template.title}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white p-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{template.title}</h3>
                    <p className="text-sm text-slate-600">{template.subtitle}</p>
                  </div>
                  {template.label ? (
                    <span className="rounded bg-sky-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-700">
                      {template.label}
                    </span>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </section>

        <section className="relative mt-20 flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-sky-700 p-12 md:flex-row">
          <div className="relative z-10 flex-1">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tighter text-white">
              Not sure where to start?
            </h2>
            <p className="mb-6 max-w-lg text-sky-100">
              Our AI-assisted builder can recommend a template based on your industry and years of experience.
            </p>
            <button className="rounded-xl bg-white px-8 py-4 font-bold text-sky-700 shadow-lg transition-all hover:scale-105 active:scale-95">
              Start AI Assistant
            </button>
          </div>
          <div className="relative z-10 flex h-64 w-full items-center justify-center md:w-64">
            <span className="material-symbols-outlined text-9xl text-sky-200/40">psychology</span>
          </div>

          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-sky-400/40 blur-[120px]"></div>
        </section>
      </main>
    </>
  );
}
