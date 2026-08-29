# Logo Overlay API — Backend Implementation Guide

This document describes the API the backend needs to build so the **"apply your logo"** feature on the Templates page (`/templates`) becomes real. Today, the entire feature is faked in the browser: the logo is held in memory (never uploaded anywhere) and the finished image is drawn on an HTML `<canvas>` and downloaded straight from the browser. Nothing is persisted, nothing is server-rendered, and nothing can be re-fetched later (no order history, no shareable link, no re-download).

This doc is scoped to that one feature only — uploading a logo and applying it, with all its style controls, on top of a template image. It does not cover payment, template browsing, or anything else on that page.

---

## Where this fits in the frontend

Page: `app/templates/page.tsx` → "Customize" step.

Today, this step:
1. Lets the user pick a logo file (`<input type="file">`) → read into memory as a base64 data URL via `FileReader`. Never leaves the browser.
2. Lets the user adjust a set of style controls (position, size, badge style, colors, text, toggles — full list below).
3. Redraws an HTML canvas on every change, compositing: template image → optional bottom gradient bar → optional corner brackets → the logo/text "badge".
4. On download, calls `canvas.toDataURL("image/png")` and triggers a browser download. That's it — no server involved.

The goal: replace steps 1 and 3–4 with real API calls, so the composited image is generated and stored server-side, and can be fetched by URL (for the checkout/payment step, order history, re-downloads, sharing, etc.).

---

## Files to create/update (frontend side, once backend is ready)

- **`api/logoOverlayApi.ts`** (new) — client wrapper for the two endpoints below.
- **`app/templates/page.tsx`** — swap `FileReader` logo handling for a real upload call, and swap the client-side canvas render for a call to the render endpoint (or keep the canvas as an instant local preview, and only call the API at "Continue"/download time — recommended, see **Suggested UX** below).

---

## Endpoint 1: Upload Logo

**`POST /api/logo/upload`**

**Description:** Accepts a single logo image file, stores it, and returns a URL/ID the render endpoint can reference. Replaces the current `FileReader` → base64-in-memory approach.

**Request:** `multipart/form-data`

| Field | Type | Required | Notes |
|---|---|---|---|
| `file` | file | Yes | PNG, JPG, SVG, or WEBP. Recommend a server-side size cap (e.g. 5MB) and dimension sanity check. |

**Response — `200 OK`:**
```json
{
  "logoId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "logoUrl": "https://cdn.shoutlyai.com/logos/a1b2c3d4-e5f6-7890-abcd-ef1234567890.png",
  "width": 512,
  "height": 512
}
```

**Error Responses:**
- `400`: `{ "message": "No file provided" }`
- `400`: `{ "message": "Unsupported file type. Use PNG, JPG, SVG, or WEBP." }`
- `413`: `{ "message": "File too large. Max 5MB." }`

**Frontend Responsibilities:**
1. Validate file type/size client-side before upload (fast feedback), but never trust that alone.
2. Show upload progress/spinner in the "Logo Upload" panel.
3. Store the returned `logoUrl` in place of the current base64 data URL — everything downstream (preview, render call) uses this URL instead.
4. On "Remove logo," just clear local state — no delete call needed unless you want to garbage-collect unused uploads.

---

## Endpoint 2: Apply Logo Overlay

**`POST /api/templates/apply-logo`**

**Description:** Takes a template's background image plus a logo and every style control from the Customize panel, and returns a finished, composited image. This is the server-side equivalent of the canvas-drawing `useEffect` currently in `app/templates/page.tsx`.

**Request:** `application/json`

```json
{
  "templateImageUrl": "https://images.shoutlyai.com/templates/gym-motivation.jpg",
  "logoUrl": "https://cdn.shoutlyai.com/logos/a1b2c3d4-e5f6-7890-abcd-ef1234567890.png",

  "position": "tl",
  "logoSize": 48,
  "badgeStyle": "glass",
  "opacity": 90,
  "blur": 12,
  "radius": 10,
  "primaryColor": "#F97316",
  "textColor": "white",

  "brandName": "Sunset Yoga Studio",
  "phone": "+1 (555) 000-0000",
  "overlayText": "sunsetyogastudio.com",

  "showLogo": true,
  "showName": true,
  "showContact": true,
  "showOvtext": true,
  "showCorner": false,
  "showTextbar": false
}
```

### Parameter reference

All fields below come directly from the existing UI controls in `app/templates/page.tsx` (`CustomizeView`) — nothing here is speculative; it's a 1:1 mapping of what the user can already set.

| Field | Type | Values / Range | UI control | Notes |
|---|---|---|---|---|
| `templateImageUrl` | string (URL) | — | (selected template / "Test Backgrounds") | The background image to render on top of. |
| `logoUrl` | string (URL) or `null` | — | Logo Upload section | `null` if no logo uploaded — badge may still render with just text. |
| `position` | string | `"tl"` \| `"tr"` \| `"bl"` \| `"br"` | Logo Position buttons | Corner the badge (and corner accent, if on) anchors to. |
| `logoSize` | number | `24`–`80` | Logo Size slider | Logo's rendered square size, in px, at a 500×500 canvas. |
| `badgeStyle` | string | `"glass"` \| `"solid"` \| `"outline"` \| `"minimal"` | Overlay Appearance → Badge Style | See **Rendering rules** below for exact fill/border per style. |
| `opacity` | number | `20`–`100` | Overlay Appearance → Opacity slider | Applied to the whole badge (background + logo + text). |
| `blur` | number | `0`–`24` | Overlay Appearance → Blur slider | Backdrop blur behind the badge (only visually meaningful for `"glass"`/`"outline"` styles — see note below). |
| `radius` | number | `0`–`28` | Overlay Appearance → Corner Radius slider | Badge corner radius, px. |
| `primaryColor` | string (hex) | e.g. `#F97316` | Brand Colors → swatches / custom picker | Badge fill/border color, and the corner-accent/bottom-bar color. |
| `textColor` | string | `"white"` \| `"dark"` | Brand Colors → Text Color on Badge | `"dark"` renders as `#0D0E1A`. |
| `brandName` | string | — | Brand Identity → Brand Name | |
| `phone` | string | — | Brand Identity → Phone / Contact | |
| `overlayText` | string | — | Brand Identity → Overlay / Tagline | Typically a website or tagline. |
| `showLogo` | boolean | — | Show/Hide → Logo | |
| `showName` | boolean | — | Show/Hide → Brand Name | |
| `showContact` | boolean | — | Show/Hide → Contact Info | |
| `showOvtext` | boolean | — | Show/Hide → Overlay Text | |
| `showCorner` | boolean | — | Show/Hide → Corner Accents | Draws an L-shaped bracket in the same corner as `position`. |
| `showTextbar` | boolean | — | Show/Hide → Bottom Text Bar | Full-width gradient bar across the bottom with all three text fields joined by " · ". |

> **Note on `blur`:** the current client-side implementation does *not* actually apply a blur — it only varies badge opacity/fill by style. If backend rendering supports a real backdrop blur (most image libraries can approximate this by blurring a copy of the background behind the badge region), that would be a visual improvement over what's live today. Flagging this explicitly so it's a conscious choice, not an oversight.

### Rendering rules (must match current client output)

Canvas is treated as **500×500px**; scale proportionally for other output sizes.

**1. Background:** `templateImageUrl`, cover-fit (scaled to fill 500×500, cropped, centered — never stretched or letterboxed).

**2. Bottom text bar** (if `showTextbar`): a vertical gradient from transparent at 78% height to `primaryColor` at 70% opacity at the bottom, covering the bottom 22% of the image. Centered text at the bottom (18px from bottom edge): `brandName`, `phone`, `overlayText` — only the non-empty ones, joined with `"  ·  "`.

**3. Corner accent** (if `showCorner`): an L-shaped bracket, 44×44px, 4px stroke, color `primaryColor`, drawn in the corner matching `position`.

**4. Badge** (if any of `showLogo && logoUrl`, `showName`, `showContact`, `showOvtext` is true and has content):
- Contains, left to right: the logo (if shown), then a stacked column of up to 3 text lines (brand name → phone → overlay text, only non-empty/shown ones).
- Padding: 14px horizontal, 10px vertical, 10px gap between logo and text.
- Text sizes: brand name = 800 weight / 15px, phone = 600 weight / 12px, overlay text = 500 weight / 12px. Line height 17px. Font: Inter (fallback: system-ui, sans-serif).
- Width: `min(260px, content width + padding)`. Height: `content height + padding`.
- Anchored 16px in from the edges, in the corner given by `position`.
- Fill/border by `badgeStyle`:
  - `"glass"`: fill = `primaryColor` at 28% alpha, 1px border = `primaryColor` at 50% alpha.
  - `"solid"`: fill = `primaryColor` (opaque), no border.
  - `"outline"`: fill = black at 28% alpha, 2px border = `primaryColor`.
  - `"minimal"`: no fill, no border — logo/text only.
- The whole badge (fill, border, logo, text) is rendered at `opacity`% (20–100).
- Logo is clipped to a rounded square (6px radius) at `logoSize`×`logoSize`.
- Text color: `textColor === "white" ? "#ffffff" : "#0D0E1A"`.

**5. Output format:** PNG. Reference implementation: `canvas.toDataURL("image/png")`.

### Response — `200 OK`

```json
{
  "renderId": "r_9f8e7d6c5b4a",
  "imageUrl": "https://cdn.shoutlyai.com/renders/r_9f8e7d6c5b4a.png",
  "width": 500,
  "height": 500,
  "createdAt": "2026-08-23T10:15:00.000Z"
}
```

Returning a stored, fetchable `imageUrl` (rather than raw bytes) is what enables the checkout, success/download, and any future "my downloads" screen to reference the same render without re-generating it.

### Error Responses

- `400`: `{ "message": "templateImageUrl is required" }`
- `400`: `{ "message": "Invalid position. Use tl, tr, bl, or br." }`
- `422`: `{ "message": "Could not fetch logoUrl or templateImageUrl" }`
- `500`: `{ "message": "Render failed" }`

**Frontend Responsibilities:**
1. Debounce calls if rendering on every slider tick (recommended: keep the live preview as the local canvas it already is, and only call this endpoint once — at "Continue" or at download time — see below).
2. Show a loading state while the render request is in flight.
3. Replace the current `downloadImage()` (canvas → `toDataURL` → local download) with: call this endpoint → then either redirect the browser to `imageUrl` or fetch it and trigger download from that URL.

---

## Suggested UX (avoid over-calling the render endpoint)

The live "Live Preview" card should **stay** as the instant client-side canvas render it is today — it's fast, free, and needs no network round-trip while the user is dragging sliders. Only call `POST /api/templates/apply-logo` **once**, at the moment the user clicks **"Continue — $0.20"** (transitioning from Customize → Payment), so:
- The checkout/payment step can reference a real, stored `imageUrl`.
- The Success step's Download button downloads that stored image instead of re-rendering client-side.

This keeps the editing experience exactly as responsive as it is now, while making the final output real and persisted.

---

## Open questions for backend

- **Storage:** where do uploaded logos and rendered images live (S3/GCS/CDN)? What's the retention policy — do renders get deleted if the user never completes checkout?
- **Auth:** should logo upload require a logged-in user, or is anonymous upload allowed pre-signup (current flow lets you customize before any sign-in)?
- **Rate limiting:** since render is triggered once per checkout attempt (not per slider change, per the suggested UX above), abuse risk is low, but still worth capping per-IP/per-user.

---

## Addendum: badge visibility needed its own flag — ✅ resolved

The frontend's "Show Branding As" control (**Badge** / **Bottom Bar** / **Both**) originally only worked for two of the three modes, because `showLogo`/`showName`/`showContact`/`showOvtext` drove both the badge and the bottom bar off the same flags, with no way to suppress one independently of the other.

**Fix shipped:** backend added `showBadge: boolean` as an independent container switch alongside `showTextbar`, both required fields on `POST /api/templates/apply-logo`. Content flags (`showLogo`/`showName`/`showContact`/`showOvtext`) still gate which fields appear, identically in both containers, exactly as before.

| Mode | `showBadge` | `showTextbar` |
|---|---|---|
| Badge | `true` | `false` |
| Bottom Bar | `false` | `true` |
| Both | `true` | `true` |

Frontend now sends `showBadge: displayMode !== "bar"` alongside `showTextbar: displayMode !== "badge"` on every render call (`api/logoOverlayApi.ts`, `app/templates/page.tsx`), with the content flags unchanged across all three modes. All three "Show Branding As" options render correctly against the live API.
