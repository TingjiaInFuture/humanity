# Humanity Charter / 人类共同宪章

English | **[中文](./README.md)**

A minimal, bilingual, publicly traceable experiment in co-writing a civic charter for the age of AGI.

**Design principle: verify that people actually participate before building a platform.**

Ordinary participants need no GitHub account and no understanding of Git:

- Start a discussion on the site → Cloudflare Worker → GitHub Discussions
- Propose a text change on the site → Worker → GitHub Issue
- Exact-text match found exactly once → Worker creates a branch, edits the file, and opens a Pull Request
- The Worker **never merges automatically**
- D1 stores submissions and sync state; GitHub keeps the public discussions and the final change history

## Architecture

```text
Browser
  │
  ├── GitHub Pages: docs/
  │      ├── 中文 / English
  │      ├── What's happening now (signals + evidence links)
  │      ├── Observation log (dated, sourced entries)
  │      ├── Start a discussion
  │      ├── Propose a change
  │      ├── How it's governed
  │      └── Recent public activity
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

A public website must not let automation "interpret" a vague request and edit the charter on its own. Every change proposal must name the target file, locate the text exactly, and state the new content.

Three change types are supported:

- `replace`: exact current text + replacement text
- `insert`: anchor text (the chosen section) + new content; with an empty anchor, appended to the end of the file
- `delete`: exact current text; extra blank lines are collapsed after removal

The Worker always creates an Issue first. A PR is created only when the locating text appears **exactly once** in the current target file; zero or multiple matches stop at the Issue and wait for a human.

## Observation log

Below "What's happening now", the homepage carries a continuously updated observation log. Data lives in [`docs/log.js`](./docs/log.js), committed to git by the maintainer. Rules:

- New entries go at the **top** of the array; `date` is the **recording day**, not the event day.
- Every entry carries at least one verifiable source link.
- A published entry's factual claims are **never rewritten**. A data error gets a fresh correction entry, and the old entry is marked `corrected` (the page shows a "Corrected" badge; `supersededBy` points at the correction).
- Appending a source's own stated caveats (e.g. "correlational, not causal") is allowed — it restores the source's meaning; git history keeps prior versions.
- Public disagreement or additions go through the site's "Start a discussion" form, equally on the record.

The "five signals" are the relatively stable theses (copy and evidence links in `docs/index.html` / `docs/app.js`); the observation log is the dated stream of arriving evidence. Together they form a checkable account of what's happening.

## Security model

- The GitHub token lives only in a Cloudflare Worker Secret and is never sent to the browser.
- D1 stores no raw IP addresses.
- Rate limiting keeps only windowed counts of `SHA-256(secret salt + IP)`.
- Forms include a simple honeypot field.
- CORS is restricted to the configured GitHub Pages origin, plus localhost for development.
- The Worker never merges a PR automatically.
- The frontend collects no email addresses.

If a larger community forms later, consider migrating the maintainer token to a dedicated GitHub App and adding stronger anti-abuse and identity mechanisms. v0.2 deliberately does not build these ahead of need.

## Deploy

- Frontend: GitHub Pages, `/docs` on `main`; every push publishes.
- Worker: deployed automatically by GitHub Actions when a push to `main` touches `worker/**`; manual fallback is `npm run deploy` inside `worker/`.
- Required secrets: `GITHUB_TOKEN` (fine-grained, this repo only, write access to Discussions / Issues / Contents / Pull requests) and `IP_HASH_SALT` (random value for hashed-IP rate limiting); the Actions deploy also needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
- Key settings live in `worker/wrangler.toml`; note that `ALLOWED_ORIGIN` is the browser origin and must not include the `/repo` path.
- Local development: `cd worker && npm install && npm run db:local && npm run dev`, and serve `docs/` with any static server.

## Drafts

- [`docs/CHARTER.zh-CN.txt`](./docs/CHARTER.zh-CN.txt) (Chinese)
- [`docs/CHARTER.en.txt`](./docs/CHARTER.en.txt) (English)
