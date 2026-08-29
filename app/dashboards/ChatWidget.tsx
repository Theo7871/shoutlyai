"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiSend, FiTrash2, FiX, FiChevronRight, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { API_ENDPOINTS } from "@/api/configApi";

function RobotLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-white border border-gray-200 flex-shrink-0 ${className}`}>
      <img src="/images/logo-icon-black.png" alt="" loading="lazy" className="w-[68%] h-[68%] object-contain" />
    </span>
  );
}

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
  cta?: { label: string; url: string };
}

function generateSessionId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// SSE stream: lines like `data: {"text":"..."}` (each an answer chunk to
// append), a final `data: {"meta":{"cta":{...}}}`, then `data: [DONE]`.
function parseStreamLine(line: string): { text?: string; cta?: { label: string; url: string } } {
  if (!line.startsWith("data:")) return {};
  const payload = line.slice(5).trim();
  if (!payload || payload === "[DONE]") return {};
  try {
    const evt = JSON.parse(payload);
    if (typeof evt.text === "string") return { text: evt.text };
    if (evt.meta?.cta?.url) return { cta: evt.meta.cta };
    return {};
  } catch {
    return {};
  }
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "1",
  type: "bot",
  text: "👋 Hi! I'm the Shoutly AI assistant. What would you like to know?",
  timestamp: new Date(),
};

const QUICK_QUESTIONS = ["What is Shoutly AI?", "How does it work?", "What can I automate?", "Pricing & Plans"];

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatMessage(text: string) {
  const lines = text
    .replace(/([.!?])\s+(\d+[\)\.]\s)/g, "$1\n$2")
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length <= 1) return <span>{text}</span>;

  return (
    <span>
      {lines.map((line, i) => {
        const isNumbered = /^\d+[\)\.]\s/.test(line);
        return (
          <span key={i} className={`block ${isNumbered ? "mt-1" : i > 0 ? "mt-1" : ""}`}>
            {isNumbered ? (
              <span className="flex gap-1.5">
                <span className="font-bold text-orange-500 flex-shrink-0">
                  {line.match(/^\d+[\)\.]/)?.[0]}
                </span>
                <span>{line.replace(/^\d+[\)\.]\s*/, "")}</span>
              </span>
            ) : line}
          </span>
        );
      })}
    </span>
  );
}

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => generateSessionId());
  const [isExpanded, setIsExpanded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setChatOpen(true);
    document.addEventListener("shoutly:open-chat", handler);
    return () => document.removeEventListener("shoutly:open-chat", handler);
  }, []);

  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [chatOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMsgs, chatLoading]);

  const handleClearChat = () => {
    setChatMsgs([{ ...INITIAL_MESSAGE, id: Date.now().toString(), timestamp: new Date() }]);
    // Starting over should mean a fresh conversation on the backend too — a
    // stale sessionId would keep the old conversation's memory/context.
    setSessionId(generateSessionId());
  };

  const sendChat = async (textOverride?: string) => {
    const q = (textOverride ?? chatInput).trim();
    if (!q || chatLoading) return;
    setChatInput("");
    setChatMsgs((p) => [...p, { id: Date.now().toString(), type: "user", text: q, timestamp: new Date() }]);
    setChatLoading(true);

    const botId = (Date.now() + 1).toString();
    let started = false;
    let cta: { label: string; url: string } | undefined;

    // Aborts only if the stream goes quiet for too long — reset on every
    // chunk so a long-but-live answer never gets cut short.
    const controller = new AbortController();
    let idleTimer: ReturnType<typeof setTimeout> = setTimeout(() => controller.abort(), 20000);
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => controller.abort(), 20000);
    };

    const appendBotText = (text: string) => {
      if (!started) {
        started = true;
        setChatLoading(false);
        setChatMsgs((p) => [...p, { id: botId, type: "bot", text, timestamp: new Date() }]);
      } else {
        setChatMsgs((p) => p.map((m) => (m.id === botId ? { ...m, text: m.text + text } : m)));
      }
    };

    try {
      const r = await fetch(API_ENDPOINTS.ragChatStream, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        body: JSON.stringify({ query: q, topK: 5, sessionId }),
        signal: controller.signal,
      });
      if (!r.ok || !r.body) throw new Error(`Stream request failed (${r.status})`);

      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        resetIdleTimer();

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep the trailing incomplete line for the next chunk

        for (const raw of lines) {
          const line = raw.trim();
          if (!line) continue;
          const evt = parseStreamLine(line);
          if (evt.text) appendBotText(evt.text);
          if (evt.cta) cta = evt.cta;
        }
      }

      const tail = buffer.trim();
      if (tail) {
        const evt = parseStreamLine(tail);
        if (evt.text) appendBotText(evt.text);
        if (evt.cta) cta = evt.cta;
      }

      if (!started) {
        appendBotText("Sorry, something went wrong. Please try again.");
      } else if (cta) {
        setChatMsgs((p) => p.map((m) => (m.id === botId ? { ...m, cta } : m)));
      }
    } catch {
      if (!started) {
        setChatMsgs((p) => [
          ...p,
          { id: botId, type: "bot", text: "Couldn't connect. Please try again.", timestamp: new Date() },
        ]);
      }
    } finally {
      clearTimeout(idleTimer);
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChat();
    }
  };

  if (!chatOpen) return null;

  return (
    <div
      className={
        isExpanded
          ? "fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4"
          : "fixed bottom-6 right-7 z-[999]"
      }
    >
    <div
      className={`flex flex-col rounded-2xl overflow-hidden border border-gray-100 transition-all duration-200 ${
        isExpanded
          ? "w-[820px] max-w-[calc(100vw-2rem)] h-[80vh] max-h-[760px]"
          : "w-[320px] max-w-[calc(100vw-2rem)] h-[440px] max-h-[70vh]"
      }`}
      style={{
        boxShadow: "0 24px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(249,115,22,0.08)",
        animation: "chatSlideUp 0.22s ease-out",
      }}
    >
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%           { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)" }} className={`flex items-center gap-2.5 ${isExpanded ? "px-4 py-3" : "px-3 py-2.5"}`}>
        <RobotLogo className={isExpanded ? "w-8 h-8 flex-shrink-0" : "w-7 h-7 flex-shrink-0"} />
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-white leading-none ${isExpanded ? "text-sm" : "text-xs"}`}>ShoutlyAI Assistant</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-white/80 ${isExpanded ? "text-[11px]" : "text-[10px]"}`}>Online · replies instantly</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded((v) => !v)}
            title={isExpanded ? "Collapse" : "Expand"}
            className={`rounded-full hover:bg-white/20 flex items-center justify-center transition text-white/80 hover:text-white ${isExpanded ? "w-7 h-7" : "w-6 h-6"}`}
          >
            {isExpanded ? <FiMinimize2 size={13} /> : <FiMaximize2 size={12} />}
          </button>
          <button
            onClick={handleClearChat}
            title="Delete conversation"
            className={`rounded-full hover:bg-white/20 flex items-center justify-center transition text-white/80 hover:text-white ${isExpanded ? "w-7 h-7" : "w-6 h-6"}`}
          >
            <FiTrash2 size={isExpanded ? 13 : 12} />
          </button>
          <button
            onClick={() => setChatOpen(false)}
            title="Close"
            className={`rounded-full hover:bg-white/20 flex items-center justify-center transition text-white/80 hover:text-white ${isExpanded ? "w-7 h-7" : "w-6 h-6"}`}
          >
            <FiX size={isExpanded ? 14 : 13} />
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className={`flex-1 overflow-y-auto bg-white space-y-3 ${isExpanded ? "px-4 py-3.5" : "px-3 py-2.5"}`}>
        {chatMsgs.map((msg) => {
          const isGreeting = msg.id === chatMsgs[0]?.id && msg.type === "bot";

          if (isGreeting) {
            return (
              <div key={msg.id} className={`text-center rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 ${isExpanded ? "p-5" : "p-4"}`}>
                <RobotLogo className={isExpanded ? "w-12 h-12 mx-auto mb-2.5" : "w-10 h-10 mx-auto mb-2"} />
                <p className={`font-bold text-gray-900 leading-snug ${isExpanded ? "text-[15px]" : "text-[13px]"}`}>
                  Hi! I&apos;m the Shoutly AI assistant
                </p>
                <p className={`text-gray-500 mt-0.5 ${isExpanded ? "text-[13px]" : "text-[12px]"}`}>What would you like to know?</p>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex gap-1.5 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.type === "bot" && (
                <RobotLogo className={isExpanded ? "w-6 h-6 flex-shrink-0 mt-0.5" : "w-5 h-5 flex-shrink-0 mt-0.5"} />
              )}

              <div className={`flex flex-col gap-0.5 ${msg.type === "user" ? "max-w-[80%] items-end" : "w-full items-start"}`}>
                <div
                  className={`rounded-xl leading-relaxed ${isExpanded ? "px-3.5 py-2.5 text-[13px]" : "px-2.5 py-1.5 text-[12px]"} ${
                    msg.type === "user"
                      ? "text-white rounded-tr-sm"
                      : "w-full text-justify bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-sm"
                  }`}
                  style={msg.type === "user" ? { background: "linear-gradient(135deg,#f97316,#ef4444)" } : {}}
                >
                  {msg.type === "bot" ? formatMessage(msg.text) : msg.text}
                </div>
                {msg.cta && (
                  <a
                    href={msg.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 rounded-lg font-bold text-white transition hover:opacity-90 ${isExpanded ? "px-3.5 py-1.5 text-[12px]" : "px-3 py-1.5 text-[11px]"}`}
                    style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}
                  >
                    {msg.cta.label} <FiChevronRight size={isExpanded ? 12 : 11} />
                  </a>
                )}
                <span className={`text-gray-400 px-1 ${isExpanded ? "text-[10px]" : "text-[9px]"}`}>{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          );
        })}

        {/* Follow-up suggestion buttons: only questions not asked yet */}
        {!chatLoading && (() => {
          const askedTexts = chatMsgs
            .filter((m) => m.type === "user")
            .map((m) => m.text.trim().toLowerCase());
          const remainingQuestions = QUICK_QUESTIONS.filter(
            (q) => !askedTexts.includes(q.toLowerCase())
          );
          if (remainingQuestions.length === 0) return null;

          return (
            <div className={isExpanded ? "grid grid-cols-2 gap-2" : "flex flex-col gap-1.5"}>
              {remainingQuestions.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendChat(chip)}
                  disabled={chatLoading}
                  className={`group w-full flex items-center justify-between gap-2 rounded-xl border border-orange-200 bg-white text-left font-semibold text-gray-700 shadow-sm hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 ${
                    isExpanded ? "px-3.5 py-3 text-[12.5px]" : "px-3 py-2 text-[12px]"
                  }`}
                >
                  <span>{chip}</span>
                  <FiChevronRight
                    size={isExpanded ? 14 : 13}
                    className="text-orange-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              ))}
            </div>
          );
        })()}

        {/* Typing indicator */}
        {chatLoading && (
          <div className="flex gap-1.5">
            <RobotLogo className={isExpanded ? "w-6 h-6 flex-shrink-0" : "w-5 h-5 flex-shrink-0"} />
            <div className={`bg-gray-50 border border-gray-100 rounded-xl rounded-tl-sm flex items-center gap-1 ${isExpanded ? "px-3.5 py-2.5" : "px-3 py-2"}`}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"
                  style={{ animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ── Input ── */}
      <div className={`bg-white border-t border-gray-100 ${isExpanded ? "px-3.5 py-3" : "px-2.5 py-2"}`}>
        <div className={`flex items-center gap-1.5 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition ${isExpanded ? "px-3.5 py-2" : "px-2.5 py-1.5"}`}>
          <input
            ref={inputRef}
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            disabled={chatLoading}
            className={`flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-50 min-w-0 ${isExpanded ? "text-[13.5px]" : "text-[12px]"}`}
          />
          <button
            onClick={() => sendChat()}
            disabled={chatLoading || !chatInput.trim()}
            className={`rounded-md flex items-center justify-center flex-shrink-0 transition disabled:opacity-40 disabled:cursor-not-allowed ${isExpanded ? "w-7 h-7" : "w-6 h-6"}`}
            style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}
            title="Send"
          >
            <FiSend size={isExpanded ? 13 : 11} className="text-white" />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
