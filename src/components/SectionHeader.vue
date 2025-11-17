<script setup lang="ts">
const props = defineProps<{ title: string; viewAllTo?: string; viewAllHref?: string; label?: string }>()
</script>

<template>
  <div class="section-header">
    <h2 class="title">
      {{ title }}
      <template v-if="props.viewAllHref">
        <a class="view-all" :href="props.viewAllHref" target="_blank" rel="noopener">{{ props.label || $t('home.viewAll') }}</a>
      </template>
      <template v-else-if="props.viewAllTo">
        <router-link class="view-all" :to="props.viewAllTo">{{ props.label || $t('home.viewAll') }}</router-link>
      </template>
    </h2>
  </div>
</template>

<style scoped>
.section-header { display:flex; align-items:baseline; gap: .75rem; margin-bottom: .75rem; }
.title { font-size: 1.35rem; font-weight: 700; margin: 0; color: var(--hero-title); display:flex; align-items:baseline; gap:.75rem; }
.view-all { text-decoration: none; color: #3b82f6; font-weight: 500; font-size: 1.1rem; }
html.dark .view-all { color: #60a5fa; }
</style>