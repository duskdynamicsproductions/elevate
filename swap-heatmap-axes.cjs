const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<div className="px-2 flex-1 overflow-hidden flex flex-col">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);/;

const newCode = `<div className="px-3 flex-1 overflow-hidden flex flex-col pb-8">
                
                {/* Top labels (Muscles) */}
                <div className="flex pl-6 mb-1 mr-1">
                   {['Feet', 'Neck', 'Hands', 'Forearms', 'Waist/Abs', 'Shoulders', 'Hips', 'Chest', 'Calves', 'Thighs', 'Arms', 'Back'].map(muscle => (
                      <div className="flex-1 flex justify-center items-end h-16" key={muscle}>
                         <span className="text-white/60 text-[8px] transform -rotate-90 origin-bottom-left whitespace-nowrap mb-1 block w-2 leading-none">{muscle}</span>
                      </div>
                   ))}
                </div>

                <div className="flex flex-1 min-h-0">
                   {/* Left labels (Dates 1-30) */}
                   <div className="w-6 flex flex-col justify-between items-end pr-2 py-0.5">
                      {Array.from({length: 30}).map((_, i) => (
                         <span className="text-white/60 text-[7px] leading-none" key={i}>{i + 1}</span>
                      ))}
                   </div>
                   
                   {/* Grid area (12 cols, 30 rows) */}
                   <div className="flex-1 bg-[#0a0a0c] border border-white/5 grid grid-cols-12 grid-rows-[30] gap-[1px] p-[1px] h-full">
                      {Array.from({length: 360}).map((_, i) => (
                         <div key={i} className={\`w-full h-full \${Math.random() > 0.92 ? 'bg-[#ef4444]' : Math.random() > 0.94 ? 'bg-[#3b82f6]' : Math.random() > 0.88 ? 'bg-[#fca5a5]' : 'bg-[#18181b]'}\`}></div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        
        </div>
      </div>
    </div>
  );`;

if (content.match(regex)) {
  content = content.replace(regex, newCode);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully swapped axes for the Detailed Heatmap.');
} else {
  console.log('Could not find the target code to replace.');
}
