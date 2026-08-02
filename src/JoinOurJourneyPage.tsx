import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedLogo } from './AnimatedLogo';
import { KineticTextScramble } from './KineticTextScramble';
import { MagneticWrapper } from './MagneticWrapper';
import { SpotlightGrid } from './SpotlightGrid';
import { RoleCard } from './components/RoleCard';
import {
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  Search,
  Target,
  FileCheck,
  X,
  Mail,
  ArrowUpRight,
  Shield,
  Zap,
  Flame,
  Code
} from 'lucide-react';

type RoleItem = {
  category: string;
  title: string;
  availability: string;
  subtitle: string;
  mission: string;
  specific: string;
  responsibilities: string[];
  deliverables: string;
  tools: string;
};

const roles: RoleItem[] = [
  {
    category: "1. Product & Project Management",
    title: "Scrum Master / Agile Project Manager",
    availability: "1/1",
    subtitle: "The Process Facilitator",
    mission: "Ensure the engineering and design teams are working efficiently without blockers.",
    specific: "Managing sprint velocity, organizing daily standups, and protecting core developers from outside scope creep.",
    responsibilities: [
      "Running daily stand-up syncs.",
      "Managing two-week Sprints to ensure features deliver on time.",
      "Protecting developers from outside distractions and scope creep."
    ],
    deliverables: "Sprint reports, velocity tracking, meeting facilitation.",
    tools: "Jira, Trello, Slack/Discord."
  },
  {
    category: "2. Design & User Experience (UX)",
    title: "UI/UX Designer",
    availability: "2/2",
    subtitle: "The Architect of the User Journey",
    mission: "Make the app visually stunning, intuitive to use, and frictionless.",
    specific: "Designing the layout of the Streak Medals, creating the dark-mode color palette, and ensuring the Focus Mode app-blocking screen is easy to understand.",
    responsibilities: [
      "UX (User Experience): Wireframing user flows (e.g., creating a new workout routine).",
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
    availability: "0/1",
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
    availability: "1/1",
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
    tools: "Firebase Console, Node.js/TypeScript, Google Cloud Platform (GCP)."
  },
  {
    category: "4. Quality & Reliability",
    title: "Quality Assurance (QA) Engineer",
    availability: "1/1",
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
    availability: "1/1",
    subtitle: "The Protector",
    mission: "Keep the company out of legal trouble and protect user privacy.",
    specific: "Ensuring compliance with India's DPDP Act 2023, managing the theduskdynamicsproductions@gmail.com grievance inbox, and verifying Google Play Data Safety forms.",
    responsibilities: [
      "Drafting and updating the Privacy Policy and Terms of Use.",
      "Auditing the app's use of sensitive permissions (Accessibility, Usage Access).",
      "Handling official user requests for data deletion or data export."
    ],
    deliverables: "Legal documentation, Compliance Audits, Data Mapping documents.",
    tools: "Legal research tools, Privacy frameworks, Markdown documentation."
  },
  {
    category: "6. Growth & Market",
    title: "Growth Marketer / ASO Specialist",
    availability: "1/1",
    subtitle: "The User Acquisition Expert",
    mission: "Get the app onto as many phones as possible at the lowest cost.",
    specific: "Ranking the app #1 for search terms like \"Android focus timer\" or \"minimalist workout tracker\" on the Play Store.",
    responsibilities: [
      "ASO (App Store Optimization): A/B testing Play Store screenshots, icons, and descriptions.",
      "Managing paid ad campaigns (Google Ads, Meta Ads).",
      "Partnering with fitness and productivity influencers."
    ],
    deliverables: "Marketing campaigns, ASO keyword reports, ROI analysis.",
    tools: "Google Play Console, Appsflyer/Adjust, AppTweak/SensorTower."
  },
  {
    category: "6. Growth & Market",
    title: "Customer Success & Support",
    availability: "0/1",
    subtitle: "The Voice of the App",
    mission: "Keep existing users happy and resolve their issues.",
    specific: "Helping a user figure out why their Google Drive backup failed, or responding to 1-star reviews on the Play Store.",
    responsibilities: [
      "Responding to support emails and Play Store reviews.",
      "Creating Help Center articles and FAQs.",
      "Categorizing user complaints to hand back to the Product Manager."
    ],
    deliverables: "Support tickets resolved, FAQ documentation, weekly user sentiment reports.",
    tools: "Zendesk, Intercom, Google Play Console."
  },
  {
    category: "7. Artificial Intelligence",
    title: "AI Pipeline Engineer",
    availability: "0/1",
    subtitle: "The Intelligence Architect",
    mission: "Design and train new AI models to enhance the Elevate app experience.",
    specific: "Building data pipelines, training machine learning models for personalized user experiences, and integrating AI features into the app.",
    responsibilities: [
      "Designing and implementing scalable AI/ML pipelines.",
      "Training and evaluating machine learning models.",
      "Collaborating with engineering to deploy models to production.",
      "Optimizing model performance and cost."
    ],
    deliverables: "Trained models, inference APIs, data processing scripts, technical documentation.",
    tools: "Python, TensorFlow/PyTorch, AWS/GCP, Docker, Git."
  }
];

export function JoinOurJourneyPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories = useMemo(() => {
    const set = new Set(roles.map((r) => r.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredRoles = useMemo(() => {
    return roles.filter((r) => {
      const matchesCategory = selectedCategory === 'ALL' || r.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.mission.toLowerCase().includes(q) ||
        r.tools.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getGoogleFormLink = (roleTitle: string) => {
    const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLScqxx28fgb_BWTp7JI1jj2l1ENkjteCSt3CyvlMlBeeOTW50Q/viewform";
    const roleEntryId = "entry.1791197897";
    return `${baseUrl}?usp=pp_url&${roleEntryId}=${encodeURIComponent(roleTitle)}`;
  };

  const handleApplyClick = (e: React.MouseEvent, role: RoleItem) => {
    if (role.availability.startsWith("0/")) {
      e.preventDefault();
      triggerToast(`Position "${role.title}" has already been filled.`);
    }
  };

  return (
    <div className="relative min-h-screen bg-elevate-black font-display text-elevate-paper selection:bg-elevate-orange selection:text-white flex flex-col overflow-x-hidden">
      
      {/* ── Interactive Spotlight Background Grid Canvas ── */}
      <SpotlightGrid gridSize={48} spotlightRadius={220} />

      {/* ── Ambient Kinetic Glow Orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
        <div className="animate-float-slow animate-pulse-glow absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-elevate-orange/20 blur-[150px]" />
        <div className="animate-float-slow animate-pulse-glow absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[130px]" style={{ animationDelay: '-7s' }} />
      </div>

      {/* ── Toast Popup ── */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full border border-elevate-orange/40 bg-elevate-dark/95 px-6 py-3 text-xs font-bold tracking-wide text-white shadow-2xl backdrop-blur-xl animate-in fade-in">
          <Sparkles className="size-4 text-elevate-orange" />
          <span>{toastMessage}</span>
        </div>
      )}

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
            <Link
              to="/download"
              className="hidden items-center gap-2 rounded-full border border-elevate-orange/30 bg-elevate-orange/10 px-4 py-1.5 text-xs font-bold tracking-wider text-elevate-orange uppercase transition-all hover:bg-elevate-orange hover:text-white md:flex"
            >
              <Sparkles className="size-3.5" />
              <span>Download Alpha</span>
            </Link>
          </MagneticWrapper>

          <Link
            to="/"
            className="text-xs font-bold tracking-[0.2em] uppercase text-elevate-paper/40 transition-colors hover:text-white"
          >
            HOME
          </Link>
        </div>
      </header>

      {/* ── Main Hero ── */}
      <main className="relative z-10 flex-1 px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-elevate-orange/30 bg-elevate-orange/10 px-4 py-1.5 text-xs font-bold tracking-widest text-elevate-orange uppercase">
            <Users className="size-3.5" />
            <span>CAREERS · JOIN OUR JOURNEY</span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-[0.92] tracking-tight text-white md:text-7xl lg:text-[96px] uppercase">
            <KineticTextScramble text="Build the Future of" />
            <br />
            <span className="text-elevate-orange">
              <KineticTextScramble text="Male Wellness." />
            </span>
          </h1>

          <p className="mb-12 max-w-2xl text-base leading-relaxed text-elevate-paper/60 md:text-xl">
            We are looking for ambitious builders, creators, engineers, and legal minds to join Elevate in optimizing physical fitness and mental focus.
          </p>

          {/* ── Interactive Category Filters & Search ── */}
          <div className="mb-12 flex flex-col gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-center md:justify-between">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <MagneticWrapper key={cat} strength={0.15}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
                      selectedCategory === cat
                        ? 'bg-elevate-orange text-white shadow-lg shadow-elevate-orange/20'
                        : 'border border-white/10 bg-white/[0.03] text-elevate-paper/50 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Roles' : cat.replace(/^\d+\.\s*/, '')}
                  </button>
                </MagneticWrapper>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-elevate-paper/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles or skills (e.g. Figma, Kotlin)..."
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2 pl-10 pr-10 text-xs text-white placeholder-elevate-paper/30 outline-none backdrop-blur-md transition-all focus:border-elevate-orange/60 focus:bg-white/[0.08]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-elevate-paper/40 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* ── Roles Grid ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoles.map((role, idx) => (
  <RoleCard
    key={idx}
    role={role}
    isOpen={!role.availability.startsWith('0/')}
    onSelect={setSelectedRole}
    onApply={handleApplyClick}
  />
            ))}
          </div>

          {/* ── Elevate Team Ethos Grid ── */}
          <div className="mt-24 rounded-3xl border border-white/10 bg-elevate-dark/60 p-8 backdrop-blur-xl md:p-14">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black uppercase text-white md:text-4xl">
                <KineticTextScramble text="Our Engineering & Culture Manifesto" />
              </h2>
              <p className="mt-2 text-xs font-medium tracking-widest text-elevate-paper/40 uppercase">
                What drives the team building Elevate
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <Zap className="mb-4 size-6 text-elevate-orange" />
                <h3 className="mb-2 text-base font-bold text-white">Radical Execution</h3>
                <p className="text-xs leading-relaxed text-elevate-paper/50">
                  We ship production-grade code rapidly. Speed and real user feedback trump overthinking.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <Shield className="mb-4 size-6 text-elevate-orange" />
                <h3 className="mb-2 text-base font-bold text-white">Zero Bureaucracy</h3>
                <p className="text-xs leading-relaxed text-elevate-paper/50">
                  No unnecessary meetings or corporate hierarchy. Every team member owns their features 100%.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <Flame className="mb-4 size-6 text-elevate-orange" />
                <h3 className="mb-2 text-base font-bold text-white">High Standards</h3>
                <p className="text-xs leading-relaxed text-elevate-paper/50">
                  Pixel-perfect UI, sub-second SQLite performance, and unyielding commitment to user privacy.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <Code className="mb-4 size-6 text-elevate-orange" />
                <h3 className="mb-2 text-base font-bold text-white">Modern Tech</h3>
                <p className="text-xs leading-relaxed text-elevate-paper/50">
                  Building with Kotlin, Jetpack Compose, Firebase Cloud Functions, Figma design systems, and Room.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── Role Specs Slide-Over Drawer Modal ── */}
      {selectedRole && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-white/10 bg-elevate-dark p-8 shadow-2xl md:p-12">
            
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/[0.04] p-2 text-elevate-paper/50 transition-colors hover:text-white"
            >
              <X className="size-5" />
            </button>

            <div className="mb-8 border-b border-white/10 pb-6">
              <span className="mb-2 block text-xs font-bold tracking-widest text-elevate-orange uppercase">
                {selectedRole.category}
              </span>
              <h2 className="text-3xl font-black text-white uppercase md:text-4xl">
                <KineticTextScramble text={selectedRole.title} />
              </h2>
              <p className="mt-1 text-sm font-semibold tracking-wider text-elevate-paper/40 uppercase">
                {selectedRole.subtitle}
              </p>
            </div>

            <div className="mb-8 rounded-2xl border border-elevate-orange/30 bg-elevate-orange/10 p-6">
              <h4 className="mb-2 flex items-center gap-2 text-xs font-bold text-elevate-orange uppercase tracking-wider">
                <Target className="size-4" />
                Core Mission
              </h4>
              <p className="text-sm leading-relaxed text-white">
                {selectedRole.mission}
              </p>
            </div>

            {selectedRole.specific && (
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h4 className="mb-2 text-xs font-bold text-elevate-paper/50 uppercase tracking-wider">
                  Elevate Specific Scenario
                </h4>
                <p className="text-xs leading-relaxed text-elevate-paper/70">
                  {selectedRole.specific}
                </p>
              </div>
            )}

            <div className="mb-8">
              <h4 className="mb-4 flex items-center gap-2 text-xs font-bold text-elevate-paper/50 uppercase tracking-wider">
                <FileCheck className="size-4 text-elevate-orange" />
                Key Responsibilities
              </h4>
              <ul className="space-y-3">
                {selectedRole.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs leading-relaxed text-elevate-paper/70">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-elevate-orange" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
              <div>
                <span className="text-[11px] font-bold text-elevate-paper/40 uppercase tracking-wider">Key Deliverables</span>
                <p className="mt-1 text-xs font-bold text-white">{selectedRole.deliverables}</p>
              </div>

              {selectedRole.tools && (
                <div className="border-t border-white/10 pt-3">
                  <span className="text-[11px] font-bold text-elevate-paper/40 uppercase tracking-wider">Tech Stack & Tools</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedRole.tools.split(',').map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-mono font-medium text-elevate-orange"
                      >
                        {tool.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              {!selectedRole.availability.startsWith("0/") ? (
                <MagneticWrapper strength={0.3}>
                  <a
                    href={getGoogleFormLink(selectedRole.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-elevate-orange px-8 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                  >
                    <span>Submit Application Form</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                </MagneticWrapper>
              ) : (
                <span className="text-xs font-bold text-elevate-paper/40 uppercase">
                  This position has been filled.
                </span>
              )}

              <a
                href={`mailto:theduskdynamicsproductions@gmail.com?subject=Application%20for%20${encodeURIComponent(selectedRole.title)}`}
                className="flex items-center gap-2 text-xs font-bold text-elevate-paper/50 hover:text-white"
              >
                <Mail className="size-4" />
                <span>Apply via Email</span>
              </a>
            </div>

          </div>
        </div>
      )}

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
