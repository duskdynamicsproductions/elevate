const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newComponentCode = `
function PhysicalAnalyticsAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Init states
      tl.set('.pa-screen-b', { x: 350, display: 'none' });
      tl.set('.pa-screen-c', { y: 750, display: 'none' });
      
      // Screen A -> Screen B (Click Monthly analysis)
      tl.to({}, { duration: 1.5 });
      tl.to('.pa-btn-monthly', { scale: 0.95, duration: 0.1 });
      tl.to('.pa-btn-monthly', { scale: 1, duration: 0.1 });
      tl.set('.pa-screen-b', { display: 'flex' });
      tl.to('.pa-screen-b', { x: 0, duration: 0.5, ease: 'power3.out' });

      // Screen B view
      tl.to({}, { duration: 1.5 });
      
      // Scroll down in Screen B to see the heatmap
      tl.to('.pa-b-scroll', { y: -250, duration: 1.2, ease: 'power2.inOut' });
      tl.to({}, { duration: 0.5 });
      
      // Click heatmap to open Screen C
      tl.to('.pa-heatmap-card', { scale: 0.97, duration: 0.1 });
      tl.to('.pa-heatmap-card', { scale: 1, duration: 0.1 });
      tl.set('.pa-screen-c', { display: 'flex' });
      tl.to('.pa-screen-c', { y: 0, duration: 0.5, ease: 'power3.out' });

      // Screen C view (Detailed Heatmap)
      tl.to({}, { duration: 2.5 });
      
      // Close Screen C
      tl.to('.pa-c-close', { scale: 0.8, duration: 0.1 });
      tl.to('.pa-c-close', { scale: 1, duration: 0.1 });
      tl.to('.pa-screen-c', { y: 750, duration: 0.4, ease: 'power3.in' });
      tl.set('.pa-screen-c', { display: 'none' });

      // Reset scroll in Screen B
      tl.to('.pa-b-scroll', { y: 0, duration: 0.8, ease: 'power3.inOut' });
      tl.to({}, { duration: 0.5 });
      
      // Close Screen B
      tl.to('.pa-b-close', { scale: 0.8, duration: 0.1 });
      tl.to('.pa-b-close', { scale: 1, duration: 0.1 });
      tl.to('.pa-screen-b', { x: 350, duration: 0.4, ease: 'power3.in' });
      tl.set('.pa-screen-b', { display: 'none' });
      
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

        {/* SCALE WRAPPER */}
        <div className="absolute inset-0 z-10" style={{ width: '125%', height: '125%', transform: 'scale(0.8)', transformOrigin: 'top left' }}>
          
          {/* =========================================
              SCREEN A: DASHBOARD
              ========================================= */}
          <div className="absolute inset-0 pt-10 flex flex-col bg-[#050505] overflow-hidden text-white">
            <div className="px-5 overflow-y-auto no-scrollbar pb-24 flex-1">
              
              <div className="relative w-full h-[380px] bg-[#0a0a0c] rounded-3xl border border-white/5 overflow-hidden mb-6 mt-4 flex flex-col justify-end p-5">
                 {/* Muscular System Image - Placeholder if image doesn't exist */}
                 <div className="absolute inset-0 w-full h-full opacity-60 bg-cover bg-top" style={{ backgroundImage: 'url("/Muscular System.png")' }}>
                    <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                       <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="1"><path d="M12 2C8 2 4 6 4 10c0 4 8 12 8 12s8-8 8-12c0-4-4-8-8-8z"/><path d="M12 12c-1.5 0-2.5-1-2.5-2.5S10.5 7 12 7s2.5 1 2.5 2.5S13.5 12 12 12z"/></svg>
                    </div>
                 </div>
                 
                 {/* Badge Top Right */}
                 <div className="absolute top-5 right-5 w-12 h-16 bg-gradient-to-b from-[#f59e0b] to-[#b45309] rounded-t-full rounded-b-md flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.5)] border border-[#fcd34d]/50">
                   <span className="text-white font-black text-xl drop-shadow-md">I</span>
                   <div className="absolute -bottom-3 left-0 w-3 h-5 bg-red-700 -skew-y-[30deg]"></div>
                   <div className="absolute -bottom-3 right-0 w-3 h-5 bg-red-700 skew-y-[30deg]"></div>
                 </div>

                 {/* Stats overlay */}
                 <div className="relative z-10 w-full">
                   <div className="flex items-center gap-2 mb-2"><span className="text-white font-black text-[16px] drop-shadow-md">Current Streak</span><span className="text-white font-bold text-xs">- 1 days</span></div>
                   <div className="flex items-center gap-2 mb-5"><span className="text-white font-black text-[16px] drop-shadow-md">Longest Streak</span><span className="text-white font-bold text-xs">- 10 days</span></div>
                   
                   <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="text-white font-black text-[16px] drop-shadow-md">Level 1 <span className="font-normal text-white/70">- Beginner</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span className="text-[#f59e0b] font-bold text-sm">1%</span>
                      </div>
                   </div>
                   
                   <span className="text-[#f59e0b] text-[12px] font-bold block mb-2 drop-shadow-md">Bronze I</span>
                   
                   <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                       <div className="bg-[#f59e0b] h-full w-[5%] rounded-full shadow-[0_0_10px_#f59e0b]"></div>
                   </div>
                   <div className="text-right text-[11px] text-white/50 font-bold">325 XP</div>
                 </div>
                 
                 <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
              </div>

              <div className="flex flex-col gap-3">
                 <div className="w-full py-4 bg-[#22c55e] rounded-2xl flex items-center justify-center font-black text-black text-base shadow-lg">Workout planner</div>
                 <div className="pa-btn-monthly w-full py-4 bg-[#f59e0b] rounded-2xl flex items-center justify-center font-black text-black text-base shadow-lg cursor-pointer">Monthly analysis</div>
                 <div className="w-full py-4 bg-[#1e1b4b] rounded-2xl flex items-center justify-center font-black text-[#4ade80] text-base shadow-lg gap-2">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                   Exercise browser
                 </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-black flex justify-around items-center border-t border-white/5 z-20">
               <div className="opacity-50"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg></div>
               <div className="opacity-50"><svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>
               <div className="opacity-100"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            </div>
          </div>

          {/* =========================================
              SCREEN B: MONTHLY ANALYSIS
              ========================================= */}
          <div className="pa-screen-b absolute inset-0 bg-[#050505] flex flex-col pt-12 overflow-hidden z-30">
            <div className="px-5 flex items-center gap-4 mb-5 shrink-0">
               <div className="pa-b-close p-1 cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
               </div>
               <h1 className="text-white font-bold text-xl">Physical Analytics</h1>
            </div>

            <div className="overflow-hidden flex-1 relative">
              <div className="pa-b-scroll px-5 flex flex-col pb-24">
                 
                 {/* Composition Card */}
                 <div className="bg-[#0a0a0c] rounded-[2rem] p-6 border border-white/5 mb-5 shadow-xl">
                    <span className="text-[#22c55e] font-black text-[13px] block mb-1">June 2026</span>
                    <h2 className="text-white font-black text-2xl tracking-tight leading-tight mb-1">Anatomical Composition</h2>
                    <span className="text-[#a1a1aa] text-sm block mb-8">BMI 23.4 - Normal</span>
                    
                    <div className="flex gap-4">
                       <div className="w-1/2 flex items-center justify-center opacity-30">
                          <svg width="100" height="200" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M9 7H6a2 2 0 0 0-2 2v5h2v8h2v-8h4v8h2v-8h2V9a2 2 0 0 0-2-2h-3"/></svg>
                       </div>
                       <div className="w-1/2 flex flex-col gap-5">
                          <div>
                             <span className="text-[#a1a1aa] font-bold text-[11px] block mb-0.5">Height</span>
                             <span className="text-white font-black text-xl">179</span>
                          </div>
                          <div>
                             <span className="text-[#a1a1aa] font-bold text-[11px] block mb-0.5">Weight</span>
                             <span className="text-white font-black text-xl">75</span>
                          </div>
                          <div>
                             <span className="text-[#a1a1aa] font-bold text-[11px] block mb-0.5">Goal bodyweight</span>
                             <span className="text-white font-black text-xl">40</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                             <span className="border border-[#22c55e] text-[#22c55e] font-bold text-[10px] px-2.5 py-1 rounded-full bg-[#052e16]">Cut</span>
                             <span className="text-white font-bold text-[10px] px-2.5 py-1">Maintain</span>
                             <span className="text-white font-bold text-[10px] px-2.5 py-1">Fat loss</span>
                             <span className="text-white font-bold text-[10px] px-2.5 py-1">Gain</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between mt-10 mb-5">
                       <h3 className="text-white font-black text-lg">Body Targets</h3>
                       <span className="text-[#22c55e] font-bold text-[11px]">Formulas</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                       <div className="col-span-2 bg-[#111113] border border-white/5 rounded-2xl p-4">
                          <span className="text-[#a1a1aa] font-bold text-[11px] block mb-1">Calories</span>
                          <span className="text-[#22c55e] font-black text-2xl">1800 kcal</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-2xl p-4">
                          <span className="text-[#a1a1aa] font-bold text-[11px] block mb-1">Protein</span>
                          <span className="text-[#0ea5e9] font-black text-xl">143g</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-2xl p-4">
                          <span className="text-[#a1a1aa] font-bold text-[11px] block mb-1">Fat</span>
                          <span className="text-[#eab308] font-black text-xl">45g</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-2xl p-4">
                          <span className="text-[#a1a1aa] font-bold text-[11px] block mb-1">Carbs</span>
                          <span className="text-[#3b82f6] font-black text-xl">206g</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-2xl p-4">
                          <span className="text-[#a1a1aa] font-bold text-[11px] block mb-1">Fiber</span>
                          <span className="text-[#22c55e] font-black text-xl">25g</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-2xl p-4">
                          <span className="text-[#a1a1aa] font-bold text-[11px] block mb-1">Water</span>
                          <span className="text-[#0ea5e9] font-black text-xl">3.5L+</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-2xl p-4">
                          <span className="text-[#a1a1aa] font-bold text-[11px] block mb-1">Loss</span>
                          <span className="text-[#ef4444] font-black text-xl">0.5kg/wk</span>
                       </div>
                    </div>
                 </div>

                 {/* Heatmap Card */}
                 <div className="pa-heatmap-card bg-[#0a0a0c] rounded-[2rem] p-6 border border-white/5 shadow-xl cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                       <div className="text-center">
                         <h3 className="text-white font-black text-lg leading-tight mb-1">Heaviest weight this month</h3>
                         <span className="text-[#22c55e] font-bold text-sm block">June 2026</span>
                       </div>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                    
                    {/* Mini Grid */}
                    <div className="mt-8 flex gap-4 opacity-80">
                       <div className="flex-1 grid grid-cols-10 gap-0.5">
                          {Array.from({length: 60}).map((_, i) => (
                             <div key={i} className={\`aspect-square \${Math.random() > 0.8 ? 'bg-[#ef4444]' : Math.random() > 0.85 ? 'bg-[#3b82f6]' : Math.random() > 0.7 ? 'bg-white/30' : 'bg-[#18181b]'}\`}></div>
                          ))}
                       </div>
                       <div className="flex-1 grid grid-cols-10 gap-0.5">
                          {Array.from({length: 60}).map((_, i) => (
                             <div key={i} className={\`aspect-square \${Math.random() > 0.8 ? 'bg-[#ef4444]' : Math.random() > 0.85 ? 'bg-[#3b82f6]' : Math.random() > 0.7 ? 'bg-white/30' : 'bg-[#18181b]'}\`}></div>
                          ))}
                       </div>
                    </div>
                 </div>

              </div>
            </div>
          </div>

          {/* =========================================
              SCREEN C: DETAILED HEATMAP
              ========================================= */}
          <div className="pa-screen-c absolute inset-0 bg-[#050505] flex flex-col pt-14 overflow-hidden z-40">
             <div className="px-5 flex items-start justify-between mb-10 shrink-0">
               <div>
                  <h2 className="text-white font-black text-2xl leading-tight mb-1">Heaviest weight this month</h2>
                  <span className="text-[#22c55e] font-bold text-[15px]">June 2026</span>
               </div>
               <div className="pa-c-close p-2 bg-[#18181b] rounded-full shrink-0 cursor-pointer mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
               </div>
             </div>

             <div className="px-2 flex-1 overflow-hidden flex flex-col">
                <div className="flex h-full pb-8">
                   {/* Left labels (Vertical text) */}
                   <div className="flex flex-col justify-between items-end pr-3 w-16 h-full pb-6 pt-6">
                      {['Back', 'Upper Arms', 'Thighs', 'Calves', 'Chest', 'Hips', 'Shoulders', 'Waist / Abs', 'Forearms', 'Hands', 'Neck', 'Feet'].map(muscle => (
                         <span className="text-white/60 text-[10px] transform -rotate-90 whitespace-nowrap" key={muscle}>{muscle}</span>
                      ))}
                   </div>
                   {/* Grid area (12 cols, 30 rows) */}
                   <div className="flex-1 bg-[#0a0a0c] border border-white/5 grid grid-cols-12 grid-rows-[30] gap-[1px] p-[1px] mr-2 h-full">
                      {Array.from({length: 360}).map((_, i) => (
                         <div key={i} className={\`w-full h-full \${Math.random() > 0.9 ? 'bg-[#ef4444]' : Math.random() > 0.95 ? 'bg-[#3b82f6]' : Math.random() > 0.85 ? 'bg-[#fca5a5]' : 'bg-[#18181b]'}\`}></div>
                      ))}
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

const replaceCode = `
            {/* WORKOUT PLANNING */}
            {feat.num === '05' && <WorkoutPlanningAnimation />}
            {/* PHYSICAL ANALYTICS */}
            {feat.num === '06' && <PhysicalAnalyticsAnimation />}
`;

if (!content.includes('function PhysicalAnalyticsAnimation()')) {
  // Add component before HorizontalFeatures
  content = content.replace(/function HorizontalFeatures\(\) \{/, newComponentCode + '\nfunction HorizontalFeatures() {');
  // Inject into feature list
  content = content.replace(/\{\/\* WORKOUT PLANNING \*\/\}\s*\{feat\.num === '05' && <WorkoutPlanningAnimation \/>\}/, replaceCode);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully added PhysicalAnalyticsAnimation.');
} else {
  console.log('PhysicalAnalyticsAnimation already exists.');
}
