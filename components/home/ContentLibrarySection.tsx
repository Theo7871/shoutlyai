"use client";
import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { RefreshCcw } from "lucide-react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { fetchImages } from "@/api/homeApi";
import type { Industry, SubIndustry, ImageItem } from "@/types/home";

// Generic local placeholder images — shown in the content library grid before
// an industry is picked, so the section isn't just empty dashed boxes.
const LIBRARY_PLACEHOLDER_IMAGES = [
    "/images/img1.jpeg", "/images/img2.jpeg", "/images/3.png", "/images/4.png",
    "/images/5.png", "/images/6.png", "/images/7.png", "/images/8.png",
    "/images/9.png", "/images/10.png", "/images/11.png", "/images/12.png",
    "/images/13.png", "/images/14.png", "/images/15.png", "/images/16.png",
    "/images/17.png", "/images/18.png", "/images/19.png", "/images/20.png",
];

function pickRandomImages(pool: string[], count: number): string[] {
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

export default function ContentLibrarySection({ industries }: { industries: Industry[] }) {
    const [libraryShowSubIndustries, setLibraryShowSubIndustries] = useState(false);
    const [librarySelectedIndustry, setLibrarySelectedIndustry] = useState<string>("");
    const [librarySubIndustries, setLibrarySubIndustries] = useState<SubIndustry[]>([]);
    const [librarySelectedSubIndustry, setLibrarySelectedSubIndustry] = useState<string | null>(null);
    const [libraryImages, setLibraryImages] = useState<ImageItem[]>([]);
    const [libraryPlaceholderImages] = useState(() => pickRandomImages(LIBRARY_PLACEHOLDER_IMAGES, 7));
    const [placeholderPreview, setPlaceholderPreview] = useState<string | null>(null);
    const [libraryLoadingImages, setLibraryLoadingImages] = useState(false);
    const [libraryFilterTerm] = useState("");
    const [activeLibraryImageId, setActiveLibraryImageId] = useState<string | number | null>(null);
    const [libraryContentType, setLibraryContentType] = useState<"photos" | "reels">("photos");
    const [showReelsComingSoon, setShowReelsComingSoon] = useState(false);
    const imageCacheRef = useRef<Record<string, ImageItem[]>>({});

    const getImagesForSubIndustry = async (subIndustry: string, forceRefresh = false) => {
        if (!forceRefresh && imageCacheRef.current[subIndustry]) {
            setLibraryImages(imageCacheRef.current[subIndustry]);
            return;
        }
        setLibraryLoadingImages(true);
        try {
            const data = await fetchImages(subIndustry);
            imageCacheRef.current[subIndustry] = data;
            setLibraryImages(data);
        } finally {
            setLibraryLoadingImages(false);
        }
    };

    const refreshImages = async () => {
        if (!librarySelectedSubIndustry) return;
        await getImagesForSubIndustry(librarySelectedSubIndustry, true);
    };

    useEffect(() => {
        if (!librarySelectedSubIndustry) return;
        setActiveLibraryImageId(null);
        getImagesForSubIndustry(librarySelectedSubIndustry);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [librarySelectedSubIndustry]);

    // Filter images locally based on search input
    const libraryFilteredImages = libraryImages.filter((img) => {
        if (!libraryFilterTerm) return true;
        return (
            img.name?.toLowerCase().includes(libraryFilterTerm.toLowerCase()) ||
            img.title?.toLowerCase().includes(libraryFilterTerm.toLowerCase())
        );
    });

    return (
        <>
            <section
                id="library"
                className="py-6 sm:py-12 lg:py-20 overflow-hidden relative"
                style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #fff7f0 100%)" }}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-[350px] sm:w-[600px] h-[250px] sm:h-[400px] bg-gradient-to-tl from-orange-100/20 to-transparent rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                    {/* Badge */}
                    <div className="flex justify-center mb-4 sm:mb-5">
                        <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-200">
                            <SparklesIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            Thousands of Ready-to-Publish Posts
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center text-slate-900 tracking-tight mb-3 sm:mb-4">
                        Find the Perfect Post
                    </h2>

                    {/* Subtitle */}
                    <p className="text-center text-slate-500 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-2 leading-relaxed">
                        From restaurants and salons to healthcare, real estate, retail, education, and 155+ business categories — Shoutly AI creates professional social media content tailored to your business.
                    </p>

                    {/* Main Card */}
                    <div className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-orange-100 overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-bl from-orange-50/80 to-transparent rounded-full pointer-events-none"></div>

                        {/* Top Controls — single row */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-10 relative z-10 flex-wrap">
                            {/* Tabs */}
                            <button
                                onClick={() => { setLibraryContentType("photos"); setActiveLibraryImageId(null); }}
                                className={`whitespace-nowrap px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs lg:text-sm font-semibold transition-all duration-200 ${
                                    libraryContentType === "photos"
                                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                        : "bg-white text-gray-600 border border-gray-300 hover:border-orange-300 hover:text-orange-500"
                                }`}
                            >
                                Photos
                            </button>
                            <button
                                onClick={() => setShowReelsComingSoon(true)}
                                className="whitespace-nowrap px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs lg:text-sm font-semibold transition-all duration-200 bg-white text-gray-600 border border-gray-300 hover:border-orange-300 hover:text-orange-500"
                            >
                                Reels
                            </button>

                            {/* Spacer pushes dropdown + refresh to right */}
                            <div className="flex-1" />

                            {/* Coming Soon Popup */}
                            {showReelsComingSoon && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowReelsComingSoon(false)}>
                                    <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-xs mx-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}>
                                            🎬
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Coming Soon!</h3>
                                        <p className="text-sm text-gray-500 text-center">Reels generation is under development. Stay tuned for this exciting feature!</p>
                                        <button
                                            onClick={() => setShowReelsComingSoon(false)}
                                            className="mt-2 px-6 py-2 rounded-full text-sm font-semibold text-white"
                                            style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}
                                        >
                                            Got it
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Industry Dropdown + Refresh on right */}
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                            <select
                                value={librarySelectedIndustry}
                                onChange={(e) => {
                                    const id = e.target.value;
                                    setLibrarySelectedIndustry(id);
                                    setLibrarySelectedSubIndustry(null);
                                    const selected = industries.find(
                                        (ind: Industry) =>
                                            String(ind.id) === String(id),
                                    );
                                    setLibrarySubIndustries(
                                        selected?.subIndustries || [],
                                    );
                                    setLibraryShowSubIndustries(true);
                                }}
                                className="flex-1 min-w-0 sm:flex-none sm:w-auto px-4 py-2 rounded-xl bg-white text-gray-800 border border-gray-300 focus:outline-none text-sm"
                            >
                                <option value="">Choose your industry</option>
                                {industries.map((industry: Industry) => (
                                    <option
                                        key={industry.id}
                                        value={industry.id}
                                    >
                                        {industry.name}
                                    </option>
                                ))}
                            </select>

                                {libraryShowSubIndustries && (
                                    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/20 backdrop-blur-sm">
                                        <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 w-full max-w-2xl mx-4">

                                            {/* Close button */}
                                            <button
                                                onClick={() => setLibraryShowSubIndustries(false)}
                                                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                                            >
                                                ✕
                                            </button>

                                            <h3 className="text-base sm:text-lg font-bold text-slate-700 mb-4 text-center">
                                                Select a Sub-Industry
                                            </h3>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                                {librarySubIndustries.length === 0 ? (
                                                    <p className="text-sm text-slate-400 col-span-full text-center py-10 font-medium">
                                                        Select an industry to see sub-categories
                                                    </p>
                                                ) : (
                                                    librarySubIndustries.map((sub, i) => {
                                                        const isActive = librarySelectedSubIndustry === String(sub.id);
                                                        return (
                                                            <div
                                                                key={sub.id || i}
                                                                onClick={() => {
                                                                    setLibrarySelectedSubIndustry(String(sub.id));
                                                                    setLibraryShowSubIndustries(false);
                                                                }}
                                                                className={`group cursor-pointer relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 border transition-all duration-300 z-10
                                                                    ${
                                                                        isActive
                                                                            ? "border-orange-500 bg-white shadow-xl shadow-orange-200/70 scale-[1.04] ring-1 ring-orange-500 -translate-y-1"
                                                                            : "border-slate-200 bg-white shadow-md shadow-slate-200/60 hover:border-orange-300 hover:shadow-xl hover:shadow-slate-200/80 hover:-translate-y-1 hover:scale-[1.02]"
                                                                    }`}
                                                            >
                                                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2 sm:mb-3 mx-auto group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                                                    <span className="text-xs sm:text-sm font-bold">
                                                                        {i + 1}
                                                                    </span>
                                                                </div>
                                                                <span className="text-xs sm:text-sm text-center block font-bold text-slate-600 group-hover:text-slate-900">
                                                                    {sub.name}
                                                                </span>
                                                                {isActive && (
                                                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Refresh Button */}
                                <button
                                    onClick={refreshImages}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 hover:shadow-sm transition-all"
                                >
                                    <RefreshCcw
                                        className={`w-4 h-4 text-gray-500 ${libraryLoadingImages ? "animate-spin" : ""}`}
                                    />
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {/* Templates Grid */}
                        {!librarySelectedSubIndustry && !libraryLoadingImages && (
                            <div className="text-center mb-4">
                                <p className="text-sm font-semibold text-gray-600">Choose your industry to see templates</p>
                                <p className="text-xs text-gray-400">Pick a business type above to load matching posts.</p>
                            </div>
                        )}
                        <div className={`grid gap-4 ${
                            libraryContentType === "reels"
                                ? "grid-cols-2 sm:grid-cols-4 md:grid-cols-8"
                                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-7"
                        }`}>
                            {libraryLoadingImages ? (
                                Array.from({ length: 7 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-full rounded-xl bg-gray-100 animate-pulse ${
                                            libraryContentType === "reels" ? "aspect-[9/16]" : "h-48"
                                        }`}
                                    />
                                ))
                            ) : !librarySelectedSubIndustry ? (
                                libraryPlaceholderImages.map((src, i) => (
                                    <div
                                        key={src + i}
                                        onClick={() => setPlaceholderPreview(src)}
                                        className={`relative w-full rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:ring-2 hover:ring-orange-300 hover:ring-offset-1 ${
                                            libraryContentType === "reels" ? "aspect-[9/16]" : "h-48"
                                        }`}
                                    >
                                        <NextImage src={src} alt="Sample template" fill sizes="(max-width: 768px) 33vw, 14vw" className="object-cover" />
                                    </div>
                                ))
                            ) : libraryFilteredImages.length === 0 ? (
                                <p className="col-span-full text-center text-gray-400 py-12">
                                    No images found
                                </p>
                            ) : (
                                libraryFilteredImages.slice(0, 7).map((img, index) => {
                                    const imgId = img.id ?? index;
                                    const isActive = activeLibraryImageId === imgId;
                                    const isReels = libraryContentType === "reels";
                                    const src = img.file || img.url || "";
                                    return (
                                        <div
                                            key={imgId}
                                            onClick={() => setActiveLibraryImageId(isActive ? null : imgId)}
                                            className={`relative w-full rounded-xl overflow-hidden cursor-pointer transition-all duration-200 bg-gray-100 ${
                                                isReels ? "aspect-[9/16]" : "h-48"
                                            } ${
                                                isActive
                                                    ? "ring-4 ring-orange-500 ring-offset-2 scale-[1.03]"
                                                    : "hover:ring-2 hover:ring-orange-300 hover:ring-offset-1 hover:scale-[1.02]"
                                            }`}
                                        >
                                            {src ? (
                                                <NextImage
                                                    src={src}
                                                    alt={img.name || img.title || "Social media template"}
                                                    fill
                                                    sizes="(max-width: 768px) 33vw, 14vw"
                                                    loading="lazy"
                                                    className={`rounded-xl ${
                                                        isReels ? "object-cover object-top" : "object-cover"
                                                    }`}
                                                    onError={(e) => {
                                                        const target = e.currentTarget;
                                                        target.style.display = "none";
                                                        const fallback = target.nextElementSibling as HTMLElement | null;
                                                        if (fallback) fallback.style.display = "flex";
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                style={{ display: src ? "none" : "flex" }}
                                                className="absolute inset-0 flex-col items-center justify-center gap-2 bg-gray-50"
                                            >
                                                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                                    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 16 5-5 4 4 3-3 6 6"/>
                                                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/>
                                                </svg>
                                                <span className="text-[10px] text-gray-400 font-medium">No preview</span>
                                            </div>
                                            {isReels && (
                                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold uppercase tracking-wide">
                                                    Reel
                                                </div>
                                            )}
                                            {isActive && (
                                                <>
                                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <div className="absolute inset-0 bg-orange-500/10 rounded-xl pointer-events-none" />
                                                </>
                                            )}
                                            {(img.name || img.title) && (
                                                <span className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 text-xs rounded">
                                                    {img.name || img.title}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Placeholder image preview popup */}
            {placeholderPreview && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => setPlaceholderPreview(null)}
                >
                    <div className="relative max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setPlaceholderPreview(null)}
                            className="absolute -top-10 right-0 sm:-right-10 sm:top-0 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700 text-lg font-bold shadow-lg"
                            aria-label="Close preview"
                        >
                            ✕
                        </button>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={placeholderPreview}
                            alt="Sample template preview"
                            className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl bg-white"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
