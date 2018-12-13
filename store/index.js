import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
    openid: null,
    isWhite:true,
    sid:'',
    loadingFlag:false
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
    },
    setisWhite(state,data){
      state.isWhite=data
    },
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setloadingFlag(state,data) {
			state.loadingFlag = data
		},
		setOpenid(state, openid) {
			state.openid = openid
    },
		setsid(state, data) {
			state.sid = data
    },
	},
})

export default store
