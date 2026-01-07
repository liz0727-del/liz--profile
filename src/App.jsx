import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import HeroVideo from './components/HeroVideo';
import AsciiEffect from './components/AsciiEffect';
import StickyCursor from './components/StickyCursor';
import VideoSection from './components/VideoSection';
import IntroductionSection from './components/IntroductionSection';
import PlaygroundSection from './components/PlaygroundSection';
import DetailPage from './pages/detail/DetailPage';

// 创建 Context 用于共享 footer 视频透明度状态
const FooterVideoContext = createContext({ opacity: 0, setScrollTriggerRef: () => { } });

// Footer 背景组件 - 在 App 级别渲染，确保 fixed 定位正常工作
function FooterBackground({ opacity }) {
  return (
    <>
      {/* 
        层级关系（从底到顶）：
        1. Footer 彩色视频 - z-index: 2（最底层，在 ASCII 层之下）
        2. ASCII 效果层 - z-index: 5（透明背景，可以看到底下的视频）
        3. WITH ESSENTIAL 文字 - z-index: 7（在 ASCII 层之上）
      */}

      {/* 层1: 彩色视频背景 - z-index: 2（在 ASCII 层之下） */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          zIndex: 2,
          opacity: opacity,
          transition: 'opacity 0.3s ease',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
      >
        <source src={new URL('./assets/videos/页脚视频/footer.mp4', import.meta.url).href} type="video/mp4" />
      </video>

      {/* 层3: WITH ESSENTIAL 文字 - z-index: 7（在 ASCII 层之上） */}
      <section
        className="fixed inset-0 flex w-full flex-col items-center justify-center pointer-events-none"
        style={{
          zIndex: 7,
          opacity: opacity > 0 ? 1 : 0,
          transition: 'opacity 0.3s ease',
          paddingTop: '150px',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
      >
        <h2
          className="font-ndot uppercase mix-blend-difference text-ink leading-[1.2] text-center"
          style={{
            fontSize: 'clamp(28px, 4vw, 60px)',
            letterSpacing: 'normal',
            fontWeight: 200
          }}
        >
          WITH ESSENTIAL, ANYONE CAN CREATE <br />
          THEIR OWN APPS IN SECONDS
        </h2>
      </section>
    </>
  );
}

// 主页内容组件
function HomePage({ onScrollTriggerRef }) {
  return (
    <>
      {/* SECTION 1: Hero 区域 */}
      <Hero />

      {/* SECTION 2: Natural Language */}
      <section
        className="relative flex w-full max-w-6xl mx-auto flex-col items-center justify-center pointer-events-none"
        style={{
          boxSizing: 'border-box',
          height: '222px',
          marginTop: '80px',
          marginBottom: '80px',
          padding: '48px'
        }}
      >
        <h2
          className="font-ndot uppercase mix-blend-difference text-ink leading-[1.2] text-center"
          style={{
            fontSize: 'clamp(28px, 4vw, 60px)',
            letterSpacing: 'normal',
            fontWeight: 200
          }}
        >
          WITH ESSENTIAL, ANYONE CAN CREATE <br />
          THEIR OWN APPS IN SECONDS
        </h2>
      </section>

      {/* SECTION 3: Video Player */}
      <VideoSection />

      {/* SECTION 4: Introduction - 自我介绍 */}
      <IntroductionSection />

      {/* SECTION 5: Playground - 作品展示 */}
      <PlaygroundSection />

      {/* 滚动触发点 + 占位区域 */}
      <div ref={onScrollTriggerRef} style={{ height: '150vh' }} />

      {/* SECTION 6: Footer - 从底部滑入 */}
      <footer
        style={{
          backgroundColor: '#E3E3E3',
          padding: '32px',
          position: 'relative',
          zIndex: 30,
        }}
      >
        {/* 第一行: 实时时间（右上角）*/}
        <div className="flex justify-end mb-16">
          <div
            className="font-ndot"
            style={{
              fontSize: '12px',
              color: '#1C1C1C'
            }}
          >
            {new Date().toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            }).replace(/(\d+)\/(\d+)\/(\d+),/, '$3/$1/$2')}
          </div>
        </div>

        {/* 第二行: See you on the canvas + 装饰圆点 */}
        <div className="flex justify-between items-center mb-16" style={{ marginTop: '200px' }}>
          <p
            className="font-ndot italic"
            style={{
              fontSize: '20px',
              color: '#1C1C1C'
            }}
          >
            See you on the canvas.
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
                backgroundColor: '#1C1C1C'
              }}
            >
              <span
                className="rounded-full"
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#FFFFFF'
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
              color: '#1C1C1C'
            }}
          >
            NOTHING (R)
          </div>
          <div
            className="flex font-ndot uppercase pointer-events-auto"
            style={{
              gap: '16px',
              fontSize: '12px',
              color: '#1C1C1C'
            }}
          >
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.xiaohongshu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              XIAOHONGSHU
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

// 主页包装组件 - 管理滚动状态并传递给 FooterBackground
function HomePageWrapper() {
  const scrollTriggerRef = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  // 监听滚动，控制视频透明度
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTriggerRef.current) return;

      const trigger = scrollTriggerRef.current;
      const rect = trigger.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 当占位区域进入视口时开始显示视频
      const triggerPoint = viewportHeight * 0.3;
      const fadeDistance = 150;

      if (rect.top < triggerPoint) {
        const scrollPast = triggerPoint - rect.top;
        const opacity = Math.min(1, scrollPast / fadeDistance);
        setVideoOpacity(opacity);
      } else {
        setVideoOpacity(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Footer 背景层 - 在 Layout 外部渲染，确保 fixed 定位正常 */}
      <FooterBackground opacity={videoOpacity} />

      {/* 主页内容 */}
      <Layout>
        <StickyCursor />
        <AsciiEffect videoBackground={<HeroVideo />}>
          <HomePage onScrollTriggerRef={scrollTriggerRef} />
        </AsciiEffect>
      </Layout>
    </>
  );
}

// App 组件：我们应用的入口
function App() {
  return (
    <Routes>
      {/* 详情页路由 */}
      <Route path="/detail/:type/:id" element={<DetailPage />} />

      {/* 主页路由 */}
      <Route path="/" element={<HomePageWrapper />} />
    </Routes>
  );
}

export default App;
