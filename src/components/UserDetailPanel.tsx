'use client';

import { useMemo, useState, useEffect } from 'react';
import { UserDetails } from '@/types/network';
import { ENSData, UserProfile } from '@/types/identity';
import { X, ArrowRight, ArrowLeft, TrendingUp, Clock, DollarSign, CheckCircle2, XCircle, Twitter, Github, Globe, Mail, Edit3, ExternalLink, Copy, Check, Activity, Wallet } from 'lucide-react';
import Jazzicon from './Jazzicon';
import ProfileEditor from './ProfileEditor';

interface WalletStats {
  transactionCount: number;
  ethBalance: string;
}

interface UserDetailPanelProps {
  user: UserDetails | null;
  onClose: () => void;
  onUserClick?: (userId: string) => void;
  globalMinScore?: number;
  globalMaxScore?: number;
}

export default function UserDetailPanel({ user, onClose, onUserClick, globalMinScore, globalMaxScore }: UserDetailPanelProps) {
  const [ensData, setEnsData] = useState<ENSData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [walletStats, setWalletStats] = useState<WalletStats | null>(null);
  const [loadingIdentity, setLoadingIdentity] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch ENS, profile, and wallet stats when user changes
  useEffect(() => {
    if (!user) {
      setEnsData(null);
      setProfile(null);
      setWalletStats(null);
      return;
    }

    const userId = user.id;
    let mounted = true;
    setLoadingIdentity(true);

    async function fetchIdentity() {
      try {
        const [ensRes, profileRes, statsRes] = await Promise.all([
          fetch(`/api/ens/${userId}`).then(r => r.json()).catch(() => null),
          fetch(`/api/profile/${userId}`).then(r => r.json()).catch(() => null),
          fetch(`/api/wallet-stats/${userId}`).then(r => r.json()).catch(() => null),
        ]);

        if (mounted) {
          setEnsData(ensRes?.success ? ensRes.data : null);
          setProfile(profileRes?.success ? profileRes.data : null);
          setWalletStats(statsRes?.success ? statsRes.data : null);
        }
      } catch (error) {
        console.error('Error fetching identity:', error);
      } finally {
        if (mounted) setLoadingIdentity(false);
      }
    }

    fetchIdentity();
    return () => { mounted = false; };
  }, [user?.id]);

  // Deduplicate incoming vouches by from.id (keep first occurrence)
  const deduplicatedIncomingVouches = useMemo(() => {
    if (!user) return [];
    const seen = new Set<string>();
    return user.incomingVouches.filter(vouch => {
      const key = vouch.from.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [user]);

  // Deduplicate outgoing vouches by to.id (keep first occurrence)
  const deduplicatedOutgoingVouches = useMemo(() => {
    if (!user) return [];
    const seen = new Set<string>();
    return user.outgoingVouches.filter(vouch => {
      const key = vouch.to.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [user]);

  if (!user) return null;

  const formatAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(34)}`;
  };

  // Normalize score to 0-100 range using global min/max
  const normalizeScore = (score: string): number => {
    const scoreNum = parseFloat(score);
    
    // Use global min/max if provided, otherwise fall back to local calculation
    const minScore = globalMinScore ?? scoreNum;
    const maxScore = globalMaxScore ?? scoreNum;
    
    if (maxScore === minScore) return 50; // Default to middle if all scores are the same
    return ((scoreNum - minScore) / (maxScore - minScore)) * 100;
  };

  const formatScore = (score: string): string => {
    const normalized = normalizeScore(score);
    return normalized.toFixed(1);
  };

  const getScoreLabel = (score: string) => {
    const normalized = normalizeScore(score);
    if (normalized >= 80) return 'Very High Trust';
    if (normalized >= 60) return 'High Trust';
    if (normalized >= 40) return 'Medium Trust';
    return 'Building Trust';
  };

  const getScoreColor = (score: string) => {
    const normalized = normalizeScore(score);
    if (normalized >= 80) return 'from-green-500 to-green-600';
    if (normalized >= 60) return 'from-blue-500 to-blue-600';
    if (normalized >= 40) return 'from-orange-500 to-orange-600';
    return 'from-gray-500 to-gray-600';
  };

  const formatTimestamp = (blockTimestamp: string) => {
    const date = new Date(parseInt(blockTimestamp) * 1000);
    return date.toLocaleString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatStakedAmount = (amount: string): string => {
    const amountNum = parseFloat(amount);
    if (amountNum === 0) return '0';
    // Convert from WTON units to WTON (27 decimals: 1 WTON = 1e27)
    const wton = amountNum / 1e27;
    if (wton < 0.0001) return wton.toExponential(2);
    return wton.toFixed(4);
  };

  // Avatar priority: ENS avatar > Selected NFT > Jazzicon
  const avatarUrl = ensData?.avatar || profile?.selectedNftImage || null;
  const displayName = ensData?.ensName || formatAddress(user.id);

  const hasSocials = ensData?.twitter || ensData?.github || ensData?.website || ensData?.email;

  return (
    <>
      <div className="fixed right-2 sm:right-4 top-20 sm:top-28 bottom-4 sm:bottom-12 w-[calc(100%-1rem)] sm:w-80 md:w-72 bg-gradient-to-br from-slate-50 to-blue-50 shadow-2xl z-[100] overflow-y-auto border border-blue-200 rounded-xl">
        {/* Header with Avatar */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-3 text-white shadow-lg z-[110] rounded-t-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={avatarUrl ? 'hidden' : ''}>
                  <Jazzicon address={user.id} size={48} className="border-2 border-white/30" />
                </div>
                {loadingIdentity && (
                  <div className="absolute inset-0 bg-white/30 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {/* Edit button */}
                <button
                  onClick={() => setShowProfileEditor(true)}
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                  title="Edit profile picture"
                >
                  <Edit3 size={10} className="text-gray-600" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                {/* ENS Name or Address */}
                {ensData?.ensName ? (
                  <h2 className="text-sm font-bold truncate">{ensData.ensName}</h2>
                ) : (
                  <h2 className="text-sm font-bold">Node Details</h2>
                )}
                
                {/* Address with copy */}
                <button
                  onClick={() => copyToClipboard(user.id)}
                  className="flex items-center gap-1 text-[10px] font-mono bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded hover:bg-white/30 transition-all mt-1"
                  title="Click to copy full address"
                >
                  {formatAddress(user.id)}
                  {copied ? <Check size={10} /> : <Copy size={10} />}
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
              aria-label="Close panel"
            >
              <X size={18} />
            </button>
          </div>

          {/* Social Links */}
          {hasSocials && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
              {ensData?.twitter && (
                <a
                  href={`https://twitter.com/${ensData.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  title={`@${ensData.twitter}`}
                >
                  <Twitter size={12} />
                </a>
              )}
              {ensData?.github && (
                <a
                  href={`https://github.com/${ensData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  title={ensData.github}
                >
                  <Github size={12} />
                </a>
              )}
              {ensData?.website && (
                <a
                  href={ensData.website.startsWith('http') ? ensData.website : `https://${ensData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  title={ensData.website}
                >
                  <Globe size={12} />
                </a>
              )}
              {ensData?.email && (
                <a
                  href={`mailto:${ensData.email}`}
                  className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  title={ensData.email}
                >
                  <Mail size={12} />
                </a>
              )}
              <a
                href={`https://etherscan.io/address/${user.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors ml-auto"
                title="View on Etherscan"
              >
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        <div className="p-3">
          {/* ENS Bio */}
          {ensData?.description && (
            <div className="mb-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-blue-100">
              <p className="text-[11px] text-gray-600 italic">&quot;{ensData.description}&quot;</p>
            </div>
          )}

          {/* Score - Large Display */}
          <div className={`bg-gradient-to-br ${getScoreColor(user.score)} p-4 rounded-xl shadow-md mb-3 text-white`}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-1.5">
                <TrendingUp size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Trust Score</span>
              </div>
              <span className="text-[10px] bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                {getScoreLabel(user.score)}
              </span>
            </div>
            <div className="flex items-baseline space-x-1 overflow-hidden">
              <div className="font-bold text-5xl">
                {formatScore(user.score)}
              </div>
              <div className="text-2xl font-medium opacity-90 ml-1">/100</div>
            </div>
            <div className="text-[10px] opacity-90 mt-2">
              {normalizeScore(user.score) >= 80 ? 'Highly trusted node' : 
               normalizeScore(user.score) >= 60 ? 'Well-trusted node' :
               normalizeScore(user.score) >= 40 ? 'Moderately trusted' :
               'Higher score = higher trust'}
            </div>
          </div>

          {/* Staking Status - Highlighted Box */}
          <div className={`mb-3 p-3 rounded-lg shadow-sm border-2 ${
            user.hasMinimumStake 
              ? 'bg-green-50 border-green-300' 
              : 'bg-orange-50 border-orange-300'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1.5">
                <DollarSign size={14} className={user.hasMinimumStake ? 'text-green-600' : 'text-orange-600'} />
                <span className="text-[10px] font-semibold uppercase tracking-wide">Staking Status</span>
              </div>
              {user.hasMinimumStake ? (
                <CheckCircle2 size={16} className="text-green-600" />
              ) : (
                <XCircle size={16} className="text-orange-600" />
              )}
            </div>
            <div className="flex items-baseline space-x-1 mb-1">
              <div className={`font-bold text-2xl ${user.hasMinimumStake ? 'text-green-700' : 'text-orange-700'}`}>
                {formatStakedAmount(user.stakedAmount)}
              </div>
              <div className="text-sm font-medium opacity-80">WTON</div>
            </div>
            <div className={`text-[9px] font-medium ${user.hasMinimumStake ? 'text-green-700' : 'text-orange-700'}`}>
              {user.hasMinimumStake ? (
                '✓ Meets minimum stake requirement'
              ) : (
                '⚠ Below minimum stake requirement'
              )}
            </div>
          </div>

          {/* Other Stats - Blue Theme */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center space-x-1 text-blue-600 mb-0.5">
                <ArrowLeft size={14} />
                <span className="text-[10px] font-semibold uppercase">Incoming</span>
              </div>
              <div className="text-xl font-bold text-gray-800">{deduplicatedIncomingVouches.length}</div>
              <div className="text-[8px] text-gray-500 mt-0.5">vouches received</div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center space-x-1 text-blue-600 mb-0.5">
                <ArrowRight size={14} />
                <span className="text-[10px] font-semibold uppercase">Outgoing</span>
              </div>
              <div className="text-xl font-bold text-gray-800">{deduplicatedOutgoingVouches.length}</div>
              <div className="text-[8px] text-gray-500 mt-0.5">vouches given</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-blue-100">
            <div className="flex items-center space-x-1.5 text-blue-600 mb-1.5">
              <Clock size={12} />
              <span className="text-[10px] font-semibold">Timeline</span>
            </div>
            <div className="text-[9px] text-gray-600 space-y-0.5">
              <div>Created: {formatTimestamp(user.createdAt)}</div>
              <div>Updated: {formatTimestamp(user.updatedAt)}</div>
            </div>
          </div>

          {/* Wallet Stats (Mainnet) */}
          {walletStats && (
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center space-x-1 text-blue-600 mb-0.5">
                  <Activity size={12} />
                  <span className="text-[10px] font-semibold uppercase">Txn Count</span>
                </div>
                <div className="text-lg font-bold text-gray-800">{walletStats.transactionCount.toLocaleString()}</div>
                <div className="text-[8px] text-gray-500">on Ethereum</div>
              </div>
              <div className="p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center space-x-1 text-blue-600 mb-0.5">
                  <Wallet size={12} />
                  <span className="text-[10px] font-semibold uppercase">ETH Balance</span>
                </div>
                <div className="text-lg font-bold text-gray-800">{walletStats.ethBalance}</div>
                <div className="text-[8px] text-gray-500">mainnet</div>
              </div>
            </div>
          )}

          {/* Incoming Vouches */}
          <div className="mb-3">
            <div className="flex items-center space-x-1.5 mb-2">
              <div className="p-1 bg-blue-100 rounded-md">
                <ArrowLeft className="text-blue-600" size={14} />
              </div>
              <h3 className="text-xs font-bold text-gray-800">
                Incoming Vouches ({deduplicatedIncomingVouches.length})
              </h3>
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {deduplicatedIncomingVouches.length === 0 ? (
                <p className="text-[10px] text-gray-500 italic p-2 bg-white/50 rounded-lg">No incoming vouches yet</p>
              ) : (
                deduplicatedIncomingVouches.map((vouch) => (
                  <VouchItem
                    key={vouch.id}
                    address={vouch.from.id}
                    score={formatScore(vouch.from.score)}
                    hasMinimumStake={vouch.from.hasMinimumStake}
                    timestamp={formatTimestamp(vouch.blockTimestamp)}
                    onClick={() => onUserClick && onUserClick(vouch.from.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Outgoing Vouches */}
          <div className="mb-3">
            <div className="flex items-center space-x-1.5 mb-2">
              <div className="p-1 bg-blue-100 rounded-md">
                <ArrowRight className="text-blue-600" size={14} />
              </div>
              <h3 className="text-xs font-bold text-gray-800">
                Outgoing Vouches ({deduplicatedOutgoingVouches.length})
              </h3>
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {deduplicatedOutgoingVouches.length === 0 ? (
                <p className="text-[10px] text-gray-500 italic p-2 bg-white/50 rounded-lg">No outgoing vouches yet</p>
              ) : (
                deduplicatedOutgoingVouches.map((vouch) => (
                  <VouchItem
                    key={vouch.id}
                    address={vouch.to.id}
                    score={formatScore(vouch.to.score)}
                    hasMinimumStake={vouch.to.hasMinimumStake}
                    timestamp={formatTimestamp(vouch.blockTimestamp)}
                    onClick={() => onUserClick && onUserClick(vouch.to.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Editor Modal */}
      <ProfileEditor
        address={user.id}
        isOpen={showProfileEditor}
        onClose={() => setShowProfileEditor(false)}
        onSave={(newProfile) => setProfile(newProfile)}
      />
    </>
  );
}

// Vouch item component with ENS support
function VouchItem({
  address,
  score,
  hasMinimumStake,
  timestamp,
  onClick,
}: {
  address: string;
  score: string;
  hasMinimumStake: boolean;
  timestamp: string;
  onClick: () => void;
}) {
  const [ensName, setEnsName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Fetch ENS for this address (will be cached)
    fetch(`/api/ens/${address}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setEnsName(data.data.ensName);
          setAvatar(data.data.avatar);
        }
      })
      .catch(() => {});
  }, [address]);

  const formatAddr = (addr: string) => `${addr.substring(0, 8)}...${addr.substring(34)}`;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-2 bg-white/90 backdrop-blur-sm hover:bg-blue-50 rounded-lg transition-all shadow-sm border border-blue-100 hover:border-blue-300 group"
    >
      <div className="flex items-center gap-2">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <img src={avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <Jazzicon address={address} size={24} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-mono text-gray-700 group-hover:text-blue-600 truncate">
              {ensName || formatAddr(address)}
            </span>
            {hasMinimumStake && (
              <span title="Staked">
                <CheckCircle2 size={10} className="text-green-600" />
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-[9px] text-gray-500">
            <span>Score: {score}</span>
          </div>
          <div className="text-[8px] text-gray-400 mt-0.5">
            {timestamp}
          </div>
        </div>
      </div>
    </button>
  );
}
