# HT.dev — Java Backend Developer Portfolio

黄涛的个人技术作品展示网站。

**线上地址**: 待部署

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| UI 库 | React 19 |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 |
| 动画 | Framer Motion |
| 图标 | Lucide React |

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # 全局样式（暗色主题 + 玻璃拟态）
│   ├── layout.tsx          # 根布局（SEO 元数据）
│   └── page.tsx            # 首页（单页滚动）
├── components/
│   ├── ui/                 # 通用 UI 组件
│   │   ├── glass-card.tsx  # 玻璃拟态卡片
│   │   ├── section-header.tsx # 分区标题
│   │   └── button.tsx      # 按钮
│   ├── layout/             # 布局组件
│   │   ├── navigation.tsx  # 顶部导航栏
│   │   └── footer.tsx      # 页脚
│   ├── sections/           # 页面区块
│   │   ├── hero-section.tsx    # Hero 首页
│   │   ├── about-section.tsx   # 关于我
│   │   ├── skills-section.tsx  # 技术矩阵
│   │   ├── projects-section.tsx # 项目经历
│   │   ├── engineering-section.tsx # 工程流程
│   │   ├── ai-section.tsx      # AI 协作
│   │   └── contact-section.tsx # 联系方式
│   └── effects/            # 视觉效果
│       ├── scroll-reveal.tsx   # 滚动渐入
│       └── gradient-text.tsx   # 渐变文字
├── data/                   # 数据层（独立管理）
│   ├── profile.ts          # 个人资料
│   ├── skills.ts           # 技能矩阵
│   ├── projects.ts         # 项目经历
│   ├── engineering.ts      # 工程流程
│   └── ai-workflow.ts      # AI 协作流程
└── lib/
    └── utils.ts            # 工具函数
```

## 设计原则

- **数据驱动**: 所有内容在 `src/data/` 中独立管理，组件不硬编码数据
- **组件化**: 每个区块独立封装，易于维护和替换
- **暗色主题**: 黑色背景 (#050505) + 玻璃拟态 + 蓝紫渐变
- **动效**: Framer Motion 驱动的滚动渐入和 hover 反馈
- **静态生成**: 全站静态页面，性能优先

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 构建部署

```bash
# 生产构建
npm run build

# 启动生产服务
npm start
```

### 部署到 Vercel（推荐）

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入仓库
3. 自动检测 Next.js，无需额外配置
4. 部署完成

### Docker 部署

```bash
# 构建镜像
docker build -t ht-portfolio .

# 运行容器
docker run -p 3000:3000 ht-portfolio
```

### 静态导出

```bash
# next.config.ts 中添加 output: 'export'
# 然后构建
npm run build
# 静态文件在 out/ 目录，可部署到任意静态服务器
```

## 内容更新指南

所有内容集中在 `src/data/` 目录：

- 修改个人信息 → `src/data/profile.ts`
- 更新技能 → `src/data/skills.ts`
- 添加项目 → `src/data/projects.ts`
- 调整工程流程 → `src/data/engineering.ts`

修改后重新构建即可生效。

## License

MIT
