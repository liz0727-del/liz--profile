import React from 'react';

/**
 * Hero 组件 - 首屏大标题区域
 * 
 * 设计规范:
 * - 全屏高度，内容垂直+水平居中
 * - 大标题: Ndot 字体, 60px(桌面) / 32px(移动)
 * - 副标题: Geist Mono 字体, 24px
 * - 颜色: 炭黑 #1C1C1C
 */
function Hero() {
    return (
        // 全屏容器: min-h-screen 确保至少占满一屏
        // flex + items-center + justify-center 实现垂直+水平居中
        <section className="min-h-screen flex flex-col justify-center items-center p-6 md:p-12 text-center">

            {/* 内容容器 - 限制最大宽度，增加可读性 */}
            <div className="max-w-4xl mx-auto space-y-8">

                {/* 
         * 大标题
         * font-ndot: 使用 Ndot 点阵字体
         * text-3xl md:text-6xl: 响应式字号 (移动端 30px, 桌面端 60px)
         * tracking-tight: 字间距紧凑
         * leading-[1.3]: 行高 130%
         * uppercase: 全大写
         * text-ink: 使用我们定义的炭黑色
         * mix-blend-difference: 与背景混合，确保在 ASCII 背景上可见
         */}
                <h1 className="font-ndot text-3xl md:text-6xl tracking-tight leading-[1.3] uppercase text-ink mix-blend-difference">
                    XUELI FAN
                </h1>

                {/* 
         * 副标题
         * font-mono: 使用 Geist Mono 等宽字体
         * text-lg md:text-2xl: 响应式字号
         * tracking-widest: 字间距宽松，增加呼吸感
         * text-ink/70: 炭黑色 70% 透明度，形成层次
         */}
                <p className="font-mono text-lg md:text-2xl tracking-widest text-ink/70 mix-blend-difference">
                    Design × Code × Vibe
                </p>

            </div>
        </section>
    );
}

export default Hero;
