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
    userinfo: {},
    // 合约code
    hycode: '',
    loadingFlag: false,
    // 支付方式
    paylist: '',
    // 账户资金
    assets: '',
    pingCItem: {},//平仓结算单条详情obj
    // 充值页面银行卡信息
    bankinfo: {},
		// 开/平仓页面合约价格
		newprice:'',
		// 开/平仓页面委托数量
		stockamunt:''
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
		setnewprice(state,data){
			state.newprice=data
		},
		setstockamunt(state,data){
			state.stockamunt=data
		},
  },
})

export default store
