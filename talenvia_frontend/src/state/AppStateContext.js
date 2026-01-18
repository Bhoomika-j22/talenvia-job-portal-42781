import React, { createContext, useContext, useMemo, useState } from "react";
import { getRuntimeConfig } from "../config/env";

const AppStateContext = createContext(null);

// PUBLIC_INTERFACE
export function AppStateProvider({ children }) {
  /** Provides app-wide session/user and feature flags state. */
  const runtime = getRuntimeConfig();

  const [user, setUser] = useState({
    id: "demo-user",
    name: "Ava Candidate",
    email: "ava@example.com",
    title: "Frontend Developer",
    location: "Remote",
    resume: {
      summary: "Passionate builder with a focus on clean UI and performant React apps.",
      skills: ["React", "TypeScript", "CSS", "APIs", "Testing"],
      experience: [
        {
          company: "Demo Inc.",
          role: "Frontend Developer",
          period: "2023 — Present",
          highlights: ["Built responsive UI systems", "Improved page performance by 30%"],
        },
      ],
    },
  });

  const [featureFlags, setFeatureFlags] = useState(runtime.featureFlags || {});
  const [experimentsEnabled, setExperimentsEnabled] = useState(!!runtime.experimentsEnabled);

  const value = useMemo(
    () => ({
      runtime,
      user,
      setUser,
      featureFlags,
      setFeatureFlags,
      experimentsEnabled,
      setExperimentsEnabled,
    }),
    [runtime, user, featureFlags, experimentsEnabled]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAppState() {
  /** Hook to access app-wide state. */
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}
