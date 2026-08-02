import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

type MagneticWrapperProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // magnetic pull intensity (0.1 to 0.6)
  range?: number; // attraction radius in px
};

export function MagneticWrapper({
  children,
  className = '',
  strength = 0.35,
  range = 80,
}: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < range + Math.max(rect.width, rect.height) / 2) {
        gsap.to(container, {
          x: distX * strength,
          y: distY * strength,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(container, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(container, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isMobile, strength, range]);

  return (
    <div
      ref={containerRef}
      className={`inline-block transition-transform duration-100 will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
