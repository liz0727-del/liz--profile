import React, { useEffect, useRef } from 'react';
import videoSrc from '../../assets/videos/01.mp4';

// ASCII 字符集：Strict User Set (:;+=zxcby)
// 映射逻辑：Non-linear Weighted Ramp
// 通过加权字符串提升中间调 (zxc) 出现频率
// "bbyy" (Dark) -> "zzxxxxcc" (Mid-Emphasis) -> "++==" (Transition) -> ";;::" (Light)
const DENSITY_CHARS = ":;+=zxcby";

// 核心配置参数 (Pixel-Perfect Specs)
const SETTINGS = {
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 6,
    // 保持极淡的浅灰色，如官网所示
    color: 'rgb(215, 215, 215)',
};

const AsciiEffect = () => {
    const videoRef = useRef(null);
    const textRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const textDiv = textRef.current;

        if (!video || !canvas || !textDiv) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // 计算每个字符占据的屏幕像素宽度
        const charWidth = (SETTINGS.fontSize * 0.6) + SETTINGS.letterSpacing;
        const charHeight = SETTINGS.lineHeight;

        const processFrame = () => {
            if (video.paused || video.ended) return;

            // 1. 动态计算网格尺寸
            const w = Math.floor(window.innerWidth / charWidth);
            const h = Math.floor(window.innerHeight / charHeight);

            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }

            // 2. 绘制视频帧
            ctx.drawImage(video, 0, 0, w, h);

            // 3. 读取像素
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data;

            // 4. 构建 ASCII 字符串
            let asciiStr = "";

            // NOTE: Non-linear Weighted Ramp
            // 目标: 大幅增强中间调 (zxc) 的表现力
            // Dark (0) -> Light (255)
            // 
            // 权重分配 (总长20):
            // - 深色核心 "by": 2个字符 (10%)
            // - 中间调 "zxc": 12个字符 (60%) ← 大幅提升！
            // - 过渡 "+=": 4个字符 (20%)
            // - 浅色 ";:": 2个字符 (10%)
            //
            // 映射关系:
            // avg=0 (黑) -> RAMP[0]='b'
            // avg=120 (中间调) -> RAMP[10-12]='z/x/c' 
            // avg=240 (亮) -> RAMP[19]=':'

            const RAMP = "byzzzzxxxxcccc++==;:";
            const RAMP_LEN = RAMP.length;
            const BACKGROUND_THRESH = 240; // Above this is pure whitespace

            for (let i = 0; i < h; i++) {
                for (let j = 0; j < w; j++) {
                    const offset = (i * w + j) * 4;
                    const r = data[offset];
                    const g = data[offset + 1];
                    const b = data[offset + 2];

                    // 亮度计算
                    let avg = (r * 0.299 + g * 0.587 + b * 0.114);

                    // 阈值：大于 240 (接近纯白) 为背景
                    if (avg > 240) {
                        asciiStr += "&nbsp;";
                    } else {
                        // 统一映射逻辑 (Unified Mapping)
                        // 目标分布：
                        // 浅色区域：: ; 
                        // 中间区域：+ = z x c
                        // 深色核心：b y

                        // 归一化反转：0 (白) -> 1 (黑)
                        const darkness = 1 - (avg / 240);

                        // 0.4 的幂会让中间调更大幅度地偏向致密端 (z, x, c)
                        // 这样即使线条颜色较浅，也能显示出字母
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

            // 5. 渲染
            textDiv.innerHTML = asciiStr;

            animationRef.current = requestAnimationFrame(processFrame);
        };

        const handlePlay = () => {
            animationRef.current = requestAnimationFrame(processFrame);
        };

        video.addEventListener('play', handlePlay);
        video.muted = true;
        video.play().catch(e => console.log("Autoplay blocked", e));

        return () => {
            video.removeEventListener('play', handlePlay);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <video
                ref={videoRef}
                src={videoSrc}
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
    );
};

export default AsciiEffect;
