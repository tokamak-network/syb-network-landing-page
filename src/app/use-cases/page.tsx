import Navigation from '@/components/Navigation';
import UseCases from '@/components/UseCases';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { siteConfig, getWebPageSchema } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Use Cases - SYB Network Applications',
  description: 'Discover how SYB Network powers sybil-resistant governance, fair airdrops, authentic social networks, anti-cheat gaming, and enterprise identity verification.',
  keywords: [
    ...siteConfig.keywords,
    'SYB use cases',
    'DAO governance',
    'sybil-resistant voting',
    'fair airdrop distribution',
    'Web3 social networks',
    'anti-cheat gaming',
    'enterprise identity',
    'quadratic voting',
    'token distribution',
  ],
  openGraph: {
    title: 'SYB Network Use Cases - Governance, Airdrops, Gaming & More',
    description: 'Explore applications in governance, social networks, gaming, airdrops, and enterprise.',
    url: `${siteConfig.url}/use-cases`,
    type: 'website',
    images: [
      {
        url: '/assets/og/og-use-cases.png',
        width: 1200,
        height: 630,
        alt: 'SYB Network Use Cases - Real-World Applications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYB Network Use Cases',
    description: 'Explore applications in governance, social networks, gaming, and more.',
    images: ['/assets/og/og-use-cases.png'],
  },
  alternates: {
    canonical: '/use-cases',
  },
};

// JSON-LD structured data
const useCasesPageSchema = getWebPageSchema({
  title: 'SYB Network Use Cases',
  description: 'Real-world applications of sybil-resistant reputation.',
  path: '/use-cases',
});

export default function UseCasesPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(useCasesPageSchema),
        }}
      />
      
      <Navigation />
      <div className="pt-24">
        <UseCases />
      </div>
      <Footer />
    </div>
  );
}
