var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push('时间' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}

const Mock = require('mockjs')
const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    volunteerId: '1339763166908776448',
    name: '@cname',
    applicationTime: +Mock.Random.date('T'),
    volunteerCount: '@integer(0, 50)',
    volunteerDuration: '@integer(0, 1000)',
    isPass: '@integer(0, 1)',
    isPause: '@integer(0, 1)',
    examinerName: '@cname',
    phoneNumber: '12345678901',
    idNumber: '330481199911250041',
    livingAddressCode: '330105',
    livingAddressDetail: '@cword(7, 15)',
    briefIntro: '@cword(10, 20)',
    headPortrait: '',
    applicationReasons: '@cword(20, 50)',
    certificateImgs: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg']
  }))
}



module.exports = [
  {
    url: '/background-management/volunteer/visualization/data',
    type: 'get',
    // response: config => {
    //   console.log(config);
    //   const { type } = config.data
    //   const token = tokens[username]
    //   if (type === 'pie') {
    //     return {
    //       "code": 200,
    //       "msg": "操作成功",
    //       "data": {
    //         "legendData": ['<18', '18-25', '26-35', '36-45', '>45'],
    //         "seriesData": [
    //           { value: 335, name: '<18' },
    //           { value: 310, name: '18-25' },
    //           { value: 234, name: '26-35' },
    //           { value: 135, name: '36-45' },
    //           { value: 1548, name: '>45' }
    //         ],
    //       }
    //     }
    //   } else if (type === 'bar') {
    //     var xAxisData = [];
    //     var data1 = [];
    //     var data2 = [];
    //     for (var i = 0; i < 100; i++) {
    //       xAxisData.push('时间' + i);
    //       data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    //       data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    //     }
    //     return {
    //       "code": 200,
    //       "msg": "操作成功",
    //       "data": {
    //         "legendData": ['新增人数', '注销人数'],
    //         "xAxisData": xAxisData,
    //         "seriesData": [
    //           data1, data2s
    //         ],
    //       }
    //     }
    //   } else {
    //     return {
    //       "code": 400,
    //       "msg": "没进if",
    //       "data": {
    //       }
    //     }
    //   }
    // }
    response: config => {
      // console.log('看不到config');
      // console.log(config.query.type); // 算了
      // return {
      //   "code": 200,
      //   "msg": "操作成功",
      //   "data": {
      //     "legendData": ['<18', '18-25', '26-35', '36-45', '>45'],
      //     "seriesData": [
      //       { value: 335, name: '<18' },
      //       { value: 310, name: '18-25' },
      //       { value: 234, name: '26-35' },
      //       { value: 135, name: '36-45' },
      //       { value: 1548, name: '>45' }
      //     ],
      //   }
      // }

      return {
        "code": 200,
        "msg": "操作成功",
        "data": {
          "legendData": ['新增人数', '注销人数'],
          "xAxisData": xAxisData,
          "seriesData": [data1, data2]
        }
      }

      // return {
      //   "code": 200,
      //   "msg": "操作成功",
      //   "data": {
      //     "legendData": ['参与行动人数', '活跃人数(未参与行动)', '新增人数'],
      //     "yAxisData": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //     "seriesData": [
      //       [320, 302, 301, 334, 390, 330, 320],
      //       [120, 132, 101, 134, 90, 230, 210],
      //       [220, 182, 191, 234, 290, 330, 310]
      //     ]
      //   }
      // }

      // return {
      //   "code": 200,
      //   "msg": "操作成功",
      //   "data": {
      //     "legendData": ['志愿者'],
      //     "seriesData": [
      //       {name: '330481', value: 10},
      //       {name: '330301', value: 11},
      //       {name: '330201', value: 12},
      //       {name: '330101', value: 10},
      //       {name: '330501', value: 15},
      //       // { name: '海门', value: [121.15, 31.89, 9] },
      //       // { name: '鄂尔多斯', value: [109.781327, 39.608266, 12] },
      //       // { name: '招远', value: [120.38, 37.35, 12] },
      //       // { name: '舟山', value: [122.207216, 29.985295, 12] },
      //       // { name: '齐齐哈尔', value: [123.97, 47.33, 14] },
      //       // { name: '盐城', value: [120.13, 33.38, 15] }
      //       // { name: '海门', value: 9 },
      //       // { name: '鄂尔多斯', value: 12 },
      //       // { name: '招远', value: 12 },
      //       // { name: '舟山', value: 12 },
      //       // { name: '齐齐哈尔', value: 14 },
      //       // { name: '盐城', value: 15 },
      //       // { name: '赤峰', value: 16 },
      //     ]
      //   }
      // }

    }
  },
  {
    url: '/background-management/volunteer/list',
    type: 'get',
    response: config => {
      const { importance, type, page = 1, limit = 20, sort } = config.query // 加载的需要完成的条件

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false // 传进来了type 并且不等于这个type
        // if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 200,
        data: {
          total: mockList.length,
          records: pageList
        }
      }
    }
  },
  {
    url: '/background-management/volunteer/pause',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success',
        message: 'sss'
      }
    }
  },
  {
    url: '/background-management/volunteer/remove',
    type: 'delete',
    response: _ => {
      return {
        code: 200,
        data: 'success',
        message: 'sss'
      }
    }
  },
  {
    url: '/background-management/volunteer/pass',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success',
        message: 'sss'
      }
    }
  },
]