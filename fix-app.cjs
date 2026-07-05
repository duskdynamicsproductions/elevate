const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('function AppBlockedAnimation() {');
const endIndex = content.indexOf('function HorizontalFeatures() {');

if (startIndex !== -1 && endIndex !== -1) {
  const toReplace = content.substring(startIndex, content.lastIndexOf('/* ════════════', endIndex));

  const replacement = `/* Realistic trash bin built entirely with SVG gradients, depth and highlights */
function TrashBinSVG({ open }: { open: boolean }) {
  return (
    <svg width="140" height="200" viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      <defs>
        {/* ── Body cylinder gradient (left-lit) ── */}
        <linearGradient id="bodyMain" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1a1a2e"/>
          <stop offset="12%"  stopColor="#16213e"/>
          <stop offset="28%"  stopColor="#2d3561"/>
          <stop offset="45%"  stopColor="#3a4a7a"/>
          <stop offset="60%"  stopColor="#2d3561"/>
          <stop offset="80%"  stopColor="#16213e"/>
          <stop offset="100%" stopColor="#0d0d1a"/>
        </linearGradient>

        {/* ── Left edge highlight ── */}
        <linearGradient id="leftShine" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="rgba(120,150,255,0.35)"/>
          <stop offset="100%" stopColor="rgba(120,150,255,0)"/>
        </linearGradient>

        {/* ── Top ellipse (opening) ── */}
        <radialGradient id="topOpeningGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0a0a18"/>
          <stop offset="80%"  stopColor="#12122a"/>
          <stop offset="100%" stopColor="#1e1e40"/>
        </radialGradient>

        {/* ── Rim gradient ── */}
        <linearGradient id="rimGrad" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#2a2a4a"/>
          <stop offset="30%"  stopColor="#5a5a9a"/>
          <stop offset="50%"  stopColor="#8888cc"/>
          <stop offset="70%"  stopColor="#5a5a9a"/>
          <stop offset="100%" stopColor="#1e1e38"/>
        </linearGradient>

        {/* ── Lid top gradient ── */}
        <linearGradient id="lidTop" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1e1e38"/>
          <stop offset="20%"  stopColor="#3a3a6e"/>
          <stop offset="50%"  stopColor="#6666aa"/>
          <stop offset="80%"  stopColor="#3a3a6e"/>
          <stop offset="100%" stopColor="#1a1a30"/>
        </linearGradient>

        {/* ── Lid bevel shine ── */}
        <linearGradient id="lidShine" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>

        {/* ── Handle gradient ── */}
        <linearGradient id="handleGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#7878bb"/>
          <stop offset="50%"  stopColor="#4a4a88"/>
          <stop offset="100%" stopColor="#2a2a50"/>
        </linearGradient>

        {/* ── Bottom ellipse ── */}
        <radialGradient id="bottomGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%"   stopColor="#1e1e38"/>
          <stop offset="100%" stopColor="#080810"/>
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
        <line x1="44"  y1="58" x2="40"  y2="183" stroke="rgba(100,100,180,0.12)" strokeWidth="1" strokeLinecap="round"/>
        <line x1="72"  y1="58" x2="72"  y2="185" stroke="rgba(100,100,180,0.12)" strokeWidth="1" strokeLinecap="round"/>
        <line x1="100" y1="58" x2="104" y2="183" stroke="rgba(100,100,180,0.12)" strokeWidth="1" strokeLinecap="round"/>

        {/* Recycling icon */}
        <text x="70" y="132" textAnchor="middle" fontSize="28" fill="rgba(150,150,220,0.18)" fontFamily="sans-serif">♻</text>

        {/* Bottom base ellipse */}
        <ellipse cx="70" cy="188" rx="42" ry="8" fill="url(#bottomGrad)" stroke="#05050f" strokeWidth="1"/>

        {/* Top opening ellipse (dark interior visible) */}
        <ellipse cx="70" cy="52" rx="52" ry="10" fill="url(#topOpeningGrad)" stroke="#0a0a18" strokeWidth="0.5"/>

        {/* Top rim ring */}
        <path
          d="M18 52 Q70 64 122 52 Q70 40 18 52 Z"
          fill="url(#rimGrad)"
          stroke="#15153a"
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
          <ellipse cx="70" cy="40" rx="54" ry="10" fill="#0d0d20" stroke="#05050f" strokeWidth="0.5"/>
        )}

        {/* Lid body — slightly wider than bin top */}
        <path
          d="M12 40 Q70 30 128 40 Q128 56 70 60 Q12 56 12 40 Z"
          fill="url(#lidTop)"
          stroke="#0f0f28"
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
          fill="rgba(80,80,140,0.5)"
          stroke="#0a0a20"
          strokeWidth="0.5"
        />

        {/* Handle base */}
        <rect x="52" y="14" width="36" height="28" rx="8" fill="url(#handleGrad)" stroke="#0f0f28" strokeWidth="1"/>
        {/* Handle top shine */}
        <rect x="55" y="16" width="30" height="8" rx="4" fill="rgba(255,255,255,0.12)"/>
        {/* Handle grip knob */}
        <ellipse cx="70" cy="28" rx="10" ry="7" fill="#3a3a6e" stroke="#1a1a40" strokeWidth="1"/>
        <ellipse cx="70" cy="26" rx="6" ry="3.5" fill="rgba(150,150,220,0.3)"/>
      </g>
    </svg>
  );
}

function AppBlockedAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const binRef = useRef<HTMLDivElement>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [binOpen, setBinOpen] = React.useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wraps = wrapRefs.current.filter(Boolean) as HTMLElement[];
      const svgs = svgRefs.current.filter(Boolean) as HTMLElement[];
      const bin = binRef.current;

      const runCycle = () => {
        setBinOpen(false);
        gsap.set(bin, { y: 0, rotation: 0 });

        wraps.forEach((wrap, i) => {
          gsap.set(wrap, {
            x: gsap.utils.random(-580, 120),
            y: gsap.utils.random(-310, 270),
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
            x: \`+=\${gsap.utils.random(-180, 180)}\`,
            y: \`+=\${gsap.utils.random(-140, 140)}\`,
            rotation: \`+=\${gsap.utils.random(-8, 8)}\`,
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

          const binRect = bin.getBoundingClientRect();
          const cRect = containerRef.current.getBoundingClientRect();
          const targetX = binRect.left + binRect.width / 2 - cRect.left - cRect.width / 2;
          const targetY = binRect.top + binRect.height * 0.25 - cRect.top - cRect.height / 2;

          wraps.forEach((wrap, i) => {
            const delay = i * 0.30 + gsap.utils.random(0, 0.1);
            gsap.to(wrap, {
              x: targetX,
              y: targetY,
              rotation: gsap.utils.random(-45, 45),
              ease: 'power2.in',
              duration: 0.9,
              delay,
              onComplete: () => {
                gsap.set(wrap, { opacity: 0 });
                gsap.to(bin, { y: 5, duration: 0.06, yoyo: true, repeat: 4, ease: 'none', clearProps: 'y' });
              }
            });
          });

          const closeDelay = (wraps.length * 0.30 + 1.4) * 1000;
          setTimeout(() => {
            setBinOpen(false);
            gsap.to(bin, {
              y: -18, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 3,
              onComplete: () => setTimeout(runCycle, 800)
            });
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
      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
        {SOCIAL_ICONS_DATA.map((icon, i) => (
          <div
            key={icon.id}
            ref={el => { wrapRefs.current[i] = el; }}
            className="absolute"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              ref={el => { svgRefs.current[i] = el; }}
              style={{ filter: \`drop-shadow(0 0 14px \${icon.color}99)\` }}
            >
              <SocialSVG id={icon.id} />
            </div>
          </div>
        ))}
      </div>

      {/* Trash bin — right side, z-index above icons */}
      <div
        ref={binRef}
        className="absolute right-8 top-1/2 -translate-y-1/2"
        style={{ zIndex: 20, willChange: 'transform' }}
      >
        <TrashBinSVG open={binOpen} />
      </div>
    </div>
  );
}
`;

  content = content.replace(toReplace, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Done — composed realistic SVG bin!');
} else {
  console.log('Could not find function boundaries.');
}
