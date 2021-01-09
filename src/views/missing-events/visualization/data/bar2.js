export function getBar2Option(data) {
  return {
    backgroundColor: '#404a59',
    title: {
      text: '归家行动情况',
      x: 'center',
      // top: 'bottom',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: data.legendData,
      // orient: 'vertical',
      top: 'bottom',
      left: 'left',
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '7%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#dddddd' } }
    },
    yAxis: {
      type: 'category',
      data: data.yAxisData,
      // nameTextStyle: {
      //   color: '#fff'
      // }
      axisLine: { lineStyle: { color: '#dddddd' } }
    },
    series: [
      {
        name: data.legendData[0],
        // name: '上报事件人数',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: data.seriesData[0]
        // data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: data.legendData[1],
        // name: '上报线索人数',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: data.seriesData[1]
        // data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: data.legendData[2],
        // name: '新增人数',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideRight'
        },
        data: data.seriesData[2]
        // data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  }
}