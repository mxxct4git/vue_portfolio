import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.ts'
import { i18n } from './i18n.ts'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
// Apply PrimeVue v4 Aura theme preset

createApp(App)
  .use(router)
  .use(i18n)
  .use(PrimeVue, { theme: { preset: Aura, options: { darkModeSelector: 'html.dark' } } })
  .mount('#app')
