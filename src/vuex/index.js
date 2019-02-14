import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    loginProvider: "",
    openid: null,
    atNight: false,
    sid: '',
    username: '',
    mobile: '',
    userinfo: {},
    // 合约code
    hycode: '',
    tabIndex:0,//项目底部tabBar的当前位置
    loadingFlag: false,
    // 支付方式
    paylist: '',
    // 账户资金
    assets: '',
    pingCItem: {},//平仓结算单条详情obj
    // 充值页面银行卡信息
    bankinfo: {},
    // 开/平仓页面合约价格
    newprice: '',
    // 开/平仓页面委托数量
    stockamunt: '0',
    // 委托类型,默认为2
    enttype: '2',
    // 委托类型
    entrusttype: false,
    // 个人持仓信息
    maxbuy: {},
    // 分笔持仓id
    fbccid: '',
    // 首页股票信息
    commonstock: [],
    // 合约tag
    taglist: {},
    // 委托的index
    weituoindex: 0,
    // 软件配置信息
    softconf: {},
    newlengths: 0,
    // 合并平仓
    hbfbcell: [],
    // 持仓合计
    cctotalmoney: 0
  },
  mutations: {
    login(state, provider) {
      state.hasLogin = true;
      state.loginProvider = provider;
    },
    setatNight(state, data) {
      state.atNight = data
    },
    settabIndex(state, data) {
      state.tabIndex = data
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
    setpaylist(state, data) {
      state.paylist = data
    },
    setassets(state, data) {
      state.assets = data
    },
    setuserinfo(state, data) {
      state.userinfo = data
    },
    setbankinfo(state, data) {
      state.bankinfo = data
    },
    setnewprice(state, data) {
      state.newprice = data
    },
    setstockamunt(state, data) {
      state.stockamunt = data
    },
    setenttype(state, data) {
      state.enttype = data
    },
    setentrusttype(state, data) {
      state.entrusttype = data
    },
    setmaxbuy(state, data) {
      state.maxbuy = data
    },
    setfbccid(state, data) {
      state.fbccid = data
    },
    setcommonstock(state, data) {
      state.commonstock = data
    },
    settaglist(state, data) {
      state.taglist = data
    },
    setweituoindex(state, data) {
      state.weituoindex = data
    },
    setsoftconf(state, data) {
      state.softconf = data
    },
    setnewlengths(state, data) {
      state.newlengths = data
    },
    sethbfbcell(state, data) {
      state.hbfbcell = data
    },
    setcctotalmoney(state, data) {
      state.cctotalmoney = data
    }
  },
  //#ifdef H5
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  //#endif
})

export default store
