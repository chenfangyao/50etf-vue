import store from '../vuex'
export default function () {
  var sid = localStorage.getItem('etfSid')
  var userinfo = localStorage.getItem('userinfo')
  if (sid !== null && userinfo !== null) {
    store.commit('setsid', sid)
    store.commit('setuserinfo', JSON.parse(userinfo))
  }
}
