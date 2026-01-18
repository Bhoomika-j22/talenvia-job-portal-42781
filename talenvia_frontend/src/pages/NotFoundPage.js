import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";

// PUBLIC_INTERFACE
export default function NotFoundPage() {
  /** 404 page. */
  return (
    <div className="tv-grid">
      <Card title="Page not found" subtitle="That route doesn't exist (yet).">
        <div className="tv-row tv-row--gap">
          <Link to="/">
            <Button variant="secondary">Go Home</Button>
          </Link>
          <Link to="/jobs">
            <Button variant="ghost">Browse Jobs</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
