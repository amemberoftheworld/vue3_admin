import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import pinia from './store'

// @ts-ignore //粗暴的写法
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import globalComponent from './components/index'
import router from './router'
import '@/styles/index.scss'

console.log(import.meta.env) //环境变量访问

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.mount('#app')
