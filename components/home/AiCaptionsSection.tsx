const SALE_TAGS = [
    { top: "8%", left: "6%", rotate: -22 },
    { top: "4%", left: "38%", rotate: 14 },
    { top: "10%", left: "68%", rotate: -8 },
    { top: "34%", left: "18%", rotate: 20 },
    { top: "40%", left: "52%", rotate: -18 },
    { top: "62%", left: "8%", rotate: 10 },
    { top: "60%", left: "40%", rotate: -12 },
    { top: "72%", left: "68%", rotate: 16 },
];

const PLATFORM_GRID: { label: string; bg: string; active: boolean; path: string }[] = [
    { label: "IG", bg: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", active: true, path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
    { label: "FB", bg: "#1877F2", active: true, path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { label: "LI", bg: "#E5E7EB", active: false, path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { label: "X", bg: "#000000", active: true, path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    { label: "TT", bg: "#000000", active: true, path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
    { label: "YT", bg: "#FF0000", active: true, path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { label: "TH", bg: "#000000", active: true, path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.746-1.757-.51-.586-1.3-.883-2.345-.89h-.043c-.708 0-1.67.195-2.282 1.106l-1.737-1.21c.823-1.222 2.169-1.894 3.79-1.894h.064c2.709.017 4.322 1.674 4.482 4.553.092.039.183.077.272.117 1.255.589 2.18 1.494 2.674 2.616.687 1.56.75 4.106-1.317 6.13-1.578 1.55-3.494 2.244-6.226 2.264Z" },
    { label: "BS", bg: "#0285FF", active: true, path: "M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" },
    { label: "PI", bg: "#E5E7EB", active: false, path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.756-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592.001 12.017.001z" },
    { label: "GB", bg: "#E5E7EB", active: false, path: "M12.04 2C7.69 2 4.14 5.54 4.14 9.91c0 .03 0 .06.01.09L2.5 9.91v4.18l1.66-.09c.34 4.06 3.72 7.27 7.88 7.27 4.39 0 7.96-3.57 7.96-7.96 0-.54-.05-1.06-.15-1.57h-7.81v3.18h4.47c-.19 1-.78 1.85-1.66 2.42v2.01h2.69c1.57-1.45 2.48-3.58 2.48-6.12 0-4.37-3.55-7.91-7.92-7.91z" },
];

const HASHTAGS = ["#FitnessMotivation", "#GymLife", "#WorkoutOfTheDay"];

const CHECKS = [
    "2,200-character caption editor with live count",
    "One-click AI rewrite and hashtag refresh",
    "Publish now, or save it to a specific date and time",
];

export default function AiCaptionsSection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20 overflow-hidden bg-[#fff0e0] md:[background:linear-gradient(90deg,#ffffff_0%,#fff0e0_100%)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-14 items-center">
                    {/* Copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">AI captions</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 sm:mb-5">
                            One idea, tuned for every platform
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
                            Open any post to rewrite the caption, refresh the hashtags, or swap the image — then choose exactly which accounts it goes out to and when.
                        </p>
                        <ul className="flex flex-col gap-3 sm:gap-4">
                            {CHECKS.map((c) => (
                                <li key={c} className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center flex-shrink-0">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* New Post modal mock */}
                    <div className="relative">
                    <div className="absolute -inset-6 bg-gradient-to-br from-orange-200/40 via-transparent to-red-200/30 rounded-[2.5rem] blur-3xl pointer-events-none" />
                    <div className="relative rounded-2xl sm:rounded-3xl border border-orange-300/60 bg-white/80 backdrop-blur-md shadow-xl shadow-orange-200/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-300/50">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                                </span>
                                <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">New Post</div>
                            </div>
                            <span className="text-slate-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </span>
                        </div>

                        {/* Body */}
                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr]">
                            {/* Left: image + platforms */}
                            <div className="p-3.5 sm:p-4 sm:border-r border-slate-100">
                                <div className="relative aspect-[4/2.6] rounded-xl overflow-hidden bg-[#161616] mb-2.5">
                                    {SALE_TAGS.map((t, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-14 sm:w-16 px-1.5 py-3 bg-[#E13B3B] text-white text-[9px] sm:text-[10px] font-black text-center rounded-sm shadow-md"
                                            style={{ top: t.top, left: t.left, transform: `rotate(${t.rotate}deg)` }}
                                        >
                                            SALE
                                            <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black/30" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2 mb-3 sm:mb-3.5">
                                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] sm:text-xs font-bold text-slate-600">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                        Upload
                                    </button>
                                    <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 bg-red-50 text-[10px] sm:text-xs font-bold text-red-500">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                        Remove
                                    </button>
                                </div>
                                <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Platforms</span>
                                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                                    {PLATFORM_GRID.map((p) => (
                                        <span
                                            key={p.label}
                                            className="aspect-square rounded-lg flex flex-col items-center justify-center gap-1 py-1.5"
                                            style={{ background: p.bg, opacity: p.active ? 1 : 0.9 }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill={p.active ? "#fff" : "#9CA3AF"}>
                                                <path d={p.path} />
                                            </svg>
                                            <span className="text-[7px] sm:text-[8px] font-bold leading-none" style={{ color: p.active ? "rgba(255,255,255,.9)" : "#9CA3AF" }}>
                                                {p.label}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right: form fields */}
                            <div className="p-3.5 sm:p-4 flex flex-col gap-2.5 sm:gap-3">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">Caption</span>
                                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-orange-500">
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2z" /></svg>
                                            Rewrite
                                        </span>
                                    </div>
                                    <div className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2">
                                        <p className="text-xs sm:text-sm text-slate-400">Write your caption here…</p>
                                    </div>
                                    <div className="text-right text-[9px] sm:text-[10px] font-mono text-slate-300 mt-1">0 / 2200</div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">Hashtags</span>
                                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-orange-500">
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                                            Refresh
                                        </span>
                                    </div>
                                    <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 flex flex-nowrap items-center gap-1.5 overflow-x-auto">
                                        {HASHTAGS.map((h) => (
                                            <span key={h} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange-50 border border-orange-100 text-orange-600 text-[9px] sm:text-[10px] font-mono font-semibold flex-shrink-0 whitespace-nowrap">
                                                {h}
                                                <span className="text-orange-300">×</span>
                                            </span>
                                        ))}
                                        <span className="text-[9px] sm:text-[10px] text-slate-300 font-mono flex-shrink-0 whitespace-nowrap">Type tag + Enter…</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Date</span>
                                    <div className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700">
                                        08/18/2026
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">Posting time</span>
                                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-orange-500">
                                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.2 4.2l2.9 2.9M16.9 16.9l2.9 2.9M1 12h4M19 12h4M4.2 19.8l2.9-2.9M16.9 7.1l2.9-2.9" /></svg>
                                            Smart Schedule
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-1 gap-1">
                                        <span className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white shadow-sm text-[10px] sm:text-xs font-bold text-orange-600">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2z" /></svg>
                                            Recommended
                                        </span>
                                        <span className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold text-slate-400">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" /></svg>
                                            Custom Time
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-slate-100 bg-slate-50/60">
                            <button className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-slate-600 border border-slate-200 bg-white">
                                Cancel
                            </button>
                            <button className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-[#10B981] shadow-lg shadow-emerald-200">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                Publish Now
                            </button>
                            <button className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-200" style={{ background: "linear-gradient(90deg, #F97316, #EF4444)" }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                                Save &amp; Schedule
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
