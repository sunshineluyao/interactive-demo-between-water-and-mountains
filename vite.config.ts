import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const notebookNames = [
  'INFOSCI301_Interaction_Design_Companion.ipynb',
  'INFOSCI301_Color_Palette_Accessibility_Studio.ipynb',
]
const notebookPaths = new Map(notebookNames.map((name) => [name, fileURLToPath(new URL(`./notebooks/${name}`, import.meta.url))]))

function notebookAsset(): Plugin {
  return {
    name: 'notebook-asset',
    configureServer(server) {
      for (const notebookName of notebookNames) {
        server.middlewares.use(`/notebooks/${notebookName}`, (_request, response) => {
          response.setHeader('Content-Type', 'application/x-ipynb+json; charset=utf-8')
          response.setHeader('Content-Disposition', `attachment; filename="${notebookName}"`)
          response.end(readFileSync(notebookPaths.get(notebookName)!))
        })
      }
    },
    generateBundle() {
      for (const notebookName of notebookNames) {
        this.emitFile({ type: 'asset', fileName: `notebooks/${notebookName}`, source: readFileSync(notebookPaths.get(notebookName)!) })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), notebookAsset()],
  build: {
    target: 'es2022',
    sourcemap: true,
  },
})
