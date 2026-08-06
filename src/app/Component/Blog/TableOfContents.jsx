'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TableOfContents({ items }) {
  const [activeId, setActiveId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: '-20% 0% -35% 0%',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  return (
    <div className="sticky top-24 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex justify-between items-center mb-4 md:mb-5">
        <h3 className="font-bold text-slate-900">Table of Contents</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-500 hover:text-slate-800 focus:outline-none"
          aria-label="Toggle Table of Contents"
          aria-expanded={isOpen}
        >
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <nav className={`overflow-y-auto max-h-[60vh] text-sm ${isOpen ? 'block' : 'hidden md:block'}`}>
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className={`${item.level === 3 ? 'pl-4' : ''}`}>
                <Link
                  href={`#${item.id}`}
                  onClick={(e) => {
                    if (window.innerWidth < 768) {
                       setIsOpen(false);
                    }
                  }}
                  className={`toc-link block py-1.5 text-slate-700 hover:text-emerald-600 ${isActive ? 'toc-link-active' : ''}`}
                >
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
