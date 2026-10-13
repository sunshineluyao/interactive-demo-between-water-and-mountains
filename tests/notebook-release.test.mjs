import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createHash} from 'node:crypto'
const hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex')
const release=JSON.parse(fs.readFileSync('NOTEBOOK_RELEASE.json','utf8'))
test('served HTML and notebook downloads refer to the recorded executions',()=>{
 assert.equal(release.notebooks.length,2)
 for(const r of release.notebooks){
  assert.equal(hash(r.notebook),r.notebook_sha256)
  assert.equal(hash('public/notebooks/'+r.html),r.html_sha256)
  const n=JSON.parse(fs.readFileSync(r.notebook,'utf8'))
  assert.equal(n.cells.filter(c=>c.cell_type==='code').length,r.executed_cells)
  assert.ok(n.cells.filter(c=>c.cell_type==='code').every(c=>c.execution_count>0 && !c.outputs.some(o=>o.output_type==='error')))
 }
})
test('every interaction tab has an authentic saved output, and no hand-drawn live claim',()=>{
 const component=fs.readFileSync('src/components/ColabCompanion.tsx','utf8')
 assert.ok(!component.includes('function MiniResult'));assert.ok(!component.includes('Live result preview'))
 for(let i=1;i<=8;i++)assert.ok(fs.existsSync('public/notebooks/interaction-step-'+String(i).padStart(2,'0')+'.html'))
 assert.ok(fs.existsSync('public/notebooks/color-current-palette.html'))
})
test('every evidence download is a nonempty ZIP and versioned Colab links use the build ref',()=>{
 for(const name of ['interaction','color']){
  const b=fs.readFileSync('public/notebooks/'+name+'-evidence.zip');assert.equal(b.subarray(0,2).toString(),'PK');assert.ok(b.length>1000)
 }
 const source=fs.readFileSync('vite.config.ts','utf8');assert.match(source,/VERCEL_GIT_COMMIT_SHA/)
 for(const name of ['ColabCompanion','ColorPaletteStudio'])assert.match(fs.readFileSync('src/components/'+name+'.tsx','utf8'),/VITE_NOTEBOOK_REF/)
})
test('qualitative CP cells retain redundant status cues in the executed notebook',()=>{
 const n=JSON.parse(fs.readFileSync(release.notebooks.find(r=>r.notebook.includes('Interaction')).notebook,'utf8'))
 const cell=n.cells.find(c=>c.cell_type==='code'&&c.source.join('').includes("cp['cue']"))
 assert.ok(cell);assert.ok(cell.source.join('').includes('status:N'));assert.ok(cell.source.join('').includes('text_cues'))
 assert.ok(cell.outputs.some(o=>(Array.isArray(o.data?.['text/html'])?o.data['text/html'].join(''):o.data?.['text/html']||'').includes('dominant reported')))
})
