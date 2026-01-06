import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

// 主页内容组件
function HomePage() {
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

      {/* SECTION 5.5: Natural Language - 复制到 Playground 和 Footer 之间 */}
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

      {/* SECTION 6: Footer - 与详情页保持一致 */}
      <footer
        style={{
          backgroundColor: '#E3E3E3',
          padding: '32px',
          marginTop: 'auto'
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

// App 组件：我们应用的入口
function App() {
  return (
    <Routes>
      {/* 详情页路由 */}
      <Route path="/detail/:type/:id" element={<DetailPage />} />

      {/* 主页路由 */}
      <Route
        path="/"
        element={
          <Layout>
            <StickyCursor />
            <AsciiEffect videoBackground={<HeroVideo />}>
              <HomePage />
            </AsciiEffect>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;

