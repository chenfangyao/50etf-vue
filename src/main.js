import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import vueUtil from '@/common/vueUtil.js'
import baseHeader from '@/components/base_header.vue'
import './icons' 

import '@/common/black.scss'
import { Toast,Dialog} from 'vant';
Vue.use(Toast,Dialog,router  )
Vue.use(vueUtil);


Toast.setDefaultOptions({
  duration: 2000,
  position: 'middle'
})
// import '@/common/color.scss'
Vue.component('baseHeader', baseHeader)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
