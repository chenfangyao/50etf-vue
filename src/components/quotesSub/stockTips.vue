<template>
  <div class="stock50 uni-flex black2 " v-vtap="{method:go}">
      <span class="stockNmae textc1" >50ETF</span>
      <div class="df_wh" id="mini-canvas"></div>
      <div class="txtContainer">
				<span class="currentPrice">{{commonstock[0]?commonstock[0].latestPrice:0}}</span>
				<span>{{commonstock[0]?commonstock[0].priceChange:0}}</span>
				<span>{{commonstock[0]?commonstock[0].priceChangeRate:0}}%</span>
      </div>
    </div>
</template>
<script>
import echarts from 'echarts'
let myChart = null;

var option = {
  xAxis: {
    data: [],
    show: false,
  },
  legend: {
    padding: 0
  },
  animation: false,
  grid: {
    left: 0,
    right: 0,
    top: 3,
    bottom: 3
  },
  yAxis: {
    show: false,
    type: 'value',
     min:'dataMin',
    max:'dataMax'
  },
  series: [{
    data: [],
    type: 'line',
    symbol: 'none',

  }]
}
export default {
  data() {
    return {
      echarts,
      timmer:null
    }
  },
	props:['commonstock'],
  methods: {
    showH5Echarts() {
       myChart = echarts.init(document.getElementById('mini-canvas'));
    },
    go() {
      this.$navigateTo({ url: '/stock_detail',query:{index:0} })
    },
    getfenshi() {
      var options = {
        url: '/market/getTimeSharingInfo',
        method: 'GET',
        data: {
          stockCodeInternal: 510050,
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.$httpReq(options).then((res) => {
        if (res.result == 1) {
          this.dealFenshiData(res.mdata.timeSharingList[0].periodData);
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
        myChart.setOption(option)
      }
    },
  },
  deactivated(){clearInterval(this.timmer)},

  mounted() {
   this.showH5Echarts()
   this.getfenshi()
   this.timmer=setInterval(()=>this.getfenshi(),12000)
  },
}
</script>

<style lang="scss" scoped>
div.stock50 {
  height:.84rem;
  line-height:.84rem;
  justify-content: space-between;
  padding: 0 .27rem;
  border-top: 1px solid #ededed;
  border-bottom:.12rem solid #ededed;
  div.txtContainer {
    width: 50%;
    display: flex;
    justify-content: space-between;
    line-height:.71rem;
  }
  span.stockNmae {
    font-size: 17px;
    font-family: ArialMT;
    font-weight: 400;
    line-height:.71rem;
    color: rgba(24, 28, 40, 1);
  }
  span.currentPrice {
    font-size: 17px;
    font-family: ArialMT;
    font-weight: 400;
  }
  span {
    font-size: 14px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(240, 95, 92, 1);
  }
}
div.df_wh {
  width:1.34rem;
  height:.47rem;
  align-self: center;
}
</style>
