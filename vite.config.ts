import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const notebookName = 'INFOSCI301_Interaction_Design_Companion.ipynb'
const notebookPath = fileURLToPath(new URL(`./notebooks/${notebookName}`, import.meta.url))

function notebookAsset(): Plugin {
  return {
    name: 'notebook-asset',
    configureServer(server) {
      server.middlewares.use(`/notebooks/${notebookName}`, (_request, response) => {
        response.setHeader('Content-Type', 'application/x-ipynb+json; charset=utf-8')
        response.setHeader('Content-Disposition', `attachment; filename="${notebookName}"`)
        response.end(readFileSync(notebookPath))
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: `notebooks/${notebookName}`, source: readFileSync(notebookPath) })
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
