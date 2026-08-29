import type { Metadata } from "next";
import { fetchIndustries } from "@/api/homeApi";
import type { Industry } from "@/types/home";
import PostGeneratorSection from "@/components/home/PostGeneratorSection";

export const metadata: Metadata = {
  title: "How It Works — From One Prompt to a Full Content Calendar | Shoutly AI",
  description:
    "See exactly how Shoutly AI turns one prompt into a month of ready-to-publish social content: set up your business, describe what you do, and generate branded posts on the spot.",
};

export default async function HowItWorksPage() {
  const industries = (await fetchIndustries()) as Industry[];

  return (
    <main className="bg-white">
      <PostGeneratorSection industries={industries} />
    </main>
  );
}
