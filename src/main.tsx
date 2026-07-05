import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { PrivacyPage, TermsPage } from './LegalPages';
import { DownloadPage } from './DownloadPage';
import CustomCursor from './CustomCursor';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/privacy_policy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
