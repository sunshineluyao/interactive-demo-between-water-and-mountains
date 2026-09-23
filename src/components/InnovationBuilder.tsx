import { ArrowRight, Download, Lightbulb } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { LanguageMode } from '../lib/i18n'
import { copy, goals, type Copy, type GoalId } from '../lib/synthesis'
import { downloadText, useDraft } from '../lib/drafts'

const tasks: Array<{ id: string; name: Copy; action: Copy; baseline: Copy }> = [
  { id: 'inspect', name: ['Inspect an item', '检查一个对象'], action: ['Select + highlight + details on demand', '选择 + 高亮 + 按需详情'], baseline: ['A labeled chart and a searchable record list', '带标签图表与可检索记录列表'] },
  { id: 'compare', name: ['Compare patterns', '比较模式'], action: ['Juxtapose views; coordinate a shared selection', '并置视图；协调共享选择'], baseline: ['Two static views with the same scale and legend', '尺度和图例相同的两个静态视图'] },
  { id: 'trace', name: ['Trace change', '追踪变化'], action: ['Change a parameter; preserve an overview; show the chosen moment', '改变参数；保留概览；显示选定时刻'], baseline: ['A static time series and a values table', '静态时间序列与数值表'] },
]
const advances: Array<{ id: string; name: Copy; check: Copy }> = [
  { id: 'color', name: ['Chapter 10 color', '第 10 章色彩'], check: ['Keep labels; test a task-matched palette in grayscale and with contrast checks.', '保留标签；在灰度视图中测试适合任务的色板，并检查对比度。'] },
  { id: 'motion', name: ['Animation', '动画'], check: ['Keep scales stable; provide pause and manual stepping; compare with a static view.', '保持尺度稳定；提供暂停和手动步进；与静态视图比较。'] },
  { id: '3d', name: ['3D layers', '三维分层'], check: ['Explain what depth means; keep a flat view; check occlusion and keyboard access.', '解释深度含义；保留平面视图；检查遮挡与键盘操作。'] },
]
const empty = { audience: '', question: '', source: '', disciplines: '', partner: '', test: '', task: 'compare', advanced: 'color' }

export function InnovationBuilder({ language, selectedGoal, onPlanChange }: { language: LanguageMode; selectedGoal: GoalId; onPlanChange: (value: string) => void }) {
  const t = copy(language)
  const [draft, setDraft, saved] = useDraft('atlas-innovation-plan-v1', empty)
  const [status, setStatus] = useState('')
  const goal = goals.find((g) => g.id === selectedGoal) ?? goals[0]
  const task = tasks.find((item) => item.id === draft.task) ?? tasks[1]
  const advanced = advances.find((item) => item.id === draft.advanced) ?? advances[0]
  const field = (key: keyof typeof empty, value: string) => setDraft((old) => ({ ...old, [key]: value }))
  const plan = [
    '## My innovation plan / 我的创新计划',
    '**Status / 状态:** Proposed design and evaluation; outcomes not yet measured. / 拟议设计与评价；成效尚未测量。',
    '**Audience / 受众:** ' + (draft.audience || '[Name a person or group / 写明人群]'),
    '**Question / 问题:** ' + (draft.question || '[Write a question / 写出问题]'),
    '**Data and permission / 数据与权限:** ' + (draft.source || '[Source URL, transformation, license or permission / 来源、转换、许可]'),
    '**Interdisciplinary contribution / 跨学科贡献:** ' + (draft.disciplines || '[Name each discipline’s role / 写明各学科角色]'),
    '**Week 5 idiom / 第 5 周习语:** ' + task.action.join(' / '),
    '**Baseline / 比较基线:** ' + task.baseline.join(' / '),
    '**Week 6 advanced choice / 第 6 周进阶选择:** ' + advanced.name.join(' / '),
    '**Access and comparison / 无障碍与比较:** ' + advanced.check.join(' / '),
    '**SDG target / SDG 具体目标:** ' + goal.target + ' · ' + goal.name.join(' / ') + ' · https://sdgs.un.org/goals/goal' + goal.id,
    '**Contribution to test / 待检验贡献:** ' + goal.next.join(' / '),
    '**Evidence boundary / 证据边界:** ' + goal.boundary.join(' / '),
    '**Reciprocal review / 互惠审阅:** ' + (draft.partner || '[Willing reviewer, permission, useful return / 自愿审阅者、权限、返还成果]'),
    '**Evaluation and revision / 评价与修订:** ' + (draft.test || '[Same task, baseline, observed errors, revision / 相同任务、基线、错误、修订]'),
    '**Release / 发布:** Demo + repository + report + poster + video; credit sources, collaborators and AI assistance. / 演示、仓库、报告、海报与视频；注明资料、合作者与 AI 辅助。',
  ].join('\n\n')
  useEffect(() => { onPlanChange(plan) }, [plan, onPlanChange])
  return <section id="innovate" className="chapter innovation-chapter" data-chapter data-no-translate aria-labelledby="innovation-title">
    <div className="synthesis-heading"><span className="synthesis-kicker">{t(['Your turn · transfer, test, contribute', '轮到你了 · 迁移、检验、贡献'])}</span><h2 id="innovation-title">{t(['Borrow the method. Make a new contribution.', '借鉴方法，创造新的贡献。'])}</h2><p>{t(['Begin with one community question and one useful task. Keep the evidence trail; change the audience, data, or design question. Your innovation can be a better explanation, a new relationship, or a more accessible way to act.', '从一个社区问题和一个有用任务开始。保留证据链，改变受众、数据或设计问题。你的创新可以是更好的解释、新的关系，或更易使用的行动方式。'])}</p></div>
    <div className="innovation-layout"><div className="innovation-form"><fieldset><legend>{t(['01 · Frame your contribution', '01 · 框定你的贡献'])}</legend><label>{t(['Who could use this?', '谁可能使用它？'])}<input value={draft.audience} onChange={(e) => field('audience', e.target.value)} /></label><label>{t(['What do they need to understand or decide?', '他们需要理解什么或作出什么决定？'])}<textarea value={draft.question} onChange={(e) => field('question', e.target.value)} rows={2} /></label><label>{t(['Source URL, transformation, and permission', '来源链接、转换与权限'])}<textarea value={draft.source} onChange={(e) => field('source', e.target.value)} rows={2} /></label><label>{t(['What does each discipline contribute?', '每个学科贡献什么？'])}<textarea value={draft.disciplines} onChange={(e) => field('disciplines', e.target.value)} rows={2} /></label></fieldset>
      <fieldset><legend>{t(['02 · Choose one task', '02 · 选择一个任务'])}</legend><div className="innovation-choices">{tasks.map((item) => <button type="button" key={item.id} aria-pressed={draft.task === item.id} onClick={() => field('task', item.id)}>{t(item.name)}</button>)}</div></fieldset>
      <fieldset><legend>{t(['03 · Test one advanced choice', '03 · 检验一项进阶选择'])}</legend><div className="innovation-choices">{advances.map((item) => <button type="button" key={item.id} aria-pressed={draft.advanced === item.id} onClick={() => field('advanced', item.id)}>{t(item.name)}</button>)}</div></fieldset>
      <fieldset><legend>{t(['04 · Make the contribution accountable', '04 · 让贡献可检验、可问责'])}</legend><label>{t(['Who will review it, and what will you return?', '谁将审阅，你会返还什么成果？'])}<textarea value={draft.partner} onChange={(e) => field('partner', e.target.value)} rows={2} /></label><label>{t(['What result would make you revise the design?', '什么结果会促使你修改设计？'])}<textarea value={draft.test} onChange={(e) => field('test', e.target.value)} rows={2} /></label></fieldset></div>
      <aside className="innovation-recipe"><Lightbulb aria-hidden="true" /><h3>{t(['Your current design recipe', '你当前的设计方案'])}</h3><dl aria-live="polite"><div><dt>{t(['Week 5 · idiom', '第 5 周 · 习语'])}</dt><dd>{t(task.action)}</dd></div><div><dt>{t(['Comparison baseline', '比较基线'])}</dt><dd>{t(task.baseline)}</dd></div><div><dt>{t(['Week 6 · advanced choice', '第 6 周 · 进阶选择'])}</dt><dd>{t(advanced.check)}</dd></div><div><dt>SDG {goal.id} · {goal.target}</dt><dd>{t(goal.name)} <a href="#sdg-contribution">{t(['Change target', '更换目标'])}</a></dd></div></dl><p>{t(['Measure a local outcome you can test; explain its relationship to the target. Do not present your usability result as a UN indicator.', '测量可以检验的地方成效，并解释其与具体目标的关系。不要把可用性结果当作联合国指标。'])}</p><button type="button" onClick={() => { downloadText(plan, 'my-visualization-innovation-plan.md', 'text/markdown'); setStatus(t(['Plan downloaded.', '计划已下载。'])) }}><Download />{t(['Download my plan', '下载我的计划'])}</button><a className="synthesis-action" href="#return">{t(['Continue to the team claim', '继续生成团队主张'])}<ArrowRight /></a><p className="draft-status">{t(saved ? ['Your draft stays on this device and is included in the team-claim export below.', '草稿保存在此设备上，并将纳入下方团队主张导出。'] : ['Download before leaving: storage is unavailable on this device.', '此设备无法保存草稿，请在离开前下载。'])}</p><p role="status">{status}</p></aside></div>
    <p className="innovation-close">{t(['You are ready to turn careful observation into trustworthy visualization, work across disciplines, and return useful knowledge to a community with curiosity, care, and confidence.', '你已准备好把细致观察转化为可信的可视化，跨学科协作，以好奇、关怀与自信向社区返还有用知识。'])}</p>
  </section>
}
