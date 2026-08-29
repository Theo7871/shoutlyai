"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminHeader from "../AdminHeader";
import {
  getConnectUrl,
  getConnectionStatus,
  handlePlatformCallback,
  publishPost,
  uploadMedia,
  type PublishPayload,
} from "@/api/autopostApi";

// ── Types ──────────────────────────────────────────────────────────────────
type Platform = "youtube" | "tiktok";
type Privacy = "public" | "unlisted" | "private";
type VideoSource = "upload" | "url";

interface ConnectedAccount {
  id: string;
  outstandAccountId?: string;
  username?: string;
  status?: string;
  lastSync?: string;
}

const PENDING_PLATFORM_KEY = "customPosting_connectingPlatform";

const PLATFORM_META: Record<Platform, {
  label: string; icon: string; badge: string;
  grad: string; solid: string; tint: string; shadow: string;
}> = {
  youtube: {
    label: "YouTube", icon: "fa-brands fa-youtube", badge: "YOUTUBE",
    grad: "linear-gradient(135deg,#FF0000,#CC0000)",
    solid: "linear-gradient(115deg,#F97316,#EA580C)",
    tint: "#FEF2F2", shadow: "rgba(255,0,0,.3)",
  },
  tiktok: {
    label: "TikTok", icon: "fa-brands fa-tiktok", badge: "TIKTOK",
    grad: "linear-gradient(135deg,#010101,#EE1D52)",
    solid: "linear-gradient(115deg,#EE1D52,#69C9D0)",
    tint: "#FEF1F4", shadow: "rgba(238,29,82,.3)",
  },
};

// ── Toast hook ─────────────────────────────────────────────────────────────
interface ToastItem { id: number; msg: string; type: string }
function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);
  const show = (msg: string, type = "default") => {
    const id = ++counter.current;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4200);
  };
  const remove = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));
  return { toasts, show, remove };
}

export default function CustomPostingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toasts, show: showToast, remove: removeToast } = useToasts();

  const [platform, setPlatform] = useState<Platform>("youtube");
  const [checkingConnection, setCheckingConnection] = useState(true);
  const [accounts, setAccounts] = useState<Record<Platform, ConnectedAccount | null>>({ youtube: null, tiktok: null });
  const [authorizing, setAuthorizing] = useState(false);
  const account = accounts[platform];
  const meta = PLATFORM_META[platform];

  // Compose form state (shared)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoSource, setVideoSource] = useState<VideoSource>("upload");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // YouTube-only options
  const [privacyStatus, setPrivacyStatus] = useState<Privacy>("public");
  const [isShort, setIsShort] = useState(false);
  const [madeForKids, setMadeForKids] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  const loadConnections = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("shoutly_token") : null;
    if (!token) { setCheckingConnection(false); return; }

    try {
      const status = await getConnectionStatus();
      const find = (backendKey: string) => (status?.platforms || []).find((p: any) => p.platform === backendKey);
      const yt = find("YOUTUBE");
      const tk = find("TIKTOK");
      setAccounts({
        youtube: yt?.connected && yt.accounts?.length ? yt.accounts[0] : null,
        tiktok: tk?.connected && tk.accounts?.length ? tk.accounts[0] : null,
      });
    } catch (err) {
      showToast("Couldn't check connection status.", "red");
    } finally {
      setCheckingConnection(false);
    }
  };

  // On mount: finalize an OAuth redirect if we just came back from Outstand, then load status.
  // TikTok's callback shape is unconfirmed — it may return account_id like YouTube does,
  // or a plain success sentence like Threads did (e.g. "TikTok account @handle connected
  // successfully"). Both are handled here so the flow works either way. Which platform was
  // being connected is remembered across the redirect via sessionStorage, since the OAuth
  // round trip is a full page navigation and resets React state.
  useEffect(() => {
    const accountId = searchParams.get("account_id");
    const successParam = searchParams.get("success");
    const isMessageShape = !!successParam && successParam !== "true" && successParam !== "false";
    const pendingPlatform = (typeof window !== "undefined" ? sessionStorage.getItem(PENDING_PLATFORM_KEY) : null) as Platform | null;

    const finalize = async () => {
      try {
        if (accountId) {
          const network = searchParams.get("network") ?? pendingPlatform ?? undefined;
          await handlePlatformCallback({
            account_id: accountId,
            username: searchParams.get("username") ?? undefined,
            network,
          });
          showToast(`✅ ${network === "tiktok" ? "TikTok" : "YouTube"} connected successfully!`, "green");
          if (network === "tiktok" || network === "youtube") setPlatform(network);
        } else if (isMessageShape) {
          const handle = successParam!.match(/@([\w.]+)/)?.[1];
          const network = successParam!.match(/^([A-Za-z]+)\s+account/)?.[1]?.toLowerCase() ?? pendingPlatform ?? undefined;
          if (handle && network) {
            await handlePlatformCallback({ username: handle, network });
            showToast(`✅ ${network === "tiktok" ? "TikTok" : "YouTube"} connected successfully!`, "green");
            if (network === "tiktok" || network === "youtube") setPlatform(network);
          } else {
            showToast("❌ Couldn't parse the account from the connection response.", "red");
          }
        } else if (successParam === "false") {
          showToast(searchParams.get("error") || "❌ Connection was cancelled or declined.", "red");
        }
      } catch (err: any) {
        showToast(err.message || "❌ Failed to finalize connection", "red");
      } finally {
        sessionStorage.removeItem(PENDING_PLATFORM_KEY);
        if (accountId || successParam) {
          router.replace("/dashboards/custom-posting");
        }
        loadConnections();
      }
    };

    finalize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startOAuth = async () => {
    setAuthorizing(true);
    try {
      sessionStorage.setItem(PENDING_PLATFORM_KEY, platform);
      // Send this page's own URL as the redirect target — omitting it makes
      // the backend fall back to its production default, which redirects to
      // the live Shoutly app instead of back here (e.g. localhost during dev).
      const redirectUri = `${window.location.origin}/dashboards/custom-posting`;
      const res = await getConnectUrl(platform, redirectUri);
      window.location.href = res.redirectUrl;
    } catch (err: any) {
      sessionStorage.removeItem(PENDING_PLATFORM_KEY);
      showToast(err.message || "Connect failed. Please try again.", "red");
      setAuthorizing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadedFileName(file.name);
    setVideoUrl("");
    try {
      const res = await uploadMedia(file);
      setVideoUrl(res.url);
      showToast("🎬 Video uploaded!", "green");
    } catch (err: any) {
      setUploadedFileName("");
      showToast(err.message || "Video upload failed. Please try again.", "red");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const canPublish = !isUploading && !isPublishing && content.trim().length > 0 && videoUrl.trim().length > 0;

  const handlePublishNow = async () => {
    if (!canPublish) {
      if (!content.trim()) showToast(`Add a ${platform === "youtube" ? "description" : "caption"} before publishing.`, "amber");
      else if (!videoUrl.trim()) showToast("Upload a video or paste a video URL first.", "amber");
      return;
    }

    setIsPublishing(true);
    setPublishedUrl(null);
    try {
      const payload: PublishPayload = {
        content: content.trim(),
        mediaUrls: [videoUrl.trim()],
        platforms: [platform],
      };
      if (platform === "youtube") {
        const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
        payload.youtube = {
          privacyStatus,
          isShort,
          madeForKids,
          ...(title.trim() ? { title: title.trim() } : {}),
          ...(tags.length ? { tags } : {}),
        };
      }
      const res = await publishPost(payload);
      showToast(`✅ Published to ${meta.label}!`, "green");
      if (res?.outstandPostId) {
        setPublishedUrl(
          platform === "youtube"
            ? `https://youtube.com/watch?v=${res.outstandPostId}`
            : `https://www.tiktok.com/@${(account?.username || "").replace(/^@/, "")}/video/${res.outstandPostId}`
        );
      }
      setTitle(""); setContent(""); setVideoUrl(""); setUploadedFileName(""); setTagsInput("");
    } catch (err: any) {
      showToast(err.message || `Failed to publish to ${meta.label}.`, "red");
    } finally {
      setIsPublishing(false);
    }
  };

  const toastColors: Record<string, string> = { default: "#0F1117", green: "#059669", red: "#EF4444", brand: "#F97316", amber: "#F59E0B" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes cpSpin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes cpFadeIn { from{opacity:0} to{opacity:1} }
        .cp-spinner { width: 15px; height: 15px; border-radius: 50%; border: 2px solid rgba(255,255,255,.4); border-top-color: #fff; animation: cpSpin .7s linear infinite; }
        .cp-radio { accent-color: #F97316; }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <AdminHeader pageTitle="Custom Posting" searchPlaceholder="Search…" />

        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 48px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>

            {/* ── Page title ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: meta.grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, color: "#fff", flexShrink: 0, boxShadow: `0 4px 14px ${meta.shadow}`, transition: "background .2s" }}>
                <i className={meta.icon} />
              </div>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 900, color: "#0B0C1A", fontFamily: "Sora,sans-serif", letterSpacing: "-.4px", marginBottom: 3 }}>Custom Posting</h1>
                <p style={{ fontSize: 13, color: "#8486AB" }}>Upload a video or paste a direct link, then publish it live — right now.</p>
              </div>
            </div>

            {/* ── Platform switcher ── */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, background: "#F0F1F9", padding: 5, borderRadius: 12 }}>
              {(Object.keys(PLATFORM_META) as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPlatform(p); setPublishedUrl(null); }}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "10px 14px", borderRadius: 9, fontSize: 13.5, fontWeight: 700, cursor: "pointer",
                    fontFamily: "Sora,sans-serif", border: "none",
                    background: platform === p ? "#fff" : "transparent",
                    color: platform === p ? "#0B0C1A" : "#8486AB",
                    boxShadow: platform === p ? "0 2px 8px rgba(11,12,26,.08)" : "none",
                    transition: "all .15s",
                  }}
                >
                  <i className={PLATFORM_META[p].icon} style={{ color: platform === p ? (p === "youtube" ? "#FF0000" : "#EE1D52") : "inherit" }} />
                  {PLATFORM_META[p].label}
                  {accounts[p] && (
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
                  )}
                </button>
              ))}
            </div>

            {checkingConnection ? (
              <div style={{ background: "#fff", border: "1px solid #E2E4F0", borderRadius: 14, padding: "40px 24px", textAlign: "center", color: "#8486AB", fontSize: 13.5 }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 8 }} /> Checking your connections…
              </div>
            ) : !account ? (
              /* ── Not connected — authentication only ── */
              <div style={{ background: "#fff", border: "1px solid #E2E4F0", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(11,12,26,.04)" }}>
                <div style={{ padding: "26px 26px 20px", borderBottom: "1px solid #F0F1F9" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#0B0C1A", fontFamily: "Sora,sans-serif", marginBottom: 6 }}>Connect your {meta.label} account</div>
                  <div style={{ fontSize: 13, color: "#8486AB", lineHeight: 1.55 }}>
                    Securely authorize Shoutly AI to publish on your behalf via OAuth 2.0. We never see or store your password.
                  </div>
                </div>
                <div style={{ padding: "18px 26px" }}>
                  {[`Click Authorize — you'll be redirected to ${meta.label}`, "Log in and approve Shoutly AI's access", "Grant permission to upload & manage videos", "You're redirected back automatically, connected instantly"].map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid #ECEDF8" : undefined }}>
                      <div style={{ width: 26, height: 26, borderRadius: 8, background: meta.tint, color: platform === "youtube" ? "#FF0000" : "#EE1D52", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Sora,sans-serif", marginTop: 1 }}>{i + 1}</div>
                      <div style={{ fontSize: 12.5, color: "#3D3F60", lineHeight: 1.5 }}>{step}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "16px 26px 22px" }}>
                  <button
                    onClick={startOAuth}
                    disabled={authorizing}
                    style={{ width: "100%", padding: 13, borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: authorizing ? "not-allowed" : "pointer", fontFamily: "Sora,sans-serif", background: meta.grad, color: "#fff", border: "none", opacity: authorizing ? .75 : 1, boxShadow: `0 4px 14px ${meta.shadow}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  >
                    <i className={authorizing ? "fa-solid fa-spinner fa-spin" : meta.icon} />
                    {authorizing ? "Redirecting…" : `Connect ${meta.label}`}
                  </button>
                </div>
              </div>
            ) : (
              /* ── Connected — Publish Now compose form ── */
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 10, background: "#ECFDF5", border: "1px solid rgba(16,185,129,.25)", marginBottom: 18 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#059669", fontFamily: "Sora,sans-serif" }}>
                    Connected{account.username ? ` — ${account.username}` : ""}
                  </span>
                </div>

                <div style={{ background: "#fff", border: "1px solid #E2E4F0", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(11,12,26,.04)" }}>

                  {/* Video source */}
                  <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #F0F1F9" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0B0C1A", fontFamily: "Sora,sans-serif", marginBottom: 10 }}>Video</div>

                    <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3D3F60", cursor: "pointer" }}>
                        <input type="radio" className="cp-radio" checked={videoSource === "upload"} onChange={() => { setVideoSource("upload"); setVideoUrl(""); setUploadedFileName(""); }} />
                        Upload a video file
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3D3F60", cursor: "pointer" }}>
                        <input type="radio" className="cp-radio" checked={videoSource === "url"} onChange={() => { setVideoSource("url"); setVideoUrl(""); setUploadedFileName(""); }} />
                        Paste a video URL
                      </label>
                    </div>

                    {videoSource === "upload" ? (
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                          disabled={isUploading}
                          style={{ display: "none" }}
                          id="cp-video-file"
                        />
                        <label
                          htmlFor="cp-video-file"
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                            padding: "22px 16px", borderRadius: 10, border: "1.5px dashed #E2E4F0",
                            background: "#FAFAFD", cursor: isUploading ? "not-allowed" : "pointer",
                            opacity: isUploading ? .75 : 1, textAlign: "center",
                          }}
                        >
                          {isUploading ? (
                            <>
                              <span className="cp-spinner" style={{ borderColor: "rgba(249,115,22,.3)", borderTopColor: "#F97316" }} />
                              <span style={{ fontSize: 13, fontWeight: 700, color: "#F97316", fontFamily: "Sora,sans-serif" }}>Uploading…</span>
                            </>
                          ) : videoUrl && uploadedFileName ? (
                            <>
                              <i className="fa-solid fa-circle-check" style={{ color: "#10B981" }} />
                              <span style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>{uploadedFileName}</span>
                              <span style={{ fontSize: 12, color: "#8486AB" }}>· click to replace</span>
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-cloud-arrow-up" style={{ color: "#8486AB" }} />
                              <span style={{ fontSize: 13, color: "#8486AB" }}>Click to choose a video file (MP4, MOV…)</span>
                            </>
                          )}
                        </label>
                      </div>
                    ) : (
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://example.com/video.mp4"
                        style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: "1.5px solid #E2E4F0", fontSize: 13, color: "#0B0C1A", fontFamily: "inherit" }}
                      />
                    )}

                    {videoUrl && (
                      <video src={videoUrl} controls style={{ width: "100%", maxHeight: 220, borderRadius: 10, marginTop: 12, background: "#000" }} />
                    )}
                  </div>

                  {/* Title + description/caption + tags (YouTube gets title/tags too) */}
                  <div style={{ padding: "20px 24px 18px", borderBottom: "1px solid #F0F1F9", display: "flex", flexDirection: "column", gap: 14 }}>
                    {platform === "youtube" && (
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#3D3F60", marginBottom: 6 }}>Title <span style={{ color: "#BFC1D9", fontWeight: 500 }}>(optional — defaults to first line of description)</span></div>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="My video title"
                          style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid #E2E4F0", fontSize: 13.5, color: "#0B0C1A", fontFamily: "inherit" }}
                        />
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#3D3F60", marginBottom: 6 }}>{platform === "youtube" ? "Description" : "Caption"}</div>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={platform === "youtube" ? "What's this video about?" : "Write a caption for your TikTok…"}
                        rows={4}
                        style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid #E2E4F0", fontSize: 13.5, color: "#0B0C1A", fontFamily: "inherit", resize: "vertical" }}
                      />
                    </div>
                    {platform === "youtube" && (
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#3D3F60", marginBottom: 6 }}>Tags <span style={{ color: "#BFC1D9", fontWeight: 500 }}>(comma-separated, optional)</span></div>
                        <input
                          type="text"
                          value={tagsInput}
                          onChange={(e) => setTagsInput(e.target.value)}
                          placeholder="marketing, launch, ai"
                          style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid #E2E4F0", fontSize: 13.5, color: "#0B0C1A", fontFamily: "inherit" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* YouTube-only options */}
                  {platform === "youtube" && (
                    <div style={{ padding: "18px 24px", borderBottom: "1px solid #F0F1F9", display: "flex", flexDirection: "column", gap: 14 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#3D3F60", marginBottom: 8 }}>Privacy</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          {(["public", "unlisted", "private"] as Privacy[]).map((p) => (
                            <button
                              key={p}
                              onClick={() => setPrivacyStatus(p)}
                              style={{
                                padding: "7px 16px", borderRadius: 20, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                                fontFamily: "Sora,sans-serif", textTransform: "capitalize",
                                background: privacyStatus === p ? meta.solid : "#F0F1F9",
                                color: privacyStatus === p ? "#fff" : "#3D3F60",
                                border: privacyStatus === p ? "none" : "1px solid #E2E4F0",
                              }}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 20 }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#3D3F60", cursor: "pointer" }}>
                          <input type="checkbox" checked={isShort} onChange={(e) => setIsShort(e.target.checked)} />
                          Publish as a Short
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#3D3F60", cursor: "pointer" }}>
                          <input type="checkbox" checked={madeForKids} onChange={(e) => setMadeForKids(e.target.checked)} />
                          Made for kids
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Publish */}
                  <div style={{ padding: "18px 24px" }}>
                    <button
                      onClick={handlePublishNow}
                      disabled={!canPublish}
                      style={{
                        width: "100%", padding: 13, borderRadius: 10, fontSize: 14, fontWeight: 700,
                        cursor: canPublish ? "pointer" : "not-allowed", fontFamily: "Sora,sans-serif",
                        background: canPublish ? meta.solid : "#F0F1F9",
                        color: canPublish ? "#fff" : "#BFC1D9", border: "none",
                        boxShadow: canPublish ? `0 4px 14px ${meta.shadow}` : "none",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      }}
                    >
                      {isPublishing ? <span className="cp-spinner" /> : <i className="fa-solid fa-paper-plane" />}
                      {isPublishing ? "Publishing…" : `Publish to ${meta.label}`}
                    </button>

                    {publishedUrl && (
                      <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 10, background: "#ECFDF5", border: "1px solid rgba(16,185,129,.25)", fontSize: 12.5, display: "flex", alignItems: "center", gap: 8 }}>
                        <i className="fa-solid fa-circle-check" style={{ color: "#10B981" }} />
                        <span style={{ color: "#059669", fontWeight: 600 }}>Live now:</span>
                        <a href={publishedUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#059669", wordBreak: "break-all" }}>{publishedUrl}</a>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Toasts ── */}
      <div style={{ position: "fixed", bottom: 24, right: 24, display: "flex", flexDirection: "column", gap: 8, zIndex: 999, pointerEvents: "none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 12, background: toastColors[t.type] || "#0F1117", color: "#fff", fontSize: 13, fontWeight: 600, boxShadow: "0 20px 50px rgba(11,12,26,.14)", animation: "cpFadeIn .2s ease", pointerEvents: "all", maxWidth: 340, border: "1px solid rgba(255,255,255,.08)" }}>
            <span style={{ flex: 1 }}>{t.msg}</span>
            <span onClick={() => removeToast(t.id)} style={{ opacity: .6, cursor: "pointer", padding: "2px 4px", marginLeft: "auto", flexShrink: 0, pointerEvents: "all" }}>✕</span>
          </div>
        ))}
      </div>
    </>
  );
}
