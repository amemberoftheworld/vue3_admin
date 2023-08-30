import { CategoryObj } from '@/api/product/attr/type'
import { RouteRecordRaw } from 'vue-router'

// 小仓库ts规则
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string,
  buttons:string[]
}

export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Id: string | number
  c2Arr: CategoryObj[]
  c3Id: string | number
  c3Arr: CategoryObj[]
}
