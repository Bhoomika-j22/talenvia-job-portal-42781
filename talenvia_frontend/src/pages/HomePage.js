import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "../components/ui";
import { useAppState } from "../state/AppStateContext";

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Landing page / dashboard. */
  const { runtime } = useAppState();

  return (
    <div className="tv-grid">
      <Card
        title="Talenvia Job Portal"
        subtitle="Search jobs, polish your profile, and validate skills with mock tests."
        actions={
          <div className="tv-row tv-row--gap">
            <Badge tone="primary">Neon Cyber</Badge>
            <Badge tone="secondary">{runtime.nodeEnv}</Badge>
          </div>
        }
      >
        <div className="tv-hero">
          <div className="tv-hero__copy">
            <div className="tv-hero__headline">Find work. Build skill. Ship applications.</div>
            <p className="tv-muted">
              Everything in one place—job listings with filters, a profile/resume panel, and short mock tests to
              keep you sharp.
            </p>
            <div className="tv-row tv-row--gap tv-row--wrap">
              <Link to="/jobs">
                <Button variant="secondary">Browse Jobs</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost">Edit Profile</Button>
              </Link>
              <Link to="/mock-tests">
                <Button variant="primary">Take a Mock Test</Button>
              </Link>
            </div>
          </div>

          <div className="tv-hero__panel">
            <div className="tv-panel">
              <div className="tv-panel__title">Live Integration</div>
              <div className="tv-muted">
                API base:{" "}
                {runtime.apiBase ? <code>{runtime.apiBase}</code> : <span>(not set)</span>}
              </div>
              <div className="tv-panel__note tv-muted">
                Set <code>REACT_APP_API_BASE</code> (or <code>REACT_APP_BACKEND_URL</code>) to load real data.
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Quick Start" subtitle="Recommended flow for new users." className="tv-span-12">
        <div className="tv-quickstart">
          <div className="tv-quickstart__item">
            <div className="tv-quickstart__title">1) Profile</div>
            <div className="tv-muted">Add summary + skills so Talenvia can personalize matching.</div>
          </div>
          <div className="tv-quickstart__item">
            <div className="tv-quickstart__title">2) Jobs</div>
            <div className="tv-muted">Filter by role and location, then save roles you like.</div>
          </div>
          <div className="tv-quickstart__item">
            <div className="tv-quickstart__title">3) Mock Tests</div>
            <div className="tv-muted">Validate readiness and identify gaps before applying.</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
