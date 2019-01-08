<template>
  <view class="stock50 uni-flex" @tap='go'>
      <text class="stockNmae">50ETF</text>
      <!-- #ifndef H5 -->
      <view class="df_wh">
        <mpvue-echarts  :echarts="echarts" :onInit="onInit"  canvasId="mini-canvas2"/>
      </view>
      <!-- #endif -->
       <!-- #ifdef H5 -->
      <view class="df_wh" id="mini-canvas">缩略图</view>
      <!-- #endif -->
      <view class="txtContainer">
				<text class="currentPrice">{{commonstock[0]?commonstock[0].latestPrice:0}}</text>
				<text>{{commonstock[0]?commonstock[0].priceChange:0}}</text>
				<text>{{commonstock[0]?commonstock[0].priceChangeRate:0}}%</text>
      </view>
    </view>
</template>
<script>
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'
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
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(option);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}
export default {
  components: {
    mpvueEcharts
  },
  data() {
    return {
      echarts,
      onInit: initChart, //异步获取数据后，不能在回调中传该函数
    }
  },
	props:['commonstock'],
  methods: {
    showH5Echarts() {
      var myChart = echarts.init(document.getElementById('mini-canvas'));
      myChart.setOption(option);
    },
    go() {
      uni.navigateTo({ url: '/pages/stock_detail/stock_detail?index=0' })
    }
  },
  mounted() {
    //#ifdef H5
    this.showH5Echarts()
    //#endif
  }
}
</script>

<style lang="scss" scoped>
view.stock50 {
  height: 84upx;
  line-height: 84upx;
  justify-content: space-between;
  padding: 0 27upx;
  border-top: 1px solid #ededed;
  border-bottom: 12upx solid #ededed;
  view.txtContainer {
    width: 50%;
    display: flex;
    justify-content: space-between;
    line-height: 71upx;
  }
  text.stockNmae {
    font-size: 17px;
    font-family: ArialMT;
    font-weight: 400;
    line-height: 71upx;
    color: rgba(24, 28, 40, 1);
  }
  text.currentPrice {
    font-size: 17px;
    font-family: ArialMT;
    font-weight: 400;
  }
  text {
    font-size: 14px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(240, 95, 92, 1);
  }
}
view.df_wh {
  width: 134upx;
  height: 47upx;
  align-self: center;
}
</style>
