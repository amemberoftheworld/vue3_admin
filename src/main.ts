import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'

console.log(import.meta.env) //环境变量访问

const app = createApp(App)

// @ts-ignore //粗暴的写法
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus, {
  locale: zhCn,
})

import globalComponent from './components/index'
app.use(globalComponent)

import router from './router'
app.use(router)

import pinia from './store'
app.use(pinia)
app.mount('#app')
