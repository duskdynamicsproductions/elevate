const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const componentCode = `
function NsfwDetoxAnimation() {
  const screenRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      // --- SCENARIO 1: Browser Search ---
      // Reset to browser view
      tl.set('.nsfw-browser', { opacity: 1, zIndex: 10 });
      tl.set('.nsfw-reels', { opacity: 0, zIndex: 0 });
      tl.set('.nsfw-block', { opacity: 0, zIndex: 20 });
      tl.set('.nsfw-search-text', { width: 0 });
      tl.set('.nsfw-incognito', { opacity: 0, scale: 0.8 });

      // Enter incognito
      tl.to('.nsfw-incognito', { opacity: 1, scale: 1, duration: 0.4, delay: 0.5, ease: 'back.out(1.5)' });
      
      // Type "bad videos"
      tl.to('.nsfw-search-text', { width: '100%', duration: 1, delay: 0.5, ease: 'steps(10)' });
      
      // Hit enter (slight pause)
      tl.to({}, { duration: 0.3 });

      // BAM! Blocked
      tl.set('.nsfw-block', { opacity: 1 });
      tl.fromTo('.nsfw-block-content', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }
      );

      // Hold block screen
      tl.to({}, { duration: 2 });

      // --- SCENARIO 2: Reels Scrolling ---
      // Reset for reels
      tl.set('.nsfw-block', { opacity: 0 });
      tl.set('.nsfw-browser', { opacity: 0, zIndex: 0 });
      tl.set('.nsfw-reels', { opacity: 1, zIndex: 10, y: 0 });
      
      // Normal reel (blue)
      tl.to({}, { duration: 0.8 });
      
      // Swipe to next reel (suggestive silhouette)
      tl.to('.nsfw-reels-container', { y: -580, duration: 0.4, ease: 'power3.inOut' });
      
      // Pause slightly on the silhouette
      tl.to({}, { duration: 0.4 });

      // BAM! Blocked again
      tl.set('.nsfw-block', { opacity: 1 });
      tl.fromTo('.nsfw-block-content', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }
      );

      // Hold block screen
      tl.to({}, { duration: 2 });
      
      // Reset for next loop
      tl.set('.nsfw-block', { opacity: 0 });
      tl.set('.nsfw-reels-container', { y: 0 });

    }, screenRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      {/* Mobile Phone Mockup */}
      <div className="relative mt-20 w-[280px] h-[580px] rounded-[3rem] border-[10px] border-[#0d0d12] bg-[#050508] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden" ref={screenRef}>
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-30 shadow-sm" />

        {/* =========================================
            SCENARIO 1: BROWSER 
           ========================================= */}
        <div className="nsfw-browser absolute inset-0 bg-[#121212] flex flex-col pt-14 px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-6 h-6 rounded-full bg-white/10" />
            <div className="nsfw-incognito flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full border border-gray-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                <path d="M22 17.5L22 12C22 8 18 6 12 6C6 6 2 8 2 12V17.5M15 21.5C17.5 21.5 20 19.5 20 17.5C20 15.5 17.5 13.5 15 13.5C12.5 13.5 10 15.5 10 17.5C10 19.5 12.5 21.5 15 21.5ZM4 17.5C4 19.5 6.5 21.5 9 21.5C11.5 21.5 14 19.5 14 17.5C14 15.5 11.5 13.5 9 13.5C6.5 13.5 4 15.5 4 17.5Z"/>
              </svg>
              <span className="text-[10px] text-gray-300 font-medium">Incognito</span>
            </div>
            <div className="w-6 h-6 rounded-md bg-white/10" />
          </div>

          {/* Search Bar */}
          <div className="w-full h-12 bg-[#1e1e1e] rounded-xl flex items-center px-4 overflow-hidden shadow-inner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2 shrink-0">
              <circle cx="11" cy="11" r="8"/><path d="M21 21L16.65 16.65"/>
            </svg>
            <div className="nsfw-search-text overflow-hidden whitespace-nowrap">
              <span className="text-white text-sm font-medium tracking-wide">bad videos</span>
            </div>
            {/* Blinking cursor */}
            <div className="w-[2px] h-4 bg-blue-500 animate-pulse ml-0.5" />
          </div>
          
          {/* Fake content skeleton */}
          <div className="mt-8 flex flex-col gap-4 opacity-30">
            <div className="w-3/4 h-6 rounded-md bg-white/10" />
            <div className="w-full h-32 rounded-xl bg-white/5" />
            <div className="w-5/6 h-4 rounded-md bg-white/10" />
            <div className="w-4/6 h-4 rounded-md bg-white/10" />
          </div>
        </div>

        {/* =========================================
            SCENARIO 2: REELS 
           ========================================= */}
        <div className="nsfw-reels absolute inset-0 opacity-0 overflow-hidden bg-black">
          <div className="nsfw-reels-container flex flex-col w-full absolute top-0 left-0">
            
            {/* Reel 1: Normal Content */}
            <div className="w-[280px] h-[580px] shrink-0 relative bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center">
               <span className="text-white/20 font-bold text-2xl tracking-widest uppercase">Tech Video</span>
               <div className="absolute bottom-12 right-3 flex flex-col gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="w-8 h-8 rounded-full bg-white/20" />
               </div>
            </div>

            {/* Reel 2: Suggestive Silhouette */}
            <div className="w-[280px] h-[580px] shrink-0 relative bg-gradient-to-b from-rose-900 via-pink-800 to-black overflow-hidden">
               {/* Silhouette graphic */}
               <svg className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[220px] h-auto opacity-70 drop-shadow-[0_0_15px_rgba(255,100,150,0.5)]" viewBox="0 0 100 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M40 30 C 40 20, 60 20, 60 30 C 65 40, 55 50, 50 60 C 45 70, 70 80, 75 100 C 80 120, 70 140, 65 170 C 60 200, 40 200, 35 170 C 30 140, 20 120, 25 100 C 30 80, 55 70, 50 60 C 45 50, 35 40, 40 30 Z" fill="#ffb6c1" />
                 <circle cx="50" cy="15" r="10" fill="#ffb6c1" />
               </svg>
               <div className="absolute inset-0 bg-black/20" />
               <div className="absolute bottom-12 right-3 flex flex-col gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="w-8 h-8 rounded-full bg-white/20" />
               </div>
            </div>

          </div>
        </div>

        {/* =========================================
            BLOCK SCREEN (AI GUARD)
           ========================================= */}
        <div className="nsfw-block absolute inset-0 bg-black z-20 flex flex-col items-center justify-center p-6 opacity-0">
          <div className="nsfw-block-content flex flex-col items-center text-center">
            {/* Shield / Warning Icon */}
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            
            <h3 className="text-red-500 font-black text-xl uppercase tracking-widest mb-2">Content Blocked</h3>
            <p className="text-white/70 text-sm leading-relaxed px-4">
              AI NSFW guard is active.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
`;

if (!content.includes('function NsfwDetoxAnimation')) {
  content = content.replace('function HorizontalFeatures() {', componentCode + '\nfunction HorizontalFeatures() {');
}

const renderTarget = `{feat.num === '03' && <ReelsScrolledAnimation />}`;
if (content.includes(renderTarget) && !content.includes('<NsfwDetoxAnimation />')) {
  const replacement = `{feat.num === '03' && <ReelsScrolledAnimation />}
            {/* NSFW DETOX */}
            {feat.num === '04' && <NsfwDetoxAnimation />}`;
  content = content.replace(renderTarget, replacement);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added NsfwDetoxAnimation');
