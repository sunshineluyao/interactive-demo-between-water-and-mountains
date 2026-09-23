import { useLayoutEffect, type RefObject } from 'react'

export type LanguageMode = 'en' | 'zh' | 'bilingual'

/*
 * English remains the authored source language so citations, code, and data labels
 * stay stable. This ledger localizes the learning interface and narrative copy.
 * APA citations, source titles, code, URLs, and user-authored notes are intentionally
 * left in their original language.
 */
export const zhTranslations: Record<string, string> = {
  // Global navigation and journey
  'Skip to community questions': '跳至社区问题',
  'Between Water and Mountains home': '“水山之间”首页',
  'Tutorial': '教程',
  'Pause motion': '暂停动画',
  'Enable motion': '启用动画',
  'Explore': '探索',
  'Chapters': '章节',
  'Full references & credits': '完整参考文献与致谢',
  'Orient the journey': '定位这段旅程',
  'Locate both places and their sources': '定位两地及其资料来源',
  'Choose the question': '选择问题',
  'Begin with community, not controls': '从社区出发，而非从控件出发',
  'Learn the interactions': '学习交互方式',
  'Name every action and response': '说清每个动作与系统回应',
  'Meet the evidence': '认识证据',
  'Look closely at a source': '仔细查看一项资料',
  'Follow the water': '循水而行',
  'Kunshan, in space and time': '时空中的昆山',
  'Read the mountain': '阅读山地证据',
  'Traces of material history': '物质历史的痕迹',
  'Build the bridge': '搭建对话之桥',
  'Two places, an open question': '两地，一个开放问题',
  'Validate the claim': '验证主张',
  'Check it with someone else': '请他人共同检验',
  'Return the question': '把问题带回去',
  'Carry it into your project': '把它带入你的项目',
  'Back to the beginning': '返回开头',
  'Every image has an author.': '每一幅图像都有作者。',
  'These photographs introduce places. They are not records of our fieldwork or images of the excavated sites.': '这些照片用于介绍地点，并非本课程田野工作的记录，也不是考古发掘现场的影像。',

  // Orientation
  'Global orientation · 全球定位': '全球定位',
  'Two places.': '两个地方。',
  'One careful question.': '一个审慎的问题。',
  'Before comparing evidence, locate it. Kunshan is in eastern China; the Mandara Mountains cross the Cameroon–Nigeria border. This atlas connects questions—not histories, peoples, or causes.': '比较证据之前，先确定它们的位置。昆山位于中国东部；曼达拉山脉横跨喀麦隆与尼日利亚边境。本图集连接的是问题，而不是历史、族群或因果关系。',
  'Choose a community question': '选择一个社区问题',
  'Interactive 3D orientation. Pointer movement changes the view; the controls provide a keyboard-accessible route. Marker positions are regional, and the arc represents the course question—not migration or a historical connection.': '交互式三维定位：拖动可旋转，滚轮或双指可缩放，键盘控件提供无障碍路径。标记表示区域位置，弧线代表课程中的比较问题，而非迁徙路线或历史联系。',
  'Kunshan': '昆山',
  'Mandara region': '曼达拉地区',
  'question bridge': '问题之桥',
  'Mapped water / 已绘制水系': '已绘制水系 / Mapped water',
  'Seasonal climate / 季节气候': '季节气候 / Seasonal climate',
  'Material patterns / 物质模式': '物质模式 / Material patterns',
  'Rings locate a spatial source—not flow.': '环形标记用于定位空间资料，并不表示水流。',
  '12 orbiting marks = 12 months—not storms.': '12 个环绕标记代表 12 个月，并非风暴。',
  '14 facets = inferred CP labels—not peoples.': '14 个切面代表推断的 CP 标识，并非族群。',
  'animated globe + time': '动画地球仪 + 时间',
  'GPU spatial layers': 'GPU 空间图层',
  '3D orientation controls': '三维定位控制',
  'Guided 3D story': '三维导览故事',
  'Play tour': '播放导览',
  'Pause tour': '暂停导览',
  'Previous guided step': '上一个导览步骤',
  'Next guided step': '下一个导览步骤',
  '1 · Locate before comparing': '1 · 比较之前先定位',
  '2 · Read mapped context': '2 · 阅读地图语境',
  '3 · Add time carefully': '3 · 审慎加入时间维度',
  '4 · Move to material evidence': '4 · 转向物质证据',
  '5 · Return to the question': '5 · 回到问题本身',
  'The cyan marker is Kunshan in eastern China; the coral marker locates the wider Mandara study region on the Cameroon–Nigeria border.': '青色标记是中国东部的昆山；珊瑚色标记定位喀麦隆—尼日利亚边境更广泛的曼达拉研究区域。',
  'Concentric rings introduce the mapped waterway snapshot. They signal a spatial source—not measured water flow.': '同心环引入已绘制水系快照。它们表示空间资料来源，而不是实测水流。',
  'Twelve orbiting points stand for months in the NASA POWER record. They do not represent storms travelling around Kunshan.': '十二个环绕点代表 NASA POWER 记录中的月份，并不表示风暴正在昆山周边移动。',
  'Fourteen coral points introduce CP1–CP14 as model identifiers. They are not excavation locations or names for peoples.': '十四个珊瑚色点将 CP1–CP14 作为模型标识符引入；它们不是发掘地点，也不是族群名称。',
  'The gold arc connects a course question only. It does not claim migration, causality, or a historical route between the places.': '金色弧线只连接一个课程问题，并不主张两地之间存在迁徙、因果关系或历史路线。',
  '01 · Place view': '01 · 地点视角',
  'Choose a place view': '选择地点视角',
  'View both': '查看两地',
  'Mandara': '曼达拉',
  '02 · Source layer': '02 · 资料图层',
  'Choose a data source layer': '选择资料图层',
  'Mapped context': '地图语境',
  'Climate': '气候',
  'Material history': '物质历史',
  'Mapped context · OpenStreetMap': '地图语境 · OpenStreetMap',
  'Environmental context · NASA POWER': '环境语境 · NASA POWER',
  'Material history · tDAR + O’Brien et al.': '物质历史 · tDAR + O’Brien 等',
  '420 waterway ways': '420 条水系要素',
  '300 monthly means · 2001–2025': '300 个逐月均值 · 2001–2025',
  '239,629 sherds · 14 primary inferred patterns': '239,629 件陶片 · 14 个主要推断模式',
  'Rivers, canals, and streams provide spatial context around Kunshan. The pulsing rings are a schematic source symbol; actual channel geometry appears in the water chapter.': '河流、运河与溪流构成昆山周边的空间语境。脉冲环只是资料类型的示意符号；真实水道几何形态见“循水而行”章节。',
  'The twelve orbiting points stand for months and introduce a time-varying record at 31.39° N, 120.98° E. The water chapter exposes every monthly value.': '十二个环绕点代表月份，用来介绍北纬 31.39°、东经 120.98°处随时间变化的记录；“循水而行”章节展示全部逐月数值。',
  'Fourteen orbiting points introduce CP1–CP14 as model identifiers. The mountain chapter explains how observed decoration counts become inferred patterns.': '十四个环绕点将 CP1–CP14 作为模型标识符引入；“阅读山地证据”章节解释观察到的纹饰计数如何转化为推断模式。',
  'Map completeness and tagging vary. A mapped line is not flow, water quality, or lived meaning.': '地图完整度与标注方式并不一致。地图上的线条不等于水流、水质或生活经验。',
  'Modeled precipitation context is not a local rain gauge, flood record, channel discharge, or water-quality measure.': '模型化降水语境不等同于本地雨量计、洪水记录、水道流量或水质测量。',
  'The points are a teaching diagram, not geographic positions. A CP is not a named people, culture, date, or chapter.': '这些点是教学示意，并非地理位置。CP 不是某个有名称的族群、文化、年代或章节。',
  'Open source': '打开资料来源',
  'Why these places matter': '为什么这两个地方值得关注',
  'Jiangsu, China · 中国江苏': '中国江苏',
  'Cameroon–Nigeria border · 喀麦隆—尼日利亚边境': '喀麦隆—尼日利亚边境',
  'about 11° N, 14° E · regional orientation': '约北纬 11°、东经 14° · 区域定位',
  'A lower-Yangtze-delta city where canals, changing weather, heritage, and everyday mobility make water a community question—not just a line on a map.': '昆山位于长江下游三角洲。运河、变化的天气、文化遗产与日常出行，使“水”成为社区问题，而不仅是地图上的一条线。',
  'A highly diverse borderland where archaeological ceramics help researchers ask how material patterns varied across sites and excavation levels.': '这是一个高度多样的边境地区；考古陶片帮助研究者追问物质模式如何随遗址与发掘层位而变化。',
  'The atlas uses mapped waterways and modeled precipitation. It does not measure canal flow, flooding, water quality, or residents’ experience.': '本图集使用已绘制水系与模型化降水数据，并未测量运河流量、洪涝、水质或居民体验。',
  'The marker locates the wider study region, not an excavation. Statistical pottery patterns are not names for peoples or present-day communities.': '标记定位的是更广泛的研究区域，而非某个发掘点。陶器统计模式也不是族群或当代社区的名称。',
  'Locate on OpenStreetMap': '在 OpenStreetMap 上定位',
  'Open Kunshan climate record': '打开昆山气候记录',
  'Read the archaeological study': '阅读考古研究',
  'A question-making lens, not evidence.': '这是提出问题的视角，而非证据。',
  'Our teaching translation from': '本课程教学译文取自',
  ', Yong Ye. It is commonly numbered 6.23; the linked Wikisource edition labels it 六之二一. The passage does not describe Kunshan or Mandara and should not be used as a cultural label for either place.': '《雍也》。该章句通常编号为 6.23；所链接的维基文库版本标为“六之二一”。这段文字并非描述昆山或曼达拉，也不应被用作任何一地的文化标签。',
  'Source: Chinese Wikisource · Yong Ye': '来源：中文维基文库 ·《雍也》',

  // Community questions
  'Start with people, not controls': '从人出发，而非从控件出发',
  'you will carry.': '并带着它继续探索。',
  'A useful interaction begins with something a person needs to notice, compare, challenge, or explain. Choose one lens now; the atlas will bring it back after you inspect the evidence.': '有用的交互始于人真正需要注意、比较、质疑或解释的事情。现在选择一个视角；查看证据之后，图集会把这个问题再次带回来。',
  'Choose a community question lens': '选择社区问题视角',
  'Movement': '流动',
  'Continuity': '延续',
  'Missing voices': '缺席的声音',
  'Trace routes and exchange without assuming that a visible pattern explains why people moved.': '追踪路径与交流，但不要假定可见模式已经解释了人们为何移动。',
  'Look for recurrence while keeping alternatives such as aggregation and incomplete observation visible.': '寻找重复出现的现象，同时保留聚合效应与观察不完整等替代解释。',
  'Use absence as a prompt for listening, consent, and a better evidence plan—not as a claim about a community.': '把缺席视为倾听、征得同意与改进证据计划的起点，而不是对某个社区下结论。',
  'Who uses this waterway, and how might their routes change with the seasons?': '谁在使用这条水道？他们的路线可能如何随季节变化？',
  'What might a changing decoration pattern suggest about exchange?': '纹饰模式的变化可能对交流提出哪些线索？',
  'What remains familiar to someone returning to the same canal?': '当一个人再次回到同一条运河时，哪些事物仍然熟悉？',
  'Which reported decoration patterns recur across places or excavation levels?': '哪些已报告的纹饰模式会在不同地点或发掘层位中重复出现？',
  'Whose experience of this waterway is absent from the map?': '谁对这条水道的体验没有出现在地图中？',
  'What can a pottery record leave out about the people who made and used it?': '陶器记录可能遗漏了制作者与使用者的哪些信息？',
  'A mapped route and a pottery pattern offer different kinds of evidence. Neither tells us why people moved.': '地图路径与陶器模式提供的是不同类型的证据；二者都不能直接说明人们为何移动。',
  'A recurring pattern might reflect continuity, aggregation, or incomplete observation. It needs another check.': '重复出现的模式可能来自延续、聚合或观察不完整，仍需进一步核查。',
  'Public datasets carry partial views. People and communities can challenge the questions we bring to them.': '公共数据集只呈现局部视角；人们与社区有权质疑我们带去的问题。',
  'Kunshan · question for the present': '昆山 · 面向当下的问题',
  'Mandara · Rhumsiki regional view, not an excavation site': '曼达拉 · 鲁姆西基区域景观，并非发掘现场',
  'Evidence boundary': '证据边界',
  'Suggested interaction lenses:': '建议采用的交互视角：',
  'Your lens stays selected': '你选择的视角将被保留',
  'Learn which interaction can answer it': '了解哪种交互可以回应它',

  // Interaction tutorial and decision path
  'Interaction tutorial · learn it inside the project': '交互教程 · 在项目中边做边学',
  'Interaction is a way': '交互是一种',
  'of thinking with evidence.': '与证据共同思考的方式。',
  'A control earns its place when it helps someone notice a pattern, compare evidence, test an interpretation, or expose what the data cannot answer. Name the intent, action, response, evidence, and reset—not only the widget.': '只有当控件帮助人们发现模式、比较证据、检验解释，或揭示数据无法回答的问题时，它才有存在的理由。请说明意图、动作、回应、证据与重置方式，而不仅仅是控件名称。',
  'Open Munzner’s Ch. 11–12 slides': '打开 Munzner 第 11–12 章讲义',
  'Change · Select · Navigate': '改变 · 选择 · 导航',
  'Manipulate': '操作视图',
  'Juxtapose · Coordinate': '并置 · 协调',
  'Facet': '分面',
  'Filter · Aggregate': '筛选 · 聚合',
  'Reduce': '约简',
  'Change, select, and navigate sit within manipulate; juxtapose, partition, and superimpose sit within facet.': '改变、选择与导航属于视图操作；并置、分区与叠加属于分面。',
  'Your selected community lens': '你选择的社区问题视角',
  'Selected community question and suggested interactions': '已选择的社区问题与建议交互方式',
  'Change the question lens': '更换问题视角',
  'One coherent learning route': '一条连贯的学习路径',
  'Question → evidence → interaction → validation': '问题 → 证据 → 交互 → 验证',
  'The interface is not the starting point. Follow this sequence so every animation, slider, map, and comparison serves an accountable learning goal.': '界面并不是起点。请沿着这一顺序，让每个动画、滑块、地图与比较都服务于一个可问责的学习目标。',
  'Current question lens': '当前问题视角',
  'Question': '问题',
  'Interaction': '交互',
  'Validation': '验证',
  'Begin with a human question.': '从人的问题出发。',
  'Name what a person or community needs to notice, compare, challenge, or explain before choosing a chart or control.': '在选择图表或控件之前，先说清个人或社区需要注意、比较、质疑或解释什么。',
  'Can the question be understood without seeing the interface?': '不看界面，别人也能理解这个问题吗？',
  'Revisit the community lenses': '返回社区问题视角',
  'Respect what the source can support.': '尊重资料能够支持的结论边界。',
  'Identify the records, scale, transformation, missing voices, and evidence boundary before encoding anything.': '在进行任何编码之前，先识别记录、尺度、转换、缺席的声音与证据边界。',
  'Can a reader tell what the data does not establish?': '读者能否看出这些数据无法证明什么？',
  'Inspect the source shelf': '检查资料架',
  'Choose an action that reveals something.': '选择一个能够揭示新认识的动作。',
  'Connect one user action to one visible response, one analytical purpose, and a clear way to reset or recover.': '把一个用户动作连接到一个可见回应、一个分析目的，以及清晰的重置或恢复方式。',
  'Does moving the control change what the learner can understand?': '移动控件是否改变了学习者能够理解的内容？',
  'Try the guided studio': '进入引导式工作室',
  'Return the interpretation for challenge.': '把解释带回去接受质疑。',
  'Check the domain, data and task, visual idiom, and algorithm—then invite community feedback before making a claim.': '依次检查领域、数据与任务、视觉表达和算法，并在提出主张之前邀请社区反馈。',
  'Who can disagree, and what would make you revise the design?': '谁可以提出不同意见？什么证据会让你修改设计？',
  'See the four validation checks': '查看四项验证检查',
  'Checkpoint': '检查点',
  'Play route': '播放路径',
  'Pause route': '暂停路径',
  'Four-step evidence design route': '四步证据设计路径',
  '01 · Name the vocabulary': '01 · 明确术语',
  'Begin with the analytical intent—not the visual effect.': '从分析意图出发，而不是从视觉特效出发。',
  'Munzner’s terms give the class a shared language. The same word should describe the same relationship in the app, the notebook, and the final presentation.': 'Munzner 的术语为课堂提供共同语言；同一个词在应用、笔记本与最终展示中都应描述同一种关系。',
  '02 · Choose a design path': '02 · 选择设计路径',
  '03 · Practice the interaction': '03 · 练习交互',
  'Move one control, then explain what changed.': '移动一个控件，再解释发生了什么变化。',
  'Each studio step follows the same logic: intent → action → response → evidence → reset. The before/after slider makes the consequence visible before students try the live chapter.': '工作室的每一步都遵循同一逻辑：意图 → 动作 → 回应 → 证据 → 重置。前后对比滑块先把结果呈现出来，再让学生进入实时章节练习。',
  '04 · Compare with the textbook': '04 · 对照教材',
  '05 · Compare with research': '05 · 对照研究',
  '06 · Rebuild in Colab': '06 · 在 Colab 中重建',
  '07 · Test color and 3D': '07 · 检验色彩与三维效果',
  '08 · Explain and return': '08 · 解释并带回问题',
  'Designer decision tree': '设计者决策树',
  'Four decisions. No layer has more than three choices.': '四层决策，每层不超过三个选项。',
  'Use the path to connect a learning question to an evidence type, reader task, and interaction. Every choice rewrites the recommendation and its next test.': '沿着这条路径，把学习问题连接到证据类型、读者任务与交互方式。每次选择都会改写设计建议与下一项检验。',
  '01 · Question': '01 · 问题',
  'What should a person learn?': '希望使用者学到什么？',
  'Locate + orient': '定位与定向',
  'Trace change': '追踪变化',
  'Invite interpretation': '邀请解释',
  '02 · Evidence': '02 · 证据',
  'What structure does the evidence have?': '证据具有怎样的结构？',
  'Space + time': '空间 + 时间',
  'Relations': '关系',
  'Community + qualitative': '社区 + 质性资料',
  '03 · Reader task': '03 · 读者任务',
  'What must the person do?': '使用者需要完成什么？',
  'Compare': '比较',
  'Explain + communicate': '解释 + 沟通',
  '04 · Interaction': '04 · 交互',
  'What response best supports that task?': '哪种系统回应最能支持该任务？',
  'Select + details': '选择 + 详情',
  'Filter + change': '筛选 + 改变',
  'Coordinate + annotate': '协调视图 + 注释',
  'Reset path': '重置路径',
  'Recommended design': '推荐设计',
  'Validation levels': '验证层级',
  'Domain + community': '领域 + 社区',
  'Data + task': '数据 + 任务',
  'Idiom': '视觉表达',
  'Algorithm': '算法',
  'One next test': '下一项检验',
  'Try this pattern in the atlas': '在图集中试用这一模式',
  'Learning goal': '学习目标',
  'Action': '动作',
  'System response': '系统回应',
  'Reset + access': '重置 + 无障碍',
  'Selection and highlighting': '选择与高亮',
  'Selection is state; highlighting is the visual feedback used to reveal that state.': '选择是一种状态；高亮是让这一状态可见的视觉反馈。',
  'Change parameters': '改变参数',
  'Adjust a parameter while preserving context.': '在保留语境的同时调整参数。',
  'Overview + detail': '概览 + 详情',
  'Reveal one record without losing the overview.': '在不丢失概览的前提下揭示一条记录。',
  'Coordinate views': '协调多个视图',
  'Carry one choice across views and into a note.': '让一次选择贯穿多个视图并进入笔记。',
  'Details on demand': '按需查看详情',
  'A tooltip or detail view should supplement—never hide—the information needed for an overview.': '工具提示或详情视图应补充信息，而不应遮蔽理解概览所需的信息。',
  'Author + export': '创作 + 导出',
  'Author + annotate': '创作 + 注释',
  'Make reasoning visible to someone else.': '让他人看得见你的推理过程。',
  'Before': '之前',
  'After': '之后',
  'Drag the divider or use the arrow keys to reveal the interaction’s before and after states.': '拖动分隔线或使用方向键，查看交互前后的状态。',
  'What changed': '发生了什么变化',
  'Your five-line demo script': '你的五行演示脚本',
  'Previous': '上一个',
  'Next': '下一个',
  'Textbook screenshots': '教材截图',
  'See the vocabulary in Munzner’s own examples.': '在 Munzner 的原始示例中查看这些术语。',
  'These small teaching excerpts come from the author’s publicly accessible interaction slides. Each is paired with the place where the same design question appears in this atlas.': '这些教学节选来自作者公开可访问的交互讲义；每个示例都与本图集中对应的设计问题配对。',
  'Research pattern gallery': '研究交互案例库',
  'Use these systems as precedents for interaction quality. The labels below say whether the pattern is already present, a reference, or an explicit next step—so the atlas never overstates its functionality.': '这些系统可作为交互质量的参照。下方标签区分“已应用”“参考模式”与“下一步”，避免图集夸大自身功能。',
  'Choose a research interaction example': '选择一个研究交互案例',
  'Replay animation': '重播动画',
  'Motion is paused, so animated examples show a representative frame. Enable motion in the header to play them.': '动画已暂停，因此示例显示代表性静帧；可在页首重新启用动画。',
  'Applied pattern': '已应用模式',
  'Reference pattern': '参考模式',
  'Extension pattern': '拓展模式',
  'Try it live': '现场试用',
  'Open every full APA-style source and data credit': '打开全部 APA 格式来源与数据致谢',

  // Colab
  'Embedded Colab companion': '嵌入式 Colab 学习伙伴',
  'Rebuild every pattern with the real teaching snapshots.': '使用真实教学数据快照重建每一种交互模式。',
  'The guide below previews the executable notebook inside the story. Open it in Google Colab for live Python outputs, or download the versioned notebook and run it elsewhere.': '下面的指南在故事中预览可执行笔记本。可在 Google Colab 中打开并获得实时 Python 输出，或下载版本化笔记本在其他环境运行。',
  'The redesigned notebook is a bilingual interactive studio—not a static code appendix. Its four complementary libraries make location, selection, change, coordination, authorship, and validation directly testable.': '重新设计的笔记本是一间双语交互工作室，而不是静态代码附录。四个互补工具库让定位、选择、改变、协调、创作与验证都可直接检验。',
  'Interactive notebook package stack': '交互式笔记本工具栈',
  '3D globe + time': '三维地球仪 + 时间',
  'spatial layers': '空间图层',
  'linked selections': '联动选择',
  'decisions + authoring': '决策 + 创作',
  'Notebook tutorial steps': '笔记本教程步骤',
  'Orient': '定位',
  'Inspect': '查看',
  'Select': '选择',
  'Change': '改变',
  'Coordinate': '协调',
  'Decide': '决策',
  'Author': '创作',
  'Validate': '验证',
  'Put both places on an interactive globe': '把两地放到可交互地球仪上',
  'Select a CP label and expose its meaning': '选择一个 CP 标识并揭示其含义',
  'Change time without moving the baseline': '改变时间，但保持比较基准稳定',
  'Brush an overview and update a detail view': '框选概览并联动更新详情视图',
  'Keep observation, interpretation, and limitation separate': '把观察、解释与局限分开记录',
  'Turn a visual idea into a testable design path': '把视觉想法转化为可检验的设计路径',
  'Tilt through the mapped waterway layer': '倾斜查看已绘制水系图层',
  'Select a CP label and reveal its context': '选择 CP 标识并揭示其语境',
  'Brush an overview and update its detail': '框选概览并联动更新详情',
  'Navigate four bounded design decisions': '导航四层有限设计决策',
  'Build an inspectable evidence card': '生成可检查的证据卡',
  'Test the result at four levels': '在四个层级检验结果',
  'Rotate, zoom, hover, and switch projections while keeping the comparison arc explicitly schematic.': '旋转、缩放、悬停并切换投影，同时明确把比较弧线保持为示意符号。',
  'Pan, rotate, zoom, and hover over the bundled OpenStreetMap geometries in a pitched spatial view.': '在倾斜空间视图中平移、旋转、缩放并悬停查看随附的 OpenStreetMap 几何数据。',
  'Use linked selection to highlight a model identifier without turning CP numbers into names or chronology.': '使用联动选择高亮模型标识，同时避免把 CP 编号误作名称或年代顺序。',
  'Use a bilingual month control with a responsive chart while keeping units, source, and y-scale stable.': '使用双语月份控件与响应式图表，同时保持单位、资料来源与纵轴比例稳定。',
  'Drag an interval across the overview; a shared selection filters the larger detail view and can be cleared.': '在概览上拖动选择区间；共享选择会筛选更大的详情视图，并可随时清除。',
  'Choose among three options at each layer and receive an interaction recommendation plus a falsifiable test.': '每层从三个选项中选择，并获得交互建议与一个可证伪的检验。',
  'Keep observation, interpretation, evidence boundary, and next check separate and editable.': '让观察、解释、证据边界与下一步检验保持分离且可编辑。',
  'Move from domain and community through data, idiom, and algorithm before making a public claim.': '在提出公开主张之前，依次检验领域与社区、数据、视觉表达和算法。',
  'Location becomes inspectable; the dotted arc remains a course question, not a historical route.': '位置变得可检查；虚线弧仍只代表课程问题，而非历史路线。',
  'The 3D view reveals mapped spatial density; color still describes tags—not flow or water quality.': '三维视图揭示已绘制要素的空间密度；颜色仍表示标签，而非流量或水质。',
  'One selection updates both the matrix and its contextual detail while the evidence boundary stays visible.': '一次选择同时更新矩阵与语境详情，并始终保持证据边界可见。',
  'The result changes one parameter at a time, making before/after readings directly comparable.': '结果每次只改变一个参数，使前后读数可直接比较。',
  'Overview and detail share state, so the reader keeps context while inspecting a smaller time window.': '概览与详情共享状态，因此读者在查看较小时间窗口时仍能保留语境。',
  'The navigator returns a reasoned design path—not a decorative menu of effects.': '导航器返回有理由的设计路径，而非装饰性效果菜单。',
  'The result preserves a bilingual reasoning trace without uploading or automatically submitting anything.': '结果保存双语推理痕迹，不会上传或自动提交任何内容。',
  'A peer can see what was checked, what remains uncertain, and what could change the conclusion.': '同伴可以看见哪些内容已检查、哪些仍不确定，以及什么可能改变结论。',
  'Live result preview · 实时结果预览': '实时结果预览',
  'Rotate the globe, inspect exact coordinates, and distinguish regional orientation from excavation-site location.': '旋转地球仪，查看精确坐标，并区分区域定位与发掘点位置。',
  'Use an Altair point selection to highlight a model identifier while keeping the evidence boundary visible.': '使用 Altair 点选来高亮模型标识，同时保持证据边界可见。',
  'Bind a month parameter to the real NASA POWER snapshot and preserve stable units and scale.': '将月份参数绑定到真实 NASA POWER 快照，并保持单位与比例尺稳定。',
  'Link an interval selection across views and compare it with a simple filter or aggregation.': '在多个视图间联动区间选择，并与简单筛选或聚合进行比较。',
  'Use an evidence-card widget inspired by authoring research while keeping every field inspectable and editable.': '使用受可视化创作研究启发的证据卡控件，同时保证每个字段都可查看、可编辑。',
  'Use the same three-choice decision layers as the embedded design tree, then write one falsifiable next test.': '使用与嵌入式设计树相同的三选项决策层，并写出一个可证伪的下一步检验。',
  'What the output should teach': '输出应帮助理解什么',
  'Changing the globe view teaches location; it does not imply a historical connection.': '改变地球仪视角用于理解位置，并不暗示历史联系。',
  'Selection reveals a record and its status; CP numbers remain identifiers, not names or chronology.': '选择会揭示一条记录及其状态；CP 编号仍只是标识符，并非名称或年代顺序。',
  'The chosen month changes; units, source, and the wider time series stay available for comparison.': '所选月份会改变，但单位、资料来源与更完整的时间序列始终保留以供比较。',
  'One shared state coordinates two views; the reader can still clear the selection and recover.': '一个共享状态协调两个视图；读者仍可清除选择并恢复初始状态。',
  'Authoring preserves a reasoning trace; it does not make the interpretation true or submit anything automatically.': '创作过程保存推理痕迹，但不会让某种解释自动成为事实，也不会自动提交内容。',
  'The notebook returns a recommended idiom, evidence boundary, and a test—not a decorative effect list.': '笔记本返回推荐的视觉表达、证据边界与检验，而不是一串装饰效果。',
  'Open executable notebook in Colab': '在 Colab 中打开可执行笔记本',
  'Download .ipynb': '下载 .ipynb',
  'The notebook loads the same OpenStreetMap, NASA POWER, and Mandara teaching snapshots used here. It labels schematic, observed, derived, and inferred content separately.': '笔记本载入与本网站相同的 OpenStreetMap、NASA POWER 与曼达拉教学快照，并分别标记示意、观察、派生与推断内容。',
  'The notebook loads the same versioned OpenStreetMap, NASA POWER, and Mandara teaching snapshots used here. It labels schematic, observed, derived, inferred, and interpretive content separately; no result is uploaded automatically.': '笔记本载入与本网站相同、经过版本控制的 OpenStreetMap、NASA POWER 与曼达拉教学快照，并分别标记示意、观察、派生、推断与解释内容；任何结果都不会自动上传。',

  // Evidence shelf
  'A record is only': '一条记录只是',
  'a beginning.': '开始。',
  'Choose a source. Open one record. Notice what it describes, and what you would still need to ask.': '选择一个资料来源，打开一条记录，注意它描述了什么，以及你仍需追问什么。',
  'Choose an evidence source': '选择证据来源',
  'Source inspection': '资料检查',
  'inspected': '已检查',
  'Mapped waterways': '已绘制水系',
  'Monthly precipitation': '逐月降水',
  'Archaeological ceramics': '考古陶片',
  '“Water / mountain” pairing': '“水 / 山”配对',
  'Spatial · Kunshan': '空间 · 昆山',
  'Temporal · Kunshan': '时间 · 昆山',
  'Space + depth · Mandara': '空间 + 深度 · 曼达拉',
  'Interpretation · course lens': '解释 · 课程视角',
  'A dated, simplified extract of rivers, canals and streams in the Kunshan–Jinxi–Zhouzhuang area.': '昆山—锦溪—周庄地区河流、运河与溪流的简化时点快照。',
  'NASA POWER corrected precipitation at a point near Kunshan, drawn from MERRA‑2 at native source resolution.': '来自 MERRA‑2 原始资料分辨率的 NASA POWER 校正降水数据，定位于昆山附近一个点。',
  'Cleaned pottery observations from the Mandara region south of Lake Chad, indexed by site, unit, level and decoration.': '乍得湖以南曼达拉地区的清洗后陶片观察记录，按遗址、单位、层位与纹饰索引。',
  'An instructor-created bridge inspired by the Analects. It frames questions; it does not assign cultural meaning to either community.': '受《论语》启发、由教师设计的对话桥梁。它用于提出问题，并不为任何社区指定文化含义。',
  'Example record / schema': '示例记录 / 数据结构',
  'Do this now': '现在就做',
  'Inspect OpenStreetMap': '查看 OpenStreetMap',
  'Open the NASA API response': '打开 NASA API 响应',
  'Inspect the tDAR record': '查看 tDAR 记录',
  'Read the original passage': '阅读原文',
  'I inspected this source': '我已检查此资料来源',
  'Marked as inspected': '已标记为检查完毕',
  'Rights / use': '权利 / 使用条款',
  'Comparison rule': '比较规则',
  'Link questions and visual grammar; do not row-bind unrelated observations. A similarity in shape is a prompt to investigate, not evidence of a shared cause.': '可以连接问题与视觉语法，但不要把无关观察强行并排绑定。形状相似只意味着值得进一步调查，并不构成共同原因的证据。',
  'Next chapter': '下一章',
  'Follow Kunshan’s water through space and time': '在时空中循着昆山的水前行',

  // Water and mountain chapters
  'Listen to the seasons.': '倾听季节。',
  'Follow the water around Kunshan, Jinxi and Zhouzhuang. Choose a month, then a channel you could visit. What would you ask someone who lives beside it?': '沿着昆山、锦溪与周庄的水系前行。选择一个月份，再选择一条可以实地走访的水道。你会向水边居民提出什么问题？',
  'Choose a month': '选择月份',
  'Previous month': '上个月',
  'Next month': '下个月',
  'Play timeline': '播放时间轴',
  'Pause timeline': '暂停时间轴',
  'Replay from 2001': '从 2001 年重播',
  'Choose a channel': '选择一条水道',
  'Mapped channels': '已绘制水道',
  'Kunshan rainfall console': '昆山降水控制台',
  'Fixed scale in mm/day. The dot follows your selected month.': '比例尺固定为毫米/天；圆点跟随所选月份。',
  'One coarse modeled grid point. This record cannot tell us whether a street flooded or a river was clean.': '这是一个粗粒度模型网格点；它无法告诉我们街道是否被淹或河水是否清洁。',
  'State coordinate, temporal/depth unit, resolution, and what the source does not measure.': '说明坐标、时间/深度单位、分辨率，以及资料未测量的内容。',
  'Continue to the Mandara evidence': '继续查看曼达拉证据',
  'CP is a model pattern,': 'CP 是模型模式，',
  'not a people.': '不是一个族群。',
  'The paper calls its inferred components “culture periods.” That term can sound more definite than the evidence allows. Turn the pages to follow the transformation from observed fragments to cautious interpretation.': '论文把推断得到的组成称为“文化期”。这个术语听起来可能比证据本身更确定。请翻页查看从观察到的陶片到审慎解释的转换过程。',
  'Read this before the matrix': '阅读矩阵前请先看这里',
  'Explainer pages': '讲解页面',
  'Previous page': '上一页',
  'Next page': '下一页',
  'Choose a culture-period pattern': '选择一个文化期模式',
  'Select any label to see where the paper-derived teaching summary mentions it. This is context, not a definition.': '选择任一标识，查看由论文整理的教学摘要在哪里提到它。这提供的是语境，而不是定义。',
  'Dominant reported': '报告为主要模式',
  'Smaller reported': '报告为次要模式',
  'Not asserted': '未作断言',
  'Read five excavation sequences from the paper': '阅读论文中的五个发掘序列',
  'Five excavation-unit stories from the paper, kept qualitative where the publication is qualitative.': '论文中的五个发掘单位案例；原文为质性描述之处，本图集也保持质性表达。',
  'Reading sequence': '阅读顺序',
  'Read the paper': '阅读论文',
  'Open dataset DOI': '打开数据集 DOI',
  'Open the plain-language archaeology + model glossary': '打开通俗考古与模型术语表',
  'Download data': '下载数据',
  'Load local file': '载入本地文件',
  'Reset teaching view': '重置教学视图',

  // Archaeology glossary, interaction details, and chapter microcopy
  '“The user needs to ___. They ___ the control. The system responds by ___. This reveals ___. They can reset or recover by ___.”': '“使用者需要 ___。他们对控件进行 ___。系统通过 ___ 回应。这揭示了 ___。他们可以通过 ___ 重置或恢复。”',
  'A coded treatment or mark on the outside surface of a sherd; one observed variable in the analysis.': '陶片外表面的编码处理或痕迹，是分析中的一个观察变量。',
  'A defined area excavated and recorded within a site.': '遗址中被界定、发掘并记录的区域。',
  'A fragment of pottery. The paper analyzes cleaned ceramic sherd records.': '陶器碎片。论文分析的是清洗后的陶片记录。',
  'A probabilistic clustering model that can infer how many recurring components the observations support.': '一种概率聚类模型，可推断观察资料支持多少个重复出现的组成。',
  'A qualitative summary of reported latent pattern signatures. CP labels are identifiers; these colors are not sherd counts or probabilities.': '对论文所报告潜在模式特征的质性摘要。CP 标签只是标识符；这些颜色不是陶片计数或概率。',
  'A unit used to organize archaeological observations within the excavation record.': '发掘记录中用于组织考古观察的单位。',
  'An archaeological location included in the study; the paper analyzes eleven sites.': '研究纳入的考古地点；论文分析了十一个遗址。',
  'An independent dating estimate used to help evaluate chronology; it is not supplied by the CP label.': '用于辅助判断年代顺序的独立测年估计，并非由 CP 标签提供。',
  'Material from one excavation/recording context at a 10 cm depth increment.': '来自一个发掘/记录语境、以 10 厘米为深度增量的材料。',
  'The model’s updated uncertainty after combining assumptions with the observed data.': '模型将假设与观察数据结合后更新得到的不确定性。',
  'Processes that move, preserve, mix, or alter archaeological material after deposition.': '考古材料沉积之后发生的移动、保存、混合或改变过程。',
  'Culture period (CP)': '文化期（CP）',
  'Culture painting': '文化图谱',
  'Dirichlet-process mixture (DPM)': '狄利克雷过程混合模型（DPM）',
  'Excavation unit (EU)': '发掘单位（EU）',
  'Exterior decoration': '外表面纹饰',
  'Posterior': '后验分布',
  'Radiocarbon date (RCD)': '放射性碳测年（RCD）',
  'Recording unit (RU)': '记录单位（RU）',
  'Sherd': '陶片',
  'Site': '遗址',
  'Taphonomy': '埋藏学',
  'Unit-level': '单位层位',
  'Accounts, annotations, and missing voices.': '叙述、注释与缺席的声音。',
  'A place you can': '一个你可以',
  'return to.': '不断返回的地方。',
  'Bring the two places into conversation': '让两地展开对话',
  'Brush and link': '框选与联动',
  'Change parameters + Coordinate views': '改变参数 + 协调视图',
  'Check': '检验',
  'Choose another item; keyboard users can use the channel selector or focus a matrix cell and press Enter.': '请选择另一项；键盘用户可使用水道选择器，或聚焦矩阵单元并按 Enter。',
  'Click a mapped channel or a matrix cell.': '点击一条已绘制水道或一个矩阵单元。',
  'CP1 through CP14': 'CP1 至 CP14',
  'Decorated pottery fragments—not complete people, communities, or histories.': '带纹饰的陶片碎片，并非完整的人、社区或历史。',
  'Download the translated XLSX from tDAR, then load it here. The app aggregates site × exterior decoration locally.': '从 tDAR 下载转换后的 XLSX，然后在此载入。应用仅在本地按“遗址 × 外表面纹饰”聚合。',
  'Evidence stewards, visual translators and responsible collaborators.': '证据守护者、视觉翻译者与负责任的协作者。',
  'Form and revise a situated reading.': '形成并修订有情境意识的解读。',
  'Keep a stable basis for judging differences.': '保持稳定的差异判断基准。',
  'Links, co-occurrence, or shared membership.': '连接、共现或共同归属。',
  'Locates mapped channels. It does not measure flow, water quality, access or community meaning.': '定位已绘制水道，但不测量流量、水质、可达性或社区意义。',
  'Locations, dates, depth, or sequences.': '地点、日期、深度或序列。',
  'Many marks; no focal item or explanation.': '标记很多，但缺少焦点项目与解释。',
  'Motion is paused. The sliders still work.': '动画已暂停，滑块仍可使用。',
  'Move through possibilities without a fixed answer.': '在没有预设答案的情况下探索多种可能。',
  'One item is selected, highlighted, and explained.': '一个项目被选择、高亮并解释。',
  'Open the map and identify one mapped feature you could verify locally.': '打开地图，找出一个可在本地核验的已绘制要素。',
  'Open the official dataset': '打开官方数据集',
  'Open the official record': '打开官方记录',
  'overview → choose → inspect → reset': '概览 → 选择 → 查看 → 重置',
  'Paper-derived teaching layer': '由论文整理的教学图层',
  'Photo credit': '照片致谢',
  'Read the values for': '读取数值：',
  'Reading move': '阅读动作',
  'Reduce + re-encode': '约简 + 重新编码',
  'Return a bilingual prototype or evidence card for review. Ask what is useful, what is wrong and what should not be public.': '带回双语原型或证据卡供社区审阅；询问哪些内容有用、哪些不准确、哪些不应公开。',
  'Scale reported in the paper': '论文报告的规模',
  'See what varies across time or depth.': '查看哪些内容随时间或深度变化。',
  'Select + highlight': '选择 + 高亮',
  'Select a cell.': '选择一个单元。',
  'Select a channel': '选择一条水道',
  'Select a visible mark, keep it highlighted, and expose its source record beside the overview.': '选择一个可见标记，使其保持高亮，并在概览旁显示其来源记录。',
  'Select, then highlight': '先选择，再高亮',
  'Selected': '已选择',
  'SELECTED RECORD': '所选记录',
  'Selection + details on demand': '选择 + 按需详情',
  'Selection records the item of interest; highlighting changes its visual treatment so the chosen item remains perceptible.': '选择记录感兴趣的项目；高亮改变其视觉处理，使所选项目持续可见。',
  'Separate what is applied from what is an extension.': '区分已应用内容与拓展设想。',
  'Start the guided studio': '开始引导式工作室',
  'Start with the measured record: where a sherd was recorded and which decoration category was assigned.': '从测量记录开始：陶片记录在何处，被赋予了哪一类纹饰。',
  'Studio route': '工作室路径',
  'The dataset records exterior decoration categories for ceramic sherds from archaeological sites. Material is organized by excavation unit and recording unit, including 10 cm depth increments called unit-levels.': '数据集记录考古遗址陶片的外表面纹饰类别。材料按发掘单位与记录单位组织，其中包括称为“单位层位”的 10 厘米深度增量。',
  'The default matrix visualizes only claims reported in the paper. To inspect the row-level record, download the official tDAR file and drop it here; parsing stays inside your browser.': '默认矩阵只可视化论文中报告的陈述。若要检查逐行记录，请下载官方 tDAR 文件并拖入此处；解析只在浏览器内完成。',
  'The definitions above paraphrase the paper’s data and model sections. The app’s matrix is a qualitative teaching transcription, not the posterior model output.': '以上定义转述论文的数据与模型部分。本应用矩阵是质性教学转录，并非后验模型输出。',
  'The matrix will explain what the color is—and what it is not.': '矩阵会解释颜色代表什么，也会说明它不代表什么。',
  'The paper associates CP14 predominantly with Neolithic sites 618 and 756 and often with greater depths elsewhere; exceptions and mixed deposits require caution.': '论文主要把 CP14 与新石器时代遗址 618 和 756 联系起来，并指出它在其他地点常见于更深层位；例外与混合沉积需要谨慎处理。',
  'The paper’s name for a latent component: a consistent distribution of decoration types.': '论文对潜在组成的称呼：一种稳定的纹饰类型分布。',
  'The paper’s visualization of inferred CP membership by site, unit, and level.': '论文按遗址、单位与层位展示推断 CP 归属的可视化。',
  'The record name, type, value, and source remain visible instead of relying on color alone.': '记录名称、类型、数值与来源始终可见，而不是只依赖颜色。',
  'The selected mark gains a stronger outline and a nearby panel exposes its record.': '所选标记获得更明显的轮廓，旁边的面板显示其记录。',
  'They can design motion that explains rather than decorates.': '他们能够设计用于解释、而非仅作装饰的动画。',
  'They can invite local knowledge without extracting or speaking for others.': '他们能够邀请本地知识参与，而不进行攫取，也不替他人发言。',
  'They can name uncertainty, absence and limits without hiding them.': '他们能够明确说出不确定性、缺席与局限，而不加以隐藏。',
  'They can trace a public claim to a source and transformation.': '他们能够把公开主张追溯到资料来源与转换过程。',
  'Trace the explanation.': '追踪解释过程。',
  'True brushing and linking shares items across views; this is stronger than placing two views side by side.': '真正的框选与联动会在多个视图间共享项目状态，比单纯把两个视图并排放置更强。',
  'Understand where evidence belongs.': '理解证据应放在哪里。',
  'Use the vocabulary on the live atlas': '在实时图集中使用这些术语',
  'Use this when the same items appear in two views. The current atlas uses selection + detail; it does not claim full cross-view brushing.': '当同一项目出现在两个视图中时使用此模式。当前图集采用“选择 + 详情”，并不声称实现了完整的跨视图框选。',
  'Water map and Mandara matrix': '水系地图与曼达拉矩阵',
  'What enters the analysis?': '哪些内容进入分析？',
  'What remains': '哪些内容仍然',
  'Widgets need clear labels, visible effects, and enough stable context for comparison.': '控件需要清晰标签、可见效果，以及足够稳定的比较语境。',
  'Write the final project’s audience + consequential decision in one sentence.': '用一句话写明期末项目的受众与具有后果的决策。',
  'Year': '年份',
  'Eastern sites': '东部遗址',
  'Western sites': '西部遗址',
  'Neolithic signal': '新石器时代信号',
  'Mapped waterways around Kunshan': '昆山周边已绘制水系',
  'Kunshan precipitation': '昆山降水',
  'Kunshan waterways': '昆山水系',
  'Kunshan & its waterways': '昆山及其水系',
  'Mandara data': '曼达拉数据',
  'Mandara paper': '曼达拉论文',
  'NO SELECTION': '尚未选择',
  'North is up': '上方为北',
  'Now inspect the evidence': '现在查看证据',
  'Observed source': '观察资料来源',
  'Unnamed waterway': '未命名水道',
  'Monthly precipitation near Kunshan, from NASA POWER.': 'NASA POWER 提供的昆山附近逐月降水。',
  'Monthly mean precipitation (mm/day)': '月均降水（毫米/天）',
  'Monthly mean · approximately': '月均值 · 约',
  'mm that month': '当月毫米数',
  'Month': '月份',
  'Levels': '层级',
  'Data sources and URLs': '数据来源与网址',
  'Data': '数据',
  'Evidence': '证据',
  'Domain': '领域',
  'Navigate': '导航',
  'Interaction precedent': '交互研究先例',
  'Interaction design space': '交互设计空间',
  'CHI authoring precedent': 'CHI 创作研究先例',
  'VIS mixed-initiative precedent': 'VIS 混合主动式研究先例',
  'Inspect the identifiers': '查看标识符',
  'Inspect the NASA source': '查看 NASA 资料来源',
  'Inspect this OSM record': '查看这条 OSM 记录',
  'Inspect R code record': '查看 R 代码记录',
  'NASA POWER docs': 'NASA POWER 文档',
  'tDAR DOI': 'tDAR DOI',
  'Bring the question': '带着问题',
  'After:': '之后：',
  'Before:': '之前：',
  'A peer can name the intended audience, decision and one voice still missing.': '同伴能够说出目标受众、相关决策与一个仍然缺席的声音。',
  'Ask how decoration patterns across place and depth can support—not settle—an archaeological interpretation.': '追问纹饰模式跨地点与深度的变化如何支持、但不能最终确定一种考古解释。',
  'Ask how mapped channels and precipitation help people notice a water-landscape question in Kunshan.': '追问已绘制水道与降水如何帮助人们注意昆山的水景观问题。',
  'back to Kunshan.': '回到昆山。',
  'Basic: ______. Network addition: ______. Spatiotemporal addition: ______.': '基础设计：______。网络拓展：______。时空拓展：______。',
  'Can a keyboard user identify the selected record and return to the overview?': '键盘用户能否识别所选记录并返回概览？',
  'Can a viewer distinguish observed rows, model output and our summary?': '观众能否区分观察记录、模型输出与我们的摘要？',
  'Cleaned sherds': '清洗后陶片',
  'Decorations': '纹饰',
  'Sites': '遗址',
  'in the fragments?': '仍留在碎片之中？',
  'Learning cell': '学习单元',
  'lens ·': '视角 ·',
  'Mentioned in this qualitative teaching summary: Western sites, Eastern sites, Neolithic signal.': '本质性教学摘要提及：西部遗址、东部遗址、新石器时代信号。',
  'Start with:': '建议从这里开始：',
  'Try it live ·': '现场试用 ·',
  'Your selected community lens ·': '你选择的社区问题视角 ·',
  'CP11 to about 1.4 m → then largely CP8': 'CP11 延续至约 1.4 米 → 之后主要为 CP8',
  'CP3 + CP11 → CP8 introgressions → high posterior uncertainty where counts are low': 'CP3 + CP11 → CP8 渐渗 → 计数较低处后验不确定性较高',
  'CP4 + CP9 near surface → CP3 + CP8 deeper': '表层附近为 CP4 + CP9 → 更深处为 CP3 + CP8',
  'Repeated CP1 ↔ CP2 shifts → CP10 at 2.2 m': 'CP1 ↔ CP2 多次转换 → 2.2 米处出现 CP10',
  'Culture painting + sequence annotation': '文化图谱 + 序列注释',
  'culture painting + sequence annotation': '文化图谱 + 序列注释',
  'Data / task': '数据 / 任务',
  'Linked highlighting': '联动高亮',
  'Manipulate · Select': '操作视图 · 选择',
  'River': '河流',
  'Canal': '运河',
  'Stream': '溪流',
  'river': '河流',
  'canal': '运河',
  'stream': '溪流',
  'Rhumsiki, Cameroon. A view of the wider region, not an excavated site.': '喀麦隆鲁姆西基。这里展示的是更广泛的区域景观，并非考古发掘点。',
  '© OpenStreetMap contributors · ODbL 1.0. Simplified snapshot; the channels stay fixed as you change the month.': '© OpenStreetMap 贡献者 · ODbL 1.0。该图为简化快照；切换月份时水道保持不变。',

  // Bridge and validation
  'after the evidence?': '你的理解发生了什么变化？',
  'Revisit the lens you chose near the top. Keep it, change it, or make it more careful after inspecting the sources. The histories of Kunshan and Mandara remain their own.': '重新审视你在前面选择的问题视角。查看资料后，可以保留、改变或让它更审慎。昆山与曼达拉各自的历史仍应保持独立。',
  'Chinese source · Yong Ye (numbering varies by edition)': '中文来源 ·《雍也》（不同版本编号有差异）',
  'Revisit the community question lens': '重新审视社区问题视角',
  'Kunshan · a question for the present': '昆山 · 面向当下的问题',
  'Mandara · a question for the record': '曼达拉 · 面向记录的问题',
  'Photo credits': '照片致谢',
  'Leave space for': '为你自己的观察',
  'your own noticing.': '留出空间。',
  'Bring a field encounter or one inspected source into the conversation. Write in Chinese, English, or both.': '把一次田野接触或一项已检查的资料带入对话。可使用中文、英文或双语书写。',
  'Your notes stay in this browser. Nothing is submitted.': '笔记保存在本浏览器中，不会自动提交。',
  'This browser cannot save your draft. Download it before leaving.': '此浏览器无法保存草稿，请在离开前下载。',
  'What did you actually observe?': '你实际观察到了什么？',
  'Name a place or a source record. Describe one detail.': '写出一个地点或一条资料记录，并描述一个细节。',
  'What is your interpretation?': '你的解释是什么？',
  'What might it mean? Keep the uncertainty visible.': '它可能意味着什么？请让不确定性保持可见。',
  'What would you ask someone there?': '你会向当地的人提出什么问题？',
  'An open question that leaves room for them to disagree.': '提出一个开放问题，并为不同意见留下空间。',
  'Save my field note': '保存我的田野笔记',
  'Check the claim you want to make': '检验你想提出的主张',
  'Let someone else': '请他人一起',
  'question the picture.': '质疑这幅图景。',
  'A beautiful result is not yet a trustworthy result. Move from the human question to the computation; record what you actually checked at each level.': '美观的结果尚不等于可信的结果。请从人的问题走向计算过程，并记录你在每个层级实际检查了什么。',
  'Domain validity': '领域有效性',
  'Data / task validity': '数据 / 任务有效性',
  'Idiom validity': '视觉表达有效性',
  'Algorithm validity': '算法有效性',
  'Is this a question that the evidence and affected people recognize as meaningful?': '证据与受影响的人是否都认为这个问题有意义？',
  'Do the fields, granularity and provenance support the task we are asking viewers to perform?': '字段、粒度与出处是否支持我们要求观众完成的任务？',
  'Does the visual encoding reveal the relationship without introducing a stronger claim?': '视觉编码是否揭示了关系，同时没有引入更强的主张？',
  'Are the transformation, parameters and uncertainty robust enough for the claim?': '转换、参数与不确定性是否足以稳健支持该主张？',
  'Pass condition': '通过条件',
  'Your evidence from a peer, source inspection or robustness check': '来自同伴、资料检查或稳健性检验的证据',
  'Record what you observed—not what you hoped would happen.': '记录你实际观察到的，而不是你希望发生的。',
  'Add to the final group project': '加入期末小组项目',
  'Record as checked': '记录为已检查',
  'Recorded as checked': '已记录为检查完毕',
  'levels checked': '个层级已检查',
  'Your notes become a portable evidence card for the Week 5 proposal and MVP.': '你的笔记会成为可携带的证据卡，用于第 5 周提案与最小可行原型。',
  'Draft saved in this browser.': '草稿已保存在本浏览器。',
  'Draft storage is unavailable. Download your notes.': '草稿存储不可用，请下载笔记。',
  'Copy as Markdown': '复制为 Markdown',
  'Download JSON': '下载 JSON',
  'Carry this into the team project': '把这些带入团队项目',

  // Return and authorship
  'Prepare the team-claim post': '准备团队主张帖',
  'Field note → validation → team claim': '田野笔记 → 验证 → 团队主张',
  'Community-based learning begins with a potential relationship, not a promised impact. Separate what you noticed from what you inferred; seek permission; test usefulness; revise with people rather than for them.': '社区本位学习始于一种潜在关系，而不是预先承诺的影响。请区分观察与推断，征求许可，检验是否有用，并与人共同修订，而不是替人做决定。',
  '01 · Team identity': '01 · 团队身份',
  'Project title': '项目标题',
  'Team members': '团队成员',
  'Strength each member contributes': '每位成员贡献的优势',
  '02 · Contribution': '02 · 贡献',
  'SDG contribution': '对可持续发展目标的贡献',
  'Potential local relationship': '潜在本地社区关系',
  'Open-science contribution': '开放科学贡献',
  '03 · Evidence + design': '03 · 证据 + 设计',
  'Observed': '观察',
  'Interpreted': '解释',
  'Permission / voice missing': '仍缺少的许可 / 声音',
  'Basic, network and spatiotemporal ideas': '基础、网络与时空设计构想',
  'Next validation': '下一步验证',
  'Bring in my field note': '导入我的田野笔记',
  'Preview the post': '预览帖子',
  'Copy for Ed Discussion': '复制到 Ed Discussion',
  'Download .md': '下载 .md',
  'Draft saved on this device. Copy or download when you are ready to share.': '草稿已保存在本设备；准备分享时可复制或下载。',
  'Client-side only. No upload endpoint exists.': '仅在客户端运行，不存在上传端点。',

  // Accessible color palette studio
  'Embedded color Colab · live palette lab': '嵌入式色彩 Colab · 实时调色板实验室',
  'Encode meaning before choosing a beautiful color.': '先编码含义，再选择美观的颜色。',
  'This companion separates color representation—sRGB, CMYK/ICC, and CIELAB/OKLCH—from the three major data-encoding families: qualitative, sequential, and diverging. Change the controls, inspect accessibility, then open the same workflow as executable Python.': '本学习伙伴把颜色表示——sRGB、CMYK/ICC 与 CIELAB/OKLCH——和三大数据编码类型区分开来：定类、顺序与发散。请调整控件、检查无障碍性，再用可执行 Python 打开同一工作流程。',
  'Two complementary color triples': '两组互补的色彩三元组',
  'Representation · how a color is specified': '表示 · 如何指定颜色',
  'Screen interchange': '屏幕交换',
  'Device-aware print': '设备感知印刷',
  'Perceptual design': '感知均匀设计',
  'Encoding · what a color means in data': '编码 · 颜色在数据中意味着什么',
  'Qualitative': '定类',
  'Sequential': '顺序',
  'Diverging': '发散',
  'Difference without order': '无顺序的差异',
  'Low-to-high magnitude': '从低到高的量值',
  'Distance from a midpoint': '距中点的偏离',
  'Different hues for unordered categories': '用不同色相区分无序类别',
  'Ordered lightness for low-to-high values': '用有序明度表示从低到高的数值',
  'Two directions around a meaningful midpoint': '围绕有意义中点的两个方向',
  'Standard view': '标准视图',
  'Protanopia preview': '红色盲预览',
  'Deuteranopia preview': '绿色盲预览',
  'Grayscale preview': '灰度预览',
  'Color palette controls': '调色板控件',
  'Palette controls': '调色板控件',
  'Encoding family': '编码类型',
  'Base hue': '基础色相',
  'Chroma': '彩度',
  'Lightness span': '明度跨度',
  'Number of colors': '颜色数量',
  'Vision preview': '视觉预览',
  'The preview is an approximation, not a clinical diagnosis. Shape and labels remain visible because color alone is not enough.': '此预览只是近似模拟，并非临床诊断。形状与标签始终可见，因为不能只依赖颜色传达信息。',
  'Live comparison': '实时比较',
  'Uncontrolled spectrum palette': '未加控制的光谱调色板',
  'Before · equal hue steps, untested meaning': '之前 · 等距色相，含义未经检验',
  'After · perceptual structure + redundant labels': '之后 · 感知结构 + 冗余标签',
  'Compare before and after': '比较前后效果',
  'Compare before and after palettes': '比较前后调色板',
  'Generated palette values': '生成的调色板数值',
  '3D lighting check': '三维光照检查',
  'A palette is not a material.': '调色板并不等同于材质。',
  'Palette applied to a stylized three-dimensional terrain under adjustable light': '在可调光照下把调色板应用于风格化三维地形',
  'Scene light': '场景光照',
  '3D scene light': '三维场景光照',
  'Lighting, tone mapping, and material roughness can change apparent color. Three.js assets should declare color space; data meaning still needs a legend and non-color cues.': '光照、色调映射与材质粗糙度会改变表观颜色。Three.js 资源应声明色彩空间；数据含义仍需图例与非颜色线索。',
  'Global standards crosswalk': '全球标准对照表',
  'One palette, seven checkpoints.': '一个调色板，七项检查。',
  'Standard': '标准',
  'Role': '作用',
  'Design check': '设计检查',
  'sRGB interchange': 'sRGB 交换',
  'Encode screen RGB; do not treat channel values as perceptual distances.': '编码屏幕 RGB；不要把通道数值当作感知距离。',
  'Colorimetry + CIELAB': '色度学 + CIELAB',
  'Measure color and compare approximately perceptual coordinates.': '测量颜色，并比较近似感知均匀的坐标。',
  'ICC color profiles': 'ICC 色彩配置文件',
  'Carry source and destination profiles across devices.': '跨设备保留源与目标配置文件。',
  'Print process control': '印刷过程控制',
  'Proof and validate press conditions rather than converting to CMYK blindly.': '根据印刷条件打样并验证，而不是盲目转换为 CMYK。',
  'Use of color + contrast': '颜色使用 + 对比度',
  'Use redundant cues; target 4.5:1 text and 3:1 large or non-text elements.': '使用冗余线索；正文以 4.5:1、大号文字或非文本元素以 3:1 为目标。',
  'Software accessibility': '软件无障碍',
  'Design color choices as part of an accessible software system.': '把颜色选择作为无障碍软件系统的一部分来设计。',
  'Modern web color': '现代网页颜色',
  'Use color() and OKLCH with a tested sRGB fallback.': '使用 color() 与 OKLCH，并提供经过测试的 sRGB 后备方案。',
  'Credited design gallery': '已注明出处的设计图库',
  'Six research patterns, reconstructed as swatches.': '六种研究模式，以色板重构。',
  'These are compact teaching reconstructions—not reproduced figures. Follow each primary source for its complete method, evaluation, and context.': '这些是用于教学的精简重构，并非复制原图。请查阅每项一手资料以了解完整方法、评估与语境。',
  'Color coding': '颜色编码',
  'Color blindness': '色觉障碍',
  'Use hue deliberately; keep the mapping legible and consistent.': '有意识地使用色相，并保持映射清晰一致。',
  'Check distinguishability and never ask color to carry the message alone.': '检查可区分性，绝不让颜色独自承担信息传递。',
  'Choose the palette family from the data relationship before styling it.': '先依据数据关系选择调色板类型，再进行样式设计。',
  'Balance discriminability, aesthetic preference, and semantic constraints.': '平衡可区分性、审美偏好与语义约束。',
  'Treat palette creation as a guided, inspectable design process.': '把调色板创建视为可引导、可检查的设计过程。',
  'Test palettes with the reader’s display conditions and visual abilities in mind.': '结合读者的显示条件与视觉能力来测试调色板。',
  'Open primary source': '打开一手资料',
  'From notebook to production': '从笔记本到生产环境',
  'Export tokens, preserve profiles, test the rendered result.': '导出令牌、保留配置文件，并测试渲染结果。',
  'Figma variables': 'Figma 变量',
  'Export semantic tokens, then map collections and modes to light, dark, print, or accessibility contexts.': '导出语义令牌，再把集合与模式映射到浅色、深色、印刷或无障碍语境。',
  'Adobe workflow': 'Adobe 工作流程',
  'Export ASE swatches from Colab, preserve profiles, and soft-proof against the intended output condition.': '从 Colab 导出 ASE 色板，保留配置文件，并针对预期输出条件进行软打样。',
  '3D + Three.js': '三维 + Three.js',
  'Convert color textures to linear working space, then evaluate the palette again under lights, materials, and tone mapping.': '把颜色纹理转换到线性工作空间，再在光照、材质与色调映射下重新评估调色板。',
  'Read official guidance': '阅读官方指南',
  '20 executable cells · bilingual explanations': '20 个可执行单元 · 双语讲解',
  'Continue in the full Google Colab studio.': '在完整的 Google Colab 工作室中继续。',
  'Rebuild the palette, calculate WCAG contrast and ΔE, preview color-vision conditions, compare research designs, export Figma-ready JSON and Adobe ASE, and render a 3D surface.': '重建调色板，计算 WCAG 对比度与 ΔE，预览不同色觉条件，比较研究设计，导出适用于 Figma 的 JSON 与 Adobe ASE，并渲染三维表面。',
  'Open color notebook in Colab': '在 Colab 中打开色彩笔记本',
  'Download color .ipynb': '下载色彩 .ipynb',
  'Color research and global standards': '色彩研究与全球标准',
  'Primary research and official standards behind the palette studio, accessibility checks, and production guidance.': '调色板工作室、无障碍检查与生产指南所依据的一手研究和官方标准。',

  // References and source notes
  'Credits · provenance · full APA style': '致谢 · 出处 · 完整 APA 格式',
  'Every claim should lead': '每一项主张都应',
  'back to a source.': '回到资料来源。',
  'The tutorial, research precedents, data, primary text, and media are credited here with every author listed in APA style. The application code’s MIT license does not replace any source’s own license or terms.': '教程、研究先例、数据、原典与媒体资料均在此以 APA 格式列出全部作者。应用代码的 MIT 许可证不取代任何资料自身的许可或条款。',
  'Continue to photography credits': '继续查看照片致谢',
  'Books, papers, and interaction systems': '书籍、论文与交互系统',
  'Theory, terminology, and research precedents used in the atlas and tutorial.': '图集与教程所使用的理论、术语与研究先例。',
  'Data and cultural sources': '数据与文化资料来源',
  'Each data family keeps its own scale, transformation, rights, and evidence boundary.': '每类数据都保留其自身比例、转换方式、权利条款与证据边界。',
  'Photography and teaching excerpts': '摄影作品与教学节选',
  'Media establish context or teach an interaction pattern; they are not fieldwork evidence.': '媒体资料用于建立语境或教授交互模式，并非田野证据。',
  'Primary textbook source for change, select, navigate, facet, reduce, and the four levels of validation.': '关于改变、选择、导航、分面、约简与四层验证的主要教材来源。',
  'Source of the five credited teaching screenshots in the tutorial.': '教程中五张已注明出处的教学截图之来源。',
  'The brushing/linking, overview/detail, and crossfilter animations were recorded from the official Vega-Lite example family for teaching.': '框选联动、概览/详情与交叉筛选动画均录制自 Vega-Lite 官方示例，用于教学。',
  'The bundled Mandara teaching layer is a qualitative transcription of statements in this paper, not its model output.': '随附的曼达拉教学图层是对论文陈述的质性转录，并非论文模型输出。',
  'Licensed under the Open Data Commons Open Database License (ODbL) 1.0. Completeness and tagging vary.': '采用 Open Data Commons ODbL 1.0 许可；完整度与标注方式可能不同。',
  'Monthly mean at the source model’s resolution; not a rain gauge, flood record, river-discharge series, or water-quality measure.': '这是源模型分辨率下的逐月均值，不是雨量计、洪水记录、河流流量序列或水质测量。',
  'The official record is public. The paper states that scripts and cleaned data are available under a Creative Commons license; the current DataCite rights field does not identify the exact variant.': '官方记录公开可访问。论文称脚本与清洗后数据采用知识共享许可，但当前 DataCite 权利字段未注明具体版本。',
  'The linked Wikisource edition labels the saying 六之二一; numbering varies across editions. Used as an instructor-created question-making lens, not as an empirical variable or a cultural label for either place.': '所链接的维基文库版本将该章句标为“六之二一”；不同版本编号有差异。此处仅作为教师设计的问题视角，并非实证变量或任何一地的文化标签。',
  'Converted to WebP and cropped in the layout; no scene content was generated.': '图片已转换为 WebP 并在版面中裁切，未生成场景内容。',
  'Converted to WebP and cropped in the layout. The adaptation retains CC BY-SA 2.0. It provides regional context, not excavation documentation.': '图片已转换为 WebP 并在版面中裁切；改编继续采用 CC BY-SA 2.0。它提供区域语境，并非发掘记录。',
  'These excerpts retain their original copyright and are not relicensed under the application’s MIT code license.': '这些节选保留原始版权，不因应用代码采用 MIT 许可证而重新授权。',
}

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim()

const dynamicZh = (english: string): string | undefined => {
  let match = english.match(/^(\d+) of (\d+) inspected$/)
  if (match) return `已检查 ${match[1]} / ${match[2]} 项资料`
  match = english.match(/^(\d+) of (\d+) validation levels complete$/)
  if (match) return `已完成 ${match[1]} / ${match[2]} 个验证层级`
  match = english.match(/^Learning cell (\d+)$/)
  if (match) return `学习单元 ${match[1]}`
  match = english.match(/^Culture-period explainer, page (\d+) of (\d+)$/)
  if (match) return `文化期讲解 · 第 ${match[1]} / ${match[2]} 页`
  match = english.match(/^Level (\d+)$/)
  if (match) return `第 ${match[1]} 层`
  match = english.match(/^Stage (\d+)$/)
  if (match) return `第 ${match[1]} 阶段`
  match = english.match(/^Source inspection$/)
  if (match) return '资料检查'
  match = english.match(/^Rights \/ use · (.+)$/)
  if (match) return `权利 / 使用条款 · ${match[1]}`
  match = english.match(/^Suggested interaction lenses: (.+)$/)
  if (match) return `建议采用的交互视角：${match[1]}`
  match = english.match(/^Your selected community lens · (.+)$/)
  if (match) return `你选择的社区问题视角 · ${match[1]}`
  match = english.match(/^(.+) lens · (.+)$/)
  if (match) return `${match[2]}视角`
  match = english.match(/^Start with: (.+)$/)
  if (match) return `建议从这里开始：${match[1]}`
  match = english.match(/^Try it live · (.+)$/)
  if (match) return `现场试用 · ${match[1]}`
  match = english.match(/^Read the values for (.+)$/)
  if (match) return `读取 ${match[1]} 的数值`
  match = english.match(/^(.+) · inferred pattern identifier$/)
  if (match) return `${match[1]} · 推断模式标识符`
  match = english.match(/^Culture-period model pattern (CP\d+); identifier, not chronology$/)
  if (match) return `文化期模型模式 ${match[1]}；这是标识符，不是年代顺序`
  match = english.match(/^(\d+)\/(\d+) swatches support an AA text label$/)
  if (match) return `${match[1]}/${match[2]} 个色块支持 AA 级文字标签`
  match = english.match(/^Uncontrolled spectrum → designed (qualitative|sequential|diverging) palette$/)
  if (match) {
    const family = match[1] === 'qualitative' ? '定类' : match[1] === 'sequential' ? '顺序' : '发散'
    return `未加控制的光谱 → 设计后的${family}调色板`
  }
  match = english.match(/^(\d+)% after$/)
  if (match) return `之后占 ${match[1]}%`
  match = english.match(/^Designed (qualitative|sequential|diverging) palette in (normal|protanopia|deuteranopia|grayscale) preview$/)
  if (match) {
    const family = match[1] === 'qualitative' ? '定类' : match[1] === 'sequential' ? '顺序' : '发散'
    const vision = match[2] === 'normal' ? '标准' : match[2] === 'protanopia' ? '红色盲' : match[2] === 'deuteranopia' ? '绿色盲' : '灰度'
    return `${vision}预览中的${family}调色板`
  }
  match = english.match(/^(.+) teaching reconstruction$/)
  if (match) return `${match[1]} 教学重构`
  return undefined
}

export function translateText(value: string, mode: LanguageMode, attribute = false) {
  if (mode === 'en') return value
  const compact = normalize(value)
  if (!compact) return value

  const chinese = zhTranslations[compact] ?? dynamicZh(compact)
  if (!chinese) return value
  if (mode === 'zh') return value.replace(compact, chinese)

  const separator = attribute ? ' / ' : compact.length > 38 || chinese.length > 20 ? '\n' : ' · '
  return value.replace(compact, `${compact}${separator}${chinese}`)
}

const translatedForms = new Map<string, string>()
for (const [english, chinese] of Object.entries(zhTranslations)) {
  translatedForms.set(normalize(chinese), english)
  translatedForms.set(normalize(`${english} · ${chinese}`), english)
  translatedForms.set(normalize(`${english}\n${chinese}`), english)
  translatedForms.set(normalize(`${english} / ${chinese}`), english)
}

function sourceText(value: string) {
  const compact = normalize(value)
  return translatedForms.get(compact) ?? compact
}

function shouldSkip(node: Node) {
  const element = node.nodeType === Node.ELEMENT_NODE ? node as Element : node.parentElement
  return Boolean(element?.closest('script, style, code, pre, [data-no-translate], input[type="file"]'))
}

function translateNode(node: Node, mode: LanguageMode) {
  if (shouldSkip(node)) return
  if (node.nodeType === Node.TEXT_NODE) {
    const current = node.textContent ?? ''
    const compact = normalize(current)
    if (!compact) return
    const english = sourceText(current)
    const localized = translateText(english, mode)
    const leading = current.match(/^\s*/)?.[0] ?? ''
    const trailing = current.match(/\s*$/)?.[0] ?? ''
    const next = `${leading}${localized}${trailing}`
    if (next !== current) node.textContent = next
    return
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return
  const element = node as Element
  for (const attribute of ['aria-label', 'title', 'placeholder', 'alt']) {
    const current = element.getAttribute(attribute)
    if (!current) continue
    const english = sourceText(current)
    const localized = translateText(english, mode, true)
    if (localized !== current) element.setAttribute(attribute, localized)
  }
}

function translateTree(root: HTMLElement, mode: LanguageMode) {
  translateNode(root, mode)
  const filter = document.defaultView?.NodeFilter
  if (!filter) return
  const walker = document.createTreeWalker(root, filter.SHOW_ELEMENT | filter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    translateNode(node, mode)
    node = walker.nextNode()
  }
}

export function usePageTranslation(rootRef: RefObject<HTMLElement | null>, mode: LanguageMode) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    document.documentElement.lang = mode === 'zh' ? 'zh-CN' : 'en'
    document.documentElement.dataset.language = mode
    translateTree(root, mode)

    let translating = false
    const Observer = window.MutationObserver
    if (!Observer) return
    const observer = new Observer((records) => {
      if (translating) return
      translating = true
      for (const record of records) {
        if (record.type === 'characterData') translateNode(record.target, mode)
        for (const added of record.addedNodes) translateTree(added as HTMLElement, mode)
      }
      translating = false
    })
    observer.observe(root, { subtree: true, childList: true, characterData: true })
    return () => observer.disconnect()
  }, [mode, rootRef])
}
