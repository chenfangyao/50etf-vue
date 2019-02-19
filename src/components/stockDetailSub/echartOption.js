import store from '@/vuex'
export const commonOption = {
 
  animation: false,
  itemStyle: { color: '#7fbe9e' },

}
export const optionK = {
  ...commonOption,
  tooltip: {
    trigger: 'axis',
    // triggerOn: 'mousemove',
    axisPointer: {
      type: 'cross',
      label: { show: false }

    },
    alwaysShowContent: false,
    formatter: function (params) {
      var str = ''
      if (params.length === 1) {
        return params[0].data[0] + '<br>' + '成交量：' + params[0].data[1]
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
      axisLine: { lineStyle: { color: '#aaa' } },
      // axisTick: { show: false },
      axisLabel: {
        splitNumber: 2,
        margin: 10,
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
    textStyle:{color:store.state.atNight?'#fff':'#333'}
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
      splitLine: { lineStyle: { color: store.state.atNight ? '#333' : '#eee' } },
      scale: true,
      // interval: 0.01,
      axisLabel: {
        margin: 5,
        color: store.state.atNight ? '#f0f0f0' : '#333'

      },
    },
    {
      scale: true,
      gridIndex: 1,
      axisLine: { show: false },
      max: 'dataMax',
      min: 'dataMin',
      axisLabel: {
        margin: -35,
        showMaxLabel: true,
        showMinLabel: false,
        // color: store.state.atNight ? '#fff' : '#999'
        color:'#fff'

      },
      axisTick: { show: false },
      splitLine: { show: false }
    }],
  grid: [
    {
      left: 40,
      right: 25,
      top: 30,
      bottom: 140,
    },
    {
      left: 40,
      right: 25,
      top: 254,
      bottom: 3
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
          color: '#ec605e',
          color0: '#3aba8f',
          borderColor: '#ec605e',
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
 tooltip: {
   trigger: 'axis',
  triggerOn: 'click',
  axisPointer: {
    type: 'cross',
    label: { show: false }
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
      axisLine: { show: false, lineStyle: { color: '#666' } },
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
        margin: 10,
        align: 'left',
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
  yAxis: [
    {
      axisLabel: {
        inside:true,
        margin:0,
        showMaxLabel: true,
        showMinLabel: true,
        color: store.state.atNight ? '#f0f0f0' : '#333'

      },
      splitNumber: 2,

      splitLine: { show: false, },
      axisLine: { show: false, lineStyle: { color: '#666' } },
      axisTick: { show: false },
      scale: true,
    },
    {
      scale: true,
      gridIndex: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      position:'right',
      axisLabel: {
        margin: -30,
        inside:true,

        showMaxLabel: true,
        showMinLabel: false,
      },
      max: 'dataMax',
      min: 'dataMin',
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
      left: 5,
      right: 45,
      top: 10,
      bottom: 140,
    },
    {
      left: 5,
      right: 45,
      top: 254,
      bottom: 5
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
              offset: 1, color: store.state.atNight ? '#0f131f' : '#fff'// 100% 处的颜色
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

