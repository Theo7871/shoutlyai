import type { Metadata } from "next";
import { INDUSTRIES } from "@/data/industries";
import AllIndustriesGrid from "@/components/industries/AllIndustriesGrid";

export const metadata: Metadata = {
    title: "All Industries We Support | Shoutly AI",
    description:
        "Browse every industry and sub-industry Shoutly AI creates AI-powered social media content for — from restaurants to real estate, fitness to festivals.",
    alternates: {
        canonical: "https://shoutlyai.com/industries",
    },
};

export default function IndustriesPage() {
    const totalSubIndustries = INDUSTRIES.reduce((sum, i) => sum + i.visible.length + i.extra.length, 0);

    return (
        <main className="bg-white">
            <section className="py-10 sm:py-16 lg:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-600">Built for business</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
                            Every industry we support
                        </h1>
                        <p className="text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed">
                            {INDUSTRIES.length} categories and {totalSubIndustries}+ sub-industries — from restaurants to real estate, fitness to festivals. Don&apos;t see yours? Request it below.
                        </p>
                    </div>

                    <AllIndustriesGrid />
                </div>
            </section>
        </main>
    );
}
