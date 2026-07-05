const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regexSpawner = /function AppLimitSpawner\(\{ delayOffset = 0 \}: \{ delayOffset\?: number \}\) \{[\s\S]*?(?=function AppLimitNotification\(\) \{)/;

const newSpawnerCode = `function AppLimitSpawner({ delayOffset = 0, index = 0 }: { delayOffset?: number; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentApp, setCurrentApp] = useState({ id: 'Platform=Facebook, Color=Original.png', limit: 30 });
  const [pos, setPos] = useState({ top: 40, right: 10 });
  
  useEffect(() => {
    const apps = [
      { id: 'Platform=Facebook, Color=Original.png', limit: 30 },
      { id: 'Platform=X (Twitter), Color=Original.png', limit: 45 },
      { id: 'Platform=TikTok, Color=Original.png', limit: 60 },
      { id: 'Platform=Instagram, Color=Original.png', limit: 20 },
      { id: 'Platform=YouTube, Color=Original.png', limit: 90 },
      { id: 'Platform=Reddit, Color=Original.png', limit: 15 },
    ];

    let ctx = gsap.context(() => {});
    let cycleTimeout: NodeJS.Timeout;

    const cycle = () => {
      // Pick random app from half the array to ensure no duplicates
      const halfSize = Math.floor(apps.length / 2);
      const offset = index === 0 ? 0 : halfSize;
      const randomApp = apps[offset + Math.floor(Math.random() * halfSize)];
      
      // Separate vertical zones to prevent overlapping
      // Zone 0: top 15% to 35%
      // Zone 1: top 55% to 70%
      const top = index === 0 ? 15 + Math.random() * 20 : 55 + Math.random() * 15; 
      const right = 2 + Math.random() * 20; // Keep closer to the right edge
      
      setCurrentApp(randomApp);
      setPos({ top, right });

      ctx.add(() => {
        // Pop in
        gsap.fromTo(cardRef.current, 
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }
        );
        // Add subtle floating while visible
        gsap.to(cardRef.current, {
          y: -10, duration: 2, yoyo: true, repeat: 1, ease: 'sine.inOut', delay: 0.7
        });
        // Pop out at 4.3s
        gsap.to(cardRef.current, {
          opacity: 0, scale: 0.9, y: -30, duration: 0.5, delay: 4.3, ease: 'power2.in'
        });
      });

      cycleTimeout = setTimeout(cycle, 5000);
    };

    // Run first cycle shortly after mount + delay offset
    const initialDelay = setTimeout(cycle, 100 + delayOffset);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(cycleTimeout);
      ctx.revert();
    };
  }, [delayOffset, index]);

  return (
    <div 
      ref={cardRef}
      className="pointer-events-auto absolute w-[380px] rounded-xl border border-red-500/20 bg-[#0d0d12]/95 backdrop-blur-2xl p-4 shadow-[0_15px_40px_rgba(220,38,38,0.1)] opacity-0"
      style={{ top: \`\${pos.top}%\`, right: \`\${pos.right}%\`, willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="shrink-0 flex items-center justify-center">
          <div style={{ transform: 'scale(0.6)' }}>
            <SocialSVG id={currentApp.id} />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">App used &gt; {currentApp.limit} mins</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3.5">
        <div className="h-1 w-full bg-elevate-paper/10 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 w-full rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] font-semibold text-elevate-paper/50">0 minutes</span>
          <span className="text-[9px] font-bold text-red-500">{currentApp.limit} minutes</span>
        </div>
      </div>

      <p className="text-[11px] text-elevate-paper/60 whitespace-nowrap">
        Close it to maintain screen time or you will be kicked out of the app
      </p>
    </div>
  );
}
`;

const regexNotification = /function AppLimitNotification\(\) \{[\s\S]*?return \([\s\S]*?<div className="absolute inset-0 pointer-events-none overflow-hidden" style=\{\{ zIndex: 15 \}\}>[\s\S]*?<AppLimitSpawner delayOffset=\{0\} \/>[\s\S]*?<AppLimitSpawner delayOffset=\{2500\} \/>[\s\S]*?<\/div>[\s\S]*?\);[\s\S]*?\}/;

const newNotificationCode = `function AppLimitNotification() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15 }}>
      <AppLimitSpawner delayOffset={0} index={0} />
      <AppLimitSpawner delayOffset={2500} index={1} />
    </div>
  );
}`;

if (content.match(regexSpawner) && content.match(regexNotification)) {
  content = content.replace(regexSpawner, newSpawnerCode + '\n');
  content = content.replace(regexNotification, newNotificationCode);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated AppLimitSpawner to prevent overlapping and duplicate apps.');
} else {
  console.log('Could not find the target code to replace.');
}
