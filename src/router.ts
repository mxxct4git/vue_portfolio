import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Blog from './pages/Blog.vue'
import Projects from './pages/Projects.vue'
import About from './pages/About.vue'
import { i18n } from './i18n'

type Locale = 'zh' | 'en'
const isLocale = (val: unknown): val is Locale => val === 'zh' || val === 'en'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:locale(zh|en)',
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'blog', name: 'blog', component: Blog },
        { path: 'projects', name: 'projects', component: Projects },
        { path: 'about', name: 'about', component: About },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/en' },
  ],
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  const param = to.params.locale as string | undefined
  const nextLocale: Locale = param && isLocale(param) ? param : 'en'
  i18n.global.locale.value = nextLocale
  next()
})

export default router