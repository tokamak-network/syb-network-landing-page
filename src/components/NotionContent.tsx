'use client';

import dynamic from 'next/dynamic';
import type { ExtendedRecordMap } from 'notion-types';

// Import react-notion-x styles
import 'react-notion-x/src/styles.css';
// Import prism for code highlighting
import 'prismjs/themes/prism-tomorrow.css';
// Import katex for math equations
import 'katex/dist/katex.min.css';

// Dynamically import NotionRenderer to avoid SSR issues
const NotionRenderer = dynamic(
  () => import('react-notion-x').then((mod) => mod.NotionRenderer),
  { ssr: false }
);

// Dynamically import optional components for react-notion-x
const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then((mod) => mod.Code),
  { ssr: false }
);
const Equation = dynamic(
  () => import('react-notion-x/build/third-party/equation').then((mod) => mod.Equation),
  { ssr: false }
);

interface NotionContentProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionContent({ recordMap }: NotionContentProps) {
  return (
    <div className="notion-content">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{
          Code,
          Equation,
        }}
      />
    </div>
  );
}

