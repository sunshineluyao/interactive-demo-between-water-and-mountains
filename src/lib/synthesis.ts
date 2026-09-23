import type { LanguageMode } from './i18n'

export type Copy = readonly [string, string]
export const copy = (language: LanguageMode) => (value: Copy) => language === 'en' ? value[0] : language === 'zh' ? value[1] : value[0] + '\n' + value[1]

export const goals = [
  {
    id: 4, target: '4.7', icon: '/images/sdg/goal-04.jpg', color: '#C5192D',
    name: ['Quality education', '优质教育'],
    meaning: ['Learn to support sustainable development and respect cultural diversity.', '学习支持可持续发展，尊重文化多样性。'],
    water: ['Bilingual maps and dated rainfall readings help learners ask a precise question about Kunshan.', '双语地图与带日期的降水读数，帮助学习者提出关于昆山的具体问题。'],
    mountain: ['The CP guide separates observed pottery decoration from inferred model components.', 'CP 指南区分观察到的陶器纹饰与模型推断的成分。'],
    demonstrated: ['An open teaching resource with explanations, code, source links, and accessible controls.', '提供解释、代码、来源链接与无障碍控件的开放教学资源。'],
    next: ['Ask a learner to explain one observation and one inference before and after using the demo. Record errors and revise.', '请学习者在使用前后各解释一项观察与一项推断；记录误解并修改设计。'],
    boundary: ['Learning gains have not yet been measured. A usable tutorial is a contribution pathway, not a national SDG indicator.', '学习成效尚未测量。可用的教程是贡献路径，并非国家层面的 SDG 指标。'],
  },
  {
    id: 6, target: '6.6', icon: '/images/sdg/goal-06.jpg', color: '#26BDE2',
    name: ['Clean water and sanitation', '清洁饮水和卫生设施'],
    meaning: ['Protect and restore water-related ecosystems.', '保护和恢复与水有关的生态系统。'],
    water: ['Mapped waterways and precipitation support environmental questions that can guide further field inquiry.', '已绘制水系与降水数据支持环境问题，为后续田野调查提供方向。'],
    mountain: ['An extension question only: pottery data do not measure mountain water systems. Add a suitable environmental dataset first.', '这里只能提出延伸问题：陶器数据并不测量山地水系统。须先补充合适的环境数据。'],
    demonstrated: ['A way to inspect spatial and seasonal context around Kunshan.', '可查看昆山空间与季节语境的方法。'],
    next: ['With a local partner, choose an ecosystem question and obtain permitted measurements suited to that question.', '与本地伙伴共同选择生态系统问题，并获取获准使用、适合该问题的测量数据。'],
    boundary: ['No water quality, discharge, restoration, or ecosystem-change outcome is measured here; this is not indicator 6.6.1.', '本演示未测量水质、流量、恢复效果或生态系统变化；这不是指标 6.6.1。'],
  },
  {
    id: 11, target: '11.4', icon: '/images/sdg/goal-11.jpg', color: '#FD9D24',
    name: ['Sustainable cities and communities', '可持续城市和社区'],
    meaning: ['Support the safeguarding of cultural and natural heritage.', '支持保护文化与自然遗产。'],
    water: ['Water-town maps and field questions can help residents and visitors discuss place, access, and heritage.', '水乡地图与田野问题可帮助居民和访客讨论地方、可达性与遗产。'],
    mountain: ['A sourced pottery explanation makes archaeological methods inspectable without assigning identities to communities.', '有来源的陶器说明使考古方法可查验，同时避免替社区指定身份。'],
    demonstrated: ['Contextualized heritage interpretation and explicit limits on the comparison between places.', '具有语境的遗产解读，以及明确的跨地域比较边界。'],
    next: ['Invite a relevant resident, museum educator, or domain scholar to review usefulness, omissions, and permission to share.', '邀请相关居民、博物馆教育工作者或领域学者审阅实用性、遗漏与分享权限。'],
    boundary: ['The demo does not establish heritage status or demonstrate a conservation outcome or expenditure change.', '演示不认定遗产地位，也不证明保护成效或保护支出的变化。'],
  },
  {
    id: 16, target: '16.7', icon: '/images/sdg/goal-16.jpg', color: '#00689D',
    name: ['Peace, justice and strong institutions', '和平、正义与强大机构'],
    meaning: ['Make decision-making more inclusive, participatory, and responsive.', '促进包容、参与和回应性的决策。'],
    water: ['The missing-voices lens asks whose canal experience is absent from the map.', '“缺席的声音”视角追问：地图缺少谁的水道生活经验？'],
    mountain: ['The evidence boundary prevents statistical labels from speaking for living communities.', '证据边界避免统计标签代替当代社区发声。'],
    demonstrated: ['Traceable claims, editable interpretations, and a place to record disagreement and revisions.', '可追溯的主张、可修改的解释，以及记录异议和修订的位置。'],
    next: ['Agree who can review or withdraw a contribution. Document a correction and explain the resulting design decision.', '约定谁可审阅或撤回贡献；记录一项纠正，并解释由此作出的设计决定。'],
    boundary: ['A feedback workflow is a practice opportunity, not evidence that institutional participation has improved.', '反馈流程提供实践机会，不构成机构参与程度已经改善的证据。'],
  },
  {
    id: 17, target: '17.16', icon: '/images/sdg/goal-17.jpg', color: '#19486A',
    name: ['Partnerships for the goals', '促进目标实现的伙伴关系'],
    meaning: ['Share knowledge and expertise through partnerships.', '通过伙伴关系共享知识与专业能力。'],
    water: ['A bilingual prototype and evidence card can be returned to Kunshan partners for review.', '可向昆山伙伴返还双语原型与证据卡，邀请审阅。'],
    mountain: ['Cited archaeological sources and reusable methods allow respectful exchange across disciplines and places.', '引用考古资料、提供可复用方法，支持跨学科和跨地域的尊重性交流。'],
    demonstrated: ['Open code, two reusable Colab studios, contributor credit, and a proposed reciprocal review process.', '开放代码、两个可复用的 Colab 工作室、贡献者署名，以及拟议的互惠审阅流程。'],
    next: ['Identify a willing partner, agree a useful deliverable, return it, and record what changed following their response.', '寻找自愿参与的伙伴，商定有用成果，返还成果，并记录反馈带来的改变。'],
    boundary: ['The geographic comparison does not establish a partnership or historical connection between Kunshan and Mandara.', '地域比较并不意味着昆山与曼达拉之间已建立伙伴关系或存在历史联系。'],
  },
] as const
export type GoalId = (typeof goals)[number]['id']

export const weeks: Array<{ week: number; title: Copy; method: Copy; applied: Copy; transfer: Copy; href: string; status: Copy }> = [
  { week: 1, title: ['Notice and encode', '观察与编码'], method: ['Data types, marks, channels, and truthful comparison.', '数据类型、标记、通道与真实比较。'], applied: ['A line chart shows a quantity; CP labels identify categories rather than ranks.', '折线图表达数量；CP 标签表示类别而非等级。'], transfer: ['Name your variables and explain what each visual channel means.', '列出变量，解释每个视觉通道的含义。'], href: '#water', status: ['Applied', '已应用'] },
  { week: 2, title: ['Frame and trace', '框定问题与追溯来源'], method: ['Domain → data/task → idiom → algorithm; provenance, permissions, and responsible AI.', '领域 → 数据/任务 → 视觉习语 → 算法；来源、权限与负责任的 AI 使用。'], applied: ['The source shelf separates mapped waterways, modeled rainfall, and paper-derived archaeology.', '资料架区分地图水系、模型降水与源于论文的考古教学资料。'], transfer: ['Write one user task; record the source, transformation, permission, and AI assistance.', '写出一个用户任务；记录来源、转换、权限与 AI 辅助。'], href: '#evidence', status: ['Applied', '已应用'] },
  { week: 3, title: ['Explain relationships', '解释关系'], method: ['Nodes, links, attributes, and scientific communication.', '节点、连边、属性与科学传播。'], applied: ['A bipartite group–CP graph exposes reported relationships through linked selection and filtering. The waterway layer contains mapped lines, not a routable graph; a geographic network needs verified junctions.', '分组–CP 二分图通过联动选择和筛选呈现已报告关系。水系图层包含已绘制线条，并非路径分析图；地理网络需要核实交汇点。'], transfer: ['Define nodes and edges before computing connectivity; do not infer cultural ties from similar pottery alone.', '计算连通性前先定义节点和连边；不要仅凭相似陶器推断文化联系。'], href: '#network-example', status: ['Applied + extension', '已应用与扩展'] },
  { week: 4, title: ['Locate and contextualize', '定位与语境化'], method: ['Spatial and temporal patterns, field observation, peer critique, and revision.', '时空模式、田野观察、同伴评议与修订。'], applied: ['The globe locates two regions; the Kunshan chart reveals dated precipitation while the CP guide explains archaeological context.', '地球仪定位两个区域；昆山图表呈现带日期的降水，CP 指南解释考古语境。'], transfer: ['Keep location, time, observation, inference, and community voice distinguishable.', '区分位置、时间、观察、推断与社区声音。'], href: '#orientation', status: ['Applied', '已应用'] },
  { week: 5, title: ['Build an interaction', '构建交互'], method: ['Manipulate, facet, and reduce: an action with a visible response and reset.', '操控、分面与约简：动作要有可见反馈与重置方式。'], applied: ['Select a channel, change a month, inspect a CP, and explain what each control reveals.', '选择水道、改变月份、查看 CP，并解释每个控件揭示的内容。'], transfer: ['Build one complete task in an MVP and test it using only a keyboard.', '在 MVP 中完成一个完整任务，并只用键盘测试。'], href: '#tutorial', status: ['Practice studio', '实践工作室'] },
  { week: 6, title: ['Advance and evaluate', '进阶与评价'], method: ['Task-justified animation and 3D; Chapter 10 color and accessibility; pilot study and revision.', '以任务为依据的动画与三维；第 10 章色彩与无障碍；试点研究与修订。'], applied: ['Compare a 3D source-layer explanation with its flat view; test palette choices with the same task.', '比较三维资料分层解释与平面视图；用同一任务测试色板选择。'], transfer: ['Compare a baseline with one advanced technique; record task success, errors, and feedback.', '比较基础方案与一种进阶技术；记录任务完成情况、错误与反馈。'], href: '#advanced', status: ['Advanced studio', '进阶工作室'] },
  { week: 7, title: ['Validate and return', '验证与返还'], method: ['Exhibition, four-level validation, future roadmap, and responsible final release.', '展览、四层验证、未来路线图与负责任的最终发布。'], applied: ['The claim builder records evidence, missing voices, permissions, SDG intent, and the next check.', '主张生成器记录证据、缺席声音、权限、SDG 意图与下一步检验。'], transfer: ['Return a useful artifact, record revisions, and release the demo, repository, report, poster, and video with credits.', '返还有用成果，记录修订，附署名发布演示、仓库、报告、海报与视频。'], href: '#return', status: ['Release pathway', '发布路径'] },
]

export const capabilities: Array<{ title: Copy; outcome: string; water: Copy; mountain: Copy; proof: Copy; href: string }> = [
  { title: ['Design capability', '设计能力'], outcome: 'LO1–LO5', water: ['Match map selection and dated rainfall controls to a comparison task; keep units and a stable scale visible.', '将地图选择与带日期的降水控件匹配比较任务，保留单位与稳定尺度。'], mountain: ['Read categories through a labeled matrix and explain aggregation before importing additional records.', '通过带标签矩阵阅读类别，在导入更多记录前解释聚合过程。'], proof: ['Show one action, its visible response, its source, and a keyboard or static fallback.', '展示一个动作、可见反馈、资料来源，以及键盘或静态替代方案。'], href: '#tutorial' },
  { title: ['Interdisciplinary contribution', '跨学科贡献'], outcome: 'LO2–LO5', water: ['Geography situates canals; environmental data add time; HCI tests comprehension; local knowledge is still needed for lived meaning.', '地理学定位运河；环境数据加入时间；人机交互检验理解；生活意义仍需要地方知识。'], mountain: ['Archaeology supplies context; statistics models patterns; humanities question interpretation; visualization exposes uncertainty.', '考古学提供语境；统计学建模模式；人文学科审视解释；可视化呈现不确定性。'], proof: ['State what each discipline contributes and where one dataset cannot answer another discipline’s question.', '说清各学科的贡献，以及一个数据集何时无法回答另一学科的问题。'], href: '#bridge' },
  { title: ['Community-rooted global leadership', '扎根社区的全球领导力'], outcome: 'LO3 · LO5', water: ['Begin with a Kunshan question, ask whose experience is absent, and return a bilingual interpretation for correction.', '从昆山问题出发，追问谁的经验缺席，返还双语解释以接受纠正。'], mountain: ['Credit sources, respect interpretive limits, and invite appropriate expertise before speaking about living communities.', '注明来源，尊重解释边界，在论述当代社区前邀请适当的专业意见。'], proof: ['Name a beneficiary, a target, a willing reviewer, a useful return, and an outcome you will evaluate.', '列明受益者、具体目标、自愿审阅者、有用的返还成果与拟评价的结果。'], href: '#sdg-contribution' },
]
