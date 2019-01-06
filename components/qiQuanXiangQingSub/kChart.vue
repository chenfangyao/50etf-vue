<template>
  <view>
    <view class="uni-tab-bar">
      <view class="swiper-tab uni-flex">
        <view v-for="(tab,i) in topTabs" :key="i" :class="['swiper-tab-list2',tabIndex==i ? 'active' : '']" :data-current="i" @tap="tapTab">{{tab.name}}</view>
      </view>
    </view>
    <!-- #ifndef H5 -->
    <view class="h278" v-show="tabIndex==0"  @tap='go'>
      <mpvue-echarts :echarts="echarts" ref='fenshi' lazyLoad  :onInit="onInit" canvasId="m-canvas" />
    </view>
    <view class="h358" v-show="tabIndex!=0">
      <mpvue-echarts :echarts="echarts" ref='k_tu' lazyLoad  :onInit="onInit2" canvasId="m-canvas2" />
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
import { commonOption, option, optionK } from './EchartOption.js'
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
      resquestState: 1,//为1时可发请求
      onInit: initChart,
      onInit2: initChartK,
      checkTimmer: null,//监听mpvue-echart 加载完事件
      timmer1: null,//分时线定时器
      timmer2: null,//1分线定时器
      timmer3: null,//5分线定时器
      fenshiData: [],//分时图总数据
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
      // uni.navigateTo({ url: '/pages/echarts/echarts' });
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
        }, 0)
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
    dealFenshiData(arr) {
      // if (arr.length === this.fenshiData.length) return;
      var X = []
      var Yline = []
      var YBar = []
      arr.forEach(item => {
        X.push(item.minute)
        Yline.push(item.closePrice)
        YBar.push(item.volume)
      });
      X.length < 237 && (X.length = 237)
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
          },
          {
            name: '成交量',
            data: YBar,
          }
        ]
      }
      this.fenshiData = arr
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
      //#ifdef H5
      h5ChartK && h5ChartK.setOption(obj)
      //#endif
      //#ifndef H5
      if (chartK) {
        chartK.setOption(obj)
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
