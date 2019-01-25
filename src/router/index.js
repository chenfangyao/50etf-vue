import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = resolve => require([ '@/components/HelloWorld' ], resolve)
const bv = resolve => require([ '@/components/bv' ], resolve)
const index = resolve => require([ '@/pages/tabBar/index/index' ], resolve)
const assets = resolve => require([ '@/pages/tabBar/assets/assets' ], resolve)
const mine = resolve => require([ '@/pages/tabBar/mine/mine' ], resolve)
const login = resolve => require([ '@/pages/login/login' ], resolve)
const recharge = resolve => require([ '@/pages/assets_sub/recharge/recharge' ], resolve)
const withdraw = resolve => require([ '@/pages/assets_sub/withdraw/withdraw' ], resolve)
const setting = resolve => require([ '@/pages/mine_sub/setting/setting' ], resolve)

Vue.use(Router)

export default new Router({
  // base:'/abc/',
  routes: [
    { path: '/h', name: 'HelloWorld', component: HelloWorld, meta: { isKeepAlive: true, tabbar: true } },
    { path: '/', name: 'index', component: index, meta: { isKeepAlive: true, tabbar: true,index:1 } },
    { path: '/assets', name: 'assets', component: assets, meta: { isKeepAlive: true, tabbar: true,index:1 } },
    { path: '/mine', name: 'mine', component: mine, meta: { isKeepAlive: true, tabbar: true,index:1 } },
    // 登录
    { path: '/pages/login/login', name: 'login', component: login, meta: { isKeepAlive: true, index:1 } },
    // 充值
    { path: '/pages/assets_sub/recharge/recharge', name: 'recharge', component: recharge, meta: { isKeepAlive: true, index:1 } },
    { path: '/pages/assets_sub/withdraw/withdraw', name: 'withdraw', component: withdraw, meta: { isKeepAlive: true, index:1 } },
    // 我的页面设置
    { path: '/pages/mine_sub/setting/setting', name: 'setting', component: setting, meta: { isKeepAlive: true, index:1 } },
    { path: '/b', name: 'bv', component: bv, meta: { isKeepAlive: true ,index:2} },
    // { path: '*', redirect: '/' }
  ]
})
var pages= [
  {
    "path": "pages/tabBar/quotes/quotes",
    "style": {
      "app-plus": {
        "titleNView": false,
        "scrollIndicator": "none"
      }
    }
  },
  {
    "path": "pages/tabBar/holding_warehouse/holding_warehouse",
    "style": {
      "app-plus": {
        "titleNView": false,
        "scrollIndicator": "none"
      }
    }
  },
  {
    "path": "pages/quotes_sub/qi_quan_xiang_qing/qi_quan_xiang_qing",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/index_sub/new_xiang_qing/new_xiang_qing",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "platforms/app-plus/fullscreen/fullscreen",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/quotes_sub/open_close/open_close",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/about_us/about_us",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/capital_flow/capital_flow",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  // "enablePullDownRefresh" : true
  {
    "path": "pages/mine_sub/my_customer_service/my_customer_service",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/index_sub/new_list/new_list",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/quotes_sub/entrust_succ/entrust_succ",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/risk_book/risk_book",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/forget_pwd/tep2/tep2",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/forget_pwd/tep3/tep3",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/change_password/change_password",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/credentials_upload/tep1/tep1",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/credentials_upload/tep2/tep2",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/credentials_upload/tep3/tep3",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/bank_card/card_list/card_list",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/bank_card/add_card/add_card",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/holding_sub/clinch/clinch",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/holding_sub/ping_c_list/ping_c_list",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/holding_sub/ping_c_item/ping_c_item",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/holding_sub/full_and_lose/full_and_lose",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/trading_rules/trading_rules",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/red_envelope/red_envelope",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/invite_friends/invite_friends",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/msg_common/list/list",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/msg_common/detail/detail",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/stock_detail/stock_detail",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/assets_sub/bank_card/bank_card",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/assets_sub/help/help",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/assets_sub/receipt_bank/receipt_bank",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/assets_sub/gatherinfo/gatherinfo",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/bar_code/bar_code",
    "style": {}
  },
  {
    "path": "pages/mine_sub/credentials_upload/tep4/tep4",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/mine_sub/bank_card/add_card_btn/add_card_btn",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/assets_sub/recording/recording",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/registers/registers",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  },
  {
    "path": "pages/forgets_pwd/forgets_pwd",
    "style": {
      "titleNView": false,
      "scrollIndicator": "none"
    }
  }
]
