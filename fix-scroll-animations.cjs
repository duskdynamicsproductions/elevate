const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

let modified = false;

// 1. useReveal
if (content.includes('if (entry.isIntersecting) { setRevealed(true); observer.unobserve(el); }')) {
  content = content.replace(
    /if \(entry\.isIntersecting\) \{ setRevealed\(true\); observer\.unobserve\(el\); \}/g,
    'setRevealed(entry.isIntersecting);'
  );
  modified = true;
}

// 2. RollingNumber
if (content.includes('if (e.isIntersecting) { setFired(true); obs.unobserve(el); }')) {
  content = content.replace(
    /if \(e\.isIntersecting\) \{ setFired\(true\); obs\.unobserve\(el\); \}/g,
    'setFired(e.isIntersecting);'
  );
  modified = true;
}

// 3. KineticText ScrollTrigger
if (content.includes("scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }")) {
  content = content.replace(
    /scrollTrigger: \{ trigger: containerRef\.current, start: 'top 80%' \}/g,
    "scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' }"
  );
  modified = true;
}

if (modified) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated animations to reverse/reset on scroll up!');
} else {
  console.log('No matches found to replace.');
}
