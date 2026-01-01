import { NextRequest, NextResponse } from 'next/server';
import { fetchNFTs } from '@/lib/nft-fetcher';
import { getNFTCache, setNFTCache } from '@/lib/kv-client';
import { isValidAddress, normalizeAddress } from '@/lib/ens-resolver';
import type { NFTApiResponse } from '@/types/identity';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
): Promise<NextResponse<NFTApiResponse>> {
  const { address } = await params;

  // Validate address format
  if (!isValidAddress(address)) {
    return NextResponse.json({
      success: false,
      data: null,
      error: 'Invalid Ethereum address format',
      cached: false,
    }, { status: 400 });
  }

  const normalizedAddress = normalizeAddress(address);

  // Check for force refresh query param
  const searchParams = request.nextUrl.searchParams;
  const forceRefresh = searchParams.get('refresh') === 'true';

  try {
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cachedData = await getNFTCache(normalizedAddress);
      
      if (cachedData) {
        return NextResponse.json({
          success: true,
          data: cachedData,
          cached: true,
        });
      }
    }

    // Cache miss or force refresh - fetch from Alchemy
    const nftData = await fetchNFTs(normalizedAddress);
    
    // Store in cache
    await setNFTCache(normalizedAddress, nftData);

    return NextResponse.json({
      success: true,
      data: nftData,
      cached: false,
    });
  } catch (error) {
    console.error('NFT API error:', error);
    
    // Check if it's a missing API key error
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch NFTs';
    const isMissingKey = errorMessage.includes('ALCHEMY_API_KEY');
    
    return NextResponse.json({
      success: false,
      data: null,
      error: isMissingKey 
        ? 'NFT fetching requires ALCHEMY_API_KEY configuration' 
        : errorMessage,
      cached: false,
    }, { status: isMissingKey ? 503 : 500 });
  }
}

