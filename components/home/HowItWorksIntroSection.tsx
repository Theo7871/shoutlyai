import NextImage from "next/image";

const STEPS = [
    { n: "01", label: "Select industry" },
    { n: "02", label: "Enter prompt" },
    { n: "03", label: "AI generates" },
    { n: "04", label: "Auto schedule" },
];

export default function HowItWorksIntroSection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20 relative bg-[#ffedd5] md:[background:linear-gradient(180deg,#ffffff_0%,#ffedd5_50%,#ffffff_100%)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                <div className="flex justify-center mb-3 sm:mb-4">
                    <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        How it works
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
                    From a two-sentence brief to a scheduled month
                </h2>

                <p className="text-slate-500 max-w-2xl mx-auto mb-8 sm:mb-10 text-xs sm:text-sm lg:text-base leading-relaxed">
                    No design skills, no copywriting experience, no social media knowledge needed — just describe your business.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
                    {STEPS.map((step, i) => (
                        <div key={step.n} className="flex items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-orange-200 bg-white shadow-sm text-xs sm:text-sm font-semibold text-slate-700">
                                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">
                                    {step.n}
                                </span>
                                {step.label}
                            </div>
                            {i !== STEPS.length - 1 && (
                                <span className="hidden sm:inline text-orange-300 text-lg font-bold">→</span>
                            )}
                        </div>
                    ))}
                </div>

                <a
                    href="#see-it-in-action"
                    className="group relative block max-w-3xl mx-auto aspect-[16/8.6] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-orange-100/50 border border-orange-100"
                >
                    <NextImage
                        src="/images/coffee.jpg"
                        alt="Watch how Shoutly AI works"
                        fill
                        sizes="(max-width: 768px) 100vw, 720px"
                        quality={60}
                        unoptimized={false}
                        loading="lazy"
                        className="object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/50 transition-colors group-hover:from-black/35 group-hover:to-black/55" />
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </span>
                    <span className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-[10px] sm:text-xs font-mono text-slate-700 bg-white/95 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-orange-100">
                        90-second product tour
                    </span>
                </a>
            </div>
        </section>
    );
}
