import { kv } from '@vercel/kv';
import type { ENSData, NFTCache, UserProfile } from '@/types/identity';

// Cache TTLs in seconds
const ENS_TTL = 3600; // 1 hour
const NFT_TTL = 600;  // 10 minutes

// Key prefixes
const KEYS = {
  ens: (address: string) => `ens:${address.toLowerCase()}`,
  nfts: (address: string) => `nfts:${address.toLowerCase()}`,
  profile: (address: string) => `profile:${address.toLowerCase()}`,
} as const;

// ENS Cache Operations
export async function getENSCache(address: string): Promise<ENSData | null> {
  try {
    const data = await kv.get<ENSData>(KEYS.ens(address));
    return data;
  } catch (error) {
    console.error('Error getting ENS cache:', error);
    return null;
  }
}

export async function setENSCache(address: string, data: ENSData): Promise<void> {
  try {
    await kv.set(KEYS.ens(address), data, { ex: ENS_TTL });
  } catch (error) {
    console.error('Error setting ENS cache:', error);
  }
}

// NFT Cache Operations
export async function getNFTCache(address: string): Promise<NFTCache | null> {
  try {
    const data = await kv.get<NFTCache>(KEYS.nfts(address));
    return data;
  } catch (error) {
    console.error('Error getting NFT cache:', error);
    return null;
  }
}

export async function setNFTCache(address: string, data: NFTCache): Promise<void> {
  try {
    await kv.set(KEYS.nfts(address), data, { ex: NFT_TTL });
  } catch (error) {
    console.error('Error setting NFT cache:', error);
  }
}

// Profile Operations (persistent, no TTL)
export async function getProfile(address: string): Promise<UserProfile | null> {
  try {
    const data = await kv.get<UserProfile>(KEYS.profile(address));
    return data;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

export async function setProfile(address: string, data: UserProfile): Promise<void> {
  try {
    // No TTL for profile - persistent storage
    await kv.set(KEYS.profile(address), data);
  } catch (error) {
    console.error('Error setting profile:', error);
    throw error; // Re-throw for API to handle
  }
}

export async function deleteProfile(address: string): Promise<void> {
  try {
    await kv.del(KEYS.profile(address));
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
}

// Utility to check if KV is available (for development fallback)
export async function isKVAvailable(): Promise<boolean> {
  try {
    await kv.ping();
    return true;
  } catch {
    return false;
  }
}

// Batch get multiple ENS records (useful for graph view)
export async function getBatchENSCache(addresses: string[]): Promise<Map<string, ENSData | null>> {
  const result = new Map<string, ENSData | null>();
  
  try {
    // Use pipeline for efficient batch reads
    const pipeline = kv.pipeline();
    addresses.forEach(addr => pipeline.get(KEYS.ens(addr)));
    const responses = await pipeline.exec();
    
    addresses.forEach((addr, index) => {
      result.set(addr.toLowerCase(), responses[index] as ENSData | null);
    });
  } catch (error) {
    console.error('Error in batch ENS cache:', error);
    addresses.forEach(addr => result.set(addr.toLowerCase(), null));
  }
  
  return result;
}

