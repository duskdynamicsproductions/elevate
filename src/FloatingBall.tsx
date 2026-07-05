import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingBall() {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      // Sine-wave X path + linear Y descent
      const xOffset = Math.sin(progress * Math.PI * 4) * 120;
      const yPos = progress * (window.innerHeight * 0.85);
      gsap.to(ball, { x: xOffset, y: yPos, duration: 0.4, ease: 'power2.out' });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={ballRef}
      className="pointer-events-none fixed left-1/2 top-[8vh] z-40 -translate-x-1/2"
      style={{ willChange: 'transform' }}
    >
      <div className="h-5 w-5 rounded-full border-2 border-elevate-paper/30 bg-transparent" />
    </div>
  );
}
