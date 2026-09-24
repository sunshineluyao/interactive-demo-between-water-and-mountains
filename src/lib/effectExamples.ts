import type { Copy } from './synthesis'

export type EffectKind = 'select' | 'time' | 'navigate' | 'coordinate' | 'reduce' | 'author' | 'three-d' | 'animation' | 'color' | 'brush' | 'overview' | 'crossfilter' | 'storyboard' | 'suggest'
type Example = { title: Copy; task: Copy; before: Copy; after: Copy; transfer: Copy }
export const effectExamples: Record<EffectKind, Example> = {
  select: {
    title: ['Mandara · select a reported pattern', '曼达拉 · 选择已报告的模式'],
    task: ['Where is CP14 reported, and with which assertion?', 'CP14 在哪些分组中被报告？报告的是哪类归属？'],
    before: ['The complete matrix has no selected pattern.', '完整矩阵尚未选择模式。'],
    after: ['One CP stays outlined across all groups; the reading names each assertion.', '同一 CP 在所有分组中都有轮廓标记；文字读数说明每项陈述。'],
    transfer: ['Try CP2. In your project, retain item IDs, a visible selection, and a text alternative.', '试选 CP2。在自己的项目中保留记录标识、可见选择与文字替代。'],
  },
  time: {
    title: ['Kunshan · change the selected month', '昆山 · 改变选定月份'],
    task: ['Compare June and July 2025 without changing the scale.', '保持尺度不变，比较 2025 年 6 月与 7 月。'],
    before: ['All 12 monthly readings remain visible, with no selected date.', '12 个月的读数都可见，但未选定日期。'],
    after: ['The slider selects one real record; its date, bar, and value agree.', '滑块选择一条真实记录；日期、柱形与数值保持一致。'],
    transfer: ['Keep the full series and fixed units when you add a date control to your own data.', '为自己的数据添加日期控件时，保留完整序列与固定单位。'],
  },
  navigate: {
    title: ['Water and Mountains · add story landmarks', '水与山 · 添加叙事路标'],
    task: ['Locate the evidence, the two cases, and the validation step.', '定位证据、两个案例与验证步骤。'],
    before: ['The same four chapter descriptions form a continuous reading.', '相同的四段章节描述连续排列。'],
    after: ['Named controls select a chapter; its description and live link remain visible.', '有名称的控件选择章节；相应说明与实际链接保持可见。'],
    transfer: ['Give every chapter a stable link, clear title, and a route back to the overview.', '为每章提供稳定链接、清晰标题与返回概览的路径。'],
  },
  coordinate: {
    title: ['Kunshan · link chart and record', '昆山 · 联动图表与记录'],
    task: ['Match a monthly bar to the correct dated record.', '把月度柱形与对应日期的记录匹配。'],
    before: ['The chart and all records are available but have no shared selection.', '图表与所有记录都可查看，但没有共同选择。'],
    after: ['One selected month highlights both the bar and its table row.', '一个选定月份同时高亮柱形与表格行。'],
    transfer: ['Use one record ID across views. Do not animate the waterways as if rainfall measured flow.', '跨视图使用同一记录标识。不要把水道动画处理成降水测量了水流。'],
  },
  reduce: {
    title: ['Mandara · filter the teaching assertions', '曼达拉 · 筛选教学层陈述'],
    task: ['Inspect one group while keeping its omitted assertions visible in the overview.', '查看一个分组，同时在概览中保留被省略的陈述。'],
    before: ['All three groups and all 14 CP identifiers are shown.', '显示全部三个分组与 14 个 CP 标识。'],
    after: ['Filter by group and assertion type; the result states how many of the 42 cells remain.', '按分组与陈述类型筛选；结果说明 42 个单元格中保留了多少个。'],
    transfer: ['This example filters qualitative assertions. For uploaded records, also report the within-site denominator and omitted categories.', '此例筛选定性陈述。处理导入记录时，还须报告遗址内分母与省略类别。'],
  },
  author: {
    title: ['Kunshan · turn a reading into an evidence card', '昆山 · 将读数转成证据卡'],
    task: ['Separate a measured reading from a question that still needs fieldwork.', '区分数据读数与仍需田野调查的问题。'],
    before: ['One paragraph mixes the reading and an unanswered question.', '一段文字混合了读数与尚未回答的问题。'],
    after: ['The same content is organized into observation, inference boundary, next check, and source.', '相同内容组织为观察、推断边界、下一步验证与来源。'],
    transfer: ['Download the worked example, then replace it with your own observation and a named verification step.', '下载示范，再换成自己的观察与具体的验证步骤。'],
  },
  'three-d': {
    title: ['Water and Mountains · flat evidence → 3D layers', '水与山 · 平面证据 → 三维分层'],
    task: ['Identify the source, transformation, and interpretation in either case.', '辨认任一案例中的来源、转换与解释。'],
    before: ['A flat, numbered account of the three evidence layers.', '三个证据层次的平面编号说明。'],
    after: ['Depth separates the same layers; full labels stay outside the shapes.', '深度分开相同图层；完整标签保留在形状外。'],
    transfer: ['Use depth for a clear relationship, preserve a flat alternative, and check whether readers identify layers more accurately.', '用深度表达明确关系，保留平面替代，并检验读者是否更准确地识别图层。'],
  },
  animation: {
    title: ['Kunshan · static year → controlled animation', '昆山 · 静态年度图 → 可控动画'],
    task: ['Find the wettest month of 2025 and report its mean daily precipitation.', '找出 2025 年降水最多的月份，报告该月日均降水量。'],
    before: ['A static annual overview with all exact values available.', '静态年度概览，可查看全部精确读数。'],
    after: ['A dated focus advances over the same fixed chart; pause, step, and reset keep the reader in control.', '带日期的焦点在同一固定图表上推进；暂停、步进与重置让读者掌握节奏。'],
    transfer: ['Compare accuracy and reading effort with the static view. Motion does not add evidence or represent a moving storm.', '与静态视图比较准确性与阅读负担。动画不会增加证据，也不表示移动的风暴。'],
  },
  color: {
    title: ['Chapter 10 · color on the actual project data', '第 10 章 · 将色彩应用于项目真实数据'],
    task: ['Choose categories, magnitudes, or deviations; inspect the same evidence before and after recoloring.', '选择类别、数量或偏差；比较同一证据重新配色前后的效果。'],
    before: ['The same labeled marks use an uncontrolled spectrum.', '相同的带标签标记使用未加控制的光谱色。'],
    after: ['The palette matches the relationship; values, labels, and the reference remain unchanged.', '色板匹配数据关系；数值、标签与参考值保持不变。'],
    transfer: ['Check grayscale as well as hue. A light CP cell means no assertion in this summary, not zero pottery.', '检查灰度与色相。浅色 CP 单元格表示摘要中没有陈述，不表示陶片数量为零。'],
  },
  brush: {
    title: ['Kunshan · brush a month range across two views', '昆山 · 跨两个视图框选月份区间'],
    task: ['Select a continuous range and find the same records in the chart and table.', '选择连续区间，在图表与表格中找到相同记录。'],
    before: ['The annual chart and table have no linked range.', '年度图表与表格没有联动区间。'],
    after: ['Start and end controls act as a keyboard-accessible brush; the same month IDs highlight in both views.', '起止控件提供键盘可用的区间框选；两个视图高亮相同月份标识。'],
    transfer: ['This working range-selection example is a student extension; the main water map does not brush rainfall records.', '这是可运行的学生拓展示例；主水道地图不对降水记录进行框选。'],
  },
  overview: {
    title: ['Kunshan · preserve overview while opening detail', '昆山 · 打开详情并保留概览'],
    task: ['Read July 2025 precisely without losing the rest of the year.', '准确阅读 2025 年 7 月，同时保留全年语境。'],
    before: ['The annual overview leaves the reader to inspect the records separately.', '年度概览需要读者另行查阅记录。'],
    after: ['A selected bar opens its exact dated value while the full year remains visible.', '选定柱形打开对应日期的精确读数，全年仍然可见。'],
    transfer: ['Keep the overview, units, source, and a selection control available alongside the detail.', '在详情旁保留概览、单位、来源与选择控件。'],
  },
  crossfilter: {
    title: ['Kunshan · intersect date and precipitation filters', '昆山 · 交叉筛选日期与降水'],
    task: ['Find months in a selected date range above a chosen precipitation threshold.', '找出所选日期区间内超过给定降水阈值的月份。'],
    before: ['All 12 monthly records are available.', '全部 12 条月度记录均可查看。'],
    after: ['Two filters intersect; the chart and table share the same retained records and count.', '两个筛选条件取交集；图表与表格共享保留记录及其数量。'],
    transfer: ['A small working extension, not a claim to reproduce the full research system. Show the excluded records and reset both filters.', '这是小型可运行拓展，不声称复现完整研究系统。显示被排除的记录，并提供同时重置两个条件的操作。'],
  },
  storyboard: {
    title: ['Mandara · sequence an accountable data story', '曼达拉 · 组织可追溯的数据故事'],
    task: ['Explain CP14 without treating it as a people or a date.', '解释 CP14，同时避免将它视为族群或年代。'],
    before: ['The reported CP14 associations appear together in the matrix.', '已报告的 CP14 关联同时显示在矩阵中。'],
    after: ['The same evidence becomes three labeled panels: pattern, reading, and limitation.', '相同证据变为三个带标签的面板：模式、解读与局限。'],
    transfer: ['Borrow panel sequencing from DataToon; this example does not reproduce its authoring system.', '借鉴 DataToon 的面板叙事；此例不复现其创作系统。'],
  },
  suggest: {
    title: ['Kunshan · compare a design candidate with its evidence', '昆山 · 对照证据比较设计候选'],
    task: ['Check whether an ordered palette preserves the monthly values and units.', '检查顺序色板是否保留月度数值与单位。'],
    before: ['The annual chart uses a single neutral color.', '年度图表使用单一中性色。'],
    after: ['A predefined candidate adds ordered lightness; the same source records remain inspectable.', '预设候选增加有序明度；相同来源记录仍可查验。'],
    transfer: ['A transparent, predefined teaching candidate: no AI or code synthesis runs here. For your own assistant, show suggestions, human checks, and rejected alternatives.', '这是透明的预设教学候选，此处不运行 AI 或代码合成。在自己的助手中展示建议、人工核验与被否决的方案。'],
  },
}

export const evidenceLayers: Array<{ title: Copy; water: Copy; mountain: Copy }> = [
  { title: ['01 · Source', '01 · 资料'], water: ['OSM geometry + NASA POWER precipitation', 'OSM 几何数据 + NASA POWER 降水'], mountain: ['Paper descriptions / permitted tDAR records', '论文描述 / 获准使用的 tDAR 记录'] },
  { title: ['02 · Transformation', '02 · 转换'], water: ['Map projection + date selection', '地图投影 + 日期选择'], mountain: ['Qualitative transcription / documented aggregation', '定性转录 / 有记录的聚合'] },
  { title: ['03 · Interpretation', '03 · 解释'], water: ['A question to check in Kunshan', '需在昆山检验的问题'], mountain: ['A material pattern to contextualize', '需放回语境的物质模式'] },
]
