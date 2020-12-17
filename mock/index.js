const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')
const Mock = require('mockjs')

// 读取json文件
function getJsonFile (filepath) {
  var json = fs.readFileSync(path.resolve(__dirname, filepath), 'utf-8') // 读取json文件
  return JSON5.parse(json) // 解析并返回
}
// var json = getJsonFile('.userinfo.json5')
// console.log('json', json)

module.exports = function (app) { // 访问app对象
  app.post('/user/userinfo', function (req, res) { // 监听user/userinfo的路由
    var json = getJsonFile('./userinfo.json5')
    res.json(Mock.mock(json)) // 对读取的json5中的规则产生一个随机的数据
  })
  app.post('/admin/login', function (req, res) { // 监听user/userinfo的路由
    var json = getJsonFile('./admin/login.json5')
    res.json(Mock.mock(json)) // 对读取的json5中的规则产生一个随机的数据
  })
}

// module.exports = function (app) { // 访问app对象
//   app.post('login', function (req, res) { // 监听user/userinfo的路由
//     var json = getJsonFile('./userinfo.json5')
//     res.json(Mock.mock(json)) // 对读取的json5中的规则产生一个随机的数据
//   })
// }
// 要在里面加
