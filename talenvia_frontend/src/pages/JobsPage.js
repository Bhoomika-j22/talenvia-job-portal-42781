import React, { useEffect, useMemo, useState } from "react";
import { apiClient } from "../services/apiClient";
import { Badge, Button, Card, InlineAlert, Input, Select, Skeleton } from "../components/ui";

const DEMO_JOBS = [
  {
    id: "job-1",
    title: "Frontend Engineer (React)",
    company: "NeonWorks",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    tags: ["React", "CSS", "APIs"],
    description:
      "Build fast, accessible UI for a high-growth product. Own components, performance, and UX polish.",
  },
  {
    id: "job-2",
    title: "Full Stack Developer",
    company: "Talenvia Labs",
    location: "Hybrid — Austin, TX",
    type: "Full-time",
    level: "Senior",
    tags: ["Node", "React", "Postgres"],
    description:
      "Ship end-to-end features across UI and API. Work with product, design, and data to deliver impact.",
  },
  {
    id: "job-3",
    title: "QA Automation Engineer",
    company: "CircuitEdge",
    location: "Remote",
    type: "Contract",
    level: "Junior",
    tags: ["Playwright", "CI", "JavaScript"],
    description:
      "Create robust test suites for modern web apps, focusing on reliability, coverage, and developer velocity.",
  },
];

// PUBLIC_INTERFACE
export default function JobsPage() {
  /** Job search/listings page with filters and list/card views. */
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("any");
  const [level, setLevel] = useState("any");
  const [view, setView] = useState("cards");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState(null);

  const filteredDemoJobs = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    const locLower = location.trim().toLowerCase();

    return DEMO_JOBS.filter((job) => {
      const matchesQ =
        !qLower ||
        job.title.toLowerCase().includes(qLower) ||
        job.company.toLowerCase().includes(qLower) ||
        job.tags.some((t) => t.toLowerCase().includes(qLower));

      const matchesLoc = !locLower || job.location.toLowerCase().includes(locLower);
      const matchesType = type === "any" || job.type.toLowerCase().includes(type);
      const matchesLevel = level === "any" || job.level.toLowerCase().includes(level);

      return matchesQ && matchesLoc && matchesType && matchesLevel;
    });
  }, [q, location, type, level]);

  const loadJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient.listJobs({
        q: q.trim() || undefined,
        location: location.trim() || undefined,
        type: type === "any" ? undefined : type,
        level: level === "any" ? undefined : level,
      });

      // Accept multiple shapes gracefully.
      const list = Array.isArray(data) ? data : data?.jobs || data?.items || [];
      setJobs(list);
    } catch (e) {
      setJobs(null);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial attempt to load from backend; fallback UI will handle missing API base.
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = jobs && jobs.length ? jobs : jobs === null ? filteredDemoJobs : [];

  return (
    <div className="tv-grid">
      <Card
        title="Search & Filters"
        subtitle="Find roles by keyword, location, and type. Switch between card and list views."
        actions={
          <div className="tv-row tv-row--gap">
            <Button variant={view === "cards" ? "primary" : "ghost"} onClick={() => setView("cards")}>
              Cards
            </Button>
            <Button variant={view === "list" ? "primary" : "ghost"} onClick={() => setView("list")}>
              List
            </Button>
          </div>
        }
      >
        <div className="tv-filters">
          <Input
            label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Role, company, or skill (e.g., React)"
          />
          <Input
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Remote, city, or region"
          />
          <Select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: "any", label: "Any" },
              { value: "full", label: "Full-time" },
              { value: "contract", label: "Contract" },
              { value: "part", label: "Part-time" },
            ]}
          />
          <Select
            label="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            options={[
              { value: "any", label: "Any" },
              { value: "junior", label: "Junior" },
              { value: "mid", label: "Mid" },
              { value: "senior", label: "Senior" },
            ]}
          />
          <div className="tv-row tv-row--gap tv-row--end">
            <Button variant="secondary" onClick={loadJobs} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setQ("");
                setLocation("");
                setType("any");
                setLevel("any");
              }}
              disabled={loading}
            >
              Reset
            </Button>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 12 }}>
            <InlineAlert
              tone="warning"
              title="Backend not available (showing demo results)"
              actions={
                <Button variant="ghost" onClick={loadJobs}>
                  Retry
                </Button>
              }
            >
              {error.code === "API_BASE_NOT_CONFIGURED"
                ? "Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL to enable live job results."
                : error.message}
            </InlineAlert>
          </div>
        )}
      </Card>

      <Card
        title="Job Listings"
        subtitle={`${results.length} result(s)`}
        className="tv-span-12"
      >
        {loading && <Skeleton lines={5} />}

        {!loading && results.length === 0 && (
          <InlineAlert tone="info" title="No results">
            Try broadening your query or resetting filters.
          </InlineAlert>
        )}

        {!loading && results.length > 0 && (
          <div className={view === "list" ? "tv-list" : "tv-cards"}>
            {results.map((job) => (
              <article key={job.id || `${job.company}-${job.title}`} className="tv-job">
                <div className="tv-job__top">
                  <div>
                    <div className="tv-job__title">{job.title || "Untitled role"}</div>
                    <div className="tv-job__meta">
                      <span className="tv-muted">{job.company || "Unknown company"}</span>
                      <span className="tv-dot">•</span>
                      <span className="tv-muted">{job.location || "Unknown location"}</span>
                    </div>
                  </div>
                  <div className="tv-row tv-row--gap">
                    <Badge tone="primary">{job.type || "Role"}</Badge>
                    <Badge tone="secondary">{job.level || "Level"}</Badge>
                  </div>
                </div>

                <p className="tv-job__desc">
                  {job.description || "No description available yet. Connect backend to load details."}
                </p>

                <div className="tv-job__tags">
                  {(job.tags || []).slice(0, 6).map((t) => (
                    <Badge key={t} tone="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="tv-row tv-row--gap tv-row--end tv-job__actions">
                  <Button
                    variant="primary"
                    onClick={() => {
                      // Placeholder action
                      // eslint-disable-next-line no-alert
                      alert("Apply flow placeholder: integrate backend application endpoint when available.");
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      // eslint-disable-next-line no-alert
                      alert("Save job placeholder: persist to backend or local storage.");
                    }}
                  >
                    Save
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
