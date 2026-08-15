/* Observation log — rendered by app.js into the "观察记录" section.
   Rules (see README):
   - New entries go at the TOP; `date` is the day the observation was recorded, not the event day.
   - Every entry must carry at least one verifiable source.
   - Past entries are never edited after publication — corrections are new entries.
   Structure: { date: "YYYY-MM-DD", title: {"zh-CN", en}, body: {"zh-CN", en}, sources: [{label, url}] } */
window.HUMANITY_CHARTER_LOG = [
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
      "zh-CN": "22–25 岁群体在 AI 暴露职业的就业，比与低暴露群体保持同步的情形低约 19%（2026-08 修订版数据）；下降主要来自招聘减少而非裁员，同一研究未发现总量层面的失业增加。变化从职业的起点开始——这是「劳动换生存」前提松动最早的信号之一。",
      en: "Employment of 22–25-year-olds in AI-exposed occupations stands about 19% below where it would be had it kept pace with less-exposed peers (revised Aug 2026); the decline comes mainly from reduced hiring rather than layoffs, and the same study finds no aggregate job loss so far. The change starts at the entrance of careers — one of the earliest signals that the work-for-survival premise is loosening."
    },
    sources: [
      { label: "Stanford Digital Economy Lab · Canaries in the Coal Mine", url: "https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/" }
    ]
  },
  {
    date: "2026-08-16",
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
