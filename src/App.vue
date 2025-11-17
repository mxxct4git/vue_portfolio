<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderActions from './components/HeaderActions.vue'
import { ref } from 'vue'

const route = useRoute()
const locale = computed(() => (route.params.locale as string) || 'en')
const mobileOpen = ref(false)
const closeMobile = () => { mobileOpen.value = false }
</script>

<template>
  <header>
    <div class="menubar">
      <button class="menu-toggle" @click="mobileOpen = !mobileOpen" aria-label="Open navigation">
        <i class="pi pi-bars" />
      </button>
      <nav class="menu-links desktop-only">
        <router-link :to="`/${locale}`">{{ $t('nav.home') }}</router-link>
        <router-link :to="`/${locale}/projects`">{{ $t('nav.projects') }}</router-link>
        <router-link :to="`/${locale}/about`">{{ $t('nav.about') }}</router-link>
      </nav>
      <div class="menubar-actions">
        <HeaderActions />
      </div>
    </div>
  </header>

  <!-- Mobile drawer menu -->
  <div v-if="mobileOpen" class="mobile-menu" @click.self="mobileOpen = false">
    <nav class="mobile-nav">
      <router-link :to="`/${locale}`" @click="closeMobile">{{ $t('nav.home') }}</router-link>
      <router-link :to="`/${locale}/projects`" @click="closeMobile">{{ $t('nav.projects') }}</router-link>
      <router-link :to="`/${locale}/about`" @click="closeMobile">{{ $t('nav.about') }}</router-link>
    </nav>
  </div>

  <main>
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <div class="page-loading">Loading…</div>
      </template>
    </Suspense>
  </main>
  </template>

<style scoped>
nav a {
  text-decoration: none;
  color: var(--menu-link);
  transition: color .15s ease;
}
nav a:visited { color: var(--menu-link); }
nav a:hover { color: var(--menu-hover); }
/* 使用 exact-active，只在精确匹配时高亮 */
nav a.router-link-exact-active {
  color: var(--menu-active);
  font-weight: 600;
}
.menubar { display:grid; grid-template-columns: 1fr auto auto 1fr; align-items:center; gap: .75rem; max-width: 1080px; margin: 0 auto; padding: .75rem 1rem; }
.menu-links { display:flex; align-items:center; gap: .9rem; flex-wrap: nowrap; justify-self: center; grid-column: 2; }
.menubar-actions { grid-column: 3; justify-self: start; margin-left: 1rem; }
.menu-toggle { display:none; align-items:center; justify-content:center; width: 2.25rem; height: 2.25rem; border: 1px solid #d1d5db; border-radius: 14px; background: rgba(255,255,255,0.85); color: var(--menu-link); }
html.dark .menu-toggle { background: rgba(11,18,32,0.85); border-color: #334155; color: var(--menu-link); }
@media (max-width: 640px) {
  .menubar { grid-template-columns: auto 1fr auto; }
  .menu-toggle { display:flex; }
  .desktop-only { display: none; }
  .menubar-actions { grid-column: 3; justify-self: end; }
}

/* Mobile drawer styles */
.mobile-menu { position: fixed; top: 60px; left: 0; right: 0; z-index: 60; padding: .75rem 1rem; }
.mobile-nav { display:flex; flex-direction: column; gap: .6rem; background: rgba(248,250,252,0.95); border: 1px solid rgba(203,213,225,0.6); border-radius: 12px; padding: .75rem; box-shadow: 0 12px 30px rgba(31,41,55,0.15); }
.mobile-nav a { text-decoration:none; color: var(--menu-link); padding: .45rem .5rem; border-radius: 8px; }
.mobile-nav a:hover { background: rgba(59,130,246,0.08); color: var(--menu-hover); }
html.dark .mobile-nav { background: rgba(11,18,32,0.95); border-color: rgba(51,65,85,0.6); box-shadow: 0 14px 36px rgba(0,0,0,0.55); }
html.dark .mobile-nav a:hover { background: rgba(96,165,250,0.12); color: var(--menu-hover); }
@media (max-width: 640px) {
  .menu-links { gap: .7rem; }
  nav a { font-size: .95rem; }
}
.page-loading { padding: 2rem; color: #6b7280; font-size: 0.95rem; }
/* Dark theme adjustments are driven by CSS variables in style.css */
</style>
