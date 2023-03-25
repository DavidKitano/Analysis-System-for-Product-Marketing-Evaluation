import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from '@/App.vue'
import router from '@/router'

import '@/assets/scss/main.scss'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
