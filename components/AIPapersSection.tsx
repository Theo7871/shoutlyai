"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { FaRobot, FaBrain, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AIPapersSection() {
    const aiIcons = [
        FaRobot,
        FaBrain,
        FaBolt,
        SparklesIcon,
        FaRobot,
        FaBrain,
        FaBolt,
        SparklesIcon,
        FaRobot,
        FaBrain,
        FaBolt,
        SparklesIcon,
        FaRobot,
        FaBrain,
        FaBolt,
        SparklesIcon,
    ];

    return (
        <section className="ai-section">
            <div className="ai-glow"></div>

            {/* Floating AI Icons */}
            <div className="ai-icons">
                {aiIcons.map((Icon: any, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            y: 120,
                            opacity: 0,
                            scale: 0.6,
                        }}
                        animate={{
                            y: [0, -80, 0],
                            x: [0, 60, -60, 0],
                            rotate: [0, 20, -20, 0],
                            scale: [1, 1.2, 1],
                            opacity: 1,
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            delay: i * 0.35,
                        }}
                        className="ai-icon"
                        style={{
                            top: `${5 + (i % 8) * 12}%`,
                            left: `${5 + (i % 6) * 16}%`,
                        }}
                    >
                        <Icon />
                    </motion.div>
                ))}
            </div>

            <div id="app">
                <div className="papers" style={{ ["--total" as any]: 5 }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`paper ${i === 0 ? "-rogue" : ""}`}
                            style={{ ["--i" as any]: i }}
                        >
                            <div className="segment">
                                <div className="segment">
                                    <div className="segment">
                                        <div className="segment">
                                            <div className="segment"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="shadow">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="paper-shadow"
                            style={{ ["--i" as any]: i }}
                        />
                    ))}
                </div>
            </div>

            {/* AI Sparks */}
            <div className="ai-particles">
                {[...Array(14)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{
                            y: -200,
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            delay: i * 0.4,
                        }}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <style jsx global>{`
        * {
          transform-style: preserve-3d;
          box-sizing: border-box;
        }

        .ai-section {
          width: 100%;
          min-height: 600px;
          padding: 80px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          background: linear-gradient(
            120deg,
            #ffffff,
            #e0f2fe,
            #c7d2fe,
            #a78bfa,
            #7c3aed
          );
          background-size: 300% 300%;
          animation: gradientFlow 14s ease infinite;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .ai-glow {
          position: absolute;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(124,58,237,0.25), transparent);
          filter: blur(90px);
          animation: pulseAI 6s ease-in-out infinite;
        }

        @keyframes pulseAI {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        /* Floating AI icons */
        .ai-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
.ai-icon {
  position: absolute;
  font-size: 20px; /* Larger icons */
  color: rgba(79, 70, 229, 0.65);
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 50%;
  box-shadow:
    0 20px 50px rgba(0,0,0,0.15),
    0 0 30px rgba(99,102,241,0.35);
  animation: floatDepth 10s ease-in-out infinite;
}

        /* AI particles */
        .ai-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(45deg,#6366f1,#a855f7);
        }

        #app {
          height: 70vmin;
          width: 40vmin;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateX(20vw) rotateX(-18deg) rotateY(-50deg);
          background: linear-gradient(145deg, #1e3a8a, #4f46e5);
          border-radius: 2vmin;
          perspective: 10000px;
          position: relative;
          box-shadow: 0 0 80px rgba(99, 102, 241, 0.45);
        }

        #app:hover {
          transform: translateX(20vw) rotateX(-10deg) rotateY(-40deg) scale(1.02);
          transition: 0.6s ease;
        }

        #app::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 10vmin solid white;
          border-left-width: 2vmin;
          border-right-width: 2vmin;
          background: #1e293b;
          transform: translateZ(3vmin);
        }

        #app::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: inherit;
          transform: translateZ(1.5vmin);
        }

        .papers {
          width: 30vmin;
          height: 40vmin;
          background: white;
          transform: translateZ(3vmin);
          position: relative;
        }

        .paper {
          --segments: 5;
          --segment: calc(100% / var(--segments));
          position: absolute;
          inset: 0;
          animation: ai-send 3.4s cubic-bezier(.36,.07,.25,1) infinite;
          animation-delay: calc(var(--i) * 0.55s);
        }

        @keyframes ai-send {
          0% {
            transform: translateZ(140vmax) translateY(90%) rotateX(35deg);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          85% {
            transform: translateZ(0) translateY(0) rotateX(0deg);
          }
          100% {
            transform: translateZ(-10px);
          }
        }

        .segment {
          height: 100%;
          transform-origin: top center;
          background: white;
          border-left: 1px solid rgba(0,0,0,0.15);
          border-right: 1px solid rgba(0,0,0,0.15);
          animation: curve-paper 3.4s cubic-bezier(.36,.07,.25,1) infinite;
        }

        .segment > .segment {
          position: relative;
          top: 98%;
        }

        @keyframes curve-paper {
          0%,10% { transform: rotateX(20deg); }
          90%,100% { transform: rotateX(0deg); }
        }

        .shadow {
          position: absolute;
          inset: 0;
          transform-origin: bottom center;
          transform: rotateX(90deg);
          background: #020617;
          border-radius: inherit;
        }

        .paper-shadow {
          background: #020617;
          height: 50%;
          width: 100%;
          position: absolute;
          top: calc(100% + 3vmin);
          animation: shadow-in 3.4s cubic-bezier(.36,.07,.25,1) infinite;
          animation-delay: calc(var(--i) * 0.55s);
        }

        @keyframes shadow-in {
          0%,5% {
            transform: scale(.8,1) translateY(130vmax);
          }
          100% {
            transform: scale(.8,0);
          }
        }
      `}</style>
        </section>
    );
}