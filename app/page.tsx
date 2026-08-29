import dynamic from "next/dynamic";
import { API_ENDPOINTS } from "@/api/configApi";
import type { Festival } from "@/types/home";
import HeroMosaic from "@/components/home/HeroMosaic";
import HeroCtaButtons from "@/components/home/HeroCtaButtons";
import WhoWeHelpSection from "@/components/home/WhoWeHelpSection";
import PostShowcaseSection from "@/components/home/PostShowcaseSection";
import HowItWorksIntroSection from "@/components/home/HowItWorksIntroSection";
import WebsitePoweredSection from "@/components/home/WebsitePoweredSection";
import ContentCalendarSection from "@/components/home/ContentCalendarSection";
import AiCaptionsSection from "@/components/home/AiCaptionsSection";
import SmartSchedulingSection from "@/components/home/SmartSchedulingSection";
import AnalyticsSection from "@/components/home/AnalyticsSection";
import ConnectionsSection from "@/components/home/ConnectionsSection";
import BrandOverlaySection from "@/components/home/BrandOverlaySection";
import LibraryCollageSection from "@/components/home/LibraryCollageSection";
import FestivalsSection from "@/components/home/FestivalsSection";
import MoreBuiltInSection from "@/components/home/MoreBuiltInSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import UnifiedCommentsSection from "@/components/home/UnifiedCommentsSection";
import BuiltForBusinessSection from "@/components/home/BuiltForBusinessSection";

// Code-split below-the-fold / interaction-only sections so their JS isn't
// part of the initial bundle that has to be parsed before the page is interactive.
const PricingSection = dynamic(() => import("@/components/PricingSection"));
const Testimonials = dynamic(() => import("@/components/SocialProof").then((m) => m.Testimonials));
const HomepageFAQ = dynamic(() => import("@/components/FAQ").then((m) => m.HomepageFAQ));

async function getFestivals(): Promise<Festival[]> {
    try {
        const res = await fetch(API_ENDPOINTS.festivalsRandom, {
            headers: { "Accept": "application/json", "ngrok-skip-browser-warning": "true" },
            next: { revalidate: 86400 },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// Hero mosaic setup - PERFECTLY MATCHED images with correct titles
const INDUSTRY_PHOTOS = [
  // Healthcare & Medical
  { label: "Healthcare", url: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?w=300&h=200&fit=crop" }, // Doctor with patient
  { label: "Dental Clinic", url: "https://images.pexels.com/photos/3845626/pexels-photo-3845626.jpeg?w=300&h=200&fit=crop" }, // Dentist working
  { label: "Pharmacy", url: "https://images.pexels.com/photos/3683042/pexels-photo-3683042.jpeg?w=300&h=200&fit=crop" }, // Pharmacist
  { label: "Veterinary", url: "https://images.pexels.com/photos/6231768/pexels-photo-6231768.jpeg?w=300&h=200&fit=crop" }, // Vet with dog

  // Food & Beverage
  { label: "Restaurant", url: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?w=300&h=200&fit=crop" }, // Pizza
  { label: "Bakery", url: "https://images.pexels.com/photos/5710149/pexels-photo-5710149.jpeg?w=300&h=200&fit=crop" }, // Bread/croissants
  { label: "Coffee Shop", url: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=300&h=200&fit=crop" }, // Coffee cup

  // Real Estate & Construction
  { label: "Real Estate", url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=300&h=200&fit=crop" }, // House key
  { label: "Interior Design", url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=300&h=200&fit=crop" }, // Living room
  { label: "Architecture", url: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?w=300&h=200&fit=crop" }, // Building exterior
  { label: "Construction", url: "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?w=300&h=200&fit=crop" }, // Construction site

  // Fitness & Wellness
  { label: "Fitness Gym", url: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?w=300&h=200&fit=crop" }, // Weights
  { label: "Yoga Studio", url: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?w=300&h=200&fit=crop" }, // Yoga pose
  { label: "Spa", url: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=300&h=200&fit=crop" }, // Massage stones

  // Education
  { label: "Education", url: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?w=300&h=200&fit=crop" }, // Kids in classroom
  { label: "University", url: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=300&h=200&fit=crop" }, // Graduation

  // Retail & E-commerce
  { label: "E-Commerce", url: "https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?w=300&h=200&fit=crop" }, // Online shopping phone
  { label: "Fashion", url: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?w=300&h=200&fit=crop" }, // Clothes rack

  // Finance & Business - FIXED: Now showing actual accounting/finance images
  { label: "Finance", url: "https://images.pexels.com/photos/4386363/pexels-photo-4386363.jpeg?w=300&h=200&fit=crop" }, // Coins/graph
  { label: "Accounting", url: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=300&h=200&fit=crop" }, // Calculator & documents

  // Beauty & Salon
  { label: "Hair Salon", url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?w=300&h=200&fit=crop" }, // Hair cutting
  { label: "Nail Studio", url: "https://plus.unsplash.com/premium_photo-1661290231745-15f1ed6fea88?w=300&h=200&fit=crop" }, // Nail art
  { label: "Barbershop", url: "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg?w=300&h=200&fit=crop" }, // Barber
  { label: "Skincare", url: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=300&h=200&fit=crop" }, // Face mask

  // Travel & Hospitality
  { label: "Travel", url: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?w=300&h=200&fit=crop" }, // Beach
  { label: "Hotel", url: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?w=300&h=200&fit=crop" }, // Hotel lobby
  { label: "Resort", url: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?w=300&h=200&fit=crop" }, // Pool resort

  // Events & Entertainment
  { label: "Events", url: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?w=300&h=200&fit=crop" }, // Event setup
  { label: "Weddings", url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?w=300&h=200&fit=crop" }, // Wedding rings
  { label: "Music", url: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=300&h=200&fit=crop" }, // Guitar

  // Technology
  { label: "Tech Startup", url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=300&h=200&fit=crop" }, // Laptop coding
  { label: "Gaming", url: "https://images.pexels.com/photos/316444/pexels-photo-316444.jpeg?w=300&h=200&fit=crop" }, // Gaming setup

  // Automotive
  { label: "Automotive", url: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?w=300&h=200&fit=crop" }, // Car engine

  // Agriculture
  { label: "Agriculture", url: "https://images.pexels.com/photos/1904716/pexels-photo-1904716.jpeg?w=300&h=200&fit=crop" }, // Tractor field

  // Floristry - FIXED: Flower shop image
  { label: "Floristry", url: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?w=300&h=200&fit=crop" }, // Flower bouquet shop

  // Photography
  { label: "Photography", url: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=300&h=200&fit=crop" }, // Camera

  // Sports
  { label: "Sports", url: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?w=300&h=200&fit=crop" }, // Soccer ball
];

// Group by category and interleave for visual variety — deterministic, so it
// can be computed once on the server instead of shuffled client-side.
function getOrganizedIndustries() {
  const categories = {
    medical: INDUSTRY_PHOTOS.slice(0, 4),
    food: INDUSTRY_PHOTOS.slice(4, 7),
    realEstate: INDUSTRY_PHOTOS.slice(7, 11),
    wellness: INDUSTRY_PHOTOS.slice(11, 14),
    education: INDUSTRY_PHOTOS.slice(14, 16),
    retail: INDUSTRY_PHOTOS.slice(16, 18),
    finance: INDUSTRY_PHOTOS.slice(18, 20),
    beauty: INDUSTRY_PHOTOS.slice(20, 24),
    travel: INDUSTRY_PHOTOS.slice(24, 27),
    events: INDUSTRY_PHOTOS.slice(27, 30),
    tech: INDUSTRY_PHOTOS.slice(30, 32),
    other: INDUSTRY_PHOTOS.slice(32),
  };

  const result: { label: string; url: string }[] = [];
  const maxLen = Math.max(...Object.values(categories).map((arr) => arr.length));

  for (let i = 0; i < maxLen; i++) {
    for (const category of Object.values(categories)) {
      if (category[i]) {
        result.push(category[i]);
      }
    }
  }

  return result;
}

const MOSAIC_COLUMNS = 5;
const MOSAIC_DIRECTIONS = ['scrollUp', 'scrollDown', 'scrollUp', 'scrollDown', 'scrollUp'];
const MOSAIC_SPEEDS = [120, 160, 110, 150, 130];

export default async function LandingPage() {
    const festivals = await getFestivals();
    const organizedIndustries = getOrganizedIndustries();
    const itemsPerColumn = Math.ceil(organizedIndustries.length / MOSAIC_COLUMNS);

    return (
        <div className="relative bg-white font-arial min-h-screen text-gray-900 overflow-hidden">

            {/* HERO SECTION WITH MOSAIC */}
            <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-slate-950 via-slate-900 to-white">
                {/* Orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-3xl opacity-10 -ml-48 -mt-32 animate-pulse" style={{animation: "f1 20s ease-in-out infinite alternate"}}></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full blur-3xl opacity-10 -mr-40 -mt-20 animate-pulse" style={{animation: "f2 24s ease-in-out infinite alternate"}}></div>

                {/* Grid Background */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",
                    backgroundSize: "52px 52px",
                    WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)",
                    maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)"
                }}></div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-0 lg:pb-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col gap-4 sm:gap-6">
                        {/* Pill Badge */}
                        <div className="mt-8 sm:mt-6 mx-auto md:mx-0 inline-flex items-center gap-1.5 w-fit px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
                            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                            <span className="text-[11px] sm:text-sm font-bold uppercase tracking-wider text-orange-400">AI Social Media Automation</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-tight text-center md:text-left">
                            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-rose-400 bg-clip-text text-transparent">365 Days of Social Media.</span> <br className="hidden sm:block" />Zero Effort.
                        </h1>

                        {/* Platform Icons */}
                        <div className="pt-2 pb-1">
                            <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest font-semibold mb-3 text-center md:text-left">Post across 10 platforms</p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start">
                                {[
                                    { icon: "fa-x-twitter",    bg: "#000000" },
                                    { icon: "fa-linkedin-in",  bg: "#0A66C2" },
                                    { icon: "fa-instagram",    bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" },
                                    { icon: "fa-tiktok",       bg: "#010101" },
                                    { icon: "fa-facebook-f",   bg: "#1877F2" },
                                    { icon: "fa-threads",      bg: "#000000" },
                                    { icon: "fa-bluesky",      bg: "#0085ff" },
                                    { icon: "fa-youtube",      bg: "#FF0000" },
                                    { icon: "fa-pinterest-p",  bg: "#E60023" },
                                    { icon: "fa-snapchat",     bg: "#FFFC00", color: "#000" },
                                ].map(({ icon, bg, color }, i) => (
                                    <div key={i} style={{
                                        width: "1.75rem", height: "1.75rem", borderRadius: 7,
                                        background: bg, display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <i className={`fa-brands ${icon}`} style={{ fontSize: "13px", color: color || "#fff" }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTAs */}
                        <HeroCtaButtons />
                    </div>

                    {/* Right - Mosaic Gallery with Perfectly Matched Labels */}
                    <div className="relative hidden sm:block">
                        {/* Badge */}
                        <HeroMosaic
                            items={organizedIndustries}
                            columnsCount={MOSAIC_COLUMNS}
                            itemsPerColumn={itemsPerColumn}
                            directions={MOSAIC_DIRECTIONS}
                            speeds={MOSAIC_SPEEDS}
                        />
                    </div>
                </div>
            </section>

            <PostShowcaseSection />

            <HowItWorksIntroSection />

            <WebsitePoweredSection />

            <ContentCalendarSection />

            <AiCaptionsSection />

            <SmartSchedulingSection />

            <AnalyticsSection />

            <UnifiedCommentsSection />

            <ConnectionsSection />

            <BrandOverlaySection />

            <LibraryCollageSection />

            <WhoWeHelpSection />

            <FestivalsSection festivals={festivals} />

            <MoreBuiltInSection />

            <BuiltForBusinessSection />

            {/* Pricing Section */}
            <div id="pricing">
                <PricingSection />
            </div>

            <Testimonials />

            <HomepageFAQ />

            <FinalCtaSection />
        </div>
    );
}
