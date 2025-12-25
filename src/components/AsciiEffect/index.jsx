import React, { useEffect, useRef, useState } from 'react';
import videoSrc from '../../assets/videos/01.mp4';

// ASCII 字符集：Strict User Set (:;+=zxcby)
const DENSITY_CHARS = ":;+=zxcby";

// 核心配置参数
const SETTINGS = {
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 6,
    color: 'rgb(215, 215, 215)',
};

// Import all videos
const VIDEOS = [
    videoSrc,    // 01.mp4
    new URL('../../assets/videos/02.mp4', import.meta.url).href,
    new URL('../../assets/videos/03.mp4', import.meta.url).href,
    new URL('../../assets/videos/04.mp4', import.meta.url).href
];

const AsciiEffect = () => {
    const videoRef = useRef(null);
    const textRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const sectionsRef = useRef([]);

    const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

    // Scroll listener to toggle videos based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            // Map scroll position to video index: each 100vh section corresponds to one video
            // We use Math.round to switch when > 50% into the next section
            const idx = Math.floor((scrollY + viewportHeight * 0.5) / viewportHeight);

            // Safety clamp
            const safeIdx = Math.max(0, Math.min(idx, VIDEOS.length - 1));

            if (safeIdx !== currentVideoIdx) {
                setCurrentVideoIdx(safeIdx);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentVideoIdx]);

    // Video playback and ASCII rendering
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const textDiv = textRef.current;

        if (!video || !canvas || !textDiv) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const charWidth = (SETTINGS.fontSize * 0.6) + SETTINGS.letterSpacing;
        const charHeight = SETTINGS.lineHeight;

        const processFrame = () => {
            if (video.paused || video.ended) return;

            const w = Math.floor(window.innerWidth / charWidth);
            const h = Math.floor(window.innerHeight / charHeight);

            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }

            ctx.drawImage(video, 0, 0, w, h);
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data;

            let asciiStr = "";

            for (let i = 0; i < h; i++) {
                for (let j = 0; j < w; j++) {
                    const offset = (i * w + j) * 4;
                    const r = data[offset];
                    const g = data[offset + 1];
                    const b = data[offset + 2];

                    let avg = (r * 0.299 + g * 0.587 + b * 0.114);

                    if (avg > 240) {
                        asciiStr += "&nbsp;";
                    } else {
                        const darkness = 1 - (avg / 240);
                        const boostedDarkness = Math.pow(darkness, 0.4);
                        const len = DENSITY_CHARS.length;
                        const charIdx = Math.floor(boostedDarkness * (len - 1));
                        const safeIdx = Math.max(0, Math.min(charIdx, len - 1));
                        const char = DENSITY_CHARS[safeIdx];
                        asciiStr += char === " " ? "&nbsp;" : char;
                    }
                }
                asciiStr += "\n";
            }

            textDiv.innerHTML = asciiStr;
            animationRef.current = requestAnimationFrame(processFrame);
        };

        const handlePlay = () => {
            animationRef.current = requestAnimationFrame(processFrame);
        };

        video.addEventListener('play', handlePlay);
        video.muted = true;

        // Update video source and play when currentVideoIdx changes
        video.src = VIDEOS[currentVideoIdx];
        video.load();
        video.play().catch(e => console.log("Autoplay blocked", e));

        return () => {
            video.removeEventListener('play', handlePlay);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [currentVideoIdx]);

    return (
        <>
            {/* Fixed ASCII Background */}
            <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <video
                    ref={videoRef}
                    playsInline
                    loop
                    muted
                    className="hidden"
                />
                <canvas ref={canvasRef} className="hidden" />
                <pre
                    ref={textRef}
                    aria-hidden="true"
                    className="font-mono text-[18px] leading-[18px] tracking-[6px] whitespace-pre text-center select-none"
                    style={{
                        color: SETTINGS.color,
                        marginTop: '-10px',
                        marginLeft: '-3px'
                    }}
                />
            </div>

            {/* Scrollable Trigger Sections */}
            <div className="relative z-10 pointer-events-none">
                {VIDEOS.map((_, idx) => (
                    <div
                        key={idx}
                        ref={(el) => (sectionsRef.current[idx] = el)}
                        data-video-index={idx}
                        className="h-screen"
                        style={{ minHeight: '100vh' }}
                    />
                ))}
            </div>
        </>
    );
};

export default AsciiEffect;
