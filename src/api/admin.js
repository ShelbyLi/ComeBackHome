import request from '@/utils/request'

// export function login(data) {
//   console.log('api hr')
//   return request({
//     url: '/admin/login',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  // console.log("login怎么又不行了");
  return request({
    url: '/background-management/admin/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/background-management/admin/register',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  console.log('到这里了 api/getinfo')
  return request({
    url: '/background-management/admin/info',
    method: 'get',
    data
  })
}

export function logout() {
  return request({
    url: '/background-management/admin/logout',
    method: 'get',
  })
}

export function changePwd(data) {
  return request({
    url: '/background-management/admin/pwd',
    method: 'post',
    data
  })
}

export function changePhoneNumber(data) {
  return request({
    url: '/background-management/admin/phone',
    method: 'delete',
    data
  })
}

export function cancellation(data) {
  return request({
    url: '/background-management/admin/cancellation',
    method: 'delete',
    data
  })
}

export function updateBasicInfo(data) {
  return request({
    url: '/background-management/admin/update-info',
    method: 'post',
    data
  })
}