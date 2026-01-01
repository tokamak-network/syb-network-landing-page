import { NextRequest, NextResponse } from 'next/server';
import { getWalletStats, getETHBalance } from '@/lib/nft-fetcher';
import { isValidAddress, normalizeAddress } from '@/lib/ens-resolver';

export interface WalletStatsResponse {
  success: boolean;
  data: {
    transactionCount: number;
    ethBalance: string;
    firstTransactionTimestamp: number | null;
  } | null;
  error?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
): Promise<NextResponse<WalletStatsResponse>> {
  const { address } = await params;

  // Validate address format
  if (!isValidAddress(address)) {
    return NextResponse.json({
      success: false,
      data: null,
      error: 'Invalid Ethereum address format',
    }, { status: 400 });
  }

  const normalizedAddress = normalizeAddress(address);

  try {
    // Fetch wallet stats and ETH balance in parallel
    const [stats, ethBalance] = await Promise.all([
      getWalletStats(normalizedAddress),
      getETHBalance(normalizedAddress),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        transactionCount: stats.transactionCount,
        ethBalance,
        firstTransactionTimestamp: stats.firstTransactionTimestamp,
      },
    });
  } catch (error) {
    console.error('Wallet stats API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch wallet stats';
    const isMissingKey = errorMessage.includes('ALCHEMY_API_KEY');
    
    return NextResponse.json({
      success: false,
      data: null,
      error: isMissingKey 
        ? 'Wallet stats requires ALCHEMY_API_KEY configuration' 
        : errorMessage,
    }, { status: isMissingKey ? 503 : 500 });
  }
}

