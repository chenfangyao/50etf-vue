<template>
  <view>
    <view class="uni-tab-bar">
      <view class="swiper-tab uni-flex">
        <view v-for="(tab,index) in tabBars" :key="index" :class="['swiper-tab-list2',tabIndex==index ? 'active' : '']" :data-current="index" @tap="tapTab">{{tab.name}}</view>
      </view>
    </view>
    <view class="h556" id="canvas1">k线图</view>

  </view>
</template>
<script>
import echarts from 'echarts'
var option = {
  xAxis: {
    data: [],
    axisLine: {
      show: false
    },
   /*  min: function (value) {
      return '09:00';
    },
    max: function (value) {
      return '15:00';
    }, */
    boundaryGap: ['0%', '0%']
  },
  legend: {
    padding: 0,
  },
  color: '#4AB9BB',
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    splitLine:{interval:0},
    axisTick: { show: false },
    axisLabel: {
      inside: true,
      margin: 3,
    }
    
  },
  grid: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 60
  },
  series: [{
    data: [15, 20, 36, 26, 2, 11, 12, 14, 10, 26, 2, 11, 12],
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
  ]
}
export default {
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
    }
  },
  methods: {
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
