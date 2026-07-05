const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newComponentCode = `
function WorkoutPlanningAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      // INITIAL SETUP
      tl.set('.wo-screen-b', { x: 300, display: 'none' }); // Detail screen hidden
      tl.set('.wo-ex-card-1', { scale: 1, opacity: 1 });
      tl.set('.wo-ex-card-2', { scale: 1, opacity: 1 });
      tl.set('.wo-timer-sec', { innerHTML: '57s' });
      tl.set('.wo-close-btn', { scale: 1 });

      // ---- SCREEN A: OVERVIEW ----
      tl.to({}, { duration: 1 });
      
      // Timer ticks
      tl.set('.wo-timer-sec', { innerHTML: '58s' });
      tl.to({}, { duration: 1 });
      tl.set('.wo-timer-sec', { innerHTML: '59s' });
      tl.to({}, { duration: 0.5 });

      // Click Exercise 1 (Pull Ups)
      tl.to('.wo-ex-card-1', { scale: 0.95, duration: 0.1 });
      tl.to('.wo-ex-card-1', { scale: 1, duration: 0.1 });

      // Setup Screen B for Pull Ups
      tl.set('.wo-detail-title', { innerHTML: 'Pull Ups' });
      tl.set('.wo-detail-sub', { innerHTML: 'Back' });
      tl.set('.wo-detail-gif', { attr: { src: '/pull-up.gif' } });
      tl.set('.wo-set-1', { innerHTML: 'Set 2 Done  12 reps Bodyweight' });
      tl.set('.wo-set-2', { innerHTML: 'Set 3 Done  10 reps Bodyweight' });

      // Slide in Screen B
      tl.set('.wo-screen-b', { display: 'flex' });
      tl.to('.wo-screen-b', { x: 0, duration: 0.5, ease: 'power3.out' });

      tl.to({}, { duration: 2.5 }); // View details

      // Click X
      tl.to('.wo-close-btn', { scale: 0.8, duration: 0.1 });
      tl.to('.wo-close-btn', { scale: 1, duration: 0.1 });

      // Slide out Screen B
      tl.to('.wo-screen-b', { x: 300, duration: 0.4, ease: 'power3.in' });
      tl.set('.wo-screen-b', { display: 'none' });

      // ---- BACK TO SCREEN A ----
      tl.to({}, { duration: 0.5 });
      // Timer ticks
      tl.set('.wo-timer-sec', { innerHTML: '00s' });
      tl.set('.wo-timer-min', { innerHTML: '1h26m' });

      tl.to({}, { duration: 1 });

      // Click Exercise 2 (Bench Press)
      tl.to('.wo-ex-card-2', { scale: 0.95, duration: 0.1 });
      tl.to('.wo-ex-card-2', { scale: 1, duration: 0.1 });

      // Setup Screen B for Bench Press
      tl.set('.wo-detail-title', { innerHTML: 'Bench Press' });
      tl.set('.wo-detail-sub', { innerHTML: 'Chest' });
      tl.set('.wo-detail-gif', { attr: { src: '/dumbbell-bench-press.gif' } });
      tl.set('.wo-set-1', { innerHTML: 'Set 2 Done  10 reps 135 lbs' });
      tl.set('.wo-set-2', { innerHTML: 'Set 3 Done  8 reps 145 lbs' });

      // Slide in Screen B
      tl.set('.wo-screen-b', { display: 'flex' });
      tl.to('.wo-screen-b', { x: 0, duration: 0.5, ease: 'power3.out' });

      tl.to({}, { duration: 2.5 }); // View details

      // Click X
      tl.to('.wo-close-btn', { scale: 0.8, duration: 0.1 });
      tl.to('.wo-close-btn', { scale: 1, duration: 0.1 });

      // Slide out Screen B
      tl.to('.wo-screen-b', { x: 300, duration: 0.4, ease: 'power3.in' });
      tl.set('.wo-screen-b', { display: 'none' });

      // Reset timer for loop
      tl.set('.wo-timer-sec', { innerHTML: '57s' });
      tl.set('.wo-timer-min', { innerHTML: '1h25m' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      {/* Mobile Phone Mockup */}
      <div 
        ref={containerRef}
        className="relative mt-20 w-[280px] h-[580px] rounded-[3rem] border-[10px] border-[#0d0d12] bg-[#0a0a0c] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden font-sans"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-40 shadow-sm" />

        {/* --- SCREEN A: WORKOUT OVERVIEW --- */}
        <div className="absolute inset-0 pt-12 flex flex-col z-10 overflow-hidden">
          
          {/* Top Nav */}
          <div className="px-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              <h1 className="text-white font-bold text-lg">Workout</h1>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>

          <div className="px-4 overflow-y-auto no-scrollbar pb-24">
            {/* Header Info */}
            <div className="mb-4">
              <span className="text-[#a1a1aa] text-xs font-semibold">Review</span>
              <h2 className="text-white text-2xl font-black tracking-tight leading-tight">Workout session</h2>
              <span className="text-[#71717a] text-[11px]">Sat, Jun 6</span>
            </div>

            {/* Time Pill */}
            <div className="bg-[#141517] rounded-full px-3 py-1.5 inline-block mb-6">
              <span className="text-[#a1a1aa] text-[10px] font-medium">07:27 PM - 09:33 PM</span>
            </div>

            {/* Huge Timer */}
            <div className="flex justify-center mb-8">
              <h1 className="text-white text-5xl font-black tracking-tighter">
                <span className="wo-timer-min">1h25m</span><span className="wo-timer-sec">57s</span>
              </h1>
            </div>

            <h3 className="text-white font-bold text-sm mb-4">Exercises</h3>

            {/* Selected Exercise Card (Pull Ups) */}
            <div className="wo-ex-card-1 relative border-l-[3px] border-[#22c55e] pl-3 mb-6">
              <span className="text-[#71717a] text-[10px] font-bold">Selected exercise</span>
              <h4 className="text-white font-bold text-[15px] leading-tight mb-1">Pull Ups</h4>
              <p className="text-[#a1a1aa] text-[11px] mb-3">Back · 4 sets</p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#22c55e] bg-[#052e16] px-2 py-0.5 rounded-full text-[9px] font-bold">Hypertrophy + Manual</span>
                <span className="text-[#22c55e] bg-[#052e16] px-2 py-0.5 rounded-full text-[9px] font-bold">Break done</span>
              </div>
              
              <div className="flex gap-1 mb-3">
                <div className="h-0.5 flex-1 bg-[#22c55e] rounded-full" />
                <div className="h-0.5 flex-1 bg-[#22c55e] rounded-full" />
                <div className="h-0.5 flex-1 bg-[#22c55e] rounded-full" />
                <div className="h-0.5 flex-1 bg-[#27272a] rounded-full" />
              </div>

              <div className="flex items-center gap-3 bg-[#111113] p-2 rounded-xl">
                <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                  <img src="/pull-up.gif" className="w-full h-full object-contain" alt="Pull Ups" />
                </div>
                <div>
                  <h5 className="text-white font-bold text-[13px]">Pull Ups</h5>
                  <p className="text-[#a1a1aa] text-[10px]">Back · 4 sets</p>
                </div>
              </div>
            </div>

            {/* Other Exercises */}
            <div className="wo-ex-card-2 flex items-center justify-between py-3 border-b border-[#27272a]">
              <div className="flex items-center gap-3">
                <span className="text-[#22c55e] font-black text-sm">2</span>
                <span className="text-white font-bold text-[13px]">Bench Press</span>
              </div>
              <span className="text-[#a1a1aa] text-[11px]">4 × 10</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#27272a]">
              <div className="flex items-center gap-3">
                <span className="text-[#22c55e] font-black text-sm">3</span>
                <span className="text-white font-bold text-[13px]">Push Ups</span>
              </div>
              <span className="text-[#a1a1aa] text-[11px]">3 × 12</span>
            </div>
            
          </div>
          
          {/* Floating Action Button */}
          <div className="absolute bottom-6 left-4 right-4 z-20">
            <div className="bg-[#22c55e] rounded-full py-3 flex items-center justify-center">
              <span className="text-black font-black text-sm tracking-wide">Split overview</span>
            </div>
          </div>
        </div>

        {/* --- SCREEN B: EXERCISE DETAIL OVERLAY --- */}
        <div className="wo-screen-b absolute inset-0 bg-[#0a0a0c] z-30 flex flex-col pt-12 overflow-hidden">
          
          <div className="px-4 flex items-start justify-between mb-4">
            <div>
              <h2 className="wo-detail-title text-white font-black text-xl tracking-tight leading-tight">Pull Ups</h2>
              <span className="wo-detail-sub text-[#a1a1aa] text-xs">Back</span>
              <div className="mt-2 inline-block">
                <span className="text-[#22c55e] border border-[#22c55e]/30 px-2 py-0.5 rounded-full text-[10px] font-bold">Hypertrophy</span>
              </div>
            </div>
            <div className="wo-close-btn p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
          </div>

          <div className="px-4 overflow-y-auto no-scrollbar pb-10">
            {/* GIF White Card */}
            <div className="w-full h-40 bg-white rounded-3xl mb-6 flex items-center justify-center overflow-hidden p-2 shadow-sm">
               <img className="wo-detail-gif w-full h-full object-contain" src="/pull-up.gif" alt="Exercise" />
            </div>

            {/* Logged Sets */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-bold text-[13px]">Logged sets</h3>
                <span className="text-[#22c55e] text-[10px]">Hypertrophy</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
            </div>

            <div className="flex flex-col gap-1.5 mb-6">
              <div className="bg-[#141517] rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-white font-bold text-xs"><span className="text-[#facc15]">Warmup</span> Done</span>
                <span className="text-white font-bold text-xs">6 min</span>
              </div>
              <div className="bg-[#141517] rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="wo-set-1 text-white font-bold text-xs whitespace-pre">Set 2 Done  12 reps Bodyweight</span>
              </div>
              <div className="bg-[#141517] rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="wo-set-2 text-white font-bold text-xs whitespace-pre">Set 3 Done  10 reps Bodyweight</span>
              </div>
            </div>

            {/* Build sets text */}
            <div className="mb-6">
              <h3 className="text-white font-bold text-[13px] mb-1">Build sets</h3>
              <p className="text-[#71717a] text-[10px] leading-relaxed">Choose the fast preset path or build the exact setup yourself.<br/>Locked after workout starts.</p>
            </div>

            {/* Instructions */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-bold text-[13px]">Instructions</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
              </div>
              <p className="text-[#71717a] text-[10px] mb-2">Steps to perform it cleanly</p>
              <ul className="text-[#a1a1aa] text-[11px] list-disc pl-4 space-y-1">
                <li>Engage your core and back.</li>
                <li>Pull until your chin clears the bar.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
`;

const regex = /function WorkoutPlanningAnimation\(\) \{[\s\S]*?(?=function HorizontalFeatures\(\) \{)/;
if (content.match(regex)) {
  content = content.replace(regex, newComponentCode + '\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully styled WorkoutPlanningAnimation with real screens.');
} else {
  console.log('Could not find WorkoutPlanningAnimation to replace.');
}
