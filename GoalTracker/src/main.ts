import '@/assets/main.scss'
import '@/assets/styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { i18nPlugin } from '@/i18n/i18n-vue'

const app = createApp(App)

app.use(i18nPlugin, 'en')
app.use(createPinia())
app.use(router)

app.mount('#app')
