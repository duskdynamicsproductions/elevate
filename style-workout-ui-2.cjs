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
      tl.set('.wo-ex3', { opacity: 0, height: 0, padding: 0, margin: 0 });
      
      tl.set('.wo-active-overlay', { x: 300, opacity: 1 });
      tl.set('.wo-active-ex1', { display: 'flex', opacity: 1, x: 0 });
      tl.set('.wo-active-ex2', { display: 'none', opacity: 0, x: 50 });
      tl.set('.wo-active-ex3', { display: 'none', opacity: 0, x: 50 });
      
      tl.set('.wo-btn-done', { scale: 1, backgroundColor: '#22c55e' });
      tl.set('.wo-btn-skip', { scale: 1, backgroundColor: '#27272a', color: '#e4e4e7' });
      tl.set('.wo-btn-later', { scale: 1, backgroundColor: '#1e1b4b', color: '#818cf8' });

      tl.set('.wo-complete-overlay', { opacity: 0, scale: 0.8, display: 'none' });

      // ---- Helper function to add exercise ----
      const animateAdd = (exClass, name, chars) => {
        tl.to({}, { duration: 0.4 }); 
        tl.to('.wo-add-btn', { scale: 0.95, duration: 0.1 });
        tl.to('.wo-add-btn', { scale: 1, duration: 0.1 });
        
        tl.to('.wo-search-overlay', { y: 0, duration: 0.4, ease: 'power3.out' });
        
        tl.set('.wo-search-text-container', { width: 0 });
        tl.set('.wo-search-text', { innerHTML: name });
        tl.set('.wo-search-result-text', { innerHTML: name });
        tl.to('.wo-search-text-container', { width: '100%', duration: 0.4, ease: \`steps(\${chars})\` });
        
        tl.to('.wo-search-result', { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
        tl.to({}, { duration: 0.2 });
        
        tl.to('.wo-search-result', { opacity: 0, y: 10, duration: 0.2 }, "hideSearch" + exClass);
        tl.to('.wo-search-overlay', { y: 600, duration: 0.4, ease: 'power3.in' }, "hideSearch" + exClass);
        
        tl.to(exClass, { height: 'auto', padding: '16px', margin: '8px 0', duration: 0.3, ease: 'power2.out' });
        tl.to(exClass, { opacity: 1, duration: 0.3 }, "-=0.2");
      };

      animateAdd('.wo-ex1', 'Pull Ups', 8);
      animateAdd('.wo-ex2', 'Bench Press', 11);
      animateAdd('.wo-ex3', 'Push Ups', 8);

      // ---- 3. START WORKOUT (Active State) ----
      tl.to({}, { duration: 0.6 });
      tl.to('.wo-active-overlay', { x: 0, duration: 0.5, ease: 'power3.out' });

      // EX 1: DONE
      tl.to({}, { duration: 1.2 });
      tl.to('.wo-ex1-btn-done', { scale: 0.9, duration: 0.1 });
      tl.to('.wo-ex1-btn-done', { scale: 1, backgroundColor: '#15803d', duration: 0.2, ease: 'back.out(2)' });
      
      tl.to({}, { duration: 0.4 });
      tl.to('.wo-active-ex1', { x: -50, opacity: 0, duration: 0.3, display: 'none' });
      tl.set('.wo-active-ex2', { display: 'flex' });
      tl.to('.wo-active-ex2', { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });

      // EX 2: SKIP
      tl.to({}, { duration: 1.2 });
      tl.to('.wo-ex2-btn-skip', { scale: 0.9, duration: 0.1 });
      tl.to('.wo-ex2-btn-skip', { scale: 1, backgroundColor: '#ef4444', color: '#fff', duration: 0.2, ease: 'back.out(2)' });
      
      tl.to({}, { duration: 0.4 });
      tl.to('.wo-active-ex2', { x: -50, opacity: 0, duration: 0.3, display: 'none' });
      tl.set('.wo-active-ex3', { display: 'flex' });
      tl.to('.wo-active-ex3', { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });

      // EX 3: LATER
      tl.to({}, { duration: 1.2 });
      tl.to('.wo-ex3-btn-later', { scale: 0.9, duration: 0.1 });
      tl.to('.wo-ex3-btn-later', { scale: 1, backgroundColor: '#6366f1', color: '#fff', duration: 0.2, ease: 'back.out(2)' });

      // ---- 4. COMPLETE WORKOUT ----
      tl.to({}, { duration: 0.6 });
      tl.set('.wo-complete-overlay', { display: 'flex' });
      tl.to('.wo-complete-overlay', { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' });
      
      tl.to({}, { duration: 2.5 });
      
      tl.to('.wo-complete-overlay', { opacity: 0, duration: 0.3 });
      tl.to('.wo-active-overlay', { x: 300, duration: 0.3 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const ActiveExerciseCard = ({ id, name, gif, setInfo }) => (
    <div className={\`wo-active-ex\${id} absolute inset-0 flex flex-col\`}>
      <span className="text-[#a1a1aa] text-[10px] font-bold uppercase tracking-widest mb-1">Current Exercise</span>
      <h2 className="text-white text-2xl font-bold tracking-tight mb-4">{name}</h2>
      
      {/* GIF CONTAINER: Updated for object-contain and centering */}
      <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/5 flex items-center justify-center p-2 relative shadow-inner">
         <img src={gif} className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" alt={name} />
      </div>

      <div className="bg-[#18181b] rounded-2xl p-4 border border-white/5 flex flex-col gap-4 shadow-xl">
         <div className="flex justify-between items-center pb-4 border-b border-[#27272a]">
           <span className="text-white font-bold text-sm">Set 1</span>
           <span className="text-[#a1a1aa] font-medium text-[13px]">{setInfo}</span>
         </div>
         
         <div className="flex items-center gap-3">
            <div className={\`wo-ex\${id}-btn-skip wo-btn-skip flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-[#e4e4e7] font-semibold py-2.5 rounded-lg text-center text-xs shadow-sm transition-colors\`}>Skip</div>
            <div className={\`wo-ex\${id}-btn-later wo-btn-later flex-1 bg-[#1e1b4b] hover:bg-[#312e81] text-[#818cf8] font-semibold py-2.5 rounded-lg text-center text-xs shadow-sm transition-colors\`}>Later</div>
            <div className={\`wo-ex\${id}-btn-done wo-btn-done w-14 bg-[#22c55e] shrink-0 text-white font-bold py-2.5 rounded-lg shadow-sm flex items-center justify-center transition-colors\`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      <div 
        ref={containerRef}
        className="relative mt-20 w-[280px] h-[580px] rounded-[3rem] border-[10px] border-[#0d0d12] bg-[#09090b] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-40 shadow-sm" />

        {/* --- BASE PLANNER VIEW --- */}
        <div className="absolute inset-0 pt-16 px-4 flex flex-col z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white tracking-tight">Full Body</h2>
          </div>

          <div className="wo-add-btn w-full bg-blue-600 rounded-xl py-3 flex items-center justify-center gap-2 mb-4 shadow-lg shadow-blue-900/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span className="text-white font-bold text-sm tracking-wide">Add Exercise</span>
          </div>

          <div className="flex flex-col">
            <div className="wo-ex1 bg-[#18181b] rounded-xl overflow-hidden border border-white/5 relative">
              <div className="flex items-center justify-between mb-3"><span className="text-white font-bold text-sm">Pull Ups</span></div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <div className="bg-black/40 px-2 py-1 rounded font-medium">3 Sets</div><div className="bg-black/40 px-2 py-1 rounded font-medium">8 Reps</div>
              </div>
            </div>
            <div className="wo-ex2 bg-[#18181b] rounded-xl overflow-hidden border border-white/5 relative">
              <div className="flex items-center justify-between mb-3"><span className="text-white font-bold text-sm">Bench Press</span></div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <div className="bg-black/40 px-2 py-1 rounded font-medium">4 Sets</div><div className="bg-black/40 px-2 py-1 rounded font-medium">10 Reps</div>
              </div>
            </div>
            <div className="wo-ex3 bg-[#18181b] rounded-xl overflow-hidden border border-white/5 relative">
              <div className="flex items-center justify-between mb-3"><span className="text-white font-bold text-sm">Push Ups</span></div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <div className="bg-black/40 px-2 py-1 rounded font-medium">3 Sets</div><div className="bg-black/40 px-2 py-1 rounded font-medium">AMRAP</div>
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
          <div className="wo-search-result opacity-0 translate-y-2 mt-2 bg-[#18181b] p-3 rounded-lg border border-white/5 flex items-center justify-between">
            <span className="wo-search-result-text text-white font-bold text-sm"></span>
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
          </div>
        </div>

        {/* --- ACTIVE WORKOUT OVERLAY --- */}
        <div className="wo-active-overlay absolute inset-0 bg-[#09090b] z-30 pt-16 px-4 flex flex-col">
          <div className="w-full h-1.5 bg-[#27272a] rounded-full overflow-hidden mb-6">
             <div className="w-1/2 h-full bg-[#3b82f6] rounded-full" />
          </div>

          <div className="flex-1 relative">
             <ActiveExerciseCard id={1} name="Pull Ups" gif="/pull-up.gif" setInfo="8 Reps @ Bodyweight" />
             <ActiveExerciseCard id={2} name="Bench Press" gif="/dumbbell-bench-press.gif" setInfo="10 Reps @ 135 lbs" />
             <ActiveExerciseCard id={3} name="Push Ups" gif="/push-up.gif" setInfo="Failure @ Bodyweight" />
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

const regex = /function WorkoutPlanningAnimation\(\) \{[\s\S]*?(?=function HorizontalFeatures\(\) \{)/;
if (content.match(regex)) {
  content = content.replace(regex, newComponentCode + '\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully styled WorkoutPlanningAnimation with more exercises and variations.');
} else {
  console.log('Could not find WorkoutPlanningAnimation to replace.');
}
