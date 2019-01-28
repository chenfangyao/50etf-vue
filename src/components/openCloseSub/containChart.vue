<template>
  <div class="uni-flex wrap">
    <div class="info">
      <div class="line1">
        <!-- <span>购12月2250</span> -->
        <span>{{subCodeName}}</span>
        <span>({{resObj.stockCode}})</span>
      </div>
      <div class="uni-flex line2">
        <div>{{resObj.latestPrice}}</div>
        <div>
          <h6>{{resObj.priceChange}}</h6>
          <h6>{{resObj.priceChangeRate}}%</h6>
        </div>
      </div>

    </div>
    <div class="df_wh" id="canvas2">缩略图</div>
  </div>
</template>
<script>
import echarts from 'echarts'
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
export default {
  data() {
    return {
      echarts,
      subCodeName: '',//处理子字符串
      newprices: '0.2527'
    }
  },
  methods: {
    showH5Echarts() {
      var myChart = echarts.init(document.getElementById('canvas2'));
      myChart.setOption(option);
    },

  },
  watch: {
    resObj: {
      handler(val) {
        this.subCodeName = val.stockName.substring(5)
      },
      deep: true
    }
  },
  props: ['resObj'],
  mounted() {
    //#ifdef H5
    this.showH5Echarts()
    //#endif
  }
}
</script>
<style lang="scss" scoped>
div.wrap {
  padding:.26rem .26rem 0;
  background-color: #fff;
  div.info {
    div.line1 {
      font-size: 14px;
      span {
        color: 333;
      }
    }
    div.line2 {
      > div:first-child {
        font-size: 32px;
        font-weight: bold;
        color: rgba(240, 95, 92, 1);
        margin-right:.26rem;
      }
      > div {
        align-self: center;
      }
    }
    h6 {
      font-size: 12px;
      margin: 0 0 .10rem 0;
      line-height: 12px;
      font-weight: 400;
      color: rgba(240, 95, 92, 1);
    }
  }
  div.df_wh {
    height: 80px;
    flex-grow: 1;
	width: 180px;
  }
}
</style>
