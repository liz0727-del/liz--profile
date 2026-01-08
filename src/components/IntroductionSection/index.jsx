import React, { useState } from 'react';

/**
 * IntroductionSection 组件 - 自我介绍区块
 * 
 * 位于 VideoSection 之后
 * 包含：左上角个人照片卡片、中间介绍卡片、右下角 AI 对话按钮
 */
function IntroductionSection() {
    const [isAiButtonHovered, setIsAiButtonHovered] = useState(false);

    // AI 按钮点击事件（预留给后续对话弹窗）
    const handleAiButtonClick = () => {
        console.log('AI Chat button clicked - dialog will be implemented later');
        // TODO: 打开 AI 对话弹窗
    };

    return (
        <section
            className="relative flex w-full max-w-6xl mx-auto items-center justify-center"
            style={{
                marginBottom: '224px',
                padding: '0 48px',
                boxSizing: 'border-box',
                minHeight: '500px'
            }}
        >
            {/* 左上角：个人照片卡片 - 与视频播放器左边缘对齐 */}
            {/* 视频初始宽度 972px，容器 max-w-6xl = 1152px，居中后左边距 = (1152-972)/2 = 90px */}
            <div
                className="absolute"
                style={{
                    left: '180px',
                    top: '-40px',
                    width: '176px',
                    height: '176px',
                    borderRadius: '20px',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.20) 100%), #F2F2F2',
                    overflow: 'hidden',
                    zIndex: 10
                }}
            >
                {/* 照片 */}
                <img
                    src="/images/profile.JPG"
                    alt="Profile"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top'
                    }}
                />

                {/* 左上角装饰：人形图标 */}
                <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px'
                    }}
                >
                    <circle cx="8" cy="3" r="2.5" stroke="white" strokeWidth="1" fill="none" />
                    <path d="M3 11C3 8 5 6 8 6C11 6 13 8 13 11" stroke="white" strokeWidth="1" fill="none" />
                </svg>

                {/* 左下角装饰：温度标签 */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'white',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}
                >
                    16°
                </div>

                {/* 右边缘：状态指示点 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '6px',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px'
                    }}
                >
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: i === 2 ? 'white' : 'rgba(255,255,255,0.4)'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* 中间：白色介绍卡片 - 448x416 */}
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
                    flexShrink: 0,
                    zIndex: 5
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

            {/* 右下角：AI 对话按钮 - 彩色渐变球体 */}
            <button
                onClick={handleAiButtonClick}
                onMouseEnter={() => setIsAiButtonHovered(true)}
                onMouseLeave={() => setIsAiButtonHovered(false)}
                className="absolute"
                style={{
                    right: '48px',
                    bottom: '-60px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'radial-gradient(circle at 30% 30%, #60A5FA 0%, #3B82F6 30%, #1D4ED8 60%, #1E3A8A 100%)',
                    boxShadow: isAiButtonHovered
                        ? '0 20px 60px rgba(59, 130, 246, 0.5), inset 0 -20px 40px rgba(250, 204, 21, 0.4)'
                        : '0 10px 40px rgba(59, 130, 246, 0.3), inset 0 -20px 40px rgba(250, 204, 21, 0.3)',
                    transform: isAiButtonHovered ? 'scale(1.08) translateY(-5px)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    zIndex: 10,
                    overflow: 'hidden'
                }}
            >
                {/* 黄色光斑效果 */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '15%',
                        right: '20%',
                        width: '50%',
                        height: '50%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(250, 204, 21, 0.8) 0%, rgba(250, 204, 21, 0) 70%)',
                        filter: 'blur(8px)'
                    }}
                />
                {/* 高光效果 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '20%',
                        width: '30%',
                        height: '20%',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.4)',
                        filter: 'blur(6px)'
                    }}
                />
            </button>

            {/* CSS 动画 - 浮动效果 */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </section>
    );
}

export default IntroductionSection;
