import React from 'react';
import { useLanguage, t } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

/**
 * Navbar 组件 - 导航栏
 * 
 * 位于 Hero section 顶部，完全透明背景，随页面滚走
 * 左侧：Introduction | Project | Contact（锚点跳转）
 * 右侧：EN / 中文（语言切换）
 */
function Navbar() {
    const { language, toggleLanguage } = useLanguage();

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { label: t(translations.nav.introduction, language), target: 'section-introduction' },
        { label: t(translations.nav.project, language), target: 'section-project' },
        { label: t(translations.nav.contact, language), target: 'section-contact' },
    ];

    return (
        <nav className="absolute top-0 left-0 right-0 flex justify-between items-center z-50 pointer-events-auto w-full px-5 md:px-12 py-6">
            {/* 左侧：导航链接 */}
            <div className="flex items-center gap-3 md:gap-8">
                {navItems.map((item) => (
                    <button
                        key={item.target}
                        onClick={() => scrollTo(item.target)}
                        className="bg-transparent border-none text-ink cursor-pointer p-0 opacity-70 hover:opacity-100 transition-opacity duration-250 ease-in-out"
                        style={{
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: 'clamp(10px, 2.5vw, 12px)',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* 右侧：语言切换 */}
            <div className="flex items-center gap-1 md:gap-2">
                <button
                    onClick={() => toggleLanguage('en')}
                    className="bg-transparent border-none text-ink cursor-pointer p-0 transition-opacity duration-250 ease-in-out"
                    style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 'clamp(10px, 2.5vw, 12px)',
                        letterSpacing: '0.05em',
                        opacity: language === 'en' ? 1 : 0.4,
                        fontWeight: language === 'en' ? 600 : 400,
                    }}
                >
                    EN
                </button>
                <span className="text-ink opacity-30 mx-0.5 md:mx-1" style={{ fontSize: 'clamp(10px, 2.5vw, 12px)' }}>/</span>
                <button
                    onClick={() => toggleLanguage('zh')}
                    className="bg-transparent border-none text-ink cursor-pointer p-0 transition-opacity duration-250 ease-in-out"
                    style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 'clamp(10px, 2.5vw, 12px)',
                        letterSpacing: '0.05em',
                        opacity: language === 'zh' ? 1 : 0.4,
                        fontWeight: language === 'zh' ? 600 : 400,
                    }}
                >
                    中文
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

