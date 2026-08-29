"use client";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroSection() {
    function SocialBubblesHero() {
        const socials = [
            "images/social/facebook1.jpg",
            "images/social/instagram1.jpg",
            "images/social/linkedin1.jpg",
            "images/social/x.png",
            "images/social/tiktok1.png",
            "images/social/youtube.png",
            "images/social/telegram.png",
            "images/social/pinterest.png",
            "images/social/snapchat.jpg",
            "images/social/whatsapp.png",
        ];

        const bubbles = new Array(20).fill(0);

        return (
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
                {bubbles.map((_, i) => {
                    const icon = socials[i % socials.length];

                    return (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${40 + Math.random() * 20}%`, // centered around text
                                top: `${30 + Math.random() * 30}%`,
                            }}
                            initial={{
                                x: 0,
                                y: 0,
                                opacity: 0,
                                scale: 0.7,
                            }}
                            animate={{
                                x: [
                                    0,
                                    -60 + Math.random() * 120,
                                    0,
                                ],
                                y: [
                                    0,
                                    -80 + Math.random() * 160,
                                    0,
                                ],
                                opacity: [0.25, 0.9, 0.25],
                                scale: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 12 + Math.random() * 6,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white shadow-lg border flex items-center justify-center">
                                <img
                                    src={icon}
                                    className="w-5 h-5 md:w-7 md:h-7 object-contain"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        );
    }
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.25 } },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    useEffect(() => {
        if (typeof window === "undefined") return; // SSR safety

        const canvas = canvasRef.current;
        if (!canvas) return; // canvas must exist

        const ctx = canvas.getContext("2d");
        if (!ctx) return; // ctx must exist

        const DPR = window.devicePixelRatio || 1;

        // Images
        const logo = new Image();
        logo.src = "/images/logo.png";


        const icons: Record<string, HTMLImageElement> = {
            facebook: new Image(),
            instagram: new Image(),
            linkedin: new Image(),
            x: new Image(),
            tiktok: new Image(),
        };

        icons.facebook.src = "images/social/facebook1.jpg";
        icons.instagram.src = "images/social/instagram1.jpg";
        icons.linkedin.src = "images/social/linkedin1.jpg";
        icons.x.src = "images/social/x.png";
        icons.tiktok.src = "images/social/tiktok1.png";

        let AI: any,
            PLATFORMS: any[] = [],
            ORBIT_ICONS: any[] = [],
            dots: any[] = [],
            uid = 0,
            lastSpawn = 0,
            animationId: number;

        function buildLayout() {
            const vw = window.innerWidth;
            const vh = window.innerHeight * 0.55;
            const cy = vh / 2;

            AI = { x: vw * 0.15, y: cy, label: "ShoutlyAI", color: "#00d4ff", r: 50 };

            PLATFORMS = [
                { x: vw * 0.85, y: vh * 0.1, type: "facebook", color: "#1877F2", r: 27 },
                { x: vw * 0.85, y: vh * 0.3, type: "instagram", color: "#E1306C", r: 27 },
                { x: vw * 0.85, y: vh * 0.5, type: "linkedin", color: "#0A66C2", r: 27 },
                { x: vw * 0.85, y: vh * 0.7, type: "x", color: "#111111", r: 27 },
                { x: vw * 0.85, y: vh * 0.89, type: "tiktok", color: "#FF0050", r: 27 },
            ];

            const orbitRadius = 120;
            ORBIT_ICONS = [
                { type: "facebook", angle: 0, speed: 0.02 },
                { type: "instagram", angle: 1.2, speed: 0.018 },
                { type: "linkedin", angle: 2.4, speed: 0.016 },
                { type: "x", angle: 3.6, speed: 0.019 },
                { type: "tiktok", angle: 4.8, speed: 0.017 },
            ].map((icon) => ({
                ...icon,
                orbit: orbitRadius,
                r: 18,
                color: "#ffffff",
                x: AI.x,
                y: AI.y,
            }));
        }

        function resize() {
            if (!canvas || !ctx) return; // double-check safety
            const h = window.innerHeight * 0.55;
            canvas.width = window.innerWidth * DPR;
            canvas.height = h * DPR;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = h + "px";
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            buildLayout();
        }

        function drawNode(n: any) {
            if (!ctx || !n) return;
            const floatY = n.y + Math.sin(performance.now() * 0.001 + n.x) * 6;
            ctx.beginPath();
            ctx.arc(n.x, floatY, n.r, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = n.color;
            ctx.stroke();
            ctx.shadowBlur = 30;
            ctx.shadowColor = n.color;
            ctx.stroke();
            ctx.shadowBlur = 0;

            if (n.label === "ShoutlyAI" && logo.complete) {
                ctx.drawImage(logo, n.x - n.r, floatY - n.r, n.r * 2, n.r * 2);
            } else if (n.type && icons[n.type] && icons[n.type].complete) {
                const size = n.r * 1.2;
                ctx.drawImage(icons[n.type], n.x - size / 2, floatY - size / 2, size, size);
            }
        }
        function draw(ts: number) {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn dots periodically
            if (ts - lastSpawn > 600) {
                for (let i = 0; i < 20; i++) {
                    const target = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
                    dots.push({
                        id: uid++,
                        from: AI,
                        to: target,
                        t: 0,
                        speed: 0.012 + Math.random() * 0.015,
                        color: target.color,
                        size: 3 + Math.random() * 3,
                    });
                }
                lastSpawn = ts;
            }

            // Draw dots
            for (let i = dots.length - 1; i >= 0; i--) {
                const d = dots[i];
                d.t += d.speed;
                const mx = (d.from.x + d.to.x) / 2;
                const my = (d.from.y + d.to.y) / 2 - 80;
                const m = 1 - d.t;
                const pos = {
                    x: m * m * d.from.x + 2 * m * d.t * mx + d.t * d.t * d.to.x,
                    y: m * m * d.from.y + 2 * m * d.t * my + d.t * d.t * d.to.y,
                };
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, d.size, 0, Math.PI * 2);
                ctx.fillStyle = d.color;
                ctx.fill();
                if (d.t >= 1) dots.splice(i, 1);
            }

            // Draw center AI node
            drawNode(AI);

            // Animate orbit icons
            ORBIT_ICONS.forEach((icon) => {
                icon.angle += icon.speed;
                icon.x = AI.x + Math.cos(icon.angle) * icon.orbit;
                icon.y = AI.y + Math.sin(icon.angle) * icon.orbit;
                drawNode(icon);
            });

            // Draw platform nodes
            PLATFORMS.forEach(drawNode);

            // Next frame
            animationId = requestAnimationFrame(draw);
        }

        const allImages = [logo, ...Object.values(icons)];
        let loaded = 0;

        function checkStart() {
            loaded++;
            if (loaded === allImages.length) {
                resize();
                window.addEventListener("resize", resize);
                requestAnimationFrame(draw);
            }
        }

        allImages.forEach((img) => {
            if (img.complete) {
                checkStart(); // already loaded (production case)
            } else {
                img.onload = checkStart;
                img.onerror = checkStart;
            }
        });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);
    function FloatingSocials() {
        const socials = [
            "images/social/facebook1.jpg",
            "images/social/instagram1.jpg",
            "images/social/linkedin1.jpg",
            "images/social/x.png",
            "images/social/tiktok1.png",
        ];

        const bubbles = new Array(18).fill(0);

        return (
            <>
                {bubbles.map((_, i) => {
                    const icon = socials[i % socials.length];

                    return (
                        <motion.div
                            key={i}
                            initial={{
                                x: 0,
                                y: 0,
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                x: [0, -70 - Math.random() * 360], // move LEFT
                                y: [
                                    0,
                                    -50 + Math.random() * 360, // up and down
                                ],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 10 + Math.random() * 6, // slower
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.4,
                            }}
                            className="absolute left-32 top-1/2"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center">
                                <img src={icon} className="w-8 h-8 object-contain" />
                            </div>
                        </motion.div>
                    );
                })}
            </>
        );
    }
    function PlatformBubble({ src, top }: any) {
        return (
            <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ top }}
                className="absolute right-16 w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center"
            >
                <img src={src} className="w-8 h-8 object-contain" />
            </motion.div>
        );
    }
    function Particles() {
        const particles = new Array(60).fill(0);

        return (
            <>
                {particles.map((_, i) => {
                    const yTarget = -200 + Math.random() * 400;

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-2.5 h-2.5 rounded-full"
                            style={{
                                background: "#4f46e5",
                                left: "120px",
                                top: "50%",
                            }}
                            initial={{
                                x: 0,
                                y: 0,
                                opacity: 0,
                            }}
                            animate={{
                                x: 700,
                                y: yTarget,
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.06,
                                ease: "easeOut",
                            }}
                        />
                    );
                })}
            </>
        );
    }
    return (
        <header className="w-full bg-white overflow-hidden">
            {/* Content Section */}
            <div className="relative max-w-5xl mx-auto text-center px-6 py-16 overflow-hidden">
                <SocialBubblesHero />
                <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative z-10 inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/70 backdrop-blur-md text-blue-600 text-[10px] uppercase tracking-widest mb-10 border border-blue-200 shadow-md"
                    style={{ fontFamily: "Arial", fontWeight: 600 }}
                >
                    <SparklesIcon className="w-4 h-4 text-blue-600 animate-pulse" />
                    AI-Powered Content Generation
                </motion.span>

                <motion.div variants={container} initial="hidden" animate="show">
                    <motion.h1
                        variants={item}
                        className="text-xl sm:text-xl md:text-xl lg:text-3xl font-normal mb-8 leading-tight"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-700">
                            Generate{" "}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">
                            365 Days{" "}
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-black">
                            of Social Content, Brand
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-black">
                            Designs, Reels & Hashtags — in Minutes.
                        </span>
                    </motion.h1>

                    <motion.div
                        variants={item}
                        className="text-lg md:text-xl text-black mb-10 max-w-2xl mx-auto leading-relaxed space-y-3"
                    >
                        <p>
                            Upload your logo → Enter one prompt → Get 365 days of AI-built content
                        </p>
                        <p className="text-blue-600">
                            Images • Reels • Captions • Hashtags • Auto Scheduling
                        </p>
                    </motion.div>

                    <motion.div variants={item} className="flex justify-center gap-4 flex-wrap">
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            className="px-6 py-3 rounded-full bg-black text-white font-medium transition shadow-lg"
                        >
                            Try Free
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            className="px-6 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
                        >
                            Watch Demo
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Canvas Animation */}
            {/* New Social Orbit Animation */}
            <div className="relative w-full h-[55vh] overflow-hidden">

                {/* Center AI Logo */}

                {/* AI Logo (Left Side) */}
                <div className="absolute left-20 top-1/2 -translate-y-1/2 z-20">
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-24 h-24 rounded-full bg-white shadow-xl border flex items-center justify-center"
                    >
                        <img src="/images/logo.png" className="w-20 h-20 object-contain" />
                    </motion.div>
                </div>
                {/* Orbit Icons */}
                <FloatingSocials />

                {/* Platform Targets */}
                <PlatformBubble src="images/social/facebook1.jpg" top="10%" />
                <PlatformBubble src="images/social/instagram1.jpg" top="30%" />
                <PlatformBubble src="images/social/linkedin1.jpg" top="50%" />
                <PlatformBubble src="images/social/x.png" top="70%" />
                <PlatformBubble src="images/social/tiktok1.png" top="88%" />

                {/* Moving Particles */}
                <Particles />
            </div>
        </header>
    );
}