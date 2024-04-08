import useUserStore from '@/store/modules/user'

export const isHasButton = (app: any) => {
  // app.directive('has', {
  //   mounted(el: any, binding: any, vnode: any, prevVnode: any) {
  //     let buttons = useUserStore().buttons
  //     if (!buttons.includes(binding.value)) {
  //       el.parentNode.removeChild(el)
  //     }
  //   },
  // })

  app.directive('has', (el: any, binding: any) => {
    let buttons = useUserStore().buttons
    if (!buttons.includes(binding.value) && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  })
}
