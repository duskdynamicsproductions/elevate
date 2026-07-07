const fs = require('fs');
const path = require('path');

function processFile(filename) {
  const filepath = path.join(__dirname, 'src', filename);
  let content = fs.readFileSync(filepath, 'utf-8');
  
  if (!content.includes("import { ImageWithSkeleton }")) {
    content = content.replace(
      "import React",
      "import { ImageWithSkeleton } from './ImageWithSkeleton';\nimport React"
    );
  }

  content = content.replace(/<img\b([^>]*?)>/g, (match, attributes) => {
    if (match.includes('pull-up.gif') || match.includes('push-up.gif') || match.includes('dumbbell-bench-press.gif') || match.includes('Muscular System.svg') || match.includes('intro.gif')) {
      return `<ImageWithSkeleton${attributes}>`;
    }
    return match;
  });

  fs.writeFileSync(filepath, content);
  console.log('Processed ' + filename);
}

processFile('AppDesktop.tsx');
processFile('AppMobile.tsx');
