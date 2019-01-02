<template>
  <view>
    <header-title :res-obj='detailObj'></header-title>
    <header-part :res-obj='detailObj'></header-part>
    <view class="h12"></view>
    <k-chart chart-height='278'></k-chart>
    <view class="h12"></view>
    <mini-table :hydetils='detailObj'></mini-table>
    <view class="h100"></view>
    
    <btn-bottom :res-obj='detailObj'></btn-bottom>
  </view>
</template>

<script>
import headerPart from '@/components/qiQuanXiangQingSub/headerPart.vue'
import headerTitle from '@/components/qiQuanXiangQingSub/headerTitle.vue'
import kChart from '@/components/qiQuanXiangQingSub/kChart.vue'
import btnBottom from '@/components/qiQuanXiangQingSub/btnBottom.vue'
import miniTable from '@/components/openCloseSub/miniTable.vue'

export default {
  components: {
    headerPart, headerTitle, kChart, btnBottom, miniTable
  },
  data(){
    return{
      symbol:'',
      detailObj:{}
    }
  },
  methods: {
    getItem() {
      var obj = {
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
      this.$httpReq(obj).then((res) => {
        this.detailObj=res.data[0]

      }).catch((err) => {
        // 请求失败的回调
        console.log(err)
      })
    }
  },
  onLoad(options) {
    this.symbol=options.code
    this.getItem()
  }
}
</script>

<style lang="scss" scoped>
.h12 {
  height: 12upx;
  background-color: #f5f5f5;
}
view.h100 {
  height: 120upx;
  background-color: #f5f5f5;
}
</style>
