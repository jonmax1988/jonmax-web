import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  
  // 开始调试
  console.log('🛡️ 路由守卫执行，目标路由:', to.path)

  // determine whether the user has logged in
  const hasToken = getToken()
  console.log('🔑 Token存在:', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      console.log('📍 有token但访问登录页，跳转到首页')
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      console.log('👤 用户信息存在:', hasGetUserInfo)
      if (hasGetUserInfo) {
      console.log('✅ 有用户信息，直接放行')  
        next()
      } else {
        try {
          console.log('🔄 需要获取用户信息')
          // get user info
          await store.dispatch('user/getInfo')
          console.log('✅ 获取用户信息成功')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          console.log('❌ 获取用户信息失败:', error)
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    console.log('🚫 无token')
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
