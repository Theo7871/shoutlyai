const KPIS = [
    { label: "Total Reach", value: "128K", iconBg: "#EEEEFF", iconColor: "#F97316", icon: "eye" },
    { label: "Engagements", value: "9.4K", iconBg: "#ECFDF5", iconColor: "#10B981", icon: "heart" },
    { label: "New Followers", value: "+1,240", iconBg: "#FFF7ED", iconColor: "#F97316", icon: "users" },
    { label: "Avg Engagement Rate", value: "4.8%", iconBg: "#FFF7E6", iconColor: "#F59E0B", icon: "percent" },
];

const LINE_POINTS = [22, 28, 24, 34, 30, 42, 38, 50, 44, 58, 52, 64, 60, 72];
const BAR_PAIRS: [number, number][] = [
    [60, 80], [64, 78], [58, 82], [66, 84], [62, 80], [70, 88], [68, 86],
    [72, 90], [70, 88], [76, 92], [74, 90], [78, 94], [76, 92], [80, 96],
];

function LinePath() {
    const w = 400, h = 150, pad = 6;
    const max = Math.max(...LINE_POINTS), min = Math.min(...LINE_POINTS);
    const stepX = (w - pad * 2) / (LINE_POINTS.length - 1);
    const coords = LINE_POINTS.map((v, i) => {
        const x = pad + i * stepX;
        const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
        return [x, y] as const;
    });
    const line = "M" + coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");
    const area = `${line} L${coords[coords.length - 1][0].toFixed(1)},${h - pad} L${coords[0][0].toFixed(1)},${h - pad} Z`;
    const last = coords[coords.length - 1];

    return (
        <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none">
            <defs>
                <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                </linearGradient>
            </defs>
            {[1, 2, 3].map((g) => (
                <line key={g} x1={pad} y1={(g * (h - pad * 2)) / 4 + pad} x2={w - pad} y2={(g * (h - pad * 2)) / 4 + pad} stroke="#ECEEF6" strokeWidth="1" />
            ))}
            <path d={area} fill="url(#analyticsFill)" stroke="none" />
            <path d={line} fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={last[0]} cy={last[1]} r="4.5" fill="#F97316" stroke="#fff" strokeWidth="2.5" />
        </svg>
    );
}

function BarChart() {
    return (
        <div className="flex items-end gap-1.5 sm:gap-2 h-full">
            {BAR_PAIRS.map(([a, b], i) => (
                <div key={i} className="flex-1 flex items-end justify-center gap-[2px] h-full">
                    <div className="flex-1 rounded-t-sm" style={{ height: `${b}%`, background: "#DCDDF7" }} />
                    <div className="flex-1 rounded-t-sm" style={{ height: `${a}%`, background: "#F97316" }} />
                </div>
            ))}
        </div>
    );
}

function KpiIcon({ icon }: { icon: string }) {
    if (icon === "eye") return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
    if (icon === "heart") return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.7-4.35-9.3-8.3C.8 9.5 1.7 5.9 4.8 4.5c2.1-.95 4.4-.3 5.9 1.4l1.3 1.5 1.3-1.5c1.5-1.7 3.8-2.35 5.9-1.4 3.1 1.4 4 5 2.1 8.2C18.7 16.65 12 21 12 21Z" /></svg>;
    if (icon === "users") return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>;
}

const CHECKS = [
    "Reach, engagement and growth in one dashboard",
    "7, 30, 90-day and year-to-date views",
    "Break it down by platform, or see it all together",
];

export default function AnalyticsSection() {
    return (
        <section className="relative py-10 sm:py-16 lg:py-20 overflow-hidden">
            <div
                className="absolute inset-y-0 left-0 w-1/2 hidden lg:block"
                style={{ background: "linear-gradient(90deg, #ffffff 0%, #fff0e0 100%)" }}
            />
            <div className="w-full sm:max-w-[85%] mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Visual */}
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-6 bg-gradient-to-br from-orange-200/30 via-transparent to-red-200/20 rounded-[2.5rem] blur-3xl pointer-events-none" />
                        <div className="relative rounded-2xl sm:rounded-3xl border border-orange-300/60 bg-white/80 backdrop-blur-md shadow-xl shadow-orange-200/40 overflow-hidden">
                            <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-[#E2E4F0] bg-[#F8F9FD]">
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-[#8486AB]">Performance Overview &middot; 30 days</span>
                            </div>

                            <div className="p-2.5 sm:p-3">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-1.5 sm:mb-2">
                                    {KPIS.map((k) => (
                                        <div key={k.label} className="rounded-lg border border-[#ECEEF6] bg-[#F8F9FD] p-1.5">
                                            <span className="w-4 h-4 rounded-md flex items-center justify-center mb-0.5" style={{ background: k.iconBg, color: k.iconColor }}>
                                                <KpiIcon icon={k.icon} />
                                            </span>
                                            <div className="text-[8px] text-[#8486AB] font-semibold mb-0.5">{k.label}</div>
                                            <div className="text-xs font-black text-[#0B0C1A] font-mono tracking-tight">{k.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="rounded-lg border border-[#ECEEF6] bg-[#F8F9FD] p-1.5 sm:p-2 mb-1.5">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <div>
                                            <div className="text-[10px] sm:text-[11px] font-extrabold text-[#0B0C1A]">Engagement over time</div>
                                            <div className="text-[8px] text-[#8486AB]">Likes, comments &amp; shares combined</div>
                                        </div>
                                    </div>
                                    <div className="h-14 sm:h-16">
                                        <LinePath />
                                    </div>
                                </div>

                                <div className="rounded-lg border border-[#ECEEF6] bg-[#F8F9FD] p-1.5 sm:p-2">
                                    <div className="text-[10px] sm:text-[11px] font-extrabold text-[#0B0C1A]">Reach &amp; impressions</div>
                                    <div className="text-[8px] text-[#8486AB] mb-1">Unique accounts reached per day</div>
                                    <div className="h-9 sm:h-11">
                                        <BarChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copy */}
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Analytics</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 sm:mb-5">
                            Know what&apos;s working, in one glance
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
                            Track reach, engagement and follower growth across every connected platform — filter by account, compare time ranges, and see which posts actually move the needle.
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
                </div>
            </div>
        </section>
    );
}
