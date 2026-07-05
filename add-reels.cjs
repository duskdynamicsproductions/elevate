const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const componentCode = `
function ReelsScrolledAnimation() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentCount = 0;
    let timeout: NodeJS.Timeout;

    const swipe = () => {
      currentCount++;
      setCount(currentCount);
      
      // Animate track up by one screen height (580px)
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          y: -currentCount * 580,
          duration: 0.35,
          ease: 'power3.inOut'
        });
      }

      // If we reach near the end, stop (unlikely in short view time)
      if (currentCount < 80) {
        timeout = setTimeout(swipe, 600 + Math.random() * 800);
      }
    };

    timeout = setTimeout(swipe, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Generate 100 fake reels with distinct gradients
  const reels = useMemo(() => {
    const gradients = [
      'bg-gradient-to-br from-indigo-500 to-purple-800',
      'bg-gradient-to-bl from-rose-500 to-red-800',
      'bg-gradient-to-tr from-emerald-500 to-teal-800',
      'bg-gradient-to-br from-blue-500 to-indigo-800',
      'bg-gradient-to-b from-amber-500 to-orange-700',
      'bg-gradient-to-br from-fuchsia-500 to-pink-800',
      'bg-gradient-to-tl from-cyan-500 to-blue-800',
      'bg-gradient-to-br from-violet-500 to-purple-900',
    ];
    return Array.from({ length: 100 }).map((_, i) => gradients[i % gradients.length]); // Cycle them so neighbors aren't same
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      
      {/* Mobile Phone Mockup */}
      <div className="relative w-[280px] h-[580px] rounded-[3rem] border-[10px] border-[#0d0d12] bg-[#050508] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-30 shadow-sm" />
        
        {/* Top Counter Overlay */}
        <div className="absolute top-12 left-0 w-full flex justify-center z-30">
          <div className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/5 shadow-2xl">
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1">Reels Scrolled</span>
            <span className="text-5xl font-black text-white tabular-nums leading-none tracking-tighter">{count}</span>
          </div>
        </div>

        {/* Scrolling Reels Track */}
        <div ref={trackRef} className="absolute inset-x-0 top-0 flex flex-col will-change-transform z-10">
          {reels.map((grad, i) => (
            <div key={i} className={\`w-full h-[580px] shrink-0 relative \${grad}\`}>
              
              {/* Fake UI Overlay for each reel */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
              
              {/* Fake Caption */}
              <div className="absolute bottom-6 left-4 space-y-3 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md" />
                  <div className="w-24 h-3 rounded-full bg-white/60" />
                </div>
                <div className="w-48 h-2 rounded-full bg-white/30" />
                <div className="w-32 h-2 rounded-full bg-white/30" />
              </div>
              
              {/* Fake Side Icons */}
              <div className="absolute bottom-12 right-3 flex flex-col gap-6 items-center z-20">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">♥</div>
                  <div className="w-6 h-1.5 rounded-full bg-white/30" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">💬</div>
                  <div className="w-6 h-1.5 rounded-full bg-white/30" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">↗</div>
                  <div className="w-6 h-1.5 rounded-full bg-white/30" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

if (!content.includes('function ReelsScrolledAnimation')) {
  content = content.replace('function HorizontalFeatures() {', componentCode + '\nfunction HorizontalFeatures() {');
}

const renderTarget = `{feat.num === '02' && <AppLimitNotification />}`;
if (content.includes(renderTarget) && !content.includes('<ReelsScrolledAnimation />')) {
  const replacement = `{feat.num === '02' && <AppLimitNotification />}
            {/* REELS SCROLLED */}
            {feat.num === '03' && <ReelsScrolledAnimation />}`;
  content = content.replace(renderTarget, replacement);
}

// Add useMemo import if missing
if (!content.includes('useMemo')) {
  content = content.replace('import React, { useEffect, useRef, useState } from', 'import React, { useEffect, useRef, useState, useMemo } from');
  // Handle alternative import style
  content = content.replace('import { useEffect, useRef, useState } from', 'import { useEffect, useRef, useState, useMemo } from');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added ReelsScrolledAnimation');
