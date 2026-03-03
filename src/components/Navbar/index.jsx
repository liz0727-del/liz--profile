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
            className="navbar-container"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 50,
                pointerEvents: 'auto',
                width: '100%',
                boxSizing: 'border-box'
            }}
        >
            <style>{`
                .navbar-container { padding: 24px 48px; }
                .nav-left-group { display: flex; align-items: center; gap: 32px; }
                .nav-right-group { display: flex; align-items: center; gap: 8px; }
                .nav-btn {
                    background: transparent;
                    border: none;
                    color: #1c1c1c;
                    font-family: 'Geist Mono', monospace;
                    font-size: 12px;
                    letter-spacing: 0.05em;
                    cursor: pointer;
                    padding: 0;
                    transition: opacity 0.25s ease;
                }
                .nav-btn-link {
                    text-transform: uppercase;
                    opacity: 0.7;
                }
                .nav-btn-link:hover { opacity: 1; }
                .nav-divider { color: #1c1c1c; opacity: 0.3; margin: 0 4px; font-size: 12px; }

                /* 移动端响应式压缩 */
                @media (max-width: 768px) {
                    .navbar-container { padding: 24px 20px; }
                    .nav-left-group { gap: 12px; }
                    .nav-right-group { gap: 4px; }
                    .nav-btn { font-size: 10px; }
                    .nav-divider { font-size: 10px; margin: 0 2px; }
                }
            `}</style>

            {/* 左侧：导航链接 */}
            <div className="nav-left-group">
                {navItems.map((item) => (
                    <button
                        key={item.target}
                        onClick={() => scrollTo(item.target)}
                        className="nav-btn nav-btn-link"
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* 右侧：语言切换 */}
            <div className="nav-right-group">
                <button
                    onClick={() => toggleLanguage('en')}
                    className="nav-btn"
                    style={{
                        opacity: language === 'en' ? 1 : 0.4,
                        fontWeight: language === 'en' ? 600 : 400,
                    }}
                >
                    EN
                </button>
                <span className="nav-divider">/</span>
                <button
                    onClick={() => toggleLanguage('zh')}
                    className="nav-btn"
                    style={{
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

