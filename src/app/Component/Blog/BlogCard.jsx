import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ post }) {
  const { slug, title, excerpt, publishDate, category, readTime, featuredImage, imageAlt } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="blog-card block group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
        <Image
          src={featuredImage || '/placeholder-image.jpg'}
          alt={imageAlt || title}
          fill
          className="blog-card-image object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300 mb-3">
          {title}
        </h2>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <time dateTime={publishDate}>{publishDate}</time>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{readTime}</span>
          </div>
          <span className="text-emerald-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
            Read More <span className="ml-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
