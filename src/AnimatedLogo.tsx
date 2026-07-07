import React from 'react';
import { Link } from 'react-router-dom';

function SpinningStar({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 119" fill="none" className={`animate-spin-slow ${className}`}>
      <path d="M0 70.2418H33.8241L9.90981 94.164L24.5755 108.842L48.4969 84.9194V118.755H69.2407V84.9194L93.155 108.842L107.828 94.164L83.9134 70.2418H117.73V49.4913H83.9134L107.828 25.5691L93.155 10.8915L69.2407 34.8137V0.978394H48.4969V34.8137L24.5755 10.8915L9.90981 25.5691L33.8241 49.4913H0V70.2418Z" fill="currentColor" />
    </svg>
  );
}

export function AnimatedLogo({
  className = 'flex items-center gap-2 transition-opacity hover:opacity-80',
  starClassName = 'size-4 text-elevate-orange',
  textClassName = 'text-sm font-bold tracking-widest uppercase text-elevate-paper',
  href,
  to,
  onClick,
  ariaLabel = 'Elevate home'
}: {
  className?: string;
  starClassName?: string;
  textClassName?: string;
  href?: string;
  to?: string;
  onClick?: (e: React.MouseEvent) => void;
  ariaLabel?: string;
}) {
  const content = (
    <>
      <div className="z-10 relative">
        <SpinningStar className={starClassName} />
      </div>
      <div className={`${textClassName} flex pointer-events-none`}>
        ELEVATE
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={className} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href || '#'} onClick={onClick} className={className} aria-label={ariaLabel}>
      {content}
    </a>
  );
}
