import Header from "./Component/Header";
import Footer from "./Component/Home/footer";
import Sec1 from "./Component/Home/sec1";
import Sec2 from "./Component/Home/sec2";
import Sec3 from "./Component/Home/sec3";
import Sec4 from "./Component/Home/sec4";
import FaqSection from "./Component/Home/FaqSection";

export const metadata = {
  title: "Free Resume Builder & ATS Resume Maker | ResumeArchitect",
  description:
    "Build a job-winning, ATS-friendly resume online for free. Choose from 20+ recruiter-tested professional templates, customize font styles and accent colors, and export high-resolution PDFs instantly.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Resume Builder & ATS Resume Maker | ResumeArchitect",
    description:
      "Create professional, ATS-optimized resumes in minutes. 20+ designer templates, live PDF preview, 100% free export.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <Sec1 />
        <Sec2 />
        <Sec3 />
        <FaqSection />
        <Sec4 />
      </main>
      <Footer />
    </>
  );
}