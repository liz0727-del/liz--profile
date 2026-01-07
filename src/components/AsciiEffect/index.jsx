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
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
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
    const samplingCanvasRef = useRef(null);  // 用于采样视频帧
    const displayCanvasRef = useRef(null);   // 用于显示 ASCII 字符
    const animationRef = useRef(null);

    // 激活的单元格: Map<"x,y" => { startTime, randomChars }>
    const activeCellsRef = useRef(new Map());
    // 鼠标位置（网格坐标）
    const mouseGridRef = useRef({ x: -1, y: -1 });

    const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

    // 计算字符尺寸
    const charWidth = (SETTINGS.fontSize * 0.6) + SETTINGS.letterSpacing;
    const charHeight = SETTINGS.lineHeight;

    // Scroll listener to toggle videos based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const idx = Math.floor((scrollY + viewportHeight * 0.5) / viewportHeight);
            const safeIdx = Math.max(0, Math.min(idx, VIDEOS.length - 1));

            if (safeIdx !== currentVideoIdx) {
                setCurrentVideoIdx(safeIdx);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentVideoIdx]);

    // 鼠标互动监听器
    useEffect(() => {
        const handleMouseMove = (e) => {
            const gridX = Math.floor(e.clientX / charWidth);
            const gridY = Math.floor(e.clientY / charHeight);

            const prevX = mouseGridRef.current.x;
            const prevY = mouseGridRef.current.y;

            if (gridX === prevX && gridY === prevY) return;

            mouseGridRef.current = { x: gridX, y: gridY };

            const now = performance.now();
            const activeCells = activeCellsRef.current;

            const radius = MOUSE_CONFIG.radius;
            for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                    if (dx * dx + dy * dy > radius * radius) continue;
                    if (Math.random() > MOUSE_CONFIG.probability) continue;

                    const cellX = gridX + dx;
                    const cellY = gridY + dy;
                    const key = `${cellX},${cellY}`;

                    if (!activeCells.has(key)) {
                        const numChars = 3 + Math.floor(Math.random() * 3);
                        const randomChars = [];
                        for (let i = 0; i < numChars; i++) {
                            randomChars.push(SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)]);
                        }
                        activeCells.set(key, { startTime: now, randomChars });
                    }
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [charWidth, charHeight]);

    // Video playback and Canvas-based ASCII rendering
    useEffect(() => {
        const video = videoRef.current;
        const samplingCanvas = samplingCanvasRef.current;
        const displayCanvas = displayCanvasRef.current;

        if (!video || !samplingCanvas || !displayCanvas) return;

        const samplingCtx = samplingCanvas.getContext('2d', { willReadFrequently: true });
        const displayCtx = displayCanvas.getContext('2d', { alpha: true });

        // 设置显示 Canvas 的字体
        displayCtx.font = `${SETTINGS.fontSize}px ${SETTINGS.fontFamily}`;
        displayCtx.textBaseline = 'top';
        displayCtx.fillStyle = SETTINGS.color;

        const processFrame = () => {
            if (video.paused || video.ended) return;

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // 计算网格尺寸
            const gridW = Math.ceil(screenWidth / charWidth) + 1;
            const gridH = Math.ceil(screenHeight / charHeight) + 1;

            // 更新采样 Canvas 尺寸
            if (samplingCanvas.width !== gridW || samplingCanvas.height !== gridH) {
                samplingCanvas.width = gridW;
                samplingCanvas.height = gridH;
            }

            // 更新显示 Canvas 尺寸
            if (displayCanvas.width !== screenWidth || displayCanvas.height !== screenHeight) {
                displayCanvas.width = screenWidth;
                displayCanvas.height = screenHeight;
                // 重新设置字体（Canvas 尺寸改变后需要重设）
                displayCtx.font = `${SETTINGS.fontSize}px ${SETTINGS.fontFamily}`;
                displayCtx.textBaseline = 'top';
                displayCtx.fillStyle = SETTINGS.color;
            }

            // 采样视频帧
            samplingCtx.drawImage(video, 0, 0, gridW, gridH);
            const imageData = samplingCtx.getImageData(0, 0, gridW, gridH);
            const data = imageData.data;

            // 清空显示 Canvas
            displayCtx.clearRect(0, 0, screenWidth, screenHeight);

            const now = performance.now();
            const activeCells = activeCellsRef.current;

            // 清理已过期的激活单元格
            for (const [key, cell] of activeCells.entries()) {
                if (now - cell.startTime > MOUSE_CONFIG.duration) {
                    activeCells.delete(key);
                }
            }

            // 遍历网格绘制字符
            for (let i = 0; i < gridH; i++) {
                for (let j = 0; j < gridW; j++) {
                    const key = `${j},${i}`;
                    const activeCell = activeCells.get(key);
                    let char;

                    // 如果这个格子被激活，显示闪烁动画
                    if (activeCell) {
                        const elapsed = now - activeCell.startTime;
                        const progress = elapsed / MOUSE_CONFIG.duration;

                        if (progress < 1) {
                            const charIndex = Math.floor(progress * activeCell.randomChars.length);
                            const safeCharIdx = Math.min(charIndex, activeCell.randomChars.length - 1);
                            char = activeCell.randomChars[safeCharIdx];
                        }
                    }

                    // 如果没有激活字符，基于视频亮度选择字符
                    if (!char) {
                        const offset = (i * gridW + j) * 4;
                        const r = data[offset];
                        const g = data[offset + 1];
                        const b = data[offset + 2];

                        const avg = (r * 0.299 + g * 0.587 + b * 0.114);

                        if (avg > 240) {
                            char = ' ';
                        } else {
                            const darkness = 1 - (avg / 240);
                            const boostedDarkness = Math.pow(darkness, 0.4);
                            const len = DENSITY_CHARS.length;
                            const charIdx = Math.floor(boostedDarkness * (len - 1));
                            const safeIdx = Math.max(0, Math.min(charIdx, len - 1));
                            char = DENSITY_CHARS[safeIdx];
                        }
                    }

                    // 只绘制非空格字符
                    if (char && char !== ' ') {
                        const x = j * charWidth;
                        const y = i * charHeight;
                        displayCtx.fillText(char, x, y);
                    }
                }
            }

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
    }, [currentVideoIdx, charWidth, charHeight]);

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
            {/* 使用 will-change 和 transform 启用硬件加速 */}
            <div
                className="fixed inset-0 pointer-events-none overflow-hidden"
                style={{
                    zIndex: 5,
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
            >
                {/* 隐藏的视频元素用于采样 */}
                <video
                    ref={videoRef}
                    playsInline
                    loop
                    muted
                    className="hidden"
                />
                {/* 隐藏的采样 Canvas */}
                <canvas ref={samplingCanvasRef} className="hidden" />
                {/* 显示 ASCII 字符的 Canvas */}
                <canvas
                    ref={displayCanvasRef}
                    aria-hidden="true"
                    style={{
                        width: '100%',
                        height: '100%',
                        willChange: 'transform',
                        transform: 'translateZ(0)',
                    }}
                />
            </div>

            {/* Layer 3: 内容层 - z-index: 10 */}
            <div
                className="relative"
                style={{
                    zIndex: 10,
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
            >
                {children}
            </div>
        </>
    );
};

export default AsciiEffect;
