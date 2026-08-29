import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TikTok Post Generator & Scheduler — AI-Powered | Shoutly AI",
  description:
    "Generate TikTok video scripts, hooks, captions and hashtags with AI. Auto-schedule and publish daily with Shoutly AI.",
};

const stats = [
  { value: "3 sec", label: "Hook window to stop the scroll" },
  { value: "10", label: "Networks supported in one workflow" },
  { value: "365", label: "Days of TikTok content from one brief" },
  { value: "15+ hrs", label: "Saved each week on scripting and planning" },
];

const features = [
  "Scroll-stopping hook lines for the first 3 seconds",
  "Short-form video scripts with on-screen text cues",
  "Trending sound and format pairing suggestions",
  "Caption and hashtag sets tuned for discovery",
  "Weekly scheduling queues for consistent publishing",
  "Performance-informed iteration across themes and tones",
];

const outputs = [
  "Hook-first video scripts",
  "Trend and sound-based content",
  "Quick educational tips",
  "Behind-the-scenes clips",
  "Creator commentary",
  "Duet and stitch-ready reactions",
  "Product demo and launch videos",
  "Storytime and relatable content",
  "Offer-led CTAs",
  "Repurposed blog and long-form snippets",
];

const sections = [
  {
    title: "Write less, ship more",
    body: "Shoutly AI compresses ideation, hook writing, and script structuring into a single workflow so you can stay active on TikTok without scripting every video from scratch.",
  },
  {
    title: "Built for short-form attention",
    body: "Hooks, pacing, and on-screen text are tuned for a platform where the first three seconds determine whether people keep watching or scroll past.",
  },
  {
    title: "Script-ready workflows",
    body: "Turn one topic into a full video script with a scroll-stopping hook, supporting beats, and a closing CTA that still sounds like your brand.",
  },
  {
    title: "Queue a full week at once",
    body: "Plan recurring themes, stagger trend-based content, and keep your audience engaged without manually assembling a content plan every day.",
  },
];

const faqs = [
  {
    q: "Can Shoutly AI write TikTok video scripts?",
    a: "Yes. It can generate hook-first script structures, on-screen text cues, and closing CTAs aligned to short-form video pacing.",
  },
  {
    q: "Can it auto-publish to TikTok?",
    a: "Yes. You can prepare captions and video posts and push them into a scheduling workflow for consistent daily publishing.",
  },
  {
    q: "Does it work for brands as well as creators?",
    a: "Yes. It supports brand campaigns, creator commentary, product launches, educational content, and trend-based posts.",
  },
  {
    q: "Can I generate a year of TikTok content with one prompt?",
    a: "Yes. Shoutly AI is built to take a niche, voice, and offer brief and expand it into long-range publishing direction.",
  },
];

export default function TikTokChannelPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-gradient-to-br from-slate-100 via-white to-orange-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-4">
            By Channel
          </p>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                TikTok Post Generator & Scheduler
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
                Generate video scripts, hooks, captions, and daily content queues with AI. Shoutly AI
                helps businesses and creators stay consistent on TikTok without spending hours
                scripting every video manually.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/sign-up" className="inline-flex items-center px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors">
                  Start free trial
                </Link>
                <Link href="/pricing" className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-300 hover:border-orange-300 text-slate-800 font-semibold transition-colors">
                  See plans
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 text-white p-8 shadow-xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-300 mb-3">
                Publishing outputs
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {outputs.slice(0, 6).map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-4">
          Why TikTok needs a different workflow
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10">
          Short-form video rewards hooks, pacing, and consistency.
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-4">
            Core capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
            One workflow for scripting, hook-writing, captioning, and scheduling TikTok content.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-14">
            {features.map((feature) => (
              <div key={feature} className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-medium text-slate-800">{feature}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Turn one topic into a full video script</h2>
            <p className="text-slate-200 max-w-2xl mb-8">
              Draft a topic once and expand it into a hook-first video script, on-screen text cues,
              repurposed commentary, and a weekly queue that keeps your brand active.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                "Start with a scroll-stopping hook that earns the first 3 seconds.",
                "Expand into structured beats that stay watchable and on-brand.",
                "Close with a clear prompt, offer, or next step for the viewer.",
              ].map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                  <div className="text-orange-300 text-sm font-semibold mb-2">Part {index + 1}</div>
                  <p className="text-sm text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-4">Output library</p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">What you can publish on TikTok</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-16">
          {outputs.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 px-4 py-4 text-sm font-medium bg-white">
              {item}
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-orange-50 border border-orange-200 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Built for daily consistency</h2>
          <p className="text-slate-700 max-w-3xl leading-relaxed">
            Shoutly AI turns a single content brief into weeks of ready-to-post TikTok scripts, hooks,
            and captions, so you can stay consistent without staring at a blank editor before every upload.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-4">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10">
            Frequently asked questions about TikTok publishing with AI
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Build your next week of TikTok content in one sitting
          </h2>
          <p className="text-slate-200 text-lg max-w-2xl mb-8">
            Generate scroll-stopping scripts, hooks, and captions in minutes, then queue them for
            consistent publishing — all from Shoutly AI.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/sign-up" className="inline-flex items-center px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors">
              Try Shoutly AI
            </Link>
            <Link href="/contact-us" className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-600 text-white font-semibold">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
