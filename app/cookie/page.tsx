"use client";

import React from "react";
import Link from "next/link";

// Types for our data structures
interface CookieInfo {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: "Necessary" | "Functional" | "Analytics" | "Marketing";
}

interface ThirdPartyService {
  service: string;
  purpose: string;
  link: string;
}

const CookiePolicy: React.FC = () => {
  // 1. Specific Cookies Data
  const specificCookies: CookieInfo[] = [
    {
      name: "session_id",
      provider: "ShoutlyAI",
      purpose: "Maintain login session",
      duration: "Session",
      type: "Necessary",
    },
    {
      name: "user_preferences",
      provider: "ShoutlyAI",
      purpose: "Save dashboard settings",
      duration: "1 year",
      type: "Functional",
    },
    {
      name: "_ga",
      provider: "Google Analytics",
      purpose: "Distinguish users",
      duration: "2 years",
      type: "Analytics",
    },
    {
      name: "_gid",
      provider: "Google Analytics",
      purpose: "Distinguish users",
      duration: "24 hours",
      type: "Analytics",
    },
    {
      name: "_fbp",
      provider: "Meta",
      purpose: "Ad targeting",
      duration: "3 months",
      type: "Marketing",
    },
    {
      name: "li_sugr",
      provider: "LinkedIn",
      purpose: "Ad targeting",
      duration: "3 months",
      type: "Marketing",
    },
  ];

  // 2. Third Party Data
  const thirdParties: ThirdPartyService[] = [
    {
      service: "Google Analytics",
      purpose: "Usage analysis",
      link: "https://policies.google.com/privacy",
    },
    {
      service: "Meta (Facebook)",
      purpose: "Ad targeting, conversion tracking",
      link: "https://www.facebook.com/privacy/policy",
    },
    {
      service: "LinkedIn",
      purpose: "Ad targeting, analytics",
      link: "https://www.linkedin.com/legal/privacy-policy",
    },
    {
      service: "Stripe/Razorpay",
      purpose: "Payment processing",
      link: "https://stripe.com/privacy",
    },
    {
      service: "Intercom",
      purpose: "Customer support",
      link: "https://www.intercom.com/legal/privacy",
    },
  ];

  // Helper to get badge colors
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Necessary":
        return "bg-orange-600";
      case "Functional":
        return "bg-blue-500";
      case "Analytics":
        return "bg-green-600";
      case "Marketing":
        return "bg-purple-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen text-[#1f2937] font-sans antialiased">
      <div className="max-w-[1000px] mx-auto py-12 px-6 lg:py-20">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent inline-block mb-2">
            ShoutlyAI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1f2937] mb-2">
            Cookie Policy
          </h1>
        </header>

        {/* Main Content Card */}
        <main className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_35px_-8px_rgba(0,0,0,0.05)] border border-[#f0f0f0] space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-orange-500 inline-block mb-6 pb-1">
              1. What Are Cookies?
            </h2>
            <p className="text-[#4b5563] mb-4">
              Cookies are small text files stored on your device (computer,
              tablet, mobile) when you visit websites. They help websites
              remember your preferences, understand how you use the site, and
              personalize your experience.
            </p>
            <p className="text-[#4b5563]">
              We also use similar technologies like pixel tags, web beacons, and
              local storage.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-orange-500 inline-block mb-6 pb-1">
              2. Why We Use Cookies
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="p-4 font-semibold">Purpose</th>
                    <th className="p-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-[#faf9f6] transition-colors">
                    <td className="p-4 font-bold">Essential Operations</td>
                    <td className="p-4 text-gray-600">
                      Keep you logged in, remember your session
                    </td>
                  </tr>
                  <tr className="hover:bg-[#faf9f6] transition-colors">
                    <td className="p-4 font-bold">Performance</td>
                    <td className="p-4 text-gray-600">
                      Understand how users interact with our Site
                    </td>
                  </tr>
                  <tr className="hover:bg-[#faf9f6] transition-colors">
                    <td className="p-4 font-bold">Marketing</td>
                    <td className="p-4 text-gray-600">
                      Deliver relevant advertisements
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 - Grid Layout */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-orange-500 inline-block mb-6 pb-1">
              3. Types of Cookies We Use
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {[
                {
                  title: "Strictly Necessary",
                  desc: "Essential for Site functionality; cannot be disabled",
                  sub: "Authentication, security, load balancing",
                },
                {
                  title: "Functional",
                  desc: "Remember choices and preferences",
                  sub: "Language, region, saved prompts",
                },
                {
                  title: "Performance",
                  desc: "Understand and improve Site performance",
                  sub: "Google Analytics, Mixpanel",
                },
                {
                  title: "Marketing",
                  desc: "Deliver relevant ads and track campaigns",
                  sub: "Facebook Pixel, LinkedIn Insight",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf9f6] p-6 rounded-2xl border border-[#f0f0f0] hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/5 transition-all"
                >
                  <h4 className="text-orange-500 font-bold text-lg mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-700 mb-1">{item.desc}</p>
                  <p className="text-xs text-gray-400 italic">{item.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 - Specific Cookies Table */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-orange-500 inline-block mb-6 pb-1">
              4. Specific Cookies We Use
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 mt-6">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="p-4">Cookie Name</th>
                    <th className="p-4">Provider</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {specificCookies.map((cookie, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#faf9f6] transition-colors"
                    >
                      <td className="p-4 font-mono font-bold text-orange-600">
                        {cookie.name}
                      </td>
                      <td className="p-4 text-gray-600">{cookie.provider}</td>
                      <td className="p-4 text-gray-600">{cookie.duration}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase ${getBadgeColor(cookie.type)}`}
                        >
                          {cookie.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 9 - Contact */}
          <section className="pt-6">
            <h2 className="text-2xl font-bold border-b-2 border-orange-500 inline-block mb-6 pb-1">
              9. Contact Us
            </h2>
            <p className="text-[#4b5563]">
              For questions about our Cookie Policy:
            </p>
            <div className="mt-4 p-6 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@shoutlyai.com"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  privacy@shoutlyai.com
                </a>
              </p>
              <p>
                <strong>Mail:</strong> JP Nagar 8th Phase, Karnataka 560083
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CookiePolicy;
