import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NotionContent from '@/components/NotionContent';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/notion';
import { Calendar, ArrowLeft, Tag, User } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig, getBlogPostSchema } from '@/lib/seo-config';

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
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const postUrl = `${siteConfig.url}/blog/${slug}`;
  const imageUrl = post.coverImage || '/assets/og/og-blog.png';

  return {
    title: post.title,
    description: post.description || `Read "${post.title}" on the SYB Network blog.`,
    keywords: [
      ...siteConfig.keywords,
      ...(post.tags || []),
      'SYB blog post',
    ],
    authors: post.authors?.map((name) => ({ name })) || siteConfig.authors,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishDate,
      modifiedTime: post.publishDate,
      authors: post.authors || [siteConfig.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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

  // Generate JSON-LD structured data for this blog post
  const blogPostSchema = getBlogPostSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishDate: post.publishDate,
    authors: post.authors,
    coverImage: post.coverImage,
    tags: post.tags,
  });

  return (
    <article className="max-w-4xl mx-auto">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema),
        }}
      />
      
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
            <time dateTime={post.publishDate} className="font-medium">
              {formatDate(post.publishDate)}
            </time>
          </div>
          
          {post.authors && post.authors.length > 0 && (
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              <span className="font-medium">
                {post.authors.length === 1 
                  ? post.authors[0]
                  : post.authors.slice(0, -1).join(', ') + ' & ' + post.authors[post.authors.length - 1]
                }
              </span>
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
            loading="eager"
          />
        </div>
      )}

      {/* Post Content - Using react-notion-x */}
      {post.recordMap && (
        <NotionContent recordMap={post.recordMap} />
      )}

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
