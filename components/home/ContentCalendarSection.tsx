import FadeImage from "@/components/ui/FadeImage";

type Status = "scheduled" | "draft" | "published";

const STATUS_STYLE: Record<Status, { bg: string; color: string; label: string }> = {
    scheduled: { bg: "#EFF6FF", color: "#3B82F6", label: "Scheduled" },
    draft: { bg: "#FFFBEB", color: "#F59E0B", label: "Draft" },
    published: { bg: "#ECFDF5", color: "#10B981", label: "Published" },
};

interface CalPost {
    day: number;
    img: string;
    score: number;
    time: string;
    caption: string;
    status: Status;
    moreCount?: number;
    festival?: boolean;
}

const POSTS: CalPost[] = [
    { day: 1, img: "/images/img1.jpeg", score: 90, time: "10:00 AM", caption: "When it comes to Website Development, quality and trust make all the difference…", status: "published" },
    { day: 2, img: "/images/coffee.jpg", score: 84, time: "10:00 AM", caption: "People remember how you made them feel, not just what you offered…", status: "published" },
    { day: 3, img: "/images/team-office.png", score: 85, time: "02:30 PM", caption: "When it comes to Website Development, quality and trust make all the difference…", status: "published" },
    { day: 4, img: "/images/sport.jpg", score: 77, time: "07:34 PM", caption: "People remember how you made them feel, not just what you offered…", status: "published" },
    { day: 5, img: "/images/img2.jpeg", score: 87, time: "02:30 PM", caption: "The details are what separate good Website Development from great work…", status: "published" },
    { day: 6, img: "/images/banner.png", score: 84, time: "02:30 PM", caption: "Every satisfied customer starts with a single good decision. We take feedback…", status: "published", moreCount: 1 },
    { day: 7, img: "/images/img3.jpeg", score: 76, time: "02:30 PM", caption: "Word of mouth is still the best marketing, and it starts with real results…", status: "published" },
    { day: 8, img: "/images/holiday1.jpg", score: 75, time: "02:30 PM", caption: "Great service isn't an accident, it's a habit we practice daily…", status: "scheduled" },
    { day: 9, img: "/images/img10.png", score: 77, time: "02:30 PM", caption: "Your time matters, and so does getting it right the first time…", status: "scheduled" },
    { day: 10, img: "/images/img11.jpeg", score: 87, time: "02:30 PM", caption: "The right choice today saves you headaches tomorrow. Affordable doesn't…", status: "scheduled" },
    { day: 11, img: "/images/holiday2.jpg", score: 80, time: "02:30 PM", caption: "Consistency is what turns first-time customers into loyal ones…", status: "scheduled" },
    { day: 12, img: "/images/holi.jpg", score: 0, time: "02:30 PM", caption: "No content", status: "scheduled", festival: true, moreCount: 5 },
    { day: 13, img: "/images/holiday3.jpg", score: 84, time: "02:30 PM", caption: "There's a difference between being available and being reliable…", status: "scheduled" },
    { day: 14, img: "/images/motivation.jpg", score: 92, time: "02:30 PM", caption: "Small businesses like ours grow one happy customer at a time…", status: "published" },
    { day: 15, img: "/images/sky.jpg", score: 74, time: "02:30 PM", caption: "We believe in doing things properly, even when no one's watching…", status: "published" },
];

const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const GRID_DAYS = [26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const STATS = [
    { dot: "#F97316", val: "69", label: "Posts" },
    { dot: "#3B82F6", val: "24", label: "Scheduled" },
    { dot: "#10B981", val: "45", label: "Published" },
    { dot: "#F59E0B", val: "0", label: "Drafts" },
    { dot: "#EC4899", val: "0K", label: "Reach" },
];

const ImageIcon = () => (
    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
        <path d="m21 15-5-5L5 21" />
    </svg>
);

export default function ContentCalendarSection() {
    const postsByDay = new Map(POSTS.map((p) => [p.day, p]));

    return (
        <section className="py-10 sm:py-16 lg:py-20 bg-white">
            <div className="w-full sm:max-w-[85%] mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Content calendar</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
                        A month of content, drafted while you sleep
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Set your brand and industry once. Every morning your calendar has fresh, on-brand posts waiting.
                    </p>
                </div>

                <div className="w-full rounded-2xl sm:rounded-3xl border border-[#E2E4F0] bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
                    {/* Stat toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-3 sm:px-4 py-3 border-b border-[#E2E4F0] bg-[#FAFAFD]">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            {STATS.map((s) => (
                                <span key={s.label} className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#E2E4F0] bg-white text-[10px] sm:text-xs font-bold text-slate-700">
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                                    {s.val} {s.label}
                                </span>
                            ))}
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-orange-500 text-white text-[10px] sm:text-xs font-bold">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            August 2026
                        </span>
                    </div>

                    {/* Day-of-week header */}
                    <div className="grid grid-cols-7 border-b-2 border-[#E2E4F0] bg-white">
                        {DAY_LABELS.map((d) => (
                            <div key={d} className="py-2 sm:py-3 text-center text-[9px] sm:text-[10.5px] font-extrabold tracking-wide text-[#8486AB]">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* 3-week strip */}
                    <div className="grid grid-cols-7">
                        {GRID_DAYS.map((day, i) => {
                            const isOther = i < 6;
                            const post = !isOther ? postsByDay.get(day) : undefined;
                            const ss = post ? STATUS_STYLE[post.status] : null;

                            return (
                                <div
                                    key={`${day}-${i}`}
                                    className="border-r border-b border-[#ECEDF8] p-1.5 sm:p-2 flex flex-col gap-1.5"
                                    style={{ background: isOther ? "#F4F5FB" : "#fff" }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] sm:text-xs font-bold" style={{ color: isOther ? "#BFC1D9" : "#3D3F60" }}>
                                            {day}
                                        </span>
                                        {!isOther && (
                                            <span className="w-4 h-4 rounded flex items-center justify-center text-orange-500 bg-orange-50">
                                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                            </span>
                                        )}
                                    </div>

                                    {post && ss && (
                                        post.festival ? (
                                            <div className="rounded-lg overflow-hidden border border-[#E2E4F0] shadow-sm bg-white">
                                                <div className="relative h-10 sm:h-16">
                                                    <FadeImage src={post.img} alt="" fill sizes="120px" quality={40} unoptimized={false} className="object-cover" />
                                                    <span className="absolute top-1 left-1 hidden sm:inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[7px] font-extrabold text-white bg-orange-500/85">
                                                        ★ Festival
                                                    </span>
                                                </div>
                                                <div className="hidden sm:block px-1.5 py-1.5">
                                                    <p className="text-[8.5px] italic text-slate-300 mb-1">No content</p>
                                                    <div className="flex items-center justify-between gap-1">
                                                        <span className="text-[7.5px] font-bold font-mono text-emerald-600">{post.time}</span>
                                                        <span className="px-1 py-0.5 rounded-full text-[7px] font-bold" style={{ background: ss.bg, color: ss.color }}>{ss.label}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="rounded-lg overflow-hidden border border-[#E2E4F0] shadow-sm bg-white">
                                                <div className="relative h-10 sm:h-16">
                                                    <FadeImage src={post.img} alt="" fill sizes="120px" quality={40} unoptimized={false} className="object-cover" />
                                                    <span className="absolute top-1 left-1 hidden sm:inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[7px] font-extrabold text-white bg-black/55">
                                                        <ImageIcon /> Image
                                                    </span>
                                                    <span className="absolute bottom-1 right-1 hidden sm:inline-flex px-1 py-0.5 rounded text-[7px] font-extrabold font-mono bg-black/55 text-emerald-400">
                                                        {post.score}
                                                    </span>
                                                </div>
                                                <div className="hidden sm:block px-1.5 py-1">
                                                    <p className="text-[8.5px] leading-snug text-slate-500 line-clamp-2 mb-1">{post.caption}</p>
                                                    <div className="flex items-center justify-between gap-1">
                                                        <span className="text-[7.5px] font-bold font-mono text-emerald-600">{post.time}</span>
                                                        <span className="px-1 py-0.5 rounded-full text-[7px] font-bold" style={{ background: ss.bg, color: ss.color }}>{ss.label}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}

                                    {post?.moreCount && (
                                        <div className="hidden sm:flex items-center gap-1 px-1.5 py-1 rounded-md bg-orange-50 text-orange-600 text-[7.5px] font-extrabold">
                                            <svg width="7" height="7" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                                            +{post.moreCount} more
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
