import Link from "next/link";
import Image from "next/image";
import { IoMdArrowRoundForward } from "react-icons/io";

const templates = [
  {
    id: "resume6",
    title: "The Executive",
    subtitle: "Leadership & Strategy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaepkcN5BsMfdQEIpVmnS7NLP4cvJZGyrfhrr5La0gXHwDzealJfpyc6sBUh_NQuKOWxJfGbn2ROXQFCspD9rsYqsW1wwia6D5SCs64ezl8YiRLL0oZdSxnCX3cX75BcXjPS-7rTKlcD36E3GjceyeCTuPzgJkzPemyEJkfrm4qoSeCnYFfOvk4M4e9IA4nbI8eRwqJBQUxaH4EViekpuytS9v-pOmBO9s9tK6Tsw5iF-vEDH0C7FWnGdo63BRn-fedH3q0WOhIos",
    alt: "The Executive ATS optimized resume template design",
  },
  {
    id: "resume11",
    title: "The Maverick",
    subtitle: "Creative & Innovative",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBI7YBPc8AD1F3WUGIjpMLhfGi-vGWb4FpZzHYPw0rFvel-OJDKv9xAHHTkZchI_SOzMiI1j4XrMCFcQHxsR4homsAoac3ttKKM590vqPntDJRt4F4vH-5MFf2-90lw1jxnp8xCxWFucCg_Kv8cXP3Fbjy36tSb-WWLGUqI8EGLU3HuSHIkhsfReOrhiPEbURq1CHPZ1bJ6qqBaFqtH_X0mn6zBovaFaTMWW-dwx_G36Inzlh9xDv967c_w-A_ubwMG0QMwU8iBixg",
    alt: "The Maverick creative professional resume builder template design",
  },
  {
    id: "resume1",
    title: "The Analyst",
    subtitle: "Technical & Detailed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgvp9RuJKEQ3RhNUhqeC76ls30FpW55IZ-PXoP24Ss3i9vpFVLGU--OSs4UdOC78A_N6cQ5qwxnDxbdel-Lk_baUiEt77DBsp1pov-EieV_pbRmhnPtaJWXFR18M9bAKaQG2x79U8E5kcWtt9OF0yPnIVpbXDLQ_Af0LWusCY8hLtSr2bxinuzRwlgp5STpKLAErVdYhMAVfqQs7SYoVqzvlq3-Rkwanmx7Hc-qInHrfz9bAsYIRI3Wj1uVxCpiArmc4Pfc_64",
    alt: "The Analyst modern technical software engineer resume template",
  },
];

export default function Sec2() {
  return (
    <section className="bg-slate-100 px-4 py-20 text-slate-900 sm:px-8 md:px-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ATS-Optimized Templates Built for Hiring Success
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Designed in collaboration with executive recruiters and hiring managers to ensure your qualifications pass automated ATS scanners and capture reviewer attention.
            </p>
          </div>
          <Link
            href="/templates"
            className="group inline-flex items-center gap-2 font-bold text-sky-700 transition-colors hover:text-sky-800"
          >
            Explore all 20+ Templates
            <span className="transition-transform group-hover:translate-x-1">
              <IoMdArrowRoundForward />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Link
              key={template.title}
              href={`/builder?template=${template.id}`}
              className="group cursor-pointer block rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-50">
                <Image
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  src={template.image}
                  alt={template.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold text-slate-900">{template.title}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {template.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
