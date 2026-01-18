import React from "react";

// PUBLIC_INTERFACE
export function Card({ title, subtitle, actions, children, className = "" }) {
  /** A themed content card. */
  return (
    <section className={`tv-card ${className}`}>
      {(title || subtitle || actions) && (
        <header className="tv-card__header">
          <div>
            {title && <h2 className="tv-h2">{title}</h2>}
            {subtitle && <p className="tv-muted">{subtitle}</p>}
          </div>
          {actions && <div className="tv-card__actions">{actions}</div>}
        </header>
      )}
      <div className="tv-card__body">{children}</div>
    </section>
  );
}

// PUBLIC_INTERFACE
export function Button({ variant = "primary", size = "md", className = "", ...props }) {
  /** Themed button with variants: primary, secondary, ghost, danger. */
  return <button className={`tv-btn tv-btn--${variant} tv-btn--${size} ${className}`} {...props} />;
}

// PUBLIC_INTERFACE
export function Input({ label, hint, error, className = "", ...props }) {
  /** Themed input with label + hint + error states. */
  return (
    <label className={`tv-field ${className}`}>
      {label && <span className="tv-field__label">{label}</span>}
      <input className={`tv-input ${error ? "is-error" : ""}`} {...props} />
      {error ? <span className="tv-field__error">{error}</span> : hint ? <span className="tv-field__hint">{hint}</span> : null}
    </label>
  );
}

// PUBLIC_INTERFACE
export function Select({ label, options, className = "", ...props }) {
  /** Themed select input. */
  return (
    <label className={`tv-field ${className}`}>
      {label && <span className="tv-field__label">{label}</span>}
      <select className="tv-select" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

// PUBLIC_INTERFACE
export function Badge({ tone = "primary", children }) {
  /** Small badge; tones: primary, secondary, neutral. */
  return <span className={`tv-badge tv-badge--${tone}`}>{children}</span>;
}

// PUBLIC_INTERFACE
export function InlineAlert({ tone = "info", title, children, actions }) {
  /** Inline alert to display errors/warnings/info. */
  return (
    <div className={`tv-alert tv-alert--${tone}`} role={tone === "error" ? "alert" : "status"}>
      <div className="tv-alert__content">
        {title && <div className="tv-alert__title">{title}</div>}
        <div className="tv-alert__body">{children}</div>
      </div>
      {actions && <div className="tv-alert__actions">{actions}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Skeleton({ lines = 3 }) {
  /** Simple skeleton loader. */
  return (
    <div className="tv-skeleton" aria-label="Loading">
      {Array.from({ length: lines }).map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={idx} className="tv-skeleton__line" />
      ))}
    </div>
  );
}
