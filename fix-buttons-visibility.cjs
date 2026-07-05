const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\{\/\* Action Buttons \*\/\}\s*<div className="flex flex-col gap-3 pb-8">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* =========================================\s*SCREEN C: ADD EXERCISE OVERLAY/;

const replacement = `
            </div>
            
            {/* Sticky Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c] to-transparent pt-12 z-40 rounded-b-[2rem]">
              <div className="flex flex-col gap-3 pb-2">
                <div className="wo-real-btn-done w-full bg-[#16a34a] py-4 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base">Done</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-[#6366f1] py-4 rounded-2xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-base">Later</span>
                  </div>
                  <div className="flex-1 bg-[#ef4444] py-4 rounded-2xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-base">Skip</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================
              SCREEN C: ADD EXERCISE OVERLAY`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  // Also need to increase padding on the scrollable area
  content = content.replace(/<div className="px-5 overflow-y-auto no-scrollbar pb-16 flex-1">/, '<div className="px-5 overflow-y-auto no-scrollbar pb-40 flex-1">');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully made action buttons sticky at the bottom.');
} else {
  console.log('Could not find Action Buttons to replace.');
}
