import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

  useEffect(() => {
    // Show loader on route change immediately
    setLoading(true);
    setFading(false);
    
    // Scroll to top instantly before the new page renders, hiding the flash of the scrolled page
    window.scrollTo(0, 0);

    const finish = () => {
      setFading(true);
      setTimeout(() => setLoading(false), 500); // 500ms fade out transition
    };

    if (document.readyState === 'complete') {
      // If the document is loaded (like on route changes or fast reloads), wait 800ms so the loader is visible
      setTimeout(finish, 800); 
    } else {
      const onWindowLoad = () => setTimeout(finish, 800);
      window.addEventListener('load', onWindowLoad);
      return () => window.removeEventListener('load', onWindowLoad);
    }
    
    // Safety fallback
    const fallback = setTimeout(() => {
      setFading(true);
      setTimeout(() => setLoading(false), 500);
    }, 3000);
    return () => clearTimeout(fallback);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-elevate-black transition-opacity duration-500 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center">
        {/* Bouncing container */}
        <div className="animate-bounce-realistic origin-bottom">
          {/* Squash and stretch container */}
          <div className="animate-squash-stretch origin-bottom">
            {/* Spinning star */}
            <SpinningStar className="size-16 text-elevate-orange animate-spin-slow" />
          </div>
        </div>
        
        {/* Surface Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-[100%] bg-black animate-shadow-pulse blur-[2px]" />
      </div>
    </div>
  );
}
