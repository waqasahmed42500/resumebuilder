'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const categoryColors = {
  'Technology & Engineering':     { bg: '#e0f2fe', text: '#0369a1', dot: '#0ea5e9' },
  'Technology & Web Development': { bg: '#ede9fe', text: '#6d28d9', dot: '#8b5cf6' },
  'Healthcare & Medical':         { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  'Education & Teaching':         { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
};
const defaultColor = { bg: '#f1f5f9', text: '#475569', dot: '#64748b' };

export default function ExampleCard({ role }) {
  const [hovered, setHovered] = useState(false);
  const color = categoryColors[role.category] || defaultColor;

  return (
    <Link href={`/examples/${role.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: hovered
            ? '0 16px 40px rgba(0,0,0,0.13)'
            : '0 2px 12px rgba(0,0,0,0.07)',
          border: '1px solid #e2e8f0',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Resume Preview Image */}
        {role.cardImage && (
          <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden', background: '#f8fafc' }}>
            <Image
              src={role.cardImage}
              alt={`${role.title} Resume Example`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Bottom fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '60px',
              background: 'linear-gradient(to top, rgba(255,255,255,1), transparent)',
            }} />
            {/* Salary badge */}
            <div style={{
              position: 'absolute', top: '12px', right: '12px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '10px',
              padding: '5px 11px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#0f172a',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              💰 {role.averageSalary}
            </div>
          </div>
        )}

        {/* Card Body */}
        <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Category Badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            background: color.bg, color: color.text,
            fontSize: '10px', fontWeight: '800',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '6px', width: 'fit-content',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color.dot, display: 'inline-block' }} />
            {role.category}
          </span>

          {/* Title */}
          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0, lineHeight: '1.3' }}>
            {role.title} Resume Example
          </h2>

          {/* Summary */}
          <p style={{
            fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {role.summary}
          </p>

          {/* Footer row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #f1f5f9',
          }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>
              🎯 {role.experienceLevel}
            </span>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#0ea5e9' }}>
              View Sample →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
