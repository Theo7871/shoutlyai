"use client";

import { useEffect, useRef, useState } from "react";
import AdminHeader from "../../AdminHeader";
import { getConnectionStatus, getBestTimes, type BestTimePlatform } from "@/api/autopostApi";

// ── Types ──────────────────────────────────────────────────────────────────
type Strategy = "all" | "benchmark" | "custom";
interface PlatformScheduleState { mode: "benchmark" | "own"; ownTime: string; enabled: boolean }

interface SmartSchedulePlatform {
  id: string;
  name: string;
  handle: string;
  icon: string;
  color: string;
  /** Last-resort default if GET /api/autopost/best-times can't be reached —
   *  never shown as if it were live data (see fetch effect below). */
  fallbackTime: string;
  /** GET /api/autopost/connection-status (and /best-times) platform key.
   *  `null` = not wired up on the backend yet (e.g. Google Business), so
   *  it's always shown as unconnected regardless of live status. */
  backendKey: string | null;
}

// ── Constants ──────────────────────────────────────────────────────────────
const PLATFORMS: SmartSchedulePlatform[] = [
  { id: "instagram", name: "Instagram", handle: "@mybusiness", icon: "fa-instagram", color: "#E1306C", fallbackTime: "11:00 AM", backendKey: "INSTAGRAM" },
  { id: "facebook", name: "Facebook", handle: "My Business", icon: "fa-facebook", color: "#1877F2", fallbackTime: "1:00 PM", backendKey: "FACEBOOK" },
  { id: "linkedin", name: "LinkedIn", handle: "My Company", icon: "fa-linkedin", color: "#0A66C2", fallbackTime: "9:00 AM", backendKey: "LINKEDIN" },
  { id: "twitter", name: "X (Twitter)", handle: "@mybusiness", icon: "fa-x-twitter", color: "#111827", fallbackTime: "9:00 AM", backendKey: "X" },
  { id: "tiktok", name: "TikTok", handle: "@mybusiness", icon: "fa-tiktok", color: "#111827", fallbackTime: "7:00 PM", backendKey: "TIKTOK" },
  { id: "threads", name: "Threads", handle: "@mybusiness", icon: "fa-threads", color: "#111827", fallbackTime: "1:00 PM", backendKey: "THREADS" },
  { id: "bluesky", name: "Bluesky", handle: "@mybusiness", icon: "fa-bluesky", color: "#0085FF", fallbackTime: "9:00 AM", backendKey: "BLUESKY" },
  { id: "youtube", name: "YouTube", handle: "My Business", icon: "fa-youtube", color: "#FF0000", fallbackTime: "2:00 PM", backendKey: "YOUTUBE" },
  { id: "pinterest", name: "Pinterest", handle: "My Business", icon: "fa-pinterest", color: "#E60023", fallbackTime: "8:00 PM", backendKey: "PINTEREST" },
  { id: "google_biz", name: "Google Business", handle: "My Business", icon: "fa-google", color: "#4285F4", fallbackTime: "11:00 AM", backendKey: null },
];

interface LiveConnection { connected: boolean; handle: string | null }

/** Shape of one entry in GET /api/autopost/connection-status's `platforms[]` —
 *  same field names the Accounts page reads from the same endpoint. */
interface ConnectionStatusPlatform {
  platform: string;
  connected: boolean;
  accounts?: { id: string; username?: string; status?: string; lastSync?: string }[];
}

const CACHE_KEY = "shoutly:smartSchedule:v1";

// ── Helpers ────────────────────────────────────────────────────────────────
const to24HourClock = (t: string): string => {
  const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return "";
  let h = parseInt(m[1], 10);
  const mod = m[3].toUpperCase();
  if (mod === "PM" && h < 12) h += 12;
  if (mod === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
};

const to12HourClock = (value: string): string => {
  const [hStr, min] = value.split(":");
  let h = parseInt(hStr, 10);
  const mod = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${min} ${mod}`;
};

const gmtOffsetLabel = (): string => {
  const offsetMin = -new Date().getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  return `GMT ${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
};

interface CachePayload { strategy: Strategy; platforms: Record<string, PlatformScheduleState> }

function readCache(): CachePayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as CachePayload) : null;
  } catch {
    return null;
  }
}

function writeCache(payload: CachePayload) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage quota / private-mode errors
  }
}

// ── Toggle switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div onClick={() => onChange(!checked)} style={{ position: "relative", width: 30, height: 17, flexShrink: 0, cursor: "pointer" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 9, background: checked ? "#10B981" : "#E4E5EF", border: `1px solid ${checked ? "#10B981" : "#E4E5EF"}`, transition: "all .2s" }} />
      <div style={{ position: "absolute", top: 2.5, left: checked ? 15 : 2.5, width: 10, height: 10, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.25)" }} />
    </div>
  );
}

// ── Toast hook ─────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState({ visible: false, msg: "", type: "green" });
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = (msg: string, type = "green") => {
    if (t.current) clearTimeout(t.current);
    setToast({ visible: true, msg, type });
    t.current = setTimeout(() => setToast(s => ({ ...s, visible: false })), 2600);
  };
  return { toast, show };
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function SmartSchedulePage() {
  const cached = useRef(readCache()).current;

  const [strategy, setStrategy] = useState<Strategy>(cached?.strategy ?? "all");
  const [platformSchedule, setPlatformSchedule] = useState<Record<string, PlatformScheduleState>>(() => {
    const defaults = Object.fromEntries(PLATFORMS.map(p => [p.id, { mode: "benchmark" as const, ownTime: p.fallbackTime, enabled: true }]));
    return { ...defaults, ...cached?.platforms };
  });
  const [cardOpen, setCardOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, show: showToast } = useToast();

  // Real connection state per platform, from the same /connection-status
  // endpoint the Accounts page uses — replaces the old hardcoded "everything
  // is connected as @mybusiness" assumption. Defaults to "not connected"
  // until the fetch resolves, so nothing briefly looks live that isn't.
  const [connections, setConnections] = useState<Record<string, LiveConnection>>({});
  const [connectionsLoading, setConnectionsLoading] = useState(true);

  // Benchmark posting times from GET /api/autopost/best-times — a static
  // industry benchmark per platform (see backend AutopostService.getBestTimes),
  // not a per-account AI score. `null` per id until the fetch resolves or if
  // it fails, in which case the UI falls back to PLATFORMS[].fallbackTime
  // rather than pretending it's live data.
  const [benchmarks, setBenchmarks] = useState<Record<string, BestTimePlatform>>({});
  const [benchmarksLoading, setBenchmarksLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const token = typeof window !== "undefined" ? localStorage.getItem("shoutly_token") : null;
    if (!token) { setConnectionsLoading(false); setBenchmarksLoading(false); return; }

    getConnectionStatus()
      .then((status: { platforms?: ConnectionStatusPlatform[] }) => {
        if (cancelled) return;
        const byBackendKey: Record<string, ConnectionStatusPlatform> = {};
        (status?.platforms || []).forEach((p) => { byBackendKey[p.platform] = p; });

        const next: Record<string, LiveConnection> = {};
        for (const plat of PLATFORMS) {
          const entry = plat.backendKey ? byBackendKey[plat.backendKey] : null;
          const entryAccounts = entry?.accounts || [];
          const connected = !!entry?.connected && entryAccounts.length > 0;
          const acc = connected ? entryAccounts[0] : null;
          next[plat.id] = {
            connected,
            handle: acc?.username ? (plat.handle.startsWith("@") ? `@${acc.username.replace(/^@/, "")}` : acc.username) : null,
          };
        }
        setConnections(next);
      })
      .catch(() => {
        // Leave everything as "not connected" — safer default than pretending.
      })
      .finally(() => { if (!cancelled) setConnectionsLoading(false); });

    getBestTimes()
      .then((res) => {
        if (cancelled) return;
        const byBackendKey: Record<string, BestTimePlatform> = {};
        (res?.platforms || []).forEach((p) => { byBackendKey[p.platform] = p; });

        const next: Record<string, BestTimePlatform> = {};
        for (const plat of PLATFORMS) {
          const entry = plat.backendKey ? byBackendKey[plat.backendKey] : null;
          if (entry) next[plat.id] = entry;
        }
        setBenchmarks(next);
      })
      .catch(() => {
        // Fall back to PLATFORMS[].fallbackTime — handled at render time.
      })
      .finally(() => { if (!cancelled) setBenchmarksLoading(false); });

    return () => { cancelled = true; };
  }, []);

  /** Resolves the benchmark time to show for a platform, in 12h clock —
   *  live value from /best-times when available, else the static fallback. */
  const getBenchmarkTime12h = (plat: SmartSchedulePlatform): string => {
    const live = benchmarks[plat.id]?.recommendedTime;
    return live ? to12HourClock(live) : plat.fallbackTime;
  };

  useEffect(() => {
    writeCache({ strategy, platforms: platformSchedule });
  }, [strategy, platformSchedule]);

  const updatePlatform = (id: string, patch: Partial<PlatformScheduleState>) => {
    setPlatformSchedule(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  // Each platform's mode is independently "benchmark" or "own", never both.
  // The strategy tabs are a view filter over that per-platform mode, not a bulk setter.
  const visiblePlatforms = PLATFORMS.filter(p => {
    if (strategy === "all") return true;
    const mode = platformSchedule[p.id]?.mode ?? "benchmark";
    return strategy === "custom" ? mode === "own" : mode === "benchmark";
  });

  const connectedPlatforms = PLATFORMS.filter(p => connections[p.id]?.connected);
  const totalCount = connectedPlatforms.length;
  const benchmarkModeCount = connectedPlatforms.filter(p => (platformSchedule[p.id]?.mode ?? "benchmark") === "benchmark").length;
  const ownModeCount = totalCount - benchmarkModeCount;

  const saveChanges = () => {
    if (saving) return;
    setSaving(true);
    writeCache({ strategy, platforms: platformSchedule });
    setTimeout(() => {
      setSaving(false);
      showToast("✓ Smart scheduling settings saved!", "green");
    }, 400);
  };

  const enabledCount = connectedPlatforms.filter(p => platformSchedule[p.id]?.enabled).length;

  const toastColors: Record<string, string> = { green: "#10B981", brand: "#F97316", amber: "#F59E0B", red: "#EF4444" };
  const toastCol = toastColors[toast.type] || toastColors.green;

  const labelStyle: React.CSSProperties = { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px", color: "#9496B5", marginBottom: 10, fontFamily: "Sora,sans-serif" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .ss-body { font-family: 'Plus Jakarta Sans',sans-serif; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #E4E5EF; border-radius: 4px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.35} }
        .ss-row:hover { background: #FAFAFF; }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      <style>{`
        @media (min-width: 768px) {
          .ss-admin-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 50 !important;
            background: #fff !important;
            border-bottom: 1px solid #E4E5EF !important;
          }
          .ss-page-wrapper {
            margin-top: 56px !important;
          }
        }
        @media (max-width: 767px) {
          .ss-layout {
            flex-direction: column !important;
            padding: 16px 14px 28px !important;
            gap: 18px !important;
          }
          .ss-main-col {
            max-width: 100% !important;
          }
          .ss-hero-title {
            font-size: 20px !important;
          }
          .ss-side-col {
            width: 100% !important;
            position: static !important;
          }
          .ss-tiles-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .ss-main-card-head {
            padding: 14px !important;
          }
          .ss-main-card-body {
            padding: 0 14px 18px !important;
          }
        }
        @media (max-width: 420px) {
          .ss-tiles-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="ss-body ss-page-wrapper" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, background: "#F5F6FA" }}>
        <div className="ss-admin-header">
          <AdminHeader
            pageTitle="Smart Scheduling"
            searchPlaceholder="Search settings…"
            actionButton={
              <button onClick={saveChanges} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 7, background: "linear-gradient(115deg,#F97316,#EA580C)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", fontFamily: "Sora,sans-serif", boxShadow: "0 4px 14px rgba(249,115,22,.4)", whiteSpace: "nowrap", flexShrink: 0 }}>
                {saving ? <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 11 }} /> : <i className="fa-solid fa-lock" style={{ fontSize: 11 }} />} Save Changes
              </button>
            }
          />
        </div>

        <div className="ss-layout" style={{ flex: 1, overflowY: "auto", padding: "24px 28px", display: "flex", gap: 22, alignItems: "flex-start" }}>
          {/* ── MAIN ── */}
          <div className="ss-main-col" style={{ flex: 1, minWidth: 0, maxWidth: 900, width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".6px", color: "#F97316", marginBottom: 8, fontFamily: "Sora,sans-serif" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(115deg,#F97316,#EA580C)" }} />Smart Scheduling Settings
            </div>
            <div className="ss-hero-title" style={{ fontSize: 26, fontWeight: 800, color: "#0D0E1A", fontFamily: "Sora,sans-serif", letterSpacing: "-.5px", lineHeight: 1.2 }}>Post at the perfect time, automatically</div>
            <div style={{ fontSize: 13.5, color: "#6B7280", marginTop: 8, lineHeight: 1.6, maxWidth: 640 }}>
              Set your posting strategy once. Shoutly AI applies it to every new post — no need to pick times each time you publish.
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, padding: "6px 14px", borderRadius: 20, background: "#ECFDF5", border: "1px solid rgba(16,185,129,.2)", color: "#10B981", fontSize: 12.5, fontWeight: 700, fontFamily: "Sora,sans-serif" }}>
              <i className="fa-solid fa-check" style={{ fontSize: 10 }} /> Auto-applies to all new posts
            </div>

            {/* Main card */}
            <div style={{ marginTop: 22, background: "#fff", border: "1px solid #E4E5EF", borderRadius: 16, overflow: "hidden" }}>
              <div className="ss-main-card-head" onClick={() => setCardOpen(o => !o)} style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EEEEFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className="fa-solid fa-robot" style={{ color: "#F97316", fontSize: 16 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: "#0D0E1A", fontFamily: "Sora,sans-serif" }}>Benchmark-Based Smart Scheduling</div>
                  <div style={{ fontSize: 12, color: "#9496B5", marginTop: 2 }}>Default posting-time strategy for all posts</div>
                </div>
                <span style={{ padding: "4px 11px", borderRadius: 20, background: "#ECFDF5", border: "1px solid rgba(16,185,129,.2)", color: "#10B981", fontSize: 11, fontWeight: 700, fontFamily: "Sora,sans-serif" }}>ACTIVE</span>
                <i className="fa-solid fa-chevron-down" style={{ fontSize: 12, color: "#9496B5", transition: "transform .2s", transform: cardOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </div>

              {cardOpen && (
                <div className="ss-main-card-body" style={{ padding: "0 20px 22px", borderTop: "1px solid #ECEDF5" }}>
                  {/* Totals — also act as the view filter for the table below */}
                  <div style={{ marginTop: 18 }}>
                    <div style={labelStyle}>Accounts</div>
                    <div className="ss-tiles-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                      {([
                        { id: "all" as const, label: "Total Accounts", sub: "All connected accounts", count: totalCount, fg: "#0D0E1A", accent: "#0D0E1A", bg: "#F0F1F8", border: "#E4E5EF" },
                        { id: "benchmark" as const, label: "Benchmark Time", sub: "Using the general best-practice time for that platform", count: benchmarkModeCount, fg: "#F97316", accent: "#C2620F", bg: "#FFF7ED", border: "rgba(249,115,22,.25)" },
                        { id: "custom" as const, label: "Custom", sub: "You set the default time for each account", count: ownModeCount, fg: "#10B981", accent: "#0E9166", bg: "#ECFDF5", border: "rgba(16,185,129,.25)" },
                      ]).map(tile => {
                        const active = strategy === tile.id;
                        return (
                          <div
                            key={tile.id}
                            onClick={() => setStrategy(tile.id)}
                            style={{ padding: "13px 14px", borderRadius: 12, border: `1.5px solid ${active ? tile.fg : tile.border}`, background: tile.bg, cursor: "pointer", boxShadow: active ? `0 0 0 3px ${tile.fg}22` : undefined, transition: "all .15s" }}
                          >
                            <div style={{ fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".4px", color: tile.accent }}>{tile.label}</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: tile.fg, fontFamily: "Sora,sans-serif", marginTop: 4 }}>{tile.count}</div>
                            <div style={{ fontSize: 11, color: "#9496B5", marginTop: 4, lineHeight: 1.4 }}>{tile.sub}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Per-account default times */}
                  <div style={{ marginTop: 26 }}>
                    <div style={labelStyle}>Per-Account Default Times</div>
                    <div style={{ overflowX: "auto" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.6fr 1.6fr", gap: 10, padding: "0 4px 8px", minWidth: 560, fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".5px", color: "#C8CADF" }}>
                        <div>Account</div><div>Benchmark Time</div><div>Default</div>
                      </div>
                      {visiblePlatforms.length === 0 && (
                        <div style={{ padding: "22px 4px", textAlign: "center", fontSize: 12.5, color: "#9496B5", borderTop: "1px solid #ECEDF5" }}>
                          {strategy === "custom"
                            ? "No accounts on a custom time yet — click “Own” on an account to set one."
                            : "No accounts are using the benchmark time right now."}
                        </div>
                      )}
                      {visiblePlatforms.map(plat => {
                        const benchmarkTime = getBenchmarkTime12h(plat);
                        const sched = platformSchedule[plat.id] ?? { mode: "benchmark" as const, ownTime: benchmarkTime, enabled: true };
                        const conn = connections[plat.id];
                        const isConnected = conn?.connected ?? false;
                        const controlsEnabled = sched.enabled && isConnected;
                        const note = benchmarks[plat.id]?.note;
                        return (
                          <div key={plat.id} className="ss-row" style={{ display: "grid", gridTemplateColumns: "1.8fr 1.6fr 1.6fr", gap: 8, alignItems: "center", padding: "8px 4px", borderTop: "1px solid #ECEDF5", minWidth: 560, opacity: sched.enabled && isConnected ? 1 : 0.5, borderRadius: 6 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 26, height: 26, borderRadius: 7, background: plat.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, flexShrink: 0 }}>
                                <i className={`fa-brands ${plat.icon}`} />
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#0D0E1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{plat.name}</div>
                                <div style={{ fontSize: 10, color: isConnected ? "#9496B5" : "#C8CADF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {connectionsLoading ? "Checking…" : isConnected ? (conn?.handle || plat.handle) : "Not connected"}
                                </div>
                              </div>
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: 12, fontWeight: 800, color: "#0D0E1A", fontFamily: "JetBrains Mono,monospace" }}>{benchmarksLoading ? "…" : benchmarkTime}</div>
                              <div title={note || undefined} style={{ fontSize: 9.5, marginTop: 1, color: "#9496B5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {benchmarksLoading ? "Loading…" : note ? note : "General benchmark"}
                              </div>
                            </div>
                            {!isConnected && !connectionsLoading ? (
                              <div>
                                <a href="/dashboards/settings/accounts" style={{ fontSize: 11.5, fontWeight: 700, color: "#F97316", textDecoration: "none", fontFamily: "Sora,sans-serif" }}>
                                  Connect in Settings →
                                </a>
                              </div>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                                <div style={{ display: "inline-flex", border: "1px solid #E4E5EF", borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                                  <button type="button" disabled={!controlsEnabled} onClick={() => updatePlatform(plat.id, { mode: "benchmark" })}
                                    style={{ padding: "4px 9px", fontSize: 10.5, fontWeight: 700, border: "none", cursor: controlsEnabled ? "pointer" : "not-allowed", background: sched.mode === "benchmark" ? "#F97316" : "#F0F1F8", color: sched.mode === "benchmark" ? "#fff" : "#6B6D8A" }}>Benchmark</button>
                                  <button type="button" disabled={!controlsEnabled} onClick={() => updatePlatform(plat.id, { mode: "own" })}
                                    style={{ padding: "4px 9px", fontSize: 10.5, fontWeight: 700, border: "none", cursor: controlsEnabled ? "pointer" : "not-allowed", background: sched.mode === "own" ? "#F97316" : "#F0F1F8", color: sched.mode === "own" ? "#fff" : "#6B6D8A" }}>Own</button>
                                </div>
                                {controlsEnabled && sched.mode === "own" ? (
                                  <input
                                    type="time"
                                    value={to24HourClock(sched.ownTime || benchmarkTime)}
                                    onChange={e => { if (e.target.value) updatePlatform(plat.id, { ownTime: to12HourClock(e.target.value) }); }}
                                    style={{ padding: "4px 6px", borderRadius: 6, border: "1px solid #E4E5EF", background: "#F0F1F8", color: "#0D0E1A", fontSize: 10.5 }}
                                  />
                                ) : (
                                  <span style={{ fontSize: 10.5, color: "#C8CADF", minWidth: 28, textAlign: "center" }}>—</span>
                                )}
                                <Toggle checked={sched.enabled && isConnected} onChange={v => isConnected && updatePlatform(plat.id, { enabled: v })} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Summary ── */}
          <div className="ss-side-col" style={{ width: 300, flexShrink: 0, position: "sticky", top: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#0D0E1A", fontFamily: "Sora,sans-serif" }}>Scheduling Summary</div>
            <div style={{ fontSize: 12, color: "#9496B5", marginTop: 2, marginBottom: 14 }}>Current brand config</div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderRadius: 12, background: "#ECFDF5", border: "1px solid rgba(16,185,129,.2)", marginBottom: 14 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#10B981", flexShrink: 0, animation: "blink 2s infinite" }} />
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#4B4D6B" }}>Smart Scheduling is <strong style={{ color: "#10B981" }}>Active</strong></div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E4E5EF", borderRadius: 12, padding: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0D0E1A", marginBottom: 10, fontFamily: "Sora,sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                <i className="fa-solid fa-circle-info" style={{ color: "#F97316", fontSize: 11 }} /> Settings Summary
              </div>
              {[
                { k: "Strategy", v: strategy === "all" ? "All accounts" : strategy === "benchmark" ? "Benchmark per platform" : "Custom per platform" },
                { k: "Accounts on", v: `${enabledCount} of ${totalCount}` },
                { k: "Timezone", v: gmtOffsetLabel() },
                { k: "Fallback", v: "Benchmark" },
                { k: "Per-post override", v: "Allowed", col: "#10B981" },
              ].map((row, i, arr) => (
                <div key={row.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", fontSize: 12, borderBottom: i < arr.length - 1 ? "1px solid #ECEDF5" : undefined }}>
                  <span style={{ color: "#9496B5", fontWeight: 500 }}>{row.k}</span>
                  <span style={{ color: row.col || "#0D0E1A", fontWeight: 700, fontFamily: "JetBrains Mono,monospace", fontSize: 11.5 }}>{row.v}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #E4E5EF", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0D0E1A", marginBottom: 10, fontFamily: "Sora,sans-serif" }}>Default times</div>
              {connectedPlatforms.length === 0 ? (
                <div style={{ fontSize: 12, color: "#9496B5", padding: "6px 0" }}>
                  {connectionsLoading ? "Checking connections…" : "No accounts connected yet."}
                </div>
              ) : connectedPlatforms.map((plat, i) => {
                const sched = platformSchedule[plat.id];
                const time = sched?.mode === "own" && sched.ownTime ? sched.ownTime : getBenchmarkTime12h(plat);
                return (
                  <div key={plat.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: i < connectedPlatforms.length - 1 ? "1px solid #ECEDF5" : undefined, opacity: sched?.enabled === false ? 0.4 : 1 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#4B4D6B", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: plat.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>
                        <i className={`fa-brands ${plat.icon}`} />
                      </span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{plat.name}</span>
                    </span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "#0D0E1A", fontFamily: "JetBrains Mono,monospace", flexShrink: 0 }}>{time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div style={{ position: "fixed", bottom: 22, right: 22, zIndex: 9999, display: "flex", alignItems: "center", gap: 9, padding: "11px 16px", borderRadius: 10, background: "#0D0E1A", color: "#fff", fontSize: 13, fontWeight: 600, boxShadow: "0 12px 32px rgba(13,14,26,.10)", fontFamily: "Sora,sans-serif", opacity: toast.visible ? 1 : 0, transform: toast.visible ? "translateY(0)" : "translateY(8px)", transition: "all .3s cubic-bezier(.4,0,.2,1)", pointerEvents: "none" }}>
        <span style={{ display: "inline-flex", width: 20, height: 20, borderRadius: "50%", background: `${toastCol}22`, color: toastCol, alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>{toast.type === "red" ? "✕" : "✓"}</span>
        &nbsp;{toast.msg}
      </div>
    </>
  );
}
