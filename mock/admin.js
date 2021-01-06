module.exports = [
  {
    url: '/background-management/admin/login',
    type: 'post',
    response: {
      "code": 200,
      "msg": "操作成功",
      "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzM5NTU5MjY1NTM0MjE0MTQ0IiwiaWF0IjoxNjA4MjU5ODIwLCJleHAiOjE2MDg4NjQ2MjB9.65OhcYL9tSGesuvja52xnPjvjtiWFt-eLyT4J4deGlgFpRDwvVdsWVDR-WhvtIO-fyLkKRie4vbH7V50zorZ0g"
      }
    }
  },
  {
    url: '/background-management/admin/register',
    type: 'post',
    response: {
      "code": 200,
      "msg": "操作成功",
      "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzM5NTU5MjY1NTM0MjE0MTQ0IiwiaWF0IjoxNjA4MjU5ODIwLCJleHAiOjE2MDg4NjQ2MjB9.65OhcYL9tSGesuvja52xnPjvjtiWFt-eLyT4J4deGlgFpRDwvVdsWVDR-WhvtIO-fyLkKRie4vbH7V50zorZ0g"
      }
    }
  },
  {
    url: '/background-management/admin/info',
    type: 'get',
    response: {
      "code": 200,
      "msg": "操作成功",
      "data": {
        "phoneNumber": "19858111661",
        "name": "hcy",
        "nickname": "hh",
        "headPortrait": "",
        "roles": ['root'],
        "briefInfo": "我喜欢hh"
      }
    }
  },
  {
    url: '/background-management/admin/logout',
    type: 'get',
    response: {
      "code": 200,
      "msg": "操作成功",
      "data": null
    }
  }
]