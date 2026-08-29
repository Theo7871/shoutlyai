import axios from "axios";
import { API_BASE_URL } from "./configApi";

/* ──────────────────────────────────────────────────────────────
   AXIOS CLIENT (OLD – KEEP THIS FOR AUTH + INTERCEPTORS)
────────────────────────────────────────────────────────────── */
const autopostClient = axios.create({
  baseURL: API_BASE_URL,
});

autopostClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("shoutly_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

autopostClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("shoutly_token");
        localStorage.removeItem("shoutly_user");

        if (!window.location.pathname.includes("/sign-in")) {
          window.location.href = `/sign-in?next=${encodeURIComponent(
            window.location.pathname + window.location.search
          )}`;
        }
      }
    }
    return Promise.reject(error);
  }
);

/* ──────────────────────────────────────────────────────────────
   FETCH BASE (NEW SYSTEM)
────────────────────────────────────────────────────────────── */
const API_BASE = "https://ai-shoutly-backend.onrender.com/api/autopost";

function authHeaders() {
  const token = localStorage.getItem("shoutly_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/* ──────────────────────────────────────────────────────────────
   TYPES (MERGED)
────────────────────────────────────────────────────────────── */
export type Platform =
  | "x"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "pinterest"
  | "threads"
  | "bluesky"
  | "google_business";

export interface ConnectResponse {
  redirectUrl: string;
}

export interface HandleCallbackPayload {
  sessionToken?: string;
  selectedPageIds?: string[];
  account_id?: string;
  network_unique_id?: string;
  username?: string;
  network?: string;
}

// Facebook (and other multi-page platforms) two-step flow: one entry per Page
// the connecting user granted access to on Facebook's own consent screen.
// The user picks which of these to actually connect via handlePlatformCallback.
export interface AvailablePage {
  id: string;
  name?: string;
  username?: string;
  [key: string]: unknown;
}

export interface PendingConnectionResponse {
  success: boolean;
  availablePages: AvailablePage[];
}

export interface YoutubeOptions {
  isShort?: boolean;
  privacyStatus?: "public" | "private" | "unlisted";
  title?: string;
  tags?: string[];
  madeForKids?: boolean;
  categoryId?: string;
}

export interface PublishPayload {
  content: string;
  platforms: string[];
  mediaUrls?: string[];
  youtube?: YoutubeOptions;
}

export interface PostItem {
  content: string;
  scheduledAt: string;
  mediaUrls?: string[];
  youtube?: YoutubeOptions;
}

export interface MediaUploadResponse {
  success: boolean;
  url: string;
  filename: string;
}

export interface BlueskyConnectResponse {
  success: boolean;
  message: string;
  account?: Record<string, unknown>;
}

export interface HandleCallbackResponse {
  success: boolean;
  message: string;
  account?: { id: string; [key: string]: unknown };
}

export interface PinterestBoard {
  id: string;
  name: string;
  privacy: "PUBLIC" | "SECRET" | string;
  pin_count: number;
}

export interface SchedulePayload {
  platforms: string[];
  posts: PostItem[];
}

/* ──────────────────────────────────────────────────────────────
   NEW FUNCTIONS (FETCH)
────────────────────────────────────────────────────────────── */

/** Get OAuth redirect URL. `redirectUri` is where Outstand sends the browser
 *  back to after the user authorizes — omit it and the backend falls back to
 *  its production default (the live Shoutly app), which is wrong when
 *  testing from localhost or any non-production origin. Callers should pass
 *  the current page's URL so the callback lands back where the user started. */
export async function getConnectUrl(network: string, redirectUri?: string): Promise<ConnectResponse> {
  const res = await fetch(`${API_BASE}/connect`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ platform: network, ...(redirectUri ? { redirectUri } : {}) }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch authorization URL");

  return data;
}

/** Connects a Bluesky account. Unlike every other platform, Bluesky has no
 *  OAuth step — the handle + an app password (never the user's main
 *  password) are submitted directly in one call, which both creates the AT
 *  Protocol session on Outstand and saves the account against the logged-in
 *  user. Nothing else to call afterward. The app password must never be
 *  logged, stored, or cached beyond this single request. */
export async function connectBluesky(handle: string, appPassword: string): Promise<BlueskyConnectResponse> {
  const res = await fetch(`${API_BASE}/connect/bluesky`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ handle: handle.replace(/^@/, ""), appPassword }),
  });

  const data = await res.json();
  if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to connect Bluesky account");

  return data;
}

/** Get connected accounts */
export async function getConnectionStatus() {
  const res = await fetch(`${API_BASE}/connection-status`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch connection status");
  return res.json();
}

export interface BestTimePlatform {
  platform: string;
  connected: boolean;
  recommendedTime: string | null; // "HH:MM" 24h, or null if this platform has no benchmark entry
  note: string | null;
  source: "BENCHMARK";
}

/** Benchmark best-time-to-post suggestions per platform — industry-benchmark
 *  windows (e.g. "Instagram does well around 11am"), NOT a per-account AI
 *  score. There's no engagement/performance tracking in the backend yet to
 *  compute a real per-account recommendation from, so this intentionally
 *  returns the same benchmark time for every user rather than faking
 *  precision. Used by the Smart Scheduling settings page. */
export async function getBestTimes(): Promise<{ success: boolean; platforms: BestTimePlatform[] }> {
  const res = await fetch(`${API_BASE}/best-times`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch best-time suggestions");
  return res.json();
}

/** Analytics overview */
export async function getAccountsOverview() {
  const res = await fetch(`${API_BASE}/accounts-overview`, {
    method: "GET",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch accounts overview");
  return res.json();
}

/** Fetches the Pages Facebook granted access to for a pending connection,
 *  WITHOUT connecting any of them yet, so the UI can show a real picker.
 *  Call this when the OAuth callback arrives with ?session=<token> instead
 *  of account_id. */
export async function getPendingConnection(sessionToken: string): Promise<PendingConnectionResponse> {
  const res = await fetch(`${API_BASE}/pending/${encodeURIComponent(sessionToken)}`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json();
  if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to load available Pages");

  return data;
}

/** Handle OAuth callback */
export async function handlePlatformCallback(payload: HandleCallbackPayload): Promise<HandleCallbackResponse> {
  const res = await fetch(`${API_BASE}/handle-callback`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to finalize connection");

  return data;
}

/** Lists the boards belonging to one connected Pinterest account. `accountId`
 *  is the internal SocialAccount.id (the same id used everywhere else — the
 *  `account.id` returned by handlePlatformCallback right after connecting,
 *  or connection-status's `accounts[].id`), not Outstand's account id. The
 *  backend scopes this strictly to that account and rejects it (404) if it
 *  doesn't belong to the logged-in user. */
export async function getPinterestBoards(accountId: string): Promise<{ success: boolean; boards: PinterestBoard[] }> {
  const res = await fetch(`${API_BASE}/accounts/${accountId}/pinterest/boards`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json();
  if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to load Pinterest boards");

  return data;
}

/** Saves an existing board as the account's default — every future publish/
 *  schedule call for this account then uses it automatically with no
 *  `pinterest` field required in the request. */
export async function setPinterestDefaultBoard(
  accountId: string,
  boardId: string,
  boardName: string
): Promise<{ success: boolean; defaultBoardId: string; defaultBoardName: string }> {
  const res = await fetch(`${API_BASE}/accounts/${accountId}/pinterest/default-board`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ boardId, boardName }),
  });

  const data = await res.json();
  if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to set default Pinterest board");

  return data;
}

/** Creates a new Pinterest board for the account and saves it as the default
 *  in one call — no separate call to setPinterestDefaultBoard needed
 *  afterward. Used when the account has no boards yet, or the user wants a
 *  fresh one instead of picking an existing board. */
export async function createPinterestBoard(
  accountId: string,
  name: string,
  privacy: "PUBLIC" | "SECRET" = "PUBLIC",
  description?: string
): Promise<{ success: boolean; board: PinterestBoard }> {
  const res = await fetch(`${API_BASE}/accounts/${accountId}/pinterest/boards`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name, privacy, ...(description ? { description } : {}) }),
  });

  const data = await res.json();
  if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to create Pinterest board");

  return data;
}

/** Uploads a local media file (e.g. a picked video) and returns its public
 *  hosted URL — pass that URL in `mediaUrls` for publish/schedule. Needed for
 *  YouTube, which requires a real video URL rather than an uploaded file
 *  reference. Content-Type is left for the browser to set (multipart
 *  boundary), so only the auth header is sent explicitly. */
export async function uploadMedia(file: File): Promise<MediaUploadResponse> {
  const token = localStorage.getItem("shoutly_token");
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/media/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON body — e.g. a proxy/timeout error page for an oversized upload
    throw new Error(`Upload failed (${res.status}${res.statusText ? ` ${res.statusText}` : ""})`);
  }

  if (!res.ok || !data?.url) {
    throw new Error(data?.message || data?.error || `Upload failed (${res.status})`);
  }

  return data;
}

/** Disconnects a connected social account. `accountId` is the internal
 *  SocialAccount.id from connection-status (not the Outstand account id).
 *  Revokes access on Outstand's side and deletes the local record. */
export async function disconnectAccount(accountId: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/accounts/${accountId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await res.json();
  if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to disconnect account");

  return data;
}

/** Deletes a post via DELETE /autopost/posts/:id. `postId` is our internal
 *  Post.id, not Outstand's post id. Deletion is allowed regardless of the
 *  post's status (processing/scheduled/published/failed). A 404 (post not
 *  found / not owned) is treated as already-deleted rather than an error,
 *  since that's the outcome the caller wants either way. */
export async function deleteAutopostPost(postId: string): Promise<{ success: boolean; message: string; postId: string; previousStatus?: string }> {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 404) {
    return { success: true, message: data?.message || "Post already removed", postId };
  }
  if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to delete post");

  return data;
}

/* ──────────────────────────────────────────────────────────────
   OLD IMPORTANT FUNCTIONS (RESTORED – USING AXIOS)
────────────────────────────────────────────────────────────── */

/** Publish instantly */
export const publishPost = async (payload: PublishPayload): Promise<any> => {
  const response = await autopostClient.post("/api/autopost/publish", payload);
  return response.data;
};

/** Schedule posts */
export const schedulePosts = async (payload: SchedulePayload): Promise<any> => {
  const response = await autopostClient.post("/api/autopost/schedule", payload);
  return response.data;
};

/** (Optional) Keep old connect if still used */
export const connectPlatform = async (platform: Platform): Promise<ConnectResponse> => {
  const response = await autopostClient.post("/api/autopost/connect", { platform });
  return response.data;
};

/** (Optional) Old callback handler */
export const handleCallback = async (payload: HandleCallbackPayload): Promise<any> => {
  const response = await autopostClient.post("/api/autopost/handle-callback", payload);
  return response.data;
};