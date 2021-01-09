var xAxisData = [];
var data1 = [];
var data2 = [];
var data = []
data[0] = []
data[1] = []
for (var i = 0; i < 100; i++) {
  xAxisData.push('时间' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data[0].push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data[1].push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}
// var data = {
//   d1: data1,
//   d2: data2
// }

// export default {
//   backgroundColor: '#404a59',
//   title: {
//     text: '志愿者新增/注销人数',
//     x: 'center',
//     // top: 'bottom',
//     textStyle: {
//       color: '#fff'
//     }
//   },
//   legend: {
//     data: ['新增人数', '注销人数'],
//     // orient: 'vertical',
//     top: 'bottom',
//     left: 'left',
//     textStyle: {
//       color: '#fff'
//     }
//   },
//   toolbox: {
//     // y: 'bottom',
//     feature: {
//       magicType: {
//         type: ['stack', 'tiled']
//       },
//       dataView: {},
//       saveAsImage: {
//         pixelRatio: 2
//       }
//     }
//   },
//   tooltip: {},
//   xAxis: {
//     data: xAxisData,
//     splitLine: {
//       show: false
//     },
//     axisLine: { lineStyle: { color: '#dddddd' } }
//   },
//   yAxis: {
//     axisLine: { lineStyle: { color: '#dddddd' } }
//   },
//   series: [{
//     name: '新增人数',
//     type: 'bar',
//     data: data1,
//     animationDelay: function (idx) {
//       return idx * 10;
//     }
//   }, {
//     name: '注销人数',
//     type: 'bar',
//     data: data2,
//     animationDelay: function (idx) {
//       return idx * 10 + 100;
//     }
//   }],
//   animationEasing: 'elasticOut',
//   animationDelayUpdate: function (idx) {
//     return idx * 5;
//   }
// }

export function getBarOption(data) {
  return {
    backgroundColor: '#404a59',
    title: {
      text: '用户新增/注销人数',
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
      name: '注销人数',
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