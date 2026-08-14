# Deployment / 部署

第一版不需要传统服务器：前端用 GitHub Pages，后端用 Cloudflare Worker，数据用 D1，公开讨论与修改历史用 GitHub。

## 1. GitHub 仓库

创建一个公开仓库，推送本项目，并启用 **Issues** 和 **Discussions**。

Discussions 至少保留一个分类。默认 Worker 优先找 `Ideas`；找不到时会退回到第一个可用分类。

## 2. GitHub Pages

仓库进入：

`Settings → Pages → Build and deployment → Deploy from a branch`

选择：

- Branch: `main`
- Folder: `/docs`

站点地址：

`https://<user>.github.io/<repo>/`

## 3. 创建 D1

```bash
cd worker
npm install
npx wrangler login
npx wrangler d1 create humanity-charter
```

把输出的 database UUID 填入 `worker/wrangler.toml`：

```toml
database_id = "YOUR_REAL_UUID"
```

执行迁移：

```bash
npx wrangler d1 migrations apply humanity-charter --remote
```

## 4. 配置 Worker

修改 `worker/wrangler.toml`：

```toml
GITHUB_OWNER = "your-user-or-org"
GITHUB_REPO = "your-repository"
GITHUB_BASE_BRANCH = "main"
DISCUSSION_CATEGORY = "Ideas"
ALLOWED_ORIGIN = "https://your-user.github.io"
CHARTER_ZH_PATH = "docs/CHARTER.zh-CN.md"
CHARTER_EN_PATH = "docs/CHARTER.en.md"
```

注意：即使页面地址是 `https://user.github.io/repo/`，浏览器 Origin 仍是 `https://user.github.io`，所以 `ALLOWED_ORIGIN` 不要带 `/repo`。

## 5. GitHub Token

第一版最好使用专门的项目/机器人 GitHub 账号。

Token 至少需要能在目标仓库：

- 创建 Discussions；
- 创建 Issues 和 Issue comments；
- 创建 branch，并写入宪章文件；
- 创建 Pull Requests。

优先使用只绑定到这个仓库的 fine-grained token，并只授予 Discussions、Issues、Contents、Pull Requests 所需写权限。

如果你的账户/仓库组合下 Discussions GraphQL 对 fine-grained token 不工作，GitHub Discussions GraphQL 官方文档明确支持认证 token，并对公开仓库说明了 `public_repo` scope。此时建议用**专门低权限 bot 账号**的 token，而不是主账号 token。

Token 只写入 Worker Secret：

```bash
npx wrangler secret put GITHUB_TOKEN
```

绝对不要把真实 token 写进 `wrangler.toml`、`docs/config.js`、GitHub Pages 或提交到仓库的 `.env`。

## 6. IP 哈希盐

PowerShell 生成 32 字节随机值：

```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToHexString($bytes)
```

然后：

```bash
npx wrangler secret put IP_HASH_SALT
```

Worker 只用它把连接 IP 做不可直接还原的限流哈希；D1 不记录原始 IP。

## 7. 部署 Worker

```bash
npm run deploy
```

测试：

```bash
curl https://humanity-charter-api.<subdomain>.workers.dev/api/health
```

## 8. 连接前端

编辑 `docs/config.js`：

```js
window.HUMANITY_CHARTER_CONFIG = {
  apiBaseUrl: "https://humanity-charter-api.<subdomain>.workers.dev",
  repositoryUrl: ""
};
```

推送后，Pages 页面会直接调用 Worker。

## 9. 端到端测试

### 发起议题

从网页提交测试议题。预期：

- 网页返回 Discussion 链接；
- GitHub Discussions 出现新讨论；
- 正文明确标注来自公开网站，GitHub 作者只是同步账号。

### 申请修改

从 `docs/CHARTER.zh-CN.md` 或 `docs/CHARTER.en.md` 精确复制一段唯一文字，提交替换文本。预期：

- 创建 Issue；
- 创建 proposal 分支；
- commit 只做精确替换；
- 创建 Pull Request；
- **不会自动 merge**。

再故意提交一段不存在的原文。预期：只创建 Issue，不创建 PR。

## 10. 可选 GitHub Actions

仓库附带 `.github/workflows/deploy-worker.yml`。第一版手动部署更简单。

如果启用 Actions 自动部署，需要 GitHub Actions secrets：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

运行中的 Worker 使用的 `GITHUB_TOKEN` 仍然保存在 Cloudflare Worker Secret，不放在前端。

## 本地开发

```bash
cd worker
cp .dev.vars.example .dev.vars
npm install
npm run db:local
npm run dev
```

另开终端，在仓库根目录：

```bash
python -m http.server 8000
```

临时把 `docs/config.js` 指向 Wrangler 输出的本地 Worker URL，再打开：

`http://localhost:8000/docs/`
