"use client";
import { useRef, useState } from "react";

export default function VideoDemo() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto mb-14 sm:mb-20">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-200/30 via-transparent to-red-200/30 rounded-3xl blur-2xl pointer-events-none"></div>
            <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-orange-100 shadow-2xl shadow-orange-100/40 bg-black group">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover cursor-pointer"
                    src="videos/video.mp4"
                    onClick={toggleVideo}
                />

                {!isPlaying && (
                    <button
                        onClick={toggleVideo}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center text-xl sm:text-2xl shadow-xl">
                            ▶
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}
