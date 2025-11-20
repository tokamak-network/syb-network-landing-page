import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/notion';
import { Calendar, ArrowLeft, Tag, User } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

// Revalidate every hour
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - SYB Network',
    };
  }

  return {
    title: `${post.title} - SYB Network Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

function PostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-32 mb-8" />
      <div className="h-12 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-8" />
      <div className="aspect-video bg-gray-200 rounded-2xl mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  );
}

async function PostContent({ slug }: { slug: string }) {
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Custom markdown components with landing page design
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mt-12 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mt-10 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-bold text-blue-700 mt-6 mb-3">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg md:text-xl font-bold text-blue-700 mt-6 mb-3">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base md:text-lg font-bold text-blue-700 mt-6 mb-3">
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-4 leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 rounded-r-lg">
        <div className="text-gray-700 italic">
          {children}
        </div>
      </blockquote>
    ),
    code: ({ children, className }) => {
      // Inline code doesn't have a className
      const isInline = !className;
      
      if (isInline) {
        return (
          <code className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4 border-2 border-blue-500">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-6 border-2 border-blue-500">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <div className="my-8">
        <img 
          src={src} 
          alt={alt || ''} 
          className="w-full rounded-xl border-2 border-gray-200 shadow-lg"
        />
      </div>
    ),
    hr: ({ }) => (
      <hr className="border-t-2 border-blue-200 my-8" />
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-2 border-blue-300 rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-blue-600 text-white">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 text-left font-semibold border border-blue-500">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-3 border border-blue-200 text-gray-700">
        {children}
      </td>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-800">
        {children}
      </em>
    ),
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link 
        href="/blog"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors mb-8 font-medium group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      {/* Post Header */}
      <header className="mb-12">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full border-2 border-blue-300"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            <span className="font-medium">{formatDate(post.publishDate)}</span>
          </div>
          
          {post.author && (
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              <span className="font-medium">{post.author}</span>
            </div>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-12 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-xl">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Post Content with ReactMarkdown */}
      <div className="prose prose-lg max-w-none mb-12">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {post.content || ''}
        </ReactMarkdown>
      </div>

      {/* Back to Blog Link */}
      <div className="mt-16 pt-8 border-t-2 border-gray-200">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold text-lg group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <Navigation />
      
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<PostSkeleton />}>
          <PostContent slug={slug} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
