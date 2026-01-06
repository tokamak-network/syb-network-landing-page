import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { siteConfig, getWebPageSchema, getFAQSchema } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'About SYB Network',
  description: 'Learn about the SYB Network, a sybil-resistant reputation protocol that uses mutual-stake vouching to create verifiable trust in Web3. Solve the Sybil problem with decentralized identity.',
  keywords: [
    ...siteConfig.keywords,
    'about SYB',
    'Sybil problem',
    'Web3 identity problem',
    'decentralized trust solution',
    'mutual stake vouching explained',
    'reputation protocol',
  ],
  openGraph: {
    title: 'About SYB Network - Sybil-Resistant Reputation Protocol',
    description: 'Discover how SYB Network solves the Sybil problem in Web3 through mutual-stake vouching and verifiable trust.',
    url: `${siteConfig.url}/about`,
    type: 'website',
    images: [
      {
        url: '/assets/og/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About SYB Network - Solving the Sybil Problem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SYB Network - Sybil-Resistant Trust',
    description: 'Discover how SYB Network solves the Sybil problem in Web3.',
    images: ['/assets/og/og-about.png'],
  },
  alternates: {
    canonical: '/about',
  },
};

// JSON-LD structured data for the about page
const aboutPageSchema = getWebPageSchema({
  title: 'About SYB Network',
  description: 'Learn about the SYB Network sybil-resistant reputation protocol.',
  path: '/about',
});

// FAQ Schema for common questions about SYB Network
const faqSchema = getFAQSchema([
  {
    question: 'What is SYB Network?',
    answer: 'SYB Network is a sybil-resistant reputation network where users vouch for each other by mutually locking stake, forming a public graph that rewards connections to credible accounts.',
  },
  {
    question: 'What problem does SYB Network solve?',
    answer: 'SYB Network solves the Sybil problem in Web3, where bad actors can create multiple fake identities to manipulate systems like governance voting, airdrops, and social platforms.',
  },
  {
    question: 'How does mutual stake vouching work?',
    answer: 'Users vouch for each other by locking tokens together. This creates economic accountability - if one party turns out to be fraudulent, both parties risk losing their stake.',
  },
]);

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      <Navigation />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
    </div>
  );
}
