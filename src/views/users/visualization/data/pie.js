// export default {
//   backgroundColor: '#404a59',
//   title: {
//     text: '志愿者年龄段分布',
//     x: 'center',
//     textStyle: {
//       color: '#fff'
//     }
//   },
//   tooltip: {
//     trigger: 'item',
//     formatter: '{a} <br/>{b} : {c} ({d}%)'
//   },
//   legend: {
//     orient: 'vertical',
//     left: 'left',
//     data: ['<18', '18-25', '26-35', '36-45', '>45'],
//     textStyle: {
//       color: '#fff'
//     }
//   },
//   series: [
//     {
//       name: '访问来源',
//       type: 'pie',
//       radius: '55%',
//       center: ['50%', '60%'],
//       data: [
//         { value: 335, name: '<18' },
//         { value: 310, name: '18-25' },
//         { value: 234, name: '26-35' },
//         { value: 135, name: '36-45' },
//         { value: 1548, name: '>45' }
//       ],
//       itemStyle: {
//         emphasis: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)'
//         }
//       }
//     }
//   ]
// }

export function getPieOption(data) {
  
  return {
    backgroundColor: '#404a59',
    title: {
      text: '用户年龄段分布',
      x: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      // data: ['<18', '18-25', '26-35', '36-45', '>45'],
      data: data.legendData,
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '年龄',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        // data: [
        //   { value: 335, name: '<18' },
        //   { value: 310, name: '18-25' },
        //   { value: 234, name: '26-35' },
        //   { value: 135, name: '36-45' },
        //   { value: 1548, name: '>45' }
        // ],
        data: data.seriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}