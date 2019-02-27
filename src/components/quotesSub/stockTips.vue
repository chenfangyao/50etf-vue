<template>
  <div class="stock50 uni-flex black2 " v-vtap="{method:go}">
      <span class="stockNmae textc1">50ETF</span>
      <div class="df_wh" id="mini-canvas"></div>
      <div class="txtContainer">
				<span class="currentPrice">{{commonstock[0]?commonstock[0].latestPrice:0}}</span>
				<span>{{commonstock[0]?commonstock[0].priceChange:0}}</span>
				<span>{{commonstock[0]?commonstock[0].priceChangeRate:0}}%</span>
      </div>
    </div>
</template>
<script>
import echarts from 'echarts'
let chart = null;

var option = {
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
  },
  series: [{
    data: [15, 20, 36, 14, 10, 26],
    type: 'line',
    symbol: 'none'
  }]
}
export default {
  data() {
    return {
      echarts,
    }
  },
	props:['commonstock'],
  methods: {
    showH5Echarts() {
      var myChart = echarts.init(document.getElementById('mini-canvas'));
      myChart.setOption(option);
    },
    go() {
      this.$navigateTo({ url: '/stock_detail',query:{index:0} })
    }
  },
  mounted() {
    //#ifdef H5
  //  this.showH5Echarts()
    //#endif
  }
}
</script>

<style lang="scss" scoped>
div.stock50 {
  height:.84rem;
  line-height:.84rem;
  justify-content: space-between;
  padding: 0 .27rem;
  border-top: 1px solid #ededed;
  border-bottom:.12rem solid #ededed;
  div.txtContainer {
    width: 50%;
    display: flex;
    justify-content: space-between;
    line-height:.71rem;
  }
  span.stockNmae {
    font-size: 17px;
    font-family: ArialMT;
    font-weight: 400;
    line-height:.71rem;
    color: rgba(24, 28, 40, 1);
  }
  span.currentPrice {
    font-size: 17px;
    font-family: ArialMT;
    font-weight: 400;
  }
  span {
    font-size: 14px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(240, 95, 92, 1);
  }
}
div.df_wh {
  width:1.34rem;
  height:.47rem;
  align-self: center;
}
</style>
