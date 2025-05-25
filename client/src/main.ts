import './assets/main.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(MotionPlugin)
app.use(router)

app.mount('#app')
