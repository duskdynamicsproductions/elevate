import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const roles = [
  {
    category: "1. Product & Project Management",
    title: "Product Manager (PM) / Product Owner",
    subtitle: "The Visionary & Prioritizer",
    mission: "Ensure the team is building the right features that users actually want and that align with business goals.",
    specific: "Deciding whether the team should build a new \"Workout Template\" feature next, or focus on improving the \"Focus Timer\" analytics.",
    responsibilities: [
      "Conducting user research and analyzing user feedback.",
      "Maintaining and prioritizing the Product Backlog.",
      "Writing detailed User Stories (e.g., \"As a user, I want to see my current streak medal on the dashboard so I stay motivated\").",
      "Defining acceptance criteria for new features."
    ],
    deliverables: "Product Roadmap, PRDs (Product Requirement Documents), User Stories.",
    tools: "Jira, Linear, Notion, Amplitude (for analytics)."
  },
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
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none mix-blend-difference">
        <Link to="/" className="text-2xl font-black tracking-tighter uppercase pointer-events-auto">
          Elevate
        </Link>
      </nav>

      {/* Header */}
      <header className="px-6 pt-32 pb-16 md:px-12 lg:px-24 md:pt-48 md:pb-24">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-8">
            Elevate Team<br />
            <span className="text-elevate-orange">Roles & Responsibilities</span>
          </h1>

        </div>
      </header>

      {/* Roles List */}
      <main className="px-6 pb-32 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="space-y-16 md:space-y-24">
          {roles.map((role, index) => (
            <div key={index} className="group relative bg-[#0a0a0c] p-8 md:p-12 rounded-3xl border border-elevate-paper/10 hover:border-elevate-orange/50 transition-colors duration-500">
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">{role.title}</h2>
                  <h3 className="text-lg md:text-xl font-medium text-elevate-paper/60">{role.subtitle}</h3>
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
      <footer className="px-6 py-12 border-t border-elevate-paper/10 text-center">
        <p className="text-sm text-elevate-paper/40 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} Dusk Dynamics Productions
        </p>
      </footer>
    </div>
  );
}
