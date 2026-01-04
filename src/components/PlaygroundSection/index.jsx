import React from 'react';
import { Link } from 'react-router-dom';

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

/**
 * PlaygroundSection - 作品展示区域
 * 
 * 图片结构:
 * - Project 1: 1张图片 (projects/project1.svg)
 * - Project 2: 1张图片 (projects/project2.svg)
 * - Project 3: 3张图片 (projects/project3/img1-3.svg)
 */
function PlaygroundSection() {
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
    };

    return (
        <section className="relative w-full pointer-events-auto">
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
                        className="flex aspect-square w-full items-center justify-center overflow-hidden"
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
                                    <img src={avatars[0].src} alt={avatars[0].alt} className="h-full w-full rounded-full object-cover" />
                                </Link>
                                <Link
                                    to={avatars[1].link}
                                    className="avatar col-start-1 row-start-2 flex cursor-pointer items-center justify-center rounded-full bg-white transition-opacity duration-200"
                                >
                                    <img src={avatars[1].src} alt={avatars[1].alt} className="h-full w-full rounded-full object-cover" />
                                </Link>
                                <Link
                                    to={avatars[2].link}
                                    className="avatar col-start-3 row-start-2 flex cursor-pointer items-center justify-center rounded-full bg-white transition-opacity duration-200"
                                >
                                    <img src={avatars[2].src} alt={avatars[2].alt} className="h-full w-full rounded-full object-cover" />
                                </Link>
                                <Link
                                    to={avatars[3].link}
                                    className="avatar col-start-2 row-start-3 flex cursor-pointer items-center justify-center rounded-full bg-white transition-opacity duration-200"
                                >
                                    <img src={avatars[3].src} alt={avatars[3].alt} className="h-full w-full rounded-full object-cover" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* 1-2: 空占位符 */}
                    <div className="w-full" style={{ aspectRatio: '4/3' }}></div>

                    {/* 1-3: Project 1 - height: 60%, 1:1 正方形 */}
                    <div
                        className="flex h-full w-full items-center justify-center"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <Link to={projects.project1.link} className="flex h-full w-full items-center justify-center">
                            <img
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
                        className="flex h-full w-full items-center justify-center"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <Link to={projects.project2.link} className="flex h-full w-full items-center justify-center">
                            <img
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
                        className="flex flex-col items-center justify-center text-center"
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
                            Come to play with Essential.<br />
                            Your digital Playground awaits.
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
                            Join thousands of creators to build something uniquely yours, and<br />
                            discover the creativity of the Nothing Community.
                        </p>
                    </div>

                    {/* ===== 第三行: 4个组件 ===== */}

                    {/* 3-1: Project 3 堆叠图片 - 3张固定尺寸 80x120px */}
                    <Link
                        to={projects.project3.link}
                        className="group relative flex w-full items-center justify-center"
                        style={{ aspectRatio: '4/3' }}
                    >
                        {/* 第一张卡片 - 左侧 */}
                        <img
                            src={projects.project3.images[0]}
                            alt="Project 3 - Image 1"
                            className="absolute object-cover transition-transform duration-200 ease-out group-hover:rotate-[-8deg]"
                            style={{
                                width: '80px',
                                height: '120px',
                                borderRadius: '14px',
                                transform: 'translateX(-50px) rotate(-6deg)',
                                zIndex: 0,
                            }}
                        />
                        {/* 第二张卡片 - 中间 */}
                        <img
                            src={projects.project3.images[1]}
                            alt="Project 3 - Image 2"
                            className="absolute object-cover transition-transform duration-200 ease-out"
                            style={{
                                width: '80px',
                                height: '120px',
                                borderRadius: '14px',
                                zIndex: 10,
                            }}
                        />
                        {/* 第三张卡片 - 右侧 */}
                        <img
                            src={projects.project3.images[2]}
                            alt="Project 3 - Image 3"
                            className="absolute object-cover transition-transform duration-200 ease-out group-hover:rotate-[8deg]"
                            style={{
                                width: '80px',
                                height: '120px',
                                borderRadius: '14px',
                                transform: 'translateX(50px) rotate(6deg)',
                                zIndex: 20,
                            }}
                        />
                    </Link>

                    {/* 3-2: 图表占位符 */}
                    <div
                        className="flex h-full w-full items-center justify-center"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <div
                            className="border rounded-lg flex items-end justify-center p-3 gap-2"
                            style={{
                                width: '60%',
                                height: '60%',
                                borderColor: '#e3e3e3',
                            }}
                        >
                            <div className="w-6 bg-ink" style={{ height: '30%' }}></div>
                            <div className="w-6 bg-ink" style={{ height: '70%' }}></div>
                        </div>
                    </div>

                    {/* 3-3: 空占位符 */}
                    <div className="w-full" style={{ aspectRatio: '4/3' }}></div>

                    {/* 3-4: 雷达/时钟图标 - h-[60%], rounded-[20px] */}
                    <div
                        className="flex h-full w-full items-center justify-center"
                        style={{ aspectRatio: '4/3' }}
                    >
                        <div
                            className="bg-ink flex items-center justify-center"
                            style={{
                                height: '60%',
                                aspectRatio: '1/1',
                                borderRadius: '20px',
                            }}
                        >
                            <span className="text-green-400 text-3xl">◉</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PlaygroundSection;


