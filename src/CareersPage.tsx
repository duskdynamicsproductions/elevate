import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function SpinningStar({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 119" fill="none" className={`animate-spin-slow ${className}`}>
      <path d="M0 70.2418H33.8241L9.90981 94.164L24.5755 108.842L48.4969 84.9194V118.755H69.2407V84.9194L93.155 108.842L107.828 94.164L83.9134 70.2418H117.73V49.4913H83.9134L107.828 25.5691L93.155 10.8915L69.2407 34.8137V0.978394H48.4969V34.8137L24.5755 10.8915L9.90981 25.5691L33.8241 49.4913H0V70.2418Z" fill="currentColor" />
    </svg>
  );
}

const roles = [
  {
    category: "1. Product & Project Management",
    title: "Scrum Master / Agile Project Manager",
    subtitle: "The Process Facilitator",
    mission: "Ensure the engineering and design teams are working efficiently without blockers.",
    specific: "",
    responsibilities: [
      "Running daily stand-up meetings (syncs).",
      "Managing two-week \"Sprints\" to ensure code is delivered on time.",
      "Protecting developers from outside distractions."
    ],
    deliverables: "Sprint reports, velocity tracking, meeting facilitation.",
    tools: "Jira, Trello, Slack/Discord."
  },
  {
    category: "2. Design & User Experience (UX)",
    title: "UI/UX Designer",
    subtitle: "The Architect of the User Journey",
    mission: "Make the app visually stunning, intuitive to use, and frictionless.",
    specific: "Designing the layout of the Streak Medals, creating the dark-mode color palette, and ensuring the \"Focus Mode\" app-blocking screen is easy to understand.",
    responsibilities: [
      "UX (User Experience): Wireframing user flows (e.g., the flow of creating a new workout routine).",
      "UI (User Interface): Creating high-fidelity, pixel-perfect screens for developers to build.",
      "Prototyping features before code is written to test with real users.",
      "Creating visual assets (icons, medal graphics, animations)."
    ],
    deliverables: "Figma files, Design Systems, clickable prototypes, exported SVG/PNG assets.",
    tools: "Figma, Adobe Illustrator, Lottie (for animations)."
  },
  {
    category: "3. Engineering (The Builders)",
    title: "Android Native Engineer",
    subtitle: "The Client-Side Builder",
    mission: "Translate the UI/UX designs into high-performing, crash-free Android code.",
    specific: "Writing Jetpack Compose code for the UI, interacting with Android's UsageStatsManager for app blocking, and implementing local databases (Room) for offline workout tracking.",
    responsibilities: [
      "Writing and maintaining Kotlin and Jetpack Compose code.",
      "Managing local state and app architecture (MVVM, Clean Architecture).",
      "Integrating third-party SDKs and Firebase client libraries.",
      "Ensuring the app works flawlessly on different screen sizes (phones, tablets)."
    ],
    deliverables: "Compiled .apk / .aab files, pull requests, unit tests.",
    tools: "Android Studio, Git/GitHub, Kotlin, Gradle."
  },
  {
    category: "3. Engineering (The Builders)",
    title: "Backend / Cloud Engineer (BaaS)",
    subtitle: "The Data & Security Architect",
    mission: "Manage the infrastructure that lives outside the user's phone, ensuring data syncs quickly and securely.",
    specific: "Managing Firebase Realtime Database rules, setting up Firebase Authentication, and ensuring Google Drive backups trigger correctly.",
    responsibilities: [
      "Writing serverless logic (Firebase Cloud Functions).",
      "Structuring NoSQL database trees for fast querying.",
      "Writing security rules to prevent unauthorized data access.",
      "Monitoring server costs and scaling limits."
    ],
    deliverables: "Deployed Cloud Functions, Security Rules (firebase.json), API documentation.",
    tools: "Firebase Console, Node.js/TypeScript (for functions), Google Cloud Platform (GCP)."
  },
  {
    category: "4. Quality & Reliability",
    title: "Quality Assurance (QA) Engineer",
    subtitle: "The Bug Hunter",
    mission: "Ensure the app never crashes in production and works exactly as designed.",
    specific: "Testing if the app correctly blocks TikTok when Focus Mode is engaged on Android 13 vs Android 14. Testing the account deletion flow to ensure Firebase data is actually wiped.",
    responsibilities: [
      "Manual Testing: Clicking through the app on physical Android devices of varying brands (Samsung, Pixel, Xiaomi).",
      "Automated Testing: Writing scripts that automatically test the app every time an engineer pushes code.",
      "Writing bug reports with clear reproduction steps and logcats."
    ],
    deliverables: "Test Plans, Bug Tickets (in Jira), Automated Test Scripts (Appium/Espresso).",
    tools: "Firebase Test Lab, Appium, BrowserStack, Android ADB."
  },
  {
    category: "5. Compliance & Operations",
    title: "Data Privacy Officer (DPO) / Legal Counsel",
    subtitle: "The Protector",
    mission: "Keep the company out of legal trouble and protect user privacy.",
    specific: "Ensuring compliance with India's DPDP Act 2023, managing the theduskdynamicsproductions@gmail.com grievance inbox, and verifying Google Play Data Safety forms.",
    responsibilities: [
      "Drafting and updating the Privacy Policy and Terms of Use.",
      "Auditing the app's use of sensitive permissions (Accessibility, Usage Access).",
      "Handling official user requests for data deletion or data export."
    ],
    deliverables: "Legal documentation, Compliance Audits, Data Mapping documents.",
    tools: ""
  },
  {
    category: "6. Growth & Market",
    title: "Growth Marketer / ASO Specialist",
    subtitle: "The User Acquisition Expert",
    mission: "Get the app onto as many phones as possible at the lowest cost.",
    specific: "Ranking the app #1 for search terms like \"Android focus timer\" or \"minimalist workout tracker\" on the Play Store.",
    responsibilities: [
      "ASO (App Store Optimization): A/B testing Play Store screenshots, icons, and descriptions.",
      "Managing paid ad campaigns (Google Ads, Meta Ads).",
      "Partnering with fitness and productivity influencers."
    ],
    deliverables: "Marketing campaigns, ASO keyword reports, ROI (Return on Investment) analysis.",
    tools: "Google Play Console (Store Presence), Appsflyer/Adjust, AppTweak/SensorTower."
  },
  {
    category: "6. Growth & Market",
    title: "Customer Success & Support",
    subtitle: "The Voice of the App",
    mission: "Keep existing users happy, resolve their issues, and turn them into advocates.",
    specific: "Helping a user figure out why their Google Drive backup failed, or responding to 1-star reviews on the Play Store.",
    responsibilities: [
      "Responding to support emails and Play Store reviews.",
      "Creating Help Center articles and FAQs.",
      "Categorizing user complaints to hand back to the Product Manager."
    ],
    deliverables: "Support tickets resolved, FAQ documentation, weekly user sentiment reports.",
    tools: "Zendesk, Intercom, Google Play Console (Reviews section)."
  }
];

export function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getGoogleFormLink = (roleTitle: string) => {
    // PREFILL GOOGLE FORM LINK:
    // IMPORTANT: Replace the base URL and entry ID with your actual Google Form details.
    // 1. Get your Google Form pre-filled link.
    // 2. Find the entry IDs for Email, Mobile Number, and Role.
    const baseUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform";
    const roleEntryId = "entry.YOUR_ROLE_ENTRY_ID"; // e.g., entry.123456789
    return `${baseUrl}?usp=pp_url&${roleEntryId}=${encodeURIComponent(roleTitle)}`;
  };

  return (
    <div className="min-h-screen bg-elevate-black text-elevate-paper selection:bg-elevate-orange selection:text-black">
      {/* Navbar */}
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
      <section className="relative flex h-svh min-h-[700px] w-full flex-col justify-center px-6 md:px-12 lg:px-20 bg-elevate-black border-b border-elevate-paper/[0.06]">
        <div className="max-w-4xl pt-24 md:pt-0">
          <h1 className="mb-6 text-5xl font-black leading-[0.92] tracking-tight md:text-7xl lg:text-[100px] uppercase text-elevate-orange">
            Roles &<br/>Responsibilities
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-20 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-elevate-paper/30 uppercase">
          <span>Scroll</span>
          <span className="animate-bounce text-elevate-orange">↓</span>
        </div>
      </section>

      {/* Roles List */}
      <main className="pt-32 px-6 pb-32 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="space-y-16 md:space-y-24">
          {roles.map((role, index) => (
            <div key={index} className="group relative bg-[#0a0a0c] p-8 md:p-12 rounded-3xl border border-transparent hover:border-elevate-orange/50 transition-colors duration-500">
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">{role.title}</h2>
                </div>
                <a
                  href={getGoogleFormLink(role.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center shrink-0 bg-elevate-orange text-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
                >
                  Apply Now
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold tracking-[0.1em] text-white/40 uppercase mb-3 border-b border-white/10 pb-2">Mission</h4>
                    <p className="text-base leading-relaxed">{role.mission}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold tracking-[0.1em] text-white/40 uppercase mb-3 border-b border-white/10 pb-2">Key Responsibilities</h4>
                    <ul className="space-y-3">
                      {role.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-3 text-base leading-relaxed">
                          <span className="text-elevate-orange mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-elevate-orange" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold tracking-[0.1em] text-white/40 uppercase mb-3 border-b border-white/10 pb-2">Deliverables</h4>
                    <p className="text-base leading-relaxed font-['Special_Elite',_monospace] text-elevate-paper/80">{role.deliverables}</p>
                  </div>
                  {role.tools && (
                    <div>
                      <h4 className="text-sm font-bold tracking-[0.1em] text-white/40 uppercase mb-3 border-b border-white/10 pb-2">Standard Tools</h4>
                      <p className="text-base leading-relaxed font-semibold">{role.tools}</p>
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
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
          <p className="text-xs text-elevate-paper/20">© {new Date().getFullYear()} Elevate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/not_brihit/" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Brihit Nath</a>
            <a href="https://www.instagram.com/the.duskdynamics/" target="_blank" rel="noreferrer" className="text-[10px] font-bold tracking-[0.15em] uppercase text-elevate-paper/30 transition-colors hover:text-elevate-paper">Duskdynamics</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
