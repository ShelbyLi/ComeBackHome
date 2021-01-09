import { addressCode2latlng } from './util/addressCode2latlng'
export function getMapOption(data) {
  data.seriesData = addressCode2latlng(data.seriesData)
  return {
    backgroundColor: '#404a59',
    title: {
      text: '全国走失事件分布',
      // subtext: 'data from PM25.in',
      // sublink: 'http://www.pm25.in',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x: 'right',
      // data: ['志愿者'],
      data: data.legendData,
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#111'
        },
        emphasis: {
          areaColor: '#2a333d'
        }
      },
      zoom: 1.2
    },
    series: [
      {
        name: data.legendData[0],
        // name: '志愿者',
        type: 'scatter',
        coordinateSystem: 'geo',
        // data: convertData(data),
        // data: convertData(data.seriesData),
        data: data.seriesData,
        // symbolSize: val => val[2] / 10,
        symbolSize: val => val[2], // TODO 暂时改大 不然我看不见..
        tooltip: {
          formatter: function (val) {
            return val.name + ': ' + val.value[2]
          }
        },
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        }
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        // data: convertData(data.sort((a, b) => b.value - a.value).slice(0, 6)),
        data: data.seriesData.sort((a, b) => b.value[2] - a.value[2]).slice(0, 5), // TOP5 为什么取6个?
        // symbolSize: val => val[2] / 10,
        symbolSize: val => val[2], // TODO 暂时改大too
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        tooltip: {
          formatter: function (val) {
            return val.name + ': ' + val.value[2]
          }
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
    ]
  }
}
