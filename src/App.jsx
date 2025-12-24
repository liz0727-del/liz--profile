import React from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import AsciiEffect from './components/AsciiEffect';

// App 组件：我们应用的入口
// 所有的页面组件都在这里被组装
function App() {
  return (
    // 使用 Layout 包裹整个应用，确保所有页面都有一致的边距和网格背景
    <Layout>

      {/* 顶部导航栏 */}
      <Header />

      {/* 背景 ASCII 视频特效 */}
      <AsciiEffect />

      {/* 
        临时占位内容
        flex + h-screen: 让这行字垂直居中，测试布局是否正常
      */}
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-dot animate-pulse">
            PHASE 2: SKELETON
          </h2>
          <p className="font-mono text-sm opacity-50">
            Grid System Active
          </p>
        </div>
      </div>

    </Layout>
  );
}

export default App;
