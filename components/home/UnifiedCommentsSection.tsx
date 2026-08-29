const PLATFORM_ICONS: Record<string, { bg: string; path: string }> = {
    IG: { bg: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
    FB: { bg: "#1877F2", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    X: { bg: "#000000", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    YT: { bg: "#FF0000", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    TT: { bg: "#000000", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
};

interface ThreadItem {
    platform: keyof typeof PLATFORM_ICONS;
    initials: string;
    avatarColor: string;
    author: string;
    time: string;
    text: string;
    unread?: boolean;
}

const THREADS: ThreadItem[] = [
    { platform: "IG", initials: "RM", avatarColor: "#F97316", author: "riya.makes", time: "2m", text: "Do you deliver outside the city? Loved this design 😍", unread: true },
    { platform: "FB", initials: "SK", avatarColor: "#3B63C2", author: "Sanjay Kumar", time: "14m", text: "What are your weekend timings?", unread: true },
    { platform: "X", initials: "AV", avatarColor: "#227A55", author: "@avantika_v", time: "38m", text: "This is exactly what our team needed, great work!" },
    { platform: "YT", initials: "DP", avatarColor: "#B45309", author: "Dev Patel", time: "1h", text: "Can you share the pricing for bulk orders?" },
    { platform: "TT", initials: "NM", avatarColor: "#9333EA", author: "nikita.m", time: "3h", text: "Obsessed with this 🔥 dropping a follow right now" },
];

const CHECKS = [
    "Every DM and comment from all connected platforms in one feed",
    "Reply once, right from the inbox — no app-switching",
    "Unread badges per platform so nothing slips through",
];

export default function UnifiedCommentsSection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20 overflow-hidden bg-[#ffedd5] md:[background:linear-gradient(90deg,#ffffff_50%,#ffedd5_50%,#ffffff_100%)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center">
                    {/* Copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Unified inbox</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 sm:mb-5">
                            Every comment, one inbox
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
                            Comments and DMs from Instagram, Facebook, X, YouTube, TikTok and more land in a single feed — reply to any of them without leaving Shoutly.
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

                    {/* Inbox mock */}
                    <div className="relative">
                        <div className="absolute -inset-6 bg-gradient-to-br from-orange-200/40 via-transparent to-red-200/30 rounded-[2.5rem] blur-3xl pointer-events-none" />
                        <div className="relative rounded-2xl sm:rounded-3xl border border-orange-300/60 bg-white/80 backdrop-blur-md shadow-xl shadow-orange-200/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-300/50">
                            {/* Header */}
                            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                    </span>
                                    <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Inbox</div>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] sm:text-xs font-bold">
                                    5 New
                                </span>
                            </div>

                            {/* Threads */}
                            <div className="divide-y divide-slate-100">
                                {THREADS.map((t, i) => {
                                    const p = PLATFORM_ICONS[t.platform];
                                    return (
                                        <div key={i} className={`flex items-start gap-3 px-4 sm:px-6 py-2 sm:py-2 ${t.unread ? "bg-orange-50/40" : ""}`}>
                                            <div className="relative flex-shrink-0">
                                                <span
                                                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold"
                                                    style={{ background: t.avatarColor }}
                                                >
                                                    {t.initials}
                                                </span>
                                                <span
                                                    className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border-2 border-white flex items-center justify-center p-[3px]"
                                                    style={{ background: p.bg }}
                                                >
                                                    <svg viewBox="0 0 24 24" fill="#fff"><path d={p.path} /></svg>
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">{t.author}</span>
                                                    <span className="text-[10px] sm:text-xs text-slate-400 flex-shrink-0">{t.time}</span>
                                                </div>
                                                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5 line-clamp-2">{t.text}</p>
                                            </div>
                                            {t.unread && <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Reply composer */}
                            <div className="flex items-center gap-2 px-4 sm:px-6 py-2 border-t border-slate-100 bg-slate-50/60">
                                <span className="flex-1 px-3 py-2 rounded-full bg-white border border-slate-200 text-[11px] sm:text-xs text-slate-400">
                                    Reply to riya.makes…
                                </span>
                                <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
