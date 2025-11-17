import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import mdPrism from 'markdown-it-prism'

// Build-time Markdown transform: .md -> JS module exporting { attributes, html }
const mdTransformPlugin = (): Plugin => ({
  name: 'md-transform-to-html',
  enforce: 'pre',
  transform(code: string, id: string) {
    if (!id.endsWith('.md')) return null

    const { content, data } = matter(code)
    const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
    md.use(mdPrism)

    const html = md.render(content)

    const js = `\nexport const attributes = ${JSON.stringify(data)};\nexport const content = ${JSON.stringify(content)};\nexport const html = ${JSON.stringify(html)};\nexport default { attributes, content, html };\n`
    return { code: js, map: null }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), mdTransformPlugin()],
  server: {
    host: true, // 允许通过局域网 IP 访问
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
})
