import React, { useEffect, useRef, useState } from 'react';
import videoSrc from '../../assets/videos/01.mp4';

// ASCII 字符集：从最密到空格 (暗部聚集→亮部扩散)
// 聚集部分: xyz (3份) | 扩散部分: =+-;:,. (7份) = 7:3 比例
const DENSITY_CHARS = "xyz=+-;:,. ".split("");

// 用于闪烁动画的随机字符
const SPARKLE_CHARS = "?!zxy#$".split("");

// 核心配置参数
const SETTINGS = {
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 6,
    color: 'rgb(215, 215, 215)',
};

// 鼠标互动配置
const MOUSE_CONFIG = {
    radius: 6,           // 激活半径（字符数）
    probability: 0.05,   // 5% 的字符被激活
    duration: 500,       // 动画持续时间 (ms)
};

// Import all videos
const VIDEOS = [
    videoSrc,    // 01.mp4
    new URL('../../assets/videos/02.mp4', import.meta.url).href,
    new URL('../../assets/videos/03.mp4', import.meta.url).href,
    new URL('../../assets/videos/04.mp4', import.meta.url).href,
    new URL('../../assets/videos/05.mp4', import.meta.url).href
];

const AsciiEffect = ({ children, videoBackground }) => {
    const videoRef = useRef(null);
    const textRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const sectionsRef = useRef([]);

    // 激活的单元格: Map<"x,y" => { startTime, randomChars }>
    const activeCellsRef = useRef(new Map());
    // 鼠标位置（网格坐标）
    const mouseGridRef = useRef({ x: -1, y: -1 });

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

    // 鼠标互动监听器
    useEffect(() => {
        const charWidth = (SETTINGS.fontSize * 0.6) + SETTINGS.letterSpacing;
        const charHeight = SETTINGS.lineHeight;

        const handleMouseMove = (e) => {
            // 将像素坐标转换为网格坐标
            const gridX = Math.floor(e.clientX / charWidth);
            const gridY = Math.floor(e.clientY / charHeight);

            const prevX = mouseGridRef.current.x;
            const prevY = mouseGridRef.current.y;

            // 只有当鼠标移动到新的网格位置时才处理
            if (gridX === prevX && gridY === prevY) return;

            mouseGridRef.current = { x: gridX, y: gridY };

            const now = performance.now();
            const activeCells = activeCellsRef.current;

            // 在鼠标周围的圆形区域内激活字符
            const radius = MOUSE_CONFIG.radius;
            for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                    // 检查是否在圆形区域内
                    if (dx * dx + dy * dy > radius * radius) continue;

                    // 只有约5%的字符被激活
                    if (Math.random() > MOUSE_CONFIG.probability) continue;

                    const cellX = gridX + dx;
                    const cellY = gridY + dy;
                    const key = `${cellX},${cellY}`;

                    // 如果这个格子还没被激活，或者之前的动画已经结束
                    if (!activeCells.has(key)) {
                        // 生成这个格子的随机闪烁字符序列 (3-5个)
                        const numChars = 3 + Math.floor(Math.random() * 3);
                        const randomChars = [];
                        for (let i = 0; i < numChars; i++) {
                            randomChars.push(SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)]);
                        }

                        activeCells.set(key, {
                            startTime: now,
                            randomChars: randomChars
                        });
                    }
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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

            const w = Math.ceil(window.innerWidth / charWidth) + 1;
            const h = Math.ceil(window.innerHeight / charHeight) + 1;

            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }

            ctx.drawImage(video, 0, 0, w, h);
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data;

            let asciiStr = "";
            const now = performance.now();
            const activeCells = activeCellsRef.current;

            // 清理已过期的激活单元格
            for (const [key, cell] of activeCells.entries()) {
                if (now - cell.startTime > MOUSE_CONFIG.duration) {
                    activeCells.delete(key);
                }
            }

            for (let i = 0; i < h; i++) {
                for (let j = 0; j < w; j++) {
                    const key = `${j},${i}`;
                    const activeCell = activeCells.get(key);

                    // 如果这个格子被激活，显示闪烁动画
                    if (activeCell) {
                        const elapsed = now - activeCell.startTime;
                        const progress = elapsed / MOUSE_CONFIG.duration;

                        if (progress < 1) {
                            // 根据进度选择随机字符序列中的一个字符
                            const charIndex = Math.floor(progress * activeCell.randomChars.length);
                            const safeCharIdx = Math.min(charIndex, activeCell.randomChars.length - 1);
                            const sparkleChar = activeCell.randomChars[safeCharIdx];
                            asciiStr += sparkleChar === " " ? "&nbsp;" : sparkleChar;
                            continue;
                        }
                    }

                    // 正常渲染：基于视频亮度选择字符
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
            {/* 层级结构 (从底到顶):
             * 1. 视频背景层 - z-index: 1 (随页面滚动)
             * 2. ASCII 动效层 - z-index: 5 (固定在屏幕)
             * 3. 内容文字层 - z-index: 10 (随页面滚动)
             */}

            {/* Layer 1: 视频背景层 - z-index: 1 */}
            <div className="relative" style={{ zIndex: 1 }}>
                {videoBackground}
            </div>

            {/* Layer 2: Fixed ASCII Background - z-index: 5 */}
            <div className="fixed inset-0 pointer-events-none flex items-start justify-start overflow-hidden" style={{ zIndex: 5 }}>
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
                    className="font-mono text-[18px] leading-[18px] tracking-[6px] whitespace-pre select-none"
                    style={{
                        color: SETTINGS.color,
                        margin: 0,
                        padding: 0
                    }}
                />
            </div>

            {/* Layer 3: 内容层 - z-index: 10 */}
            <div className="relative" style={{ zIndex: 10 }}>
                {children}
            </div>
        </>
    );
};

export default AsciiEffect;
