import React from 'react';

/**
 * IntroductionSection 组件 - 自我介绍区块
 * 
 * 位于 VideoSection 之后
 * Section: margin-bottom: 224px, padding: 0 48px
 * Card: max-w-md, bg-white, p-3, rounded-2xl, gap-16
 */
function IntroductionSection() {
    return (
        <section
            className="relative flex w-full max-w-6xl mx-auto flex-col items-center justify-center overflow-hidden"
            style={{
                marginBottom: '224px',
                padding: '0 48px',
                boxSizing: 'border-box'
            }}
        >
            {/* 白色卡片容器 - 448x416 */}
            <div
                style={{
                    width: '448px',
                    maxWidth: '100%',
                    minHeight: '416px',
                    padding: '12px',
                    gap: '64px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    flexShrink: 0
                }}
            >
                {/* 文字内容区域 */}
                <div
                    className="relative flex flex-col items-start justify-start"
                    style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#1c1c1c',
                        fontFamily: "'Geist Mono', monospace"
                    }}
                >
                    <p>
                        Personal computing is entering a new phase. Where
                        devices adapt to people, not the other way around.
                    </p>

                    <p style={{ marginTop: '20px' }}>
                        At Nothing, we're building a new kind of phone,
                        where data and design come together to create
                        experiences no lab can replicate.
                    </p>

                    <p style={{ marginTop: '20px' }}>
                        The future is software you can shape with simple
                        language, made possible only on top a powerful new
                        phone that truly knows who you are.
                    </p>

                    <p style={{ marginTop: '20px' }}>
                        This combination is the only way to make an
                        impactful OS that is just for you. Across every
                        device, we can bring this knowledge into your
                        control. This is how we move personal technology
                        forward.
                    </p>
                </div>

                {/* 底部行：INTRODUCTION 标签 + 空心圆 */}
                <div className="flex w-full flex-row items-center justify-between">
                    <span
                        style={{
                            fontSize: '9px',
                            lineHeight: '12.86px',
                            color: '#1c1c1c',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                    >
                        Introduction
                    </span>
                    {/* 空心圆圈 */}
                    <div
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            border: '1px solid #1c1c1c',
                            backgroundColor: 'transparent'
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default IntroductionSection;
