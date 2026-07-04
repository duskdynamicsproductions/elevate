import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  subtitle: string;
  updated: string;
  sections: SectionItem[];
  contactExtra?: string;
}) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-elevate-black font-display text-elevate-paper">

      {/* ── Nav ── */}
      <header className="flex w-full items-center justify-between px-6 py-6 md:px-12 lg:px-20">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-50">
          <SpinningStar className="size-4 text-elevate-orange" />
          <span className="text-sm font-bold tracking-widest uppercase">Elevate</span>
        </Link>
        <Link
          to="/"
          className="rounded-full border border-elevate-paper/20 px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all hover:bg-elevate-paper hover:text-elevate-black"
        >
          ← Back
        </Link>
      </header>

      {/* ── Hero ── */}
      <section className="border-b border-elevate-paper/[0.06] px-6 py-20 md:px-12 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-elevate-orange uppercase">{badge}</p>
          <h1 className="mb-6 text-5xl font-black leading-[0.92] tracking-tight md:text-7xl lg:text-[100px]">
            {title}
          </h1>
          <p className="mb-6 max-w-2xl text-base leading-relaxed text-elevate-paper/40 md:text-lg">{subtitle}</p>
          <p className="text-xs font-semibold tracking-widest text-elevate-paper/20 uppercase">Last updated: {updated}</p>
        </div>
      </section>

      {/* ── Sections ── */}
      <main className="px-6 py-16 md:px-12 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {sections.map((s, i) => (
            <div
              key={i}
              className={s.highlight
                ? 'mb-8 rounded-2xl border border-elevate-paper/10 bg-elevate-paper/[0.03] p-8 md:p-10'
                : 'border-t border-elevate-paper/[0.06] py-10'}
            >
              {/* Section label */}
              <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-elevate-orange uppercase">
                {String(i + 1).padStart(2, '0')} — {s.title}
              </p>

              {/* Body text */}
              {s.body && (
                <p className="text-sm leading-relaxed text-elevate-paper/50 md:text-base">{s.body}</p>
              )}

              {/* List */}
              {s.list && (
                <ul className="mt-3 space-y-3">
                  {s.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-elevate-paper/50 md:text-base">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-elevate-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* ── Contact card ── */}
          <div className="mt-6 rounded-2xl bg-elevate-orange px-8 py-10 md:px-10 md:py-12">
            <p className="mb-1 text-xs font-semibold tracking-[0.2em] uppercase text-white/60">Get in touch</p>
            <h3 className="mb-6 text-2xl font-black text-white md:text-3xl">Questions? Reach out directly.</h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>Developer / Controller: <span className="font-bold text-white">Brihit Nath</span></p>
              <p>
                Privacy & Support:&nbsp;
                <a href="mailto:theduskdynamicsproductions@gmail.com" className="font-bold text-white underline underline-offset-2">
                  theduskdynamicsproductions@gmail.com
                </a>
              </p>
              <p>
                Grievance contact:&nbsp;
                <a href="mailto:brihitnath@gmail.com" className="font-bold text-white underline underline-offset-2">
                  brihitnath@gmail.com
                </a>
              </p>
              {contactExtra && <p className="mt-3 text-white/50">{contactExtra}</p>}
            </div>
          </div>

          {/* ── Cross-links ── */}
          <div className="mt-8 flex gap-4">
            <Link
              to="/privacy_policy"
              className="rounded-full border border-elevate-paper/15 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-elevate-paper/40 transition-all hover:border-elevate-paper/40 hover:text-elevate-paper"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="rounded-full border border-elevate-paper/15 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-elevate-paper/40 transition-all hover:border-elevate-paper/40 hover:text-elevate-paper"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-elevate-paper/10 px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <SpinningStar className="size-3.5 text-elevate-orange" />
            <span className="text-sm font-black tracking-tight">Elevate</span>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy_policy" className="text-xs font-semibold tracking-wider uppercase text-elevate-paper/30 hover:text-elevate-paper transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs font-semibold tracking-wider uppercase text-elevate-paper/30 hover:text-elevate-paper transition-colors">Terms</Link>
          </div>
          <p className="text-xs text-elevate-paper/20">© 2026 Elevate. All rights reserved.</p>
        </div>
      </footer>
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
        'Account details — email address, sign-in provider, account status, and Firebase user ID.',
        'Profile details — name, age, height, weight, goal bodyweight, preferences, and settings.',
        'Workout and fitness data — sessions, exercises, sets, reps, weights, timers, templates, workout history, goals, and progress analytics.',
        'Focus and wellness data — focus sessions, app-limit history, selected blocked apps, selected monitored apps, discipline score, and related activity.',
        'Backup settings — automatic backup status, scheduled backup time, time zone, last backup day, and backup source.',
      ],
    },
    {
      title: 'Data from optional permissions',
      body: 'Elevate uses sensitive Android permissions only after you enable the related feature.',
      list: [
        'Usage Access — used for app-limit, focus, and discipline features.',
        'Accessibility — used to redirect you away from apps you selected to block during focus or app-limit flows.',
        'Installed app information — used to show apps you can choose to block or monitor.',
        'Google Drive access — used to create or restore your backup file after you approve Drive access.',
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
      body: 'Elevate keeps data while it is needed to provide the app, maintain your account, support backup/restore, protect the service, or meet legal obligations. You can request deletion in the app from Privacy & Terms → Delete Account & Data. Google Drive backup files may need to be deleted separately from your Google Drive.',
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
      subtitle="We believe transparency builds trust. Here is exactly what Elevate collects, why we collect it, and how you stay in control."
      updated="June 1, 2026"
      sections={sections}
      contactExtra="Public policy URL: duskdynamicsproductions.github.io/Elevate/privacy_policy.html"
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
      body: 'You can request deletion in the app from Privacy & Terms → Delete Account & Data. You can also contact theduskdynamicsproductions@gmail.com for deletion, privacy, or grievance requests. Google Drive backup files may need separate deletion from your Google Drive.',
    },
    {
      title: 'Availability & limits',
      body: 'Elevate is provided as available. Features may change, fail, or be unavailable because of device settings, permissions, network issues, Google/Firebase availability, Google Drive availability, or app updates.',
    },
    {
      title: 'No guaranteed outcomes',
      body: 'Elevate can help you track effort, consistency, workouts, focus, and wellness habits — but it does not guarantee fat loss, muscle gain, recovery, pain relief, productivity, mental-health outcomes, backup success, or discipline outcomes.',
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
      subtitle="Plain-language terms for using Elevate. No legalese — just what you need to know to use the app responsibly."
      updated="June 1, 2026"
      sections={sections}
    />
  );
}
