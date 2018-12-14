<template>
	<view class="wrap_op">
		<header-title :tab-active="onClose" @change-close="changeClose"></header-title>
    <view class="h1 "></view>
    <contain-chart></contain-chart>
    <view class="h12 "></view>
    <mini-table :hydetils='QuotationMsg'></mini-table>
    <view class="h12 "></view>
    <new-price :on-close="onClose"></new-price>
    <view class="h12 "></view>
    <total-cost v-if="!onClose"></total-cost>
    <view class="h12 " v-if="!onClose"></view>
    <bottom-btn></bottom-btn>
	</view>
</template>

<script>
import headerTitle from '@/components/openCloseSub/headerTitle.vue'
import containChart from '@/components/openCloseSub/containChart.vue'
import miniTable from '@/components/openCloseSub/miniTable.vue'
import newPrice from '@/components/openCloseSub/newPrice.vue'
import totalCost from '@/components/openCloseSub/totalCost.vue'
import bottomBtn from '@/components/openCloseSub/bottomBtn.vue'
export default {
  data() {
    return {
      QuotationMsg: [],
      onClose: false,
    };
  },
  components: {
    headerTitle, containChart, miniTable, newPrice, totalCost, bottomBtn
  },
  methods: {
    // 买入卖出合约详细
    getartlelist() {
      var options = {
        url: '/fiftyEtf/QrySingleQuotationMsg', //请求接口
        method: 'POST', //请求方法全部大写，默认GET
        dataType: "json",
        data: {
          symbol: 10001544,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$httpReq(options).then((res) => {
        // 请求成功的回调
        // res为服务端返回数据的根对象
        console.log('买入卖出详细', res)
        if (res.status) {
          this.QuotationMsg = res.data[0]
          console.log('this.QuotationMsg', this.QuotationMsg)
        }
      }).catch((err) => {
        // 请求失败的回调
        console.log(err)
      })
    },
    changeClose(val) {
      this.onClose = val
    }
  },
  onShow() {
    this.getartlelist()
  },
  onLoad(option) {
    option.val == 1?(this.onClose=true):(this.onClose=false)
  }
}
</script>

<style lang="scss" scoped>
view.h1 {
  height: 1px;
}
.wrap_op {
  background-color: #ededed;
  min-height: 100vh;
  >view{
    background-color: #fff;
  }
}
.h12 ,.h1{
  height: 12upx;
  background-color: transparent !important;
}
</style>
