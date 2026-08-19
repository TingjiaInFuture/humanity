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
  │      ├── 正在发生什么（信号 + 证据链接）
  │      ├── 观察记录（带来源的动态条目）
  │      ├── 发起议题
  │      ├── 申请修改
  │      ├── 治理方式说明
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

## Governance / 治理

审议的最小程序——维护者权限边界、普通提案至少 **7 天**公开审议、接受/拒绝的书面理由、可提前关闭的情形、P1–P5 永久编号与 `translation-required` 双语同步标签——见 [GOVERNANCE.md](./GOVERNANCE.md)。

## 观察记录（Observation log）

首页「正在发生什么」下方有一条持续更新的观察记录，数据在 [`docs/log.js`](./docs/log.js)，由维护者通过 git 提交。规则：

- 新条目加在数组**顶部**；`date` 是**记录日**，不是事件日。
- 每条必须带至少一个可核实的来源链接。
- 已发布条目的事实表述**不回改**。数据错误：新起一条更正，并把原条目标记为 `corrected`（页面显示「已更正」徽标，`supersededBy` 指向更正条目）。
- 补充来源自述的限定语（如「相关性、非因果」）可在原条目追加——让表述回归来源原意，git 历史留痕。
- 公众对任何条目的异议与补充，通过网站「发起讨论」提出，同样公开留痕。

「五条信号」是相对稳定的论点（正文与证据链接在 `docs/index.html` / `docs/app.js`）；「观察记录」是按日抵达的证据流。两者共同构成对「正在发生什么」的可检验叙述。

## Security model

- GitHub token 只存在 Cloudflare Worker Secret 中，绝不发到浏览器。
- D1 不保存原始 IP。
- 限流只保存 `SHA-256(secret salt + IP)` 的窗口计数；计数用单条 UPSERT（`RETURNING count`）原子递增，不存在「先读后写」的并发竞态。
- 匿名公开写入有人机验证：Worker 配置 `TURNSTILE_SECRET` 后，每条提交必须携带 Turnstile token 并经服务端 Siteverify 校验（token 单次有效）。CORS 不承担防护职责——Origin 在浏览器之外可以随意伪造。
- 写入 GitHub 的正文会中和 `@` 提及（`@` 后插入零宽空格），防止匿名投稿借同步账号 ping 任何人；进入代码块的原文与替换文本保持逐字不变。
- 表单有简单蜜罐字段。
- CORS 限定到配置的 GitHub Pages Origin，并额外允许 localhost 开发。
- Worker 永不自动 merge PR。
- 前端不收集邮箱。

如果以后形成更大社区，建议把维护者 Token 迁移成专用 GitHub App，并增加更强的反滥用与身份机制。v0.2 暂时不提前建设这些系统。

## Deploy

- 前端：GitHub Pages，`main` 分支 `/docs` 目录，push 即发布。
- Worker：push 到 `main` 且改动 `worker/**` 时由 GitHub Actions 自动部署；也可在 `worker/` 下手动 `npm run deploy`。
- 所需 Secret：`GITHUB_TOKEN`（fine-grained，仅本仓库，Discussions / Issues / Contents / Pull requests 写权限）、`IP_HASH_SALT`（随机值，用于 IP 哈希限流）；Actions 部署另需 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。
- 人机验证（公开上线前建议开启）：Cloudflare 控制台创建 Turnstile 组件（域名填 Pages 域名）；sitekey 填入 `docs/config.js` 的 `turnstileSiteKey`，secret 用 `cd worker && npx wrangler secret put TURNSTILE_SECRET` 配置——secret 一旦存在，Worker 即强制校验。
- 关键配置在 `worker/wrangler.toml`；注意 `ALLOWED_ORIGIN` 是浏览器 Origin，不含 `/repo` 路径。
- 本地开发：`cd worker && npm install && npm run db:local && npm run dev`，前端用任意静态服务器指向 `docs/`。

## Drafts

- [`docs/CHARTER.zh-CN.txt`](./docs/CHARTER.zh-CN.txt)
- [`docs/CHARTER.en.txt`](./docs/CHARTER.en.txt)
