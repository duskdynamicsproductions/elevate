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
    desc: 'Set hard daily time caps on any app — Instagram, YouTube, Twitter. When the limit hits, the app locks. No snooze, no excuses.',
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
   FLOATING SCROLL BALL
══════════════════════════════════════════════════════════ */
function FloatingBall() {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      // Sine-wave X path + linear Y descent
      const xOffset = Math.sin(progress * Math.PI * 4) * 120;
      const yPos = progress * (window.innerHeight * 0.85);
      gsap.to(ball, { x: xOffset, y: yPos, duration: 0.4, ease: 'power2.out' });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={ballRef}
      className="pointer-events-none fixed left-1/2 top-[8vh] z-40 -translate-x-1/2"
      style={{ willChange: 'transform' }}
    >
      <div className="h-5 w-5 rounded-full border-2 border-elevate-paper/30 bg-transparent" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SLOT WORD
══════════════════════════════════════════════════════════ */
function SlotWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(wordRef.current, {
        opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
          gsap.fromTo(wordRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        },
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [words]);

  return <span ref={wordRef} className="inline will-change-auto">{words[index]}</span>;
}

/* ══════════════════════════════════════════════════════════
   KINETIC WORD REVEAL (scroll-triggered word by word)
══════════════════════════════════════════════════════════ */
function KineticText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = el.querySelectorAll('.kinetic-word');
    gsap.set(spans, { opacity: 0.1 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      end: 'bottom 30%',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        spans.forEach((span, i) => {
          const wordProgress = Math.max(0, Math.min(1, (progress * spans.length) - i + 0.5));
          gsap.set(span, { opacity: 0.1 + wordProgress * 0.9 });
        });
      },
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="kinetic-word inline-block mr-[0.25em]">{word}</span>
      ))}
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
            <span className="pointer-events-none absolute right-8 top-8 select-none text-[25vw] font-black leading-none text-elevate-paper/[0.03]">{feat.num}</span>

            {/* Top: number label */}
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-elevate-paper/30 uppercase">{feat.num} / 06</p>
            </div>

            {/* Center: title */}
            <div>
              <h3 className="text-[10vw] font-black leading-none tracking-tight text-elevate-paper md:text-[7vw]">
                {feat.title}
              </h3>
            </div>

            {/* Bottom: desc + orange line */}
            <div>
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
   MARQUEE STRIP
══════════════════════════════════════════════════════════ */
function MarqueeStrip() {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-elevate-orange py-4 md:py-6">
      <div className="animate-marquee inline-block">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="mx-8 text-sm font-bold uppercase tracking-[0.2em] text-white/90 md:text-base">
            Focus harder&nbsp;•&nbsp;Train smarter&nbsp;•&nbsp;Stay accountable&nbsp;•&nbsp;
          </span>
        ))}
      </div>
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

/* ══════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════ */
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
      <FloatingBall />

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
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs font-semibold tracking-[0.2em] uppercase text-elevate-paper/40 transition-colors hover:text-elevate-paper">
                {link.label}
              </a>
            ))}
          </nav>
          <a href={downloadUrl} target="_blank" rel="noreferrer"
            className="rounded-full border border-elevate-paper/20 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-elevate-paper transition-all hover:bg-elevate-paper hover:text-elevate-black">
            Download
          </a>
        </header>

        {/* Hero content */}
        <div className="flex flex-1 flex-col items-start justify-end px-6 pb-16 md:px-12 lg:px-20 lg:pb-28">
          {/* Eyebrow */}
          <p className="hero-sub mb-6 text-xs font-semibold tracking-[0.3em] text-elevate-orange uppercase">
            Focus · Train · Detox
          </p>

          {/* Massive headline */}
          <h1 className="flex flex-col gap-0 text-[68px] font-black leading-[0.88] tracking-[-0.03em] md:text-[110px] lg:text-[150px] xl:text-[190px]">
            <span className="hero-word block text-elevate-paper">Focus</span>
            <span className="hero-word block text-elevate-paper/80">
              <SlotWord words={heroWords} />
            </span>
            <span className="hero-word block text-elevate-paper">Train</span>
            <span className="hero-word block text-elevate-paper/80">smarter.</span>
          </h1>

          {/* Bottom row */}
          <div className="hero-sub mt-12 flex w-full items-end justify-between">
            <p className="max-w-xs text-sm leading-relaxed text-elevate-paper/35">
              Elevate combines distraction blocking, workout planning, and physical analytics into one system.
            </p>
            <a href={downloadUrl} target="_blank" rel="noreferrer"
              className="group relative inline-flex aspect-square h-20 w-20 items-center justify-center rounded-full border border-elevate-paper/20 text-elevate-orange transition-all hover:bg-elevate-orange hover:border-elevate-orange md:h-24 md:w-24">
              <span className="text-center text-[10px] font-bold leading-tight tracking-wider uppercase group-hover:text-elevate-black">Alpha↓</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-8 w-px bg-elevate-paper/20" style={{ animation: 'scrollLine 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════════ */}
      <MarqueeStrip />

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

          <div className="grid grid-cols-1 gap-px bg-elevate-paper/5 sm:grid-cols-3">
            <Reveal direction="up" delay={0} className="bg-elevate-black p-10 lg:p-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-elevate-paper/25">Today's damage</p>
              <p className="mb-1 text-[64px] font-black leading-none tracking-tight text-elevate-orange lg:text-[90px]">247</p>
              <p className="text-base font-semibold text-elevate-paper/60">Reels scrolled</p>
              <p className="mt-4 text-sm leading-relaxed text-elevate-paper/25">
                Each reel averages 18 sec. That's 1.2 hours of your life gone.
              </p>
            </Reveal>
            <Reveal direction="up" delay={100} className="bg-elevate-black p-10 lg:p-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-elevate-paper/25">Hard caps active</p>
              <p className="mb-1 text-[64px] font-black leading-none tracking-tight text-elevate-green lg:text-[90px]">5</p>
              <p className="text-base font-semibold text-elevate-paper/60">App limits set</p>
              <p className="mt-4 text-sm leading-relaxed text-elevate-paper/25">
                Instagram at 20 min. YouTube at 30 min. Reddit blocked entirely.
              </p>
            </Reveal>
            <Reveal direction="up" delay={200} className="bg-elevate-black p-10 lg:p-14">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-elevate-paper/25">Current streak</p>
              <p className="mb-1 text-[64px] font-black leading-none tracking-tight text-elevate-blue-light lg:text-[90px]">14</p>
              <p className="text-base font-semibold text-elevate-paper/60">Days — Sexual detox</p>
              <p className="mt-4 text-sm leading-relaxed text-elevate-paper/25">
                Milestones at 7, 14, 30, 90 days. Urge surfing prompts built-in.
              </p>
            </Reveal>
          </div>

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
