import store from '@/vuex'
export const commonOption = {
  
  animation: false,
  itemStyle: { color: '#7fbe9e' },

}
export const optionK = {
  tooltip: {
    trigger: 'axis',
    // triggerOn: 'mousemove',
    axisPointer: {
      type: 'cross'
    },
    alwaysShowContent: false,
    /* position(pos, params, el, elRect, size) {
      const obj = {
        top: 60
      };
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      return obj;
    }, */
    formatter: function (params) {
      var str = ''
      if (params.length===1){
        return params[0].data[0] + '<br>'+ '成交量：' + params[0].data[1]
      }
      for (let i = 1; i < params.length; i++) {
        str += params[i].marker + params[i].seriesName + ' : ' + params[i].value + '<br>'
      }
      return '开:' + params[0].data[1] + '<br>' +
        '高:' + params[0].data[4] + '<br>' +
        '收:' + params[0].data[2] + '<br>' +
        '低:' + params[0].data[3] + '<br>' + str
    }
  },
  xAxis: [
    {
      data: [],
      boundaryGap: false,
      splitLine: { show: false, },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        interval: (i, val) => {
          switch (val) {
            case '09:30':
            case '11:30':
            case '15:00':
              return true
          }
        },
        margin: 15, align: 'left',
        color: store.state.atNight ? '#f0f0f0' : '#333'

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
    data: ['MA5', 'MA10', 'MA20', 'MA30'],
    textStyle: { color: store.state.atNight ? '#fff' : '#333' }

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
  animation: false,
  yAxis: [
    {
      position: 'right',
      axisLine: { show: false },
      axisTick: { show: false },
      scale: true,
      splitLine: { lineStyle: { color: store.state.atNight ? '#333' : '#eee' } },

      splitNumber: 2,
      axisLabel: {
        margin: 3,
        color: store.state.atNight ? '#f0f0f0' : '#333'

        // showMaxLabel: true,
        // showMinLabel: true,
      },
    },
    {
      scale: true,
      gridIndex: 1,
      position: 'right',

      axisLabel: {
        margin: -15,
        showMaxLabel: true,
        showMinLabel: false,
      },
      max: 'dataMax',
      min: 'dataMin',

      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }],
  grid: [
    {
      left: 5,
      right: 45,
      top: 30,
      bottom: 130,
    },
    {
      left: 5,
      right: 45,
      top: 244,
      bottom: 3
    },
  ],
  title: {
    text: '',
    left: 0
  },
  series: [
    {
      name: 'K线',
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
export const option1k = {
  ...optionK,
  xAxis: [
    {
      data: [],
      boundaryGap: false,
      splitLine: { show: false, },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        interval: 11,
        margin: 15, align: 'left'
      },
    },
    {
      gridIndex: 1,
      data: [],
      boundaryGap: false,
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },

    }],

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
export const optionRk = {
  ...optionK,
  xAxis: [
    {
      data: [],
      boundaryGap: false,
      splitLine: { show: false, },
      axisLine: { show: false },
      axisLabel: {
        margin: 15,
        interval: 'auto',
        formatter: (val, i) => {
          if (val == 'undefined') { return '' } else { return val }
        },
        align: 'left'
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
}
export const option = {
  tooltip: {
    trigger: 'axis',
    // triggerOn: 'mousemove',
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
  xAxis: [
    {
      data: [],
      boundaryGap: false,
      splitLine: { show: false, },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { interval: (i, val) => { return (i == 0 || val == '11:30' || val == '15:00') }, margin: 15, align: 'left' },
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
      max: 'dataMax',
      min: 'dataMin',
      position: 'right',
      axisLabel: {
        margin: 0,
        showMaxLabel: true,
        showMinLabel: false,
      },
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
      bottom: 100,
    },
    {
      left: 3,
      right: 50,
      top: 228,
      bottom: 3
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
              offset: 1, color: store.state.atNight ?'#0f131f':'#fff' // 100% 处的颜色
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

