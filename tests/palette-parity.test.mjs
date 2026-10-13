import test from 'node:test'
import assert from 'node:assert/strict'
import {execFileSync} from 'node:child_process'
import {readFileSync} from 'node:fs'
import {makePalette,simulateVision} from '../src/components/ColorPaletteStudio.tsx'
test('Python palette agrees with the real app across supported parameters',()=>{
 const script=`import ast,json,itertools,sys
n=json.load(open(sys.argv[1]));c=next(c for c in n['cells'] if c['id']=='color-original-07');t=ast.parse(''.join(c['source']))
t.body=[x for x in t.body if isinstance(x,ast.FunctionDef) and x.name in ('oklch_hex','make_palette')]
ns={};exec(compile(t,'notebook','exec'),ns);rows=[]
for p in itertools.product(['qualitative','sequential','diverging'],[3,7,9],[0,205,360],[.03,.16,.28],[24,48,66]):rows.append({'parameters':p,'colors':ns['make_palette'](*p)})
print(json.dumps(rows))`
 const rows=JSON.parse(execFileSync('python3',['-c',script,'notebooks/INFOSCI301_Color_Palette_Accessibility_Studio.ipynb'],{encoding:'utf8'}))
 assert.equal(rows.length,243);for(const row of rows)assert.deepEqual(makePalette(...row.parameters),row.colors,JSON.stringify(row.parameters))
})
test('Browser CVD conversion agrees with the notebook Colorspacious reference',()=>{
 const r=JSON.parse(readFileSync('tests/cvd-reference.json','utf8'))
 for(const row of r.cases){const actual=simulateVision(row.rgb,row.mode);for(const key of ['r','g','b'])assert.ok(Math.abs(actual[key]-row.expected[key])<.01,`${row.mode} ${key}`)}
})
