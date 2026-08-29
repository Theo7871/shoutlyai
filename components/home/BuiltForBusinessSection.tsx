const FEATURES = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: "Role-based permissions",
        desc: "Control who drafts, who approves, and who publishes — down to the individual account.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6z" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        ),
        title: "Enterprise-grade security",
        desc: "Encrypted credentials, audit logs, and OAuth logins — your data is never stored in plain text.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        title: "Priority support",
        desc: "Dedicated onboarding and a fast-response support line for growing teams.",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
        ),
        title: "Custom SLAs",
        desc: "Uptime guarantees and dedicated infrastructure for teams that need them.",
    },
];

export default function BuiltForBusinessSection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20 overflow-hidden bg-[#fff0e0] md:[background:linear-gradient(180deg,#ffffff_0%,#fff0e0_50%,#ffffff_100%)]">
            <div className="w-full sm:max-w-[85%] mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Built for business</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
                        Built for teams that mean business
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed">
                        The controls, security, and support growing teams expect — included, not upsold.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl sm:rounded-3xl border border-orange-300/60 bg-white/70 backdrop-blur-md p-5 sm:p-6 shadow-md shadow-orange-100/40 transition-transform hover:-translate-y-1"
                        >
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4 sm:mb-5">
                                {f.icon}
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">{f.title}</h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8 sm:mt-10">
                    <a
                        href="/contact-us"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 border-b-2 border-orange-500 pb-0.5 hover:text-orange-600 transition-colors"
                    >
                        Talk to our team
                        <span aria-hidden>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
