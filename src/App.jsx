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
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 w-full p-8 z-50 mix-blend-difference text-white pointer-events-none">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold tracking-widest">ESSENTIAL</h1>
          <div className="text-right text-xs space-y-1 font-mono hidden md:block">
            <p>ESSENTIAL IS THE FIRST STEP</p>
            <p>TOWARDS AN AI OPERATING SYSTEM</p>
          </div>
        </div>
      </header>

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
            letterSpacing: 'normal'
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

      {/* SECTION 6: New Era / Footer */}
      <section className="min-h-screen flex flex-col justify-between p-6 pb-20 pointer-events-none">
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-12">
          <h2
            className="font-ndot uppercase mix-blend-difference text-ink leading-[1.2]"
            style={{
              fontSize: 'clamp(28px, 4vw, 60px)',
              letterSpacing: 'normal'
            }}
          >
            NEW THINKING FOR A NEW ERA
          </h2>

          <div className="bg-white/95 p-6 rounded-lg max-w-md mx-auto text-left text-sm font-mono shadow-xl">
            <p className="mb-4">The next chapter of our story builds on the same core values, now with AI at the center of our operating system.</p>
            <div className="flex gap-2">
              <span className="block w-3 h-3 bg-red-500"></span>
              <span className="block w-3 h-3 bg-blue-500"></span>
              <span className="block w-3 h-3 bg-yellow-500"></span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="w-full flex justify-between items-end border-t border-black/10 pt-8 text-xs font-mono uppercase tracking-widest mix-blend-difference text-black">
          <div className="space-y-2">
            <p>ESSENTIAL OS</p>
            <p>PHONE (1)</p>
            <p>CLOUD COMPUTE</p>
          </div>
          <div className="text-right">
            <p>&copy; 2025</p>
            <button className="mt-4 px-6 py-2 bg-white/10 backdrop-blur border border-black/20 rounded-full hover:bg-white/30 transition-colors pointer-events-auto">
              Playground ↗
            </button>
          </div>
        </div>
      </section>
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

