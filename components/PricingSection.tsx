"use client";

import { Fragment, useState } from "react";
import { Check, Minus } from "lucide-react";

type Billing = "monthly" | "annual";

interface Highlight {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  featured: boolean;
  highlights: Highlight[];
  checkoutUrl: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    description: "Perfect for beginners",
    monthlyPrice: 29,
    yearlyPrice: 278.4,
    featured: false,
    highlights: [
      { text: "2 connected accounts", included: true },
      { text: "Template library (12K+)", included: true },
      { text: "AI caption generation", included: true },
      { text: "Multi-platform publishing", included: true },
      { text: "Email support", included: true },
      { text: "AI hashtag generator", included: false },
    ],
    checkoutUrl: "/checkout?plan=starter&billing=",
  },
  {
    name: "Business",
    description: "For growing teams",
    monthlyPrice: 79,
    yearlyPrice: 758.4,
    featured: true,
    highlights: [
      { text: "5 connected accounts", included: true },
      { text: "Everything in Starter, plus:", included: true },
      { text: "AI hashtag & content generation", included: true },
      { text: "AI image & reel generators", included: true },
      { text: "Logo overlay & branding", included: true },
      { text: "Unified response management", included: true },
    ],
    checkoutUrl: "/checkout?plan=business&billing=",
  },
  {
    name: "Autopilot",
    description: "Full automation",
    monthlyPrice: 119,
    yearlyPrice: 1142.4,
    featured: false,
    highlights: [
      { text: "10 connected accounts", included: true },
      { text: "Everything in Business, plus:", included: true },
      { text: "Festival content auto-generation", included: true },
      { text: "Custom image creation", included: true },
      { text: "AI best time posting", included: true },
      { text: "Bulk scheduling", included: true },
    ],
    checkoutUrl: "/checkout?plan=autopilot&billing=",
  },
];

interface ComparisonRow {
  feature: string;
  starter: boolean | string;
  business: boolean | string;
  autopilot: boolean | string;
}

interface ComparisonCategory {
  category: string;
  rows: ComparisonRow[];
}

const comparison: ComparisonCategory[] = [
  {
    category: "Core Features",
    rows: [
      { feature: "Connected social accounts", starter: "2", business: "5", autopilot: "10" },
    ],
  },
  {
    category: "Content Generation",
    rows: [
      { feature: "AI caption generator", starter: true, business: true, autopilot: true },
      { feature: "AI hashtag generator", starter: false, business: true, autopilot: true },
      { feature: "AI content generator (auto drafts)", starter: false, business: true, autopilot: true },
    ],
  },
  {
    category: "Image & Design",
    rows: [
      { feature: "Template library (12,000+ images & reels)", starter: true, business: true, autopilot: true },
      { feature: "AI image generator", starter: false, business: true, autopilot: true },
      { feature: "AI reel generator", starter: false, business: true, autopilot: true },
      { feature: "Logo overlay & brand customization", starter: false, business: true, autopilot: true },
      { feature: "Festival content auto-generation", starter: false, business: false, autopilot: true },
      { feature: "Custom image creation", starter: false, business: false, autopilot: true },
    ],
  },
  {
    category: "Publishing & Scheduling",
    rows: [
      { feature: "Multi-platform publishing", starter: true, business: true, autopilot: true },
      { feature: "AI social scheduler", starter: false, business: true, autopilot: true },
      { feature: "AI best time posting detection", starter: false, business: true, autopilot: true },
      { feature: "Bulk scheduling", starter: false, business: false, autopilot: true },
    ],
  },
  {
    category: "Community Management",
    rows: [
      { feature: "Unified response management (all platforms)", starter: false, business: true, autopilot: true },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Email support", starter: true, business: true, autopilot: true },
      { feature: "Priority support", starter: false, business: true, autopilot: true },
      { feature: "24/7 phone & dedicated manager", starter: false, business: false, autopilot: true },
    ],
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="font-semibold text-slate-900">{value}</span>;
  }
  return value ? (
    <Check className="mx-auto h-5 w-5 text-orange-600" strokeWidth={2.5} />
  ) : (
    <Minus className="mx-auto h-5 w-5 text-slate-300" strokeWidth={2.5} />
  );
}

export default function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="bg-white px-6 pb-20 pt-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to automate your social media. No hidden fees.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mb-16 flex items-center justify-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-xl border-2 border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-lg px-5 py-2 text-sm font-bold transition ${
                billing === "monthly"
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`rounded-lg px-5 py-2 text-sm font-bold transition ${
                billing === "annual"
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Annual
            </button>
          </div>
          {billing === "annual" && (
            <span className="rounded-md bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-600">
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing cards */}
        <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const period = billing === "monthly" ? "month" : "year";
            const yearlySavings = (plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0);

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-8 transition hover:-translate-y-1 hover:shadow-xl ${
                  plan.featured
                    ? "border-orange-500 shadow-lg shadow-orange-200"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Most Popular
                  </span>
                )}

                <div className="mb-1 text-xl font-bold text-slate-900">{plan.name}</div>
                <div className="mb-6 text-sm text-slate-400">{plan.description}</div>

                <div className="mb-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-500">$</span>
                  <span className="text-5xl font-black tracking-tight text-slate-900">
                    {price.toFixed(2).split(".")[0]}
                  </span>
                  <span className="text-base font-semibold text-slate-400">/{period}</span>
                </div>

                {billing === "annual" ? (
                  <div className="mb-8 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600">
                    Save ${yearlySavings} per year
                  </div>
                ) : (
                  <div className="mb-8 h-0" />
                )}

                <a
                  href={`${plan.checkoutUrl}${billing}`}
                  className={`mb-8 block w-full rounded-xl py-3.5 text-center font-bold transition ${
                    plan.featured
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-200 hover:bg-orange-600"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  Get Started
                </a>

                <div className="border-t border-slate-100 pt-6">
                  <div className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Key Features
                  </div>
                  <ul className="space-y-3">
                    {plan.highlights.map((f) => (
                      <li key={f.text} className="flex items-start gap-3 text-sm text-slate-600">
                        {f.included ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" strokeWidth={2.5} />
                        ) : (
                          <Minus className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" strokeWidth={2.5} />
                        )}
                        <span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl border border-slate-100 bg-[#F8F9FD] p-6 md:p-10">
          <h2 className="mb-10 text-center text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
            Complete Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="w-2/5 px-4 py-4 text-left text-sm font-bold text-slate-900">
                    Features
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-slate-900">Starter</th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-slate-900">Business</th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-slate-900">Autopilot</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((group) => (
                  <Fragment key={group.category}>
                    <tr className="bg-slate-100">
                      <td
                        colSpan={4}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-500"
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-slate-100 hover:bg-white"
                      >
                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                          {row.feature}
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-slate-600">
                          <Cell value={row.starter} />
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-slate-600">
                          <Cell value={row.business} />
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-slate-600">
                          <Cell value={row.autopilot} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}