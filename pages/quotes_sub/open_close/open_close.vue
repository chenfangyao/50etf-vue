<template>
  <view class="wrap_op">
    <header-title :tab-active="onClose" @change-close="reGetSth"></header-title>
    <view class="h1 "></view>
    <contain-chart :res-obj='QuotationMsg'></contain-chart>
    <mini-table :hydetils='QuotationMsg'></mini-table>
    <view class="h12 "></view>
    <new-price :on-close="onClose" :maxprice="maxbuy" :qrysingle="QuotationMsg" :fbcclist="fbcclist" :hbcclist="hbcclist" @fb-num="fbNum" @hbfb-switch="hbfbSwitch" @plus-step="plusStepNum" @price-step="priceStep"></new-price>
    <view class="h12 "></view>

    <total-cost v-if="!onClose" :feemoney="feemoney"></total-cost>
    <view class="h12 " v-if="!onClose"></view>
    <bottom-btn :on-close="onClose" :totalmoney="totalmoney" :res-obj='QuotationMsg'></bottom-btn>
  </view>
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
		  bussinesdata:'',
    };
  },
  computed: mapState(['sid', 'hycode']),
  components: {
    headerTitle,
    containChart,
    miniTable,
    newPrice,
    totalCost,
    bottomBtn
  },
  methods: {
	...mapMutations(['setmaxbuy','setstockamunt','setcctotalmoney']),
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
        console.error(err,'捕捉')
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
					console.log(22,res)
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
		  var hycsnum=res.data.volume_multiple
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
        // 请求失败的回调
        console.error(err,'捕捉')
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
        console.error(err,'捕捉')
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
        // 请求成功的回调
        console.log('可卖合并持仓数量', res)
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
        console.error(err,'捕捉')
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
  onUnload() {
    console.log('关闭开仓平仓定时器')
    clearInterval(util.indextimmer.quotesQrySingleQuotationMsg)
    util.indextimmer.quotesQrySingleQuotationMsg = null
  },
  onLoad(option) {
    this.setstockamunt(0)
    this.symbol = option.code
    this.getartlelist()
		setTimeout(()=>{
			this.getmaxbuy(this.symbol, this.QuotationMsg.latestPrice, 0)
		},1500)
      if(util.indextimmer.quotesQrySingleQuotationMsg===null){
          util.indextimmer.quotesQrySingleQuotationMsg = setInterval(() => {
              this.getartlelist()
          }, 2500)
      }

    // 合并持仓分笔持仓
    this.getfbchic()
    this.gethbchic()
    if (option.pinkaiC == '1') {
      this.onClose = true
      return
    } else {
      this.onClose = false
      return
    }
  },

}
</script>
<style lang="scss" scoped>
view.h1 {
  height: 1px;
}

.wrap_op {
  background-color: #ededed;
  min-height: 100vh;
}

.h12 {
  height: 24upx;
}
</style>
