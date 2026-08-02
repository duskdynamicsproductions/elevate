import { useEffect, useState } from 'react';

const slides = [
  {
    src: '/discipline-slides/strength-deadlift.png',
    eyebrow: '01 / Strength',
    title: 'Earn the weight.',
    detail: 'Progress starts when the work gets honest.',
  },
  {
    src: '/discipline-slides/recovery-focus.png',
    eyebrow: '02 / Recovery',
    title: 'Stay in the work.',
    detail: 'Discipline is also knowing when to reset.',
  },
  {
    src: '/discipline-slides/morning-sprint.png',
    eyebrow: '03 / Consistency',
    title: 'Start before excuses.',
    detail: 'The momentum belongs to the person who shows up.',
  },
];

export function DisciplineSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-elevate-black text-elevate-paper md:min-h-screen">
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-[opacity,transform] duration-[1500ms] ease-[cubic-bezier(.22,1,.36,1)] ${
              isActive ? 'scale-100 opacity-100 z-0' : 'scale-110 opacity-0 -z-10'
            }`}
            aria-hidden={!isActive}
          >
            <img 
              src={slide.src} 
              alt={slide.title}
              className="h-full w-full object-cover" 
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,11,.94)_0%,rgba(12,11,11,.63)_38%,rgba(12,11,11,.1)_72%,rgba(12,11,11,.48)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,11,11,.8)_0%,transparent_42%)]" />
          </div>
        );
      })}

      <div className="relative z-10 flex min-h-[620px] flex-col justify-end px-6 py-12 md:min-h-screen md:px-12 md:py-20 lg:px-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-bold tracking-[0.28em] text-elevate-orange uppercase">{slides[active].eyebrow}</p>
          <h2 className="max-w-2xl text-5xl font-black leading-[.9] tracking-[-.04em] text-elevate-paper md:text-7xl lg:text-8xl">
            {slides[active].title}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-elevate-paper/65 md:text-base">{slides[active].detail}</p>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 md:mt-16">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                onClick={() => setActive(index)}
                aria-label={`Show ${slide.eyebrow} slide`}
                className={`h-1 rounded-full transition-all duration-500 ${index === active ? 'w-16 bg-elevate-orange' : 'w-7 bg-elevate-paper/35 hover:bg-elevate-paper/70'}`}
              />
            ))}
          </div>
          <span className="font-mono text-xs tracking-[.2em] text-elevate-paper/50">0{active + 1} / 0{slides.length}</span>
        </div>
      </div>
    </section>
  );
}
