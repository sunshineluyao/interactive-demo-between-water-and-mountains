import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

const root = process.cwd()
const source = resolve(root, 'assets-base64')
const partSuffix = /\.b64\.part-\d+$/

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name)
    return entry.isDirectory() ? listFiles(path) : [path]
  })
}

const grouped = new Map()
for (const path of listFiles(source)) {
  if (!partSuffix.test(path)) continue
  const target = relative(source, path).replace(partSuffix, '')
  grouped.set(target, [...(grouped.get(target) ?? []), path])
}

for (const [target, parts] of grouped) {
  const destination = resolve(root, target)
  const encoded = parts.sort().map((path) => readFileSync(path, 'utf8').trim()).join('')
  mkdirSync(dirname(destination), { recursive: true })
  writeFileSync(destination, Buffer.from(encoded, 'base64'))
}

console.log(`Materialized ${grouped.size} versioned media assets.`)
