import NextImage from "next/image";
import { SparklesIcon } from "@heroicons/react/24/outline";
import type { Festival } from "@/types/home";

function fmtFestivalDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function daysUntil(iso: string): string {
    const target = new Date(iso);
    target.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.round((target.getTime() - today.getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1) return `In ${diffDays} days`;
    return fmtFestivalDate(iso);
}

export default function FestivalsSection({ festivals }: { festivals: Festival[] }) {
    if (festivals.length === 0) return null;

    const sorted = [...festivals].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const [featured] = sorted;

    return (
        <section
            id="upcoming-festivals"
            className="py-6 sm:py-12 lg:py-20 relative bg-[#fff7f0] md:[background:linear-gradient(180deg,#f8fafc_0%,#fff7f0_60%,#ffffff_100%)]"
        >
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
                <div className="text-center">
                    {/* Badge */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                        <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-200">
                            <SparklesIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            Never Miss a Moment
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
                        Upcoming Festivals &amp; Occasions
                    </h2>

                    <p className="text-slate-500 max-w-2xl mx-auto mb-6 sm:mb-10 text-xs sm:text-sm lg:text-base leading-relaxed px-2">
                        We automatically generate on-brand posts for every festival on the calendar, so your business never misses a chance to celebrate with your audience.
                    </p>
                </div>

                {/* Featured — next upcoming festival */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-orange-100/40 mb-4 sm:mb-6">
                    <div className="relative aspect-[16/9] sm:aspect-[21/8]">
                        <NextImage
                            src={featured.pic}
                            alt={featured.name}
                            fill
                            sizes="100vw"
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
                        <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wide mb-2 sm:mb-3">
                            {daysUntil(featured.date)}
                        </span>
                        <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mb-1">{featured.name}</h3>
                        <span className="text-xs sm:text-sm font-semibold text-white/80">{fmtFestivalDate(featured.date)}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
