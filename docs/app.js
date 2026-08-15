(() => {
  "use strict";
  const cfg = window.HUMANITY_CHARTER_CONFIG || {};
  const I18N = {
    "zh-CN": {
      kicker:"OPEN DRAFT · v0.2", heroTitle:"当机器比人更会思考，<br>人仍应是文明的目的。", heroCopy:"我们不声称代表全人类。我们只建立一个人人都能读、质疑、提出议题和申请修改的公开起点。", startDiscussion:"发起讨论", proposeChange:"提出修改", heroNote:"无需注册账号。你的提交会生成公开记录，任何人都可以查看。",
      principlesEyebrow:"候选原则", principlesTitle:"第一版只保留最少的共同问题。", p1Title:"生存不以经济价值为条件。", p1Body:"一个人不应仅因无法与机器竞争而失去基本生存与尊严。", p2Title:"自动化成果应广泛惠及社会。", p2Body:"具体分配方式可以争论，但极端集中不应成为默认结局。", p3Title:"人保留对文明目标的参与权。", p3Body:"AI 可以帮助寻找手段，但重大价值目标不能只由少数机构或自动系统决定。", p4Title:"每个人拥有认知与选择自由。", p4Body:"包括知情、拒绝隐秘操控，以及选择不同技术生活方式的权利。", p5Title:"宪章本身必须可以被公众修改。", p5Body:"发起人不是最终解释者。每次重要变化都应留下可公开追溯的记录。", readZhDraft:"中文完整草案 ↗", readEnDraft:"English full draft ↗",
      discussionEyebrow:"发起讨论", discussionTitle:"把一个值得共同讨论的问题放到桌面上。", discussionCopy:"提交后会生成一个公开讨论页，任何人都可以阅读和参与讨论。", fieldTitle:"标题", discussionTitlePlaceholder:"例如：失去经济价值的人是否仍有无条件生存权？", fieldContext:"背景", discussionContextPlaceholder:"这个问题为什么值得讨论？你观察到了什么？", fieldQuestion:"希望大家回答的问题", discussionQuestionPlaceholder:"尽量提出一个具体、允许不同答案的问题。", fieldName:"署名（可选）", namePlaceholder:"昵称、名字或留空匿名", publicConsent:"我知道上述内容将公开，任何人都可以阅读。", publishDiscussion:"公开发起讨论",
      changeEyebrow:"提出修改", changeTitle:"想改哪里，选哪里。", changeCopy:"选择修改类型和位置，原文会自动定位填入，你只需写出新的内容。提案会生成公开记录，经社区审阅后决定是否采纳。",
      fieldMode:"修改类型", modeModify:"修改现有内容", modeInsert:"新增内容", modeDelete:"删除内容", fieldFile:"语言版本", zhCharterOption:"中文宪章", enCharterOption:"English 宪章",
      fieldSection:"选择章节", selectSection:"请选择章节…", insertEnd:"文档末尾", docPreamble:"文档开头", fieldParagraph:"选择段落", selectParagraph:"请选择段落…", wholeSection:"整节全部内容",
      insertAfterNote:"新增内容将插入到「{section}」这一节之后：", insertEndNote:"新增内容将追加到文档末尾。",
      pickerLoadFailed:"暂时无法自动加载宪章内容，你可以在下方手动粘贴要修改的原文。", duplicateWarn:"注意：这段文字在文中出现了不止一次，请核对“现有原文”框中的内容是否准确。",
      fieldOriginal:"现有原文（自动填入，可微调）", originalPlaceholder:"在上方选择位置后自动填入，也可以手动粘贴。", fieldReplacement:"修改为", replacementPlaceholder:"写出你建议的新文本。", fieldNewContent:"新增的内容", newContentPlaceholder:"写出你要新增的内容（会插入到所选章节之后）。",
      fieldSummary:"修改摘要", summaryPlaceholder:"例如：明确“基本生存条件”不等于无限资源权利", fieldReason:"为什么要改？", reasonPlaceholder:"说明理由、潜在收益，以及可能的副作用。", changeConsent:"我知道我的提案和修改内容将公开，任何人都可以查看。", publishChange:"提交修改提案",
      activityEyebrow:"公开记录", activityTitle:"每一次提议，都有公开记录。", activityCopy:"这里显示最近的提交。完整的讨论、提案与修改历史都公开可查，任何人都可以追溯。", refresh:"刷新", loading:"正在读取公开记录…", loadingShort:"正在加载…", noActivity:"还没有公开提交。你可以成为第一个。", closing:"我们没有资格替全人类制定宪章。<br>但我们可以建立一个让更多人开始共同制定它的地方。", footerNote:"开放草案 · 所有提交公开可追溯",
      submitting:"正在提交…", discussionSuccess:"讨论已创建：", changeSuccess:"提案已提交：", issueOnly:"提案已记录，但还需要人工处理：", issueOnlyReason:"所选原文无法在当前版本中精确定位（内容可能已被别人修改过）。你可以打开提案继续说明，或返回重新选择位置后再试一次。", invalidForm:"请完整填写必填项，并确认公开发布。", apiNotConfigured:"前端尚未配置 Worker 地址。请编辑 docs/config.js。", requestFailed:"提交失败。请稍后重试。", activityFailed:"暂时无法读取公开记录。", discussionKind:"讨论", changeKind:"修改", discussionLink:"查看讨论", issueLink:"查看提案", prLink:"查看修改详情"
    },
    en: {
      kicker:"OPEN DRAFT · v0.2", heroTitle:"When machines think better than we do,<br>humans should still be an end of civilization.", heroCopy:"We do not claim to speak for humanity. We are building a public starting point that anyone can read, challenge, discuss, and amend.", startDiscussion:"Start a discussion", proposeChange:"Propose a change", heroNote:"No account required. Every submission creates a public record anyone can read.",
      principlesEyebrow:"Candidate principles", principlesTitle:"The first version keeps only the smallest shared questions.", p1Title:"Survival should not depend on economic usefulness.", p1Body:"A person should not lose the conditions of basic survival and dignity merely because they cannot compete with machines.", p2Title:"The gains of automation should benefit society broadly.", p2Body:"The mechanism is open to debate, but extreme concentration should not be the default outcome.", p3Title:"People retain a voice in civilization's goals.", p3Body:"AI can help choose means, but major value goals should not be set solely by a few institutions or automated systems.", p4Title:"Everyone has cognitive and technological freedom.", p4Body:"That includes informed choice, freedom from hidden manipulation, and the right to choose different relationships with technology.", p5Title:"The charter itself must remain amendable by the public.", p5Body:"Founders are not final interpreters. Important changes should leave an open and traceable record.", readZhDraft:"中文完整草案 ↗", readEnDraft:"English full draft ↗",
      discussionEyebrow:"Start a discussion", discussionTitle:"Put one question worth discussing on the table.", discussionCopy:"After submission, a public discussion page is created that anyone can read and join.", fieldTitle:"Title", discussionTitlePlaceholder:"e.g. If work is no longer needed, is basic survival still unconditional?", fieldContext:"Context", discussionContextPlaceholder:"Why is this worth discussing? What have you observed?", fieldQuestion:"Question for others", discussionQuestionPlaceholder:"Ask something specific that genuinely allows different answers.", fieldName:"Display name (optional)", namePlaceholder:"Name, nickname, or leave blank for anonymous", publicConsent:"I understand that the content above will be public and readable by anyone.", publishDiscussion:"Publish discussion",
      changeEyebrow:"Propose a change", changeTitle:"Pick what you want to change.", changeCopy:"Choose a change type and location — the current text is located for you automatically, and you just write the new content. Every proposal creates a public record and is reviewed by the community.",
      fieldMode:"Change type", modeModify:"Edit existing text", modeInsert:"Add new content", modeDelete:"Remove text", fieldFile:"Language version", zhCharterOption:"Chinese charter", enCharterOption:"English charter",
      fieldSection:"Choose a section", selectSection:"Choose a section…", insertEnd:"End of the document", docPreamble:"Beginning of the document", fieldParagraph:"Choose a passage", selectParagraph:"Choose a passage…", wholeSection:"The whole section",
      insertAfterNote:"New content will be inserted after the section “{section}”:", insertEndNote:"New content will be appended to the end of the document.",
      pickerLoadFailed:"The charter could not be loaded automatically. You can still paste the exact current text below.", duplicateWarn:"Note: this passage appears more than once in the document. Please double-check the “current text” box.",
      fieldOriginal:"Current text (filled in automatically, editable)", originalPlaceholder:"Filled in automatically when you pick a location above, or paste it yourself.", fieldReplacement:"Change it to", replacementPlaceholder:"Write the new text you propose.", fieldNewContent:"New content", newContentPlaceholder:"Write the content to add (it will be inserted after the chosen section).",
      fieldSummary:"Change summary", summaryPlaceholder:"e.g. Clarify that basic survival does not mean an unlimited claim on resources", fieldReason:"Why change it?", reasonPlaceholder:"Explain the reason, likely benefits, and possible downsides.", changeConsent:"I understand that my proposal and its contents will be public and readable by anyone.", publishChange:"Submit proposal",
      activityEyebrow:"Public record", activityTitle:"Every proposal leaves a public record.", activityCopy:"This shows recent submissions. Full discussions, proposals, and change history remain public and traceable by anyone.", refresh:"Refresh", loading:"Loading public activity…", loadingShort:"Loading…", noActivity:"No public submissions yet. You can be the first.", closing:"We have no right to write a charter on behalf of humanity.<br>But we can build a place where more people begin writing it together.", footerNote:"Open draft · every submission is public and traceable",
      submitting:"Submitting…", discussionSuccess:"Discussion created:", changeSuccess:"Proposal submitted:", issueOnly:"Your proposal was recorded, but it needs manual handling:", issueOnlyReason:"The selected text could not be located exactly in the current version (it may have been changed by someone else). You can continue in the proposal page, or go back and pick the location again.", invalidForm:"Please complete all required fields and confirm public publication.", apiNotConfigured:"The Worker URL is not configured yet. Edit docs/config.js.", requestFailed:"Submission failed. Please try again later.", activityFailed:"Public activity is temporarily unavailable.", discussionKind:"Discussion", changeKind:"Change", discussionLink:"View discussion", issueLink:"View proposal", prLink:"View the change"
    }
  };
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const esc = v => String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  function repoUrl(){ if(cfg.repositoryUrl) return cfg.repositoryUrl.replace(/\/$/,""); const h=location.hostname;if(!h.endsWith(".github.io"))return"";const owner=h.slice(0,-10),parts=location.pathname.split("/").filter(Boolean),repo=parts[0]||`${owner}.github.io`;return `https://github.com/${owner}/${repo}`; }
  const r=repoUrl(); if(r) $("#github-link").href=r; else $("#github-link").style.visibility="hidden";
  const qlang=new URLSearchParams(location.search).get("lang"); let lang=qlang==="en"?"en":qlang==="zh-CN"?"zh-CN":((navigator.language||"").toLowerCase().startsWith("zh")?"zh-CN":"en");
  const t=k=>I18N[lang][k]||k;
  function applyLang(){document.documentElement.lang=lang;document.title=lang==="zh-CN"?"Humanity Charter · 人类共同宪章":"Humanity Charter";$("#lang-switch").textContent=lang==="zh-CN"?"EN":"中文";$$('[data-i18n]').forEach(e=>e.innerHTML=t(e.dataset.i18n));$$('[data-i18n-placeholder]').forEach(e=>e.placeholder=t(e.dataset.i18nPlaceholder));const u=new URL(location.href);u.searchParams.set("lang",lang);history.replaceState(null,"",u);refreshModeUi()}
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
    const url=fileKey==="en"?(cfg.charterEnUrl||"./CHARTER.en.md"):(cfg.charterZhUrl||"./CHARTER.zh-CN.md");
    const res=await fetch(url,{headers:{accept:"text/plain"}});
    if(!res.ok)throw new Error("charter_fetch_failed");
    const text=await res.text();
    charterCache[fileKey]=text;return text;
  }
  // Split the charter into heading-delimited sections; each keeps its exact text
  // (so the backend can match it once) plus its paragraphs for finer selection.
  function parseSections(md){
    const lines=md.replace(/\r\n/g,"\n").split("\n");
    const blocks=[];let cur={title:"",heading:"",body:[],isPreamble:true};
    for(const line of lines){
      const m=line.match(/^#{1,6}\s+(.+)$/);
      if(m){blocks.push(cur);cur={title:m[1].trim(),heading:line,body:[],isPreamble:false}}
      else cur.body.push(line);
    }
    blocks.push(cur);
    const list=blocks.filter(s=>s.isPreamble?s.body.join("").trim():true);
    for(const s of list){
      s.text=[s.heading,...s.body].join("\n").replace(/\n+$/,"");
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
      origLabel.textContent=t("fieldOriginal");
    }else if(mode==="delete"){
      replRow.hidden=true;replField.required=false;replField.value="";
      origRow.hidden=false;origLabel.textContent=t("fieldOriginal");origField.required=true;
    }else{
      replRow.hidden=false;replLabel.textContent=t("fieldReplacement");replField.placeholder=t("replacementPlaceholder");replField.required=true;
      origRow.hidden=false;origLabel.textContent=t("fieldOriginal");origField.required=true;
    }
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
  async function loadActivity(){const root=$("#activity-list");try{const res=await fetch(`${api()}/api/activity?limit=12`,{headers:{accept:"application/json"}});if(!res.ok)throw new Error();render((await res.json()).items||[])}catch(err){root.innerHTML=`<p class="muted">${esc(err.message==="API_NOT_CONFIGURED"?t("apiNotConfigured"):t("activityFailed"))}</p>`}}
  $("#refresh-activity").addEventListener("click",loadActivity); applyLang(); loadActivity(); refreshSections();
})();
