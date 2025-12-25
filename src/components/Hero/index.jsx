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

            {/* 内容容器 - 移除最大宽度限制，让超大标题可以铺满 */}
            <div className="w-full mx-auto space-y-8">

                {/* 
                 * 大标题 - 参考 Essential.com 设置
                 * 字号: ~145px (约 10vw)
                 * letter-spacing: normal (轻盈感来自大字号)
                 * 颜色: #1C1C1C 炭黑
                 */}
                <h1
                    className="font-ndot leading-[1.3] uppercase text-ink mix-blend-difference"
                    style={{
                        fontSize: 'clamp(60px, 10vw, 150px)',
                        letterSpacing: 'normal'
                    }}
                >
                    XUELI FAN
                </h1>

                {/* 
                 * 副标题
                 * font-mono: 使用 Geist Mono 等宽字体
                 * 字号也相应增大
                 */}
                <p className="font-mono text-xl md:text-3xl tracking-widest text-ink/70 mix-blend-difference">
                    Design × Code × Vibe
                </p>

            </div>
        </section>
    );
}

export default Hero;
