export default function manifest() {
  return {
    name: 'EasyResume | Free ATS Resume Builder & Professional CV Creator',
    short_name: 'EasyResume',
    description:
      'Build ATS-friendly professional resumes online for free. Choose from 20+ recruiter-tested templates, customize designs, and export high-resolution PDFs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
