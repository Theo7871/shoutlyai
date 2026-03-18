"use client";

import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Clock,
} from "lucide-react";

// Using a "Threads" style icon alternative since Lucide doesn't have it natively
const ThreadsIcon = ({ size }: { size: number }) => (
  <Send size={size} className="rotate-45" />
);

interface ContentDay {
  day: number;
  caption: string;
  hashtags: string;
  time: string;
  image: string;
  type: string;
  badgeClass: string;
}

const SocialMediaCalendar = () => {
  // 1. Data Setup from original source
  const captions = [
    "Boost your Monday productivity with smart marketing habits.",
    "Top 5 tools every startup should use.",
    "Celebrate the festival of lights with our special campaign.",
    "Behind the scenes of our creative team.",
    "3 viral social media growth hacks.",
    "Content strategy tips for small businesses.",
    "Weekend engagement question for followers.",
    "Educational carousel about branding.",
    "Reels idea to boost engagement.",
    "Global marketing trends you should know.",
    "Daily motivation for entrepreneurs.",
    "Customer success story highlight.",
    "Brand storytelling campaign.",
    "Holiday promotion campaign.",
    "Product feature showcase.",
    "Marketing analytics tip.",
    "Content planning tutorial.",
    "Influencer collaboration post.",
    "Team culture showcase.",
    "Client testimonial post.",
    "Marketing meme engagement.",
    "Educational infographic.",
    "Industry news update.",
    "Reels viral trend post.",
    "Weekend fun poll.",
    "Holiday greetings post.",
    "Product behind the scenes.",
    "Brand milestone celebration.",
    "User generated content feature.",
    "Weekly recap post.",
    "End of month engagement post.",
  ];

  const hashtags = [
    "#MarketingTips #GrowthStrategy",
    "#StartupTools #DigitalMarketing",
    "#FestivalCampaign #Diwali",
    "#AgencyLife #TeamWork",
    "#SocialMediaGrowth #Reels",
    "#ContentStrategy #BusinessTips",
    "#WeekendEngagement #Community",
    "#BrandEducation #CarouselPost",
    "#ReelsIdeas #SocialGrowth",
    "#MarketingTrends #GlobalAudience",
    "#EntrepreneurLife #Motivation",
    "#ClientSuccess #BrandTrust",
    "#Storytelling #BrandBuilding",
    "#HolidayCampaign #SeasonalMarketing",
    "#ProductShowcase #Marketing",
    "#AnalyticsTips #MarketingData",
    "#ContentPlanning #MarketingGuide",
    "#InfluencerMarketing #Collaboration",
    "#TeamCulture #AgencyLife",
    "#ClientTestimonial #Success",
    "#MarketingHumor #Engagement",
    "#Infographic #Learning",
    "#IndustryNews #Business",
    "#TrendingReels #ViralContent",
    "#WeekendPoll #Audience",
    "#HolidayGreetings #Festive",
    "#BehindTheScenes #Brand",
    "#BrandMilestone #Growth",
    "#UGC #Community",
    "#WeeklyRecap #Marketing",
    "#MonthEnd #SocialMedia",
  ];

  const times = [
    "9:00 AM EST",
    "6:30 PM CET",
    "7:30 PM IST",
    "8:15 PM GMT",
    "11:00 AM PST",
  ];

  const types = [
    { name: "Educational", color: "bg-[#4c6ef5]" },
    { name: "Reels", color: "bg-[#e64980]" },
    { name: "Festival", color: "bg-[#ff922b]" },
    { name: "Engagement", color: "bg-[#37b24d]" },
    { name: "National Day", color: "bg-[#228be6]" },
    { name: "Holiday", color: "bg-[#7048e8]" },
  ];

  // Your local images from the /public folder
  const images = [
    "/images/img1.jpeg",
    "/images/img2.jpeg", 
    "/images/img3.avif",
    "/images/img4.avif",
    "/images/img10.png",
    "/images/img11.jpeg",
  ];

  // 2. Generating the 31 days array
  const days: ContentDay[] = Array.from({ length: 31 }, (_, i) => {
    const typeObj = types[i % types.length];
    return {
      day: i + 1,
      caption: captions[i],
      hashtags: hashtags[i],
      time: times[i % times.length],
      image: images[i % images.length],
      type: typeObj.name,
      badgeClass: typeObj.color,
    };
  });

  return (
    <div className="bg-[#f5f7fc] min-h-screen p-6 md:p-10 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-5xl text-center text-black mb-3 sm:mb-4">
          Social Media Calendar Example
        </h1>
        <p className="text-center text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-16 px-2">
          A sample monthly content plan showing how posts, reels, and campaigns
          can be scheduled for consistent growth.
        </p>
      </header>

      {/* Week Header */}
      <div className="hidden lg:grid grid-cols-7 mb-4 text-center font-bold text-gray-400 text-xs uppercase tracking-wider">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 3. Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {days.map((item) => (
          <div
            key={item.day}
            className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-lg text-gray-700 leading-none">
                {item.day}
              </span>
              <span
                className={`text-[9px] px-2 py-0.5 rounded-full text-white font-bold uppercase ${item.badgeClass}`}
              >
                {item.type}
              </span>
            </div>

            {/* Platform Icons */}
            <div className="flex gap-1.5 text-gray-300 mb-2">
              <Facebook size={12} />
              <Instagram size={12} />
              <Twitter size={12} />
              <Linkedin size={12} />
              <Youtube size={12} />
              <ThreadsIcon size={12} />
            </div>

            {/* Image from local folder */}
            <img
              src={item.image}
              alt={`Day ${item.day}`}
              className="w-full h-24 object-cover rounded-md mb-2 bg-gray-100"
              loading="lazy"
            />

            <div className="flex-grow">
              <p className="text-[11px] leading-tight text-gray-800 font-medium mb-1 line-clamp-2">
                {item.caption}
              </p>
              <p className="text-[10px] text-blue-500 font-medium truncate">
                {item.hashtags}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-gray-50 flex items-center text-gray-400 gap-1">
              <Clock size={10} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaCalendar;