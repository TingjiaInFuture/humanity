(() => {
  "use strict";
  const cfg = window.HUMANITY_CHARTER_CONFIG || {};
  const I18N = {
    "zh-CN": {
      kicker:"OPEN DRAFT · v0.2", heroTitle:"当机器比人更会思考，<br>人仍应是文明的目的。", heroCopy:"AI 时代该守住什么？这份草稿没有最终答案，也不会由谁替你决定。来读一读，有想法就提出来。", startDiscussion:"发起讨论", proposeChange:"提出修改", heroNote:"不用注册，不用留邮箱，提交后内容公开。",
      happeningEyebrow:"正在发生什么", happeningTitle:"这份宪章不是写给未来的。", happeningCopy:"它回应的是已经开始的变化。下面这些事此刻正在发生——每一条都可以被检验，也可以被反驳。", s1Title:"机器开始胜任一般性脑力劳动。", s1Body:"读、写、改代码、做分析、翻译——过去需要多年训练才能做的工作，软件已经能完成相当部分，而且还在快速变好。", s2Title:"认知产出的成本在快速下降。", s2Body:"同等质量的文字、代码与分析，单价正以数量级的速度变便宜。技能一旦廉价，就换不回从前的生活。", s3Title:"「劳动换生存」的前提在被侵蚀。", s3Body:"社保、医保、养老金、职业身份——许多制度都建立在「人靠劳动换取收入」之上。这条契约没有被废除，但正在松动。", s4Title:"技术以月迭代，制度以年修订。", s4Body:"两边的时间差还在拉大。时间差里发生什么，取决于现在开始的公共讨论。", s5Title:"结局还没有写定。", s5Body:"普遍富裕、极端分化、新的等级社会，都还是可能的方向，不是注定的剧本。正因为未定，讨论才有分量。", happeningNote:"这一节写于 2026 年 8 月，同样接受检验：如果你认为哪一条已过时、不准确，或者漏掉了更重要的信号——", happeningCta:"带着来源发起讨论 ↓",
      s1Evidence:"证据：<a href=\"https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/\" target=\"_blank\" rel=\"noreferrer\">METR：可完成任务时长约每 7 个月翻倍（2025-03）</a> · <a href=\"https://hai.stanford.edu/ai-index/2026-ai-index-report\" target=\"_blank\" rel=\"noreferrer\">Stanford AI Index 2026：SWE-bench Verified 一年内 60% → 接近满分</a>", s2Evidence:"证据：<a href=\"https://hai.stanford.edu/ai-index/2025-ai-index-report\" target=\"_blank\" rel=\"noreferrer\">Stanford AI Index 2025：GPT-3.5 水平推理成本两年下降超 280 倍（$20 → $0.07 / 百万 token）</a>", s3Evidence:"证据：<a href=\"https://www.imf.org/en/blogs/articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity\" target=\"_blank\" rel=\"noreferrer\">IMF：全球约 40% 岗位暴露于 AI（2024-01）</a> · <a href=\"https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/\" target=\"_blank\" rel=\"noreferrer\">Stanford（2026-08 修订）：22–25 岁 AI 暴露职业就业较本应达到的趋势低约 19%，总量失业尚未出现</a>", s4Evidence:"证据：<a href=\"https://hai.stanford.edu/ai-index/2026-ai-index-report\" target=\"_blank\" rel=\"noreferrer\">Stanford AI Index 2026 年度主题：能力增长与度量、治理能力之间的鸿沟在扩大</a>",
      logEyebrow:"观察记录", logTitle:"这份记录会一直更新下去。", logCopy:"下面是维护者定期记录的观察，每条都注明来源。日期是记录日，不是事件日；历史条目不回改——发现错了，就新起一条更正。", logDiscussCta:"对某一条有异议或补充？带着来源来讨论 ↓", logEmpty:"暂无记录。",
      processEyebrow:"治理方式", processTitle:"规则是如何被书写的。", processCopy:"修改这份宪章的机制本身，也接受审视。四件事写在明处：", pr1Title:"每个提案都有公开页面。", pr1Body:"在网站提交后，后端先创建 GitHub Issue——没有黑箱，任何人都能看到并回复。", pr2Title:"机器只做精确匹配。", pr2Body:"只有当你选的原文在最新版宪章中恰好出现一次，后端才自动建分支和 PR；找不到或有多处匹配，就停在 Issue 等人处理。自动化不「理解」模糊请求。", pr3Title:"永不自动合并。", pr3Body:"是否采纳由公开审议决定。目前合并按钮在维护者手里——这是已知的中心化点，我们把它写在这里，而不是假装它不存在。", pr4Title:"已知局限。", pr4Body:"还没有身份与反滥用机制，限流只靠哈希 IP；社区变大后应迁移到专用 GitHub App 与更强的身份方案。v0.2 有意不提前建设。",
      principlesEyebrow:"候选原则", principlesTitle:"第一版只有五条，先从最要紧的说起。", p1Title:"生存不以经济价值为条件。", p1Body:"一个人不应仅因无法与机器竞争而失去基本生存与尊严。", p2Title:"自动化成果应广泛惠及社会。", p2Body:"怎么分可以慢慢争，但不该默认都归少数人。", p3Title:"人保留对文明目标的参与权。", p3Body:"AI 可以帮忙找办法，但文明往哪走，不能只由几家机构或一套系统说了算。", p4Title:"每个人拥有认知与选择自由。", p4Body:"有权知道、有权说不要、有权选择自己和技术相处的方式。", p5Title:"宪章本身必须可以被公众修改。", p5Body:"谁发起的谁说了不算，写完了也不算完。每一次修改都公开留痕。", readZhDraft:"中文完整草案 ↗", readEnDraft:"English full draft ↗",
      discussionEyebrow:"发起讨论", discussionTitle:"有一个问题，想听听更多人怎么说。", discussionCopy:"写下你的问题和背景——无需注册即可提交。提交后会生成一个公开的 GitHub 页面，任何人都能看到；在 GitHub 上回复需要 GitHub 账号。", fieldTitle:"标题", discussionTitlePlaceholder:"例如：失去经济价值的人是否仍有无条件生存权？", fieldContext:"背景", discussionContextPlaceholder:"这个问题为什么值得讨论？你观察到了什么？", fieldQuestion:"希望大家回答的问题", discussionQuestionPlaceholder:"问得具体一点，别让人只能答是或否。", fieldName:"署名（可选）", namePlaceholder:"昵称、名字或留空匿名", publicConsent:"我知道提交后会公开展示。", publishDiscussion:"公开发起讨论",
      changeEyebrow:"提出修改", changeTitle:"想改哪里，选哪里。", changeCopy:"下拉框里选好位置，原文会自动填好，你只管写新的内容。提案公开后，大家一起看、一起定。",
      fieldMode:"修改类型", modeModify:"修改现有内容", modeInsert:"新增内容", modeDelete:"删除内容", fieldFile:"语言版本", zhCharterOption:"中文宪章", enCharterOption:"English 宪章",
      fieldSection:"选择章节", selectSection:"请选择章节…", insertEnd:"文档末尾", docPreamble:"文档开头", fieldParagraph:"选择段落", selectParagraph:"请选择段落…", wholeSection:"整节全部内容",
      insertAfterNote:"新增内容会加在「{section}」这一节后面：", insertEndNote:"新增内容会加到文档末尾。",
      pickerLoadFailed:"没能自动加载宪章内容，可以直接把要改的文字粘贴到下面。", duplicateWarn:"这段文字在文中出现了不止一次，系统没法确定你要改哪一处。建议在上方改选「整节全部内容」。",
      fieldOriginal:"原来的文字（已自动定位）", fieldOriginalManual:"原来的文字（粘贴要修改的原文）", originalPlaceholder:"选好位置后会自动填入。", fieldReplacement:"改成", replacementPlaceholder:"写出你想要的文字。", fieldNewContent:"要新增的内容", newContentPlaceholder:"写下要新增的内容（会加在所选章节后面）。",
      fieldSummary:"修改摘要", summaryPlaceholder:"例如：明确“基本生存条件”不等于无限资源权利", fieldReason:"为什么要改？", reasonPlaceholder:"为什么想改？改了有什么好处，又有什么风险？", changeConsent:"我知道自己写的内容会公开展示。", publishChange:"提交修改提案",
      activityEyebrow:"公开记录", activityTitle:"谁提了什么、改了什么，都查得到。", activityCopy:"这里是最近的动态。更早的讨论和每一次修改都完整保留，随时可查。", refresh:"刷新", loading:"正在读取…", loadingShort:"正在加载…", noActivity:"还没有人提交。你可以是第一个。", closing:"也许我们不能代表全人类制定宪章，<br>但我们可以从这里开始。", footerNote:"开放草稿 · 所有内容公开可查",
      submitting:"正在提交…", discussionSuccess:"讨论已创建：", changeSuccess:"提案已提交：", issueOnly:"提案收到了，但需要人工处理：", issueOnlyReason:"你选的文字在最新版本里找不到（可能已经被别人改过）。可以点开提案补充说明，或者回来重新选一次。", invalidForm:"还有必填项没填完，记得勾选同意公开。", apiNotConfigured:"前端尚未配置 Worker 地址。请编辑 docs/config.js。", requestFailed:"提交失败了，请稍后再试。", activityFailed:"暂时读不到公开记录。", discussionKind:"讨论", changeKind:"修改", discussionLink:"查看讨论", issueLink:"查看提案", prLink:"查看修改详情"
    },
    en: {
      kicker:"OPEN DRAFT · v0.2", heroTitle:"When machines think better than we do,<br>humans should still be an end of civilization.", heroCopy:"What should we hold onto in the age of AI? This draft has no final answer, and no one is going to write it for you. Take a read, and say what you think.", startDiscussion:"Start a discussion", proposeChange:"Propose a change", heroNote:"No sign-up, no email. Everything you submit becomes public.",
      happeningEyebrow:"What's happening now", happeningTitle:"This charter isn't written for the future.", happeningCopy:"It responds to changes that have already begun. These things are happening right now — every one of them can be checked, and challenged.", s1Title:"Machines are taking on general cognitive work.", s1Body:"Reading, writing, coding, analysis, translation — work that once took years of training is now done in large part by software, and improving fast.", s2Title:"The cost of cognitive output is falling fast.", s2Body:"Text, code, and analysis of equal quality are getting cheaper by orders of magnitude. A skill gone cheap no longer buys the life it used to.", s3Title:"The premise of “work in exchange for survival” is eroding.", s3Body:"Social insurance, healthcare, pensions, professional identity — much of the modern settlement assumes people earn their living through work. That contract isn't repealed, but it is loosening.", s4Title:"Technology iterates in months; institutions revise in years.", s4Body:"The gap between the two keeps widening. What happens inside that gap depends on the public discussion that starts now.", s5Title:"The ending isn't written yet.", s5Body:"Broad prosperity, extreme concentration, a new hierarchy of status — these are possible directions, not a fixed script. Precisely because it's undecided, the discussion carries weight.", happeningNote:"This section was written in August 2026, and it answers to evidence too: if a line looks outdated or wrong, or a bigger signal is missing —", happeningCta:"Open that discussion — sources welcome ↓",
      s1Evidence:"Evidence: <a href=\"https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/\" target=\"_blank\" rel=\"noreferrer\">METR — the length of tasks AI completes doubles about every 7 months (Mar 2025)</a> · <a href=\"https://hai.stanford.edu/ai-index/2026-ai-index-report\" target=\"_blank\" rel=\"noreferrer\">Stanford AI Index 2026 — SWE-bench Verified: 60% → near-saturation in one year</a>", s2Evidence:"Evidence: <a href=\"https://hai.stanford.edu/ai-index/2025-ai-index-report\" target=\"_blank\" rel=\"noreferrer\">Stanford AI Index 2025 — inference cost at GPT-3.5 level fell over 280× in two years ($20 → $0.07 per million tokens)</a>", s3Evidence:"Evidence: <a href=\"https://www.imf.org/en/blogs/articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity\" target=\"_blank\" rel=\"noreferrer\">IMF — ~40% of global employment exposed to AI (Jan 2024)</a> · <a href=\"https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/\" target=\"_blank\" rel=\"noreferrer\">Stanford (rev. Aug 2026) — employment of 22–25-year-olds in AI-exposed occupations ~19% below trend, no aggregate job loss so far</a>", s4Evidence:"Evidence: <a href=\"https://hai.stanford.edu/ai-index/2026-ai-index-report\" target=\"_blank\" rel=\"noreferrer\">Stanford AI Index 2026 — its central theme: capability keeps outrunning our ability to measure and govern it</a>",
      logEyebrow:"Observation log", logTitle:"This log keeps updating.", logCopy:"Observations recorded by the maintainer from time to time, each with sources. Dates are recording days, not event days; past entries are never rewritten — a mistake gets a fresh correction entry.", logDiscussCta:"Disagree with an entry, or have something to add? Bring sources ↓", logEmpty:"No entries yet.",
      processEyebrow:"How it's governed", processTitle:"How the rules get written.", processCopy:"The mechanism for changing this charter is itself open to scrutiny. Four things, stated plainly:", pr1Title:"Every proposal gets a public page.", pr1Body:"Submitted on the site, it lands as a GitHub Issue first — no black box. Anyone can read it and reply.", pr2Title:"The machine only does exact matching.", pr2Body:"A branch and PR are created only when the text you picked appears exactly once in the current charter; zero or multiple matches stop at the Issue and wait for a human. Automation doesn't “interpret” vague requests.", pr3Title:"Never merged automatically.", pr3Body:"Adoption is decided in public review. Today the merge button sits with the maintainer — a known point of centralization, written here rather than pretended away.", pr4Title:"Known limits.", pr4Body:"No identity or anti-abuse system yet; rate limiting relies on hashed IPs. A larger community should move to a dedicated GitHub App and stronger identity. v0.2 deliberately doesn't build these ahead of need.",
      principlesEyebrow:"Candidate principles", principlesTitle:"Version one is just five principles — the things that matter most.", p1Title:"Survival should not depend on economic usefulness.", p1Body:"No one should lose the basics of a dignified life just because a machine can do what they do.", p2Title:"The gains of automation should benefit society broadly.", p2Body:"How exactly to share them is worth arguing about — but a handful of people taking everything shouldn't be the default.", p3Title:"People keep a voice in where civilization is headed.", p3Body:"AI can help find the means, but the direction shouldn't be set by a few companies or one automated system.", p4Title:"Everyone has the freedom to know and to choose.", p4Body:"The right to be informed, to say no to hidden manipulation, and to choose your own relationship with technology.", p5Title:"The charter itself stays open to change.", p5Body:"Whoever started it doesn't get the final word — no one does. Every change leaves a public trace.", readZhDraft:"中文完整草案 ↗", readEnDraft:"English full draft ↗",
      discussionEyebrow:"Start a discussion", discussionTitle:"Got a question worth talking about?", discussionCopy:"Write your question and a bit of background — no sign-up needed to submit. It becomes a public GitHub page anyone can read; replying there takes a GitHub account.", fieldTitle:"Title", discussionTitlePlaceholder:"e.g. If work is no longer needed, is basic survival still unconditional?", fieldContext:"Context", discussionContextPlaceholder:"Why is this worth discussing? What have you seen?", fieldQuestion:"Question for others", discussionQuestionPlaceholder:"Ask something specific — not a question with only one right answer.", fieldName:"Display name (optional)", namePlaceholder:"Name, nickname, or leave blank for anonymous", publicConsent:"I know what I submit will be public.", publishDiscussion:"Publish discussion",
      changeEyebrow:"Propose a change", changeTitle:"Pick what you want to change.", changeCopy:"Choose where in the dropdowns — the current text fills in for you, and you just write the new version. Proposals are public, and decided together.",
      fieldMode:"Change type", modeModify:"Edit existing text", modeInsert:"Add new content", modeDelete:"Remove text", fieldFile:"Language version", zhCharterOption:"Chinese charter", enCharterOption:"English charter",
      fieldSection:"Choose a section", selectSection:"Choose a section…", insertEnd:"End of the document", docPreamble:"Beginning of the document", fieldParagraph:"Choose a passage", selectParagraph:"Choose a passage…", wholeSection:"The whole section",
      insertAfterNote:"New content will be added after “{section}”:", insertEndNote:"New content will be added at the end of the document.",
      pickerLoadFailed:"The charter couldn't be loaded automatically — you can paste the text you want to change below.", duplicateWarn:"This passage appears more than once in the document, so the change can't be located. Try choosing “The whole section” above instead.",
      fieldOriginal:"Current text (located automatically)", fieldOriginalManual:"Current text (paste the text to change)", originalPlaceholder:"Fills in automatically once you pick a location.", fieldReplacement:"Change it to", replacementPlaceholder:"Write the text you want instead.", fieldNewContent:"New content", newContentPlaceholder:"Write what you'd like to add (it goes after the chosen section).",
      fieldSummary:"Change summary", summaryPlaceholder:"e.g. Clarify that basic survival doesn't mean an unlimited claim on resources", fieldReason:"Why change it?", reasonPlaceholder:"Why? What does it improve, and what could go wrong?", changeConsent:"I know what I submit will be public.", publishChange:"Submit proposal",
      activityEyebrow:"Public record", activityTitle:"Who said what, who changed what — it's all on the record.", activityCopy:"Recent activity lives here. Earlier discussions and every change are kept in full, free to check anytime.", refresh:"Refresh", loading:"Loading…", loadingShort:"Loading…", noActivity:"No submissions yet. You could be the first.", closing:"Maybe we can't write a charter for all of humanity —<br>but we can start here.", footerNote:"Open draft · everything public",
      submitting:"Submitting…", discussionSuccess:"Discussion created:", changeSuccess:"Proposal submitted:", issueOnly:"Got your proposal, but it needs a human touch:", issueOnlyReason:"The text you picked couldn't be found in the latest version (someone may have changed it). Open the proposal to explain, or come back and pick again.", invalidForm:"Some required fields are still empty — remember to tick the consent box.", apiNotConfigured:"The Worker URL is not configured yet. Edit docs/config.js.", requestFailed:"Submission failed. Please try again later.", activityFailed:"Public activity is temporarily unavailable.", discussionKind:"Discussion", changeKind:"Change", discussionLink:"View discussion", issueLink:"View proposal", prLink:"View the change"
    }
  };
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = v => String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  function repoUrl(){ if(cfg.repositoryUrl) return cfg.repositoryUrl.replace(/\/$/,""); const h=location.hostname;if(!h.endsWith(".github.io"))return"";const owner=h.slice(0,-10),parts=location.pathname.split("/").filter(Boolean),repo=parts[0]||`${owner}.github.io`;return `https://github.com/${owner}/${repo}`; }
  const r=repoUrl(); if(r) $("#github-link").href=r; else $("#github-link").style.visibility="hidden";
  const qlang=new URLSearchParams(location.search).get("lang"); let lang=qlang==="en"?"en":qlang==="zh-CN"?"zh-CN":((navigator.language||"").toLowerCase().startsWith("zh")?"zh-CN":"en");
  const t=k=>I18N[lang][k]||k;
  function applyLang(){document.documentElement.lang=lang;document.title=lang==="zh-CN"?"Humanity Charter · 人类共同宪章":"Humanity Charter";$("#lang-switch").textContent=lang==="zh-CN"?"EN":"中文";$$('[data-i18n]').forEach(e=>e.innerHTML=t(e.dataset.i18n));$$('[data-i18n-placeholder]').forEach(e=>e.placeholder=t(e.dataset.i18nPlaceholder));const u=new URL(location.href);u.searchParams.set("lang",lang);history.replaceState(null,"",u);refreshModeUi();renderLog()}
  $("#lang-switch").addEventListener("click",()=>{lang=lang==="zh-CN"?"en":"zh-CN";applyLang();loadActivity()});
  function api(){const v=(cfg.apiBaseUrl||"").replace(/\/$/,"");if(!v||v.includes("YOUR-SUBDOMAIN"))throw new Error("API_NOT_CONFIGURED");return v}
  function status(el,kind,html){el.className=`form-status ${kind||""}`.trim();el.innerHTML=html}
  async function post(path,payload){const res=await fetch(`${api()}${path}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});let data={};try{data=await res.json()}catch{}if(!res.ok){const e=new Error(data.error||`HTTP_${res.status}`);e.data=data;throw e}return data}
  const payload=form=>Object.fromEntries(new FormData(form).entries());

  /* ---------- Change form: charter picker ---------- */
  const modeSel=$("#change-mode"),fileSel=$("#change-file"),secSel=$("#change-section"),paraSel=$("#change-paragraph");
  const paraRow=$("#paragraph-row"),origRow=$("#original-row"),replRow=$("#replacement-row");
  const origField=$("#original-text"),replField=$("#replacement-text"),origLabel=$("#original-label"),replLabel=$("#replacement-label");
  const preview=$("#picker-preview"),note=$("#picker-note");
  let sections=[],charterText="",charterFailed=false;
  const charterCache={};

  async function loadCharter(fileKey){
    if(charterCache[fileKey])return charterCache[fileKey];
    const url=fileKey==="en"?(cfg.charterEnUrl||"./CHARTER.en.txt"):(cfg.charterZhUrl||"./CHARTER.zh-CN.txt");
    const res=await fetch(url,{headers:{accept:"text/plain"}});
    if(!res.ok)throw new Error("charter_fetch_failed");
    const text=await res.text();
    charterCache[fileKey]=text;return text;
  }
  // Split the charter into sections marked with 【...】 heading lines; each keeps
  // its exact text (so the backend can match it once) plus its paragraphs for
  // finer selection. The charter is plain text — no markdown syntax.
  function parseSections(md){
    const lines=md.replace(/\r\n/g,"\n").split("\n");
    const blocks=[];let cur={title:"",heading:"",body:[],isPreamble:true};
    for(const line of lines){
      const m=line.match(/^【(.+?)】\s*$/);
      if(m){blocks.push(cur);cur={title:m[1].trim(),heading:line,body:[],isPreamble:false}}
      else cur.body.push(line);
    }
    blocks.push(cur);
    const list=blocks.filter(s=>s.isPreamble?s.body.join("").trim():true);
    for(const s of list){
      // Keep the exact bytes between heading and body (blank line included):
      // the text must remain a verbatim substring for exact-once matching.
      s.text=s.body.join("\n").replace(/\n+$/,"");
      if(s.heading)s.text=`${s.heading}\n${s.text}`;else s.text=s.text.replace(/^\n+/,"");
      s.paragraphs=[];
      let buf=[];
      for(const line of s.body){
        if(line.trim()===""){if(buf.length){s.paragraphs.push(buf.join("\n"));buf=[]}}
        else buf.push(line);
      }
      if(buf.length)s.paragraphs.push(buf.join("\n"));
    }
    return list;
  }
  const sectionTitle=s=>s.isPreamble?t("docPreamble"):s.title;
  const countIn=(h,n)=>{if(!n)return 0;let c=0,p=0;for(;;){const i=h.indexOf(n,p);if(i===-1)return c;c++;p=i+n.length}};
  const excerpt=v=>{const s=String(v).replace(/\s+/g," ").trim();return s.length>60?`${s.slice(0,59)}…`:s};

  async function refreshSections(){
    secSel.disabled=true;paraSel.disabled=true;
    secSel.innerHTML=`<option value="">${esc(t("loadingShort"))}</option>`;
    try{charterText=await loadCharter(fileSel.value);sections=parseSections(charterText);charterFailed=false}
    catch{sections=[];charterText="";charterFailed=true}
    secSel.disabled=false;paraSel.disabled=false;
    // The current-text box is read-only whenever the picker works: the backend
    // locates the passage by exact match, so hand edits would break it. Manual
    // pasting is only the fallback when the charter could not be loaded.
    origField.readOnly=!charterFailed;
    origLabel.textContent=charterFailed?t("fieldOriginalManual"):t("fieldOriginal");
    renderSectionOptions();
  }
  function renderSectionOptions(){
    const prevSec=secSel.value,prevPara=paraSel.value;
    const first=modeSel.value==="insert"?t("insertEnd"):t("selectSection");
    secSel.innerHTML=`<option value="">${esc(first)}</option>`+sections.map((s,i)=>`<option value="${i}">${esc(sectionTitle(s))}</option>`).join("");
    if(prevSec&&[...secSel.options].some(o=>o.value===prevSec)){
      secSel.value=prevSec;
      onSectionChange();
      if(paraSel.hasChildNodes()&&[...paraSel.options].some(o=>o.value===prevPara))paraSel.value=prevPara;
      if(paraSel.value===prevPara)onParagraphChange();
    }else onSectionChange();
  }
  function onSectionChange(){
    const i=secSel.value===""?null:Number(secSel.value);
    const sec=i===null?null:sections[i];
    if(modeSel.value==="insert"){
      paraRow.hidden=true;origRow.hidden=true;origField.required=false;
      origField.value=sec?sec.text:"";
      preview.hidden=false;
      preview.textContent=sec?t("insertAfterNote").replace("{section}",sectionTitle(sec)):t("insertEndNote");
      note.hidden=!charterFailed;note.textContent=charterFailed?t("pickerLoadFailed"):"";
      return;
    }
    if(!sec){
      paraRow.hidden=true;origField.value="";preview.hidden=true;
      note.hidden=!charterFailed;note.textContent=charterFailed?t("pickerLoadFailed"):"";
      return;
    }
    paraRow.hidden=false;
    paraSel.innerHTML=`<option value="">${esc(t("selectParagraph"))}</option><option value="s">${esc(t("wholeSection"))}</option>`+sec.paragraphs.map((p,j)=>`<option value="${j}">${esc(excerpt(p))}</option>`).join("");
    onParagraphChange();
  }
  function onParagraphChange(){
    const i=secSel.value===""?null:Number(secSel.value);
    const sec=i===null?null:sections[i];if(!sec)return;
    const v=paraSel.value;
    const text=v==="s"?sec.text:v===""?"":sec.paragraphs[Number(v)];
    origField.value=text;
    preview.hidden=!text;preview.textContent=text||"";
    const dup=text&&countIn(charterText,text)>1;
    note.hidden=!dup&&!charterFailed;note.textContent=dup?t("duplicateWarn"):(charterFailed?t("pickerLoadFailed"):"");
  }
  function refreshModeUi(){
    const mode=modeSel.value;
    if(mode==="insert"){
      replRow.hidden=false;replLabel.textContent=t("fieldNewContent");replField.placeholder=t("newContentPlaceholder");replField.required=true;
      // The anchor is chosen with the section picker; keep a manual fallback visible
      // only when the charter itself could not be loaded.
      origRow.hidden=!charterFailed;origField.required=false;
    }else if(mode==="delete"){
      replRow.hidden=true;replField.required=false;replField.value="";
      origRow.hidden=false;origField.required=true;
    }else{
      replRow.hidden=false;replLabel.textContent=t("fieldReplacement");replField.placeholder=t("replacementPlaceholder");replField.required=true;
      origRow.hidden=false;origField.required=true;
    }
    origField.readOnly=!charterFailed;
    origLabel.textContent=charterFailed?t("fieldOriginalManual"):t("fieldOriginal");
    if(sections.length||charterFailed)renderSectionOptions();
  }
  modeSel.addEventListener("change",refreshModeUi);
  fileSel.addEventListener("change",refreshSections);
  secSel.addEventListener("change",onSectionChange);
  paraSel.addEventListener("change",onParagraphChange);

  /* ---------- Forms ---------- */
  $("#discussion-form").addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,s=$("#discussion-status"),b=f.querySelector("button[type=submit]");if(!f.checkValidity()){f.reportValidity();return status(s,"error",t("invalidForm"))}b.disabled=true;status(s,"",t("submitting"));try{const p=payload(f);p.lang=lang;const d=await post("/api/discussions",p);status(s,"success",`${esc(t("discussionSuccess"))} <a href="${esc(d.githubUrl)}" target="_blank" rel="noreferrer">${esc(t("discussionLink"))} ↗</a>`);f.reset()}catch(err){status(s,"error",err.message==="API_NOT_CONFIGURED"?t("apiNotConfigured"):esc(err.data?.message||t("requestFailed")))}finally{b.disabled=false;loadActivity()}});
  $("#change-form").addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,s=$("#change-status"),b=f.querySelector("button[type=submit]");if(!f.checkValidity()){f.reportValidity();return status(s,"error",t("invalidForm"))}b.disabled=true;status(s,"",t("submitting"));try{const p=payload(f);p.lang=lang;const d=await post("/api/changes",p);const issue=`<a href="${esc(d.issueUrl)}" target="_blank" rel="noreferrer">${esc(t("issueLink"))} ↗</a>`;if(d.prUrl){const pr=`<a href="${esc(d.prUrl)}" target="_blank" rel="noreferrer">${esc(t("prLink"))} ↗</a>`;status(s,"success",`${esc(t("changeSuccess"))} ${issue} · ${pr}`)}else status(s,"success",`${esc(t("issueOnly"))} ${issue}<br>${esc(t("issueOnlyReason"))}`);f.reset();refreshModeUi()}catch(err){status(s,"error",err.message==="API_NOT_CONFIGURED"?t("apiNotConfigured"):esc(err.data?.message||t("requestFailed")))}finally{b.disabled=false;loadActivity()}});

  function render(items){const root=$("#activity-list");if(!items?.length){root.innerHTML=`<p class="muted">${esc(t("noActivity"))}</p>`;return}root.innerHTML=items.map(x=>{const links=[];if(x.githubDiscussionUrl)links.push(`<a href="${esc(x.githubDiscussionUrl)}" target="_blank" rel="noreferrer">${esc(t("discussionLink"))}</a>`);if(x.githubIssueUrl)links.push(`<a href="${esc(x.githubIssueUrl)}" target="_blank" rel="noreferrer">${esc(t("issueLink"))}</a>`);if(x.githubPrUrl)links.push(`<a href="${esc(x.githubPrUrl)}" target="_blank" rel="noreferrer">${esc(t("prLink"))}</a>`);return `<article class="activity-item"><span class="activity-kind">${esc(x.kind==="discussion"?t("discussionKind"):t("changeKind"))}</span><span class="activity-title">${esc(x.title)}</span><span class="activity-links">${links.join("")}</span></article>`}).join("")}
  /* ---------- Observation log ---------- */
  // Data comes from log.js (loaded before app.js). Entries are rendered
  // newest-first; each shows its recording date, title, body, and sources.
  function renderLog(){
    const root=$("#log-list");if(!root)return;
    const entries=(window.HUMANITY_CHARTER_LOG||[]).slice().sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")));
    if(!entries.length){root.innerHTML=`<p class="muted">${esc(t("logEmpty"))}</p>`;return}
    root.innerHTML=entries.map(e=>{
      const title=(e.title&&e.title[lang])||"",body=(e.body&&e.body[lang])||"";
      const srcs=(e.sources||[]).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.label)}</a>`).join("");
      return `<article class="log-item"><span class="log-date">${esc(e.date||"")}</span><div><h3 class="log-title">${esc(title)}</h3><p class="log-body">${esc(body)}</p>${srcs?`<p class="log-sources">${srcs}</p>`:""}</div></article>`;
    }).join("");
  }
  async function loadActivity(){const root=$("#activity-list");try{const res=await fetch(`${api()}/api/activity?limit=12`,{headers:{accept:"application/json"}});if(!res.ok)throw new Error();render((await res.json()).items||[])}catch(err){root.innerHTML=`<p class="muted">${esc(err.message==="API_NOT_CONFIGURED"?t("apiNotConfigured"):t("activityFailed"))}</p>`}}
  $("#refresh-activity").addEventListener("click",loadActivity); applyLang(); loadActivity(); refreshSections();
  // Forms fail closed: the submit buttons ship disabled in the HTML and are only
  // enabled here, after every handler above is attached. If this script ever
  // fails to parse, the forms cannot submit at all — so user input can never
  // leak into the page URL through the browsers' default GET submission.
  document.querySelectorAll("[data-js-submit]").forEach(b=>{b.disabled=false});
})();
