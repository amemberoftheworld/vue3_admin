import { defineStore } from 'pinia'

// layout相关配置
let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refresh: false,
    }
  },
})

export default useLayoutSettingStore
