// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import request from '@/common/request.js'
import baseHeader from '@/components/base_header.vue'

import '@/common/uni.css'
import { Toast,Dialog} from 'vant';
Vue.use(Toast,Dialog,router )
Toast.setDefaultOptions({
  duration: 2000,
  position: 'bottom'
})
// import '@/common/color.scss'
Vue.component('baseHeader', baseHeader)

Vue.config.productionTip = false
Vue.prototype.$httpReq = request
Vue.prototype.$navigateTo = opt => { router.push(opt.url) }
Vue.prototype.$redirectTo = opt => { router.replace(opt.url) }

// 输入验证
Vue.prototype.$validata = function(str, mode) {
  if (str == '') {
    return '内容不能为空'
  }
  switch (mode) {
    // 用户名
    case 0:
      if (str.length < 6) {
        return '您输入的用户名不能小于6位'
      }
      return 1;
      break;
    // 密码
    case 1:
      if (str.length < 6) {
        return '您输入的密码不能小于6位'
      }
      return 1;
      break;
    // 手机号
    case 2:
      if (str.length < 11) {
        return '您输入的手机号不正确'
      }
      return 1;
      break;
    // 身份证号码
    case 3:
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(str) === false) {
        return '您输入的身份证号码不合法'
      }
      return 1;
      break;
  }
  return 1
}
//登入提示
Vue.prototype.$tipLogin = () => {
  Dialog.confirm({
    title: '您还未登录',
    message: '是否登录？'
  }).then(() => {
    // on confirm
    router.push({name:'login'})
  }).catch(() => {
    // on cancel
  });
}
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
