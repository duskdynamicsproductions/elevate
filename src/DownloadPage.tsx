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
          <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-elevate-orange uppercase animate-fade-in">Alpha Release</p>
          <h1 className="mb-8 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl animate-slide-up">
            Ready to <br/>Elevate?
          </h1>
          <p className="mb-12 text-base leading-relaxed text-elevate-paper/50 md:text-xl max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
            Download the latest alpha build for Android and start tracking your workouts, focus, and discipline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <a href={downloadUrl} target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-elevate-orange px-9 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-elevate-orange-light hover:shadow-lg md:px-12 md:py-5 w-full sm:w-auto justify-center">
              Download APK
              <span className="inline-block transition-transform group-hover:translate-y-1">↓</span>
            </a>
            
            <button disabled className="group inline-flex items-center gap-3 rounded-full border border-elevate-paper/10 bg-transparent px-9 py-4 text-sm font-bold uppercase tracking-wider text-elevate-paper/30 cursor-not-allowed md:px-12 md:py-5 w-full sm:w-auto justify-center">
              iOS (Coming Soon)
            </button>
          </div>
          
          <div className="mt-16 text-xs font-semibold tracking-[0.2em] text-elevate-paper/20 uppercase">
            Build 04042026 Alpha · Size: ~35MB
          </div>
        </div>
      </main>

    </div>
  );
}
