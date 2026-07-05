const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace Screen A image
const screenARegex = /<div className="absolute inset-0 w-full h-full opacity-80 bg-cover bg-top" style=\{\{ backgroundImage: 'url\("\/Muscular System\.png"\)' \}\}>[\s\S]*?<\/div>\s*<\/div>/;
const screenAReplace = `<div className="absolute inset-0 w-full h-full opacity-100 flex items-center justify-center p-4 pt-12 pb-0">
                    <img src="/Muscular System.svg" className="w-full h-full object-contain object-bottom" alt="Muscular System" />
                 </div>`;

// Replace Screen B silhouette
const screenBRegex = /<div className="w-1\/2 flex items-center justify-center opacity-30">[\s\S]*?<\/div>/;
const screenBReplace = `<div className="w-1/2 flex items-center justify-center p-2">
                          <img src="/Muscular System.svg" className="w-full h-full object-contain opacity-90" alt="Anatomy" />
                       </div>`;

if (content.match(screenARegex) && content.match(screenBRegex)) {
  content = content.replace(screenARegex, screenAReplace);
  content = content.replace(screenBRegex, screenBReplace);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully replaced placeholders with the Muscular System.svg image.');
} else {
  console.log('Could not find the exact placeholders in App.tsx.');
}
