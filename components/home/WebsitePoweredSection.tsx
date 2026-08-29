const CHECKS = [
    { title: "One-time setup", desc: "We research everything about your business from your site" },
    { title: "Always learning", desc: "Website updates (new service, product, offer) trigger new content ideas" },
    { title: "Fully automated", desc: "Content stays in sync with your actual business" },
];

const FLOW_STEPS = [
    {
        label: "Your Website",
        sub: "yourbusiness.com",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
            </svg>
        ),
    },
    {
        label: "AI Analyzes",
        sub: "Services, Products, Voice",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2a4.5 4.5 0 0 0-4.5 4.5c0 .82.22 1.6.6 2.26A4.5 4.5 0 0 0 4 12.5 4.5 4.5 0 0 0 8.5 17c.2 0 .4 0 .6-.04V19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1.54c.2.03.4.04.6.04a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-1.6-3.44c.38-.65.6-1.4.6-2.22A4.5 4.5 0 0 0 14.1 2" />
            </svg>
        ),
    },
    {
        label: "Creates Content",
        sub: "Posts, Reels, Images",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l1.8 5.9L20 9.5l-6.2 1.6L12 17l-1.8-5.9L4 9.5l6.2-1.6L12 2z" />
                <path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14z" opacity=".7" />
            </svg>
        ),
    },
];

const EXAMPLE_URLS = [
    "https://thecornerbakery.com",
    "https://sunsetyogastudio.com",
    "https://brightsmiledental.com",
    "https://urbanfitnessclub.com",
    "https://bellavistarealty.com",
];

export default function WebsitePoweredSection() {
    const exampleUrl = EXAMPLE_URLS[Math.floor(Math.random() * EXAMPLE_URLS.length)];

    return (
        <section className="py-10 sm:py-16 lg:py-20 overflow-hidden" style={{ background: "#ffedd5" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Website-powered AI</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 sm:mb-5">
                            Your AI Agent Works While You Sleep.
                        </h2>
                        <ul className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center flex-shrink-0">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        <strong className="text-slate-900 font-bold">Analyzes Your Business</strong>Reads your website, understands your services, learns your brand voice in one setup.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center flex-shrink-0">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        <strong className="text-slate-900 font-bold">Generates Content Daily</strong>Creates platform-specific posts for Instagram, LinkedIn, TikTok, Facebook automatically.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center flex-shrink-0">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        <strong className="text-slate-900 font-bold">Creates AI Images</strong>Generates original, on-brand images for every post. No stock photos.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center flex-shrink-0">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        <strong className="text-slate-900 font-bold">Stays in Sync</strong>Website changed? New offer? Agent notices and creates fresh content automatically.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center flex-shrink-0">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        <strong className="text-slate-900 font-bold">Learns & Improves</strong>Analyzes engagement patterns. Generates more of what works.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center flex-shrink-0">
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                        <strong className="text-slate-900 font-bold">Works 24/7</strong>No human input needed. Your marketing never stops.
                                    </span>
                                </li>
                        </ul>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            This is real. Your AI Agent is actually analyzing your business and generating real content right now.
                        </p>
                    </div>

                    {/* Demo card — static view only, no interactivity */}
                    <div className="relative">
                        <div className="absolute -inset-6 bg-gradient-to-br from-orange-200/40 via-transparent to-red-200/30 rounded-[2.5rem] blur-3xl pointer-events-none" />
                        <div className="relative rounded-2xl sm:rounded-3xl border border-orange-300/60 bg-white shadow-xl shadow-orange-200/40 p-5 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6">Analyze your website</h3>

                            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                                Your website URL
                            </label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 min-w-0 px-4 py-3 rounded-xl border-2 border-slate-200 text-sm text-slate-700">
                                    {exampleUrl}
                                </div>
                                <span
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm whitespace-nowrap"
                                    style={{ background: "linear-gradient(135deg,#ea580c,#f97316)", boxShadow: "0 8px 20px rgba(234,88,12,.25)" }}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 20 10 13 3" /><polyline points="20 10 7 10" /></svg>
                                    <a href="/shoutly-ai-agent.html">Analyze</a>
                                </span>
                            </div>

                            {/* Flow diagram */}
                            <div className="border-t border-slate-100 pt-5 sm:pt-6 mt-5 sm:mt-6">
                                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 text-center">How we work</p>
                                <div className="flex items-start justify-between gap-1 sm:gap-3">
                                    {FLOW_STEPS.map((s, i) => (
                                        <div key={s.label} className="contents">
                                            <div className="flex-1 text-center">
                                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mx-auto mb-2.5 flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg,#ea580c,#f97316)" }}>
                                                    {s.icon}
                                                </div>
                                                <p className="text-[11px] sm:text-xs font-bold text-slate-900 mb-0.5">{s.label}</p>
                                                <p className="text-[10px] sm:text-[11px] text-slate-400">{s.sub}</p>
                                            </div>
                                            {i !== FLOW_STEPS.length - 1 && (
                                                <div className="hidden sm:flex items-center justify-center text-slate-300 pt-4 sm:pt-5 text-lg flex-shrink-0">→</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
