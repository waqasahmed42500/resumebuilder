'use client';

import { useState, useRef } from 'react';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border border-slate-200 rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'border-l-4 border-l-emerald-600 bg-white shadow-sm' : 'bg-slate-50'}`}
            >
              <button
                type="button"
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-50"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-slate-800 pr-8">{faq.question}</span>
                <span className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div 
                className="faq-content"
                style={{ 
                  maxHeight: isOpen ? '500px' : '0', 
                  opacity: isOpen ? 1 : 0 
                }}
              >
                <div className="px-6 pb-5 pt-1 text-slate-600 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
