'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_NETWORK_GRAPH, GET_USER_DETAILS } from '@/lib/graphql-queries';
import { NetworkGraphData, UserDetails } from '@/types/network';
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
  Loader2
} from 'lucide-react';

export default function ExplorerPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleNodeClick = (userId: string) => {
    setSelectedNode(userId);
  };

  const handleClosePanel = () => {
    setSelectedNode(null);
  };

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
      <div className="relative z-10 pt-20 sm:pt-24 lg:pt-28 pb-2 sm:pb-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Title Section */}
          <div className="text-center mb-3 sm:mb-4">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-800 mb-1">
              Network <span className="text-blue-600">Explorer</span>
            </h1>
            <p className="text-gray-600 text-[10px] sm:text-xs lg:text-sm">
              Visualize and explore the SybVouch trust network
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
              onClick={() => refetch()}
              disabled={loading}
              className="p-2 sm:p-3 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-colors text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed bg-white/90 backdrop-blur-sm border border-blue-100 shadow-sm flex-shrink-0"
              title="Refresh data"
            >
              <RefreshCw size={16} className={`sm:w-5 sm:h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {loading ? (
        <div className="relative z-10 pb-1 sm:pb-2">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
              {/* Skeleton Stats Cards */}
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-1.5 sm:space-x-2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg shadow-sm border border-blue-100">
                  <div className="p-1 sm:p-1.5 bg-blue-50 rounded-md sm:rounded-lg flex-shrink-0 animate-pulse">
                    <div className="w-3.5 h-3.5 bg-blue-200 rounded"></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="h-2 sm:h-2.5 bg-gray-200 rounded w-16 sm:w-20 mb-1 animate-pulse"></div>
                    <div className="h-3 sm:h-4 bg-gray-300 rounded w-8 sm:w-12 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : data?.network ? (
        <div className="relative z-10 pb-1 sm:pb-2">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-all">
                <div className="p-1 sm:p-1.5 bg-blue-50 rounded-md sm:rounded-lg flex-shrink-0">
                  <Users className="text-blue-600" size={14} />
                </div>
                <div className="min-w-0">
                  <div className="text-gray-500 text-[8px] sm:text-[10px] md:text-xs font-medium truncate">Total Users</div>
                  <div className="text-gray-800 font-bold text-xs sm:text-sm md:text-base">{data.network.totalUsers}</div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-all">
                <div className="p-1 sm:p-1.5 bg-blue-50 rounded-md sm:rounded-lg flex-shrink-0">
                  <ArrowRight className="text-blue-600" size={14} />
                </div>
                <div className="min-w-0">
                  <div className="text-gray-500 text-[8px] sm:text-[10px] md:text-xs font-medium truncate">Total Vouches</div>
                  <div className="text-gray-800 font-bold text-xs sm:text-sm md:text-base">{data.network.totalVouches}</div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-all">
                <div className="p-1 sm:p-1.5 bg-blue-50 rounded-md sm:rounded-lg flex-shrink-0">
                  <Award className="text-blue-600" size={14} />
                </div>
                <div className="min-w-0">
                  <div className="text-gray-500 text-[8px] sm:text-[10px] md:text-xs font-medium truncate">Bootstrap</div>
                  <div className="text-gray-800 font-bold text-[8px] sm:text-[10px] md:text-xs">
                    {data.network.bootstrapComplete ? '✓ Complete' : 'In Progress'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-all">
                <div className="p-1 sm:p-1.5 bg-blue-50 rounded-md sm:rounded-lg flex-shrink-0">
                  <TrendingUp className="text-blue-600" size={14} />
                </div>
                <div className="min-w-0">
                  <div className="text-gray-500 text-[8px] sm:text-[10px] md:text-xs font-medium truncate">Avg. Connections</div>
                  <div className="text-gray-800 font-bold text-xs sm:text-sm md:text-base">
                    {data.network.totalUsers !== '0' 
                      ? (parseInt(data.network.totalVouches) / parseInt(data.network.totalUsers)).toFixed(1)
                      : '0'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Content */}
      <main className="relative z-10">
        {loading ? (
          <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] md:h-[calc(100vh-260px)] p-2 sm:p-4">
            <div className="h-full max-w-7xl mx-auto">
              {/* Skeleton Loading */}
              <div className="h-full bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-blue-100 overflow-hidden p-4 sm:p-6">
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
            </div>
          </div>
        ) : data ? (
          <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] md:h-[calc(100vh-260px)] p-2 sm:p-4">
            <div className="h-full max-w-7xl mx-auto">
              {/* Graph Container with white background */}
              <div className="h-full bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
                <NetworkGraph
                  users={data.users}
                  vouches={data.vouches}
                  onNodeClick={handleNodeClick}
                  selectedNode={selectedNode}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] md:h-[calc(100vh-260px)] flex items-center justify-center px-4">
            <div className="text-center bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-12 shadow-xl border border-blue-100">
              <Network size={32} className="mx-auto mb-4 text-gray-400 sm:w-12 sm:h-12" />
              <p className="text-sm sm:text-lg text-gray-700 font-medium">No network data available</p>
            </div>
          </div>
        )}

        {/* User Detail Panel */}
        {selectedNode && userData?.user && (
          <UserDetailPanel
            user={userData.user}
            onClose={handleClosePanel}
            onUserClick={handleNodeClick}
          />
        )}

        {/* Loading overlay for user details */}
        {selectedNode && userLoading && (
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        )}
      </main>

      {/* Legend - Redesigned */}
      <div className="hidden sm:block fixed bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-xl z-40 border border-blue-100 max-w-[calc(100vw-1rem)] sm:max-w-none">
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3 flex items-center">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mr-1.5 sm:mr-2"></div>
          Legend
        </h3>
        <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 border border-yellow-400 sm:border-2 flex-shrink-0"></div>
            <span className="text-gray-700 font-semibold">Bootstrap (Rank 1)</span>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 flex-shrink-0"></div>
            <span className="text-gray-700 font-semibold">Top (Rank 2)</span>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
            <span className="text-gray-700">Good (Rank 3-5)</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-gray-700">Medium Trust (Rank 6-10)</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Low Trust (Rank 11+)</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="w-6 h-0.5 bg-gray-400"></div>
            <span className="text-gray-700">Vouch Direction</span>
          </div>
        </div>
        <div className="hidden sm:block mt-3 pt-3 border-t border-blue-100 text-xs text-gray-600 space-y-1">
          <p className="font-medium text-gray-700">Lower rank # = Higher trust</p>
          <p>Click nodes to view details</p>
          <p>Scroll to zoom, drag to pan</p>
        </div>
      </div>
    </div>
  );
}

