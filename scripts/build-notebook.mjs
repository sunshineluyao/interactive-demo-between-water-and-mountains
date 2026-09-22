import { writeFileSync } from 'node:fs'

const lines = (value) => value.trim().split('\n').map((line, index, all) => line + (index === all.length - 1 ? '' : '\n'))
const markdown = (source) => ({ cell_type: 'markdown', metadata: {}, source: lines(source) })
const code = (source) => ({ cell_type: 'code', execution_count: null, metadata: {}, outputs: [], source: lines(source) })

const cells = [
  markdown(String.raw`
<div style="background:linear-gradient(135deg,#071d25 0%,#153f51 52%,#245c70 100%);padding:34px 38px;border-radius:22px;color:white;box-shadow:0 18px 55px rgba(7,29,37,.22)">
  <p style="margin:0;color:#9fdde1;font:700 13px/1.3 sans-serif;letter-spacing:.12em;text-transform:uppercase">INFOSCI 301 · INTERACTIVE STUDIO / 交互设计工作室</p>
  <h1 style="margin:12px 0 8px;font:500 38px/1.08 Georgia,serif">Between Water & Mountains<br><span style="color:#f2c078">水山之间</span></h1>
  <p style="margin:0;max-width:800px;color:#dcebed;font:16px/1.55 sans-serif">Build, test, and explain interaction with real teaching snapshots. 使用真实教学数据快照，构建、检验并解释交互设计。</p>
</div>

> **Design promise / 设计承诺**  
> A control earns its place only when it changes what a person can notice, compare, test, explain, or question.  
> 只有当一个控件改变了使用者能够发现、比较、检验、解释或质疑的内容时，它才有存在的理由。

### Studio route / 学习路径

1. **Orient / 定位** — Plotly animated globe
2. **Inspect place / 查看地点** — pydeck 3D spatial layers
3. **Select / 选择** — Altair linked evidence
4. **Change / 改变** — Plotly + ipywidgets time controls
5. **Coordinate / 协调** — Altair overview + detail brushing
6. **Decide / 决策** — ipywidgets design navigator
7. **Author / 创作** — inspectable evidence card
8. **Validate / 验证** — four-level test
  `),
  code(String.raw`
# 0 · Install the interaction stack / 安装交互工具包
%pip -q install "plotly>=5.24" "altair>=5.4" "ipywidgets>=8.1" "pydeck>=0.9" "anywidget>=0.9" "vl-convert-python>=1.6"

import json, math, requests
import pandas as pd
import altair as alt
import plotly.graph_objects as go
import pydeck as pdk
import ipywidgets as widgets
from IPython.display import display, HTML, Markdown, JSON, clear_output

alt.data_transformers.disable_max_rows()

PALETTE = {
    "ink": "#20343b", "deep": "#071d25", "lake": "#245c70",
    "cyan": "#69d9df", "coral": "#ff8a5c", "gold": "#f2c078",
    "mist": "#dce8eb", "paper": "#f3f5f3", "white": "#fbfcfa",
}

display(HTML("""
<style>
  :root { --atlas-deep:#071d25; --atlas-lake:#245c70; --atlas-cyan:#69d9df; --atlas-coral:#ff8a5c; --atlas-gold:#f2c078; }
  .atlas-card {border:1px solid #b8c8cc;border-radius:16px;padding:18px 20px;background:#fbfcfa;color:#20343b;box-shadow:0 8px 26px rgba(32,52,59,.08)}
  .atlas-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin:14px 0 22px}
  .atlas-kpi {border-radius:14px;padding:16px;background:linear-gradient(145deg,#153f51,#245c70);color:white}
  .atlas-kpi small {display:block;color:#bfeaed;text-transform:uppercase;letter-spacing:.08em}
  .atlas-kpi strong {display:block;font:500 25px/1.1 Georgia,serif;margin-top:8px;color:#fff}
  .atlas-note {border-left:4px solid var(--atlas-gold);padding:12px 16px;background:#fff9ea;margin:12px 0;color:#20343b}
  .atlas-boundary {border-left-color:var(--atlas-coral);background:#fff3ef}
  .widget-label {font-weight:700!important;color:#20343b!important}
</style>
"""))

BASE = "https://raw.githubusercontent.com/sunshineluyao/interactive-demo-between-water-and-mountains/main/"

def load_json(path):
    response = requests.get(BASE + path, timeout=30)
    response.raise_for_status()
    return response.json()

waterways = load_json("public/data/kunshan-waterways.geojson")
rainfall = load_json("public/data/kunshan-precipitation.json")
mandara = load_json("public/data/mandara-teaching.json")

display(HTML("""
<div class="atlas-grid">
  <div class="atlas-kpi"><small>Mapped / 地图</small><strong>{:,}</strong><span>waterway ways / 水系要素</span></div>
  <div class="atlas-kpi"><small>Temporal / 时间</small><strong>{:,}</strong><span>monthly values / 逐月数值</span></div>
  <div class="atlas-kpi"><small>Material / 物质</small><strong>{:,}</strong><span>cleaned sherds / 清洗后陶片</span></div>
  <div class="atlas-kpi"><small>Inference / 推断</small><strong>{:,}</strong><span>primary CP labels / 主要 CP 标识</span></div>
</div>
""".format(len(waterways["features"]), len(rainfall["records"]), mandara["reported_scale"]["cleaned_potsherds"], len(mandara["culture_periods"]))))
  `),
  markdown(String.raw`
## 1 · Read the evidence boundary first / 先读证据边界

| Source / 资料来源 | Status / 状态 | Supports / 可以支持 | Does **not** support / **不能**支持 |
|---|---|---|---|
| OpenStreetMap waterways / 水系 | observed mapped snapshot / 观察到的地图快照 | spatial context and tagged geometry / 空间语境与已标注几何 | flow, quality, completeness, lived meaning / 流量、水质、完整性、生活意义 |
| NASA POWER precipitation / 降水 | modeled environmental record / 模型化环境记录 | monthly context at one coordinate / 一个坐标点的逐月语境 | local gauge, flood history, discharge / 本地雨量计、洪水史、流量 |
| tDAR ceramics / 陶片 | observed archaeological records / 考古观察记录 | site, unit, level, decoration / 遗址、单位、层位、纹饰 | identity, motives, living communities / 身份、动机、当代社区 |
| CP1–CP14 teaching layer / 教学图层 | inferred + transcribed summary / 推断与转录摘要 | model-pattern orientation / 模型模式定位 | peoples, named cultures, chapters, ranks / 族群、命名文化、章节、等级 |
| globe arc + orbiting marks / 地球仪弧线与环绕点 | schematic / 示意 | course comparison and source types / 课程比较与资料类型 | migration, causality, measured paths / 迁徙、因果、实测路径 |

<div class="atlas-note atlas-boundary"><strong>Evidence boundary / 证据边界</strong><br>Keep observed, derived, inferred, interpretive, and schematic marks visibly distinct. 始终清楚区分观察、派生、推断、解释与示意标记。</div>
  `),
  markdown(String.raw`
## 2 · Orient in 3D / 三维定位

Rotate, zoom, hover, and switch projections. The dotted arc is explicitly labelled as a **course question**, never a route.  
旋转、缩放、悬停并切换投影。虚线弧明确标为**课程问题**，绝不表示路线。
  `),
  code(String.raw`
# INTERACTION / 交互: navigate + select + change projection
places = pd.DataFrame([
    {"place": "Kunshan / 昆山", "lat": 31.39, "lon": 120.98, "status": "city coordinate / 城市坐标"},
    {"place": "Mandara region / 曼达拉地区", "lat": 11.0, "lon": 14.0, "status": "regional orientation / 区域定位"},
])

globe = go.Figure()
globe.add_trace(go.Scattergeo(
    lon=places.lon, lat=places.lat,
    customdata=places[["place", "status"]],
    mode="markers+text", text=places.place,
    textposition=["top left", "bottom right"],
    marker=dict(size=[16,16], color=[PALETTE["cyan"], PALETTE["coral"]], line=dict(color="white", width=2)),
    hovertemplate="<b>%{customdata[0]}</b><br>%{lat:.2f}° N, %{lon:.2f}° E<br>%{customdata[1]}<extra></extra>",
    name="places / 地点"
))
globe.add_trace(go.Scattergeo(
    lon=[120.98, 14.0], lat=[31.39, 11.0], mode="lines",
    line=dict(color=PALETTE["gold"], width=2, dash="dot"),
    hovertemplate="Course question only / 仅表示课程问题<extra></extra>",
    name="question bridge / 问题之桥"
))
globe.update_geos(
    projection_type="orthographic", projection_rotation=dict(lon=68, lat=20),
    showland=True, landcolor="#dce8eb", showocean=True, oceancolor="#153f51",
    showcountries=True, countrycolor="#81959d", bgcolor=PALETTE["deep"]
)
globe.update_layout(
    title="<b>Two places, one careful question / 两地，一个审慎的问题</b><br><sup>Drag to rotate · scroll to zoom / 拖动旋转 · 滚轮缩放</sup>",
    height=650, margin=dict(l=0,r=0,t=80,b=0), paper_bgcolor=PALETTE["deep"], font_color="white",
    legend=dict(orientation="h", y=.03, x=.5, xanchor="center"),
    updatemenus=[dict(
        type="dropdown", x=.02, y=.98, bgcolor="#fbfcfa", font=dict(color=PALETTE["ink"]),
        buttons=[
            dict(label="Globe / 地球仪", method="relayout", args=[{"geo.projection.type":"orthographic", "geo.projection.rotation.lon":68}]),
            dict(label="World / 世界地图", method="relayout", args=[{"geo.projection.type":"natural earth"}]),
            dict(label="Kunshan / 昆山", method="relayout", args=[{"geo.projection.type":"orthographic", "geo.projection.rotation.lon":121, "geo.projection.rotation.lat":31}]),
            dict(label="Mandara / 曼达拉", method="relayout", args=[{"geo.projection.type":"orthographic", "geo.projection.rotation.lon":14, "geo.projection.rotation.lat":11}]),
        ]
    ), dict(
        type="buttons", x=.02, y=.84, direction="left", showactive=False,
        bgcolor="#fbfcfa", font=dict(color=PALETTE["ink"]),
        buttons=[
            dict(label="▶ Orbit / 环游", method="animate", args=[None, {"frame":{"duration":90,"redraw":True},"transition":{"duration":70},"fromcurrent":True}]),
            dict(label="■ Pause / 暂停", method="animate", args=[[None], {"frame":{"duration":0,"redraw":False},"mode":"immediate"}]),
        ]
    )]
)
globe.frames = [go.Frame(
    name=f"orbit-{lon}",
    layout=go.Layout(geo=dict(projection=dict(type="orthographic", rotation=dict(lon=lon, lat=20))))
) for lon in range(0, 361, 6)]
globe.show(config={"displaylogo": False, "scrollZoom": True, "responsive": True})
  `),
  markdown(String.raw`
## 3 · Inspect place as layered evidence / 把地点作为分层证据来查看

The pydeck view renders the actual bundled OpenStreetMap geometries. Tilt and rotate to inspect spatial density; color communicates the mapped tag, not water quality.  
pydeck 视图呈现随附的真实 OpenStreetMap 几何数据。倾斜与旋转可查看空间密度；颜色表示地图标签，而非水质。
  `),
  code(String.raw`
# INTERACTION / 交互: 3D pan + zoom + hover with pydeck
color_by_type = {
    "river": [36,92,112,210], "canal": [105,217,223,220],
    "stream": [242,192,120,210], "drain": [255,138,92,190],
}
paths = []
for feature in waterways["features"]:
    props = feature.get("properties", {})
    water_type = props.get("waterway", "other")
    paths.append({
        "path": feature["geometry"]["coordinates"],
        "name": props.get("name") or "Unnamed waterway / 未命名水道",
        "type": water_type,
        "color": color_by_type.get(water_type, [129,149,157,180]),
    })

deck = pdk.Deck(
    layers=[
        pdk.Layer("PathLayer", paths, get_path="path", get_color="color", get_width=42,
                  width_min_pixels=1.4, pickable=True, auto_highlight=True),
        pdk.Layer("ScatterplotLayer", [{"position":[120.98,31.39],"name":"Kunshan / 昆山"}],
                  get_position="position", get_fill_color=[242,192,120,245], get_radius=900, pickable=True),
    ],
    initial_view_state=pdk.ViewState(latitude=31.27, longitude=120.94, zoom=9.35, pitch=52, bearing=-18),
    tooltip={"html":"<b>{name}</b><br>OSM tag / 标签: {type}", "style":{"backgroundColor":"#071d25","color":"white"}},
    map_style=None,
)
display(deck)
display(HTML('<div class="atlas-note atlas-boundary"><b>Boundary / 边界:</b> mapped geometry ≠ flow, flooding, access, water quality, or community meaning. 地图几何 ≠ 流量、洪涝、可达性、水质或社区意义。</div>'))
  `),
  markdown(String.raw`
## 4 · Select an inferred pattern / 选择一个推断模式

**CP = “culture period” in the paper’s model.** CP1…CP14 are identifiers for latent statistical components. They are not chapters, named cultures, ethnic groups, ranks, dates, or an automatically ordered timeline.  
**CP 是论文模型中的“文化期”。** CP1…CP14 是潜在统计组成的标识符，不是章节、命名文化、族群、等级、年代或自动排序的时间线。
  `),
  code(String.raw`
# INTERACTION / 交互: click + highlight + details on demand
cp_rows = []
for signature in mandara["signatures"]:
    for cp_name, value in zip(mandara["culture_periods"], signature["values"]):
        status = "dominant reported / 报告为主要" if value == 1 else ("smaller reported / 报告为次要" if value > 0 else "not asserted / 未作断言")
        cp_rows.append({"group":signature["group"], "sites":signature["sites"], "CP":cp_name, "value":value, "status":status})
cp = pd.DataFrame(cp_rows)

pick = alt.selection_point(fields=["CP"], on="click", clear="dblclick", name="Choose_CP")
matrix = alt.Chart(cp).mark_rect(stroke="#fbfcfa", strokeWidth=1).encode(
    x=alt.X("CP:N", sort=mandara["culture_periods"], title="Model identifier / 模型标识（非年代顺序）"),
    y=alt.Y("group:N", title=None),
    color=alt.Color("value:Q", scale=alt.Scale(domain=[0,1], range=["#e5edef","#245c70"]), legend=None),
    opacity=alt.condition(pick, alt.value(1), alt.value(.22)),
    tooltip=[alt.Tooltip("group:N", title="Group / 组"), "sites", "CP", alt.Tooltip("status:N", title="Status / 状态")]
).add_params(pick).properties(width=760, height=180, title="Click a CP label; double-click to clear / 单击选择，双击清除")

detail = alt.Chart(cp).transform_filter(pick).mark_bar(color=PALETTE["coral"], cornerRadiusEnd=6).encode(
    x=alt.X("value:Q", scale=alt.Scale(domain=[0,1]), title="Reported teaching signature / 教学摘要中的报告强度"),
    y=alt.Y("group:N", title=None), tooltip=["group","sites","CP","status"]
).properties(width=760, height=120, title="Selected identifier in context / 所选标识的语境")

matrix & detail
  `),
  markdown(String.raw`
## 5 · Change one parameter; keep context / 改变一个参数，保留比较语境

Plotly supplies a responsive result view; ipywidgets supplies an explicit month controller and replay action. Units, source, and y-scale remain fixed.  
Plotly 提供响应式结果视图，ipywidgets 提供明确的月份控制器与重播操作；单位、资料来源与纵轴比例保持稳定。
  `),
  code(String.raw`
# INTERACTION / 交互: widget-controlled temporal view
rain = pd.DataFrame(rainfall["records"])
rain["date"] = pd.to_datetime(dict(year=rain.year, month=rain.month, day=1))
month_names = {1:"Jan / 1月",2:"Feb / 2月",3:"Mar / 3月",4:"Apr / 4月",5:"May / 5月",6:"Jun / 6月",7:"Jul / 7月",8:"Aug / 8月",9:"Sep / 9月",10:"Oct / 10月",11:"Nov / 11月",12:"Dec / 12月"}

month = widgets.SelectionSlider(
    options=[(month_names[i], i) for i in range(1,13)], value=1,
    description="Month / 月份", continuous_update=True,
    layout=widgets.Layout(width="96%"), style={"description_width":"110px"}
)
rain_output = widgets.Output()

def draw_month(change=None):
    selected = rain[rain.month == month.value]
    with rain_output:
        clear_output(wait=True)
        fig = go.Figure(go.Scatter(
            x=selected.year, y=selected.mm_per_day, mode="lines+markers",
            line=dict(color=PALETTE["lake"], width=3), marker=dict(color=PALETTE["coral"], size=7),
            customdata=selected[["month"]],
            hovertemplate="Year / 年: %{x}<br>mm/day: %{y:.2f}<extra></extra>"
        ))
        fig.update_layout(
            title="%s · stable units and scale / 稳定单位与比例尺" % month_names[month.value],
            height=390, margin=dict(l=50,r=20,t=70,b=50), paper_bgcolor=PALETTE["white"], plot_bgcolor=PALETTE["paper"],
            yaxis=dict(title="Monthly mean precipitation / 月均降水 (mm/day)", rangemode="tozero", fixedrange=False),
            xaxis=dict(title="Year / 年"), hovermode="x unified", font=dict(color=PALETTE["ink"]),
        )
        fig.show(config={"displaylogo":False,"responsive":True})

month.observe(draw_month, names="value")
draw_month()
display(widgets.VBox([month, rain_output], layout=widgets.Layout(border="1px solid #b8c8cc", padding="18px", border_radius="14px")))
  `),
  markdown(String.raw`
## 6 · Coordinate overview and detail / 协调概览与详情

Drag across the overview. One shared selection updates the detail view; double-click clears it.  
在概览上拖动选择区间；一个共享选择会更新详情视图，双击可清除。
  `),
  code(String.raw`
# INTERACTION / 交互: overview + detail + brushing/linking
brush = alt.selection_interval(encodings=["x"], name="Time_window")
overview = alt.Chart(rain).mark_area(
    color=PALETTE["cyan"], opacity=.65, line={"color":PALETTE["lake"]}
).encode(
    x=alt.X("date:T", title=None), y=alt.Y("mm_per_day:Q", title="mm/day")
).add_params(brush).properties(width=760, height=110, title="Drag a time window / 拖动选择时间区间")

detail = alt.Chart(rain).mark_line(color=PALETTE["lake"], point={"filled":True,"color":PALETTE["coral"],"size":30}).encode(
    x=alt.X("date:T", title="Selected time / 所选时间"),
    y=alt.Y("mm_per_day:Q", title="mm/day", scale=alt.Scale(zero=True)),
    tooltip=[alt.Tooltip("date:T", title="Month / 月"), alt.Tooltip("mm_per_day:Q", title="mm/day", format=".2f")]
).transform_filter(brush).properties(width=760, height=280, title="Detail preserves units and source / 详情保留单位与资料来源")

overview & detail
  `),
  markdown(String.raw`
## 7 · Navigate design choices / 导航设计选择

Each layer offers at most three choices. The result recommends an idiom **and** a falsifiable next test—not an effect list.  
每层最多三个选项。结果会推荐一种视觉表达和一个可证伪的下一步检验，而不是效果清单。
  `),
  code(String.raw`
# INTERACTION / 交互: bounded decision navigator with ipywidgets
choices = {
    "Question / 问题": ["Locate + orient / 定位", "Trace change / 追踪变化", "Invite interpretation / 邀请解释"],
    "Evidence / 证据": ["Space + time / 时空", "Relations / 关系", "Community + qualitative / 社区与质性"],
    "Task / 任务": ["Explore / 探索", "Compare / 比较", "Explain + communicate / 解释与沟通"],
    "Interaction / 交互": ["Select + details / 选择与详情", "Filter + change / 筛选与改变", "Coordinate + annotate / 协调与注释"],
}

controls = []
for label, options in choices.items():
    control = widgets.ToggleButtons(options=options, description=label, style={"description_width":"120px"}, layout=widgets.Layout(width="100%"))
    controls.append(control)

decision_output = widgets.Output()

def render_decision(change=None):
    interaction = controls[-1].value
    tests = {
        "Select + details / 选择与详情": "Can a keyboard user identify the selected record and recover the overview? / 键盘用户能否识别所选记录并恢复概览？",
        "Filter + change / 筛选与改变": "Can a reader state exactly what changed and what stayed fixed? / 读者能否准确说出什么改变了、什么保持不变？",
        "Coordinate + annotate / 协调与注释": "Can another person trace the annotation to the same evidence? / 他人能否把注释追溯到同一证据？",
    }
    with decision_output:
        clear_output(wait=True)
        path = " → ".join(c.value for c in controls)
        display(HTML("""
        <div class="atlas-card" style="border-top:5px solid #f2c078">
          <small style="color:#245c70;text-transform:uppercase;letter-spacing:.08em">Recommended design / 推荐设计</small>
          <h3 style="margin:8px 0;color:#20343b">{}</h3>
          <p style="color:#50636b">{}</p>
          <div class="atlas-note"><b>Next test / 下一项检验</b><br>{}</div>
          <p style="font-size:13px;color:#50636b">Validation / 验证: domain + community → data + task → idiom → algorithm</p>
        </div>
        """.format(interaction, path, tests[interaction])))

for control in controls:
    control.observe(render_decision, names="value")
render_decision()
display(widgets.VBox(controls + [decision_output], layout=widgets.Layout(gap="10px")))
  `),
  markdown(String.raw`
## 8 · Author an inspectable evidence card / 创作可检查的证据卡

Keep **observation**, **interpretation**, **evidence boundary**, and **next check** separate. The widget never submits or uploads content.  
把**观察**、**解释**、**证据边界**与**下一步检验**分开记录；控件不会提交或上传内容。
  `),
  code(String.raw`
# INTERACTION / 交互: author + annotate + inspectable output
observed = widgets.Textarea(description="Observed / 观察", placeholder="What does the source actually show? / 资料实际显示什么？", layout=widgets.Layout(width="100%", height="90px"), style={"description_width":"135px"})
interpreted = widgets.Textarea(description="Interpretation / 解释", placeholder="What might it mean? / 它可能意味着什么？", layout=widgets.Layout(width="100%", height="90px"), style={"description_width":"135px"})
boundary = widgets.Textarea(description="Boundary / 边界", placeholder="What can this evidence not answer? / 此证据不能回答什么？", layout=widgets.Layout(width="100%", height="90px"), style={"description_width":"135px"})
next_check = widgets.Textarea(description="Next test / 检验", placeholder="What could change the interpretation? / 什么可能改变这一解释？", layout=widgets.Layout(width="100%", height="90px"), style={"description_width":"135px"})
make_card = widgets.Button(description="Build evidence card / 生成证据卡", button_style="info", icon="check")
card_output = widgets.Output()

def render_card(_):
    with card_output:
        clear_output(wait=True)
        values = [observed.value, interpreted.value, boundary.value, next_check.value]
        labels = ["OBSERVED / 观察", "INTERPRETATION / 解释", "BOUNDARY / 边界", "NEXT CHECK / 下一步检验"]
        colors = [PALETTE["cyan"], PALETTE["gold"], PALETTE["coral"], PALETTE["lake"]]
        cards = "".join('<div class="atlas-card" style="border-top:5px solid {}"><small>{}</small><p>{}</p></div>'.format(color,label,value or "Not recorded / 尚未记录") for label,value,color in zip(labels,values,colors))
        display(HTML('<div class="atlas-grid">'+cards+'</div>'))
        display(JSON({"observed":observed.value,"interpretation":interpreted.value,"evidence_boundary":boundary.value,"next_check":next_check.value}))

make_card.on_click(render_card)
display(widgets.VBox([observed, interpreted, boundary, next_check, make_card, card_output], layout=widgets.Layout(gap="10px")))
  `),
  markdown(String.raw`
## 9 · Four-level validation / 四层验证

| Level / 层级 | Question / 核心问题 | Quick test / 快速检验 |
|---|---|---|
| Domain + community / 领域与社区 | Is the question meaningful to intended and affected people? / 问题对目标用户与受影响的人是否有意义？ | Ask a peer to name the audience, decision, and missing voice. / 请同伴说出受众、决策与缺席的声音。 |
| Data + task / 数据与任务 | Do fields, granularity, provenance, and rights support the task? / 字段、粒度、出处与权利是否支持任务？ | Name one supported and one unsupported task. / 说出一个可支持与一个不可支持的任务。 |
| Idiom / 视觉表达 | Does the encoding reveal the relationship without strengthening the claim? / 编码是否揭示关系却没有夸大主张？ | Hide the caption; ask what pattern the reader sees. / 隐去说明文字，询问读者看到了什么模式。 |
| Algorithm / 算法 | Is the result robust to sensible parameter changes? / 结果对合理参数变化是否稳健？ | Change one parameter and record what changes. / 改变一个参数并记录结果变化。 |

### Studio exercise / 工作室练习

Complete and test this script with someone from another discipline:

1. The person needs to **_____**. / 使用者需要 **_____**。
2. They **_____** the control. / 他们对控件 **_____**。
3. The system responds by **_____**. / 系统通过 **_____** 回应。
4. This reveals **_____**, while the source cannot answer **_____**. / 这揭示 **_____**，但资料无法回答 **_____**。
5. They reset, recover, or challenge the interpretation by **_____**. / 他们通过 **_____** 重置、恢复或质疑解释。
  `),
  markdown(String.raw`
## References and precedents / 参考文献与研究先例

- Munzner, T. (2014). *Visualization analysis and design*. CRC Press. https://doi.org/10.1201/b17511
- Munzner, T. (n.d.). *Visualization analysis & design: Interactive views (Chapters 11–12)*. https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf
- Satyanarayan, A., Moritz, D., Wongsuphasawat, K., & Heer, J. (2017). Vega-Lite: A grammar of interactive graphics. https://doi.org/10.1109/TVCG.2016.2599030
- Kim, N. W., Henry Riche, N., Bach, B., Xu, G., Brehmer, M., Hinckley, K., Pahud, M., Xia, H., McGuffin, M. J., & Pfister, H. (2019). DataToon. https://doi.org/10.1145/3290605.3300335
- Wang, C., Feng, Y., Bodik, R., Dillig, I., Cheung, A., & Ko, A. J. (2021). Falx. https://doi.org/10.1145/3411764.3445249
- Wang, C., Thompson, J., & Lee, B. (2024). Data Formulator. https://doi.org/10.1109/TVCG.2023.3326585
- O’Brien, J. D., Lin, K., & MacEachern, S. (2015). *Mixture model of pottery distributions from Lake Chad Basin archaeological sites reveals ancient segregation patterns*. https://doi.org/10.48550/arXiv.1511.05185
- O’Brien, J. D., Lin, K., & MacEachern, S. (2015). *Ceramic dataset*. tDAR. https://doi.org/10.6067/XCV83F4R7D
- OpenStreetMap contributors. Open Data Commons ODbL 1.0. https://www.openstreetmap.org/copyright
- NASA POWER Project. https://power.larc.nasa.gov/docs/services/api/temporal/monthly/

The website’s reference library provides full media credits and evidence-boundary notes. / 网站参考文献库提供完整媒体致谢与证据边界说明。
  `),
]

const notebook = {
  cells,
  metadata: {
    colab: { name: 'INFOSCI301_Interaction_Design_Companion.ipynb', provenance: [] },
    kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' },
    language_info: { name: 'python', version: '3.x' },
  },
  nbformat: 4,
  nbformat_minor: 5,
}

writeFileSync('notebooks/INFOSCI301_Interaction_Design_Companion.ipynb', JSON.stringify(notebook, null, 1) + '\n')
console.log(`Built bilingual Colab companion with ${cells.length} cells.`)
