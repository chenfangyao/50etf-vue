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
// 时间格式化
Vue.prototype.$formatetimestr = function(str){
	return new Date(parseInt(str) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
// 时间转时间戳
Vue.prototype.$timestamp = function(str){
	var timestamp=new Date(str)
	timestamp=timestamp.getTime(timestamp)
	timestamp=timestamp.toString().slice(0,10)
	return parseInt(timestamp)
}
const app = new Vue({
    ...App,
    store
})
app.$mount()

