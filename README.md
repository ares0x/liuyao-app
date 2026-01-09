# ☯️ Open LiuYao (六爻排盘系统)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)

> 一个基于现代 Web 技术栈（Next.js + TypeScript）构建的数字化中国传统六爻占卜平台。
> A modern, digital implementation of the traditional Chinese Six Yao divination system.


## ✨ 特性 (Features)

- 🪙 **数字化起卦**: 模拟铜钱起卦逻辑，支持手动排盘。
- 📖 **六十四卦详解**: 完整的卦辞、象辞、运势偈语及白话详解。
- 🎨 **现代化 UI**: 结合 Tailwind CSS 打造的古风与现代极简主义融合的界面。
- 📝 **Markdown 渲染**: 优化的排版引擎，清晰展示卦象深度解析。
- 📱 **响应式设计**: 完美适配桌面端与移动端。
- 🔍 **SEO 友好**: 基于 Next.js SSR 生成的静态字典页面。

## 🛠️ 技术栈 (Tech Stack)

- **框架**: [Next.js 15](https://nextjs.org/) (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + @tailwindcss/typography
- **渲染**: React Markdown (用于富文本解析)
- **部署**: Vercel (推荐)

## 🚀 快速开始 (Getting Started)

### 环境要求
- Node.js >= 18.17.0
- npm / yarn / pnpm

### 安装

```bash
# 克隆项目
git clone [https://github.com/ares0x/open-liuyao.git](https://github.com/ares0x/open-liuyao.git)

# 进入目录
cd open-liuyao

# 安装依赖
npm install
# 或
pnpm install
```

### 运行开发环境
```bash
npm run dev
```
打开浏览器访问 http://localhost:3000 即可看到效果。

## 📂 目录结构 (Project Structure)
``` Markdown
src/
├── app/              # Next.js App Router 页面
├── components/       # React 组件 (UI, 业务组件)
│   └── ui/           # 通用 UI 组件 (如 MarkdownRenderer)
├── lib/              # 核心逻辑与常量
│   ├── constants.ts  # 六十四卦元数据
│   ├── liuyao-core.ts# 起卦核心算法
│   └── services/     # 数据访问层
└── hooks/            # 自定义 Hooks
```

## 🤝 贡献 (Contributing)
欢迎提交 Issue 或 Pull Request！

``` Markdown
Fork 本仓库

创建您的特性分支 (git checkout -b feature/AmazingFeature)

提交您的修改 (git commit -m 'Add some AmazingFeature')

推送到分支 (git push origin feature/AmazingFeature)

开启一个 Pull Request
```

## 📜 开源协议 (License)
本项目基于 MIT License 开源。

Made with ❤️ by [Ares & Gemini 3]
