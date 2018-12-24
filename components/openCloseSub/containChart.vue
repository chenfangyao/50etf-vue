<template>
  <view class="uni-flex wrap">
    <view class="info">
      <view class="line1">
        <text>购12月2250</text>
        <text>10001493</text>
      </view>
      <view class="uni-flex line2">
        <view>{{newprices}}</view>
        <view>
          <h6>-0.00095</h6>
          <h6>-4.75%</h6>
        </view>
      </view>
      
    </view>
   <!-- #ifndef H5 -->
    <view class="df_wh">
        <mpvue-echarts  :echarts="echarts" :onInit="onInit" canvasId="canvas2"/>
    </view>
  <!-- #endif -->
  <!-- #ifdef H5 -->
      <view class="df_wh" id="canvas2">缩略图</view>
  <!-- #endif -->
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
  grid: {
    left: 0,
    right: 0,
    top: 3,
    bottom: 3
  },
  animation: false,

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
			newprices:'0.2527'
    }
  },
  methods: {
    showH5Echarts() {
      var myChart = echarts.init(document.getElementById('canvas2'));
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
view.wrap {
  padding: 26upx;
  background-color: #fff;
  view.info {
    view.line1 {
      font-size: 13px;
      color: rgba(130, 133, 151, 1);
      text:first-child {
        color: #181c28;
        margin-right: 21upx;
      }
    }
    view.line2 {
      > view:first-child {
        font-size: 32px;
        font-weight: bold;
        color: rgba(240, 95, 92, 1);
        margin-right: 26upx;
      }
      > view {
        align-self: center;
      }
    }
    h6 {
      font-size: 12px;
      margin: 0 0 10upx 0;
      line-height: 12px;
      font-weight: 400;
      color: rgba(240, 95, 92, 1);
    }
  }
  view.df_wh {
    height: 80px;
    flex-grow: 1;
  }
}
</style>
