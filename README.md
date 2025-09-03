# SYB Network Landing Page

Main landing page for **SYB Network**, a decentralized infrastructure that transforms how digital identity and trust work in Web3, providing verifiable uniqueness and preventing Sybil attacks at scale.

## 🌟 About SYB Network

SYB Network solves the critical problem of Sybil attacks and fake accounts in Web3 systems by providing the first truly decentralized solution that ensures one person equals one identity while maintaining privacy and scalability. The network combines web-of-trust mechanisms with zero-knowledge proofs to create verifiable uniqueness scores for every participant.

## 🚀 Features

- **Modern Design**: Clean, professional landing page with smooth animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Components**: Engaging user experience with scroll animations
- **Performance Optimized**: Built with Next.js 15 and Turbopack for fast loading
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern utility-first styling approach

## 📋 Landing Page Sections

- **Hero**: Eye-catching introduction with animated background
- **About**: Explanation of SYB Network and the problems it solves
- **Network Hub**: Information about the decentralized infrastructure
- **How It Works**: Step-by-step process explanation
- **Benefits**: Key advantages and features
- **Use Cases**: Real-world applications and scenarios
- **Vision**: Future roadmap and goals
- **Connect**: Community links and contact information
- **Footer**: Additional resources and legal information

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Build Tool**: [Turbopack](https://turbo.build/pack)
- **Runtime**: React 19

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tokamak-network/syb-network-landing-page.git
cd syb-network-landing-page
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── About.tsx       # About section
│   ├── Benefits.tsx    # Benefits section
│   ├── Connect.tsx     # Connect section
│   ├── Footer.tsx      # Footer component
│   ├── Hero.tsx        # Hero section
│   ├── HowItWorks.tsx  # How it works section
│   ├── Navigation.tsx  # Navigation bar
│   ├── NetworkHub.tsx  # Network hub section
│   ├── UseCases.tsx    # Use cases section
│   └── Vision.tsx      # Vision section
└── hooks/              # Custom React hooks
    └── useScrollAnimation.ts # Scroll animation utilities
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server

## 🎨 Customization

The landing page is built with a modular component structure. Each section is a separate component that can be easily customized:

- **Styling**: Modify Tailwind classes in components
- **Content**: Update text and images in individual components
- **Layout**: Adjust component order in `src/app/page.tsx`
- **Animations**: Customize scroll animations in `src/hooks/useScrollAnimation.ts`

## 🌐 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🔗 Links

- **Tokamak Network**: [https://tokamak.network](https://tokamak.network)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS Documentation**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

## 📄 License

This project is part of the Tokamak Network ecosystem. Please refer to the organization's licensing terms.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page and submit pull requests.

---

Built with ❤️ by the Tokamak Network team