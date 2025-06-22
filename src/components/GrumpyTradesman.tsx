import React from 'react';

interface GrumpyTradesmanProps {
  className?: string;
}

export default function GrumpyTradesman({ className = "" }: GrumpyTradesmanProps) {
  return (
    <div className={`${className}`}>
      <svg 
        width="120" 
        height="120" 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Hard hat */}
        <ellipse cx="60" cy="35" rx="28" ry="15" fill="#FFD700" stroke="#E6C200" strokeWidth="2"/>
        <rect x="50" y="20" width="20" height="8" rx="4" fill="#FF4444"/>
        
        {/* Face */}
        <circle cx="60" cy="55" r="25" fill="#FFDBAC" stroke="#E6C7A0" strokeWidth="2"/>
        
        {/* Angry eyebrows */}
        <path d="M45 45 L55 50" stroke="#8B4513" strokeWidth="3" strokeLinecap="round"/>
        <path d="M75 45 L65 50" stroke="#8B4513" strokeWidth="3" strokeLinecap="round"/>
        
        {/* Eyes */}
        <circle cx="52" cy="52" r="3" fill="#000"/>
        <circle cx="68" cy="52" r="3" fill="#000"/>
        
        {/* Grumpy mouth */}
        <path d="M52 65 Q60 60 68 65" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Stubble */}
        <circle cx="50" cy="62" r="0.5" fill="#8B4513"/>
        <circle cx="53" cy="65" r="0.5" fill="#8B4513"/>
        <circle cx="67" cy="65" r="0.5" fill="#8B4513"/>
        <circle cx="70" cy="62" r="0.5" fill="#8B4513"/>
        
        {/* Body/overalls */}
        <rect x="40" y="75" width="40" height="35" rx="5" fill="#4169E1" stroke="#2E4BC7" strokeWidth="2"/>
        
        {/* Overall straps */}
        <rect x="48" y="75" width="4" height="20" fill="#2E4BC7"/>
        <rect x="68" y="75" width="4" height="20" fill="#2E4BC7"/>
        
        {/* Tool belt */}
        <rect x="35" y="85" width="50" height="8" rx="2" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
        
        {/* Hammer in belt */}
        <rect x="70" y="87" width="8" height="4" rx="1" fill="#C0C0C0"/>
        <rect x="78" y="85" width="3" height="8" rx="1" fill="#8B4513"/>
        
        {/* Arms */}
        <ellipse cx="30" cy="90" rx="8" ry="15" fill="#FFDBAC" stroke="#E6C7A0" strokeWidth="2"/>
        <ellipse cx="90" cy="90" rx="8" ry="15" fill="#FFDBAC" stroke="#E6C7A0" strokeWidth="2"/>
        
        {/* Crossed arms pose (grumpy) */}
        <ellipse cx="45" cy="85" rx="12" ry="6" fill="#4169E1" stroke="#2E4BC7" strokeWidth="2" transform="rotate(-20 45 85)"/>
        <ellipse cx="75" cy="85" rx="12" ry="6" fill="#4169E1" stroke="#2E4BC7" strokeWidth="2" transform="rotate(20 75 85)"/>
        
        {/* Speech bubble with grumpy text */}
        <g className="animate-pulse">
          <ellipse cx="95" cy="25" rx="20" ry="12" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2"/>
          <path d="M80 30 L85 35 L85 25 Z" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2"/>
          <text x="95" y="28" textAnchor="middle" fontSize="8" fill="#333" fontFamily="monospace" fontWeight="bold">
            FFS!
          </text>
        </g>
      </svg>
    </div>
  );
} 