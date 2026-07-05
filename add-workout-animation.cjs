const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const componentCode = `
function WorkoutPlanningAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      // Initial state
      tl.set('.wo-add-btn', { scale: 1, opacity: 1, y: 0 });
      tl.set('.wo-ex1', { opacity: 0, x: -20, height: 0, padding: 0, margin: 0 });
      tl.set('.wo-ex2', { opacity: 0, x: -20, height: 0, padding: 0, margin: 0 });
      tl.set('.wo-timer-overlay', { opacity: 0, display: 'none' });
      tl.set('.wo-complete-overlay', { opacity: 0, scale: 0.8, display: 'none' });
      tl.set('.wo-ex-check', { opacity: 0, scale: 0 });

      // 1. Initial wait
      tl.to({}, { duration: 1 });

      // 2. Click Add Exercise 1
      tl.to('.wo-add-btn', { scale: 0.95, duration: 0.1, ease: 'power1.inOut' });
      tl.to('.wo-add-btn', { scale: 1, duration: 0.1, ease: 'power1.inOut' });
      
      // Expand and fade in Ex 1
      tl.to('.wo-ex1', { height: 'auto', padding: '16px', margin: '8px 0', duration: 0.3, ease: 'power2.out' });
      tl.to('.wo-ex1', { opacity: 1, x: 0, duration: 0.3, ease: 'back.out(1.5)' }, "-=0.2");

      tl.to({}, { duration: 0.8 }); // Wait

      // 3. Click Add Exercise 2
      tl.to('.wo-add-btn', { scale: 0.95, duration: 0.1, ease: 'power1.inOut' });
      tl.to('.wo-add-btn', { scale: 1, duration: 0.1, ease: 'power1.inOut' });
      
      // Expand and fade in Ex 2
      tl.to('.wo-ex2', { height: 'auto', padding: '16px', margin: '8px 0', duration: 0.3, ease: 'power2.out' });
      tl.to('.wo-ex2', { opacity: 1, x: 0, duration: 0.3, ease: 'back.out(1.5)' }, "-=0.2");

      tl.to({}, { duration: 1.2 }); // Wait

      // 4. Timer starts
      tl.set('.wo-timer-overlay', { display: 'flex' });
      tl.to('.wo-timer-overlay', { opacity: 1, duration: 0.3 });
      
      // Simulate timer ticking down with a scale animation on a ring
      tl.fromTo('.wo-timer-ring', 
        { strokeDashoffset: 0 }, 
        { strokeDashoffset: 125, duration: 2.5, ease: 'linear' }
      );
      
      tl.to('.wo-timer-overlay', { opacity: 0, duration: 0.3 });
      tl.set('.wo-timer-overlay', { display: 'none' });

      // 5. Show exercises completed
      tl.to('.wo-ex-check', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(2)' });
      
      // Show big completed overlay
      tl.set('.wo-complete-overlay', { display: 'flex' });
      tl.to('.wo-complete-overlay', { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' });
      
      // Hold completed state
      tl.to({}, { duration: 2 });
      
      // Reset
      tl.to('.wo-complete-overlay', { opacity: 0, duration: 0.3 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      {/* Mobile Phone Mockup */}
      <div 
        ref={containerRef}
        className="relative mt-20 w-[280px] h-[580px] rounded-[3rem] border-[10px] border-[#0d0d12] bg-[#09090b] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-30 shadow-sm" />

        <div className="absolute inset-0 pt-16 px-4 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white tracking-tight">Pull Day</h2>
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-500 text-xs font-bold">45m</span>
            </div>
          </div>

          {/* Add Exercise Button */}
          <div className="wo-add-btn w-full bg-blue-600 rounded-xl py-3 flex items-center justify-center gap-2 mb-4 shadow-lg shadow-blue-900/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span className="text-white font-bold text-sm tracking-wide">Add Exercise</span>
          </div>

          {/* Exercises List */}
          <div className="flex flex-col">
            
            {/* Exercise 1 */}
            <div className="wo-ex1 bg-[#18181b] rounded-xl overflow-hidden border border-white/5 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-sm">Lat Pulldown</span>
                <div className="wo-ex-check w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <div className="bg-black/40 px-2 py-1 rounded font-medium">3 Sets</div>
                <div className="bg-black/40 px-2 py-1 rounded font-medium">10 - 12 Reps</div>
              </div>
            </div>

            {/* Exercise 2 */}
            <div className="wo-ex2 bg-[#18181b] rounded-xl overflow-hidden border border-white/5 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-sm">Barbell Row</span>
                <div className="wo-ex-check w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <div className="bg-black/40 px-2 py-1 rounded font-medium">4 Sets</div>
                <div className="bg-black/40 px-2 py-1 rounded font-medium">8 - 10 Reps</div>
              </div>
            </div>

          </div>
        </div>

        {/* Timer Overlay */}
        <div className="wo-timer-overlay absolute inset-0 bg-black/60 backdrop-blur-md z-40 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* SVG Ring */}
            <svg width="120" height="120" viewBox="0 0 44 44" className="rotate-[-90deg]">
              <circle cx="22" cy="22" r="20" fill="none" stroke="#27272a" strokeWidth="4" />
              <circle 
                className="wo-timer-ring"
                cx="22" cy="22" r="20" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="4" 
                strokeDasharray="125" 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-white text-xs uppercase tracking-widest font-bold text-blue-500 mb-1">Rest</span>
              <span className="text-white text-2xl font-black tabular-nums tracking-tighter">01:29</span>
            </div>
          </div>
        </div>

        {/* Completed Overlay */}
        <div className="wo-complete-overlay absolute inset-0 bg-green-500/90 backdrop-blur-lg z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-2xl">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 className="text-white font-black text-2xl uppercase tracking-widest mb-2">Workout<br/>Completed</h3>
          <p className="text-white/90 font-medium text-sm">Volume: 8,400 lbs</p>
        </div>

      </div>
    </div>
  );
}
`;

if (!content.includes('function WorkoutPlanningAnimation')) {
  content = content.replace('function HorizontalFeatures() {', componentCode + '\nfunction HorizontalFeatures() {');
}

const renderTarget = `{feat.num === '04' && <NsfwDetoxAnimation />}`;
if (content.includes(renderTarget) && !content.includes('<WorkoutPlanningAnimation />')) {
  const replacement = `{feat.num === '04' && <NsfwDetoxAnimation />}
            {/* WORKOUT PLANNING */}
            {feat.num === '05' && <WorkoutPlanningAnimation />}`;
  content = content.replace(renderTarget, replacement);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added WorkoutPlanningAnimation');
