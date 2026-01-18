import React from "react";
import { Badge, Card } from "../components/ui";

// PUBLIC_INTERFACE
export default function AboutPage() {
  /** About Talenvia page. */
  return (
    <div className="tv-grid">
      <Card
        title="About Talenvia"
        subtitle="A Neon Cyber job searching platform focused on clarity, speed, and growth."
        actions={
          <div className="tv-row tv-row--gap">
            <Badge tone="primary">Primary #10B981</Badge>
            <Badge tone="secondary">Secondary #F59E0B</Badge>
          </div>
        }
      >
        <p className="tv-paragraph">
          Talenvia blends job discovery, skill practice, and profile readiness into one streamlined
          workflow. The goal is to help candidates move from searching → improving → applying with
          less friction and more feedback.
        </p>

        <div className="tv-two-col">
          <div className="tv-feature">
            <div className="tv-feature__title">Job Discovery</div>
            <div className="tv-muted">
              Search/filter, swap between card/list views, and keep context while exploring roles.
            </div>
          </div>

          <div className="tv-feature">
            <div className="tv-feature__title">Profile & Resume</div>
            <div className="tv-muted">
              Maintain a strong candidate snapshot with key skills and summary.
            </div>
          </div>

          <div className="tv-feature">
            <div className="tv-feature__title">Mock Tests</div>
            <div className="tv-muted">
              Practice fast quizzes to identify gaps and build confidence.
            </div>
          </div>

          <div className="tv-feature">
            <div className="tv-feature__title">Neon Cyber UI</div>
            <div className="tv-muted">
              Dark surfaces, bold typography, neon accents—high contrast for focus.
            </div>
          </div>
        </div>
      </Card>

      <Card title="Our Principles" subtitle="What we optimize for." className="tv-span-12">
        <div className="tv-principles">
          <div className="tv-principle">
            <div className="tv-principle__name">Signal over noise</div>
            <div className="tv-muted">Fast scanning, clear hierarchy, and concise actions.</div>
          </div>
          <div className="tv-principle">
            <div className="tv-principle__name">Feedback loops</div>
            <div className="tv-muted">Practice and iterate, guided by results.</div>
          </div>
          <div className="tv-principle">
            <div className="tv-principle__name">Environment-driven</div>
            <div className="tv-muted">Endpoints and behavior configured via env, never hardcoded.</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
