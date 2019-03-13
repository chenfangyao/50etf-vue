import store from '../vuex'
import { checkUpdate } from '@/common/update.js'
function setTheme(val) {
  if (val) {
    plus.navigator.setStatusBarBackground("#181c28");
    plus.navigator.setStatusBarStyle("light");
  } else {
    plus.navigator.setStatusBarBackground("#f0f0f0");
    plus.navigator.setStatusBarStyle("dark");
  }
}
export default function () {
  var sid = localStorage.getItem('etfSid')
  var userinfo = localStorage.getItem('userinfo')
  setTheme(store.state.atNight)
  if (sid !== null && userinfo !== null) {
    checkUpdate()
    store.commit('setsid', sid)
    store.commit('setuserinfo', JSON.parse(userinfo))
  }
}
