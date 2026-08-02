import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

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
    if (isMobile) return;

    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    // quickTo for dot (1:1 smooth tracking, very fast response)
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

    // quickTo for label (springy lag)
    const xLabelTo = gsap.quickTo(label, "x", { duration: 0.4, ease: "power3.out" });
    const yLabelTo = gsap.quickTo(label, "y", { duration: 0.4, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xLabelTo(e.clientX);
      yLabelTo(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover listeners for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      let text = target.getAttribute('data-cursor');
      
      if (!text) {
        if (target.tagName === 'A' || target.closest('a')) text = 'GO';
        else if (target.tagName === 'BUTTON' || target.closest('button')) text = 'SELECT';
        else text = 'VIEW';
      }

      setCursorText(text);

      gsap.to(label, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(1.5)'
      });
      gsap.to(dot, {
        scale: 0.2,
        opacity: 0,
        duration: 0.2
      });
    };

    const handleElementLeave = () => {
      gsap.to(label, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => setCursorText('')
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.3
      });
    };

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor], input, textarea, select');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover as EventListener);
        el.removeEventListener('mouseleave', handleElementLeave as EventListener);
        el.addEventListener('mouseenter', handleElementHover as EventListener);
        el.addEventListener('mouseleave', handleElementLeave as EventListener);
      });
    };

    attachHoverListeners();

    // DOM Observer to re-attach hover listeners on route changes
    const observer = new MutationObserver((mutations) => {
      let shouldReattach = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) shouldReattach = true;
      }
      if (shouldReattach) attachHoverListeners();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    // Handle mouse leaving/entering window
    const onMouseLeaveWindow = () => setIsVisible(false);
    const onMouseEnterWindow = () => setIsVisible(true);
    
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      observer.disconnect();
    };
  }, [isMobile, isVisible]);

  const location = useLocation();

  useEffect(() => {
    if (labelRef.current && dotRef.current && !isMobile) {
      setCursorText('');
      gsap.to(labelRef.current, { scale: 0.8, opacity: 0, duration: 0.2 });
      gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    }
  }, [location.pathname, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Precision Core Dot (mix-blend-mode: difference to always be visible) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] -ml-1 -mt-1 h-2 w-2 rounded-full bg-white transition-opacity duration-300"
        style={{ 
          willChange: 'transform',
          mixBlendMode: 'difference',
          opacity: isVisible ? 1 : 0
        }}
      />

      {/* Lagging text label container */}
      <div
        ref={labelRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center transition-opacity duration-300"
        style={{ 
          willChange: 'transform',
          opacity: 0, // Hidden by default, shown via GSAP on hover
          transform: 'translate(-50%, -50%) scale(0.8)', // initial center offset & scale
          display: cursorText ? 'flex' : 'none'
        }}
      >
        <div className="flex h-10 items-center justify-center rounded-full bg-elevate-orange px-4 py-2 text-elevate-black shadow-[0_0_15px_rgba(255,98,0,0.3)]">
          <span
            ref={textRef}
            className="font-['Space_Mono',monospace] text-[11px] font-bold tracking-[0.2em] uppercase"
          >
            {cursorText}
          </span>
        </div>
      </div>
    </>
  );
}
