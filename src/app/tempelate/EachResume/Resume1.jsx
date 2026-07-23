import React from 'react'

const Resume1 = () => {
  return (
     <div className="">
      {/* A4 Resume */}
      <div className="w-[794px] -mt-[250px] scale-55 min-h-[1123px] bg-white shadow-2xl flex overflow-hidden">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-[250px] bg-slate-900 text-white">

          {/* Profile */}
          <div className="flex flex-col items-center pt-10">

            <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden shadow-lg">
              <img
                src="https://i.pravatar.cc/300"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold tracking-wide">
              JOHN DOE
            </h2>

            <p className="text-blue-300 text-sm mt-1">
              Front-End Developer
            </p>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-8"></div>

          {/* Contact */}
          <div className="px-8">

            <h3 className="uppercase tracking-[4px] text-xs text-blue-300 mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-sm">

              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-300">
                  +92 300 1234567
                </p>
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-300 break-all">
                  john@example.com
                </p>
              </div>

              <div>
                <p className="font-semibold">Website</p>
                <p className="text-gray-300">
                  www.portfolio.com
                </p>
              </div>

              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-300">
                  Karachi, Pakistan
                </p>
              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-8"></div>

          {/* Skills */}
          <div className="px-8">

            <h3 className="uppercase tracking-[4px] text-xs text-blue-300 mb-5">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {[
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Tailwind",
                "Laravel",
                "PHP",
                "MySQL",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-600 px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-8"></div>

          {/* Languages */}
          <div className="px-8">

            <h3 className="uppercase tracking-[4px] text-xs text-blue-300 mb-5">
              Languages
            </h3>

            <div className="space-y-4">

              {[
                ["English", 90],
                ["Urdu", 100],
                ["Hindi", 90],
              ].map(([lang, value]) => (

                <div key={lang}>

                  <div className="flex justify-between text-sm mb-1">
                    <span>{lang}</span>
                    <span>{value}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 my-8"></div>

          {/* Certifications */}
          <div className="px-8 pb-10">

            <h3 className="uppercase tracking-[4px] text-xs text-blue-300 mb-5">
              Certifications
            </h3>

            <ul className="space-y-3 text-sm text-gray-300 list-disc list-inside">

              <li>React Development</li>

              <li>Laravel Web Development</li>

              <li>UI / UX Fundamentals</li>

              <li>JavaScript Advanced</li>

            </ul>

          </div>

        </aside>

        {/* ================= RIGHT SIDE ================= */}

        <main className="flex-1 bg-white">

          {/* ================= HEADER ================= */}

<div className="px-10 pt-12">

  <h1 className="text-5xl font-bold tracking-wide text-slate-900">
    John Doe
  </h1>

  <p className="text-xl text-blue-600 font-medium mt-2">
    Senior Front-End Developer
  </p>

</div>

{/* Divider */}

<div className="border-b border-gray-300 mt-8"></div>

{/* ================= PROFESSIONAL SUMMARY ================= */}

<section className="px-10 py-8">

  <div className="flex items-center gap-3 mb-4">

    <div className="w-3 h-3 rounded-full bg-blue-600"></div>

    <h2 className="uppercase tracking-[3px] text-lg font-bold text-slate-800">
      Professional Summary
    </h2>

  </div>

  <p className="text-gray-600 leading-8 text-[15px]">

    Passionate Front-End Developer with more than five years of experience
    building modern, responsive, and user-friendly web applications.
    Experienced in React.js, Tailwind CSS, JavaScript, Laravel, and UI/UX
    design. Strong problem-solving skills with the ability to transform
    complex requirements into clean and maintainable code.

  </p>

</section>

{/* Divider */}

<div className="border-b border-gray-300"></div>

{/* ================= EXPERIENCE ================= */}

<section className="px-10 py-8">

  <div className="flex items-center gap-3 mb-8">

    <div className="w-3 h-3 rounded-full bg-blue-600"></div>

    <h2 className="uppercase tracking-[3px] text-lg font-bold text-slate-800">
      Work Experience
    </h2>

  </div>
  {/* Divider */}
<div className="border-b border-gray-300"></div>

{/* ================= EDUCATION ================= */}

<section className="px-10 py-8">

  <div className="flex items-center gap-3 mb-8">

    <div className="w-3 h-3 rounded-full bg-blue-600"></div>

    <h2 className="uppercase tracking-[3px] text-lg font-bold text-slate-800">
      Education
    </h2>

  </div>

  <div className="space-y-8">

    <div>

      <div className="flex justify-between">

        <h3 className="text-lg font-bold text-slate-800">
          Bachelor of Computer Science
        </h3>

        <span className="text-blue-600 font-semibold">
          2018 - 2022
        </span>

      </div>

      <p className="text-gray-500 font-medium mt-1">
        University of Karachi
      </p>

      <p className="text-gray-600 mt-3 leading-7">

        Specialized in Web Development, Database Systems,
        Software Engineering, and UI/UX Design.

      </p>

    </div>

    <div>

      <div className="flex justify-between">

        <h3 className="text-lg font-bold text-slate-800">
          Intermediate
        </h3>

        <span className="text-blue-600 font-semibold">
          2016 - 2018
        </span>

      </div>

      <p className="text-gray-500 font-medium mt-1">
        Government College
      </p>

    </div>

  </div>

</section>

{/* Divider */}

<div className="border-b border-gray-300"></div>

{/* ================= PROJECTS ================= */}

<section className="px-10 py-8">

  <div className="flex items-center gap-3 mb-8">

    <div className="w-3 h-3 rounded-full bg-blue-600"></div>

    <h2 className="uppercase tracking-[3px] text-lg font-bold text-slate-800">
      Projects
    </h2>

  </div>

  <div className="space-y-7">

    <div>

      <h3 className="text-lg font-bold text-slate-800">
        Resume Builder
      </h3>

      <p className="text-gray-600 mt-2 leading-7">

        Built a modern Resume Builder using React,
        Tailwind CSS and Context API with multiple
        templates, live preview and PDF export.

      </p>

    </div>

    <div>

      <h3 className="text-lg font-bold text-slate-800">
        E-Commerce Website
      </h3>

      <p className="text-gray-600 mt-2 leading-7">

        Developed a complete shopping platform using
        Laravel, PHP, MySQL, AJAX and Tailwind CSS
        including cart, checkout and admin dashboard.

      </p>

    </div>

    <div>

      <h3 className="text-lg font-bold text-slate-800">
        Student Management System
      </h3>

      <p className="text-gray-600 mt-2 leading-7">

        Created a complete management system for
        teachers, students, attendance and fee records.

      </p>

    </div>

  </div>

</section>

{/* Divider */}

<div className="border-b border-gray-300"></div>

{/* ================= ACHIEVEMENTS ================= */}

<section className="px-10 py-8">

  <div className="flex items-center gap-3 mb-8">

    <div className="w-3 h-3 rounded-full bg-blue-600"></div>

    <h2 className="uppercase tracking-[3px] text-lg font-bold text-slate-800">
      Achievements
    </h2>

  </div>

  <ul className="space-y-3 text-gray-600 leading-7 list-disc list-inside">

    <li>Completed 30+ Web Development Projects.</li>

    <li>Built reusable React UI components.</li>

    <li>Optimized website performance by 40%.</li>

    <li>Developed responsive websites for multiple clients.</li>

  </ul>

</section>

{/* Divider */}

<div className="border-b border-gray-300"></div>

{/* ================= REFERENCES ================= */}

<section className="px-10 py-8 pb-12">

  <div className="flex items-center gap-3 mb-8">

    <div className="w-3 h-3 rounded-full bg-blue-600"></div>

    <h2 className="uppercase tracking-[3px] text-lg font-bold text-slate-800">
      References
    </h2>

  </div>

  <p className="text-gray-600 leading-7">

    References are available upon request.

  </p>

</section>

  <div className="relative border-l-2 border-blue-600 ml-4">

    {/* Job 1 */}

    <div className="relative pl-10 pb-10">

      <span className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow"></span>

      <span className="text-sm text-blue-600 font-semibold">
        2022 - Present
      </span>

      <h3 className="text-xl font-bold text-slate-800 mt-2">
        Senior Front-End Developer
      </h3>

      <p className="text-gray-500 font-medium mb-3">
        Prime Gas Pvt Ltd
      </p>

      <p className="text-gray-600 leading-7 text-[15px]">

        Developed scalable React applications, optimized UI performance,
        collaborated with backend developers, and created reusable
        components using Tailwind CSS and modern JavaScript.

      </p>

    </div>

    {/* Job 2 */}

    <div className="relative pl-10 pb-10">

      <span className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow"></span>

      <span className="text-sm text-blue-600 font-semibold">
        2020 - 2022
      </span>

      <h3 className="text-xl font-bold text-slate-800 mt-2">
        Web Developer
      </h3>

      <p className="text-gray-500 font-medium mb-3">
        Creative Solutions
      </p>

      <p className="text-gray-600 leading-7 text-[15px]">

        Built responsive company websites, integrated REST APIs,
        improved website performance, and maintained existing
        Laravel applications.

      </p>

    </div>

    {/* Job 3 */}

    <div className="relative pl-10">

      <span className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow"></span>

      <span className="text-sm text-blue-600 font-semibold">
        2018 - 2020
      </span>

      <h3 className="text-xl font-bold text-slate-800 mt-2">
        Junior Web Developer
      </h3>

      <p className="text-gray-500 font-medium mb-3">
        ABC Software House
      </p>

      <p className="text-gray-600 leading-7 text-[15px]">

        Assisted senior developers in creating websites,
        fixing bugs, implementing responsive layouts,
        and managing client projects.

      </p>

    </div>

  </div>

</section>

        </main>

      </div>
    </div>
  )
}

export default Resume1