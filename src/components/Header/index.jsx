import React from 'react';

// Header 组件：网站的顶部导航栏
// 目前包含左侧的 Logo，未来可以添加右侧的菜单按钮
const Header = () => {
    return (
        // fixed: 固定定位，让 Header 始终吸附在屏幕顶部，不随页面滚动消失
        // top-0 left-0 w-full: 占满顶部的宽度
        // z-50: 层级很高，确保遮挡住下面的滚动内容
        // mix-blend-difference: (可选高阶玩法) 混合模式，让文字在黑背景上变白，白背景上变黑
        // py-6: 上下内边距 (padding-y)
        <header className="fixed top-0 left-0 w-full z-50 py-6 pointer-events-none">

            {/* 
        内容容器
        我们要让 Logo 和 Layout 的网格对齐，所以要用同样的 max-w-screen-2xl 容器
      */}
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">

                {/* 
          Flex 布局
          justify-between: 两端对齐 (Logo在左，未来菜单在右)
          items-center: 垂直居中
          pointer-events-auto: 恢复鼠标事件 (因为父级 header 把鼠标禁用了，防止挡住下面内容)
        */}
                <div className="flex justify-between items-center pointer-events-auto">

                    {/* Logo 区域 */}
                    <div className="flex flex-col">
                        {/* 
              大标题
              font-dot: 使用我们在 tailwind.config.js 定义的 DotGothic16 字体
              text-3xl: 字号大小
              uppercase: 强制大写
              tracking-widest: 字间距极大 (Vibe 的来源！)
            */}
                        <h1 className="font-dot text-3xl uppercase tracking-widest leading-none">
                            Fan Xueli
                        </h1>

                        {/* 
              副标题 / Slogan
              font-mono: 等宽字体
              text-xs: 极小字号
              opacity-50: 半透明，降低视觉权重
            */}
                        <span className="font-mono text-xs opacity-50 mt-1">
                            PORTFOLIO (2025)
                        </span>
                    </div>

                    {/* 右侧占位 (未来放 Menu) */}
                    <div className="font-mono text-xs">
                        [MENU]
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
