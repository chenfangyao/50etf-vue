<template>
  <div class="root-el">
    <div class="uni-tab-bar">
      <div class="swiper-tab uni-flex black2">
        <div v-for="(tab,i) in topTabs" :key="i" :class="['swiper-tab-list2',tabIndex==i ? 'active' : '']" :data-current="i" v-vtap="{method:tapTab}">{{tab.name}}</div>
      </div>
    </div>
    <!-- #ifdef H5 -->
    <div class="h358" id="canvas1" v-show="tabIndex==0">k线图1</div>
    <div class="h358" id="canvas2" v-show="tabIndex!=0">k线图2</div>
    <!-- #endif -->

  </div>
</template>
<script>
import echarts from 'echarts'
import { option, optionK, option1k, option5k, optionRk } from './echartOption.js'
import { fenshiT } from '@/components/qiQuanXiangQingSub/time.js'

import { mapState } from 'vuex';
import util from '@/common/util.js'

var h5Chart = null;//h5echarts实例
var h5ChartK = null;//h5echarts实例K线图

export default {
  data() {
    return {
      tabIndex: 0,
      echarts,
      maxBar: 0,//最大成交量
      Ymax: '',
      Ymin: '',
      resquestState: 1,//为1时可发请求
      stockInfo: {},//分时信息对象，内含最高，最低，昨收
      timmer: null,//分时线定时器
      topTabs: [
        {
          name: '分时',
        }, {
          name: '日K',
        }, {
          name: '周k',
        }, {
          name: '月k',
        },
      ],
    }
  },
  methods: {
    go() {
      //#ifdef APP-PLUS
     /*  plus.screen.lockOrientation("landscape-primary");
      this.$navigateTo({ url: '/pages/echarts/echarts?symbol=' + this.symbolStr }); */
      //#endif
    },
    tapTab(e) { //点击tab-bar
      if (this.tabIndex === e.target.dataset.current) return false;
      this.tabIndex = e.target.dataset.current
      this.$emit('change-i', this.tabIndex)
      if (!h5ChartK) {
        setTimeout(() => {
          h5ChartK = echarts.init(document.getElementById('canvas2'));
          h5ChartK.setOption(optionK)
        }, 50)
      }
      this.tabIndex != 0 && this.getDayK()

    },
    beginPolling() {
      this.timmer === null && (this.timmer = setInterval(() => this.getfenshi(), 30000))
    },
    getMaxBar(val) {
      this.maxBar < val && (this.maxBar = val)
    },
    calcMinMax() {
      var val = ''
      if (this.stockInfo.highPrice - this.stockInfo.preClosePrice >= this.stockInfo.preClosePrice - this.stockInfo.lowPrice) {
        val = Math.abs(this.stockInfo.highPrice - this.stockInfo.preClosePrice)
      } else {
        val = Math.abs(this.stockInfo.preClosePrice - this.stockInfo.lowPrice)
      }
      this.Ymax = (this.stockInfo.preClosePrice - 0 + val * 1.005).toFixed(4)
      this.Ymin = (this.stockInfo.preClosePrice - val * 1.005).toFixed(4)
    },
    dealFenshiData(arr) {
      var Yline = []
      var YBar = []
      var subBar = []
      arr.forEach((item, i) => {
        Yline.push(item.closePrice)
        this.getMaxBar(item.volume)
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
      let obj = {
        xAxis: [
          {
            data: fenshiT,
          },
          {
            data: fenshiT,
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
                  yAxis: (this.stockInfo.preClosePrice - 0).toFixed(4),
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
                var min = Number(this.Ymin)
                switch (num) {
                  case this.stockInfo.preClosePrice://没分到，出不来这种结果
                  case max:
                  case min:
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
            axisLabel: {
              formatter: (val, i) => {
                if (val == this.maxBar) return (this.maxBar / 10000 / 10000).toFixed(2) + '亿张'
                else return ''
              }
            },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }],
      }
      //#ifdef H5
      h5Chart.setOption(obj)
      //#endif
    },
    dealKData(arr) {
      this.maxBar = 0
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
        this.getMaxBar(item.amount)
        if (item.closePrice < item.openPrice) {
          subBar.push(-1)
        } else {
          subBar.push(1)
        }
        YBar.push(subBar)
      });
      let obj = optionK
      obj.xAxis[0].data = X
      /*  obj.yAxis[0].axisLabel.formatter = (val, i) => {
         var num = Number(val.toFixed(4))
         var max = Number(this.Ymax)
         // var midMax = (max - this.stockInfo.preClosePrice) / 2 + this.stockInfo.preClosePrice
         // midMax = Number(midMax.toFixed(4))
         var min = Number(this.Ymin)
         // var midMin = (this.stockInfo.preClosePrice - min) / 2 + min
         // midMin = Number(midMin.toFixed(4))
         switch (num) {
           case this.stockInfo.preClosePrice:
           case max:
           case min:
             return num
           default:
             return ''
         }
       } */
      obj.xAxis[1].data = X
      obj.series[5].data = YBar
      obj.yAxis[1].axisLabel.formatter = val => {
        if (val == this.maxBar) return (this.maxBar / 10000 / 10000).toFixed(2) + '亿张'
        else return ''
      }
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

    },
    getDayK() {
      let j = Number(this.tabIndex)
      let url = ''
      switch (j) {
        case 1: url = '/market/getStockStatDay'
          break
        case 2: url = '/market/getStockStatWeek'
          break
        case 3: url = '/market/getStockStatMonth'
          break
      }
      var options = {
        url,
        method:'GET',
        data: {
          period: 60,
          stockCodeInternal: this.commonstock[this.symbolStr].stockCodeInternal
        },
      }
      this.$httpReq(options).then((res) => {
        this.dealKData(res.mdata.list)
      })
    },
    getfenshi() {
      var options = {
        url: '/market/getTimeSharingInfo',
        method: 'GET',
        data: {
          stockCodeInternal: this.commonstock[this.symbolStr].stockCodeInternal,
        },
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
  computed: mapState(['commonstock']),

  mounted() {
    //#ifdef H5
    this.showH5Echarts()
    //#endif
  },
  beforeDestroy() {
    clearInterval(this.timmer)
    this.timmer=null
    //#ifdef H5
    h5Chart = null
    h5ChartK = null
    //#endif
  },
  created() {
    this.getfenshi()
   util.calcLegalTime() && this.beginPolling()
  }
}
</script>
<style lang="scss" scoped>
div.root-el {
  margin-bottom: 20px;
}
div.uni-tab-bar {
  .swiper-tab {
    border-bottom: 1px solid #f4f6f6;
    justify-content: space-around;
    padding:.10rem .56rem 0;
    height:.72rem;
    font-size: 14px;
    background-color: #ededed;
    .swiper-tab-list2.active {
      border-bottom: 2px solid #409de5;
      color: #409de5;
    }
    .swiper-tab-list2 {
      font-size:.30rem;
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
