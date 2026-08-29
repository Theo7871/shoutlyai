import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Google Business Profile Post Generator & Scheduler — AI-Powered | Shoutly AI",
  description:
    "Generate Google Business Profile updates, offers, event posts and product highlights with AI. Auto-schedule and publish with Shoutly AI.",
};

const stats = [
  { value: "Free", label: "To create and maintain a Business Profile" },
  { value: "10", label: "Networks supported in one workflow" },
  { value: "365", label: "Days of Business Profile content from one brief" },
  { value: "15+ hrs", label: "Saved each week on writing and planning" },
];

const pills = [
  "Business updates",
  "Offers & promotions",
  "Event posts",
  "Product highlights",
  "Review replies",
  "Q&A responses",
];

const features = [
  "What's New update posts for your Business Profile",
  "Offer posts for promotions and limited-time deals",
  "Event posts with dates and details",
  "Product and service highlight copy",
  "Review reply drafts alongside your posting queue",
  "Scheduling and analytics-informed iteration",
];

const outputs = [
  "What's New updates",
  "Offers & promotions",
  "Event posts",
  "Product highlights",
  "Service highlights",
  "Review replies",
  "Q&A responses",
  "Seasonal & festival posts",
  "New-location announcements",
  "Photo captions",
];

const sections = [
  {
    title: "Write less, ship more",
    body: "Shoutly AI compresses ideation and post writing into a single workflow, so your Business Profile stays active without writing every update, offer, or event post from scratch.",
  },
  {
    title: "Built for local search & Maps",
    body: "Business Profile posts appear alongside your listing in Google Search and Maps, where customers are often deciding whether to call, visit, or order right now.",
  },
  {
    title: "Posts, offers & products in one queue",
    body: "Turn one topic into a What's New update, an Offer post, an Event post, or a Product highlight — the formats Google Business Profile actually supports.",
  },
  {
    title: "Reviews handled alongside your content",
    body: "Replying to reviews is part of keeping a profile active. Shoutly AI drafts review replies in the same workflow as your posts, so it doesn't fall through the cracks.",
  },
];

const faqs = [
  {
    q: "Can Shoutly AI write Google Business Profile posts?",
    a: "Yes. It can generate update posts, offer posts, event posts, and product highlight copy for your Business Profile.",
  },
  {
    q: "Can it auto-publish to Google Business Profile?",
    a: "Yes. Shoutly AI supports posting, scheduling, analytics, media, and comments for Google Business Profile, so you can prepare content and publish it on a schedule.",
  },
  {
    q: "Can Shoutly AI help with review replies?",
    a: "Yes. Comments support on Google Business Profile includes monitoring and replying to customer reviews from the same workflow as your posts.",
  },
  {
    q: "Does Google Business Profile support offers, events, and products?",
    a: "Yes. Google Business Profile supports several post types, including What's New updates, Offers, Events, and Products, in addition to standard business information.",
  },
  {
    q: "Can I generate a year of Google Business Profile content with one prompt?",
    a: "Yes. Shoutly AI is built to take a niche, voice, and offer brief and expand it into long-range publishing direction for your Business Profile.",
  },
];

export default function GoogleBusinessChannelPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* Hero */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-100 via-white to-orange-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold uppercase tracking-wide px-4 py-1.5 mb-6">
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
              <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
              <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
              <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
              <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
            </svg>
            By Channel
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Google Business Profile Post Generator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
            Generate updates, offers, event posts, and product highlights with AI. Shoutly AI
            helps businesses keep their Google Business Profile active without writing every
            post manually.
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

      {/* Why Google Business Profile needs a different workflow */}
      <section className="py-18 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-4">
            Why Google Business Profile needs a different workflow
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center max-w-3xl mx-auto mb-12">
            It&apos;s a local search and Maps listing, not a feed — and reviews are part of the job.
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
            One workflow for writing, replying, and scheduling Google Business Profile content.
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

      {/* Turn one topic into a full post */}
      <section className="py-18 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-4">
            Turn one topic into a full post
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center max-w-3xl mx-auto mb-12">
            Draft a topic once and expand it into a headline, supporting details, and a clear
            call to action that fits how Google Business Profile posts work.
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Start with a clear headline for the update, offer, or event.",
              "Expand into supporting details a customer needs before acting.",
              "Close with a call, visit, order, or book action button.",
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
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">What you can publish on Google Business Profile</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-10">
            {outputs.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 px-4 py-4 text-sm font-medium text-center bg-white">
                {item}
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-center max-w-2xl mx-auto leading-relaxed">
            Shoutly AI turns a single content brief into weeks of ready-to-post Business Profile
            updates, offers, and event posts, so your listing stays active without writing every
            post from scratch.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-18 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-4">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">
            Frequently asked questions about Google Business Profile publishing with AI
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
          Keep your Google Business Profile active in one sitting
        </h2>
        <p className="text-slate-600 text-lg max-w-xl mx-auto mb-8">
          Generate updates, offers, and event posts in minutes, then queue them for consistent
          publishing — all from Shoutly AI.
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
