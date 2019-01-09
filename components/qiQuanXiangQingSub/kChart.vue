<template>
  <view>
    <view class="uni-tab-bar">
      <view class="swiper-tab uni-flex">
        <view v-for="(tab,i) in topTabs" :key="i" :class="['swiper-tab-list2',tabIndex==i ? 'active' : '']" :data-current="i" @tap="tapTab">{{tab.name}}</view>
      </view>
    </view>
    <!-- #ifndef H5 -->
    <view class="h278" v-show="tabIndex==0" @tap='go'>
      <mpvue-echarts :echarts="echarts" ref='fenshi' lazyLoad :onInit="onInit" canvasId="m-canvas" />
    </view>
    <view class="h358" v-show="tabIndex!=0">
      <mpvue-echarts :echarts="echarts" ref='k_tu' lazyLoad :onInit="onInit2" canvasId="m-canvas2" />
    </view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="h278" id="canvas1" v-show="tabIndex==0">k线图1</view>
    <view class="h358" id="canvas2" v-show="tabIndex!=0">k线图2</view>
    <!-- #endif -->

  </view>
</template>
<script>
import echarts from 'echarts'
import mpvueEcharts from 'mpvue-echarts'
import { option, optionK, option1k, option5k, optionRk } from './EchartOption.js'
let chart = null;//AppEcharts实例
let chartK = null;//AppEcharts实例K线图


function initChart(canvas, width, height) {

  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart; // 返回 chart 后可以自动绑定触摸操作
}
function initChartK(canvas, width, height) {
  chartK = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chartK);
  chartK.setOption(optionK);
  return chartK; // 返回 chartK 后可以自动绑定触摸操作
}
var h5Chart = null;//h5echarts实例
var h5ChartK = null;//h5echarts实例K线图

export default {
  components: { mpvueEcharts },
  data() {
    return {
      tabIndex: 0,
      echarts,
      minFenshi: 100,//分时的最小值
      maxFenshi: 0,
      Ymax: '',
      Ymin: '',
      resquestState: 1,//为1时可发请求
      onInit: initChart,
      onInit2: initChartK,
      stockInfo: {},//分时信息对象，内含最高，最低，昨收
      checkTimmer: null,//监听mpvue-echart 加载完事件
      timmer1: null,//分时线定时器
      timmer2: null,//1分线定时器
      timmer3: null,//5分线定时器
      topTabs: [
        {
          name: '分时',
        }, {
          name: '日K',
        }, {
          name: '1分',
        }, {
          name: '5分',
        },
      ],
    }
  },
  methods: {
    go() {
      //#ifdef APP-PLUS
      // plus.screen.lockOrientation("landscape-primary");
      // uni.navigateTo({ url: '/pages/echarts/echarts?symbol=' + this.symbolStr });
      //#endif
    },
    checkOready(i, obj) {
      this.checkTimmer = setInterval(() => {
        var el = i == 1 ? chart : chartK
        if (el !== null) {
          el.setOption(obj)
          clearInterval(this.checkTimmer)
        }
      }, 10)
    },
    tapTab(e) { //点击tab-bar
      if (this.tabIndex === e.target.dataset.current) return false;
      this.tabIndex = e.target.dataset.current
      this.$emit('change-i', this.tabIndex)
      let j = 1
      switch (Number(this.tabIndex)) {
        case 1: j = 4
          break
        case 2: j = 1
          break
        case 3: j = 2
          break
      }
      //#ifdef H5
      if (!h5ChartK) {
        setTimeout(() => {
          h5ChartK = echarts.init(document.getElementById('canvas2'));
          h5ChartK.setOption(optionK)
        }, 50)
      }
      //#endif
      this.getDayK(j)

    },
    beginPolling() {
      this.timmer1 === null && (this.timmer1 = setInterval(() => this.getfenshi(), 30000))

    },
    beginPollingK() {
      if (h5ChartK || chartK) {//定时器未加！！
        this.timmer2 === null && (this.timmer2 = setInterval(() => this.getDayK(), 3000))
        this.timmer3 === null && (this.timmer3 = setInterval(() => this.getDayK(2), 60000 * 3))
      }
    },
    getMinMax(val) {
      this.minFenshi > val && (this.minFenshi = val)
      this.maxFenshi < val && (this.maxFenshi = val)
    },
    calcMinMax() {
      var val = ''
      if (this.stockInfo.highPrice - this.stockInfo.preClosePrice >= this.stockInfo.preClosePrice - this.stockInfo.lowPrice) {
        val = Math.abs(this.stockInfo.highPrice - this.stockInfo.preClosePrice)
      } else {
        val = Math.abs(this.stockInfo.preClosePrice - this.stockInfo.lowPrice)
      }
      this.Ymax = (this.stockInfo.preClosePrice + val * 1.005).toFixed(4)
      this.Ymin = (this.stockInfo.preClosePrice - val * 1.005).toFixed(4)
      console.log(this.stockInfo);
    },
    dealFenshiData(arr) {
      var X = [, , ,]
      var Yline = []
      var YBar = []
      var subBar = []
      arr.forEach((item, i) => {
        X.push(item.minute)
        Yline.push(item.closePrice)
        this.getMinMax(item.closePrice)
        subBar = [item.minute]
        subBar.push(item.volume)
        if (i == 0) {
          subBar.push(1)
        }
        else if (item.closePrice < arr[i - 1].closePrice) {
          subBar.push(-1)
        } else {
          subBar.push(1)
        }
        YBar.push(subBar)
      });

      this.calcMinMax()
      X.length < 240 && (X.length = 240)
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
            name: '当前价',
            data: Yline,
            markLine: {
              symbol: ['none', 'none'],
              lineStyle: { opacity: 0.5 },
              data: [
                {
                  yAxis: this.stockInfo.preClosePrice.toFixed(4),
                  lineStyle: { color: '#e6aa12', opacity: 1 },
                  label: { formatter: '0.00%' },
                },
                {
                  yAxis: this.Ymax + '',
                  label: { formatter: () => ((this.Ymax - this.stockInfo.preClosePrice) / this.stockInfo.preClosePrice * 100).toFixed(2) + '%' }
                },
                {
                  yAxis: this.Ymin + '',
                  label: { formatter: () => ((this.Ymin - this.stockInfo.preClosePrice) / this.stockInfo.preClosePrice * 100).toFixed(2) + '%' }

                },

              ]
            }
          },
          {
            name: '成交量',
            data: YBar,
          }
        ],
        yAxis: [
          {
            max: this.Ymax,
            min: this.Ymin,
            axisLabel: {
              formatter: (val, i) => {
                var num = Number(val.toFixed(4))
                var max = Number(this.Ymax)
                var midMax = (max - this.stockInfo.preClosePrice) / 2 + this.stockInfo.preClosePrice
                midMax = Number(midMax.toFixed(4))
                var min = Number(this.Ymin)
                var midMin = (this.stockInfo.preClosePrice - min) / 2 + min
                midMin = Number(midMin.toFixed(4))
                switch (num) {
                  case this.stockInfo.preClosePrice:
                  case max:
                  case min:
                  case midMax:
                  case midMin:
                    return num
                  default:
                    return ''
                }
              }
            },

          },
          {
            scale: true,
            gridIndex: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }],
      }
      //#ifdef H5
      h5Chart.setOption(obj)
      //#endif
      //#ifndef H5
      if (chart) {
        chart.setOption(obj)
      } else {
        this.$refs.fenshi.init()
        this.checkOready(1, obj)
      }
      //#endif
    },
    dealKData(arr) {
      var X = []
      var YBar = []
      var subBar = []
      var MA_k = [[], [], [], [], []]
      arr.forEach(item => {
        subBar = [item.tradeDate]
        X.push(item.tradeDate)
        MA_k[0].push([item.openPrice, item.closePrice, item.lowPrice, item.highPrice])
        MA_k[1].push(item.ma5)
        MA_k[2].push(item.ma10)
        MA_k[3].push(item.ma20)
        MA_k[4].push(item.ma30)
        subBar.push(item.amount)
        if (item.closePrice < item.openPrice) {
          subBar.push(-1)
        } else {
          subBar.push(1)
        }
        YBar.push(subBar)
      });
      let obj = optionK
      if (this.tabIndex == 2) {
        X.length < 237 && (X.length = 237)
        obj = option1k
      } else if (this.tabIndex == 1) {
        X.length < 60 && (X.length = 60)
      }
      obj.xAxis[0].data = X
      obj.xAxis[1].data = X
      obj.series[5].data = YBar
      for (let i = 0; i < MA_k.length; i++) {
        obj.series[i].data = MA_k[i]
      }
      obj.series[0].itemStyle = {
        color: '#f05f5c',
        color0: '#3aba8f',
        borderColor: '#f05f5c',
        borderColor0: '#3aba8f'
      }
      //#ifdef H5
      h5ChartK && h5ChartK.setOption(obj, true)
      //#endif
      //#ifndef H5
      if (chartK) {
        chartK.setOption(obj, true)
      } else {
        setTimeout(() => {
          this.$refs.k_tu.init()
          this.checkOready(2, obj)
        }, 50)
      }
      //#endif

    },
    getDayK(j = 1) {
      var options = {
        url: '/fiftyEtf/QryKLine',
        method: 'POST',
        data: {
          symbol: this.symbolStr,
          type: j
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$httpReq(options).then((res) => {
        this.dealKData(res.mdata.list)
      })
    },
    getfenshi() {
      var options = {
        url: '/fiftyEtf/QryMinuteLine',
        method: 'POST',
        data: {
          symbol: this.symbolStr,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$httpReq(options).then((res) => {
        if (res.result == 1) {
          this.stockInfo = res.mdata.stockInfo
          this.dealFenshiData(res.mdata.timeSharingList[0].periodData)

        }
      })
    },

    showH5Echarts() {
      h5Chart = echarts.init(document.getElementById('canvas1'));
      h5Chart.setOption(option)
    },
  },
  props: ['chartHeight', 'symbolStr'],
  mounted() {
    //#ifdef H5
    this.showH5Echarts()
    //#endif
  },
  beforeDestroy() {
    clearInterval(this.timmer1)
    clearInterval(this.checkTimmer)
    //#ifdef H5
    h5Chart = null
    h5ChartK = null
    //#endif
    //#ifndef H5
    chart = null
    chartK = null
    //#endif
  },
  created() {
    this.getfenshi()
    this.beginPolling()
  }
}
</script>
<style lang="scss" scoped>
view.uni-tab-bar {
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
.h278 {
  height: 278px;
}
.h358 {
  height: 324px;
}
</style>
