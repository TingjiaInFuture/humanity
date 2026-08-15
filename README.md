# Humanity Charter / 人类共同宪章

**[English](./README.en.md)** | 中文

一个极简、双语、公开可追溯的 AGI 时代公民宪章共创实验。

**设计原则：先验证有没有人参与，再建设平台。**

普通参与者不需要 GitHub 账号，也不需要理解 Git：

- 前端发起议题 → Cloudflare Worker → GitHub Discussions
- 前端申请文本修改 → Worker → GitHub Issue
- 精确原文匹配一次 → Worker 自动建分支、改文件、创建 Pull Request
- Worker **永不自动 merge**
- D1 保存提交与同步状态，GitHub 保存公开讨论和最终修改历史

## Architecture

```text
Browser
  │
  ├── GitHub Pages: docs/
  │      ├── 中文 / English
  │      ├── 发起议题
  │      ├── 申请修改
  │      └── 最近公开记录
  │
  └── HTTPS JSON API
          │
          ▼
   Cloudflare Worker
      │         │
      │         └── GitHub API
      │              ├── Discussions
      │              ├── Issues
      │              ├── Branch + Commit
      │              └── Pull Requests
      │
      └── D1
           ├── submissions
           └── hashed-IP rate limits
```

## Why exact-text PRs?

公开网站不让自动化“理解”一个模糊请求后自行改宪章。修改申请必须给出目标文件、精确定位文本和修改内容。

支持三种修改类型：

- `replace`：精确原文 + 替换文本
- `insert`：锚点文本（所选章节）+ 新增内容，锚点为空时追加到文末
- `delete`：精确原文，删除后合并多余空行

Worker 永远先创建 Issue。只有定位文本在当前目标文件中 **恰好出现一次** 时才创建 PR；零次或多次匹配都会停在 Issue，等待人处理。

## Security model

- GitHub token 只存在 Cloudflare Worker Secret 中，绝不发到浏览器。
- D1 不保存原始 IP。
- 限流只保存 `SHA-256(secret salt + IP)` 的窗口计数。
- 表单有简单蜜罐字段。
- CORS 限定到配置的 GitHub Pages Origin，并额外允许 localhost 开发。
- Worker 永不自动 merge PR。
- 前端不收集邮箱。

如果以后形成更大社区，建议把维护者 Token 迁移成专用 GitHub App，并增加更强的反滥用与身份机制。v0.2 暂时不提前建设这些系统。

## Deploy

- 前端：GitHub Pages，`main` 分支 `/docs` 目录，push 即发布。
- Worker：push 到 `main` 且改动 `worker/**` 时由 GitHub Actions 自动部署；也可在 `worker/` 下手动 `npm run deploy`。
- 所需 Secret：`GITHUB_TOKEN`（fine-grained，仅本仓库，Discussions / Issues / Contents / Pull requests 写权限）、`IP_HASH_SALT`（随机值，用于 IP 哈希限流）；Actions 部署另需 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。
- 关键配置在 `worker/wrangler.toml`；注意 `ALLOWED_ORIGIN` 是浏览器 Origin，不含 `/repo` 路径。
- 本地开发：`cd worker && npm install && npm run db:local && npm run dev`，前端用任意静态服务器指向 `docs/`。

## Drafts

- [`docs/CHARTER.zh-CN.txt`](./docs/CHARTER.zh-CN.txt)
- [`docs/CHARTER.en.txt`](./docs/CHARTER.en.txt)
