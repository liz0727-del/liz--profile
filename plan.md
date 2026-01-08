# Project Essential: 个人网站复刻计划 (Final Edition)

> **项目代号**: Vibe-Personal (Total Reconstruction)
> **核心目标**: 使用现代技术栈，1:1 复刻 Essential/Nothing 风格，打造个人作品集网站。
> **当前状态**: 已定稿，准备启动。

---

## 1. 终极技术栈 (The Ultimate Stack)

*   **Vite ⚡️**: 极速构建引擎。
*   **React ⚛️**: 核心 UI 框架。
*   **Tailwind CSS 🎨**: 官网同款样式方案。
*   **Framer Motion 🎬**: 物理动效库。

---

## 2. 视觉工程系统 (Visual Engineering)

### A. 色彩系统
*   **`bg-paper`**: `#F2F2F2`
*   **`text-ink`**: `#1C1C1C`
*   **`border-grid`**: `rgba(0, 0, 0, 0.1)`

### B. 字体系统
*   **`font-mono`**: `Geist Mono` (正文)
*   **`font-dot`**: `DotGothic16` (点阵标题)

---

## 3. 页面结构规划 (基于草图)

以下是从上到下的页面模块拆解：

### 🔵 Section 1: Hero 区
*   **内容**: 大标题 (Hero Title)
*   **交互**:
    *   视频 + 鼠标互动
    *   ASCII 光标追随效果
    *   粒子消散动效

### 🔵 Section 2: Slogan 区
*   **内容**: ASCII 背景 + 文字 Slogan
*   **说明**: ASCII 图层动效从 Hero 贯穿到视频区域

### 🔵 Section 3: 视频翻页动效
*   **内容**: 嵌入式视频播放器
*   **交互**:
    1.  随着页面向下滚动，视频窗口逐渐放大
    2.  达到最大尺寸后，视频窗口固定 (Sticky)
    3.  继续滚动，视频以最大尺寸跟随页面移动
*   **视频内容**: 网页浏览指南 / 视觉作品剪辑合集

### 🔵 Section 4: 自我介绍 + AI Chat
*   **左侧**: 文字自我介绍 (p 标签)
*   **右侧/悬浮**: AI Chat 弹窗入口
    *   点击打开弹窗
    *   可对话关于简历、项目经历

### 🔵 Section 5: 更多作品
*   **内容**: ASCII 背景 + "更多作品" 标题

### 🔵 Section 6: 作品列表
*   **项目**:
    *   室内设计
    *   室内设计
    *   歌曲 MV (ASCII 背景)
    *   Vibe Coding
    *   Comfy UI
*   **备注**: 排版和交互方式待定，后续可调整

### 🔵 Section 7: 底部视频
*   **内容**: 全幅视频展示

### 🔵 Section 8: 页脚 (Footer)
*   **内容**:
    *   联系方式 (邮箱)
    *   社交媒体跳转
    *   (可选) 关注的艺术家介绍与链接

---

## 4. 开发阶段规划 (Development Phases)

### Phase 1: 地基 (Setup)
*   [x] Git 初始化 (版本控制)
*   [x] Vite + React 项目初始化
*   [x] Tailwind CSS 配置
*   [x] 字体引入 (Google Fonts)
*   [x] 清理默认代码

### Phase 2: 骨架 (Structure)
*   [x] 全局 12 列网格布局
*   [x] Header 组件
*   [x] 响应式断点

### Phase 3: 灵魂 (The Vibe)
*   [x] **ASCII Video Effect**:
    *   读取 `src/assets/videos/01.mp4`
    *   Canvas 读取像素亮度的 Loop
    *   字符映射 `.-+:;=!*#$@`
    *   渲染至 `<pre>` 标签，全屏固定背景 `z-0`
*   [ ] **Sticky Cursor**:
 惯性光标 + 粒子消散
*   [ ] **Noise Texture** (可选)

### Phase 4: 页面模块
*   [ ] Hero 区组件
*   [ ] Slogan 区组件
*   [ ] 视频翻页动效组件
*   [ ] 自我介绍区组件
*   [ ] 作品列表组件
*   [ ] 页脚组件

### Phase 5: 智能 (Intelligence)
*   [ ] AI Chat Widget
*   [ ] 点击触发弹窗
*   [ ] 模拟对话 (Mock Data)

### Phase 6: 性能优化 (Performance)
*   [ ] **懒加载 (Lazy Loading)**: 图片/视频在进入视口时才加载
*   [ ] **渐进式加载 (Progressive Loading)**: 先显示模糊缩略图，再加载高清图
*   [ ] **WebP 格式**: 将图片转换为 WebP 格式 (比 JPG 小 30%+)
*   [ ] **CDN**: 使用 Vercel 自带的全球 CDN 加速

### Phase 7: 发布 (Launch)
*   [ ] Vercel / GitHub Pages 部署
*   [ ] 自定义域名 (可选)

### Phase 8: 扩展功能 (Extensions) - 可选
*   [ ] **留言板系统**:
    *   数据库: Supabase (免费)
    *   用户提交留言
    *   管理后台审核
    *   审核通过后展示在前端
*   [ ] **真实 AI 接入**: 将 Mock 对话替换为 GPT/Gemini API

---


## 9. 开发遗留问题 (Known Issues)

### 🔴 ASCII 图层模糊问题

**问题描述**：
- ASCII 背景层在高 DPI 屏幕（如 Retina 显示器）上出现模糊/锯齿
- 原因：Canvas 使用 CSS 像素渲染，未适配 `devicePixelRatio`

**相关文件**：
- `/src/components/AsciiEffect/index.jsx`

**推荐解决方案**：

| 方案 | 描述 | 优点 | 缺点 |
|------|------|------|------|
| **方案 1** | 适配 devicePixelRatio | 完全清晰 | 高 DPI 屏内存占用增加 |
| **方案 2** | 限制最大 DPR 为 2 | 性能与清晰度平衡 | 3x 屏仍有轻微模糊 |
| **方案 3** | 使用 OffscreenCanvas + Worker | 主线程释放 | 实现复杂 |

**核心修改代码**（方案 1/2）：
```javascript
const dpr = Math.min(window.devicePixelRatio || 1, 2); // 方案2限制为2
displayCanvas.width = screenWidth * dpr;
displayCanvas.height = screenHeight * dpr;
displayCtx.scale(dpr, dpr);
```

**优先级**：中
**状态**：待处理

---
