import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedLogo } from './AnimatedLogo';
import {
  Shield,
  Database,
  Lock,
  ShieldCheck,
  SlidersHorizontal,
  Server,
  Share2,
  Clock,
  Trash2,
  ExternalLink,
  Mail,
  UserCheck,
  HeartPulse,
  Users,
  RefreshCw,
  Cloud,
  Calendar,
  Zap,
  HelpCircle,
  DollarSign,
  Scale,
  Search,
  Copy,
  Check,
  BookOpen,
  Layers,
  Info,
  FileText,
  X,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type SectionItem = {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  body?: string;
  list?: string[];
  highlight?: boolean;
};

// Search Highlight Component
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="legal-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function LegalLayout({
  badge,
  title,
  subtitle,
  updated,
  sections,
  contactExtra,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  updated: string;
  sections: SectionItem[];
  contactExtra?: string;
}) {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  // State Management
  const [viewMode, setViewMode] = useState<'story' | 'reader'>('story');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || 'section-1');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const storyTriggerId = `legal-story-${isPrivacy ? 'privacy' : 'terms'}`;

  // Story mode pins a horizontal GSAP track. Explicitly remove that pin before
  // entering Reader mode so its spacer/transform cannot cover the vertical page.
  const changeView = (nextView: 'story' | 'reader') => {
    if (nextView === viewMode) return;
    ScrollTrigger.getById(storyTriggerId)?.kill(true);
    setScrollProgress(0);
    setViewMode(nextView);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      ScrollTrigger.refresh();
    });
  };

  // Trigger Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Copy URL with Section Hash
  const copySectionLink = (secId: string, secTitle: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${secId}`;
    navigator.clipboard.writeText(url);
    triggerToast(`Copied link to "${secTitle}"`);
  };

  // Copy Email Helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    triggerToast(`Copied ${label} (${text})`);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.body?.toLowerCase().includes(q) ||
        s.list?.some((item) => item.toLowerCase().includes(q))
    );
  }, [sections, searchQuery]);

  // Read time calculation
  const readTimeMinutes = useMemo(() => {
    const totalWords = sections.reduce((acc, s) => {
      const bWords = s.body ? s.body.split(/\s+/).length : 0;
      const lWords = s.list ? s.list.reduce((sum, item) => sum + item.split(/\s+/).length, 0) : 0;
      return acc + bWords + lWords;
    }, 0);
    return Math.ceil(totalWords / 200);
  }, [sections]);

  // Handle keyboard shortcut for search ('/' focus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // GSAP Horizontal Scroll Setup for 'story' view mode
  useEffect(() => {
    window.scrollTo(0, 0);
    setScrollProgress(0);

    if (viewMode !== 'story') return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let ctx: gsap.Context | null = null;

    if (window.innerWidth >= 768) {
      const totalWidth = track.scrollWidth - window.innerWidth;
      if (totalWidth > 0) {
        ctx = gsap.context(() => {
          gsap.to(track, {
            x: -totalWidth,
            ease: 'none',
            scrollTrigger: {
              id: storyTriggerId,
              trigger: container,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                setScrollProgress(Math.round(self.progress * 100));
                const currentIndex = Math.min(
                  sections.length - 1,
                  Math.floor(self.progress * sections.length)
                );
                if (sections[currentIndex]) {
                  setActiveSectionId(sections[currentIndex].id);
                }
              },
            },
          });
        });
      }
    }

    return () => {
      ctx?.revert();
      ScrollTrigger.getById(storyTriggerId)?.kill(true);
    };
  }, [viewMode, sections.length, filteredSections.length, storyTriggerId]);

  // Scrollspy for Reader view mode
  useEffect(() => {
    if (viewMode !== 'reader') return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.round((window.scrollY / totalHeight) * 100));
      }

      const elements = sections.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 250;

      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSectionId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode, sections]);

  return (
    <div className="relative min-h-screen bg-elevate-black font-display text-elevate-paper selection:bg-elevate-orange selection:text-white md:overflow-x-hidden">
      
      {/* ── Ambient Kinetic Background Orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
        <div className="animate-float-slow animate-pulse-glow absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-elevate-orange/20 blur-[120px]" />
        <div className="animate-float-slow animate-pulse-glow absolute -right-40 top-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[140px]" style={{ animationDelay: '-6s' }} />
        <div className="animate-float-slow animate-pulse-glow absolute left-1/3 bottom-10 h-[450px] w-[450px] rounded-full bg-orange-500/15 blur-[110px]" style={{ animationDelay: '-12s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      {/* ── Toast Notification Popup ── */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full border border-elevate-orange/40 bg-elevate-dark/90 px-6 py-3 text-xs font-bold tracking-wide text-white shadow-2xl backdrop-blur-xl transition-all animate-in fade-in slide-in-from-top-4">
          <Check className="size-4 text-elevate-orange" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Scroll Progress Line ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-elevate-paper/5">
        <div
          className="h-full bg-gradient-to-r from-elevate-orange via-orange-400 to-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Global Header & Dynamic Navigation ── */}
      <header className="sticky top-0 z-50 flex w-full flex-col gap-4 border-b border-white/[0.06] bg-elevate-black/80 px-6 py-4 backdrop-blur-xl md:px-12 lg:px-20">
        <div className="flex w-full items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <AnimatedLogo
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            starClassName="size-4 text-elevate-orange"
            textClassName="text-sm font-bold tracking-widest uppercase"
            ariaLabel="Elevate home"
          />

          {/* Quick Page Switcher Pill Tabs */}
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
            <Link
              to="/privacy_policy"
              className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all ${
                isPrivacy
                  ? 'bg-elevate-orange text-white shadow-lg shadow-elevate-orange/20'
                  : 'text-elevate-paper/50 hover:text-white'
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase transition-all ${
                !isPrivacy
                  ? 'bg-elevate-orange text-white shadow-lg shadow-elevate-orange/20'
                  : 'text-elevate-paper/50 hover:text-white'
              }`}
            >
              Terms of Use
            </Link>
          </div>

          {/* View Mode & Actions Group */}
          <div className="flex items-center gap-3">
            
            {/* View Mode Switcher */}
            <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
              <button
                onClick={() => changeView('story')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase transition-all ${
                  viewMode === 'story'
                    ? 'bg-white/15 text-white'
                    : 'text-elevate-paper/40 hover:text-white'
                }`}
                title="Story Horizontal Card Mode"
              >
                <Layers className="size-3.5" />
                <span>Story</span>
              </button>
              <button
                onClick={() => changeView('reader')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase transition-all ${
                  viewMode === 'reader'
                    ? 'bg-white/15 text-white'
                    : 'text-elevate-paper/40 hover:text-white'
                }`}
                title="Editorial Vertical Document Mode"
              >
                <BookOpen className="size-3.5" />
                <span>Reader</span>
              </button>
            </div>

            {/* Read Time Badge */}
            <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] font-semibold text-elevate-paper/40 lg:flex">
              <Clock className="size-3 text-elevate-orange" />
              <span>~{readTimeMinutes} min read</span>
            </span>

            {/* Home Link */}
            <Link
              to="/"
              className="text-xs font-bold tracking-[0.2em] uppercase text-elevate-paper/40 transition-colors hover:text-white"
            >
              HOME
            </Link>
          </div>
        </div>

        {/* Dynamic Interactive Search Bar */}
        <div className="relative w-full max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 size-4 text-elevate-paper/40" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal terms, policies, permissions, deletion... (Press '/' to search)"
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2 pl-10 pr-10 text-xs text-white placeholder-elevate-paper/30 outline-none backdrop-blur-md transition-all focus:border-elevate-orange/60 focus:bg-white/[0.08]"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-elevate-paper/40 hover:text-white"
              >
                <X className="size-4" />
              </button>
            ) : (
              <span className="absolute right-3 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-elevate-paper/30">
                /
              </span>
            )}
          </div>

          {searchQuery.trim() && (
            <div className="absolute right-0 -bottom-6 text-[11px] font-semibold text-elevate-orange">
              {filteredSections.length} section{filteredSections.length !== 1 ? 's' : ''} matched
            </div>
          )}
        </div>
      </header>

      {/* ── Full Screen Hero Header ── */}
      <section className="relative z-10 flex min-h-[500px] w-full flex-col justify-center border-b border-white/[0.06] px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-elevate-orange/30 bg-elevate-orange/10 px-3.5 py-1 text-xs font-bold tracking-[0.2em] text-elevate-orange uppercase">
              <Sparkles className="size-3.5" />
              {badge}
            </span>
            <span className="text-xs font-medium tracking-widest text-elevate-paper/30 uppercase">
              Last Updated: {updated}
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-black leading-[0.92] tracking-tight text-white md:text-7xl lg:text-[96px]">
            {title}
          </h1>

          {subtitle && (
            <p className="mb-8 max-w-3xl text-base leading-relaxed text-elevate-paper/60 md:text-xl">
              {subtitle}
            </p>
          )}

          {/* Quick Summary Highlights */}
          <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-elevate-orange uppercase tracking-wider">
                <ShieldCheck className="size-4" />
                Zero Data Sale
              </div>
              <p className="text-xs leading-relaxed text-elevate-paper/50">
                Your personal details, profile, and workouts are never sold to advertisers or data brokers.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-elevate-orange uppercase tracking-wider">
                <Lock className="size-4" />
                Granular Permissions
              </div>
              <p className="text-xs leading-relaxed text-elevate-paper/50">
                Usage Access, Accessibility, and Google Drive access are requested only when features are activated.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-elevate-orange uppercase tracking-wider">
                <UserCheck className="size-4" />
                Full Control & Rights
              </div>
              <p className="text-xs leading-relaxed text-elevate-paper/50">
                Instant in-app account deletion or 1-click email grievance process with a 90-day maximum resolution timeline.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Indicator & Scroll Guide */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-elevate-paper/40">
          <div className="flex items-center gap-2 font-mono">
            <span className="size-2 rounded-full bg-elevate-orange animate-ping" />
            <span>ACTIVE MODE: {viewMode.toUpperCase()} VIEW</span>
          </div>

          <div className="flex items-center gap-2 font-semibold tracking-widest uppercase">
            <span>Scroll to explore sections ({filteredSections.length})</span>
            <span className="animate-bounce text-elevate-orange">↓</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         MODE 1: STORY VIEW (Dynamic Horizontal Pinned Showcase)
      ══════════════════════════════════════════════════════════ */}
      {viewMode === 'story' && (
        <div ref={containerRef} className="relative z-10 w-full overflow-hidden bg-elevate-black">
          <main ref={trackRef} className="flex flex-col md:flex-row md:w-max">
            
            {filteredSections.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className="group relative flex min-h-[75dvh] flex-col justify-center border-b border-white/[0.06] px-6 py-20 md:h-screen md:w-screen md:min-h-0 md:border-b-0 md:border-r md:border-white/10 md:px-12 lg:px-20 overflow-hidden"
              >
                {/* Background Ghost Number */}
                <span className="pointer-events-none absolute right-8 top-12 select-none text-7xl font-black text-white/[0.04] transition-all duration-500 group-hover:text-elevate-orange/[0.1] md:text-[14vw]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="z-10 flex w-full max-w-3xl flex-col items-start rounded-2xl border border-white/10 bg-elevate-dark/70 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-elevate-orange/40 md:p-12">
                  
                  {/* Category Pill Badge & Actions */}
                  <div className="mb-6 flex w-full items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2 rounded-full border border-elevate-orange/30 bg-elevate-orange/10 px-3.5 py-1 text-xs font-bold tracking-wider text-elevate-orange uppercase">
                      {s.icon}
                      <span>{s.category}</span>
                    </div>

                    <button
                      onClick={() => copySectionLink(s.id, s.title)}
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-elevate-paper/50 transition-colors hover:border-white/30 hover:text-white"
                      title="Copy Direct Link"
                    >
                      <Copy className="size-3.5" />
                      <span className="hidden sm:inline">Copy Link</span>
                    </button>
                  </div>

                  {/* Section Title */}
                  <h2 className="mb-6 text-2xl font-black leading-tight tracking-tight text-white uppercase md:text-4xl lg:text-5xl">
                    <HighlightText text={s.title} query={searchQuery} />
                  </h2>

                  {/* Body Paragraph */}
                  {s.body && (
                    <p className="mb-6 text-sm leading-relaxed text-elevate-paper/70 md:text-lg lg:text-xl w-full break-words">
                      <HighlightText text={s.body} query={searchQuery} />
                    </p>
                  )}

                  {/* Bullet List Items */}
                  {s.list && (
                    <ul className="mt-2 space-y-3.5 w-full">
                      {s.list.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3.5 text-xs leading-relaxed text-elevate-paper/70 md:text-base lg:text-lg w-full break-words rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 transition-colors hover:border-elevate-orange/20"
                        >
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-elevate-orange shadow-sm shadow-elevate-orange" />
                          <span className="flex-1 min-w-0">
                            <HighlightText text={item} query={searchQuery} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* ── Final Contact & Grievance Card Slide ── */}
            <div className="relative flex flex-col justify-center px-6 py-20 md:h-screen md:w-screen md:min-h-0 md:px-12 lg:px-20">
              
              <div className="max-w-3xl rounded-3xl border border-elevate-orange/30 bg-gradient-to-br from-elevate-orange via-orange-600 to-amber-700 p-8 text-white shadow-2xl md:p-14">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/20 px-3.5 py-1 text-xs font-bold tracking-widest text-white/90 uppercase">
                  <Mail className="size-3.5" />
                  Official Grievance & Support
                </div>

                <h3 className="mb-6 text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
                  Have questions or privacy requests?
                </h3>

                <p className="mb-8 text-sm leading-relaxed text-white/80 md:text-base">
                  We take data security and user rights seriously. Contact our developer & grievance officer directly for fast resolution.
                </p>

                <div className="space-y-4 rounded-2xl bg-black/25 p-6 backdrop-blur-md">
                  <div className="flex flex-col justify-between gap-2 border-b border-white/10 pb-3 md:flex-row md:items-center">
                    <span className="text-xs font-medium text-white/70">Developer & Data Controller:</span>
                    <span className="text-sm font-bold text-white">Brihit Nath</span>
                  </div>

                  <div className="flex flex-col justify-between gap-2 border-b border-white/10 pb-3 md:flex-row md:items-center">
                    <span className="text-xs font-medium text-white/70">Privacy & Support Email:</span>
                    <div className="flex items-center gap-2">
                      <a
                        href="mailto:theduskdynamicsproductions@gmail.com"
                        className="text-xs font-bold text-white underline underline-offset-2 hover:text-black transition-colors break-all"
                      >
                        theduskdynamicsproductions@gmail.com
                      </a>
                      <button
                        onClick={() => copyToClipboard('theduskdynamicsproductions@gmail.com', 'Support Email')}
                        className="rounded p-1 text-white/80 hover:bg-white/20"
                        title="Copy email"
                      >
                        <Copy className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <span className="text-xs font-medium text-white/70">Grievance Officer Contact:</span>
                    <div className="flex items-center gap-2">
                      <a
                        href="mailto:brihitnath@gmail.com"
                        className="text-xs font-bold text-white underline underline-offset-2 hover:text-black transition-colors break-all"
                      >
                        brihitnath@gmail.com
                      </a>
                      <button
                        onClick={() => copyToClipboard('brihitnath@gmail.com', 'Grievance Email')}
                        className="rounded p-1 text-white/80 hover:bg-white/20"
                        title="Copy email"
                      >
                        <Copy className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pre-filled Account Deletion Request Button */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="mailto:theduskdynamicsproductions@gmail.com?subject=Elevate%20account%20deletion%20request&body=Hello,%20I%20request%20the%20deletion%20of%20my%20Elevate%20account%20and%20associated%20data.%20My%20registered%20email%20is:"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-elevate-black shadow-lg transition-transform hover:scale-105"
                  >
                    <Trash2 className="size-4 text-elevate-orange" />
                    <span>Send Pre-filled Account Deletion Email</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>

              {/* Cross Legal Links */}
              <div className="mt-10 mb-12 flex gap-4">
                <Link
                  to="/privacy_policy"
                  className={`rounded-full border px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-all ${
                    isPrivacy
                      ? 'border-elevate-orange bg-elevate-orange/10 text-elevate-orange'
                      : 'border-white/15 text-elevate-paper/50 hover:border-white hover:text-white'
                  }`}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className={`rounded-full border px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-all ${
                    !isPrivacy
                      ? 'border-elevate-orange bg-elevate-orange/10 text-elevate-orange'
                      : 'border-white/15 text-elevate-paper/50 hover:border-white hover:text-white'
                  }`}
                >
                  Terms of Use
                </Link>
              </div>

              {/* Footer */}
              <footer className="mt-auto flex w-full flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center">
                <AnimatedLogo
                  to="/"
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  starClassName="size-6 text-elevate-orange"
                  textClassName="text-2xl font-black tracking-tight text-white"
                  ariaLabel="Elevate home"
                />
                <div className="flex flex-wrap items-center gap-6">
                  <Link to="/privacy_policy" className="text-xs font-semibold tracking-wider uppercase text-elevate-paper/40 hover:text-white">
                    Privacy
                  </Link>
                  <Link to="/terms" className="text-xs font-semibold tracking-wider uppercase text-elevate-paper/40 hover:text-white">
                    Terms
                  </Link>
                  <Link to="/joinourjourney" className="text-xs font-semibold tracking-wider uppercase text-elevate-paper/40 hover:text-white">
                    Join Us
                  </Link>
                </div>
                <p className="text-xs text-elevate-paper/30">© 2026 Elevate. All rights reserved.</p>
              </footer>
            </div>

          </main>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
         MODE 2: READER VIEW (Editorial Vertical Reader + Sticky TOC)
      ══════════════════════════════════════════════════════════ */}
      {viewMode === 'reader' && (
        <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-6 py-12 pb-28 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Sticky Table of Contents Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 rounded-2xl border border-white/10 bg-elevate-dark/80 p-6 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elevate-orange">
                    <BookOpen className="size-4" />
                    Table of Contents ({filteredSections.length})
                  </h3>
                </div>

                <nav className="max-h-[60vh] overflow-y-auto space-y-1 pr-2">
                  {filteredSections.map((s, idx) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.getElementById(s.id);
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-all ${
                        activeSectionId === s.id
                          ? 'bg-elevate-orange/20 font-bold text-elevate-orange border-l-2 border-elevate-orange'
                          : 'text-elevate-paper/50 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      <span className="truncate">
                        {String(idx + 1).padStart(2, '0')}. {s.title}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Vertical Main Legal Sections */}
            <main className="space-y-12 lg:col-span-8">
              {filteredSections.map((s, idx) => (
                <article
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-36 rounded-2xl border border-white/10 bg-elevate-dark/60 p-6 backdrop-blur-xl transition-all hover:border-elevate-orange/30 md:p-8"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-elevate-orange/30 bg-elevate-orange/10 px-3 py-1 text-xs font-bold text-elevate-orange uppercase">
                      {s.icon}
                      <span>{s.category}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-elevate-paper/30">
                        {String(idx + 1).padStart(2, '0')} / {String(filteredSections.length).padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => copySectionLink(s.id, s.title)}
                        className="rounded p-1 text-elevate-paper/40 hover:bg-white/10 hover:text-white"
                        title="Copy Link"
                      >
                        <Copy className="size-4" />
                      </button>
                    </div>
                  </div>

                  <h2 className="mb-4 text-2xl font-black text-white md:text-3xl">
                    <HighlightText text={s.title} query={searchQuery} />
                  </h2>

                  {s.body && (
                    <p className="mb-6 text-sm leading-relaxed text-elevate-paper/70 md:text-base">
                      <HighlightText text={s.body} query={searchQuery} />
                    </p>
                  )}

                  {s.list && (
                    <ul className="space-y-3">
                      {s.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-xs leading-relaxed text-elevate-paper/70 md:text-sm">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-elevate-orange" />
                          <span>
                            <HighlightText text={item} query={searchQuery} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}

              {/* Reader View Contact Card */}
              <div className="rounded-2xl border border-elevate-orange/40 bg-gradient-to-br from-elevate-orange via-orange-600 to-amber-700 p-8 text-white shadow-xl">
                <h3 className="mb-4 text-2xl font-black">Need Further Clarification?</h3>
                <p className="mb-6 text-xs leading-relaxed text-white/80 md:text-sm">
                  Contact developer Brihit Nath at <span className="font-bold underline">theduskdynamicsproductions@gmail.com</span> or grievance officer at <span className="font-bold underline">brihitnath@gmail.com</span>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:theduskdynamicsproductions@gmail.com?subject=Elevate%20Privacy%20Question"
                    className="rounded-full bg-white px-5 py-2 text-xs font-bold text-elevate-black shadow"
                  >
                    Email Support
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PRIVACY POLICY SECTIONS DATA
══════════════════════════════════════════════════════════ */
export function PrivacyPage() {
  const sections: SectionItem[] = [
    {
      id: 'section-1',
      title: 'About this policy',
      category: 'OVERVIEW',
      icon: <Info className="size-4" />,
      highlight: true,
      body: 'Elevate is operated by Brihit Nath. This policy explains how Elevate uses your data to provide account, workout, focus, wellness, analytics, sync, and backup features. Elevate does not sell your personal data.',
    },
    {
      id: 'section-2',
      title: 'Data you provide or create',
      category: 'USER DATA',
      icon: <Database className="size-4" />,
      list: [
        'Account details: email address, sign-in provider, account status, and Firebase user ID.',
        'Profile details: name, age, height, weight, goal bodyweight, preferences, and settings.',
        'Workout and fitness data: sessions, exercises, sets, reps, weights, timers, templates, workout history, goals, and progress analytics.',
        'Focus and wellness data: focus sessions, app-limit history, selected blocked apps, selected monitored apps, discipline score, and related activity.',
        'Backup settings: automatic backup status, scheduled backup time, time zone, last backup day, and backup source.',
      ],
    },
    {
      id: 'section-3',
      title: 'Data from optional permissions',
      category: 'PERMISSIONS',
      icon: <Lock className="size-4" />,
      body: 'Elevate uses sensitive Android permissions only after you enable the related feature.',
      list: [
        'Usage Access: used for app-limit, focus, and discipline features.',
        'Accessibility: used to redirect you away from apps you selected to block during focus or app-limit flows.',
        'Installed app information: used to show apps you can choose to block or monitor.',
        'Google Drive access: used to create or restore your backup file after you approve Drive access.',
      ],
    },
    {
      id: 'section-4',
      title: 'Data Elevate does NOT collect',
      category: 'PRIVACY PROTECTION',
      icon: <ShieldCheck className="size-4" />,
      list: [
        'No sale of personal data.',
        'No camera, microphone, contacts, SMS, call log, precise location, payment-card, or password collection.',
        'No reading of private messages, passwords, forms, financial content, or content inside other apps through Accessibility.',
        'No ads or advertising tracking in the current app.',
      ],
    },
    {
      id: 'section-5',
      title: 'How data is used',
      category: 'DATA PROCESSING',
      icon: <SlidersHorizontal className="size-4" />,
      body: 'Elevate uses data to provide sign-in, profile settings, workout tracking, personal analytics, focus sessions, app-limit features, app blocking, notifications, sync, Google Drive backup/restore, safety controls, and support.',
    },
    {
      id: 'section-6',
      title: 'Where data is stored',
      category: 'STORAGE & INFRASTRUCTURE',
      icon: <Server className="size-4" />,
      list: [
        'On your device in local app storage and local databases.',
        'In Firebase Authentication and Firebase Realtime Database for account, sync, and backup-status features.',
        'In your Google Drive only if you enable Drive backup or restore.',
        'Google and Firebase may process data on infrastructure outside India, subject to their controls and applicable law.',
      ],
    },
    {
      id: 'section-7',
      title: 'Sharing',
      category: 'THIRD PARTIES',
      icon: <Share2 className="size-4" />,
      body: 'Elevate shares data only when needed to provide app features, when you choose a connected feature, or when required by law. Service providers may include Google Firebase, Google Play services, Google Drive APIs, and Android platform services.',
    },
    {
      id: 'section-8',
      title: 'Retention & deletion',
      category: 'RETENTION POLICY',
      icon: <Clock className="size-4" />,
      body: 'Elevate keeps data while it is needed to provide the app, maintain your account, support backup/restore, protect the service, or meet legal obligations. You can request deletion in the app from Privacy & Terms → Delete Account & Data.',
    },
    {
      id: 'section-9',
      title: 'Account & data deletion - what gets deleted',
      category: 'DELETION SCOPE',
      icon: <Trash2 className="size-4" />,
      list: [
        'Firebase Auth account record, where deletion can be verified.',
        'Account-linked Firebase Realtime Database data.',
        'Support records that are not required for security, abuse prevention, legal compliance, or request handling.',
        'Local app data on the device after the in-app deletion flow succeeds.',
      ],
    },
    {
      id: 'section-10',
      title: 'Account & data deletion - what may need separate action',
      category: 'MANUAL ACTION',
      icon: <ExternalLink className="size-4" />,
      list: [
        'Google Drive backup files created by Elevate may need to be deleted from your Google Drive.',
        'Limited records may be retained only where required for security, abuse prevention, legal compliance, or request handling.',
      ],
    },
    {
      id: 'section-11',
      title: 'Deletion request without the app',
      category: 'OFFLINE REQUEST',
      icon: <Mail className="size-4" />,
      body: 'If you no longer have the app installed, send a request from the email address linked to your Elevate account to theduskdynamicsproductions@gmail.com with subject: Elevate account deletion request. Include your account email and what action you need (deletion, correction, consent withdrawal, or grievance). Elevate will respond within a reasonable period not exceeding 90 days.',
    },
    {
      id: 'section-12',
      title: 'Your rights',
      category: 'USER RIGHTS',
      icon: <UserCheck className="size-4" />,
      body: 'You can request access, correction, completion, update, deletion, consent withdrawal, or grievance review by contacting theduskdynamicsproductions@gmail.com. Elevate may need enough information to verify and process your request.',
    },
    {
      id: 'section-13',
      title: 'Health & fitness safety',
      category: 'HEALTH DISCLAIMER',
      icon: <HeartPulse className="size-4" />,
      highlight: true,
      body: 'Elevate is for personal fitness, workout logging, focus, and wellness tracking. It is not medical advice, diagnosis, treatment, physical therapy, professional coaching, or a medical device. Stop exercising if something feels unsafe and speak with a qualified professional when needed.',
    },
    {
      id: 'section-14',
      title: 'Children',
      category: 'AGE & LIABILITY',
      icon: <Users className="size-4" />,
      body: 'Elevate is not intended for users under 18. If a minor uses Elevate, strict and continuous adult supervision is strictly necessary. By allowing a minor to use Elevate, the parent or guardian assumes full responsibility and liability for their actions and safety. Elevate, Duskdynamics, and Brihit Nath are strictly not responsible for any injuries, accidents, or damages (such as those resulting from attempting workouts, exercises, or scenarios depicted in the app) sustained by users of any age.',
    },
    {
      id: 'section-15',
      title: 'Policy changes',
      category: 'POLICY UPDATES',
      icon: <RefreshCw className="size-4" />,
      body: 'Elevate may update this policy as the app changes. The current public policy is always available at this website only on this page.',
    },
  ];

  return (
    <LegalLayout
      badge="Legal · Privacy Policy"
      title="Privacy Policy."
      subtitle="Comprehensive transparency on how Elevate handles, protects, and respects your account and personal fitness data."
      updated="July 5, 2026"
      sections={sections}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   TERMS OF USE SECTIONS DATA
══════════════════════════════════════════════════════════ */
export function TermsPage() {
  const sections: SectionItem[] = [
    {
      id: 'section-1',
      title: 'Agreement',
      category: 'AGREEMENT',
      icon: <FileText className="size-4" />,
      highlight: true,
      body: 'By using Elevate, you agree to use the app responsibly for personal productivity, focus, wellness, and fitness tracking. Use Elevate only for lawful personal purposes. Do not use the app to monitor or control another person\'s device without a lawful basis and clear consent.',
    },
    {
      id: 'section-2',
      title: 'Your account & data',
      category: 'ACCOUNT OBLIGATIONS',
      icon: <UserCheck className="size-4" />,
      body: 'You are responsible for keeping your Google account, device, and app data accurate and secure.',
      list: [
        'Enter accurate profile, workout, and wellness information.',
        'Keep your Google account secure if you use Google Drive backup.',
        'Do not misuse Usage Access, Accessibility, app blocking, sync, or backup features.',
        'If you delete your account, Google Drive backup files may still need to be removed from Google Drive separately.',
      ],
    },
    {
      id: 'section-3',
      title: 'Backups',
      category: 'CLOUD BACKUP',
      icon: <Cloud className="size-4" />,
      body: 'Google Drive backup is optional. Automatic backup starts only after you complete the Drive permission and first backup flow. Backups can help restore app data, but no backup system is guaranteed to be perfect.',
    },
    {
      id: 'section-4',
      title: 'Fitness & wellness',
      category: 'HEALTH DISCLAIMER',
      icon: <HeartPulse className="size-4" />,
      highlight: true,
      body: 'Elevate is not medical advice, diagnosis, treatment, physical therapy advice, nutrition advice, professional coaching, or a medical device. You are responsible for choosing safe workouts and stopping if something feels unsafe. Speak with a qualified professional before starting or changing workouts if you have injuries, pregnancy, disability, chronic illness, heart symptoms, breathing symptoms, eating-disorder history, or any medical concern.',
    },
    {
      id: 'section-5',
      title: 'Account deletion & data requests',
      category: 'DELETION REQUESTS',
      icon: <Mail className="size-4" />,
      body: 'You can request deletion in the app from Privacy & Terms → Delete Account & Data. You can also contact theduskdynamicsproductions@gmail.com for deletion, privacy, or grievance requests.',
    },
    {
      id: 'section-6',
      title: 'What gets deleted',
      category: 'DELETION SCOPE',
      icon: <Trash2 className="size-4" />,
      list: [
        'Firebase Auth account record, where deletion can be verified.',
        'Account-linked Firebase Realtime Database data.',
        'Support records not required for security, abuse prevention, legal compliance, or request handling.',
        'Local app data on the device after the in-app deletion flow succeeds.',
      ],
    },
    {
      id: 'section-7',
      title: 'What may need separate action',
      category: 'SEPARATE STEPS',
      icon: <ExternalLink className="size-4" />,
      list: [
        'Google Drive backup files created by Elevate may need to be deleted from your Google Drive.',
        'Limited records may be retained only where required for security, abuse prevention, legal compliance, or request handling.',
      ],
    },
    {
      id: 'section-8',
      title: 'Response timeline',
      category: 'SERVICE SLA',
      icon: <Calendar className="size-4" />,
      body: 'Elevate will respond within a reasonable period not exceeding 90 days unless a shorter legal deadline applies. You may be asked to verify account ownership before deletion.',
    },
    {
      id: 'section-9',
      title: 'Availability & limits',
      category: 'AVAILABILITY',
      icon: <Zap className="size-4" />,
      body: 'Elevate is provided as available. Features may change, fail, or be unavailable because of device settings, permissions, network issues, Google/Firebase availability, Google Drive availability, or app updates.',
    },
    {
      id: 'section-10',
      title: 'No guaranteed outcomes',
      category: 'DISCLAIMER',
      icon: <HelpCircle className="size-4" />,
      body: 'Elevate can help you track effort, consistency, workouts, focus, and wellness habits - but it does not guarantee fat loss, muscle gain, recovery, pain relief, productivity, mental-health outcomes, backup success, or discipline outcomes.',
    },
    {
      id: 'section-11',
      title: 'Commercial features',
      category: 'COMMERCIAL TERMS',
      icon: <DollarSign className="size-4" />,
      body: 'The current app does not use paid subscriptions, paid coaching, supplement sales, equipment sales, affiliate links, or ads. If a paid or advertising-supported feature is added, Elevate will update the relevant app disclosures before offering that feature.',
    },
    {
      id: 'section-12',
      title: 'Governing law & disputes',
      category: 'GOVERNING LAW',
      icon: <Scale className="size-4" />,
      body: 'These terms are intended to be governed by the laws of India, subject to any mandatory consumer-protection rights that apply to you. Grievance contact: Brihit Nath at brihitnath@gmail.com.',
    },
    {
      id: 'section-13',
      title: 'Changes to terms',
      category: 'TERMS UPDATES',
      icon: <RefreshCw className="size-4" />,
      body: 'These terms may be updated as the app changes. The latest version shown in the app applies when you continue using Elevate.',
    },
  ];

  return (
    <LegalLayout
      badge="Legal · Terms of Use"
      title="Terms of Use."
      subtitle="Terms governing your use of the Elevate application, services, wellness tracking, and data features."
      updated="July 5, 2026"
      sections={sections}
    />
  );
}
