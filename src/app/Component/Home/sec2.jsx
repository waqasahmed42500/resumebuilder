import Link from "next/link";
import { IoMdArrowRoundForward } from "react-icons/io";

const templates = [
  {
    title: "The Executive",
    subtitle: "Leadership & Strategy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaepkcN5BsMfdQEIpVmnS7NLP4cvJZGyrfhrr5La0gXHwDzealJfpyc6sBUh_NQuKOWxJfGbn2ROXQFCspD9rsYqsW1wwia6D5SCs64ezl8YiRLL0oZdSxnCX3cX75BcXjPS-7rTKlcD36E3GjceyeCTuPzgJkzPemyEJkfrm4qoSeCnYFfOvk4M4e9IA4nbI8eRwqJBQUxaH4EViekpuytS9v-pOmBO9s9tK6Tsw5iF-vEDH0C7FWnGdo63BRn-fedH3q0WOhIos",
  },
  {
    title: "The Maverick",
    subtitle: "Creative & Innovative",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBI7YBPc8AD1F3WUGIjpMLhfGi-vGWb4FpZzHYPw0rFvel-OJDKv9xAHHTkZchI_SOzMiI1j4XrMCFcQHxsR4homsAoac3ttKKM590vqPntDJRt4F4vH-5MFf2-90lw1jxnp8xCxWFucCg_Kv8cXP3Fbjy36tSb-WWLGUqI8EGLU3HuSHIkhsfReOrhiPEbURq1CHPZ1bJ6qqBaFqtH_X0mn6zBovaFaTMWW-dwx_G36Inzlh9xDv967c_w-A_ubwMG0QMwU8iBixg",
  },
  {
    title: "The Analyst",
    subtitle: "Technical & Detailed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgvp9RuJKEQ3RhNUhqeC76ls30FpW55IZ-PXoP24Ss3i9vpFVLGU--OSs4UdOC78A_N6cQ5qwxnDxbdel-Lk_baUiEt77DBsp1pov-EieV_pbRmhnPtaJWXFR18M9bAKaQG2x79U8E5kcWtt9OF0yPnIVpbXDLQ_Af0LWusCY8hLtSr2bxinuzRwlgp5STpKLAErVdYhMAVfqQs7SYoVqzvlq3-Rkwanmx7Hc-qInHrfz9bAsYIRI3Wj1uVxCpiArmc4Pfc_64",
  },
];

export default function Sec2() {
  return (
    <section className="bg-slate-100 px-8 py-24 text-slate-900 md:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Curated for Every Narrative
            </h2>
            <p className="leading-relaxed text-slate-600">
              Our templates are designed by top hiring managers and editorial designers to ensure your skills are seen with clarity and authority.
            </p>
          </div>
          <Link
            href="/tempelate"
            className="group flex items-center gap-2 font-bold text-sky-700 transition-colors hover:text-sky-800"
          >
            Explore all 48 templates
            <span className="transition-transform group-hover:translate-x-1">
              <IoMdArrowRoundForward />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div key={template.title} className="group cursor-pointer">
              <div className="mb-6 aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-2">
                <img
                  className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  data-alt={template.title}
                  src={template.image}
                />
              </div>
              <h3 className="mb-1 text-xl font-bold">{template.title}</h3>
              <p className="text-sm font-medium uppercase tracking-widest text-slate-600">
                {template.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
