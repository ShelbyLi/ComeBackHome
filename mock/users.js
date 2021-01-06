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
]