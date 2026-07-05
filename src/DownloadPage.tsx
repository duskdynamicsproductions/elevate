import { Link } from 'react-router-dom';

function SpinningStar({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 119" fill="none" className={`animate-spin-slow ${className}`}>
      <path d="M0 70.2418H33.8241L9.90981 94.164L24.5755 108.842L48.4969 84.9194V118.755H69.2407V84.9194L93.155 108.842L107.828 94.164L83.9134 70.2418H117.73V49.4913H83.9134L107.828 25.5691L93.155 10.8915L69.2407 34.8137V0.978394H48.4969V34.8137L24.5755 10.8915L9.90981 25.5691L33.8241 49.4913H0V70.2418Z" fill="currentColor" />
    </svg>
  );
}

export const downloadUrl = "https://github.com/duskdynamicsproductions/Elevate/releases/download/v1.0.0-alpha/Elevate-alpha.apk";

export function DownloadPage() {
  return (
    <div className="bg-elevate-black font-display text-elevate-paper selection:bg-elevate-orange selection:text-white min-h-screen flex flex-col">
      
      <header className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12 lg:px-20 pointer-events-none">
        <Link to="/" className="pointer-events-auto flex items-center gap-2 transition-opacity hover:opacity-50">
          <SpinningStar className="size-4 text-elevate-orange" />
          <span className="text-sm font-bold tracking-widest uppercase">Elevate</span>
        </Link>

        {/* Centered Nav */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            to="/"
            className="pointer-events-auto text-xs font-semibold tracking-[0.2em] uppercase text-elevate-paper/40 transition-colors hover:text-elevate-paper"
          >
            HOME
          </Link>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 pt-24 pb-12">
        <div className="max-w-3xl w-full text-center">
          <h1 className="mb-8 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl animate-slide-up">
            Release 22082026<br/>coming soon
          </h1>
          <p className="mb-12 text-base leading-relaxed text-elevate-paper/50 md:text-xl max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Will exclusively be available on the Play Store.
          </p>
        </div>
      </main>

      <footer className="mt-auto flex w-full flex-col items-start justify-between gap-10 border-t border-elevate-paper/10 px-6 py-8 md:flex-row md:items-center md:px-12 lg:px-20">
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
      </footer>

    </div>
  );
}
