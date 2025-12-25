import React from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import AsciiEffect from './components/AsciiEffect';
import StickyCursor from './components/StickyCursor';

// App 组件：我们应用的入口
// 所有的页面组件都在这里被组装
function App() {
  return (
    <Layout>
      <StickyCursor />
      {/*  
         AsciiEffect now acts as the Background Wrapper.
         It tracks scroll to change videos.
         We simply place our content sections inside it.
      */}
      <AsciiEffect>
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

        {/* SECTION 1: Hero 区域 - 使用独立的 Hero 组件 */}
        <Hero />

        {/* SECTION 2: Natural Language */}
        <section className="min-h-screen flex flex-col justify-center items-center p-6 text-center pointer-events-none">
          <div className="space-y-8 max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mix-blend-difference text-black">
              WITH ESSENTIAL, ANYONE CAN CREATE <br />
              THEIR OWN APPS IN SECONDS <br />
              USING NATURAL LANGUAGE
            </h2>

            {/* Floating Elements Placeholder */}
            <div className="flex justify-center gap-4 mt-12">
              <div className="w-12 h-12 bg-yellow-400 rounded-full mix-blend-multiply opacity-80"></div>
              <div className="w-16 h-16 bg-red-500 rounded-lg mix-blend-multiply opacity-80 rotate-12"></div>
              <div className="w-10 h-10 bg-blue-600 rounded-full mix-blend-multiply opacity-80"></div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Playground / Start by Us */}
        <section className="min-h-screen flex flex-col justify-center items-center p-6 relative pointer-events-none">
          {/* Big Circle Graphic */}
          <div className="border border-white/30 rounded-full w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center mb-12">
            <div className="border border-white/50 rounded-full w-[98%] h-[50%] flex items-center justify-center">
              <span className="font-serif italic text-2xl text-white mix-blend-difference">Started by us</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-center max-w-3xl mix-blend-difference text-black uppercase">
            The playground is your platform <br />
            to explore, create, and share <br />
            the most creative ideas
          </h2>
        </section>

        {/* SECTION 4: New Era / Footer */}
        <section className="min-h-screen flex flex-col justify-between p-6 pb-20 pointer-events-none">
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mix-blend-difference text-black">
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


      </AsciiEffect>
    </Layout>
  );
}

export default App;
