# SYB Network Landing Page

Main landing page for **SYB Network**, a decentralized infrastructure that transforms how digital identity and trust work in Web3, providing verifiable uniqueness and preventing Sybil attacks at scale.

## 🌟 About SYB Network

SYB Network solves the critical problem of Sybil attacks and fake accounts in Web3 systems by providing the first truly decentralized solution that ensures one person equals one identity while maintaining privacy and scalability. The network combines web-of-trust mechanisms with zero-knowledge proofs to create verifiable uniqueness scores for every participant.

## 🚀 Features

- **Modern Design**: Clean, professional landing page with smooth animations
- **Network Explorer**: Interactive graph visualization of the SybVouch trust network
- **The Graph Integration**: Decentralized blockchain data indexing with GraphQL API
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Components**: Engaging user experience with scroll animations
- **Performance Optimized**: Built with Next.js 15 and Turbopack for fast loading
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern utility-first styling approach

## 📋 Pages & Sections

### Landing Page (/)
- **Hero**: Eye-catching introduction with animated background
- **About**: Explanation of SYB Network and the problems it solves
- **Network Hub**: Information about the decentralized infrastructure
- **How It Works**: Step-by-step process explanation
- **Benefits**: Key advantages and features
- **Use Cases**: Real-world applications and scenarios
- **Vision**: Future roadmap and goals
- **Connect**: Community links and contact information
- **Footer**: Additional resources and legal information

### Network Explorer (/explorer)
- **Interactive Graph**: Cytoscape.js powered network visualization
- **Node Details**: Detailed information panel for each user/node
- **Trust Metrics**: Real-time rank and score display
- **Search**: Find users by wallet address
- **Statistics**: Network-wide metrics and analytics
- **Mobile Responsive**: Full support for mobile devices

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Build Tool**: [Turbopack](https://turbo.build/pack)
- **Runtime**: React 19

### Network Explorer
- **Graph Visualization**: [Cytoscape.js](https://js.cytoscape.org/)
- **GraphQL Client**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **Data Indexing**: [The Graph Protocol](https://thegraph.com/)
- **Blockchain Data**: Ethereum/Sepolia via The Graph subgraph

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

4. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

5. Configure your environment variables (see [Environment Variables](#-environment-variables) section below).

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔐 Environment Variables

The application requires the following environment variables to be set in `.env.local`:

### The Graph Subgraph URL
```bash
NEXT_PUBLIC_SUBGRAPH_URL=your-subgraph-url-here
```

**Options:**
1. **The Graph Studio (Recommended for Production)**:
   - Deploy your subgraph to The Graph Studio (see [Subgraph Setup](#-the-graph-subgraph-setup))
   - Example: `https://api.studio.thegraph.com/query/<YOUR_SUBGRAPH_ID>/sybvouch-network/<VERSION>`

2. **Local Graph Node (Development)**:
   - Run a local Graph node: `http://localhost:8000/subgraphs/name/sybvouch-network`
   - See [The Graph docs](https://thegraph.com/docs/en/developing/creating-a-subgraph/) for local setup

3. **Hosted Service (Legacy)**:
   - If using The Graph's hosted service: `https://api.thegraph.com/subgraphs/name/<YOUR_USERNAME>/sybvouch-network`

### Example `.env.local`
```bash
# The Graph Subgraph URL
NEXT_PUBLIC_SUBGRAPH_URL=https://api.studio.thegraph.com/query/12345/sybvouch-network/v0.0.1
```

## 📊 The Graph Subgraph Setup

The Network Explorer uses The Graph Protocol to index blockchain data from the SybVouch smart contract.

### Prerequisites
- [Graph CLI](https://github.com/graphprotocol/graph-tooling): `npm install -g @graphprotocol/graph-cli`
- Account on [The Graph Studio](https://thegraph.com/studio/)

### Quick Setup

1. **Navigate to subgraph directory**:
```bash
cd subgraph
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure the subgraph** (in `subgraph/subgraph.yaml`):
   - Set your contract `address`
   - Set the correct `network` (e.g., `sepolia`, `mainnet`)
   - Set the `startBlock` (deployment block number)

4. **Authenticate with The Graph Studio**:
```bash
graph auth --studio <YOUR_DEPLOY_KEY>
```

5. **Generate code**:
```bash
npm run codegen
```

6. **Build the subgraph**:
```bash
npm run build
```

7. **Deploy to The Graph Studio**:
```bash
npm run deploy
```

### Subgraph Structure
```
subgraph/
├── schema.graphql          # GraphQL schema defining entities
├── subgraph.yaml          # Subgraph configuration
├── src/
│   └── mapping.ts         # Event handlers (AssemblyScript)
├── abis/
│   └── SybVouch.json      # Contract ABI
└── package.json
```

### Available Queries
The subgraph provides the following GraphQL queries:

- **Users**: Query network participants with rank, score, and vouch counts
- **Vouches**: Query all vouch relationships between users
- **Network**: Get network-wide statistics (total users, vouches, etc.)
- **RankChanges**: Track historical rank changes

See `src/lib/graphql-queries.ts` for example queries.

## 📁 Project Structure

```
syb-network-landing-page/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── explorer/             # Network Explorer page
│   │   │   └── page.tsx          # Explorer main page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout with GraphQL provider
│   │   └── page.tsx              # Home/landing page
│   ├── components/               # React components
│   │   ├── About.tsx             # About section
│   │   ├── ApolloProvider.tsx    # Apollo Client provider
│   │   ├── Benefits.tsx          # Benefits section
│   │   ├── Connect.tsx           # Connect section
│   │   ├── Footer.tsx            # Footer component
│   │   ├── Hero.tsx              # Hero section
│   │   ├── HowItWorks.tsx        # How it works section
│   │   ├── Navigation.tsx        # Navigation bar
│   │   ├── NetworkGraph.tsx      # Cytoscape.js graph visualization
│   │   ├── NetworkHub.tsx        # Network hub section
│   │   ├── UseCases.tsx          # Use cases section
│   │   ├── UserDetailPanel.tsx   # User details sidebar
│   │   └── Vision.tsx            # Vision section
│   ├── lib/                      # Utility libraries
│   │   ├── graphql-client.ts     # Apollo Client configuration
│   │   └── graphql-queries.ts    # GraphQL query definitions
│   ├── types/                    # TypeScript types
│   │   └── network.ts            # Network data types
│   └── hooks/                    # Custom React hooks
│       └── useScrollAnimation.ts # Scroll animation utilities
├── subgraph/                     # The Graph subgraph
│   ├── abis/                     # Contract ABIs
│   │   └── SybVouch.json         # SybVouch contract ABI
│   ├── src/
│   │   └── mapping.ts            # Event handlers (AssemblyScript)
│   ├── schema.graphql            # GraphQL schema
│   ├── subgraph.yaml             # Subgraph manifest
│   └── package.json              # Subgraph dependencies
├── .env.local                    # Environment variables (create this)
└── package.json                  # Project dependencies
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server

### Subgraph (run from `/subgraph` directory)
- `npm run codegen` - Generate AssemblyScript types from GraphQL schema
- `npm run build` - Build the subgraph
- `npm run deploy` - Deploy subgraph to The Graph Studio
- `npm run create-local` - Create subgraph on local Graph node
- `npm run deploy-local` - Deploy subgraph to local Graph node

## 🎨 Customization

### Landing Page
The landing page is built with a modular component structure. Each section is a separate component that can be easily customized:

- **Styling**: Modify Tailwind classes in components
- **Content**: Update text and images in individual components
- **Layout**: Adjust component order in `src/app/page.tsx`
- **Animations**: Customize scroll animations in `src/hooks/useScrollAnimation.ts`

### Network Explorer
The explorer can be customized in several ways:

- **Graph Layout**: Modify Cytoscape.js layout parameters in `src/components/NetworkGraph.tsx`
- **Node Styling**: Adjust node colors, sizes, and styles based on trust metrics
- **Color Scheme**: Update rank color coding in `getRankColor()` function
- **Queries**: Customize GraphQL queries in `src/lib/graphql-queries.ts`
- **Subgraph Schema**: Extend entities and add new fields in `subgraph/schema.graphql`

## 🌐 Deployment

### Frontend Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variable: `NEXT_PUBLIC_SUBGRAPH_URL=<your-subgraph-url>`
4. Deploy!

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Subgraph Deployment

1. **Create a subgraph** on [The Graph Studio](https://thegraph.com/studio/)
2. **Get your deploy key** from the studio dashboard
3. **Authenticate**: `graph auth --studio <YOUR_DEPLOY_KEY>`
4. **Deploy**: 
   ```bash
   cd subgraph
   npm run deploy
   ```
5. **Update frontend**: Set `NEXT_PUBLIC_SUBGRAPH_URL` to your deployed subgraph URL

**Important**: After deployment, you need to publish your subgraph in The Graph Studio to make it publicly queryable.

### Deployment Checklist
- [ ] Deploy subgraph to The Graph Studio
- [ ] Publish subgraph to make it public
- [ ] Get subgraph query URL
- [ ] Set `NEXT_PUBLIC_SUBGRAPH_URL` in Vercel
- [ ] Deploy frontend to Vercel
- [ ] Test the Network Explorer page

## 🔗 Links

### Project
- **Tokamak Network**: [https://tokamak.network](https://tokamak.network)
- **SybVouch Contract**: Check your `.env.local` for contract address

### Documentation
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS Documentation**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **The Graph Documentation**: [https://thegraph.com/docs](https://thegraph.com/docs)
- **Cytoscape.js Documentation**: [https://js.cytoscape.org](https://js.cytoscape.org)
- **Apollo Client Documentation**: [https://www.apollographql.com/docs/react](https://www.apollographql.com/docs/react)

### Tools
- **The Graph Studio**: [https://thegraph.com/studio](https://thegraph.com/studio)
- **Graph Explorer**: [https://thegraph.com/explorer](https://thegraph.com/explorer)
- **Vercel**: [https://vercel.com](https://vercel.com)

## 📄 License

This project is part of the Tokamak Network ecosystem. Please refer to the organization's licensing terms.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page and submit pull requests.

---

Built with ❤️ by the Tokamak Network team