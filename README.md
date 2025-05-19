# OpenInsight

{WIP- Temporal 验证}OpenInsight 是一个代码仓库分析工具，使用人工智能为您的代码库生成文档和见解。它利用 Temporal.io 工作流来分析 JavaScript 和 TypeScript 文件，提供全面的文档。

## 功能特点

- 自动化代码仓库扫描
- 基于 DeepSeek 的 AI 代码分析
- Markdown 文档生成
- 基于 Temporal.io 的工作流处理

## 系统要求

- Node.js >= 18.0.0
- pnpm（推荐）或 npm
- Temporal 服务器（用于工作流执行）
- DeepSeek API 密钥


## 安装步骤
0.  启动 docker：
```
docker-compose up
```

1. 克隆仓库
2. 安装依赖：

```bash
pnpm install
```

3. 从示例创建 `.env` 文件：

```bash
cp .env.example .env
```

4. 在 `.env` 文件中添加您的 DeepSeek API 密钥和仓库路径：

```
DEEPSEEK_API_KEY=你的API密钥
REPO_PATH=/你的仓库路径
```

## 使用方法

### 启动 Temporal Worker

```bash
pnpm start:worker
```

### 运行分析

```bash
pnpm start
```

或在开发模式下：

```bash
pnpm dev
```

## 项目结构

```
openinsight/
├── src/
│   ├── activities/      # Temporal 活动实现
│   ├── client/          # 客户端应用代码
│   ├── worker/          # Temporal worker 实现
│   └── workflows/       # Temporal 工作流定义
├── .env                 # 环境变量（从 .env.example 创建）
└── package.json         # 项目配置
```

## 开发

构建项目：

```bash
pnpm build
```

运行代码检查：

```bash
pnpm lint
```

## 许可证

ISC
