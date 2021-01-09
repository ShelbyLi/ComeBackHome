// import { parseTime } from "@/utils"

// function getVirtulData(year) {
//   year = year || 2017;
//   // var date = +echarts.number.parseDate(year + '-01-01');
//   // var end = +echarts.number.parseDate((+year + 1) + '-01-01');
//   var date = (new Date(year-1, 1, 1)).getTime()
//   var end = (new Date(year+1, 1, 1)).getTime()
//   var dayTime = 3600 * 24 * 1000;
//   var data = [];
//   for (var time = date; time < end; time += dayTime) {
//       data.push([
//           // echarts.format.formatTime('yyyy-MM-dd', time),
//           parseTime(time),
//           Math.floor(Math.random() * 100)
//       ]);
//   }
//   console.log(data);
//   return data;
// }

function getMaxValue(array) {
  var temp = []
  for (var i = 0; i < array.length; i++) {
    temp.push(array[i][1])
  }
  var max = Math.max.apply(null, temp)

  max = Math.ceil(max / 10) * 10
  // console.log(max);
  return max
}

export function getHeatmapOption(data) {
  return {
    title: {
      top: 30,
      left: 'center',
      text: '归家行动启动数量 (次/天)',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: getMaxValue(data.seriesData),
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65,
      textStyle: {
        color: '#fff'
      }
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 22],
      range: data.calendarRange,
      itemStyle: {
        borderWidth: 0.5
      },
      monthLabel: {
        color: "#fff"
      },
      dayLabel: {
        color: "#fff"
      },
      yearLabel: {
        show: true,
        color: "#fff",
        margin: 8,
        position: "right",
        fontStyle: "normal",
        fontWeight: "lighter",
        fontSize: 15,
        verticalAlign: "top"
      },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: data.seriesData
    }
  }
}