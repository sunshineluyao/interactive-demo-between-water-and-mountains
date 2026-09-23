import { writeFileSync } from 'node:fs'
import { synthesisOverview, synthesisExercises } from './synthesis-notebook.mjs'

const lines = (value) => value.trim().split('\n').map((line, index, all) => line + (index === all.length - 1 ? '' : '\n'))
const markdown = (source) => ({ cell_type: 'markdown', metadata: {}, source: lines(source) })
const code = (source) => ({ cell_type: 'code', execution_count: null, metadata: {}, outputs: [], source: lines(source) })

const cells = [
  markdown(String.raw`
<div style="background:linear-gradient(135deg,#071d25 0%,#245c70 52%,#7b4b8f 100%);padding:34px 38px;border-radius:22px;color:white;box-shadow:0 18px 55px rgba(7,29,37,.24)">
  <p style="margin:0;color:#bfeaed;font:700 13px/1.3 sans-serif;letter-spacing:.12em;text-transform:uppercase">INFOSCI 301 · COLOR EVIDENCE STUDIO / 色彩证据工作室</p>
  <h1 style="margin:12px 0 8px;font:500 38px/1.08 Georgia,serif">Color as Evidence<br><span style="color:#f2c078">让色彩支持证据，而非替代证据</span></h1>
  <p style="margin:0;max-width:860px;color:#e7f2f3;font:16px/1.55 sans-serif">Design qualitative, sequential, and diverging palettes; audit accessibility; move responsibly among screen, print, Figma, Adobe, and 3D workflows. 设计定性、顺序与发散色板；检验无障碍；在屏幕、印刷、Figma、Adobe 与三维流程之间负责任地转换。</p>
</div>

> **Design promise / 设计承诺**  
> Color should make a relationship easier to perceive without becoming the only carrier of meaning.  
> 色彩应帮助人们看清关系，但不应成为意义的唯一载体。

### What this notebook improves / 本笔记本的改进

The [reference Chapter 10 notebook](https://colab.research.google.com/github/sunshineluyao/vis-basics/blob/main/chapter10/Chapter_10.ipynb) introduces hue, luminance, saturation, grayscale comparison, and interactive sliders. This studio keeps that intuitive entry point and adds perceptual color spaces, task-matched encoding families, WCAG checks, color-vision previews, redundant encodings, global standards, research precedents, design-token export, Adobe swatches, and color-managed 3D.

参考 Chapter 10 笔记本介绍了色相、亮度、饱和度、灰度比较与交互滑块。本工作室保留这一直观入口，并加入感知色彩空间、与任务匹配的编码类型、WCAG 检验、色觉差异预览、冗余编码、全球标准、研究先例、设计令牌导出、Adobe 色板与色彩管理的三维可视化。
  `),
  code(String.raw`
# 0 · Install and prepare / 安装与准备
%pip -q install "plotly>=5.24" "ipywidgets>=8.1" "matplotlib>=3.8" "colorspacious>=1.1.2" "coloraide>=3.0" "pandas>=2.1" "numpy>=1.26"

import json, struct
from pathlib import Path
import numpy as np
import pandas as pd
import matplotlib.colors as mcolors
import plotly.graph_objects as go
import ipywidgets as widgets
from coloraide import Color
from colorspacious import cspace_convert
from IPython.display import display, HTML, FileLink, clear_output

PALETTE = {"deep":"#071d25","ink":"#20343b","lake":"#245c70","cyan":"#69d9df","coral":"#ff8a5c","gold":"#f2c078","paper":"#f3f5f3","white":"#fbfcfa"}
display(HTML("""
<style>
  .color-card {border:1px solid #bfd0d3;border-radius:16px;padding:18px 20px;background:#fbfcfa;color:#20343b;box-shadow:0 8px 26px rgba(32,52,59,.08)}
  .color-grid {display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:13px;margin:16px 0 24px}
  .color-note {border-left:5px solid #f2c078;padding:13px 16px;background:#fff9ea;color:#20343b;margin:14px 0}
  .color-warning {border-left-color:#ff8a5c;background:#fff2ed}
  .swatch-row {display:flex;min-height:68px;border-radius:12px;overflow:hidden;border:1px solid #c8d5d7}
  .swatch-row span {flex:1;display:flex;align-items:end;justify-content:center;padding:8px 4px;color:white;text-shadow:0 1px 3px #000;font:600 11px/1.1 sans-serif}
  .standard {display:inline-block;padding:3px 8px;border-radius:999px;background:#dce8eb;color:#245c70;font:700 11px/1.3 sans-serif;margin-right:5px}
</style>
"""))
  `),
  markdown(String.raw`
## 1 · Two triples: representation is not encoding / 两组三分法：色彩表示不等于数据编码

### A. Three practical color representations / 三种实用色彩表示

| Representation / 表示方式 | What the numbers model / 数值描述什么 | Best use / 适合用途 | Main caution / 主要注意事项 |
|---|---|---|---|
| **sRGB / RGB** | Device-oriented red, green, blue channels with a defined transfer function / 面向设备的红绿蓝通道 | Web, notebooks, ordinary displays / 网页、笔记本、普通显示器 | Equal numeric steps are not equal perceptual steps; encoded RGB is not linear light / 相等数值步长并不等于相等感知步长；编码 RGB 并非线性光 |
| **CMYK + ICC profile** | Process inks interpreted through a press, paper, ink set, and profile / 通过印刷机、纸张、油墨与配置文件解释的印墨量 | Publication and production print / 出版与生产印刷 | A naïve RGB→CMYK formula is only a teaching approximation; production requires profiles and proofing / 简单转换仅供教学；生产需要配置文件与打样 |
| **CIELAB / OKLCH** | Lightness plus opponent axes, or lightness–chroma–hue / 亮度与对立轴，或亮度–彩度–色相 | Palette construction, difference checks, modern CSS / 色板构建、差异检验、现代 CSS | Perceptual uniformity is approximate; gamut-map to the real device / 感知均匀性并非绝对；仍需映射到真实设备色域 |

### B. Three major data-encoding families / 三类主要数据色彩编码

| Encoding family / 编码类型 | Data relationship / 数据关系 | Primary channel / 主要通道 | Honest reading / 诚实读法 |
|---|---|---|---|
| **Qualitative / 定性** | named, unordered categories / 命名且无顺序的类别 | hue, reinforced by shape or label / 色相，并由形状或标签加强 | different—not more or less / 表示不同，而非多少 |
| **Sequential / 顺序** | low→high magnitude / 从低到高的数值 | monotonic lightness with controlled chroma / 单调亮度与受控彩度 | ordered magnitude / 有序大小 |
| **Diverging / 发散** | departure around a meaningful midpoint / 围绕有意义中点的偏离 | two hue families meeting at a neutral center / 两组色相在中性中心相遇 | direction + distance from the stated midpoint / 方向与偏离中点的距离 |

<div class="color-note"><strong>Do not choose a palette before naming the relationship. / 在说明关系之前，不要先选色板。</strong><br>A beautiful qualitative palette is still wrong for ordered magnitude; a smooth sequential palette is still wrong when zero or a policy target is the central reference. / 再美的定性色板也不适合有序大小；若零值或政策目标是中心参照，再平滑的顺序色板也不适合。</div>
  `),
  code(String.raw`
# 2 · Explore RGB, CMYK approximation, and OKLCH / 探索 RGB、CMYK 近似与 OKLCH
space = widgets.ToggleButtons(options=["sRGB", "CMYK teaching approximation / CMYK 教学近似", "OKLCH"], description="Space / 空间")
hue = widgets.IntSlider(value=205, min=0, max=360, description="Hue / 色相")
chroma = widgets.FloatSlider(value=.13, min=0, max=.28, step=.01, description="Chroma / 彩度")
lightness = widgets.FloatSlider(value=.68, min=.20, max=.96, step=.01, description="Lightness / 亮度")
space_output = widgets.Output()

def oklch_hex(L, C, h):
    return Color("oklch", [L, C, h]).convert("srgb").fit(method="oklch-chroma").to_string(hex=True)

def hex_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i:i+2], 16) / 255 for i in (0, 2, 4))

def rgb_cmyk_teaching(rgb):
    r, g, b = rgb; k = 1 - max(r, g, b)
    if k >= .999: return (0, 0, 0, 1)
    return ((1-r-k)/(1-k), (1-g-k)/(1-k), (1-b-k)/(1-k), k)

def draw_space(change=None):
    color = oklch_hex(lightness.value, chroma.value, hue.value)
    rgb = hex_rgb(color); cmyk = rgb_cmyk_teaching(rgb)
    with space_output:
        clear_output(wait=True)
        rows = [
            ("sRGB", "R {:.0f} · G {:.0f} · B {:.0f}".format(*(v*255 for v in rgb)), "IEC 61966-2-1 screen encoding / 屏幕编码"),
            ("CMYK approx.", "C {:.0%} · M {:.0%} · Y {:.0%} · K {:.0%}".format(*cmyk), "Teaching arithmetic only; profile before print / 仅为教学算术；印刷前需配置文件"),
            ("OKLCH", "L {:.0%} · C {:.2f} · h {}°".format(lightness.value, chroma.value, hue.value), "Palette-authoring coordinates / 色板创作坐标"),
        ]
        cards = "".join('<div class="color-card"><small>{}</small><h3>{}</h3><p>{}</p></div>'.format(a,b,c) for a,b,c in rows)
        display(HTML('<div class="color-card" style="border-top:10px solid {}"><h2>{}</h2><p>Selected view / 当前视图: <b>{}</b></p></div><div class="color-grid">{}</div>'.format(color,color,space.value,cards)))

for control in (space, hue, chroma, lightness): control.observe(draw_space, names="value")
draw_space(); display(widgets.VBox([space, hue, chroma, lightness, space_output]))
  `),
  markdown(String.raw`
## 3 · Build the right encoding family / 构建正确的编码类型

This lab uses OKLCH as an authoring space, then gamut-maps colors into sRGB for display. Adjust family, classes, hue, chroma, and lightness span. The chart, swatches, luminance reading, and token names update together. / 本实验使用 OKLCH 作为创作空间，再将颜色映射到 sRGB。调整类型、类别数量、色相、彩度与亮度跨度；图表、色块、亮度读法与令牌名称会同步更新。

Read the result in this order / 请按此顺序阅读结果：

1. Does the family match the relationship? / 类型是否匹配关系？
2. Is lightness monotonic when order matters? / 需要表达顺序时，亮度是否单调？
3. Can adjacent classes be distinguished in context? / 相邻类别在真实语境中能否区分？
4. Does the design remain legible without hue? / 去除色相后是否仍可读？
5. Are midpoint, units, missing values, and source explicit? / 中点、单位、缺失值与来源是否明确？
  `),
  code(String.raw`
# 3A · Interactive qualitative, sequential, and diverging palette builder
family = widgets.ToggleButtons(options=[("Qualitative / 定性","qualitative"),("Sequential / 顺序","sequential"),("Diverging / 发散","diverging")], description="Family / 类型")
steps = widgets.IntSlider(value=7, min=3, max=11, description="Classes / 类别")
base_hue = widgets.IntSlider(value=205, min=0, max=360, description="Hue / 色相")
palette_chroma = widgets.FloatSlider(value=.14, min=.03, max=.24, step=.01, description="Chroma / 彩度")
span = widgets.IntSlider(value=52, min=20, max=68, description="L span / 亮度跨度")
palette_output = widgets.Output()

def make_palette(kind, n, h, c, l_span):
    if kind == "qualitative":
        return [oklch_hex(.70, c, (h + i * 300/max(1,n-1)) % 360) for i in range(n)]
    low_l = max(.25, .92 - l_span/100)
    if kind == "sequential":
        return [oklch_hex(.95-i*(.95-low_l)/(n-1), .025+i*(c-.025)/(n-1), h) for i in range(n)]
    colors=[]
    for i in range(n):
        t=i/(n-1); distance=abs(t-.5)*2
        colors.append(oklch_hex(.96-distance*(.96-low_l), .015+distance*(c-.015), h if t < .5 else (h+180)%360))
    return colors

def relative_luminance(hex_color):
    rgb=np.array(hex_rgb(hex_color)); linear=np.where(rgb<=.04045,rgb/12.92,((rgb+.055)/1.055)**2.4)
    return float(linear @ np.array([.2126,.7152,.0722]))

def draw_palette(change=None):
    colors=make_palette(family.value,steps.value,base_hue.value,palette_chroma.value,span.value)
    lums=[relative_luminance(c) for c in colors]
    with palette_output:
        clear_output(wait=True)
        display(HTML('<div class="swatch-row">{}</div>'.format("".join('<span style="background:{}">{}</span>'.format(c,c.upper()) for c in colors))))
        values=np.arange(len(colors))
        fig=go.Figure(go.Bar(x=["Class {}".format(i+1) for i in values],y=(values+1)**1.15,marker_color=colors,text=[c.upper() for c in colors],textposition="outside"))
        fig.update_layout(height=390,paper_bgcolor="#fbfcfa",plot_bgcolor="#f3f5f3",title="Task-matched palette / 与任务匹配的色板",showlegend=False); fig.show(config={"displaylogo":False,"responsive":True})
        audit=go.Figure(go.Scatter(x=list(range(len(lums))),y=lums,mode="lines+markers",line=dict(color=PALETTE["lake"],width=3),marker=dict(color=colors,size=13,line=dict(color="white",width=2))))
        audit.update_layout(height=290,title="sRGB relative luminance audit / sRGB 相对亮度审计",yaxis_range=[0,1],paper_bgcolor="#fbfcfa",plot_bgcolor="#f3f5f3"); audit.show(config={"displaylogo":False,"responsive":True})
        rule = "Similar lightness avoids suggesting rank; labels or shapes must still identify categories." if family.value=="qualitative" else "Confirm the luminance path is intentional and state the midpoint for diverging data."
        display(HTML('<div class="color-note"><b>Design rule / 设计规则:</b> {}</div>'.format(rule)))

for control in (family,steps,base_hue,palette_chroma,span): control.observe(draw_palette,names="value")
draw_palette(); display(widgets.VBox([family,steps,base_hue,palette_chroma,span,palette_output]))
  `),
  markdown(String.raw`
## 4 · Accessibility is more than “color-blind safe” / 无障碍不只是“色盲安全”

WCAG 2.2 establishes three especially relevant requirements:

- **1.4.1 Use of Color (Level A):** color cannot be the only visual means of conveying information.
- **1.4.3 Contrast (Minimum, Level AA):** ordinary text needs at least 4.5:1; large text needs at least 3:1.
- **1.4.11 Non-text Contrast (Level AA):** essential graphical objects and interface states need at least 3:1 against adjacent colors.

WCAG 2.2 的相关要求包括：颜色不能是唯一信息通道；普通文字至少 4.5:1，大字至少 3:1；必要图形对象与界面状态相对邻近颜色至少 3:1。

These ratios do not guarantee that a multi-class palette is distinguishable, culturally appropriate, readable in sunlight, or reproducible in print. Treat them as minimum tests within broader validation. / 这些比率并不能保证多类别色板可区分、文化语义恰当、阳光下可读或印刷中可复现；它们只是更广泛验证中的最低检验。
  `),
  code(String.raw`
# 4A · Contrast checker + approximate color-vision preview / 对比度检查与色觉差异近似预览
foreground=widgets.ColorPicker(value="#245c70",description="Foreground / 前景")
background=widgets.ColorPicker(value="#fbfcfa",description="Background / 背景")
content_type=widgets.ToggleButtons(options=[("Normal text / 普通文字",4.5),("Large text / 大字",3.0),("Graphic/UI / 图形界面",3.0)],description="Target / 目标")
vision=widgets.Dropdown(options=[("Typical / 常见色觉","normal"),("Protanomaly / 红色弱","protanomaly"),("Deuteranomaly / 绿色弱","deuteranomaly"),("Tritanomaly / 蓝色弱","tritanomaly"),("Grayscale / 灰度","grayscale")],description="Preview / 预览")
access_output=widgets.Output()

def contrast_ratio(a,b):
    l1,l2=sorted([relative_luminance(a),relative_luminance(b)],reverse=True); return (l1+.05)/(l2+.05)

def simulate_color(hex_color,mode):
    rgb=np.array(hex_rgb(hex_color))
    if mode=="normal": return hex_color
    if mode=="grayscale":
        y=float(rgb @ np.array([.2126,.7152,.0722])); return mcolors.to_hex([y,y,y])
    simulated=cspace_convert(rgb,"sRGB1",{"name":"sRGB1+CVD","cvd_type":mode,"severity":100})
    return mcolors.to_hex(np.clip(simulated,0,1))

def draw_access(change=None):
    ratio=contrast_ratio(foreground.value,background.value); passes=ratio>=content_type.value
    fg_sim,bg_sim=simulate_color(foreground.value,vision.value),simulate_color(background.value,vision.value)
    with access_output:
        clear_output(wait=True)
        display(HTML('<div class="color-grid"><div class="color-card" style="background:{bg};color:{fg};border:3px solid {fg}"><h2>Water / 水</h2><p>Text + border + label preserve meaning. / 文字、边框与标签共同保留意义。</p></div><div class="color-card" style="background:{bg2};color:{fg2};border:3px solid {fg2}"><h2>Preview / 预览</h2><p>{vision}</p></div><div class="color-card"><small>WCAG contrast / 对比度</small><h2>{ratio:.2f}:1 · {status}</h2><p>Target / 目标: {target}:1</p></div></div>'.format(bg=background.value,fg=foreground.value,bg2=bg_sim,fg2=fg_sim,vision=vision.label,ratio=ratio,status="PASS / 通过" if passes else "REVISE / 修改",target=content_type.value)))

for control in (foreground,background,content_type,vision): control.observe(draw_access,names="value")
draw_access(); display(widgets.VBox([foreground,background,content_type,vision,access_output]))
  `),
  code(String.raw`
# 4B · Redundant encoding: color + shape + label / 冗余编码：颜色 + 形状 + 标签
groups=pd.DataFrame({"x":[1,2,3,4,5,6,7,8,9],"y":[2,3,2.6,5,4.5,5.5,7,6.3,7.7],"group":["Water / 水"]*3+["Heritage / 遗产"]*3+["Community / 社区"]*3,"symbol":["circle"]*3+["diamond"]*3+["square"]*3,"color":["#245c70"]*3+["#e07a5f"]*3+["#7b4b8f"]*3})
fig=go.Figure()
for name,frame in groups.groupby("group"):
    fig.add_trace(go.Scatter(x=frame.x,y=frame.y,mode="markers+text",name=name,text=[name]*len(frame),textposition="top center",marker=dict(size=17,color=frame.color.iloc[0],symbol=frame.symbol.iloc[0],line=dict(color="white",width=2))))
fig.update_layout(height=430,title="The category survives without hue / 去除色相后类别仍可识别",paper_bgcolor="#fbfcfa",plot_bgcolor="#f3f5f3",legend_orientation="h")
fig.show(config={"displaylogo":False,"responsive":True})
  `),
  markdown(String.raw`
## 5 · Global standards crosswalk / 全球标准对照

| Standard / 标准 | What it governs / 管理对象 | Action / 行动 |
|---|---|---|
| **CIE 015:2018** + **ISO/CIE 11664-4** | observers, illuminants, CIELAB and differences / 标准观察者、照明体、CIELAB 与色差 | Name color space and viewing assumptions / 说明色彩空间与观看假设 |
| **IEC 61966-2-1:1999 sRGB** | default RGB encoding / 默认 RGB 编码 | Export web colors in sRGB; do not calculate physical light on encoded values / 网页使用 sRGB；勿直接以编码值计算物理光 |
| **ICC.1:2022 / ISO 15076-1** | profiles connecting devices / 连接设备的配置文件 | Preserve profiles across display and print handoff / 显示与印刷交接中保留配置文件 |
| **ISO 12647-2:2013** | offset print process control / 胶印过程控制 | Treat CMYK as press-and-paper specific; proof output / 将 CMYK 视为印刷机与纸张特定流程并打样 |
| **WCAG 2.2** | use of color and contrast / 色彩使用与对比度 | Add labels or shapes; test applicable 4.5:1 and 3:1 thresholds / 添加标签或形状并检验阈值 |
| **ISO 9241-171:2025** | software accessibility / 软件无障碍 | Validate with diverse users and contexts, not only simulation / 与多样用户和情境共同验证 |
| **W3C CSS Color 4** | Lab, LCH, OKLab and OKLCH syntax / 现代 CSS 色彩语法 | Author perceptually and provide tested sRGB fallbacks / 以感知空间创作并提供 sRGB 回退 |

<div class="color-note color-warning"><strong>Standards are not interchangeable. / 各标准不能互相替代。</strong><br>WCAG concerns perceivable web content; CIE defines measurement foundations; IEC defines sRGB; ICC connects devices; ISO 12647 controls print. Passing one does not imply passing the others. / 通过其中一项并不意味着自动通过其他标准。</div>
  `),
  code(String.raw`
# 5A · Reusable palette audit ledger / 可复用的色板审计表
def audit_palette(colors,family_name="sequential",background="#fbfcfa"):
    labs=np.array([Color(c).convert("lab").coords() for c in colors])
    delta_e=[Color(colors[i]).delta_e(Color(colors[i+1]),method="2000") for i in range(len(colors)-1)]
    luminance=[relative_luminance(c) for c in colors]; contrast=[contrast_ratio(c,background) for c in colors]
    monotonic=all(a>=b for a,b in zip(luminance,luminance[1:])) or all(a<=b for a,b in zip(luminance,luminance[1:]))
    return pd.DataFrame({"token":["color-{}".format(i+1) for i in range(len(colors))],"hex":colors,"CIELAB_Lstar":np.round(labs[:,0],1),"relative_luminance":np.round(luminance,3),"text_contrast_on_background":np.round(contrast,2),"deltaE00_to_next":np.round(delta_e+[np.nan],2),"family":family_name,"monotonic_luminance":monotonic,"use_color_alone":"NO / 否"})

demo_colors=make_palette("sequential",7,205,.14,52)
audit_palette(demo_colors,"sequential / 顺序")
  `),
  markdown(String.raw`
## 6 · Evidence-grounded gallery / 有证据支持的色彩设计案例库

The cards below are **teaching reconstructions**, not copied publication figures. Each extracts one transferable lesson and links to its primary source. / 以下卡片为教学性重构，并非复制出版物图像；每张卡片提炼一个可迁移原则并链接原始来源。

<div class="color-grid">
  <div class="color-card"><span class="standard">Nature Methods</span><h3>Color coding · Wong (2010)</h3><div class="swatch-row"><span style="background:#0072B2">A</span><span style="background:#E69F00">B</span><span style="background:#009E73">C</span><span style="background:#CC79A7">D</span></div><p>Use distinguishable hues for classes; do not use rainbow hue as quantitative order. / 用可区分色相表示类别；不要把彩虹色相当作定量顺序。</p><p><a href="https://doi.org/10.1038/nmeth0810-573">Primary source / 原始来源</a></p></div>
  <div class="color-card"><span class="standard">Nature Methods</span><h3>Color blindness · Wong (2011)</h3><div class="swatch-row"><span style="background:#000000">●</span><span style="background:#E69F00">◆</span><span style="background:#56B4E9">■</span><span style="background:#009E73">▲</span></div><p>Pair color with shape, fill, position, or labels. / 将颜色与形状、填充、位置或标签配对。</p><p><a href="https://doi.org/10.1038/nmeth.1618">Primary source / 原始来源</a></p></div>
  <div class="color-card"><span class="standard">Cartography / InfoVis</span><h3>ColorBrewer · Harrower & Brewer (2003)</h3><div class="swatch-row"><span style="background:#eff3ff"></span><span style="background:#bdd7e7"></span><span style="background:#6baed6"></span><span style="background:#2171b5"></span></div><p>Match scheme family to the data and delivery environment. / 让色板类型匹配数据与呈现环境。</p><p><a href="https://doi.org/10.1179/000870403235002042">Primary source / 原始来源</a></p></div>
  <div class="color-card"><span class="standard">IEEE VIS / TVCG</span><h3>Colorgorical · Gramazio, Laidlaw & Schloss (2017)</h3><div class="swatch-row"><span style="background:#3476A8"></span><span style="background:#D07E39"></span><span style="background:#749A49"></span><span style="background:#9A5A9E"></span></div><p>Balance perceptual distance, name difference, uniqueness, and preference. / 平衡感知距离、名称差异、唯一性与偏好。</p><p><a href="https://doi.org/10.1109/TVCG.2016.2598918">Primary source / 原始来源</a></p></div>
  <div class="color-card"><span class="standard">ACM CHI 2024</span><h3>ColorMaker · Salvi et al. (2024)</h3><div class="swatch-row"><span style="background:#1f496e"></span><span style="background:#47889a"></span><span style="background:#a1b788"></span><span style="background:#efcf83"></span></div><p>Expose luminance, colorfulness, hue count, and CVD optimization as editable constraints. / 将亮度、色彩度、色相数量与色觉优化作为可编辑约束。</p><p><a href="https://doi.org/10.1145/3613904.3642265">Primary source / 原始来源</a></p></div>
  <div class="color-card"><span class="standard">ACM CHI 2016 · Best Paper</span><h3>ColorCheck · Reinecke, Flatla & Brooks (2016)</h3><div class="swatch-row"><span style="background:#16425b">indoor</span><span style="background:#3a7ca5">screen</span><span style="background:#d9dcd6">sun</span><span style="background:#f6ae2d">context</span></div><p>Differentiation varies with people, devices, and lighting; a simulator is not validation. / 色彩区分随人、设备与光线变化；模拟器不能替代验证。</p><p><a href="https://doi.org/10.1145/2858036.2858077">Primary source / 原始来源</a></p></div>
</div>
  `),
  code(String.raw`
# 6A · Browse gallery as design decisions / 以设计决策方式浏览案例
gallery={
 "Nature Methods · Color coding":(["#000000","#E69F00","#56B4E9","#009E73","#F0E442","#0072B2"],"Classes need discriminable hues; quantitative values need ordered lightness.","https://doi.org/10.1038/nmeth0810-573"),
 "Nature Methods · Color blindness":(["#000000","#E69F00","#56B4E9","#009E73"],"Pair hue with shape, fill, position, or labels; simulation is not user validation.","https://doi.org/10.1038/nmeth.1618"),
 "ColorBrewer · map schemes":(["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"],"Choose the scheme family from data type and delivery environment.","https://doi.org/10.1179/000870403235002042"),
 "IEEE VIS · Colorgorical":(["#3476A8","#D07E39","#749A49","#9A5A9E","#CCB238"],"Balance discriminability and preference.","https://doi.org/10.1109/TVCG.2016.2598918"),
 "ACM CHI · ColorMaker":(["#1f496e","#34718a","#629b98","#a1b788","#d6c67e","#efcf83"],"Expose luminance, colorfulness, and accessibility as editable constraints.","https://doi.org/10.1145/3613904.3642265"),
 "ACM CHI · ColorCheck":(["#16425b","#3a7ca5","#d9dcd6","#f6ae2d"],"Test differentiation across people, displays, and situational lighting.","https://doi.org/10.1145/2858036.2858077")}
gallery_choice=widgets.Dropdown(options=list(gallery),description="Case / 案例",layout=widgets.Layout(width="96%")); gallery_output=widgets.Output()
def draw_gallery(change=None):
    colors,lesson,url=gallery[gallery_choice.value]
    with gallery_output:
        clear_output(wait=True); chips="".join('<span style="background:{}">{}</span>'.format(c,c) for c in colors)
        display(HTML('<div class="color-card"><h2>{}</h2><div class="swatch-row">{}</div><p><b>Transferable lesson / 可迁移原则:</b> {}</p><p><a href="{}" target="_blank">Open primary source / 打开原始来源</a></p></div>'.format(gallery_choice.value,chips,lesson,url)))
gallery_choice.observe(draw_gallery,names="value"); draw_gallery(); display(widgets.VBox([gallery_choice,gallery_output]))
  `),
  markdown(String.raw`
## 7 · From notebook to Figma, Adobe, CSS, and print / 从笔记本到 Figma、Adobe、CSS 与印刷

### Figma / Figma 工作流

Use semantic variable names such as <code>data/water/500</code>, <code>surface/default</code>, and <code>text/primary</code>. Create light, dark, and high-contrast modes. Figma color variables can drive fills, strokes, and gradient stops. / 使用语义变量名并建立浅色、深色与高对比度模式；颜色变量可用于填充、描边与渐变节点。

The generated “Figma-ready” JSON is an inspectable handoff schema, not a native one-click import. Map it through your team’s plugin or API workflow and verify variable names and modes. / 生成的 JSON 是可检查的交接格式，并非原生一键导入文件；请通过团队的插件或 API 流程映射并核对变量与模式。

### Adobe and print / Adobe 与印刷工作流

Export Adobe Swatch Exchange (<code>.ase</code>) for handoff, but do not confuse a swatch file with color management. Preserve an ICC profile, use the printer’s requested CMYK condition, and proof the intended paper and process. / 可导出 ASE 色板用于交接，但不要把色板文件与色彩管理混为一谈；应保留 ICC 配置文件并针对目标纸张与工艺打样。
  `),
  code(String.raw`
# 7A · Export CSS, design tokens, Figma-ready values, and Adobe ASE
export_colors=make_palette(family.value,steps.value,base_hue.value,palette_chroma.value,span.value)
semantic_names=["palette/{}/{:02d}".format(family.value,i+1) for i in range(len(export_colors))]
tokens={name:{"$type":"color","$value":{"colorSpace":"srgb","components":[round(v,5) for v in hex_rgb(color)],"alpha":1},"$extensions":{"org.infoscience301.hex":color}} for name,color in zip(semantic_names,export_colors)}
figma_variables={"collection":"INFOSCI 301 Color Evidence","modes":["Default"],"variables":[{"name":name,"type":"COLOR","valuesByMode":{"Default":color}} for name,color in zip(semantic_names,export_colors)]}
css=":root {\n"+"\n".join("  --{}: {};".format(name.replace('/','-'),color) for name,color in zip(semantic_names,export_colors))+"\n}"
def ase_string(text):
    encoded=(text+"\0").encode("utf-16-be"); return struct.pack(">H",len(text)+1)+encoded
def write_ase(path,names,colors):
    blocks=[]
    for name,color in zip(names,colors):
        r,g,b=hex_rgb(color); body=ase_string(name)+b"RGB "+struct.pack(">fffH",r,g,b,2); blocks.append(struct.pack(">HI",0x0001,len(body))+body)
    Path(path).write_bytes(b"ASEF"+struct.pack(">HHI",1,0,len(blocks))+b"".join(blocks))
Path("INFOSCI301_color_tokens.json").write_text(json.dumps(tokens,indent=2,ensure_ascii=False)); Path("INFOSCI301_figma_variables.json").write_text(json.dumps(figma_variables,indent=2,ensure_ascii=False)); Path("INFOSCI301_palette.css").write_text(css); write_ase("INFOSCI301_palette.ase",semantic_names,export_colors)
display(HTML('<div class="color-note"><b>Four handoff files created / 已生成四个交接文件:</b> token JSON, Figma-ready JSON, CSS properties, and Adobe ASE. Inspect and rename semantic tokens before production. / 投入生产前请检查并重命名语义令牌。</div>'))
display(FileLink("INFOSCI301_color_tokens.json"),FileLink("INFOSCI301_figma_variables.json"),FileLink("INFOSCI301_palette.css"),FileLink("INFOSCI301_palette.ase"))
  `),
  markdown(String.raw`
## 8 · Color in 3D: data color, light, and material interact / 三维色彩：数据颜色、光照与材质相互作用

In 3D, assigned color is not necessarily perceived color. Lighting, normals, tone mapping, fog, transparency, depth, and display space change appearance. Keep a 2D legend, offer a flat-color or contour fallback, and test while camera and light move. / 在三维场景中，分配颜色不一定等于最终感知颜色。光照、法线、色调映射、雾、透明度、深度与显示色彩空间都会改变外观；请保留二维图例与平面色或等高线回退。

Three.js expects color textures to declare the appropriate color space; ordinary color textures typically use sRGB while lighting calculations occur in a linear working space. The Plotly surface below demonstrates the perceptual consequence without claiming to reproduce a complete renderer. / Three.js 要求颜色纹理声明正确色彩空间；普通纹理通常使用 sRGB，而光照计算在线性空间中进行。下方仅演示感知后果，并非完整渲染管线。
  `),
  code(String.raw`
# 8A · Interactive 3D palette + lighting comparison / 交互式三维色板与光照比较
x=np.linspace(-3,3,70); y=np.linspace(-3,3,70); X,Y=np.meshgrid(x,y); Z=np.sin(X**2+Y**2)/(1+.22*(X**2+Y**2))
surface_family=widgets.Dropdown(options=[("Sequential / 顺序","sequential"),("Diverging / 发散","diverging")],description="Palette / 色板")
surface_hue=widgets.IntSlider(value=205,min=0,max=360,description="Hue / 色相"); ambient=widgets.FloatSlider(value=.75,min=0,max=1,step=.05,description="Ambient / 环境光"); roughness=widgets.FloatSlider(value=.65,min=.05,max=1,step=.05,description="Roughness / 粗糙度"); surface_output=widgets.Output()
def draw_surface(change=None):
    colors=make_palette(surface_family.value,9,surface_hue.value,.14,55); colorscale=[[i/(len(colors)-1),c] for i,c in enumerate(colors)]
    with surface_output:
        clear_output(wait=True)
        fig=go.Figure(go.Surface(z=Z,x=X,y=Y,colorscale=colorscale,colorbar=dict(title="Value / 数值"),lighting=dict(ambient=ambient.value,diffuse=.8,roughness=roughness.value,specular=.25,fresnel=.15)))
        fig.update_layout(height=620,title="Rotate; compare color with geometry and light / 旋转并比较色彩、几何与光照",paper_bgcolor="#fbfcfa"); fig.show(config={"displaylogo":False,"responsive":True,"scrollZoom":True})
        display(HTML('<div class="color-note"><b>Test / 检验:</b> Can you identify sign and magnitude after rotating and changing light? If not, add contours, labels, or a 2D fallback. / 若旋转并改变光照后无法识别方向与大小，请添加等高线、标签或二维回退。</div>'))
for control in (surface_family,surface_hue,ambient,roughness): control.observe(draw_surface,names="value")
draw_surface(); display(widgets.VBox([surface_family,surface_hue,ambient,roughness,surface_output]))
  `),
  markdown(String.raw`
## 9 · Final design decision / 最终设计决策

> For **[people and context]**, the data relationship is **[categorical / ordered / centered]**. I therefore use a **[qualitative / sequential / diverging]** palette in **[named color space]**, reinforced by **[shape / label / texture / position]**. I checked **[contrast / CVD preview / grayscale / print proof / 3D lighting]** and still need to validate **[one unresolved risk]** with **[relevant people or environment]**.

> 对于 **[人群与情境]**，数据关系是 **[类别 / 有序 / 围绕中点]**。因此我在 **[注明色彩空间]** 中使用 **[定性 / 顺序 / 发散]** 色板，并通过 **[形状 / 标签 / 纹理 / 位置]** 加强。我已检验 **[对比度 / 色觉差异预览 / 灰度 / 印刷打样 / 三维光照]**，仍需与 **[相关人群或环境]** 验证 **[一个尚未解决的风险]**。
  `),
  code(String.raw`
# 9A · Build a portable palette decision card / 生成可携带的色板决策卡
audience=widgets.Text(description="People / 人群",placeholder="Who uses or is affected by the design?")
relationship=widgets.Dropdown(options=["categorical / 类别","ordered / 有序","centered / 围绕中点"],description="Relation / 关系")
redundancy=widgets.Dropdown(options=["label / 标签","shape / 形状","texture / 纹理","position / 位置"],description="Backup / 冗余")
checked=widgets.SelectMultiple(options=["contrast / 对比度","CVD preview / 色觉预览","grayscale / 灰度","print proof / 印刷打样","3D lighting / 三维光照"],description="Checked / 已检验")
remaining=widgets.Textarea(description="Risk / 风险",placeholder="What remains unresolved, and with whom will you test it?")
decision_button=widgets.Button(description="Build decision card / 生成决策卡",button_style="info",icon="check"); decision_output=widgets.Output()
def build_decision(_):
    chosen={"categorical / 类别":"qualitative / 定性","ordered / 有序":"sequential / 顺序","centered / 围绕中点":"diverging / 发散"}[relationship.value]
    with decision_output:
        clear_output(wait=True); display(HTML('<div class="color-card" style="border-top:7px solid #f2c078"><small>PALETTE DECISION / 色板决策</small><h2>{}</h2><p>Relationship / 关系: <b>{}</b> → Family / 类型: <b>{}</b></p><p>Redundant channel / 冗余通道: <b>{}</b></p><p>Checked / 已检验: <b>{}</b></p><div class="color-note color-warning"><b>Remaining validation / 尚待验证</b><br>{}</div></div>'.format(audience.value or "Audience not yet named / 尚未说明人群",relationship.value,chosen,redundancy.value,", ".join(checked.value) or "None recorded / 尚未记录",remaining.value or "Not recorded / 尚未记录")))
decision_button.on_click(build_decision); display(widgets.VBox([audience,relationship,redundancy,checked,remaining,decision_button,decision_output]))
  `),
  markdown(String.raw`
## References / 参考文献

### Color science and standards / 色彩科学与标准

- International Commission on Illumination. (2018). *Colorimetry* (4th ed.; CIE 015:2018). https://cie.co.at/publications/colorimetry-4th-edition
- International Commission on Illumination. (2019). *Colorimetry—Part 4: CIE 1976 L*a*b* colour space* (ISO/CIE 11664-4:2019). https://cie.co.at/publications/colorimetry-part-4-cie-1976-lab-colour-space-1
- International Electrotechnical Commission. (1999). *Default RGB colour space—sRGB* (IEC 61966-2-1:1999). https://webstore.iec.ch/en/publication/6169
- International Color Consortium. (2022). *Image technology colour management* (ICC.1:2022). https://www.color.org/v4spec/
- International Organization for Standardization. (2013). *Offset lithographic processes* (ISO 12647-2:2013). https://www.iso.org/standard/57833.html
- International Organization for Standardization. (2025). *Software accessibility* (ISO 9241-171:2025). https://www.iso.org/standard/86308.html
- World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/
- World Wide Web Consortium. (2025). *CSS Color Module Level 4*. https://www.w3.org/TR/css-color-4/

### Publishing and research precedents / 出版与研究先例

- Wong, B. (2010). Color coding. *Nature Methods, 7*, 573. https://doi.org/10.1038/nmeth0810-573
- Wong, B. (2011). Color blindness. *Nature Methods, 8*, 441. https://doi.org/10.1038/nmeth.1618
- Harrower, M., & Brewer, C. A. (2003). ColorBrewer.org. *The Cartographic Journal, 40*(1), 27–37. https://doi.org/10.1179/000870403235002042
- Gramazio, C. C., Laidlaw, D. H., & Schloss, K. B. (2017). Colorgorical. *IEEE TVCG, 23*(1), 521–530. https://doi.org/10.1109/TVCG.2016.2598918
- Salvi, A., Lu, K., Papka, M. E., Wang, Y., & Reda, K. (2024). Color Maker. In *CHI 2024* (pp. 1–17). https://doi.org/10.1145/3613904.3642265
- Reinecke, K., Flatla, D. R., & Brooks, C. (2016). Enabling designers to foresee which colors users cannot see. In *CHI 2016* (pp. 2693–2704). https://doi.org/10.1145/2858036.2858077

### Design and 3D handoff / 设计与三维交接

- Figma. (n.d.). *Variables, collections, and modes*. https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes
- Adobe. (n.d.). *Supported Creative Cloud Libraries element types*. https://developer.adobe.com/creative-cloud-libraries/docs/integrate/guides/working-with-elements/supported-elements/
- Three.js. (n.d.). *Color management*. https://threejs.org/manual/en/color-management.html

### Reference notebook / 参考笔记本

- Zhang, L. (2026). *Chapter 10: Visualizing quantities—Color scales* [Google Colab notebook]. https://colab.research.google.com/github/sunshineluyao/vis-basics/blob/main/chapter10/Chapter_10.ipynb
  `),
]

cells.splice(1, 0, synthesisOverview(true))
cells.splice(cells.length - 1, 0, ...synthesisExercises())

const notebook = {
  cells,
  metadata: {
    colab: { name: 'INFOSCI301_Color_Palette_Accessibility_Studio.ipynb', provenance: [], include_colab_link: true },
    kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' },
    language_info: { name: 'python', version: '3.x' },
  },
  nbformat: 4,
  nbformat_minor: 5,
}

writeFileSync('notebooks/INFOSCI301_Color_Palette_Accessibility_Studio.ipynb', JSON.stringify(notebook, null, 1) + '\n')
console.log(`Built color palette and accessibility Colab with ${cells.length} cells.`)
