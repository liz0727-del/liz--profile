import React from 'react';
import heroVideo from '../../assets/videos/hero 视频/loader.mp4';

/**
 * HeroVideo 组件 - Hero 背景视频
 * 
 * 单独的组件，放在最底层
 * position: absolute 相对于父容器
 * 随页面滚动消失
 */
function HeroVideo() {
    return (
        // 容器：占据 Hero 区域的高度，relative 定位
        <div className="absolute top-0 left-0 w-full h-screen overflow-hidden" style={{ zIndex: 1 }}>
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
