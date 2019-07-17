<template>
  <div class="wrap_op black1">
    <header-title :tab-active="onClose" @change-close="reGetSth"></header-title>
    <div class="h1 black1"></div>
    <contain-chart :res-obj="QuotationMsg" :symbol-str='symbol'></contain-chart>
    <mini-table :hydetils="QuotationMsg"></mini-table>
    <div class="h12 black1"></div>
    <new-price :on-close="onClose" :maxprice="maxprice" :qrysingle="QuotationMsg" :fbcclist="fbcclist" :hbcclist="hbcclist" @fb-num="fbNum" @hbfb-switch="hbfbSwitch" @price-step="plusStepNum"></new-price>
    <div class="h12 black1"></div>

    <total-cost v-if="!onClose" :feemoney="feemoney"></total-cost>
    <div class="h12 black1" v-if="!onClose"></div>
    <bottom-btn :on-close="onClose"  :res-obj="QuotationMsg"></bottom-btn>
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
      maxprice: {},
      feemoney: '',
      timmer: null,
      // hycode:'',
      hbcclist: [],
      fbcclist: [],
      fbnum: '',
      // cclist:{},
      symbol: '',
      bussinesdata: '',
    };
  },
  computed: mapState(['sid', 'hycode', 'entrusttype']),
  components: { headerTitle, containChart, miniTable, newPrice, totalCost, bottomBtn },
  methods: {
    ...mapMutations(['setmaxbuy', 'setstockamunt', 'setentrusttype', 'setcctotalmoney']),
    // 合并、分笔
    hbfbSwitch(val) {
      this.fbnum = val.picktext
    },
    fbNum(val) {
      this.fbnum = val
    },
    // 买入卖出合约详细
    getartlelist(firstReq) {
      var options = {
        url: '/fiftyEtf/QrySingleQuotationMsg',
        method: 'POST',
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
          if (firstReq) {
            setTimeout(() => {//因为this.hbcclist是异步获取的，
              let howMuch = !this.entrusttype && this.onClose ? this.hbcclist[0].enable_amount : 0//平仓且合并的时候
              this.getmaxbuy(this.symbol, this.QuotationMsg.latestPrice, howMuch)
            }, 1000)
          }
        }
      }).catch(err => {
        console.error(err, '捕捉')
      })
    },
    plusStepNum(val) {
      this.getmaxbuy(this.symbol, val.price, val.num)
    },
    // 获取最大可买数量
    getmaxbuy(codes, prices, amounts) {
      var options = {
        url: this.onClose ? '/Sapi/Stock/max_sell' : '/Sapi/Stock/max_buy',
        method: 'POST',
        dataType: "json",
        data: {
          code: codes, // 股票代码
          price: prices,// 委托价格
          amount: amounts // 委托数量,默认设置为1
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.maxprice = res.data
          this.setmaxbuy(res.data)
          if (!this.onClose) {// 开仓
            this.maxprice.maxcounts = parseInt(this.maxprice.maxcount)
          } else {// 平仓
            if (!this.entrusttype) {// 合并
              this.maxprice.maxcounts = parseInt(this.maxprice.own_amount)
            } else { // 分笔
              this.maxprice.maxcounts = this.fbnum
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
          let i = this.onClose ? -1 : 1
          this.setcctotalmoney((djmoney + parseFloat(res.data.fee_money.replace(',','')) * i).toFixed(2))
        }
      }).catch((err) => {
        console.error(err, '捕捉')
      })
    },
    // 分笔持仓
    getfbchic() {
      var options = {
        url: '/Sapi/Squery/list_fbcc_dropdown_sell',
        method: 'GET',
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

        console.error(err, '捕捉')
      })
    },
    // 合并持仓
    gethbchic() {
      var options = {
        url: '/Sapi/Squery/list_hbcc_dropdown_sell',
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
        console.error(err, '捕捉')
      })
    },
    reGetSth() {
      this.onClose = !this.onClose
      // 合并持仓分笔持仓
      this.getfbchic()
      this.gethbchic()
      let howMuch = !this.entrusttype && this.onClose ? this.hbcclist[0].enable_amount : 0//平仓且合并的时候
      this.getmaxbuy(this.symbol, this.QuotationMsg.latestPrice, howMuch)
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(util.indextimmer.quotesQrySingleQuotationMsg)
    util.indextimmer.quotesQrySingleQuotationMsg = null
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.onClose = to.query.pinkaiC == '1'
      vm.setentrusttype(to.query.isActive == 1)
      // 合并持仓分笔持仓
      vm.getfbchic()
      vm.gethbchic()
      vm.setstockamunt(0)
      vm.symbol = to.query.code
      vm.getartlelist(true)
      // if (!util.calcLegalTime()) return;
      if (util.indextimmer.quotesQrySingleQuotationMsg === null) {
        util.indextimmer.quotesQrySingleQuotationMsg = setInterval(() => {
          vm.getartlelist()
        }, 1500)
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
