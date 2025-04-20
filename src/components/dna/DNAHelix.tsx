import React from 'react';

interface DNAHelixProps {
  className?: string;
  size?: number;
}

const DNAHelix: React.FC<DNAHelixProps> = ({ className = '', size = 200 }) => {
  return (
    <div 
      className={`dna-animation ${className}`} 
      style={{ width: size, height: size }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 10C30 10 20 50 20 50C20 50 30 90 50 90C70 90 80 50 80 50C80 50 70 10 50 10Z"
          stroke="url(#dna-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <circle cx="35" cy="22" r="2" fill="#0D9488" />
        <circle cx="65" cy="32" r="2" fill="#7E22CE" />
        <circle cx="35" cy="42" r="2" fill="#0D9488" />
        <circle cx="65" cy="52" r="2" fill="#7E22CE" />
        <circle cx="35" cy="62" r="2" fill="#0D9488" />
        <circle cx="65" cy="72" r="2" fill="#7E22CE" />
        <circle cx="35" cy="82" r="2" fill="#0D9488" />
        <defs>
          <linearGradient id="dna-gradient" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0D9488" />
            <stop offset="1" stopColor="#7E22CE" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default DNAHelix;