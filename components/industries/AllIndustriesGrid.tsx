"use client";
import { useState } from "react";
import { API_BASE_URL } from "@/api/configApi";
import { INDUSTRIES } from "@/data/industries";

export default function AllIndustriesGrid() {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {INDUSTRIES.map((item) => {
                    const allLinks = [...item.visible, ...item.extra];
                    return (
                        <div key={item.key} className="rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-white border border-orange-100 text-left shadow-sm">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                                    {item.emoji}
                                </div>
                                <h2 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h2>
                            </div>
                            <ul className="text-xs sm:text-sm text-slate-500 space-y-1.5">
                                {allLinks.map((li) => (
                                    <li key={li.href}>
                                        <a href={li.href} className="hover:text-orange-500 transition-colors">
                                            &bull; {li.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center mt-10 sm:mt-14">
                <button
                    onClick={() => setIndustryReqOpen(true)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-transparent bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all duration-200"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Request an Industry
                </button>
            </div>

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
