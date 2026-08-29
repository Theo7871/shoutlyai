interface Row {
    name: string;
    handle: string;
    color: string;
    path: string;
    aiTime: string;
    confidence: number;
    source: "account" | "estimated";
    mode: "ai" | "own";
    ownTime?: string;
    enabled?: boolean;
}

const ROWS: Row[] = [
    { name: "Instagram", handle: "@mybusiness", color: "#E1306C", aiTime: "6:30 PM", confidence: 94, source: "account", mode: "own", ownTime: "06:30 PM", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
    { name: "Facebook", handle: "My Business", color: "#1877F2", aiTime: "7:00 PM", confidence: 89, source: "account", mode: "ai", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { name: "LinkedIn", handle: "My Company", color: "#0A66C2", aiTime: "9:15 AM", confidence: 91, source: "account", mode: "ai", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { name: "X (Twitter)", handle: "@mybusiness", color: "#111827", aiTime: "12:30 PM", confidence: 86, source: "estimated", mode: "ai", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    { name: "TikTok", handle: "@mybusiness", color: "#111827", aiTime: "8:00 PM", confidence: 96, source: "account", mode: "ai", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
    { name: "Threads", handle: "@mybusiness", color: "#111827", aiTime: "1:00 PM", confidence: 84, source: "estimated", mode: "own", ownTime: "01:00 PM", path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.746-1.757-.51-.586-1.3-.883-2.345-.89h-.043c-.708 0-1.67.195-2.282 1.106l-1.737-1.21c.823-1.222 2.169-1.894 3.79-1.894h.064c2.709.017 4.322 1.674 4.482 4.553.092.039.183.077.272.117 1.255.589 2.18 1.494 2.674 2.616.687 1.56.75 4.106-1.317 6.13-1.578 1.55-3.494 2.244-6.226 2.264Z" },
    { name: "Bluesky", handle: "@mybusiness", color: "#0085FF", aiTime: "8:30 AM", confidence: 88, source: "estimated", mode: "own", ownTime: "08:30 AM", path: "M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" },
    { name: "YouTube", handle: "My Business", color: "#FF0000", aiTime: "2:00 PM", confidence: 90, source: "account", mode: "ai", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { name: "Pinterest", handle: "My Business", color: "#E60023", aiTime: "8:00 PM", confidence: 87, source: "estimated", mode: "ai", enabled: false, path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.756-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592.001 12.017.001z" },
    { name: "Google Business", handle: "My Business", color: "#4285F4", aiTime: "11:00 AM", confidence: 85, source: "estimated", mode: "ai", path: "M12.04 2C7.69 2 4.14 5.54 4.14 9.91c0 .03 0 .06.01.09L2.5 9.91v4.18l1.66-.09c.34 4.06 3.72 7.27 7.88 7.27 4.39 0 7.96-3.57 7.96-7.96 0-.54-.05-1.06-.15-1.57h-7.81v3.18h4.47c-.19 1-.78 1.85-1.66 2.42v2.01h2.69c1.57-1.45 2.48-3.58 2.48-6.12 0-4.37-3.55-7.91-7.92-7.91z" },
];

const CHECKS = [
    "AI-recommended time per account, with a confidence score",
    "Auto-applies to every new post — no manual picking",
    "Switch any single account to a custom time in one tap",
];

function barColor(pct: number) {
    if (pct >= 90) return "#10B981";
    if (pct >= 80) return "#F59E0B";
    return "#EF4444";
}

export default function SmartSchedulingSection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20">
            <div className="w-full sm:max-w-[85%] mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Smart scheduling</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
                        Post at the moment your audience shows up
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Shoutly AI studies every connected account and works out its best send time on its own — automatically applied to each new post, with a confidence score so you know why.
                    </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 bg-slate-50/60">
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-slate-400 truncate">Smart Scheduling &middot; 10 of 10 accounts</span>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[640px]">
                            <div className="grid px-4 sm:px-6 pt-4 pb-2" style={{ gridTemplateColumns: "1.8fr 1fr 1.3fr 1.6fr", gap: 10 }}>
                                {["Account", "AI best time", "Confidence", "Default"].map((h) => (
                                    <div key={h} className="text-[9.5px] sm:text-[10.5px] font-extrabold uppercase tracking-widest text-slate-300">{h}</div>
                                ))}
                            </div>
                            {ROWS.map((r) => (
                                <div
                                    key={r.name}
                                    className="grid items-center px-4 sm:px-6 py-2.5 border-t border-slate-100"
                                    style={{ gridTemplateColumns: "1.8fr 1fr 1.3fr 1.6fr", gap: 10, opacity: r.enabled === false ? 0.5 : 1 }}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: r.color }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d={r.path} /></svg>
                                        </span>
                                        <div className="min-w-0">
                                            <div className="text-xs font-bold text-slate-900 truncate">{r.name}</div>
                                            <div className="text-[10px] text-slate-400 truncate">{r.handle}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs font-extrabold font-mono text-slate-900">{r.aiTime}</div>
                                        <div className="text-[9px] mt-0.5" style={{ color: r.source === "account" ? "#10B981" : "#F59E0B" }}>
                                            {r.source === "account" ? "Account data" : "AI estimated"}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-[11px] font-bold font-mono text-slate-600 mb-1">{r.confidence}%</div>
                                        <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                                            <div className="h-full rounded-full" style={{ width: `${r.confidence}%`, background: barColor(r.confidence) }} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <div className="inline-flex rounded-md border border-slate-200 overflow-hidden flex-shrink-0">
                                            <span className="px-2 py-1 text-[9.5px] font-bold" style={{ background: r.mode === "ai" ? "#F97316" : "#F0F1F8", color: r.mode === "ai" ? "#fff" : "#6B6D8A" }}>AI</span>
                                            <span className="px-2 py-1 text-[9.5px] font-bold" style={{ background: r.mode === "own" ? "#F97316" : "#F0F1F8", color: r.mode === "own" ? "#fff" : "#6B6D8A" }}>Own</span>
                                        </div>
                                        {r.mode === "own" ? (
                                            <span className="text-[9.5px] font-mono font-semibold text-slate-500 bg-slate-100 rounded px-1.5 py-1">{r.ownTime}</span>
                                        ) : (
                                            <span className="text-[9.5px] text-slate-300">—</span>
                                        )}
                                        <span
                                            className="w-6 h-3.5 rounded-full relative flex-shrink-0 ml-auto"
                                            style={{ background: r.enabled === false ? "#E4E5EF" : "#10B981" }}
                                        >
                                            <span
                                                className="absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white shadow-sm"
                                                style={r.enabled === false ? { left: 2 } : { right: 2 }}
                                            />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
                    {CHECKS.map((c) => (
                        <span key={c} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-orange-100 bg-white text-[11px] sm:text-xs font-semibold text-slate-600 shadow-sm">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 flex-shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                            {c}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
