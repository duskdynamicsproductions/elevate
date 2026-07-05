import { useState, useEffect } from 'react';
import AppDesktop from './AppDesktop';
import AppMobile from './AppMobile';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const hasMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(window.innerWidth <= 1024 || hasMobileUA);
    };
    
    // Initial check
    checkMobile();
    setMounted(true);
    
    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent hydration mismatch or flash of wrong content by not rendering until mounted
  if (!mounted) return null;

  if (isMobile) {
    return <AppMobile />;
  }

  return <AppDesktop />;
}
