<template>
  <div class="wrap2 black1">
    <header-title :res-obj='detailObj'></header-title>
    <header-part :res-obj='detailObj' :hynumbers='hynumbers' :hyinfos='hyinfos'></header-part>
    <div class="h12 black1"></div>
    <k-chart  @change-i='changeI' :symbol-str='symbol'></k-chart>
    <template v-if="onDayKTab">

      <div class="h12 black1"></div>
      <mini-table :hydetils='detailObj'></mini-table>
    </template>
      <div class="h100 black1"></div>
    
    <btn-bottom :res-obj='detailObj'></btn-bottom>
  </div>
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
  data() {
    return {
      symbol: '',
      detailObj: {},
      onDayKTab: true,
      hynumbers: '',
      hyinfos: {},
    }
  },
  methods: {
    changeI(i) {
      if (i == 0) { this.onDayKTab = true }
      else { this.onDayKTab = false }
    },
    // 获取最大可买数量
    getmaxbuy(codes, prices, amounts) {
      var options = {
        url: '/Sapi/Stock/max_buy', //请求接口
        method: 'POST', 
        dataType: "json",
        data: {
          // 股票代码
          code: this.symbol,
          // 委托价格
          price: 0.0017,
          // 委托数量,默认设置为1
          amount: 1
        },
      }
      this.$httpReq(options).then((res) => {
        if (res.status) {
          this.hynumbers = res.data.volume_multiple
        }
      }).catch((err) => {
        console.error(err,'捕捉')
      })
    },
    getItem() {
      var obj = {
        url: '/fiftyEtf/QrySingleQuotationMsg', //请求接口
        method: 'POST', 
        dataType: "json",
        data: {
          symbol: this.symbol,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$httpReq(obj).then((res) => {
        this.detailObj = res.data[0]

      })
    },
    gethyinfoprice() {
      var obj = {
        url: '/Sapi/Stock/hyinfo', //请求接口
        method: 'POST', 
        dataType: "json",
        data: {
          stock_code: this.symbol,
        },
      }
      this.$httpReq(obj).then((res) => {
        if (res.status) {
          this.hyinfos = res.data
        }
      })
    }
  },
  created() {
    this.symbol = this.$route.query.code
    this.getItem()
    this.getmaxbuy()
    this.gethyinfoprice()
  }
}
</script>

<style lang="scss" scoped>
.wrap2 {
  background-color: #f5f5f5;
  min-height: 100vh;
  width: 100%;
}
.h12 {
  height:.12rem;
  background-color: #f5f5f5;
}
div.h100 {
  height:1.20rem;
  background-color: #f5f5f5;
}
</style>
