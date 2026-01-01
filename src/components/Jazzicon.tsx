'use client';

import { useMemo } from 'react';

interface JazziconProps {
  address: string;
  size?: number;
  className?: string;
}

// Color palette for jazzicons
const COLORS = [
  '#01888C', // teal
  '#FC7500', // bright orange
  '#034F5D', // dark teal
  '#F73F01', // orange red
  '#FC1960', // magenta
  '#C7144C', // raspberry
  '#F3C100', // yellow
  '#1598F2', // bright blue
  '#2465E1', // blue
  '#F19E02', // orange
  '#00D1B2', // turquoise
  '#7957D5', // purple
  '#FF3860', // red
  '#48C774', // green
  '#3273DC', // royal blue
];

// Simple seedable random number generator
function createRandom(seed: number): () => number {
  return function() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

// Convert address to seed number
function addressToSeed(address: string): number {
  const addr = address.toLowerCase().replace('0x', '');
  let hash = 0;
  for (let i = 0; i < addr.length; i++) {
    const char = addr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate shape data for jazzicon
function generateShapes(random: () => number, size: number) {
  const shapes: Array<{
    color: string;
    transform: string;
    type: 'rect' | 'circle';
  }> = [];
  
  const shapeCount = 4;
  
  for (let i = 0; i < shapeCount; i++) {
    const colorIdx = Math.floor(random() * COLORS.length);
    const color = COLORS[colorIdx];
    
    // Random position and rotation
    const x = (random() * size * 0.6) - (size * 0.3);
    const y = (random() * size * 0.6) - (size * 0.3);
    const rotation = random() * 360;
    const scale = 0.6 + random() * 0.8;
    
    shapes.push({
      color,
      transform: `translate(${size/2 + x}, ${size/2 + y}) rotate(${rotation}) scale(${scale})`,
      type: random() > 0.5 ? 'rect' : 'circle',
    });
  }
  
  return shapes;
}

export default function Jazzicon({ address, size = 40, className = '' }: JazziconProps) {
  const { bgColor, shapes } = useMemo(() => {
    const seed = addressToSeed(address);
    const random = createRandom(seed);
    
    // Background color
    const bgColorIdx = Math.floor(random() * COLORS.length);
    const bgColor = COLORS[bgColorIdx];
    
    // Generate shapes
    const shapes = generateShapes(random, size);
    
    return { bgColor, shapes };
  }, [address, size]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`rounded-full overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {shapes.map((shape, i) => (
        shape.type === 'rect' ? (
          <rect
            key={i}
            x={-size/4}
            y={-size/4}
            width={size/2}
            height={size/2}
            fill={shape.color}
            transform={shape.transform}
          />
        ) : (
          <circle
            key={i}
            cx={0}
            cy={0}
            r={size/4}
            fill={shape.color}
            transform={shape.transform}
          />
        )
      ))}
    </svg>
  );
}

// Generate a static data URL for server-side use
export function generateJazziconDataUrl(address: string, size: number = 40): string {
  const seed = addressToSeed(address);
  const random = createRandom(seed);
  
  const bgColorIdx = Math.floor(random() * COLORS.length);
  const bgColor = COLORS[bgColorIdx];
  const shapes = generateShapes(random, size);
  
  const shapesHtml = shapes.map((shape, i) => {
    if (shape.type === 'rect') {
      return `<rect x="${-size/4}" y="${-size/4}" width="${size/2}" height="${size/2}" fill="${shape.color}" transform="${shape.transform}"/>`;
    }
    return `<circle cx="0" cy="0" r="${size/4}" fill="${shape.color}" transform="${shape.transform}"/>`;
  }).join('');
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="background-color:${bgColor};border-radius:50%">${shapesHtml}</svg>`;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

