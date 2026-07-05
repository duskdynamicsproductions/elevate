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

      // ---- INITIAL SETUP ----
      tl.set('.wo-add-btn', { scale: 1, opacity: 1 });
      tl.set('.wo-search-overlay', { y: 600, opacity: 1 });
      tl.set('.wo-search-text', { text: '' });
      tl.set('.wo-search-cursor', { opacity: 0 });
      tl.set('.wo-ex1', { opacity: 0, height: 0, padding: 0, margin: 0 });
      tl.set('.wo-ex2', { opacity: 0, height: 0, padding: 0, margin: 0 });
      
      tl.set('.wo-active-overlay', { x: 300, opacity: 1 }); // Slides in from right
      tl.set('.wo-active-ex1', { display: 'flex', opacity: 1, x: 0 });
      tl.set('.wo-active-ex2', { display: 'none', opacity: 0, x: 50 });
      tl.set('.wo-btn-done', { scale: 1, backgroundColor: '#22c55e' });
      tl.set('.wo-btn-done-text', { text: 'Done' });

      tl.set('.wo-complete-overlay', { opacity: 0, scale: 0.8, display: 'none' });

      // ---- 1. ADD EXERCISE 1 ----
      tl.to({}, { duration: 0.8 }); // initial pause
      
      // Click Add
      tl.to('.wo-add-btn', { scale: 0.95, duration: 0.1 });
      tl.to('.wo-add-btn', { scale: 1, duration: 0.1 });
      
      // Show Search Overlay
      tl.to('.wo-search-overlay', { y: 0, duration: 0.4, ease: 'power3.out' });
      tl.to('.wo-search-cursor', { opacity: 1, repeat: 3, yoyo: true, duration: 0.2 });
      
      // Type "Lat Pulldown"
      // Since we don't have TextPlugin, we animate text via changing innerHTML using an onUpdate or just discrete steps, but simpler: 
      // We will just use a CSS width animation for typing!
      tl.set('.wo-search-text-container', { width: 0 });
      tl.set('.wo-search-text', { innerHTML: 'Lat Pulldown' });
      tl.to('.wo-search-text-container', { width: '100%', duration: 0.6, ease: 'steps(12)' });
      
      tl.to({}, { duration: 0.4 });
      
      // Hide Search Overlay
      tl.to('.wo-search-overlay', { y: 600, duration: 0.4, ease: 'power3.in' });
      
      // Ex1 Appears
      tl.to('.wo-ex1', { height: 'auto', padding: '16px', margin: '8px 0', duration: 0.3, ease: 'power2.out' });
      tl.to('.wo-ex1', { opacity: 1, duration: 0.3 }, "-=0.2");

      // ---- 2. ADD EXERCISE 2 ----
      tl.to({}, { duration: 0.6 });
      
      // Click Add
      tl.to('.wo-add-btn', { scale: 0.95, duration: 0.1 });
      tl.to('.wo-add-btn', { scale: 1, duration: 0.1 });
      
      // Show Search Overlay
      tl.to('.wo-search-overlay', { y: 0, duration: 0.4, ease: 'power3.out' });
      
      // Type "Barbell Row"
      tl.set('.wo-search-text-container', { width: 0 });
      tl.set('.wo-search-text', { innerHTML: 'Barbell Row' });
      tl.to('.wo-search-text-container', { width: '100%', duration: 0.6, ease: 'steps(11)' });
      
      tl.to({}, { duration: 0.4 });
      
      // Hide Search Overlay
      tl.to('.wo-search-overlay', { y: 600, duration: 0.4, ease: 'power3.in' });
      
      // Ex2 Appears
      tl.to('.wo-ex2', { height: 'auto', padding: '16px', margin: '8px 0', duration: 0.3, ease: 'power2.out' });
      tl.to('.wo-ex2', { opacity: 1, duration: 0.3 }, "-=0.2");

      // ---- 3. START WORKOUT (Active State) ----
      tl.to({}, { duration: 0.8 });
      // Active workout screen slides in from right
      tl.to('.wo-active-overlay', { x: 0, duration: 0.5, ease: 'power3.out' });

      // Active Ex 1 - Click Done
      tl.to({}, { duration: 1 });
      tl.to('.wo-btn-done', { scale: 0.9, duration: 0.1 });
      tl.set('.wo-btn-done-text', { innerHTML: '✓' });
      tl.to('.wo-btn-done', { scale: 1, backgroundColor: '#16a34a', duration: 0.2, ease: 'back.out(2)' });
      
      // Transition to Ex 2
      tl.to({}, { duration: 0.5 });
      tl.to('.wo-active-ex1', { x: -50, opacity: 0, duration: 0.3, display: 'none' });
      tl.set('.wo-active-ex2', { display: 'flex' });
      tl.to('.wo-active-ex2', { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });

      // Reset button for Ex 2
      tl.set('.wo-btn-done', { backgroundColor: '#22c55e' });
      tl.set('.wo-btn-done-text', { innerHTML: 'Done' });

      // Active Ex 2 - Click Done
      tl.to({}, { duration: 1 });
      tl.to('.wo-btn-done', { scale: 0.9, duration: 0.1 });
      tl.set('.wo-btn-done-text', { innerHTML: '✓' });
      tl.to('.wo-btn-done', { scale: 1, backgroundColor: '#16a34a', duration: 0.2, ease: 'back.out(2)' });
      
      // ---- 4. COMPLETE WORKOUT ----
      tl.to({}, { duration: 0.6 });
      tl.set('.wo-complete-overlay', { display: 'flex' });
      tl.to('.wo-complete-overlay', { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' });
      
      // Hold
      tl.to({}, { duration: 2.5 });
      
      // Final Reset
      tl.to('.wo-complete-overlay', { opacity: 0, duration: 0.3 });
      tl.to('.wo-active-overlay', { x: 300, duration: 0.3 }); // Slide back out

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
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-40 shadow-sm" />

        {/* --- BASE PLANNER VIEW --- */}
        <div className="absolute inset-0 pt-16 px-4 flex flex-col z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white tracking-tight">Pull Day</h2>
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
            <div className="wo-ex1 bg-[#18181b] rounded-xl overflow-hidden border border-white/5 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-sm">Lat Pulldown</span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <div className="bg-black/40 px-2 py-1 rounded font-medium">3 Sets</div>
                <div className="bg-black/40 px-2 py-1 rounded font-medium">10 - 12 Reps</div>
              </div>
            </div>
            <div className="wo-ex2 bg-[#18181b] rounded-xl overflow-hidden border border-white/5 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-sm">Barbell Row</span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <div className="bg-black/40 px-2 py-1 rounded font-medium">4 Sets</div>
                <div className="bg-black/40 px-2 py-1 rounded font-medium">8 - 10 Reps</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEARCH OVERLAY --- */}
        <div className="wo-search-overlay absolute inset-0 bg-[#09090b] z-20 pt-16 px-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </div>
            <div className="flex-1 h-10 bg-[#18181b] rounded-lg flex items-center px-3 border border-white/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" className="shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <div className="wo-search-text-container overflow-hidden whitespace-nowrap ml-2">
                 <span className="wo-search-text text-white text-sm font-medium"></span>
              </div>
              <div className="wo-search-cursor w-[2px] h-4 bg-blue-500 ml-0.5" />
            </div>
          </div>
          {/* Fake Search Results skeleton */}
          <div className="flex flex-col gap-3 opacity-30">
             <div className="w-3/4 h-4 bg-white/10 rounded-sm" />
             <div className="w-1/2 h-4 bg-white/10 rounded-sm" />
             <div className="w-2/3 h-4 bg-white/10 rounded-sm" />
          </div>
        </div>

        {/* --- ACTIVE WORKOUT OVERLAY --- */}
        <div className="wo-active-overlay absolute inset-0 bg-[#09090b] z-30 pt-16 px-4 flex flex-col">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
             <div className="w-1/2 h-full bg-blue-500 rounded-full" />
          </div>

          <div className="flex-1 relative">
            {/* Active Ex 1 */}
            <div className="wo-active-ex1 absolute inset-0 flex flex-col">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Current Exercise</span>
              <h2 className="text-white text-2xl font-black tracking-tight mb-8">Lat Pulldown</h2>
              
              <div className="bg-[#18181b] rounded-2xl p-4 border border-white/5 flex flex-col gap-4">
                 <div className="flex justify-between items-center pb-4 border-b border-white/5">
                   <span className="text-white font-bold">Set 1</span>
                   <span className="text-zinc-400 font-medium text-sm">12 Reps @ 120 lbs</span>
                 </div>
                 
                 {/* Action Buttons */}
                 <div className="flex items-center gap-2">
                    <div className="flex-1 bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl text-center text-sm shadow-md">Skip</div>
                    <div className="flex-1 bg-blue-900/40 text-blue-400 font-semibold py-3 rounded-xl text-center text-sm shadow-md border border-blue-800/30">Later</div>
                    <div className="wo-btn-done flex-1 bg-green-500 text-white font-bold py-3 rounded-xl text-center text-sm shadow-lg shadow-green-900/20 flex items-center justify-center">
                      <span className="wo-btn-done-text">Done</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Active Ex 2 */}
            <div className="wo-active-ex2 absolute inset-0 flex flex-col">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Current Exercise</span>
              <h2 className="text-white text-2xl font-black tracking-tight mb-8">Barbell Row</h2>
              
              <div className="bg-[#18181b] rounded-2xl p-4 border border-white/5 flex flex-col gap-4">
                 <div className="flex justify-between items-center pb-4 border-b border-white/5">
                   <span className="text-white font-bold">Set 1</span>
                   <span className="text-zinc-400 font-medium text-sm">10 Reps @ 135 lbs</span>
                 </div>
                 
                 {/* Action Buttons */}
                 <div className="flex items-center gap-2">
                    <div className="flex-1 bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl text-center text-sm shadow-md">Skip</div>
                    <div className="flex-1 bg-blue-900/40 text-blue-400 font-semibold py-3 rounded-xl text-center text-sm shadow-md border border-blue-800/30">Later</div>
                    <div className="wo-btn-done flex-1 bg-green-500 text-white font-bold py-3 rounded-xl text-center text-sm shadow-lg shadow-green-900/20 flex items-center justify-center">
                      <span className="wo-btn-done-text">Done</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- COMPLETE OVERLAY --- */}
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

// Replace the old function entirely
// We can use regex to find and replace the whole function WorkoutPlanningAnimation() { ... }
const regex = /function WorkoutPlanningAnimation\(\) \{[\s\S]*?(?=function HorizontalFeatures\(\) \{)/;
if (content.match(regex)) {
  content = content.replace(regex, newComponentCode + '\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated WorkoutPlanningAnimation to the new flow.');
} else {
  console.log('Could not find WorkoutPlanningAnimation to replace.');
}
