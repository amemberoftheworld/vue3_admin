import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { loginForm, loginResponseData } from '@/api/user/type'
import { UserState } from './types/types'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import constantRoute from '@/router/routes'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore