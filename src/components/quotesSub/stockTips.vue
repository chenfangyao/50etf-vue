<template>
  <div class="stock50 uni-flex black2 " v-vtap="{method:go}">
    <div class="stockNmae textc1">50ETF</div>
    <div class="df_wh" id="mini-canvas"></div>
    <div class="currentPrice" :class="{lt0:commonstock[0].priceChange<0}">{{commonstock[0]?commonstock[0].latestPrice:0}}</div>
    <div class="txtContainer" :class="{lt0:commonstock[0].priceChange<0}">
      <span>{{commonstock[0]?commonstock[0].priceChange:0}}</span>
      <span>{{commonstock[0]?commonstock[0].priceChangeRate:0}}%</span>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
let myChart = null;

export default {
  data() {
    return {
      echarts,
      timmer: null,
      option: {
        xAxis: {
          data: [],
          show: false,
        },
        legend: {
          padding: 0
        },
        animation: false,
        grid: {
          left: 0,
          right: 0,
          top: 3,
          bottom: 3
        },
        yAxis: {
          show: false,
          type: 'value',
          min: 'dataMin',
          max: 'dataMax'
        },
        series: [{
          data: [],
          type: 'line',
          symbol: 'none',
          lineStyle: { color: '#ec605e' }
        }]
      }
    }
  },
  props: {
    commonstock: {
      default() { return [] }
    }
  },
  methods: {
    showH5Echarts() {
      myChart = echarts.init(document.getElementById('mini-canvas'));
    },
    go() {
      this.$navigateTo({ url: '/stock_detail', query: { index: 0 } })
    },
    getfenshi() {
      var options = {
        url: '/market/getTimeSharingInfo',
        method: 'GET',
        data: {
          stockCodeInternal: 510050,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$httpReq(options).then((res) => {
        if (res.result == 1) {
          this.dealFenshiData(res.mdata.timeSharingList[0].periodData);
        }
      })
    },
    dealFenshiData(arr) {
      var Yline = []
      arr.slice(-15).forEach((item, i) => {
        Yline.push(item.closePrice)
      });
      if (Yline.length > 5) {
        this.option.series[0].data = Yline
        if (this.commonstock[0].priceChange < 0) {
         this.option.series[0].lineStyle.color = '#1bd091'
        } else {
         this.option.series[0].lineStyle.color = '#ec605e'
        }
        myChart.setOption(this.option)
      }
    },
  },
  deactivated() { clearInterval(this.timmer) },
  watch:{
    commonstock(val){
      val[0].priceChange!==undefined&& this.getfenshi()
    }
  },
  mounted() {
    this.showH5Echarts()
    this.timmer = setInterval(() => this.getfenshi(), 120000)
  },
}
</script>

<style lang="scss" scoped>
div.stock50 {
  height: 0.84rem;
  line-height: 0.84rem;
  justify-content: space-between;
  padding: 0 0.27rem;
  border-top: 1px solid #ededed;
  border-bottom: 0.12rem solid #ededed;
  div.txtContainer {
    display: flex;
    justify-content: space-between;
    line-height: 0.71rem;
    color: rgba(240, 95, 92, 1);
    span:first-child{
      margin-right: 0.3rem;
    }
  }
  div.txtContainer.lt0 ,.currentPrice.lt0{
    color: $green1;
  }
  .stockNmae {
    font-size: 17px;
    font-family: ArialMT;
    line-height: 0.71rem;
    color: rgba(24, 28, 40, 1);
  }
  
  span {
    font-size: 14px;
    font-family: ArialMT;
    font-weight: 400;
  }
  div.df_wh {
  width: 1.24rem;
  height: 0.47rem;
  margin-left: 0.17rem;
  align-self: center;
  margin-right: -16px;
}
.currentPrice {
    font-size: 17px;
    font-family: ArialMT;
    font-weight: 700;
    flex-grow: 1;
    color: rgba(240, 95, 92, 1);
    text-align: center;
  }
}

</style>
