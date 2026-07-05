import { useEffect, useRef, useState, useMemo, useId } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════ */

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Focus', href: '#focus' },
  { label: 'Planner', href: '#planner' },
];

const heroWords = ['harder.', 'sharper.', 'deeper.', 'harder.'];

const features = [
  {
    num: '01',
    title: 'Distraction blocking',
    desc: 'Locks out distracting apps during your Distractions Out mode. Try this to reduce social media exposure and screen time along with providing breaks to alter the dopamine cycle routing it properly not just avoiding',
  },
  {
    num: '02',
    title: 'App limits',
    desc: 'Each app assigned 30 minutes everyday - Instagram, YouTube, Twitter. When the limit hits, the app lock you out. No modding just toggle. Turn it on see the results',
  },
  {
    num: '03',
    title: 'Reels scrolled',
    desc: "See exactly how many Reels  you consumed today. The number is confronting. That's the point.",
  },
  {
    num: '04',
    title: 'NSFW Detox',
    desc: 'Tracks your searches, content you consume,. Our AI models constantly searches for any NSFW content and if it finds anything related to that, gets you immedietaly blocked out of that scene',
  },
  {
    num: '05',
    title: 'Workout planning',
    desc: 'Log sets, reps, and weights. Build templates or follow curated splits. Track progressive overload automatically.',
  },
  {
    num: '06',
    title: 'Physical analytics',
    desc: 'Charts, streaks, and trends. Understand your body and performance with rich data-driven insights.',
  },
];

const workoutTemplates = [
  { name: 'PUSH', exercises: ['Bench Press', 'Overhead Press', 'Incline Dumbbell', 'Tricep Pushdown', 'Lateral Raises'] },
  { name: 'PULL', exercises: ['Deadlift', 'Pull-ups', 'Barbell Row', 'Face Pulls', 'Bicep Curls'] },
  { name: 'LEGS', exercises: ['Squats', 'Leg Press', 'Romanian Deadlift', 'Leg Extensions', 'Calf Raises'] },
  { name: 'UPPER LOWER', exercises: ['Upper: Bench, Row, OH Press', 'Lower: Squat, DL, Leg Press'] },
  { name: 'FULL BODY', exercises: ['Squat', 'Bench', 'Deadlift', 'Overhead Press', 'Barbell Row'] },
  { name: 'PPL SPLIT', exercises: ['Push (Chest/Tri/Shoulders)', 'Pull (Back/Bi)', 'Legs (Quads/Hams/Calves)'] }
];

/* ══════════════════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════════════════ */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0.05, ease: 'none' });
      
      // Dynamic contrast detection
      const target = document.elementFromPoint(mouseX, mouseY);
      if (target) {
        const isLight = target.closest('.bg-elevate-orange, .bg-elevate-paper');
        if (isLight) {
          cursor.style.borderColor = 'rgba(12,11,11,0.8)';
          dot.style.backgroundColor = '#0C0B0B';
        } else {
          cursor.style.borderColor = 'rgba(253,252,250,0.6)';
          dot.style.backgroundColor = '#FDFCFA';
        }
      }
    };
    
    const tick = () => {
      curX += (mouseX - curX) * 0.08; curY += (mouseY - curY) * 0.08;
      gsap.set(cursor, { x: curX - 12, y: curY - 12 });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    
    const onEnter = () => gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed top-0 left-0 z-[9999] h-6 w-6 rounded-full border border-elevate-paper/60 transition-colors duration-200" style={{ willChange: 'transform' }} />
      <div ref={dotRef} className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-elevate-paper transition-colors duration-200" style={{ willChange: 'transform' }} />
    </>
  );
}



/* ══════════════════════════════════════════════════════════
   MESH WORD — scatter/assemble with glitch, random order
══════════════════════════════════════════════════════════ */
const GLITCH_POOL = '!<>-_\\/[]{}=+*^?#~@$%&ABCDEFabcdef01234';

function MeshWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [chars, setChars]  = useState<string[]>(() => words[0].split(''));
  const containerRef       = useRef<HTMLSpanElement>(null);
  const busyRef            = useRef(false);
  const isFirstMount       = useRef(true);

  // IN: random order so it never sweeps left→right
  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return; }
    const container = containerRef.current;
    if (!container) return;
    const spans = Array.from(container.querySelectorAll<HTMLElement>('.mw-c'));
    const word  = words[index];
    // shuffle indices
    const order = [...spans.keys()].sort(() => Math.random() - 0.5);

    order.forEach((charIdx, orderIdx) => {
      const span = spans[charIdx];
      if (!span) return;
      gsap.set(span, {
        x: (Math.random() - 0.5) * 700, y: (Math.random() - 0.5) * 340,
        rotation: (Math.random() - 0.5) * 200, scale: Math.random() * 0.15 + 0.05,
        opacity: 0, filter: 'blur(28px)',
      });
      // glitch scramble during assembly
      let tick = 0;
      const maxTicks = 8 + orderIdx * 2;
      const scr = setInterval(() => {
        if (tick < maxTicks) {
          span.textContent = GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)];
          tick++;
        } else {
          span.textContent = word[charIdx] ?? '';
          clearInterval(scr);
        }
      }, 36);
      gsap.to(span, {
        x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
        duration: 0.85, delay: orderIdx * 0.07, ease: 'power4.out',
        onComplete: orderIdx === order.length - 1
          ? () => { busyRef.current = false; } : undefined,
      });
    });
  }, [index]); // eslint-disable-line

  // OUT: random order so exit is equally unpredictable
  useEffect(() => {
    const id = setInterval(() => {
      if (busyRef.current) return;
      busyRef.current = true;
      const container = containerRef.current;
      if (!container) return;
      const spans   = Array.from(container.querySelectorAll<HTMLElement>('.mw-c'));
      const nextIdx = (index + 1) % words.length;
      const order   = [...spans.keys()].sort(() => Math.random() - 0.5);
      let done = 0;

      order.forEach((charIdx, orderIdx) => {
        const span = spans[charIdx];
        if (!span) return;
        // glitch on exit
        let tick = 0;
        const scr = setInterval(() => {
          if (tick < 7) { span.textContent = GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)]; tick++; }
          else clearInterval(scr);
        }, 38);
        gsap.to(span, {
          x: (Math.random() - 0.5) * 600, y: (Math.random() - 0.5) * 300,
          rotation: (Math.random() - 0.5) * 200, scale: Math.random() * 0.1 + 0.03,
          opacity: 0, filter: 'blur(22px)',
          duration: 0.55, delay: orderIdx * 0.05, ease: 'power3.in',
          onComplete: () => {
            done++;
            if (done === spans.length) {
              setIndex(nextIdx);
              setChars(words[nextIdx].split(''));
            }
          },
        });
      });
    }, 3200);
    return () => clearInterval(id);
  }, [index, words]);

  return (
    <span ref={containerRef} className="inline-flex relative" aria-live="polite">
      {chars.map((ch, i) => (
        <span key={i} className="mw-c inline-block will-change-transform"
          style={{ transformOrigin: 'center center' }}>{ch}</span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   ROLLING NUMBER — slot-machine digit reveal
══════════════════════════════════════════════════════════ */
const DIGITS = ['0','1','2','3','4','5','6','7','8','9'];

export function ElevateMedal({ size = 100, color = '#1ED760', rank = 'III', className = '' }: { size?: number, color?: string, rank?: string, className?: string }) {
  const svgWidth = size * 1.64;
  const svgHeight = size * 1.28;
  const uid = useId().replace(/:/g, '');

  return (
    <svg width={svgWidth} height={svgHeight} viewBox="0 0 164 128" className={className}>
      <defs>
        <linearGradient id={`rim-grad-${uid}`} x1="0" y1="0" x2="250" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="25%" stopColor={color} />
          <stop offset="50%" stopColor="black" stopOpacity="0.5" />
          <stop offset="75%" stopColor={color} />
          <stop offset="100%" stopColor="white" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id={`inner-shadow-${uid}`} x1="9" y1="9" x2="9" y2="259" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="black" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        <radialGradient id={`inner-grad-${uid}`} cx="162" cy="162" r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="30%" stopColor={color} stopOpacity="0.85" />
          <stop offset="60%" stopColor={color} />
          <stop offset="100%" stopColor="black" stopOpacity="0.3" />
        </radialGradient>

        <linearGradient id={`border-grad-${uid}`} x1="12" y1="12" x2="262" y2="262" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="black" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id={`gloss-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        <filter id={`text-shadow-${uid}`}>
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="black" floodOpacity="0.6" />
        </filter>

        <clipPath id={`inner-clip-${uid}`}>
          <circle cx="50" cy="50" r="38" />
        </clipPath>

        <filter id={`ribbon-shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="black" floodOpacity="0.5" />
        </filter>

        <filter id={`medal-shadow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur1" />
          <feOffset dx="0" dy="4" result="offsetBlur1" />
          <feFlood floodColor={color} floodOpacity="0.6" result="color1" />
          <feComposite in="color1" in2="offsetBlur1" operator="in" result="shadow1" />

          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur2" />
          <feOffset dx="0" dy="8" result="offsetBlur2" />
          <feFlood floodColor="black" floodOpacity="0.3" result="color2" />
          <feComposite in="color2" in2="offsetBlur2" operator="in" result="shadow2" />

          <feMerge>
            <feMergeNode in="shadow2" />
            <feMergeNode in="shadow1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ribbons with Shadow */}
      <g filter={`url(#ribbon-shadow-${uid})`}>
        <path d="M 36.08 64 L 75.44 64 L 59.04 125.44 L 41 110.08 L 22.96 125.44 Z" fill="#D32F2F" />
        <path d="M 88.56 64 L 127.92 64 L 141.04 125.44 L 123 110.08 L 104.96 125.44 Z" fill="#D32F2F" />
      </g>

      {/* Main Medal Group with Shadow */}
      <g transform="translate(32, 0)" filter={`url(#medal-shadow-${uid})`}>
        {/* Outer Rim */}
        <circle cx="50" cy="50" r="50" fill={`url(#rim-grad-${uid})`} />

        {/* Inner Shadow Ring */}
        <circle cx="50" cy="50" r="41" fill={`url(#inner-shadow-${uid})`} />

        {/* Inner Circle */}
        <circle cx="50" cy="50" r="38" fill={`url(#inner-grad-${uid})`} stroke={`url(#border-grad-${uid})`} strokeWidth="3" />

        {/* Text */}
        <text x="50" y="62.5" fontSize="35" fontWeight="900" fill="white" textAnchor="middle" filter={`url(#text-shadow-${uid})`} style={{ fontFamily: 'system-ui, sans-serif' }}>
          {rank}
        </text>

        {/* Gloss Highlight */}
        <rect x="12" y="12" width="76" height="34.2" rx="17.1" fill={`url(#gloss-grad-${uid})`} clipPath={`url(#inner-clip-${uid})`} />
      </g>
    </svg>
  );
}

function RollingDigit({ target, delay, color }: { target: string; delay: number; color: string }) {
  const colRef = useRef<HTMLDivElement>(null);
  const targetIndex = DIGITS.indexOf(target);
  useEffect(() => {
    const el = colRef.current;
    if (!el || targetIndex < 0) return;
    const extraSpins = 2;
    const totalItems = DIGITS.length * extraSpins + targetIndex;
    const stripLength = DIGITS.length * 3;
    gsap.set(el, { y: 0, yPercent: 0 });
    gsap.to(el, { 
      yPercent: -(totalItems / stripLength) * 100, 
      duration: 1.4 + delay * 0.3, 
      delay: delay * 0.08, 
      ease: 'power4.out' 
    });
  }, [target, delay, targetIndex]);
  const strip: string[] = [];
  for (let s = 0; s < 3; s++) strip.push(...DIGITS);
  return (
    <div className="relative overflow-hidden" style={{ height: '1.25em', lineHeight: '1.25em' }}>
      <div ref={colRef} className="flex flex-col" style={{ color }}>
        {strip.map((d, i) => <span key={i} className="block" style={{ height: '1.25em', lineHeight: '1.25em' }}>{d}</span>)}
      </div>
    </div>
  );
}

function RollingNumber({ value, color = '#FF6200', className = '' }: { value: string; color?: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);
  const digits = Array.from(value);
  useEffect(() => {
    // Fire immediately upon mount, since it's conditionally rendered on active tab
    const timer = setTimeout(() => setFired(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={wrapRef} className={`flex items-center font-black leading-none tracking-tight ${className}`}>
      {digits.map((d, i) => {
        const isNum = /[0-9]/.test(d);
        const isSpace = d.trim() === '';
        if (isNum) {
          return fired ? <RollingDigit key={i} target={d} delay={i} color={color} /> : <span key={i} style={{ color, opacity: 0 }}>{d}</span>;
        }
        return (
          <span 
            key={i} 
            className="shrink-0"
            style={{ 
              color, 
              fontSize: isSpace ? '0.2em' : '0.85em',
              marginLeft: isSpace ? 0 : '12px',
              transform: isSpace ? 'none' : 'translateY(-5%)'
            }}
          >
            {d}
          </span>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   APP BLOCKER ANIMATION — 10 Social Apps swarming, then EXPLODING
══════════════════════════════════════════════════════════ */
const SOCIAL_ICONS_DATA = [
  { id: 'Platform=Instagram, Color=Original.png', color: '#dc2743' },
  { id: 'Platform=TikTok, Color=Original.png', color: '#000000' },
  { id: 'Platform=YouTube, Color=Original.png', color: '#FF0000' },
  { id: 'Platform=X (Twitter), Color=Original.png', color: '#1DA1F2' },
  { id: 'Platform=Facebook, Color=Original.png', color: '#1877F2' },
  { id: 'Platform=Snapchat, Color=Original.png', color: '#FFFC00' },
  { id: 'Platform=Reddit, Color=Original.png', color: '#FF4500' },
  { id: 'Platform=Pinterest, Color=Original.png', color: '#E60023' },
  { id: 'Platform=LinkedIn, Color=Original.png', color: '#0A66C2' },
  { id: 'Platform=WhatsApp, Color=Original.png', color: '#25D366' }
];

function SocialSVG({ id }: { id: string }) {
  // Using the provided user icons from the public directory
  return <img src={`/social-icons/${id}`} alt="Social Icon" style={{ width: 76, height: 76, display: 'block' }} />;
}

/* Realistic trash bin built entirely with SVG gradients, depth and highlights */
function TrashBinSVG({ open }: { open: boolean }) {
  return (
    <svg width="280" height="400" viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      <defs>
        {/* ── Body cylinder gradient — dark charcoal matching site theme ── */}
        <linearGradient id="bodyMain" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#060606"/>
          <stop offset="12%"  stopColor="#0e0e0e"/>
          <stop offset="30%"  stopColor="#1c1c1c"/>
          <stop offset="50%"  stopColor="#262626"/>
          <stop offset="70%"  stopColor="#1c1c1c"/>
          <stop offset="88%"  stopColor="#0e0e0e"/>
          <stop offset="100%" stopColor="#050505"/>
        </linearGradient>

        {/* ── Left edge highlight ── */}
        <linearGradient id="leftShine" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.07)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>

        {/* ── Top ellipse (opening) — pure black interior ── */}
        <radialGradient id="topOpeningGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#000000"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </radialGradient>

        {/* ── Rim gradient — subtle silver edge ── */}
        <linearGradient id="rimGrad" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#111111"/>
          <stop offset="30%"  stopColor="#2e2e2e"/>
          <stop offset="50%"  stopColor="#3d3d3d"/>
          <stop offset="70%"  stopColor="#2e2e2e"/>
          <stop offset="100%" stopColor="#0d0d0d"/>
        </linearGradient>

        {/* ── Lid top gradient ── */}
        <linearGradient id="lidTop" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#080808"/>
          <stop offset="25%"  stopColor="#181818"/>
          <stop offset="50%"  stopColor="#242424"/>
          <stop offset="75%"  stopColor="#181818"/>
          <stop offset="100%" stopColor="#080808"/>
        </linearGradient>

        {/* ── Lid bevel shine ── */}
        <linearGradient id="lidShine" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.06)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>

        {/* ── Handle gradient ── */}
        <linearGradient id="handleGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#2c2c2c"/>
          <stop offset="50%"  stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0c0c0c"/>
        </linearGradient>

        {/* ── Bottom ellipse ── */}
        <radialGradient id="bottomGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%"   stopColor="#111111"/>
          <stop offset="100%" stopColor="#020202"/>
        </radialGradient>

        {/* Drop shadow filter */}
        <filter id="binShadow" x="-20%" y="-5%" width="140%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.6"/>
        </filter>
        <filter id="lidShadow" x="-10%" y="-20%" width="120%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* ══════════ BIN BODY ══════════ */}
      <g filter="url(#binShadow)">

        {/* Body trapezoid — wider at top, narrower at bottom, slight perspective */}
        <path
          d="M18 52 L122 52 L112 190 Q70 198 28 190 Z"
          fill="url(#bodyMain)"
          stroke="#0a0a18"
          strokeWidth="1"
        />

        {/* Left highlight strip — simulates cylindrical curvature */}
        <path
          d="M18 52 L30 52 L22 188 L16 184 Z"
          fill="url(#leftShine)"
        />

        {/* Right shadow strip */}
        <path
          d="M110 52 L122 52 L124 186 L112 190 Z"
          fill="rgba(0,0,0,0.3)"
        />

        {/* Vertical grooves */}
        <line x1="42"  y1="58" x2="38"  y2="183" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="70"  y1="58" x2="70"  y2="185" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="98"  y1="58" x2="102" y2="183" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round"/>

        {/* Groove highlights (right edge of each groove) */}
        <line x1="44"  y1="58" x2="40"  y2="183" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeLinecap="round"/>
        <line x1="72"  y1="58" x2="72"  y2="185" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeLinecap="round"/>
        <line x1="100" y1="58" x2="104" y2="183" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeLinecap="round"/>

        {/* Recycling icon */}
        <text x="70" y="132" textAnchor="middle" fontSize="28" fill="rgba(255,255,255,0.05)" fontFamily="sans-serif">♻</text>

        {/* Bottom base ellipse */}
        <ellipse cx="70" cy="188" rx="42" ry="8" fill="url(#bottomGrad)" stroke="#05050f" strokeWidth="1"/>

        {/* Top opening ellipse (dark interior visible) */}
        <ellipse cx="70" cy="52" rx="52" ry="10" fill="url(#topOpeningGrad)" stroke="#0a0a18" strokeWidth="0.5"/>

        {/* Top rim ring */}
        <path
          d="M18 52 Q70 64 122 52 Q70 40 18 52 Z"
          fill="url(#rimGrad)"
          stroke="#1c1c1c"
          strokeWidth="0.5"
        />
      </g>

      {/* ══════════ LID ══════════ */}
      <g
        filter="url(#lidShadow)"
        style={{
          transformOrigin: '70px 52px',
          transform: open ? 'rotateX(-55deg) translateY(-8px)' : 'rotateX(0deg)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Lid underside (visible when open) */}
        {open && (
          <ellipse cx="70" cy="40" rx="54" ry="10" fill="#0d0d0d" stroke="#050505" strokeWidth="0.5"/>
        )}

        {/* Lid body — slightly wider than bin top */}
        <path
          d="M12 40 Q70 30 128 40 Q128 56 70 60 Q12 56 12 40 Z"
          fill="url(#lidTop)"
          stroke="#0f0f0f"
          strokeWidth="1"
        />

        {/* Lid top shine */}
        <path
          d="M16 40 Q70 32 124 40 Q70 36 16 40 Z"
          fill="url(#lidShine)"
        />

        {/* Lid rim */}
        <path
          d="M10 42 Q70 56 130 42 Q130 46 70 60 Q10 46 10 42 Z"
          fill="rgba(80,80,80,0.5)"
          stroke="#0a0a0a"
          strokeWidth="0.5"
        />

        {/* Handle base */}
        <rect x="52" y="14" width="36" height="28" rx="8" fill="url(#handleGrad)" stroke="#0f0f0f" strokeWidth="1"/>
        {/* Handle top shine */}
        <rect x="55" y="16" width="30" height="8" rx="4" fill="rgba(255,255,255,0.12)"/>
        {/* Handle grip knob */}
        <ellipse cx="70" cy="28" rx="10" ry="7" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="1"/>
        <ellipse cx="70" cy="26" rx="6" ry="3.5" fill="rgba(150,150,150,0.3)"/>
      </g>
    </svg>
  );
}

function AppBlockedAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const binRef = useRef<HTMLDivElement>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [binOpen, setBinOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wraps = wrapRefs.current.filter(Boolean) as HTMLElement[];
      const svgs = svgRefs.current.filter(Boolean) as HTMLElement[];
      const bin = binRef.current;

      const runCycle = () => {
        setBinOpen(false);
        gsap.set(bin, { y: 0, rotation: 0 });

        const cWidth = window.innerWidth;
        const cHeight = window.innerHeight;
        const binCenterX = (cWidth / 2) - 48 - (280 / 2);
        const binCenterY = (cHeight / 2) - 96 - (400 / 2);

        wraps.forEach((wrap, i) => {
          let spawnX = 0;
          let spawnY = 0;
          
          // Force icons to spawn exclusively in the Left half OR Top half of the screen
          // This completely quarantines them away from the Trash Bin (Bottom Right quadrant)
          if (Math.random() > 0.5) {
            // Left half
            spawnX = gsap.utils.random(-cWidth/2 + 100, -100);
            spawnY = gsap.utils.random(-cHeight/2 + 100, cHeight/2 - 100);
          } else {
            // Top half
            spawnX = gsap.utils.random(-cWidth/2 + 100, cWidth/2 - 100);
            spawnY = gsap.utils.random(-cHeight/2 + 100, -100);
          }

          gsap.set(wrap, {
            x: spawnX,
            y: spawnY,
            opacity: 0,
            scale: 1,
            rotation: gsap.utils.random(-15, 15),
          });
          gsap.set(svgs[i], { opacity: 1, scale: 1 });
        });

        const floatTweens: gsap.core.Tween[] = [];
        wraps.forEach((wrap, i) => {
          gsap.to(wrap, { opacity: 1, duration: 0.6, delay: i * 0.2 });
          const ft = gsap.to(wrap, {
            x: `+=${gsap.utils.random(-60, 60)}`,
            y: `+=${gsap.utils.random(-60, 60)}`,
            rotation: `+=${gsap.utils.random(-8, 8)}`,
            ease: 'sine.inOut',
            duration: gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
          });
          floatTweens.push(ft);
        });

        setTimeout(() => {
          if (!bin || !containerRef.current) return;
          floatTweens.forEach(ft => ft.kill());
          setBinOpen(true);

          if (!bin || !containerRef.current) return;
          
          // Bulletproof coordinate calculation using real DOM measurements
          const binRect = bin.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          
          // The center of the flex container is 0,0 in GSAP transform space
          const containerCenterX = containerRect.width / 2;
          const containerCenterY = containerRect.height / 2;
          
          // The trash bin opening is horizontally centered, and ~26% down from its top edge
          const binOpeningX = (binRect.left - containerRect.left) + (binRect.width / 2);
          const binOpeningY = (binRect.top - containerRect.top) + (binRect.height * 0.26);
          
          const targetX = binOpeningX - containerCenterX;
          const targetY = binOpeningY - containerCenterY;

          wraps.forEach((wrap, i) => {
            const delay = i * 0.30 + gsap.utils.random(0, 0.1);
            gsap.to(wrap, {
              x: targetX,
              y: targetY,
              scale: 0.1,
              opacity: 0,
              rotation: gsap.utils.random(180, 360),
              ease: 'power2.in',
              duration: 0.9,
              delay,
            });
          });

          const closeDelay = (wraps.length * 0.30 + 1.4) * 1000;
          setTimeout(() => {
            setBinOpen(false);
            setTimeout(() => runCycle(), 800);
          }, closeDelay);
        }, 5000);
      };

      runCycle();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center"
      style={{ zIndex: 5, perspective: '600px' }}
    >
      {/* Icons - z-index above trash bin so they fly over the rim */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 30 }}>
        {SOCIAL_ICONS_DATA.map((icon, i) => (
          <div
            key={icon.id}
            ref={el => { wrapRefs.current[i] = el; }}
            className="absolute opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              ref={el => { svgRefs.current[i] = el; }}
              style={{ filter: `drop-shadow(0 0 14px ${icon.color}99)` }}
            >
              <SocialSVG id={icon.id} />
            </div>
          </div>
        ))}
      </div>

      {/* Trash bin — right side, z-index below icons */}
      <div
        ref={binRef}
        className="absolute right-12 bottom-24"
        style={{ zIndex: 20, willChange: 'transform' }}
      >
        <TrashBinSVG open={binOpen} />
      </div>
    </div>
  );
}
/* ══════════════════════════════════════════════════════════
   HORIZONTAL SCROLL FEATURES
══════════════════════════════════════════════════════════ */
function AppLimitSpawner({ delayOffset = 0, index = 0 }: { delayOffset?: number; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentApp, setCurrentApp] = useState({ id: 'Platform=Facebook, Color=Original.png', used: 30 });
  const [pos, setPos] = useState({ top: 40, right: 10 });
  
  useEffect(() => {
    const apps = [
      { id: 'Platform=Facebook, Color=Original.png', used: 30 },
      { id: 'Platform=X (Twitter), Color=Original.png', used: 25 },
      { id: 'Platform=TikTok, Color=Original.png', used: 30 },
      { id: 'Platform=Instagram, Color=Original.png', used: 20 },
      { id: 'Platform=YouTube, Color=Original.png', used: 28 },
      { id: 'Platform=Reddit, Color=Original.png', used: 15 },
    ];

    let ctx = gsap.context(() => {});
    let cycleTimeout: NodeJS.Timeout;

    const cycle = () => {
      // Pick random app from half the array to ensure no duplicates
      const halfSize = Math.floor(apps.length / 2);
      const offset = index === 0 ? 0 : halfSize;
      const randomApp = apps[offset + Math.floor(Math.random() * halfSize)];
      
      // Separate vertical zones to prevent overlapping
      // Zone 0: top 15% to 35%
      // Zone 1: top 55% to 70%
      const top = index === 0 ? 15 + Math.random() * 20 : 55 + Math.random() * 15; 
      const right = 2 + Math.random() * 20; // Keep closer to the right edge
      
      setCurrentApp(randomApp);
      setPos({ top, right });

      ctx.add(() => {
        // Pop in
        gsap.fromTo(cardRef.current, 
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' }
        );
        // Add subtle floating while visible
        gsap.to(cardRef.current, {
          y: -10, duration: 2, yoyo: true, repeat: 1, ease: 'sine.inOut', delay: 0.7
        });
        // Pop out at 4.3s
        gsap.to(cardRef.current, {
          opacity: 0, scale: 0.9, y: -30, duration: 0.5, delay: 4.3, ease: 'power2.in'
        });
      });

      cycleTimeout = setTimeout(cycle, 5000);
    };

    // Run first cycle shortly after mount + delay offset
    const initialDelay = setTimeout(cycle, 100 + delayOffset);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(cycleTimeout);
      ctx.revert();
    };
  }, [delayOffset, index]);

  return (
    <div 
      ref={cardRef}
      className="pointer-events-auto absolute w-[380px] rounded-3xl border border-white/5 bg-[#0d0d12]/95 backdrop-blur-2xl p-5 shadow-[0_50px_100px_rgba(0,0,0,0.95)] opacity-0"
      style={{ top: `${pos.top}%`, right: `${pos.right}%`, willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="shrink-0 flex items-center justify-center">
          <div style={{ transform: 'scale(0.6)' }}>
            <SocialSVG id={currentApp.id} />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">App used &gt; {currentApp.used} mins</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3.5">
        <div className="h-1 w-full bg-elevate-paper/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
            style={{ width: `${(currentApp.used / 30) * 100}%` }} 
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] font-semibold text-elevate-paper/50">0 minutes</span>
          <span className="text-[9px] font-bold text-red-500">30 minutes</span>
        </div>
      </div>

      <p className="text-[11px] text-elevate-paper/60 whitespace-nowrap">
        Close it to maintain screen time or you will be kicked out of the app
      </p>
    </div>
  );
}

function AppLimitNotification() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15 }}>
      <AppLimitSpawner delayOffset={0} index={0} />
      <AppLimitSpawner delayOffset={2500} index={1} />
    </div>
  );
}


function ReelsScrolledAnimation() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentCount = 0;
    let timeout: NodeJS.Timeout;

    const swipe = () => {
      currentCount++;
      setCount(currentCount);
      
      // Animate track up by one screen height (680px)
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          y: -currentCount * 680,
          duration: 0.35,
          ease: 'power3.inOut'
        });
      }

      // If we reach near the end, stop (unlikely in short view time)
      if (currentCount < 80) {
        timeout = setTimeout(swipe, 600 + Math.random() * 800);
      }
    };

    timeout = setTimeout(swipe, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Generate 100 fake reels with distinct gradients
  const reels = useMemo(() => {
    const gradients = [
      'bg-gradient-to-br from-indigo-500 to-purple-800',
      'bg-gradient-to-bl from-rose-500 to-red-800',
      'bg-gradient-to-tr from-emerald-500 to-teal-800',
      'bg-gradient-to-br from-blue-500 to-indigo-800',
      'bg-gradient-to-b from-amber-500 to-orange-700',
      'bg-gradient-to-br from-fuchsia-500 to-pink-800',
      'bg-gradient-to-tl from-cyan-500 to-blue-800',
      'bg-gradient-to-br from-violet-500 to-purple-900',
    ];
    return Array.from({ length: 100 }).map((_, i) => gradients[i % gradients.length]); // Cycle them so neighbors aren't same
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      
      {/* Mobile Phone Mockup */}
      <div className="relative mt-20 w-[330px] h-[680px] rounded-[3.5rem] border-[10px] border-[#0d0d12] bg-[#050508] shadow-[0_60px_120px_rgba(0,0,0,1)] overflow-hidden">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-30 shadow-sm" />
        
        {/* Top Counter Overlay */}
        <div className="absolute top-12 left-0 w-full flex justify-center z-30">
          <div className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl rounded-lg px-3 py-1.5 border border-white/5 shadow-2xl">
            <span className="text-[7px] font-bold text-white/50 uppercase tracking-[0.2em] mb-0.5">Reels Scrolled</span>
            <span className="text-3xl font-black text-white tabular-nums leading-none tracking-tight">{count}</span>
          </div>
        </div>

        {/* Scrolling Reels Track */}
        <div ref={trackRef} className="absolute inset-x-0 top-0 flex flex-col will-change-transform z-10">
          {reels.map((grad: string, i: number) => (
            <div key={i} className={`w-full h-[680px] shrink-0 relative ${grad}`}>
              
              {/* Fake UI Overlay for each reel */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
              
              {/* Fake Caption */}
              <div className="absolute bottom-6 left-4 space-y-3 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md" />
                  <div className="w-24 h-3 rounded-full bg-white/60" />
                </div>
                <div className="w-48 h-2 rounded-full bg-white/30" />
                <div className="w-32 h-2 rounded-full bg-white/30" />
              </div>
              
              {/* Fake Side Icons */}
              <div className="absolute bottom-12 right-3 flex flex-col gap-6 items-center z-20">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">♥</div>
                  <div className="w-6 h-1.5 rounded-full bg-white/30" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">💬</div>
                  <div className="w-6 h-1.5 rounded-full bg-white/30" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">↗</div>
                  <div className="w-6 h-1.5 rounded-full bg-white/30" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function NsfwDetoxAnimation() {
  const screenRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      // --- SCENARIO 1: Browser Search ---
      tl.set('.nsfw-browser', { opacity: 1, zIndex: 10, display: 'flex' });
      tl.set('.nsfw-reels', { opacity: 0, zIndex: 0, display: 'none' });
      tl.set('.nsfw-block', { opacity: 0, zIndex: 20, display: 'none' });
      tl.set('.nsfw-search-text', { width: 0 });
      tl.set('.nsfw-incognito', { opacity: 0, scale: 0.8 });

      tl.to('.nsfw-incognito', { opacity: 1, scale: 1, duration: 0.4, delay: 0.5, ease: 'back.out(1.5)' });
      tl.to('.nsfw-search-text', { width: '100%', duration: 1, delay: 0.5, ease: 'steps(10)' });
      
      // Delay before block
      tl.to('.nsfw-search-text', { opacity: 1, duration: 0.3 });

      // BAM! Blocked
      tl.set('.nsfw-block', { display: 'flex' });
      tl.to('.nsfw-block', { opacity: 1, duration: 0.01 });
      tl.fromTo('.nsfw-block-content', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }
      );

      // Hold block screen (2 seconds)
      tl.to('.nsfw-block-content', { opacity: 1, duration: 2 });

      // --- SCENARIO 2: Reels Scrolling ---
      tl.set('.nsfw-block', { opacity: 0, display: 'none' });
      tl.set('.nsfw-browser', { opacity: 0, zIndex: 0, display: 'none' });
      tl.set('.nsfw-reels', { opacity: 1, zIndex: 10, display: 'block' });
      
      // Hold normal reel
      tl.to('.nsfw-reels-container', { y: 0, duration: 2.5 });
      
      // Swipe to next reel (suggestive silhouette)
      tl.to('.nsfw-reels-container', { y: -560, duration: 0.6, ease: 'power2.inOut' });
      
      // Hold silhouette for a short moment so the user sees it before it's blocked
      tl.to('.nsfw-reels-container', { y: -560, duration: 0.8 });
      
      // BAM! Blocked again
      tl.set('.nsfw-block', { display: 'flex' });
      tl.to('.nsfw-block', { opacity: 1, duration: 0.01 });
      tl.fromTo('.nsfw-block-content', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }
      );
      
      // Hold block screen
      tl.to('.nsfw-block-content', { opacity: 1, duration: 2 });
      
      // Reset for next loop
      tl.set('.nsfw-block', { opacity: 0, display: 'none' });
      tl.set('.nsfw-reels-container', { y: 0 });

    }, screenRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      {/* Mobile Phone Mockup */}
      <div className="relative mt-20 w-[330px] h-[680px] rounded-[3.5rem] border-[10px] border-[#0d0d12] bg-[#050508] shadow-[0_60px_120px_rgba(0,0,0,1)] overflow-hidden" ref={screenRef}>
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-30 shadow-sm" />

        {/* =========================================
            SCENARIO 1: BROWSER 
           ========================================= */}
        <div className="nsfw-browser absolute inset-0 bg-[#121212] flex flex-col pt-14 px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-6 h-6 rounded-full bg-white/10" />
            <div className="nsfw-incognito flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full border border-gray-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300">
                <path d="M22 17.5L22 12C22 8 18 6 12 6C6 6 2 8 2 12V17.5M15 21.5C17.5 21.5 20 19.5 20 17.5C20 15.5 17.5 13.5 15 13.5C12.5 13.5 10 15.5 10 17.5C10 19.5 12.5 21.5 15 21.5ZM4 17.5C4 19.5 6.5 21.5 9 21.5C11.5 21.5 14 19.5 14 17.5C14 15.5 11.5 13.5 9 13.5C6.5 13.5 4 15.5 4 17.5Z"/>
              </svg>
              <span className="text-[10px] text-gray-300 font-medium">Incognito</span>
            </div>
            <div className="w-6 h-6 rounded-md bg-white/10" />
          </div>

          {/* Search Bar */}
          <div className="w-full h-12 bg-[#1e1e1e] rounded-xl flex items-center px-4 overflow-hidden shadow-inner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2 shrink-0">
              <circle cx="11" cy="11" r="8"/><path d="M21 21L16.65 16.65"/>
            </svg>
            <div className="nsfw-search-text overflow-hidden whitespace-nowrap">
              <span className="text-white text-sm font-medium tracking-wide">bad videos</span>
            </div>
            {/* Blinking cursor */}
            <div className="w-[2px] h-4 bg-blue-500 animate-pulse ml-0.5" />
          </div>
          
          {/* Fake content skeleton */}
          <div className="mt-8 flex flex-col gap-4 opacity-30">
            <div className="w-3/4 h-6 rounded-md bg-white/10" />
            <div className="w-full h-32 rounded-xl bg-white/5" />
            <div className="w-5/6 h-4 rounded-md bg-white/10" />
            <div className="w-4/6 h-4 rounded-md bg-white/10" />
          </div>
        </div>

        {/* =========================================
            SCENARIO 2: REELS 
           ========================================= */}
        <div className="nsfw-reels absolute inset-0 opacity-0 overflow-hidden bg-black">
          <div className="nsfw-reels-container flex flex-col w-full absolute top-0 left-0">
            
            {/* Reel 1: Normal Content */}
            <div className="w-full h-[560px] shrink-0 relative bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center">
               <span className="text-white/20 font-bold text-2xl tracking-widest uppercase">Tech Video</span>
               <div className="absolute bottom-12 right-3 flex flex-col gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="w-8 h-8 rounded-full bg-white/20" />
               </div>
            </div>

            {/* Reel 2: Suggestive Silhouette */}
            <div className="w-full h-[560px] shrink-0 relative bg-gradient-to-b from-rose-900 via-pink-800 to-black overflow-hidden">
               <img 
                 src="/nsfw-silhouette.png" 
                 alt="Silhouette" 
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-auto drop-shadow-[0_0_20px_rgba(255,50,100,0.8)]" 
               />
               <div className="absolute inset-0 bg-black/20" />
               <div className="absolute bottom-12 right-3 flex flex-col gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="w-8 h-8 rounded-full bg-white/20" />
               </div>
            </div>

          </div>
        </div>

        {/* =========================================
            BLOCK SCREEN (AI GUARD)
           ========================================= */}
        <div className="nsfw-block absolute inset-0 bg-black z-20 flex flex-col items-center justify-center p-6 opacity-0">
          <div className="nsfw-block-content flex flex-col items-center text-center">
            {/* Shield / Warning Icon */}
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            
            <h3 className="text-red-500 font-black text-xl uppercase tracking-widest mb-2">Content Blocked</h3>
            <p className="text-white/70 text-sm leading-relaxed px-4">
              AI NSFW guard is active.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}










function WorkoutPlanningAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      // INITIAL SETUP
      tl.set('.wo-screen-b', { x: 350, display: 'none' }); 
      tl.set('.wo-screen-c', { y: 750, display: 'none' }); 
      tl.set('.wo-added-item', { display: 'none', opacity: 0, height: 0, margin: 0 }); 
      tl.set('.wo-timer-sec', { innerHTML: '57s' });
      tl.set('.wo-close-btn', { scale: 1 });
      tl.set('.wo-c-ex1', { scale: 1 });
      tl.set('.wo-a-ex1', { scale: 1 });
      tl.set('.wo-b-inner-scroll', { y: 0 }); // Reset inner scroll

      // Set initial states for Set Queue morph
      tl.set('.wo-set-1', { borderColor: '#eab308' });
      tl.set('.wo-set-1-active', { opacity: 1, display: 'inline' });
      tl.set('.wo-set-1-title', { innerHTML: 'Set 1' });
      tl.set('.wo-set-2', { borderColor: 'transparent' });
      tl.set('.wo-set-2-active', { opacity: 0, display: 'none' });

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
      tl.to('.wo-screen-c', { y: 750, duration: 0.4, ease: 'power3.in' });
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

      // ---- 3. SLIDE IN SCREEN B (ACTIVE WORKOUT VIEW) ----
      tl.set('.wo-screen-b', { display: 'flex' });
      tl.to('.wo-screen-b', { x: 0, duration: 0.5, ease: 'power3.out' });

      tl.to({}, { duration: 0.5 }); // Short pause

      // ANIMATE SCROLL DOWN to show the buttons
      tl.to('.wo-b-inner-scroll', { y: -180, duration: 1.2, ease: 'power3.inOut' });

      tl.to({}, { duration: 0.5 }); // Wait before clicking
      
      // Click DONE button
      tl.to('.wo-real-btn-done', { scale: 0.95, duration: 0.1 });
      tl.to('.wo-real-btn-done', { scale: 1, backgroundColor: '#15803d', duration: 0.2 });

      // Morph Set 1 to Done, Set 2 to Active
      tl.to('.wo-set-1-active', { opacity: 0, duration: 0.2, display: 'none' }, "-=0.2");
      tl.set('.wo-set-1-title', { innerHTML: 'Set 1 <span class="ml-1 text-white opacity-70">Done</span>' });
      tl.to('.wo-set-1', { borderColor: 'transparent', duration: 0.3 }, "-=0.1");
      
      tl.to('.wo-set-2', { borderColor: '#eab308', duration: 0.3 }, "-=0.3");
      tl.set('.wo-set-2-active', { display: 'inline' });
      tl.to('.wo-set-2-active', { opacity: 1, duration: 0.2 }, "-=0.1");

      // Reset Done button visually
      tl.to('.wo-real-btn-done', { backgroundColor: '#16a34a', duration: 0.3 });

      tl.to({}, { duration: 1.2 }); // View updated state

      // Scroll back up before closing
      tl.to('.wo-b-inner-scroll', { y: 0, duration: 0.8, ease: 'power3.inOut' });

      // Click X on Screen B
      tl.to('.wo-close-btn', { scale: 0.8, duration: 0.1 });
      tl.to('.wo-close-btn', { scale: 1, duration: 0.1 });

      // Slide out Screen B
      tl.to('.wo-screen-b', { x: 350, duration: 0.4, ease: 'power3.in' });
      tl.set('.wo-screen-b', { display: 'none' });

      // ---- RESET STATE FOR LOOP ----
      tl.to({}, { duration: 0.5 });
      tl.set('.wo-timer-sec', { innerHTML: '57s' });
      tl.set('.wo-added-item', { display: 'none', opacity: 0, height: 0, margin: 0 });
      tl.set('.wo-c-scroll', { y: 0 });
      tl.set('.wo-c-ex1', { backgroundColor: 'transparent' });
      tl.set('.wo-set-1', { borderColor: '#eab308' });
      tl.set('.wo-set-1-active', { opacity: 1, display: 'inline' });
      tl.set('.wo-set-1-title', { innerHTML: 'Set 1' });
      tl.set('.wo-set-2', { borderColor: 'transparent' });
      tl.set('.wo-set-2-active', { opacity: 0, display: 'none' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-[10%] lg:pr-[15%]" style={{ zIndex: 15 }}>
      {/* Mobile Phone Mockup */}
      <div 
        ref={containerRef}
        className="relative mt-20 w-[330px] h-[680px] rounded-[3.5rem] border-[10px] border-[#0d0d12] bg-[#050505] shadow-[0_60px_120px_rgba(0,0,0,1)] overflow-hidden"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-50 shadow-sm" />

        {/* SCALE WRAPPER */}
        <div className="absolute inset-0 z-10" style={{ width: '125%', height: '125%', transform: 'scale(0.8)', transformOrigin: 'top left' }}>
          
          {/* =========================================
              SCREEN A: WORKOUT OVERVIEW
              ========================================= */}
          <div className="absolute inset-0 pt-16 flex flex-col overflow-hidden bg-[#050505]">
            <div className="px-5 flex items-center justify-between mb-5 shrink-0">
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                <h1 className="text-white font-bold text-xl">Workout</h1>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>

            <div className="px-5 overflow-y-auto no-scrollbar pb-32 flex-1">
              <div className="mb-5">
                <span className="text-[#a1a1aa] text-[13px] font-semibold">Review</span>
                <h2 className="text-white text-3xl font-black tracking-tight leading-tight">Workout session</h2>
                <span className="text-[#71717a] text-xs">Sat, Jun 6</span>
              </div>

              <div className="bg-[#141517] rounded-full px-4 py-2 inline-block mb-8">
                <span className="text-[#a1a1aa] text-[11px] font-medium">07:27 PM - 09:33 PM</span>
              </div>

              <div className="flex justify-center mb-10">
                <h1 className="text-white text-6xl font-black tracking-tighter">
                  <span className="wo-timer-min">1h25m</span><span className="wo-timer-sec">57s</span>
                </h1>
              </div>

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold text-base">Exercises</h3>
                <div className="bg-[#141517] w-8 h-8 rounded-full flex items-center justify-center">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </div>

              <div className="wo-added-item wo-a-ex1 overflow-hidden">
                <div className="relative border-l-4 border-[#22c55e] pl-4 mb-8">
                  <span className="text-[#71717a] text-[11px] font-bold">Selected exercise</span>
                  <h4 className="text-white font-bold text-lg leading-tight mb-1">Pull Ups</h4>
                  <p className="text-[#a1a1aa] text-xs mb-4">Back · 3 sets</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#22c55e] bg-[#052e16] px-2.5 py-1 rounded-full text-[10px] font-bold">Hypertrophy + Manual</span>
                  </div>
                  
                  <div className="flex gap-1.5 mb-4">
                    <div className="h-1 flex-1 bg-[#22c55e] rounded-full" />
                    <div className="h-1 flex-1 bg-[#22c55e] rounded-full" />
                    <div className="h-1 flex-1 bg-[#27272a] rounded-full" />
                  </div>

                  <div className="flex items-center gap-4 bg-[#111113] p-3 rounded-2xl">
                    <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/pull-up.gif" className="w-full h-full object-contain mix-blend-multiply" alt="Pull Ups" />
                    </div>
                    <div>
                      <h5 className="text-white font-bold text-sm">Pull Ups</h5>
                      <p className="text-[#a1a1aa] text-[11px]">Back · 3 sets</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between py-3 border-b border-[#18181b]">
                  <div className="flex items-center gap-4">
                    <span className="text-[#22c55e] font-black text-base w-5">2</span>
                    <span className="text-white font-bold text-[15px]">Bench Press</span>
                  </div>
                  <span className="text-[#a1a1aa] text-xs">4 × 10</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#18181b]">
                  <div className="flex items-center gap-4">
                    <span className="text-[#22c55e] font-black text-base w-5">3</span>
                    <span className="text-white font-bold text-[15px]">Push Ups</span>
                  </div>
                  <span className="text-[#a1a1aa] text-xs">3 × 12</span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              SCREEN B: EXERCISE DETAIL (ACTIVE UI)
              ========================================= */}
          <div className="wo-screen-b absolute inset-0 bg-[#0a0a0c] z-30 flex flex-col overflow-hidden">
            
            <div className="px-5 pt-16 flex items-center justify-between mb-5 shrink-0 bg-[#0a0a0c] z-10 pb-2">
              <div className="bg-[#eab308] text-black font-bold px-5 py-2 rounded-full text-xs shadow-sm">Pause</div>
              <div className="text-[#22c55e] font-black text-xl tracking-tighter">44m58s</div>
              <div className="bg-[#ef4444] text-white font-bold px-5 py-2 rounded-full text-xs shadow-sm">Finish</div>
            </div>

            <div className="overflow-hidden flex-1 relative">
              <div className="wo-b-inner-scroll px-5 flex flex-col pb-48">
                
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-white font-black text-2xl tracking-tight leading-tight">Pull Ups</h2>
                    <span className="text-[#a1a1aa] text-[13px]">Back</span>
                    <div className="mt-3 inline-block">
                      <span className="text-[#22c55e] border border-[#22c55e]/30 px-3 py-1 rounded-full text-[11px] font-bold bg-[#052e16]/50">Strength</span>
                    </div>
                  </div>
                  <div className="wo-close-btn p-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                </div>

                <div className="w-full h-48 bg-white rounded-[1.5rem] mb-8 flex items-center justify-center overflow-hidden p-4 shadow-lg border-2 border-[#eab308]">
                   <img className="w-full h-full object-contain mix-blend-multiply" src="/pull-up.gif" alt="Exercise" />
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="pr-4">
                    <h3 className="text-white font-bold text-[16px]">Set queue</h3>
                    <span className="text-[#22c55e] text-[11px] block mb-1">Strength</span>
                    <p className="text-[#a1a1aa] text-xs leading-relaxed">Finish, skip, or send the highlighted set to later before moving on.</p>
                  </div>
                  <div className="shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mb-8">
                  <div className="wo-set-1 bg-[#141517] rounded-xl px-5 py-4 flex items-center justify-between border-[1.5px] border-[#eab308] shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="wo-set-1-title text-white font-bold text-[14px]">Set 1</span>
                      <span className="wo-set-1-active text-[#eab308] font-bold text-[11px] uppercase tracking-wide">Active</span>
                    </div>
                    <span className="text-white font-bold text-[14px]">12 reps BW</span>
                  </div>
                  <div className="wo-set-2 bg-[#141517] rounded-xl px-5 py-4 flex items-center justify-between border-[1.5px] border-transparent shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-[14px]">Set 2</span>
                      <span className="wo-set-2-active text-[#eab308] font-bold text-[11px] uppercase tracking-wide opacity-0 hidden">Active</span>
                    </div>
                    <span className="text-white font-bold text-[14px]">10 reps BW</span>
                  </div>
                  <div className="bg-[#141517] rounded-xl px-5 py-4 flex items-center justify-between border-[1.5px] border-transparent shadow-sm opacity-50">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-[14px]">Set 3</span>
                    </div>
                    <span className="text-white font-bold text-[14px]">8 reps BW</span>
                  </div>
                </div>

              </div>
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
              SCREEN C: ADD EXERCISE OVERLAY
              ========================================= */}
          <div className="wo-screen-c absolute inset-0 bg-[#050505] z-40 flex flex-col pt-16 overflow-hidden">
            
            <div className="px-5 flex items-center justify-between mb-5 shrink-0">
              <h1 className="text-white font-bold text-xl">Add exercise</h1>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
            
            <div className="px-5 flex-1 overflow-hidden relative">
              <div className="wo-c-scroll absolute top-0 left-5 right-5 flex flex-col gap-6 pb-24">
                
                <div className="w-full bg-[#111113] rounded-2xl p-4 border border-[#18181b]">
                  <span className="text-[#71717a] text-[15px]">Search exercises...</span>
                </div>

                <div className="flex items-center justify-between bg-[#111113] rounded-2xl p-1.5 border border-[#18181b]">
                  <div className="flex-1 bg-[#22c55e] rounded-xl py-2.5 flex flex-col items-center justify-center gap-1.5 shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    <span className="text-black text-[10px] font-bold">All</span>
                  </div>
                  <div className="flex-1 py-2.5 flex flex-col items-center justify-center gap-1.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    <span className="text-[#a1a1aa] text-[10px] font-bold">Muscle</span>
                  </div>
                  <div className="flex-1 py-2.5 flex flex-col items-center justify-center gap-1.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    <span className="text-[#a1a1aa] text-[10px] font-bold">Exercise</span>
                  </div>
                  <div className="flex-1 py-2.5 flex flex-col items-center justify-center gap-1.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    <span className="text-[#a1a1aa] text-[10px] font-bold">Tags</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-[13px] whitespace-nowrap">Recents</span>
                  <span className="text-[#71717a] text-[11px] truncate">Cable Woodchop, Cable side bend +8</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white font-bold text-[15px]">Exercises</h2>
                    <div className="bg-[#111113] px-3 py-1.5 rounded-full border border-[#18181b]">
                      <span className="text-[#a1a1aa] text-[10px] font-bold">1411 exercises</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                     
                     <div className="wo-c-ex1 flex items-center gap-4 bg-[#111113] p-3 rounded-2xl border border-white/5">
                       <div className="w-[72px] h-[72px] bg-white rounded-xl flex items-center justify-center overflow-hidden p-1.5 shrink-0">
                          <img src="/pull-up.gif" className="w-full h-full object-contain mix-blend-multiply" alt="Pull Ups" />
                       </div>
                       <div className="flex-1">
                          <h3 className="text-white font-bold text-[15px] mb-1">Pull Ups</h3>
                          <p className="text-[#71717a] text-xs">Back · Compound</p>
                       </div>
                     </div>

                     <div className="flex items-center gap-4 bg-[#111113] p-3 rounded-2xl border border-white/5">
                       <div className="w-[72px] h-[72px] bg-white rounded-xl flex items-center justify-center overflow-hidden p-1.5 shrink-0">
                          <img src="/dumbbell-bench-press.gif" className="w-full h-full object-contain mix-blend-multiply" alt="Bench Press" />
                       </div>
                       <div className="flex-1">
                          <h3 className="text-white font-bold text-[15px] mb-1">Bench Press</h3>
                          <p className="text-[#71717a] text-xs">Pectorals · Compound</p>
                       </div>
                     </div>

                     <div className="flex items-center gap-4 bg-[#111113] p-3 rounded-2xl border border-white/5">
                       <div className="w-[72px] h-[72px] bg-white rounded-xl flex items-center justify-center overflow-hidden p-1.5 shrink-0">
                          <img src="/push-up.gif" className="w-full h-full object-contain mix-blend-multiply" alt="Push Ups" />
                       </div>
                       <div className="flex-1">
                          <h3 className="text-white font-bold text-[15px] mb-1">Push Ups</h3>
                          <p className="text-[#71717a] text-xs">Chest · Compound</p>
                       </div>
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
      {/* Mobile Phone Mockup - REMOVED font-sans */}
      <div 
        ref={containerRef}
        className="relative mt-20 w-[330px] h-[680px] rounded-[3.5rem] border-[10px] border-[#0d0d12] bg-[#050505] shadow-[0_60px_120px_rgba(0,0,0,1)] overflow-hidden"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-[#0d0d12] rounded-full z-50 shadow-sm" />

        {/* SCALE WRAPPER */}
        <div className="absolute inset-0 z-10" style={{ width: '125%', height: '125%', transform: 'scale(0.8)', transformOrigin: 'top left' }}>
          
          {/* =========================================
              SCREEN A: DASHBOARD
              ========================================= */}
          <div className="absolute inset-0 pt-10 flex flex-col bg-[#050505] overflow-hidden text-white">
            <div className="px-5 overflow-y-auto no-scrollbar pb-24 flex-1">
              
              <div className="relative w-full h-[380px] bg-[#0a0a0c] rounded-[2rem] border border-white/5 overflow-hidden mb-6 mt-4 flex flex-col justify-end p-5">
                 
                 <div className="absolute inset-0 w-full h-full opacity-100 flex items-center justify-center p-4 pt-12 pb-0">
                    <img src="/Muscular System.svg" className="w-full h-full object-contain object-bottom" alt="Muscular System" />
                 </div>
                 <div className="absolute top-4 right-4 drop-shadow-lg">
                   <ElevateMedal size={40} color="#F59E0B" rank="I" />
                 </div>

                 <div className="relative z-10 w-full">
                   <div className="flex items-center gap-2 mb-2"><span className="text-white font-black text-sm drop-shadow-md">Current Streak</span><span className="text-white font-bold text-[11px]">- 1 days</span></div>
                   <div className="flex items-center gap-2 mb-4"><span className="text-white font-black text-sm drop-shadow-md">Longest Streak</span><span className="text-white font-bold text-[11px]">- 10 days</span></div>
                   
                   <div className="flex justify-between items-end mb-2">
                      <div>
                        <span className="text-white font-black text-sm drop-shadow-md">Level 1 <span className="font-normal text-white/70">- Beginner</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span className="text-[#f59e0b] font-bold text-[11px]">1%</span>
                      </div>
                   </div>
                   
                   <span className="text-[#f59e0b] text-[10px] font-bold block mb-2 drop-shadow-md">Bronze I</span>
                   
                   <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
                       <div className="bg-[#f59e0b] h-full w-[5%] rounded-full shadow-[0_0_10px_#f59e0b]"></div>
                   </div>
                   <div className="text-right text-[9px] text-white/50 font-bold">325 XP</div>
                 </div>
                 
                 <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
              </div>

              <div className="flex flex-col gap-3">
                 <div className="w-full py-3.5 bg-[#22c55e] rounded-xl flex items-center justify-center font-black text-black text-[13px] shadow-lg">Workout planner</div>
                 <div className="pa-btn-monthly w-full py-3.5 bg-[#f59e0b] rounded-xl flex items-center justify-center font-black text-black text-[13px] shadow-lg cursor-pointer">Monthly analysis</div>
                 <div className="w-full py-3.5 bg-[#1e1b4b] rounded-xl flex items-center justify-center font-black text-[#4ade80] text-[13px] shadow-lg gap-2">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                   Exercise browser
                 </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-black flex justify-around items-center border-t border-white/5 z-20">
               <div className="opacity-50"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg></div>
               <div className="opacity-50"><svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>
               <div className="opacity-100"><svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            </div>
          </div>

          {/* =========================================
              SCREEN B: MONTHLY ANALYSIS
              ========================================= */}
          <div className="pa-screen-b absolute inset-0 bg-[#050505] flex flex-col pt-12 overflow-hidden z-30">
            <div className="px-5 flex items-center gap-3 mb-5 shrink-0">
               <div className="pa-b-close p-1 cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
               </div>
               <h1 className="text-white font-bold text-[17px]">Physical Analytics</h1>
            </div>

            <div className="overflow-hidden flex-1 relative">
              <div className="pa-b-scroll px-5 flex flex-col pb-24">
                 
                 {/* Composition Card */}
                 <div className="bg-[#0a0a0c] rounded-3xl p-5 border border-white/5 mb-4 shadow-xl">
                    <span className="text-[#22c55e] font-black text-[11px] block mb-1">June 2026</span>
                    <h2 className="text-white font-black text-xl tracking-tight leading-tight mb-1">Anatomical Composition</h2>
                    <span className="text-[#a1a1aa] text-[11px] block mb-6">BMI 23.4 - Normal</span>
                    
                    <div className="flex gap-4">
                       <div className="w-1/2 flex items-center justify-center p-2">
                          <img src="/Muscular System.svg" className="w-full h-full object-contain opacity-90" alt="Anatomy" />
                       </div>
                       <div className="w-1/2 flex flex-col gap-4">
                          <div>
                             <span className="text-[#a1a1aa] font-bold text-[9px] block mb-0.5">Height</span>
                             <span className="text-white font-black text-lg">179</span>
                          </div>
                          <div>
                             <span className="text-[#a1a1aa] font-bold text-[9px] block mb-0.5">Weight</span>
                             <span className="text-white font-black text-lg">75</span>
                          </div>
                          <div>
                             <span className="text-[#a1a1aa] font-bold text-[9px] block mb-0.5">Goal bodyweight</span>
                             <span className="text-white font-black text-lg">40</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                             <span className="border border-[#22c55e] text-[#22c55e] font-bold text-[9px] px-2 py-0.5 rounded-full bg-[#052e16]">Cut</span>
                             <span className="text-white font-bold text-[9px] px-2 py-0.5">Maintain</span>
                             <span className="text-white font-bold text-[9px] px-2 py-0.5">Fat loss</span>
                             <span className="text-white font-bold text-[9px] px-2 py-0.5">Gain</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between mt-8 mb-4">
                       <h3 className="text-white font-black text-[15px]">Body Targets</h3>
                       <span className="text-[#22c55e] font-bold text-[10px]">Formulas</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                       <div className="col-span-2 bg-[#111113] border border-white/5 rounded-[1rem] p-3">
                          <span className="text-[#a1a1aa] font-bold text-[9px] block mb-1">Calories</span>
                          <span className="text-[#22c55e] font-black text-lg">1800 kcal</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-[1rem] p-3">
                          <span className="text-[#a1a1aa] font-bold text-[9px] block mb-1">Protein</span>
                          <span className="text-[#0ea5e9] font-black text-base">143g</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-[1rem] p-3">
                          <span className="text-[#a1a1aa] font-bold text-[9px] block mb-1">Fat</span>
                          <span className="text-[#eab308] font-black text-base">45g</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-[1rem] p-3">
                          <span className="text-[#a1a1aa] font-bold text-[9px] block mb-1">Carbs</span>
                          <span className="text-[#3b82f6] font-black text-base">206g</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-[1rem] p-3">
                          <span className="text-[#a1a1aa] font-bold text-[9px] block mb-1">Fiber</span>
                          <span className="text-[#22c55e] font-black text-base">25g</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-[1rem] p-3">
                          <span className="text-[#a1a1aa] font-bold text-[9px] block mb-1">Water</span>
                          <span className="text-[#0ea5e9] font-black text-base">3.5L+</span>
                       </div>
                       <div className="bg-[#111113] border border-white/5 rounded-[1rem] p-3">
                          <span className="text-[#a1a1aa] font-bold text-[9px] block mb-1">Loss</span>
                          <span className="text-[#ef4444] font-black text-base">0.5kg/wk</span>
                       </div>
                    </div>
                 </div>

                 {/* Heatmap Card */}
                 <div className="pa-heatmap-card bg-[#0a0a0c] rounded-3xl p-5 border border-white/5 shadow-xl cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                       <div className="text-center">
                         <h3 className="text-white font-black text-[15px] leading-tight mb-1">Heaviest weight this month</h3>
                         <span className="text-[#22c55e] font-bold text-xs block">June 2026</span>
                       </div>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                    
                    {/* Mini Grid */}
                    <div className="mt-6 flex gap-3 opacity-80">
                       <div className="flex-1 grid grid-cols-10 gap-0.5">
                          {Array.from({length: 60}).map((_, i) => (
                             <div key={i} className={`aspect-square ${Math.random() > 0.8 ? 'bg-[#ef4444]' : Math.random() > 0.85 ? 'bg-[#3b82f6]' : Math.random() > 0.7 ? 'bg-white/30' : 'bg-[#18181b]'}`}></div>
                          ))}
                       </div>
                       <div className="flex-1 grid grid-cols-10 gap-0.5">
                          {Array.from({length: 60}).map((_, i) => (
                             <div key={i} className={`aspect-square ${Math.random() > 0.8 ? 'bg-[#ef4444]' : Math.random() > 0.85 ? 'bg-[#3b82f6]' : Math.random() > 0.7 ? 'bg-white/30' : 'bg-[#18181b]'}`}></div>
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
          <div className="pa-screen-c absolute inset-0 bg-[#050505] flex flex-col pt-12 overflow-hidden z-40">
             <div className="px-5 flex items-start justify-between mb-8 shrink-0">
               <div>
                  <h2 className="text-white font-black text-lg leading-tight mb-1">Heaviest weight this month</h2>
                  <span className="text-[#22c55e] font-bold text-[13px]">June 2026</span>
               </div>
               <div className="pa-c-close p-1.5 bg-[#18181b] rounded-full shrink-0 cursor-pointer mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
               </div>
             </div>

             <div className="px-3 flex-1 overflow-hidden flex flex-col pb-8">
                
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
                      {Array.from({length: 20}).map((_, i) => (
                         <span className="text-white/60 text-[7px] leading-none" key={i}>{i + 1}</span>
                      ))}
                   </div>
                   
                   {/* Grid area (12 cols, 20 rows) */}
                   <div className="flex-1 bg-[#0a0a0c] border border-white/5 grid grid-cols-12 gap-[1px] p-[1px] h-full" style={{ gridTemplateRows: 'repeat(20, minmax(0, 1fr))' }}>
                      {Array.from({length: 240}).map((_, i) => (
                         <div key={i} className={`w-full h-full ${Math.random() > 0.92 ? 'bg-[#ef4444]' : Math.random() > 0.94 ? 'bg-[#3b82f6]' : Math.random() > 0.88 ? 'bg-[#fca5a5]' : 'bg-[#18181b]'}`}></div>
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

function HorizontalFeatures() {
  return (
    <div className="relative overflow-hidden bg-elevate-black w-full" id="story">
      <div className="flex flex-col w-full">
        {features.map((feat, i) => (
          <div
            key={feat.num}
            className="relative flex min-h-[90svh] w-full flex-col justify-end px-6 py-16 border-b border-white/[0.04]"
          >
            {/* APP BLOCKED EXPLOSION */}
            {feat.num === '01' && <AppBlockedAnimation />}
            {/* APP LIMIT NOTIFICATION */}
            {feat.num === '02' && <AppLimitNotification />}
            {/* REELS SCROLLED */}
            {feat.num === '03' && <ReelsScrolledAnimation />}
            {/* NSFW DETOX */}
            {feat.num === '04' && <NsfwDetoxAnimation />}
            
            {/* WORKOUT PLANNING */}
            {feat.num === '05' && <WorkoutPlanningAnimation />}
            {/* PHYSICAL ANALYTICS */}
            {feat.num === '06' && <PhysicalAnalyticsAnimation />}
            
            {/* Text Overlay Section - Absolute or relative depending on animation space */}
            <div className="relative z-10 w-full mt-auto pointer-events-none">
              <span className="block mb-1 select-none text-5xl font-black leading-none text-elevate-paper/[0.08]">{feat.num}</span>
              <h3 className="text-4xl font-black uppercase leading-[1.1] tracking-tight text-elevate-paper mb-4">
                {feat.title}
              </h3>
              <div className="mb-4 h-px w-12 bg-elevate-orange" />
              <p className="w-full max-w-sm text-base leading-relaxed text-elevate-paper/60">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOVER FLOOD ITEM (workout list)
══════════════════════════════════════════════════════════ */
function HoverFloodItem({ text, index, exercises }: { text: string; index: number; exercises: string[] }) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden flex-1 flex flex-col justify-center border-t border-elevate-paper/10 py-6 md:py-8 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Flood background */}
      <div className="absolute inset-0 bg-elevate-orange origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />

      <div className="relative flex items-center justify-between">
        <h3 className="text-[48px] font-black leading-none tracking-tight text-elevate-paper/15 transition-colors duration-300 group-hover:text-[#0C0B0B] md:text-[64px] lg:text-[80px] xl:text-[96px]">
          {text}
        </h3>
        <div className="flex flex-col items-end gap-1 pr-2 text-right md:gap-1.5 md:pr-6">
          <span className="mb-1 shrink-0 text-sm font-black tracking-[0.2em] text-elevate-paper/20 transition-colors duration-300 group-hover:text-[#0C0B0B]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="hidden flex-col items-end md:flex">
            {exercises.map((ex, i) => (
              <span 
                key={i} 
                className="translate-x-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0C0B0B]/80 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOOK: REVEAL
══════════════════════════════════════════════════════════ */
function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, revealed };
}

/* ══════════════════════════════════════════════════════════
   REVEAL WRAPPER
══════════════════════════════════════════════════════════ */
function Reveal({ children, className = '', direction = 'up', delay = 0 }: {
  children: React.ReactNode; className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'fade'; delay?: number;
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const dirClasses = {
    up: revealed ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
    left: revealed ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0',
    right: revealed ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0',
    scale: revealed ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
    fade: revealed ? 'opacity-100' : 'opacity-0',
  };
  return (
    <div ref={ref} className={`transition-all duration-700 ${dirClasses[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms`, transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}>
      {children}
    </div>
  );
}



/* ══════════════════════════════════════════════════════════
   VELOCITY MARQUEE
══════════════════════════════════════════════════════════ */
function VelocityMarquee() {
  const trackRef1 = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);
  const xRef1 = useRef(0);
  const xRef2 = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let req: number;
    const tick = () => {
      const scrollY = window.scrollY;
      velocityRef.current = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;
      
      const v = 1.2 + Math.abs(velocityRef.current) * 0.5;
      xRef1.current -= v;
      xRef2.current += v;

      if (trackRef1.current) {
        if (xRef1.current < -trackRef1.current.scrollWidth / 2) xRef1.current = 0;
        gsap.set(trackRef1.current, { x: xRef1.current });
      }
      
      if (trackRef2.current) {
        if (xRef2.current > 0) xRef2.current = -trackRef2.current.scrollWidth / 2;
        gsap.set(trackRef2.current, { x: xRef2.current });
      }

      req = requestAnimationFrame(tick);
    };
    req = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(req);
  }, []);

  const items1 = Array.from({ length: 8 }).map((_, i) => (
    <span key={`1-${i}`} className="mx-4 text-[32px] font-black uppercase leading-none tracking-tight text-elevate-paper/10 transition-colors duration-500 hover:text-elevate-orange md:text-[48px] lg:text-[64px]" style={{ WebkitTextStroke: '1px rgba(253,252,250,0.1)' }}>
      Focus harder&nbsp;•&nbsp;Train smarter&nbsp;•&nbsp;
    </span>
  ));

  const items2 = Array.from({ length: 8 }).map((_, i) => (
    <span key={`2-${i}`} className="mx-4 text-[32px] font-black uppercase leading-none tracking-tight text-transparent transition-colors duration-500 hover:text-elevate-orange md:text-[48px] lg:text-[64px]" style={{ WebkitTextStroke: '2px rgba(253,252,250,0.2)' }}>
      No excuses&nbsp;•&nbsp;Only execution&nbsp;•&nbsp;
    </span>
  ));

  return (
    <div className="flex flex-col gap-2 overflow-hidden whitespace-nowrap bg-elevate-black py-8 lg:py-12 cursor-crosshair">
      <div ref={trackRef1} className="inline-flex will-change-transform">{items1}{items1}</div>
      <div ref={trackRef2} className="inline-flex will-change-transform">{items2}{items2}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SPINNING STAR
══════════════════════════════════════════════════════════ */
function SpinningStar({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 119" fill="none" className={`animate-spin-slow ${className}`}>
      <path d="M0 70.2418H33.8241L9.90981 94.164L24.5755 108.842L48.4969 84.9194V118.755H69.2407V84.9194L93.155 108.842L107.828 94.164L83.9134 70.2418H117.73V49.4913H83.9134L107.828 25.5691L93.155 10.8915L69.2407 34.8137V0.978394H48.4969V34.8137L24.5755 10.8915L9.90981 25.5691L33.8241 49.4913H0V70.2418Z" fill="currentColor" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   CONNECTION COIL
══════════════════════════════════════════════════════════ */
function ConnectionCoil({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none">
      <path d="M0 30C15 10 30 50 45 30C60 10 75 50 90 30C105 10 120 50 135 30C150 10 165 50 180 30C195 10 210 50 225 30C240 10 255 50 270 30C285 10 300 50 300 30" stroke="#FF6200" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   JUMBO ACCORDION
══════════════════════════════════════════════════════════ */
function JumboAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    if (open !== null && contentRefs.current[open]) {
      gsap.to(contentRefs.current[open], { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
    }
    if (open !== i && contentRefs.current[i]) {
      gsap.fromTo(contentRefs.current[i], { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' });
    }
    setOpen(open === i ? null : i);
  };

  const colors = ['#FF6200', '#1ED760', '#3B82F6', '#FF6200', '#1ED760', '#FF6200'];

  return (
    <div className="flex flex-col">
      {features.map((item, i) => (
        <div key={item.num} className="border-t border-elevate-paper/10 cursor-pointer" onClick={() => toggle(i)}>
          <div className="flex items-center justify-between py-6 md:py-8">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-xs font-semibold tracking-[0.2em] text-elevate-paper/20">{item.num}</span>
              <h3 className="text-[36px] font-black leading-none tracking-tight transition-colors duration-300 md:text-[60px] lg:text-[80px]"
                style={{ color: open === i ? colors[i] : 'rgba(253,252,250,0.85)' }}>
                {item.title}
              </h3>
            </div>
            <span className="flex-shrink-0 text-2xl font-light text-elevate-paper/30 transition-transform duration-300"
              style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
          </div>
          <div ref={(el) => { contentRefs.current[i] = el; }} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
            <p className="pb-8 max-w-2xl text-base leading-relaxed text-elevate-paper/40 md:text-lg">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const detoxStats = [
  {
    id: 1,
    label: 'Reels scrolled',
    title: 'REELS SCROLLED TODAY',
    value: '894',
    color: '#FF6200',
    desc: '',
  },
  {
    id: 2,
    label: 'Undertrained\nMuscles',
    title: 'WEAK POINTS DETECTED',
    value: '2',
    color: '#FFD700',
    desc: 'Neck + Biceps',
  },
  {
    id: 3,
    label: 'Workout Streak',
    title: 'MOMENTUM & DISCIPLINE',
    value: '75',
    color: '#1ED760',
    desc: '',
  },
];

function InteractiveDetox() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div
      className="mt-12 flex w-full flex-col overflow-hidden rounded-3xl border border-elevate-paper/[0.08] transition-colors duration-700 md:flex-row"
      style={{ backgroundColor: `${detoxStats[activeIdx].color}08` }}
    >
      {/* ── Left side: Hover list ── */}
      <div className="flex w-full flex-col justify-center border-b border-elevate-paper/[0.08] p-8 md:w-[55%] md:border-b-0 md:border-r md:p-12 lg:p-16">
        {detoxStats.map((stat, i) => (
          <div
            key={stat.id}
            onMouseEnter={() => setActiveIdx(i)}
            onClick={() => setActiveIdx(i)}
            className="group cursor-pointer py-2 md:py-4"
          >
            <h3
              className="whitespace-pre-line text-2xl min-[400px]:text-3xl font-black uppercase !leading-[1.15] tracking-tighter transition-all duration-300 md:text-4xl lg:text-[48px] xl:text-[52px]"
              style={
                activeIdx === i
                  ? { color: stat.color, WebkitTextStroke: '0px transparent' }
                  : { color: 'transparent', WebkitTextStroke: '1px rgba(253,252,250,0.2)' }
              }
            >
              {stat.label}
            </h3>
          </div>
        ))}
      </div>

      {/* ── Right side: Truth reveal ── */}
      <div className="relative flex min-h-[300px] w-full flex-col justify-center items-end text-right p-8 transition-all duration-500 md:min-h-0 md:w-[45%] md:p-12 lg:p-16">
        {detoxStats.map((stat, i) => {
          const isActive = activeIdx === i;
          return (
            <div
              key={stat.id}
              className={`absolute inset-0 flex flex-col justify-center items-end text-right p-8 pb-20 transition-all duration-500 md:p-12 md:pb-28 lg:p-16 lg:pb-36 ${
                isActive
                  ? 'pointer-events-auto translate-y-0 opacity-100 z-10'
                  : 'pointer-events-none translate-y-8 opacity-0 z-0'
              }`}
            >
              <p className="pt-4 mb-12 text-xs font-semibold uppercase tracking-[0.25em] text-elevate-paper/40 md:mb-20 lg:mb-28">
                {stat.title}
              </p>
              
              {/* Only render RollingNumber when active so it re-animates on switch */}
              <div className="mb-6 flex w-full justify-end h-[100px] items-center gap-4 md:h-[150px] md:gap-6 lg:h-[180px]">
                {isActive && (
                  <>
                    <RollingNumber
                      value={stat.value}
                      color={stat.color}
                      className="text-[100px] leading-none tracking-tighter md:text-[140px] lg:text-[180px]"
                    />
                    {stat.id === 3 && (
                      <div className="shrink-0 flex items-center pt-2 md:pt-6">
                        <ElevateMedal size={95} color="#5FC9C0" rank="III" className="drop-shadow-lg" />
                      </div>
                    )}
                  </>
                )}
              </div>

              {stat.desc && (
                <p className="max-w-sm text-base leading-relaxed text-elevate-paper/60 md:text-xl lg:max-w-md">
                  {stat.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════ */
function ScrollRevealBlock({ paragraphs }: { paragraphs: {text: string, className: string}[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray('.reveal-char', containerRef.current);
      gsap.fromTo(chars,
        { opacity: 0.05 },
        { 
          opacity: 1, 
          duration: 0.1,
          stagger: 5 / chars.length, 
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-6 md:gap-10">
      {paragraphs.map((p, pIndex) => (
        <p key={pIndex} className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-1 ${p.className}`}>
          {p.text.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex">
              {word.split('').map((char, charIndex) => (
                <span key={charIndex} className="reveal-char inline-block will-change-[opacity]">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text stagger reveal
      gsap.from('.hero-word', { opacity: 0, y: 40, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
      gsap.from('.hero-nav', { opacity: 0, y: -20, duration: 1, ease: 'power2.out' });
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 1.2, delay: 0.8, ease: 'power2.out' });
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative font-display bg-elevate-black">



      {/* ══════════════════════════════════════════
          HERO — Dark Editorial
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex h-svh min-h-[700px] w-full flex-col bg-elevate-black text-elevate-paper gsap-snap-section"
      >
        {/* Nav */}
        <header className="hero-nav flex w-full items-center justify-between px-6 py-6 md:px-12 lg:px-20">
          <a href="#" className="flex items-center gap-2 transition-opacity hover:opacity-50" aria-label="Elevate home">
            <SpinningStar className="size-4 text-elevate-orange" />
            <span className="text-sm font-bold tracking-widest uppercase text-elevate-paper">Elevate</span>
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            <Link to="/privacy_policy" className="text-xs font-semibold tracking-[0.2em] uppercase text-elevate-paper/40 transition-colors hover:text-elevate-paper">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs font-semibold tracking-[0.2em] uppercase text-elevate-paper/40 transition-colors hover:text-elevate-paper">
              Terms &amp; Conditions
            </Link>
          </nav>
          <a href="#focus"
            className="rounded-full border border-elevate-paper/20 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-elevate-paper transition-all hover:bg-elevate-paper hover:text-elevate-black">
            Download
          </a>
        </header>

        {/* Hero content */}
        <div className="flex flex-1 flex-col items-start justify-end px-6 pb-16 md:px-12 lg:px-20 lg:pb-28">
          {/* Massive headline */}
          <h1 className="flex flex-col gap-0 text-[68px] font-black leading-[0.88] tracking-[-0.03em] md:text-[110px] lg:text-[150px] xl:text-[190px]">
            <span className="hero-word block text-elevate-paper">Focus</span>
            <span className="hero-word block" style={{ color: 'transparent', WebkitTextStroke: '2px rgba(253,252,250,0.8)' }}>
              <MeshWord words={heroWords} />
            </span>
            <span className="hero-word block text-elevate-paper">Train</span>
            <span className="hero-word block" style={{ color: 'transparent', WebkitTextStroke: '2px rgba(253,252,250,0.8)' }}>smarter.</span>
          </h1>
          
          <p className="mt-6 md:mt-10 whitespace-nowrap text-sm md:text-base font-['Space_Mono',monospace] font-bold uppercase tracking-widest text-elevate-orange">
            "The lion will achieve everything he sets his sights on or he will perish in the pursuit of it."
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-8 w-px bg-elevate-paper/20" style={{ animation: 'scrollLine 2s ease-in-out infinite' }} />
        </div>
      </section>



      {/* Orange separator */}
      <div className="h-1 w-full bg-elevate-orange" />


      {/* ══════════════════════════════════════════
          KINETIC QUOTE
      ══════════════════════════════════════════ */}
      <section className="bg-elevate-black px-6 py-12 md:px-12 lg:px-20 lg:py-20 gsap-snap-section min-h-svh flex flex-col justify-center">
        <div className="mx-auto max-w-6xl w-full">
          <ScrollRevealBlock paragraphs={[
            {
              text: "The only enemy you face is your uncontrolled mind, not people, not failure, not even fear. Just you on autopilot. Because when the mind runs wild, it turns shadows into monsters and doubts into truths. You start fighting things that don’t exist conversations that never happened, futures that haven't arrived.",
              className: "text-[16px] font-['Special_Elite',_monospace] leading-[1.4] tracking-wide text-elevate-paper md:text-[20px] lg:text-[24px]"
            },
            {
              text: "An untrained mind is a brilliant liar. It mimics your voice, wears your thoughts, and convinces you to stay small.",
              className: "text-[16px] font-['Special_Elite',_monospace] leading-[1.4] tracking-wide text-elevate-paper/80 md:text-[20px] lg:text-[24px]"
            },
            {
              text: "But when you take control, real control, everything shifts. You stop reacting you start choosing. You stop panicking you start planning. The world doesn’t get easier you get stronger.",
              className: "text-[16px] font-['Special_Elite',_monospace] leading-[1.4] tracking-wide text-elevate-paper/80 md:text-[20px] lg:text-[24px]"
            },
            {
              text: "Train the mind, or it trains you. That’s not self-help that’s strategy.",
              className: "text-[16px] font-['Special_Elite',_monospace] font-bold leading-[1.4] tracking-wide text-elevate-primary md:text-[20px] lg:text-[24px]"
            }
          ]} />
        </div>
      </section>

      {/* Orange separator */}
      <div className="h-1 w-full bg-elevate-orange" />
      {/* ══════════════════════════════════════════
          WORKOUT TEMPLATES — Hover Flood
      ══════════════════════════════════════════ */}
      <section className="bg-elevate-black px-6 py-8 md:px-12 lg:px-20 lg:py-10 gsap-snap-section min-h-svh flex flex-col justify-center">
        <div className="mx-auto max-w-6xl">
          <Reveal direction="up" className="mb-8 flex items-center gap-3">
            <SpinningStar className="size-4 text-elevate-orange" />
            <p className="text-xs font-semibold tracking-[0.3em] text-elevate-orange uppercase">Workout Templates</p>
          </Reveal>
          <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
            <div className="flex-1 flex flex-col">
              {workoutTemplates.slice(0, 3).map((template, i) => (
                <HoverFloodItem key={template.name} text={template.name} index={i} exercises={template.exercises} />
              ))}
            </div>
            {/* Vertical Separator */}
            <div className="hidden md:block w-[1px] bg-elevate-paper/10" />
            <div className="flex-1 flex flex-col">
              {workoutTemplates.slice(3, 6).map((template, i) => (
                <HoverFloodItem key={template.name} text={template.name} index={i + 3} exercises={template.exercises} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Orange separator */}
      <div className="h-1 w-full bg-elevate-orange" />

      {/* ══════════════════════════════════════════
          MANIFESTO
      ══════════════════════════════════════════ */}
      <section id="focus" className="relative overflow-hidden bg-elevate-black px-6 py-28 md:px-12 lg:px-20 lg:py-44 gsap-snap-section min-h-svh flex flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start -translate-y-6 md:-translate-y-12">
            <h2 className="flex flex-col text-[48px] font-black leading-[1.0] tracking-tight text-elevate-paper md:text-[80px] lg:text-[100px]">
              <Reveal direction="left" className="flex flex-wrap gap-x-3 md:gap-x-5">Cut the</Reveal>
              <Reveal direction="left" delay={100} className="flex flex-wrap gap-x-3 md:gap-x-5">
                <span className="glitch-text" data-text="noise.">noise.</span>
              </Reveal>
              <Reveal direction="left" delay={200} className="mt-4 flex flex-wrap gap-x-3 md:mt-8 md:gap-x-5">Start the</Reveal>
              <Reveal direction="left" delay={300} className="flex flex-wrap gap-x-3 text-[#B30000] md:gap-x-5">Journey.</Reveal>
            </h2>
            <Reveal direction="fade" delay={400} className="mt-10 md:mt-14">
              <Link to="/download"
                className="group inline-flex items-center gap-3 rounded-full bg-elevate-orange px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-elevate-orange-light hover:shadow-lg md:px-10 md:py-4">
                Download alpha
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          {/* Right: Phone Mockup */}
          <Reveal direction="up" delay={200} className="flex-shrink-0 -translate-y-8 md:-translate-y-16">
            <div className="relative w-[260px] md:w-[310px] lg:w-[360px]">
              {/* Phone shell */}
              <div className="relative rounded-[40px] border-[8px] border-elevate-paper/10 bg-[#111] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#111] rounded-b-2xl z-10" />
                {/* Screen: GIF */}
                <img
                  src="/intro.gif"
                  alt="Elevate App Intro"
                  className="w-full h-full object-cover"
                />
                {/* Continue with Google button overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 pt-10 z-20"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 60%, transparent)' }}>
                  <button className="w-full flex items-center justify-center gap-2 rounded-full border border-white bg-black px-4 py-2.5 text-[11px] font-semibold text-white tracking-wide">
                    {/* Google Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 shrink-0">
                      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-elevate-orange px-6 py-28 text-white md:px-12 lg:px-20 lg:py-44 gsap-snap-section min-h-svh flex flex-col justify-center">
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal direction="up" className="mb-8 flex items-center justify-center gap-3">
            <SpinningStar className="size-5" />
            <p className="text-xs font-semibold tracking-[0.25em] uppercase">About us</p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="mb-16 text-[56px] font-black leading-[0.95] tracking-tight md:text-[90px] lg:text-[120px]">
              NICE TO<br />TRAIN<br />WITH YOU
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-white/75 md:text-xl lg:text-2xl">
              We're builders, athletes, and data nerds. Coffee lovers, fitness obsessed, curious by nature, strategic by choice.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=brihitnath@gmail.com&su=Hey,%20i%20want%20to%20work%20with%20you" target="_blank" rel="noreferrer"
              className="mt-14 inline-block text-sm font-bold uppercase tracking-wider underline underline-offset-4 transition-opacity hover:opacity-60">
              Work with us
            </a>
          </Reveal>
        </div>
      </section>



      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <div className="w-full shrink-0">
        <div className="h-1 w-full bg-elevate-orange" />
        <VelocityMarquee />
        <div className="h-1 w-full bg-elevate-orange" />
      </div>
      <footer className="bg-elevate-black px-6 py-14 text-elevate-paper md:px-12 lg:px-20 gsap-snap-section">
        <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <SpinningStar className="size-6 text-elevate-orange" />
            <span className="text-3xl font-black tracking-tight">Elevate</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link to="/privacy_policy" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Privacy</Link>
            <Link to="/terms" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Terms</Link>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="text-xs text-elevate-paper/20">© 2026 Elevate. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/not_brihit/" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Brihit Nath</a>
              <a href="https://www.instagram.com/the.duskdynamics/" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Duskdynamics</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scrollLine {
          0%, 100% { opacity: 0.2; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(1.3); }
        }
      `}</style>
    </div>
  );
}
