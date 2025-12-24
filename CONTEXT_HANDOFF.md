# 🚀 Project Context Handoff: Vibe-Personal

> **用途**: 将此文档发送给新的 AI IDE，以无缝衔接当前开发进度。

## 1. 项目目标 (Goal)
构建一个**粗野主义 (Brutalist)**、**极简工业风**的个人作品集网站。
- **参考对象**: `essential.com` / Nothing OS 风格。
- **核心体验**: "Vibe Coding"，追求极致的视觉与交互质感。

## 2. 核心技术栈 (Tech Stack)
已确定使用以下"黄金组合"，**不可更改**：
- **Build**: Vite ⚡️
- **Framework**: React ⚛️
- **Styling**: Tailwind CSS 🎨 (Utility-first)
- **Animation**: Framer Motion 🎬 (负责所有物理动效)
- **Version Control**: Git

## 3. 关键设计决策 (Design Constraints)
- **色彩系统**:
    - 背景: `#F2F2F2` (纸张灰，禁止纯白)
    - 文字: `#1C1C1C` (炭黑，禁止纯黑)
    - 网格线: `rgba(0,0,0, 0.1)`
- **字体系统**:
    - 标题: `DotGothic16` (Google Fonts，复刻 Ndot 点阵效果)
    - 正文: `Geist Mono` 或 `Roboto Mono` (等宽字体)
- **ASCII 实现原理 (CRITICAL)**:
    - **方案**: **Video-to-ASCII** (视频转码)。
    - **逻辑**: 读取本地 MP4 视频帧 -> Canvas 提取像素亮度 -> 映射为字符 -> 渲染到 `<pre>` 标签。
    - **注意**: 绝不使用随机生成的字符矩阵，必须基于视频内容采样。

## 4. 页面结构 (Page Structure)
基于用户草图，页面包含 8 个 Section：
1.  **Hero**: 大标题 + 视频互动 + ASCII 光标。
2.  **Slogan**: ASCII 背景贯穿。
3.  **Video Flip**: 视频滚动翻页动效 (Scroll-triggered expansion)。
4.  **Intro & Chat**: 自我介绍 + **AI Chat 弹窗** (目前 Mock 数据，点击触发)。
5.  **Works Title**: 更多作品标题。
6.  **Works List**: 室内设计/MV/Vibe Coding 等项目列表。
7.  **Footer Video**: 底部全幅视频。
8.  **Footer**: 联系方式。

## 5. 当前进度 (Current Status)
- ✅ **文档已就位**: `plan.md`, `task.md`, `.cursorrules`, `FOLDER_GUIDE.md` 已创建。
- ✅ **文件夹已建立**: `src/components`, `src/assets/videos` 等。
- ✅ **资源已就位**: 用户已上传测试视频 `01.mp4` 到 `src/assets/videos/`。
- ✨ **下一步 (Next Step)**: **执行 Phase 1** - 初始化 Git，安装 Vite + React + Tailwind。

## 6. 给 AI 的指令 (Prompt for AI)
"请读取项目根目录下的 `plan.md` 和 `.cursorrules`，严格遵循其中的规范。我们直接从 **Phase 1: 地基 (Setup)** 开始，请帮我初始化项目环境。"
