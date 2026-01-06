import Navigation from '@/components/Navigation';
import Vision from '@/components/Vision';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { siteConfig, getWebPageSchema } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Vision & Roadmap - SYB Network Future',
  description: 'Discover the vision of SYB Network: building a fairer Web3 economy with verifiable, decentralized trust infrastructure. See our roadmap for the future of digital identity.',
  keywords: [
    ...siteConfig.keywords,
    'SYB vision',
    'SYB roadmap',
    'Web3 future',
    'decentralized identity future',
    'trust infrastructure',
    'fair Web3 economy',
    'digital identity roadmap',
    'blockchain vision',
  ],
  openGraph: {
    title: 'SYB Network Vision - Building a Fairer Web3 Economy',
    description: 'See the roadmap for building verifiable, decentralized trust infrastructure.',
    url: `${siteConfig.url}/vision`,
    type: 'website',
    images: [
      {
        url: '/assets/og/og-vision.png',
        width: 1200,
        height: 630,
        alt: 'SYB Network Vision - The Future of Decentralized Trust',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYB Network Vision & Roadmap',
    description: 'Building a fairer Web3 economy with decentralized trust.',
    images: ['/assets/og/og-vision.png'],
  },
  alternates: {
    canonical: '/vision',
  },
};

// JSON-LD structured data
const visionPageSchema = getWebPageSchema({
  title: 'SYB Network Vision & Roadmap',
  description: 'The future of decentralized trust and digital identity.',
  path: '/vision',
});

export default function VisionPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(visionPageSchema),
        }}
      />
      
      <Navigation />
      <div className="pt-24">
        <Vision />
        <Connect />
      </div>
      <Footer />
    </div>
  );
}
