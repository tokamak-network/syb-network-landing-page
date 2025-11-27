import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';
import { getBlogPosts } from '@/lib/notion';
import type { Metadata } from 'next';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - SYB Network',
  description: 'Latest insights, updates, and technical articles about the SYB Network',
};

// Revalidate every 30 minutes
export const revalidate = 1800;

function BlogSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search Skeleton */}
      <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
      
      {/* Filter Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded-full w-20 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-full w-24 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-full w-28 animate-pulse" />
        </div>
      </div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 animate-pulse">
            <div className="aspect-video w-full bg-gray-200" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-20 bg-gray-200 rounded" />
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function BlogContent() {
  const posts = await getBlogPosts();

  return <BlogList posts={posts} showAll={true} />;
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl animate-bounce" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
      </div>

      <Navigation />
      
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gray-800">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Blog
              </span>
            </h1>
            
            <p className="text-lg md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Explore the latest insights, technical deep-dives, and updates from the SYB Network team
            </p>
          </div>

          {/* Blog Posts */}
          <Suspense fallback={<BlogSkeleton />}>
            <BlogContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
