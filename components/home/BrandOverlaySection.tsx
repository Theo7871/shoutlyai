import NextImage from "next/image";
import FadeImage from "@/components/ui/FadeImage";

const CHECKS = [
    "Logo, phone & website auto-stamped on every image",
    "Matches your brand kit's colors and position",
    "Toggle the overlay on or off, per post",
];

export default function BrandOverlaySection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20 overflow-hidden bg-[#fff0e0] md:[background:linear-gradient(90deg,#ffffff_0%,#fff0e0_100%)]">
            <div className="w-full sm:max-w-[85%] mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Copy */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Brand overlay</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4 sm:mb-5">
                            Your logo and contact, on every post
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
                            Every image Shoutly AI generates carries your brand automatically — logo, phone number and website stamped in place, styled to match your brand kit.
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

                    {/* Visual */}
                    <div className="relative">
                        <div className="absolute -inset-6 bg-gradient-to-br from-orange-200/40 via-transparent to-red-200/30 rounded-[2.5rem] blur-3xl pointer-events-none" />
                        <div className="relative max-w-lg mx-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-orange-100/50 overflow-hidden">
                            {/* Chrome */}
                            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100">
                                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                </span>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                </div>
                            </div>

                            {/* Post image */}
                            <div className="relative w-full" style={{ aspectRatio: "560/320", background: "#F0F1F8" }}>
                                <FadeImage src="/images/team-office.png" alt="" fill sizes="(max-width: 1024px) 100vw, 560px" quality={55} unoptimized={false} className="object-cover object-top" />
                                {/* Brand badge (glass style, top-left, matches getBadgeStyle() defaults) */}
                                <div
                                    className="absolute flex items-center gap-1.5 rounded-[10px]"
                                    style={{
                                        top: 12,
                                        left: 12,
                                        padding: "5px 8px",
                                        background: "rgba(249,115,22,.18)",
                                        backdropFilter: "blur(12px)",
                                        border: "1px solid rgba(249,115,22,.3)",
                                        boxShadow: "0 4px 16px rgba(249,115,22,.2)",
                                    }}
                                >
                                    <span className="relative w-8 h-8 rounded-md bg-[#111] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        <NextImage src="/images/logo-icon-white.png" alt="" fill sizes="32px" quality={60} unoptimized={false} className="object-contain p-1" />
                                    </span>
                                    <span className="text-[10px] font-extrabold text-white whitespace-nowrap">Shoutly User</span>
                                </div>
                            </div>

                            {/* Footer stats */}
                            <div className="flex items-center justify-between px-3.5 py-2.5 border-t border-slate-100">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.7-4.35-9.3-8.3C.8 9.5 1.7 5.9 4.8 4.5c2.1-.95 4.4-.3 5.9 1.4l1.3 1.5 1.3-1.5c1.5-1.7 3.8-2.35 5.9-1.4 3.1 1.4 4 5 2.1 8.2C18.7 16.65 12 21 12 21Z" /></svg>
                                        24.8K
                                    </span>
                                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 21l2-5.5a8.5 8.5 0 1 1 16-4Z" /></svg>
                                        1.2K
                                    </span>
                                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.68 13.34l6.64 3.82M15.32 6.84l-6.64 3.82" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6.5" r="2.5" /><circle cx="18" cy="17.5" r="2.5" /></svg>
                                        847
                                    </span>
                                </div>
                                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                                    Overlay Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
