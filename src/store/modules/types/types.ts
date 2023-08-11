import { RouteRecordRaw } from 'vue-router'

// 小仓库ts规则
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
