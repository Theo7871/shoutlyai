import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SocialPilot vs Shoutly AI — LinkedIn Post Generator Comparison",
  description:
    "Compare SocialPilot and Shoutly AI for generating professional LinkedIn posts, Instagram, Facebook, articles, carousels, and company page content automatically. Find out which tool suits your business needs.",
};

export default function LinkedInChannelPage() {
  // 1. Read the static HTML
  const htmlPath = path.join(process.cwd(), "public", "socialpilot-vs-shoutly-ai.html");
  const rawHtml = fs.readFileSync(htmlPath, "utf8");

  // 2. Extract <style>
  const styleMatch = rawHtml.match(/<style>([\s\S]*?)<\/style>/i);
  let pageStyles = styleMatch?.[1] ?? "";

  // 3. Extract <body> content
  const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyHtml = bodyMatch?.[1] ?? "";

  // 4. Extract the inline <script> (last script block)
  const scriptMatch = rawHtml.match(/<script>([\s\S]*?)<\/script>\s*$/i);
  let inlineScript = scriptMatch?.[1] ?? "";

  // 5. Remove the script tag from body so it doesn't execute twice
  bodyHtml = bodyHtml.replace(/<script>[\s\S]*?<\/script>\s*$/i, "");

  // 6. STRIP <nav> and <footer> – this prevents conflict with your global layout
  bodyHtml = bodyHtml.replace(/<nav[^>]*>[\s\S]*?<\/nav>/i, "");
  bodyHtml = bodyHtml.replace(/<footer[^>]*>[\s\S]*?<\/footer>/i, "");

  // 7. Scope CSS to .linkedin-content to avoid global leakage
  pageStyles = pageStyles
    .replace(/\*,\*::before,\*::after\{[\s\S]*?\}/i, ".linkedin-content *, .linkedin-content *::before, .linkedin-content *::after{box-sizing:border-box;margin:0;padding:0}")
    .replace(/html\{[\s\S]*?\}/i, ".linkedin-content{font-size:16px;scroll-behavior:smooth;-webkit-text-size-adjust:100%}")
    .replace(/body\{[\s\S]*?\}/i, ".linkedin-content{font-family:'Inter',system-ui,sans-serif;background:#fff;color:#0f0f0f;-webkit-font-smoothing:antialiased;line-height:1.6;overflow-x:hidden}")
    .replace(/:root\{[\s\S]*?\}/i, ".linkedin-content{--p:#F97316;--pg:linear-gradient(135deg,#F97316,#EF4444);--li:#F97316;--li2:#EA580C;--li-light:#fff7ed;--li-border:#fed7aa;--dark:#0f172a;--glow:rgba(249,115,22,.32);--ink:#0f0f0f;--ink2:#1e293b;--ink3:#475569;--ink4:#94a3b8;--surface:#f8fafc;--border:#e2e8f0;--border2:#cbd5e1;--green:#16a34a;--max:1200px;--r:8px;--r2:12px;--r3:16px;--r4:22px;--r5:30px}")
    + "\n.linkedin-content [data-r]{opacity:1!important;transform:none!important;}\n";

  // 8. JSON‑LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SocialPilot vs Shoutly AI LinkedIn Post Generator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "210",
      "itemReviewed": {
        "@type": "SoftwareApplication",
        "name": "SocialPilot vs Shoutly AI"
      }
    }
  };

  return (
    <main className="bg-white">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Inter+Tight:wght@700;800;900&display=swap"
      />

      {/* Scoped page styles */}
      {pageStyles ? <style dangerouslySetInnerHTML={{ __html: pageStyles }} /> : null}

      {/* Rendered body HTML (nav & footer already removed) */}
      <div className="linkedin-content" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      {/* Inline JavaScript – runs after hydration */}
      {inlineScript ? (
        <Script
          id="linkedin-inline-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: inlineScript }}
        />
      ) : null}
    </main>
  );
}