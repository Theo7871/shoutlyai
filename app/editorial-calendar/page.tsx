"use client";
export default function EditorialCalendarPage() {
    const problems = [
        {
            icon: "🎲",
            title: "Random Posting",
            desc: "Post when you remember. Go silent when you're busy. No consistency, no growth.",
        },
        {
            icon: "📉",
            title: "Inconsistent Content",
            desc: "3 posts one week, 0 the next. Algorithms hate inconsistency. So do customers.",
        },
        {
            icon: "🎭",
            title: "No Festival Planning",
            desc: "Diwali, Christmas, Ramadan — you scramble last minute or miss them entirely.",
        },
        {
            icon: "⚙️",
            title: "No Automation",
            desc: "You're doing manually what should be automated. Wasting hours every week.",
        },
    ];

    const preview = [
        {
            title: "📌 Q1 · JAN–MAR",
            items: [
                "New Year strategy posts",
                "Valentine's Day campaigns",
                "Industry trend forecasts",
                "Weekly educational content",
                "Festival: Makar Sankranti",
            ],
        },
        {
            title: "🎯 Q2 · APR–JUN",
            items: [
                "Spring/Summer campaigns",
                "Mother's Day / Father's Day",
                "Mid-year reviews",
                "Product/service spotlights",
                "Festival: Eid, Memorial Day",
            ],
        },
        {
            title: "🌍 Q3 · JUL–SEP",
            items: [
                "Back-to-school season",
                "Industry award campaigns",
                "Customer story features",
                "Behind-the-scenes content",
                "Festival: Onam, Ganesh Chaturthi",
            ],
        },
        {
            title: "🎉 Q4 · OCT–DEC",
            items: [
                "Diwali campaigns",
                "Black Friday / Cyber Monday",
                "Christmas & New Year",
                "Year-end reviews",
                "Festival: Thanksgiving, Hanukkah",
            ],
        },
        {
            title: "📱 PLATFORM MIX",
            items: [
                "Instagram posts & reels",
                "LinkedIn thought leadership",
                "Facebook community content",
                "Twitter daily engagement",
                "TikTok trend adaptation",
            ],
        },
        {
            title: "🎨 CONTENT TYPES",
            items: [
                "Educational carousels",
                "Behind-the-scenes reels",
                "Customer testimonials",
                "Product launches",
                "Festival creatives",
            ],
        },
    ];

    const features = [
        {
            icon: "🗓️",
            title: "12-Month Roadmap",
            desc: "Month-by-month content themes and strategic focus areas.",
        },
        {
            icon: "🎉",
            title: "Festival & Events",
            desc: "Plan cultural moments months in advance.",
        },
        {
            icon: "🏭",
            title: "Industry-Specific",
            desc: "Tailored content buckets for your sector.",
        },
        {
            icon: "🎬",
            title: "Reels + Posters",
            desc: "Weekly video and visual content ideas.",
        },
        {
            icon: "🤖",
            title: "AI-Ready Structure",
            desc: "Works perfectly with ShoutlyAI automation.",
        },
        {
            icon: "📊",
            title: "Content Buckets",
            desc: "Educational, promotional, cultural, community mix.",
        },
    ];

    const audience = [
        {
            icon: "🚀",
            title: "Small Businesses",
            desc: "Stop guessing. Start growing with strategy.",
        },
        {
            icon: "🏢",
            title: "Agencies",
            desc: "Scale content for multiple clients.",
        },
        {
            icon: "👤",
            title: "Founders",
            desc: "Build a strong personal brand.",
        },
        {
            icon: "📈",
            title: "Marketing Teams",
            desc: "Align your team around one roadmap.",
        },
    ];

    return (
        <main className="max-w-6xl mx-auto px-6 py-16">

            {/* HEADER */}
            <span className="inline-block bg-gray-100 text-orange-500 font-bold px-5 py-2 rounded-full border mb-6">
                📅 FREE RESOURCE — STRATEGIC BLUEPRINT
            </span>

            <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight">
                Your 365-Day
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Social Strategy
                </span>
                <br />
                Blueprint
            </h1>

            <p className="text-gray-600 text-xl mt-6 max-w-3xl">
                Stop posting randomly. Start thinking like a brand that scales.
                This is the exact editorial framework used by brands that automate
                365 days of content.
            </p>

            {/* PROBLEM */}
            <section className="mt-20">
                <span className="text-orange-500 font-bold">⚠️ THE PROBLEM</span>
                <h2 className="text-4xl font-bold mt-2">
                    Most Brands Post{" "}
                    <span className="text-orange-500">Randomly</span>
                </h2>

                <div className="grid md:grid-cols-4 gap-6 mt-10">
                    {problems.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-3xl p-6 text-center hover:border-orange-500 transition"
                        >
                            <div className="text-3xl mb-3">{item.icon}</div>
                            <div className="font-bold text-orange-500">{item.title}</div>
                            <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PREVIEW */}
            <section className="bg-white border rounded-3xl p-10 mt-20">
                <h2 className="text-4xl font-bold">
                    What's Inside the{" "}
                    <span className="text-orange-500">Calendar</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    {preview.map((month, i) => (
                        <div key={i} className="bg-gray-50 border rounded-2xl p-6">
                            <h4 className="font-bold text-orange-500 mb-3">
                                {month.title}
                            </h4>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                {month.items.map((item, j) => (
                                    <li key={j}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className="mt-20">
                <h2 className="text-4xl font-bold">
                    A Complete{" "}
                    <span className="text-orange-500">Strategy Framework</span>
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-3xl p-8 hover:border-orange-500 transition"
                        >
                            <div className="text-3xl mb-4">{f.icon}</div>
                            <h3 className="font-bold text-lg">{f.title}</h3>
                            <p className="text-gray-500 mt-2">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHO IT'S FOR */}
            <section className="mt-20">
                <h2 className="text-4xl font-bold">
                    Built for{" "}
                    <span className="text-orange-500">Serious Brands</span>
                </h2>

                <div className="grid md:grid-cols-4 gap-6 mt-10">
                    {audience.map((a, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-3xl p-6 text-center hover:bg-orange-50 transition"
                        >
                            <div className="text-2xl mb-3">{a.icon}</div>
                            <h3 className="font-bold">{a.title}</h3>
                            <p className="text-gray-500 text-sm mt-2">{a.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHY FREE */}
            <section className="bg-gradient-to-br from-white to-orange-50 border rounded-[40px] p-12 mt-20 text-center">
                <h3 className="text-3xl font-bold">
                    Why Are We{" "}
                    <span className="text-orange-500">Giving This Away?</span>
                </h3>
                <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                    Because random posting doesn't work. This calendar is a preview
                    of the intelligence built into ShoutlyAI — the same framework
                    that powers 365 days of automated content.
                </p>
            </section>

            {/* CTA */}
            <section className="bg-gray-900 text-white rounded-[50px] p-14 text-center mt-20">
                <h2 className="text-4xl font-bold">
                    Get the <span className="text-orange-400">Blueprint</span>
                </h2>

                <p className="text-gray-300 mt-4">
                    Download the 365-Day Editorial Calendar.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                    <input
                        type="email"
                        placeholder="Your work email"
                        className="px-6 py-4 rounded-full text-black w-full md:w-96"
                    />
                    <button className="bg-orange-500 hover:bg-orange-400 px-8 py-4 rounded-full font-semibold">
                        📥 Download Now
                    </button>
                </div>

                <p className="text-gray-400 text-sm mt-4">
                    Instant access · No spam · Unsubscribe anytime
                </p>
            </section>

            {/* FOOTER */}
            <footer className="text-center text-gray-400 mt-16 text-sm">
                © 2026 ShoutlyAI · AI Social Media Autopilot
            </footer>
        </main>
    );
}