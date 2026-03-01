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
        <nav
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 48px',
                zIndex: 50,
                fontFamily: "'Geist Mono', monospace",
                fontSize: '12px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                pointerEvents: 'auto',
            }}
        >
            {/* 左侧：导航链接 */}
            <div style={{ display: 'flex', gap: '32px' }}>
                {navItems.map((item) => (
                    <button
                        key={item.target}
                        onClick={() => scrollTo(item.target)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#1C1C1C',
                            fontFamily: "'Geist Mono', monospace",
                            fontSize: '12px',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            padding: 0,
                            opacity: 0.7,
                            transition: 'opacity 0.25s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* 右侧：语言切换 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                    onClick={() => toggleLanguage('en')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#1C1C1C',
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: '12px',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        padding: 0,
                        opacity: language === 'en' ? 1 : 0.4,
                        fontWeight: language === 'en' ? 600 : 400,
                        transition: 'opacity 0.25s ease',
                    }}
                >
                    EN
                </button>
                <span style={{ color: '#1C1C1C', opacity: 0.3 }}>/</span>
                <button
                    onClick={() => toggleLanguage('zh')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#1C1C1C',
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: '12px',
                        cursor: 'pointer',
                        padding: 0,
                        opacity: language === 'zh' ? 1 : 0.4,
                        fontWeight: language === 'zh' ? 600 : 400,
                        transition: 'opacity 0.25s ease',
                    }}
                >
                    中文
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

