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
        <section className="intro-section">
            {/* 左上角：个人照片卡片 */}
            <div className="photo-card">
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
            <div className="text-card">
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
                className={`sphere-button ${isAiButtonHovered ? 'hovered' : ''}`}
            >
                <div style={{ width: '100%', height: '100%' }}>
                    <img
                        src="https://liz-profile-assets.oss-cn-shenzhen.aliyuncs.com/sphere-anim.webp"
                        alt="AI Assistant"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
            </button>

            {/* CSS 样式 */}
            <style>{`
                .intro-section {
                    position: relative;
                    display: flex;
                    width: 100%;
                    max-width: 1152px;
                    margin: 0 auto 224px;
                    padding: 0 48px;
                    align-items: center;
                    justify-content: center;
                    min-height: 500px;
                    box-sizing: border-box;
                }

                .photo-card {
                    position: absolute;
                    left: 180px;
                    top: -40px;
                    width: 176px;
                    height: 176px;
                    border-radius: 20px;
                    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.20) 100%), #F2F2F2;
                    overflow: hidden;
                    z-index: 10;
                }

                .text-card {
                    width: 448px;
                    max-width: 100%;
                    padding: 12px;
                    gap: 64px;
                    background-color: #FFFFFF;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    flex-shrink: 0;
                    z-index: 5;
                }

                .sphere-button {
                    position: absolute;
                    right: 72px;
                    bottom: -120px;
                    width: 240px;
                    height: 240px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    padding: 0;
                    margin: 0;
                    outline: none;
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    z-index: 10;
                }

                .sphere-button.hovered {
                    transform: scale(1.1) translateY(-5px);
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                /* 移动端自适应 (手机端宽度通常 < 768px) */
                @media (max-width: 768px) {
                    .intro-section {
                        margin-bottom: 120px;
                        padding: 0 24px;
                        min-height: auto;
                        flex-direction: column;
                    }

                    .text-card {
                        width: 100%;
                        margin-top: 80px; /* 为上方的小组件留出空间 */
                        gap: 32px;
                        padding: 24px 16px 16px; /* 增加顶部内边距以防遮挡文字 */
                    }

                    .photo-card {
                        width: 22vw; /* 大约屏幕 1/4 */
                        height: 22vw;
                        max-width: 110px;
                        max-height: 110px;
                        left: 16px;
                        top: 20px;
                        border-radius: 12px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    }

                    .sphere-button {
                        width: 22vw; /* 大约屏幕 1/4 */
                        height: 22vw;
                        max-width: 110px;
                        max-height: 110px;
                        right: 16px;
                        top: 20px; /* 在移动端移动到右上方 */
                        bottom: auto; /* 清除底部的定位 */
                    }
                }
            `}</style>
        </section>
    );
}

export default IntroductionSection;
