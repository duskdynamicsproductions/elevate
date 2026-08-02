import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLogo } from './AnimatedLogo';
import { KineticTextScramble } from './KineticTextScramble';
import { MagneticWrapper } from './MagneticWrapper';
import { SpotlightGrid } from './SpotlightGrid';
import {
  Download,
  Smartphone,
  Sparkles,
  Shield,
  Clock,
  Flame,
  Check,
  Bell,
  CheckCircle2,
  Calendar,
  Lock,
  Share2
} from 'lucide-react';

export const downloadUrl = "https://github.com/duskdynamicsproductions/Elevate/releases/download/v1.0.0-alpha/Elevate-alpha.apk";

// Feature previews data
const upcomingFeatures = [
  {
    icon: <Shield className="size-5 text-elevate-orange" />,
    tag: "DISCIPLINE",
    title: "Distractions Out Mode",
    desc: "Locks out addictive social apps and redirects focus toward workout goals, mindfulness, and productive habits."
  },
  {
    icon: <Clock className="size-5 text-elevate-orange" />,
    tag: "LIMITS",
    title: "Enforced App Caps",
    desc: "Set strict 30-minute daily limits on Instagram, YouTube, and TikTok. Hard lock when limit is reached."
  },
  {
    icon: <Lock className="size-5 text-elevate-orange" />,
    tag: "DETOX",
    title: "NSFW Content Shield",
    desc: "On-device AI protection monitors search queries and immediately exits explicit or harmful content."
  },
  {
    icon: <Flame className="size-5 text-elevate-orange" />,
    tag: "FITNESS",
    title: "Workout Analytics",
    desc: "Log sets, reps, weights, and automated progressive overload charts tailored for male wellness."
  }
];

function CountdownTimer({ targetDate }: { targetDate: number }) {
  const [remaining, setRemaining] = useState(() => Math.max(0, targetDate - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, targetDate - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  const values = [
    ['Days', Math.floor(remaining / 86_400_000)],
    ['Hours', Math.floor((remaining / 3_600_000) % 24)],
    ['Mins', Math.floor((remaining / 60_000) % 60)],
    ['Secs', Math.floor((remaining / 1_000) % 60)],
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {values.map(([label, value]) => (
        <div key={label} className="rounded-xl border border-white/[0.08] bg-black/20 px-2 py-3 text-center">
          <span className="block text-2xl font-black tabular-nums text-white md:text-3xl">{String(value).padStart(2, '0')}</span>
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-elevate-paper/40">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function DownloadPage() {
  const targetDate = new Date('2026-08-22T00:00:00').getTime();
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail.trim()) return;
    setNotifySuccess(true);
    setTimeout(() => {
      setNotifySuccess(false);
      setNotifyEmail('');
    }, 4000);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="relative min-h-screen bg-elevate-black font-display text-elevate-paper selection:bg-elevate-orange selection:text-white flex flex-col overflow-x-hidden">
      
      {/* ── Interactive Spotlight Background Grid Canvas ── */}
      <SpotlightGrid gridSize={48} spotlightRadius={220} />

      {/* ── Ambient Background Orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
        <div className="animate-float-slow animate-pulse-glow absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-elevate-orange/25 blur-[140px]" />
        <div className="animate-float-slow animate-pulse-glow absolute bottom-10 right-10 h-[500px] w-[500px] rounded-full bg-amber-500/15 blur-[120px]" style={{ animationDelay: '-8s' }} />
      </div>

      {/* ── Global Header ── */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/[0.06] bg-elevate-black/80 px-6 py-5 backdrop-blur-xl md:px-12 lg:px-20">
        <AnimatedLogo 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          starClassName="size-4 text-elevate-orange"
          textClassName="text-sm font-bold tracking-widest uppercase"
          ariaLabel="Elevate home"
        />

        <div className="flex items-center gap-6">
          <MagneticWrapper strength={0.25}>
            <button
              onClick={copyShareLink}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all hover:border-white/30 hover:text-white"
            >
              {copiedLink ? <Check className="size-3.5 text-elevate-orange" /> : <Share2 className="size-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
          </MagneticWrapper>

          <Link
            to="/"
            className="text-xs font-bold tracking-[0.2em] uppercase text-elevate-paper/40 transition-colors hover:text-white"
          >
            HOME
          </Link>
        </div>
      </header>

      {/* ── Main Hero Section ── */}
      <main className="relative z-10 flex-1 px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          
          {/* Top Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-elevate-orange/30 bg-elevate-orange/10 px-4 py-1.5 text-xs font-bold tracking-widest text-elevate-orange uppercase">
            <Sparkles className="size-3.5" />
            <span>PLAY STORE LAUNCH · AUGUST 22, 2026</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Hero Text & Direct Download CTA */}
            <div className="lg:col-span-7">
              <h1 className="mb-6 text-4xl font-black leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
                <KineticTextScramble text="Release 22082026" />
                <br />
                <span className="text-elevate-orange">
                  <KineticTextScramble text="Coming Soon" />
                </span> to Play Store.
              </h1>

              <p className="mb-8 max-w-xl text-base leading-relaxed text-elevate-paper/60 md:text-lg">
                Elevate is preparing for its official public launch on the Google Play Store on <strong className="text-white">August 22, 2026</strong>. Try our early Alpha APK release today or register to get notified instantly at launch.
              </p>

              {/* Download Buttons Group */}
              <div className="mb-10 flex flex-wrap items-center gap-4">
                <MagneticWrapper strength={0.3}>
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-elevate-orange px-8 py-4 text-sm font-bold text-white shadow-xl shadow-elevate-orange/20 transition-all hover:scale-[1.03] hover:shadow-elevate-orange/40"
                  >
                    <Download className="size-5 transition-transform group-hover:translate-y-0.5" />
                    <span>Download Alpha v1.0.0 APK</span>
                    <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-mono text-white/90">
                      APK · 16 MB
                    </span>
                  </a>
                </MagneticWrapper>

                <MagneticWrapper strength={0.2}>
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-md">
                    <Smartphone className="size-5 text-elevate-orange" />
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-bold tracking-widest text-elevate-paper/40 uppercase">EXCLUSIVELY ON</span>
                      <span className="text-xs font-bold text-white">Google Play Store</span>
                    </div>
                  </div>
                </MagneticWrapper>
              </div>

              {/* Live Countdown Box */}
              <div className="rounded-2xl border border-white/10 bg-elevate-dark/80 p-6 backdrop-blur-xl">
                <p className="mb-4 text-xs font-bold tracking-[0.2em] text-elevate-orange uppercase">
                  ⏳ Countdown to Google Play Release
                </p>

                <CountdownTimer targetDate={targetDate} />
              </div>
            </div>

            {/* Right Interactive Mockup / Notification Registration */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-elevate-dark/90 to-elevate-black p-8 backdrop-blur-2xl shadow-2xl">
                
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-elevate-orange uppercase tracking-wider">
                    <Bell className="size-4" />
                    Get Launch Notification
                  </div>
                  <span className="rounded-full bg-elevate-orange/20 px-2.5 py-0.5 text-[10px] font-bold text-elevate-orange">
                    Aug 22 Early Access
                  </span>
                </div>

                <p className="mb-6 text-xs leading-relaxed text-elevate-paper/60 md:text-sm">
                  Be among the first to get the official Play Store link as soon as Release 22082026 goes live.
                </p>

                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold text-elevate-paper/50 uppercase tracking-wider">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white placeholder-elevate-paper/30 outline-none transition-all focus:border-elevate-orange/60 focus:bg-white/[0.08]"
                    />
                  </div>

                  <MagneticWrapper strength={0.2} className="w-full">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white p-3.5 text-xs font-bold text-elevate-black transition-transform hover:scale-[1.02] shadow-lg"
                    >
                      <Bell className="size-4 text-elevate-orange" />
                      <span>Notify Me On Play Store Launch</span>
                    </button>
                  </MagneticWrapper>
                </form>

                {notifySuccess && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-elevate-orange/40 bg-elevate-orange/10 p-3 text-xs font-bold text-elevate-orange animate-in fade-in">
                    <CheckCircle2 className="size-4 shrink-0" />
                    <span>You're registered! We'll notify you on Aug 22, 2026.</span>
                  </div>
                )}

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between text-xs text-elevate-paper/40">
                    <span>Current Version:</span>
                    <span className="font-mono font-bold text-white">v1.0.0-alpha</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-elevate-paper/40">
                    <span>Target Platform:</span>
                    <span className="font-bold text-white">Android 9.0+ (API 28+)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Feature Highlights Grid ── */}
          <div className="mt-24">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black uppercase text-white md:text-4xl">
                <KineticTextScramble text="What's Inside Release 22082026" />
              </h2>
              <p className="mt-2 text-xs font-medium text-elevate-paper/40 uppercase tracking-widest">
                Engineered for physical fitness & mental focus
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {upcomingFeatures.map((feat, idx) => (
                <MagneticWrapper key={idx} strength={0.15} className="w-full">
                  <div className="group h-full rounded-2xl border border-white/10 bg-elevate-dark/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-elevate-orange/40">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                        {feat.icon}
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-elevate-paper/30 uppercase">
                        {feat.tag}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-black text-white">
                      <KineticTextScramble text={feat.title} />
                    </h3>
                    <p className="text-xs leading-relaxed text-elevate-paper/50">{feat.desc}</p>
                  </div>
                </MagneticWrapper>
              ))}
            </div>
          </div>

          {/* ── Release Roadmap Timeline ── */}
          <div className="mt-24 rounded-3xl border border-white/10 bg-elevate-dark/60 p-8 backdrop-blur-xl md:p-12">
            <h3 className="mb-8 flex items-center gap-3 text-xl font-black uppercase text-white md:text-2xl">
              <Calendar className="size-6 text-elevate-orange" />
              <span>Release Timeline & Roadmap</span>
            </h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="relative border-l-2 border-elevate-orange pl-6">
                <span className="absolute -left-[9px] top-0 size-4 rounded-full bg-elevate-orange ring-4 ring-elevate-orange/20" />
                <span className="text-[10px] font-bold tracking-widest text-elevate-orange uppercase">PHASE 1 · COMPLETED</span>
                <h4 className="mt-1 text-base font-bold text-white">Alpha APK Build</h4>
                <p className="mt-2 text-xs leading-relaxed text-elevate-paper/50">
                  Closed internal builds testing UsageAccess, Accessibility blocking, and local SQLite/Room database sync.
                </p>
              </div>

              <div className="relative border-l-2 border-elevate-orange pl-6">
                <span className="absolute -left-[9px] top-0 size-4 rounded-full bg-elevate-orange ring-4 ring-elevate-orange/20" />
                <span className="text-[10px] font-bold tracking-widest text-elevate-orange uppercase">PHASE 2 · IN PROGRESS</span>
                <h4 className="mt-1 text-base font-bold text-white">Closed Beta & QA</h4>
                <p className="mt-2 text-xs leading-relaxed text-elevate-paper/50">
                  Refining Jetpack Compose animations, app limit algorithms, and Firebase backup compliance.
                </p>
              </div>

              <div className="relative border-l-2 border-white/20 pl-6">
                <span className="absolute -left-[9px] top-0 size-4 rounded-full bg-white/20" />
                <span className="text-[10px] font-bold tracking-widest text-elevate-paper/40 uppercase">PHASE 3 · AUG 22, 2026</span>
                <h4 className="mt-1 text-base font-bold text-white">Google Play Store Launch</h4>
                <p className="mt-2 text-xs leading-relaxed text-elevate-paper/50">
                  Public worldwide distribution of Release 22082026 exclusively on the Google Play Store.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 mt-auto flex w-full flex-col items-start justify-between gap-8 border-t border-elevate-paper/10 px-6 py-8 md:flex-row md:items-center md:px-12 lg:px-20">
        <AnimatedLogo 
          to="/" 
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          starClassName="size-6 text-elevate-orange"
          textClassName="text-3xl font-black tracking-tight"
          ariaLabel="Elevate home"
        />
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <Link to="/privacy_policy" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/40 transition-colors hover:text-white">Privacy</Link>
          <Link to="/terms" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/40 transition-colors hover:text-white">Terms</Link>
          <Link to="/joinourjourney" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/40 transition-colors hover:text-white">Join Us</Link>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="text-xs text-elevate-paper/20">© 2026 Elevate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/brihit-nath-7114623a6/" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-white">Brihit Nath</a>
            <a href="https://www.instagram.com/the.duskdynamics/" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-white">Duskdynamics</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
