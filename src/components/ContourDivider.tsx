export interface ContourDividerProps {
  fill?: string;
  className?: string;
  direction?: 'up' | 'down';
}

export function ContourDivider({ fill = '#0C0B0B', className = '', direction = 'down' }: ContourDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-0 h-[40px] md:h-[60px] lg:h-[80px] ${className}`} style={{ transform: direction === 'up' ? 'scaleY(-1)' : 'none' }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 block w-full h-[40px] md:h-[60px] lg:h-[80px]"
      >
        <path
          d="M0 120 L0 0 L15.5 35.6 L34.7 9.8 L61.2 41 L89.4 5 L118.2 44.5 L144.3 12.3 L174.5 49 L198.8 19 L225.4 53.7 L248.1 27 L281.3 62 L301.7 32.5 L334.4 71 L360.2 40 L388.9 76 L409.1 48.5 L433.8 82.3 L458.2 55.4 L492.7 91.5 L516.4 63.8 L544.1 98 L568.9 72.3 L599.5 106 L621.8 79 L648.7 110.4 L671.2 84 L698.8 113.6 L720.5 88.5 L751.3 116.7 L773.8 93 L802.1 118 L825.4 97.4 L851.6 119 L872.2 101 L898.3 118 L918.5 102.5 L948.8 115 L969.4 102.5 L999.7 110.8 L1020.2 100 L1051.1 106.3 L1073.4 97 L1103.5 101 L1125.7 92.5 L1155.8 96 L1177.2 88 L1200 90 L1200 120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
