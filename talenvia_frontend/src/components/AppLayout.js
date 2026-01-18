import React, { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppState } from "../state/AppStateContext";

// PUBLIC_INTERFACE
export default function AppLayout({ children }) {
  /** Shared application layout with header, optional sidebar, and footer. */
  const { user } = useAppState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith("/jobs")) return "Job Listings";
    if (path.startsWith("/profile")) return "User Profile";
    if (path.startsWith("/mock-tests")) return "Mock Tests";
    if (path.startsWith("/settings")) return "Settings";
    if (path.startsWith("/about")) return "About Us";
    if (path.startsWith("/how-it-works")) return "How Talenvia Works";
    return "Dashboard";
  }, [location.pathname]);

  return (
    <div className="tv-app-shell">
      <header className="tv-header">
        <div className="tv-header__left">
          <button
            className="tv-icon-btn tv-mobile-only"
            type="button"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={sidebarOpen ? "true" : "false"}
          >
            ☰
          </button>

          <Link to="/" className="tv-logo" aria-label="Talenvia Home">
            <span className="tv-logo__mark">T</span>
            <span className="tv-logo__text">Talenvia</span>
          </Link>
        </div>

        <nav className="tv-nav tv-desktop-only" aria-label="Primary navigation">
          <NavLink className="tv-nav__link" to="/jobs">
            Jobs
          </NavLink>
          <NavLink className="tv-nav__link" to="/profile">
            Profile
          </NavLink>
          <NavLink className="tv-nav__link" to="/mock-tests">
            Mock Tests
          </NavLink>
          <NavLink className="tv-nav__link" to="/settings">
            Settings
          </NavLink>
          <NavLink className="tv-nav__link" to="/about">
            About
          </NavLink>
          <NavLink className="tv-nav__link" to="/how-it-works">
            How it Works
          </NavLink>
        </nav>

        <div className="tv-header__right">
          <div className="tv-user-pill" title={user.email}>
            <span className="tv-user-pill__dot" aria-hidden="true" />
            <span className="tv-user-pill__name">{user.name}</span>
          </div>
        </div>
      </header>

      <div className="tv-body">
        <aside className={`tv-sidebar ${sidebarOpen ? "is-open" : ""}`} aria-label="Sidebar">
          <div className="tv-sidebar__section">
            <div className="tv-sidebar__title">Quick Access</div>
            <NavLink className="tv-side-link" to="/jobs" onClick={() => setSidebarOpen(false)}>
              Job Listings
            </NavLink>
            <NavLink className="tv-side-link" to="/profile" onClick={() => setSidebarOpen(false)}>
              User Profile
            </NavLink>
            <NavLink
              className="tv-side-link"
              to="/mock-tests"
              onClick={() => setSidebarOpen(false)}
            >
              Mock Tests
            </NavLink>
            <NavLink
              className="tv-side-link"
              to="/settings"
              onClick={() => setSidebarOpen(false)}
            >
              Settings
            </NavLink>
          </div>

          <div className="tv-sidebar__section">
            <div className="tv-sidebar__title">Learn</div>
            <NavLink className="tv-side-link" to="/about" onClick={() => setSidebarOpen(false)}>
              About Us
            </NavLink>
            <NavLink
              className="tv-side-link"
              to="/how-it-works"
              onClick={() => setSidebarOpen(false)}
            >
              How Talenvia Works
            </NavLink>
          </div>

          <div className="tv-sidebar__section tv-sidebar__hint">
            <div className="tv-muted">
              Tip: Configure API with <code>REACT_APP_API_BASE</code>.
            </div>
          </div>
        </aside>

        <main className="tv-main" role="main">
          <div className="tv-page-header">
            <div>
              <h1 className="tv-h1">{pageTitle}</h1>
              <p className="tv-subtitle">
                Neon Cyber job search, profile management, and practice tests—fast, focused, and
                feedback-driven.
              </p>
            </div>
          </div>

          <div className="tv-content">{children}</div>

          <footer className="tv-footer">
            <div className="tv-footer__grid">
              <div>
                <div className="tv-footer__brand">Talenvia</div>
                <div className="tv-muted">Neon Cyber platform for job seekers and skill growth.</div>
              </div>
              <div>
                <div className="tv-footer__title">Sections</div>
                <div className="tv-footer__links">
                  <Link to="/jobs">Jobs</Link>
                  <Link to="/profile">Profile</Link>
                  <Link to="/mock-tests">Mock Tests</Link>
                </div>
              </div>
              <div>
                <div className="tv-footer__title">Info</div>
                <div className="tv-footer__links">
                  <Link to="/about">About</Link>
                  <Link to="/how-it-works">How it Works</Link>
                </div>
              </div>
            </div>
            <div className="tv-footer__bottom">
              <span className="tv-muted">© {new Date().getFullYear()} Talenvia</span>
              <span className="tv-muted">Built for high-velocity learning.</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
