import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "./context/ResumeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resume Architect",
  description: "A modern resume builder experience",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50">
        <ResumeProvider>

        {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
