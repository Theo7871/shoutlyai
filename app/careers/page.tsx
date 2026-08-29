"use client";
import Head from "next/head";
export default function CareersPage() {
    const traits = [
        {
            icon: "⚡",
            title: "High-Performance Mindset",
            desc: "You don't wait for permission. You see problems and fix them. You move faster than most.",
        },
        {
            icon: "🏗️",
            title: "Builders, Not Employees",
            desc: "You think like a founder. You own outcomes. Titles matter less than impact.",
        },
        {
            icon: "🚀",
            title: "Comfortable with Speed",
            desc: "We ship daily. We iterate fast. Perfectionism is the enemy of done.",
        },
        {
            icon: "🎯",
            title: "Ownership Mentality",
            desc: "Your name is on the work. You don't make excuses. You make progress.",
        },
    ];

    const stats = [
        { number: "2026", label: "Founded" },
        { number: "🌍 3", label: "Global Hubs" },
        { number: "100+", label: "Early Customers" },
        { number: "3,000+", label: "Posts Generated" },
    ];

    const values = [
        {
            icon: "⚡",
            title: "Performance > Politics",
            desc: "Best idea wins. Title doesn't matter.",
        },
        {
            icon: "🚀",
            title: "Speed > Perfection",
            desc: "Done > perfect. Iterate fast.",
        },
        {
            icon: "🎯",
            title: "Ownership > Excuses",
            desc: "Your name is on it. Own it.",
        },
        {
            icon: "💡",
            title: "Innovation > Imitation",
            desc: "We build what hasn't been built.",
        },
    ];

    const whyJoin = [
        {
            icon: "🏗️",
            title: "Category-Defining",
            desc: "We're creating the AI marketing category.",
        },
        {
            icon: "🌍",
            title: "Global Exposure",
            desc: "Work across Bangalore, New York, Singapore.",
        },
        {
            icon: "⚡",
            title: "Fast Growth",
            desc: "Your impact scales with the company.",
        },
        {
            icon: "🎯",
            title: "Real Impact",
            desc: "Your work ships and matters.",
        },
    ];

    const roles = [
        {
            title: "Business Development Specialist",
            badge: "🤝 Signups · Partnerships · Growth",
            sections: {
                own: [
                    "Drive customer signups through partnerships",
                    "Build relationships with agencies and resellers",
                    "Own partnership lifecycle from pitch to launch",
                    "Identify scalable acquisition channels",
                ],
                success: [
                    "50+ strategic partnerships in year one",
                    "30% of signups via partner channel",
                    "Agencies actively reselling ShoutlyAI",
                ],
                mindset: [
                    "You're a hunter",
                    "You build long-term relationships",
                    "You think in scalable systems",
                ],
            },
            preferred: "SaaS partnerships experience",
        },
        {
            title: "Social Media Growth Expert",
            badge: "📈 Performance Marketing",
            sections: {
                own: [
                    "Scale acquisition across organic + paid",
                    "Build growth loops",
                    "Turn users into evangelists",
                    "Own CAC and LTV strategy",
                ],
                success: [
                    "10x user growth",
                    "Predictable acquisition channels",
                    "Community growth",
                ],
                mindset: [
                    "Systems thinker",
                    "Data-driven but creative",
                    "Comfortable experimenting",
                ],
            },
            preferred: "B2B SaaS growth",
        },
        {
            title: "Content Writer",
            badge: "✍️ AI-Native Storyteller",
            sections: {
                own: [
                    "Train AI brand voice",
                    "Create powerful prompts",
                    "Write for humans + algorithms",
                    "Build content frameworks",
                ],
                success: [
                    "Templates that convert",
                    "Human-like AI content",
                    "Multi-industry adoption",
                ],
                mindset: [
                    "Obsessed with language",
                    "System thinker",
                    "Excited about AI",
                ],
            },
            preferred: "AI writing tools experience",
        },
        {
            title: "Backend Developer",
            badge: "💻 Scalable Systems",
            sections: {
                own: [
                    "Build AI generation systems",
                    "Develop APIs",
                    "Optimize speed + reliability",
                    "Integrate social platforms",
                ],
                success: [
                    "99.9% uptime",
                    "Fast response times",
                    "Scalable infrastructure",
                ],
                mindset: [
                    "Thinks about scale early",
                    "Builds reliable systems",
                    "Owns production issues",
                ],
            },
            preferred: "Node.js · Python · AWS",
        },
        {
            title: "AI Research Analyst",
            badge: "🧠 Prompt Engineering",
            sections: {
                own: [
                    "Optimize prompts",
                    "Improve brand voice",
                    "Build automation logic",
                    "Track LLM advancements",
                ],
                success: [
                    "90% brand voice accuracy",
                    "Reduced generation costs",
                    "Continuous improvement",
                ],
                mindset: [
                    "Curious about AI",
                    "Experimental mindset",
                    "Data-driven thinking",
                ],
            },
            preferred: "LLMs · Python",
        },
        {
            title: "Graphic Designer",
            badge: "🎨 Brand Design",
            sections: {
                own: [
                    "Design scalable templates",
                    "Create reels frameworks",
                    "Maintain brand quality",
                    "Ensure premium outputs",
                ],
                success: [
                    "Reusable templates",
                    "Global-ready designs",
                    "Consistent branding",
                ],
                mindset: [
                    "System designer",
                    "Creative thinker",
                    "Brand-focused",
                ],
            },
            preferred: "Motion graphics experience",
        },
    ];

    return (
        <main className="bg-[#faf9f6] text-black">
            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* HEADER */}
                <span className="bg-gray-100 border px-6 py-2 rounded-full text-orange-500 font-bold text-sm">
                    🚀 NOW HIRING — BUILD THE FUTURE
                </span>

                <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase leading-tight">
                    WE'RE NOT HIRING <br />
                    <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-transparent bg-clip-text">
                        EMPLOYEES.
                    </span>{" "}
                    <br />
                    WE'RE BUILDING A FOUNDING TEAM.
                </h1>

                <p className="text-xl text-gray-600 mt-6 max-w-3xl">
                    ShoutlyAI is architecting the future of AI marketing. One prompt.
                    365 days. Zero agencies.
                </p>

                {/* STATS */}
                <div className="flex flex-wrap justify-center gap-10 mt-14 bg-white border rounded-full p-8">
                    {stats.map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl font-bold text-orange-500">
                                {s.number}
                            </div>
                            <div className="text-gray-500 uppercase text-sm">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* WHO WE NEED */}
                <section className="mt-24">
                    <h2 className="text-4xl font-bold">
                        BUILDERS, NOT{" "}
                        <span className="text-orange-500">JOB-SEEKERS.</span>
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 mt-10">
                        {traits.map((t, i) => (
                            <div
                                key={i}
                                className="bg-white border rounded-3xl p-6 text-center hover:border-orange-500 transition"
                            >
                                <div className="text-3xl">{t.icon}</div>
                                <h3 className="font-bold mt-3">{t.title}</h3>
                                <p className="text-gray-500 text-sm mt-2">
                                    {t.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ROLES */}
                <section className="mt-24">
                    <h2 className="text-4xl font-bold">
                        JOIN THE <span className="text-orange-500">FOUNDING TEAM</span>
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-8 mt-12">
                        {roles.map((role, i) => (
                            <div
                                key={i}
                                className="bg-white border rounded-3xl p-8 hover:shadow-xl hover:border-orange-500 transition"
                            >
                                <h3 className="text-2xl font-bold text-orange-500">
                                    {role.title}
                                </h3>

                                <span className="text-sm bg-orange-50 text-orange-500 px-3 py-1 rounded-full">
                                    {role.badge}
                                </span>

                                <div className="mt-6 space-y-4">
                                    <RoleList title="WHAT YOU'LL OWN" items={role.sections.own} />
                                    <RoleList
                                        title="SUCCESS LOOKS LIKE"
                                        items={role.sections.success}
                                    />
                                    <RoleList
                                        title="MINDSET"
                                        items={role.sections.mindset}
                                    />
                                </div>

                                <p className="text-sm text-orange-500 mt-4">
                                    ⚡ Preferred: {role.preferred}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VALUES */}
                <section className="mt-24">
                    <h2 className="text-4xl font-bold">
                        CULTURE & <span className="text-orange-500">VALUES</span>
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 mt-10">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className="bg-white border rounded-3xl p-6 text-center hover:bg-orange-50 transition"
                            >
                                <div className="text-3xl">{v.icon}</div>
                                <h3 className="font-bold mt-2">{v.title}</h3>
                                <p className="text-gray-500 text-sm">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* WHY JOIN */}
                <section className="mt-24">
                    <h2 className="text-4xl font-bold">
                        WHY <span className="text-orange-500">SHOUTLYAI</span>
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 mt-10">
                        {whyJoin.map((w, i) => (
                            <div key={i} className="text-center p-6">
                                <div className="text-4xl">{w.icon}</div>
                                <h3 className="font-bold mt-3">{w.title}</h3>
                                <p className="text-gray-500 text-sm">{w.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[40px] p-14 text-center">
                    <h2 className="text-4xl font-bold">
                        READY TO BUILD?
                    </h2>

                    <p className="text-gray-300 mt-4">
                        Send us why you're the one. No boring cover letters.
                    </p>

                    <a
                        href="mailto:careers@shoutlyai.com"
                        className="inline-block mt-8 bg-orange-500 hover:bg-orange-400 px-10 py-4 rounded-full text-lg font-semibold"
                    >
                        📧 careers@shoutlyai.com
                    </a>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <span className="bg-gray-700 px-4 py-2 rounded-full text-sm">
                            No resumes required
                        </span>
                        <span className="bg-gray-700 px-4 py-2 rounded-full text-sm">
                            Tell us what you'll own
                        </span>
                        <span className="bg-gray-700 px-4 py-2 rounded-full text-sm">
                            Show, don't tell
                        </span>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="text-center text-gray-400 mt-16 text-sm">
                    ShoutlyAI · Bangalore · New York · Singapore <br />
                    © 2026 ShoutlyAI
                </footer>
            </div>
        </main>
    );
}

function RoleList({ title, items }: any) {
    return (
        <div>
            <h4 className="text-xs font-bold text-gray-500 mb-1">
                {title}
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
                {items.map((item: string, i: number) => (
                    <li key={i}>▹ {item}</li>
                ))}
            </ul>
        </div>
    );
}