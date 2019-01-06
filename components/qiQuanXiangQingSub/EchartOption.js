export var commonOption = {
  //#ifdef H5
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    position(pos, params, el, elRect, size) {
      var obj = {
        top: 60
      };
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      return obj;
    }
  },
  //#endif
  animation: false,
  xAxis: [
    {
      data: [],
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false, },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    {
      gridIndex: 1,
      data: [],
      boundaryGap: false,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
    }],
  yAxis: [
    {
      scale: true,
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    {
      scale: true,
      gridIndex: 1,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }],
  itemStyle: { color: '#7fbe9e' },

}
export var optionK = {
  ...commonOption,
  legend: {
    data: ['MA5', 'MA10', 'MA20', 'MA30']
  },
  grid: [
    {
      left: 0,
      right: 0,
      top: 10,
      bottom: 100,
    },
    {
      left: 0,
      right: 0,
      top: 214,
      bottom: 0
    },
  ],
  title: {
    text: '',
    left: 0
  },
  series: [
    {
      name: 'K',
      type: 'candlestick',
      data: [],
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        normal: {
          color: '#ec0000',
          color0: '#00da3c',
          borderColor: '#8A0000',
          borderColor0: '#008F28'
        }
      },
    },
    {
      name: 'MA5',
      type: 'line',
      data: [],
      symbol: 'none',
      xAxisIndex: 0,
      yAxisIndex: 0,
      smooth: true,
      lineStyle: {
        normal: { opacity: 0.5 }
      },
      itemStyle: { color: '#ec605e' }
    },
    {
      name: 'MA10',
      type: 'line',
      symbol: 'none',
      data: [],
      xAxisIndex: 0,
      yAxisIndex: 0,
      smooth: true,
      itemStyle: { color: '#3aba8f' },
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    },
    {
      name: 'MA20',
      type: 'line',
      symbol: 'none',
      data: [],
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: { color: '#409de5' },
      smooth: true,
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    },
    {
      name: 'MA30',
      type: 'line',
      symbol: 'none',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: [],
      smooth: true,
      itemStyle: { color: '#e6aa12' },
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    },
    {
      type: 'bar',
      name: '成交量',
      data: [],
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
    }
  ]
}
export var option = {
  ...commonOption,
  grid: [
    {
      left: 3,
      right: 0,
      top: 5,
      bottom: 120,
    },
    {
      left: 3,
      right: 0,
      top: 158,
      bottom: 0
    },
  ],
  itemStyle: { color: '#7fbe9e' },
  /* dataZoom: [
    {
      type: 'inside',
      start: 50,
      end: 100,
      zoomLock: true,
      throttle: 0,
    },
  ],  */
  /* legend: {
     data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
   }, */
  series: [
    {
      name: '当前价',
      type: 'line',
      data: [],
      symbol: 'none',
      lineStyle: {
        normal: { opacity: 0.5 }
      },
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
    },
    {
      type: 'bar',
      name: '成交量',
      data: [],
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
    }


  ]
};

