import NextImage from "next/image";

const STATS = [
    { num: "12,000+", label: "Ready-made posts" },
    { num: "365-Day", label: "Content planning" },
    { num: "Multi-Platform", label: "Social media automation" },
    { num: "14-Day", label: "Free trial" },
];

export default function PostShowcaseSection() {
    return (
        <section className="relative bg-white py-10 sm:py-16 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Fanned post-format preview cards */}
                <div className="relative h-[280px] sm:h-[340px] max-w-2xl mx-auto mb-12 sm:mb-16">
                    {/* YouTube — Reel */}
                    <div className="absolute left-0 top-9 sm:top-12 w-56 sm:w-80 -rotate-6 rounded-2xl border border-orange-100 bg-white shadow-xl shadow-orange-100/40 p-4 sm:p-5 z-10">
                        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FF0000] text-white flex items-center justify-center flex-shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                            </span>
                            <div className="min-w-0">
                                <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">YouTube</div>
                                <div className="text-[10px] sm:text-xs text-slate-400 leading-tight">Scheduled · 2:00 PM</div>
                            </div>
                        </div>
                        <div className="aspect-[4/2.1] rounded-lg bg-gradient-to-br from-neutral-800 to-black flex items-center justify-center mb-2.5">
                            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#111"><path d="M8 5v14l11-7z" /></svg>
                            </span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-400">Reel</span>
                    </div>

                    {/* X — Text */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-56 sm:w-80 rounded-2xl border border-orange-100 bg-white shadow-xl shadow-orange-100/40 p-4 sm:p-5 z-20">
                        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black text-white flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm">X</span>
                            <div className="min-w-0">
                                <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">X</div>
                                <div className="text-[10px] sm:text-xs text-slate-400 leading-tight">Today · 8:00 PM</div>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-2.5">
                            &quot;Behind the scenes: how we brief a month of content in one prompt.&quot;
                        </p>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-400">Text</span>
                    </div>

                    {/* Instagram — Image */}
                    <div className="absolute right-0 top-11 sm:top-14 w-56 sm:w-80 rotate-6 rounded-2xl border border-orange-100 bg-white shadow-xl shadow-orange-100/40 p-4 sm:p-5 z-10">
                        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                            <span
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-white flex items-center justify-center flex-shrink-0 text-[10px] sm:text-xs font-bold"
                                style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}
                            >
                                IG
                            </span>
                            <div className="min-w-0">
                                <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Instagram</div>
                                <div className="text-[10px] sm:text-xs text-slate-400 leading-tight">Aug 9 · 6:30 PM</div>
                            </div>
                        </div>
                        <div className="relative aspect-[4/2.1] rounded-lg mb-2.5 overflow-hidden bg-orange-50">
                            <NextImage src="/images/coffee.jpg" alt="Example generated post image" fill sizes="320px" quality={55} unoptimized={false} priority className="object-cover" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                            Published
                        </span>
                    </div>
                </div>

                {/* Stat bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-0 border-t border-b border-orange-100 py-6 sm:py-0">
                    {STATS.map((s, i) => (
                        <div key={s.label} className={`text-center px-2 sm:py-6 ${i !== 0 ? "sm:border-l sm:border-orange-100" : ""}`}>
                            <div className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">{s.num}</div>
                            <div className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
