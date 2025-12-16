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

    // Helper function to calculate node size based on normalized score
    const getNodeSize = (score: string): number => {
      const normalized = normalizeScore(score);
      return Math.max(20, Math.min(60, 20 + (normalized / 100) * 40));
    };

    // Helper function to get color based on normalized score (0-100)
    // Higher score = BETTER trust
    const getScoreColor = (score: string): string => {
      const normalized = normalizeScore(score);
      if (normalized >= 80) return '#10b981'; // Green for very high scores (80-100)
      if (normalized >= 60) return '#3b82f6'; // Blue for high scores (60-80)
      if (normalized >= 40) return '#f59e0b'; // Orange for medium scores (40-60)
      return '#ef4444'; // Red for lower scores (0-40)
    };

    // Prepare nodes
    const nodes = users.map(user => ({
      data: {
        id: user.id,
        label: `${user.id.substring(0, 6)}...${user.id.substring(38)}`,
        fullAddress: user.id,
        score: user.score,
        isBootstrapNode: user.isBootstrapNode,
        hasMinimumStake: user.hasMinimumStake,
        stakedAmount: user.stakedAmount,
        inCount: user.inCount,
        outCount: user.outCount,
        size: getNodeSize(user.score),
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
            'font-size': '10px',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#1f2937',
            'text-outline-color': '#ffffff',
            'text-outline-width': 2,
            'overlay-padding': '6px',
            'z-index': 10,
            'font-weight': 600
          }
        },
        {
          selector: 'node[isBootstrapNode = true]',
          style: {
            'border-width': 4,
            'border-color': '#fbbf24',
            'border-style': 'solid'
          }
        },
        {
          selector: 'node[hasMinimumStake = true]',
          style: {
            'border-width': 3,
            'border-color': '#10b981',
            'border-style': 'double'
          }
        },
        {
          selector: 'node[isBootstrapNode = true][hasMinimumStake = true]',
          style: {
            'border-width': 4,
            'border-color': '#fbbf24',
            'border-style': 'solid'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 5,
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

    // Add hover tooltips
    cy.on('mouseover', 'node', (event: any) => {
      const node = event.target;
      const data = node.data();
      const normalized = normalizeScore(data.score);
      const stakedWton = (parseFloat(data.stakedAmount) / 1e27).toFixed(4);
      const stakeStatus = data.hasMinimumStake ? '✓ Staked' : '✗ Not Staked';
      node.style({
        'label': `${data.fullAddress}\nScore: ${normalized.toFixed(1)}/100\nIn: ${data.inCount} | Out: ${data.outCount}\n${stakeStatus} (${stakedWton} WTON)`
      });
    });

    cy.on('mouseout', 'node', (event: any) => {
      const node = event.target;
      node.style({
        'label': node.data('label')
      });
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
    </div>
  );
}

