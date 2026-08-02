import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLogo } from './AnimatedLogo';
import { MagneticWrapper } from './MagneticWrapper';

export function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-elevate-black text-elevate-paper flex flex-col font-display selection:bg-elevate-orange selection:text-elevate-black">
      <header className="flex w-full items-center justify-between px-6 py-5 md:px-12 lg:px-20 border-b border-elevate-paper/[0.07]">
        <AnimatedLogo
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-50"
          starClassName="size-4 text-elevate-orange"
          textClassName="text-sm font-bold tracking-widest text-elevate-paper"
          ariaLabel="Elevate home"
        />
        <MagneticWrapper>
          <Link to="/" className="text-[10px] font-bold tracking-[0.2em] uppercase text-elevate-paper transition-all hover:text-elevate-orange">
            ← Back Home
          </Link>
        </MagneticWrapper>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight uppercase">About <span className="text-elevate-orange">Us</span></h1>
        <p className="text-lg md:text-xl text-elevate-paper/80 mb-6 leading-relaxed">
          We are builders, athletes, and data nerds. Coffee lovers, fitness obsessed. Elevate was born out of a desire to create a digital sanctuary where focus, discipline, and performance intersect.
        </p>
        <p className="text-lg md:text-xl text-elevate-paper/80 leading-relaxed">
          Our mission is to help you confront the numbers that don't lie, build an unstoppable mindset, and train smarter. No excuses. All in or not at all.
        </p>
      </main>
    </div>
  );
}
