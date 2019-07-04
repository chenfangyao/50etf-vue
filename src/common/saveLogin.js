import store from '../vuex'
import { checkUpdate } from '@/common/update.js'
import request from '@/common/request.js'

function setTheme(val) {
  if (val) {
    plus.navigator.setStatusBarStyle("light");
  } else {
    plus.navigator.setStatusBarStyle("dark");
  }
}
export default function () {
  var user_name= localStorage.getItem("user_name")
  var user_pwd = localStorage.getItem("user_pwd")
  store.commit("setstatusbarHeight", plus.navigator.getStatusbarHeight());
  setTheme(store.state.atNight)
  if (user_pwd !== null && user_name !== null) {
    login(user_name, user_pwd)
  }
}
export function login(uName, pwd){
  var options = {
    url: '/Sapi/Login/index', //请求接口
    data: {
      user_name: uName,
      user_pwd: pwd
    }, //发送给服务端的数据
    method: 'POST',
  }
  request(options).then((res) => {
    if (res.status == 1) {
      store.commit('setsid', res.data.sid)
      getuserinfo()
      checkUpdate()
    } 
  })
}
export function getuserinfo() {
  var options = {
    url: '/Sapi/User/info', //请求接口
    method: 'GET',
  }
  request(options).then(res => {
    if (res.status) {
      store.commit('setuserinfo', res.data)
    }
  }).catch((err) => {
    console.error(err, '捕捉')
  })
}
