export const commonOption = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    axisPointer: {
      type: 'cross'
    },
    alwaysShowContent: false,
    position(pos, params, el, elRect, size) {
      const obj = {
        top: 60
      };
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      return obj;
    },
  },
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
      axisLine: { lineStyle:{color:'#aaa'} },
      // axisTick: { show: false },
      axisLabel: {
        splitNumber: 2, align: 'left',
      },
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
      color: '#f05f5c'
    }, {
      value: -1,
      color: '#3aba8f'
    }]
  },

  yAxis: [
    {
      axisLine: { show: false, },
      axisTick: { show: false },
      splitLine:{lineStyle:{color:'#eee'}},
      scale: true,
      // interval: 0.01,
      axisLabel: {
        margin: 0,
        color:'#999',
        inside: true,
      },
    },
    {
      scale: true,
      gridIndex: 1,
      axisLine: { show: false },
      axisLabel: {
        margin: 0,
        showMaxLabel: true,
        showMinLabel: false, show: false
      },
      axisTick: { show: false },
      splitLine: { show: false }
    }],
  grid: [
    {
      left: 5,
      right: 5,
      top: 30,
      bottom: 130,
    },
    {
      left: 5,
      right: 5,
      top: 234,
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
          color: '#f05f5c',
          color0: '#3aba8f',
          borderColor: '#f05f5c',
          borderColor0: '#3aba8f'
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
export const option1k = {}
export const option5k = {}
export const optionRk = {}
export const option = {
  ...commonOption,
  xAxis: [
    {
      data: [],
      boundaryGap: false,
      splitLine: { show: false, },
      axisLine: { show: false,lineStyle: { color: '#666' } },
      // axisTick: { show: false },
      axisLabel: { 
        interval: (i, val) => {
          switch (val) {
            case '09:30':
            case '11:30':
            case '15:00':
              return true
          }
        },
        margin: 5 ,
       align:'left',
      },
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
      splitNumber: 2,

      splitLine: { show: false, },
      axisLine: { show: false, lineStyle: { color: '#666' } },
      axisTick: { show: false },
      scale: true,
      interval: 10000,
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
      color: '#f05f5c'
    }, {
      value: -1,
      color: '#3aba8f'
    }]
  },
  grid: [
    {
      left: 3,
      right: 50,
      top: 10,
      bottom: 130,
    },
    {
      left: 3,
      right: 3,
      top: 234,
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
        normal: { opacity: 1, width: 1 },
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

