import React from 'react';
import Navbar from '../Navbar';
import { useLanguage, t } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

/**
 * Hero 组件 - 首屏大标题区域（只有文字内容）
 * 
 * 视频背景已移至 HeroVideo 组件
 * 此组件只包含文字内容，z-index: 10 在最顶层
 * 顶部包含导航栏，随 Hero 一起滚走
 */
function Hero() {
    const { language } = useLanguage();

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center p-6 md:p-12 text-center">
            {/* 导航栏 - 位于 Hero 顶部，随页面滚走 */}
            <Navbar />

            <div className="w-full mx-auto space-y-8">
                {/* 大标题 */}
                <h1
                    id="hero-title"
                    className="font-ndot leading-[1.3] uppercase text-ink mix-blend-difference"
                    style={{
                        fontSize: 'clamp(60px, 10vw, 150px)',
                        letterSpacing: 'normal',
                        fontWeight: 300
                    }}
                >
                    {t(translations.hero.title, language)}
                </h1>

                {/* 副标题 */}
                <p className="font-mono text-xl md:text-3xl tracking-widest text-ink/70 mix-blend-difference">
                    {t(translations.hero.subtitle, language)}
                </p>
            </div>
        </section>
    );
}

export default Hero;

