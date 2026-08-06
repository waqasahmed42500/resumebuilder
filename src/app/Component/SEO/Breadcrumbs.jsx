import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';
import JsonLd from './JsonLd';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://resuvix.com',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://resuvix.com'}${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbListSchema} />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex items-center space-x-2 text-sm text-slate-500 flex-wrap">
          <li>
            <Link href="/" className="hover:text-emerald-600 transition-colors flex items-center">
              <HiHome className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center space-x-2">
                <HiChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                {isLast || !item.href ? (
                  <span className="text-slate-800 font-semibold truncate" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-emerald-600 transition-colors truncate">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
