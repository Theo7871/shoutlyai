"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiSend, FiX, FiTrash2, FiChevronRight, FiMaximize2, FiMinimize2 } from "react-icons/fi";

function RobotLogo({ className }: { className?: string }) {
    return (
        <span className={`inline-flex items-center justify-center rounded-full bg-black border border-gray-200 flex-shrink-0 ${className}`}>
            <img src="/images/logo-icon-white.png" alt="" loading="lazy" className="w-[68%] h-[68%] object-contain" />
        </span>
    );
}

interface Message {
    id: string;
    type: "user" | "bot";
    content: string;
    timestamp: Date;
    cta?: { label: string; url: string };
}

import { API_ENDPOINTS } from "@/api/configApi";

const STORAGE_KEY = "shoutly_chat_history";
const SESSION_KEY = "shoutly_chat_session_id";

function generateSessionId() {
    return typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function loadSessionId(): string {
    try {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) return stored;
    } catch {}
    const fresh = generateSessionId();
    try { localStorage.setItem(SESSION_KEY, fresh); } catch {}
    return fresh;
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

const INITIAL_MESSAGE: Message = {
    id: "1",
    type: "bot",
    content: "👋 Hi! I'm the Shoutly AI assistant. What would you like to know?",
    timestamp: new Date(),
};

const QUICK_QUESTIONS = ["What is Shoutly AI?", "How does it work?", "What can I automate?", "Pricing & Plans"];

function loadMessages(): Message[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [INITIAL_MESSAGE];
        const parsed = JSON.parse(stored) as Message[];
        return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
    } catch {
        return [INITIAL_MESSAGE];
    }
}

function saveMessages(messages: Message[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
}

function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatMessage(text: string) {
    // Split on numbered patterns like "1)" "2)" "1." "2." or "\n"
    const lines = text
        .replace(/([.!?])\s+(\d+[\)\.]\s)/g, "$1\n$2") // break before numbers mid-sentence
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

export default function FloatingChatBot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages(loadMessages());
            setSessionId(loadSessionId());
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (messages.length > 0) saveMessages(messages);
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleClearChat = () => {
        const fresh: Message[] = [{ ...INITIAL_MESSAGE, id: Date.now().toString(), timestamp: new Date() }];
        setMessages(fresh);
        localStorage.removeItem(STORAGE_KEY);
        // Starting over should mean a fresh conversation on the backend too —
        // a stale sessionId would keep the old conversation's memory/context.
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        try { localStorage.setItem(SESSION_KEY, newSessionId); } catch {}
    };

    const handleSendMessage = async (textOverride?: string) => {
        const text = (textOverride ?? input).trim();
        if (!text || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

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

        const appendBotText = (content: string) => {
            if (!started) {
                started = true;
                setIsLoading(false);
                setMessages((prev) => [...prev, { id: botId, type: "bot", content, timestamp: new Date() }]);
            } else {
                setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, content: m.content + content } : m)));
            }
        };

        try {
            const response = await fetch(API_ENDPOINTS.ragChatStream, {
                method: "POST",
                headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
                body: JSON.stringify({ query: userMessage.content, topK: 5, sessionId }),
                signal: controller.signal,
            });
            if (!response.ok || !response.body) throw new Error(`Stream request failed (${response.status})`);

            const reader = response.body.getReader();
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
                appendBotText("I couldn't generate a response. Please try again.");
            } else if (cta) {
                setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, cta } : m)));
            }
        } catch (error) {
            if (started) {
                // Partial answer already showing — leave it rather than
                // replacing a live (if incomplete) answer with a generic error.
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: botId,
                        type: "bot",
                        content: error instanceof Error && error.name === "AbortError"
                            ? "Request timed out. Please try again."
                            : "Sorry, I couldn't connect. Please try again.",
                        timestamp: new Date(),
                    },
                ]);
            }
        } finally {
            clearTimeout(idleTimer);
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (
        pathname === "/dashboard" ||
        pathname.startsWith("/dashboard/") ||
        pathname === "/dashboards" ||
        pathname.startsWith("/dashboards/")
    ) {
        return null;
    }

    const expandedOpen = isOpen && isExpanded;

    return (
        <div
            className={
                expandedOpen
                    ? "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    : "fixed bottom-6 right-6 z-50"
            }
        >
            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`flex flex-col rounded-2xl overflow-hidden border border-gray-100 transition-all duration-200 ${
                        isExpanded
                            ? "w-[820px] max-w-[calc(100vw-2rem)] h-[80vh] max-h-[760px]"
                            : "mb-4 w-[320px] max-w-[calc(100vw-2rem)] h-[440px] max-h-[70vh]"
                    }`}
                    style={{
                        boxShadow: "0 24px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(249,115,22,0.08)",
                        animation: "chatSlideUp 0.25s ease-out",
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
                        {/* Bot avatar */}
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
                                onClick={() => setIsOpen(false)}
                                title="Close"
                                className={`rounded-full hover:bg-white/20 flex items-center justify-center transition text-white/80 hover:text-white ${isExpanded ? "w-7 h-7" : "w-6 h-6"}`}
                            >
                                <FiX size={isExpanded ? 14 : 13} />
                            </button>
                        </div>
                    </div>

                    {/* ── Messages ── */}
                    <div className={`flex-1 overflow-y-auto bg-white space-y-3 ${isExpanded ? "px-4 py-3.5" : "px-3 py-2.5"}`}>
                        {messages.filter((msg) => {
                            // Hide the initial greeting once the user has sent at least one message
                            const hasUserMessage = messages.some((m) => m.type === "user");
                            if (hasUserMessage && msg.id === messages[0]?.id && msg.type === "bot") return false;
                            return true;
                        }).map((msg) => {
                            const isGreeting = msg.id === messages[0]?.id && msg.type === "bot";

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
                                    {/* Avatar */}
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
                                            {msg.type === "bot" ? formatMessage(msg.content) : msg.content}
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
                        {!isLoading && (() => {
                            const askedTexts = messages
                                .filter((m) => m.type === "user")
                                .map((m) => m.content.trim().toLowerCase());
                            const remainingQuestions = QUICK_QUESTIONS.filter(
                                (q) => !askedTexts.includes(q.toLowerCase())
                            );
                            if (remainingQuestions.length === 0) return null;

                            return (
                                <div className={isExpanded ? "grid grid-cols-2 gap-2" : "flex flex-col gap-1.5"}>
                                    {remainingQuestions.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => handleSendMessage(chip)}
                                            disabled={isLoading}
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
                        {isLoading && (
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

                        <div ref={messagesEndRef} />
                    </div>

                    {/* ── Input ── */}
                    <div className={`bg-white border-t border-gray-100 ${isExpanded ? "px-3.5 py-3" : "px-2.5 py-2"}`}>
                        <div className={`flex items-center gap-1.5 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition ${isExpanded ? "px-3.5 py-2" : "px-2.5 py-1.5"}`}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message…"
                                disabled={isLoading}
                                className={`flex-1 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-50 min-w-0 ${isExpanded ? "text-[13.5px]" : "text-[12px]"}`}
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={isLoading || !input.trim()}
                                className={`rounded-md flex items-center justify-center flex-shrink-0 transition disabled:opacity-40 disabled:cursor-not-allowed ${isExpanded ? "w-7 h-7" : "w-6 h-6"}`}
                                style={{ background: "linear-gradient(135deg,#f97316,#ef4444)" }}
                                title="Send"
                            >
                                <FiSend size={isExpanded ? 13 : 11} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Toggle Button — hidden while the expanded modal is open; its own header X handles closing then ── */}
            {!expandedOpen && (
                <div className="relative flex justify-end">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        title={isOpen ? "Close chat" : "Ask Shoutly"}
                        className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full text-white font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            background: isOpen ? "#6b7280" : "linear-gradient(135deg,#f97316,#ef4444)",
                            boxShadow: isOpen ? "none" : "0 8px 24px rgba(249,115,22,0.4)",
                        }}
                    >
                        <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                            {isOpen ? (
                                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <FiX size={16} className="text-white" />
                                </span>
                            ) : (
                                <RobotLogo className="w-8 h-8" />
                            )}
                        </span>
                        <span>{isOpen ? "Close" : "Ask Shoutly"}</span>
                    </button>
                </div>
            )}
        </div>
    );
}
