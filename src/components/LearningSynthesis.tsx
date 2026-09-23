import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { ReportedPatternNetwork } from './ReportedPatternNetwork'
import type { LanguageMode } from '../lib/i18n'
import { capabilities, copy, goals, weeks, type GoalId } from '../lib/synthesis'

export function LearningPathway({ language }: { language: LanguageMode }) {
  const t = copy(language)
  const [week, setWeek] = useState(4)
  const item = weeks[week]
  return <section id="pathway" className="chapter synthesis-pathway" data-chapter data-no-translate aria-labelledby="pathway-title">
    <div className="synthesis-heading"><span className="synthesis-kicker">INFOSCI 301 · {t(['Weeks 1–7 + final release', '第 1–7 周与最终发布'])}</span><h2 id="pathway-title">{t(['One case. A whole learning journey.', '一个案例，贯穿完整学习旅程。'])}</h2><p>{t(['You are becoming a responsible visualization designer, an interdisciplinary contributor, and a community-rooted global leader. Use this worked example to see how those abilities become visible in a project.', '你正在成长为负责任的可视化设计者、跨学科贡献者和扎根社区的全球领导者。通过这个完整案例，看见这些能力如何体现在项目中。'])}</p></div>
    <nav className="learning-routes" aria-label={t(['Choose a learning route', '选择学习路线'])}>
      <a href="#water"><span>01</span><strong>{t(['Study the worked cases', '研究完整案例'])}</strong><small>{t(['Kunshan → Mandara → synthesis', '昆山 → 曼达拉 → 综合'])}</small><ArrowRight aria-hidden="true" /></a>
      <a href="#tutorial"><span>02</span><strong>{t(['Practise and advance', '实践与进阶'])}</strong><small>{t(['Week 5 interactions → Week 6 techniques', '第 5 周交互 → 第 6 周进阶技术'])}</small><ArrowRight aria-hidden="true" /></a>
      <a href="#innovate"><span>03</span><strong>{t(['Create your own project', '创造自己的项目'])}</strong><small>{t(['A new question → a testable contribution', '新问题 → 可检验的贡献'])}</small><ArrowRight aria-hidden="true" /></a>
    </nav>
    <div className="week-book">
      <nav aria-label={t(['Learning pathway weeks', '学习路径周次'])}>{weeks.map((w, i) => <button type="button" key={w.week} aria-pressed={week === i} onClick={() => setWeek(i)}><span>W{w.week}</span><strong>{t(w.title)}</strong></button>)}</nav>
      <article aria-live="polite"><header><span>{t(['Week', '第'])} {item.week} · {t(item.status)}</span><h3>{t(item.title)}</h3><p>{t(item.method)}</p></header><div className="synthesis-pair"><div><h4>{t(['In Water & Mountains', '在“水山之间”中'])}</h4><p>{t(item.applied)}</p></div><div><h4>{t(['In your own project', '在你自己的项目中'])}</h4><p>{t(item.transfer)}</p></div></div><footer><div className="synthesis-pager"><button type="button" onClick={() => setWeek(week - 1)} disabled={week === 0} aria-label={t(['Previous week', '上一周'])}><ChevronLeft /></button><span>{week + 1} / 7</span><button type="button" onClick={() => setWeek(week + 1)} disabled={week === 6} aria-label={t(['Next week', '下一周'])}><ChevronRight /></button></div><a href={item.href}>{t(['Explore this skill', '探索这项技能'])}<ArrowRight aria-hidden="true" /></a></footer></article>
    </div>
    <p className="synthesis-source">{t(['Course alignment: Learning and Innovation Pathway, INFOSCI 301, Fall 2026, pp. 1–4. Week 3 includes a group–CP graph; geographic waterway connectivity remains an extension.', '课程对应：《Learning and Innovation Pathway》，INFOSCI 301，2026 秋季，第 1–4 页。第 3 周包含分组–CP 关系图；地理水系连通性仍作为扩展练习。'])}</p>
  </section>
}

export function LearningSynthesis({ language, selectedGoal, onGoalChange }: { language: LanguageMode; selectedGoal: GoalId; onGoalChange: (id: GoalId) => void }) {
  const t = copy(language)
  const [capability, setCapability] = useState(0)
  const current = capabilities[capability]
  const goal = goals.find((g) => g.id === selectedGoal) ?? goals[0]
  return <section id="synthesis" className="chapter synthesis-chapter" data-chapter data-no-translate aria-labelledby="synthesis-title">
    <div className="synthesis-heading"><span className="synthesis-kicker">{t(['Synthesis · from two places to public value', '综合 · 从两地走向公共价值'])}</span><h2 id="synthesis-title">{t(['Show what your design contributes.', '让设计贡献清晰可见。'])}</h2><p>{t(['The comparison joins methods and questions while preserving each place’s history and evidence. Switch capabilities to see what the same demo demonstrates from three perspectives.', '这项比较连接方法与问题，同时保留各地的历史与证据。切换能力视角，查看同一演示如何体现三种学习成果。'])}</p></div>
    <div className="capability-switch" role="group" aria-label={t(['Learning capabilities', '学习能力'])}>{capabilities.map((c, i) => <button key={c.outcome} type="button" aria-pressed={capability === i} onClick={() => setCapability(i)}><span>0{i + 1} · {c.outcome}</span><strong>{t(c.title)}</strong></button>)}</div>
    <article className="capability-evidence" aria-live="polite"><div className="synthesis-pair"><div><span>{t(['KUNSHAN · WATER', '昆山 · 水'])}</span><p>{t(current.water)}</p><a href="#water">{t(['Inspect the water case', '查看水乡案例'])}<ArrowRight /></a></div><div><span>{t(['MANDARA · MOUNTAINS', '曼达拉 · 山'])}</span><p>{t(current.mountain)}</p><a href="#mountain">{t(['Inspect the mountain case', '查看山地案例'])}<ArrowRight /></a></div></div><footer><BookOpen aria-hidden="true" /><div><strong>{t(['What to demonstrate in your presentation', '在你的展示中证明什么'])}</strong><p>{t(current.proof)}</p></div><a href={current.href}>{t(['Try it', '试一试'])}<ArrowRight /></a></footer></article>
    <div className="frontier-strip"><h3>{t(['Three frontiers, one responsible practice', '三大前沿，一种负责任的实践'])}</h3><p>{t(['Open science, data governance, and responsible AI · Scientific communication · Human-centered spatiotemporal intelligence. Credit the source, make the interpretation understandable, and test it with the people who may use it.', '开放科学、数据治理与负责任的 AI · 科学传播 · 以人为本的时空智能。注明来源，使解释易于理解，并邀请潜在使用者检验。'])}</p></div>
    <ReportedPatternNetwork language={language} />
    <section id="sdg-contribution" className="sdg-contribution" aria-labelledby="sdg-title"><div className="synthesis-heading"><span className="synthesis-kicker">{t(['Local questions, global goals', '地方问题，全球目标'])}</span><h3 id="sdg-title">{t(['Choose a contribution you can explain and test.', '选择能够解释并检验的贡献。'])}</h3><p>{t(['Select a goal to inspect the relevant UN target, the contribution already visible here, and the work needed before claiming an outcome.', '选择目标，查看相关联合国具体目标、演示中已体现的贡献，以及主张成效前还需要完成的工作。'])}</p></div>
      <div className="sdg-selector" role="group" aria-label={t(['Select an SDG contribution', '选择 SDG 贡献'])}>{goals.map((g) => <button key={g.id} type="button" aria-pressed={g.id === selectedGoal} onClick={() => onGoalChange(g.id)}><img src={g.icon} alt={'United Nations SDG ' + g.id + ': ' + t(g.name)} width="160" height="160" loading="lazy" /><span>SDG {g.id}</span><strong>{t(g.name)}</strong></button>)}</div>
      <article className="sdg-detail" aria-live="polite" style={{ borderTopColor: goal.color }}><header><span>{t(['Target', '具体目标'])} {goal.target}</span><h4>{t(goal.meaning)}</h4><a href={'https://sdgs.un.org/goals/goal' + goal.id} target="_blank" rel="noreferrer">{t(['UN target and indicators', '联合国具体目标与指标'])}<ExternalLink /></a></header><div className="synthesis-pair"><div><h4>{t(['Kunshan application', '昆山应用'])}</h4><p>{t(goal.water)}</p></div><div><h4>{t(['Mandara application', '曼达拉应用'])}</h4><p>{t(goal.mountain)}</p></div></div><dl className="sdg-evidence"><div><dt>{t(['Demonstrated here', '本演示已体现'])}</dt><dd>{t(goal.demonstrated)}</dd></div><div><dt>{t(['Next contribution to test', '下一项待检验贡献'])}</dt><dd>{t(goal.next)}</dd></div><div><dt>{t(['Evidence boundary', '证据边界'])}</dt><dd>{t(goal.boundary)}</dd></div></dl><a className="synthesis-action" href="#innovate">{t(['Use this target in my project plan', '在项目计划中采用此目标'])}<ArrowRight /></a></article>
      <p className="sdg-credit">{t(['Official SDG icons © United Nations, shown unaltered for educational information. This independent course demonstration is not endorsed by the United Nations. The mappings above are teaching interpretations, not UN impact assessments.', '官方 SDG 图标版权归联合国所有，保持原样用于教育说明。本独立课程演示不代表联合国认可。上述对应关系是教学解读，并非联合国影响评估。'])} <a href="https://www.un.org/sustainabledevelopment/news/communications-material/" target="_blank" rel="noreferrer">{t(['Icon source and usage guidance', '图标来源与使用指南'])}</a> · <a href="#sdg-references">{t(['Full references', '完整参考文献'])}</a></p>
    </section>
    <a className="synthesis-action" href="#advanced">{t(['Now test an advanced design choice', '接下来检验一项进阶设计选择'])}<ArrowRight /></a>
  </section>
}
