import Link from 'next/link';
import { rolesData } from '../templates/roleData';
import JsonLd from '../Component/SEO/JsonLd';
import Header from '../Component/Header';
import Footer from '../Component/Home/footer';
import ExampleCard from './ExampleCard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geteasyresume.netlify.app';

export const metadata = {
  title: '500+ Resume Examples by Industry & Profession (2026)',
  description:
    'Explore real resume examples for Software Engineers, Nurses, Teachers, Accountants, Data Analysts, and 30+ professions. Copy expert bullet points for free.',
  alternates: {
    canonical: `${siteUrl}/examples`,
  },
  openGraph: {
    title: '500+ Professional Resume Examples by Industry',
    description:
      'Explore verified resume examples across top industries. Copy pre-written bullet points and skills, then edit online for free.',
    url: `${siteUrl}/examples`,
  },
};

export default function ExamplesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Examples', item: `${siteUrl}/examples` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />

      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          {/* Hero Header */}
          <header style={{ marginBottom: '56px', textAlign: 'center' }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '6px 18px',
              borderRadius: '999px',
              marginBottom: '20px',
            }}>
              ✦ Verified Samples &amp; Guides
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', color: '#0f172a', lineHeight: '1.1', marginBottom: '16px' }}>
              Professional Resume Examples
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#475569', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>
              Explore job-winning resume samples across tech, healthcare, education, and more.
              Select a role to view sample bullet points, skills, and customize online.
            </p>
          </header>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '28px',
          }}>
            {rolesData.map((role) => (
              <ExampleCard key={role.slug} role={role} />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
