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

  return (
    <>
      <div style={{ backgroundColor: '#FF6200', color: '#0C0B0B', padding: '12px 20px', textAlign: 'center', zIndex: 99999, position: 'relative', width: '100%' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 4px 0', textTransform: 'none' }}>Elevate</h1>
        <p style={{ fontSize: '14px', margin: 0, fontWeight: '500' }}>Elevate is a comprehensive male wellness application designed to optimize your physical fitness and mental wellness journey. We request Google Login to securely save and sync your fitness progress.</p>
      </div>
      {isMobile ? <AppMobile /> : <AppDesktop />}
    </>
  );
}
