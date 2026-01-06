import type { Metadata } from 'next';
import { siteConfig, getWebPageSchema } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Network Explorer - Trust Graph & Transactions',
  description: 'Explore the SYB Network trust graph in real-time. Visualize vouching relationships, view user reputation scores, and track transactions on the Sepolia testnet.',
  keywords: [
    ...siteConfig.keywords,
    'network explorer',
    'trust graph explorer',
    'blockchain explorer',
    'vouch transactions',
    'reputation scores',
    'network visualization',
    'Web3 explorer',
    'Sepolia testnet',
  ],
  openGraph: {
    title: 'SYB Network Explorer - Trust Graph Visualization',
    description: 'Explore the trust graph, reputation scores, and vouch transactions in real-time.',
    url: `${siteConfig.url}/explorer`,
    type: 'website',
    images: [
      {
        url: '/assets/og/og-explorer.png',
        width: 1200,
        height: 630,
        alt: 'SYB Network Explorer - Trust Graph',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYB Network Explorer',
    description: 'Visualize the trust graph and track vouch transactions.',
    images: ['/assets/og/og-explorer.png'],
  },
  alternates: {
    canonical: '/explorer',
  },
};

// JSON-LD structured data
const explorerPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SYB Network Explorer',
  description: 'Real-time visualization of the SYB Network trust graph and transaction explorer.',
  url: `${siteConfig.url}/explorer`,
  applicationCategory: 'BlockchainApplication',
  operatingSystem: 'Web',
  creator: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function ExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(explorerPageSchema),
        }}
      />
      {children}
    </>
  );
}

