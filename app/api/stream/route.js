import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Helper function: Extracts Title & Meta Description using regex (No external packages needed)
function parseMetadata(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descMatch =
    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    description: descMatch ? descMatch[1].trim() : "",
  };
}

export async function GET(request) {
  // 1. Get the URL parameter from request: /api/stream?url=kliko.studio
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url") || "";

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing 'url' query parameter" }, { status: 400 });
  }

  const cleanUrl = targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`;

  // 2. Primary Scraper: Try Jina Reader API for clean markdown context
  try {
    const jinaRes = await fetch(`https://r.jina.ai/${cleanUrl}`, {
      headers: { Accept: "application/json" },
    });

    if (jinaRes.ok) {
      const data = await jinaRes.json();
      if (data.data?.content) {
        const title = data.data.title || targetUrl;
        const summary = data.data.content.slice(0, 300).replace(/\s+/g, " ");

        return NextResponse.json({
          text: `🚀 **${title}**\n\n${summary}...\n\n#SaaS #Innovation #Tech`,
        });
      }
    }
  } catch (err) {
    console.warn("Jina fetch failed, switching to native scraper fallback...");
  }

  // 3. Fallback Scraper: Direct HTML fetch + metadata parser
  try {
    const res = await fetch(cleanUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });

    if (res.ok) {
      const html = await res.text();
      const { title, description } = parseMetadata(html);

      const postContent = `🚀 **${title || targetUrl}**\n\n${
        description || "Transforming operations and scaling workflows efficiently."
      }\n\n#SaaS #AI`;

      return NextResponse.json({ text: postContent });
    }
  } catch (err) {
    console.warn("Native fetch failed, using generic target fallback...");
  }

  // 4. Safe Fallback Response (guarantees response never crashes)
  return NextResponse.json({
    text: `🚀 Scaling workflows and operations effortlessly with ${targetUrl}. Discover their features today!\n\n#SaaS #AI`,
  });
}