"use client";
import React, { useMemo, useRef, useState } from 'react'
import Header from '../Component/Header'
import Resume1 from "../tempelate/EachResume/Resume1";
import Resume2 from "../tempelate/EachResume/Resume2";
import Resume3 from "../tempelate/EachResume/Resume3";
import Resume4 from "../tempelate/EachResume/Resume4";
import Resume5 from "../tempelate/EachResume/Resume5";
import Resume6 from "../tempelate/EachResume/Resume6";
import Resume7 from "../tempelate/EachResume/Resume7";
import { IoClose, IoLinkOutline } from 'react-icons/io5'
import { FaArrowLeft, FaCheckCircle, FaFilePdf } from 'react-icons/fa'
import { TbFileDescription } from 'react-icons/tb'
import { FiGrid } from 'react-icons/fi'
import { MdOutlineMailOutline } from 'react-icons/md'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { useResume } from '../context/ResumeContext';

const ExportPage = () => { 
const {themeFont,resumeData} =  useResume();
const [copied, setCopied] = useState(false);
const [isDownloading, setIsDownloading] = useState(false);
const previewRef = useRef(null);

const buildPlainTextResume = () => {
  const contact = resumeData.contact || {};
  const sections = [
    `${contact.fullName || 'Your Name'}`,
    contact.headline || '',
    [contact.email, contact.phone, contact.location, contact.website].filter(Boolean).join(' | '),
    '',
    resumeData.summary || '',
    '',
    'Experience',
    ...resumeData.experiences.map((item) => `${item.role || ''} at ${item.company || ''} (${item.startDate || ''} - ${item.endDate || ''})\n${item.description || ''}`),
    '',
    'Education',
    ...resumeData.education.map((item) => `${item.degree || ''} - ${item.school || ''} (${item.year || ''})`),
    '',
    'Skills',
    resumeData.skills.join(', '),
  ].filter(Boolean);

  return sections.join('\n\n');
};

const downloadTextFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

    const templateComponents = { resume1: Resume1, resume2: Resume2, resume3: Resume3, resume4: Resume4, resume5: Resume5, resume6: Resume6, resume7: Resume7 };
      const searchParams = useSearchParams();
    const selectedTemplate = searchParams.get("template") || "resume1";

    const shareUrl = useMemo(() => {
      if (typeof window === 'undefined') return '';
      return `${window.location.origin}/Editor?template=${selectedTemplate}`;
    }, [selectedTemplate]);

    const SelectedResume = templateComponents[selectedTemplate] || Resume1;

    const handleCopyLink = async () => {
      if (!shareUrl) return;

      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      } catch {
        window.prompt('Copy this link', shareUrl);
      }
    };

    const handleExportText = () => {
      downloadTextFile(buildPlainTextResume(), `${selectedTemplate}-resume.txt`, 'text/plain;charset=utf-8');
    };

    const handleExportJson = () => {
      downloadTextFile(JSON.stringify(resumeData, null, 2), `${selectedTemplate}-resume.json`, 'application/json;charset=utf-8');
    };

    const handleSendEmail = async () => {
      try {
        const response = await fetch('/api/send-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'your-email@example.com',
            subject: `Resume export - ${selectedTemplate}`,
            text: `Hi,\n\nPlease find my resume export here:\n${shareUrl}`,
            html: `<p>Hi,</p><p>Please find my resume export here:</p><p><a href="${shareUrl}">${shareUrl}</a></p>`,
          }),
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Unable to send email.');
        }

        window.alert('Email sent successfully.');
      } catch (error) {
        console.error('Send email failed', error);
        window.alert(error.message || 'Unable to send email.');
      }
    };

    const handleDownloadPdf = async () => {
      if (!previewRef.current) return;

      setIsDownloading(true);
      const previewNode = previewRef.current;
      const originalStyles = [];

      const nodes = previewNode.querySelectorAll('*');
      nodes.forEach((node) => {
        const style = window.getComputedStyle(node);

        const color = style.color;
        if (color && /lab\(|lch\(|oklab\(|oklch\(/i.test(color)) {
          originalStyles.push({ node, property: 'color', value: node.style.color });
          node.style.color = '#111827';
        }

        const backgroundColor = style.backgroundColor;
        if (backgroundColor && /lab\(|lch\(|oklab\(|oklch\(/i.test(backgroundColor)) {
          originalStyles.push({ node, property: 'backgroundColor', value: node.style.backgroundColor });
          node.style.backgroundColor = 'transparent';
        }

        const borderColor = style.borderColor;
        if (borderColor && /lab\(|lch\(|oklab\(|oklch\(/i.test(borderColor)) {
          originalStyles.push({ node, property: 'borderColor', value: node.style.borderColor });
          node.style.borderColor = '#d1d5db';
        }
      });

      try {
        const { default: html2canvas } = await import('html2canvas');
        const { jsPDF } = await import('jspdf');

        const canvas = await html2canvas(previewNode, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const marginX = 24;
        const marginY = 24;
        const availableWidth = pageWidth - marginX * 2;
        const availableHeight = pageHeight - marginY * 2;
        const imgWidth = availableWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const finalHeight = Math.min(imgHeight, availableHeight);
        const finalWidth = (canvas.width * finalHeight) / canvas.height;

        pdf.addImage(imgData, 'PNG', marginX, marginY, finalWidth, finalHeight, undefined, 'FAST');
        pdf.save(`${selectedTemplate.replace(/resume/g, 'resume-').toLowerCase()}-resume.pdf`);
      } catch (error) {
        console.error('PDF export failed', error);
        window.alert('PDF export failed. Please try again.');
      } finally {
        originalStyles.forEach(({ node, property, value }) => {
          node.style[property] = value;
        });
        setIsDownloading(false);
      }
    };
    
  return (
    <>
    <Header />
    
    <main className="overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(248,250,252,1))] px-3 py-24 pb-12 text-slate-900 sm:px-4 lg:px-6 min-h-screen">

<div className="mx-auto mb-8 flex w-full max-w-6xl flex-col gap-6 px-1 sm:px-2 xl:flex-row xl:items-end xl:justify-between">
<div className="max-w-2xl space-y-2">
<Link href={`/Editor?template=${selectedTemplate}`} className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-600 transition-colors hover:text-emerald-700">
<span className="text-lg"><FaArrowLeft /></span>
<span>Back to Editor</span>
</Link>
<h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Your Masterpiece is Ready</h1>
<p className="text-sm leading-6 text-slate-600 sm:text-base">Review your editorial-grade resume and choose your preferred export format.</p>
</div>
<div className="flex flex-wrap items-center gap-3">
<button
  onClick={handleCopyLink}
  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
>
<span className="text-lg"><IoLinkOutline /></span>
<span>{copied ? 'Copied!' : 'Copy link'}</span>
</button>
<button
  onClick={handleDownloadPdf}
  disabled={isDownloading}
  className="flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-2.5 font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
>
<span className="text-lg"><FaFilePdf /></span>
<span>{isDownloading ? 'Preparing PDF...' : 'Download PDF'}</span>
</button>
</div>
</div>
<div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-1 sm:px-2 md:grid-cols-12 xl:gap-8">

<div className="order-2 space-y-6 md:col-span-4 xl:col-span-3 xl:order-1">
<section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
<h3 className="border-l-4 border-emerald-600 pl-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-600">Export Options</h3>
<div className="mt-5 space-y-3">
<button onClick={handleExportText} className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 p-3 text-left transition hover:bg-slate-50">
<div className="flex items-center gap-3">
<span className="text-xl text-slate-600"><TbFileDescription /></span>
<span className="font-semibold text-slate-800">Plain Text (.txt)</span>
</div>
<span className="text-sm text-slate-400 opacity-0 transition group-hover:opacity-100">download</span>
</button>
<button onClick={handleExportJson} className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 p-3 text-left transition hover:bg-slate-50">
<div className="flex items-center gap-3">
<span className="text-xl text-slate-600"><FiGrid /></span>
<span className="font-semibold text-slate-800">JSON Format</span>
</div>
<span className="text-sm text-slate-400 opacity-0 transition group-hover:opacity-100">code</span>
</button>
<button onClick={handleSendEmail} className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 p-3 text-left transition hover:bg-slate-50">
<div className="flex items-center gap-3">
<span className="text-xl text-slate-600"><MdOutlineMailOutline /></span>
<span className="font-semibold text-slate-800">Send to Email</span>
</div>
<span className="text-sm text-slate-400 opacity-0 transition group-hover:opacity-100">send</span>
</button>
</div>
</section>
<section className="relative overflow-hidden rounded-[24px] bg-slate-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
<div className="relative z-10">
<h4 className="text-lg font-bold">Pro Tip</h4>
<p className="mt-2 text-sm leading-6 text-slate-300">
                            Resumes with professional headshots receive 14% more views. Consider our AI Portrait tool.
                        </p>
<button className="mt-4 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100">Upgrade to Pro</button>
</div>
<div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-400/30 blur-3xl"></div>
</section>
</div>

<div className="order-1 min-w-0 md:col-span-8 xl:col-span-9 xl:order-2">
<div className="overflow-x-auto rounded-[18px] border border-slate-200 bg-slate-50/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm p-2">
<div ref={previewRef} className="mx-auto flex min-w-[280px] max-w-[920px] items-center justify-center overflow-hidden  ">
<SelectedResume data={resumeData}
              theme={{
                  // accent: themeAccent,
                  fontFamily: themeFont,
              }}/>
</div>
</div>
</div>
</div>
</main>

<div className="fixed bottom-6 left-1/2 z-[100] flex max-w-[calc(100%-1.5rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-3 rounded-full border border-emerald-200 bg-slate-900 px-4 py-3 shadow-2xl sm:bottom-8 sm:px-6">
<div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
<span className="text-lg text-emerald-400" style={{ "font-variation-settings": "'FILL' 1;" }}><FaCheckCircle /></span>
</div>
<p className="text-sm font-semibold text-white">Resume generated successfully. Ready for export.</p>
<button className="text-slate-300 transition hover:text-white">
<span className="text-xl"><IoClose /></span>
</button>
</div></>
  )
}

export default ExportPage