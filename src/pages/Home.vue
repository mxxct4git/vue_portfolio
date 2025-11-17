<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Typewriter from '../components/Typewriter.vue'
import SectionHeader from '../components/SectionHeader.vue'
import PostItem from '../components/PostItem.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { loadList, type PostMeta, type ProjectMeta } from '../utils/content'
import { LINKS, POST_LINKS } from '../config/links'

const { t, tm } = useI18n()
const route = useRoute()
const locale = computed(() => (route.params.locale as string) || 'en')

// Sequential typing control: show next line only after previous completes
const showSecond = ref(false)
const showThird = ref(false)

// Recent lists
const posts = ref<PostMeta[]>([])
const projects = ref<ProjectMeta[]>([])

const postsI18n = computed(() => tm('home.posts') as unknown as PostMeta[])


const postsFilled = computed(() => {
  const real = posts.value.slice(0, 3)
  if (real.length >= 3) return real
  return [...real, ...(postsI18n.value || [])].slice(0, 3)
})

const projectsFilled = computed(() => projects.value.slice(0, 3))
watch(locale, async (loc) => {
  posts.value = await loadList<PostMeta>(loc, 'blog')
  projects.value = await loadList<ProjectMeta>(loc, 'projects')
}, { immediate: true })
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-left">
        <h1 class="hero-title">
          <Typewriter :text="t('home.heroTitle')" :typingSpeed="50" @done="showSecond = true" />
        </h1>
        <p class="hero-subtitle font-satisfy" v-if="showSecond">
          <Typewriter :text="t('home.heroSubtitle')" :typingSpeed="28" @done="showThird = true" />
        </p>
        <p class="hero-subtitle-cn" v-if="showThird">
          <Typewriter :text="t('home.heroSubtitleZh')" :typingSpeed="28" />
        </p>
      </div>
      <div class="hero-right">
        <div class="profile-card p-card">
          <div class="card-header">
            <div class="avatar"><img src="/src/assets/panda_1080.png" alt="Panda" class="avatar-img" loading="lazy" /></div>
            <div>
              <h3 class="card-title">Panda</h3>
              <small class="card-sub">{{ t('home.profileRole') }}</small>
            </div>
          </div>
          <p class="card-desc">{{ t('home.profileDesc') }}</p>
          <div class="profile-links">
            <a class="card-link" :href="LINKS.github" target="_blank" rel="noopener" aria-label="GitHub: mxxct4git">
              <i class="pi pi-github" />
              <span>mxxct4git</span>
            </a>
            <span class="link-sep" aria-hidden="true"></span>
            <a class="card-link" :href="LINKS.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn: Jiahao Zhang">
              <i class="pi pi-external-link" />
              <span>Linkedin</span>
            </a>
            <span class="link-sep" aria-hidden="true"></span>
            <a class="card-link" :href="LINKS.blog" target="_blank" rel="noopener" aria-label="Blog">
              <i class="pi pi-pencil" />
              <span>Blog</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Recent Posts & Projects -->
  <section class="home-sections">
    <div class="posts-section">
      <SectionHeader :title="t('home.recentPosts')" :viewAllHref="LINKS.blog" />
      <div class="posts-list">
        <PostItem v-for="p in postsFilled" :key="p.slug" :item="p" :href="POST_LINKS[p.slug] || LINKS.blog" />
      </div>
    </div>
    <div class="projects-section">
      <SectionHeader :title="t('home.recentProjects')" :viewAllTo="`/${locale}/projects`" />
      <div class="projects-grid">
        <ProjectCard v-for="pr in projectsFilled" :key="pr.slug" :item="pr" :to="`/${locale}/projects?slug=${pr.slug}`" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; padding: 4rem 0; }
.hero-content { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; }
@media (min-width: 900px) { .hero-content { grid-template-columns: 1.15fr 0.85fr; } }

.hero-title { font-size: 2.8rem; line-height: 1.15; margin: 0 0 .6rem; font-weight: 700; color: var(--hero-title); }
.hero-subtitle { font-size: 1.8rem; color: var(--hero-subtitle); margin: 0 0 .8rem; }
.hero-subtitle-cn { font-size: 1.8rem; color: var(--hero-subtitle-cn); margin: 0 0 1.4rem; }
/* removed bottom quick links per request */

.hero-right { position: relative; }
.profile-card { position: relative; z-index: 1; padding: 1rem; background: linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.98)); border: 1px solid rgba(203,213,225,0.6); box-shadow: 0 12px 36px rgba(31,41,55,0.12); }
/* 彩色柔光背景气泡 */
.hero-right::before, .hero-right::after { content: ""; position: absolute; pointer-events: none; z-index: 0; filter: blur(52px); }
.hero-right::before { left: -60px; top: -30px; width: 360px; height: 360px; background: radial-gradient(circle at 30% 30%, rgba(59,130,246,0.40), rgba(59,130,246,0) 60%); opacity: .68; }
.hero-right::after { right: -80px; top: -20px; width: 400px; height: 400px; background: radial-gradient(circle at 70% 40%, rgba(245,158,11,0.40), rgba(245,158,11,0) 60%); opacity: .62; }
/* 暗色主题适配：更柔和的色相与透明度 */
html.dark .profile-card { background: linear-gradient(135deg, rgba(15,23,42,0.92), rgba(15,23,42,0.98)); border-color: rgba(148,163,184,0.25); box-shadow: 0 14px 40px rgba(0,0,0,0.55); }
html.dark .hero-right::before { background: radial-gradient(circle at 30% 30%, rgba(56,189,248,0.45), rgba(56,189,248,0) 60%); opacity: .65; filter: blur(60px); }
html.dark .hero-right::after { background: radial-gradient(circle at 70% 40%, rgba(250,204,21,0.38), rgba(250,204,21,0) 60%); opacity: .6; filter: blur(60px); }
.card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: .75rem; }
.avatar { width: 64px; height: 64px; border-radius: 12px; display:flex; align-items:center; justify-content:center; background:#f1f5f9; }
.avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
.card-title { margin: 0; font-size: 1.25rem; }
.card-sub { color: var(--card-sub); }
.card-desc { color: var(--card-desc); }
.card-link { display:inline-flex; align-items:center; gap:.4rem; color:#3b82f6; text-decoration:none; margin-top:.6rem; }
.profile-links { display:flex; align-items:center; gap:.5rem; flex-wrap: wrap; margin-top:.6rem; }
.card-link { padding:.25rem .5rem; border-radius: 10px; background: rgba(59,130,246,.08); transition: all .18s ease; }
.card-link:hover { background: rgba(59,130,246,.15); transform: translateY(-1px); }
.card-link .pi { font-size: 1rem; opacity:.85; }
.link-sep { width:1px; height:18px; background: #d1d5db; border-radius:1px; }
html.dark .card-link { color:#60a5fa; background: rgba(96,165,250,.12); }
html.dark .card-link:hover { background: rgba(96,165,250,.18); }
html.dark .link-sep { background:#334155; }

/* Bottom sections */
.home-sections { margin-top: 2.5rem; display:grid; grid-template-columns: 1fr; gap: 2rem; }
.posts-list { display:grid; grid-template-columns: 1fr; gap: .75rem; }
.projects-grid { display:grid; grid-template-columns: 1fr; gap: .75rem; }
@media (min-width: 640px) { 
  .posts-list { grid-template-columns: 1fr 1fr; }
  .projects-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 900px) { 
  .posts-list { grid-template-columns: 1fr 1fr 1fr; }
  .projects-grid { grid-template-columns: 1fr 1fr 1fr; }
}

</style>