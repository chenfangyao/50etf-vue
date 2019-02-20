<template>
  <div class="wrap_op black1">
    <header-title :tab-active="onClose" @change-close="reGetSth"></header-title>
    <div class="h1 black1"></div>
    <contain-chart :res-obj="QuotationMsg" :symbol-str='symbol'></contain-chart>
    <mini-table :hydetils="QuotationMsg"></mini-table>
    <div class="h12 black1"></div>
    <new-price
      :on-close="onClose"
      :fborhb="hbfbswitch"
      :maxprice="maxbuy"
      :qrysingle="QuotationMsg"
      :fbcclist="fbcclist"
      :hbcclist="hbcclist"
      @fb-num="fbNum"
      @hbfb-switch="hbfbSwitch"
      @plus-step="plusStepNum"
      @price-step="priceStep"
    ></new-price>
    <div class="h12 black1"></div>

    <total-cost v-if="!onClose" :feemoney="feemoney"></total-cost>
    <div class="h12 black1" v-if="!onClose"></div>
    <bottom-btn :on-close="onClose" :totalmoney="totalmoney" :res-obj="QuotationMsg"></bottom-btn>
  </div>
</template>

<script>
import headerTitle from '@/components/openCloseSub/headerTitle.vue'
import containChart from '@/components/openCloseSub/containChart.vue'
import miniTable from '@/components/openCloseSub/miniTable.vue'
import newPrice from '@/components/openCloseSub/newPrice.vue'
import totalCost from '@/components/openCloseSub/totalCost.vue'
import bottomBtn from '@/components/openCloseSub/bottomBtn.vue'
import { mapState, mapMutations } from 'vuex'
import util from '@/common/util.js'

export default {
  data() {
    return {
      QuotationMsg: {},
      onClose: false,
      maxbuy: {},
      feemoney: '',
      timmer: null,
      // hycode:'',
      hbcclist: [],
      fbcclist: [],
      totalmoney: '',
      hbfbswitch: false,
      fbnum: '',
      // cclist:{},
      symbol: '',
      bussinesdata: '',
    };
  },
  computed: mapState(['sid', 'hycode']),
  components: { headerTitle, containChart, miniTable, newPrice, totalCost, bottomBtn },
  methods: {
    ...mapMutations(['setmaxbuy', 'setstockamunt', 'setcctotalmoney']),
    // 合并、分笔
    hbfbSwitch(val) {
      this.hbfbswitch = val.val
      this.fbnum = val.picktext
    },
    fbNum(val) {
      this.fbnum = val
    },
    // 买入卖出合约详细
    getartlelist() {
      var options = {
        url: '/fiftyEtf/QrySingleQuotationMsg', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        dataType: "json",
        data: {
          symbol: this.symbol,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.QuotationMsg = res.data[0]
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    },
    plusStepNum(val) {
      this.getmaxbuy(this.symbol, val.price, val.num)
    },
    priceStep(val) {
      this.getmaxbuy(this.symbol, val.price, val.num)
    },
    // 获取最大可买数量
    getmaxbuy(codes, prices, amounts) {
      var options = {
        url: '/Sapi/Stock/max_buy', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        dataType: "json",
        data: {
          // 股票代码
          code: codes,
          // 委托价格
          price: prices,
          // 委托数量,默认设置为1
          amount: amounts
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.maxbuy = res.data
          this.setmaxbuy(res.data)
          // 开仓
          if (!this.onClose) {
            this.maxbuy.maxcounts = parseInt(this.maxbuy.maxcount)
          }
          // 平仓
          else {
            // 合并
            if (!this.hbfbswitch) {
              this.maxbuy.maxcounts = parseInt(this.maxbuy.own_amount)
            }
            // 分笔
            else {
              this.maxbuy.maxcounts = this.fbnum
            }
          }
          var hycsnum = res.data.volume_multiple
          var djmoney = parseFloat(parseInt(amounts) * parseFloat(prices) * hycsnum)
          this.feemoney = {
            feemoney: res.data.fee_money,
            djmoney: djmoney.toFixed(2),
            own_amount: res.data.own_amount,
            enable_amount: res.data.enable_amount
          }
          this.totalmoney = (djmoney + parseFloat(res.data.fee_money)).toFixed(2)
          this.setcctotalmoney(this.totalmoney)
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    // 分笔持仓
    getfbchic() {
      var options = {
        url: '/Sapi/Squery/list_fbcc_dropdown_sell', //请求接口
        method: 'GET', //请求方法全部大写，默认GET
        dataType: "json",
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        if (res.status) {
          this.fbcclist = []
          for (var i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].stock_code == this.symbol) {
              this.fbcclist.push(res.data.list[i])
            }
          }
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    },
    // 合并持仓
    gethbchic() {
      var options = {
        url: '/Sapi/Squery/list_hbcc_dropdown_sell', //请求接口
        method: 'GET', //请求方法全部大写，默认GETGET
        dataType: "json",
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.hbcclist = []
          for (var i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].stock_code == this.symbol) {
              this.hbcclist.push(res.data.list[i])
            }
          }
        }
      }).catch((err) => {
        // 请求失败的回调
        console.error(err, '捕捉')
      })
    },
    reGetSth() {
      this.onClose = !this.onClose
      // 合并持仓分笔持仓
      this.getfbchic()
      this.gethbchic()
      this.getmaxbuy(this.symbol, this.QuotationMsg.latestPrice, 0)
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(util.indextimmer.quotesQrySingleQuotationMsg)
    util.indextimmer.quotesQrySingleQuotationMsg = null
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.pinkaiC == '1') {
        vm.onClose = true
      } else {
        vm.onClose = false
      }
      if(to.query.isActive==1){
        vm.hbfbswitch=true
      }else{
        vm.hbfbswitch=false
      }
      // 合并持仓分笔持仓
      vm.getfbchic()
      vm.gethbchic()
      vm.setstockamunt(0)
      vm.symbol = to.query.code
      vm.getartlelist()
      setTimeout(() => {
        vm.getmaxbuy(vm.symbol, vm.QuotationMsg.latestPrice, 0)
      }, 1500)
        if (!util.calcLegalTime()) return;
        if (util.indextimmer.quotesQrySingleQuotationMsg === null) {
          util.indextimmer.quotesQrySingleQuotationMsg = setInterval(() => {
            vm.getartlelist()
          }, 2500)
        }

    })
  },
}
</script>
<style lang="scss" scoped>
div.h1 {
  height: 1px;
}

.wrap_op {
  background-color: #ededed;
  min-height: 100vh;
  width: 100%;
}

.h12 {
  height: 0.24rem;
}
</style>
