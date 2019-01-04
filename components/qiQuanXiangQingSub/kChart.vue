<template>
  <view>
    <view class="uni-tab-bar">
      <view class="swiper-tab uni-flex">
        <view v-for="(tab,i) in topTabs" :key="i" :class="['swiper-tab-list2',tabIndex==i ? 'active' : '']" :data-current="i" @tap="tapTab">{{tab.name}}</view>
      </view>
    </view>
    <!-- #ifndef H5 -->
    <view class="h278" v-show="tabIndex==0"  @tap='go'>
      <mpvue-echarts :echarts="echarts"  :onInit="onInit" canvasId="m-canvas" />
    </view>
    <view class="h358" v-show="tabIndex!=0">
      <!-- <mpvue-echarts :echarts="echarts"  :onInit="onInit2" canvasId="m-canvas2" /> -->
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
let chart = null;//Appecharts实例
var h5Chart = null;//h5echarts实例
let chartK = null;//Appecharts实例K线图
var h5ChartK = null;//h5echarts实例K线图
import { commonOption, option, optionK, initChart } from './EchartOption.js'


export default {
  components: { mpvueEcharts },
  data() {
    return {
      tabIndex: 0,
      echarts,
      resquestState: 1,//为1时可发请求
      onInit: initChart,
      // onInit2: initChart(chartK),
      fenshiData: [],//分时图总数据
      topTabs: [
        {
          name: '分时',
          timmer: null
        }, {
          name: '日K',
          timmer: null
        }, {
          name: '1分',
          timmer: null
        }, {
          name: '5分',
          timmer: null
        },
      ],
    }
  },
  methods: {
    go() {
      //#ifdef APP-PLUS
      plus.screen.lockOrientation("landscape-primary");
      uni.navigateTo({ url: '/pages/echarts/echarts' });
      //#endif
    },
    tapTab(e) { //点击tab-bar
      if (this.tabIndex === e.target.dataset.current) {
        return false;
      } else {
        this.tabIndex = e.target.dataset.current
        this.$emit('change-i', this.tabIndex)
        setTimeout(() => {
          h5ChartK = echarts.init(document.getElementById('canvas2'));
          h5ChartK.setOption(optionK)
        }, 0)
        this.getDayK()
      }
    },
    beginPolling() {
      if (this.topTabs[0].timmer === null) {
        console.log('开启定时');
        this.topTabs[0].timmer = setInterval(() => this.getfenshi(), 30000)
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
      console.log(chart);
      chart && chart.setOption(obj)
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
      h5ChartK.setOption(obj)
    },
    showH5Echarts() {
      h5Chart = echarts.init(document.getElementById('canvas1'));
      h5Chart.setOption(option)

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
  },
  props: ['chartHeight', 'symbolStr'],
  mounted() {
    //#ifdef H5
    this.showH5Echarts()
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
  height: 358px;
}
</style>
