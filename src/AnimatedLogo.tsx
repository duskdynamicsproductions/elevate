import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

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
  const starRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const letters = 'ELEVATE'.split('');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    if (isAnimating) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    setIsAnimating(true);

    const finishNavigation = () => {
      setIsAnimating(false);
      if (to) {
        navigate(to);
      } else if (href && href !== '#') {
        window.location.href = href;
      } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (!starRef.current || lettersRef.current.length === 0) {
      finishNavigation();
      return;
    }

    const starRect = starRef.current.getBoundingClientRect();
    const lastLetter = lettersRef.current[lettersRef.current.length - 1];
    if (!lastLetter) {
      finishNavigation();
      return;
    }

    const lastRect = lastLetter.getBoundingClientRect();
    const targetX = lastRect.left + lastRect.width / 2 - (starRect.left + starRect.width / 2);

    const tl = gsap.timeline({
      onComplete: finishNavigation,
    });

    const jumpDuration = 0.3; // significantly slower bounce
    const totalJumps = letters.length;

    // Linear horizontal movement across the letters
    tl.to(
      starRef.current,
      {
        x: targetX,
        duration: totalJumps * jumpDuration,
        ease: 'none',
      },
      0
    );

    // Bouncing vertical movement and letter squashing
    for (let i = 0; i < totalJumps; i++) {
      const t = i * jumpDuration;
      // Star jumps up
      tl.to(
        starRef.current,
        {
          y: -20,
          duration: jumpDuration / 2,
          ease: 'sine.out',
        },
        t
      );
      // Star lands on letter
      tl.to(
        starRef.current,
        {
          y: 0,
          duration: jumpDuration / 2,
          ease: 'sine.in',
        },
        t + jumpDuration / 2
      );

      const letter = lettersRef.current[i];
      if (letter) {
        // Letter squashes
        tl.to(
          letter,
          {
            scaleY: 0.6,
            scaleX: 1.3,
            y: 2,
            transformOrigin: 'bottom center',
            duration: jumpDuration / 2,
            ease: 'power1.out',
          },
          t + jumpDuration / 2
        );
        // Letter springs back
        tl.to(
          letter,
          {
            scaleY: 1,
            scaleX: 1,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.2, 0.3)',
          },
          t + jumpDuration
        );
      }
    }

    // Big arc back to original position
    const backStart = totalJumps * jumpDuration + 0.1;
    tl.to(
      starRef.current,
      {
        x: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      },
      backStart
    );
    tl.to(
      starRef.current,
      {
        y: -45,
        duration: 0.4,
        ease: 'sine.out',
      },
      backStart
    );
    tl.to(
      starRef.current,
      {
        y: 0,
        duration: 0.4,
        ease: 'sine.in',
      },
      backStart + 0.4
    );
  };

  return (
    <a href={href || to || '#'} onClick={handleClick} className={className} aria-label={ariaLabel}>
      <div ref={starRef} className="z-10 relative">
        <SpinningStar className={starClassName} />
      </div>
      <div className={`${textClassName} flex pointer-events-none`}>
        {letters.map((char, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </div>
    </a>
  );
}
