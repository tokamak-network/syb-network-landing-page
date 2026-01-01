'use client';

import { useState, useEffect } from 'react';
import { Loader2, RefreshCw, Image as ImageIcon, Check } from 'lucide-react';
import type { NFTItem, NFTCache } from '@/types/identity';

interface NFTGalleryProps {
  address: string;
  selectedNftId?: string | null;
  onSelect?: (nft: NFTItem) => void;
  maxDisplay?: number;
  className?: string;
}

export default function NFTGallery({
  address,
  selectedNftId,
  onSelect,
  maxDisplay = 50,
  className = '',
}: NFTGalleryProps) {
  const [nftData, setNftData] = useState<NFTCache | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNFTs = async (forceRefresh = false) => {
    try {
      if (forceRefresh) setRefreshing(true);
      else setLoading(true);
      
      setError(null);

      const url = `/api/nfts/${address}${forceRefresh ? '?refresh=true' : ''}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setNftData(data.data);
      } else {
        setError(data.error || 'Failed to fetch NFTs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch NFTs');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [address]);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <Loader2 className="animate-spin text-blue-500 mb-3" size={32} />
        <p className="text-gray-500 text-sm">Loading NFTs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="text-red-500 mb-3">
          <ImageIcon size={32} />
        </div>
        <p className="text-gray-600 text-sm mb-2">Failed to load NFTs</p>
        <p className="text-gray-400 text-xs mb-4">{error}</p>
        <button
          onClick={() => fetchNFTs(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  if (!nftData || nftData.nfts.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="text-gray-300 mb-3">
          <ImageIcon size={48} />
        </div>
        <p className="text-gray-600 text-sm mb-1">No NFTs Found</p>
        <p className="text-gray-400 text-xs">This wallet doesn&apos;t own any NFTs on Ethereum mainnet</p>
      </div>
    );
  }

  const displayNFTs = nftData.nfts.slice(0, maxDisplay);

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-medium text-gray-700">
            {nftData.totalCount} NFT{nftData.totalCount !== 1 ? 's' : ''} found
          </span>
          {nftData.totalCount > maxDisplay && (
            <span className="text-xs text-gray-400 ml-2">
              (showing first {maxDisplay})
            </span>
          )}
        </div>
        <button
          onClick={() => fetchNFTs(true)}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {displayNFTs.map((nft) => {
          const nftId = `${nft.contractAddress}:${nft.tokenId}`;
          const isSelected = selectedNftId === nftId;

          return (
            <button
              key={nftId}
              onClick={() => onSelect?.(nft)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* NFT Image */}
              {nft.thumbnailUrl || nft.image ? (
                <img
                  src={nft.thumbnailUrl || nft.image || ''}
                  alt={nft.name || 'NFT'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-nft.svg';
                    e.currentTarget.onerror = null;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <ImageIcon size={24} className="text-gray-300" />
                </div>
              )}

              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}

              {/* Name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-[10px] font-medium truncate">
                  {nft.name || `#${nft.tokenId}`}
                </p>
                {nft.collectionName && (
                  <p className="text-white/70 text-[8px] truncate">
                    {nft.collectionName}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Cache info */}
      {nftData.fetchedAt && (
        <p className="text-[10px] text-gray-400 mt-4 text-center">
          Last updated: {new Date(nftData.fetchedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}

