import React from "react";
import { Badge, Card } from "../components/ui";

// PUBLIC_INTERFACE
export default function HowItWorksPage() {
  /** Explains the Talenvia workflow. */
  return (
    <div className="tv-grid">
      <Card
        title="How Talenvia Works"
        subtitle="A simple loop: discover → prepare → validate → apply."
        actions={
          <div className="tv-row tv-row--gap">
            <Badge tone="primary">Discover</Badge>
            <Badge tone="secondary">Validate</Badge>
          </div>
        }
      >
        <div className="tv-steps">
          <div className="tv-step">
            <div className="tv-step__num">01</div>
            <div className="tv-step__content">
              <div className="tv-step__title">Search jobs</div>
              <div className="tv-muted">
                Use keyword and location filters, then switch between card and list views to match
                how you scan.
              </div>
            </div>
          </div>

          <div className="tv-step">
            <div className="tv-step__num">02</div>
            <div className="tv-step__content">
              <div className="tv-step__title">Update profile</div>
              <div className="tv-muted">
                Keep your summary and skills sharp. Talenvia uses this to personalize recommendations.
              </div>
            </div>
          </div>

          <div className="tv-step">
            <div className="tv-step__num">03</div>
            <div className="tv-step__content">
              <div className="tv-step__title">Take mock tests</div>
              <div className="tv-muted">
                Short quizzes to validate readiness. Results show immediately and can be synced to backend.
              </div>
            </div>
          </div>

          <div className="tv-step">
            <div className="tv-step__num">04</div>
            <div className="tv-step__content">
              <div className="tv-step__title">Apply with confidence</div>
              <div className="tv-muted">
                Use job details + your latest profile snapshot to apply decisively (application flow placeholder).
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Integration Notes" subtitle="Where backend hooks in (no hardcoded endpoints)." className="tv-span-12">
        <div className="tv-kv">
          <div className="tv-kv__row">
            <div className="tv-kv__key">Jobs</div>
            <div className="tv-kv__value">
              <code>GET /jobs</code> (supports query params like <code>q</code>, <code>location</code>)
            </div>
          </div>
          <div className="tv-kv__row">
            <div className="tv-kv__key">Profile</div>
            <div className="tv-kv__value">
              <code>GET /me</code>, <code>PUT /me</code>
            </div>
          </div>
          <div className="tv-kv__row">
            <div className="tv-kv__key">Mock Tests</div>
            <div className="tv-kv__value">
              <code>GET /mock-tests</code>, <code>POST /mock-tests/:id/attempts</code>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
