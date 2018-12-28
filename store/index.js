import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    loginProvider: "",
    openid: null,
    isWhite: true,
    sid: '',
    username: '',
    mobile: '',
    // 合约code
    hycode: '',
    // 实名认证状态
    realnstatus: '',
    loadingFlag: false,
    // 支付方式
    paylist: '',
    // 账户资金
    assets: '',
    pingCItem:{},//平仓结算单条详情obj
  },
  mutations: {
    login(state, provider) {
      state.hasLogin = true;
      state.loginProvider = provider;
    },
    setisWhite(state, data) {
      state.isWhite = data
    },
    logout(state) {
      state.hasLogin = false
      state.openid = null
    },
    setloadingFlag(state, data) {
      state.loadingFlag = data
    },
    setOpenid(state, openid) {
      state.openid = openid
    },
    setsid(state, data) {
      state.sid = data
    },
    setpingCItem(state, data) {
      state.pingCItem = data
    },
    setusername(state, data) {
      state.username = data
    },
    setmobile(state, data) {
      state.mobile = data
    },
    sethycode(state, data) {
      state.hycode = data
    },
    setrealnstatus(state, data) {
      state.realnstatus = data
    },
    setpaylist(state, data) {
      state.paylist = data
    },
    setassets(state, data) {
      state.assets = data
    }
  },
})

export default store
