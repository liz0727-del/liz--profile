import React, { useEffect, useState, useRef, useCallback } from 'react';
import videoSrc from '../../assets/videos/04.mp4';

/**
 * VideoSection 组件 - 视频播放器区块
 * 
 * 功能:
 * - 视频初始宽度 972px，随滚动放大到最大 1250px
 * - 播放/暂停控制
 * - 可拖动进度条
 * - 静音/取消静音
 * - 初始状态：静音
 */
function VideoSection() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const progressRef = useRef(null);
    const isDraggingRef = useRef(false);
    const rafIdRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const MIN_WIDTH = 972;
    const MAX_WIDTH = 1250;

    // 保持 isDragging 的 ref 同步
    useEffect(() => {
        isDraggingRef.current = isDragging;
    }, [isDragging]);

    // 视频初始化 - 确保自动播放正常工作
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // 确保视频静音（自动播放的必要条件）
        video.muted = true;

        // 尝试播放
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                // 自动播放被阻止，设置状态
                console.log('Autoplay was prevented:', error);
                setIsPlaying(false);
            });
        }
    }, []);

    // 滚动缩放效果 - 使用 RAF + 直接 DOM 操作优化
    useEffect(() => {
        const updateWidth = () => {
            if (!sectionRef.current || !videoContainerRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const viewportHeight = window.innerHeight;
            const viewportCenter = viewportHeight / 2;

            const startPoint = viewportHeight;
            const progress = 1 - Math.max(0, Math.min(1, (sectionTop - (viewportCenter - sectionHeight / 2)) / (startPoint - (viewportCenter - sectionHeight / 2))));

            const newWidth = MIN_WIDTH + progress * (MAX_WIDTH - MIN_WIDTH);
            const clampedWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));

            // 直接操作 DOM，跳过 React 渲染周期
            videoContainerRef.current.style.width = `${clampedWidth}px`;
        };

        const handleScroll = () => {
            // 使用 requestAnimationFrame 节流，确保每帧最多更新一次
            if (rafIdRef.current) return;

            rafIdRef.current = requestAnimationFrame(() => {
                updateWidth();
                rafIdRef.current = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateWidth(); // 初始化

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    // 视频时间更新
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            if (!isDragging) {
                setCurrentTime(video.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [isDragging]);

    // 播放/暂停
    const togglePlay = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    // 静音/取消静音
    const toggleMute = (e) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    // 进度条点击
    const handleProgressClick = (e) => {
        const video = videoRef.current;
        const progressBar = progressRef.current;
        if (!video || !progressBar || duration === 0) return;

        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const newTime = percentage * duration;

        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <section
            ref={sectionRef}
            className="flex w-full flex-col items-center justify-center overflow-hidden"
            style={{
                boxSizing: 'border-box',
                margin: '0 0 80px 0',
                padding: '0 48px'
            }}
        >
            {/* 视频容器 */}
            <div
                ref={videoContainerRef}
                style={{
                    width: `${MIN_WIDTH}px`,
                    maxWidth: '100%',
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#000'
                }}
            >
                {/* 视频 */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        width: '100%',
                        display: 'block',
                        aspectRatio: '16/9',
                        objectFit: 'cover'
                    }}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>

                {/* 控制栏 */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '20px 16px 16px',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        zIndex: 10
                    }}
                >
                    {/* 播放/暂停按钮 */}
                    <button
                        type="button"
                        onClick={togglePlay}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        {isPlaying ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                                <rect x="2" y="1" width="3" height="10" rx="1" />
                                <rect x="7" y="1" width="3" height="10" rx="1" />
                            </svg>
                        ) : (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                                <path d="M2 1.5v9l8-4.5-8-4.5z" />
                            </svg>
                        )}
                    </button>

                    {/* 进度条 - 纤细优雅设计 */}
                    <div
                        ref={progressRef}
                        onClick={handleProgressClick}
                        style={{
                            flex: 1,
                            height: '32px',
                            cursor: 'pointer',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {/* 进度条轨道 */}
                        <div
                            style={{
                                width: '100%',
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* 进度填充 */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '100%',
                                    width: `${progressPercentage}%`,
                                    backgroundColor: '#000',
                                    borderRadius: '2px',
                                    transition: 'width 0.1s'
                                }}
                            />
                        </div>
                    </div>

                    {/* 静音按钮 */}
                    <button
                        type="button"
                        onClick={toggleMute}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        {isMuted ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default VideoSection;
