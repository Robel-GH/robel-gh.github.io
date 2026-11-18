/**
 * Puts the rendered page into dist/index.html after `vite build`.
 *
 * The build runs in three steps (see "build" in package.json):
 *   1. vite build                     → the normal site in dist/
 *   2. vite build --ssr ...           → a Node version of the app in dist-ssr/
 *   3. node scripts/prerender.mjs     → renders the page and writes its HTML into dist/index.html
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const indexPath = resolve('dist/index.html')
const serverEntry = pathToFileURL(resolve('dist-ssr/entry-server.js')).href

const { render } = await import(serverEntry)
const appHtml = await render()

const template = await readFile(indexPath, 'utf8')
const mountPoint = '<div id="app"></div>'
if (!template.includes(mountPoint)) {
  throw new Error(`prerender: ${mountPoint} was not found in dist/index.html`)
}

await writeFile(indexPath, template.replace(mountPoint, `<div id="app">${appHtml}</div>`))
await rm(resolve('dist-ssr'), { recursive: true, force: true })

console.log(`prerender: wrote ${(appHtml.length / 1024).toFixed(1)} KB of HTML into dist/index.html`)
