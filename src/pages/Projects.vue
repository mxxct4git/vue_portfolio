<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loadList, loadBySlug, type ProjectMeta, type Doc } from '../utils/content'
import ProjectCard from '../components/ProjectCard.vue'
import MarkdownRenderer from '../components/MarkdownRenderer.vue'
import Dialog from 'primevue/dialog'
import ScrollPanel from 'primevue/scrollpanel'
import Skeleton from 'primevue/skeleton'

const { t } = useI18n()
const route = useRoute()
const locale = computed(() => (route.params.locale as string) || 'en')
const slugParam = computed(() => (route.query.slug as string | undefined) || undefined)

const projects = ref<ProjectMeta[]>([])
const selectedSlug = ref<string | null>(null)
const selected = computed(() => {
  return projects.value.find(p => p.slug === selectedSlug.value) || projects.value[0]
})
const selectedDoc = ref<Doc | null>(null)

const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const isMobile = computed(() => width.value < 768)
const onResize = () => { width.value = window.innerWidth }
const mobileOpen = ref(false)
const mobileLoading = ref(false)

onMounted(async () => {
  window.addEventListener('resize', onResize)
  projects.value = await loadList<ProjectMeta>(locale.value, 'projects')
  const candidate = slugParam.value
  const exists = candidate && projects.value.find(p => p.slug === candidate)
  selectedSlug.value = (exists ? candidate! : projects.value[0]?.slug) || null
  if (selectedSlug.value) selectedDoc.value = await loadBySlug(locale.value, 'projects', selectedSlug.value)
  if (isMobile.value && selectedSlug.value) mobileOpen.value = true
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

watch(locale, async (loc) => {
  projects.value = await loadList<ProjectMeta>(loc, 'projects')
  if (!projects.value.find(p => p.slug === selectedSlug.value)) {
    selectedSlug.value = projects.value[0]?.slug || null
  }
  if (selectedSlug.value) selectedDoc.value = await loadBySlug(loc, 'projects', selectedSlug.value)
})

function select(p: ProjectMeta) {
  selectedSlug.value = p.slug
  if (isMobile.value) {
    mobileOpen.value = true
    mobileLoading.value = true
  }
  loadBySlug(locale.value, 'projects', p.slug).then(doc => { selectedDoc.value = doc; mobileLoading.value = false })
}

function selectBySlug(slug: string) {
  selectedSlug.value = slug
  loadBySlug(locale.value, 'projects', slug).then(doc => { selectedDoc.value = doc })
}

watch(slugParam, (slug) => {
  if (typeof slug === 'string') {
    const exists = projects.value.find(p => p.slug === slug)
    if (exists) {
      if (isMobile.value) mobileOpen.value = true
      selectBySlug(slug)
    }
  }
})
</script>

<template>
  <div class="projects-page">
    <h2 class="page-title">{{ t('projects.title') }}</h2>

    <div v-if="isMobile" class="mobile-list">
      <ProjectCard
        v-for="p in projects"
        :key="p.slug"
        :item="p"
        :active="selected?.slug === p.slug"
        @select="select(p)"
      />

      <Dialog v-model:visible="mobileOpen" modal blockScroll dismissableMask position="bottom" :style="{ width: '100%', maxWidth: '100%' }" :breakpoints="{ '640px': '100vw' }">
        <template #header>
          <div class="sheet-header">
            <div class="sheet-title">{{ selected?.title }}</div>
            <div class="sheet-tags" v-if="selected?.tags?.length">
              <span v-for="t in selected.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </template>
        <div class="sheet-body">
          <ScrollPanel class="sheet-scroll">
            <div v-if="mobileLoading" class="sheet-skeleton">
              <Skeleton width="100%" height="18px" class="mb-2" />
              <Skeleton width="90%" height="18px" class="mb-2" />
              <Skeleton width="95%" height="18px" class="mb-2" />
            </div>
            <div v-else class="sheet-markdown" v-if="selectedDoc?.raw">
              <MarkdownRenderer :raw="selectedDoc.raw" />
            </div>
          </ScrollPanel>
        </div>
      </Dialog>
    </div>

    <div v-else class="layout-split">
      <div class="left-list">
        <ProjectCard
          v-for="p in projects"
          :key="p.slug"
          :item="p"
          :active="selected?.slug === p.slug"
          @select="select(p)"
        />
      </div>
      <div class="right-preview" v-if="selected">
        <img v-if="selected.cover" :src="selected.cover" class="preview-cover" loading="lazy" />
        <h3 class="preview-title">{{ selected.title }}</h3>
        <div class="preview-tags" v-if="selected.tags?.length">
          <span v-for="t in selected.tags" :key="t" class="tag">{{ t }}</span>
        </div>
        <div class="markdown-wrap" v-if="selectedDoc?.raw">
          <MarkdownRenderer :raw="selectedDoc.raw" />
        </div>
      </div>
    </div>
  </div>
  </template>

<style scoped>
.projects-page { max-width: 1200px; margin: 0 auto; }
.page-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 .6rem; color: var(--hero-title); }

.mobile-list { display: grid; grid-template-columns: 1fr; gap: .9rem; }
.mobile-markdown { margin-top: .9rem; }

.layout-split { display: grid; grid-template-columns: 0.7fr 1.5fr; gap: .8rem; align-items: start; }
.left-list { display: flex; flex-direction: column; gap: 1rem; }
.left-list :deep(.project-card) { width: 100%; flex: 0 0 auto; }
.right-preview { border: 1px solid rgba(203,213,225,0.6); border-radius: 12px; background: rgba(255,255,255,0.8); padding: .75rem; }
.preview-cover { width: 100%; height: 190px; object-fit: contain; display:block; background: rgba(203,213,225,0.25); border-radius: 10px; }
.preview-title { font-size: 1.25rem; font-weight: 600; margin: .6rem 0 .3rem; color: var(--hero-title); }
.preview-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: .6rem; }
.tag { font-size: .75rem; padding: .15rem .4rem; border-radius: 10px; background: rgba(59,130,246,.08); color:#3b82f6; }
.markdown-wrap { padding-top: .6rem; }
.markdown-wrap { overflow-x: hidden; }
.markdown-wrap :deep(img) { max-width: 100%; height: auto; display:block; }
.read-more { display:inline-block; padding: .35rem .6rem; border: 1px solid #d1d5db; border-radius: 10px; text-decoration: none; color: var(--menu-link); background: rgba(255,255,255,0.9); }
.read-more:hover { background: rgba(255,255,255,1); }
html.dark .right-preview { border-color: rgba(148,163,184,0.25); background: rgba(15,23,42,0.65); }
html.dark .preview-cover { background: rgba(51,65,85,0.5); }
html.dark .tag { background: rgba(96,165,250,.12); color:#60a5fa; }
html.dark .read-more { border-color: #334155; background: rgba(11,18,32,0.85); color: var(--menu-link); }

@media (max-width: 900px) {
  .layout-split { grid-template-columns: 1fr; }
}

.sheet-header { display:flex; flex-direction: column; gap: .35rem; }
.sheet-title { font-size: 1.05rem; font-weight: 700; color: var(--hero-title); }
.sheet-tags { display:flex; flex-wrap:wrap; gap:.35rem; }
.sheet-body { height: 85vh; padding: 0; }
.sheet-scroll { height: 100%; }
.sheet-skeleton :deep(.p-skeleton) { margin-bottom: .4rem; }
.sheet-markdown :deep(img) { max-width: 100%; height: auto; display:block; }
.sheet-markdown { padding: .5rem .25rem 1rem; }
</style>