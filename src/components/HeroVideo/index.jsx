import React, { useEffect, useState } from 'react';
import heroVideo from '../../assets/videos/hero 视频/loader.mp4';

/**
 * HeroVideo 组件 - Hero 背景视频
 * 
 * Essential.com 风格:
 * - fixed 定位，固定在屏幕不随滚动移动
 * - 透明度随滚动变化：0px→200px 淡入，200px→800px 淡出消失
 * - z-index: -10，在所有内容和 ASCII 层之下
 */
function HeroVideo() {
    const [opacity, setOpacity] = useState(1); // 初始完全可见

    useEffect(() => {
        const handleScroll = () => {
            const heroTitle = document.getElementById('hero-title');
            if (!heroTitle) {
                setOpacity(1);
                return;
            }

            const rect = heroTitle.getBoundingClientRect();
            const titleBottom = rect.bottom; // h1 底部相对于视口的位置

            // 当 h1 底部越过屏幕顶部时 (titleBottom <= 0)，视频消失
            // 在这之前一段距离开始淡出（比如从 titleBottom = 200 开始淡出）
            const fadeStartDistance = 200; // 开始淡出的距离

            if (titleBottom <= 0) {
                // h1 底部已经完全越过屏幕顶部
                setOpacity(0);
            } else if (titleBottom <= fadeStartDistance) {
                // 在淡出区间内
                setOpacity(titleBottom / fadeStartDistance);
            } else {
                // h1 还在屏幕内，视频完全可见
                setOpacity(1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // 初始化

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none"
            style={{
                zIndex: 1,
                opacity: opacity,
                transition: 'opacity 0.1s ease-out'
            }}
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src={heroVideo} type="video/mp4" />
            </video>
        </div>
    );
}

export default HeroVideo;
