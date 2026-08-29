"use client";
// pages/index.tsx
import Head from "next/head";

export default function Home() {
    const problems = [
        { icon: "🎲", title: "Random Posting", desc: "Post when you remember. Go silent when you're busy. No consistency, no growth." },
        { icon: "📉", title: "Inconsistent Content", desc: "3 posts one week, 0 the next. Algorithms hate inconsistency. So do customers." },
        { icon: "🎭", title: "No Festival Planning", desc: "Diwali, Christmas, Ramadan — you scramble last minute or miss them entirely." },
        { icon: "⚙️", title: "No Automation", desc: "You're doing manually what should be automated. Wasting hours every week." },
    ];

    const previews = [
        { title: "📌 Q1 · JAN–MAR", items: ["New Year strategy posts", "Valentine's Day campaigns", "Industry trend forecasts", "Weekly educational content", "Festival: Makar Sankranti"] },
        { title: "🎯 Q2 · APR–JUN", items: ["Spring/Summer campaigns", "Mother's Day / Father's Day", "Mid-year reviews", "Product/service spotlights", "Festival: Eid, Memorial Day"] },
        { title: "🌍 Q3 · JUL–SEP", items: ["Back-to-school season", "Industry award campaigns", "Customer story features", "Behind-the-scenes content", "Festival: Onam, Ganesh Chaturthi"] },
        { title: "🎉 Q4 · OCT–DEC", items: ["Diwali campaigns", "Black Friday / Cyber Monday", "Christmas & New Year", "Year-end reviews", "Festival: Thanksgiving, Hanukkah"] },
        { title: "📱 PLATFORM MIX", items: ["Instagram posts & reels", "LinkedIn thought leadership", "Facebook community content", "Twitter daily engagement", "TikTok trend adaptation"] },
        { title: "🎨 CONTENT TYPES", items: ["Educational carousels", "Behind-the-scenes reels", "Customer testimonials", "Product launches", "Festival creatives"] },
    ];

    const features = [
        { icon: "🗓️", title: "12-Month Roadmap", desc: "Month-by-month content themes, post types, and strategic focus areas. No gaps. No guesswork." },
        { icon: "🎉", title: "Festival & Events", desc: "Diwali, Christmas, Ramadan, Thanksgiving — planned 6 months in advance. Never miss a cultural moment." },
        { icon: "🏭", title: "Industry-Specific", desc: "Real estate, retail, health, food — tailored content buckets for your sector." },
        { icon: "🎬", title: "Reels + Posters", desc: "Video concepts and visual content planned weekly. Ready to produce or automate." },
        { icon: "🤖", title: "AI-Ready Structure", desc: "Formatted to work seamlessly with ShoutlyAI's automation engine. Plug and play." },
        { icon: "📊", title: "Content Buckets", desc: "Educational, promotional, cultural, community — balanced mix for algorithm love." },
    ];

    const whos = [
        { icon: "🚀", title: "Small Businesses", desc: "Stop guessing. Start growing with a real strategy." },
        { icon: "🏢", title: "Agencies", desc: "Plan content for 10+ clients. Scale your delivery." },
        { icon: "👤", title: "Founders", desc: "Build your personal brand with daily, strategic content." },
        { icon: "📈", title: "Marketing Teams", desc: "Align your entire team around a 12-month roadmap." },
    ];

    return (
        <>
            <Head>
                <title>ShoutlyAI — Free Editorial Calendar: 365-Day Social Strategy</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <main className="bg-[#faf9f6] font-inter text-gray-900">
                <div className="max-w-7xl mx-auto px-6 py-12">

                    {/* HEADER */}
                    <span className="inline-block bg-gray-100 text-orange-500 font-bold px-6 py-2 rounded-full uppercase mb-6">📅 FREE RESOURCE — STRATEGIC BLUEPRINT</span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase mb-6 leading-tight">
                        YOUR 365-DAY <br />
                        <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradientShift">
                            SOCIAL STRATEGY
                        </span><br />
                        BLUEPRINT.
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-16">
                        Stop posting randomly. Start thinking like a brand that scales. This is the exact editorial framework used by brands that automate 365 days of content.
                    </p>

                    {/* THE PROBLEM */}
                    <section className="mb-20">
                        <span className="inline-block bg-gray-100 text-orange-500 font-bold px-6 py-2 rounded-full uppercase mb-6">⚠️ THE PROBLEM</span>
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10">
                            MOST BRANDS POST <br />
                            <span className="bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 bg-clip-text text-transparent animate-gradientFlow">RANDOMLY.</span>
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {problems.map((p, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 text-center transition transform hover:-translate-y-1 hover:border-orange-500">
                                    <div className="text-4xl mb-4">{p.icon}</div>
                                    <h3 className="text-orange-500 font-bold mb-2">{p.title}</h3>
                                    <p className="text-gray-500 text-sm">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* PREVIEW SECTION */}
                    <section className="bg-white rounded-3xl p-8 border border-gray-200 mb-20">
                        <span className="inline-block bg-gray-100 text-orange-500 font-bold px-6 py-2 rounded-full uppercase mb-6">👀 SNEAK PEEK</span>
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10">WHAT'S INSIDE THE <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradientShift">CALENDAR.</span></h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {previews.map((p, i) => (
                                <div key={i} className="bg-[#faf9f6] rounded-2xl p-4 border border-gray-200">
                                    <h4 className="text-orange-500 font-semibold mb-3">{p.title}</h4>
                                    <ul className="text-gray-500 text-sm space-y-1 list-none pl-4">
                                        {p.items.map((item, idx) => (
                                            <li key={idx} className="relative pl-4 before:absolute before:left-0 before:content-['•'] before:text-orange-500">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* WHAT YOU GET */}
                    <section className="mb-20">
                        <span className="inline-block bg-gray-100 text-orange-500 font-bold px-6 py-2 rounded-full uppercase mb-6">📦 WHAT YOU GET</span>
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10">
                            A COMPLETE <br />
                            <span className="bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 bg-clip-text text-transparent animate-gradientFlow">STRATEGY FRAMEWORK.</span>
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((f, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 border border-gray-200 relative overflow-hidden hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg transition">
                                    <div className="absolute top-4 right-4 text-2xl opacity-10">📅</div>
                                    <div className="text-3xl mb-4">{f.icon}</div>
                                    <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                                    <p className="text-gray-500 text-sm">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* WHO IT'S FOR */}
                    <section className="mb-20">
                        <span className="inline-block bg-gray-100 text-orange-500 font-bold px-6 py-2 rounded-full uppercase mb-6">🎯 WHO IT'S FOR</span>
                        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10">
                            BUILT FOR <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradientShift">SERIOUS BRANDS.</span>
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {whos.map((w, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:border-orange-500 transition">
                                    <div className="text-3xl mb-4">{w.icon}</div>
                                    <h3 className="font-bold mb-2">{w.title}</h3>
                                    <p className="text-gray-500 text-sm">{w.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* WHY IT'S FREE */}
                    <section className="bg-gradient-to-tr from-white to-orange-50 rounded-3xl p-12 border border-gray-200 text-center mb-20">
                        <h3 className="text-3xl font-bold mb-6">
                            WHY ARE WE <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradientShift">GIVING THIS AWAY?</span>
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Because random posting doesn't work. We want brands to experience what structured, strategic content feels like. This calendar is a preview of the intelligence built into ShoutlyAI — the same framework that powers 365 days of automated content for brands worldwide.
                        </p>
                    </section>

                    {/* CTA SECTION */}
                    <section className="bg-gradient-to-tr from-gray-900 to-gray-800 text-white rounded-3xl p-12 text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">GET THE <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradientShift">BLUEPRINT.</span></h2>
                        <p className="text-gray-300 max-w-xl mx-auto mb-8 text-lg">Download the 365-Day Editorial Calendar. Start planning like a brand that scales.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
                            <input type="email" placeholder="Your work email" className="flex-1 min-w-[250px] px-6 py-3 rounded-full text-gray-900" />
                            <button className="bg-orange-500 hover:bg-orange-400 px-8 py-3 rounded-full font-bold transition transform hover:scale-105">📥 DOWNLOAD NOW</button>
                        </div>
                        <p className="text-gray-400 text-sm mt-4">Instant access · No spam · Unsubscribe anytime</p>
                    </section>

                    {/* UPGRADE TEASE */}
                    <section className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col lg:flex-row justify-between items-center gap-6 mb-20">
                        <div>
                            <h3 className="text-xl font-bold mb-2">⚡ READY TO AUTOMATE?</h3>
                            <p className="text-gray-600 max-w-md">ShoutlyAI doesn't just give you a calendar. It generates all 365 days of posts, reels, and festival creatives from one prompt. Auto-branded. Auto-scheduled. Zero daily login.</p>
                        </div>
                        <a href="#" className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-500 transition transform hover:scale-105">🚀 SEE HOW IT WORKS →</a>
                    </section>

                    {/* SOCIAL PROOF */}
                    <div className="flex flex-wrap justify-center gap-6 text-gray-500 mb-20 text-sm">
                        <span>⚡ Used by 100+ brands</span>
                        <span>📸 3,000+ posts generated</span>
                        <span>🌍 15+ industries</span>
                        <span>📅 365 days planned</span>
                    </div>

                    {/* FOOTER */}
                    <footer className="text-center text-gray-400 text-sm mb-6">
                        ShoutlyAI · AI Social Media Autopilot · Bangalore · New York · Singapore · Dubai<br />
                        © 2026 ShoutlyAI. All rights reserved.
                    </footer>
                </div>
            </main>
        </>
    );
}