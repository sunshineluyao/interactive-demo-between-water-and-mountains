import { execFileSync } from 'node:child_process'

// Share the same authored targets and weekly pathway with the website.
const content = JSON.parse(execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', "import { goals, weeks } from './src/lib/synthesis.ts'; process.stdout.write(JSON.stringify({goals,weeks}));"], { encoding: 'utf8' }))
const lines = (s) => s.trim().split('\n').map((line) => line + '\n')
const md = (s) => ({ cell_type: 'markdown', metadata: {}, source: lines(s) })
const code = (s) => ({ cell_type: 'code', metadata: {}, source: lines(s), execution_count: null, outputs: [] })
const both = (p) => p.join(' / ')

export function synthesisOverview(advanced = false) {
  return md(`## The whole learning journey / 完整学习旅程

**${advanced ? 'Week 6 advanced studio · Chapter 10: Map Color and Other Channels / 第 6 周进阶工作室 · 第 10 章：映射色彩与其他视觉通道' : 'Week 5 interactive idioms → Week 6 advanced techniques / 第 5 周交互习语 → 第 6 周进阶技术'}**

You are becoming a responsible visualization designer, an interdisciplinary contributor, and a community-rooted global leader. This notebook is a worked example and a starting point for your own contribution. / 你正在成长为负责任的可视化设计者、跨学科贡献者和扎根社区的全球领导者。本笔记本既是完整案例，也是你创造自身贡献的起点。

${content.weeks.map((w) => '**W' + w.week + ' · ' + both(w.title) + '**  \n' + both(w.method) + '  \n*Transfer / 迁移：* ' + both(w.transfer)).join('\n\n')}

**Three frontiers / 三大前沿:** Open science, data governance, and responsible AI; scientific communication; human-centered spatiotemporal intelligence. / 开放科学、数据治理与负责任的 AI；科学传播；以人为本的时空智能。

**Network boundary / 网络边界:** The atlas's mapped water lines are not a validated routable network. Define junctions, edges, and missingness before adding graph measures. CP similarity alone does not establish social ties. / 图集中的水系线条不是经过验证的路径网络。添加网络度量前，应定义交汇点、连边与缺失情况；仅凭 CP 相似性不能认定社会联系。

**Advanced color / 进阶色彩:** Categories use qualitative hue; magnitudes use ordered lightness; deviations require a meaningful reference point. Preserve labels and units while comparing designs. SDG icon colors identify goals; they are not a quantitative scale. / 类别使用定性色相；数量使用有序明度；偏差需要有意义的参考点。比较设计时保留标签与单位。SDG 图标颜色用于识别目标，而非数量色标。

Sources / 来源: Zhang, L. (2026). *INFOSCI 301: Learning and innovation pathway, Weeks 1–7 + final* [Course briefing, pp. 1–4]. Duke Kunshan University. Munzner, T. (2014). *Visualization analysis and design*, Chapters 4, 8–13. https://doi.org/10.1201/b17511
`)
}

export function synthesisExercises() {
  const goalsPython = JSON.stringify(JSON.stringify(content.goals))
  return [md(`## Synthesis: local evidence, global goals / 综合：地方证据与全球目标

${content.goals.map((g) => `<img src="https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(g.id).padStart(2,'0')}.jpg" width="96" alt="United Nations SDG ${g.id}: ${g.name[0]}">\n\n### SDG ${g.id} · ${both(g.name)} · Target / 具体目标 ${g.target}\n\n**Kunshan / 昆山:** ${both(g.water)}\n\n**Mandara / 曼达拉:** ${both(g.mountain)}\n\n**Demonstrated / 已体现:** ${both(g.demonstrated)}\n\n**Next test / 下一步检验:** ${both(g.next)}\n\n**Boundary / 边界:** ${both(g.boundary)}\n\nUnited Nations Department of Economic and Social Affairs. (n.d.). *Goal ${g.id}: ${g.name[0]}*. Retrieved September 23, 2026, from https://sdgs.un.org/goals/goal${g.id}`).join('\n\n---\n\n')}

United Nations. (n.d.). *Communications materials* [SDG icons and usage guidelines]. https://www.un.org/sustainabledevelopment/news/communications-material/

Official artwork is shown unaltered for educational information. This independent course demo is not endorsed by the UN. The mappings are teaching interpretations, not measured SDG outcomes. / 官方图标保持原样用于教育说明。本独立课程演示不代表联合国认可；目标对应关系是教学解读，并非已测量的 SDG 成效。
`), md(`## Your innovation brief / 你的创新简报

1. **Design capability / 设计能力:** State a task, an idiom, a baseline, and one advanced choice. / 明确任务、习语、比较基线与一项进阶选择。
2. **Interdisciplinary contribution / 跨学科贡献:** State what each discipline adds and one limit of the available evidence. / 说明各学科贡献与现有证据的一项限制。
3. **Community-rooted global leadership / 扎根社区的全球领导力:** Name a willing reviewer, an SDG target, a useful return, and a testable outcome. / 列明自愿审阅者、SDG 具体目标、有用的返还成果与可检验成效。

Run the next cell and change the goal, task, and advanced technique. Write your own question. Generate a proposed brief; it reports no measured impact. / 运行下一单元格，更改目标、任务与进阶技术，写下自己的问题。生成的简报是提议，不声称已测量影响。
`), code(`import json, html
from pathlib import Path
import ipywidgets as widgets
from IPython.display import display, HTML, FileLink, clear_output

sdg_goals = json.loads(${goalsPython})
goal_picker = widgets.Dropdown(options=[('SDG ' + str(g['id']) + ' / ' + g['name'][1], i) for i, g in enumerate(sdg_goals)], description='SDG')
task_picker = widgets.ToggleButtons(options=['Inspect / 检查', 'Compare / 比较', 'Trace change / 追踪变化'])
advanced_picker = widgets.ToggleButtons(options=['Ch. 10 color / 色彩', 'Animation / 动画', '3D layers / 三维分层'])
question_box = widgets.Textarea(description='Question / 问题', layout=widgets.Layout(width='95%', height='90px'))
contribution_box = widgets.Textarea(description='Disciplines / 学科', layout=widgets.Layout(width='95%', height='90px'))
review_box = widgets.Textarea(description='Test + return', placeholder='Reviewer, same task, baseline, revision / 审阅者、相同任务、基线、修订', layout=widgets.Layout(width='95%', height='90px'))
brief_output = widgets.Output()
brief_button = widgets.Button(description='Build my brief / 生成简报', button_style='info')

def make_synthesis_brief(_):
    g = sdg_goals[goal_picker.value]
    brief = {
        'status': 'Proposed contribution; outcomes not measured / 拟议贡献；成效尚未测量',
        'question': question_box.value, 'disciplines': contribution_box.value,
        'task': task_picker.value, 'advanced_technique': advanced_picker.value,
        'sdg_target': g['target'], 'target_url': 'https://sdgs.un.org/goals/goal' + str(g['id']),
        'contribution_to_test': g['next'], 'evidence_boundary': g['boundary'],
        'review_and_return': review_box.value,
    }
    target = Path('my_visualization_innovation_brief.json')
    target.write_text(json.dumps(brief, ensure_ascii=False, indent=2), encoding='utf-8')
    with brief_output:
        clear_output(wait=True)
        display(HTML('<div style="border-left:5px solid #245c70;padding:18px;background:#edf5f6;color:#20343b"><h3>My contribution / 我的贡献</h3><pre style="white-space:pre-wrap">' + html.escape(json.dumps(brief, ensure_ascii=False, indent=2)) + '</pre></div>'))
        display(FileLink(str(target)))

brief_button.on_click(make_synthesis_brief)
display(widgets.VBox([goal_picker, task_picker, advanced_picker, question_box, contribution_box, review_box, brief_button, brief_output]))
`), md(`### You are ready to… / 你已准备好……

Turn careful observation into a defensible claim, test your design with others, and return useful knowledge to a community. Your final evidence bundle should connect the demo, reproducible repository, report, poster, video, permissions, contributor credit, and AI-use disclosure. / 把细致观察转化为有依据的主张，与他人一起检验设计，并向社区返还有用知识。最终证据包应连接演示、可复现仓库、报告、海报、视频、权限、贡献者署名与 AI 使用说明。
`)]
}
