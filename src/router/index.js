import Vue from 'vue'
import Router from 'vue-router'
Router.prototype.goBack = function () {
  this.isBack = true
  history.back(-1)
}
const HelloWorld = resolve => require(['@/components/HelloWorld'], resolve)
const bv = resolve => require(['@/components/bv'], resolve)
//首页
const index = resolve => require(['@/pages/tabBar/index/index'], resolve)
const newsDetail = resolve => require(['@/pages/index_sub/new_xiang_qing/new_xiang_qing'], resolve)
const newList = resolve => require(['@/pages/index_sub/new_list/new_list'], resolve)
const stockDetail = resolve => require(['@/pages/stock_detail/stock_detail'], resolve)

const quotes = resolve => require(['@/pages/tabBar/quotes/quotes'], resolve)
const quotesDetail = resolve => require(['@/pages/quotes_sub/qi_quan_xiang_qing/qi_quan_xiang_qing'], resolve)
const openClose = resolve => require(['@/pages/quotes_sub/open_close/open_close'], resolve)
const entrustSucc = resolve => require(['@/pages/quotes_sub/entrust_succ/entrust_succ'], resolve)
//持仓
const holding_warehouse = resolve => require(['@/pages/tabBar/holding_warehouse/holding_warehouse'], resolve)
const clinch = resolve => require(['@/pages/holding_sub/clinch/clinch'], resolve)
const ping_c_list = resolve => require(['@/pages/holding_sub/ping_c_list/ping_c_list'], resolve)
const ping_c_item = resolve => require(['@/pages/holding_sub/ping_c_item/ping_c_item'], resolve)

const assets = resolve => require(['@/pages/tabBar/assets/assets'], resolve)
const mine = resolve => require(['@/pages/tabBar/mine/mine'], resolve)
const login = resolve => require(['@/pages/login/login'], resolve)
const recharge = resolve => require(['@/pages/assets_sub/recharge/recharge'], resolve)
const withdraw = resolve => require(['@/pages/assets_sub/withdraw/withdraw'], resolve)
const setting = resolve => require(['@/pages/mine_sub/setting/setting'], resolve)
const add_card = resolve => require(['@/pages/mine_sub/bank_card/add_card/add_card'], resolve)
const bank_card = resolve => require(['@/pages/assets_sub/bank_card/bank_card'], resolve)
const gatherinfo = resolve => require(['@/pages/assets_sub/gatherinfo/gatherinfo'], resolve)
const recording = resolve => require(['@/pages/assets_sub/recording/recording'], resolve)
const credentials1 = resolve => require(['@/pages/mine_sub/credentials_upload/tep1/tep1'], resolve)
const credentials2 = resolve => require(['@/pages/mine_sub/credentials_upload/tep4/tep4'], resolve)
const capital_flow = resolve => require(['@/pages/mine_sub/capital_flow/capital_flow'], resolve)
const trading_rules = resolve => require(['@/pages/mine_sub/trading_rules/trading_rules'], resolve)
const red_envelope = resolve => require(['@/pages/mine_sub/red_envelope/red_envelope'], resolve)
// const invite_friends = resolve => require(['@/pages/mine_sub/invite_friends/invite_friends'], resolve)
const customer_service = resolve => require(['@/pages/mine_sub/my_customer_service/my_customer_service'], resolve)
const about_us = resolve => require(['@/pages/mine_sub/about_us/about_us'], resolve)
const change_password = resolve => require(['@/pages/mine_sub/change_password/change_password'], resolve)
const newcenterlist = resolve => require(['@/pages/msg_common/list/list'], resolve)
const newdetail = resolve => require(['@/pages/msg_common/detail/detail'], resolve)

// 测试
// const test = resolve => require(['@/pages/mine_sub/test/test'], resolve)


Vue.use(Router)
export default new Router({
  base: process.env.NODE_ENV === 'web' ? '/h5/' : '',
  routes: [
    //首页
    { path: '/', name: 'index', component: index, meta: { isKeepAlive: true, tabbar: true, index: 0 } },
    { path: '/pages/index_sub/new_xiang_qing/new_xiang_qing', name: 'newsDetail', component: newsDetail,  },
    { path: '/pages/index_sub/new_list/new_list', name: 'newList', component: newList,  },
    { path: '/stock_detail', name: 'stockDetail', component: stockDetail,  },
    //行情
    { path: '/quotes', name: 'quotes', component: quotes, meta: { isKeepAlive: true, tabbar: true, index: 1 } },
    { path: '/qi_quan_xiang_qing', name: 'quotesDetail', component: quotesDetail,  },
    { path: '/open_close', name: 'openClose', component: openClose,  },
    { path: '/entrustSucc', name: 'entrustSucc', component: entrustSucc,  },
    //持仓
    { path: '/holding_warehouse', name: 'holding_warehouse', component: holding_warehouse, meta: { isKeepAlive: true, tabbar: true, index: 2 } },
    { path: '/clinch', name: 'clinch', component: clinch },
    { path: '/ping_c_list', name: 'ping_c_list', component: ping_c_list,  },
    { path: '/ping_c_item', name: 'ping_c_item', component: ping_c_item },

    //资产
    { path: '/assets', name: 'assets', component: assets, meta: { isKeepAlive: true, tabbar: true, index: 3 } },
    // 登录
    { path: '/pages/login/login', name: 'login', component: login},
    // 我的页面设置
    { path: '/mine', name: 'mine', component: mine, meta: { isKeepAlive: true, tabbar: true, index: 4 } },
    { path: '/pages/mine_sub/setting/setting', name: 'setting', component: setting, meta: { isKeepAlive: true, } },

    // 充值
    { path: '/pages/assets_sub/recharge/recharge', name: 'recharge', component: recharge, meta: { isKeepAlive: true, } },
    { path: '/pages/assets_sub/withdraw/withdraw', name: 'withdraw', component: withdraw, meta: { isKeepAlive: true, } },
    // 账户充值第二步
    { path: '/pages/assets_sub/bank_card/bank_card', name: 'bank_card', component: bank_card,  },
    // 账户充值第三步
    { path: '/pages/assets_sub/gatherinfo/gatherinfo', name: 'gatherinfo', component: gatherinfo,  },
    // 充值记录
    { path: '/pages/assets_sub/recording/recording', name: 'recording', component: recording,  },
    // 我的页面
    // 消息
    { path: '/pages/msg_common/list/list', name: 'newcenterlist', component: newcenterlist,  },
    // 消息详细
    { path: '/pages/msg_common/detail/detail', name: 'newdetail', component: newdetail,  },
    // 实名认证
    { path: '/pages/mine_sub/credentials_upload/tep1/tep1', name: 'credentials1', component: credentials1,  },
    { path: '/pages/mine_sub/credentials_upload/tep4/tep4', name: 'credentials2', component: credentials2,  },
    // 资金流水
    { path: '/pages/mine_sub/capital_flow/capital_flow', name: 'capital_flow', component: capital_flow,  },
    // 添加银行卡
    { path: '/pages/mine_sub/bank_card/add_card/add_card', name: 'add_card', component: add_card,  },
    // 交易规则
    { path: '/pages/mine_sub/trading_rules/trading_rules', name: 'trading_rules', component: trading_rules, },
    // 我的红包
    { path: '/pages/mine_sub/red_envelope/red_envelope', name: 'red_envelope', component: red_envelope,},
    // 邀请好友
    // { path: '/pages/mine_sub/invite_friends/invite_friends', name: 'invite_friends', component: invite_friends,  },
    // 联系客服
    { path: '/pages/mine_sub/my_customer_service/my_customer_service', name: 'customer_service', component: customer_service,  },
    // 关于我们
    { path: '/pages/mine_sub/about_us/about_us', name: 'about_us', component: about_us,  },
    // 修改密码
    { path: '/pages/mine_sub/change_password/change_password', name: 'change_password', component: change_password,  },



    // 测试
    // { path: '/pages/mine_sub/test/test', name: 'test', component: test,  },
    { path: '/b', name: 'bv', component: bv, meta: { isKeepAlive: true, } },
    { path: '/h', name: 'HelloWorld', component: HelloWorld, meta: { isKeepAlive: true } },
    // { path: '*', redirect: '/' }
  ]
})
var pages = [
  // "enablePullDownRefresh" : true
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
