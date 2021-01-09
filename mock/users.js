const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userId: '1339763166908776448',
    registrationTime: +Mock.Random.date('T'),
    name: '@cname',
    nickname: '@cname',
    phoneNumber: '12345678901',
    idNumber: '330481199911250041',
    livingAddressCode: '330105',
    livingAddressDetail: '@cword(7, 15)',
    headPortrait: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
    briefIntro: '@cword(10, 30)',
    missingEventsCnt: '@integer(0, 10)',
    cluesCnt: '@integer(0, 100)'
    // status: '@integer(0, 2)',
    // display_time: '@datetime',
    // image_uri,
    // platforms: ['a-platform']
  }))
}

var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
  xAxisData.push('时间' + i);
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
}

module.exports = [
  {
    url: '/background-management/user/list',
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
    url: '/background-management/user/remove',
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
    url: '/background-management/user/visualization/data',
    type: 'get',
    response: config => {
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

      // return {
      //   "code": 200,
      //   "msg": "操作成功",
      //   "data": {
      //     "legendData": ['新增人数', '注销人数'],
      //     "xAxisData": xAxisData,
      //     "seriesData": [data1, data2]
      //   }
      // }

      // return {
      //   "code": 200,
      //   "msg": "操作成功",
      //   "data": {
      //     "legendData": ['上报事件人数', '上报线索人数', '新增人数'],
      //     "yAxisData": ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //     "seriesData": [
      //       [320, 302, 301, 334, 390, 330, 320],
      //       [120, 132, 101, 134, 90, 230, 210],
      //       [220, 182, 191, 234, 290, 330, 310]
      //     ]
      //   }
      // }

      return {
        "code": 200,
        "msg": "操作成功",
        "data": {
          "legendData": ['用户'],
          "seriesData": [
            {name: '330481', value: 10},
            {name: '330301', value: 11},
            {name: '330201', value: 12},
            {name: '330101', value: 10},
            {name: '330501', value: 15},
          ]
        }
      }

    }
  },
]