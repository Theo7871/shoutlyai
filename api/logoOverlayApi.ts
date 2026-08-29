// api/logoOverlayApi.ts
// Client for the Logo Overlay API (see LOGO_OVERLAY_API.md) — backs the
// "apply your logo" step on /templates. Both endpoints are unauthenticated.
import { API_BASE_URL, API_ENDPOINTS } from "./configApi";

export interface LogoUploadResponse {
    logoId: string;
    logoUrl: string;
    width: number;
    height: number;
}

// Nest's default "no matching route" handler returns a 404 with
// {"message":"Cannot POST /api/whatever"} — a real, valid JSON error body,
// but an internal routing string, not something meant for an end user to
// read. Recognize and suppress it rather than showing it verbatim.
const RAW_ROUTING_ERROR_RE = /^Cannot (GET|POST|PUT|PATCH|DELETE) /i;

async function readErrorMessage(res: Response, fallback: string): Promise<string> {
    try {
        const body = await res.json();
        if (Array.isArray(body?.message)) return body.message.join(", ");
        if (typeof body?.message === "string" && !RAW_ROUTING_ERROR_RE.test(body.message)) {
            return body.message;
        }
    } catch {
        // Response wasn't JSON — fall through to the generic message.
    }
    return res.status === 404
        ? `${fallback} — this feature isn't available yet. Please try again later.`
        : `${fallback} (${res.status})`;
}

export async function uploadLogo(file: File): Promise<LogoUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(API_ENDPOINTS.logoUpload, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(await readErrorMessage(res, "Logo upload failed"));
    }
    return res.json();
}

export interface TemplateUploadResponse {
    templateId: string;
    templateUrl: string;
    width: number;
    height: number;
}

// Uploads a user-supplied background/template image (as opposed to a logo)
// and returns a hosted URL — feed templateUrl straight into
// applyLogoOverlay's templateImageUrl.
export async function uploadTemplateImage(file: File): Promise<TemplateUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(API_ENDPOINTS.templateUpload, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(await readErrorMessage(res, "Image upload failed"));
    }
    return res.json();
}

export type OverlayPosition = "tl" | "tr" | "bl" | "br";
export type OverlayBadgeStyle = "glass" | "solid" | "outline" | "minimal";
// "white"/"dark" are shortcuts the backend resolves to #ffffff/#0D0E1A; any
// other value must be a 6-digit hex string ("#RRGGBB"), used exactly as given.
export type OverlayTextColor = "white" | "dark" | (string & {});

export interface ApplyLogoOverlayParams {
    templateImageUrl: string;
    logoUrl?: string | null;
    position: OverlayPosition;
    logoSize: number;
    // Scales the whole badge card (padding, text, logo) as one unit.
    // Optional — omitted entirely when unset, backend defaults to 1.
    // Range 0.5-1.5.
    cardScale?: number;
    badgeStyle: OverlayBadgeStyle;
    opacity: number;
    blur: number;
    radius: number;
    primaryColor: string;
    textColor: OverlayTextColor;
    brandName?: string;
    phone?: string;
    overlayText?: string;
    showBadge: boolean;
    showLogo: boolean;
    showName: boolean;
    showContact: boolean;
    showOvtext: boolean;
    showCorner: boolean;
    showTextbar: boolean;
}

export interface ApplyLogoOverlayResponse {
    renderId: string;
    downloadToken: string;
    expiresIn: number;
    previewUrl: string;
    downloadUrl: string;
    width: number;
    height: number;
    createdAt: string;
}

export async function applyLogoOverlay(params: ApplyLogoOverlayParams): Promise<ApplyLogoOverlayResponse> {
    // logoUrl is genuinely optional server-side — omit the key rather than
    // sending null when there's no uploaded logo yet.
    const { logoUrl, ...rest } = params;
    const body = logoUrl ? { ...rest, logoUrl } : rest;

    const res = await fetch(API_ENDPOINTS.applyLogoOverlay, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(await readErrorMessage(res, "Render failed"));
    }
    return res.json();
}

/**
 * previewUrl/downloadUrl come back as paths relative to the backend
 * (e.g. "/api/templates/render/:id?token=..."), not the frontend's own
 * origin — resolve them against API_BASE_URL before using as a URL.
 */
export function resolveRenderUrl(path: string): string {
    return path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
}
