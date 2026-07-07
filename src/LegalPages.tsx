import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SpinningStar({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 119" fill="none" className={`animate-spin-slow ${className}`}>
      <path d="M0 70.2418H33.8241L9.90981 94.164L24.5755 108.842L48.4969 84.9194V118.755H69.2407V84.9194L93.155 108.842L107.828 94.164L83.9134 70.2418H117.73V49.4913H83.9134L107.828 25.5691L93.155 10.8915L69.2407 34.8137V0.978394H48.4969V34.8137L24.5755 10.8915L9.90981 25.5691L33.8241 49.4913H0V70.2418Z" fill="currentColor" />
    </svg>
  );
}

type SectionItem = {
  title: string;
  body?: string;
  list?: string[];
  highlight?: boolean;
};

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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Only apply horizontal scroll on md+ screens
    if (window.innerWidth < 768) return;

    const totalWidth = track.scrollWidth - window.innerWidth;
    if (totalWidth <= 0) return;

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
          snap: {
            snapTo: 1 / sections.length,
            duration: { min: 0.2, max: 0.5 },
            ease: 'power2.inOut'
          },
        },
      });
    });

    return () => ctx.revert();
  }, [sections.length]);

  return (
    <div className="bg-elevate-black font-display text-elevate-paper selection:bg-elevate-orange selection:text-white h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory md:h-auto md:overflow-y-visible md:snap-none">
      
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

      {/* ── Full Screen Hero ── */}
      <section className="snap-start relative flex h-svh min-h-[700px] w-full flex-col justify-center px-6 md:px-12 lg:px-20 bg-elevate-black border-b border-elevate-paper/[0.06]">
        <div className="max-w-4xl pt-24 md:pt-0">
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-elevate-orange uppercase">{badge}</p>
          <h1 className="mb-6 text-5xl font-black leading-[0.92] tracking-tight md:text-7xl lg:text-[100px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-elevate-paper/40 md:text-lg">{subtitle}</p>
          )}
          <p className="text-xs font-semibold tracking-widest text-elevate-paper/20 uppercase">Last updated: {updated}</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-20 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-elevate-paper/30 uppercase">
          <span>Scroll</span>
          <span className="animate-bounce text-elevate-orange">↓</span>
        </div>
      </section>

      {/* ── Horizontal Scroll Section ── */}
      <div ref={containerRef} className="relative w-full overflow-hidden bg-elevate-black">
        <main ref={trackRef} className="flex flex-col md:flex-row md:w-max">
          
          {/* Sections */}
          {sections.map((s, i) => (
            <div
              key={i}
              className="snap-start relative flex min-h-[90dvh] flex-col justify-center border-b border-elevate-paper/[0.06] px-6 py-16 md:min-h-0 md:h-screen md:w-screen md:border-b-0 md:border-r md:border-elevate-paper/10 md:px-12 lg:px-20 overflow-hidden group"
            >
              <div className="z-10 max-w-3xl flex flex-col items-start">
                {/* Ghost number now above the title */}
                <span className="pointer-events-none select-none text-6xl md:text-[8vw] font-black leading-none text-elevate-paper/[0.08] transition-colors group-hover:text-elevate-paper/[0.12] mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                
                <h2 className="mb-8 text-3xl font-black leading-[0.9] tracking-tight text-elevate-orange uppercase md:text-5xl lg:text-[4vw]">
                  {s.title}
                </h2>
                {s.body && (
                  <p className="mb-6 text-sm leading-relaxed text-elevate-paper/50 md:text-xl lg:text-2xl">{s.body}</p>
                )}
                {s.list && (
                  <ul className="mt-6 space-y-4 md:space-y-6">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-4 text-sm leading-relaxed text-elevate-paper/50 md:text-lg lg:text-xl">
                        <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-elevate-orange" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}

          {/* Contact Card & Footer Slide */}
          <div className="snap-start relative flex min-h-[100dvh] flex-col justify-center px-6 py-8 md:min-h-0 md:h-screen md:w-screen md:px-12 lg:px-20">
            
            <div className="max-w-3xl rounded-2xl bg-elevate-orange px-8 py-10 md:px-12 md:py-16">
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-white/60">Get in touch</p>
              <h3 className="mb-8 text-3xl font-black text-white md:text-5xl lg:text-6xl">Questions? Reach out directly.</h3>
              <div className="space-y-3 text-sm md:text-base text-white/80">
                <p>Developer / Controller: <span className="font-bold text-white">Brihit Nath</span></p>
                <p className="break-words">
                  Privacy & Support:&nbsp;
                  <a href="mailto:theduskdynamicsproductions@gmail.com" className="font-bold text-white underline underline-offset-2 hover:text-elevate-black transition-colors break-all">
                    theduskdynamicsproductions@gmail.com
                  </a>
                </p>
                <p>
                  Grievance contact:&nbsp;
                  <a href="mailto:brihitnath@gmail.com" className="font-bold text-white underline underline-offset-2 hover:text-elevate-black transition-colors">
                    brihitnath@gmail.com
                  </a>
                </p>
                {contactExtra && <p className="mt-4 text-white/50">{contactExtra}</p>}
              </div>
            </div>

            {/* Cross-links */}
            <div className="mt-12 mb-16 flex gap-4">
              <Link to="/privacy_policy" className="rounded-full border border-elevate-paper/15 px-6 py-3 text-xs font-bold tracking-wider uppercase text-elevate-paper/40 transition-all hover:border-elevate-paper hover:text-elevate-paper">
                Privacy Policy
              </Link>
              <Link to="/terms" className="rounded-full border border-elevate-paper/15 px-6 py-3 text-xs font-bold tracking-wider uppercase text-elevate-paper/40 transition-all hover:border-elevate-paper hover:text-elevate-paper">
                Terms of Use
              </Link>
            </div>

            <footer className="mt-auto flex w-full flex-col items-start justify-between gap-10 border-t border-elevate-paper/10 pt-8 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <SpinningStar className="size-6 text-elevate-orange" />
                <span className="text-3xl font-black tracking-tight">Elevate</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                <Link to="/privacy_policy" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Privacy</Link>
                <Link to="/terms" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Terms</Link>
                <Link to="/joinourjourney" className="text-xs font-semibold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Join Us</Link>
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

        </main>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PRIVACY POLICY — sourced from
   MessyElevate/app/src/main/assets/legal/privacy_policy.md
══════════════════════════════════════════════════════════ */
export function PrivacyPage() {
  const sections: SectionItem[] = [
    {
      title: 'About this policy',
      highlight: true,
      body: 'Elevate is operated by Brihit Nath. This policy explains how Elevate uses your data to provide account, workout, focus, wellness, analytics, sync, and backup features. Elevate does not sell your personal data.',
    },
    {
      title: 'Data you provide or create',
      list: [
        'Account details: email address, sign-in provider, account status, and Firebase user ID.',
        'Profile details: name, age, height, weight, goal bodyweight, preferences, and settings.',
        'Workout and fitness data: sessions, exercises, sets, reps, weights, timers, templates, workout history, goals, and progress analytics.',
        'Focus and wellness data: focus sessions, app-limit history, selected blocked apps, selected monitored apps, discipline score, and related activity.',
        'Backup settings: automatic backup status, scheduled backup time, time zone, last backup day, and backup source.',
      ],
    },
    {
      title: 'Data from optional permissions',
      body: 'Elevate uses sensitive Android permissions only after you enable the related feature.',
      list: [
        'Usage Access: used for app-limit, focus, and discipline features.',
        'Accessibility: used to redirect you away from apps you selected to block during focus or app-limit flows.',
        'Installed app information: used to show apps you can choose to block or monitor.',
        'Google Drive access: used to create or restore your backup file after you approve Drive access.',
      ],
    },
    {
      title: 'Data Elevate does NOT collect',
      list: [
        'No sale of personal data.',
        'No camera, microphone, contacts, SMS, call log, precise location, payment-card, or password collection.',
        'No reading of private messages, passwords, forms, financial content, or content inside other apps through Accessibility.',
        'No ads or advertising tracking in the current app.',
      ],
    },
    {
      title: 'How data is used',
      body: 'Elevate uses data to provide sign-in, profile settings, workout tracking, personal analytics, focus sessions, app-limit features, app blocking, notifications, sync, Google Drive backup/restore, safety controls, and support.',
    },
    {
      title: 'Where data is stored',
      list: [
        'On your device in local app storage and local databases.',
        'In Firebase Authentication and Firebase Realtime Database for account, sync, and backup-status features.',
        'In your Google Drive only if you enable Drive backup or restore.',
        'Google and Firebase may process data on infrastructure outside India, subject to their controls and applicable law.',
      ],
    },
    {
      title: 'Sharing',
      body: 'Elevate shares data only when needed to provide app features, when you choose a connected feature, or when required by law. Service providers may include Google Firebase, Google Play services, Google Drive APIs, and Android platform services.',
    },
    {
      title: 'Retention & deletion',
      body: 'Elevate keeps data while it is needed to provide the app, maintain your account, support backup/restore, protect the service, or meet legal obligations. You can request deletion in the app from Privacy & Terms → Delete Account & Data.',
    },
    {
      title: 'Account & data deletion - what gets deleted',
      list: [
        'Firebase Auth account record, where deletion can be verified.',
        'Account-linked Firebase Realtime Database data.',
        'Support records that are not required for security, abuse prevention, legal compliance, or request handling.',
        'Local app data on the device after the in-app deletion flow succeeds.',
      ],
    },
    {
      title: 'Account & data deletion - what may need separate action',
      list: [
        'Google Drive backup files created by Elevate may need to be deleted from your Google Drive.',
        'Limited records may be retained only where required for security, abuse prevention, legal compliance, or request handling.',
      ],
    },
    {
      title: 'Deletion request without the app',
      body: 'If you no longer have the app installed, send a request from the email address linked to your Elevate account to theduskdynamicsproductions@gmail.com with subject: Elevate account deletion request. Include your account email and what action you need (deletion, correction, consent withdrawal, or grievance). Elevate will respond within a reasonable period not exceeding 90 days.',
    },
    {
      title: 'Your rights',
      body: 'You can request access, correction, completion, update, deletion, consent withdrawal, or grievance review by contacting theduskdynamicsproductions@gmail.com. Elevate may need enough information to verify and process your request.',
    },
    {
      title: 'Health & fitness safety',
      highlight: true,
      body: 'Elevate is for personal fitness, workout logging, focus, and wellness tracking. It is not medical advice, diagnosis, treatment, physical therapy, professional coaching, or a medical device. Stop exercising if something feels unsafe and speak with a qualified professional when needed.',
    },
    {
      title: 'Children',
      body: 'Elevate is not intended for users under 18. Do not use the app if you are under 18.',
    },
    {
      title: 'Policy changes',
      body: 'Elevate may update this policy as the app changes. The current public policy is always available at: https://duskdynamicsproductions.github.io/Elevate/privacy_policy.html',
    },
  ];

  return (
    <LegalLayout
      badge="Legal · Privacy"
      title="Privacy Policy."
      updated="July 5, 2026"
      sections={sections}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   TERMS OF USE — sourced from
   MessyElevate/app/src/main/assets/legal/terms_of_use.md
══════════════════════════════════════════════════════════ */
export function TermsPage() {
  const sections: SectionItem[] = [
    {
      title: 'Agreement',
      highlight: true,
      body: 'By using Elevate, you agree to use the app responsibly for personal productivity, focus, wellness, and fitness tracking. Use Elevate only for lawful personal purposes. Do not use the app to monitor or control another person\'s device without a lawful basis and clear consent.',
    },
    {
      title: 'Your account & data',
      body: 'You are responsible for keeping your Google account, device, and app data accurate and secure.',
      list: [
        'Enter accurate profile, workout, and wellness information.',
        'Keep your Google account secure if you use Google Drive backup.',
        'Do not misuse Usage Access, Accessibility, app blocking, sync, or backup features.',
        'If you delete your account, Google Drive backup files may still need to be removed from Google Drive separately.',
      ],
    },
    {
      title: 'Backups',
      body: 'Google Drive backup is optional. Automatic backup starts only after you complete the Drive permission and first backup flow. Backups can help restore app data, but no backup system is guaranteed to be perfect.',
    },
    {
      title: 'Fitness & wellness',
      highlight: true,
      body: 'Elevate is not medical advice, diagnosis, treatment, physical therapy advice, nutrition advice, professional coaching, or a medical device. You are responsible for choosing safe workouts and stopping if something feels unsafe. Speak with a qualified professional before starting or changing workouts if you have injuries, pregnancy, disability, chronic illness, heart symptoms, breathing symptoms, eating-disorder history, or any medical concern.',
    },
    {
      title: 'Account deletion & data requests',
      body: 'You can request deletion in the app from Privacy & Terms → Delete Account & Data. You can also contact theduskdynamicsproductions@gmail.com for deletion, privacy, or grievance requests.',
    },
    {
      title: 'What gets deleted',
      list: [
        'Firebase Auth account record, where deletion can be verified.',
        'Account-linked Firebase Realtime Database data.',
        'Support records not required for security, abuse prevention, legal compliance, or request handling.',
        'Local app data on the device after the in-app deletion flow succeeds.',
      ],
    },
    {
      title: 'What may need separate action',
      list: [
        'Google Drive backup files created by Elevate may need to be deleted from your Google Drive.',
        'Limited records may be retained only where required for security, abuse prevention, legal compliance, or request handling.',
      ],
    },
    {
      title: 'Response timeline',
      body: 'Elevate will respond within a reasonable period not exceeding 90 days unless a shorter legal deadline applies. You may be asked to verify account ownership before deletion.',
    },
    {
      title: 'Availability & limits',
      body: 'Elevate is provided as available. Features may change, fail, or be unavailable because of device settings, permissions, network issues, Google/Firebase availability, Google Drive availability, or app updates.',
    },
    {
      title: 'No guaranteed outcomes',
      body: 'Elevate can help you track effort, consistency, workouts, focus, and wellness habits - but it does not guarantee fat loss, muscle gain, recovery, pain relief, productivity, mental-health outcomes, backup success, or discipline outcomes.',
    },
    {
      title: 'Commercial features',
      body: 'The current app does not use paid subscriptions, paid coaching, supplement sales, equipment sales, affiliate links, or ads. If a paid or advertising-supported feature is added, Elevate will update the relevant app disclosures before offering that feature.',
    },
    {
      title: 'Governing law & disputes',
      body: 'These terms are intended to be governed by the laws of India, subject to any mandatory consumer-protection rights that apply to you. Grievance contact: Brihit Nath at brihitnath@gmail.com.',
    },
    {
      title: 'Changes to terms',
      body: 'These terms may be updated as the app changes. The latest version shown in the app applies when you continue using Elevate.',
    },
  ];

  return (
    <LegalLayout
      badge="Legal · Terms"
      title="Terms of Use."
      updated="July 5, 2026"
      sections={sections}
    />
  );
}
