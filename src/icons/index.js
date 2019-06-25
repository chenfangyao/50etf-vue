import Vue from 'vue'
import SIcon from '@/components/other/SIcon'// svg组件

// register globally
Vue.component('s-icon', SIcon)

const req = require.context('./svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
