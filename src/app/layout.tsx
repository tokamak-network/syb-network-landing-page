import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import GraphQLProvider from "@/components/ApolloProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SYB Network - The Verifiable Decentralized Network of Trust",
  description: "The SYB Network is a sybil-resistant reputation network where users vouch for each other by mutually locking stake, forming a public graph that rewards connections to credible accounts.",
  keywords: "verifiable decentralized network, Sybil resistance, Web3 identity, uniqueness score, zk-SNARK, zk-Rollup, trustless network, decentralized governance, anti-Sybil protocol, Ethereum scalability",
  authors: [{ name: "SYB Network Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <GraphQLProvider>
          {children}
        </GraphQLProvider>
      </body>
    </html>
  );
}
