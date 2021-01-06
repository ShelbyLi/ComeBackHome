const Mock = require('mockjs')

const List = []
const count = 100

const ListClues = []

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    eventId: '1339763166908776448',
    createdTime: +Mock.Random.date('T'),
    createdPerson: '@cname',
    name: '@cname',
    missingTime: +Mock.Random.date('T'),
    missingAddressCode: '330481',
    missingAddressDetail: '@cword(7, 15)',
    importance: '@integer(1, 3)',
    status: '@integer(0, 2)',
    // 'status|1': ['todo', 'done', 'waiting'],
    type: '@integer(0, 2)',
    canStart: '@boolean',
    emergencyContact1: '@cname',
    phoneNumber1: '12345678901',
    idNumber: '330481199911250041',
    livingAddressCode: '330105',
    livingAddressDetail: '@cword(7, 15)',
    height: '@integer(120, 190)',
    weight: '@integer(30, 100)  '
    // 'type|1': ['doing', 'cannotDo', 'canDo']
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft'],
    // display_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // image_uri,
    // platforms: ['a-platform']
  }))
}

for (let i = 0; i < count; i++) {
  ListClues.push(Mock.mock({
    clueId: '1339763166908776448',
    uploadTime: +Mock.Random.date('T'),
    uploadPerson: '@cname',
    foundAddressCode: '330481',
    foundAddressDetail: '@cword(7, 15)',
    level: '@integer(1, 3)',
    description: '@cword(10, 30)',
    clueImgs: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'],
    // edit: false
  }))
}

module.exports = [
  {
    url: '/background-management/missing-event/list',
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
    url: '/background-management/missing-event/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/background-management/missing-event/create',
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
    url: '/background-management/missing-event/update',
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
    url: '/background-management/missing-event/remove',
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
    url: '/background-management/missing-event/start-task',
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
    url: '/background-management/missing-event/clue/list',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          total: ListClues.length,
          records: ListClues
        },
        message: 'sss'
      }
    }
  },
  {
    url: '/background-management/missing-event/clue/remove',
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
    url: '/background-management/missing-event/clue/update',
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