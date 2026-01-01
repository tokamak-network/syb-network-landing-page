import { Alchemy, Network, NftTokenType } from 'alchemy-sdk';
import type { NFTItem, NFTCache } from '@/types/identity';

// Initialize Alchemy SDK
const getAlchemy = () => {
  const apiKey = process.env.ALCHEMY_API_KEY;
  
  if (!apiKey) {
    throw new Error('ALCHEMY_API_KEY environment variable is required for NFT fetching');
  }

  return new Alchemy({
    apiKey,
    network: Network.ETH_MAINNET,
  });
};

/**
 * Fetch NFTs owned by an address
 */
export async function fetchNFTs(
  address: string, 
  options: { pageSize?: number; pageKey?: string } = {}
): Promise<NFTCache> {
  const alchemy = getAlchemy();
  const { pageSize = 50, pageKey } = options;

  try {
    const response = await alchemy.nft.getNftsForOwner(address, {
      pageSize,
      pageKey,
      excludeFilters: [], // Include all NFTs
      orderBy: undefined, // Default ordering
    });

    const nfts: NFTItem[] = response.ownedNfts
      .filter(nft => {
        // Filter out NFTs without images
        const hasImage = nft.image?.cachedUrl || 
                        nft.image?.thumbnailUrl || 
                        nft.image?.originalUrl ||
                        nft.raw?.metadata?.image;
        return hasImage;
      })
      .map(nft => {
        // Get the best available image URL
        const image = nft.image?.cachedUrl || 
                     nft.image?.originalUrl ||
                     nft.raw?.metadata?.image ||
                     null;

        // Convert IPFS URLs if needed
        const resolvedImage = resolveImageUrl(image);
        const resolvedThumbnail = resolveImageUrl(nft.image?.thumbnailUrl || null);

        return {
          tokenId: nft.tokenId,
          contractAddress: nft.contract.address,
          name: nft.name || nft.raw?.metadata?.name || `#${nft.tokenId}`,
          description: nft.description || nft.raw?.metadata?.description || null,
          image: resolvedImage,
          thumbnailUrl: resolvedThumbnail || resolvedImage,
          collectionName: nft.contract.name || nft.contract.openSeaMetadata?.collectionName || null,
          tokenType: nft.tokenType === NftTokenType.ERC1155 ? 'ERC1155' : 'ERC721',
        };
      });

    return {
      nfts,
      totalCount: response.totalCount,
      fetchedAt: Date.now(),
    };
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw error;
  }
}

/**
 * Fetch a specific NFT by contract address and token ID
 */
export async function fetchNFT(
  contractAddress: string,
  tokenId: string
): Promise<NFTItem | null> {
  const alchemy = getAlchemy();

  try {
    const nft = await alchemy.nft.getNftMetadata(contractAddress, tokenId);

    const image = nft.image?.cachedUrl || 
                 nft.image?.originalUrl ||
                 nft.raw?.metadata?.image ||
                 null;

    return {
      tokenId: nft.tokenId,
      contractAddress: nft.contract.address,
      name: nft.name || nft.raw?.metadata?.name || `#${nft.tokenId}`,
      description: nft.description || nft.raw?.metadata?.description || null,
      image: resolveImageUrl(image),
      thumbnailUrl: resolveImageUrl(nft.image?.thumbnailUrl || null) || resolveImageUrl(image),
      collectionName: nft.contract.name || nft.contract.openSeaMetadata?.collectionName || null,
      tokenType: nft.tokenType === NftTokenType.ERC1155 ? 'ERC1155' : 'ERC721',
    };
  } catch (error) {
    console.error('Error fetching NFT:', error);
    return null;
  }
}

/**
 * Resolve IPFS URLs to gateway URLs
 */
function resolveImageUrl(url: string | null): string | null {
  if (!url) return null;

  // Already an HTTP(S) URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // IPFS URL
  if (url.startsWith('ipfs://')) {
    const hash = url.replace('ipfs://', '');
    return `https://ipfs.io/ipfs/${hash}`;
  }

  // Data URL (base64 encoded)
  if (url.startsWith('data:')) {
    return url;
  }

  // Arweave URL
  if (url.startsWith('ar://')) {
    const hash = url.replace('ar://', '');
    return `https://arweave.net/${hash}`;
  }

  return url;
}

/**
 * Get wallet stats using Alchemy
 */
export async function getWalletStats(address: string): Promise<{
  transactionCount: number;
  firstTransactionTimestamp: number | null;
}> {
  const alchemy = getAlchemy();

  try {
    // Get transaction count
    const transactionCount = await alchemy.core.getTransactionCount(address);

    // Get first transaction (requires fetching transaction history)
    // This is expensive, so we'll skip it for now and potentially add it later
    // For MVP, just return transaction count

    return {
      transactionCount,
      firstTransactionTimestamp: null, // Would require additional API calls
    };
  } catch (error) {
    console.error('Error fetching wallet stats:', error);
    return {
      transactionCount: 0,
      firstTransactionTimestamp: null,
    };
  }
}

/**
 * Get ETH balance for an address
 */
export async function getETHBalance(address: string): Promise<string> {
  const alchemy = getAlchemy();

  try {
    const balance = await alchemy.core.getBalance(address);
    // Convert from wei to ETH (string to avoid BigInt issues)
    const ethBalance = Number(balance) / 1e18;
    return ethBalance.toFixed(4);
  } catch (error) {
    console.error('Error fetching ETH balance:', error);
    return '0';
  }
}

