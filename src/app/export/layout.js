import { createMetadata } from "../lib/seo";

export const metadata = createMetadata({
  title: "Export & Download Resume PDF",
  description:
    "Preview your formatted resume layout and download a vector PDF ready for job applications.",
  path: "/export",
  keywords: ["Resume PDF Download", "Professional Resume", "ATS Resume Builder"],
  robots: {
    index: false,
    follow: false,
  },
});

export default function ExportLayout({ children }) {
  return <>{children}</>;
}
