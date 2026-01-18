import React, { useMemo, useState } from "react";
import { useAppState } from "../state/AppStateContext";
import { Button, Card, InlineAlert, Input } from "../components/ui";

function safeStringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch (e) {
    return "{}";
  }
}

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** Settings page for runtime config visibility and feature flags management. */
  const { runtime, featureFlags, setFeatureFlags, experimentsEnabled, setExperimentsEnabled } =
    useAppState();

  const [draftFlags, setDraftFlags] = useState(safeStringify(featureFlags));
  const [status, setStatus] = useState(null);

  const parsed = useMemo(() => {
    try {
      return { ok: true, value: JSON.parse(draftFlags || "{}") };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }, [draftFlags]);

  const applyFlags = () => {
    if (!parsed.ok) {
      setStatus({ tone: "error", message: `Invalid JSON: ${parsed.error}` });
      return;
    }
    setFeatureFlags(parsed.value || {});
    setStatus({ tone: "success", message: "Feature flags updated (local state)." });
  };

  return (
    <div className="tv-grid">
      <Card title="Settings" subtitle="Control local feature flags and review runtime configuration.">
        {status && (
          <div style={{ marginBottom: 12 }}>
            <InlineAlert tone={status.tone} title="Status">
              {status.message}
            </InlineAlert>
          </div>
        )}

        <div className="tv-settings-grid">
          <div className="tv-setting">
            <div className="tv-setting__label">Experiments</div>
            <div className="tv-setting__desc tv-muted">
              Toggle experimental UI behaviors (local only). In production, prefer env gating.
            </div>
            <div className="tv-row tv-row--gap">
              <Button
                variant={experimentsEnabled ? "secondary" : "ghost"}
                onClick={() => {
                  setExperimentsEnabled(true);
                  setStatus(null);
                }}
              >
                Enabled
              </Button>
              <Button
                variant={!experimentsEnabled ? "secondary" : "ghost"}
                onClick={() => {
                  setExperimentsEnabled(false);
                  setStatus(null);
                }}
              >
                Disabled
              </Button>
            </div>
          </div>

          <div className="tv-setting">
            <div className="tv-setting__label">Feature Flags (JSON)</div>
            <div className="tv-setting__desc tv-muted">
              Mirrors <code>REACT_APP_FEATURE_FLAGS</code> but editable for local demo/testing.
            </div>
            <label className="tv-field">
              <textarea
                className={`tv-textarea ${parsed.ok ? "" : "is-error"}`}
                rows={8}
                value={draftFlags}
                onChange={(e) => setDraftFlags(e.target.value)}
                spellCheck="false"
              />
              {!parsed.ok && <span className="tv-field__error">JSON error: {parsed.error}</span>}
            </label>
            <div className="tv-row tv-row--gap tv-row--end">
              <Button variant="ghost" onClick={() => setDraftFlags(safeStringify(featureFlags))}>
                Reset
              </Button>
              <Button variant="secondary" onClick={applyFlags}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="Runtime Configuration"
        subtitle="Derived from REACT_APP_* env vars. Endpoints are never hardcoded."
        className="tv-span-12"
      >
        <div className="tv-kv">
          <div className="tv-kv__row">
            <div className="tv-kv__key">API Base</div>
            <div className="tv-kv__value">
              {runtime.apiBase ? <code>{runtime.apiBase}</code> : <span className="tv-muted">(not set)</span>}
            </div>
          </div>
          <div className="tv-kv__row">
            <div className="tv-kv__key">WS URL</div>
            <div className="tv-kv__value">
              {runtime.wsUrl ? <code>{runtime.wsUrl}</code> : <span className="tv-muted">(not set)</span>}
            </div>
          </div>
          <div className="tv-kv__row">
            <div className="tv-kv__key">Frontend URL</div>
            <div className="tv-kv__value">
              {runtime.frontendUrl ? <code>{runtime.frontendUrl}</code> : <span className="tv-muted">(not set)</span>}
            </div>
          </div>
          <div className="tv-kv__row">
            <div className="tv-kv__key">Environment</div>
            <div className="tv-kv__value">
              <code>{runtime.nodeEnv}</code>
            </div>
          </div>
          <div className="tv-kv__row">
            <div className="tv-kv__key">Healthcheck Path</div>
            <div className="tv-kv__value">
              <code>{runtime.healthcheckPath}</code>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <InlineAlert tone="info" title="Note">
            If your backend has different routes, update the placeholder paths in <code>src/services/apiClient.js</code> (keep env-driven base URLs).
          </InlineAlert>
        </div>
      </Card>

      <Card title="Connectivity Checklist" subtitle="Quick sanity checks before wiring live data." className="tv-span-12">
        <div className="tv-checklist">
          <div className="tv-check">
            <span className="tv-check__dot" aria-hidden="true" />
            Set <code>REACT_APP_API_BASE</code> (or <code>REACT_APP_BACKEND_URL</code>)
          </div>
          <div className="tv-check">
            <span className="tv-check__dot" aria-hidden="true" />
            Ensure CORS allows this frontend origin
          </div>
          <div className="tv-check">
            <span className="tv-check__dot" aria-hidden="true" />
            Optional: Set <code>REACT_APP_WS_URL</code> for real-time features
          </div>
        </div>
      </Card>
    </div>
  );
}
