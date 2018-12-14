import Vue from 'vue'
import App from './App'
import baseHeader from '@/components/base_header.vue'
import request from '@/common/request.js'

// Vue.config.productionTip = false
import store from './store'
App.mpType = 'app'
Vue.component('baseHeader',baseHeader)

Vue.prototype.$httpReq = request
Vue.prototype.$store = store
Vue.prototype.$formatetimestr = function(str){
	return new Date(parseInt(str) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

const app = new Vue({
    ...App,
    store
})
app.$mount()

