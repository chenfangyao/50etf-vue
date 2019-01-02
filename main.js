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
// 时间格式化2
function add0(m) {
  return m < 10 ? "0" + m : m;
}

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
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
    }
    return format;
};

// 时间转时间戳
Vue.prototype.$timestamp = function (str) {
  let timestamp = new Date(str)
  timestamp = timestamp.getTime(timestamp)
  timestamp = timestamp.toString().slice(0, 10)
  return parseInt(timestamp)
}
// 输入验证
Vue.prototype.$validata = function (str, mode) {
  if (str == '') {
    return '您输入的不能为空'
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
  uni.showModal({
    title: '提示',
    content: '您还未登录，请先登入噢',
    success: function (res) {
      if (res.confirm) {
        uni.navigateTo({ url: '/pages/login/login' })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const app = new Vue({
  ...App,
  store
})
app.$mount()
