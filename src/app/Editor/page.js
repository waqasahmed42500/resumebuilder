"use client";

import { useSearchParams } from "next/navigation";
import Header from "../Component/Header";
import Resume1 from "../tempelate/EachResume/Resume1";
import Resume2 from "../tempelate/EachResume/Resume2";
import Resume3 from "../tempelate/EachResume/Resume3";
import Resume4 from "../tempelate/EachResume/Resume4";
import Resume5 from "../tempelate/EachResume/Resume5";
import Resume6 from "../tempelate/EachResume/Resume6";
import Resume7 from "../tempelate/EachResume/Resume7";

const sections = [
  { name: "Contact", icon: "●" },
  { name: "Experience", icon: "●", active: true },
  { name: "Education", icon: "●" },
  { name: "Skills", icon: "●" },
];

export default function Editor() {
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get("template") || "resume1";

  const templateComponents = {
    resume1: Resume1,
    resume2: Resume2,
    resume3: Resume3,
    resume4: Resume4,
    resume5: Resume5,
    resume6: Resume6,
    resume7: Resume7,
  };

  const SelectedResume = templateComponents[selectedTemplate] || Resume1;

  return (
    <>
      <Header />
      <main className="min-h-screen  bg-slate-50 pt-16">
        <div className="flex min-h-[100vh]  flex-col lg:flex-row">
          <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white p-3 lg:w-55 lg:border-b-0 lg:border-r">
            <div className="rounded-2xl relative border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="flex  items-center justify-between">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Editor
                  </p>
                  <h2 className="mt-1 text-md text-nowrap font-semibold text-slate-900">Resume Builder</h2>
                </div>
                <div className="rounded-full absolute top-3 right-2 bg-sky-100 px-3 py-0.5 text-sm font-semibold text-sky-700">
                  75%
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[75%] rounded-full bg-sky-600"></div>
              </div>
            </div>

            <nav className="mt-8 space-y-2">
              {sections.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    item.active
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-8">
              <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                Export Resume
              </button>
              <button className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                Save Draft
              </button>
            </div>
          </aside>

          <section className="flex flex-1 flex-col overflow-hidden lg:flex-row">
            <div className="w-full  bg-slate-100 px-4 py-6 lg:w-[50%] md:w-[50%] md:px-4 lg:px-6  xl:px-6">
              <div className="mx-auto max-w-xl">
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
                    Step 2
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                    Professional Experience
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Add your recent roles and highlight measurable achievements in a clear, polished way.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Job Title
                        </label>
                        <input
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
                          type="text"
                          defaultValue="Senior UX Designer"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Company
                        </label>
                        <input
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
                          type="text"
                          defaultValue="Aesthetic Systems Inc."
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Location
                        </label>
                        <input
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
                          type="text"
                          defaultValue="New York, NY"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Start Date
                        </label>
                        <input
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
                          type="text"
                          defaultValue="March 2020"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          End Date
                        </label>
                        <input
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
                          type="text"
                          defaultValue="Present"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Description
                        </label>
                        <textarea
                          className="min-h-32 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white"
                          defaultValue="Led the redesign of the core SaaS platform, resulting in a 40% increase in user engagement and 25% reduction in churn. Mentored a team of 4 junior designers and established a new global design system."
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button className="rounded-xl px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                        Remove entry
                      </button>
                    </div>
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm font-semibold text-slate-600 transition hover:border-sky-400 hover:text-sky-700">
                    <span className="text-lg">＋</span>
                    Add another experience
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button className="text-sm font-semibold text-slate-500 transition hover:text-slate-800">
                    ← Previous
                  </button>
                  <button className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
                    Next: Education →
                  </button>
                </div>
              </div>
            </div>

            <div className="flex w-full  justify-center items-start  lg:w-[50%] pt-4">
              <SelectedResume />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}