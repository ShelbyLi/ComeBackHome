function getMaxValue(seriesData) {
  var maxes = []
  for (var i = 0; i < seriesData.length; i++) {
    maxes.push(Math.max.apply(null, seriesData[i]))
  }
  var max =  Math.max.apply(null, maxes)
  max = Math.ceil(max / 10) * 10
  return max
}

export function getLineOption(data) {
  return {
    title: {
      text: '线索上报&事件上报数量',
      left: 'center',
      align: 'right',
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      bottom: 80
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    legend: {
      // data: ['线索上报数量', '事件上报数量'],
      data: data.legendData,
      left: 10,
      textStyle: {
        color: '#fff'
      }
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 65,
        end: 85
      },
      {
        type: 'inside',
        realtime: true,
        start: 65,
        end: 85
      }
    ],
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: false },
        data: data.xAxisData,
        axisLine: { lineStyle: { color: '#dddddd' } }
      }
    ],
    yAxis: [
      {
        // name: '流量(m^3/s)',
        type: 'value',
        // max: 500,
        max: getMaxValue(data.seriesData),
        axisLine: { lineStyle: { color: '#dddddd' } }
      },
      {
        // name: '降雨量(mm)',
        nameLocation: 'start',
        max: 5,
        type: 'value',
        inverse: true
      }
    ],
    series: [
      {
        // name: '流量',
        name: data.legendData[0],
        type: 'line',
        animation: false,
        areaStyle: {},
        lineStyle: {
          width: 1
        },
        // markArea: {
        //   silent: true,
        //   data: [[{
        //     xAxis: '2009/9/12\n7:00'
        //   }, {
        //     xAxis: '2009/9/22\n7:00'
        //   }]]
        // },
        data: data.seriesData[0]
      },
      {
        // name: '降雨量',
        name: data.legendData[1],
        type: 'line',
        yAxisIndex: 1,
        animation: false,
        areaStyle: {},
        lineStyle: {
          width: 1
        },
        // markArea: {
        //   silent: true,
        //   data: [
        //     [{
        //       xAxis: '2009/9/10\n7:00'
        //     }, {
        //       xAxis: '2009/9/20\n7:00'
        //     }]
        //   ]
        // },
        data: data.seriesData[1]
      }
    ]
  };

}