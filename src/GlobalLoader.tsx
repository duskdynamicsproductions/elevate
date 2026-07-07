import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

function SpinningStar({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 119" fill="none" className={className}>
      <path d="M0 70.2418H33.8241L9.90981 94.164L24.5755 108.842L48.4969 84.9194V118.755H69.2407V84.9194L93.155 108.842L107.828 94.164L83.9134 70.2418H117.73V49.4913H83.9134L107.828 25.5691L93.155 10.8915L69.2407 34.8137V0.978394H48.4969V34.8137L24.5755 10.8915L9.90981 25.5691L33.8241 49.4913H0V70.2418Z" fill="currentColor" />
    </svg>
  );
}

export function GlobalLoader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  
  const starRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  let shouldShow = loading;
  let currentFading = fading;

  // Synchronously intercept route changes BEFORE paint
  if (prevPath.current !== location.pathname) {
    prevPath.current = location.pathname;
    setLoading(true);
    setFading(false);
    shouldShow = true; 
    currentFading = false;
    
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.style.scrollBehavior = '';
  }

  useEffect(() => {
    if (!shouldShow) return;

    let tl: gsap.core.Timeline | null = null;
    const letters = 'ELEVATE'.split('');

    const startAnimation = () => {
      if (!starRef.current || lettersRef.current.length === 0) return;

      const starRect = starRef.current.getBoundingClientRect();
      const lastLetter = lettersRef.current[lettersRef.current.length - 1];
      if (!lastLetter) return;

      const lastRect = lastLetter.getBoundingClientRect();
      const targetX = lastRect.left + lastRect.width / 2 - (starRect.left + starRect.width / 2);

      tl = gsap.timeline({
        onComplete: () => {
            // Once the animation completely finishes, trigger the fade out
            setFading(true);
            setTimeout(() => setLoading(false), 500);
        }
      });

      const jumpDuration = 0.45; // 50% slower bounce
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
        tl.to(starRef.current, { y: -30, duration: jumpDuration / 2, ease: 'sine.out' }, t);
        // Star lands on letter
        tl.to(starRef.current, { y: 0, duration: jumpDuration / 2, ease: 'sine.in' }, t + jumpDuration / 2);

        const letter = lettersRef.current[i];
        if (letter) {
          // Letter squashes
          tl.to(letter, { scaleY: 0.6, scaleX: 1.3, transformOrigin: 'bottom center', duration: jumpDuration / 2, ease: 'power1.out' }, t + jumpDuration / 2);
          // Letter springs back
          tl.to(letter, { scaleY: 1, scaleX: 1, duration: 0.9, ease: 'elastic.out(1.2, 0.3)' }, t + jumpDuration);
        }
      }

      // Big arc back to original position
      const backStart = totalJumps * jumpDuration + 0.1;
      tl.to(starRef.current, { x: 0, duration: 1.2, ease: 'power2.inOut' }, backStart);
      tl.to(starRef.current, { y: -65, duration: 0.6, ease: 'sine.out' }, backStart);
      tl.to(starRef.current, { y: 0, duration: 0.6, ease: 'sine.in' }, backStart + 0.6);
    };

    // Small delay to ensure DOM is ready and painted before measuring bounding rects
    const timer = setTimeout(startAnimation, 50);

    return () => {
      clearTimeout(timer);
      if (tl) tl.kill();
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-elevate-black transition-opacity duration-500 ${currentFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex items-center gap-4">
        <div ref={starRef} className="z-10 relative">
          <SpinningStar className="size-8 text-elevate-orange animate-spin-slow" />
        </div>
        <div className="text-4xl font-black tracking-tight flex text-elevate-paper">
          {'ELEVATE'.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="inline-block"
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
