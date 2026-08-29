"use client";
import { useState } from "react";
import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { API_BASE_URL } from "@/api/configApi";
import { INDUSTRIES as WHO_WE_HELP } from "@/data/industries";

export default function WhoWeHelpSection() {
    const [industryReqOpen, setIndustryReqOpen] = useState(false);
    const [industryReqName, setIndustryReqName] = useState("");
    const [industryReqEmail, setIndustryReqEmail] = useState("");
    const [industryReqSubmitting, setIndustryReqSubmitting] = useState(false);
    const [industryReqSuccess, setIndustryReqSuccess] = useState(false);

    const submitIndustryRequest = async () => {
        if (!industryReqName.trim() || !industryReqEmail.trim()) {
            return;
        }
        setIndustryReqSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/industry-requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    industryName: industryReqName.trim(),
                    email: industryReqEmail.trim(),
                }),
            });
            await res.json().catch(() => null);
            if (!res.ok) {
                return;
            }
            setIndustryReqSuccess(true);
        } catch {
        } finally {
            setIndustryReqSubmitting(false);
        }
    };

    const closeIndustryRequest = () => {
        setIndustryReqOpen(false);
        setIndustryReqName("");
        setIndustryReqEmail("");
        setIndustryReqSuccess(false);
    };

    return (
        <>
            <section
                id="who-we-help"
                className="py-6 sm:py-12 lg:py-20 overflow-hidden relative bg-[#ffedd8] md:[background:linear-gradient(180deg,#ffffff_0%,#ffedd8_50%,#ffffff_100%)]"
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[250px] sm:h-[400px] bg-gradient-to-b from-orange-100/30 to-transparent rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 text-center relative z-10">
                    {/* Badge */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                        <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-200">
                            <SparklesIcon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            Built for Business
                        </span>
                    </div>

                    {/* Title + Subtitle */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
                        Made for your business
                    </h2>

                    <p className="text-slate-500 max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm lg:text-base leading-relaxed px-2">
                        Every business has a unique story. Your content is tailored to your industry — relevant posts, promotions, festival greetings and seasonal campaigns, all year round.
                    </p>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                        {WHO_WE_HELP.slice(0, 8).map((item) => (
                            <div key={item.key} className="group rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-white border-2 border-orange-200 text-left shadow-md hover:shadow-xl hover:shadow-orange-200/50 hover:border-orange-400 hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300">
                                <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                                    {item.emoji}
                                </div>
                                <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{item.title}</h3>
                                <p className="text-[10px] sm:text-xs text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* More industries + request */}
                    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
                        <Link href="/industries" className="text-xs sm:text-sm text-slate-400 hover:text-orange-600 transition-colors underline decoration-dotted underline-offset-4">
                            +{WHO_WE_HELP.length - 8} more industries, from bakeries to NGOs
                        </Link>
                        <button
                            onClick={() => setIndustryReqOpen(true)}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors"
                        >
                            Request an industry
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Industry Request Modal */}
            {industryReqOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                    onClick={(e) => { if (e.target === e.currentTarget) closeIndustryRequest(); }}
                >
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-7 shadow-2xl">
                        <button
                            onClick={closeIndustryRequest}
                            aria-label="Close"
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {industryReqSuccess ? (
                            <div className="text-center py-4">
                                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Request received!</h3>
                                <p className="text-sm text-slate-500 mb-6">We'll email you as soon as this industry is added.</p>
                                <button
                                    onClick={closeIndustryRequest}
                                    className="w-full py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1.5">Request an Industry</h3>
                                <p className="text-sm text-slate-500 mb-5">
                                    Don't see your industry above? Tell us what it is and we'll email you when it's ready.
                                </p>

                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Industry name</label>
                                <input
                                    type="text"
                                    value={industryReqName}
                                    onChange={(e) => setIndustryReqName(e.target.value)}
                                    placeholder="e.g. Pet Grooming"
                                    className="w-full px-3.5 py-2.5 mb-4 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                />

                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Your email</label>
                                <input
                                    type="email"
                                    value={industryReqEmail}
                                    onChange={(e) => setIndustryReqEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-3.5 py-2.5 mb-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                />

                                <button
                                    onClick={submitIndustryRequest}
                                    disabled={industryReqSubmitting}
                                    className="w-full mt-3 py-3 rounded-full font-bold text-sm text-white transition-all duration-200 disabled:opacity-60"
                                    style={{ background: "linear-gradient(90deg, #F97316, #EF4444)" }}
                                >
                                    {industryReqSubmitting ? "Sending…" : "Submit Request"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
