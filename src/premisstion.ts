import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import setting from './setting'

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  let token = useUserStore().token
  let username = useUserStore().username
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await useUserStore().userInfo()
          next()
        } catch (error) {
          useUserStore().userLogout()
          next({ path: '/login' })
        }
      }
    }
  } else {
    if (to.path == '/login') next()
    else next({ path: '/login' })
  }
  next()
})

router.afterEach((to) => {
  nprogress.done()
  document.title = `${setting.title} - ${to.meta.title}`
})
