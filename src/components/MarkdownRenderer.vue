<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import hljs from 'highlight.js'

const props = defineProps<{ raw: string }>()
const html = ref('')

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => (
    ch === '&' ? '&amp;' :
    ch === '<' ? '&lt;' :
    ch === '>' ? '&gt;' :
    ch === '"' ? '&quot;' :
    '&#39;'
  ))
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code class="hljs">${hljs.highlight(str, { language: lang }).value}</code></pre>`
    }
    const escaped = escapeHtml(str)
    return `<pre><code class="hljs">${escaped}</code></pre>`
  },
}).use(anchor, { permalink: anchor.permalink.linkInsideHeader({ symbol: '#', placement: 'before' }) })

function render() {
  html.value = md.render(props.raw || '')
}

onMounted(render)
watch(() => props.raw, render)
</script>

<template>
  <div v-html="html" />
</template>

<style>
/* You may import highlight.js CSS globally or tweak here */
</style>