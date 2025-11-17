<script setup lang="ts">
import type { ProjectMeta } from '../utils/content'
const props = defineProps<{ item?: ProjectMeta; to?: string; placeholder?: boolean; active?: boolean }>()
const emit = defineEmits<{ (e: 'select'): void }>()
</script>

<template>
  <router-link v-if="!placeholder && item && to" :to="to" class="project-card" :aria-label="item.title">
    <img v-if="item.cover" :src="item.cover" class="cover" :alt="item.title" loading="lazy" />
    <div class="body">
      <h3 class="title">{{ item.title }}</h3>
      <p class="summary">{{ item.summary }}</p>
      <div v-if="item.tags?.length" class="tags">
        <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </router-link>
  <div v-else-if="item" class="project-card" :class="{ active: active }" @click="emit('select')">
    <img v-if="item.cover" :src="item.cover" class="cover" :alt="item.title" loading="lazy" />
    <div class="body">
      <h3 class="title">{{ item.title }}</h3>
      <p class="summary">{{ item.summary }}</p>
      <div v-if="item.tags?.length" class="tags">
        <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
  <div v-else class="project-card placeholder" aria-hidden="true">
    <div class="cover"></div>
  </div>
</template>

<style scoped>
.project-card { display:block; border: 1px solid rgba(203,213,225,0.6); border-radius: 14px; overflow:hidden; background: rgba(255,255,255,0.75); text-decoration:none; color: inherit; transition: box-shadow .18s ease, transform .18s ease, background .18s ease; }
.project-card:hover { box-shadow: 0 12px 30px rgba(31,41,55,0.14); transform: translateY(-2px); background: rgba(255,255,255,0.9); }
.project-card.active { box-shadow: 0 12px 30px rgba(31,41,55,0.38); border-color: #93c5fd; background: rgba(255,255,255,0.92); }
.cover { width: 100%; height: 160px; object-fit: contain; display:block; background: rgba(203,213,225,0.25); }
.body { padding: .95rem 1.05rem; }
.title { font-size: 1rem; font-weight: 600; margin:0 0 .25rem; color: var(--hero-title); }
.summary { margin: 0 0 .6rem; color: var(--card-desc); display:-webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow:hidden; line-clamp: 4;}
.tags { display:flex; flex-wrap:wrap; gap:.4rem; }
.tag { font-size: .75rem; padding: .15rem .4rem; border-radius: 10px; background: rgba(59,130,246,.08); color:#3b82f6; }
html.dark .project-card { border-color: rgba(148,163,184,0.25); background: rgba(15,23,42,0.6); }
html.dark .project-card:hover { box-shadow: 0 14px 36px rgba(0,0,0,0.55); background: rgba(15,23,42,0.82); }
html.dark .project-card.active { box-shadow: 0 14px 36px rgba(0,0,0,0.6); border-color: #60a5fa; background: rgba(15,23,42,0.8); }
html.dark .tag { background: rgba(96,165,250,.12); color:#60a5fa; }
</style>