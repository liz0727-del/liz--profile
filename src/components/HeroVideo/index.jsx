import React, { useEffect, useRef, useState } from 'react';
// 使用阿里云 OSS 加速后的视频链接
const HERO_VIDEO_URL = 'https://liz-profile-assets.oss-cn-shenzhen.aliyuncs.com/hero_bg_optimized.mp4';

/**
 * HeroVideo 组件 - Hero 背景视频（WebM 优先）
 * 可见时播放，不可见时暂停。
 */
function HeroVideo() {
  const [opacity, setOpacity] = useState(1);
  const rafIdRef = useRef(null);
  const opacityRef = useRef(1);
  const videoRef = useRef(null);

  useEffect(() => {
    const updateOpacity = () => {
      const heroTitle = document.getElementById('hero-title');
      if (!heroTitle) {
        if (opacityRef.current !== 1) {
          opacityRef.current = 1;
          setOpacity(1);
        }
        return;
      }

      const rect = heroTitle.getBoundingClientRect();
      const titleBottom = rect.bottom;
      const fadeStartDistance = 200;

      if (titleBottom <= 0) {
        if (opacityRef.current !== 0) {
          opacityRef.current = 0;
          setOpacity(0);
        }
      } else if (titleBottom <= fadeStartDistance) {
        const next = titleBottom / fadeStartDistance;
        if (Math.abs(next - opacityRef.current) > 0.01) {
          opacityRef.current = next;
          setOpacity(next);
        }
      } else {
        if (opacityRef.current !== 1) {
          opacityRef.current = 1;
          setOpacity(1);
        }
      }
    };

    const handleScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        updateOpacity();
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOpacity();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlayback = () => {
      const shouldPlay = !document.hidden && opacityRef.current > 0.02;
      if (shouldPlay) {
        const p = video.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => { });
        }
      } else {
        video.pause();
      }
    };

    const handleVisibilityChange = () => syncPlayback();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    syncPlayback();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.pause();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.hidden && opacity > 0.02) {
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => { });
      }
    } else {
      video.pause();
    }
  }, [opacity]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none"
      style={{
        zIndex: 1,
        opacity,
        transition: 'opacity 0.1s ease-out',
      }}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>
    </div>
  );
}

export default HeroVideo;
