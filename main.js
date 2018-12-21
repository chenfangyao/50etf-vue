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
// 输入验证
Vue.prototype.$validata = function(str,mode){
    if(str==''){
        return '您输入的不能为空'
    }
    switch(mode){
        // 用户名
        case 0:
            if(str.length<6){
                return '您输入的用户名不能小于6位'
            }
            return 1;
            break;
            // 密码
        case 1:
            if(str.length<5){
                return '您输入的密码不能小于6位'
            }
            return 1;
            break;

    }
    return 1
}
const app = new Vue({
  ...App,
  store
})
app.$mount()

