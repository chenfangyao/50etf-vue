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

const app = new Vue({
    ...App,
    store
})
app.$mount()

