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
      // type:'time',
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false, },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { interval: (i, val) => { return (i == 3 || val == '11:30' || val == '15:00') } },
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

  itemStyle: { color: '#7fbe9e' },

}
export var optionK = {
  ...commonOption,
  legend: {
    data: ['MA5', 'MA10', 'MA20', 'MA30']
  },
  visualMap: {
    show: false,
    seriesIndex: 5,
    dimension: 2,
    pieces: [{
      value: 1,
      color: '#ec0000'
    }, {
      value: -1,
      color: '#32a632'
    }]
  },
  yAxis: [
    {
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      min: 'dataMin',
      max: 'dataMax',
    },
    {
      scale: true,
      gridIndex: 1,
      // axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }],
  grid: [
    {
      left: 5,
      right: 5,
      top: 10,
      bottom: 100,
    },
    {
      left: 5,
      right: 5,
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
        normal: { width: 1 }
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
        normal: { width: 1 }
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
        normal: { width: 1 }
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
        normal: { width: 1 }
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
  yAxis: [
    {
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      interval: 0.0001,

    },
    {
      scale: true,
      gridIndex: 1,
      // axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }],
  visualMap: {
    show: false,
    seriesIndex: 1,
    dimension: 2,
    pieces: [{
      value: 1,
      color: '#ec0000'
    }, {
      value: -1,
      color: '#32a632'
    }]
  },
  grid: [
    {
      left: 3,
      right: 13,
      top: 0,
      bottom: 80,
    },
    {
      left: 3,
      right: 3,
      top: 218,
      bottom: 0
    },
  ],
  itemStyle: { color: '#4AB9BB' },
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
        normal: { opacity: 1, width: 1 }
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
            offset: 0, color: '#4AB9BB' // 0% 处的颜色
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

