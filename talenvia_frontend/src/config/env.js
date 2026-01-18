const parseJsonEnv = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (e) {
    return fallback;
  }
};

const parseBoolEnv = (value, fallback = false) => {
  if (value === undefined || value === null || value === "") return fallback;
  const normalized = String(value).trim().toLowerCase();
  return ["1", "true", "yes", "on"].includes(normalized);
};

// PUBLIC_INTERFACE
export function getRuntimeConfig() {
  /** Returns runtime configuration derived from REACT_APP_* environment variables. */
  const apiBase = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "";
  const wsUrl = process.env.REACT_APP_WS_URL || "";
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL || "";
  const nodeEnv = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development";

  const featureFlags = parseJsonEnv(process.env.REACT_APP_FEATURE_FLAGS, {});
  const experimentsEnabled = parseBoolEnv(process.env.REACT_APP_EXPERIMENTS_ENABLED, false);

  const logLevel = process.env.REACT_APP_LOG_LEVEL || "info";
  const healthcheckPath = process.env.REACT_APP_HEALTHCHECK_PATH || "/health";
  const enableSourceMaps = parseBoolEnv(process.env.REACT_APP_ENABLE_SOURCE_MAPS, true);

  return {
    apiBase,
    wsUrl,
    frontendUrl,
    nodeEnv,
    featureFlags,
    experimentsEnabled,
    logLevel,
    healthcheckPath,
    enableSourceMaps,
    telemetryDisabled: parseBoolEnv(process.env.REACT_APP_NEXT_TELEMETRY_DISABLED, true),
    trustProxy: parseBoolEnv(process.env.REACT_APP_TRUST_PROXY, false),
    port: process.env.REACT_APP_PORT || "3000",
  };
}
