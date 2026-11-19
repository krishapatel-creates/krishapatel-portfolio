import React from 'react';

interface CircularStampProps {
  variant?: 'on-navy' | 'on-light';
  className?: string;
}

export const CircularStamp: React.FC<CircularStampProps> = ({
  variant = 'on-navy',
  className = '',
}) => {
  const strokeColor = variant === 'on-navy' ? '#2E5280' : '#94A3B8';

  return (
    <svg
      viewBox="0 0 180 180"
      aria-hidden="true"
      className={`animate-stamp-spin pointer-events-none select-none ${className}`}
    >
      <defs>
        <path
          id={`stamp-path-${variant}`}
          d="M 90, 90 m -66, 0 a 66,66 0 1,1 132,0 a 66,66 0 1,1 -132,0"
        />
      </defs>
      <text
        fill={strokeColor}
        fontSize="10"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="600"
        letterSpacing="2.4"
      >
        <textPath href={`#stamp-path-${variant}`} startOffset="0%">
          IT&apos;S NOT JUST BUILDING · IT&apos;S VIBING WITH VISUALS ·
        </textPath>
      </text>
    </svg>
  );
};
