import PricingSection from "@/components/PricingSection";
import { PricingFAQ } from "@/components/FAQ";

export default function PricingPage() {
  return (
    <main>
      <PricingSection />

      {/* Pricing Page Specific FAQ */}
      <section className="bg-[#F8F9FD] pb-20">
        <PricingFAQ />
      </section>

      {/* CTA Final */}
      <section className="bg-white py-20 px-6 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            READY TO AUTOMATE YOUR SOCIAL MEDIA?
          </h2>
          <p className="text-lg text-slate-600 mb-4 max-w-2xl mx-auto">
            Start your 14-day free trial of Shoutly AI and experience AI-powered content creation, scheduling, publishing, and analytics. All from one platform.
          </p>
          <p className="text-lg text-slate-600 mb-4 max-w-2xl mx-auto">
            No credit card required. No long-term commitment.
          </p>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Create your content strategy, generate posts and creatives, schedule across 10+ social media platforms, and simplify your day-to-day social media management with Shoutly AI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/sign-up"
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              START YOUR 14-DAY FREE TRIAL
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            No credit card required.
          </p>
        </div>
      </section>
    </main>
  );
}
