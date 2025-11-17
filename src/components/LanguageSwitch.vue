<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const current = ref((route.params.locale as string) || 'zh')
const theme = ref<'light' | 'dark'>('light')

watch(() => route.params.locale, (val) => { if (typeof val === 'string') current.value = val })

function applyTheme() {
  const root = document.documentElement
  const isDark = theme.value === 'dark'
  root.classList.toggle('dark', isDark)
  localStorage.setItem('theme', theme.value)
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme()
}

function switchLocale(val: string) {
  const segments = route.fullPath.split('/').filter(Boolean)
  segments[0] = val
  router.push('/' + segments.join('/'))
}

function cycleLocale() {
  switchLocale(current.value === 'zh' ? 'en' : 'zh')
}

onMounted(() => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
  if (saved) theme.value = saved
  applyTheme()
})
</script>

<template>
  <div class="control-pill">
    <button class="icon-btn" @click="toggleTheme" :title="theme === 'dark' ? '切换为亮色' : '切换为暗色'">
      <i :class="theme === 'dark' ? 'pi pi-moon' : 'pi pi-sun'" />
    </button>
    <button class="lang-btn" @click="cycleLocale" :title="current === 'zh' ? '切换为 English' : '切换为 中文'">
      {{ current === 'zh' ? '中文' : 'English' }}
      <i class="pi pi-chevron-down" />
    </button>
  </div>
  
</template>

<style scoped>
.control-pill { display: inline-flex; align-items: center; gap: .4rem; padding: .35rem .5rem; border: 1px solid #d1d5db; border-radius: 12px; background: #fff; }
:host(.dark) .control-pill, :global(html.dark) .control-pill { background: #0b1220; border-color: #334155; }
.icon-btn, .lang-btn { display: inline-flex; align-items: center; gap: .35rem; padding: .3rem .5rem; border: none; background: transparent; cursor: pointer; color: inherit; }
.icon-btn i { font-size: 1rem; }
.lang-btn i { font-size: .9rem; opacity: .7; }
.icon-btn:hover, .lang-btn:hover { opacity: .85; }
</style>