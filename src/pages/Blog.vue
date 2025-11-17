<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loadList, type PostMeta } from '../utils/content'
import PostItem from '../components/PostItem.vue'

const { t } = useI18n()
const route = useRoute()
const locale = route.params.locale as string
const posts = ref<PostMeta[]>([])

onMounted(async () => {
  posts.value = await loadList<PostMeta>(locale, 'blog')
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-3">{{ t('blog.title') }}</h2>
    <div class="posts-list">
      <PostItem v-for="p in posts" :key="p.slug" :item="p" :to="`/${locale}/blog/${p.slug}`" />
    </div>
  </div>
</template>

<style scoped>
.posts-list { display:grid; grid-template-columns: 1fr; gap: .8rem; }
@media (min-width: 768px) { .posts-list { grid-template-columns: 1fr 1fr; } }
</style>