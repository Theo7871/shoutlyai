"use client";

import { createManualPost } from "@/api/calendarApi";
import { schedulePosts, Platform } from "@/api/autopostApi";

export type ActionPlatKey = "ig" | "fb" | "li" | "tw" | "tk" | "yt" | "th" | "bs" | "pi" | "gb";

export const mapPlatKeyToPlatform = (pk: ActionPlatKey): Platform | null => {
  switch (pk) {
    case "ig": return "instagram";
    case "fb": return "facebook";
    case "li": return "linkedin";
    case "tw": return "x";
    case "yt": return "youtube";
    case "tk": return "tiktok";
    case "th": return "threads";
    case "bs": return "bluesky";
    case "pi": return "pinterest";
    case "gb": return "google_business";
    default: return null;
  }
};

// The calendar-post publish endpoint lives on the same host as the autopost
// API (ai-shoutly-backend.onrender.com) — a different backend than the main
// API_BASE_URL used for most calendar/auth calls.
const PUBLISH_BASE_URL = "https://ai-shoutly-backend.onrender.com";

export interface CreateBackendPostParams {
  postTime: Date;
  caption: string;
  hashtags: string[];
  /** Existing hosted image URL — ignored if imageFile is provided. */
  imageUrl?: string;
  imageFile?: File | null;
}

/** Creates a post on the backend via POST /api/calendar/post/manual.
 *  Returns the new backendId + hosted image URL, or an empty object if the
 *  user isn't authenticated or the request fails — callers decide the
 *  local-only fallback in that case, same as the Calendar page always has. */
export async function createBackendPost(
  params: CreateBackendPostParams
): Promise<{ backendId?: string; imageUrl?: string }> {
  const token = typeof window !== "undefined" ? localStorage.getItem("shoutly_token") : null;
  if (!token) return {};

  try {
    const res = await createManualPost(
      {
        postTime: params.postTime.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        contentText: `${params.caption}\n\n${params.hashtags.join(" ")}`,
        imageUrl: params.imageFile ? undefined : params.imageUrl,
      },
      token,
      params.imageFile ?? undefined
    );
    const created = res.post as { postId?: string; media?: { file?: string } } | undefined;
    return { backendId: created?.postId, imageUrl: created?.media?.file };
  } catch {
    return {};
  }
}

/** Publishes an already-created backend post immediately via
 *  POST /api/calendar/post/:id/publish. Throws on failure — callers show
 *  the error to the user. */
export async function publishBackendPostNow(backendId: string): Promise<string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("shoutly_token") : null;
  const res = await fetch(`${PUBLISH_BASE_URL}/api/calendar/post/${backendId}/publish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to publish post.");
  }
  return result.message || "✅ Post is being published now";
}

/** Triggers auto-posting scheduling for the given platforms via
 *  POST /api/autopost/schedule. No-ops if none of the selected platforms
 *  are mappable (autopost currently supports facebook/instagram/linkedin —
 *  youtube is excluded, same as the Calendar page). */
export async function scheduleAutoPost(params: {
  plats: ActionPlatKey[];
  caption: string;
  hashtags: string[];
  scheduledAt: Date;
  imageUrl?: string;
}): Promise<void> {
  const platforms = params.plats
    .map(mapPlatKeyToPlatform)
    .filter((p): p is Platform => p !== null && p !== "youtube");

  if (platforms.length === 0) return;

  const content = `${params.caption}\n\n${params.hashtags.join(" ")}`;
  await schedulePosts({
    platforms,
    posts: [{
      content,
      scheduledAt: params.scheduledAt.toISOString(),
      mediaUrls: params.imageUrl ? [params.imageUrl] : undefined,
    }],
  });
}
