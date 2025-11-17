<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Timeline from 'primevue/timeline'
import ScrollPanel from 'primevue/scrollpanel'
import ProgressBar from 'primevue/progressbar'
import Tag from 'primevue/tag'


// Timeline data type
type TimelineItem = {
  date: string
  title: string
  company: string
  desc: string
}
// Use i18n timeline messages by locale; recompute on language change
const { t, tm } = useI18n()
const items = computed(() => tm('about.timeline') as unknown as TimelineItem[])
// Intro bullets from i18n; ensure array type
const introBullets = computed(() => {
  const val = tm('about.introBullets')
  return Array.isArray(val) ? (val as unknown as string[]) : []
})

// Metrics strip
type Metric = { label: string; value: string }
const metrics = computed(() => {
  const val = tm('about.metrics')
  return Array.isArray(val) ? (val as unknown as Metric[]) : []
})

// Skill progress bars
type SkillBar = { label: string; value: number; tag?: string }
const skillBars = computed(() => {
  const val = tm('about.skillBars')
  return Array.isArray(val) ? (val as unknown as SkillBar[]) : []
})

// Responsive alignment: alternate on desktop, left on mobile
const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)
const align = computed(() => (width.value < 768 ? 'left' : 'alternate'))

const onResize = () => (width.value = window.innerWidth)
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

// Skills data for horizontal scroll; use local assets
type Skill = { name: string; logo: string; alt?: string }
const skills: Skill[] = [
  { name: 'Vue', logo: new URL('../assets/vue.svg', import.meta.url).href, alt: 'Vue' },
  { name: 'Spring', logo: new URL('../assets/spring-2.svg', import.meta.url).href, alt: 'Spring' },
  { name: 'Java', logo: new URL('../assets/java.png', import.meta.url).href, alt: 'Java' },
  { name: 'ClickHouse', logo: new URL('../assets/clickhouse.svg', import.meta.url).href, alt: 'ClickHouse' },
  { name: 'Flink', logo: new URL('../assets/flink.jpg', import.meta.url).href, alt: 'Flink' },
  // External logos from user-provided URLs
  { name: 'Vue.', alt: 'Vue.', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg' },
  { name: 'Nextjs', alt: 'Nextjs', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg' },
  { name: 'Hadoop', alt: 'Hadoop', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Hadoop_logo.svg' },
  { name: 'Mysql', alt: 'Mysql', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg' },
  { name: 'Redis', alt: 'Redis', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Logo-redis.svg' }
]
// Duplicate for seamless looping look
const loopedSkills = computed(() => [...skills, ...skills])

// Auto-scroll control
const scrollRef = ref<any>(null)
let autoTimer: number | null = null
const startAutoScroll = () => {
  stopAutoScroll()
  autoTimer = window.setInterval(() => {
    const el = scrollRef.value?.$el?.querySelector('.p-scrollpanel-content') as HTMLElement | null
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    el.scrollLeft = el.scrollLeft + 1.2
    if (el.scrollLeft >= max - 2) el.scrollLeft = 0
  }, 16)
}
const stopAutoScroll = () => { if (autoTimer) { clearInterval(autoTimer); autoTimer = null } }
onMounted(() => startAutoScroll())
onBeforeUnmount(() => stopAutoScroll())
</script>

<template>
  <!-- Intro section (i18n Option A) -->
  <section class="p-4 max-w-3xl mx-auto" style="padding-top: 0!important;">
    <h2 class="intro-title">{{ t('about.introTitle') }}</h2>
    <ul class="intro-list">
      <li v-for="(b, idx) in introBullets" :key="idx" v-html="b"></li>
    </ul>
    <!-- metrics strip -->
    <div class="metrics-strip">
      <Tag v-for="(m, i) in metrics" :key="i" class="metric">
        <span class="metric-label">{{ m.label }}</span>
        <span class="metric-value">{{ m.value }}</span>
      </Tag>
    </div>
    <!-- skill progress bars -->
    <div class="skills-bars">
      <h3 class="skills-bars-title">{{ t('about.skillTitle') }}</h3>
      <div v-for="(s, i) in skillBars" :key="i" class="skill-bar-row">
        <div class="skill-bar-head">
          <span class="skill-bar-label">{{ s.label }}</span>
          <span class="skill-bar-value">{{ s.value }}%</span>
          <Tag v-if="s.tag" severity="info" class="skill-bar-tag">{{ s.tag }}</Tag>
        </div>
        <ProgressBar :value="s.value" :showValue="false" class="skill-bar" />
      </div>
      
    </div>
  </section>
  
  <!-- Timeline -->
  <section class="p-4 max-w-5xl mx-auto about-timeline">
    <Timeline :value="items" layout="vertical" :align="align">
      <template #marker>
        <span class="tl-marker"></span>
      </template>
      <template #opposite="slotProps">
        <div class="tl-date">{{ slotProps.item.date }}</div>
      </template>
      <template #content="slotProps">
        <div class="tl-card">
          <h3 class="tl-title">{{ slotProps.item.title }}</h3>
          <div class="tl-company">{{ slotProps.item.company }}</div>
          <p v-if="slotProps.item.desc" class="tl-desc">{{ slotProps.item.desc }}</p>
        </div>
      </template>
    </Timeline>
  </section>

  <!-- Skills & Technologies: horizontal auto scroll -->
  <section class="skills-section p-4 max-w-6xl mx-auto">
    <h2 class="skills-title">{{ t('about.skillsTitle') }}</h2>
    <ScrollPanel ref="scrollRef" class="skills-scroll" @mouseenter="stopAutoScroll" @mouseleave="startAutoScroll">
      <div class="skills-row">
        <div v-for="s in loopedSkills" :key="s.name + '-' + s.logo" class="skill-item">
          <img :src="s.logo" :alt="s.alt || s.name" class="skill-logo" loading="lazy" />
          <div class="skill-name">{{ s.name }}</div>
        </div>
      </div>
    </ScrollPanel>
  </section>
  </template>

<style scoped>
.intro-title { margin: 0 0 .5rem; color: var(--hero-title); font-weight: 800; font-size: 1.5rem; }
.intro-list { margin: 0; padding-left: 1.25rem; color: var(--card-desc); }
.intro-list li { line-height: 1.7; margin: .15rem 0; }

/* metrics strip */
.metrics-strip { margin-top: .75rem; display: flex; flex-wrap: wrap; gap: .5rem; }
.metric { background: rgba(148,163,184,.12); color: var(--hero-title); border: 1px solid var(--divider); padding: .25rem .5rem; }
.metric-label { opacity: .8; margin-right: .35rem; }
.metric-value { font-weight: 700; }

/* skill progress bars */
.skills-bars { margin-top: 2rem; }
.skills-bars-title { margin: 0 0 .5rem; color: var(--hero-title); font-weight: 600; font-size: 1.05rem; }
.skill-bar-row { margin-bottom: .75rem; }
.skill-bar-head { display: flex; align-items: center; gap: .5rem; justify-content: space-between; }
.skill-bar-label { color: var(--card-desc); }
.skill-bar-value { color: var(--card-sub); font-size: .85rem; }
.skill-bar-tag { margin-left: auto; }
.skill-bar :deep(.p-progressbar) { height: 12px; border-radius: 12px; }
.skill-bar :deep(.p-progressbar .p-progressbar-value) { background: var(--timeline-marker); }

.about-timeline { margin-top: 1rem; }
.tl-marker { width: 10px; height: 10px; border-radius: 50%; background: var(--timeline-marker); border: 2px solid var(--timeline-line); display: inline-block; }
.tl-date { color: var(--card-sub); font-size: .9rem; }
.tl-card { max-width: 540px; }
.tl-title { margin: 0 0 .25rem; font-size: 1rem; color: var(--hero-title); }
.tl-company { color: var(--card-sub); font-size: .85rem; margin-bottom: .25rem; }
.tl-desc { color: var(--card-desc); margin: 0; }

/* PrimeVue timeline connector color override */
.p-timeline .p-timeline-event-connector { background: var(--timeline-line); }

/* Spacing tweaks */
.p-timeline .p-timeline-event-opposite { padding: .5rem 1rem; }
.p-timeline .p-timeline-event-content { padding: .5rem 1rem; }

/* Mobile adjustments */
@media (max-width: 768px) {
  .tl-card { max-width: 100%; }
  .p-timeline .p-timeline-event-opposite { padding: 0 .5rem; }
  .p-timeline .p-timeline-event-content { padding: 0 .5rem; }
}

/* Skills horizontal scroll styles */
.skills-title { text-align: center; margin: 0 0 .75rem; color: var(--hero-title); font-weight: 600; }
.skills-scroll { position: relative; }
.skills-row { display: inline-flex; align-items: center; gap: 2rem; padding: .75rem 1rem; }
.skill-item { width: 160px; flex: 0 0 auto; text-align: center; }
.skill-logo { height: 48px; max-width: 140px; object-fit: contain; }
.skill-name { margin-top: .35rem; font-size: .9rem; color: var(--card-sub); }

/* Edge fade hint */
.skills-scroll::before,
.skills-scroll::after { content: ""; position: absolute; top: 0; bottom: 0; width: 40px; pointer-events: none; }
.skills-scroll::before { left: 0; background: linear-gradient(to right, rgba(248,250,252,1), rgba(248,250,252,0)); }
.skills-scroll::after { right: 0; background: linear-gradient(to left, rgba(248,250,252,1), rgba(248,250,252,0)); }
html.dark .skills-scroll::before { background: linear-gradient(to right, rgba(15,23,42,1), rgba(15,23,42,0)); }
html.dark .skills-scroll::after { background: linear-gradient(to left, rgba(15,23,42,1), rgba(15,23,42,0)); }

/* Optional slight brightness boost for dark logos in dark theme */
html.dark .skill-logo { filter: brightness(1.05) contrast(1.03); }
</style>