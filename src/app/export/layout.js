export const metadata = {
  title: "Export & Download Resume PDF",
  description:
    "Download your ATS-friendly professional resume as a high-resolution vector PDF, copy plain text, or email your resume directly to recruiters.",
  alternates: {
    canonical: "/export",
  },
  openGraph: {
    title: "Export & Download Resume PDF | ResumeArchitect",
    description:
      "Download your ATS-friendly professional resume as a high-resolution vector PDF.",
    url: "/export",
  },
};

export default function ExportLayout({ children }) {
  return <>{children}</>;
}
