import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(window.innerWidth <= 1024 || hasMobileUA);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || isMobile) return;

    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0.05, ease: 'none' });
    };

    window.addEventListener('mousemove', onMove);

    const onEnter = () => gsap.to(dot, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
    const onLeave = () => gsap.to(dot, { scale: 1,   duration: 0.3, ease: 'power2.out' });

    const attach = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attach();

    // Re-attach on route change (DOM mutations)
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
    };
  }, []);

  if (isMobile) return null;

  return (
    <div ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-elevate-paper mix-blend-difference"
      style={{ willChange: 'transform' }} />
  );
}
