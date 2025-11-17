<script setup lang="ts">
import type { PostMeta } from '../utils/content'
const props = defineProps<{ item?: PostMeta; to?: string; href?: string; placeholder?: boolean }>()

function formatDate(input?: string): string {
  if (!input) return ''
  const d = new Date(input)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}
</script>

<template>
  <a v-if="!placeholder && item && href" :href="href" target="_blank" rel="noopener" class="post-item" :aria-label="item.title">
    <div class="header">
      <h3 class="title">{{ item.title }}</h3>
      <time class="date" :datetime="item.date">{{ formatDate(item.date) }}</time>
    </div>
    <p class="summary">{{ item.summary }}</p>
    <div v-if="item.tags?.length" class="tags">
      <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </a>
  <router-link v-else-if="!placeholder && item && to" :to="to" class="post-item" :aria-label="item.title">
    <div class="header">
      <h3 class="title">{{ item.title }}</h3>
      <time class="date" :datetime="item.date">{{ formatDate(item.date) }}</time>
    </div>
    <p class="summary">{{ item.summary }}</p>
    <div v-if="item.tags?.length" class="tags">
      <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </router-link>
  <div v-else class="post-item placeholder" aria-hidden="true"></div>
</template>

<style scoped>
.post-item { display:block; padding: .75rem .9rem; border: 1px solid rgba(203,213,225,0.6); border-radius: 12px; background: rgba(255,255,255,0.7); text-decoration:none; color: inherit; transition: box-shadow .18s ease, transform .18s ease, background .18s ease; min-height: 110px; }
.post-item:hover { box-shadow: 0 8px 24px rgba(31,41,55,0.12); transform: translateY(-2px); background: rgba(255,255,255,0.85); }
.header { display:flex; align-items:center; justify-content:space-between; gap:.5rem; }
.title { font-size: 1rem; font-weight: 600; margin:0; color: var(--hero-title); }
.date { font-size: .85rem; color: #6b7280; }
.summary { margin: .35rem 0 .5rem; color: var(--card-desc); display:-webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow:hidden; }
.tags { display:flex; flex-wrap:wrap; gap:.4rem; }
.tag { font-size: .75rem; padding: .15rem .4rem; border-radius: 10px; background: rgba(59,130,246,.08); color:#3b82f6; }
html.dark .post-item { border-color: rgba(148,163,184,0.25); background: rgba(15,23,42,0.6); }
html.dark .post-item:hover { box-shadow: 0 10px 28px rgba(0,0,0,0.55); background: rgba(15,23,42,0.8); }
html.dark .date { color: #94a3b8; }
html.dark .tag { background: rgba(96,165,250,.12); color:#60a5fa; }
/* 占位卡片（淡化虚线边框） */
.placeholder { border-style: dashed; background: rgba(255,255,255,0.55); }
html.dark .placeholder { background: rgba(15,23,42,0.5); }
</style>