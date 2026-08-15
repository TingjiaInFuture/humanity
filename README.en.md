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
  │      ├── Start a discussion
  │      ├── Propose a change
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

See [`DEPLOY.md`](./DEPLOY.md).

## Drafts

- [`docs/CHARTER.zh-CN.md`](./docs/CHARTER.zh-CN.md) (Chinese)
- [`docs/CHARTER.en.md`](./docs/CHARTER.en.md) (English)
