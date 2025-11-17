<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

const route = useRoute()
const router = useRouter()
const current = ref((route.params.locale as string) || 'zh')
const theme = ref<'light' | 'dark'>('light')
const menu = ref()

watch(() => route.params.locale, (val) => { if (typeof val === 'string') current.value = val })

function switchLocale(val: string) {
  const segments = route.fullPath.split('/').filter(Boolean)
  segments[0] = val
  router.push('/' + segments.join('/'))
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
  localStorage.setItem('theme', theme.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
  if (saved) theme.value = saved
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
})

const items = [
  { label: '中文', command: () => switchLocale('zh') },
  { label: 'English', command: () => switchLocale('en') },
]
</script>

<template>
  <div class="header-actions">
    <Button class="icon ghost" :icon="theme === 'dark' ? 'pi pi-moon' : 'pi pi-sun'" @click="toggleTheme" />
    <Button class="ghost" @click="menu.toggle($event)" aria-label="Change language">
      <i class="pi pi-globe" />
      <span>{{ current === 'zh' ? '中文' : 'English' }}</span>
      <i class="pi pi-chevron-down" />
    </Button>
    <Menu ref="menu" :model="items" popup />
  </div>
</template>

<style scoped>
.header-actions { display: inline-flex; align-items: center; gap: .5rem; }
.ghost { 
  background: rgba(255,255,255,0.85); 
  color: #0f172a; 
  border: 1px solid #d1d5db; 
  border-radius: 14px; 
  padding: .4rem .6rem; 
  box-shadow: 0 4px 16px rgba(31,41,55,0.08);
}
.icon { width: 2.25rem; height: 2.25rem; display:flex; align-items:center; justify-content:center; }
.ghost :global(.pi) { margin: 0 .2rem; }
:global(html.dark) .ghost { 
  background: rgba(11,18,32,0.85); 
  color: #e5e7eb; 
  border-color: #334155; 
  box-shadow: 0 6px 20px rgba(0,0,0,0.45);
}
</style>