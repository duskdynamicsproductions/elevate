import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      if (transitionRef.current) {
        // Animate out
        gsap.to(transitionRef.current, {
          opacity: 0,
          y: -16,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            // Update the display location once the exit animation completes
            setDisplayLocation(location);
            
            // Wait for next tick so DOM updates
            requestAnimationFrame(() => {
              if (!transitionRef.current) return;
              window.scrollTo(0, 0); // scroll to top on route change
              gsap.fromTo(transitionRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'all' }
              );
            });
          }
        });
      } else {
        setDisplayLocation(location);
        window.scrollTo(0, 0);
      }
    }
  }, [location, displayLocation]);

  return (
    <div ref={transitionRef}>
      {/* 
        By cloning the children with the key of the current display location,
        we tell React Router to render the specific route that corresponds
        to displayLocation, rather than instantly jumping to the new one.
      */}
      {React.cloneElement(children as React.ReactElement, { location: displayLocation })}
    </div>
  );
}
