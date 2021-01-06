import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance; 创建axios示例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url; api的base_url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout; 请求超时时间
})

// request interceptor; request拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log('request? hr')
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    // console.log('after request? hr')
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    // console.log('error? hr')
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// response拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  response => {
    const res = response.data
    console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    // 登录不是返回200
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('登录信息已过期, 你可以停留在这个页面或者重新登录', 'Confirm logout', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      console.log('请求返回200');
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    
    return Promise.reject(error)
  }
)

export default service

// **************************************
// https://juejin.cn/post/6844903476661583880#heading-2
// import request from '@/utils/request'

// //使用
// export function getInfo(params) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params
//   });
// }
