'use client';

import { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { useQuery } from '@apollo/client/react';
import { GET_NETWORK_GRAPH, GET_USER_DETAILS, GET_TRANSACTIONS } from '@/lib/graphql-queries';
import { NetworkGraphData, UserDetails, Vouch } from '@/types/network';
import { activeTabAtom, selectedNodeAtom, txPageAtom, txPageSizeAtom } from '@/lib/store';
import NetworkGraph from '@/components/NetworkGraph';
import UserDetailPanel from '@/components/UserDetailPanel';
import Navigation from '@/components/Navigation';
import { 
  Network, 
  Users, 
  ArrowRight, 
  RefreshCw, 
  Search,
  TrendingUp,
  Award,
  Loader2,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function ExplorerPage() {
  const [selectedNode, setSelectedNode] = useAtom(selectedNodeAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [txPage, setTxPage] = useAtom(txPageAtom);
  const [txPageSize] = useAtom(txPageSizeAtom);

  // Fetch network graph
  const { data, loading, error, refetch } = useQuery<{ 
    users: NetworkGraphData['users'];
    vouches: NetworkGraphData['vouches'];
    network: NetworkGraphData['network'];
  }>(GET_NETWORK_GRAPH, {
    variables: { first: 1000 }
  });

  // Fetch selected user details
  const { data: userData, loading: userLoading } = useQuery<{ user: UserDetails }>(
    GET_USER_DETAILS,
    {
      variables: { id: selectedNode?.toLowerCase() },
      skip: !selectedNode
    }
  );

  // Fetch transactions with pagination
  const { data: txData, loading: txLoading, error: txError, refetch: refetchTx } = useQuery<{ 
    vouches: Vouch[];
  }>(GET_TRANSACTIONS, {
    variables: { 
      first: txPageSize, 
      skip: (txPage - 1) * txPageSize 
    }
  });

  const handleNodeClick = useCallback((userId: string) => {
    setSelectedNode(userId);
  }, [setSelectedNode]);

  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const user = data?.users.find(u => u.id.toLowerCase() === normalizedSearch);
      if (user) {
        setSelectedNode(user.id);
      } else {
        alert('User not found in the network');
      }
    }
  };

  // Helper functions
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString();
  };

  const getEtherscanUrl = (hash: string, type: 'tx' | 'address') => {
    const baseUrl = 'https://sepolia.etherscan.io';
    return type === 'tx' ? `${baseUrl}/tx/${hash}` : `${baseUrl}/address/${hash}`;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = Date.now();
    const then = parseInt(timestamp) * 1000;
    const diff = now - then;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} sec${seconds > 1 ? 's' : ''} ago`;
  };

  // Pagination helpers
  const hasNextPage = txData?.vouches && txData.vouches.length === txPageSize;
  const hasPrevPage = txPage > 1;

  const handleNextPage = () => {
    if (hasNextPage) {
      setTxPage(txPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setTxPage(txPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setTxPage(page);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center shadow-xl border border-blue-100 relative z-10">
          <div className="text-red-500 mb-4">
            <Network size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">
            Unable to connect to The Graph subgraph. Please check your configuration.
          </p>
          <p className="text-sm text-gray-500 mb-4 font-mono bg-gray-50 p-3 rounded-lg">
            {error.message}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Animated Network Background - Same as Hero */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/15 to-cyan-300/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Moving Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl animate-bounce" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
      </div>

      {/* Network Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" style={{zIndex: 1}}>
        <defs>
          <linearGradient id="explorerGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        <path d="M 20% 30% Q 50% 20% 80% 40%" stroke="url(#explorerGradient1)" strokeWidth="1" fill="none" className="animate-pulse"/>
        <path d="M 10% 60% Q 40% 80% 70% 50%" stroke="url(#explorerGradient1)" strokeWidth="1" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
      </svg>

      {/* Explorer Title & Search Bar */}
      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-32 pb-2 sm:pb-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Title Section */}
          <div className="text-center mb-3 sm:mb-4">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 mb-1">
              Network <span className="text-blue-600">Explorer</span>
            </h1>
            <p className="text-gray-600 text-[10px] sm:text-xs lg:text-sm">
              Visualize and explore the SYB Tokamak Network Trust Graph and Transactions
            </p>
          </div>

          {/* Search Bar & Refresh */}
          <div className="flex items-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search address (0x...)"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-9 sm:pl-12 pr-10 sm:pr-28 bg-white/90 backdrop-blur-sm border border-blue-100 rounded-lg sm:rounded-xl text-xs sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-600" size={16} />
                <button
                  type="submit"
                  className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 sm:px-6 sm:py-2 rounded-md sm:rounded-lg transition-colors font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg"
                >
                  <Search size={16} className="sm:hidden" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </form>
            <button
              onClick={() => activeTab === 'graph' ? refetch() : refetchTx()}
              disabled={loading || txLoading}
              className="p-2 sm:p-3 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-colors text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed bg-white/90 backdrop-blur-sm border border-blue-100 shadow-sm flex-shrink-0"
              title="Refresh data"
            >
              <RefreshCw size={16} className={`sm:w-5 sm:h-5 ${(loading || txLoading) ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 p-2 sm:p-4">
        <div className="max-w-7xl mx-auto">
          {/* Integrated Card with Tabs and Stats */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            {/* Header Section */}
            <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-0">
              <div className="flex items-center justify-between mb-3">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('graph')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs sm:text-sm transition-all ${
                      activeTab === 'graph'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Network size={14} />
                    <span>Graph</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs sm:text-sm transition-all ${
                      activeTab === 'transactions'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FileText size={14} />
                    <span>Transactions</span>
                  </button>
                </div>

                {/* Quick Stats Summary (Desktop) */}
                <div className="hidden lg:flex items-center gap-4 text-xs text-gray-600">
                  {data?.network && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-blue-600" />
                        <span className="font-semibold text-gray-800">{data.network.totalUsers}</span>
                        <span>users</span>
                      </div>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <div className="flex items-center gap-1.5">
                        <ArrowRight size={14} className="text-blue-600" />
                        <span className="font-semibold text-gray-800">{data.network.totalVouches}</span>
                        <span>vouches</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Stats Bar - Compact */}
              {loading ? (
                <div className="pb-3 border-b border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-2 bg-gray-200 rounded w-16 mb-1.5"></div>
                        <div className="h-4 bg-gray-300 rounded w-10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : data?.network ? (
                <div className="pb-3 border-b border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div>
                      <div className="text-gray-500 text-[10px] sm:text-xs font-medium mb-0.5">Total Users</div>
                      <div className="text-gray-900 font-bold text-base sm:text-lg">{data.network.totalUsers}</div>
                    </div>

                    <div>
                      <div className="text-gray-500 text-[10px] sm:text-xs font-medium mb-0.5">Total Vouches</div>
                      <div className="text-gray-900 font-bold text-base sm:text-lg">{data.network.totalVouches}</div>
                    </div>

                    <div>
                      <div className="text-gray-500 text-[10px] sm:text-xs font-medium mb-0.5">Bootstrap</div>
                      <div className="text-gray-900 font-bold text-xs sm:text-sm">
                        {data.network.bootstrapComplete ? (
                          <span className="inline-flex items-center gap-1 text-green-600">
                            <span className="text-base sm:text-lg">✓</span> Complete
                          </span>
                        ) : (
                          'In Progress'
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-gray-500 text-[10px] sm:text-xs font-medium mb-0.5">Avg. Connections</div>
                      <div className="text-gray-900 font-bold text-base sm:text-lg">
                        {data.network.totalUsers !== '0' 
                          ? (parseInt(data.network.totalVouches) / parseInt(data.network.totalUsers)).toFixed(1)
                          : '0'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Content Area */}
            {activeTab === 'graph' && (
              <>
                {loading ? (
                  <div className="h-[calc(100vh-260px)] sm:h-[calc(100vh-280px)] p-4 sm:p-6">
                    {/* Skeleton Graph Area */}
                    <div className="relative h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl overflow-hidden">
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                      
                      {/* Skeleton nodes - scattered across the canvas */}
                      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-200/40 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                      <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-cyan-200/40 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="absolute bottom-1/3 left-1/3 w-14 h-14 bg-blue-300/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <div className="absolute bottom-1/4 right-1/3 w-11 h-11 bg-cyan-200/40 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-200/40 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                      <div className="absolute top-1/5 left-1/5 w-9 h-9 bg-cyan-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-1/5 right-1/5 w-13 h-13 bg-blue-200/40 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
                      <div className="absolute top-2/3 left-2/3 w-10 h-10 bg-cyan-200/40 rounded-full animate-pulse" style={{animationDelay: '1.4s'}}></div>
                      
                      {/* Skeleton connection lines */}
                      <svg className="absolute inset-0 w-full h-full opacity-20">
                        <line x1="25%" y1="25%" x2="75%" y2="33%" stroke="#3b82f6" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
                        <line x1="33%" y1="66%" x2="66%" y2="75%" stroke="#06b6d4" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                        <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#3b82f6" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.7s'}}/>
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#06b6d4" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
                        <line x1="80%" y1="80%" x2="66%" y2="66%" stroke="#3b82f6" strokeWidth="2" className="animate-pulse" style={{animationDelay: '1.1s'}}/>
                      </svg>
                      
                      {/* Loading text overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Loader2 className="animate-spin text-blue-600" size={20} />
                            <p className="text-gray-700 text-sm font-medium">Loading network graph...</p>
                          </div>
                          <p className="text-gray-500 text-xs">Fetching nodes and connections</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : data ? (
                  <div className="h-[calc(100vh-260px)] sm:h-[calc(100vh-280px)]">
                    <NetworkGraph
                      users={data.users}
                      vouches={data.vouches}
                      onNodeClick={handleNodeClick}
                      selectedNode={selectedNode}
                    />
                  </div>
                ) : (
                  <div className="h-[calc(100vh-260px)] sm:h-[calc(100vh-280px)] flex items-center justify-center px-4">
                    <div className="text-center">
                      <Network size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-lg text-gray-700 font-medium">No network data available</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <>
                {txLoading ? (
                  <div className="p-8">
                    <div className="flex items-center justify-center space-x-3">
                      <Loader2 className="animate-spin text-blue-600" size={32} />
                      <p className="text-gray-700 font-medium">Loading transactions...</p>
                    </div>
                  </div>
                ) : txError ? (
                  <div className="p-8">
                    <div className="text-center">
                      <Network size={48} className="mx-auto mb-4 text-red-400" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Transactions</h3>
                      <p className="text-gray-600 mb-4">{txError.message}</p>
                      <button
                        onClick={() => refetchTx()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                ) : txData?.vouches && txData.vouches.length > 0 ? (
                  <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                            Txn Hash
                          </th>
                          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                            Block
                          </th>
                          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                            Age
                          </th>
                          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                            From
                          </th>
                          <th className="px-4 py-2.5 text-center text-[11px] font-semibold text-gray-600 uppercase tracking-wider w-12">
                            
                          </th>
                          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                            To
                          </th>
                          <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                            Type
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {txData.vouches.map((vouch) => (
                          <tr key={vouch.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <a
                                href={getEtherscanUrl(vouch.transactionHash || '', 'tx')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 font-mono text-xs inline-flex items-center gap-1"
                              >
                                {formatAddress(vouch.transactionHash || '')}
                                <ExternalLink size={11} />
                              </a>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600 font-mono hidden md:table-cell">
                              {vouch.blockNumber}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                              {formatTimeAgo(vouch.blockTimestamp)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <a
                                  href={getEtherscanUrl(vouch.from.id, 'address')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 font-mono text-xs inline-flex items-center gap-1"
                                >
                                  {formatAddress(vouch.from.id)}
                                  <ExternalLink size={11} />
                                </a>
                                {vouch.from.isBootstrapNode && (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-yellow-700">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                                    Bootstrap
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <ArrowRight size={14} className="text-gray-400 mx-auto" />
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <a
                                  href={getEtherscanUrl(vouch.to.id, 'address')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 font-mono text-xs inline-flex items-center gap-1"
                                >
                                  {formatAddress(vouch.to.id)}
                                  <ExternalLink size={11} />
                                </a>
                                {vouch.to.isBootstrapNode && (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-yellow-700">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                                    Bootstrap
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden lg:table-cell">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium ${
                                vouch.isBootstrapVouch
                                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                  : 'bg-green-50 text-green-700 border border-green-200'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  vouch.isBootstrapVouch ? 'bg-yellow-500' : 'bg-green-500'
                                }`}></span>
                                {vouch.isBootstrapVouch ? 'Bootstrap' : 'Vouch'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                    {/* Footer with Pagination */}
                    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between">
                        {/* Info */}
                        <div className="text-xs text-gray-600">
                          Showing <span className="font-semibold text-gray-900">{(txPage - 1) * txPageSize + 1}</span> to{' '}
                          <span className="font-semibold text-gray-900">
                            {(txPage - 1) * txPageSize + (txData.vouches?.length || 0)}
                          </span>{' '}
                          transactions
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-2">
                          {/* Previous Button */}
                          <button
                            onClick={handlePrevPage}
                            disabled={!hasPrevPage || txLoading}
                            className={`p-1.5 rounded-md transition-colors ${
                              hasPrevPage && !txLoading
                                ? 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                                : 'text-gray-300 cursor-not-allowed'
                            }`}
                            title="Previous page"
                          >
                            <ChevronLeft size={16} />
                          </button>

                          {/* Page Numbers */}
                          <div className="flex items-center gap-1">
                            {/* Show current page and nearby pages */}
                            {txPage > 2 && (
                              <>
                                <button
                                  onClick={() => handlePageClick(1)}
                                  className="px-2.5 py-1 text-xs rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                  1
                                </button>
                                {txPage > 3 && <span className="text-gray-400 px-1">...</span>}
                              </>
                            )}

                            {hasPrevPage && (
                              <button
                                onClick={() => handlePageClick(txPage - 1)}
                                className="px-2.5 py-1 text-xs rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                              >
                                {txPage - 1}
                              </button>
                            )}

                            {/* Current Page */}
                            <button
                              className="px-2.5 py-1 text-xs rounded-md bg-blue-600 text-white font-semibold"
                              disabled
                            >
                              {txPage}
                            </button>

                            {hasNextPage && (
                              <>
                                <button
                                  onClick={() => handlePageClick(txPage + 1)}
                                  className="px-2.5 py-1 text-xs rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                  {txPage + 1}
                                </button>
                                <span className="text-gray-400 px-1">...</span>
                              </>
                            )}
                          </div>

                          {/* Next Button */}
                          <button
                            onClick={handleNextPage}
                            disabled={!hasNextPage || txLoading}
                            className={`p-1.5 rounded-md transition-colors ${
                              hasNextPage && !txLoading
                                ? 'text-gray-700 hover:bg-gray-200 cursor-pointer'
                                : 'text-gray-300 cursor-not-allowed'
                            }`}
                            title="Next page"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-12">
                    <div className="text-center">
                      <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                      <p className="text-lg text-gray-700 font-medium">No transactions found</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* User Detail Panel */}
      {selectedNode && userData?.user && data?.users && (
        <UserDetailPanel
          user={userData.user}
          onClose={handleClosePanel}
          onUserClick={handleNodeClick}
          globalMinScore={Math.min(...data.users.map(u => parseFloat(u.score)))}
          globalMaxScore={Math.max(...data.users.map(u => parseFloat(u.score)))}
        />
      )}

      {/* Loading overlay for user details */}
      {selectedNode && userLoading && (
        <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      )}

      {/* Legend - Only show on graph tab */}
      {activeTab === 'graph' && (
        <div className="hidden sm:block fixed bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-xl z-40 border border-blue-100 max-w-[calc(100vw-1rem)] sm:max-w-none">
          <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3 flex items-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mr-1.5 sm:mr-2"></div>
            Legend
          </h3>
          <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 flex-shrink-0"></div>
              <span className="text-gray-700 font-semibold">Very High Trust (80-100)</span>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
              <span className="text-gray-700">High Trust (60-79)</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-gray-700">Medium Trust (40-59)</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-gray-700">Building Trust (0-39)</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-6 h-0.5 bg-gray-400"></div>
              <span className="text-gray-700">Vouch Direction</span>
            </div>
          </div>
          <div className="hidden sm:block mt-3 pt-3 border-t border-blue-100 text-xs text-gray-600 space-y-1">
            <p className="font-medium text-gray-700">Score: 0-100 (Higher = More Trust)</p>
            <p>Click nodes to view details</p>
            <p>Scroll to zoom, drag to pan</p>
          </div>
        </div>
      )}
    </div>
  );
}

