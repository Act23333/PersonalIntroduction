# AI 开发日志 — HT.dev Personal Portfolio

## 1. 使用的 AI 工具

| 工具                    | 用途                    |
| --------------------- | --------------------- |
| **Claude Code** (CLI) | 全流程开发：代码生成、调试、部署配置    |
| **Claude Opus 4.8**   | 核心模型，负责架构设计、组件实现、问题诊断 |

## 2. AI 帮助完成的工作

### 项目初始化

- Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 项目脚手架搭建
- Framer Motion、Lucide React、shadcn/ui 依赖集成

### 页面结构

- 单页滚动布局：Hero → About → Skills → Projects → Engineering → AI → Contact
- 7 个页面区块组件 + 3 个通用 UI 组件 + 2 个布局组件 + 2 个动效组件

### 数据层

- `src/data/` 下 5 个独立数据文件（profile、skills、projects、engineering、ai-workflow）
- 所有内容严格来源于简历 `introduction.md`，未新增虚构经历

### 暗色主题背景

- Perlin 3D 噪声驱动的风向流场粒子系统（FlowField）
- 统一方向（左下→右上）、星空闪烁、鼠标交互光晕

### 白天主题背景

- 毛玻璃窗户雨水效果（DayRain）
- 雨丝下落 + 水滴汇聚/合并/流动 + 水流拖尾

### 昼夜主题切换

- ThemeProvider + Context 架构
- Tailwind v4 `@custom-variant dark` class 选择器配置
- 全部组件 `dark:` 前缀适配

### 音乐播放器

- HTML5 Audio API 自动播放 + 浏览器策略静默重试
- CSS 旋转动画黑胶唱片（旋转标记 + 固定反射光 + 同心圆凹槽）
- Pointer Events 可拖动隐藏按钮（距离阈值区分拖动/点击）
- 居中垂直布局 + 蓝紫光晕装饰

### 部署配置

- Vercel 部署文件配置（Root Directory、vercel.json）
- Git 文件追踪问题诊断与修复

## 3. 自己手动修改的内容

### 产品定位与内容

- 所有个人经历、技能、项目描述均来自原始简历
- 产品定位、页面结构、设计风格的方向性决策

### 视觉微调

- Hero 区域宽度调整（700px → 1000px）
- 按钮下方 Scroll to Explore 提示添加
- 字体大小整体上调（Section 标题 +2 级、卡片文字 +1 级）
- 白天模式文字颜色适配（多处 `text-gray-900 dark:text-white`）

### 主题调试

- 白天模式导航栏/页脚变黑问题的反复测试与反馈
- 音乐按钮在白天模式下不可见的反馈

### 内容链接

- GitHub 链接从单仓库改为个人主页

## 4. 遇到的问题及 AI 解决方案

| 问题                              | 原因                                                                          | AI 如何解决                                                             |
| ------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Vercel 部署 404**               | `work/` 子目录未被 git 追踪 + vercel.json 放在根目录导致 `cd work` 在 Root Directory 生效前执行 | 诊断 git 追踪状态，将 vercel.json 移到 `work/` 内并移除自定义 build/install 命令       |
| **Tailwind `dark:` 前缀全部无效**     | Tailwind v4 默认使用 `prefers-color-scheme` 媒体查询，而非 `.dark` class               | 添加 `@custom-variant dark (&:where(.dark, .dark *))` 切换为 class 选择器模式 |
| **白天雨水出现连续长线**                  | 所有流动水滴共享同一个 trail 数组（`trails[last]`）                                        | 为每个水滴存储独立的 `trailIdx`，各自写入专属 trail                                  |
| **雨水动画初始化卡顿**                   | 每帧生成 30 个随机矩形 + 130 个渐变对象                                                   | 玻璃纹理改为预烘焙 Canvas、雨丝改为纯色 stroke、减少粒子数量 70→50                         |
| **音乐按钮拖动误触打开播放器**               | `onPointerUp` 先设 `dragging=false`，`onClick` 读到 false 误判为点击                  | 改为距离阈值判断：累计移动 < 4px 才算点击                                            |
| **白天模式导航栏滚动后仍变黑**               | `<html>` 硬编码 `dark` class + ThemeProvider 异步切换时序问题                          | ThemeProvider 改为 toggle 内同步操作 DOM classList                         |
| **Lucide React `Github` 图标不存在** | 新版 lucide-react 移除了品牌图标                                                     | 替换为 `ExternalLink` 图标                                               |
| **中文引号导致 JS 解析错误**              | `projects.ts` 中 `"下单扣库存"` 的弯引号被 JS 解析为字符串终止符                                | 移除中文弯引号                                                             |

## 5. 最终网站链接

**线上地址**：https://personal-introduction-topaz.vercel.app/

**GitHub 仓库**：https://github.com/Act23333/PersonalIntroduction
