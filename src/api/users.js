import request from '@/utils/request'

export function fetchUsersList(query) {
  return request({
    url: '/background-management/user/list', // 比如这里users不加s我觉得怪怪的
    method: 'get',
    params: query
  })
}

export function deleteUser(data) {
  return request({
    url: '/background-management/user/remove',
    method: 'delete',
    data
  })
}

export function getOptionData(type) {
  return request({
    url: '/background-management/user/visualization/data',
    method: 'get',
    params: { type }
  })
}