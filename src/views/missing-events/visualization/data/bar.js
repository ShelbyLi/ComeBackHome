export function getBarOption(data) {
  return {
    backgroundColor: '#404a59',
    title: {
      text: '老人新增/找回人数',
      x: 'center',
      // top: 'bottom',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      data: data.legendData, // 1
      // orient: 'vertical',
      top: 'bottom',
      left: 'left',
      textStyle: {
        color: '#fff'
      }
    },
    toolbox: {
      // y: 'bottom',
      feature: {
        magicType: {
          type: ['stack', 'tiled']
        },
        dataView: {},
        saveAsImage: {
          pixelRatio: 2
        }
      }
    },
    tooltip: {},
    xAxis: {
      data: data.xAxisData, // 2
      splitLine: {
        show: false
      },
      axisLine: { lineStyle: { color: '#dddddd' } }
    },
    yAxis: {
      axisLine: { lineStyle: { color: '#dddddd' } }
    },
    series: [{
      // name: '新增人数',
      name: data.legendData[0],
      type: 'bar',
      // data: data1,
      data: data.seriesData[0], // 3
      // data: data[0],
      animationDelay: function (idx) {
        return idx * 10;
      }
    }, {
      name: data.legendData[1],
      // name: data.legendData[1], // TODO 这可以写个循环
      type: 'bar',
      data: data.seriesData[1],
      // data: data2,
      animationDelay: function (idx) {
        return idx * 10 + 100;
      }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5;
    }
  }
}