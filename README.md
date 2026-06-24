# EchoMind — AI人格成长教练

> 成为更好的自己，从每一次表达开始

EchoMind 是一个基于 AI 的人格成长教练平台，通过沟通优化、人格分析和成长建议帮助用户持续提升情商与表达能力。

## 在线预览

https://yourname.github.io/echomind/

## 技术栈

- Vite + React 18 + TypeScript
- Tailwind CSS v4
- React Router v7
- Framer Motion
- Recharts
- Lucide React

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署到 GitHub Pages

### 方法一：GitHub Actions 自动部署（推荐）

1. 在 GitHub 创建仓库 `echomind`
2. 将代码推送到仓库
3. 进入仓库 Settings → Pages → Source 选择 "GitHub Actions"
4. 每次 push 到 main 分支会自动部署

### 方法二：命令行手动部署

```bash
npm install
npm run deploy
```

> 注意：需要先在 GitHub 创建同名仓库，并配置好 git remote

## 自定义域名

1. 在仓库 Settings → Pages → Custom domain 填入你的域名
2. 在你的 DNS 提供商添加 CNAME 记录指向 `yourname.github.io`
3. 等待 DNS 生效（通常几分钟到几小时）

## 功能亮点

- **话术优化**：AI 生成高情商、温和、真诚、幽默多版本表达
- **能力分析**：六维雷达图深度解析沟通特征
- **人格画像**：基于长期记忆构建专属人格标签
- **成长建议**：每日建议、本周目标、训练任务
- **成长报告**：趋势图表 + 里程碑时间线
