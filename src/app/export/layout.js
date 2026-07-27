export const metadata = {
  title: "Export & Download Resume PDF | EasyResume",
  description:
    "Preview your formatted resume layout and download a vector PDF ready for job applications.",
  alternates: {
    canonical: "/export",
  },
  openGraph: {
    title: "Export & Download Resume PDF | EasyResume",
    description:
      "Download your ATS-friendly professional resume as a high-resolution vector PDF.",
    url: "/export",
  },
};

export default function ExportLayout({ children }) {
  return <>{children}</>;
}
