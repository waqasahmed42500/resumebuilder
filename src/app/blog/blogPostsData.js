export const blogPostsData = [
  {
    slug: 'how-to-pass-ats-resume-scanners-2026',
    title: 'How to Pass Applicant Tracking Systems (ATS) in 2026: Complete Guide',
    excerpt: 'Over 98% of Fortune 500 companies use ATS software to filter resumes automatically. Learn exact formatting, header setups, and keyword strategy to pass screening.',
    publishDate: '2026-07-28',
    category: 'ATS Optimization',
    author: 'Resuvix Career Team A',
    readTime: '7 min read',
    featuredImage: '/images/hero/ats-scanner-guide.jpg',
    imageAlt: 'Digital resume passing through green checkmark ATS scanner check illustration',
    content: `
      <h2>Why 75% of Resumes Are Rejected by ATS Systems</h2>
      <p>Applicant Tracking Systems (ATS) like Taleo, Workday, and Greenhouse scan applicant resumes into raw text data fields before a human recruiter ever sees them. When a resume contains non-standard column structures, embedded text inside graphic images, or complex tables, the ATS parser fails to extract critical work history, resulting in automated rejection.</p>
      
      <h2>Core Rules for 100% ATS Parsing Success</h2>
      <ul>
        <li><strong>Use Standard Section Titles:</strong> Stick strictly to headings like "Work Experience", "Education", "Skills", and "Professional Summary". Avoid creative titles like "Where I've Been" or "My Coding Odyssey".</li>
        <li><strong>Vector PDF or Clean DOCX Format:</strong> Always export your resume as a text-encoded vector PDF or clean Word file. Never submit a scanned PNG or JPG image of your resume.</li>
        <li><strong>Single or Dual Clean Text Layouts:</strong> Keep contact info in standard body text. Placing phone numbers or emails inside header/footer bands can render them invisible to older ATS parsers.</li>
        <li><strong>Match Job Description Terminology:</strong> Scan the target job description for exact phrase matches (e.g. "Project Management", "Python", "Budget Reconciliation") and include them naturally.</li>
      </ul>

      <h2>Free ATS Score Scanner</h2>
      <p>You can test your resume layout and keywords for free using Resuvix's online ATS resume builder.</p>
    `,
    faqs: [
      {
        question: 'What is an ATS resume scanner?',
        answer: 'An ATS resume scanner is software used by recruiters to rank, parse, and screen candidates based on keyword matching and layout compatibility.',
      },
    ],
  },
  {
    slug: 'top-fonts-for-ats-resumes',
    title: 'Top 15 Fonts That ATS Parsers Can Read Without Errors',
    excerpt: 'Custom fonts can break ATS parsers. Discover the top recruiter-tested fonts like Geist, Arial, Helvetica, and Calibri for high readability.',
    publishDate: '2026-07-25',
    category: 'Resume Formatting',
    author: 'Resuvix Design Team',
    readTime: '5 min read',
    featuredImage: '/images/hero/ats-fonts-guide.jpg',
    imageAlt: 'Clean typography layout comparison showing ATS-friendly fonts',
    content: `
      <h2>Why Font Choice Matters for ATS Systems</h2>
      <p>When an ATS system parses a PDF document, it maps character glyphs to standard Unicode text. Exotic or custom uninstalled fonts can cause character scrambling (e.g. rendering "experience" as "ex#erience"), leading to immediate rejection.</p>
      
      <h2>Top Recommended ATS-Safe Fonts</h2>
      <ol>
        <li><strong>Geist & Inter:</strong> Modern, highly readable sans-serif fonts optimized for digital and vector PDF rendering.</li>
        <li><strong>Arial:</strong> The universal web-safe sans-serif standard supported by every ATS parser.</li>
        <li><strong>Helvetica:</strong> Clean, professional, and widely accepted across enterprise corporate screeners.</li>
        <li><strong>Calibri:</strong> Classic corporate font with clean spacing.</li>
        <li><strong>Georgia:</strong> Best serif font option for executive and legal resumes.</li>
      </ol>
    `,
    faqs: [],
  },
  {
    slug: 'zety-alternative-free-pdf-resume-builder',
    title: 'Looking for a Free Zety Alternative? Zero Paywalls, Free PDF Downloads',
    excerpt: 'Tired of building a resume only to be hit with a $1.95 trial paywall upon download? Compare Resuvix with Zety and learn why Resuvix is 100% free.',
    publishDate: '2026-07-20',
    category: 'Tool Comparisons',
    author: 'Resuvix Product Team',
    readTime: '6 min read',
    featuredImage: '/home.png',
    imageAlt: 'Free online resume builder interface preview with no paywall',
    content: `
      <h2>The Hidden Paywall Problem in Modern Resume Builders</h2>
      <p>Many online resume tools invite job seekers to fill out their work history for 20 minutes, only to block the PDF download button behind a subscription paywall or auto-recurring trial subscription.</p>

      <h2>Resuvix vs Zety & Paid Resume Makers</h2>
      <p>Resuvix was engineered with a clear commitment: zero paywall traps. Every template, ATS check, and high-resolution vector PDF export is 100% free with no credit card required.</p>
    `,
    faqs: [],
  },
];

export function getBlogPostBySlug(slug) {
  return blogPostsData.find((post) => post.slug === slug);
}
