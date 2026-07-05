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
      tl.set('.wo-screen-b', { x: 300, display: 'none' }); // Detail screen hidden right
      tl.set('.wo-screen-c', { y: 600, display: 'none' }); // Add Exercise hidden bottom
      tl.set('.wo-added-item', { display: 'none', opacity: 0, height: 0, margin: 0 }); // Item in Overview list
      tl.set('.wo-timer-sec', { innerHTML: '57s' });
      tl.set('.wo-close-btn', { scale: 1 });
      tl.set('.wo-c-ex1', { scale: 1 });
      tl.set('.wo-a-ex1', { scale: 1 });

      // ---- 1. START AT SCREEN A (OVERVIEW) -> SHOW SCREEN C ----
      tl.to({}, { duration: 0.5 });
      tl.set('.wo-screen-c', { display: 'flex' });
      tl.to('.wo-screen-c', { y: 0, duration: 0.5, ease: 'power3.out' });

      // Inside Screen C: Scroll down slightly and click Pull Ups
      tl.to({}, { duration: 1 });
      tl.to('.wo-c-scroll', { y: -50, duration: 1, ease: 'power2.inOut' });
      tl.to({}, { duration: 0.5 });
      
      tl.to('.wo-c-ex1', { scale: 0.95, duration: 0.1 });
      tl.to('.wo-c-ex1', { scale: 1, backgroundColor: '#18181b', duration: 0.1 });

      // Slide out Screen C
      tl.to({}, { duration: 0.3 });
      tl.to('.wo-screen-c', { y: 600, duration: 0.4, ease: 'power3.in' });
      tl.set('.wo-screen-c', { display: 'none' });

      // ---- 2. BACK TO SCREEN A (OVERVIEW) ----
      // Animate the added item appearing in the list
      tl.set('.wo-added-item', { display: 'block' });
      tl.to('.wo-added-item', { height: 'auto', margin: '0 0 24px 0', duration: 0.3, ease: 'power2.out' });
      tl.to('.wo-added-item', { opacity: 1, duration: 0.3 }, "-=0.1");

      // Timer ticks
      tl.to({}, { duration: 0.5 });
      tl.set('.wo-timer-sec', { innerHTML: '58s' });
      tl.to({}, { duration: 1 });
      tl.set('.wo-timer-sec', { innerHTML: '59s' });
      tl.to({}, { duration: 0.5 });

      // Click Exercise 1 (Pull Ups) in Screen A
      tl.to('.wo-a-ex1', { scale: 0.95, duration: 0.1 });
      tl.to('.wo-a-ex1', { scale: 1, duration: 0.1 });

      // ---- 3. SLIDE IN SCREEN B (DETAILS) ----
      tl.set('.wo-screen-b', { display: 'flex' });
      tl.to('.wo-screen-b', { x: 0, duration: 0.5, ease: 'power3.out' });

      tl.to({}, { duration: 2.5 }); // View details

      // Click X on Screen B
      tl.to('.wo-close-btn', { scale: 0.8, duration: 0.1 });
      tl.to('.wo-close-btn', { scale: 1, duration: 0.1 });

      // Slide out Screen B
      tl.to('.wo-screen-b', { x: 300, duration: 0.4, ease: 'power3.in' });
      tl.set('.wo-screen-b', { display: 'none' });

      // Reset
      tl.to({}, { duration: 0.5 });
      tl.set('.wo-timer-sec', { innerHTML: '57s' });
      tl.set('.wo-added-item', { display: 'none', opacity: 0, height: 0, margin: 0 });
      tl.set('.wo-c-scroll', { y: 0 });
      tl.set('.wo-c-ex1', { backgroundColor: 'transparent' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      {/* Mobile Phone Mockup */}
      <div 
        ref={containerRef}
        className="relative mt-20 w-[280px] h-[580px] rounded-[3rem] border-[10px] border-[#0d0d12] bg-[#050505] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden font-sans"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-50 shadow-sm" />

        {/* =========================================
            SCREEN A: WORKOUT OVERVIEW
            ========================================= */}
        <div className="absolute inset-0 pt-12 flex flex-col z-10 overflow-hidden bg-[#050505]">
          
          <div className="px-4 flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              <h1 className="text-white font-bold text-lg">Workout</h1>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>

          <div className="px-4 overflow-y-auto no-scrollbar pb-24 flex-1">
            <div className="mb-4">
              <span className="text-[#a1a1aa] text-xs font-semibold">Review</span>
              <h2 className="text-white text-2xl font-black tracking-tight leading-tight">Workout session</h2>
              <span className="text-[#71717a] text-[11px]">Sat, Jun 6</span>
            </div>

            <div className="bg-[#141517] rounded-full px-3 py-1.5 inline-block mb-6">
              <span className="text-[#a1a1aa] text-[10px] font-medium">07:27 PM - 09:33 PM</span>
            </div>

            <div className="flex justify-center mb-8">
              <h1 className="text-white text-5xl font-black tracking-tighter">
                <span className="wo-timer-min">1h25m</span><span className="wo-timer-sec">57s</span>
              </h1>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm">Exercises</h3>
              <div className="bg-[#141517] w-6 h-6 rounded-full flex items-center justify-center">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
            </div>

            {/* Added Exercise Card (Pull Ups) */}
            <div className="wo-added-item wo-a-ex1 overflow-hidden">
              <div className="relative border-l-[3px] border-[#22c55e] pl-3 mb-6">
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
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex items-center justify-center p-1">
                    <img src="/pull-up.gif" className="w-full h-full object-contain mix-blend-multiply" alt="Pull Ups" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-[13px]">Pull Ups</h5>
                    <p className="text-[#a1a1aa] text-[10px]">Back · 4 sets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing Exercises */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-2 border-b border-[#18181b]">
                <div className="flex items-center gap-3">
                  <span className="text-[#22c55e] font-black text-sm w-4">2</span>
                  <span className="text-white font-bold text-[13px]">Bench Press</span>
                </div>
                <span className="text-[#a1a1aa] text-[11px]">4 × 10</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#18181b]">
                <div className="flex items-center gap-3">
                  <span className="text-[#22c55e] font-black text-sm w-4">3</span>
                  <span className="text-white font-bold text-[13px]">Push Ups</span>
                </div>
                <span className="text-[#a1a1aa] text-[11px]">3 × 12</span>
              </div>
            </div>
            
          </div>
          
          <div className="absolute bottom-6 left-4 right-4 z-20">
            <div className="bg-[#22c55e] rounded-full py-3 flex items-center justify-center">
              <span className="text-black font-black text-sm tracking-wide">Split overview</span>
            </div>
          </div>
        </div>

        {/* =========================================
            SCREEN B: EXERCISE DETAIL OVERLAY
            ========================================= */}
        <div className="wo-screen-b absolute inset-0 bg-[#050505] z-30 flex flex-col pt-12 overflow-hidden">
          
          <div className="px-4 flex items-start justify-between mb-4 shrink-0">
            <div>
              <h2 className="text-white font-black text-xl tracking-tight leading-tight">Pull Ups</h2>
              <span className="text-[#a1a1aa] text-xs">Back</span>
              <div className="mt-2 inline-block">
                <span className="text-[#22c55e] border border-[#22c55e]/30 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#052e16]/50">Hypertrophy</span>
              </div>
            </div>
            <div className="wo-close-btn p-1 bg-[#141517] rounded-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
          </div>

          <div className="px-4 overflow-y-auto no-scrollbar pb-10 flex-1">
            
            <div className="w-full h-40 bg-white rounded-[1.5rem] mb-6 flex items-center justify-center overflow-hidden p-3 shadow-lg">
               <img className="w-full h-full object-contain mix-blend-multiply" src="/pull-up.gif" alt="Exercise" />
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-bold text-[13px]">Logged sets</h3>
                <span className="text-[#22c55e] text-[10px]">Hypertrophy</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
            </div>

            <div className="flex flex-col gap-1.5 mb-6">
              <div className="bg-[#111113] border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                <span className="text-white font-bold text-xs"><span className="text-white">Warmup</span> Done</span>
                <span className="text-[#a1a1aa] font-bold text-xs">6 min</span>
              </div>
              <div className="bg-[#111113] border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                <span className="text-white font-bold text-xs whitespace-pre">Set 2 Done  12 reps Bodyweight</span>
              </div>
              <div className="bg-[#111113] border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                <span className="text-white font-bold text-xs whitespace-pre">Set 3 Done  10 reps Bodyweight</span>
              </div>
              <div className="bg-[#111113] border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm opacity-50">
                <span className="text-white font-bold text-xs whitespace-pre">Set 4</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-bold text-[13px] mb-1">Build sets</h3>
              <p className="text-[#71717a] text-[10px] leading-relaxed">Choose the fast preset path or build the exact setup yourself. Locked after workout starts.</p>
            </div>
          </div>
        </div>

        {/* =========================================
            SCREEN C: ADD EXERCISE OVERLAY
            ========================================= */}
        <div className="wo-screen-c absolute inset-0 bg-[#050505] z-40 flex flex-col pt-12 overflow-hidden">
          
          <div className="px-4 flex items-center justify-between mb-4 shrink-0">
            <h1 className="text-white font-bold text-lg">Add exercise</h1>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
          
          <div className="px-4 flex-1 overflow-hidden relative">
            <div className="wo-c-scroll absolute top-0 left-4 right-4 flex flex-col gap-5 pb-20">
              
              <div className="w-full bg-[#111113] rounded-xl p-3 border border-[#18181b]">
                <span className="text-[#71717a] text-[13px]">Search exercises...</span>
              </div>

              <div className="flex items-center justify-between bg-[#111113] rounded-xl p-1 border border-[#18181b]">
                <div className="flex-1 bg-[#22c55e] rounded-lg py-2 flex flex-col items-center justify-center gap-1 shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  <span className="text-black text-[9px] font-bold">All</span>
                </div>
                <div className="flex-1 py-2 flex flex-col items-center justify-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  <span className="text-[#a1a1aa] text-[9px] font-bold">Muscle</span>
                </div>
                <div className="flex-1 py-2 flex flex-col items-center justify-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  <span className="text-[#a1a1aa] text-[9px] font-bold">Exercise</span>
                </div>
                <div className="flex-1 py-2 flex flex-col items-center justify-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                  <span className="text-[#a1a1aa] text-[9px] font-bold">Tags</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xs whitespace-nowrap">Recents</span>
                <span className="text-[#71717a] text-[10px] truncate">Cable Woodchop, Cable side bend +8</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-white font-bold text-[13px]">Exercises</h2>
                  <div className="bg-[#111113] px-2 py-1 rounded-full border border-[#18181b]">
                    <span className="text-[#a1a1aa] text-[9px] font-bold">1411 exercises</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                   
                   {/* Ex Card 1 (Pull Ups) */}
                   <div className="wo-c-ex1 flex items-center gap-3 bg-[#111113] p-2.5 rounded-2xl border border-white/5">
                     <div className="w-[60px] h-[60px] bg-white rounded-[0.8rem] flex items-center justify-center overflow-hidden p-1 shrink-0">
                        <img src="/pull-up.gif" className="w-full h-full object-contain mix-blend-multiply" alt="Pull Ups" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-white font-bold text-sm mb-0.5">Pull Ups</h3>
                        <p className="text-[#71717a] text-[10px]">Back · Compound</p>
                     </div>
                   </div>

                   {/* Ex Card 2 */}
                   <div className="flex items-center gap-3 bg-[#111113] p-2.5 rounded-2xl border border-white/5">
                     <div className="w-[60px] h-[60px] bg-white rounded-[0.8rem] flex items-center justify-center overflow-hidden p-1 shrink-0">
                        <img src="/dumbbell-bench-press.gif" className="w-full h-full object-contain mix-blend-multiply" alt="Bench Press" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-white font-bold text-sm mb-0.5">Bench Press</h3>
                        <p className="text-[#71717a] text-[10px]">Pectorals · Compound</p>
                     </div>
                   </div>

                   {/* Ex Card 3 */}
                   <div className="flex items-center gap-3 bg-[#111113] p-2.5 rounded-2xl border border-white/5">
                     <div className="w-[60px] h-[60px] bg-white rounded-[0.8rem] flex items-center justify-center overflow-hidden p-1 shrink-0">
                        <img src="/push-up.gif" className="w-full h-full object-contain mix-blend-multiply" alt="Push Ups" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-white font-bold text-sm mb-0.5">Push Ups</h3>
                        <p className="text-[#71717a] text-[10px]">Chest · Compound</p>
                     </div>
                   </div>

                </div>
              </div>

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
  console.log('Successfully added Screen C (Add Exercise) and ensured adequate spacing.');
} else {
  console.log('Could not find WorkoutPlanningAnimation to replace.');
}
