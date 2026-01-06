import Navigation from '@/components/Navigation';
import NetworkHub from '@/components/NetworkHub';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { siteConfig, getWebPageSchema, getFAQSchema } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Protocol - How SYB Network Works',
  description: 'Explore the SYB Network protocol: verifiable architecture, web-of-trust mechanism, uniqueness scoring algorithm, and zk-Rollup infrastructure for scalable, private identity verification.',
  keywords: [
    ...siteConfig.keywords,
    'SYB protocol',
    'web-of-trust protocol',
    'uniqueness scoring',
    'zk-Rollup identity',
    'verifiable architecture',
    'trust scoring algorithm',
    'decentralized protocol',
    'blockchain protocol',
  ],
  openGraph: {
    title: 'SYB Network Protocol - Web-of-Trust & zk-Rollup Infrastructure',
    description: 'Deep dive into the SYB Network protocol: web-of-trust, scoring system, and zk-Rollup infrastructure.',
    url: `${siteConfig.url}/protocol`,
    type: 'website',
    images: [
      {
        url: '/assets/og/og-protocol.png',
        width: 1200,
        height: 630,
        alt: 'SYB Network Protocol - Technical Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYB Network Protocol - Technical Deep Dive',
    description: 'Explore the web-of-trust, scoring system, and zk-Rollup infrastructure.',
    images: ['/assets/og/og-protocol.png'],
  },
  alternates: {
    canonical: '/protocol',
  },
};

// JSON-LD structured data
const protocolPageSchema = getWebPageSchema({
  title: 'SYB Network Protocol',
  description: 'Technical documentation of the SYB Network protocol architecture.',
  path: '/protocol',
});

const faqSchema = getFAQSchema([
  {
    question: 'How does the SYB Network scoring system work?',
    answer: 'The uniqueness score is calculated based on the quality and quantity of vouches received, the trustworthiness of vouchers, and the overall network position using graph analysis algorithms.',
  },
  {
    question: 'What is a zk-Rollup and why does SYB Network use it?',
    answer: 'A zk-Rollup is a Layer 2 scaling solution that bundles transactions off-chain and uses zero-knowledge proofs to verify them. SYB Network uses zk-Rollups for privacy-preserving, scalable identity verification.',
  },
  {
    question: 'How is the web-of-trust created?',
    answer: 'The web-of-trust is created when users mutually vouch for each other by locking stake. These vouches form directed edges in a graph, creating a network of trust relationships.',
  },
]);

export default function ProtocolPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(protocolPageSchema),
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
        <NetworkHub />
        <HowItWorks />
        <Benefits />
      </div>
      <Footer />
    </div>
  );
}
