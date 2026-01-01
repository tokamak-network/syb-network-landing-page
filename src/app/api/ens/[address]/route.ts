import { NextRequest, NextResponse } from 'next/server';
import { resolveENS, isValidAddress, normalizeAddress } from '@/lib/ens-resolver';
import { getENSCache, setENSCache } from '@/lib/kv-client';
import type { ENSApiResponse } from '@/types/identity';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
): Promise<NextResponse<ENSApiResponse>> {
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

  try {
    // Check cache first
    const cachedData = await getENSCache(normalizedAddress);
    
    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
      });
    }

    // Cache miss - resolve ENS
    const ensData = await resolveENS(normalizedAddress);
    
    // Store in cache
    await setENSCache(normalizedAddress, ensData);

    return NextResponse.json({
      success: true,
      data: ensData,
      cached: false,
    });
  } catch (error) {
    console.error('ENS API error:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to resolve ENS',
      cached: false,
    }, { status: 500 });
  }
}

