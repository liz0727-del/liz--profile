import React, { useState } from 'react';
import { useLanguage, t } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';
/**
 * IntroductionSection 组件 - 自我介绍区块
 * 
 * 位于 VideoSection 之后
 * 包含：左上角个人照片卡片、中间介绍卡片、右下角 AI 对话按钮
 */
function IntroductionSection() {
    const [isAiButtonHovered, setIsAiButtonHovered] = useState(false);
    const { language } = useLanguage();

    // AI 按钮点击事件（预留给后续对话弹窗）
    const handleAiButtonClick = () => {
        console.log('AI Chat button clicked - dialog will be implemented later');
        // TODO: 打开 AI 对话弹窗
    };

    return (
        <section
            className="relative flex w-full max-w-6xl mx-auto items-center justify-center mobile-intro-container"
            style={{
                marginBottom: '224px',
                padding: '0 48px',
                boxSizing: 'border-box',
                minHeight: '500px'
            }}
        >
            {/* 左上角：个人照片卡片 */}
            <div
                className="absolute mobile-photo-card"
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
                <img loading="lazy" decoding="async"
                    src="https://liz-profile-assets.oss-cn-shenzhen.aliyuncs.com/profile.JPG"
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

            {/* 中间：白色介绍卡片 */}
            <div
                className="mobile-text-card"
                style={{
                    width: '448px',
                    maxWidth: '100%',
                    padding: '12px',
                    gap: '64px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
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
                    <p style={{ margin: 0 }}>
                        {t(translations.intro.greeting, language)}
                    </p>

                    <p style={{ marginTop: '12px', marginBottom: '12px' }}>
                        {t(translations.intro.background, language)}
                    </p>

                    <p style={{ marginTop: '12px', marginBottom: '12px' }}>
                        {t(translations.intro.exploring, language)}
                    </p>

                    <p style={{ marginTop: '12px', marginBottom: '12px' }}>
                        {t(translations.intro.archive, language)}
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
                        {t(translations.intro.label, language)}
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

            {/* 右下角：AI 对话按钮 */}
            <button
                onClick={handleAiButtonClick}
                onMouseEnter={() => setIsAiButtonHovered(true)}
                onMouseLeave={() => setIsAiButtonHovered(false)}
                className={`absolute mobile-sphere-button ${isAiButtonHovered ? 'hovered' : ''}`}
                style={{
                    right: '72px',
                    bottom: '-120px',
                    width: '240px',
                    height: '240px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    padding: 0,
                    margin: 0,
                    outline: 'none',
                    transform: isAiButtonHovered ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    zIndex: 10
                }}
            >
                <div style={{ width: '100%', height: '100%' }}>
                    <img
                        src="https://liz-profile-assets.oss-cn-shenzhen.aliyuncs.com/sphere-anim.webp"
                        alt="AI Assistant"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </button>

            {/* CSS 样式 - 仅用于移动端覆盖 */}
            <style>{`
                .mobile-sphere-button.hovered {
                    transform: scale(1.1) translateY(-5px);
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @media (max-width: 768px) {
                    .mobile-intro-container {
                        margin-bottom: 120px !important;
                        padding: 0 24px !important;
                        min-height: auto !important;
                        flex-direction: column !important;
                    }

                    .mobile-text-card {
                        width: 100% !important;
                        margin-top: 80px !important;
                        gap: 32px !important;
                        padding: 24px 16px 16px !important;
                    }

                    .mobile-photo-card {
                        width: 22vw !important;
                        height: 22vw !important;
                        max-width: 110px !important;
                        max-height: 110px !important;
                        left: 16px !important;
                        top: 20px !important;
                        border-radius: 12px !important;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
                    }

                    .mobile-sphere-button {
                        width: 22vw !important;
                        height: 22vw !important;
                        max-width: 110px !important;
                        max-height: 110px !important;
                        right: 16px !important;
                        top: 20px !important;
                        bottom: auto !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </section>
    );
}

export default IntroductionSection;
