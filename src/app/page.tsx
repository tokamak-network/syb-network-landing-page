import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Shield, Layers, Target, Network, ArrowRight, Calendar, User } from 'lucide-react';
import { getRecentBlogPosts } from '@/lib/notion';
import type { BlogPost } from '@/types/blog';
import type { Metadata } from 'next';
import { siteConfig, getWebPageSchema } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} - The Verifiable Decentralized Network of Trust`,
  description: 'Build sybil-resistant reputation through mutual stake vouching. SYB Network creates a verifiable web-of-trust where users vouch for each other, forming a public graph that rewards connections to credible accounts.',
  keywords: [
    ...siteConfig.keywords,
    'mutual stake vouching',
    'reputation network',
    'Web3 trust',
    'decentralized vouching',
  ],
  openGraph: {
    title: `${siteConfig.name} - The Verifiable Decentralized Network of Trust`,
    description: 'Build sybil-resistant reputation through mutual stake vouching. Create verifiable trust in Web3.',
    url: siteConfig.url,
    type: 'website',
    images: [
      {
        url: '/assets/og/og-home.png',
        width: 1200,
        height: 630,
        alt: 'SYB Network - Sybil-Resistant Reputation Network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Verifiable Decentralized Trust`,
    description: 'Build sybil-resistant reputation through mutual stake vouching.',
    images: ['/assets/og/og-home.png'],
  },
  alternates: {
    canonical: '/',
  },
};

function OverviewCards() {
  const cards = [
    {
      title: 'About',
      description: 'Learn what the SYB Network is and the problem it solves for Web3 identity.',
      href: '/about',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Protocol',
      description: 'Explore how the protocol works: web-of-trust, scoring system, and zk-Rollup infrastructure.',
      href: '/protocol',
      icon: Network,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      title: 'Use Cases',
      description: 'Discover applications in governance, social networks, gaming, airdrops, and enterprise.',
      href: '/use-cases',
      icon: Layers,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      title: 'Vision & Future',
      description: 'See the roadmap for building a fairer, more trustworthy Web3 ecosystem.',
      href: '/vision',
      icon: Target,
      color: 'from-cyan-600 to-blue-500',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Explore <span className="text-blue-600">SYB Network</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A sybil-resistant reputation network where users vouch for each other by mutually locking stake, 
            forming a public graph that rewards connections to credible accounts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-5">
                <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{card.description}</p>
                  <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    Learn more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

function JoinCTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-12 rounded-3xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  MVP Live on Sepolia
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Start Joining?
              </h2>
              <p className="text-blue-100 text-lg max-w-xl">
                Join the SYB Network today. Vouch for others, build your reputation, and be part of the future of decentralized identity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/explorer" 
                className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 text-center shadow-lg"
              >
                Join Network
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPreview({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Latest from Our <span className="text-blue-600">Blog</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Insights, updates, and technical deep-dives into the SYB Network ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <div className="aspect-video w-full bg-gradient-to-br from-blue-100 to-cyan-100 relative overflow-hidden">
                {post.coverImage ? (
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  {post.authors && post.authors.length > 0 && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.authors[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 group"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  // Fetch recent blog posts
  let posts: BlogPost[] = [];
  try {
    posts = await getRecentBlogPosts(3);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <OverviewCards />
      <BlogPreview posts={posts} />
      <JoinCTA />
      <Footer />
    </div>
  );
}
