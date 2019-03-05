<template>
  <div class="uni-flex root-el">
    <div class="info">
      <div class="line1">
        <!-- <span>购12月2250</span> -->
        <span>{{resObj.stockName | dealName}}</span>
        <span>({{resObj.stockCode}})</span>
      </div>
      <div class="uni-flex line2" :class="{lt0:resObj.priceChange<0}">
        <div>{{resObj.latestPrice | fix4}}</div>
        <div>
          <h6>{{resObj.priceChange}}</h6>
          <h6>{{resObj.priceChangeRate}}%</h6>
        </div>
      </div>
    </div>
    <div class="df_wh" id="canvas3">缩略图</div>
  </div>
</template>
<script>
import echarts from 'echarts'

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
    min:'dataMin',
    max:'dataMax'
  },
  series: [{
    // data: [15, 20, 36, 14, 10, 26,11,21,33,29,16,25,18,15,35],
    data: [],
    type: 'line',
    symbol: 'none',
    smooth: true,
    lineStyle:{color:'#ec605e'}
  }]
}
var echartInstance = null
export default {
  data() {
    return {
    }
  },
  props: {
    resObj: {
      default() { return {} },
    },
    symbolStr: {
      default: ''
    }
  },
  mounted() {
    echartInstance = echarts.init(document.getElementById('canvas3'))
  },
  filters: {
    dealName(val) {
      if (val) return val.substring(5)
      else return ''
    },
    fix4(val) {
      if (val === undefined) {
        return
      } else {
        return Number(val).toFixed(4)
      }
    }
  },
  methods: {
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
    dealFenshiData(arr) {
      var Yline = []
      arr.slice(-15).forEach((item, i) => {
        Yline.push(item.closePrice)
      });
      if (Yline.length > 5) {
        option.series[0].data = Yline
        if(this.resObj.priceChange<0){
          option.series[0].lineStyle.color='#1bd091'
        }else{
          option.series[0].lineStyle.color='#ec605e'
        }
        echartInstance.setOption(option)
      }
    },
  },
  watch: {
    symbolStr(val) {
      if (val !== '') this.getfenshi()
    }
  }
}
</script>
<style lang="scss" scoped>
div.root-el {
  padding: 0.26rem 0.26rem 0;
  background-color: #fff;
  justify-content: space-between;
  div.info {
    div.line1 {
      font-size: 14px;
      span {
        color: 333;
      }
    }
    div.line2 {
      color: $red1;
      > div:first-child {
        font-size: 32px;
        font-weight: bold;
        margin-right: 0.26rem;
      }
      > div {
        align-self: center;
      }
      h6 {
        font-size: 12px;
        margin: 0 0 0.1rem 0;
        line-height: 12px;
        font-weight: 400;
      }
    }
    div.line2.lt0{
      color: $green1;

    }
  }
  div.df_wh {
    height: 70px;
    width: 180px;
  }
}
</style>
