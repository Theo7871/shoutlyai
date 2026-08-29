// api/homeApi.ts
import { API_ENDPOINTS } from "./configApi";

interface SubIndustry {
    id: string | number;
    name: string;
}

interface Industry {
    id: string;
    name: string;
    subIndustries?: SubIndustry[];
}

const INDUSTRIES_CACHE_KEY = "shoutly:industries:v1";
const INDUSTRIES_CACHE_TTL_MS = 30 * 60 * 1000;

let industriesMemoryCache:
    | { data: Array<{ id: string; name: string; subIndustries: SubIndustry[] }>; timestamp: number }
    | null = null;
let industriesInFlight: Promise<Array<{ id: string; name: string; subIndustries: SubIndustry[] }>> | null = null;

const normalizeIndustries = (payload: unknown) => {
    const industriesArray = Array.isArray(payload)
        ? payload
        : (payload as { industries?: Industry[]; data?: Industry[] })?.industries ||
          (payload as { industries?: Industry[]; data?: Industry[] })?.data ||
          [];

    return industriesArray.map((ind: Industry) => ({
        id: ind.id,
        name: ind.name,
        subIndustries: ind.subIndustries || [],
    }));
};

const readIndustriesFromSession = () => {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.sessionStorage.getItem(INDUSTRIES_CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as {
            timestamp: number;
            data: Array<{ id: string; name: string; subIndustries: SubIndustry[] }>;
        };

        if (!parsed?.timestamp || !Array.isArray(parsed?.data)) return null;
        if (Date.now() - parsed.timestamp > INDUSTRIES_CACHE_TTL_MS) return null;
        return parsed;
    } catch {
        return null;
    }
};

const writeIndustriesToSession = (data: Array<{ id: string; name: string; subIndustries: SubIndustry[] }>) => {
    if (typeof window === "undefined") return;
    try {
        window.sessionStorage.setItem(
            INDUSTRIES_CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data })
        );
    } catch {
        // Ignore storage quota or private-mode storage errors.
    }
};

export interface ApiPost {
  imageId: string;
  imageUrl: string;
  subIndustryId: string;
  contentId: string;
  text: string;
  hashtags: string[];
  type?: "IMAGE" | "REEL" | "CAROUSEL" | string;
}

export interface PostsResponse {
  data: ApiPost[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const fetchPosts = async (page: number = 1, subIndustryId?: string): Promise<PostsResponse> => {
  const empty: PostsResponse = { data: [], meta: { total: 0, page, limit: 10, totalPages: 1 } };
  try {
    const params = new URLSearchParams({ page: String(page) });
    if (subIndustryId) params.set("subIndustryId", subIndustryId);
    const url = `${API_ENDPOINTS.posts}?${params.toString()}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-store",
    });
    if (!res.ok) { return empty; }
    return await res.json() as PostsResponse;
  } catch {
    return empty;
  }
};

export interface ApiFestival {
  id: string;
  event: string;
  date: string;
  type?: string;
  country?: string;
  /** Most recently uploaded, non-deleted FestivalImage.file for this
   *  festival — exactly one per festival when withImages is true (the
   *  default). Only null when withImages=false was explicitly passed. */
  imageUrl: string | null;
}

export interface FestivalsResponse {
  data: ApiFestival[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

/** GET /api/festivals — festival records with images (Diwali, Christmas,
 *  etc.), independent of the post/calendar system. withImages defaults to
 *  true server-side (only festivals with at least one image come back). */
export const fetchFestivals = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  withImages?: boolean;
  type?: "GLOBAL" | "SPECIAL_DAY" | "FESTIVAL" | "NATIONAL" | "RELIGIOUS";
  month?: number;
  year?: number;
  upcoming?: boolean;
  country?: string;
}): Promise<FestivalsResponse> => {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 6;

  const query = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (params?.search) query.set("search", params.search);
  if (params?.withImages !== undefined) query.set("withImages", String(params.withImages));
  if (params?.type) query.set("type", params.type);
  if (params?.month !== undefined) query.set("month", String(params.month));
  if (params?.year !== undefined) query.set("year", String(params.year));
  if (params?.upcoming !== undefined) query.set("upcoming", String(params.upcoming));
  if (params?.country) query.set("country", params.country);

  // Throws on failure instead of silently resolving to an empty list, so
  // callers can tell "genuinely no festivals" apart from "the request
  // failed" (e.g. a flaky ngrok tunnel) and avoid showing a misleading
  // empty state for the latter.
  const res = await fetch(`${API_ENDPOINTS.festivals}?${query.toString()}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to load festivals (${res.status})`);
  return await res.json() as FestivalsResponse;
};

export const fetchImages = async (subIndustryId?: string | null) => {
    try {
        let url = API_ENDPOINTS.displayImages;
        if (subIndustryId) {
            url += `?subIndustryId=${encodeURIComponent(String(subIndustryId))}`;
        } else {
            url += "?allowRandomPreview=1";
        }
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text().catch(() => "Unknown error");
            if (res.status === 400) {
                return [];
            }
            throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        const images = Array.isArray(data)
            ? data
            : Array.isArray(data.images)
            ? data.images
            : data.data || [];
        return images;
    } catch {
        // Return empty array on error instead of throwing
        return [];
    }
};

export const fetchIndustries = async () => {
    const now = Date.now();

    if (industriesMemoryCache && now - industriesMemoryCache.timestamp <= INDUSTRIES_CACHE_TTL_MS) {
        return industriesMemoryCache.data;
    }

    const sessionCached = readIndustriesFromSession();
    if (sessionCached) {
        industriesMemoryCache = sessionCached;
        return sessionCached.data;
    }

    if (industriesInFlight) {
        return industriesInFlight;
    }

    const requestPromise = (async () => {
        try {
            const url = API_ENDPOINTS.industries;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort("timeout"), 12000);

            let res: Response;
            try {
                res = await fetch(url, {
                    signal: controller.signal,
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        "Content-Type": "application/json",
                    },
                });
            } finally {
                clearTimeout(timeoutId);
            }

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            const normalized = normalizeIndustries(data);

            industriesMemoryCache = { data: normalized, timestamp: Date.now() };
            writeIndustriesToSession(normalized);
            return normalized;
        } catch {
            if (industriesMemoryCache?.data?.length) {
                return industriesMemoryCache.data;
            }

            const staleSession = readIndustriesFromSession();
            if (staleSession?.data?.length) {
                return staleSession.data;
            }

            return [];
        } finally {
            industriesInFlight = null;
        }
    })();

    industriesInFlight = requestPromise;
    return requestPromise;
};
