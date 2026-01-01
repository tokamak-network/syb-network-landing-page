import { NextRequest, NextResponse } from 'next/server';
import { getProfile, setProfile, deleteProfile } from '@/lib/kv-client';
import { isValidAddress, normalizeAddress } from '@/lib/ens-resolver';
import type { ProfileApiResponse, UserProfile } from '@/types/identity';

// GET - Retrieve user profile
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
): Promise<NextResponse<ProfileApiResponse>> {
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
    const profile = await getProfile(normalizedAddress);
    
    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to get profile',
    }, { status: 500 });
  }
}

// POST - Create or update user profile
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
): Promise<NextResponse<ProfileApiResponse>> {
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
    const body = await request.json();
    
    // Validate required fields
    const { selectedNftId, selectedNftImage, selectedNftName, selectedNftCollection } = body;
    
    const profile: UserProfile = {
      selectedNftId: selectedNftId || null,
      selectedNftImage: selectedNftImage || null,
      selectedNftName: selectedNftName || null,
      selectedNftCollection: selectedNftCollection || null,
      updatedAt: Date.now(),
    };

    await setProfile(normalizedAddress, profile);
    
    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Profile POST error:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to update profile',
    }, { status: 500 });
  }
}

// DELETE - Remove user profile (reset to default)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
): Promise<NextResponse<ProfileApiResponse>> {
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
    await deleteProfile(normalizedAddress);
    
    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error('Profile DELETE error:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to delete profile',
    }, { status: 500 });
  }
}

