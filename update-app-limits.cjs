const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /function AppLimitSpawner.*?function AppLimitNotification\(\) \{[\s\S]*?return \([\s\S]*?\}\);?\n\}/s;

const newCode = `function AppLimitNotification() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentApp, setCurrentApp] = useState({ id: 'Platform=Facebook, Color=Original.png', limit: 30 });
  
  useEffect(() => {
    const apps = [
      { id: 'Platform=Facebook, Color=Original.png', limit: 30, color: 'bg-blue-600' },
      { id: 'Platform=X (Twitter), Color=Original.png', limit: 45, color: 'bg-black' },
      { id: 'Platform=TikTok, Color=Original.png', limit: 60, color: 'bg-zinc-900' },
      { id: 'Platform=Instagram, Color=Original.png', limit: 20, color: 'bg-pink-600' },
      { id: 'Platform=YouTube, Color=Original.png', limit: 90, color: 'bg-red-600' },
    ];

    let ctx = gsap.context(() => {});
    let cycleTimeout: NodeJS.Timeout;

    const cycle = () => {
      // Pick random app
      const randomApp = apps[Math.floor(Math.random() * apps.length)];
      setCurrentApp(randomApp);

      ctx.add(() => {
        // Drop down from top like iOS notification
        gsap.fromTo(cardRef.current, 
          { opacity: 0, scale: 0.9, y: -50 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' }
        );
        // Add subtle floating while visible
        gsap.to(cardRef.current, {
          y: 3, duration: 1.5, yoyo: true, repeat: 1, ease: 'sine.inOut', delay: 0.6
        });
        // Pop out / slide back up at 3.5s
        gsap.to(cardRef.current, {
          opacity: 0, scale: 0.9, y: -50, duration: 0.4, delay: 3.5, ease: 'power2.in'
        });
      });

      cycleTimeout = setTimeout(cycle, 4500);
    };

    // Run first cycle shortly after mount
    const initialDelay = setTimeout(cycle, 500);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(cycleTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      {/* Mobile Phone Mockup */}
      <div className="relative mt-20 w-[280px] h-[580px] rounded-[3rem] border-[10px] border-[#0d0d12] bg-[#111118] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-30 shadow-sm" />
        
        {/* Fake App Background */}
        <div className="absolute inset-0 flex flex-col pt-16 px-4 gap-4 opacity-40">
          <div className="w-full h-32 rounded-xl bg-white/5" />
          <div className="w-full h-32 rounded-xl bg-white/5" />
          <div className="w-full h-32 rounded-xl bg-white/5" />
          <div className="w-full h-32 rounded-xl bg-white/5" />
        </div>

        {/* The Notification Popup (Inside Phone) */}
        <div className="absolute top-12 left-0 w-full flex justify-center z-40 px-3">
          <div 
            ref={cardRef}
            className="w-full rounded-2xl border border-red-500/30 bg-[#0d0d12]/95 backdrop-blur-3xl p-3 shadow-[0_20px_40px_rgba(220,38,38,0.25)] opacity-0 will-change-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0">
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'left center' }} className="w-6">
                  <SocialSVG id={currentApp.id} />
                </div>
              </div>
              <div className="flex-1 -ml-3">
                <p className="text-[11px] font-bold text-white leading-tight">Time Limit Reached</p>
                <p className="text-[9px] text-white/60 leading-tight mt-0.5">{currentApp.limit} mins used</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-full rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
              </div>
            </div>

            <p className="text-[9px] text-elevate-paper/80 leading-tight">
              App is locked to maintain screen time.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}`;

content = content.replace(regex, newCode);

fs.writeFileSync(filePath, content, 'utf8');
console.log('App limits updated');
