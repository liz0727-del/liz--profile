import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage, t } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

// 导入 gallery 图片
import img1 from '../../assets/playground/projects/project1/gallery/IMG_9526 2_副本.JPG';
import img2 from '../../assets/playground/projects/project1/gallery/IMG_9527 2_副本.JPG';
import img3 from '../../assets/playground/projects/project1/gallery/IMG_9528 2_副本.JPG';
import img4 from '../../assets/playground/projects/project1/gallery/IMG_9532 2_副本.JPG';
import img5 from '../../assets/playground/projects/project1/gallery/IMG_9536 2_副本.JPG';
import img6 from '../../assets/playground/projects/project1/gallery/IMG_9537 2_副本.JPG';
import img7 from '../../assets/playground/projects/project1/gallery/IMG_9539 2_副本.JPG';
import img8 from '../../assets/playground/projects/project1/gallery/IMG_9541 2_副本.JPG';
import img9 from '../../assets/playground/projects/project1/gallery/IMG_9543 2_副本.JPG';
import img10 from '../../assets/playground/projects/project1/gallery/IMG_9545 2_副本.JPG';

/**
 * Project1Detail - Project 1 详情页
 * 
 * 参考: playground.nothing.tech
 * 布局: Header + 两列主内容 + Footer
 */

// 点状左箭头 SVG
const DotArrowLeft = () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path fill="currentColor" d="M6 2h2v2H6zM4 4h2v2H4zM2 6h2v4H2zM4 10h2v2H4zM6 12h2v2H6zM8 4h2v2H8zM8 10h2v2H8zM10 6h2v4h-2z" />
    </svg>
);

// 点状右箭头 SVG
const DotArrowRight = () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
        <path fill="currentColor" d="M8 2h2v2H8zM10 4h2v2h-2zM12 6h2v4h-2zM10 10h2v2h-2zM8 12h2v2H8zM6 4h2v2H6zM6 10h2v2H6zM4 6h2v4H4z" />
    </svg>
);

// 项目列表数据
const projectsList = [
    { id: 1, name: 'Project 1', link: '/detail/project/1' },
    { id: 2, name: 'Project 2', link: '/detail/project/2' },
    { id: 3, name: 'Project 3', link: '/detail/project/3' },
    { id: 4, name: 'Project 4', link: '/detail/project/4' },
    { id: 5, name: 'Project 5', link: '/detail/project/5' },
];

function Project1Detail() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    // 图片数组
    const images = [
        img1, img2, img3, img4, img5,
        img6, img7, img8, img9, img10
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoverSide, setHoverSide] = useState(null); // 'left' | 'right' | null

    // 暗黑模式状态
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 实时时间状态
    const [currentTime, setCurrentTime] = useState('');

    // 下拉菜单状态
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Gallery 画廊模态框状态
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fullscreenIndex, setFullscreenIndex] = useState(0);

    // 更新实时时间
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${year}/${month}/${day} | ${hours}:${minutes}`);
        };

        updateTime(); // 立即更新一次
        const interval = setInterval(updateTime, 1000); // 每秒更新

        return () => clearInterval(interval); // 清理定时器
    }, []);

    // 切换暗黑模式
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 页面加载时确保立即显示
    useEffect(() => {
        // 滚动到顶部
        window.scrollTo(0, 0);
        // 强制重绘
        document.body.style.opacity = '0.99';
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    }, []);

    // 切换到上一张图片
    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // 切换到下一张图片
    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // 处理图片区域点击
    const handleImageClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const isLeftHalf = x < rect.width / 2;

        if (isLeftHalf) {
            goToPrevious();
        } else {
            goToNext();
        }
    };

    // 处理鼠标移动，判断在左半边还是右半边
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const isLeftHalf = x < rect.width / 2;
        setHoverSide(isLeftHalf ? 'left' : 'right');
    };

    // 返回主页 Playground 区域
    const handleBack = () => {
        navigate('/#playground');
        // 立即跳转到 playground 区域（无滚动动画）
        setTimeout(() => {
            const playgroundSection = document.getElementById('playground');
            if (playgroundSection) {
                playgroundSection.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
        }, 100);
    };

    // 项目数据 - 根据语言切换
    const projectData = {
        title: t(translations.project1.title, language),
        description: t(translations.project1.description, language),
        location: t(translations.project1.location, language),
        completionDate: t(translations.project1.completionDate, language),
        overview: t(translations.project1.overview, language),
    };

    return (
        <div className="project1-detail min-h-screen flex flex-col" style={{
            backgroundColor: isDarkMode ? '#1C1C1C' : '#F8F8F8',
            backgroundImage: isDarkMode
                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)'
                : 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}>
            {/* ========== Header 导航栏 ========== */}
            <header
                className="flex items-center justify-between"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    backgroundColor: isDarkMode ? 'rgba(28, 28, 28, 0.8)' : 'rgba(248, 248, 248, 0.8)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: 1000
                }}
            >
                {/* 左侧: Logo 点状文字 */}
                <button
                    onClick={handleBack}
                    className="flex flex-col items-start transition-opacity duration-150 hover:opacity-70"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    aria-label="返回首页"
                >
                    <p
                        className="font-ndot uppercase"
                        style={{
                            fontSize: '16px',
                            color: isDarkMode ? '#FFFFFF' : '#1C1C1C',
                            letterSpacing: '0.05em',
                            margin: 0
                        }}
                    >
                        BACK
                    </p>
                    <p
                        style={{
                            fontSize: '16px',
                            color: isDarkMode ? '#FFFFFF' : '#1C1C1C',
                            margin: 0
                        }}
                    >
                        <span className="font-ndot">LiiiiiiiZ</span>
                        <span
                            className="font-mono"
                            style={{
                                fontSize: '10px',
                                color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                                verticalAlign: 'middle',
                                marginLeft: '4px'
                            }}
                        >
                            BATE
                        </span>
                    </p>
                </button>

                {/* 右侧: 按钮组 */}
                <div className="flex items-center">
                    {/* 主题切换按钮 */}
                    <button
                        onClick={toggleDarkMode}
                        className="inline-flex items-center justify-center h-8 px-[11px] rounded-full border transition-all duration-150"
                        style={{
                            backgroundColor: 'transparent',
                            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#E3E3E3';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        aria-label={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}
                    >
                        {/* 半黑半白圆形图标 */}
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 3 A9 9 0 0 1 12 21 Z" fill="currentColor" />
                        </svg>
                    </button>


                    {/* 作品下拉列表 */}
                    <div className="relative z-[1060]" style={{ marginLeft: '16px' }} ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="group inline-flex items-center justify-center gap-3 h-8 rounded-full shrink-0 origin-center transition-all duration-200 ease-out outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-blue-500/50"
                            style={{
                                backgroundColor: isDropdownOpen ? '#FFC700' : '#1C1C1C',
                                border: 'none',
                                paddingLeft: isDropdownOpen ? '28px' : '32px',
                                paddingRight: isDropdownOpen ? '28px' : '32px',
                                minWidth: isDropdownOpen ? '120px' : 'auto',
                            }}
                            onMouseEnter={(e) => {
                                if (!isDropdownOpen) {
                                    e.currentTarget.style.paddingLeft = '28px';
                                    e.currentTarget.style.paddingRight = '28px';
                                    e.currentTarget.style.filter = 'brightness(1.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isDropdownOpen) {
                                    e.currentTarget.style.paddingLeft = '32px';
                                    e.currentTarget.style.paddingRight = '32px';
                                    e.currentTarget.style.filter = 'brightness(1)';
                                }
                            }}
                        >
                            {isDropdownOpen ? (
                                /* 展开状态：X 关闭图标 */
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="pointer-events-none shrink-0"
                                    style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)' }}
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                /* 未点击状态：Projects 文字 + 箭头 */
                                <>
                                    <span
                                        className="text-sm font-medium whitespace-nowrap text-ellipsis"
                                        style={{ color: '#E3E3E3' }}
                                    >
                                        {t(translations.detailUI.projects, language)}
                                    </span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="pointer-events-none shrink-0"
                                        style={{ color: '#E3E3E3' }}
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </>
                            )}
                        </button>

                        {/* 下拉菜单 - 每个项目独立浮动 */}
                        {isDropdownOpen && (
                            <div
                                className="absolute z-50"
                                style={{
                                    right: '0px',
                                    left: 'auto',
                                    marginTop: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    gap: '8px',
                                }}
                            >
                                {projectsList.map((project) => (
                                    <Link
                                        key={project.id}
                                        to={project.link}
                                        className="flex items-center font-mono select-none outline-none"
                                        style={{
                                            height: '32px',
                                            padding: '6px 8px 6px 12px',
                                            gap: '12px',
                                            borderRadius: '9999px',
                                            color: isDarkMode ? '#FFFFFF' : '#1C1C1C',
                                            backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                            transition: 'all 300ms ease-out',
                                            fontSize: '14px',
                                            textDecoration: 'none',
                                            minWidth: '166px',
                                            boxSizing: 'border-box',
                                        }}
                                        onClick={() => setIsDropdownOpen(false)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.02)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                                        }}
                                    >
                                        <span>{project.name}</span>
                                        {/* 右侧点状图标 */}
                                        <span
                                            className="ml-auto"
                                            style={{
                                                color: isDarkMode ? '#6B7280' : '#9CA3AF',
                                                fontSize: '10px',
                                                letterSpacing: '2px',
                                            }}
                                        >
                                            ∴
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Focus Overlay - 模糊背景层 (移到 header 外部) */}
            {isDropdownOpen && (
                <div
                    className="fixed transition-opacity duration-300"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 999,
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.01)',
                    }}
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}

            {/* ========== 主内容区: 两列水平/响应式堆叠 布局 ========== */}
            <main className="flex-1 detail-main-container" style={{ marginTop: '64px', paddingTop: '32px', paddingBottom: '16px', paddingLeft: '32px', paddingRight: '32px' }}>
                <style>{`
                    .detail-layout-grid { display: flex; flex-direction: row; gap: 48px; }
                    .detail-image-container { height: 720px; }
                    .detail-info-container { flex: 1; margin-right: 16px; padding-left: 12px; padding-right: 12px; }
                    
                    /* 手机端挤压修复：改为上下堆排 */
                    @media (max-width: 768px) {
                        .detail-main-container {
                            padding-left: 20px !important;
                            padding-right: 20px !important;
                            padding-top: 16px !important;
                            margin-top: 56px !important;
                        }
                        .detail-layout-grid {
                            flex-direction: column !important;
                            gap: 32px !important;
                        }
                        .detail-image-container {
                            height: auto !important;
                            aspect-ratio: 4 / 3;
                        }
                        .detail-info-container {
                            margin-right: 0 !important;
                            padding-left: 4px !important;
                            padding-right: 4px !important;
                        }
                    }
                `}</style>
                <div className="max-w-6xl mx-auto">
                    {/* 响应式并排布局容器 */}
                    <div className="detail-layout-grid">

                        {/* ===== 左列: 图片轮播 ===== */}
                        <div style={{ flex: 1 }} className="flex flex-col items-center">
                            {/* 图片容器 */}
                            <div
                                className={`detail-image-container relative w-full overflow-hidden flex items-center justify-center ${hoverSide === 'left' ? 'cursor-dot-left' : hoverSide === 'right' ? 'cursor-dot-right' : ''
                                    }`}
                                style={{
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px',
                                    border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                }}
                                onClick={handleImageClick}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={() => setHoverSide(null)}
                            >
                                {/* 当前图片 */}
                                <img loading="lazy" decoding="async"
                                    src={images[currentIndex]}
                                    alt={`Project 1 - Image ${currentIndex + 1}`}
                                    className="max-w-[80%] max-h-[80%] object-contain transition-opacity duration-300"
                                />

                                {/* 左侧箭头提示 */}
                                {hoverSide === 'left' && (
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF' }}>
                                        <DotArrowLeft />
                                    </div>
                                )}

                                {/* 右侧箭头提示 */}
                                {hoverSide === 'right' && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: isDarkMode ? '#9CA3AF' : '#9CA3AF' }}>
                                        <DotArrowRight />
                                    </div>
                                )}

                                {/* 小圆点指示器 - 固定在容器内底部32px */}
                                <div
                                    className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
                                    style={{ bottom: '32px' }}
                                >
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentIndex(index);
                                            }}
                                            className="w-2 h-2 rounded-full transition-colors"
                                            style={{
                                                backgroundColor: index === currentIndex
                                                    ? (isDarkMode ? '#FFFFFF' : '#1C1C1C')
                                                    : (isDarkMode ? '#6B7280' : '#D1D5DB'),
                                                border: 'none',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ===== 右列: 信息区 ===== */}
                        <div className="detail-info-container relative z-10 flex flex-col items-center gap-8 pt-4 pb-8">
                            {/* 标题 */}
                            <h1
                                className="font-ndot text-3xl md:text-4xl text-center"
                                style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}
                            >
                                {projectData.title}
                            </h1>

                            {/* 描述 */}
                            <p
                                className="text-center font-mono text-sm leading-[1.25] tracking-[-0.28px]"
                                style={{ color: isDarkMode ? '#D1D5DB' : '#4B5563' }}
                            >
                                {projectData.description}
                            </p>

                            {/* 按钮组 */}
                            <div className="flex w-full" style={{ gap: '32px', marginTop: '32px', marginBottom: '32px', position: 'relative', zIndex: 1060 }}>
                                {/* Gallery 按钮 */}
                                <button
                                    onClick={() => setIsGalleryOpen(true)}
                                    className="flex-1 inline-flex items-center justify-between gap-3 px-6 rounded-full transition-colors hover:brightness-110"
                                    style={{
                                        backgroundColor: '#FFC700',
                                        color: '#1C1C1C',
                                        height: '32px',
                                        border: '1px solid rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    <span className="font-mono text-sm font-medium">{t(translations.detailUI.gallery, language)}</span>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </button>

                                {/* Proposal 按钮 */}
                                <button
                                    onClick={() => window.open('/pdfs/project1-proposal.pdf', '_blank')}
                                    className="flex-1 inline-flex items-center justify-between gap-3 px-6 rounded-full transition-colors hover:brightness-95"
                                    style={{
                                        backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                                        color: isDarkMode ? '#FFFFFF' : '#1C1C1C',
                                        border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                        height: '32px',
                                    }}
                                >
                                    <span className="font-mono text-sm font-medium">{t(translations.detailUI.proposal, language)}</span>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </button>
                            </div>

                            {/* 信息列表 - 增加间距 */}
                            <div className="w-full">
                                {/* Location */}
                                <div
                                    className="flex justify-between items-center"
                                    style={{ borderBottom: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`, padding: '12px 0' }}
                                >
                                    <span className="font-mono text-sm font-medium" style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}>{t(translations.detailUI.location, language)}</span>
                                    <span className="font-mono text-sm" style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}>{projectData.location}</span>
                                </div>

                                {/* Completion Date */}
                                <div
                                    className="flex justify-between items-center"
                                    style={{ borderBottom: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`, padding: '12px 0' }}
                                >
                                    <span className="font-mono text-sm font-medium" style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}>{t(translations.detailUI.completionDate, language)}</span>
                                    <span className="font-mono text-sm" style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}>{projectData.completionDate}</span>
                                </div>

                                {/* Project Overview */}
                                <div
                                    style={{ padding: '12px 0 24px 0' }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-sm font-medium" style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}>{t(translations.detailUI.projectOverview, language)}</span>
                                        <button style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}>
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="18 15 12 9 6 15" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="font-mono text-sm mt-3" style={{ color: isDarkMode ? '#6B7280' : '#9CA3AF' }}>
                                        {projectData.overview}
                                    </p>
                                </div>
                            </div>

                            {/* 免责声明 - 居中靠下 */}
                            <div className="mt-auto pt-8 flex flex-col items-center">
                                {/* 灰色分隔线 */}
                                <div
                                    style={{
                                        width: '100%',
                                        height: '1px',
                                        backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
                                        marginBottom: 0
                                    }}
                                ></div>
                                {/* 免责声明文字 */}
                                <p
                                    className="text-center text-xs font-mono"
                                    style={{
                                        color: isDarkMode ? '#6B7280' : '#9CA3AF',
                                        marginBottom: 0
                                    }}
                                >
                                    {t(translations.detailUI.disclaimer, language)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ========== Footer 页脚 ========== */}
            <footer
                className="mt-auto"
                style={{
                    backgroundColor: isDarkMode ? '#1C1C1C' : '#E3E3E3',
                    padding: '32px'
                }}
            >
                {/* 第一行: 实时时间（右上角）*/}
                <div className="flex justify-end mb-16">
                    <div
                        className="font-ndot"
                        style={{
                            fontSize: '12px',
                            color: isDarkMode ? '#FFFFFF' : '#1C1C1C'
                        }}
                    >
                        {currentTime}
                    </div>
                </div>

                {/* 第二行: See you on the canvas + 装饰圆点 */}
                <div className="flex justify-between items-center mb-16" style={{ marginTop: '200px' }}>
                    <p
                        className="font-ndot italic"
                        style={{
                            fontSize: '20px',
                            color: isDarkMode ? '#FFFFFF' : '#1C1C1C'
                        }}
                    >
                        {t(translations.detailUI.footerTagline, language)}
                    </p>
                    <div className="flex items-center gap-2">
                        <span
                            className="rounded-full"
                            style={{
                                width: '16px',
                                height: '16px',
                                backgroundColor: '#FFC700'
                            }}
                        ></span>
                        <span
                            className="rounded-full flex items-center justify-center"
                            style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: isDarkMode ? '#FFFFFF' : '#1C1C1C'
                            }}
                        >
                            <span
                                className="rounded-full"
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: isDarkMode ? '#1C1C1C' : '#FFFFFF'
                                }}
                            ></span>
                        </span>
                    </div>
                </div>

                {/* 第三行: NOTHING (R) + 社交媒体链接 */}
                <div className="flex justify-between items-end">
                    <div
                        className="font-ndot uppercase"
                        style={{
                            fontSize: '20px',
                            color: isDarkMode ? '#FFFFFF' : '#1C1C1C'
                        }}
                    >
                        NOTHING (R)
                    </div>
                    <div
                        className="flex font-ndot uppercase"
                        style={{
                            gap: '16px',
                            fontSize: '12px',
                            color: isDarkMode ? '#D1D5DB' : '#1C1C1C'
                        }}
                    >
                        <a
                            href="https://www.instagram.com/llllllleezy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            INSTAGRAM
                        </a>
                        <a
                            href="https://www.xiaohongshu.com/user/profile/67af1f37000000000e012d2e"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            XIAOHONGSHU
                        </a>
                    </div>
                </div>
            </footer>

            {/* ========== Gallery 画廊模态框 ========== */}
            {isGalleryOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 2000,
                        overflow: 'hidden',
                    }}
                >
                    {/* 模糊背景层 */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            height: '100%',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                        }}
                    />

                    {/* 关闭按钮 - 右上角 */}
                    <button
                        onClick={() => {
                            setIsGalleryOpen(false);
                            setIsFullscreen(false);
                        }}
                        className="absolute z-[2010] inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
                        style={{
                            top: '32px',
                            right: '32px',
                            height: '26px',
                            paddingLeft: '16px',
                            paddingRight: '16px',
                            borderRadius: '9999px',
                            backgroundColor: '#FFC700',
                            border: 'none',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="#4B5563"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* 返回网格按钮 - 关闭按钮左侧16px */}
                    {isFullscreen && (
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="absolute z-[2010] inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
                            style={{
                                top: '32px',
                                right: '96px',
                                height: '26px',
                                paddingLeft: '16px',
                                paddingRight: '16px',
                                borderRadius: '9999px',
                                backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                                border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="none"
                                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
                            </svg>
                        </button>
                    )}

                    {/* 根据状态显示网格视图或全屏视图 */}
                    {!isFullscreen ? (
                        /* ===== 网格视图 ===== */
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                overflowY: 'auto',
                                padding: '32px',
                                paddingTop: '80px',
                            }}
                        >
                            <div
                                className="grid"
                                style={{
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '8px',
                                }}
                            >
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setFullscreenIndex(index);
                                            setIsFullscreen(true);
                                        }}
                                        className="cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                                        style={{
                                            borderRadius: '12px',
                                        }}
                                    >
                                        <img loading="lazy" decoding="async"
                                            src={img}
                                            alt={`Gallery 图片 ${index + 1}`}
                                            className="w-full object-cover"
                                            style={{
                                                aspectRatio: '4 / 3',
                                                borderRadius: '12px',
                                                display: 'block',
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* ===== 全屏查看视图 ===== */
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {/* 左箭头 - 椭圆形 */}
                            <button
                                onClick={() => setFullscreenIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                className="absolute z-[2010] inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
                                style={{
                                    left: '32px',
                                    height: '26px',
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                    borderRadius: '9999px',
                                    backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                                    border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                }}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>

                            {/* 大图展示 - 居中 */}
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    maxWidth: 'calc(100vw - 200px)',
                                    maxHeight: 'calc(100vh - 120px)',
                                }}
                            >
                                <img loading="lazy" decoding="async"
                                    src={images[fullscreenIndex]}
                                    alt={`全屏查看 ${fullscreenIndex + 1}`}
                                    className="object-contain"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: 'calc(100vh - 120px)',
                                        borderRadius: '16px',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                    }}
                                />
                            </div>

                            {/* 右箭头 - 椭圆形 */}
                            <button
                                onClick={() => setFullscreenIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                className="absolute z-[2010] inline-flex items-center justify-center transition-all duration-200 hover:scale-105"
                                style={{
                                    right: '32px',
                                    height: '26px',
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                    borderRadius: '9999px',
                                    backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                                    border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                }}
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>

                            {/* 图片计数器 - 底部居中 */}
                            <div
                                className="absolute z-[2010] px-4 py-2 rounded-full font-mono"
                                style={{
                                    bottom: '8px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '12px',
                                    backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.9)' : 'rgba(229, 231, 235, 0.9)',
                                    color: isDarkMode ? '#9CA3AF' : '#6B7280',
                                }}
                            >
                                {fullscreenIndex + 1} / {images.length}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Project1Detail;
