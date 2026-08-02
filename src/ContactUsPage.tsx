import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLogo } from './AnimatedLogo';
import { MagneticWrapper } from './MagneticWrapper';

export function ContactUsPage() {
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

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-2xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">Get in <span className="text-elevate-orange">Touch</span></h1>
          <p className="text-lg text-elevate-paper/80">Have questions, feedback, or want to partner with us? Drop us a message.</p>
        </div>

        <form className="w-full flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.1em] text-elevate-paper/60">Name</label>
            <input type="text" id="name" className="bg-transparent border border-elevate-paper/20 rounded-none px-4 py-3 text-elevate-paper focus:outline-none focus:border-elevate-orange transition-colors" placeholder="Your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.1em] text-elevate-paper/60">Email</label>
            <input type="email" id="email" className="bg-transparent border border-elevate-paper/20 rounded-none px-4 py-3 text-elevate-paper focus:outline-none focus:border-elevate-orange transition-colors" placeholder="hello@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-[0.1em] text-elevate-paper/60">Message</label>
            <textarea id="message" rows={5} className="bg-transparent border border-elevate-paper/20 rounded-none px-4 py-3 text-elevate-paper focus:outline-none focus:border-elevate-orange transition-colors resize-none" placeholder="How can we help?"></textarea>
          </div>
          <button type="submit" className="mt-4 bg-elevate-orange text-elevate-black font-bold uppercase tracking-[0.15em] py-4 transition-transform hover:-translate-y-1">
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
}
