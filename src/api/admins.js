import request from '@/utils/request'

export function fetchAdminsList(query) {
  return request({
    url: '/background-management/admin/list', // 比如这里users不加s我觉得怪怪的
    method: 'get',
    params: query
  })
}

export function deleteAdmin(data) {
  return request({
    url: '/background-management/admin/remove',
    method: 'delete',
    data
  })
}