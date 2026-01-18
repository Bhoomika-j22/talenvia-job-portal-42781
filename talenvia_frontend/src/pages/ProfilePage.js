import React, { useMemo, useState } from "react";
import { apiClient } from "../services/apiClient";
import { useAppState } from "../state/AppStateContext";
import { Button, Card, InlineAlert, Input } from "../components/ui";

// PUBLIC_INTERFACE
export default function ProfilePage() {
  /** User profile view/edit page with resume fields. */
  const { user, setUser } = useAppState();

  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    title: user.title || "",
    location: user.location || "",
    summary: user.resume?.summary || "",
    skills: (user.resume?.skills || []).join(", "),
  });

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const canSave = useMemo(() => form.name.trim() && form.email.trim(), [form.name, form.email]);

  const onSave = async () => {
    setSaving(true);
    setStatus(null);

    const nextUser = {
      ...user,
      name: form.name.trim(),
      email: form.email.trim(),
      title: form.title.trim(),
      location: form.location.trim(),
      resume: {
        ...user.resume,
        summary: form.summary.trim(),
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      },
    };

    try {
      // Update locally immediately for responsive UX.
      setUser(nextUser);

      // Try backend (optional).
      await apiClient.updateProfile(nextUser);
      setStatus({ tone: "success", message: "Profile saved (backend synced)." });
    } catch (e) {
      setStatus({
        tone: "warning",
        message:
          e.code === "API_BASE_NOT_CONFIGURED"
            ? "Profile saved locally. Configure API base to sync to backend."
            : `Saved locally, but backend sync failed: ${e.message}`,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="tv-grid">
      <Card
        title="Profile"
        subtitle="Keep your information current—Talenvia uses this to personalize job matches."
        actions={
          <div className="tv-row tv-row--gap">
            <Button variant="secondary" onClick={onSave} disabled={!canSave || saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setForm({
                  name: user.name || "",
                  email: user.email || "",
                  title: user.title || "",
                  location: user.location || "",
                  summary: user.resume?.summary || "",
                  skills: (user.resume?.skills || []).join(", "),
                });
                setStatus(null);
              }}
              disabled={saving}
            >
              Reset
            </Button>
          </div>
        }
      >
        {status && (
          <div style={{ marginBottom: 12 }}>
            <InlineAlert tone={status.tone === "success" ? "success" : status.tone} title="Status">
              {status.message}
            </InlineAlert>
          </div>
        )}

        <div className="tv-form-grid">
          <Input label="Full name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            type="email"
          />
          <Input label="Title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
          <Input
            label="Location"
            value={form.location}
            onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
            placeholder="Remote / City / Region"
          />

          <label className="tv-field tv-span-12">
            <span className="tv-field__label">Resume summary</span>
            <textarea
              className="tv-textarea"
              rows={5}
              value={form.summary}
              onChange={(e) => setForm((s) => ({ ...s, summary: e.target.value }))}
              placeholder="Write a crisp summary highlighting impact, strengths, and goals."
            />
            <span className="tv-field__hint">Tip: Quantify outcomes (e.g., +20% conversion).</span>
          </label>

          <Input
            className="tv-span-12"
            label="Skills (comma-separated)"
            value={form.skills}
            onChange={(e) => setForm((s) => ({ ...s, skills: e.target.value }))}
            placeholder="React, CSS, Node, SQL..."
          />
        </div>
      </Card>

      <Card
        title="Resume Preview"
        subtitle="This is how your resume snapshot looks inside Talenvia."
        className="tv-span-12"
      >
        <div className="tv-resume">
          <div className="tv-resume__header">
            <div className="tv-resume__name">{user.name}</div>
            <div className="tv-muted">
              {user.title} • {user.location} • {user.email}
            </div>
          </div>

          <div className="tv-resume__section">
            <div className="tv-resume__label">Summary</div>
            <div className="tv-resume__text">{user.resume?.summary || "No summary yet."}</div>
          </div>

          <div className="tv-resume__section">
            <div className="tv-resume__label">Skills</div>
            <div className="tv-row tv-row--gap tv-row--wrap">
              {(user.resume?.skills || []).length ? (
                user.resume.skills.map((s) => (
                  <span key={s} className="tv-chip">
                    {s}
                  </span>
                ))
              ) : (
                <span className="tv-muted">No skills added yet.</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
