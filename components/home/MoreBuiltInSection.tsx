const FEATURES = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
        ),
        title: "Native video, no re-uploading",
        desc: "Upload a file or paste a link, write the title, description and tags once, then publish straight to YouTube and TikTok.",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: "Bring your whole team",
        desc: "Invite teammates, assign who can draft and who can publish, and review a post before it ever goes live.",
    },
];

export default function MoreBuiltInSection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20 overflow-hidden bg-[#fff0e0] md:[background:linear-gradient(180deg,#ffffff_0%,#fff0e0_50%,#ffffff_100%)]">
            <div className="w-full sm:max-w-[85%] mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">More, built in</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
                        Everything else a busy team needs
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Two more pieces of the workflow, ready without extra setup.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="rounded-2xl sm:rounded-3xl border border-orange-300/60 bg-white/70 backdrop-blur-md p-6 sm:p-8 shadow-md shadow-orange-100/40">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4 sm:mb-5">
                            {FEATURES[0].icon}
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-2">{FEATURES[0].title}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{FEATURES[0].desc}</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-white" style={{ background: "linear-gradient(115deg,#F97316,#EA580C)" }}>Public</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-slate-600 border border-slate-200">Unlisted</span>
                            <span className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-slate-600 border border-slate-200">Private</span>
                        </div>
                    </div>

                    <div className="rounded-2xl sm:rounded-3xl border border-orange-300/60 bg-white/70 backdrop-blur-md p-6 sm:p-8 shadow-md shadow-orange-100/40">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4 sm:mb-5">
                            {FEATURES[1].icon}
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-2">{FEATURES[1].title}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{FEATURES[1].desc}</p>
                        <div className="flex -space-x-2">
                            <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "#F97316" }}>RB</span>
                            <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "#3B63C2" }}>AS</span>
                            <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white" style={{ background: "#227A55" }}>NK</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
