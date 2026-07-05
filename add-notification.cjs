const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Inject the component just before HorizontalFeatures
const compString = `function HorizontalFeatures() {`;
if (!content.includes('function AppLimitNotification()')) {
  const notificationComp = `function AppLimitNotification() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Subtle floating animation
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: -15,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15 }}>
      <div 
        ref={containerRef}
        className="pointer-events-auto absolute right-[10%] top-[40%] w-[320px] rounded-2xl border border-red-500/20 bg-[#0d0d12]/95 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(220,38,38,0.1)]"
        style={{ willChange: 'transform' }}
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-red-500 uppercase mb-1">Time Limit Reached</p>
            <p className="text-base font-semibold text-white leading-tight">App used &gt; 30 mins</p>
          </div>
        </div>
        <p className="text-sm text-elevate-paper/60 leading-relaxed">
          Close it to maintain screen time or you will be kicked out of the app in <span className="text-white font-semibold">0:59</span>.
        </p>
        
        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-xl bg-red-600 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            Close App
          </button>
        </div>
      </div>
    </div>
  );
}

`;
  content = content.replace(compString, notificationComp + compString);
}

// Inject rendering logic inside HorizontalFeatures
const targetLine = `{feat.num === '01' && <AppBlockedAnimation />}`;
if (content.includes(targetLine) && !content.includes('<AppLimitNotification />')) {
  const replacement = `{feat.num === '01' && <AppBlockedAnimation />}
            {/* APP LIMIT NOTIFICATION */}
            {feat.num === '02' && <AppLimitNotification />}`;
  content = content.replace(targetLine, replacement);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done — notification card added!');
