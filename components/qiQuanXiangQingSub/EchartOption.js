export const commonOption = {
  /*  tooltip: {
     trigger: 'axis',
     axisPointer: {
       type: 'cross'
     },
     position(pos, params, el, elRect, size) {
       const obj = {
         top: 60
       };
       obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
       return obj;
     },
   }, */
  animation: false,
  itemStyle: { color: '#7fbe9e' },

}
export const optionK = {
  ...commonOption,
  xAxis: [
    {
      data: [],
      boundaryGap: false,
      splitLine: { show: false, },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { interval: (i, val) => { return i < 3 }, margin: 15 },
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
      position: 'right',
      axisLine: { show: false },
      axisTick: { show: false },
      scale: true,
      splitNumber: 2,
      axisLabel: {
        inside: true, margin: 0,
        // showMaxLabel: true,
        // showMinLabel: true,
      },
    },
    {
      scale: true,
      gridIndex: 1,
      // axisLabel: { },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }],
  grid: [
    {
      left: 5,
      right: 5,
      top: 30,
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
export const option1k = {
  ...optionK,
  dataZoom: [{
    type: 'inside',
    start: 85,
    end: 100,
    xAxisIndex: [0, 1],
    zoomLock: true,
    throttle: 0
  },],
}
export const option5k = {}
export const optionRk = {}
export const option = {
  ...commonOption,
  xAxis: [
    {
      data: [],
      boundaryGap: false,
      splitLine: { show: false, },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { interval: (i, val) => { return (i == 3 || val == '11:30' || val == '15:00') }, margin: 15 },
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
      axisLabel: {
        inside: true, margin: 0,
        showMaxLabel: true,
        showMinLabel: true,
      },
      splitLine: { show: false, },
      axisLine: { show: false, lineStyle: { color: '#666' } },
      axisTick: { show: false },
      scale: true,
      interval: 0.0001,
    },
    {
      scale: true,
      gridIndex: 1,
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
      right: 50,
      top: 10,
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

