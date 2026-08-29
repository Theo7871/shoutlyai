"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    Search, Upload, X, Check, Download, Plus, ArrowLeft, ArrowRight,
    Image as ImageIcon, ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight,
    Sparkles, Loader2, ShieldCheck, Rocket, RefreshCcw,
    ChevronDown, Move, SlidersHorizontal, Palette, IdCard, ToggleRight,
    Heart, MessageCircle, Share2, CircleDot, Lock, AlertCircle, Maximize2,
} from "lucide-react";
import { fetchImages } from "@/api/homeApi";
import { useIndustries } from "@/hooks/useIndustries";
import type { ImageItem } from "@/types/home";
import { uploadLogo, uploadTemplateImage, applyLogoOverlay, resolveRenderUrl, type ApplyLogoOverlayResponse } from "@/api/logoOverlayApi";
import { useUserProfile } from "@/hooks/useUserProfile";

// ── Types ────────────────────────────────────────────────────────────────
type PosKey = "tl" | "tr" | "bl" | "br";
type View = "browse" | "customize" | "payment" | "success";
type BadgeStyle = "glass" | "solid" | "outline" | "minimal";
// "white"/"dark" are shortcuts the backend resolves to #ffffff/#0D0E1A; any
// other value must be a 6-digit hex string, used exactly as given.
type TextColorKey = "white" | "dark" | (string & {});
// Where brand identity (logo/name/phone/website) is shown: the corner badge,
// the bottom bar, or both. Badge content toggles (showLogo/showName/etc.)
// stay independent user preferences — this only gates whether the badge
// itself renders; the bottom bar's content was never gated by those flags in
// the first place (see LOGO_OVERLAY_API.md), so no backend change is needed.
type DisplayMode = "badge" | "bar" | "both";

interface Template {
    id: string;
    name: string;
    category: string;
    image: string;
}

// ── Data ─────────────────────────────────────────────────────────────────
// Shown before an industry + sub-industry is picked, so the grid isn't empty
// on first load. Once both are selected, real images load from the same
// /api/display-images endpoint the homepage "Find the Perfect Post" library
// section uses (see components/home/ContentLibrarySection.tsx).
const PLACEHOLDER_TEMPLATES: Template[] = [
    { id: "gym-motivation", name: "Gym Motivation Monday", category: "Health & Fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" },
    { id: "wellness-journey", name: "Wellness Journey", category: "Health & Fitness", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80" },
    { id: "fresh-delicious", name: "Fresh & Delicious", category: "Food & Beverage", image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80" },
    { id: "gourmet-treats", name: "Gourmet Treats", category: "Food & Beverage", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" },
    { id: "modern-fashion", name: "Modern Fashion", category: "Beauty & Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80" },
    { id: "style-guide", name: "Style Guide", category: "Beauty & Fashion", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" },
    { id: "dream-home", name: "Dream Home", category: "Real Estate", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80" },
    { id: "luxury-spaces", name: "Luxury Spaces", category: "Real Estate", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
    { id: "learn-grow", name: "Learn & Grow", category: "Education", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" },
    { id: "invest-smart", name: "Invest Smart", category: "Finance", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" },
    { id: "tech-innovation", name: "Tech Innovation", category: "Technology", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
    { id: "tech-trends", name: "Tech Trends", category: "Technology", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" },
];

const POSITIONS: { key: PosKey; label: string; icon: typeof ArrowUpLeft }[] = [
    { key: "tl", label: "Top Left", icon: ArrowUpLeft },
    { key: "tr", label: "Top Right", icon: ArrowUpRight },
    { key: "bl", label: "Bottom Left", icon: ArrowDownLeft },
    { key: "br", label: "Bottom Right", icon: ArrowDownRight },
];

const BADGE_STYLES: { key: BadgeStyle; label: string }[] = [
    { key: "glass", label: "Glass" },
    { key: "solid", label: "Solid" },
    { key: "outline", label: "Outline" },
    { key: "minimal", label: "Minimal" },
];

const DISPLAY_MODES: { key: DisplayMode; label: string }[] = [
    { key: "badge", label: "Badge" },
    { key: "bar", label: "Bottom Bar" },
    { key: "both", label: "Both" },
];

const PRIMARY_SWATCHES = ["#F97316", "#E1306C", "#0A66C2", "#10B981", "#F59E0B", "#EF4444", "#0F1117"];

const PRICE = "$0.20";
const ACCESS_CODE = "0786";

// ── Helpers ──────────────────────────────────────────────────────────────
function hexToRgba(hex: string, a: number): string {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2) || "5b", 16);
    const g = parseInt(clean.slice(2, 4) || "5b", 16);
    const b = parseInt(clean.slice(4, 6) || "d6", 16);
    return `rgba(${r},${g},${b},${a})`;
}

// ── Preview geometry engine ─────────────────────────────────────────────
// Every constant/formula below is copied directly from the backend's real
// renderer (POST /api/templates/apply-logo) so the live preview matches the
// downloaded PNG exactly. All math happens in a fixed 500x500 reference
// frame; the SVG that renders it uses viewBox="0 0 500 500" so it scales
// to whatever pixel size the preview element actually is, with no manual
// scale-factor bookkeeping needed.
const CANVAS = 500;
const MARGIN = 16;

function estimateTextWidth(text: string, fontSize: number, fontWeight: number): number {
    const weightFactor = fontWeight >= 700 ? 1.08 : fontWeight >= 600 ? 1.04 : 1.0;
    let total = 0;
    for (const ch of text) {
        let charWidth: number;
        if ("iIl.,:;'!|jft ".includes(ch)) charWidth = 0.30;
        else if ("mMWw@%".includes(ch)) charWidth = 0.85;
        else if (/[0-9]/.test(ch)) charWidth = 0.56;
        else if (/[A-Z]/.test(ch)) charWidth = 0.68;
        else charWidth = 0.52;
        total += charWidth * fontSize;
    }
    return total * weightFactor;
}

interface BadgeLine { text: string; fontSize: number; fontWeight: number }

interface BadgeLayout {
    x: number; y: number; width: number; height: number;
    showLogoBox: boolean; logoX: number; logoY: number; logoSize: number;
    textStartX: number; textTopY: number; lineHeight: number; baselineOffset: number;
}

function computeBadgeLayout(params: {
    pos: PosKey;
    cardScale: number;
    logoSize: number;
    showLogo: boolean;
    logoUrl: string | null;
    lines: BadgeLine[];
}): BadgeLayout {
    const scale = params.cardScale;
    const effectiveLogoSize = params.logoSize * scale;
    const paddingX = 14 * scale;
    const paddingY = 10 * scale;
    const gap = 10 * scale;
    const lineHeight = 15 * scale;
    const maxBadgeWidth = 260 * scale;

    const { lines } = params;
    const textBlockWidth = lines.length > 0
        ? Math.max(...lines.map((l) => estimateTextWidth(l.text, l.fontSize, l.fontWeight))) * 1.15
        : 0;
    const textBlockHeight = lines.length * lineHeight;

    const showLogoBox = params.showLogo && !!params.logoUrl;
    const logoToTextGap = showLogoBox && lines.length > 0 ? gap : 0;
    const contentWidth = (showLogoBox ? effectiveLogoSize + logoToTextGap : 0) + textBlockWidth;
    const contentHeight = Math.max(showLogoBox ? effectiveLogoSize : 0, textBlockHeight);

    const width = Math.round(Math.min(maxBadgeWidth, contentWidth + paddingX * 2));
    const height = Math.round(contentHeight + paddingY * 2);

    let x: number, y: number;
    if (params.pos === "tl") { x = MARGIN; y = MARGIN; }
    else if (params.pos === "tr") { x = CANVAS - MARGIN - width; y = MARGIN; }
    else if (params.pos === "bl") { x = MARGIN; y = CANVAS - MARGIN - height; }
    else { x = CANVAS - MARGIN - width; y = CANVAS - MARGIN - height; }

    const textStartX = x + paddingX + (showLogoBox ? effectiveLogoSize + logoToTextGap : 0);
    const textTopY = y + (height - textBlockHeight) / 2;
    const baselineOffset = lineHeight * 0.76;

    const logoX = x + paddingX;
    const logoY = y + (height - effectiveLogoSize) / 2;

    return { x, y, width, height, showLogoBox, logoX, logoY, logoSize: effectiveLogoSize, textStartX, textTopY, lineHeight, baselineOffset };
}

function badgeRectStyle(style: BadgeStyle, primary: string): { fill: string; stroke?: string; strokeWidth?: number } {
    if (style === "glass") return { fill: hexToRgba(primary, 0.28), stroke: hexToRgba(primary, 0.5), strokeWidth: 1 };
    if (style === "solid") return { fill: primary };
    if (style === "outline") return { fill: "rgba(0,0,0,0.28)", stroke: primary, strokeWidth: 2 };
    return { fill: "none" };
}

const BADGE_FONT_STACK = "Inter, system-ui, sans-serif";

function sliderFill(pct: number): string {
    return `linear-gradient(90deg,#F97316 ${pct}%,#E4E5EF ${pct}%)`;
}

// Keeps only characters a phone number can actually contain, so the field
// can't collect stray letters or symbols as the user types, and prefixes a
// leading "+" the moment they start typing (never on an empty field, so an
// untouched input can't leave a stray "+" in the rendered output).
function sanitizePhone(value: string): string {
    const cleaned = value.replace(/[^\d+\-().\s]/g, "");
    if (cleaned && !cleaned.startsWith("+")) return `+${cleaned}`;
    return cleaned;
}

// Accepts with or without a protocol ("shoutlyai.com" or "https://…") —
// empty is valid too, since the field is optional.
function isValidUrl(value: string): boolean {
    if (!value.trim()) return true;
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
        const url = new URL(withProtocol);
        return url.hostname.includes(".");
    } catch {
        return false;
    }
}

// ── Session cache ────────────────────────────────────────────────────────
// A fresh load or a redirect round-trip (e.g. bouncing through /sign-in)
// otherwise wipes the whole customize session — selected template, uploaded
// logo, every slider — back to defaults. Persist it the same way
// app/dashboards/settings/brand/page.tsx persists its overlay settings:
// localStorage, a 7-day TTL, validated on read so a stale/corrupt entry
// can't crash the page.
const TEMPLATE_CACHE_KEY = "shoutly:templateOverlay:v1";
const TEMPLATE_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const POS_KEYS: PosKey[] = ["tl", "tr", "bl", "br"];
const BADGE_STYLE_KEYS: BadgeStyle[] = ["glass", "solid", "outline", "minimal"];
const DISPLAY_MODE_KEYS: DisplayMode[] = ["badge", "bar", "both"];

function isValidTextColorKey(value: unknown): value is TextColorKey {
    return value === "white" || value === "dark" || (typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value));
}

interface TemplateCachePayload {
    timestamp: number;
    view: "browse" | "customize";
    // Which industry/sub-industry section was showing on Browse — restored so
    // a refresh (or a flaky network request) lands back on the exact live
    // library section the user had open, not the generic placeholder grid.
    industryId: string;
    subIndustryId: string;
    template: Template | null;
    activeImage: string;
    pos: PosKey;
    logoUrl: string | null;
    primary: string;
    badgeOpacity: number;
    blur: number;
    radius: number;
    logoSize: number;
    cardScale: number;
    badgeStyle: BadgeStyle;
    textColorKey: TextColorKey;
    showLogo: boolean;
    showName: boolean;
    showContact: boolean;
    showOvtext: boolean;
    showCorner: boolean;
    displayMode: DisplayMode;
    brandName: string;
    phone: string;
    overlayText: string;
}

function isValidTemplate(value: unknown): value is Template {
    if (!value || typeof value !== "object") return false;
    const t = value as Record<string, unknown>;
    return typeof t.id === "string" && typeof t.name === "string" && typeof t.category === "string" && typeof t.image === "string" && t.image.length > 0;
}

function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
    return typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

function readTemplateCache(): TemplateCachePayload | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(TEMPLATE_CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<TemplateCachePayload> & { timestamp?: number };
        if (!parsed?.timestamp || Date.now() - parsed.timestamp > TEMPLATE_CACHE_TTL_MS) {
            localStorage.removeItem(TEMPLATE_CACHE_KEY);
            return null;
        }

        // Validate every field individually — an old/corrupt shape should
        // degrade to sane defaults, never a broken render.
        const template = isValidTemplate(parsed.template) ? parsed.template : null;
        return {
            timestamp: parsed.timestamp,
            view: parsed.view === "customize" && template ? "customize" : "browse",
            // Not cross-checked against the live industries list here — that
            // list loads async. An industryId/subIndustryId that no longer
            // exists just fails to match in the UI's own .find() lookups,
            // which already renders the same as "nothing selected."
            industryId: typeof parsed.industryId === "string" ? parsed.industryId : "",
            subIndustryId: typeof parsed.subIndustryId === "string" ? parsed.subIndustryId : "",
            template,
            activeImage: typeof parsed.activeImage === "string" ? parsed.activeImage : template?.image ?? "",
            pos: POS_KEYS.includes(parsed.pos as PosKey) ? (parsed.pos as PosKey) : "tl",
            // Only ever cache the hosted logo URL (see write side) — safe to
            // reuse directly as both the preview src and the render param.
            logoUrl: typeof parsed.logoUrl === "string" && parsed.logoUrl ? parsed.logoUrl : null,
            primary: typeof parsed.primary === "string" && /^#[0-9a-fA-F]{3,8}$/.test(parsed.primary) ? parsed.primary : "#F97316",
            badgeOpacity: clampNumber(parsed.badgeOpacity, 20, 100, 90),
            blur: clampNumber(parsed.blur, 0, 24, 12),
            radius: clampNumber(parsed.radius, 0, 28, 10),
            logoSize: clampNumber(parsed.logoSize, 24, 80, 48),
            cardScale: clampNumber(parsed.cardScale, 0.5, 1.5, 1),
            badgeStyle: BADGE_STYLE_KEYS.includes(parsed.badgeStyle as BadgeStyle) ? (parsed.badgeStyle as BadgeStyle) : "glass",
            textColorKey: isValidTextColorKey(parsed.textColorKey) ? parsed.textColorKey : "white",
            showLogo: typeof parsed.showLogo === "boolean" ? parsed.showLogo : true,
            showName: typeof parsed.showName === "boolean" ? parsed.showName : true,
            showContact: typeof parsed.showContact === "boolean" ? parsed.showContact : true,
            showOvtext: typeof parsed.showOvtext === "boolean" ? parsed.showOvtext : true,
            showCorner: typeof parsed.showCorner === "boolean" ? parsed.showCorner : false,
            displayMode: DISPLAY_MODE_KEYS.includes(parsed.displayMode as DisplayMode) ? (parsed.displayMode as DisplayMode) : "badge",
            brandName: typeof parsed.brandName === "string" ? parsed.brandName : "",
            phone: typeof parsed.phone === "string" ? parsed.phone : "",
            overlayText: typeof parsed.overlayText === "string" ? parsed.overlayText : "",
        };
    } catch {
        return null;
    }
}

function writeTemplateCache(payload: Omit<TemplateCachePayload, "timestamp">) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(TEMPLATE_CACHE_KEY, JSON.stringify({ ...payload, timestamp: Date.now() }));
    } catch {
        // Storage full or unavailable (private mode) — editing still works,
        // it just won't survive a reload this time.
    }
}


// ── Page ─────────────────────────────────────────────────────────────────
export default function TemplatesMarketplacePage() {
    // Initial state must match what the server rendered (it has no
    // localStorage, so it always renders the plain defaults below) — reading
    // the cache here instead would make the client's first render disagree
    // with the server's HTML and trigger a hydration error. The cache is
    // applied after mount instead, in the restore effect further down.
    const [view, setView] = useState<View>("browse");
    const [query, setQuery] = useState("");
    const [template, setTemplate] = useState<Template | null>(null);
    const [activeImage, setActiveImage] = useState("");

    // Industry / sub-industry picker — same data source and endpoint as the
    // homepage "Find the Perfect Post" library section.
    const { industries, loading: industriesLoading } = useIndustries();
    const [industryId, setIndustryId] = useState("");
    const [subIndustryId, setSubIndustryId] = useState("");
    const [apiImages, setApiImages] = useState<ImageItem[]>([]);
    const [imagesLoading, setImagesLoading] = useState(false);

    const selectedIndustry = industries.find((ind) => String(ind.id) === industryId);
    const subIndustries = selectedIndustry?.subIndustries ?? [];

    const loadLiveImages = async () => {
        if (!subIndustryId) return;
        setImagesLoading(true);
        try {
            const data = await fetchImages(subIndustryId);
            setApiImages(Array.isArray(data) ? data : []);
        } finally {
            setImagesLoading(false);
        }
    };

    useEffect(() => {
        if (!subIndustryId) {
            setApiImages([]);
            return;
        }
        let cancelled = false;
        setImagesLoading(true);
        fetchImages(subIndustryId)
            .then((data) => { if (!cancelled) setApiImages(Array.isArray(data) ? data : []); })
            .finally(() => { if (!cancelled) setImagesLoading(false); });
        return () => { cancelled = true; };
    }, [subIndustryId]);

    const usingLiveImages = Boolean(subIndustryId);
    const liveTemplates: Template[] = apiImages
        .map((img, i) => ({
            id: String(img.id ?? `live-${i}`),
            name: img.name || img.title || `${selectedIndustry?.name ?? "Industry"} design`,
            category: selectedIndustry?.name ?? "Industry",
            image: img.file || img.url || "",
        }))
        .filter((t) => t.image);

    const baseList = usingLiveImages ? liveTemplates : PLACEHOLDER_TEMPLATES;
    const filtered = baseList.filter((t) => {
        if (!query) return true;
        return t.name.toLowerCase().includes(query.toLowerCase()) || t.category.toLowerCase().includes(query.toLowerCase());
    });

    // Overlay / brand-badge state — mirrors the Brand Overlay Settings dashboard
    // page (app/dashboards/settings/brand/page.tsx) so the editing experience
    // and the final export look identical to it. Starts at plain defaults for
    // the same SSR reason as above; restored from cache post-mount below.
    const [pos, setPos] = useState<PosKey>("tl");
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [primary, setPrimary] = useState("#F97316");
    const [badgeOpacity, setBadgeOpacity] = useState(90);
    const [blur, setBlur] = useState(12);
    const [radius, setRadius] = useState(10);
    const [logoSize, setLogoSize] = useState(48);
    // Scales the whole badge card (padding, text, logo) as one unit — distinct
    // from logoSize, which only resizes the logo icon inside the card.
    const [cardScale, setCardScale] = useState(1);
    const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>("glass");
    const [textColorKey, setTextColorKey] = useState<TextColorKey>("white");
    const [showLogo, setShowLogo] = useState(true);
    const [showName, setShowName] = useState(true);
    const [showContact, setShowContact] = useState(true);
    const [showOvtext, setShowOvtext] = useState(true);
    const [showCorner, setShowCorner] = useState(false);
    const [displayMode, setDisplayMode] = useState<DisplayMode>("badge");
    const [brandName, setBrandName] = useState("");
    const [phone, setPhone] = useState("");
    const [overlayText, setOverlayText] = useState("");
    const [processing, setProcessing] = useState(false);

    // Real upload — logoUrl above stays a local base64 preview (instant, no
    // network wait) for the DOM-based live preview; logoRemoteUrl is the
    // backend-hosted URL the render API actually needs. The cache only ever
    // stores the hosted URL (never the base64 preview — see the write effect
    // below), so restoring it into both is safe and avoids a re-upload.
    const [logoRemoteUrl, setLogoRemoteUrl] = useState<string | null>(null);
    const [logoUploading, setLogoUploading] = useState(false);
    const [logoUploadError, setLogoUploadError] = useState<string | null>(null);

    const [renderResult, setRenderResult] = useState<ApplyLogoOverlayResponse | null>(null);
    const [renderError, setRenderError] = useState<string | null>(null);

    // "Upload your own image" on Browse — real upload via POST
    // /api/templates/upload, which returns a hosted URL usable directly as
    // templateImageUrl on the render call. Skips straight into Customize
    // with the user's own image as the background.
    const [customUploading, setCustomUploading] = useState(false);
    const [customUploadError, setCustomUploadError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Skips the write effect's very first run (on mount), so it never races
    // ahead of the restore effect below and stomps a real cache entry with
    // these still-default values before restoration has had a chance to run.
    const skipNextWrite = useRef(true);

    // browse/customize/payment/success all live on one URL as plain React
    // state, so without this the browser's Back button has nothing of ours
    // to go back to — it skips straight past /templates to whatever page
    // sent the user here (Home, sign-in, etc.). Give every forward step its
    // own history entry via goToView(), and let Back/Forward move between
    // them first via popstate, exactly like separate pages would.
    function goToView(next: View) {
        if (typeof window !== "undefined") {
            window.history.pushState({ view: next }, "", window.location.href);
        }
        setView(next);
    }

    useEffect(() => {
        function onPopState(e: PopStateEvent) {
            setView((e.state?.view as View | undefined) ?? "browse");
        }
        window.addEventListener("popstate", onPopState);
        // Tag whatever entry brought us here (a nav-link click or a reload)
        // as our own "browse" baseline so the very first Back press has a
        // matching state to compare against instead of undefined.
        window.history.replaceState({ view: "browse" }, "", window.location.href);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    // Each step (Browse/Customize/Payment/Success) reuses the same URL and
    // scroll container, so without this the next step just opens wherever
    // the previous one left the scrollbar — e.g. picking a template halfway
    // down the grid drops Customize into the middle of the page instead of
    // its own top. Runs on every view change, including Back/Forward.
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [view]);

    // Restore from cache once, after mount (client-only — safe here, this is
    // no longer part of the SSR/hydration render).
    //
    // "view" only resumes on an actual page reload (F5, or a redirect
    // round-trip like bouncing through /sign-in) — detected via the
    // Navigation Timing API. Arriving fresh via a link (header/footer nav,
    // "Branded Templates", etc.) always starts at Browse's industry picker,
    // even if a customize session is cached; everything else (industry
    // selection, template, logo, every slider) still restores either way, so
    // picking the same template again picks up right where they left off.
    useEffect(() => {
        const cached = readTemplateCache();
        if (!cached) return;

        const [navEntry] = typeof performance !== "undefined" ? performance.getEntriesByType("navigation") : [];
        const isReload = (navEntry as PerformanceNavigationTiming | undefined)?.type === "reload";
        if (isReload) {
            setView(cached.view);
            if (typeof window !== "undefined") {
                window.history.replaceState({ view: cached.view }, "", window.location.href);
            }
        }

        setIndustryId(cached.industryId);
        setSubIndustryId(cached.subIndustryId);
        setTemplate(cached.template);
        setActiveImage(cached.activeImage);
        setPos(cached.pos);
        setLogoUrl(cached.logoUrl);
        setLogoRemoteUrl(cached.logoUrl);
        setPrimary(cached.primary);
        setBadgeOpacity(cached.badgeOpacity);
        setBlur(cached.blur);
        setRadius(cached.radius);
        setLogoSize(cached.logoSize);
        setCardScale(cached.cardScale);
        setBadgeStyle(cached.badgeStyle);
        setTextColorKey(cached.textColorKey);
        setShowLogo(cached.showLogo);
        setShowName(cached.showName);
        setShowContact(cached.showContact);
        setShowOvtext(cached.showOvtext);
        setShowCorner(cached.showCorner);
        setDisplayMode(cached.displayMode);
        setBrandName(cached.brandName);
        setPhone(cached.phone);
        setOverlayText(cached.overlayText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep the cache in sync with every change, not just on an explicit save —
    // matches the Brand Overlay Settings page's own sync effect.
    useEffect(() => {
        if (skipNextWrite.current) {
            skipNextWrite.current = false;
            return;
        }
        writeTemplateCache({
            view: view === "customize" ? "customize" : "browse",
            industryId,
            subIndustryId,
            template,
            activeImage,
            pos,
            // Never persist a base64 data URL — only the hosted one, once the
            // upload (or a pasted URL) has resolved.
            logoUrl: logoRemoteUrl,
            primary,
            badgeOpacity,
            blur,
            radius,
            logoSize,
            cardScale,
            badgeStyle,
            textColorKey,
            showLogo,
            showName,
            showContact,
            showOvtext,
            showCorner,
            displayMode,
            brandName,
            phone,
            overlayText,
        });
    }, [
        view, industryId, subIndustryId, template, activeImage, pos, logoRemoteUrl, primary, badgeOpacity,
        blur, radius, logoSize, cardScale, badgeStyle, textColorKey, showLogo, showName, showContact, showOvtext,
        showCorner, displayMode, brandName, phone, overlayText,
    ]);

    function selectTemplate(t: Template) {
        setTemplate(t);
        setActiveImage(t.image);
        goToView("customize");
    }

    // Clears only the picked image/template — leaves logo/brand settings
    // alone, unlike createAnother() which resets the whole session.
    function clearCustomImage() {
        setTemplate(null);
        setActiveImage("");
    }

    function handleCustomImageUpload(file: File) {
        setCustomUploadError(null);
        setCustomUploading(true);
        uploadTemplateImage(file)
            .then((res) => {
                selectTemplate({
                    id: res.templateId,
                    name: file.name.replace(/\.[^/.]+$/, "") || "Your image",
                    category: "Custom upload",
                    image: res.templateUrl,
                });
            })
            .catch((err) => setCustomUploadError(err instanceof Error ? err.message : "Upload failed"))
            .finally(() => setCustomUploading(false));
    }

    function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => setLogoUrl(ev.target?.result as string);
        reader.readAsDataURL(file);

        setLogoRemoteUrl(null);
        setLogoUploadError(null);
        setLogoUploading(true);
        uploadLogo(file)
            .then((res) => setLogoRemoteUrl(res.logoUrl))
            .catch((err) => setLogoUploadError(err instanceof Error ? err.message : "Logo upload failed"))
            .finally(() => setLogoUploading(false));
    }

    // Lets a user paste a logo they've already hosted somewhere, instead of
    // uploading a file. It's already a fetchable URL, so it can go straight
    // to the render API as logoUrl — no /api/logo/upload round trip needed.
    function handleLogoUrlSubmit(url: string) {
        const trimmed = url.trim();
        if (!trimmed) return;
        setLogoUploading(false);
        setLogoUploadError(null);
        setLogoUrl(trimmed);
        setLogoRemoteUrl(trimmed);
    }

    function removeLogo() {
        setLogoUrl(null);
        setLogoRemoteUrl(null);
        setLogoUploadError(null);
        setLogoUploading(false);
    }

    function goToPayment() {
        setRenderError(null);
        goToView("payment");
    }

    // Real render call — gated behind the access code entered on the Payment
    // step. On success, the branded image is generated server-side and this
    // becomes the source for both the Success preview and the download link.
    async function unlockAndRender(code: string): Promise<{ ok: boolean; error?: string }> {
        if (code !== ACCESS_CODE) {
            return { ok: false, error: "Incorrect code. Please try again." };
        }

        setProcessing(true);
        setRenderError(null);
        try {
            // showBadge/showTextbar are independent container switches;
            // showLogo/showName/showContact/showOvtext are content flags that
            // drive both containers identically and stay as the user's real
            // toggle values regardless of mode (see LOGO_OVERLAY_API.md).
            const result = await applyLogoOverlay({
                templateImageUrl: activeImage,
                logoUrl: logoRemoteUrl,
                position: pos,
                logoSize,
                cardScale,
                badgeStyle,
                opacity: badgeOpacity,
                blur,
                radius,
                primaryColor: primary,
                textColor: textColorKey,
                brandName,
                phone,
                overlayText,
                showBadge: displayMode !== "bar",
                showLogo,
                showName,
                showContact,
                showOvtext,
                showCorner,
                showTextbar: displayMode !== "badge",
            });
            setRenderResult(result);
            goToView("success");
            return { ok: true };
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setRenderError(message);
            return { ok: false, error: message };
        } finally {
            setProcessing(false);
        }
    }

    // Only clears the picked image/template — everything the user already
    // set up (logo, colors, badge style, brand identity) carries over, so
    // making a second post doesn't mean re-entering all of it from scratch.
    // Back on Browse, they can pick a new library image or upload their own.
    function createAnother() {
        setTemplate(null);
        setActiveImage("");
        setRenderResult(null);
        setRenderError(null);
        goToView("browse");
    }

    const siblingTemplates = template ? filtered.filter((t) => t.id !== template.id).slice(0, 6) : [];

    return (
        <div className="bg-white min-h-screen">
            {view === "browse" && (
                <BrowseView
                    filtered={filtered}
                    query={query}
                    setQuery={setQuery}
                    onSelect={selectTemplate}
                    industries={industries}
                    industriesLoading={industriesLoading}
                    industryId={industryId}
                    setIndustryId={(id) => { setIndustryId(id); setSubIndustryId(""); }}
                    subIndustries={subIndustries}
                    subIndustryId={subIndustryId}
                    setSubIndustryId={setSubIndustryId}
                    usingLiveImages={usingLiveImages}
                    imagesLoading={imagesLoading}
                    onRefresh={loadLiveImages}
                    onCustomImageUpload={handleCustomImageUpload}
                    customUploading={customUploading}
                    customUploadError={customUploadError}
                    customImage={template?.category === "Custom upload" ? template : null}
                    onRemoveCustomImage={clearCustomImage}
                    onResumeCustomImage={() => goToView("customize")}
                />
            )}

            {view === "customize" && template && (
                <CustomizeView
                    template={template}
                    fileInputRef={fileInputRef}
                    logoUrl={logoUrl}
                    onLogoUpload={handleLogoUpload}
                    onLogoUrlSubmit={handleLogoUrlSubmit}
                    onRemoveLogo={removeLogo}
                    logoUploading={logoUploading}
                    logoUploadError={logoUploadError}
                    pos={pos}
                    setPos={setPos}
                    logoSize={logoSize}
                    setLogoSize={setLogoSize}
                    cardScale={cardScale}
                    setCardScale={setCardScale}
                    badgeStyle={badgeStyle}
                    setBadgeStyle={setBadgeStyle}
                    badgeOpacity={badgeOpacity}
                    setBadgeOpacity={setBadgeOpacity}
                    blur={blur}
                    setBlur={setBlur}
                    radius={radius}
                    setRadius={setRadius}
                    primary={primary}
                    setPrimary={setPrimary}
                    textColorKey={textColorKey}
                    setTextColorKey={setTextColorKey}
                    brandName={brandName}
                    setBrandName={setBrandName}
                    phone={phone}
                    setPhone={setPhone}
                    overlayText={overlayText}
                    setOverlayText={setOverlayText}
                    showLogo={showLogo}
                    setShowLogo={setShowLogo}
                    showName={showName}
                    setShowName={setShowName}
                    showContact={showContact}
                    setShowContact={setShowContact}
                    showOvtext={showOvtext}
                    setShowOvtext={setShowOvtext}
                    showCorner={showCorner}
                    setShowCorner={setShowCorner}
                    displayMode={displayMode}
                    setDisplayMode={setDisplayMode}
                    activeImage={activeImage}
                    setActiveImage={setActiveImage}
                    siblingTemplates={siblingTemplates}
                    onContinue={goToPayment}
                />
            )}

            {view === "payment" && template && (
                <PaymentView
                    template={template}
                    processing={processing}
                    renderError={renderError}
                    onBack={() => window.history.back()}
                    onUnlock={unlockAndRender}
                />
            )}

            {view === "success" && (
                <SuccessView renderResult={renderResult} onCreateAnother={createAnother} />
            )}
        </div>
    );
}

// ── Browse ───────────────────────────────────────────────────────────────
interface IndustryOption {
    id: string | number;
    name: string;
    subIndustries: { id: string | number; name: string }[];
}

function BrowseView({
    filtered, query, setQuery, onSelect,
    industries, industriesLoading, industryId, setIndustryId,
    subIndustries, subIndustryId, setSubIndustryId,
    usingLiveImages, imagesLoading, onRefresh,
    onCustomImageUpload, customUploading, customUploadError,
    customImage, onRemoveCustomImage, onResumeCustomImage,
}: {
    filtered: Template[];
    query: string;
    setQuery: (q: string) => void;
    onSelect: (t: Template) => void;
    industries: IndustryOption[];
    industriesLoading: boolean;
    industryId: string;
    setIndustryId: (id: string) => void;
    subIndustries: { id: string | number; name: string }[];
    subIndustryId: string;
    setSubIndustryId: (id: string) => void;
    usingLiveImages: boolean;
    imagesLoading: boolean;
    onRefresh: () => void;
    onCustomImageUpload: (file: File) => void;
    customUploading: boolean;
    customUploadError: string | null;
    customImage: Template | null;
    onRemoveCustomImage: () => void;
    onResumeCustomImage: () => void;
}) {
    const businessTypesCount = industries.reduce((sum, ind) => sum + (ind.subIndustries?.length ?? 0), 0);
    const customFileInputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const [imgPreviewOpen, setImgPreviewOpen] = useState(false);
    // Backend cover-crops any uploaded image to a fixed 500x500 square,
    // centered — a blind auto-crop can cut off the wrong part of an
    // off-center photo. Let the user choose the crop themselves first.
    const [cropFile, setCropFile] = useState<File | null>(null);
    useEffect(() => {
        if (!imgPreviewOpen) return;
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setImgPreviewOpen(false);
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [imgPreviewOpen]);

    function pickFirstImageFile(files: FileList | null): File | null {
        if (!files) return null;
        return Array.from(files).find((f) => f.type.startsWith("image/")) ?? null;
    }

    return (
        <div>
            <section className="relative bg-[#0A0A14] px-6 pb-0 pt-14 text-center">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-600/20 blur-[100px]" />
                </div>

                <div className="relative mx-auto max-w-4xl">
                    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                        <span className="text-gray-400">Templates</span>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> ShoutlyAI Template Library
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Social media templates for
                        <br />
                        <span className="text-orange-500">every business.</span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                        Browse a growing library of ready-to-use posts, reels, and captions for your industry and business type. Pick one you like, and we'll help you personalize it and get it published.
                    </p>

                    <div className="relative mx-auto mt-8 max-w-lg">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="search"
                            placeholder="Search templates, industries or business types…"
                            className="h-13 w-full rounded-2xl border border-transparent bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 shadow-lg outline-none transition focus:ring-4 focus:ring-orange-500/30"
                        />
                    </div>
                </div>

                <div className="relative z-10 mx-auto mt-10 flex max-w-4xl translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <StatCell value="1200+" label="Templates" sub="Ready to use" />
                    <div className="my-6 w-px flex-shrink-0 bg-gray-100 sm:my-8" />
                    <StatCell value="155+" label="Industries" sub="And growing" />
                    <div className="my-6 w-px flex-shrink-0 bg-gray-100 sm:my-8" />
                    <StatCell value="10" label="Social Platforms" sub="Publish everywhere" />
                    <div className="my-6 w-px flex-shrink-0 bg-gray-100 sm:my-8" />
                    <StatCell value="$0.20" label="Branded Download" sub="Browse free • No signup required" />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-10 pt-20">
                {/* Upload your own image — skips template browsing entirely and
                    goes straight into Customize with this image as the background. */}
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        const file = pickFirstImageFile(e.dataTransfer.files);
                        if (file) setCropFile(file);
                    }}
                    className={`mt-6 mb-8 flex flex-col items-center gap-4 rounded-2xl border-[1.5px] border-dashed px-6 py-5 transition sm:flex-row sm:justify-between ${
                        dragOver ? "border-orange-400 bg-orange-50" : "border-gray-200 bg-white"
                    }`}
                >
                    {customImage ? (
                        <>
                            <div className="flex items-center gap-4 text-left">
                                <button
                                    type="button"
                                    onClick={() => setImgPreviewOpen(true)}
                                    aria-label="View full size"
                                    className="group relative h-11 w-11 flex-shrink-0 cursor-zoom-in"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={customImage.image} alt="" className="h-11 w-11 rounded-xl border border-gray-200 object-cover" />
                                    <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                                        <Maximize2 className="h-3.5 w-3.5" />
                                    </span>
                                </button>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{customImage.name}</div>
                                    <div className="mt-0.5 text-xs text-gray-500">Uploaded and ready. Click the image to preview it full size.</div>
                                </div>
                            </div>
                            <div className="flex flex-shrink-0 items-center gap-2">
                                <button
                                    onClick={onRemoveCustomImage}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                                >
                                    <X className="h-3.5 w-3.5" /> Remove
                                </button>
                                <button
                                    onClick={onResumeCustomImage}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:opacity-90"
                                >
                                    Continue <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {imgPreviewOpen && (
                                <div
                                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
                                    onClick={() => setImgPreviewOpen(false)}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setImgPreviewOpen(false)}
                                        aria-label="Close"
                                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={customImage.image}
                                        alt={customImage.name}
                                        className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 text-center sm:text-left">
                                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-orange-50">
                                    <Upload className="h-5 w-5 text-orange-600" />
                                </span>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">Upload your own image</div>
                                    <div className="mt-0.5 text-xs text-gray-500">
                                        Upload any image (JPG, PNG, WEBP) and we&apos;ll turn it into a social media post for you.
                                    </div>
                                    {customUploadError && (
                                        <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {customUploadError}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-shrink-0 flex-col items-center gap-1.5">
                                <input
                                    ref={customFileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setCropFile(file);
                                        e.target.value = "";
                                    }}
                                />
                                <button
                                    onClick={() => customFileInputRef.current?.click()}
                                    disabled={customUploading}
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:opacity-90 disabled:opacity-70"
                                >
                                    {customUploading ? (
                                        <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</>
                                    ) : (
                                        <><Upload className="h-4 w-4" /> Upload Image</>
                                    )}
                                </button>
                                <span className="text-[11px] text-gray-400">or drag and drop</span>
                            </div>
                        </>
                    )}
                </div>

                {cropFile && (
                    <ImageCropModal
                        file={cropFile}
                        onCancel={() => setCropFile(null)}
                        onConfirm={(blob) => {
                            const cropped = new File([blob], cropFile.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: "image/jpeg" });
                            setCropFile(null);
                            onCustomImageUpload(cropped);
                        }}
                    />
                )}

                {/* Industry / Sub-industry picker — pulls real images from the same
                    library the homepage "Find the Perfect Post" section uses. */}
                <div className="flex flex-wrap items-end gap-3 border-b border-gray-100 pb-6">
                    <div className="min-w-[200px] flex-1 sm:flex-none">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">Industry</label>
                        <select
                            value={industryId}
                            onChange={(e) => setIndustryId(e.target.value)}
                            disabled={industriesLoading}
                            className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:opacity-60 sm:w-56"
                        >
                            <option value="">{industriesLoading ? "Loading…" : "Choose your industry"}</option>
                            {industries.map((ind) => (
                                <option key={ind.id} value={String(ind.id)}>{ind.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="min-w-[200px] flex-1 sm:flex-none">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">Sub-industry</label>
                        <select
                            value={subIndustryId}
                            onChange={(e) => setSubIndustryId(e.target.value)}
                            disabled={!industryId || subIndustries.length === 0}
                            className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:opacity-60 sm:w-56"
                        >
                            <option value="">
                                {!industryId ? "Pick an industry first" : subIndustries.length === 0 ? "No sub-industries" : "All sub-industries"}
                            </option>
                            {subIndustries.map((sub) => (
                                <option key={sub.id} value={String(sub.id)}>{sub.name}</option>
                            ))}
                        </select>
                    </div>

                    {usingLiveImages && (
                        <button
                            onClick={onRefresh}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                        >
                            <RefreshCcw className={`h-4 w-4 ${imagesLoading ? "animate-spin" : ""}`} /> Refresh
                        </button>
                    )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        {usingLiveImages
                            ? `${filtered.length} live template${filtered.length === 1 ? "" : "s"}`
                            : `${filtered.length} template${filtered.length === 1 ? "" : "s"} · choose an industry to load live designs`}
                    </p>
                </div>

                {imagesLoading ? (
                    <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                <div className="aspect-[4/5] bg-gray-100" />
                                <div className="space-y-2 p-3.5">
                                    <div className="h-3.5 w-3/4 rounded bg-gray-100" />
                                    <div className="h-3 w-1/2 rounded bg-gray-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                        {filtered.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => onSelect(t)}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-3.5">
                                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-sm font-bold text-orange-600">{PRICE}</span>
                                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition">
                                            Use template
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {!imagesLoading && filtered.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
                        <p className="text-sm text-gray-500">
                            {usingLiveImages ? "No images found for this industry yet." : "No templates match that search."}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

// ── Customize (mirrors app/dashboards/settings/brand — same badge system,
//    sliders, collapsible sections and Instagram-mockup preview) ──────────
const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');";
const SORA = { fontFamily: "'Sora',sans-serif" };
const MONO = { fontFamily: "'JetBrains Mono',monospace" };

type CustomizeProps = {
    template: Template;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    logoUrl: string | null;
    onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onLogoUrlSubmit: (url: string) => void;
    onRemoveLogo: () => void;
    logoUploading: boolean;
    logoUploadError: string | null;
    pos: PosKey;
    setPos: (p: PosKey) => void;
    logoSize: number;
    setLogoSize: (n: number) => void;
    cardScale: number;
    setCardScale: (n: number) => void;
    badgeStyle: BadgeStyle;
    setBadgeStyle: (s: BadgeStyle) => void;
    badgeOpacity: number;
    setBadgeOpacity: (n: number) => void;
    blur: number;
    setBlur: (n: number) => void;
    radius: number;
    setRadius: (n: number) => void;
    primary: string;
    setPrimary: (c: string) => void;
    textColorKey: TextColorKey;
    setTextColorKey: (c: TextColorKey) => void;
    brandName: string;
    setBrandName: (v: string) => void;
    phone: string;
    setPhone: (v: string) => void;
    overlayText: string;
    setOverlayText: (v: string) => void;
    showLogo: boolean; setShowLogo: (v: boolean) => void;
    showName: boolean; setShowName: (v: boolean) => void;
    showContact: boolean; setShowContact: (v: boolean) => void;
    showOvtext: boolean; setShowOvtext: (v: boolean) => void;
    showCorner: boolean; setShowCorner: (v: boolean) => void;
    displayMode: DisplayMode; setDisplayMode: (m: DisplayMode) => void;
    activeImage: string;
    setActiveImage: (src: string) => void;
    siblingTemplates: Template[];
    onContinue: () => void;
};

function CustomizeView(props: CustomizeProps) {
    const {
        template, fileInputRef, logoUrl, onLogoUpload, onLogoUrlSubmit, onRemoveLogo, logoUploading, logoUploadError,
        pos, setPos, logoSize, setLogoSize, cardScale, setCardScale, badgeStyle, setBadgeStyle,
        badgeOpacity, setBadgeOpacity, blur, setBlur, radius, setRadius,
        primary, setPrimary, textColorKey, setTextColorKey,
        brandName, setBrandName, phone, setPhone, overlayText, setOverlayText,
        showLogo, setShowLogo, showName, setShowName, showContact, setShowContact,
        showOvtext, setShowOvtext, showCorner, setShowCorner, displayMode, setDisplayMode,
        activeImage, setActiveImage, siblingTemplates, onContinue,
    } = props;

    const [openSection, setOpenSection] = useState<string | null>("logo");
    const toggle = (id: string) => setOpenSection((s) => (s === id ? null : id));

    const [logoUrlInput, setLogoUrlInput] = useState("");
    function submitLogoUrl() {
        if (!logoUrlInput.trim()) return;
        onLogoUrlSubmit(logoUrlInput);
        setLogoUrlInput("");
    }

    const tc = textColorKey === "white" ? "#fff" : textColorKey === "dark" ? "#0D0E1A" : textColorKey;
    const opacityPct = ((badgeOpacity - 20) / 80) * 100;
    const blurPct = (blur / 24) * 100;
    const radiusPct = (radius / 28) * 100;
    const sizePct = ((logoSize - 24) / 56) * 100;
    const cardScalePct = ((cardScale - 0.5) / 1) * 100;

    const badgeLines: BadgeLine[] = [
        ...(showName && brandName ? [{ text: brandName, fontSize: 15 * cardScale, fontWeight: 800 }] : []),
        ...(showContact && phone ? [{ text: phone, fontSize: 12 * cardScale, fontWeight: 600 }] : []),
        ...(showOvtext && overlayText ? [{ text: overlayText, fontSize: 12 * cardScale, fontWeight: 500 }] : []),
    ];
    const badgeHasContent = (showLogo && !!logoUrl) || badgeLines.length > 0;
    const layout = computeBadgeLayout({ pos, cardScale, logoSize, showLogo, logoUrl, lines: badgeLines });
    const rectStyle = badgeRectStyle(badgeStyle, primary);

    // Sized as 40% of the badge card's own height — scales automatically as
    // cardScale grows/shrinks the card, rather than a fixed 44px. Still
    // inset MARGIN from the canvas edge, same corner as `position`.
    const cornerSize = layout.height * 0.4;
    const cornerPoints: Record<PosKey, string> = {
        tl: `${MARGIN},${MARGIN + cornerSize} ${MARGIN},${MARGIN} ${MARGIN + cornerSize},${MARGIN}`,
        tr: `${CANVAS - MARGIN - cornerSize},${MARGIN} ${CANVAS - MARGIN},${MARGIN} ${CANVAS - MARGIN},${MARGIN + cornerSize}`,
        bl: `${MARGIN},${CANVAS - MARGIN - cornerSize} ${MARGIN},${CANVAS - MARGIN} ${MARGIN + cornerSize},${CANVAS - MARGIN}`,
        br: `${CANVAS - MARGIN - cornerSize},${CANVAS - MARGIN} ${CANVAS - MARGIN},${CANVAS - MARGIN} ${CANVAS - MARGIN},${CANVAS - MARGIN - cornerSize}`,
    };

    const barHeight = CANVAS * 0.18;
    // Bottom bar ignores showName/showContact/showOvtext entirely — those
    // three flags are badge-only now (backend behavior change). The bar
    // always shows whichever of these three fields are non-empty.
    const barText = [brandName, phone, overlayText].filter(Boolean).join("  ·  ");

    return (
        <div className="mx-auto max-w-[1200px] px-6 py-6">
            <style>{FONT_IMPORT}</style>


            <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-gray-200 lg:grid-cols-[320px_1fr_280px]">

                {/* ── LEFT: Settings ── */}
                <div className="max-h-[calc(100vh-160px)] overflow-y-auto border-b border-gray-200 bg-white lg:max-h-none lg:border-b-0 lg:border-r">
                    <div className="border-b border-gray-100 px-5 py-4">
                        <div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-gray-400" style={SORA}>
                            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange-500 to-orange-600" />
                            Brand Overlay Settings
                        </div>
                        <div className="text-lg font-extrabold tracking-tight text-gray-900" style={SORA}>Make this template yours</div>
                        <div className="mt-1 text-xs leading-relaxed text-gray-400">Logo and contact info applied to this post. Changes are live instantly.</div>
                    </div>

                    <Section id="logo" open={openSection === "logo"} onToggle={toggle} icon={ImageIcon} title="Logo Upload" badge="Required">
                        {!logoUrl ? (
                            <label className="upload-box block cursor-pointer rounded-2xl border-[1.5px] border-dashed border-gray-200 bg-[#F0F1F8] px-4 py-5 text-center transition hover:border-orange-300 hover:bg-orange-50">
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={onLogoUpload} className="hidden" />
                                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white">
                                    <Upload className="h-4 w-4 text-orange-600" />
                                </div>
                                <div className="text-sm font-bold text-gray-900" style={SORA}>Drop your logo here</div>
                                <div className="text-xs text-gray-400">or click to browse files</div>
                                <div className="mt-2 flex justify-center gap-1.5">
                                    {["PNG", "SVG", "JPG"].map((f) => (
                                        <span key={f} className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-gray-400" style={MONO}>{f}</span>
                                    ))}
                                </div>
                            </label>
                        ) : null}

                        {!logoUrl && (
                            <div className="mt-3">
                                <div className="mb-1.5 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-wide text-gray-400">
                                    <span className="h-px flex-1 bg-gray-100" /> or paste a logo URL <span className="h-px flex-1 bg-gray-100" />
                                </div>
                                <div className="flex gap-1.5">
                                    <input
                                        type="url"
                                        value={logoUrlInput}
                                        onChange={(e) => setLogoUrlInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submitLogoUrl(); } }}
                                        placeholder="https://example.com/logo.png"
                                        className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-[#F0F1F8] px-3 py-2 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                                    />
                                    <button
                                        onClick={submitLogoUrl}
                                        disabled={!logoUrlInput.trim()}
                                        className="flex-shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600 disabled:opacity-50"
                                    >
                                        Use
                                    </button>
                                </div>
                            </div>
                        )}

                        {logoUrl && (
                            <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-[#F0F1F8] p-2.5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={logoUrl} alt="" className="h-9 w-9 rounded-md border border-gray-200 bg-white object-contain" />
                                <span className="flex-1 truncate text-xs font-bold text-gray-900">
                                    {logoUploading ? "Uploading…" : "Logo uploaded"}
                                </span>
                                {logoUploading ? (
                                    <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin text-orange-600" />
                                ) : (
                                    <button onClick={onRemoveLogo} className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-red-50 text-red-500">
                                        <X className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        )}
                        {logoUploadError && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {logoUploadError}
                            </p>
                        )}
                    </Section>

                    <Section id="position" open={openSection === "position"} onToggle={toggle} icon={Move} title="Logo Position">
                        <div className="grid grid-cols-2 gap-1.5">
                            {POSITIONS.map((p) => (
                                <button
                                    key={p.key}
                                    onClick={() => setPos(p.key)}
                                    className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[12.5px] font-bold transition ${
                                        pos === p.key ? "border-orange-600 bg-orange-50 text-orange-600 shadow-[0_0_0_3px_rgba(249,115,22,0.08)]" : "border-gray-200 bg-[#F0F1F8] text-gray-500 hover:border-orange-200"
                                    }`}
                                    style={SORA}
                                >
                                    <p.icon className="h-3 w-3" /> {p.label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-3.5">
                            <SliderRow label="Logo Size" value={`${logoSize}px`} left="XS" right="XL">
                                <input type="range" min={24} max={80} value={logoSize} onChange={(e) => setLogoSize(+e.target.value)} style={{ background: sliderFill(sizePct) }} className="range-input" />
                            </SliderRow>
                        </div>
                    </Section>

                    <Section id="appearance" open={openSection === "appearance"} onToggle={toggle} icon={SlidersHorizontal} title="Overlay Appearance">
                        <div className="mb-3.5">
                            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">Show Branding As</div>
                            <div className="grid grid-cols-3 gap-1.5">
                                {DISPLAY_MODES.map((m) => (
                                    <button
                                        key={m.key}
                                        onClick={() => setDisplayMode(m.key)}
                                        className={`rounded-lg border px-2 py-2 text-[12.5px] font-bold transition ${
                                            displayMode === m.key ? "border-orange-600 bg-orange-50 text-orange-600" : "border-gray-200 bg-[#F0F1F8] text-gray-500 hover:border-orange-200"
                                        }`}
                                        style={SORA}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3.5">
                            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">Badge Style</div>
                            <div className="grid grid-cols-2 gap-1.5">
                                {BADGE_STYLES.map((b) => (
                                    <button
                                        key={b.key}
                                        onClick={() => setBadgeStyle(b.key)}
                                        className={`rounded-lg border px-2 py-2 text-[12.5px] font-bold transition ${
                                            badgeStyle === b.key ? "border-orange-600 bg-orange-50 text-orange-600" : "border-gray-200 bg-[#F0F1F8] text-gray-500 hover:border-orange-200"
                                        }`}
                                        style={SORA}
                                    >
                                        {b.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <SliderRow label="Card Size" value={`${cardScale.toFixed(2)}x`} left="0.5x" right="1.5x">
                            <input type="range" min={0.5} max={1.5} step={0.05} value={cardScale} onChange={(e) => setCardScale(+e.target.value)} style={{ background: sliderFill(cardScalePct) }} className="range-input" />
                        </SliderRow>
                        <SliderRow label="Opacity" value={`${badgeOpacity}%`} left="20%" right="100%">
                            <input type="range" min={20} max={100} value={badgeOpacity} onChange={(e) => setBadgeOpacity(+e.target.value)} style={{ background: sliderFill(opacityPct) }} className="range-input" />
                        </SliderRow>
                        <SliderRow label="Blur" value={`${blur}px`} left="0" right="24">
                            <input type="range" min={0} max={24} value={blur} onChange={(e) => setBlur(+e.target.value)} style={{ background: sliderFill(blurPct) }} className="range-input" />
                        </SliderRow>
                        <SliderRow label="Corner Radius" value={`${radius}px`} left="0" right="28">
                            <input type="range" min={0} max={28} value={radius} onChange={(e) => setRadius(+e.target.value)} style={{ background: sliderFill(radiusPct) }} className="range-input" />
                        </SliderRow>
                    </Section>

                    <Section id="colors" open={openSection === "colors"} onToggle={toggle} icon={Palette} title="Brand Colors">
                        <div className="mb-3.5">
                            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">Primary Color</div>
                            <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1">
                                {PRIMARY_SWATCHES.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setPrimary(c)}
                                        className="h-7 w-7 flex-shrink-0 rounded-lg transition hover:scale-110"
                                        style={{ background: c, border: `2.5px solid ${primary === c ? "#F97316" : c === "#ffffff" ? "#E4E5EF" : "transparent"}`, boxShadow: primary === c ? "0 0 0 2px rgba(249,115,22,.3)" : undefined }}
                                    />
                                ))}
                                <label className="relative flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-dashed border-gray-200 bg-[#F0F1F8] text-gray-400">
                                    <Plus className="h-3 w-3" />
                                    <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">Text Color on Badge</div>
                            <div className="flex flex-wrap items-center gap-1.5">
                                <button
                                    onClick={() => setTextColorKey("white")}
                                    title="White"
                                    className="h-7 w-7 flex-shrink-0 rounded-lg transition hover:scale-110"
                                    style={{ background: "#fff", border: `2.5px solid ${textColorKey === "white" ? "#F97316" : "#E4E5EF"}`, boxShadow: textColorKey === "white" ? "0 0 0 2px rgba(249,115,22,.3)" : undefined }}
                                />
                                <button
                                    onClick={() => setTextColorKey("dark")}
                                    title="Dark"
                                    className="h-7 w-7 flex-shrink-0 rounded-lg transition hover:scale-110"
                                    style={{ background: "#0D0E1A", border: `2.5px solid ${textColorKey === "dark" ? "#F97316" : "transparent"}`, boxShadow: textColorKey === "dark" ? "0 0 0 2px rgba(249,115,22,.3)" : undefined }}
                                />
                                <label className="relative flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-dashed border-gray-200 bg-[#F0F1F8] text-gray-400" title="Custom color">
                                    <Plus className="h-3 w-3" />
                                    <input type="color" value={/^#[0-9a-fA-F]{6}$/.test(textColorKey) ? textColorKey : "#F97316"} onChange={(e) => setTextColorKey(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                                </label>
                            </div>
                        </div>
                    </Section>

                    <Section id="identity" open={openSection === "identity"} onToggle={toggle} icon={IdCard} title="Brand Identity">
                        <div className="space-y-2.5">
                            <FieldInput label="Brand Name" value={brandName} onChange={setBrandName} placeholder="Your Brand Name" />
                            <FieldInput
                                label="Overlay / Tagline"
                                value={overlayText}
                                onChange={setOverlayText}
                                placeholder="yourbusiness.com"
                                tip="Optional"
                                type="url"
                                error={overlayText && !isValidUrl(overlayText) ? "Enter a valid website URL" : null}
                            />
                            <FieldInput
                                label="Phone / Contact"
                                value={phone}
                                onChange={(v) => setPhone(sanitizePhone(v))}
                                placeholder="+1 (555) 000-0000"
                                type="tel"
                            />
                        </div>
                    </Section>

                    <Section id="visibility" open={openSection === "visibility"} onToggle={toggle} icon={ToggleRight} title="Show / Hide Elements" last>
                        <ToggleRow icon={ImageIcon} iconBg="#EEEEFF" iconColor="#F97316" title="Logo" sub="Display your logo on the post" checked={showLogo} onChange={setShowLogo} />
                        <ToggleRow icon={IdCard} iconBg="#ECFDF5" iconColor="#10B981" title="Brand Name" sub="Display name text on badge" checked={showName} onChange={setShowName} />
                        <ToggleRow icon={CircleDot} iconBg="#FFFBEB" iconColor="#F59E0B" title="Contact Info" sub="Show phone number on badge" checked={showContact} onChange={setShowContact} />
                        <ToggleRow icon={Sparkles} iconBg="#EFF6FF" iconColor="#3B82F6" title="Overlay Text" sub="Show tagline or website URL on badge" checked={showOvtext} onChange={setShowOvtext} />
                        <ToggleRow icon={Move} iconBg="#FDF2F8" iconColor="#EC4899" title="Corner Accents" sub="Branded corner frame element" checked={showCorner} onChange={setShowCorner} last />
                    </Section>
                </div>

                {/* ── MIDDLE: Live Preview ── */}
                <div className="bg-[#F5F6FA] px-5 py-6">
                    <div className="mb-3.5 text-[15px] font-extrabold tracking-tight text-gray-900" style={SORA}>Live Preview</div>

                    <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_12px_32px_rgba(13,14,26,0.1)]">
                        <div className="flex items-center justify-between border-b border-gray-100 px-3.5 py-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-[5px]" style={{ background: "#E1306C" }}>
                                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.35 2.63 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.63 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.63-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>
                            </div>
                            <div className="flex gap-1">
                                {["#EF4444", "#F59E0B", "#10B981"].map((c) => <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />)}
                            </div>
                        </div>

                        <div className="relative w-full overflow-hidden bg-[#F0F1F8]" style={{ aspectRatio: "1 / 1" }}>
                            {activeImage && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={activeImage} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "center" }} />
                            )}
                            {/* Fixed 500x500 reference frame, matching the backend renderer exactly —
                                viewBox scaling means every coordinate below is correct at any
                                actual rendered size with no manual scale-factor math needed. */}
                            <svg viewBox={`0 0 ${CANVAS} ${CANVAS}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
                                <defs>
                                    <clipPath id="tpl-logo-clip">
                                        <rect x={layout.logoX} y={layout.logoY} width={layout.logoSize} height={layout.logoSize} rx={6} ry={6} />
                                    </clipPath>
                                    <linearGradient id="tpl-bar-gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#000000" stopOpacity={0} />
                                        <stop offset="100%" stopColor={primary} stopOpacity={1} />
                                    </linearGradient>
                                </defs>

                                {displayMode !== "bar" && badgeHasContent && (
                                    <g opacity={badgeOpacity / 100}>
                                        <rect
                                            x={layout.x} y={layout.y} width={layout.width} height={layout.height}
                                            rx={radius} ry={radius}
                                            fill={rectStyle.fill}
                                            stroke={rectStyle.stroke}
                                            strokeWidth={rectStyle.strokeWidth}
                                        />
                                        {layout.showLogoBox && logoUrl && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <image
                                                href={logoUrl}
                                                x={layout.logoX} y={layout.logoY}
                                                width={layout.logoSize} height={layout.logoSize}
                                                preserveAspectRatio="xMidYMid meet"
                                                clipPath="url(#tpl-logo-clip)"
                                            />
                                        )}
                                        {badgeLines.map((line, i) => (
                                            <text
                                                key={i}
                                                x={layout.textStartX}
                                                y={layout.textTopY + i * layout.lineHeight + layout.baselineOffset}
                                                fontFamily={BADGE_FONT_STACK}
                                                fontSize={line.fontSize}
                                                fontWeight={line.fontWeight}
                                                fill={tc}
                                            >
                                                {line.text}
                                            </text>
                                        ))}
                                    </g>
                                )}

                                {showCorner && (
                                    <polyline points={cornerPoints[pos]} fill="none" stroke={primary} strokeWidth={4} />
                                )}

                                {displayMode !== "badge" && (
                                    <>
                                        <rect x={0} y={CANVAS - barHeight} width={CANVAS} height={barHeight} fill="url(#tpl-bar-gradient)" />
                                        <text
                                            x={CANVAS / 2}
                                            y={CANVAS - 18}
                                            textAnchor="middle"
                                            fontFamily={BADGE_FONT_STACK}
                                            fontSize={13}
                                            fontWeight={600}
                                            fill={tc}
                                        >
                                            {barText || "Your brand  ·  phone  ·  website"}
                                        </text>
                                    </>
                                )}
                            </svg>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 px-3.5 py-2.5">
                            <div className="flex gap-3 text-gray-400">
                                <span className="flex items-center gap-1 text-xs"><Heart className="h-3 w-3" /> 24.8K</span>
                                <span className="flex items-center gap-1 text-xs"><MessageCircle className="h-3 w-3" /> 1.2K</span>
                                <span className="flex items-center gap-1 text-xs"><Share2 className="h-3 w-3" /> 847</span>
                            </div>
                            <span className="rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-600" style={SORA}>Overlay Active</span>
                        </div>
                    </div>


                    {siblingTemplates.length > 0 && (
                        <div className="mx-auto mt-4 max-w-md">
                            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-gray-400">Test Backgrounds</div>
                            <div className="flex w-full justify-center gap-1.5 overflow-x-auto pb-1">
                                {[template, ...siblingTemplates].map((t) => (
                                    <button key={t.id} onClick={() => setActiveImage(t.image)} className="flex-shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={t.image}
                                            alt=""
                                            className="h-14 w-20 rounded-lg object-cover transition hover:scale-105"
                                            style={{ border: `2.5px solid ${activeImage === t.image ? "#F97316" : "transparent"}`, boxShadow: activeImage === t.image ? "0 0 0 2px rgba(249,115,22,.25)" : undefined }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onContinue}
                        className="mx-auto mt-6 block w-full max-w-md rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:opacity-90"
                        style={SORA}
                    >
                        Continue — {PRICE}
                    </button>
                </div>

                {/* ── RIGHT: Summary ── */}
                <div className="border-t border-gray-200 bg-white px-4 py-5 lg:border-l lg:border-t-0">
                    <div className="mb-1 text-sm font-extrabold text-gray-900" style={SORA}>Overlay Summary</div>
                    <div className="mb-4 text-xs text-gray-400">Current template config</div>

                    <div className="mb-4 rounded-xl border border-gray-200 bg-[#F0F1F8] p-3">
                        <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-gray-400">Template</div>
                        <div className="text-sm font-bold text-gray-900">{template.name}</div>
                        <div className="mt-0.5 text-xs text-gray-400">{template.category}</div>
                    </div>

                    <div className="mb-4 rounded-xl border border-gray-200 bg-[#F0F1F8] p-3">
                        <div className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-gray-900" style={SORA}>
                            <SlidersHorizontal className="h-3 w-3 text-orange-600" /> Settings Summary
                        </div>
                        {[
                            { k: "Position", v: POSITIONS.find((p) => p.key === pos)?.label },
                            { k: "Logo Size", v: `${logoSize}px` },
                            { k: "Card Size", v: `${cardScale.toFixed(2)}x` },
                            { k: "Opacity", v: `${badgeOpacity}%` },
                            { k: "Style", v: badgeStyle.charAt(0).toUpperCase() + badgeStyle.slice(1) },
                            { k: "Logo", v: logoUrl ? "Uploaded" : "Not set", col: logoUrl ? "#10B981" : "#EF4444" },
                            { k: "Corner", v: showCorner ? "On" : "Off", col: showCorner ? "#10B981" : "#9496B5" },
                        ].map((row, i, arr) => (
                            <div key={row.k} className={`flex items-center justify-between py-1.5 text-xs ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                                <span className="font-medium text-gray-400">{row.k}</span>
                                <span className="font-bold" style={{ color: row.col || "#0D0E1A", ...MONO, fontSize: 11.5 }}>{row.v}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .range-input { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 2px; outline: none; cursor: pointer; }
                .range-input::-webkit-slider-thumb { -webkit-appearance: none; width: 15px; height: 15px; border-radius: 50%; background: #F97316; border: 2.5px solid #fff; box-shadow: 0 1px 4px rgba(249,115,22,.5); cursor: pointer; }
            `}</style>
        </div>
    );
}

function Section({
    id, open, onToggle, icon: Icon, title, badge, children, last,
}: {
    id: string;
    open: boolean;
    onToggle: (id: string) => void;
    icon: typeof ImageIcon;
    title: string;
    badge?: string;
    children: React.ReactNode;
    last?: boolean;
}) {
    return (
        <div className={last ? "" : "border-b border-gray-100"}>
            <button onClick={() => onToggle(id)} className="flex w-full items-center gap-2 px-5 py-3.5 text-left">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#EEEEFF]">
                    <Icon className="h-3 w-3 text-orange-600" />
                </span>
                <span className="flex-1 text-[13px] font-bold text-gray-900" style={SORA}>{title}</span>
                {badge && <span className="rounded bg-[#EEEEFF] px-1.5 py-0.5 text-[10px] font-bold text-orange-600">{badge}</span>}
                <ChevronDown className={`h-3 w-3 flex-shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <div className="px-5 pb-4">{children}</div>}
        </div>
    );
}

// ── Crop-to-square modal (client-side, before upload) ──────────────────────
// The backend cover-crops any uploaded image to a fixed 500x500 square,
// centered — fine for an already-square or well-centered photo, but a blind
// auto-crop can cut off the wrong part of an off-center one. This lets the
// user pan/zoom to choose what stays before the file ever reaches the
// upload API, using the exact same 500x500 output size the backend expects.
const CROP_VIEWPORT = 440;
const CROP_OUTPUT = 500;

function ImageCropModal({ file, onCancel, onConfirm }: { file: File; onCancel: () => void; onConfirm: (blob: Blob) => void }) {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [natural, setNatural] = useState({ w: 0, h: 0 });
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const dragRef = useRef<{ startX: number; startY: number; startOffX: number; startOffY: number } | null>(null);

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setImgUrl(url);
        const img = new Image();
        img.onload = () => setNatural({ w: img.naturalWidth, h: img.naturalHeight });
        img.src = url;
        return () => URL.revokeObjectURL(url);
    }, [file]);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onCancel();
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // baseScale: the smallest scale at which the image fully covers the
    // square viewport (same "cover" behavior the backend applies by default,
    // matching it at zoom=1 before the user adjusts anything).
    const baseScale = natural.w && natural.h ? Math.max(CROP_VIEWPORT / natural.w, CROP_VIEWPORT / natural.h) : 1;
    const scale = baseScale * zoom;
    const dispW = natural.w * scale;
    const dispH = natural.h * scale;

    function clampOffset(ox: number, oy: number) {
        const maxX = Math.max(0, (dispW - CROP_VIEWPORT) / 2);
        const maxY = Math.max(0, (dispH - CROP_VIEWPORT) / 2);
        return { x: Math.min(maxX, Math.max(-maxX, ox)), y: Math.min(maxY, Math.max(-maxY, oy)) };
    }

    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
        dragRef.current = { startX: e.clientX, startY: e.clientY, startOffX: offset.x, startOffY: offset.y };
        e.currentTarget.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setOffset(clampOffset(dragRef.current.startOffX + dx, dragRef.current.startOffY + dy));
    }
    function onPointerUp() {
        dragRef.current = null;
    }

    function confirmCrop() {
        if (!imgUrl || !natural.w) return;
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = CROP_OUTPUT;
            canvas.height = CROP_OUTPUT;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const outputRatio = CROP_OUTPUT / CROP_VIEWPORT;
            const drawW = dispW * outputRatio;
            const drawH = dispH * outputRatio;
            const drawX = CROP_OUTPUT / 2 - drawW / 2 + offset.x * outputRatio;
            const drawY = CROP_OUTPUT / 2 - drawH / 2 + offset.y * outputRatio;
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
            canvas.toBlob((blob) => { if (blob) onConfirm(blob); }, "image/jpeg", 0.92);
        };
        img.src = imgUrl;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6" onClick={onCancel}>
            <style>{`
                .crop-range-input { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 2px; outline: none; cursor: pointer; background: #E4E5EF; }
                .crop-range-input::-webkit-slider-thumb { -webkit-appearance: none; width: 15px; height: 15px; border-radius: 50%; background: #F97316; border: 2.5px solid #fff; box-shadow: 0 1px 4px rgba(249,115,22,.5); cursor: pointer; }
                .crop-range-input::-moz-range-thumb { width: 15px; height: 15px; border-radius: 50%; background: #F97316; border: 2.5px solid #fff; box-shadow: 0 1px 4px rgba(249,115,22,.5); cursor: pointer; }
            `}</style>
            <div
                className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-1 text-sm font-bold text-gray-900">Crop your image</div>
                <div className="mb-3 text-xs text-gray-500">Drag to reposition, zoom to adjust — this is the exact square the backend will use.</div>

                <div
                    className="relative mx-auto touch-none overflow-hidden rounded-xl bg-gray-100"
                    style={{ width: CROP_VIEWPORT, height: CROP_VIEWPORT, cursor: dragRef.current ? "grabbing" : "grab" }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerLeave={onPointerUp}
                >
                    {imgUrl && natural.w > 0 && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={imgUrl}
                            alt=""
                            draggable={false}
                            style={{
                                position: "absolute",
                                left: CROP_VIEWPORT / 2 - dispW / 2 + offset.x,
                                top: CROP_VIEWPORT / 2 - dispH / 2 + offset.y,
                                width: dispW,
                                height: dispH,
                                maxWidth: "none",
                                userSelect: "none",
                            }}
                        />
                    )}
                </div>

                <div className="mt-3">
                    <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-gray-400">
                        <span>Zoom</span>
                        <span className="text-[10.5px] font-medium normal-case tracking-normal text-gray-300">{zoom.toFixed(1)}x</span>
                    </div>
                    <input
                        type="range" min={1} max={3} step={0.05} value={zoom}
                        onChange={(e) => {
                            const nextZoom = +e.target.value;
                            setZoom(nextZoom);
                            const nextScale = baseScale * nextZoom;
                            setOffset((prev) => clampOffset(prev.x * (nextScale / scale || 1), prev.y * (nextScale / scale || 1)));
                        }}
                        className="crop-range-input"
                    />
                </div>

                <div className="mt-4 flex gap-2">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmCrop}
                        className="flex-1 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:opacity-90"
                    >
                        Use this crop
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCell({ value, label, sub }: { value: string; label: string; sub: string }) {
    return (
        <div className="flex-1 px-3 py-7 text-center sm:px-6">
            <div className="text-xl font-extrabold text-orange-500 sm:text-3xl">{value}</div>
            <div className="mt-1.5 text-xs font-bold text-gray-900 sm:text-sm">{label}</div>
            <div className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">{sub}</div>
        </div>
    );
}

function SliderRow({ label, value, left, right, children }: { label: string; value: string; left: string; right: string; children: React.ReactNode }) {
    return (
        <div className="mb-3.5">
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-gray-400">
                <span>{label}</span>
                <span className="text-[10.5px] font-medium normal-case tracking-normal text-gray-300">{value}</span>
            </div>
            <div className="flex items-center gap-2.5">
                <span className="flex-shrink-0 text-[10px] text-gray-300">{left}</span>
                {children}
                <span className="flex-shrink-0 text-[10px] text-gray-300">{right}</span>
            </div>
        </div>
    );
}

function FieldInput({
    label, value, onChange, placeholder, tip, type = "text", error,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    tip?: string;
    type?: "text" | "url" | "tel";
    error?: string | null;
}) {
    return (
        <div>
            <div className="mb-1.5 flex items-center text-[11px] font-bold uppercase tracking-wide text-gray-400">
                <span>{label}</span>
                {tip && <span className="ml-auto text-[10.5px] font-medium normal-case tracking-normal text-gray-300">{tip}</span>}
            </div>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full rounded-lg border px-3 py-2.5 text-[13.5px] outline-none focus:ring-2 ${
                    error ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100" : "border-gray-200 bg-[#F0F1F8] focus:border-orange-400 focus:ring-orange-100"
                }`}
            />
            {error && <p className="mt-1 text-[10.5px] font-semibold text-red-600">{error}</p>}
        </div>
    );
}

function ToggleRow({
    icon: Icon, iconBg, iconColor, title, sub, checked, onChange, last,
}: {
    icon: typeof ImageIcon;
    iconBg: string;
    iconColor: string;
    title: string;
    sub: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    last?: boolean;
}) {
    return (
        <div className={`flex items-center justify-between py-2 ${last ? "" : "border-b border-gray-100"}`}>
            <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: iconBg }}>
                    <Icon className="h-3 w-3" style={{ color: iconColor }} />
                </span>
                <div>
                    <div className="text-[13px] font-semibold text-gray-900">{title}</div>
                    <div className="mt-0.5 text-[11px] text-gray-400">{sub}</div>
                </div>
            </div>
            <MiniToggle checked={checked} onChange={onChange} />
        </div>
    );
}

function MiniToggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`relative h-5 w-9 flex-shrink-0 rounded-full transition ${checked ? "bg-orange-600" : "bg-gray-200"}`}
        >
            <span
                className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
                style={{ left: checked ? 18 : 2 }}
            />
        </button>
    );
}

// ── Payment (access-code gated — stands in for a real payment provider) ──
function PaymentView({
    template, processing, renderError, onBack, onUnlock,
}: {
    template: Template;
    processing: boolean;
    renderError: string | null;
    onBack: () => void;
    onUnlock: (code: string) => Promise<{ ok: boolean; error?: string }>;
}) {
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (processing) return;
        setCodeError(null);
        const result = await onUnlock(code.trim());
        if (!result.ok) setCodeError(result.error ?? "Something went wrong.");
    }

    const error = codeError ?? renderError;

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16">
            <button onClick={onBack} className="mb-6 inline-flex items-center gap-1.5 self-start text-sm font-bold text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-4 w-4" /> Back to editor
            </button>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-2xl font-extrabold text-gray-900">Checkout</h2>

                <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-left">
                    <div className="mb-4 text-sm font-bold text-gray-900">{template.name}</div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Branded post export</span>
                        <span className="font-bold text-gray-900">{PRICE}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t-2 border-gray-200 pt-3 text-base font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-orange-600">{PRICE}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 text-left">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
                        Enter access code to unlock your download
                    </label>
                    <div className="relative">
                        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            value={code}
                            onChange={(e) => { setCode(e.target.value); setCodeError(null); }}
                            placeholder="Enter code"
                            inputMode="numeric"
                            autoComplete="off"
                            disabled={processing}
                            className="w-full rounded-xl border-2 border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:opacity-70"
                        />
                    </div>

                    {error && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={processing || !code.trim()}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:opacity-90 disabled:opacity-70"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Rendering your post…
                            </>
                        ) : (
                            "Unlock & Continue"
                        )}
                    </button>
                </form>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <ShieldCheck className="h-3.5 w-3.5" /> Demo checkout — no card is charged
                </p>
            </div>
        </div>
    );
}

// ── Success ──────────────────────────────────────────────────────────────
function SuccessView({ renderResult, onCreateAnother }: { renderResult: ApplyLogoOverlayResponse | null; onCreateAnother: () => void }) {
    const previewSrc = renderResult ? resolveRenderUrl(renderResult.previewUrl) : null;
    const downloadHref = renderResult ? resolveRenderUrl(renderResult.downloadUrl) : null;

    // Signed-in users go straight to their dashboard; everyone else signs in first.
    const { user } = useUserProfile();
    const automateHref = user ? "/dashboards" : "/sign-in";

    const [lightboxOpen, setLightboxOpen] = useState(false);
    useEffect(() => {
        if (!lightboxOpen) return;
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setLightboxOpen(false);
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [lightboxOpen]);

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-5 text-3xl font-extrabold text-gray-900">Your branded post is ready!</h2>
            <p className="mt-2 text-gray-500">Download your professionally branded image below.</p>

            {previewSrc && (
                <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="group relative mx-auto mt-6 block w-full max-w-xs cursor-zoom-in"
                    aria-label="View full size"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewSrc} alt="Your branded post" className="w-full rounded-2xl border border-gray-200 shadow-lg transition group-hover:opacity-90" />
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                        <Maximize2 className="h-3.5 w-3.5" /> View full size
                    </span>
                </button>
            )}

            {lightboxOpen && previewSrc && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Close"
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={previewSrc}
                        alt="Your branded post — full size"
                        className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <div className="mt-7 flex flex-wrap justify-center gap-3">
                {downloadHref ? (
                    <a
                        href={downloadHref}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:opacity-90"
                    >
                        <Download className="h-4 w-4" /> Download
                    </a>
                ) : (
                    <span className="inline-flex items-center gap-2 rounded-xl bg-gray-200 px-6 py-3 text-sm font-bold text-gray-400">
                        <Download className="h-4 w-4" /> Download unavailable
                    </span>
                )}
                <button
                    onClick={onCreateAnother}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                >
                    <Plus className="h-4 w-4" /> Create another
                </button>
            </div>

            {renderResult && (
                <p className="mt-3 text-xs text-gray-400">
                    This link expires in {Math.round(renderResult.expiresIn / 60)} minutes. Come back and unlock again if you need it later.
                </p>
            )}

            <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-left">
                <h3 className="flex items-center gap-2 text-sm font-bold text-orange-700">
                    <Rocket className="h-4 w-4" /> Want this automated?
                </h3>
                <p className="mt-2 text-sm text-orange-700/90">
                    ShoutlyAI creates and publishes branded posts like this automatically, every week, across all your social channels.
                </p>
                <Link
                    href={automateHref}
                    className="mt-4 block w-full rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-700"
                >
                    Start automating now
                </Link>
            </div>
        </div>
    );
}
