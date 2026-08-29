"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AdminHeader from "../../AdminHeader";
import {
  getConnectUrl,
  getConnectionStatus,
  getAccountsOverview,
  handlePlatformCallback,
  disconnectAccount,
  connectBluesky,
  getPinterestBoards,
  setPinterestDefaultBoard,
  createPinterestBoard,
  getPendingConnection,
  PinterestBoard,
  AvailablePage,
} from "@/api/autopostApi";

// ── Types ──────────────────────────────────────────────────────────────────
type PlatStatus = "connected" | "disconnected" | "attention";
type ModalType = "connect" | "disconnect" | "oauthLoading" | "connectBluesky" | "pinterestBoards" | "facebookPages" | null;

interface Feature { label: string; enabled: boolean }

interface Platform {
  id: string; name: string; icon: string; color: string; grad: string;
  desc: string; perms: string[];
  status: PlatStatus; accountCount: number; lastSync: string;
  publishing: "active" | "at risk" | "—";
  features: Feature[];
}

interface ConnectedAccount {
  id: string; brandName: string; brandInitials: string; brandColor: string;
  platformId: string; platformIcon: string; platformColor: string; platformGrad: string;
  handle: string; accountType: string; role: "Admin" | "Owner" | "Member";
  health: "Healthy" | "Needs refresh";
  followers: string; posts?: string; engagement?: string;
  connectedDate: string; lastSync: string; publishing: "active" | "at risk";
  permissions: string[]; workspace: string;
}

// ── Backend integration constants ───────────────────────────────────────────
// These go through /connect + /handle-callback successfully today. X and
// YouTube both use the same account_id/username/network callback shape as
// Instagram/LinkedIn — no special-casing needed. Threads' callback has no
// account_id at all (handled separately below); TikTok is wired the same way
// as X for now since its callback shape is unconfirmed — if it turns out to
// skip account_id like Threads did, the message-parsing fallback below will
// already catch it. Pinterest uses the plain account_id flow too (no special
// callback handling) but requires an extra board-selection step immediately
// after connecting — see the pinterestBoards modal below.
const PLATFORM_CONNECT_NAME: Record<string, string> = {
  fb: "facebook",
  ig: "instagram",
  x: "x",
  yt: "youtube",
  th: "threads",
  tk: "tiktok",
  pi: "pinterest",
};
// Bluesky has no OAuth step — POST /autopost/connect/bluesky with a
// handle + app password instead, so it's kept out of PLATFORM_CONNECT_NAME
// (which drives the OAuth redirect flow) but still counts as supported.
const BLUESKY_ID = "bs";
const BACKEND_TO_ID: Record<string, string> = {
  FACEBOOK: "fb",
  INSTAGRAM: "ig",
  LINKEDIN: "li",
  X: "x",
  YOUTUBE: "yt",
  THREADS: "th",
  TIKTOK: "tk",
  BLUESKY: BLUESKY_ID,
  PINTEREST: "pi",
};
const SUPPORTED_IDS = new Set([...Object.keys(PLATFORM_CONNECT_NAME), BLUESKY_ID]);
// Outstand's OAuth callback (per its own docs) comes back as e.g.
// "?success=true&account_id=...&username=..." — no "network" query param at
// all. So there's no way to tell which platform just connected from the
// callback URL alone. Instead, stash the platform here right before
// redirecting to Outstand, and read it back once the browser returns.
const PENDING_CONNECT_PLATFORM_KEY = "shoutly_pending_connect_platform";

// ── Static platform metadata (cosmetic only — live status/counts come from the API) ──
const INIT_PLATS: Platform[] = [

  { id:"fb", name:"Facebook", icon:"fa-brands fa-facebook", color:"#1877F2", grad:"linear-gradient(135deg,#1877F2,#0C52C5)", desc:"Reach billions via Pages, Groups & Reels", perms:["Manage Facebook Pages","Publish posts & reels","Access Page analytics","Moderate comments"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:true}] },
  { id:"li", name:"LinkedIn", icon:"fa-brands fa-linkedin", color:"#0A66C2", grad:"linear-gradient(135deg,#0A66C2,#0853A0)", desc:"Professional network for B2B growth", perms:["Share posts & articles","Manage Company Page","View follower analytics","Post on behalf of company"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:false}] },
  { id:"ig", name:"Instagram", icon:"fa-brands fa-instagram", color:"#E1306C", grad:"linear-gradient(135deg,#F77737,#E1306C,#C13584,#833AB4)", desc:"Share photos, Reels & Stories with 2B+ users", perms:["Publish photos & videos","Read post insights","Manage comments","Access follower data"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:true}] },
  { id:"x", name:"X", icon:"fa-brands fa-x-twitter", color:"#1A1A1A", grad:"linear-gradient(135deg,#1A1A1A,#444)", desc:"Real-time conversations & viral reach", perms:["Post & schedule tweets","Read account timeline","Access engagement metrics","Manage replies"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:false}] },
  { id:"tk", name:"TikTok", icon:"fa-brands fa-tiktok", color:"#010101", grad:"linear-gradient(135deg,#010101,#EE1D52,#69C9D0)", desc:"Short-form video for Gen-Z reach", perms:["Upload short videos","Read profile & followers","Access video analytics"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:true}] },
  { id:"pi", name:"Pinterest", icon:"fa-brands fa-pinterest", color:"#E60023", grad:"linear-gradient(135deg,#E60023,#AD0019)", desc:"Visual discovery for 450M+ monthly users", perms:["Create & schedule pins","Access analytics","Manage boards","Read audience insights"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:false}] },
  { id:"yt", name:"YouTube", icon:"fa-brands fa-youtube", color:"#FF0000", grad:"linear-gradient(135deg,#FF0000,#CC0000)", desc:"World's largest video platform", perms:["Upload & schedule videos","Manage channel","Post community updates","Read analytics"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:true}] },
  { id:"gb", name:"Google Business", icon:"fa-brands fa-google", color:"#4285F4", grad:"linear-gradient(135deg,#4285F4,#1A6CF0)", desc:"Manage your local Google presence", perms:["Publish business updates","Respond to reviews","Post offers & events","View insights"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:false}] },
  { id:"th", name:"Threads", icon:"fa-brands fa-threads", color:"#1A1A1A", grad:"linear-gradient(135deg,#1A1A1A,#444)", desc:"Text-first conversations from Instagram", perms:["Publish posts & replies","Read profile & followers","Access engagement metrics"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:false}] },
  { id:"bs", name:"Bluesky", icon:"fa-brands fa-bluesky", color:"#1185FE", grad:"linear-gradient(135deg,#1185FE,#0A66C2)", desc:"Decentralized social network on the AT Protocol", perms:["Publish posts","Read profile & followers","Access engagement metrics"], status:"disconnected", accountCount:0, lastSync:"—", publishing:"—", features:[{label:"Images",enabled:true},{label:"Text",enabled:true},{label:"Reel",enabled:false}] },

];

// Still static — no backend endpoint powers AI suggestions or an activity feed yet.
const AI_RECS = [
  { id:"r2", icon:"fa-brands fa-threads", iconBg:"#F0F1F9", iconColor:"#1A1A1A", title:"Connect Threads to increase your reach.", desc:"Your Instagram audience overlaps ~80% — same content, extra reach, zero effort.", action:"Connect Threads", primary:false },
  { id:"r3", icon:"fa-brands fa-youtube", iconBg:"#FEF2F2", iconColor:"#FF0000", title:"Your YouTube channel supports Shorts.", desc:"Shoutly can repurpose your 12 recent Reels into Shorts automatically.", action:"Enable Shorts", primary:false },
  { id:"r4", icon:"fa-brands fa-linkedin", iconBg:"#EFF6FF", iconColor:"#0A66C2", title:"You've connected LinkedIn but only scheduled 2 posts.", desc:"Your B2B audience is most active Tue–Thu mornings.", action:"Schedule posts", primary:false },
];

const RECENT_ACT = [
  { id:"t2", icon:"fa-brands fa-linkedin", iconBg:"#0A66C2", text:"LinkedIn refreshed automatically", time:"2h ago" },
  { id:"t3", icon:"fa-brands fa-youtube", iconBg:"#FF0000", text:"YouTube permissions updated — Shorts enabled", time:"Yesterday" },
];

// ── Skeleton primitives ─────────────────────────────────────────────────────
function Skel({ width, height, radius = 6, style = {} }: { width: string | number; height: string | number; radius?: number; style?: React.CSSProperties }) {
  return <div className="skel-shimmer" style={{ width, height, borderRadius: radius, ...style }} />;
}

function PlatCardSkeleton() {
  return (
    <div style={{ background:"#fff", border:"1px solid #E2E4F0", borderRadius:12, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 1px 4px rgba(11,12,26,.04)" }}>
      <div style={{ padding:"16px 16px 10px", display:"flex", alignItems:"center", gap:10 }}>
        <Skel width={42} height={42} radius={10} />
        <Skel width={74} height={14} />
      </div>
      <div style={{ margin:"0 16px 10px" }}>
        <Skel width={96} height={20} radius={6} />
      </div>
      <div style={{ padding:"0 16px 14px", display:"flex", flexWrap:"wrap", gap:5 }}>
        <Skel width={48} height={20} radius={20} />
        <Skel width={54} height={20} radius={20} />
        <Skel width={44} height={20} radius={20} />
      </div>
      <div style={{ padding:"11px 16px", borderTop:"1px solid #F0F1F9" }}>
        <Skel width="100%" height={34} radius={8} />
      </div>
    </div>
  );
}

function AccountRowSkeleton({ isLast }: { isLast?: boolean }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, padding:"16px 24px", borderBottom:isLast ? "none" : "1px solid #F0F1F9" }}>
      <Skel width={48} height={48} radius={14} />
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:8 }}>
        <Skel width="30%" height={14} />
        <Skel width="55%" height={12} />
      </div>
      <Skel width={96} height={26} radius={20} />
      <Skel width={104} height={34} radius={9} />
    </div>
  );
}

function StatSkeleton({ i, arr }: { i: number; arr: unknown[] }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, paddingRight:i<arr.length-1?20:0, marginRight:i<arr.length-1?20:0, borderRight:i<arr.length-1?"1px solid #ECEDF8":undefined }}>
      <Skel width={34} height={18} />
      <Skel width={54} height={9} />
    </div>
  );
}

// ── Toast hook ─────────────────────────────────────────────────────────────
interface ToastItem { id: number; msg: string; type: string }
function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);
  const show = (msg: string, type = "default") => {
    const id = ++counter.current;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3800);
  };
  const remove = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));
  return { toasts, show, remove };
}

// ── Platform Card ──────────────────────────────────────────────────────────
function PlatCard({ p, onConnect, onDisconnect }: {
  p: Platform;
  onConnect: (id: string, mode?: string) => void;
  onDisconnect: (id: string) => void;
}) {
  const isConn = p.status === "connected";
  const isAttn = p.status === "attention";
  const isSupported = SUPPORTED_IDS.has(p.id);
  const [connHover, setConnHover] = useState(false);

  return (
    <div
      className="accounts-plat-card"
      style={{ background:"#fff", border:`1px solid ${isAttn?"rgba(245,158,11,.25)":isConn?"rgba(249,115,22,.2)":"#E2E4F0"}`, borderRadius:12, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 1px 4px rgba(11,12,26,.04)", transition:"all .18s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow="0 6px 20px rgba(11,12,26,.08)"; (e.currentTarget as HTMLDivElement).style.transform="translateY(-2px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow="0 1px 4px rgba(11,12,26,.04)"; (e.currentTarget as HTMLDivElement).style.transform=""; }}
    >
      {/* Header */}
      <div style={{ padding:"16px 16px 10px", display:"flex", alignItems:"center", gap:10 }}>
        <div className="accounts-plat-icon" style={{ width:42, height:42, borderRadius:10, background:p.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, color:"#fff", flexShrink:0, boxShadow:"0 2px 8px rgba(11,12,26,.1)" }}>
          <i className={p.icon} />
        </div>
        <span className="accounts-plat-name" style={{ fontSize:14.5, fontWeight:800, color:"#0B0C1A", fontFamily:"Sora,sans-serif" }}>{p.name}</span>
      </div>

      {/* Status strip */}
      <div style={{ margin:"0 16px 10px", padding:"5px 10px", borderRadius:6, background:isAttn?"#FFFBEB":isConn?"#ECFDF5":"#F0F1F9", display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:7, height:7, borderRadius:"50%", background:isAttn?"#F59E0B":isConn?"#10B981":"#BFC1D9", animation:isConn?"connectedGlow 2s infinite":undefined, flexShrink:0 }} />
        <span style={{ fontSize:11.5, fontWeight:700, color:isAttn?"#B45309":isConn?"#059669":"#8486AB" }}>
          {isAttn?"Attention":isConn?"Connected":!isSupported?"Not available yet":"Not Connected"}

        </span>
      </div>

      {/* Feature chips */}
      <div style={{ padding:"0 16px 14px", display:"flex", flexWrap:"wrap", gap:5 }}>
        {p.features.map(f => (
          <span key={f.label} style={{ padding:"3px 11px", borderRadius:20, background:"#F0F1F9", border:"1px solid #E8E9F3", fontSize:11, fontWeight:600, color:f.enabled?"#3D3F60":"#BFC1D9", textDecoration:f.enabled?"none":"line-through" }}>
            {f.label}
          </span>
        ))}
      </div>

      {/* Button */}
      <div style={{ padding:"11px 16px", borderTop:"1px solid #F0F1F9" }}>
        {!isSupported ? (
          <button
            disabled
            style={{ width:"100%", padding:"6px 9px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"not-allowed", fontFamily:"Sora,sans-serif", background:"#F0F1F9", border:"1.5px solid #E2E4F0", color:"#BFC1D9" }}
          >
            Coming Soon
          </button>
        ) : isAttn ? (
          <button onClick={() => onConnect(p.id,"reconnect")} style={{ width:"100%", padding:"6px 9px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:"linear-gradient(115deg,#F97316,#EA580C)", color:"#fff", border:"none", boxShadow:"0 2px 8px rgba(249,115,22,.3)" }}>
            Reconnect
          </button>
        ) : isConn ? (
          <button
            onClick={() => onDisconnect(p.id)}
            title={`Disconnect ${p.name}`}
            onMouseEnter={() => setConnHover(true)}
            onMouseLeave={() => setConnHover(false)}
            style={{ width:"100%", padding:"6px 9px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:connHover?"#EF4444":"#059669", border:`1.5px solid ${connHover?"#EF4444":"#E2E4F0"}`, color:"#fff", transition:"all .14s" }}
          >
            {connHover ? (<><i className="fa-solid fa-unlink" style={{ marginRight:6 }} />Disconnect</>) : "Connected"}
          </button>
        ) : (
          <button onClick={() => onConnect(p.id)} style={{ width:"100%", padding:"6px 9px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:"linear-gradient(115deg,#F97316,#EA580C)", color:"#fff", border:"none", boxShadow:"0 2px 8px rgba(249,115,22,.3)" }}>
            Connect {p.name}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Connected Account Row ──────────────────────────────────────────────────
function AccountRow({ acc, showToast, isLast, onSelectBoard, onReconnect }: { acc: ConnectedAccount; showToast: (m: string, t?: string) => void; isLast?: boolean; onSelectBoard?: (accountId: string) => void; onReconnect?: (platformId: string) => void }) {
  const needsRefresh = acc.health === "Needs refresh";

  const platName: Record<string, string> = {
    ig:"Instagram", tk:"TikTok", li:"LinkedIn", fb:"Facebook",
    x:"X", yt:"YouTube", pi:"Pinterest", gb:"Google Business",
  };

  const meta = [
    platName[acc.platformId] || acc.platformId,
    acc.accountType,
    acc.followers,
    acc.posts ? `${acc.posts} posts` : "",
    acc.engagement ? `${acc.engagement} eng.` : "",
  ].filter(Boolean).join(" · ");

  return (
    <div className="accounts-account-row" style={{ display:"flex", alignItems:"center", gap:16, padding:"16px 24px", borderBottom:isLast ? "none" : "1px solid #F0F1F9" }}>
      <div style={{ width:48, height:48, borderRadius:14, background:acc.platformGrad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, color:"#fff", flexShrink:0, boxShadow:"0 2px 8px rgba(11,12,26,.12)" }}>
        <i className={acc.platformIcon} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div className="accounts-account-handle" style={{ fontSize:15, fontWeight:700, color:"#0B0C1A", fontFamily:"Sora,sans-serif", marginBottom:3 }}>{acc.handle}</div>
        <div style={{ fontSize:12.5, color:"#8486AB" }}>{meta}</div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:20, background:needsRefresh?"#FFF7ED":"#ECFDF5", border:`1px solid ${needsRefresh?"#FDBA74":"rgba(16,185,129,.25)"}`, flexShrink:0 }}>
        <span style={{ width:7, height:7, borderRadius:"50%", background:needsRefresh?"#F97316":"#10B981", flexShrink:0, display:"inline-block" }} />
        <span style={{ fontSize:12, fontWeight:700, color:needsRefresh?"#EA580C":"#059669", fontFamily:"Sora,sans-serif", whiteSpace:"nowrap" }}>
          {needsRefresh ? "Reconnect" : "Connected"}
        </span>
      </div>
      {needsRefresh && (
        <button
          onClick={() => onReconnect ? onReconnect(acc.platformId) : showToast(`Reconnecting ${acc.handle}…`, "brand")}
          style={{ padding:"9px 20px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:"linear-gradient(135deg,#6366F1,#4F46E5)", color:"#fff", border:"none", whiteSpace:"nowrap", flexShrink:0, boxShadow:"0 2px 10px rgba(99,102,241,.35)" }}>
          Reconnect
        </button>
      )}
      {acc.platformId === "pi" && onSelectBoard && (
        <button
          onClick={() => onSelectBoard(acc.id)}
          style={{ padding:"9px 16px", borderRadius:9, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:"#fff", border:"1.5px solid #E2E4F0", color:"#3D3F60", whiteSpace:"nowrap", flexShrink:0 }}>
          Select board
        </button>
      )}
    </div>
  );
}

// ── Connect Modal ──────────────────────────────────────────────────────────
function ConnectModal({ p, mode, onAuthorize, onClose, authorizing }: { p: Platform; mode: string; onAuthorize: () => void; onClose: () => void; authorizing: boolean }) {
  return (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:14, padding:"20px 22px", borderBottom:"1px solid #E2E4F0" }}>
        <div style={{ width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:25, color:"#fff", flexShrink:0, background:p.grad }}>
          <i className={p.icon} />
        </div>
        <div>
          <div style={{ fontSize:18, fontWeight:900, color:"#0B0C1A", fontFamily:"Sora,sans-serif" }}>{mode==="reconnect"?"Reconnect":"Connect"} {p.name}</div>
          <div style={{ fontSize:12, color:"#8486AB", marginTop:2 }}>Secure OAuth 2.0 · We never store your password</div>
        </div>
      </div>
      <div style={{ padding:"18px 22px" }}>
        {["Click Authorize — you'll be securely redirected to "+p.name, "Log in to "+p.name+" if prompted and approve Shoutly AI", "Grant the required permissions for AI posting to work", "Redirected back automatically — your account goes live instantly ✅"].map((step, i) => (
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"10px 0", borderBottom:i<3?"1px solid #ECEDF8":undefined }}>
            <div style={{ width:26, height:26, borderRadius:8, background:"#EEEEFF", color:"#F97316", fontSize:12, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontFamily:"Sora,sans-serif", marginTop:1 }}>{i+1}</div>
            <div style={{ fontSize:12.5, color:"#3D3F60", lineHeight:1.5 }}>{step}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"0 22px 14px" }}>
        <div style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".5px", color:"#8486AB", marginBottom:7 }}>Permissions Requested</div>
        {p.perms.map(pr => (
          <div key={pr} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", fontSize:12.5, color:"#3D3F60" }}>
            <i className="fa-solid fa-circle-check" style={{ color:"#10B981", fontSize:11, flexShrink:0 }} />{pr}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:8, padding:"14px 22px", borderTop:"1px solid #E2E4F0", background:"#F0F1F9" }}>
        <button onClick={onClose} disabled={authorizing} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:"#fff", border:"1.5px solid #E2E4F0", color:"#3D3F60" }}>Cancel</button>
        <button onClick={onAuthorize} disabled={authorizing} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:"linear-gradient(115deg,#F97316,#EA580C)", color:"#fff", border:"none", opacity:authorizing?0.7:1 }}>
          <i className={authorizing ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-lock"} style={{ marginRight:6 }} />
          {authorizing ? "Redirecting…" : `Authorize ${p.name}`}
        </button>
      </div>
    </>
  );
}

// ── Disconnect Modal ───────────────────────────────────────────────────────
function DisconnectModal({ p, onConfirm, onClose, disconnecting }: { p: Platform; onConfirm: () => void; onClose: () => void; disconnecting: boolean }) {
  return (
    <>
      <div style={{ padding:"20px 22px 16px", borderBottom:"1px solid #E2E4F0", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:42, height:42, borderRadius:11, background:"#FEF2F2", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
          <i className="fa-solid fa-unlink" style={{ color:"#EF4444" }} />
        </div>
        <div>
          <div style={{ fontSize:16, fontWeight:800, color:"#0B0C1A", fontFamily:"Sora,sans-serif" }}>Disconnect {p.name}?</div>
          <div style={{ fontSize:12, color:"#8486AB", marginTop:2 }}>All automation for this account will stop immediately</div>
        </div>
      </div>
      <div style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:6 }}>
        {[{icon:"fa-xmark",col:"#EF4444",txt:`All queued posts for ${p.name} will be paused`},{icon:"fa-xmark",col:"#EF4444",txt:"API token & access revoked immediately"},{icon:"fa-xmark",col:"#EF4444",txt:"Analytics sync will stop"},{icon:"fa-check",col:"#10B981",txt:"Post history & content drafts are preserved"},{icon:"fa-check",col:"#10B981",txt:"Reconnect anytime with one click"}].map(r => (
          <div key={r.txt} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 11px", borderRadius:8, background:"#F0F1F9", border:"1px solid #ECEDF8", fontSize:12.5, color:"#3D3F60" }}>
            <i className={`fa-solid ${r.icon}`} style={{ fontSize:11, color:r.col, flexShrink:0, width:13, textAlign:"center" }} />{r.txt}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:8, padding:"14px 22px", borderTop:"1px solid #E2E4F0", background:"#F0F1F9" }}>
        <button onClick={onClose} disabled={disconnecting} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:disconnecting?"not-allowed":"pointer", fontFamily:"Sora,sans-serif", background:"#fff", border:"1.5px solid #E2E4F0", color:"#3D3F60", opacity:disconnecting?0.6:1 }}>Cancel</button>
        <button onClick={onConfirm} disabled={disconnecting} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:disconnecting?"not-allowed":"pointer", fontFamily:"Sora,sans-serif", background:"#EF4444", color:"#fff", border:"none", opacity:disconnecting?0.7:1 }}>
          <i className={disconnecting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-unlink"} style={{ marginRight:6 }} />
          {disconnecting ? "Disconnecting…" : `Disconnect ${p.name}`}
        </button>
      </div>
    </>
  );
}

// ── Bluesky Connect Modal (no OAuth — handle + app password) ───────────────
function BlueskyConnectModal({
  handle, appPassword, onHandleChange, onAppPasswordChange, onSubmit, onClose, connecting,
}: {
  handle: string; appPassword: string;
  onHandleChange: (v: string) => void; onAppPasswordChange: (v: string) => void;
  onSubmit: () => void; onClose: () => void; connecting: boolean;
}) {
  const bs = INIT_PLATS.find(p => p.id === BLUESKY_ID)!;
  return (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:14, padding:"20px 22px", borderBottom:"1px solid #E2E4F0" }}>
        <div style={{ width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:25, color:"#fff", flexShrink:0, background:bs.grad }}>
          <i className={bs.icon} />
        </div>
        <div>
          <div style={{ fontSize:18, fontWeight:900, color:"#0B0C1A", fontFamily:"Sora,sans-serif" }}>Connect Bluesky</div>
          <div style={{ fontSize:12, color:"#8486AB", marginTop:2 }}>No OAuth — use your handle + an app password</div>
        </div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div style={{ padding:"18px 22px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:9, background:"#EFF6FF", border:"1px solid #BFDBFE", fontSize:12, color:"#1D4ED8", lineHeight:1.5 }}>
            <i className="fa-solid fa-circle-info" style={{ marginTop:1, flexShrink:0 }} />
            <span>
              Use an <strong>app password</strong> from{" "}
              <a href="https://bsky.app/settings/app-passwords" target="_blank" rel="noopener noreferrer" style={{ color:"#1D4ED8", fontWeight:700 }}>
                bsky.app/settings/app-passwords
              </a>{" "}— never your main Bluesky password. It's sent once to create the session and isn't stored on our side.
            </span>
          </div>
          <div>
            <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:"#3D3F60", marginBottom:6 }}>Handle</label>
            <input
              type="text"
              value={handle}
              onChange={(e) => onHandleChange(e.target.value)}
              placeholder="you.bsky.social"
              disabled={connecting}
              autoComplete="off"
              style={{ width:"100%", padding:"10px 12px", borderRadius:9, border:"1.5px solid #E2E4F0", fontSize:13.5, color:"#0B0C1A", fontFamily:"inherit" }}
            />
          </div>
          <div>
            <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:"#3D3F60", marginBottom:6 }}>Password</label>
            <input
              type="password"
              value={appPassword}
              onChange={(e) => onAppPasswordChange(e.target.value)}
              placeholder="xxxx-xxxx-xxxx-xxxx"
              disabled={connecting}
              autoComplete="off"
              style={{ width:"100%", padding:"10px 12px", borderRadius:9, border:"1.5px solid #E2E4F0", fontSize:13.5, color:"#0B0C1A", fontFamily:"inherit" }}
            />
          </div>
        </div>
        <div style={{ display:"flex", gap:8, padding:"14px 22px", borderTop:"1px solid #E2E4F0", background:"#F0F1F9" }}>
          <button type="button" onClick={onClose} disabled={connecting} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:connecting?"not-allowed":"pointer", fontFamily:"Sora,sans-serif", background:"#fff", border:"1.5px solid #E2E4F0", color:"#3D3F60", opacity:connecting?0.6:1 }}>Cancel</button>
          <button type="submit" disabled={connecting} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:connecting?"not-allowed":"pointer", fontFamily:"Sora,sans-serif", background:bs.grad, color:"#fff", border:"none", opacity:connecting?0.7:1 }}>
            <i className={connecting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-lock"} style={{ marginRight:6 }} />
            {connecting ? "Connecting…" : "Connect Bluesky"}
          </button>
        </div>
      </form>
    </>
  );
}

// ── Pinterest Board Picker Modal ────────────────────────────────────────────
// Shown immediately after a Pinterest connection succeeds. Every Pin needs a
// board and there's no sensible default to fall back to, so the user picks
// (or creates) one here before going back to the normal dashboard flow. Once
// saved, every publish/schedule call for this account uses it automatically.
function PinterestBoardModal({
  boards, loading, saving, showCreateForm, newBoardName, newBoardPrivacy,
  onToggleCreateForm, onNewBoardNameChange, onNewBoardPrivacyChange,
  onPick, onCreate, onSkip,
}: {
  boards: PinterestBoard[]; loading: boolean; saving: boolean;
  showCreateForm: boolean; newBoardName: string; newBoardPrivacy: "PUBLIC" | "SECRET";
  onToggleCreateForm: (v: boolean) => void;
  onNewBoardNameChange: (v: string) => void;
  onNewBoardPrivacyChange: (v: "PUBLIC" | "SECRET") => void;
  onPick: (board: PinterestBoard) => void;
  onCreate: () => void;
  onSkip: () => void;
}) {
  const pi = INIT_PLATS.find(p => p.id === "pi")!;
  return (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:14, padding:"20px 22px", borderBottom:"1px solid #E2E4F0" }}>
        <div style={{ width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:25, color:"#fff", flexShrink:0, background:pi.grad }}>
          <i className={pi.icon} />
        </div>
        <div>
          <div style={{ fontSize:18, fontWeight:900, color:"#0B0C1A", fontFamily:"Sora,sans-serif" }}>Pinterest connected — pick a board</div>
          <div style={{ fontSize:12, color:"#8486AB", marginTop:2 }}>Every Pin needs a board. Choose or create one now.</div>
        </div>
      </div>

      <div style={{ padding:"14px 22px 0" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:9, background:"#FFFBEB", border:"1px solid #FDE68A", fontSize:12, color:"#92400E", lineHeight:1.5 }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ marginTop:1, flexShrink:0 }} />
          <span>
            Publishing is currently blocked on Pinterest&apos;s side (Trial API access) — this
            board is saved and ready, so posts will start going through automatically once
            Standard access is granted. No action needed here for that.
          </span>
        </div>
      </div>

      <div style={{ padding:"16px 22px", minHeight:120 }}>
        {loading ? (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[0,1,2].map(i => <Skel key={i} width="100%" height={44} radius={9} />)}
          </div>
        ) : showCreateForm ? (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:"#3D3F60", marginBottom:6 }}>Board name</label>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => onNewBoardNameChange(e.target.value)}
                placeholder="e.g. Product Launches"
                disabled={saving}
                autoFocus
                style={{ width:"100%", padding:"10px 12px", borderRadius:9, border:"1.5px solid #E2E4F0", fontSize:13.5, color:"#0B0C1A", fontFamily:"inherit" }}
              />
            </div>
            <div>
              <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:"#3D3F60", marginBottom:6 }}>Privacy</label>
              <div style={{ display:"flex", gap:8 }}>
                {(["PUBLIC","SECRET"] as const).map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onNewBoardPrivacyChange(opt)}
                    disabled={saving}
                    style={{ flex:1, padding:"9px", borderRadius:8, fontSize:12.5, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:newBoardPrivacy===opt?"#FEE2E2":"#F0F1F9", border:`1.5px solid ${newBoardPrivacy===opt?"#E60023":"#E2E4F0"}`, color:newBoardPrivacy===opt?"#E60023":"#3D3F60" }}
                  >
                    {opt === "PUBLIC" ? "Public" : "Secret"}
                  </button>
                ))}
              </div>
            </div>
            {boards.length > 0 && (
              <button type="button" onClick={() => onToggleCreateForm(false)} disabled={saving} style={{ alignSelf:"flex-start", background:"none", border:"none", color:"#E60023", fontSize:12.5, fontWeight:700, cursor:"pointer", padding:0 }}>
                ← Pick an existing board instead
              </button>
            )}
          </div>
        ) : boards.length === 0 ? (
          <div style={{ textAlign:"center", padding:"12px 0", color:"#8486AB", fontSize:13 }}>
            No boards yet on this Pinterest account.
            <div style={{ marginTop:10 }}>
              <button type="button" onClick={() => onToggleCreateForm(true)} style={{ padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:pi.grad, color:"#fff", border:"none" }}>
                Create your first board
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:6, maxHeight:260, overflowY:"auto" }}>
            {boards.map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => onPick(b)}
                disabled={saving}
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, padding:"11px 14px", borderRadius:9, border:"1.5px solid #E2E4F0", background:"#fff", cursor:saving?"not-allowed":"pointer", textAlign:"left", fontFamily:"inherit" }}
              >
                <span style={{ minWidth:0 }}>
                  <span style={{ display:"block", fontSize:13.5, fontWeight:700, color:"#0B0C1A", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.name}</span>
                  <span style={{ fontSize:11.5, color:"#8486AB" }}>{b.privacy === "SECRET" ? "Secret" : "Public"} · {b.pin_count} pin{b.pin_count===1?"":"s"}</span>
                </span>
                <i className="fa-solid fa-chevron-right" style={{ fontSize:11, color:"#BFC1D9", flexShrink:0 }} />
              </button>
            ))}
            <button type="button" onClick={() => onToggleCreateForm(true)} disabled={saving} style={{ marginTop:4, padding:"9px", borderRadius:9, border:"1.5px dashed #E2E4F0", background:"#F0F1F9", color:"#3D3F60", fontSize:12.5, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif" }}>
              <i className="fa-solid fa-plus" style={{ marginRight:6 }} />Create a new board instead
            </button>
          </div>
        )}
      </div>

      <div style={{ display:"flex", gap:8, padding:"14px 22px", borderTop:"1px solid #E2E4F0", background:"#F0F1F9" }}>
        <button onClick={onSkip} disabled={saving} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:saving?"not-allowed":"pointer", fontFamily:"Sora,sans-serif", background:"#fff", border:"1.5px solid #E2E4F0", color:"#3D3F60", opacity:saving?0.6:1 }}>
          Do this later
        </button>
        {showCreateForm && (
          <button onClick={onCreate} disabled={saving || !newBoardName.trim()} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:(saving || !newBoardName.trim())?"not-allowed":"pointer", fontFamily:"Sora,sans-serif", background:pi.grad, color:"#fff", border:"none", opacity:(saving || !newBoardName.trim())?0.7:1 }}>
            <i className={saving ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-check"} style={{ marginRight:6 }} />
            {saving ? "Saving…" : "Create & use this board"}
          </button>
        )}
      </div>
    </>
  );
}

// ── Facebook Page Picker Modal ──────────────────────────────────────────────
// Facebook's OAuth callback carries a session token instead of an account_id
// because the connecting user may manage more than one Page and we don't
// know which one(s) they want yet. This lists every Page Facebook granted
// access to (nothing pre-checked) and only connects the ones the user ticks —
// auto-selecting all of them was the actual bug: Facebook OAuth would
// silently connect all-or-nothing with no visible choice.
function FacebookPageModal({
  pages, selectedIds, loading, connecting, error,
  onToggle, onConfirm, onClose,
}: {
  pages: AvailablePage[]; selectedIds: string[]; loading: boolean; connecting: boolean; error: string | null;
  onToggle: (id: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const fb = INIT_PLATS.find(p => p.id === "fb")!;
  return (
    <>
      <div style={{ display:"flex", alignItems:"center", gap:14, padding:"20px 22px", borderBottom:"1px solid #E2E4F0" }}>
        <div style={{ width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:25, color:"#fff", flexShrink:0, background:fb.grad }}>
          <i className={fb.icon} />
        </div>
        <div>
          <div style={{ fontSize:18, fontWeight:900, color:"#0B0C1A", fontFamily:"Sora,sans-serif" }}>Choose a Page to connect</div>
          <div style={{ fontSize:12, color:"#8486AB", marginTop:2 }}>Facebook authorized more than one Page — pick the one you want to connect.</div>
        </div>
      </div>

      <div style={{ padding:"16px 22px", minHeight:120 }}>
        {error && (
          <div style={{ marginBottom:12, padding:"10px 12px", borderRadius:9, background:"#FEF2F2", border:"1px solid #FECACA", fontSize:12.5, color:"#B91C1C" }}>
            {error}
          </div>
        )}
        {loading ? (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[0,1,2].map(i => <Skel key={i} width="100%" height={44} radius={9} />)}
          </div>
        ) : pages.length === 0 ? (
          <div style={{ textAlign:"center", padding:"12px 0", color:"#8486AB", fontSize:13 }}>
            No Pages found for this Facebook login.
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:6, maxHeight:260, overflowY:"auto" }}>
            {pages.map(page => {
              const checked = selectedIds.includes(page.id);
              const label = String(page.name || page.username || page.id);
              return (
                <label
                  key={page.id}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:9, border:`1.5px solid ${checked?"#1877F2":"#E2E4F0"}`, background:checked?"#EFF6FF":"#fff", cursor:connecting?"not-allowed":"pointer" }}
                >
                  <input
                    type="radio"
                    name="facebook-page"
                    checked={checked}
                    disabled={connecting}
                    onChange={() => onToggle(page.id)}
                    style={{ width:16, height:16, flexShrink:0, accentColor:"#1877F2" }}
                  />
                  <span style={{ fontSize:13.5, fontWeight:700, color:"#0B0C1A", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ display:"flex", gap:8, padding:"14px 22px", borderTop:"1px solid #E2E4F0", background:"#F0F1F9" }}>
        <button onClick={onClose} disabled={connecting} style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:connecting?"not-allowed":"pointer", fontFamily:"Sora,sans-serif", background:"#fff", border:"1.5px solid #E2E4F0", color:"#3D3F60", opacity:connecting?0.6:1 }}>
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={connecting || selectedIds.length === 0}
          style={{ flex:1, padding:11, borderRadius:10, fontSize:13.5, fontWeight:700, cursor:(connecting || selectedIds.length===0)?"not-allowed":"pointer", fontFamily:"Sora,sans-serif", background:fb.grad, color:"#fff", border:"none", opacity:(connecting || selectedIds.length===0)?0.6:1 }}
        >
          <i className={connecting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-check"} style={{ marginRight:6 }} />
          {connecting ? "Connecting…" : "Connect Page"}
        </button>
      </div>
    </>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function SocialAccountsPage() {
  const [plats, setPlats] = useState<Platform[]>(INIT_PLATS);
  const [liveAccounts, setLiveAccounts] = useState<ConnectedAccount[]>([]);
  const [totals, setTotals] = useState<{ totalFollowers: number; avgEngagementRate: number } | null>(null);
  const [modal, setModal] = useState<{ type: ModalType; platId?: string; mode?: string }>({ type: null });
  const [authorizing, setAuthorizing] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [blueskyHandle, setBlueskyHandle] = useState("");
  const [blueskyAppPassword, setBlueskyAppPassword] = useState("");
  const [blueskyConnecting, setBlueskyConnecting] = useState(false);
  const [pinterestAccountId, setPinterestAccountId] = useState<string | null>(null);
  const [pinterestBoards, setPinterestBoards] = useState<PinterestBoard[]>([]);
  const [pinterestBoardsLoading, setPinterestBoardsLoading] = useState(false);
  const [pinterestSavingBoard, setPinterestSavingBoard] = useState(false);
  const [pinterestShowCreateForm, setPinterestShowCreateForm] = useState(false);
  const [pinterestNewBoardName, setPinterestNewBoardName] = useState("");
  const [pinterestNewBoardPrivacy, setPinterestNewBoardPrivacy] = useState<"PUBLIC" | "SECRET">("PUBLIC");
  const [fbSessionToken, setFbSessionToken] = useState<string | null>(null);
  const [fbAvailablePages, setFbAvailablePages] = useState<AvailablePage[]>([]);
  const [fbSelectedPageIds, setFbSelectedPageIds] = useState<string[]>([]);
  const [fbPagesLoading, setFbPagesLoading] = useState(false);
  const [fbPagesError, setFbPagesError] = useState<string | null>(null);
  const [fbConnecting, setFbConnecting] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, show: showToast, remove: removeToast } = useToasts();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Pulls connection-status + accounts-overview and merges into `plats` / `liveAccounts`
  const loadAccountsAndAnalytics = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("shoutly_token") : null;
    if (!token) { setIsLoading(false); return; }

    try {
      const [statusRes, overviewRes] = await Promise.all([
        getConnectionStatus(),
        getAccountsOverview(),
      ]);

      const statusByPlatform: Record<string, any> = {};
      (statusRes?.platforms || []).forEach((p: any) => { statusByPlatform[p.platform] = p; });
      const overviewByPlatform = overviewRes?.platforms || {};

      setPlats(prev => prev.map(p => {
        const backendKey = Object.keys(BACKEND_TO_ID).find(k => BACKEND_TO_ID[k] === p.id);
        if (!backendKey) return p; // unsupported platform, leave static/disabled

        const status = statusByPlatform[backendKey];
        const overview = overviewByPlatform[backendKey];

        if (!status || !status.connected) {
          return { ...p, status: "disconnected" as PlatStatus, accountCount: 0, lastSync: "—", publishing: "—" as const };
        }

        const accounts = status.accounts || [];
        const acc = accounts[0];
        // Any account whose token needs a refresh (the same real per-account
        // field the account list's "Needs refresh" badge reads) demotes the
        // whole platform card to "attention" instead of "connected".
        const needsAttention = accounts.some((a: any) => a.status !== "active");
        return {
          ...p,
          status: (needsAttention ? "attention" : "connected") as PlatStatus,
          accountCount: accounts.length,
          lastSync: acc?.lastSync ? new Date(acc.lastSync).toLocaleString() : "—",
          publishing: needsAttention ? ("at risk" as const) : ("active" as const),
        };
      }));

      // Build the flat connected-accounts list. Role/health/connectedDate/workspace
      // have no backend source today — placeholders are marked below.
      const built: ConnectedAccount[] = [];
      (statusRes?.platforms || []).forEach((p: any) => {
        if (!p.connected) return;
        const meta = plats.find(m => BACKEND_TO_ID[p.platform] === m.id) ?? INIT_PLATS.find(m => BACKEND_TO_ID[p.platform] === m.id);
        if (!meta) return;
        const overview = overviewByPlatform[p.platform];

        (p.accounts || []).forEach((acc: any) => {
          built.push({
            id: acc.id,
            brandName: "Your Workspace",       // placeholder — no brand/org field in schema
            brandInitials: "YW",
            brandColor: "#7C3AED",
            platformId: BACKEND_TO_ID[p.platform],
            platformIcon: meta.icon,
            platformColor: meta.color,
            platformGrad: meta.grad,
            handle: acc.username ? `@${acc.username.replace(/^@/, "")}` : "Connected Account",
            accountType: "Account",             // placeholder — page/profile/channel type not stored
            followers: overview?.followers != null ? `${overview.followers} followers` : "",
            role: "Owner",                      // placeholder — no per-account role field
            health: acc.status === "active" ? "Healthy" : "Needs refresh",
            connectedDate: "—",                 // placeholder — createdAt isn't returned by connection-status today
            lastSync: acc.lastSync ? new Date(acc.lastSync).toLocaleString() : "—",
            publishing: acc.status === "active" ? "active" : "at risk",
            permissions: meta.perms,
            workspace: "Your Workspace",
          });
        });
      });
      setLiveAccounts(built);

      setTotals(overviewRes?.totals
        ? { totalFollowers: overviewRes.totals.totalFollowers, avgEngagementRate: overviewRes.totals.avgEngagementRate }
        : null);
    } catch (err) {
      showToast("Couldn't load account data. Try refreshing.", "red");
    } finally {
      setIsLoading(false);
    }
  };

  // On mount: finalize an OAuth redirect if we just came back from Outstand, then load real data
  useEffect(() => {
    const sessionToken = searchParams.get("session"); // Facebook — snake_case in URL
    const accountId = searchParams.get("account_id");       // Instagram / LinkedIn / X / YouTube
    const successParam = searchParams.get("success");       // Threads (and maybe TikTok): a sentence, not "true"/"false"
    const isMessageShape = !!successParam && successParam !== "true" && successParam !== "false";

    // Outstand's callback URL never actually includes a "network" param — the
    // platform we were connecting was stashed in localStorage right before
    // the redirect (see startOAuth), so read it back here instead.
    const pendingPlatform = localStorage.getItem(PENDING_CONNECT_PLATFORM_KEY) ?? undefined;

    const finalize = async () => {
      // Facebook (and other multi-page platforms) don't finish connecting on
      // arrival — the callback only carries a session token because the user
      // may manage more than one Page. Fetch the Pages Facebook granted
      // access to and let the user pick before calling handle-callback;
      // auto-selecting all of them was the actual bug (silent all-or-nothing
      // connect with no visible choice).
      if (sessionToken) {
        router.replace("/dashboards/settings/accounts");
        localStorage.removeItem(PENDING_CONNECT_PLATFORM_KEY);
        setFbSessionToken(sessionToken);
        setFbAvailablePages([]);
        setFbSelectedPageIds([]);
        setFbPagesError(null);
        setModal({ type: "facebookPages" });
        setFbPagesLoading(true);
        try {
          const res = await getPendingConnection(sessionToken);
          setFbAvailablePages(res.availablePages || []);
        } catch (err: any) {
          setFbPagesError(err.message || "Failed to load available Pages.");
        } finally {
          setFbPagesLoading(false);
        }
        await loadAccountsAndAnalytics();
        return;
      }

      // Set only when a Pinterest connection succeeds — the board picker is
      // opened at the very end, after the URL cleanup + data reload below
      // have both fully settled, so nothing mid-navigation can clobber it.
      let openPinterestFor: string | null = null;

      try {
        if (accountId) {
          const network = searchParams.get("network") ?? pendingPlatform;
          const payload = {
            account_id: accountId,
            network_unique_id: searchParams.get("network_unique_id") ?? undefined,
            username: searchParams.get("username") ?? undefined,
            network,
          };
          const result = await handlePlatformCallback(payload);
          showToast("Account connected successfully!", "green");
          if (network === "pinterest" && result?.account?.id) {
            openPinterestFor = result.account.id;
          }
        } else if (isMessageShape) {
          // Threads (and possibly TikTok, per Outstand) skip account_id entirely and
          // just return a sentence like "Threads account @handle connected successfully"
          // — pull the handle and platform name out of the text itself.
          const handle = successParam!.match(/@([\w.]+)/)?.[1];
          const network = successParam!.match(/^([A-Za-z]+)\s+account/)?.[1]?.toLowerCase()
            ?? searchParams.get("network") ?? pendingPlatform;
          if (handle && network) {
            await handlePlatformCallback({ username: handle, network });
            showToast("Account connected successfully!", "green");
          } else {
            showToast("Couldn't parse the account from the connection response.", "red");
          }
        } else if (successParam === "false") {
          showToast(searchParams.get("error") || "Connection was cancelled or declined.", "red");
        }
      } catch (err: any) {
        showToast(err.message || "Failed to finalize connection", "red");
      } finally {
        localStorage.removeItem(PENDING_CONNECT_PLATFORM_KEY);
        if (accountId || successParam) {
          router.replace("/dashboards/settings/accounts");
        }
        await loadAccountsAndAnalytics();
      }

      // Pinterest needs a board picked before anything can publish — show
      // that now, as the last step, once the page has settled.
      if (openPinterestFor) {
        openPinterestBoardPicker(openPinterestFor);
      }
    };

    finalize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connCount = plats.filter(p => p.status === "connected").length;
  const attnCount = plats.filter(p => p.status === "attention").length;
  const totalAccs = liveAccounts.length;
  const healthyAccs = liveAccounts.filter(a => a.health === "Healthy").length;

  const openConnect = (platId: string, mode = "connect") => {
    if (!SUPPORTED_IDS.has(platId)) {
      showToast("This platform isn't available to connect yet.", "amber" as any);
      return;
    }
    if (platId === BLUESKY_ID) {
      setBlueskyHandle(""); setBlueskyAppPassword("");
      setModal({ type: "connectBluesky", platId, mode });
      return;
    }
    setModal({ type:"connect", platId, mode });
  };
  const openDisconnect = (platId: string) => setModal({ type:"disconnect", platId });
  const closeModal = () => { if (!authorizing && !disconnecting && !blueskyConnecting && !pinterestSavingBoard && !fbConnecting) setModal({ type:null }); };

  // Facebook page picker — nothing pre-selected, an explicit choice rather
  // than an assumption. Only one Page can be connected at a time.
  const toggleFacebookPage = (id: string) => {
    setFbSelectedPageIds([id]);
  };

  const confirmFacebookPages = async () => {
    if (!fbSessionToken || fbSelectedPageIds.length === 0 || fbConnecting) return;
    setFbConnecting(true);
    setFbPagesError(null);
    try {
      await handlePlatformCallback({ sessionToken: fbSessionToken, selectedPageIds: fbSelectedPageIds });
      showToast("Account connected successfully!", "green");
      setModal({ type: null });
      setFbSessionToken(null);
      setFbAvailablePages([]);
      setFbSelectedPageIds([]);
      await loadAccountsAndAnalytics();
    } catch (err: any) {
      setFbPagesError(err.message || "Failed to connect the selected Page(s).");
    } finally {
      setFbConnecting(false);
    }
  };

  // Pinterest needs a board selected before anything can publish — fetch this
  // account's boards and show the picker immediately after connecting, before
  // the user goes back to normal dashboard use.
  const openPinterestBoardPicker = async (accountId: string) => {
    setPinterestAccountId(accountId);
    setPinterestShowCreateForm(false);
    setPinterestNewBoardName("");
    setPinterestNewBoardPrivacy("PUBLIC");
    setPinterestBoards([]);
    setModal({ type: "pinterestBoards" });
    setPinterestBoardsLoading(true);
    try {
      const res = await getPinterestBoards(accountId);
      const boards = res.boards || [];
      setPinterestBoards(boards);
      if (boards.length === 0) setPinterestShowCreateForm(true);
    } catch (err: any) {
      showToast(err.message || "Couldn't load Pinterest boards.", "red");
      setPinterestShowCreateForm(true);
    } finally {
      setPinterestBoardsLoading(false);
    }
  };

  const pickPinterestBoard = async (board: PinterestBoard) => {
    if (!pinterestAccountId || pinterestSavingBoard) return;
    setPinterestSavingBoard(true);
    try {
      await setPinterestDefaultBoard(pinterestAccountId, board.id, board.name);
      showToast(`"${board.name}" set as the default Pinterest board.`, "green");
      setModal({ type: null });
      loadAccountsAndAnalytics();
    } catch (err: any) {
      showToast(err.message || "Failed to save the selected board.", "red");
    } finally {
      setPinterestSavingBoard(false);
    }
  };

  const submitCreatePinterestBoard = async () => {
    if (!pinterestAccountId || pinterestSavingBoard) return;
    const name = pinterestNewBoardName.trim();
    if (!name) return;
    setPinterestSavingBoard(true);
    try {
      await createPinterestBoard(pinterestAccountId, name, pinterestNewBoardPrivacy);
      showToast(`"${name}" created and set as the default board.`, "green");
      setModal({ type: null });
      loadAccountsAndAnalytics();
    } catch (err: any) {
      showToast(err.message || "Failed to create the board.", "red");
    } finally {
      setPinterestSavingBoard(false);
    }
  };

  // Bluesky skips OAuth entirely — handle + app password go straight to our
  // backend, which creates the AT Protocol session on Outstand itself.
  const submitBlueskyConnect = async () => {
    if (blueskyConnecting) return;
    const handle = blueskyHandle.trim();
    const appPassword = blueskyAppPassword.trim();
    if (!handle || !appPassword) {
      showToast("Enter both your Bluesky handle and app password.", "amber");
      return;
    }
    setBlueskyConnecting(true);
    try {
      await connectBluesky(handle, appPassword);
      showToast("Bluesky connected successfully!", "green");
      setModal({ type: null });
      loadAccountsAndAnalytics();
    } catch (err: any) {
      showToast(err.message || "Failed to connect Bluesky account.", "red");
    } finally {
      setBlueskyAppPassword(""); // never keep the app password around longer than the request
      setBlueskyConnecting(false);
    }
  };

  // Redirects the browser to Outstand's OAuth page for the given platform
  const startOAuth = async (platId: string) => {
    const network = PLATFORM_CONNECT_NAME[platId];
    if (!network) {
      showToast("This platform isn't available to connect yet.", "red");
      return;
    }
    setAuthorizing(true);
    try {
      // Send this page's own URL as the redirect target — omitting it makes
      // the backend fall back to its production default, which redirects to
      // the live Shoutly app instead of back here (e.g. localhost during dev).
      const redirectUri = `${window.location.origin}/dashboards/settings/accounts`;
      const res = await getConnectUrl(network, redirectUri);
      localStorage.setItem(PENDING_CONNECT_PLATFORM_KEY, network);
      window.location.href = res.redirectUrl;
    } catch (err: any) {
      showToast(err.message || "Connect failed. Please try again.", "red");
      setAuthorizing(false);
    }
  };

  // Disconnects every connected account under this platform via
  // DELETE /autopost/accounts/:id (accountId is the internal SocialAccount.id,
  // not the Outstand id), then reloads from the backend so the UI reflects
  // what's actually connected rather than a locally-guessed state.
  const confirmDisconnect = async (platId: string) => {
    if (disconnecting) return;
    const platName = plats.find(p => p.id === platId)?.name || platId;
    const accountsToRemove = liveAccounts.filter(a => a.platformId === platId);

    if (accountsToRemove.length === 0) {
      closeModal();
      return;
    }

    setDisconnecting(true);
    try {
      const results = await Promise.allSettled(accountsToRemove.map(a => disconnectAccount(a.id)));
      const failed = results.filter(r => r.status === "rejected");

      if (failed.length === 0) {
        showToast(`${platName} disconnected successfully.`, "green");
      } else if (failed.length < results.length) {
        showToast(`${platName} partially disconnected — ${failed.length} of ${results.length} accounts failed.`, "amber");
      } else {
        const reason = failed[0] as PromiseRejectedResult;
        showToast(reason.reason?.message || `Failed to disconnect ${platName}.`, "red");
      }
    } finally {
      setDisconnecting(false);
      closeModal();
      loadAccountsAndAnalytics();
    }
  };

  const filteredAccounts = liveAccounts.filter(a =>
    searchQ === "" ||
    a.brandName.toLowerCase().includes(searchQ.toLowerCase()) ||
    a.handle.toLowerCase().includes(searchQ.toLowerCase()) ||
    a.platformId.toLowerCase().includes(searchQ.toLowerCase())
  );

  const workspaceGroups = filteredAccounts.reduce<Record<string, ConnectedAccount[]>>((acc, a) => {
    if (!acc[a.workspace]) acc[a.workspace] = [];
    acc[a.workspace].push(a);
    return acc;
  }, {});

  const activePlat = plats.find(p => p.id === modal.platId);
  const toastColors: Record<string, string> = { default:"#0F1117", green:"#059669", red:"#EF4444", brand:"#F97316", amber:"#F59E0B" };

  const sortedPlats = [...plats].sort((a, b) => {
    const order: Record<PlatStatus, number> = { attention:0, connected:1, disconnected:2 };
    return order[a.status] - order[b.status];
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #E2E4F0; border-radius: 3px; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes connectedGlow { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.4)} 50%{box-shadow:0 0 0 6px rgba(16,185,129,0)} }
        @keyframes toastSlide { from{transform:translateX(120%)} to{transform:translateX(0)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .skel-shimmer { background:linear-gradient(90deg,#EEEFF6 25%,#E4E6F1 37%,#EEEFF6 63%); background-size:400% 100%; animation:shimmer 1.4s ease infinite; }
        @media (min-width: 768px) {
          .accounts-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 50 !important;
            background: #fff !important;
            border-bottom: 1px solid #E4E5EF !important;
          }
          .accounts-wrapper {
            margin-top: 56px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .accounts-wrapper {
            padding: 20px 20px 40px !important;
          }
          .accounts-title-section {
            flex-wrap: wrap !important;
            gap: 14px !important;
          }
          .accounts-title-section p {
            max-width: 100% !important;
          }
          .accounts-health-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .accounts-stats-row {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .accounts-stat-item {
            padding: 8px 6px !important;
            margin: 0 !important;
            border: 1px solid #ECEDF8 !important;
            border-radius: 8px !important;
            background: #FAFAFD !important;
          }
          .accounts-platforms-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
          }
          .accounts-header-section {
            flex-wrap: wrap !important;
            gap: 10px !important;
          }
          .accounts-account-row {
            padding: 14px 18px !important;
            gap: 12px !important;
          }
          .accounts-account-row button {
            padding: 8px 14px !important;
            font-size: 12.5px !important;
          }
          .accounts-bottom-grid {
            gap: 12px !important;
          }
          .accounts-bottom-card {
            padding: 16px 18px !important;
          }
        }
        @media (max-width: 767px) {
          .accounts-header {
            display: none !important;
          }
          .accounts-wrapper {
            padding: 8px 8px 32px !important;
          }
          .accounts-title-section {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            margin-bottom: 16px !important;
          }
          .accounts-title-section h1 {
            font-size: 18px !important;
            margin-bottom: 3px !important;
          }
          .accounts-title-section p {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
          .accounts-title-section > div:last-child {
            width: 100% !important;
            flex-direction: column !important;
            gap: 6px !important;
          }
          .accounts-title-section button {
            width: 100% !important;
            justify-content: center !important;
            padding: 7px 12px !important;
            font-size: 12px !important;
          }
          .accounts-health-card {
            border-radius: 10px !important;
            margin-bottom: 16px !important;
          }
          .accounts-health-card > div:first-child {
            padding: 12px 14px 10px !important;
          }
          .accounts-health-icon {
            width: 28px !important;
            height: 28px !important;
            font-size: 12px !important;
          }
          .accounts-health-title {
            font-size: 13px !important;
            margin-bottom: 2px !important;
          }
          .accounts-health-desc {
            font-size: 11px !important;
            line-height: 1.3 !important;
          }
          .accounts-health-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 14px !important;
          }
          .accounts-stats-row {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px 8px !important;
            width: 100% !important;
            flex-shrink: 1 !important;
          }
          .accounts-stat-item {
            flex: none !important;
            align-items: flex-start !important;
            padding: 8px 10px !important;
            margin: 0 !important;
            border: 1px solid #ECEDF8 !important;
            border-radius: 8px !important;
            background: #FAFAFD !important;
          }
          .accounts-stat-value {
            font-size: 15px !important;
          }
          .accounts-stat-label {
            font-size: 8.5px !important;
            margin-top: 2px !important;
          }
          .accounts-platforms-header {
            margin-bottom: 10px !important;
          }
          .accounts-platforms-header h2 {
            font-size: 14px !important;
          }
          .accounts-platforms-header span {
            font-size: 11px !important;
          }
          .accounts-platforms-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .accounts-header-section {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            padding: 12px 12px 10px !important;
          }
          .accounts-header-section h2 {
            font-size: 14px !important;
            margin-bottom: 1px !important;
          }
          .accounts-header-section p {
            font-size: 11px !important;
            line-height: 1.3 !important;
          }
          .accounts-header-section > div:last-child {
            width: 100% !important;
            padding: 5px 10px !important;
            font-size: 11px !important;
          }
          .accounts-container {
            border-radius: 10px !important;
            margin-bottom: 16px !important;
          }
          .accounts-plat-card {
            border-radius: 10px !important;
            padding: 10px !important;
          }
          .accounts-plat-icon {
            width: 32px !important;
            height: 32px !important;
            font-size: 16px !important;
          }
          .accounts-plat-name {
            font-size: 13px !important;
          }
          .accounts-account-row {
            padding: 10px 12px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .accounts-account-row > div:first-child {
            width: 32px !important;
            height: 32px !important;
            font-size: 14px !important;
          }
          .accounts-account-row > div:nth-child(2) {
            width: 100% !important;
          }
          .accounts-account-row > div:nth-child(3) {
            width: 100% !important;
            font-size: 11px !important;
          }
          .accounts-account-row button {
            width: 100% !important;
            padding: 7px 14px !important;
            font-size: 12px !important;
          }
          .accounts-account-handle {
            font-size: 12px !important;
            margin-bottom: 2px !important;
          }
          .accounts-account-row > div:nth-child(2) > div:last-child {
            font-size: 10px !important;
          }
          .accounts-bottom-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .accounts-bottom-card {
            border-radius: 10px !important;
            padding: 14px 14px !important;
          }
          .accounts-bottom-card h3 {
            font-size: 13px !important;
            margin-bottom: 10px !important;
          }
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <AdminHeader className="accounts-header" pageTitle="Social Accounts" searchPlaceholder="Search accounts…" />

        <div className="accounts-wrapper" style={{ flex:1, overflowY:"auto", padding:"28px 28px 48px" }}>

          {/* ── Page title ── */}
          <div className="accounts-title-section" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24, gap:20 }}>
            <div>
              <h1 style={{ fontSize:24, fontWeight:900, color:"#0B0C1A", fontFamily:"Sora,sans-serif", letterSpacing:"-.5px", marginBottom:5 }}>Social Media Accounts</h1>
              <p style={{ fontSize:13.5, color:"#8486AB", maxWidth:460, lineHeight:1.55 }}>Connect your social media accounts once and let AI publish content automatically across every platform.</p>
            </div>
          </div>

          {/* ── Health status card ── */}
          <div className="accounts-health-card" style={{ background:"#fff", border:"1px solid #E2E4F0", borderRadius:14, marginBottom:28, overflow:"hidden" }}>
            <div style={{ padding:"18px 22px 16px", borderBottom: attnCount > 0 ? "1px dashed #E2E4F0" : undefined }}>
              <div className="accounts-health-row" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:20 }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  {isLoading ? (
                    <Skel width={36} height={36} radius={10} />
                  ) : (
                    <div className="accounts-health-icon" style={{ width:36, height:36, borderRadius:10, background: attnCount > 0 ? "#FFFBEB" : "#ECFDF5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color: attnCount > 0 ? "#F59E0B" : "#10B981", flexShrink:0, marginTop:2 }}>
                      <i className={attnCount > 0 ? "fa-solid fa-triangle-exclamation" : "fa-solid fa-shield-halved"} />
                    </div>
                  )}
                  {isLoading ? (
                    <div style={{ display:"flex", flexDirection:"column", gap:7, marginTop:3 }}>
                      <Skel width={190} height={14} />
                      <Skel width={280} height={12} />
                    </div>
                  ) : (
                    <div>
                      <div className="accounts-health-title" style={{ fontSize:15, fontWeight:800, color:"#0B0C1A", fontFamily:"Sora,sans-serif", marginBottom:3 }}>
                        {attnCount > 0 ? "Almost everything is healthy" : "Everything is healthy"}
                      </div>
                      <div className="accounts-health-desc" style={{ fontSize:12.5, color:"#8486AB", lineHeight:1.4 }}>
                        {attnCount > 0 ? `${attnCount} platform${attnCount!==1?"s":""} need${attnCount===1?"s":""} a quick reconnect — publishing continues everywhere else.` : "All connected platforms are publishing normally."}
                      </div>
                    </div>
                  )}
                </div>
                <div className="accounts-stats-row" style={{ display:"flex", gap:0, flexShrink:0 }}>
                  {isLoading ? (
                    [0,1,2,3].map((i, _, arr) => <StatSkeleton key={i} i={i} arr={arr} />)
                  ) : (
                    [
                      { v:`${connCount}/${SUPPORTED_IDS.size}`, l:"PLATFORMS" },
                      { v:String(totalAccs), l:"ACCOUNTS" },
                      { v:String(healthyAccs), l:"HEALTHY" },
                      { v:String(attnCount), l:"NEEDS ATTENTION", warn:true },
                    ].map((s, i, arr) => (
                      <div key={s.l} className="accounts-stat-item" style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingRight:i<arr.length-1?20:0, marginRight:i<arr.length-1?20:0, borderRight:i<arr.length-1?"1px solid #ECEDF8":undefined }}>
                        <div className="accounts-stat-value" style={{ fontSize:20, fontWeight:900, fontFamily:"Sora,sans-serif", color:s.warn?"#F59E0B":"#0B0C1A", letterSpacing:"-.5px" }}>{s.v}</div>
                        <div className="accounts-stat-label" style={{ fontSize:9.5, fontWeight:700, color:"#BFC1D9", letterSpacing:".5px", marginTop:2, textTransform:"uppercase" }}>{s.l}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {attnCount > 0 && (
              <div style={{ padding:"12px 22px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ flex:1, fontSize:13, color:"#3D3F60" }}>
                  Some platforms need attention. <span style={{ color:"#8486AB" }}>Reconnect them to avoid paused posts.</span>
                </span>
              </div>
            )}
          </div>

          {/* ── Supported Platforms ── */}
          <div style={{ marginBottom:32 }}>
            <div className="accounts-platforms-header" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <h2 style={{ fontSize:16, fontWeight:800, color:"#0B0C1A", fontFamily:"Sora,sans-serif" }}>Supported platforms</h2>
              <span style={{ fontSize:12, color:"#8486AB" }}>Connected platforms appear first</span>
            </div>
            <div className="accounts-platforms-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => <PlatCardSkeleton key={i} />)
                : sortedPlats.map(p => (
                    <PlatCard key={p.id} p={p} onConnect={openConnect} onDisconnect={openDisconnect} />
                  ))}
            </div>
          </div>

          {/* ── Connected Accounts ── */}
          <div style={{ marginBottom:32 }}>
            {isLoading ? (
              <div style={{ background:"#fff", border:"1px solid #E2E4F0", borderRadius:16, overflow:"hidden", boxShadow:"0 1px 4px rgba(11,12,26,.04)" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"20px 24px 14px", borderBottom:"1px solid #F0F1F9" }}>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    <Skel width={170} height={17} />
                    <Skel width={230} height={13} />
                  </div>
                  <Skel width={110} height={26} radius={20} />
                </div>
                <div>
                  {[0,1,2].map(i => <AccountRowSkeleton key={i} isLast={i===2} />)}
                </div>
              </div>
            ) : Object.keys(workspaceGroups).length === 0 ? (
              <div style={{ background:"#fff", border:"1px dashed #E2E4F0", borderRadius:16, padding:"40px 24px", textAlign:"center", color:"#8486AB", fontSize:13.5 }}>
                No accounts connected yet. Connect a platform above to get started.
              </div>
            ) : Object.entries(workspaceGroups).map(([ws, accounts]) => {
              const needsAttn = accounts.filter(a => a.health === "Needs refresh").length;
              const connectedCount = accounts.filter(a => a.health === "Healthy").length;
              return (
                <div key={ws} className="accounts-container" style={{ background:"#fff", border:"1px solid #E2E4F0", borderRadius:16, overflow:"hidden", marginBottom:20, boxShadow:"0 1px 4px rgba(11,12,26,.04)" }}>
                  <div className="accounts-header-section" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"20px 24px 14px", borderBottom:"1px solid #F0F1F9" }}>
                    <div>
                      <h2 style={{ fontSize:17, fontWeight:800, color:"#0B0C1A", fontFamily:"Sora,sans-serif", marginBottom:5 }}>Connected accounts</h2>
                      <p style={{ fontSize:13, color:"#8486AB" }}>
                        {connectedCount} of {accounts.length} networks connected. Posts publish to every connected profile.
                      </p>
                    </div>
                    {needsAttn > 0 ? (
                      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 13px", borderRadius:20, background:"#FFF7ED", border:"1px solid #FDBA74", flexShrink:0 }}>
                        <span style={{ width:7, height:7, borderRadius:"50%", background:"#F97316", display:"inline-block" }} />
                        <span style={{ fontSize:12, fontWeight:700, color:"#EA580C", fontFamily:"Sora,sans-serif" }}>{needsAttn} need{needsAttn===1?"s":""} attention</span>
                      </div>
                    ) : (
                      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 13px", borderRadius:20, background:"#ECFDF5", border:"1px solid rgba(16,185,129,.25)", flexShrink:0 }}>
                        <span style={{ width:7, height:7, borderRadius:"50%", background:"#10B981", display:"inline-block" }} />
                        <span style={{ fontSize:12, fontWeight:700, color:"#059669", fontFamily:"Sora,sans-serif" }}>All systems healthy</span>
                      </div>
                    )}
                  </div>
                  <div>
                    {accounts.map((acc, i) => (
                      <AccountRow key={acc.id} acc={acc} showToast={showToast} isLast={i === accounts.length - 1} onSelectBoard={openPinterestBoardPicker} onReconnect={startOAuth} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── AI Recommendations (static — no backend source yet) ── */}
          {/* <div style={{ marginBottom:32 }}>
            <h2 style={{ fontSize:16, fontWeight:800, color:"#0B0C1A", fontFamily:"Sora,sans-serif", marginBottom:14 }}>AI recommendations</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {AI_RECS.map(r => (
                <div key={r.id} style={{ background:"#fff", border:"1px solid #E2E4F0", borderRadius:12, padding:"14px 20px", display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:r.iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>
                    <i className={r.icon} style={{ color:r.iconColor }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:700, color:"#0B0C1A", marginBottom:2 }}>{r.title}</div>
                    <div style={{ fontSize:12, color:"#8486AB", lineHeight:1.4 }}>{r.desc}</div>
                  </div>
                  <button
                    onClick={() => showToast(`${r.action}…`,"brand")}
                    style={{ padding:"8px 18px", borderRadius:8, fontSize:12.5, fontWeight:700, cursor:"pointer", fontFamily:"Sora,sans-serif", background:r.primary?"linear-gradient(115deg,#F97316,#EA580C)":"#fff", color:r.primary?"#fff":"#3D3F60", border:r.primary?"none":"1.5px solid #E2E4F0", whiteSpace:"nowrap", flexShrink:0, boxShadow:r.primary?"0 2px 10px rgba(249,115,22,.3)":undefined }}
                  >
                    {r.action}
                  </button>
                </div>
              ))}
            </div>
          </div> */}

          {/* ── Security + Recent Activity ── */}
          <div className="accounts-bottom-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div className="accounts-bottom-card" style={{ background:"#fff", border:"1px solid #E2E4F0", borderRadius:14, padding:"22px 24px" }}>
              <h3 style={{ fontSize:15, fontWeight:800, color:"#0B0C1A", fontFamily:"Sora,sans-serif", marginBottom:14 }}>Security</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
                {[
                  { icon:"fa-solid fa-shield-halved", txt:"Secure sign-in with each platform — Shoutly never sees your passwords" },
                  { icon:"fa-solid fa-lock", txt:"Connection credentials are encrypted at rest" },
                  { icon:"fa-solid fa-check", txt:"No password storage — revoke access anytime from here" },
                ].map(s => (
                  <div key={s.txt} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:13, color:"#3D3F60" }}>
                    <i className={s.icon} style={{ color:"#10B981", fontSize:13, marginTop:1, flexShrink:0 }} />
                    <span>{s.txt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="accounts-bottom-card" style={{ background:"#fff", border:"1px solid #E2E4F0", borderRadius:14, padding:"22px 24px" }}>
              <h3 style={{ fontSize:15, fontWeight:800, color:"#0B0C1A", fontFamily:"Sora,sans-serif", marginBottom:14 }}>Recent activity</h3>
              <div style={{ display:"flex", flexDirection:"column" }}>
                {RECENT_ACT.map((a, i) => (
                  <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:i<RECENT_ACT.length-1?"1px solid #F0F1F9":undefined }}>
                    <div style={{ width:30, height:30, borderRadius:8, background:a.iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#fff", flexShrink:0 }}>
                      <i className={a.icon} />
                    </div>
                    <span style={{ flex:1, fontSize:12.5, color:"#3D3F60", minWidth:0 }}>{a.text}</span>
                    <span style={{ fontSize:11, color:"#BFC1D9", whiteSpace:"nowrap", fontFamily:"JetBrains Mono,monospace" }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Modal ── */}
      {modal.type && (
        <div
          id="modal-bg"
          onClick={e => { if ((e.target as HTMLElement).id==="modal-bg") closeModal(); }}
          style={{ position:"fixed", inset:0, background:"rgba(11,12,26,.5)", backdropFilter:"blur(10px)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn .18s ease" }}
        >
          <div style={{ background:"#fff", border:"1px solid #E2E4F0", borderRadius:20, width:"100%", maxWidth:"500px", overflow:"hidden", boxShadow:"0 32px 80px rgba(11,12,26,.2)", animation:"scaleIn .22s cubic-bezier(.34,1.56,.64,1)", position:"relative" }}>
            {modal.type==="connect" && activePlat && <ConnectModal p={activePlat} mode={modal.mode||"connect"} onAuthorize={() => startOAuth(activePlat.id)} onClose={closeModal} authorizing={authorizing} />}
            {modal.type==="disconnect" && activePlat && <DisconnectModal p={activePlat} onConfirm={() => confirmDisconnect(activePlat.id)} onClose={closeModal} disconnecting={disconnecting} />}
            {modal.type==="connectBluesky" && (
              <BlueskyConnectModal
                handle={blueskyHandle}
                appPassword={blueskyAppPassword}
                onHandleChange={setBlueskyHandle}
                onAppPasswordChange={setBlueskyAppPassword}
                onSubmit={() => void submitBlueskyConnect()}
                onClose={closeModal}
                connecting={blueskyConnecting}
              />
            )}
            {modal.type==="pinterestBoards" && (
              <PinterestBoardModal
                boards={pinterestBoards}
                loading={pinterestBoardsLoading}
                saving={pinterestSavingBoard}
                showCreateForm={pinterestShowCreateForm}
                newBoardName={pinterestNewBoardName}
                newBoardPrivacy={pinterestNewBoardPrivacy}
                onToggleCreateForm={setPinterestShowCreateForm}
                onNewBoardNameChange={setPinterestNewBoardName}
                onNewBoardPrivacyChange={setPinterestNewBoardPrivacy}
                onPick={(board) => void pickPinterestBoard(board)}
                onCreate={() => void submitCreatePinterestBoard()}
                onSkip={closeModal}
              />
            )}
            {modal.type==="facebookPages" && (
              <FacebookPageModal
                pages={fbAvailablePages}
                selectedIds={fbSelectedPageIds}
                loading={fbPagesLoading}
                connecting={fbConnecting}
                error={fbPagesError}
                onToggle={toggleFacebookPage}
                onConfirm={() => void confirmFacebookPages()}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      )}

      {/* ── Toasts ── */}
      <div style={{ position:"fixed", bottom:24, right:24, display:"flex", flexDirection:"column", gap:8, zIndex:999, pointerEvents:"none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", borderRadius:12, background:toastColors[t.type]||"#0F1117", color:"#fff", fontSize:13, fontWeight:600, boxShadow:"0 20px 50px rgba(11,12,26,.14)", animation:"toastSlide .3s cubic-bezier(.34,1.56,.64,1)", pointerEvents:"all", maxWidth:340, border:"1px solid rgba(255,255,255,.08)" }}>
            <span style={{ flex:1 }}>{t.msg}</span>
            <span onClick={() => removeToast(t.id)} style={{ opacity:.6, cursor:"pointer", padding:"2px 4px", marginLeft:"auto", flexShrink:0, pointerEvents:"all" }}>✕</span>
          </div>
        ))}
      </div>
    </>
  );
}
