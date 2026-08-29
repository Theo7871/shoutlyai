import FadeImage from "@/components/ui/FadeImage";

const CHECKS = [
    "12,000+ templates across 155+ industries",
    "Filter by industry, festival, or content type",
    "Send directly to your content calendar or publish immediately",
];

export default function LibraryCollageSection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20 overflow-hidden bg-[#fff0e0] md:[background:linear-gradient(90deg,#fff0e0_0%,#ffffff_100%)]">
            <div className="w-full sm:max-w-[85%] mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Image collage — left */}
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-5 h-[340px] sm:h-[460px]">
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-slate-300/40 ring-1 ring-black/5">
                            <FadeImage src="/images/coffee.jpg" alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" quality={55} unoptimized={false} className="object-cover" />
                        </div>
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden row-span-2 shadow-xl shadow-slate-300/40 ring-1 ring-black/5">
                            <FadeImage src="/images/team-office.png" alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" quality={55} unoptimized={false} className="object-cover" />
                        </div>
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-slate-300/40 ring-1 ring-black/5">
                            <FadeImage src="/images/img2.jpeg" alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" quality={55} unoptimized={false} className="object-cover" />
                        </div>
                    </div>

                    {/* Copy — right */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Content library</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 sm:mb-5">
                            A template for every idea
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
                            Explore 12,000+ ready-to-post templates across 155+ industries, choose a template, add your brand, and publish. No design or writing expertise needed.
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
