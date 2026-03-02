import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, t } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

// 头像图片
import avatar1 from '../../assets/playground/avatars/avatar1.svg';
import avatar2 from '../../assets/playground/avatars/avatar2.svg';
import avatar3 from '../../assets/playground/avatars/avatar3.svg';
import avatar4 from '../../assets/playground/avatars/avatar4.svg';

// 项目图片
import project1 from '../../assets/playground/projects/project1.JPG';
import project2 from '../../assets/playground/projects/project2.JPG';
import project3img1 from '../../assets/playground/projects/project3/img1.JPG';
import project3img2 from '../../assets/playground/projects/project3/img2.JPG';
import project3img3 from '../../assets/playground/projects/project3/img3.JPG';
import project4 from '../../assets/playground/projects/project4.svg';
import project5 from '../../assets/playground/projects/project5.webp';

/**
 * PlaygroundSection - 作品展示区域
 * 
 * 图片结构:
 * - Project 1: 1张图片 (projects/project1.svg)
 * - Project 2: 1张图片 (projects/project2.svg)
 * - Project 3: 3张图片 (projects/project3/img1-3.svg)
 */
function PlaygroundSection() {
    const { language } = useLanguage();
    // 头像数据
    const avatars = [
        { id: 1, src: avatar1, alt: 'Avatar 1', link: '/detail/creator/1' },
        { id: 2, src: avatar2, alt: 'Avatar 2', link: '/detail/creator/2' },
        { id: 3, src: avatar3, alt: 'Avatar 3', link: '/detail/creator/3' },
        { id: 4, src: avatar4, alt: 'Avatar 4', link: '/detail/creator/4' },
    ];

    // 项目数据
    const projects = {
        project1: { src: project1, alt: 'Project 1', link: '/detail/project/1' },
        project2: { src: project2, alt: 'Project 2', link: '/detail/project/2' },
        project3: {
            images: [project3img1, project3img2, project3img3],
            alt: 'Project 3',
            link: '/detail/project/3',
        },
        project4: { src: project4, alt: 'Project 4', link: '/detail/project/4' },
        project5: { src: project5, alt: 'Project 5', link: '/detail/project/5' },
    };

    return (
        <section
            id="playground"
            className="relative w-full pointer-events-auto"
        >
            {/* 外层容器 - 大圆角卡片 */}
            <div
                style={{
                    margin: '0 32px',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid #e3e3e3',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {/* 主网格布局 */}
                <div
                    className="pg-grid-container"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                        gridAutoRows: 'auto',
                        gap: '16px',
                        placeItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* ===== 第一行: 4个组件 ===== */}

                    {/* 1-1: 旋转头像组 - 338 × 253px 容器, 224 × 224px 旋转网格 */}
                    <div
                        className="flex aspect-square w-full items-center justify-center overflow-hidden pg-avatars"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <div className="group flex items-center justify-center">
                            <div
                                className="grid animate-spin-slow grid-cols-3 grid-rows-3"
                                style={{ width: '224px', height: '224px' }}
                            >
                                <Link
                                    to={avatars[0].link}
                                    className="avatar col-start-2 row-start-1 flex cursor-pointer items-center justify-center rounded-full bg-white transition-opacity duration-200"
                                >
                                    <img loading="lazy" decoding="async" src={avatars[0].src} alt={avatars[0].alt} className="h-full w-full rounded-full object-cover" />
                                </Link>
                                <Link
                                    to={avatars[1].link}
                                    className="avatar col-start-1 row-start-2 flex cursor-pointer items-center justify-center rounded-full bg-white transition-opacity duration-200"
                                >
                                    <img loading="lazy" decoding="async" src={avatars[1].src} alt={avatars[1].alt} className="h-full w-full rounded-full object-cover" />
                                </Link>
                                <Link
                                    to={avatars[2].link}
                                    className="avatar col-start-3 row-start-2 flex cursor-pointer items-center justify-center rounded-full bg-white transition-opacity duration-200"
                                >
                                    <img loading="lazy" decoding="async" src={avatars[2].src} alt={avatars[2].alt} className="h-full w-full rounded-full object-cover" />
                                </Link>
                                <Link
                                    to={avatars[3].link}
                                    className="avatar col-start-2 row-start-3 flex cursor-pointer items-center justify-center rounded-full bg-white transition-opacity duration-200"
                                >
                                    <img loading="lazy" decoding="async" src={avatars[3].src} alt={avatars[3].alt} className="h-full w-full rounded-full object-cover" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* 1-2: 空占位符 */}
                    <div className="w-full pg-empty-1" style={{ aspectRatio: '4/3' }}></div>

                    {/* 1-3: Project 1 - height: 60%, 1:1 正方形 */}
                    <div
                        className="flex h-full w-full items-center justify-center pg-project-1"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <Link to={projects.project1.link} className="flex h-full w-full items-center justify-center">
                            <img loading="lazy" decoding="async"
                                src={projects.project1.src}
                                alt={projects.project1.alt}
                                className="cursor-pointer object-cover transition-transform duration-600 ease-out hover:scale-[1.15]"
                                style={{
                                    height: '60%',
                                    aspectRatio: '1/1',
                                    borderRadius: '20px',
                                }}
                            />
                        </Link>
                    </div>

                    {/* 1-4: Project 2 - height: 60%, 正圆形 */}
                    <div
                        className="flex h-full w-full items-center justify-center pg-project-2"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <Link to={projects.project2.link} className="flex h-full w-full items-center justify-center">
                            <img loading="lazy" decoding="async"
                                src={projects.project2.src}
                                alt={projects.project2.alt}
                                className="cursor-pointer object-cover transition-transform duration-600 ease-out hover:scale-[1.15]"
                                style={{
                                    height: '60%',
                                    aspectRatio: '1/1',
                                    borderRadius: '9999px',  /* 正圆形 */
                                }}
                            />
                        </Link>
                    </div>

                    {/* ===== 第二行: 中间文字区 (跨4列) ===== */}
                    <div
                        className="flex flex-col items-center justify-center text-center pg-text-area"
                        style={{ gridColumn: 'span 4', padding: '32px 0' }}
                    >
                        <p
                            style={{
                                fontSize: '44px',
                                fontFamily: 'var(--font-ndot), Georgia, serif',
                                fontWeight: 100,
                                lineHeight: '44px',
                                fontStyle: 'italic',
                                color: '#1c1c1c',
                                margin: 0,
                            }}
                        >
                            {t(translations.playground.title, language)}
                        </p>
                        <p
                            style={{
                                marginTop: '16px',
                                fontSize: '14px',
                                fontFamily: '"Geist Mono", monospace',
                                lineHeight: '17.5px',
                                letterSpacing: '-0.28px',
                                color: '#484848',
                                textAlign: 'center',
                            }}
                        >
                            {t(translations.playground.subtitle, language)}
                        </p>
                    </div>

                    {/* ===== 第三行: 4个组件 ===== */}

                    {/* 3-1: Project 3 堆叠图片 - 用外层容器包裹并居中 */}
                    <div
                        className="flex h-full w-full items-center justify-center pg-project-3"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <Link
                            to={projects.project3.link}
                            className="group grid overflow-hidden"
                            style={{
                                width: '85%',
                                aspectRatio: '4/3',
                                padding: '16%',
                                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                                gridTemplateRows: 'minmax(0, 1fr)',
                            }}
                        >
                            {/* 左侧图片 - grid-column: 1/4, rotate: -10deg */}
                            <img loading="lazy" decoding="async"
                                src={projects.project3.images[0]}
                                alt="Project 3 - Image 1"
                                className="object-cover transition-all duration-600 ease-out group-hover:opacity-50"
                                style={{
                                    gridColumn: '1 / 4',
                                    gridRow: '1 / 2',
                                    height: '100%',
                                    aspectRatio: '3/4',
                                    borderRadius: '6px',
                                    rotate: '-10deg',
                                }}
                            />
                            {/* 中间图片 - grid-column: 3/6, z-index: 10 */}
                            <img loading="lazy" decoding="async"
                                src={projects.project3.images[1]}
                                alt="Project 3 - Image 2"
                                className="object-cover transition-all duration-600 ease-out group-hover:scale-[1.2]"
                                style={{
                                    gridColumn: '3 / 6',
                                    gridRow: '1 / 2',
                                    height: '100%',
                                    aspectRatio: '3/4',
                                    borderRadius: '6px',
                                    zIndex: 10,
                                }}
                            />
                            {/* 右侧图片 - grid-column: 5/8, rotate: 10deg */}
                            <img loading="lazy" decoding="async"
                                src={projects.project3.images[2]}
                                alt="Project 3 - Image 3"
                                className="object-cover transition-all duration-600 ease-out group-hover:opacity-50"
                                style={{
                                    gridColumn: '5 / 8',
                                    gridRow: '1 / 2',
                                    height: '100%',
                                    aspectRatio: '3/4',
                                    borderRadius: '6px',
                                    rotate: '10deg',
                                }}
                            />
                        </Link>
                    </div>

                    {/* 3-2: Project 4 - height: 60%, 1:1 正方形, rounded-[20px] */}
                    <div
                        className="flex h-full w-full items-center justify-center pg-project-4"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <Link to={projects.project4.link} className="flex h-full w-full items-center justify-center">
                            <img loading="lazy" decoding="async"
                                src={projects.project4.src}
                                alt={projects.project4.alt}
                                className="cursor-pointer object-cover transition-transform duration-600 ease-out hover:scale-[1.15]"
                                style={{
                                    height: '60%',
                                    aspectRatio: '1/1',
                                    borderRadius: '20px',
                                }}
                            />
                        </Link>
                    </div>

                    {/* 3-3: 空占位符 */}
                    <div className="w-full pg-empty-2" style={{ aspectRatio: '4/3' }}></div>

                    {/* 3-4: Project 5 - height: 60%, 1:1 正方形, rounded-[20px] */}
                    <div
                        className="flex h-full w-full items-center justify-center pg-project-5"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <Link to={projects.project5.link} className="flex h-full w-full items-center justify-center">
                            <img loading="lazy" decoding="async"
                                src={projects.project5.src}
                                alt={projects.project5.alt}
                                className="cursor-pointer object-cover transition-transform duration-600 ease-out hover:scale-[1.15]"
                                style={{
                                    height: '60%',
                                    aspectRatio: '1/1',
                                    borderRadius: '20px',
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .pg-grid-container {
                        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                        gap: 20px !important;
                        padding: 10px 0 !important;
                    }

                    /* 隐藏占位符 */
                    .pg-empty-1, .pg-empty-2 {
                        display: none !important;
                    }

                    /* 重新排列顺序 */
                    .pg-avatars { order: 1 !important; grid-column: 1 !important; }
                    .pg-project-4 { order: 2 !important; grid-column: 2 !important; }
                    
                    /* 统一比例控制，确保移动端呈现与 PC 一致的格子形状 */
                    .pg-avatars, .pg-project-1, .pg-project-2, .pg-project-4, .pg-project-5 {
                        aspect-ratio: 4 / 3 !important;
                        height: auto !important;
                    }

                    .pg-project-2 { 
                        order: 3 !important; 
                        grid-column: 1 / span 2 !important; 
                    }
                    
                    .pg-text-area { 
                        order: 4 !important; 
                        grid-column: 1 / span 2 !important; 
                        padding: 40px 0 !important;
                        aspect-ratio: auto !important;
                    }
                    .pg-text-area p:first-child {
                        font-size: 32px !important;
                        line-height: 1.2 !important;
                    }

                    .pg-project-3 { 
                        order: 5 !important; 
                        grid-column: 1 / span 2 !important;
                        aspect-ratio: 4 / 3 !important;
                        height: auto !important;
                    }

                    .pg-project-1 { order: 6 !important; grid-column: 1 !important; }
                    .pg-project-5 { order: 7 !important; grid-column: 2 !important; }

                    /* 移动端尺寸自适应，将固定像素改为百分比，防止变形或溢出 */
                    .pg-avatars div[style*="width: 224px"] {
                        width: 66% !important;
                        height: 66% !important;
                    }
                    .pg-project-1 img, .pg-project-2 img, .pg-project-4 img, .pg-project-5 img {
                        height: 60% !important; /* 恢复 PC 端默认的 60% 高度比例 */
                        width: auto !important;
                        aspect-ratio: 1 / 1 !important; /* 维持图形本身的正方形或圆比例 */
                    }
                    .pg-project-3 a {
                        width: 100% !important;
                        padding: 10% !important; /* 略微收缩以适应移动端 */
                    }
                }
            `}</style>
        </section>
    );
}

export default PlaygroundSection;
