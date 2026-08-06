import Image from 'next/image';
import Link from 'next/link';

export default function RelatedPosts({ currentSlug, posts }) {
  const related = posts.filter(post => post.slug !== currentSlug).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {related.map(post => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row gap-4 sm:items-center bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300"
          >
            <div className="relative w-full sm:w-32 aspect-[3/2] rounded-lg overflow-hidden shrink-0 bg-slate-100">
              <Image
                src={post.featuredImage || '/placeholder-image.jpg'}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 128px"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 mb-2">
                <span>{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-slate-500">{post.readTime}</span>
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
