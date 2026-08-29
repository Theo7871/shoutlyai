import NextImage from "next/image";

export default function FinalCtaSection() {
    return (
        <section className="py-10 sm:py-16 lg:py-20 bg-white">
            <div className="w-full sm:max-w-[85%] mx-auto px-4 sm:px-6">
                <div
                    className="relative overflow-hidden rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-12 sm:py-16 text-center"
                    style={{ background: "linear-gradient(135deg, #F97316 0%, #C2410C 100%)" }}
                >
                    <span className="mx-auto mb-4 sm:mb-5 w-11 h-11 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                        <NextImage src="/images/logo-icon-white.png" alt="" width={24} height={24} quality={60} unoptimized={false} className="w-6 h-6 object-contain" />
                    </span>

                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4">
                        Your next 365
                        <br />
                        posts start today.
                    </h2>

                    <p className="text-xs sm:text-sm text-white/85 mb-6 sm:mb-8">
                        ₹8,000/mo billed annually · 14-day free trial · cancel anytime
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="/sign-up"
                            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-orange-600 text-xs sm:text-sm font-bold shadow-lg hover:bg-orange-50 transition-colors"
                        >
                            Start free trial
                        </a>
                        <a
                            href="/shoutlyai-demo.html"
                            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/40 text-white text-xs sm:text-sm font-bold hover:bg-white/10 transition-colors"
                        >
                            Book a demo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
