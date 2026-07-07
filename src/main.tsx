import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import { GlobalLoader } from './GlobalLoader';
import './index.css';

// Lazy loaded routes
const App = React.lazy(() => import('./App'));
const PrivacyPage = React.lazy(() => import('./LegalPages').then(m => ({ default: m.PrivacyPage })));
const TermsPage = React.lazy(() => import('./LegalPages').then(m => ({ default: m.TermsPage })));
const DownloadPage = React.lazy(() => import('./DownloadPage').then(m => ({ default: m.DownloadPage })));
const JoinOurJourneyPage = React.lazy(() => import('./JoinOurJourneyPage').then(m => ({ default: m.JoinOurJourneyPage })));

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// A simple wireframe skeleton for full page loads
function FullPageSkeleton() {
  return (
    <div className="w-full min-h-screen bg-elevate-black p-6 md:p-12 flex flex-col gap-10">
      <div className="w-full flex justify-between items-center opacity-20 animate-pulse">
        <div className="h-6 w-32 bg-elevate-paper/20 rounded-md"></div>
        <div className="hidden md:flex gap-6">
          <div className="h-4 w-24 bg-elevate-paper/20 rounded-md"></div>
          <div className="h-4 w-24 bg-elevate-paper/20 rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-elevate-paper/20 rounded-full"></div>
      </div>
      <div className="max-w-4xl opacity-20 animate-pulse flex flex-col gap-6 mt-10 md:mt-20">
        <div className="h-20 md:h-32 w-full bg-elevate-paper/20 rounded-lg"></div>
        <div className="h-20 md:h-32 w-[80%] bg-elevate-paper/20 rounded-lg"></div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/elevate">
      <GlobalLoader />
      {!isTouchDevice && <CustomCursor />}
      <Suspense fallback={<FullPageSkeleton />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/joinourjourney" element={<JoinOurJourneyPage />} />
          <Route path="/privacy_policy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
