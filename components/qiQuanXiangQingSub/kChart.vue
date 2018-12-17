<template>
  <view>
    <view class="uni-tab-bar">
      <view class="swiper-tab uni-flex">
        <view v-for="(tab,index) in tabBars" :key="index" :class="['swiper-tab-list2',tabIndex==index ? 'active' : '']" :data-current="index" @tap="tapTab">{{tab.name}}</view>
      </view>
    </view>
    <!-- #ifndef H5 -->
    <view class="h556" @tap='go'>
      <mpvue-echarts  :echarts="echarts" :onInit="onInit" ref="mpEcharts" canvasId="m-canvas"/>
    </view>
    <!-- #endif -->
     <!-- #ifdef H5 -->
    <view class="h556" id="canvas1">k线图2</view>
    <!-- #endif -->

  </view>
</template>
<script>
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'
let chart = null;
var volumes = [86160000, 79330000, 102600000, 104890000, 85230000, 115230000, 99410000, 90120000, 79990000, 107100000, 81020000, 91710000, 84510000, 118160000, 89390000, 89820000, 100210000, 102720000, 134120000, 83770000, 92570000, 109090000, 100920000, 136670000, 80100000, 97060000, 95020000, 81530000, 80020000, 85590000, 75790000, 87390000, 88560000, 86640000, 88440000, 103260000, 79120000, 95530000, 111990000, 87790000, 86480000, 79180000, 68940000, 73190000, 147390000, 78530000, 75560000, 82270000, 71870000, 78750000, 71260000, 69690000, 90540000, 101690000, 93740000, 94130000, 91950000, 248680000, 99380000, 85130000, 89440000];
var dates = ["2016-03-29", "2016-03-30", "2016-03-31", "2016-04-01", "2016-04-04", "2016-04-05", "2016-04-06", "2016-04-07", "2016-04-08", "2016-04-11", "2016-04-12", "2016-04-13", "2016-04-14", "2016-04-15", "2016-04-18", "2016-04-19", "2016-04-20", "2016-04-21", "2016-04-22", "2016-04-25", "2016-04-26", "2016-04-27", "2016-04-28", "2016-04-29", "2016-05-02", "2016-05-03", "2016-05-04", "2016-05-05", "2016-05-06", "2016-05-09", "2016-05-10", "2016-05-11", "2016-05-12", "2016-05-13", "2016-05-16", "2016-05-17", "2016-05-18", "2016-05-19", "2016-05-20", "2016-05-23", "2016-05-24", "2016-05-25", "2016-05-26", "2016-05-27", "2016-05-31", "2016-06-01", "2016-06-02", "2016-06-03", "2016-06-06", "2016-06-07", "2016-06-08", "2016-06-09", "2016-06-10", "2016-06-13", "2016-06-14", "2016-06-15", "2016-06-16", "2016-06-17", "2016-06-20", "2016-06-21", "2016-06-22"];
var option = {
  xAxis: [{
    axisLine: {
      show: false
    },
    //  min: function (value) {
    //    return 1;
    //  },
    max: 'dataMax',
    min: 'dataMin',
    data: []
  }, {
    type: 'category',
    gridIndex: 1,
    data: dates,
    scale: true,
    boundaryGap: false,
    splitLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisLine: { show: false },
    splitNumber: 20,
    min: 'dataMin',
    max: 'dataMax',
  }
  ],
  legend: {
    padding: 0,
  },
  color: '#4AB9BB',
  yAxis: [
    {
      axisLine: {
        show: false
      },
      position: 'left',
      nameLocation: 'start',
      axisLabel: {
        inside: true,
        margin: 3,
      }

    }, {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },],
  grid: [
    {
      left: 10,
      right: 10,
      top: 10,
      bottom: 100
    },
    {
      left: 10,
      right: 10,
      top: 200,
      bottom: 10
    },
  ],
  series: [
    {
      data: [15, 20, 36, 26, 2, 11, 12, 14, 100, 26, 2, 11, 12],
      areaStyle: {
        opacity: 0.5,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#54DDDC' // 0% 处的颜色
          }, {
            offset: 1, color: '#ffffff' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      },
      type: 'line',
      symbol: 'none'
    },
    {
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: '#7fbe9e'
        },
        emphasis: {
          color: '#140'
        }
      },
      data: volumes
    }
  ]
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
  components: { mpvueEcharts },
  data() {
    return {
      tabBars: [
        {
          name: '分时',
        }, {
          name: '5日',
        }, {
          name: '日K',
        }, {
          name: '周K',
        }, { name: '月K', },
      ],
      tabIndex: 0,
      echarts,
      onInit: initChart, //异步获取数据后，不能在回调中传该函数
    }
  },
  methods: {
    go() {
      //#ifdef APP-PLUS
      uni.navigateTo({
        url: '/platforms/app-plus/fullscreen/fullscreen',
      });
      //#endif
    },
    tapTab(e) { //点击tab-bar
      if (this.tabIndex === e.target.dataset.current) {
        return false;
      } else {
        this.isClickChange = true;
        this.tabIndex = e.target.dataset.current
      }
    },
    showH5Echarts() {
      var myChart = echarts.init(document.getElementById('canvas1'));
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
view.uni-tab-bar {
  .list2 {
    height: 400px;
  }
  .swiper-tab {
    border-bottom: 1px solid #f4f6f6;
    justify-content: space-between;
    padding: 10upx 25upx 0;
    height: 72upx;
    font-size: 14px;
    background-color: #ededed;
    .swiper-tab-list2.active {
      border-bottom: 2px solid #409de5;
      color: #409de5;
    }
    .swiper-tab-list2 {
      font-size: 30upx;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #707680;
    }
  }
}
  view.h556 {
    height: 556upx;
  }
</style>
