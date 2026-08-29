"use client";

import React, { useState } from "react";

export default function LiveStudio() {
  const [urlInput, setUrlInput] = useState("kliko.studio");
  const [generatedPost, setGeneratedPost] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRunLiveStream = async () => {
    if (!urlInput.trim()) return;

    setLoading(true);
    setGeneratedPost("");

    try {
      // Fetch response from our backend scraper endpoint
      const res = await fetch(`/api/stream?url=${encodeURIComponent(urlInput.trim())}`);
      const data = await res.json();

      if (data.text) {
        setGeneratedPost(data.text);
      } else {
        setGeneratedPost("Could not extract content for this domain.");
      }
    } catch (error) {
      console.error("Error fetching live post:", error);
      setGeneratedPost("An error occurred while generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Live Interactive Agent Studio</h2>

      {/* Input & Button Controls */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter custom domain (e.g. kliko.studio)"
          className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
        />
        <button
          onClick={handleRunLiveStream}
          disabled={loading}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Scraping & Generating..." : "Run Live Stream"}
        </button>
      </div>

      {/* Preset Quick Links */}
      <div className="flex gap-2 mb-6">
        <span className="text-sm text-slate-400">Presets:</span>
        {["shoutlyai.com", "stripe.com", "linear.app"].map((domain) => (
          <button
            key={domain}
            onClick={() => setUrlInput(domain)}
            className="text-xs px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
          >
            {domain}
          </button>
        ))}
      </div>

      {/* Preview Card Output */}
      <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg min-h-[120px]">
        <div className="text-xs uppercase font-semibold text-orange-400 mb-2">LinkedIn Output</div>
        <div className="whitespace-pre-wrap text-slate-200">
          {generatedPost || "Enter a domain above and click 'Run Live Stream'..."}
        </div>
      </div>
    </div>
  );
}