import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════ */
const downloadUrl =
  'https://drive.google.com/file/d/1hnh-xATdmLxxX_yeLb8CDgZqwnKHjG0o/view?usp=sharing';

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
    desc: 'Lock out distracting apps and websites during your focus sessions. Proven to improve deep-work output by up to 40%.',
  },
  {
    num: '02',
    title: 'App limits',
    desc: 'Set hard daily time caps on any app - Instagram, YouTube, Twitter. When the limit hits, the app locks. No snooze, no excuses.',
  },
  {
    num: '03',
    title: 'Reels scrolled',
    desc: "See exactly how many Reels, TikToks, and Shorts you consumed today. The number is confronting. That's the point.",
  },
  {
    num: '04',
    title: 'Sexual detox',
    desc: 'Track your NoFap / sexual abstinence streak. Daily accountability, milestone badges, and urge-surfing prompts to keep you on the path.',
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

const workoutTemplates = ['PUSH', 'PULL', 'LEGS', 'UPPER LOWER', 'FULL BODY', 'PPL SPLIT'];

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
    };
    const tick = () => {
      curX += (mouseX - curX) * 0.08; curY += (mouseY - curY) * 0.08;
      gsap.set(cursor, { x: curX - 20, y: curY - 20 });
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
      <div ref={cursorRef} className="pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 rounded-full border border-elevate-paper/60 mix-blend-difference" style={{ willChange: 'transform' }} />
      <div ref={dotRef} className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-elevate-paper mix-blend-difference" style={{ willChange: 'transform' }} />
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

function RollingDigit({ target, delay, color }: { target: string; delay: number; color: string }) {
  const colRef = useRef<HTMLDivElement>(null);
  const targetIndex = DIGITS.indexOf(target);
  useEffect(() => {
    const el = colRef.current;
    if (!el || targetIndex < 0) return;
    const extraSpins = 2;
    const totalItems = DIGITS.length * extraSpins + targetIndex;
    const itemH = el.offsetHeight / DIGITS.length;
    gsap.set(el, { y: 0 });
    gsap.to(el, { y: -itemH * totalItems, duration: 1.4 + delay * 0.3, delay: delay * 0.08, ease: 'power4.out' });
  }, [target, delay, targetIndex]);
  const strip: string[] = [];
  for (let s = 0; s < 3; s++) strip.push(...DIGITS);
  return (
    <div className="relative overflow-hidden" style={{ height: '1.05em', lineHeight: '1.05em' }}>
      <div ref={colRef} className="flex flex-col" style={{ color }}>
        {strip.map((d, i) => <span key={i} className="block" style={{ height: '1.05em', lineHeight: '1.05em' }}>{d}</span>)}
      </div>
    </div>
  );
}

function RollingNumber({ value, color = '#FF6200', className = '' }: { value: string; color?: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);
  const digits = value.split('');
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setFired(true); obs.unobserve(el); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={wrapRef} className={`flex items-end font-black leading-none tracking-tight ${className}`}>
      {digits.map((d, i) =>
        /[0-9]/.test(d)
          ? (fired ? <RollingDigit key={i} target={d} delay={i} color={color} /> : <span key={i} style={{ color, opacity: 0 }}>{d}</span>)
          : <span key={i} style={{ color }}>{d}</span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   KINETIC WORD REVEAL (scroll-triggered word by word)
═══════════════════════════�/* ══════════════════════════════════════════════════════════
   TRASH ANIMATION — brand SVGs + realistic transparent bin
══════════════════════════════════════════════════════════ */
const SOCIAL_ICONS_DATA = [
  { id: 'ig', x: -140 }, { id: 'tt', x: -85 }, { id: 'yt', x: -28 },
  { id: 'tw', x: 28 },   { id: 'fb', x: 85 },  { id: 'sc', x: 140 },
  { id: 'rd', x: 0 },
];

function SocialSVG({ id }: { id: string }) {
  if (id === 'ig') return (
    <svg viewBox="0 0 48 48" width="56" height="56"><defs><radialGradient id="igg" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><rect x="2" y="2" width="44" height="44" rx="12" fill="url(#igg)"/><circle cx="24" cy="24" r="11" fill="none" stroke="white" strokeWidth="3.5"/><circle cx="35" cy="13" r="3" fill="white"/></svg>
  );
  if (id === 'tt') return (
    <svg viewBox="0 0 48 48" width="52" height="52"><rect width="48" height="48" rx="12" fill="#010101"/><path d="M36 18a8 8 0 0 1-8-8h-6v24a4 4 0 1 1-4-4v-6a10 10 0 1 0 10 10V20a14 14 0 0 0 8 2v-4z" fill="white"/></svg>
  );
  if (id === 'yt') return (
    <svg viewBox="0 0 48 48" width="58" height="58"><path d="M44 14s-.5-3.5-2-5c-2-2-4.2-2-5.2-2.1C31 6.4 24 6.4 24 6.4s-7 0-12.8.5c-1 .1-3.2.1-5.2 2.1-1.5 1.5-2 5-2 5S3.5 18 3.5 22v3.7c0 4 .5 8 .5 8s.5 3.5 2 5c2 2 4.6 1.9 5.8 2.1C15.5 41.2 24 41.3 24 41.3s7 0 12.8-.6c1-.1 3.2-.1 5.2-2.1 1.5-1.5 2-5 2-5s.5-4 .5-8V22c0-4-.5-8-.5-8z" fill="#FF0000"/><polygon points="20,30 30.5,24 20,18" fill="white"/></svg>
  );
  if (id === 'tw') return (
    <svg viewBox="0 0 48 48" width="52" height="52"><rect width="48" height="48" rx="12" fill="#000"/><path d="M36.5 7h6.6L29.5 22.5 45 41h-13.3L22 29.8 10 41H3.4l14.7-16.8L3 7h13.6l9 11.8L36.5 7zm-2.3 30.4h3.7L14.2 10.7h-4L34.2 37.4z" fill="white"/></svg>
  );
  if (id === 'fb') return (
    <svg viewBox="0 0 48 48" width="54" height="54"><rect width="48" height="48" rx="12" fill="#1877F2"/><path d="M33 7h-5a10 10 0 0 0-10 10v5h-5v7h5v16h7V29h5l1-7h-6v-5a3 3 0 0 1 3-3h3V7z" fill="white"/></svg>
  );
  if (id === 'sc') return (
    <svg viewBox="0 0 48 48" width="50" height="50"><rect width="48" height="48" rx="12" fill="#FFFC00"/><path d="M24 8c-5.5 0-9 4-9 9v3c-1 .2-2 .5-2 .5s.8.8.8 1.8c0 .6-.4 1.1-1 1.4.5 1 1.6 1.6 3 1.6 1 2 3 3.2 5 3.2h2c2 0 4-1.2 5-3.2 1.4 0 2.5-.6 3-1.6-.6-.3-1-.8-1-1.4 0-1 .8-1.8.8-1.8s-1-.3-2-.5v-3c0-5-3.5-9-9-9z" fill="#222"/></svg>
  );
  if (id === 'rd') return (
    <svg viewBox="0 0 48 48" width="54" height="54"><circle cx="24" cy="24" r="24" fill="#FF4500"/><path d="M40 24a4 4 0 0 0-6.8-2.9A18 18 0 0 0 24 18l1.8-7 5.1 1.2a2.7 2.7 0 1 0 .5-2.1L25 8.8 23.1 16A18 18 0 0 0 13 19.1 4 4 0 0 0 8 24a4 4 0 0 0 .9 2.5 6 6 0 0 0-.1.9c0 5 5.8 9 13 9s13-4 13-9a6 6 0 0 0-.1-.9A4 4 0 0 0 40 24zm-21 2a2.2 2.2 0 1 1 4.4 0 2.2 2.2 0 0 1-4.4 0zm11.5 5.7A7.5 7.5 0 0 1 24 33.5a7.5 7.5 0 0 1-6.5-1.8.6.6 0 0 1 .8-.8 6.4 6.4 0 0 0 11.4 0 .6.6 0 0 1 .8.8zM30.2 28a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z" fill="white"/></svg>
  );
  return null;
}

function TrashAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trashBodyRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bin = trashBodyRef.current;
      const icons = iconRefs.current.filter(Boolean) as HTMLElement[];

      const runLoop = () => {
        icons.forEach((icon) => {
          gsap.set(icon, {
            y: gsap.utils.random(-700, -350),
            rotation: gsap.utils.random(-180, 180),
            scale: gsap.utils.random(0.85, 1.15),
            opacity: 1,
          });
        });

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to(bin, {
              keyframes: [
                { x: -10, duration: 0.06 }, { x: 10, duration: 0.06 },
                { x: -6,  duration: 0.06 }, { x: 6,  duration: 0.06 },
                { x: 0,   duration: 0.06 },
              ],
              onComplete: () => {
                gsap.to(icons, {
                  opacity: 0, scale: 0.4, duration: 0.45, stagger: 0.07, ease: 'power2.in',
                  onComplete: () => setTimeout(runLoop, 500),
                });
              }
            });
          }
        });

        icons.forEach((icon, i) => {
          const delay = gsap.utils.random(0, 1.0);
          const dur   = gsap.utils.random(0.7, 1.3);
          const landY = 300 + (i % 4) * 12 + Math.sin(i * 1.3) * 8;
          tl.to(icon, {
            y: landY, rotation: gsap.utils.random(-22, 22),
            duration: dur, ease: 'bounce.out',
          }, delay);
        });
      };

      runLoop();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Falling brand icons */}
      {SOCIAL_ICONS_DATA.map((icon, i) => (
        <div
          key={icon.id}
          ref={el => { iconRefs.current[i] = el; }}
          style={{
            position: 'absolute', top: 0,
            left: `calc(50% + ${icon.x}px - 28px)`,
            filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.7))',
            willChange: 'transform', zIndex: 4,
          }}
        >
          <SocialSVG id={icon.id} />
        </div>
      ))}

      {/* Transparent 3D bin */}
      <div
        ref={trashBodyRef}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', width: 300, zIndex: 3 }}
      >
        {/* Handle */}
        <div style={{ width: 52, height: 14, margin: '0 auto', borderRadius: '6px 6px 0 0', background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.2)', borderBottom: 'none' }}/>
        {/* Lid */}
        <div style={{ width: '115%', marginLeft: '-7.5%', height: 28, background: 'linear-gradient(135deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.03) 100%)', border: '1.5px solid rgba(255,255,255,0.22)', borderRadius: '10px 10px 0 0', backdropFilter: 'blur(4px)', boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.18),0 4px 16px rgba(0,0,0,0.5)' }}/>
        {/* Body */}
        <div style={{ width: '100%', height: 340, background: 'linear-gradient(160deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.018) 100%)', border: '1.5px solid rgba(255,255,255,0.14)', borderTop: 'none', borderRadius: '0 0 22px 22px', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden', boxShadow: 'inset 3px 0 20px rgba(255,255,255,0.025),inset -3px 0 20px rgba(255,255,255,0.025),0 16px 60px rgba(0,0,0,0.6)' }}>
          <div style={{ position:'absolute',left:0,top:0,bottom:0,width:2.5,background:'linear-gradient(to bottom,rgba(255,255,255,0.28),rgba(255,255,255,0.05) 50%,transparent)' }}/>
          <div style={{ position:'absolute',right:0,top:0,bottom:0,width:2.5,background:'linear-gradient(to bottom,rgba(255,255,255,0.12),transparent)' }}/>
          {[75, 150, 225].map(x => <div key={x} style={{ position:'absolute',left:x,top:0,bottom:0,width:1.5,background:'rgba(255,255,255,0.06)' }}/>)}
          <div style={{ position:'absolute',bottom:0,left:0,right:0,height:70,background:'linear-gradient(to top,rgba(0,0,0,0.4),transparent)' }}/>
        </div>
        {/* Base */}
        <div style={{ width: '90%', margin: '0 auto', height: 14, background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', borderTop: 'none', borderRadius: '0 0 10px 10px' }}/>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HORIZONTAL SCROLL FEATURES
══════════════════════════════════════════════════════════ */
function HorizontalFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-elevate-black" id="story">
      <div ref={trackRef} className="flex" style={{ width: `${features.length * 100}vw` }}>
        {features.map((feat, i) => (
          <div
            key={feat.num}
            className="relative flex h-screen w-screen flex-col justify-between px-8 py-16 md:px-16 lg:px-24"
            style={{ borderRight: '1px solid rgba(253,252,250,0.06)' }}
          >
            {/* Ghost number */}
            <span className="pointer-events-none absolute right-8 top-8 select-none text-[25vw] font-black leading-none text-elevate-paper/[0.03] z-0">{feat.num}</span>

            {/* Trash Animation on first slide */}
            {feat.num === '01' && <TrashAnimation />}

            {/* Top: number label */}
            <div className="relative z-10">
              <p className="text-xs font-semibold tracking-[0.3em] text-elevate-paper/30 uppercase">{feat.num} / 06</p>
            </div>

            {/* Center: title */}
            <div className="relative z-10">
              <h3 className="text-[10vw] font-black leading-none tracking-tight text-elevate-paper md:text-[7vw]">
                {feat.title}
              </h3>
            </div>

            {/* Bottom: desc + orange line */}
            <div className="relative z-10">
              <div className="mb-6 h-px w-16 bg-elevate-orange" />
              <p className="max-w-sm text-base leading-relaxed text-elevate-paper/45 md:text-lg">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-elevate-paper/30 uppercase">
        <span>Scroll</span>
        <span className="text-elevate-orange">→</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOVER FLOOD ITEM (workout list)
══════════════════════════════════════════════════════════ */
function HoverFloodItem({ text, index }: { text: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const floodRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    setHovered(true);
    gsap.fromTo(floodRef.current, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.45, ease: 'power3.out' });
  };
  const onLeave = () => {
    setHovered(false);
    gsap.to(floodRef.current, { scaleX: 0, transformOrigin: 'right', duration: 0.3, ease: 'power2.in' });
  };

  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden border-t border-elevate-paper/10 py-6 md:py-8 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Flood background */}
      <div ref={floodRef} className="absolute inset-0 bg-elevate-orange" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />

      <div className="relative flex items-center justify-between">
        <h3
          className="text-[48px] font-black leading-none tracking-tight md:text-[80px] lg:text-[110px] xl:text-[140px] transition-colors duration-300"
          style={{ color: hovered ? '#0C0B0B' : 'rgba(253,252,250,0.15)' }}
        >
          {text}
        </h3>
        <span
          className="shrink-0 text-xs font-semibold tracking-[0.2em] transition-colors duration-300"
          style={{ color: hovered ? '#0C0B0B' : 'rgba(253,252,250,0.2)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
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
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.unobserve(el); } },
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
  direction?: 'up' | 'left' | 'right' | 'scale'; delay?: number;
}) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const dirClasses = {
    up: revealed ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
    left: revealed ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0',
    right: revealed ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0',
    scale: revealed ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
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
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const tick = () => {
      const scrollY = window.scrollY;
      velocityRef.current = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;
      xRef.current -= 1.2 + Math.abs(velocityRef.current) * 0.5;
      if (trackRef.current && xRef.current < -trackRef.current.scrollWidth / 2) xRef.current = 0;
      gsap.set(trackRef.current, { x: xRef.current });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);
  const items = Array.from({ length: 6 }).map((_, i) => (
    <span key={i} className="mx-6 text-[52px] font-black uppercase leading-none tracking-tight text-elevate-paper/[0.05] md:text-[80px] lg:text-[110px]" style={{ WebkitTextStroke: '1px rgba(253,252,250,0.08)' }}>
      Focus harder&nbsp;•&nbsp;Train smarter&nbsp;•&nbsp;
    </span>
  ));
  return (
    <div className="overflow-hidden whitespace-nowrap bg-elevate-black py-3">
      <div ref={trackRef} className="inline-flex will-change-transform">{items}{items}</div>
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
    title: "TODAY'S DAMAGE",
    value: '247',
    color: '#FF6200',
    desc: "Each reel averages 18 sec. That's 1.2 hours of your life gone.",
  },
  {
    id: 2,
    label: 'App limits set',
    title: 'HARD CAPS ACTIVE',
    value: '5',
    color: '#1ED760',
    desc: 'Instagram at 20 min. YouTube at 30 min. Reddit blocked entirely.',
  },
  {
    id: 3,
    label: 'Days - Sexual detox',
    title: 'CURRENT STREAK',
    value: '14',
    color: '#3B82F6',
    desc: 'Milestones at 7, 14, 30, 90 days. Urge surfing prompts built-in.',
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
      <div className="flex w-full flex-col justify-center border-b border-elevate-paper/[0.08] p-8 md:w-[45%] md:border-b-0 md:border-r md:p-12 lg:p-16">
        {detoxStats.map((stat, i) => (
          <div
            key={stat.id}
            onMouseEnter={() => setActiveIdx(i)}
            onClick={() => setActiveIdx(i)}
            className="group cursor-pointer py-4 md:py-6"
          >
            <h3
              className="text-4xl font-black uppercase leading-[0.85] tracking-tighter transition-all duration-300 md:text-5xl lg:text-7xl xl:text-[80px]"
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
      <div className="relative flex min-h-[400px] w-full flex-col justify-center p-8 md:min-h-0 md:w-[55%] md:p-12 lg:p-16">
        {detoxStats.map((stat, i) => {
          const isActive = activeIdx === i;
          return (
            <div
              key={stat.id}
              className={`absolute inset-0 flex flex-col justify-center p-8 transition-all duration-500 md:p-12 lg:p-16 ${
                isActive
                  ? 'pointer-events-auto translate-y-0 opacity-100 z-10'
                  : 'pointer-events-none translate-y-8 opacity-0 z-0'
              }`}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-elevate-paper/40">
                {stat.title}
              </p>
              
              {/* Only render RollingNumber when active so it re-animates on switch */}
              <div className="mb-6 h-[100px] md:h-[150px] lg:h-[180px]">
                {isActive && (
                  <RollingNumber
                    value={stat.value}
                    color={stat.color}
                    className="text-[100px] leading-none tracking-tighter md:text-[140px] lg:text-[180px]"
                  />
                )}
              </div>

              <p className="max-w-sm text-base leading-relaxed text-elevate-paper/60 md:text-xl lg:max-w-md">
                {stat.desc}
              </p>
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
function KineticText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.kinetic-word');
      gsap.fromTo(words, 
        { opacity: 0, y: 30, rotationX: -30 }, 
        { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.05, ease: 'back.out(1.4)', 
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-[0.3em] gap-y-2 ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="kinetic-word inline-block origin-bottom will-change-transform">{word}</span>
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
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative font-display bg-elevate-black">
      <CustomCursor />


      {/* ══════════════════════════════════════════
          HERO — Dark Editorial
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex h-svh min-h-[700px] w-full flex-col bg-elevate-black text-elevate-paper"
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
          <a href={downloadUrl} target="_blank" rel="noreferrer"
            className="rounded-full border border-elevate-paper/20 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-elevate-paper transition-all hover:bg-elevate-paper hover:text-elevate-black">
            Download
          </a>
        </header>

        {/* Hero content */}
        <div className="flex flex-1 flex-col items-start justify-end px-6 pb-16 md:px-12 lg:px-20 lg:pb-28">
          {/* Massive headline */}
          <h1 className="flex flex-col gap-0 text-[68px] font-black leading-[0.88] tracking-[-0.03em] md:text-[110px] lg:text-[150px] xl:text-[190px]">
            <span className="hero-word block text-elevate-paper">Focus</span>
            <span className="hero-word block text-elevate-paper/80">
              <MeshWord words={heroWords} />
            </span>
            <span className="hero-word block text-elevate-paper">Train</span>
            <span className="hero-word block text-elevate-paper/80">smarter.</span>
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
          FEATURES — Horizontal Scroll
      ══════════════════════════════════════════ */}
      <HorizontalFeatures />

      {/* ══════════════════════════════════════════
          DIGITAL DETOX STATS
      ══════════════════════════════════════════ */}
      <section className="bg-elevate-black px-6 py-24 md:px-12 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal direction="up">
            <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-elevate-orange uppercase">Digital Detox</p>
          </Reveal>
          <Reveal direction="up" delay={80}>
            <h2 className="mb-16 max-w-3xl text-4xl font-black leading-[1.0] tracking-tight text-elevate-paper md:text-6xl lg:text-7xl">
              The numbers don't lie.<br />Face them daily.
            </h2>
          </Reveal>

          <InteractiveDetox />

          <Reveal direction="up" delay={300}>
            <div className="mt-px flex flex-col items-start gap-6 bg-elevate-paper/[0.02] p-10 sm:flex-row sm:items-center sm:justify-between lg:p-14">
              <p className="max-w-lg text-base font-semibold leading-relaxed text-elevate-paper/35">
                <span className="text-elevate-paper">Confronting data creates change.</span> Elevate surfaces the uncomfortable truth so you can make a better decision tomorrow.
              </p>
              <a href={downloadUrl} target="_blank" rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-elevate-paper/20 px-6 py-3 text-sm font-semibold text-elevate-paper transition-all hover:bg-elevate-paper hover:text-elevate-black">
                Start your detox →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          KINETIC QUOTE
      ══════════════════════════════════════════ */}
      <section className="bg-elevate-black px-6 py-32 md:px-12 lg:px-20 lg:py-48">
        <div className="mx-auto max-w-6xl">
          <KineticText
            text="Discipline beats motivation. Every single time. Build the system. Trust the process. Show up anyway."
            className="text-[32px] font-black leading-[1.1] tracking-tight text-elevate-paper md:text-[52px] lg:text-[68px]"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VELOCITY MARQUEE
      ══════════════════════════════════════════ */}
      <VelocityMarquee />

      {/* ══════════════════════════════════════════
          WORKOUT TEMPLATES — Hover Flood
      ══════════════════════════════════════════ */}
      <section className="bg-elevate-black px-6 py-20 md:px-12 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal direction="up" className="mb-14 flex items-center gap-3">
            <SpinningStar className="size-4 text-elevate-orange" />
            <p className="text-xs font-semibold tracking-[0.3em] text-elevate-orange uppercase">Workout Templates</p>
          </Reveal>
          <div className="flex flex-col">
            {workoutTemplates.map((name, i) => (
              <HoverFloodItem key={name} text={name} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="bg-elevate-black px-6 py-8 md:px-12 lg:px-20 lg:py-14">
        <Reveal direction="scale">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 overflow-hidden rounded-2xl bg-elevate-orange px-8 py-10 md:px-14 md:py-14">
            <p className="max-w-xl text-2xl font-black uppercase leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
              Ready when you are. Download the alpha.
            </p>
            <a href={downloadUrl} target="_blank" rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-elevate-black px-6 py-4 text-xs font-bold uppercase tracking-wider text-elevate-orange transition-transform hover:scale-105 md:h-24 md:w-24 md:px-0 md:py-0 md:text-sm">
              Let's train
            </a>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════
          MANIFESTO
      ══════════════════════════════════════════ */}
      <section id="focus" className="relative overflow-hidden bg-elevate-black px-6 py-28 md:px-12 lg:px-20 lg:py-44">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex flex-col text-[48px] font-black leading-[1.0] tracking-tight text-elevate-paper md:text-[80px] lg:text-[100px]">
            <Reveal direction="left" className="flex flex-wrap gap-x-3 md:gap-x-5">When the</Reveal>
            <Reveal direction="left" delay={100} className="flex flex-wrap items-center gap-x-3 md:gap-x-5">
              <span>C</span>
              <ConnectionCoil className="h-8 w-40 md:h-12 md:w-64 lg:h-16 lg:w-80" />
              <span>nnection</span>
            </Reveal>
            <Reveal direction="left" delay={200} className="flex flex-wrap gap-x-3 md:gap-x-5">is real,</Reveal>
            <Reveal direction="left" delay={300} className="flex flex-wrap gap-x-3 md:gap-x-5 text-elevate-orange">it shows.</Reveal>
          </h2>
        </div>
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-elevate-orange px-6 py-6 md:flex lg:px-8 lg:py-8">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">Beta</p>
            <p className="text-4xl font-black text-white lg:text-5xl">9.6</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-elevate-orange px-6 py-28 text-white md:px-12 lg:px-20 lg:py-44">
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
            <a href={downloadUrl} target="_blank" rel="noreferrer"
              className="mt-14 inline-block text-sm font-bold uppercase tracking-wider underline underline-offset-4 transition-opacity hover:opacity-60">
              Train more with us
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section id="planner" className="bg-elevate-black px-6 py-24 md:px-12 lg:px-20 lg:py-36">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal direction="up">
            <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-elevate-orange uppercase">Build 04042026 Alpha</p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="mb-8 max-w-3xl text-5xl font-black leading-[1.0] tracking-tight text-elevate-paper md:text-7xl lg:text-8xl">Stay accountable.</h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="mb-12 max-w-lg text-base leading-relaxed text-elevate-paper/35">
              Join the alpha and start your journey to a more focused, disciplined you.
            </p>
          </Reveal>
          <Reveal direction="scale" delay={300}>
            <a href={downloadUrl} target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-elevate-orange px-9 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-elevate-orange-light hover:shadow-lg md:px-10 md:py-5">
              Download alpha
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="border-t border-elevate-paper/10 bg-elevate-black px-6 py-14 text-elevate-paper md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex items-center gap-2.5">
            <SpinningStar className="size-4 text-elevate-orange" />
            <span className="text-lg font-black tracking-tight">Elevate</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">{link.label}</a>
            ))}
            <Link to="/privacy_policy" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Privacy</Link>
            <Link to="/terms" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Terms</Link>
          </div>
          <p className="text-xs text-elevate-paper/20">© 2026 Elevate. All rights reserved.</p>
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
