import { siteConfig } from "./lib/seo";

export default function manifest() {
  return {
    name: "EasyResume | Free ATS Resume Builder & Professional CV Creator",
    short_name: "EasyResume",
    description:
      "Build ATS-friendly professional resumes online for free. Choose from recruiter-tested templates, customize designs, and export high-resolution PDFs.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: siteConfig.themeColor,
    categories: ["business", "productivity", "education"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
