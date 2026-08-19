/* Observation log — rendered by app.js into the "观察记录" section.
   Rules (see README):
   - New entries go at the TOP; `date` is the day the observation was recorded, not the event day.
   - Every entry must carry at least one verifiable source.
   - A published entry's factual claims are never rewritten. A data error gets marked
     `status: "corrected"` (plus `supersededBy` pointing at the correcting entry's `id`)
     and a fresh correction entry is added; the UI shows the old one as corrected.
   - Appending a source's own stated caveats (e.g. "correlational, not causal") to an
     entry is allowed — it restores the source's meaning; git history keeps prior versions.
   Structure: { id?, date: "YYYY-MM-DD", status?, supersededBy?, title: {"zh-CN", en}, body: {"zh-CN", en}, sources: [{label, url}] } */
window.HUMANITY_CHARTER_LOG = [
  {
    id: "2026-08-19-entry-level-correction",
    date: "2026-08-19",
    title: {
      "zh-CN": "更正：8 月 16 日「入门级招聘下降约 11%」一条引用有误。",
      en: "Correction: the Aug 16 \"entry-level hiring down ~11%\" entry misstated the finding."
    },
    body: {
      "zh-CN": "核对原始研究（Revelio Labs）后的准确数字：入门级招聘岗位比 2023 年 1 月减少超过 35%；而 11% 是回归系数——控制行业与时间趋势后，AI 暴露度每上升 10 个百分点，与入门级需求下降约 11% 相关。原作者明确强调这只是相关性，且「AI 并不能解释入门级需求下降的全部」。此前条目引用的二手转述把回归系数写成了总体降幅，已标记为「已更正」。",
      en: "After checking the original study (Revelio Labs): entry-level postings are down more than 35% versus January 2023, while the 11% figure is a regression coefficient — a 10 percentage-point increase in AI exposure is associated with an ~11% decrease in entry-level demand, controlling for industry and time trends. The authors stress this is an association and that \"AI certainly does not explain the whole decline in entry-level demand.\" The secondary source cited on Aug 16 had turned the coefficient into an overall decline; that entry is now marked corrected."
    },
    sources: [
      { label: "Revelio Labs · Is AI responsible for the rise in entry-level unemployment?", url: "https://www.reveliolabs.com/news/macro/is-ai-responsible-for-the-rise-in-entry-level-unemployment" }
    ]
  },
  {
    date: "2026-08-16",
    title: {
      "zh-CN": "AI Index 2026：编码能力接近基准满分，年度主题是「治理鸿沟」。",
      en: "AI Index 2026: coding near benchmark saturation; the year's theme is the governance gap."
    },
    body: {
      "zh-CN": "SWE-bench Verified 一年内从 60% 升至接近满分，组织采用率达 88%。报告的核心判断：能力增长正在跑赢我们度量与治理它的能力。",
      en: "SWE-bench Verified rose from 60% to near-saturation within a year, and organizational adoption reached 88%. The report's central claim: capability is now outrunning our ability to measure and govern it."
    },
    sources: [
      { label: "Stanford HAI · The 2026 AI Index Report", url: "https://hai.stanford.edu/ai-index/2026-ai-index-report" }
    ]
  },
  {
    date: "2026-08-16",
    title: {
      "zh-CN": "首份明确的就业证据：AI 暴露职业中，最年轻的劳动者先受到冲击。",
      en: "First clear labor-market evidence: in AI-exposed occupations, the youngest workers are hit first."
    },
    body: {
      "zh-CN": "22–25 岁群体在 AI 暴露职业的就业，比与低暴露群体保持同步的情形低约 19%（2026-08 修订版数据）；下降主要来自招聘减少而非裁员，同一研究未发现总量层面的失业增加。注意：这是相关性与早期描述性信号，不是 AI 导致就业下降的因果估计——作者说明部分差距早于生成式 AI 出现，控制教育变量后模式会减弱。",
      en: "Employment of 22–25-year-olds in AI-exposed occupations stands about 19% below where it would be had it kept pace with less-exposed peers (revised Aug 2026); the decline comes mainly from reduced hiring rather than layoffs, and the same study finds no aggregate job loss so far. Note: this is descriptive, correlational evidence — the authors state it is not a causal estimate of AI reducing employment; part of the gap predates generative AI, and the pattern weakens when education is controlled for."
    },
    sources: [
      { label: "Stanford Digital Economy Lab · Canaries in the Coal Mine", url: "https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/" }
    ]
  },
  {
    date: "2026-08-16",
    status: "corrected",
    supersededBy: "2026-08-19-entry-level-correction",
    title: {
      "zh-CN": "入门级招聘在过去 18 个月下降约 11%。",
      en: "Entry-level hiring down about 11% over the past 18 months."
    },
    body: {
      "zh-CN": "Revelio Labs 的招聘岗位数据分析显示入门级岗位持续收缩，而对 AI 相关技能的需求同时在上升。",
      en: "Revelio Labs postings data shows sustained contraction in entry-level hiring, alongside rising demand for AI-related skills."
    },
    sources: [
      { label: "Community College Daily · Entry-level jobs in the age of AI (Revelio Labs data)", url: "https://www.ccdaily.com/2026/02/entry-level-jobs-in-the-age-of-ai/" }
    ]
  },
  {
    date: "2026-08-16",
    title: {
      "zh-CN": "AI 可独立完成的任务时长，约每 7 个月翻一倍。",
      en: "The length of tasks AI completes independently doubles roughly every 7 months."
    },
    body: {
      "zh-CN": "2019–2025 年间，前沿模型的 50% 成功率任务时间视界呈指数增长；2025 年 3 月的领先模型已超过一小时。若趋势保持，数月量级的任务将在几年内进入范围。",
      en: "From 2019 to 2025, the 50%-success time horizon of frontier models grew exponentially; by March 2025 the leading model passed one hour. If the trend holds, month-scale tasks come into range within a few years."
    },
    sources: [
      { label: "METR · Measuring AI Ability to Complete Long Tasks", url: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/" }
    ]
  }
];
