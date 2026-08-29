import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YouTube Content Generator & Scheduler — AI-Powered | Shoutly AI",
  description:
    "Generate YouTube video scripts, Shorts scripts, titles, descriptions and tags with AI. Auto-schedule and publish with Shoutly AI.",
};

const stats = [
  { value: "3 min", label: "Max length for a YouTube Short" },
  { value: "10", label: "Networks supported in one workflow" },
  { value: "365", label: "Days of YouTube content from one brief" },
  { value: "15+ hrs", label: "Saved each week on writing and planning" },
];

const pills = [
  "Long-form video scripts",
  "Shorts scripts",
  "Titles & SEO descriptions",
  "Tags & keywords",
  "Thumbnail concepts",
  "Community posts",
];

const features = [
  "Long-form video scripts with a hook, structure, and closing CTA",
  "Shorts scripts sized for YouTube's up-to-3-minute format",
  "Search-oriented titles, descriptions, and tags for every video",
  "Thumbnail concept suggestions to pair with each script",
  "Scheduling queues for consistent, planned publishing",
  "Analytics-informed iteration on what's driving views and engagement",
];

const outputs = [
  "Long-form video scripts",
  "Shorts scripts",
  "Tutorial scripts",
  "Product demo scripts",
  "Educational video scripts",
  "Behind-the-scenes content",
  "Explainer video scripts",
  "Promotional video scripts",
  "Titles & descriptions",
  "Community posts",
];

const sections = [
  {
    title: "Write less, ship more",
    body: "Shoutly AI compresses ideation, script structuring, and title/description writing into a single workflow so you can stay active on YouTube without starting every video from a blank page.",
  },
  {
    title: "Built for search & discovery",
    body: "Titles, descriptions, and tags are written with searchable keywords in mind, since YouTube surfaces videos through search and recommendations long after they're published.",
  },
  {
    title: "Long-form and Shorts, covered",
    body: "Turn one topic into both a full-length video script and a Shorts script (up to 3 minutes), so the same idea can serve two different viewing habits.",
  },
  {
    title: "Queue a full month at once",
    body: "Plan tutorials, product demos, and evergreen explainers ahead of time, and keep your channel active without assembling a content plan every week.",
  },
];

const faqs = [
  {
    q: "Can Shoutly AI write YouTube video scripts?",
    a: "Yes. It can generate long-form video scripts and Shorts scripts, including hooks, structure, and closing calls to action.",
  },
  {
    q: "Can Shoutly AI write YouTube titles, descriptions, and tags?",
    a: "Yes. Every video script comes with a title, a search-oriented description, and relevant tags to support discovery.",
  },
  {
    q: "Can it auto-publish to YouTube?",
    a: "Yes. Shoutly AI supports posting, scheduling, analytics, media, and comments for YouTube, so you can prepare content and publish it on a schedule.",
  },
  {
    q: "Does YouTube support Shorts?",
    a: "Yes. YouTube Shorts can run up to 3 minutes long and must be vertical or square in format.",
  },
  {
    q: "Can I generate a year of YouTube content with one prompt?",
    a: "Yes. Shoutly AI is built to take a niche, voice, and offer brief and expand it into long-range publishing direction across long-form videos and Shorts.",
  },
];

export default function YouTubeChannelPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-100 via-white to-orange-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold uppercase tracking-wide px-4 py-1.5 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
              <rect width="24" height="24" rx="6" fill="#FF0000" />
              <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#fff" />
            </svg>
            By Channel
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            YouTube Content Generator & Scheduler
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
            Generate video scripts, Shorts scripts, titles, descriptions, and tags with AI.
            Shoutly AI helps businesses stay consistent on YouTube without spending hours
            writing and structuring every video manually.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/sign-up" className="inline-flex items-center px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors">
              Start free trial
            </Link>
            <Link href="/pricing" className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-300 hover:border-orange-300 text-slate-800 font-semibold transition-colors">
              See plans
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-9 text-center">
              <div className="text-3xl font-black text-orange-600 tracking-tight">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Outputs pill row */}
      <section className="py-10 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2.5">
          {pills.map((item) => (
            <span key={item} className="text-sm font-semibold px-4 py-2 rounded-full border border-slate-200 text-slate-600 bg-white">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Why YouTube needs a different workflow */}
      <section className="py-18 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-4">
            Why YouTube needs a different workflow
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center max-w-3xl mx-auto mb-12">
            Long-form and Shorts serve different goals, and search-driven discovery rewards planning.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 p-6 bg-white">
                <h3 className="text-base font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="bg-slate-50 border-y border-slate-200 py-18 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-4">
            Core capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center max-w-3xl mx-auto mb-12">
            One workflow for writing, structuring, and scheduling YouTube content.
          </h2>
          <div className="max-w-3xl mx-auto grid gap-3.5">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4">
                <span className="flex-none w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-black flex items-center justify-center mt-0.5">✓</span>
                <p className="text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turn one topic into a full video */}
      <section className="py-18 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-4">
            Turn one topic into a full video
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center max-w-3xl mx-auto mb-12">
            Draft a topic once and expand it into a titled, structured script with a search-ready
            description and a scheduling queue that keeps your channel active.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Start with a title and opening hook built to earn the click and the watch.",
              "Expand into a structured script, whether a full-length video or a Shorts cut.",
              "Close with a description, tags, and a clear next step for the viewer.",
            ].map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-orange-600 text-sm font-bold uppercase tracking-wide mb-2">Part {index + 1}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Output library */}
      <section className="bg-slate-50 border-y border-slate-200 py-18 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-4">Output library</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">What you can publish on YouTube</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-10">
            {outputs.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 px-4 py-4 text-sm font-medium text-center bg-white">
                {item}
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-center max-w-2xl mx-auto leading-relaxed">
            Shoutly AI turns a single content brief into weeks of ready-to-film YouTube scripts,
            titles, and descriptions, so you can stay consistent without starting from a blank
            script every time.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-18 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-4">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">
            Frequently asked questions about YouTube publishing with AI
          </h2>
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-slate-200 bg-white px-6 py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-slate-900">
                  {faq.q}
                  <span className="relative flex-none w-5 h-5 text-orange-600">
                    <span className="absolute inset-0 flex items-center justify-center text-xl leading-none group-open:hidden">+</span>
                    <span className="absolute inset-0 hidden items-center justify-center text-xl leading-none group-open:flex">−</span>
                  </span>
                </summary>
                <p className="text-slate-600 leading-relaxed mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-slate-50 border-t border-slate-200 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight max-w-2xl mx-auto mb-4">
          Build your next month of YouTube content in one sitting
        </h2>
        <p className="text-slate-600 text-lg max-w-xl mx-auto mb-8">
          Generate video scripts, Shorts scripts, titles, and descriptions in minutes, then
          queue them for consistent publishing — all from Shoutly AI.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/sign-up" className="inline-flex items-center px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors">
            Try Shoutly AI
          </Link>
          <Link href="/contact-us" className="inline-flex items-center px-6 py-3 rounded-xl border border-slate-300 hover:border-orange-300 text-slate-800 font-semibold transition-colors">
            Talk to our team
          </Link>
        </div>
      </section>
    </main>
  );
}
