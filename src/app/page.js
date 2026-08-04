import Header from "./Component/Header";
import Footer from "./Component/Home/footer";
import Sec1 from "./Component/Home/sec1";
import Sec2 from "./Component/Home/sec2";
import Sec3 from "./Component/Home/sec3";
import Sec4 from "./Component/Home/sec4";
import FaqSection from "./Component/Home/FaqSection";
import { createMetadata } from "./lib/seo";

export const metadata = createMetadata({
  title: "Free Resume Builder & ATS Resume Maker | EasyResume",
  description:
    "Build a job-winning, 100% free ATS resume in minutes. Pick from 20+ recruiter-approved templates, edit experience live, and download high-resolution PDFs.",
  path: "/",
  keywords: ["AI Resume Builder", "Free Resume Builder", "ATS Resume Builder"],
});

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
