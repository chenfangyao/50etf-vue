import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import request from '@/common/request.js'
import baseHeader from '@/components/base_header.vue'

import '@/common/uni.css'
import '@/common/black.scss'
import { Toast,Dialog} from 'vant';
Vue.use(Toast,Dialog,router  )
Toast.setDefaultOptions({
  duration: 2000,
  position: 'middle'
})
// import '@/common/color.scss'
Vue.component('baseHeader', baseHeader)
function add0(m) {
  return m < 10 ? "0" + m : m;
}
Vue.config.productionTip = false
Vue.prototype.$httpReq = request
// 时间转时间戳
Vue.prototype.$timestamp = function (str) {
  let timestamp = new Date(str)
  timestamp = timestamp.getTime() / 1000//取到秒
  return parseInt(timestamp)
}
Vue.prototype.$navigateTo = opt => { router.push({ path: opt.url, query: opt.query}) }
Vue.prototype.$redirectTo = opt => { router.replace({ path: opt.url, query: opt.query}) }
Vue.prototype.$formatetimestr = function (str, onlyTime) {
  // return new Date(parseInt(str) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  if (str == 0) return 0;
  let time = new Date(str * 1000);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  if (onlyTime) {
    return (add0(h) + ":" + add0(mm) + ":" + add0(s))
  }
  return (
    y + "-" + add0(m) + "-" + add0(d) + " " + add0(h) + ":" + add0(mm) + ":" + add0(s)
  );
}
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
      break;
    // 密码
    case 1:
      if (str.length < 6) {
        return '您输入的密码不能小于6位'
      }
      break;
    // 手机号
    case 2:
      if (str.length != 11) {
        return '您输入的手机号不正确'
      }
      break;
    // 身份证号码
    case 3:
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(str) === false) {
        return '您输入的身份证号码不合法'
      }
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
