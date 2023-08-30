import { defineStore } from 'pinia'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import { UserState } from '@/store/modules/type/types'

import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import router from '@/router'
import deepcopy from 'deepcopy'

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        // 实际修改了asyncRoute里的children，当登录账号权限不同会导致路由缺失
        item.children = filterAsyncRoute(item.children, routes)
      }
      return item
    }
  })
}

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //显示的菜单
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },

    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        let userAsyncRoute = filterAsyncRoute(
          deepcopy(asyncRoute),
          result.data.routes,
        )

        this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute]
        ;[...userAsyncRoute, ...anyRoute].forEach((route: any) =>
          router.addRoute(route),
        )

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async userLogout() {
      let result: any = await reqLogout()
      if (result.code == '200') {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
