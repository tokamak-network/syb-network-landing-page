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

    // Helper function to calculate node size based on score
    const getNodeSize = (score: string): number => {
      const scoreNum = parseFloat(score);
      return Math.max(20, Math.min(60, 20 + Math.log(scoreNum + 1) * 5));
    };

    // Helper function to get color based on rank
    // Lower rank number = BETTER (rank 1 is best, higher numbers are worse)
    const getRankColor = (rank: string): string => {
      const rankNum = parseInt(rank);
      if (rankNum <= 2) return '#10b981'; // Green for TOP ranks (1-2) - BEST! (Bootstrap is rank 1)
      if (rankNum <= 5) return '#3b82f6'; // Blue for good ranks (3-5)
      if (rankNum <= 10) return '#f59e0b'; // Orange for medium ranks (6-10)
      return '#ef4444'; // Red for poor ranks (11+) - needs improvement
    };

    // Prepare nodes
    const nodes = users.map(user => ({
      data: {
        id: user.id,
        label: `${user.id.substring(0, 6)}...${user.id.substring(38)}`,
        fullAddress: user.id,
        rank: user.rank,
        score: user.score,
        isBootstrapNode: user.isBootstrapNode,
        inCount: user.inCount,
        outCount: user.outCount,
        size: getNodeSize(user.score),
        color: getRankColor(user.rank)
      }
    }));

    // Prepare edges
    const edges = vouches.map(vouch => ({
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
      node.style({
        'label': `${data.fullAddress}\nRank: ${data.rank} | Score: ${parseFloat(data.score).toFixed(2)}\nIn: ${data.inCount} | Out: ${data.outCount}`
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
    if (!isMounted || !cyRef.current || !selectedNode) return;

    const cy = cyRef.current;
    
    // Remove all selections and highlights
    cy.elements().removeClass('highlighted');
    cy.nodes().unselect();

    // Select the clicked node
    const node = cy.getElementById(selectedNode);
    if (node.length > 0) {
      node.select();

      // Highlight neighbors
      const neighbors = node.neighborhood();
      neighbors.addClass('highlighted');

      // Get current zoom level
      const currentZoom = cy.zoom();
      
      // Calculate target zoom (zoom in more if already zoomed)
      const targetZoom = Math.min(currentZoom * 1.5, 2.5); // Max 2.5x zoom

      // Fit the selected node and its neighbors in view with padding
      cy.animate({
        fit: {
          eles: node.union(neighbors),
          padding: 100
        },
        duration: 600,
        easing: 'ease-in-out-cubic'
      });

      // Then zoom in a bit more to focus on the node
      setTimeout(() => {
        cy.animate({
          center: { eles: node },
          zoom: targetZoom,
          duration: 400,
          easing: 'ease-out'
        });
      }, 650);
    }
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

