const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const GITHUB_API_VERSION = "2026-03-10";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      if (!isOriginAllowed(request, env)) return json({ error: "origin_not_allowed" }, 403, cors);
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      if (url.pathname === "/" || url.pathname === "/api/health") {
        return json({ ok: true, service: "humanity-charter-api", repository: `${env.GITHUB_OWNER}/${env.GITHUB_REPO}` }, 200, cors);
      }
      if (url.pathname === "/api/activity" && request.method === "GET") return await activity(url, env, cors);
      if (!isOriginAllowed(request, env)) return json({ error: "origin_not_allowed", message: "This origin is not allowed." }, 403, cors);
      if (url.pathname === "/api/discussions" && request.method === "POST") {
        await enforceRateLimit(request, env);
        return await createDiscussion(request, env, cors);
      }
      if (url.pathname === "/api/changes" && request.method === "POST") {
        await enforceRateLimit(request, env);
        return await createChange(request, env, cors);
      }
      return json({ error: "not_found" }, 404, cors);
    } catch (error) {
      console.error("request_failed", error);
      const status = Number(error?.status) || 500;
      const safeMessage = status >= 500 ? "The service could not complete this request. Please try again later." : (error?.message || "Request rejected.");
      return json({ error: error?.code || "request_failed", message: safeMessage }, status, cors);
    }
  }
};

async function activity(url, env, cors) {
  const requested = Number(url.searchParams.get("limit") || 12);
  const limit = Math.max(1, Math.min(30, Number.isFinite(requested) ? requested : 12));
  const result = await env.DB.prepare(`
    SELECT id, kind, lang, title, status, github_discussion_url, github_issue_url, github_pr_url, created_at
    FROM submissions WHERE status IN ('synced', 'issue_only') ORDER BY created_at DESC LIMIT ?
  `).bind(limit).all();
  return json({ items: (result.results || []).map(row => ({
    id: row.id, kind: row.kind, lang: row.lang, title: row.title, status: row.status,
    githubDiscussionUrl: row.github_discussion_url, githubIssueUrl: row.github_issue_url,
    githubPrUrl: row.github_pr_url, createdAt: row.created_at
  })) }, 200, cors);
}

async function createDiscussion(request, env, cors) {
  assertConfigured(env);
  const data = await readJson(request); rejectHoneypot(data);
  const title = requiredString(data.title, "title", 5, 120);
  const context = requiredString(data.context, "context", 10, 4000);
  const question = requiredString(data.question, "question", 5, 2500);
  const displayName = optionalString(data.displayName, 80);
  const lang = normalizeLang(data.lang); requireConsent(data.consent);
  const id = crypto.randomUUID(), now = Date.now();
  await insertSubmission(env, { id, kind: "discussion", lang, title, payload: { title, context, question, displayName, lang }, status: "pending", now });
  try {
    const repo = await getDiscussionRepository(env);
    const category = chooseDiscussionCategory(repo.discussionCategories?.nodes || [], env.DISCUSSION_CATEGORY);
    if (!category) throw clientError("No GitHub Discussion category is available. Enable Discussions and create a category.", "discussion_category_missing", 409);
    const result = await githubGraphql(env, `mutation CreateDiscussion($input: CreateDiscussionInput!) { createDiscussion(input: $input) { discussion { id number url } } }`, {
      input: { repositoryId: repo.id, categoryId: category.id, title, body: buildDiscussionBody({ id, context, question, displayName, lang }), clientMutationId: id }
    });
    const discussion = result?.createDiscussion?.discussion;
    if (!discussion?.url) throw new Error("GitHub did not return a Discussion URL.");
    await env.DB.prepare(`UPDATE submissions SET status='synced', github_discussion_url=?, updated_at=? WHERE id=?`).bind(discussion.url, Date.now(), id).run();
    return json({ ok: true, id, githubUrl: discussion.url }, 201, cors);
  } catch (error) { await markFailed(env, id, error); throw error; }
}

async function createChange(request, env, cors) {
  assertConfigured(env);
  const data = await readJson(request); rejectHoneypot(data);
  const summary = requiredString(data.summary, "summary", 5, 120);
  // mode: "replace" edits an exact passage, "insert" adds new content after an anchor
  // (or at the end of the file when no anchor is given), "delete" removes an exact passage.
  const mode = ["replace", "insert", "delete"].includes(data.mode) ? data.mode : "replace";
  let originalText, replacementText;
  if (mode === "insert") {
    originalText = String(data.originalText ?? "").trim(); // anchor, optional
    if (originalText.length > 8000) throw clientError("originalText must be at most 8000 characters.", "invalid_field", 400);
    replacementText = requiredString(data.replacementText, "replacementText", 1, 8000);
  } else if (mode === "delete") {
    originalText = requiredString(data.originalText, "originalText", 1, 8000);
    replacementText = "";
  } else {
    originalText = requiredString(data.originalText, "originalText", 1, 8000);
    replacementText = requiredString(data.replacementText, "replacementText", 1, 8000);
    if (originalText === replacementText) throw clientError("The replacement text is identical to the current text.", "no_change", 400);
  }
  const reason = requiredString(data.reason, "reason", 5, 4000);
  const displayName = optionalString(data.displayName, 80);
  const lang = normalizeLang(data.lang), fileKey = data.file === "en" ? "en" : "zh";
  const targetPath = fileKey === "en" ? env.CHARTER_EN_PATH : env.CHARTER_ZH_PATH;
  requireConsent(data.consent);

  const id = crypto.randomUUID(), now = Date.now();
  await insertSubmission(env, { id, kind: "change", lang, title: summary, payload: { summary, mode, targetPath, originalText, replacementText, reason, displayName, lang }, status: "pending", now });

  let issue;
  try {
    issue = await githubRest(env, `/repos/${enc(env.GITHUB_OWNER)}/${enc(env.GITHUB_REPO)}/issues`, {
      method: "POST", body: { title: `[Charter proposal] ${summary}`, body: buildIssueBody({ id, mode, targetPath, originalText, replacementText, reason, displayName, lang }) }
    });
    await env.DB.prepare(`UPDATE submissions SET github_issue_url=?, updated_at=? WHERE id=?`).bind(issue.html_url, Date.now(), id).run();
  } catch (error) { await markFailed(env, id, error); throw error; }

  try {
    const current = await getFile(env, targetPath, env.GITHUB_BASE_BRANCH);
    const content = decodeBase64Utf8(current.content || "");
    let updatedContent;
    if (mode === "insert" && !originalText) {
      // No anchor: append the new content at the end of the file.
      updatedContent = `${content.replace(/\s+$/, "")}\n\n${replacementText}\n`;
    } else {
      const matches = countExact(content, originalText);
      if (matches !== 1) {
        const what = mode === "insert" ? "insertion point" : "source text";
        const message = matches === 0 ? `The exact ${what} was not found in the target file.` : `The exact ${what} appears ${matches} times; automatic editing would be ambiguous.`;
        await githubRest(env, `/repos/${enc(env.GITHUB_OWNER)}/${enc(env.GITHUB_REPO)}/issues/${issue.number}/comments`, { method: "POST", body: { body: `Automation stopped before creating a PR.\n\n**Reason:** ${message}\n\nPlease continue in this Issue or resubmit with a passage that matches exactly once.` } }).catch(err => console.error("issue_comment_failed", err));
        await env.DB.prepare(`UPDATE submissions SET status='issue_only', error_message=?, updated_at=? WHERE id=?`).bind(message, Date.now(), id).run();
        return json({ ok: true, id, issueUrl: issue.html_url, prUrl: null, status: "issue_only", message }, 201, cors);
      }
      if (mode === "insert") {
        const idx = content.indexOf(originalText), end = idx + originalText.length;
        const after = content.slice(end).replace(/^\n+/, "\n");
        updatedContent = `${content.slice(0, end)}\n\n${replacementText}${after.startsWith("\n") || after === "" ? after : `\n${after}`}`;
      } else if (mode === "delete") {
        updatedContent = content.replace(originalText, "").replace(/\n{3,}/g, "\n\n");
      } else {
        updatedContent = content.replace(originalText, replacementText);
      }
    }

    const branch = `proposal/${id.slice(0, 8)}-${Date.now().toString(36)}`;
    const baseRef = await githubRest(env, `/repos/${enc(env.GITHUB_OWNER)}/${enc(env.GITHUB_REPO)}/git/ref/heads/${encPath(env.GITHUB_BASE_BRANCH)}`);
    await githubRest(env, `/repos/${enc(env.GITHUB_OWNER)}/${enc(env.GITHUB_REPO)}/git/refs`, { method: "POST", body: { ref: `refs/heads/${branch}`, sha: baseRef.object.sha } });
    await githubRest(env, `/repos/${enc(env.GITHUB_OWNER)}/${enc(env.GITHUB_REPO)}/contents/${encPath(targetPath)}`, {
      method: "PUT", body: { message: `charter: ${summary}`, content: encodeBase64Utf8(updatedContent), sha: current.sha, branch }
    });
    const pr = await githubRest(env, `/repos/${enc(env.GITHUB_OWNER)}/${enc(env.GITHUB_REPO)}/pulls`, {
      method: "POST", body: { title: `[Charter] ${summary}`, head: branch, base: env.GITHUB_BASE_BRANCH, body: buildPrBody({ id, issueNumber: issue.number, mode, targetPath, reason, displayName, lang }) }
    });
    await env.DB.prepare(`UPDATE submissions SET status='synced', github_pr_url=?, github_branch=?, updated_at=? WHERE id=?`).bind(pr.html_url, branch, Date.now(), id).run();
    return json({ ok: true, id, issueUrl: issue.html_url, prUrl: pr.html_url, status: "synced" }, 201, cors);
  } catch (error) {
    const message = `Issue was created, but PR automation failed: ${truncate(error?.message || "unknown error", 700)}`;
    await env.DB.prepare(`UPDATE submissions SET status='issue_only', error_message=?, updated_at=? WHERE id=?`).bind(message, Date.now(), id).run();
    await githubRest(env, `/repos/${enc(env.GITHUB_OWNER)}/${enc(env.GITHUB_REPO)}/issues/${issue.number}/comments`, { method: "POST", body: { body: "The public proposal was recorded, but automatic PR creation failed. A maintainer can continue from this Issue. No automatic merge was attempted." } }).catch(err => console.error("issue_comment_failed", err));
    return json({ ok: true, id, issueUrl: issue.html_url, prUrl: null, status: "issue_only", message }, 201, cors);
  }
}

function buildDiscussionBody({ id, context, question, displayName, lang }) { return [
  "> Submitted through the Humanity Charter public website.",
  "> The GitHub author is the project synchronization account, not necessarily the human submitter.", "",
  `**Submission ID:** \`${id}\``, `**Language:** ${lang}`, `**Display name:** ${displayName || "Anonymous / 匿名"}`, "",
  "## Context / 背景", "", context, "", "## Question / 问题", "", question, "", "---",
  "This record is public by design. No email address or raw IP address is included."
].join("\n"); }

function buildIssueBody({ id, mode, targetPath, originalText, replacementText, reason, displayName, lang }) {
  const modeLabel = { replace: "Replace / 替换", insert: "Insert / 新增", delete: "Delete / 删除" }[mode];
  const sections = [];
  if (mode === "insert") {
    sections.push("## Insert after / 插入位置", "", originalText ? fenced(originalText) : "*End of the document / 文档末尾*", "");
    sections.push("## New content / 新增内容", "", fenced(replacementText), "");
  } else if (mode === "delete") {
    sections.push("## Text to remove / 要删除的原文", "", fenced(originalText), "");
  } else {
    sections.push("## Current text / 现有原文", "", fenced(originalText), "");
    sections.push("## Proposed replacement / 建议替换", "", fenced(replacementText), "");
  }
  return [
    "> Submitted through the Humanity Charter public website.",
    "> The GitHub author is the project synchronization account, not necessarily the human submitter.", "",
    `**Submission ID:** \`${id}\``, `**Change type:** ${modeLabel}`, `**Language:** ${lang}`, `**Display name:** ${displayName || "Anonymous / 匿名"}`, `**Target file:** \`${targetPath}\``, "",
    ...sections,
    "## Rationale / 理由", "", reason, "", "---",
    "The backend creates a Pull Request only when the target passage matches exactly once in the target file. It never merges automatically."
  ].join("\n"); }

function buildPrBody({ id, issueNumber, mode, targetPath, reason, displayName, lang }) { return [
  `Closes #${issueNumber}`, "", `**Public submission:** \`${id}\``, `**Change type:** ${mode}`, `**Language:** ${lang}`, `**Display name:** ${displayName || "Anonymous / 匿名"}`, `**Target file:** \`${targetPath}\``, "",
  "## Rationale / 理由", "", reason, "", "---",
  "This branch and PR were generated automatically from an exact-text public proposal. Review is still required; the automation never merges the PR."
].join("\n"); }

function fenced(text) { const fence = text.includes("```") ? "````" : "```"; return `${fence}\n${text}\n${fence}`; }

async function getDiscussionRepository(env) {
  const data = await githubGraphql(env, `query RepoForDiscussion($owner:String!,$repo:String!){repository(owner:$owner,name:$repo){id discussionCategories(first:25){nodes{id name slug}}}}`, { owner: env.GITHUB_OWNER, repo: env.GITHUB_REPO });
  if (!data?.repository) throw clientError("GitHub repository not found or inaccessible.", "repository_not_found", 409);
  return data.repository;
}
function chooseDiscussionCategory(categories, preferred) { if (!categories.length) return null; const n=String(preferred||"").trim().toLowerCase(); return categories.find(c=>c.name?.toLowerCase()===n||c.slug?.toLowerCase()===n)||categories[0]; }
async function getFile(env, path, ref) { return githubRest(env, `/repos/${enc(env.GITHUB_OWNER)}/${enc(env.GITHUB_REPO)}/contents/${encPath(path)}?ref=${encodeURIComponent(ref)}`); }

async function githubGraphql(env, query, variables) {
  const res = await fetch(GITHUB_GRAPHQL, { method:"POST", headers:githubHeaders(env), body:JSON.stringify({query,variables}) });
  const data = await res.json();
  if (!res.ok || data.errors?.length) { const e=new Error(data.errors?.map(x=>x.message).join("; ")||`GitHub GraphQL HTTP ${res.status}`); e.status=res.status>=400&&res.status<500?409:502;e.code="github_graphql_failed";throw e; }
  return data.data;
}
async function githubRest(env, path, options={}) {
  const res = await fetch(`${GITHUB_API}${path}`, { method:options.method||"GET", headers:githubHeaders(env), body:options.body===undefined?undefined:JSON.stringify(options.body) });
  const text=await res.text(); let data=null; if(text){try{data=JSON.parse(text)}catch{data={message:text}}}
  if(!res.ok){const e=new Error(data?.message||`GitHub REST HTTP ${res.status}`);e.status=res.status>=400&&res.status<500?409:502;e.code="github_rest_failed";throw e} return data;
}
function githubHeaders(env){return {accept:"application/vnd.github+json",authorization:`Bearer ${env.GITHUB_TOKEN}`,"content-type":"application/json","x-github-api-version":GITHUB_API_VERSION,"user-agent":"humanity-charter-worker/0.2"}}

async function insertSubmission(env,{id,kind,lang,title,payload,status,now}){await env.DB.prepare(`INSERT INTO submissions(id,kind,lang,title,payload_json,status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)`).bind(id,kind,lang,title,JSON.stringify(payload),status,now,now).run()}
async function markFailed(env,id,error){try{await env.DB.prepare(`UPDATE submissions SET status='failed',error_message=?,updated_at=? WHERE id=?`).bind(truncate(error?.message||"unknown error",700),Date.now(),id).run()}catch(e){console.error("mark_failed_db_error",e)}}

async function enforceRateLimit(request,env){
  if(!env.IP_HASH_SALT)throw configError("IP_HASH_SALT secret is missing.");
  const ip=request.headers.get("cf-connecting-ip")||request.headers.get("x-forwarded-for")||"unknown";
  const clientHash=await sha256Hex(`${env.IP_HASH_SALT}:${ip}`),windowSeconds=clampInt(env.RATE_LIMIT_WINDOW_SECONDS,60,86400,3600),max=clampInt(env.RATE_LIMIT_MAX,1,100,6),now=Math.floor(Date.now()/1000),windowStart=Math.floor(now/windowSeconds)*windowSeconds;
  const row=await env.DB.prepare(`SELECT count FROM rate_limits WHERE client_hash=? AND window_start=?`).bind(clientHash,windowStart).first();
  if(row&&Number(row.count)>=max)throw clientError("Too many submissions from this connection. Please try again later.","rate_limited",429);
  if(row)await env.DB.prepare(`UPDATE rate_limits SET count=count+1 WHERE client_hash=? AND window_start=?`).bind(clientHash,windowStart).run();else await env.DB.prepare(`INSERT INTO rate_limits(client_hash,window_start,count) VALUES(?,?,1)`).bind(clientHash,windowStart).run();
  if(Math.random()<.02){const cutoff=windowStart-windowSeconds*48;env.DB.prepare(`DELETE FROM rate_limits WHERE window_start<?`).bind(cutoff).run().catch(e=>console.error("rate_limit_cleanup_failed",e))}
}
async function sha256Hex(v){const d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(v));return [...new Uint8Array(d)].map(b=>b.toString(16).padStart(2,"0")).join("")}
function countExact(h,n){if(!n)return 0;let c=0,p=0;while(true){const i=h.indexOf(n,p);if(i===-1)break;c++;p=i+n.length}return c}
function encodeBase64Utf8(text){const bytes=new TextEncoder().encode(text);let binary="";for(let i=0;i<bytes.length;i+=0x8000)binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));return btoa(binary)}
function decodeBase64Utf8(v){const bin=atob(String(v).replace(/\n/g,""));return new TextDecoder().decode(Uint8Array.from(bin,ch=>ch.charCodeAt(0)))}

async function readJson(request){if(!(request.headers.get("content-type")||"").toLowerCase().includes("application/json"))throw clientError("Content-Type must be application/json.","invalid_content_type",415);try{return await request.json()}catch{throw clientError("Invalid JSON body.","invalid_json",400)}}
function requiredString(v,f,min,max){const s=String(v??"").trim();if(s.length<min||s.length>max)throw clientError(`${f} must be between ${min} and ${max} characters.`,"invalid_field",400);return s}
function optionalString(v,max){const s=String(v??"").trim();if(s.length>max)throw clientError(`Optional text exceeds ${max} characters.`,"invalid_field",400);return s}
function normalizeLang(v){return v==="en"?"en":"zh-CN"}
function requireConsent(v){if(!(v===true||v==="on"||v==="true"))throw clientError("Public publication consent is required.","consent_required",400)}
function rejectHoneypot(d){if(String(d.website||"").trim())throw clientError("Submission rejected.","spam_rejected",400)}
function assertConfigured(env){for(const k of ["GITHUB_OWNER","GITHUB_REPO","GITHUB_BASE_BRANCH","GITHUB_TOKEN","CHARTER_ZH_PATH","CHARTER_EN_PATH"]){if(!env[k]||String(env[k]).includes("YOUR_"))throw configError(`${k} is not configured.`)}}
function configError(m){const e=new Error(m);e.status=500;e.code="server_not_configured";return e}
function clientError(m,c,s){const e=new Error(m);e.status=s;e.code=c;return e}
function corsHeaders(request,env){const o=request.headers.get("origin"),allowed=isOriginAllowed(request,env)&&o?o:(env.ALLOWED_ORIGIN||"*");return {"access-control-allow-origin":allowed,"access-control-allow-methods":"GET,POST,OPTIONS","access-control-allow-headers":"content-type","access-control-max-age":"86400",vary:"Origin","cache-control":"no-store"}}
function isOriginAllowed(request,env){const o=request.headers.get("origin");if(!o)return true;const a=String(env.ALLOWED_ORIGIN||"").split(",").map(s=>s.trim()).filter(Boolean);if(a.includes(o))return true;try{const u=new URL(o);return (u.hostname==="localhost"||u.hostname==="127.0.0.1")&&(u.protocol==="http:"||u.protocol==="https:")}catch{return false}}
function json(data,status=200,headers={}){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8",...headers}})}
function enc(v){return encodeURIComponent(String(v))}function encPath(v){return String(v).split("/").map(enc).join("/")}function truncate(v,m){const s=String(v);return s.length<=m?s:`${s.slice(0,m-1)}…`}function clampInt(v,min,max,f){const n=Number.parseInt(v,10);return Number.isFinite(n)?Math.max(min,Math.min(max,n)):f}
