'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlogList from './BlogList';
import type { BlogPost } from '@/types/blog';

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest from Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Blog
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Insights, updates, and technical deep-dives into the SYB Network ecosystem
          </p>
        </div>

        {/* Blog List */}
        <BlogList posts={posts} showAll={false} />

        {/* View All Button */}
        {posts.length > 3 && (
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group"
            >
              View All Articles
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}



