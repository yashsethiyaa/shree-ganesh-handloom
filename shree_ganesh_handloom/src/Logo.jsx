import React from 'react';

const Logo = () => {
  return (
    <svg width="180" height="140" viewBox="0 0 400 250">
      <g transform="translate(50,30)">
        <path 
          d="M100,80 C100,60 120,50 140,50 L260,50 C280,50 300,60 300,80" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="3"
        />
        <path 
          d="M80,80 L320,80 L320,120 L80,120 L80,80" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="3"
        />
        <path 
          d="M140,60 C160,55 240,55 260,60" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="2"
        />
        <text 
          x="195" 
          y="150" 
          fontFamily="Baskerville, serif" 
          fontSize="32" 
          fontWeight="bold"
          textAnchor="middle" 
          fill="#000000"
        >
          SHREE GANESH
        </text>
        <text 
          x="192" 
          y="180" 
          fontFamily="Baskerville, serif" 
          fontSize="18" 
          fontWeight="600"
          textAnchor="middle" 
          fill="#000000"
        >
          LUXURY HOME FURNISHING
        </text>
      </g>
    </svg>
  );
};

export default Logo;