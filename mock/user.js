
// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   },
//   me: {
//     token: 'me-token'
//   }
// }

// const users = {
//   'admin-token': {
//     roles: ['admin'],
//     introduction: 'I am a super administrator',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Super Admin'
//   },
//   'editor-token': {
//     roles: ['editor'],
//     introduction: 'I am an editor',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Normal Editor'
//   },
//   '12345678901': {
//     roles: ['me'],
//     introduction: 'me',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'me'
//   }
// }

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    // response: config => {
    //   console.log(config.body)
    //   const { username } = config.body
    //   const token = tokens[username]
    //   // const token = 'admin-token'

    //   // mock error
    //   if (!token) {
    //     return {
    //       code: 60204,
    //       message: 'Account and password are incorrect.'
    //     }
    //   }
    //   console.log('返回20000中 hr')
    //   return {
    //     code: 20000,
    //     data: token
    //   }
    response: {
        "code": 200,
        "msg": "操作成功",
        "data": {
            "phoneNumber": "325436",
            "name": "小朱",
            "nickname": null,
            "userId": 1086324736
        }
    }
  },

  // get user info
  {
    url: '/admin/info\.*',
    type: 'get',
    // response: config => {
    //   const { token } = config.query
    //   const info = users[token]

    //   // mock error
    //   if (!info) {
    //     return {
    //       code: 50008,
    //       message: 'Login failed, unable to get user details.'
    //     }
    //   }

    //   return {
    //     code: 20000,
    //     data: info
    //   }
    // }
    response: {
      "code": 200,
      "msg": "操作成功",
      "data": {
          "phoneNumber": "325436",
          "name": "小朱",
          "nickname": null,
          "userId": 1086324736
      }
    }
  },

// get user info
{
  url: '/user/info\.*',
  type: 'get',
  response: {
    "code": 200,
    "msg": "操作成功",
    "data": {
        "phoneNumber": "325436",
        "name": "小朱",
        "nickname": null,
        "userId": 1086324736
    }
  }
},

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
