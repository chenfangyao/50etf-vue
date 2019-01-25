// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import request from '@/common/request.js'
import baseHeader from '@/components/base_header.vue'

import '@/common/uni.css'
// import '@/common/color.scss'
Vue.component('baseHeader', baseHeader)

Vue.config.productionTip = false
Vue.prototype.$httpReq = request
Vue.prototype.$navigateTo = opt => { router.push(opt.url) }
Vue.prototype.$redirectTo = opt => { router.replace(opt.url) }
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
