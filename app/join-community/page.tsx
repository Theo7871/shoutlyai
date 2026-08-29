"use client";
// pages/community.js
import Head from "next/head";

const stats = [
    { number: "500+", label: "Community Members" },
    { number: "15+", label: "Countries" },
    { number: "100+", label: "Brands" },
    { number: "Weekly", label: "Strategy Sessions" },
];

const whyCommunity = [
    { icon: "🤖", title: "AI Growth Frameworks", desc: "Real-world strategies for automating brand presence. Not theory. What actually works." },
    { icon: "⚡", title: "Product Roadmap Access", desc: "Shape what we build next. Community voices drive our development priorities." },
    { icon: "📊", title: "Implementation Insights", desc: "Case studies, playbooks, and tactics from members automating at scale." },
    { icon: "🌍", title: "Global Network", desc: "Connect with growth professionals across 15+ countries. No fluff. Just value." },
];

const whoJoin = [
    { icon: "🚀", title: "Founders", desc: "Scale your brand without scaling headcount." },
    { icon: "📈", title: "Marketers", desc: "Master AI-powered growth strategies." },
    { icon: "🏢", title: "Agencies", desc: "Automate content, increase margins." },
    { icon: "🧠", title: "AI Enthusiasts", desc: "Explore what's possible with marketing AI." },
    { icon: "🎨", title: "Content Creators", desc: "Scale output without creative burnout." },
    { icon: "💻", title: "Tech Operators", desc: "Build on top of AI infrastructure." },
];

const memberBenefits = [
    { icon: "⚡", title: "Early Feature Access", desc: "Be first to use new tools. Shape product direction with direct feedback." },
    { icon: "🎯", title: "Private Strategy Sessions", desc: "Monthly deep dives with founders and growth experts. Live Q&A." },
    { icon: "📢", title: "Community-Only Updates", desc: "Roadmap previews, beta opportunities, and insider news." },
    { icon: "🔮", title: "Roadmap Previews", desc: "See what's coming before anyone else. Influence what we build." },
    { icon: "🧪", title: "Beta Testing Access", desc: "Test new features. Get early wins for your brand." },
    { icon: "🌐", title: "Global Networking", desc: "Connect with growth-focused professionals worldwide." },
];

const communityStandards = [
    { icon: "📈", title: "Growth Mindset", desc: "We're here to level up, not show off." },
    { icon: "🤝", title: "Respect", desc: "Disagree? Fine. Be respectful." },
    { icon: "💎", title: "Value-First", desc: "Give more than you take." },
    { icon: "🚫", title: "No Spam", desc: "Self-promo without value = removed." },
];

export default function Community() {
    return (
        <>
            <Head>
                <title>ShoutlyAI — Community: AI Growth Ecosystem</title>
            </Head>

            <main className="max-w-7xl mx-auto p-6 md:p-12 bg-gray-50 text-gray-900">
                {/* HEADER: Vision */}
                <section className="text-center">
                    <span className="inline-block bg-gray-100 text-orange-500 px-6 py-2 rounded-full font-bold text-sm uppercase mb-6">
                        🌐 GLOBAL COMMUNITY — AI GROWTH ECOSYSTEM
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 uppercase">
                        WHERE AI-DRIVEN <br />
                        <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                            BRANDS ARE BUILT.
                        </span>
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl mb-12">
                        ShoutlyAI isn't just a platform. It's a movement. We're bringing together founders, agencies, creators, and AI builders who believe the future of marketing is automated, intelligent, and unbounded.
                    </p>
                </section>

                {/* Stats Strip */}
                <section className="flex flex-wrap justify-center gap-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
                    {stats.map((item, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-3xl font-extrabold text-orange-500">{item.number}</div>
                            <div className="text-gray-500 uppercase text-sm mt-1">{item.label}</div>
                        </div>
                    ))}
                </section>

                {/* Why Community */}
                <section className="mb-16">
                    <span className="inline-block bg-gray-100 text-orange-500 px-6 py-2 rounded-full font-bold text-sm uppercase mb-6">
                        🎯 WHY THIS COMMUNITY EXISTS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
                        BUILDING THE FUTURE, <br />
                        <span className="bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 bg-clip-text text-transparent animate-gradient-x">
                            TOGETHER.
                        </span>
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {whyCommunity.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl transition-transform transform hover:-translate-y-1">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Who Should Join */}
                <section className="mb-16">
                    <span className="inline-block bg-gray-100 text-orange-500 px-6 py-2 rounded-full font-bold text-sm uppercase mb-6">
                        👥 WHO SHOULD JOIN
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
                        FOUNDERS, AGENCIES, <br />
                        <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                            BUILDERS.
                        </span>
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {whoJoin.map((person, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:scale-105 transition-transform">
                                <div className="text-3xl mb-2">{person.icon}</div>
                                <h3 className="font-bold mb-1">{person.title}</h3>
                                <p className="text-gray-500 text-sm">{person.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Member Benefits */}
                <section className="mb-16">
                    <span className="inline-block bg-gray-100 text-orange-500 px-6 py-2 rounded-full font-bold text-sm uppercase mb-6">
                        ✨ MEMBER BENEFITS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
                        EARLY ACCESS. STRATEGY. <br />
                        <span className="bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 bg-clip-text text-transparent animate-gradient-x">
                            NETWORK.
                        </span>
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {memberBenefits.map((benefit, idx) => (
                            <div key={idx} className="flex gap-4 bg-white p-6 rounded-xl border border-gray-100 hover:bg-orange-50 transition">
                                <div className="text-3xl">{benefit.icon}</div>
                                <div>
                                    <h4 className="font-bold mb-1">{benefit.title}</h4>
                                    <p className="text-gray-500 text-sm">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Community Standards */}
                <section className="mb-16">
                    <span className="inline-block bg-gray-100 text-orange-500 px-6 py-2 rounded-full font-bold text-sm uppercase mb-6">
                        📋 COMMUNITY STANDARDS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
                        HIGH SIGNAL. <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">ZERO NOISE.</span>
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                        {communityStandards.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:shadow-md transition">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <h3 className="font-bold mb-1">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Platform Card */}
                <section className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
                    <div className="max-w-xl">
                        <h3 className="text-2xl font-bold mb-3">📍 WHERE WE CONNECT</h3>
                        <p className="text-gray-500 mb-4">
                            The ShoutlyAI community lives in a private <strong>Discord server</strong> — organized, searchable, and built for high-signal discussions. Text channels, voice rooms, and direct access to the team.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">🌐 24/7 Global</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">📱 Mobile friendly</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">🔒 Private</span>
                        </div>
                    </div>
                    <div className="bg-black text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                        <span className="text-orange-500">⚡</span> 500+ members · 15+ countries
                    </div>
                </section>

                {/* Community Highlights */}
                <section className="grid sm:grid-cols-2 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                        <div className="text-2xl mb-2">🗓️</div>
                        <h3 className="font-bold text-lg mb-2">Weekly Strategy Sessions</h3>
                        <p className="text-gray-500 text-sm">
                            Every Thursday. Live with founders and growth experts. Past sessions: "Scaling to 365 posts," "Agency automation playbooks," "Festival content at scale."
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                        <div className="text-2xl mb-2">🔮</div>
                        <h3 className="font-bold text-lg mb-2">Monthly Roadmap Reviews</h3>
                        <p className="text-gray-500 text-sm">
                            See what we're building. Vote on what's next. Community shapes the product direction.
                        </p>
                    </div>
                </section>

                {/* Testimonial */}
                <section className="bg-orange-50 p-8 rounded-3xl border-l-8 border-orange-500 mb-16">
                    <p className="text-gray-900 text-lg mb-4 font-medium">
                        "The ShoutlyAI community is the only place where I get real AI marketing strategies — not theory, not hype. Just what works."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">AK</div>
                        <div>
                            <div className="font-bold">Arjun Kapoor</div>
                            <div className="text-gray-500 text-sm">Founder, GrowthStack · Community member since 2026</div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-3xl text-center text-white mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                        JOIN THE <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">MOVEMENT.</span>
                    </h2>
                    <p className="text-gray-300 max-w-xl mx-auto mb-6 text-lg">
                        This is where AI-driven brands are built. Founders, agencies, creators — if you're serious about the future of marketing, you belong here.
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-400 px-8 py-3 rounded-full font-bold transition-transform transform hover:scale-105">
                        🔮 APPLY TO JOIN THE COMMUNITY →
                    </button>
                    <p className="text-gray-400 mt-4 text-sm">
                        Applications reviewed within 48 hours. Curated access. No spam. Just signal.
                    </p>
                </section>

                {/* Footer */}
                <footer className="text-center text-gray-400 text-sm mb-8">
                    ShoutlyAI · AI Social Media Autopilot · Bangalore · New York · Singapore · Dubai<br />
                    © 2026 ShoutlyAI. All rights reserved. Community hosted on Discord.
                </footer>
            </main>
        </>
    );
}