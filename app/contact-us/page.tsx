"use client";

import { useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

type TabId = "sales" | "support" | "partner" | "press";

interface TabConfig {
  hint: string;
  label: string;
  opts: string[];
  ph: string;
  team: string;
}

const TAB_CONFIG: Record<TabId, TabConfig> = {
  sales: {
    hint: "Looking at plans or a demo? We'll map Shoutly to your workflow.",
    label: "Company size",
    opts: ["1–10", "11–50", "51–200", "200+"],
    ph: "Which platforms do you manage, and how many accounts?",
    team: "Sales",
  },
  support: {
    hint: "Already using Shoutly? Describe the issue and we'll jump on it.",
    label: "Current plan",
    opts: ["Free trial", "Monthly", "Annual", "Agency"],
    ph: "What's happening? Include steps to reproduce if you can.",
    team: "Support",
  },
  partner: {
    hint: "Agencies & resellers — let's talk about managing clients at scale.",
    label: "Partner type",
    opts: ["Agency", "Reseller", "Affiliate", "Technology"],
    ph: "Tell us about your agency and the clients you manage.",
    team: "Partnerships",
  },
  press: {
    hint: "Media & press enquiries reach us directly.",
    label: "Outlet",
    opts: ["Publication", "Podcast", "Newsletter", "Other"],
    ph: "What's the story, and what's your deadline?",
    team: "Press",
  },
};

const TABS: { id: TabId; label: string; icon: ReactNode }[] = [
  {
    id: "sales",
    label: "Sales",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="m7 14 3-3 3 3 5-6" /></svg>
    ),
  },
  {
    id: "support",
    label: "Support",
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
    ),
  },
  {
    id: "partner",
    label: "Partners",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.8" /><path d="M16 3.1a4 4 0 0 1 0 7.7" /></svg>
    ),
  },
  {
    id: "press",
    label: "Press",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 22V4a2 2 0 0 1 2-2h9l5 5v15" /><path d="M15 2v5h5" /><path d="M8 13h8M8 17h5" /></svg>
    ),
  },
];

const COMMON_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "protonmail.com"];

function levenshtein(a: string, b: string): number {
  const m: number[][] = [];
  for (let i = 0; i <= b.length; i++) m[i] = [i];
  for (let j = 0; j <= a.length; j++) m[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      m[i][j] = b[i - 1] === a[j - 1] ? m[i - 1][j - 1] : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
    }
  }
  return m[b.length][a.length];
}

function suggestDomain(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 0) return null;
  const domain = email.slice(at + 1).toLowerCase();
  if (!domain || COMMON_DOMAINS.includes(domain)) return null;
  let best: string | null = null;
  let bestDist = 3;
  for (const d of COMMON_DOMAINS) {
    const dist = levenshtein(domain, d);
    if (dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  return best ? email.slice(0, at + 1) + best : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CHANNELS = [
  {
    href: "#form",
    icon: <svg viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="m7 14 3-3 3 3 5-6" /></svg>,
    title: "Talk to sales",
    desc: "See if Shoutly fits your workflow, get a walkthrough, or ask about plans.",
    linkLabel: "Start a conversation",
  },
  {
    href: "mailto:support@shoutlyai.com",
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>,
    title: "Get support",
    desc: "Already using Shoutly and hit a snag? We'll get you unblocked fast.",
    linkLabel: "support@shoutlyai.com",
  },
  {
    href: "#form",
    icon: <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.8" /><path d="M16 3.1a4 4 0 0 1 0 7.7" /></svg>,
    title: "Partner with us",
    desc: "Agencies and resellers managing multiple clients — let's build together.",
    linkLabel: "Explore partnerships",
  },
];

const FAQS = [
  {
    q: "How fast will I hear back?",
    a: "Usually within a few hours during business days, and rarely more than one working day. Because we're a small team, replies come from someone who actually knows the product.",
  },
  {
    q: "Do I need a credit card to try Shoutly?",
    a: "No. The 14-day trial is free and doesn't ask for card details. You only add billing when you decide to keep going.",
  },
  {
    q: "Can you help agencies managing multiple clients?",
    a: 'Yes — Shoutly is built around workspaces, so agencies can keep each client\'s accounts, content, and brand settings cleanly separated. Choose the "Partners" tab above and we\'ll walk you through it.',
  },
  {
    q: "Which platforms does Shoutly support?",
    a: "Instagram, LinkedIn, X/Twitter, Facebook, TikTok, Threads, Bluesky, YouTube, Pinterest and Google Business — scheduled from one place with your brand overlay applied automatically.",
  },
  {
    q: "I found a bug or have a feature idea — where do I send it?",
    a: 'Straight through the form with the "Support" tab, or email support@shoutlyai.com. Product feedback goes directly to the people building Shoutly.',
  },
];

export default function ContactUsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("sales");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState(TAB_CONFIG.sales.opts[0]);
  const [message, setMessage] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ sales: null, support: null, partner: null, press: null });
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const cfg = TAB_CONFIG[activeTab];

  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[activeTab];
      if (el) setPillStyle({ left: el.offsetLeft - 5, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeTab]);

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    setDetail(TAB_CONFIG[id].opts[0]);
  };

  const handleEmailBlur = () => {
    const v = email.trim();
    if (!v) {
      setEmailInvalid(false);
      setEmailSuggestion(null);
      return;
    }
    if (!EMAIL_RE.test(v)) {
      setEmailInvalid(true);
      setEmailSuggestion(null);
      return;
    }
    setEmailInvalid(false);
    setEmailSuggestion(suggestDomain(v));
  };

  const applySuggestion = () => {
    if (!emailSuggestion) return;
    setEmail(emailSuggestion);
    setEmailSuggestion(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in your name, email and message.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setEmailInvalid(true);
      return;
    }

    setStatus("loading");
    try {
      const query = `[${cfg.team} · ${cfg.label}: ${detail}]\n\n${message.trim()}`;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), query }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong sending your message. Please try again, or email hello@shoutlyai.com directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending your message. Please try again, or email hello@shoutlyai.com directly.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setName(""); setEmail(""); setPhone(""); setMessage(""); setDetail(TAB_CONFIG.sales.opts[0]);
    setActiveTab("sales");
    setEmailInvalid(false); setEmailSuggestion(null);
  };

  return (
    <div className="cu-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .cu-page{
          --orange-1:#F15A24;--orange-2:#FF7A3D;
          --ink:#16182A;--ink-2:#2A2D42;--muted:#6B7280;
          --cream:#FFF8F3;--card:#FFFFFF;--hair:#F0E6DD;--field:#FBF4EE;--red:#DC2626;
          --shadow-lg:0 30px 70px -24px rgba(241,90,36,.20), 0 10px 30px -14px rgba(22,24,42,.12);
          --shadow-sm:0 10px 30px -16px rgba(22,24,42,.18);
          --radius:22px;--maxw:1120px;
          font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--cream);line-height:1.5;
        }
        .cu-page *{box-sizing:border-box}
        .cu-page h1,.cu-page h2,.cu-page h3{font-family:'Space Grotesk',sans-serif;letter-spacing:-.02em}
        .cu-container{max-width:var(--maxw);margin:0 auto;padding:0 24px}
        .cu-hero{position:relative;overflow:hidden;padding:64px 0 40px;text-align:center}
        .cu-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(760px 320px at 50% -30%, rgba(255,122,61,.16), transparent 65%);pointer-events:none}
        .cu-eyebrow{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--hair);padding:7px 16px;border-radius:100px;font-size:12.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--orange-1);box-shadow:var(--shadow-sm)}
        .cu-eyebrow .cu-dot{width:7px;height:7px;border-radius:50%;background:var(--orange-1);box-shadow:0 0 0 4px rgba(241,90,36,.18)}
        .cu-hero h1{font-size:52px;font-weight:700;line-height:1.04;margin:24px 0 16px;position:relative}
        .cu-hero h1 .cu-accent{background:linear-gradient(120deg,var(--orange-1),var(--orange-2));-webkit-background-clip:text;background-clip:text;color:transparent}
        .cu-hero p{font-size:18px;color:var(--muted);max-width:52ch;margin:0 auto;position:relative}
        .cu-trust{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:34px;position:relative}
        .cu-chip{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--hair);border-radius:14px;padding:12px 18px;box-shadow:var(--shadow-sm)}
        .cu-chip svg{width:18px;height:18px;stroke:var(--orange-1);fill:none;stroke-width:2}
        .cu-chip b{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:14.5px}
        .cu-chip span{font-size:13px;color:var(--muted)}
        .cu-channels{padding:56px 0 8px}
        .cu-channels-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .cu-ch{background:var(--card);border:1px solid var(--hair);border-radius:18px;padding:26px 24px;transition:transform .2s,box-shadow .2s,border-color .2s;text-decoration:none;display:block}
        .cu-ch:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:transparent}
        .cu-ch .cu-ic{width:46px;height:46px;border-radius:13px;display:grid;place-items:center;margin-bottom:16px;background:linear-gradient(135deg,rgba(241,90,36,.12),rgba(255,122,61,.12))}
        .cu-ch .cu-ic svg{width:22px;height:22px;stroke:var(--orange-1);fill:none;stroke-width:2}
        .cu-ch h3{font-size:17px;font-weight:600;margin-bottom:6px}
        .cu-ch p{font-size:14px;color:var(--muted);margin-bottom:14px;line-height:1.55}
        .cu-ch .cu-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:var(--orange-1)}
        .cu-ch .cu-link svg{width:15px;height:15px;stroke:var(--orange-1);fill:none;stroke-width:2.2;transition:transform .2s}
        .cu-ch:hover .cu-link svg{transform:translateX(3px)}
        .cu-form-section{padding:56px 0;scroll-margin-top:80px}
        .cu-card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow-lg);display:grid;grid-template-columns:.82fr 1.18fr;overflow:hidden;border:1px solid var(--hair)}
        .cu-rail{position:relative;color:#fff;padding:44px 40px;overflow:hidden;display:flex;flex-direction:column;background:linear-gradient(155deg,var(--orange-1),var(--orange-2))}
        .cu-rail::after{content:"";position:absolute;right:-90px;bottom:-90px;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,.10)}
        .cu-rail::before{content:"";position:absolute;right:40px;top:-60px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.08)}
        .cu-rail .cu-eyebrow-w{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.16);padding:7px 14px;border-radius:100px;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;width:fit-content;backdrop-filter:blur(4px)}
        .cu-rail .cu-eyebrow-w .cu-dot{width:7px;height:7px;border-radius:50%;background:#fff;box-shadow:0 0 0 4px rgba(255,255,255,.25)}
        .cu-rail h2{font-weight:700;font-size:38px;line-height:1.04;margin:22px 0 14px;position:relative;z-index:1}
        .cu-rail .cu-sub{font-size:15px;line-height:1.55;color:rgba(255,255,255,.92);max-width:32ch;position:relative;z-index:1}
        .cu-promise{position:relative;z-index:1;margin-top:30px;display:flex;flex-direction:column;gap:14px}
        .cu-promise .cu-pi{display:flex;align-items:flex-start;gap:12px;font-size:14px;color:rgba(255,255,255,.95)}
        .cu-promise .cu-pi svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2;flex:0 0 20px;margin-top:1px}
        .cu-contacts{position:relative;z-index:1;margin-top:auto;padding-top:30px;display:flex;flex-direction:column;gap:15px}
        .cu-contacts a,.cu-contacts .cu-ci{display:flex;align-items:center;gap:13px;color:#fff;text-decoration:none;font-size:14px}
        .cu-contacts .cu-ic{width:36px;height:36px;border-radius:10px;flex:0 0 36px;background:rgba(255,255,255,.16);display:grid;place-items:center}
        .cu-contacts .cu-ic svg{width:17px;height:17px;stroke:#fff;fill:none;stroke-width:2}
        .cu-status{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;margin-top:22px;font-size:13px;color:rgba(255,255,255,.92)}
        .cu-status .cu-live{width:9px;height:9px;border-radius:50%;background:#7CFFB2;animation:cu-pulse 2s infinite}
        @keyframes cu-pulse{0%{box-shadow:0 0 0 0 rgba(124,255,178,.6)}70%{box-shadow:0 0 0 8px rgba(124,255,178,0)}100%{box-shadow:0 0 0 0 rgba(124,255,178,0)}}
        .cu-panel{padding:40px 44px}
        .cu-panel h3.cu-pt{font-weight:600;font-size:24px;letter-spacing:-.01em}
        .cu-panel .cu-lead{color:var(--muted);font-size:14.5px;margin:6px 0 22px}
        .cu-tabs{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;background:var(--field);border-radius:14px;padding:5px;margin-bottom:8px;border:1px solid var(--hair)}
        .cu-tab{position:relative;z-index:1;border:0;background:transparent;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;font-size:13px;color:var(--muted);padding:11px 8px;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:7px;transition:color .25s}
        .cu-tab svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2}
        .cu-tab.cu-active{color:#fff}
        .cu-tab-pill{position:absolute;top:5px;height:calc(100% - 10px);border-radius:10px;background:linear-gradient(135deg,var(--orange-1),var(--orange-2));box-shadow:0 6px 16px -6px rgba(241,90,36,.6);transition:left .32s cubic-bezier(.6,.05,.2,1),width .32s cubic-bezier(.6,.05,.2,1);z-index:0}
        .cu-tab-hint{font-size:13px;color:var(--muted);margin:12px 2px 22px;min-height:18px}
        .cu-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .cu-field{margin-bottom:16px}
        .cu-page label{display:block;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px}
        .cu-page label .cu-req{color:var(--orange-1)}.cu-page label .cu-opt{color:var(--muted);font-weight:500;text-transform:none;letter-spacing:0}
        .cu-input{position:relative;display:flex;align-items:center;background:var(--field);border:1.5px solid var(--hair);border-radius:12px;transition:border-color .2s,background .2s,box-shadow .2s}
        .cu-input:focus-within{border-color:var(--orange-1);background:#fff;box-shadow:0 0 0 4px rgba(241,90,36,.12)}
        .cu-input.cu-invalid{border-color:var(--red);box-shadow:0 0 0 4px rgba(220,38,38,.10)}
        .cu-input svg{width:18px;height:18px;margin-left:14px;stroke:var(--muted);fill:none;stroke-width:2;flex:0 0 18px}
        .cu-input input,.cu-input textarea,.cu-input select{width:100%;border:0;background:transparent;outline:0;font-family:'Inter',sans-serif;font-size:14.5px;color:var(--ink);padding:13px 14px}
        .cu-input.cu-textarea{align-items:flex-start}.cu-input textarea{resize:vertical;min-height:118px;line-height:1.5}
        .cu-input input::placeholder,.cu-input textarea::placeholder{color:#B7A99C}
        .cu-input select{cursor:pointer}
        .cu-hintline{font-size:12.5px;margin-top:7px;min-height:16px;display:flex;align-items:center;gap:6px}
        .cu-hintline.cu-err{color:var(--red)}.cu-hintline.cu-suggest{color:var(--orange-1)}
        .cu-hintline .cu-link-btn{background:none;border:0;color:var(--orange-1);font-weight:600;cursor:pointer;text-decoration:underline;font-size:12.5px;padding:0}
        .cu-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:8px;flex-wrap:wrap}
        .cu-privacy{font-size:12.5px;color:var(--muted);max-width:34ch;line-height:1.5}
        .cu-privacy a{color:var(--orange-1);text-decoration:none;font-weight:600}
        .cu-submit{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,var(--orange-1),var(--orange-2));color:#fff;border:0;cursor:pointer;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;padding:15px 26px;border-radius:13px;box-shadow:0 12px 24px -10px rgba(241,90,36,.7);transition:transform .18s,box-shadow .18s;min-width:172px;justify-content:center}
        .cu-submit:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 18px 30px -10px rgba(241,90,36,.75)}
        .cu-submit:disabled{opacity:.7;cursor:not-allowed}
        .cu-submit svg{width:18px;height:18px;stroke:#fff;fill:none;stroke-width:2.2;transition:transform .2s}
        .cu-submit:hover:not(:disabled) svg{transform:translateX(3px)}
        .cu-spinner{width:18px;height:18px;border:2.4px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:cu-spin .7s linear infinite}
        @keyframes cu-spin{to{transform:rotate(360deg)}}
        .cu-form-error{background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.2);color:var(--red);font-size:13.5px;padding:12px 14px;border-radius:11px;margin-bottom:16px}
        .cu-sent{text-align:center;padding:60px 10px;animation:cu-pop .4s ease}
        @keyframes cu-pop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
        .cu-sent .cu-check{width:66px;height:66px;margin:0 auto 18px;border-radius:50%;background:linear-gradient(135deg,var(--orange-1),var(--orange-2));display:grid;place-items:center}
        .cu-sent .cu-check svg{width:32px;height:32px;stroke:#fff;fill:none;stroke-width:3}
        .cu-sent h3{font-family:'Space Grotesk',sans-serif;font-size:23px;margin-bottom:6px}
        .cu-sent p{color:var(--muted);font-size:14.5px}
        .cu-faq{padding:20px 0 72px}
        .cu-faq-head{text-align:center;margin-bottom:36px}
        .cu-faq-head h2{font-size:34px;font-weight:700}.cu-faq-head p{color:var(--muted);font-size:16px;margin-top:8px}
        .cu-faq-list{max-width:780px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
        .cu-qa{background:var(--card);border:1px solid var(--hair);border-radius:15px;overflow:hidden;transition:box-shadow .2s}
        .cu-qa[open]{box-shadow:var(--shadow-sm)}
        .cu-qa summary{cursor:pointer;list-style:none;padding:20px 22px;display:flex;align-items:center;justify-content:space-between;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:16px}
        .cu-qa summary::-webkit-details-marker{display:none}
        .cu-qa summary .cu-plus{width:22px;height:22px;flex:0 0 22px;position:relative;transition:transform .25s}
        .cu-qa[open] summary .cu-plus{transform:rotate(45deg)}
        .cu-qa summary .cu-plus::before,.cu-qa summary .cu-plus::after{content:"";position:absolute;background:var(--orange-1);border-radius:2px}
        .cu-qa summary .cu-plus::before{left:50%;top:3px;bottom:3px;width:2px;transform:translateX(-50%)}
        .cu-qa summary .cu-plus::after{top:50%;left:3px;right:3px;height:2px;transform:translateY(-50%)}
        .cu-qa .cu-a{padding:0 22px 20px;color:var(--muted);font-size:14.5px;line-height:1.6}
        @media (max-width:900px){
          .cu-hero h1{font-size:40px}.cu-channels-grid{grid-template-columns:1fr}
          .cu-card{grid-template-columns:1fr}.cu-rail{padding:36px 30px}.cu-rail h2{font-size:32px}
          .cu-panel{padding:32px 26px}.cu-row{grid-template-columns:1fr}.cu-tab span{display:none}.cu-tab{padding:12px 6px}
        }
        @media (prefers-reduced-motion:reduce){.cu-page *{transition:none!important;animation:none!important}}
      `}</style>

      <section className="cu-hero">
        <div className="cu-container">
          <span className="cu-eyebrow"><span className="cu-dot" />Contact us</span>
          <h1>Talk to the people <span className="cu-accent">building Shoutly.</span></h1>
          <p>We&apos;re a small, focused team — so when you reach out, you hear back from someone who actually works on the product. Pick a channel below or send us a note.</p>
          <div className="cu-trust">
            <div className="cu-chip"><svg viewBox="0 0 24 24"><path d="M12 2v6l4 2" /><circle cx="12" cy="12" r="9" /></svg><b>Under a few hours</b><span>typical first reply</span></div>
            <div className="cu-chip"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg><b>Founder-led</b><span>real answers, no bots</span></div>
            <div className="cu-chip"><svg viewBox="0 0 24 24"><path d="M12 2 4 7v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7z" /></svg><b>14-day free trial</b><span>no card required</span></div>
          </div>
        </div>
      </section>

      <section className="cu-channels">
        <div className="cu-container cu-channels-grid">
          {CHANNELS.map((ch) => (
            <a key={ch.title} className="cu-ch" href={ch.href}>
              <div className="cu-ic">{ch.icon}</div>
              <h3>{ch.title}</h3>
              <p>{ch.desc}</p>
              <span className="cu-link">{ch.linkLabel} <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
            </a>
          ))}
        </div>
      </section>

      <section className="cu-form-section" id="form">
        <div className="cu-container">
          <div className="cu-card">
            <aside className="cu-rail">
              <span className="cu-eyebrow-w"><span className="cu-dot" />Get in touch</span>
              <h2>Let&apos;s grow your socials.</h2>
              <p className="cu-sub">Tell us what you need. The right person on our team replies — usually the same day.</p>
              <div className="cu-promise">
                <div className="cu-pi"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>A human reads every message.</div>
                <div className="cu-pi"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>No sales scripts — just straight answers.</div>
                <div className="cu-pi"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>Your details stay private, always.</div>
              </div>
              <div className="cu-contacts">
                <div className="cu-ci"><span className="cu-ic"><svg viewBox="0 0 24 24"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg></span>Bangalore, India</div>
                <a href="mailto:hello@shoutlyai.com"><span className="cu-ic"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg></span>hello@shoutlyai.com</a>
                <a href="tel:+919901700660"><span className="cu-ic"><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg></span>+91 99017 00660</a>
              </div>
              <span className="cu-status"><span className="cu-live" />All systems operational</span>
            </aside>

            <section className="cu-panel">
              {status === "success" ? (
                <div className="cu-sent">
                  <div className="cu-check"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></div>
                  <h3>Message on its way</h3>
                  <p>Thanks — the {cfg.team} team will get back to you shortly.</p>
                  <button type="button" onClick={resetForm} className="cu-submit" style={{ marginTop: 24 }}>Send another message</button>
                </div>
              ) : (
                <div>
                  <h3 className="cu-pt">Send us a message</h3>
                  <p className="cu-lead">Pick what this is about so it reaches the right people.</p>

                  <div className="cu-tabs" role="tablist" aria-label="What can we help with">
                    <span className="cu-tab-pill" style={{ left: pillStyle.left, width: pillStyle.width }} />
                    {TABS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        ref={(el) => { tabRefs.current[t.id] = el; }}
                        className={`cu-tab${activeTab === t.id ? " cu-active" : ""}`}
                        role="tab"
                        aria-selected={activeTab === t.id}
                        onClick={() => selectTab(t.id)}
                      >
                        {t.icon}<span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="cu-tab-hint">{cfg.hint}</p>

                  <form onSubmit={handleSubmit} noValidate>
                    {status === "error" && errorMessage && <div className="cu-form-error">{errorMessage}</div>}

                    <div className="cu-row">
                      <div className="cu-field">
                        <label>Full name <span className="cu-req">*</span></label>
                        <div className="cu-input">
                          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
                          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" autoComplete="name" required />
                        </div>
                      </div>
                      <div className="cu-field">
                        <label>Work email <span className="cu-req">*</span></label>
                        <div className={`cu-input${emailInvalid ? " cu-invalid" : ""}`}>
                          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                          <input
                            type="email" name="email" value={email}
                            onChange={(e) => { setEmail(e.target.value); if (emailInvalid) setEmailInvalid(false); }}
                            onBlur={handleEmailBlur}
                            placeholder="you@company.com" autoComplete="email" required
                          />
                        </div>
                        <div className={`cu-hintline${emailInvalid ? " cu-err" : emailSuggestion ? " cu-suggest" : ""}`}>
                          {emailInvalid && "That email doesn't look right — mind checking it?"}
                          {!emailInvalid && emailSuggestion && (
                            <>Did you mean <button type="button" className="cu-link-btn" onClick={applySuggestion}>{emailSuggestion}</button>?</>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="cu-row">
                      <div className="cu-field">
                        <label>Phone <span className="cu-opt">(optional)</span></label>
                        <div className="cu-input">
                          <svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
                          <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 00000 00000" autoComplete="tel" />
                        </div>
                      </div>
                      <div className="cu-field">
                        <label>{cfg.label}</label>
                        <div className="cu-input">
                          <svg viewBox="0 0 24 24"><path d="M3 21h18M6 21V7l6-4 6 4v14" /><path d="M10 9h.01M14 9h.01M10 13h.01M14 13h.01" /></svg>
                          <select value={detail} onChange={(e) => setDetail(e.target.value)}>
                            {cfg.opts.map((o) => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="cu-field">
                      <label>Your query <span className="cu-req">*</span></label>
                      <div className="cu-input cu-textarea">
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={cfg.ph} required />
                      </div>
                    </div>

                    <div className="cu-foot">
                      <p className="cu-privacy">By sending, you agree to our <a href="/privacy-policy">Privacy Policy</a>. No spam — just a reply.</p>
                      <button type="submit" disabled={status === "loading"} className="cu-submit">
                        {status === "loading" ? (
                          <>Sending… <span className="cu-spinner" /></>
                        ) : (
                          <>Send message <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>

      <section className="cu-faq">
        <div className="cu-container">
          <div className="cu-faq-head"><h2>Before you write</h2><p>A few things people usually ask first.</p></div>
          <div className="cu-faq-list">
            {FAQS.map((f, i) => (
              <details key={f.q} className="cu-qa" open={i === 0}>
                <summary>{f.q}<span className="cu-plus" /></summary>
                <div className="cu-a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
