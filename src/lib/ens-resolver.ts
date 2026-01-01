import { createPublicClient, http } from 'viem';
import { normalize } from 'viem/ens';
import { mainnet } from 'viem/chains';
import type { ENSData } from '@/types/identity';

// Create a public client for Ethereum mainnet
const getClient = () => {
  const rpcUrl = process.env.ETHEREUM_RPC_URL || 
    (process.env.ALCHEMY_API_KEY 
      ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
      : 'https://eth.llamarpc.com'); // Free fallback RPC
  
  return createPublicClient({
    chain: mainnet,
    transport: http(rpcUrl),
  });
};

// Text record keys to fetch from ENS
const TEXT_RECORDS = [
  'avatar',
  'description',
  'com.twitter',
  'com.github',
  'url',
  'email',
  'com.discord',
] as const;

/**
 * Resolve an Ethereum address to ENS data including name, avatar, and social records
 */
export async function resolveENS(address: string): Promise<ENSData> {
  const client = getClient();
  
  const result: ENSData = {
    ensName: null,
    avatar: null,
    description: null,
    twitter: null,
    github: null,
    website: null,
    email: null,
    discord: null,
    fetchedAt: Date.now(),
  };

  try {
    // First, reverse resolve the address to get the ENS name
    const ensName = await client.getEnsName({
      address: address as `0x${string}`,
    });

    if (!ensName) {
      // No ENS name found for this address
      return result;
    }

    result.ensName = ensName;

    // Fetch all text records in parallel
    const textRecordPromises = TEXT_RECORDS.map(async (key) => {
      try {
        const value = await client.getEnsText({
          name: normalize(ensName),
          key,
        });
        return { key, value };
      } catch {
        return { key, value: null };
      }
    });

    const textRecords = await Promise.all(textRecordPromises);

    // Map text records to result
    for (const { key, value } of textRecords) {
      if (!value) continue;
      
      switch (key) {
        case 'avatar':
          result.avatar = value;
          break;
        case 'description':
          result.description = value;
          break;
        case 'com.twitter':
          result.twitter = value;
          break;
        case 'com.github':
          result.github = value;
          break;
        case 'url':
          result.website = value;
          break;
        case 'email':
          result.email = value;
          break;
        case 'com.discord':
          result.discord = value;
          break;
      }
    }

    // If avatar is an ENS avatar URL (eip155:1/...), try to resolve it
    if (result.avatar) {
      result.avatar = await resolveAvatarUrl(result.avatar, ensName, client);
    }

  } catch (error) {
    console.error('Error resolving ENS:', error);
    // Return partial result with fetchedAt timestamp
  }

  return result;
}

/**
 * Resolve ENS avatar URL to an actual image URL
 * Handles various avatar formats: IPFS, HTTP, NFT references
 */
async function resolveAvatarUrl(
  avatarValue: string, 
  ensName: string,
  client: ReturnType<typeof getClient>
): Promise<string | null> {
  try {
    // If it's already an HTTP(S) URL, return as-is
    if (avatarValue.startsWith('http://') || avatarValue.startsWith('https://')) {
      return avatarValue;
    }

    // If it's an IPFS URL, convert to gateway URL
    if (avatarValue.startsWith('ipfs://')) {
      const ipfsHash = avatarValue.replace('ipfs://', '');
      return `https://ipfs.io/ipfs/${ipfsHash}`;
    }

    // If it's an NFT reference (eip155:1/erc721:... or eip155:1/erc1155:...)
    // We'll use the ENS avatar resolution which handles this
    const resolvedAvatar = await client.getEnsAvatar({
      name: normalize(ensName),
    });

    return resolvedAvatar || avatarValue;
  } catch (error) {
    console.error('Error resolving avatar URL:', error);
    return avatarValue; // Return original on error
  }
}

/**
 * Check if an address is a valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Normalize an Ethereum address to lowercase
 */
export function normalizeAddress(address: string): string {
  return address.toLowerCase();
}

