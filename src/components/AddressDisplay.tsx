'use client';

import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, ExternalLink, Twitter, Github, Globe, Mail } from 'lucide-react';
import Jazzicon from './Jazzicon';
import type { ENSData, UserProfile } from '@/types/identity';

interface AddressDisplayProps {
  address: string;
  size?: 'sm' | 'md' | 'lg';
  showCopy?: boolean;
  showEtherscan?: boolean;
  showSocials?: boolean;
  showFullOnHover?: boolean;
  className?: string;
  onClick?: () => void;
}

interface IdentityState {
  ens: ENSData | null;
  profile: UserProfile | null;
  loading: boolean;
}

const SIZES = {
  sm: { avatar: 24, text: 'text-xs', padding: 'px-2 py-1' },
  md: { avatar: 32, text: 'text-sm', padding: 'px-3 py-1.5' },
  lg: { avatar: 40, text: 'text-base', padding: 'px-4 py-2' },
};

export default function AddressDisplay({
  address,
  size = 'md',
  showCopy = true,
  showEtherscan = true,
  showSocials = false,
  showFullOnHover = true,
  className = '',
  onClick,
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [identity, setIdentity] = useState<IdentityState>({
    ens: null,
    profile: null,
    loading: true,
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeConfig = SIZES[size];

  // Fetch ENS and profile data
  useEffect(() => {
    let mounted = true;

    async function fetchIdentity() {
      try {
        // Fetch ENS and profile in parallel
        const [ensRes, profileRes] = await Promise.all([
          fetch(`/api/ens/${address}`).then(r => r.json()).catch(() => null),
          fetch(`/api/profile/${address}`).then(r => r.json()).catch(() => null),
        ]);

        if (mounted) {
          setIdentity({
            ens: ensRes?.success ? ensRes.data : null,
            profile: profileRes?.success ? profileRes.data : null,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching identity:', error);
        if (mounted) {
          setIdentity({ ens: null, profile: null, loading: false });
        }
      }
    }

    fetchIdentity();
    return () => { mounted = false; };
  }, [address]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [address]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getEtherscanUrl = () => {
    return `https://etherscan.io/address/${address}`;
  };

  // Determine what to display
  const displayName = identity.ens?.ensName || formatAddress(address);
  
  // Avatar priority: ENS avatar > Selected NFT > Jazzicon
  const avatarUrl = identity.ens?.avatar || identity.profile?.selectedNftImage || null;

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            width={sizeConfig.avatar}
            height={sizeConfig.avatar}
            className="rounded-full object-cover"
            style={{ width: sizeConfig.avatar, height: sizeConfig.avatar }}
            onError={(e) => {
              // Fallback to jazzicon on image load error
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={avatarUrl ? 'hidden' : ''}>
          <Jazzicon address={address} size={sizeConfig.avatar} />
        </div>
        
        {/* Loading indicator */}
        {identity.loading && (
          <div className="absolute inset-0 bg-white/50 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Name/Address */}
      <button
        onClick={onClick}
        className={`font-mono ${sizeConfig.text} text-gray-700 hover:text-blue-600 transition-colors truncate max-w-[150px]`}
        title={address}
      >
        {displayName}
      </button>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        {showCopy && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard();
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Copy address"
          >
            {copied ? (
              <Check size={14} className="text-green-500" />
            ) : (
              <Copy size={14} className="text-gray-400" />
            )}
          </button>
        )}

        {showEtherscan && (
          <a
            href={getEtherscanUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="View on Etherscan"
          >
            <ExternalLink size={14} className="text-gray-400" />
          </a>
        )}
      </div>

      {/* Social links */}
      {showSocials && identity.ens && (
        <div className="flex items-center gap-1 ml-1">
          {identity.ens.twitter && (
            <a
              href={`https://twitter.com/${identity.ens.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-blue-50 rounded transition-colors"
              title={`@${identity.ens.twitter}`}
            >
              <Twitter size={14} className="text-blue-400" />
            </a>
          )}
          {identity.ens.github && (
            <a
              href={`https://github.com/${identity.ens.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title={identity.ens.github}
            >
              <Github size={14} className="text-gray-600" />
            </a>
          )}
          {identity.ens.website && (
            <a
              href={identity.ens.website.startsWith('http') ? identity.ens.website : `https://${identity.ens.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title={identity.ens.website}
            >
              <Globe size={14} className="text-gray-500" />
            </a>
          )}
          {identity.ens.email && (
            <a
              href={`mailto:${identity.ens.email}`}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title={identity.ens.email}
            >
              <Mail size={14} className="text-gray-500" />
            </a>
          )}
        </div>
      )}

      {/* Tooltip with full address */}
      {showFullOnHover && showTooltip && (
        <div className="absolute z-50 mt-12 left-0 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[280px]">
          <div className="font-mono text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded break-all">
            {address}
          </div>
          {identity.ens?.ensName && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-600">{identity.ens.ensName}</span>
              {identity.ens.description && (
                <span className="text-xs text-gray-500 truncate">{identity.ens.description}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Simple inline version for lists/tables
export function AddressDisplayInline({
  address,
  ensName,
  avatarUrl,
  size = 'sm',
}: {
  address: string;
  ensName?: string | null;
  avatarUrl?: string | null;
  size?: 'sm' | 'md';
}) {
  const sizeConfig = size === 'sm' ? { avatar: 20, text: 'text-[11px]' } : { avatar: 28, text: 'text-xs' };
  const displayName = ensName || `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <span className="inline-flex items-center gap-1.5">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          className="rounded-full object-cover"
          style={{ width: sizeConfig.avatar, height: sizeConfig.avatar }}
        />
      ) : (
        <Jazzicon address={address} size={sizeConfig.avatar} />
      )}
      <span className={`font-mono ${sizeConfig.text} text-gray-700`}>
        {displayName}
      </span>
    </span>
  );
}

