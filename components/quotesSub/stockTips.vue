<template>
  <view class="stock50 uni-flex">
      <text class="stockNmae">50ETF</text>
      <!-- #ifndef H5 -->
      <view class="df_wh">
        <mpvue-echarts  :echarts="echarts" :onInit="onInit" ref="mpEcharts" canvasId="mini-canvas"/>
      </view>
      <!-- #endif -->
       <!-- #ifdef H5 -->
      <view class="df_wh" id="mini-canvas">缩略图</view>
      <!-- #endif -->
      <text class="currentPrice">2.4560</text>
      <text>0.0040</text>
      <text>0.16%</text>
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
  legend:{
    padding:0
  },
  yAxis: {
    show: false,
    type: 'value',
    min: function (value) {
      return value.min - 30;
    },
    max: function (value) {
      return value.max + 30;
    }
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
  methods: {
    showH5Echarts() {
      var myChart = echarts.init(document.getElementById('mini-canvas'));
      myChart.setOption(option);
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
  .df_wh {
    width: 124upx;
    height: 47upx;
    align-self: center;
  }
  text.stockNmae {
    font-size: 34upx;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(24, 28, 40, 1);
  }
  text.currentPrice {
    font-size: 34upx;
    font-family: ArialMT;
    font-weight: 400;
  }
  text {
    font-size: 28upx;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(240, 95, 92, 1);
  }
}
</style>
