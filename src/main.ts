import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'

// @ts-ignore //粗暴的写法
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

console.log(import.meta.env)

import globalComponent from './components/index'
app.use(globalComponent)

import '@/styles/index.scss'

app.mount('#app')
