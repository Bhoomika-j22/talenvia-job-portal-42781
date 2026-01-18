import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AppLayout from "./components/AppLayout";
import { AppStateProvider } from "./state/AppStateContext";

import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import ProfilePage from "./pages/ProfilePage";
import MockTestsPage from "./pages/MockTestsPage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import NotFoundPage from "./pages/NotFoundPage";

// PUBLIC_INTERFACE
function App() {
  /** Talenvia React app entry (routes + global state + layout). */
  return (
    <div className="App">
      <AppStateProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mock-tests" element={<MockTestsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AppStateProvider>
    </div>
  );
}

export default App;
