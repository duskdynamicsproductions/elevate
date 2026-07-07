import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { PrivacyPage, TermsPage } from './LegalPages';
import { DownloadPage } from './DownloadPage';
import { JoinOurJourneyPage } from './JoinOurJourneyPage';
import CustomCursor from './CustomCursor';
import { GlobalLoader } from './GlobalLoader';
import './index.css';

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalLoader />
    <BrowserRouter>
      {!isTouchDevice && <CustomCursor />}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/joinourjourney" element={<JoinOurJourneyPage />} />
        <Route path="/privacy_policy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
