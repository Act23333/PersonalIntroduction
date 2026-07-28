# 技术设计

## 技术栈

Next.js 15

React 19

TypeScript

TailwindCSS

Framer Motion

shadcn/ui

---

# 架构

Next.js App Router

结构：

src

├── app

├── components

├── data

├── hooks

├── lib

---

# 组件设计

## HeroSection

首页展示。

---

## ProfileCard

个人信息卡。

---

## SkillMatrix

技术矩阵。

数据来源：

skills.ts

---

## ProjectCard

项目卡片。

数据来源：

projects.ts

---

## Timeline

工程流程展示。

---

## GlassCard

通用玻璃组件。

所有卡片统一使用。

---

# 数据驱动

禁止组件内部硬编码。

例如：

data/projects.ts

```ts
{
title:"",
description:"",
stack:[]
}


```

```

# 动画

使用Framer Motion。

要求：

页面进入：

fade + translate

卡片hover：

scale

滚动：

reveal

# 性能要求

必须：

- 静态生成
- 图片优化
- 组件拆分
- 避免大量客户端组件
