import Vue from 'vue'
import App from './App'
import baseHeader from '@/components/base_header.vue'
import request from '@/common/request.js'

// Vue.config.productionTip = false
import store from './store'
App.mpType = 'app'
Vue.component('baseHeader', baseHeader)

Vue.prototype.$httpReq = request
Vue.prototype.$store = store
// 时间格式化
function add0(m) {
  return m < 10 ? "0" + m : m;
}
Vue.prototype.$formatetimestr = function (str) {
  // return new Date(parseInt(str) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
   str=Number(str)
  let time = new Date(str);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return (
    y + "-" + add0(m) + "-" + add0(d) + " " + add0(h) + ":" + add0(mm) +":" + add0(s)
  );
}

// 时间转时间戳
Vue.prototype.$timestamp = function (str) {
  let timestamp = new Date(str)
  timestamp = timestamp.getTime(timestamp)
  timestamp = timestamp.toString().slice(0, 10)
  return parseInt(timestamp)
}
const app = new Vue({
  ...App,
  store
})
app.$mount()

