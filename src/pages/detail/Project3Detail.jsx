import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 导入图片
import img1 from '../../assets/playground/projects/project3/gallery/img1.JPG';
import img3 from '../../assets/playground/projects/project3/gallery/img3.JPG';
import IMG_3970 from '../../assets/playground/projects/project3/gallery/IMG_3970.JPG';
import IMG_3971 from '../../assets/playground/projects/project3/gallery/IMG_3971.JPG';
import IMG_3978 from '../../assets/playground/projects/project3/gallery/IMG_3978.JPG';
import IMG_3981 from '../../assets/playground/projects/project3/gallery/IMG_3981.JPG';
import IMG_3983 from '../../assets/playground/projects/project3/gallery/IMG_3983.JPG';
import IMG_3985 from '../../assets/playground/projects/project3/gallery/IMG_3985.JPG';
import IMG_3986 from '../../assets/playground/projects/project3/gallery/IMG_3986.JPG';
import IMG_3987 from '../../assets/playground/projects/project3/gallery/IMG_3987.JPG';
import IMG_3988 from '../../assets/playground/projects/project3/gallery/IMG_3988.JPG';
import IMG_3992 from '../../assets/playground/projects/project3/gallery/IMG_3992.JPG';
import IMG_3993 from '../../assets/playground/projects/project3/gallery/IMG_3993.JPG';
import IMG_3999 from '../../assets/playground/projects/project3/gallery/IMG_3999.JPG';

/**
 * Project3Detail - Project 3 详情页
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

// 太阳图标 (亮色模式)
const SunIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

// 月亮图标 (暗色模式)
const MoonIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

// 下拉箭头图标
const ChevronDownIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

// 返回箭头图标
const BackArrowIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
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

function Project3Detail() {
    const navigate = useNavigate();

    // 图片数组
    const images = [
        img1, img3,
        IMG_3970, IMG_3971, IMG_3978, IMG_3981, IMG_3983,
        IMG_3985, IMG_3986, IMG_3987, IMG_3988, IMG_3992,
        IMG_3993, IMG_3999
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoverSide, setHoverSide] = useState(null); // 'left' | 'right' | null

    // 暗黑模式状态
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 下拉菜单状态
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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
        navigate('/');
    };

    // 项目数据
    const projectData = {
        title: 'Christmas spirit',
        description: 'A fun Christmas animation in time for the holidays.',
        location: 'Shanghai, China',
        completionDate: '2024.12',
        overview: 'Compatible with Nothing phones running OS 4.0 and later. This project includes custom animations, wallpapers, and sound effects designed to bring the holiday spirit to your device. Works best with the latest Nothing OS updates for optimal performance and visual fidelity.',
    };

    return (
        <div className="project3-detail min-h-screen flex flex-col" style={{ backgroundColor: '#F8F8F8', backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            {/* ========== Header 导航栏 ========== */}
            <header className="flex items-center justify-between" style={{ padding: '16px' }}>
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
                        Nothing (R)
                    </p>
                    <p
                        style={{
                            fontSize: '16px',
                            color: isDarkMode ? '#FFFFFF' : '#1C1C1C',
                            margin: 0
                        }}
                    >
                        <span className="font-ndot uppercase">Playground</span>
                        <span
                            className="font-mono"
                            style={{
                                fontSize: '10px',
                                color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                                verticalAlign: 'middle',
                                marginLeft: '4px'
                            }}
                        >
                            ALPHA
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
                    <div className="relative z-[60]" style={{ marginLeft: '16px' }} ref={dropdownRef}>
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
                                        Projects
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

            {/* ========== 主内容区: 两列水平布局 ========== */}
            <main className="flex-1 py-8" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                <div className="max-w-6xl mx-auto">
                    {/* 默认水平并排 */}
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '48px' }}>

                        {/* ===== 左列: 图片轮播 ===== */}
                        <div style={{ flex: 1 }} className="flex flex-col items-center">
                            {/* 图片容器 */}
                            <div
                                className={`relative w-full overflow-hidden flex items-center justify-center ${hoverSide === 'left' ? 'cursor-dot-left' : hoverSide === 'right' ? 'cursor-dot-right' : ''
                                    }`}
                                style={{
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px',
                                    border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                    height: '720px',
                                }}
                                onClick={handleImageClick}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={() => setHoverSide(null)}
                            >
                                {/* 当前图片 */}
                                <img
                                    src={images[currentIndex]}
                                    alt={`Project 3 - Image ${currentIndex + 1}`}
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
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ===== 右列: 信息区 ===== */}
                        <div style={{ flex: 1, marginRight: '16px', paddingLeft: '12px', paddingRight: '12px' }} className="relative z-10 flex flex-col items-center gap-8 pt-4 pb-8">
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
                            <div className="flex w-full" style={{ gap: '32px', marginTop: '32px', marginBottom: '32px' }}>
                                {/* Gallery 按钮 */}
                                <button
                                    className="flex-1 inline-flex items-center justify-between gap-3 px-6 rounded-full transition-colors"
                                    style={{ backgroundColor: '#FFC700', color: '#1C1C1C', height: '32px' }}
                                >
                                    <span className="font-mono text-sm font-medium">Gallery</span>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </button>

                                {/* Proposal 按钮 */}
                                <button
                                    className="flex-1 inline-flex items-center justify-between gap-3 px-6 rounded-full transition-colors"
                                    style={{
                                        backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                                        color: isDarkMode ? '#FFFFFF' : '#1C1C1C',
                                        border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                        height: '32px',
                                    }}
                                >
                                    <span className="font-mono text-sm font-medium">Proposal</span>
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
                                    <span className="font-mono text-sm font-medium" style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}>Location</span>
                                    <span className="font-mono text-sm" style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}>{projectData.location}</span>
                                </div>

                                {/* Completion Date */}
                                <div
                                    className="flex justify-between items-center"
                                    style={{ borderBottom: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`, padding: '12px 0' }}
                                >
                                    <span className="font-mono text-sm font-medium" style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}>Completion Date</span>
                                    <span className="font-mono text-sm" style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}>{projectData.completionDate}</span>
                                </div>

                                {/* Project Overview */}
                                <div
                                    style={{ borderBottom: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`, padding: '12px 0' }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-sm font-medium" style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}>Project Overview</span>
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

                            {/* 免责声明 */}
                            <p
                                className="text-center text-xs font-mono"
                                style={{ color: isDarkMode ? '#6B7280' : '#9CA3AF' }}
                            >
                                This is provided by the community. Use at your own discretion.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* ========== Footer 页脚 ========== */}
            <footer
                className="mt-auto px-3 py-8 md:px-8"
                style={{ backgroundColor: isDarkMode ? '#2D2D2D' : '#E3E3E3' }}
            >
                {/* 第一部分: Logo 和导航 */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                    <div
                        className="font-ndot text-sm uppercase tracking-wider mb-8 md:mb-0"
                        style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}
                    >
                        <span>NOTHING (R)</span>
                    </div>
                    <div
                        className="flex flex-wrap gap-6 text-xs font-mono uppercase"
                        style={{ color: isDarkMode ? '#D1D5DB' : '#1C1C1C' }}
                    >
                        <a href="#" className="hover:underline">TERMS OF SERVICE</a>
                        <a href="#" className="hover:underline">PRIVACY POLICY</a>
                        <a href="#" className="hover:underline">INSTAGRAM</a>
                        <a href="#" className="hover:underline">X</a>
                        <a href="#" className="hover:underline">COMMUNITY</a>
                    </div>
                </div>

                {/* 第二部分: See you on the canvas */}
                <div className="flex flex-col md:flex-row justify-between items-end">
                    <p
                        className="font-ndot text-2xl md:text-3xl italic mb-4 md:mb-0"
                        style={{ color: isDarkMode ? '#FFFFFF' : '#1C1C1C' }}
                    >
                        See you on the canvas.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-yellow-400"></span>
                        <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                            <span className="w-3 h-3 rounded-full bg-white"></span>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Project3Detail;

