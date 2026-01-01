// ENS Data - cached with 1hr TTL
export interface ENSData {
  ensName: string | null;
  avatar: string | null;
  description: string | null;
  twitter: string | null;
  github: string | null;
  website: string | null;
  email: string | null;
  discord: string | null;
  fetchedAt: number;
}

// Individual NFT item
export interface NFTItem {
  tokenId: string;
  contractAddress: string;
  name: string | null;
  description: string | null;
  image: string | null;
  thumbnailUrl: string | null;
  collectionName: string | null;
  tokenType: 'ERC721' | 'ERC1155';
}

// NFT Cache - cached with 10min TTL
export interface NFTCache {
  nfts: NFTItem[];
  totalCount: number;
  fetchedAt: number;
}

// User Profile - persistent, no TTL
export interface UserProfile {
  selectedNftId: string | null;
  selectedNftImage: string | null;
  selectedNftName: string | null;
  selectedNftCollection: string | null;
  updatedAt: number;
}

// Combined identity data for display
export interface WalletIdentity {
  address: string;
  ensName: string | null;
  avatar: string | null; // Priority: ENS avatar > Selected NFT > null
  selectedNft: {
    image: string | null;
    name: string | null;
    collection: string | null;
  } | null;
  socials: {
    twitter: string | null;
    github: string | null;
    website: string | null;
    email: string | null;
    discord: string | null;
  };
}

// API Response types
export interface ENSApiResponse {
  success: boolean;
  data: ENSData | null;
  error?: string;
  cached: boolean;
}

export interface NFTApiResponse {
  success: boolean;
  data: NFTCache | null;
  error?: string;
  cached: boolean;
}

export interface ProfileApiResponse {
  success: boolean;
  data: UserProfile | null;
  error?: string;
}

