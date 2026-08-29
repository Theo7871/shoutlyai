"use client";
import React, { useRef, useState, useEffect } from "react";
import NextImage from "next/image";
import dynamic from "next/dynamic";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { RefreshCcw, Image, Plus, Mic, Smartphone, Monitor, Heart, MessageCircle, MoreHorizontal, Share2, ClipboardList } from "lucide-react";
import { fetchImages } from "@/api/homeApi";
import { API_ENDPOINTS, API_BASE_URL } from "@/api/configApi";
import { generatePromptOnlyImages, GeneratedPost } from "@/api/postGeneratorApi";
import type { Industry, SubIndustry, ImageItem } from "@/types/home";

const PostPopup = dynamic(() => import("@/components/PostPopup"), { ssr: false });

const MIN_BRAND_DESCRIPTION_CHARS = 30;
const MAX_BRAND_DESCRIPTION_CHARS = 300;
const GENERATED_POSTS_KEY = "shoutly_generated_posts";

const LOCAL_TEMPLATE_FALLBACKS = [
    "/templates/template-1.jpg",
    "/templates/template-2.jpg",
    "/templates/template-3.jpg",
    "/templates/template-4.jpg",
];

// Numbered poster templates in public/images (3.png ... 27.png) used to seed
// the homepage preview grid with 7 random images before any industry is picked.
const PREVIEW_TEMPLATE_IMAGES = Array.from({ length: 25 }, (_, i) => `/images/${i + 3}.png`);

const getRandomPreviewImages = (count: number): ImageItem[] => {
    const shuffled = [...PREVIEW_TEMPLATE_IMAGES];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count).map((url) => ({ id: url, url }));
};

// ── Isolated typing-effect hook (module scope so it doesn't re-render the whole page) ──
function useTypingEffect(words: string[], speed: number = 50, pause: number = 2000) {
    const [index, setIndex] = React.useState(0);
    const [subIndex, setSubIndex] = React.useState(0);
    const [reverse, setReverse] = React.useState(false);

    React.useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | undefined;
        if (subIndex === words[index].length + 1 && !reverse) {
            timeout = setTimeout(() => setReverse(true), pause);
            return () => clearTimeout(timeout);
        }
        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }
        timeout = setTimeout(
            () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
            reverse ? Math.max(20, speed / 2) : speed,
        );
        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, pause]);

    return words[index].substring(0, subIndex);
}

const TYPING_PLACEHOLDERS = [
    "Real estate company helping families find premium apartments.",
    "Luxury salon in Dubai offering hair, skincare, bridal makeup, and spa services.",
    "https://yourbusiness.com",
    "Luxury salon in Dubai offering hair, skincare, bridal makeup, and spa services.",
];

// Isolated component — only this re-renders on every typing tick, not the whole page
const AnimatedTextarea = React.memo(function AnimatedTextarea({
    value,
    onChange,
    minLength,
    maxLength,
    className,
}: {
    value: string;
    onChange: (v: string) => void;
    minLength?: number;
    maxLength?: number;
    className?: string;
}) {
    const placeholder = useTypingEffect(TYPING_PLACEHOLDERS);
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
            minLength={minLength}
            maxLength={maxLength}
            className={className}
            placeholder={placeholder}
        />
    );
});

export default function PostGeneratorSection({ industries }: { industries: Industry[] }) {
    const [generateSelectedIndustry, setGenerateSelectedIndustry] = useState<string>("");
    const [generateSubIndustries, setGenerateSubIndustries] = useState<SubIndustry[]>([]);
    const [generateImages, setGenerateImages] = useState<ImageItem[]>([]);
    const [generateLoadingImages, setGenerateLoadingImages] = useState(false);
    const [previewStockImages, setPreviewStockImages] = useState<ImageItem[]>(
        PREVIEW_TEMPLATE_IMAGES.slice(0, 8).map((url) => ({ id: url, url }))
    );

    // Randomize the 8 preview templates once mounted (kept deterministic above for SSR).
    useEffect(() => {
        setPreviewStockImages(getRandomPreviewImages(8));
    }, []);

    const [streamedPosts, setStreamedPosts] = useState<GeneratedPost[]>([]);
    const [streamLoading, setStreamLoading] = useState(false);
    const [streamError, setStreamError] = useState<string | null>(null);
    const [totalPreviewSlots, setTotalPreviewSlots] = useState(0);
    const [selectedPreviewPost, setSelectedPreviewPost] = useState<{ imageUrl: string; caption?: string } | null>(null);
    const streamAbortRef = useRef<AbortController | null>(null);
    const previewTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const [generateSelectedSubIndustry, setGenerateSelectedSubIndustry] = useState<string | null>(null);
    const [generatePendingSubIndustry, setGeneratePendingSubIndustry] = useState<string | null>(null);
    const [brandDescription, setBrandDescription] = useState("");

    const imageCacheRef = React.useRef<Record<string, ImageItem[]>>({});
    const imageFetchInFlightRef = React.useRef<Record<string, Promise<ImageItem[]>>>({});

    const handleSelectGenerateIndustry = (id: string) => {
        setGenerateSelectedIndustry(id);
        setGenerateSelectedSubIndustry(null);
        setGeneratePendingSubIndustry(null);
        const selected = industries.find(
            (ind: Industry) => String(ind.id) === String(id),
        );
        setGenerateSubIndustries(selected?.subIndustries || []);
    };
    const [selectedContent, setSelectedContent] = useState<"photos" | "reels" | null>("photos");
    const [isRegeneratingBrand, setIsRegeneratingBrand] = useState(false);
    const [regenerateBrandError, setRegenerateBrandError] = useState<string | null>(null);
    const [generateValidationError, setGenerateValidationError] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState<"phone" | "window">("phone");

    const regenerateBrandAbortRef = useRef<AbortController | null>(null);
    const getImageCacheKey = (subIndustry: string | null) => subIndustry || "__all__";
    const getPreviewImageIdentity = (img: ImageItem, index: number) =>
        img.id?.toString() ||
        img.file ||
        img.url ||
        `${img.name || img.title || "preview"}-${index}`;
    const getLocalTemplateFallback = (index: number) =>
        LOCAL_TEMPLATE_FALLBACKS[index % LOCAL_TEMPLATE_FALLBACKS.length];
    const getImageUrl = (img?: ImageItem | null) => img?.file || img?.url || "";
    const getSubIndustryFallbackImage = (index: number) => {
        const sourcePool = generateImages.length ? generateImages : previewStockImages;
        if (!sourcePool.length) return getLocalTemplateFallback(index);
        const source = sourcePool[index % sourcePool.length];
        return getImageUrl(source) || getLocalTemplateFallback(index);
    };

    const getImagesWithCache = async (
        subIndustry: string | null,
        forceRefresh = false,
    ) => {
        const cacheKey = getImageCacheKey(subIndustry);
        const cached = imageCacheRef.current[cacheKey];

        if (!forceRefresh && cached) {
            setGenerateImages(cached);
            setGenerateLoadingImages(false);
            return;
        }

        const existingRequest = imageFetchInFlightRef.current[cacheKey];
        if (!forceRefresh && existingRequest) {
            setGenerateLoadingImages(true);
            try {
                const data = await existingRequest;
                setGenerateImages(data);
            } finally {
                setGenerateLoadingImages(false);
            }
            return;
        }

        setGenerateLoadingImages(true);
        const requestPromise = fetchImages(subIndustry)
            .then((data) => {
                imageCacheRef.current[cacheKey] = data;
                return data;
            })
            .finally(() => {
                if (imageFetchInFlightRef.current[cacheKey] === requestPromise) {
                    delete imageFetchInFlightRef.current[cacheKey];
                }
            });

        imageFetchInFlightRef.current[cacheKey] = requestPromise;

        try {
            const data = await requestPromise;
            setGenerateImages(data);
        } finally {
            setGenerateLoadingImages(false);
        }
    };

    useEffect(() => {
        return () => { previewTimers.current.forEach(clearTimeout); };
    }, []);

    useEffect(() => {
        try {
            const savedPosts = JSON.parse(localStorage.getItem(GENERATED_POSTS_KEY) || "[]");
            if (Array.isArray(savedPosts) && savedPosts.length > 0) {
                setStreamedPosts(savedPosts);
            }
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        if (!generateSelectedSubIndustry) return;
        getImagesWithCache(generateSelectedSubIndustry);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generateSelectedSubIndustry]);

    useEffect(() => {
        const seen = new Set<string>();
        const uniqueImages = generateImages.filter((img, index) => {
            const identity = getPreviewImageIdentity(img, index);

            if (seen.has(identity)) return false;
            seen.add(identity);
            return true;
        });

        if (!uniqueImages.length) {
            // If no unique images from API, don't clear. This preserves the random template fallback.
            return;
        }

        const fallbackShuffle = [...uniqueImages];
        for (let i = fallbackShuffle.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [fallbackShuffle[i], fallbackShuffle[j]] = [fallbackShuffle[j], fallbackShuffle[i]];
        }

        if (typeof window === "undefined") {
            setPreviewStockImages(fallbackShuffle.slice(0, 8));
            return;
        }

        const storageKey = `preview-stock-order:${generateSelectedSubIndustry || "__all__"}`;
        const byIdentity = new Map(
            uniqueImages.map((img, index) => [getPreviewImageIdentity(img, index), img]),
        );

        let ordered: ImageItem[] = [];
        try {
            const stored = window.sessionStorage.getItem(storageKey);
            const storedIds = stored ? (JSON.parse(stored) as string[]) : [];
            ordered = storedIds
                .map((id) => byIdentity.get(id))
                .filter((img): img is ImageItem => Boolean(img));
        } catch {
            ordered = [];
        }

        const usedIds = new Set(
            ordered.map((img, index) => getPreviewImageIdentity(img, index)),
        );
        const remaining = fallbackShuffle.filter(
            (img, index) => !usedIds.has(getPreviewImageIdentity(img, index)),
        );
        const nextImages = [...ordered, ...remaining].slice(0, 8);

        try {
            window.sessionStorage.setItem(
                storageKey,
                JSON.stringify(
                    nextImages.map((img, index) => getPreviewImageIdentity(img, index)),
                ),
            );
        } catch {
            // Ignore session storage failures and still use in-memory order.
        }

        setPreviewStockImages(nextImages);
    }, [generateImages, generateSelectedSubIndustry]);

    const previewPrimaryStockImages = previewStockImages.slice(0, 8);
    const shouldShowFirstLoadMsg =
        !streamLoading &&
        streamedPosts.length === 0 &&
        (generateLoadingImages || previewPrimaryStockImages.length < 8);
    const isGenerateReady =
        !!generateSelectedIndustry &&
        !!generatePendingSubIndustry &&
        !!selectedContent &&
        brandDescription.trim().length >= MIN_BRAND_DESCRIPTION_CHARS;

    const getGenerateMissingFields = () => {
        const missing: string[] = [];

        if (!generateSelectedIndustry) missing.push("industry");
        if (!generatePendingSubIndustry) missing.push("sub-industry");
        if (!selectedContent) missing.push("content type (Create Photos or Create Reels)");
        if (brandDescription.trim().length < MIN_BRAND_DESCRIPTION_CHARS) {
            missing.push(`brand description (minimum ${MIN_BRAND_DESCRIPTION_CHARS} characters)`);
        }

        return missing;
    };

    const handleGenerateClick = async () => {
        const missing = getGenerateMissingFields();
        if (missing.length > 0) {
            setGenerateValidationError(`Please select/fill: ${missing.join(", ")}.`);
            return;
        }

        setGenerateValidationError(null);
        const effectiveIndustryId = generateSelectedIndustry;
        const effectiveSubIndustryId = generatePendingSubIndustry;

        if (!effectiveIndustryId || !effectiveSubIndustryId) {
            setGenerateValidationError("Please select/fill: industry, sub-industry.");
            return;
        }

        const selectedIndustryObj = industries.find(
            (industry: Industry) => String(industry.id) === String(effectiveIndustryId),
        );

        const selectedSubIndustryObj = selectedIndustryObj?.subIndustries.find(
            (sub: SubIndustry) => String(sub.id) === String(effectiveSubIndustryId),
        );

        if (!selectedSubIndustryObj) {
            setGenerateValidationError("Selected sub-industry is invalid. Please select again.");
            return;
        }

        if (!selectedContent) {
            setSelectedContent("photos");
        }

        setGenerateSubIndustries(selectedIndustryObj?.subIndustries || []);
        setGenerateSelectedSubIndustry(effectiveSubIndustryId);

        await generateStreamPreview(effectiveIndustryId, effectiveSubIndustryId);
    };

    const handleRegenerateBrandDescription = async () => {
        if (isRegeneratingBrand) return;

        setRegenerateBrandError(null);
        setIsRegeneratingBrand(true);
        setBrandDescription("");

        regenerateBrandAbortRef.current?.abort();
        const controller = new AbortController();
        regenerateBrandAbortRef.current = controller;

        try {
            const response = await fetch(API_ENDPOINTS.textGeneratorGenerateDirect, {
                method: "POST",
                headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
                body: JSON.stringify({ prompt: brandDescription.trim() || "Generate a brand description" }),
                signal: controller.signal,
            });

            if (!response.ok || !response.body) {
                throw new Error(`Request failed (${response.status})`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            let accumulated = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith("data:")) continue;
                    const raw = trimmed.slice(5).trim();
                    if (!raw || raw === "[DONE]") continue;
                    try {
                        const parsed = JSON.parse(raw) as { text?: string; done?: boolean };
                        if (parsed.done) break;
                        if (parsed.text) {
                            accumulated += parsed.text;
                            setBrandDescription(accumulated);
                        }
                    } catch {
                        // skip malformed chunk
                    }
                }
            }

            if (!accumulated) throw new Error("No text received from API.");
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") return;
            setRegenerateBrandError(
                error instanceof Error ? error.message : "Could not regenerate. Please try again.",
            );
        } finally {
            if (regenerateBrandAbortRef.current === controller) {
                regenerateBrandAbortRef.current = null;
            }
            setIsRegeneratingBrand(false);
        }
    };

    const generateStreamPreview = async (
        industryIdOverride?: string,
        subIndustryIdOverride?: string,
    ) => {
        const effectiveSubIndustryId = subIndustryIdOverride || generatePendingSubIndustry;
        if (!effectiveSubIndustryId) return;

        previewTimers.current.forEach(clearTimeout);
        previewTimers.current = [];
        streamAbortRef.current?.abort();
        const controller = new AbortController();
        streamAbortRef.current = controller;

        setStreamLoading(true);
        setStreamedPosts([]);
        setStreamError(null);
        setTotalPreviewSlots(7);

        try {
            const token = typeof window !== "undefined" ? localStorage.getItem("shoutly_token") : null;
            const res = await fetch(`${API_BASE_URL}/api/generator/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ subIndustryId: String(effectiveSubIndustryId) }),
                signal: controller.signal,
            });

            const json = await res.json().catch(() => ({ success: false, posts: [] }));
            const posts: GeneratedPost[] = Array.isArray(json.posts)
                ? json.posts.filter((p: any) => p?.image?.imageUrl)
                : [];

            if (posts.length > 0) {
                setStreamError(null);
                try { localStorage.setItem(GENERATED_POSTS_KEY, JSON.stringify(posts)); } catch { /* ignore */ }

                // Adjust slots to match actual post count (API may return < 7)
                setTotalPreviewSlots(posts.length);
                // Show first post immediately, then reveal the rest one by one (4–7 s gaps)
                setStreamedPosts([posts[0]]);
                setStreamLoading(false);
                let cumDelay = 0;
                posts.slice(1).forEach((post) => {
                    cumDelay += 4000 + Math.random() * 3000;
                    const t = setTimeout(() => {
                        setStreamedPosts(prev => [...prev, post]);
                    }, cumDelay);
                    previewTimers.current.push(t);
                });
            } else {
                // Fallback to stock / prompt images
                const fallbackPrompt = brandDescription.trim() || "Generate social media post ideas for a business";
                let fallbackPosts: GeneratedPost[] = previewStockImages
                    .map((img) => img.file || img.url || "")
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((imageUrl, idx) => ({
                        image: { imageUrl },
                        text: `Try this caption style #${idx + 1}: ${fallbackPrompt.slice(0, 140)}`,
                        source: "LLM" as const,
                        index: idx,
                    }));

                if (fallbackPosts.length < 4) {
                    try {
                        const promptImages = await generatePromptOnlyImages({ prompt: fallbackPrompt, count: 4 });
                        fallbackPosts = promptImages.slice(0, 4).map((item, idx) => ({
                            image: { imageUrl: item.url },
                            text: `AI caption idea #${idx + 1}: ${fallbackPrompt.slice(0, 140)}`,
                            source: "LLM" as const,
                            index: idx,
                        }));
                    } catch { /* keep stock fallback */ }
                }

                if (fallbackPosts.length > 0) {
                    setStreamedPosts(fallbackPosts);
                } else {
                    setStreamError("Could not generate posts. Please try again.");
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error && error.name === "AbortError") return;
            setStreamError(error instanceof Error ? error.message : "Failed to generate posts.");
        } finally {
            setStreamLoading(false);
            streamAbortRef.current = null;
        }
    };

    return (
        <>
            <section
                id="generator"
                className="py-6 sm:py-12 lg:py-20 text-slate-900 overflow-hidden relative"
                style={{ background: "linear-gradient(135deg, #fff7f0 0%, #ffffff 40%, #fff3ee 100%)" }}
            >
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-bl from-orange-200/30 to-transparent rounded-full blur-3xl -mr-40 sm:-mr-60 -mt-40 sm:-mt-60"></div>
                    <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gradient-to-tr from-red-100/20 to-transparent rounded-full blur-3xl -ml-32 sm:-ml-40 -mb-32 sm:-mb-40"></div>
                    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(249,115,22,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-4 sm:mb-6 md:mb-8">
                        <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white border border-orange-200 text-orange-600 text-[9px] sm:text-xs font-bold uppercase tracking-widest shadow-sm mb-2 sm:mb-3">
                            <SparklesIcon className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                            Studio · set it up once
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
                            Set it on the left.{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                Watch it on the right.
                            </span>
                        </h2>
                        <p className="text-slate-500 max-w-3xl mx-auto text-[11px] sm:text-xs lg:text-sm leading-relaxed px-2">
                            Pick your business, tell us what you do, and your social media posts build themselves-complete with branded visuals, engaging captions, and ready to schedule in minutes.
                        </p>
                    </div>

                    {/* Studio: setup on the left, live mobile preview on the right */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 lg:gap-8 items-stretch max-w-5xl mx-auto">

                        {/* Setup form */}
                        <div className="w-full flex flex-col rounded-2xl bg-white shadow-[0_0_14px_rgba(249,115,22,0.4)] p-4 sm:p-6 lg:p-7 relative overflow-hidden">
                            <div className="relative flex items-center gap-3 mb-6">
                                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white" style={{ background: "linear-gradient(135deg,#F97316,#EA580C)" }}>
                                    <ClipboardList className="w-4 h-4" />
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Your setup</h3>
                            </div>

                            {/* Industry + business type */}
                            <div className="relative mb-4 sm:mb-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-semibold text-slate-500 mb-1">Industry</label>
                                        <select
                                            value={generateSelectedIndustry}
                                            onChange={(e) => handleSelectGenerateIndustry(e.target.value)}
                                            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 cursor-pointer hover:border-orange-300"
                                        >
                                            <option value="">Choose your industry</option>
                                            {industries.map((industry: Industry) => (
                                                <option key={industry.id} value={industry.id}>
                                                    {industry.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] sm:text-xs font-semibold text-slate-500 mb-1">Business type</label>
                                        <select
                                            value={generatePendingSubIndustry ?? ""}
                                            onChange={(e) => setGeneratePendingSubIndustry(e.target.value || null)}
                                            disabled={!generateSelectedIndustry}
                                            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 cursor-pointer hover:border-orange-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-100 disabled:cursor-not-allowed"
                                        >
                                            <option value="">{generateSelectedIndustry ? "Choose business type" : "Select industry first"}</option>
                                            {generateSubIndustries.map((sub, i) => (
                                                <option key={sub.id || i} value={String(sub.id)}>
                                                    {sub.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="relative mb-4 sm:mb-6">
                                <div className="relative mb-2.5">
                                    <AnimatedTextarea
                                        value={brandDescription}
                                        onChange={setBrandDescription}
                                        minLength={MIN_BRAND_DESCRIPTION_CHARS}
                                        maxLength={MAX_BRAND_DESCRIPTION_CHARS}
                                        className="w-full min-h-[70px] sm:min-h-[90px] p-2.5 sm:p-3 bg-slate-50/70 rounded-xl border border-slate-200 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white resize-none text-sm font-medium text-slate-700 shadow-inner transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRegenerateBrandDescription}
                                        disabled={isRegeneratingBrand || brandDescription.trim().length < MIN_BRAND_DESCRIPTION_CHARS}
                                        className={`absolute top-3 right-3 inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all bg-orange-500 text-white ${
                                            isRegeneratingBrand || brandDescription.trim().length < MIN_BRAND_DESCRIPTION_CHARS
                                                ? "cursor-not-allowed opacity-50"
                                                : "hover:brightness-110 cursor-pointer"
                                        }`}
                                    >
                                        {isRegeneratingBrand ? (
                                            <RefreshCcw className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <Plus className="h-3.5 w-3.5" />
                                        )}
                                        {isRegeneratingBrand ? "Regenerating..." : "Write it"}
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <button
                                        type="button"
                                        disabled
                                        title="Voice input — coming soon"
                                        className="inline-flex items-center gap-1 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold border border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-70"
                                    >
                                        <Mic className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Speak
                                    </button>
                                    <p className="text-[10px] sm:text-xs font-medium text-slate-400">
                                        {brandDescription.trim().length}/{brandDescription.trim().length < MIN_BRAND_DESCRIPTION_CHARS ? MIN_BRAND_DESCRIPTION_CHARS : MAX_BRAND_DESCRIPTION_CHARS}
                                    </p>
                                </div>
                                {regenerateBrandError && (
                                    <div className="mb-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700">
                                        {regenerateBrandError}
                                    </div>
                                )}
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={handleGenerateClick}
                                disabled={!isGenerateReady || streamLoading}
                                className={`relative w-full mt-auto py-2 sm:py-3 rounded-lg sm:rounded-full text-xs sm:text-sm lg:text-base font-black tracking-wide transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden bg-orange-500 text-white ${
                                    isGenerateReady && !streamLoading
                                        ? "hover:brightness-110 cursor-pointer"
                                        : "opacity-50 cursor-not-allowed"
                                }`}
                            >
                                {isGenerateReady && !streamLoading && (
                                    <span className="absolute inset-0 animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                                )}
                                {streamLoading ? (
                                    <RefreshCcw className="w-3 sm:w-4 h-3 sm:h-4 relative animate-spin" />
                                ) : (
                                    <Plus className="w-3 sm:w-4 h-3 sm:h-4 relative" />
                                )}
                                <span className="relative">{streamLoading ? "Creating..." : "Create posts"}</span>
                            </button>
                            {generateValidationError && (
                                <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700">
                                    {generateValidationError}
                                </div>
                            )}
                        </div>

                        {/* Live mobile preview */}
                        <div className="w-full flex flex-col rounded-2xl bg-white shadow-[0_0_14px_rgba(249,115,22,0.4)] p-3 sm:p-4 lg:p-5">
                            {/* Phone / Window toggle */}
                            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 mb-5 w-fit mx-auto">
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode("phone")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        previewMode === "phone" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                                    }`}
                                >
                                    <Smartphone className="w-3.5 h-3.5" /> Phone
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode("window")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        previewMode === "window" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                                    }`}
                                >
                                    <Monitor className="w-3.5 h-3.5" /> Window
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col justify-center">
                            {(() => {
                                const previewImage = streamedPosts[0]?.image?.imageUrl;
                                const previewCaption = streamedPosts[0]?.text;
                                const hasResult = !!previewImage;
                                const businessName = industries.find(ind => String(ind.id) === String(generateSelectedIndustry))?.name || "Your Business";

                                const content = (
                                    <div className="relative w-full h-full bg-white flex flex-col overflow-hidden">
                                        {/* Post header — avatar, name, timestamp */}
                                        <div className={`flex items-center gap-2 flex-shrink-0 ${previewMode === "phone" ? "px-2.5 pt-6 pb-2" : "px-3 py-3"}`}>
                                            <span
                                                className={`rounded-full flex-shrink-0 flex items-center justify-center text-white font-black ${
                                                    previewMode === "phone" ? "w-7 h-7 text-xs" : "w-10 h-10 text-base"
                                                }`}
                                                style={{ background: "linear-gradient(135deg,#F97316,#EA580C)" }}
                                            >
                                                {businessName.charAt(0).toUpperCase()}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className={`font-bold text-slate-900 truncate leading-tight ${previewMode === "phone" ? "text-[11px]" : "text-sm"}`}>
                                                    {businessName}
                                                </p>
                                                <p className={`text-slate-400 mt-0.5 ${previewMode === "phone" ? "text-[9px]" : "text-[11px]"}`}>
                                                    Just now · 🌐
                                                </p>
                                            </div>
                                            <MoreHorizontal className={`text-slate-400 flex-shrink-0 ${previewMode === "phone" ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
                                        </div>

                                        {/* Caption — above the image, like a real post */}
                                        {hasResult && previewCaption && (
                                            <div className="px-3 pb-2.5 flex-shrink-0 overflow-hidden" style={{ maxHeight: "3.9em" }}>
                                                <p className="text-[11.5px] text-slate-700 leading-snug line-clamp-3">
                                                    {previewCaption}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex-1 relative bg-slate-50 flex items-center justify-center overflow-hidden">
                                            {streamLoading ? (
                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                    <RefreshCcw className="w-6 h-6 animate-spin text-orange-500" />
                                                    <span className="text-xs font-semibold">Building your post…</span>
                                                </div>
                                            ) : hasResult ? (
                                                <NextImage src={previewImage} alt="Generated post" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-contain" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-center px-6">
                                                    <span className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
                                                        <Image className="w-5 h-5 text-orange-400" />
                                                    </span>
                                                    <p className="text-xs font-bold text-slate-700">Your feed is empty</p>
                                                    <p className="text-[11px] text-slate-400 leading-relaxed">Fill in the left side and your posts land here.</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Engagement bar — like real post chrome */}
                                        {hasResult && (
                                            <div className="flex items-center gap-4 px-3 py-2.5 border-t border-slate-100 flex-shrink-0 text-slate-500 flex-wrap">
                                                <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                                                    <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> 428
                                                </span>
                                                <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                                                    <MessageCircle className="w-3.5 h-3.5" /> 36
                                                </span>
                                                <span className="flex items-center gap-1.5 text-[11px] font-semibold ml-auto">
                                                    <Share2 className="w-3.5 h-3.5" /> 12
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );

                                if (previewMode === "phone") {
                                    return (
                                        <div className="mx-auto w-[200px] sm:w-[240px] lg:w-[260px] h-[260px] sm:h-[320px] lg:h-[360px] rounded-[1.5rem] sm:rounded-[2rem] border-[6px] sm:border-[8px] border-slate-900 bg-slate-900 shadow-xl overflow-hidden relative">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-b-xl z-10" />
                                            <div className="w-full h-full rounded-[1.4rem] overflow-hidden">{content}</div>
                                        </div>
                                    );
                                }
                                return (
                                    <div className="mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] rounded-lg sm:rounded-xl border border-slate-200 shadow-xl overflow-hidden">
                                        <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-100 border-b border-slate-200">
                                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-400" />
                                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-400" />
                                            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-400" />
                                        </div>
                                        <div className="h-[220px] sm:h-[260px] lg:h-[280px]">{content}</div>
                                    </div>
                                );
                            })()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="gcontent" className="py-6 sm:py-12 lg:py-20 overflow-hidden relative" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                    {/* Title */}
                    <div className="text-center mb-4 sm:mb-6 md:mb-8">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-200 mb-2 sm:mb-3">
                            <SparklesIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            See Exactly What Your Customers Will See
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
                            Your First 7 Posts Are{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                Already Ready
                            </span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed px-2">
                            This is exactly what Shoutly AI creates for your business—professionally designed posters, captions, and hashtags, ready to publish automatically.
                        </p>
                    </div>

                    {shouldShowFirstLoadMsg && (
                        <div className="max-w-2xl mx-auto mb-8 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-center text-sm font-medium text-orange-700">
                            First time preview load can take up to 60 seconds.
                        </div>
                    )}

                    {/* Main Card */}
                    <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">

                        <div className="space-y-8">
                            {streamError && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
                                    Stream error: {streamError}
                                </div>
                            )}

                            {/* AI Generation Status */}
                            {streamLoading && (
                                <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-8 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                            <div className="w-2 h-8 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                            <div className="w-2 h-8 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">🤖 AI is generating your images</p>
                                            <p className="text-xs text-gray-600 mt-0.5">Powered by advanced AI</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Stock Templates — shown only before generation starts */}
                            {!streamLoading && streamedPosts.length === 0 && <div>
                                {generateLoadingImages ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
                                            {Array.from({ length: 4 }).map((_, i) => (
                                                <div key={`r2-loading-${i}`} className="aspect-square rounded-lg sm:rounded-xl bg-gray-100 animate-pulse" />
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:gap-4">
                                            {Array.from({ length: 3 }).map((_, i) => (
                                                <div key={`r2-loading-b${i}`} className="aspect-square rounded-lg sm:rounded-xl bg-gray-100 animate-pulse" />
                                            ))}
                                        </div>
                                    </>
                                ) : previewPrimaryStockImages.length === 0 ? (
                                    <p className="text-center text-gray-400 py-10">No stock templates found</p>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
                                            {previewPrimaryStockImages.slice(0, 4).map((img, index) => {
                                                const url = img.file || img.url || "";
                                                const isActiveStock = selectedPreviewPost?.imageUrl === url;
                                                return (
                                                <div
                                                    key={img.id || `r2-stock-${index}`}
                                                    className={`relative group aspect-square rounded-xl overflow-hidden bg-gray-50 cursor-pointer transition-all duration-200 ${
                                                        isActiveStock
                                                            ? "ring-4 ring-orange-500 ring-offset-2 scale-[1.03]"
                                                            : "hover:ring-2 hover:ring-orange-300 hover:ring-offset-1 hover:scale-[1.02]"
                                                    }`}
                                                    onClick={() => {
                                                        setSelectedPreviewPost(
                                                            isActiveStock ? null : { imageUrl: url, caption: img.name || img.title || "" }
                                                        );
                                                    }}
                                                >
                                                    <NextImage
                                                        src={img.file || img.url || ""}
                                                        alt={img.name || img.title || `Stock ${index + 1}`}
                                                        fill
                                                        sizes="(max-width: 640px) 50vw, 25vw"
                                                        loading="lazy"
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = getSubIndustryFallbackImage(index);
                                                        }}
                                                    />
                                                    {isActiveStock && (
                                                        <>
                                                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                            </div>
                                                            <div className="absolute inset-0 bg-orange-500/10 pointer-events-none" />
                                                        </>
                                                    )}
                                                </div>
                                                );
                                            })}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:gap-4">
                                            {previewPrimaryStockImages.slice(4, 7).map((img, index) => {
                                                const actualIndex = index + 4;
                                                const url = img.file || img.url || "";
                                                const isActiveStock = selectedPreviewPost?.imageUrl === url;
                                                return (
                                                <div
                                                    key={img.id || `r2-stock-${actualIndex}`}
                                                    className={`relative group aspect-square rounded-xl overflow-hidden bg-gray-50 cursor-pointer transition-all duration-200 ${
                                                        isActiveStock
                                                            ? "ring-4 ring-orange-500 ring-offset-2 scale-[1.03]"
                                                            : "hover:ring-2 hover:ring-orange-300 hover:ring-offset-1 hover:scale-[1.02]"
                                                    }`}
                                                    onClick={() => {
                                                        setSelectedPreviewPost(
                                                            isActiveStock ? null : { imageUrl: url, caption: img.name || img.title || "" }
                                                        );
                                                    }}
                                                >
                                                    <NextImage
                                                        src={img.file || img.url || ""}
                                                        alt={img.name || img.title || `Stock ${actualIndex + 1}`}
                                                        fill
                                                        sizes="(max-width: 640px) 50vw, 33vw"
                                                        loading="lazy"
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                        onError={(e) => {
                                                            e.currentTarget.onerror = null;
                                                            e.currentTarget.src = getSubIndustryFallbackImage(actualIndex);
                                                        }}
                                                    />
                                                    {isActiveStock && (
                                                        <>
                                                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                            </div>
                                                            <div className="absolute inset-0 bg-orange-500/10 pointer-events-none" />
                                                        </>
                                                    )}
                                                </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>}

                            {/* AI Generated Posts — shown below stock, only when streaming or posts available */}
                            {(streamLoading || streamedPosts.length > 0) && (
                            <div>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
                                    {[0,1,2,3].map((i) => {
                                        const post = streamedPosts[i];
                                        const imageUrl = post?.image?.imageUrl;
                                        if (!imageUrl) {
                                            if (i >= totalPreviewSlots) return null;
                                            return (
                                                <div
                                                    key={`r1-loading-${i}`}
                                                    className="aspect-square rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-100 via-white to-gray-100 border border-orange-200"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-fast" />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                                        <div className="relative w-12 h-12">
                                                            <svg className="w-full h-full text-orange-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                                                                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" />
                                                                <path className="opacity-100" fill="none" stroke="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-sm font-bold text-gray-800">Generating</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">AI Magic...</p>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {[0, 0.2, 0.4].map((delay, d) => (
                                                                <div key={d} className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: `${delay}s` }} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        const isActivePost = selectedPreviewPost?.imageUrl === imageUrl;
                                        return (
                                            <div
                                                key={`r1-post-${i}`}
                                                className={`relative group aspect-square rounded-xl overflow-hidden bg-gray-50 cursor-pointer transition-all duration-200 ${
                                                    isActivePost
                                                        ? "ring-4 ring-orange-500 ring-offset-2 scale-[1.03]"
                                                        : "hover:ring-2 hover:ring-orange-300 hover:ring-offset-1 hover:scale-[1.02]"
                                                }`}
                                                onClick={() =>
                                                    setSelectedPreviewPost(
                                                        isActivePost ? null : { imageUrl, caption: post.text || "" }
                                                    )
                                                }
                                            >
                                                <NextImage
                                                    src={imageUrl}
                                                    alt={post.text?.slice(0, 40) || `Post ${i + 1}`}
                                                    fill
                                                    sizes="(max-width: 640px) 50vw, 25vw"
                                                    loading="lazy"
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = getSubIndustryFallbackImage(i);
                                                    }}
                                                />
                                                {isActivePost && (
                                                    <>
                                                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                        </div>
                                                        <div className="absolute inset-0 bg-orange-500/10 pointer-events-none" />
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:gap-4">
                                    {[4,5,6].map((i) => {
                                        const post = streamedPosts[i];
                                        const imageUrl = post?.image?.imageUrl;
                                        if (!imageUrl) {
                                            if (i >= totalPreviewSlots) return null;
                                            return (
                                                <div
                                                    key={`r1-loading-${i}`}
                                                    className="aspect-square rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-100 via-white to-gray-100 border border-orange-200"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-fast" />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                                        <div className="relative w-12 h-12">
                                                            <svg className="w-full h-full text-orange-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                                                                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" />
                                                                <path className="opacity-100" fill="none" stroke="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-sm font-bold text-gray-800">Generating</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">AI Magic...</p>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {[0, 0.2, 0.4].map((delay, d) => (
                                                                <div key={d} className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: `${delay}s` }} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        const isActivePost = selectedPreviewPost?.imageUrl === imageUrl;
                                        return (
                                            <div
                                                key={`r1-post-${i}`}
                                                className={`relative group aspect-square rounded-xl overflow-hidden bg-gray-50 cursor-pointer transition-all duration-200 ${
                                                    isActivePost
                                                        ? "ring-4 ring-orange-500 ring-offset-2 scale-[1.03]"
                                                        : "hover:ring-2 hover:ring-orange-300 hover:ring-offset-1 hover:scale-[1.02]"
                                                }`}
                                                onClick={() =>
                                                    setSelectedPreviewPost(
                                                        isActivePost ? null : { imageUrl, caption: post.text || "" }
                                                    )
                                                }
                                            >
                                                <NextImage
                                                    src={imageUrl}
                                                    alt={post.text?.slice(0, 40) || `Post ${i + 1}`}
                                                    fill
                                                    sizes="(max-width: 640px) 50vw, 25vw"
                                                    loading="lazy"
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = getSubIndustryFallbackImage(i);
                                                    }}
                                                />
                                                {isActivePost && (
                                                    <>
                                                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                        </div>
                                                        <div className="absolute inset-0 bg-orange-500/10 pointer-events-none" />
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Post Modal */}
            {selectedPreviewPost && (
                <PostPopup
                    isOpen={!!selectedPreviewPost}
                    imageUrl={selectedPreviewPost.imageUrl}
                    initialCaption={selectedPreviewPost.caption}
                    onClose={() => setSelectedPreviewPost(null)}
                />
            )}
        </>
    );
}
