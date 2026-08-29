"use client";
import { useEffect, useState } from "react";

export default function HeroCtaButtons() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(Boolean(localStorage.getItem("shoutly_token")));
    }, []);

    return (
        <>
            <style>{`
              .btn-start-now {
                background: linear-gradient(90deg, #F97316, #EF4444);
                border: 2px solid #F97316;
                color: #fff;
                transition: background .25s, color .25s, box-shadow .25s;
              }
              .btn-start-now:hover {
                background: #fff;
                color: #F97316;
                box-shadow: 0 8px 24px rgba(249,115,22,.35);
              }
              .btn-book-demo {
                background: transparent;
                border: 2px solid rgba(255,255,255,.25);
                color: #fff;
                transition: background .25s, border-color .25s, box-shadow .25s;
              }
              .btn-book-demo:hover {
                background: rgba(255,255,255,.08);
                border-color: rgba(255,255,255,.5);
              }
            `}</style>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                <button onClick={() => window.location.href = isLoggedIn ? '/dashboards' : '/sign-in'} className="btn-start-now inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base">
                    {isLoggedIn ? 'Dashboard' : 'Start Now'}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="sm:w-4 sm:h-4">
                        <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button onClick={() => window.location.href = '/shoutlyai-demo.html'} className="btn-book-demo inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base">
                    Book a Demo
                </button>
            </div>
        </>
    );
}
