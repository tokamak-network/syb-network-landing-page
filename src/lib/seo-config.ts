/**
 * Centralized SEO Configuration for SYB Network
 * Contains all site-wide metadata constants and helper functions
 */

export const siteConfig = {
  name: 'SYB Network',
  shortName: 'SYB',
  description: 'The SYB Network is a sybil-resistant reputation network where users vouch for each other by mutually locking stake, forming a public graph that rewards connections to credible accounts.',
  url: 'https://syb.tokamak.network', // Update with your actual domain
  ogImage: '/assets/og/og-default.png',
  twitterHandle: '@SYBNetwork', // Update with actual Twitter handle
  authors: [
    { name: 'SYB Network Team', url: 'https://syb.tokamak.network' }
  ],
  creator: 'SYB Network Team',
  keywords: [
    'SYB Network',
    'Sybil resistance',
    'Web3 identity',
    'decentralized reputation',
    'mutual stake vouching',
    'web-of-trust',
    'uniqueness score',
    'zk-SNARK',
    'zk-Rollup',
    'Ethereum',
    'decentralized governance',
    'anti-Sybil protocol',
    'blockchain identity',
    'verifiable credentials',
    'trust network',
    'Tokamak Network',
  ],
  links: {
    twitter: 'https://twitter.com/SYBNetwork',
    telegram: 'https://t.me/+HOQmpdZqr4gyZjc8',
  },
} as const;

/**
 * Generate page-specific metadata with common defaults
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}) {
  const fullTitle = title === siteConfig.name 
    ? `${siteConfig.name} - The Verifiable Decentralized Network of Trust`
    : `${title} | ${siteConfig.name}`;
  
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website' as const,
      locale: 'en_US',
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: fullTitle,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
          },
        },
  };
}

/**
 * JSON-LD structured data for the organization
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/brand/syb-logo-light.png`,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.telegram,
    ],
    foundingDate: '2024',
    knowsAbout: [
      'Blockchain',
      'Web3',
      'Sybil Resistance',
      'Decentralized Identity',
      'Zero-Knowledge Proofs',
    ],
  };
}

/**
 * JSON-LD structured data for a web page
 */
export function getWebPageSchema({
  title,
  description,
  path = '',
}: {
  title: string;
  description: string;
  path?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * JSON-LD structured data for blog posts
 */
export function getBlogPostSchema({
  title,
  description,
  slug,
  publishDate,
  authors,
  coverImage,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  publishDate: string;
  authors?: string[];
  coverImage?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${siteConfig.url}/blog/${slug}`,
    datePublished: publishDate,
    dateModified: publishDate,
    author: authors?.map((name) => ({
      '@type': 'Person',
      name,
    })) || [{ '@type': 'Organization', name: siteConfig.name }],
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/assets/brand/syb-logo-light.png`,
      },
    },
    image: coverImage || siteConfig.ogImage,
    keywords: tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${slug}`,
    },
  };
}

/**
 * JSON-LD structured data for the software application
 */
export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    applicationCategory: 'BlockchainApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };
}

/**
 * JSON-LD structured data for FAQ pages
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

