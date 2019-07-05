<template>
  <div class="wrap2 black1">
    <header-title :res-obj='detailObj'></header-title>
    <header-part :res-obj='detailObj'  :hyinfos='hyinfos'></header-part>
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
      hyinfos: {},
      timmer:null
    }
  },
  methods: {
    changeI(i) {
      if (i == 0) { this.onDayKTab = true }
      else { this.onDayKTab = false }
    },
    getItem() {
      var obj = {
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
      this.$httpReq(obj).then((res) => {
        this.detailObj = res.data[0]

      })
    },
    gethyinfoprice() {
      var obj = {
        url: '/Sapi/Stock/hyinfo', 
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
  activated() {
    this.symbol = this.$route.query.code
    this.getItem()
    this.gethyinfoprice()
    this.timmer=setInterval(()=>this.getItem(),1500)
  },
  deactivated(){
    clearInterval(this.timmer)
    this.timmer=null
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
