<template>
  <view class="echarts-wrap">
    <!-- #ifndef H5 -->
    <mpvue-echarts :echarts="echarts" :onInit="onInit" ref='k_tu' lazyLoad canvasId="demo-canvas2" />
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view>在h5环境显示此文本</view>
    <!-- #endif -->
  </view>
</template>

<script>
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'
import { commonOption, optionK } from '@/components/qiQuanXiangQingSub/EchartOption.js'

let chartK = null;
var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';


function initChart(canvas, width, height) {

  chartK = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chartK);
  chartK.setOption(optionK);

  return chartK; // 返回 chartK 后可以自动绑定触摸操作
}
export default {
  components: {
    mpvueEcharts
  },
  data() {
    return {
      echarts,
      onInit: initChart, //异步获取数据后，不能在回调中传该函数
      checkTimmer: null,//监听mpvue-echart初始化的定时器
      timmer1: null,//定时获取1分k
      symbolStr: ''
    }
  },
  onBackPress() {
    plus.screen.lockOrientation("portrait-primary");
    clearInterval(this.timmer1)
  },
  onUnload() {
    plus.screen.lockOrientation("portrait-primary");
    clearInterval(this.timmer1)
  },
  methods: {
    checkOready(i, obj) {
      this.checkTimmer = setInterval(() => {
        var el = i == 1 ? chart : chartK
        if (el !== null) {
          el.setOption(obj)
          clearInterval(this.checkTimmer)
          this.checkTimmer = null
        }
      }, 10)
    },
    dealKData(arr) {
      var X = []
      var Yk = []
      var YBar = []
      var MA5 = []
      var MA10 = []
      var MA20 = []
      var MA30 = []
      arr.forEach(item => {
        X.push(item.tradeDate)
        Yk.push([item.openPrice, item.closePrice, item.lowPrice, item.highPrice])
        YBar.push(item.amount)
        MA5.push(item.ma5)
        MA10.push(item.ma10)
        MA20.push(item.ma20)
        MA30.push(item.ma30)
      });
      // X.length < 237 && (X.length = 237)
      let obj = {
        xAxis: [
          {
            data: X,
          },
          {
            data: X,
          }],
        series: [
          {
            name: 'K',
            data: Yk,
          },
          {
            name: 'MA5',
            data: MA5,
          },
          {
            name: 'MA10',
            data: MA10,
          },
          {
            name: 'MA20',
            data: MA20,
          },
          {
            name: 'MA30',
            data: MA30,
          },
          {
            name: '成交量',
            data: YBar,
          }
        ]
      }
      if (chartK) {
        chartK.setOption(obj)
      } else {
        setTimeout(() => {
          this.$refs.k_tu.init()
          this.checkOready(2, obj)
        }, 50)
      }

    },
    getDayK() {
      var options = {
        url: '/fiftyEtf/QryKLine',
        method: 'POST',
        data: {
          symbol: this.symbolStr,
          type: 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$httpReq(options).then((res) => {
        this.dealKData(res.mdata.list)
      })
    },
  },
  onLoad(opt) {
    this.symbolStr = opt.symbol
    this.getDayK()
    this.timmer1 = setInterval(() => {
      this.getDayK()
    }, 1000)
  },
}
</script>

<style scoped>
.echarts-wrap {
  width: 100%;
  height: 100vh;
}
</style>
