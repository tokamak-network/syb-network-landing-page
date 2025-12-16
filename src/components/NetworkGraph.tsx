'use client';

import { useEffect, useRef, useState } from 'react';
import { User, Vouch } from '@/types/network';

// Dynamic import to avoid SSR issues
let cytoscape: any = null;
if (typeof window !== 'undefined') {
  cytoscape = require('cytoscape');
}

interface NetworkGraphProps {
  users: User[];
  vouches: Vouch[];
  onNodeClick?: (userId: string) => void;
  selectedNode?: string | null;
  highlightedNodes?: Set<string>;
}

// Tooltip state interface
interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  data: {
    address: string;
    score: number;
    inCount: number;
    outCount: number;
    stakedAmount: string;
  } | null;
}

export default function NetworkGraph({ 
  users, 
  vouches, 
  onNodeClick,
  selectedNode,
  highlightedNodes = new Set()
}: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    data: null
  });

  // Ensure component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current || users.length === 0 || !cytoscape) return;

    setIsLoading(true);

    // Find min and max scores for normalization
    const scores = users.map(u => parseFloat(u.score));
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    // Helper function to normalize score to 0-100
    const normalizeScore = (score: string): number => {
      const scoreNum = parseFloat(score);
      if (maxScore === minScore) return 50; // Default to middle if all scores are the same
      return ((scoreNum - minScore) / (maxScore - minScore)) * 100;
    };

    // Uniform node size - all nodes are the same size
    const NODE_SIZE = 35;

    // Helper function to get color based on normalized score (0-100)
    // Higher score = BETTER trust
    const getScoreColor = (score: string): string => {
      const normalized = normalizeScore(score);
      if (normalized >= 80) return '#10b981'; // Green for very high scores (80-100)
      if (normalized >= 60) return '#3b82f6'; // Blue for high scores (60-80)
      if (normalized >= 40) return '#f59e0b'; // Orange for medium scores (40-60)
      return '#ef4444'; // Red for lower scores (0-40)
    };

    // Prepare nodes - uniform size, no special borders
    const nodes = users.map(user => ({
      data: {
        id: user.id,
        label: `${user.id.substring(0, 6)}...${user.id.substring(38)}`,
        fullAddress: user.id,
        score: user.score,
        normalizedScore: normalizeScore(user.score),
        isBootstrapNode: user.isBootstrapNode,
        hasMinimumStake: user.hasMinimumStake,
        stakedAmount: user.stakedAmount,
        inCount: user.inCount,
        outCount: user.outCount,
        size: NODE_SIZE,
        color: getScoreColor(user.score)
      }
    }));

    // Prepare edges - deduplicate by source-target pair
    // First, let's check for duplicates
    const edgeMap = new Map<string, typeof vouches[0]>();
    const duplicates: string[] = [];
    
    vouches.forEach(vouch => {
      const edgeKey = `${vouch.from.id}->${vouch.to.id}`;
      if (edgeMap.has(edgeKey)) {
        duplicates.push(edgeKey);
        console.warn(`Duplicate vouch found: ${edgeKey}`, {
          existing: edgeMap.get(edgeKey),
          duplicate: vouch
        });
      } else {
        edgeMap.set(edgeKey, vouch);
      }
    });
    
    if (duplicates.length > 0) {
      console.warn(`Found ${duplicates.length} duplicate vouches:`, duplicates);
    }
    
    // Use deduplicated edges
    const edges = Array.from(edgeMap.values()).map(vouch => ({
      data: {
        id: vouch.id,
        source: vouch.from.id,
        target: vouch.to.id,
        blockTimestamp: vouch.blockTimestamp
      }
    }));

    // Initialize Cytoscape
    const cy = cytoscape({
      container: containerRef.current,
      elements: {
        nodes,
        edges
      },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label': 'data(label)',
            'width': 'data(size)',
            'height': 'data(size)',
            'font-size': '9px',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#1f2937',
            'text-outline-color': '#ffffff',
            'text-outline-width': 2,
            'overlay-padding': '6px',
            'z-index': 10,
            'font-weight': 600,
            'border-width': 0
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#8b5cf6',
            'border-style': 'solid',
            'z-index': 20
          }
        },
        {
          selector: 'node.highlighted',
          style: {
            'border-width': 3,
            'border-color': '#06b6d4',
            'border-style': 'dashed'
          }
        },
        {
          selector: 'node.hovered',
          style: {
            'border-width': 3,
            'border-color': '#64748b',
            'border-style': 'solid',
            'z-index': 25
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#cbd5e1',
            'target-arrow-color': '#cbd5e1',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1,
            'opacity': 0.7
          }
        },
        {
          selector: 'edge.highlighted',
          style: {
            'width': 3,
            'line-color': '#06b6d4',
            'target-arrow-color': '#06b6d4',
            'opacity': 1,
            'z-index': 15
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: true,
        animationDuration: 1000,
        nodeRepulsion: 8000,
        idealEdgeLength: 100,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0
      },
      minZoom: 0.1,
      maxZoom: 3,
      wheelSensitivity: 0.2
    });

    cyRef.current = cy;

    // Add click handler
    cy.on('tap', 'node', (event: any) => {
      const node = event.target;
      const userId = node.data('id');
      if (onNodeClick) {
        onNodeClick(userId);
      }
    });

    // Add hover tooltips with floating card
    cy.on('mouseover', 'node', (event: any) => {
      const node = event.target;
      const data = node.data();
      
      // Add hover class for visual feedback
      node.addClass('hovered');
      
      // Get position relative to the container
      const containerRect = containerRef.current?.getBoundingClientRect();
      const renderedPosition = node.renderedPosition();
      
      if (containerRect) {
        setTooltip({
          visible: true,
          x: renderedPosition.x,
          y: renderedPosition.y - (data.size / 2) - 10, // Position above the node
          data: {
            address: data.fullAddress,
            score: data.normalizedScore,
            inCount: data.inCount,
            outCount: data.outCount,
            stakedAmount: data.stakedAmount
          }
        });
      }
    });

    cy.on('mouseout', 'node', (event: any) => {
      const node = event.target;
      node.removeClass('hovered');
      setTooltip(prev => ({ ...prev, visible: false }));
    });
    
    // Hide tooltip when panning/zooming
    cy.on('pan zoom', () => {
      setTooltip(prev => ({ ...prev, visible: false }));
    });

    setIsLoading(false);

    // Cleanup
    return () => {
      if (cy) {
        cy.destroy();
      }
    };
  }, [users, vouches, onNodeClick, isMounted]);

  // Update selection highlight
  useEffect(() => {
    if (!isMounted || !cyRef.current) return;

    const cy = cyRef.current;
    
    // If no node is selected, clear all highlights
    if (!selectedNode) {
      cy.elements().removeClass('highlighted');
      cy.nodes().unselect();
      cy.style().update();
      return;
    }
    
    // Function to highlight the selected node and its connections
    const highlightNode = () => {
      // Remove all selections and highlights
      cy.elements().removeClass('highlighted');
      cy.nodes().unselect();

      // Select the clicked node
      const node = cy.getElementById(selectedNode);
      if (node.length > 0) {
        node.select();

        // Highlight neighbors (connected nodes and edges)
        const neighbors = node.neighborhood();
        neighbors.addClass('highlighted');
        
        // Force immediate style update
        cy.style().update();
        
        // No zoom animation - keep graph static
      }
    };

    // Execute immediately and ensure it happens after render
    highlightNode();
    requestAnimationFrame(() => highlightNode());
  }, [selectedNode, isMounted]);

  // Update highlighted nodes
  useEffect(() => {
    if (!isMounted || !cyRef.current) return;

    const cy = cyRef.current;
    cy.nodes().removeClass('highlighted');

    highlightedNodes.forEach(nodeId => {
      const node = cy.getElementById(nodeId);
      if (node.length > 0) {
        node.addClass('highlighted');
      }
    });
  }, [highlightedNodes]);

  if (!isMounted) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-2xl">
          <div className="text-gray-700 text-lg font-medium">Initializing...</div>
        </div>
        <div 
          className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl"
          style={{ minHeight: '600px' }}
        />
      </div>
    );
  }

  // Helper function to format address for tooltip
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  };

  // Helper function to format staked amount
  const formatStakedAmount = (amount: string): string => {
    const amountNum = parseFloat(amount);
    if (amountNum === 0) return '0';
    const wton = amountNum / 1e27;
    if (wton < 0.0001) return wton.toExponential(2);
    return wton.toFixed(4);
  };

  // Helper function to get score color class
  const getScoreColorClass = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Helper function to get score label
  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Very High';
    if (score >= 60) return 'High';
    if (score >= 40) return 'Medium';
    return 'Building';
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10 rounded-2xl">
          <div className="text-gray-700 text-lg font-medium">Loading network graph...</div>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl"
        style={{ minHeight: '600px' }}
      />
      
      {/* Floating Tooltip Card */}
      {tooltip.visible && tooltip.data && (
        <div
          className="absolute pointer-events-none z-50 transition-opacity duration-150"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            opacity: tooltip.visible ? 1 : 0
          }}
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-3 min-w-[200px]">
            {/* Address */}
            <div className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2 text-center">
              {formatAddress(tooltip.data.address)}
            </div>
            
            {/* Trust Score */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Trust Score</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${getScoreColorClass(tooltip.data.score)}`}></span>
                <span className="text-sm font-bold text-gray-800">
                  {tooltip.data.score.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">/100</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  tooltip.data.score >= 80 ? 'bg-green-100 text-green-700' :
                  tooltip.data.score >= 60 ? 'bg-blue-100 text-blue-700' :
                  tooltip.data.score >= 40 ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {getScoreLabel(tooltip.data.score)}
                </span>
              </div>
            </div>
            
            {/* Vouches */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Vouches</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  <span className="text-blue-600 font-medium">↓ {tooltip.data.inCount}</span>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-purple-600 font-medium">↑ {tooltip.data.outCount}</span>
                </span>
              </div>
            </div>
            
            {/* Staked Amount */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Staked</span>
              <span className="text-xs font-medium text-gray-700">
                {formatStakedAmount(tooltip.data.stakedAmount)} WTON
              </span>
            </div>
            
            {/* Click hint */}
            <div className="mt-2 pt-2 border-t border-gray-100 text-center">
              <span className="text-[10px] text-gray-400">Click for full details</span>
            </div>
          </div>
          
          {/* Tooltip arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white drop-shadow-sm"></div>
          </div>
        </div>
      )}
    </div>
  );
}

