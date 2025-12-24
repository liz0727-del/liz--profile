import React from 'react';

// Layout 组件：我们网站的全局骨架
// 它的作用是包裹所有的页面内容，提供统一的边距和网格系统
const Layout = ({ children }) => {
    return (
        // min-h-screen: 确保容器至少占满整个屏幕高度
        // bg-paper: 使用我们自定义的浅灰色背景
        // text-ink: 使用自定义的深灰色文字
        // font-mono: 全局应用等宽字体，营造工业感
        <div className="min-h-screen bg-paper text-ink font-mono selection:bg-ink selection:text-paper">

            {/* 
        主容器 (Main Container)
        max-w-screen-2xl: 限制最大宽度，防止在大屏幕上太宽
        mx-auto: 水平居中 (margin-left: auto, margin-right: auto)
        px-4: 左右两侧留出一点安全距离 (padding-x)
        relative: 设为相对定位，为了让里面的绝对定位元素(如网格线)以此为基准
      */}
            <main className="max-w-screen-2xl mx-auto px-6 md:px-12 relative min-h-screen">

                {/* 
          12列网格系统 (The 12-Column Grid)
          FIX: 之前是 inset-0 全屏铺满，导致贴边。
          现在直接放在 main 容器内，它会自动和 main 的 padding 对齐。
          h-full: 占满高度
          absolute inset-0: 相对于 main 容器定位
        */}
                <div className="absolute inset-0 mx-6 md:mx-12 pointer-events-none z-0">
                    <div className="grid grid-cols-12 gap-4 h-full w-full">
                        {/* 生成 12 个辅助线 */}
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="border-x border-grid h-full w-full"
                            />
                        ))}
                    </div>
                </div>

                {/* 
          实际内容区域 (Content Area)
          relative: 相对定位，为了浮在网格线上面 (z-index)
          z-10: 层级比网格线高，确保内容可交互
        */}
                <div className="relative z-10">
                    {children}
                </div>

            </main>
        </div>
    );
};

export default Layout;
