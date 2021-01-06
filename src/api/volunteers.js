import request from '@/utils/request'

export function getOptionData(type) {
  return request({
    url: '/background-management/volunteer/visualization/data',
    method: 'get',
    params: { type }
  })
}

export function fetchVolunteersList(query) {
  return request({
    url: '/background-management/volunteer/list',
    method: 'get',
    params: query
  })
}
export function pauseVolunteer(data) {
  return request({
    url: '/background-management/volunteer/pause',
    method: 'post',
    data
  })
}
export function deleteVolunteer(data) {
  return request({
    url: '/background-management/volunteer/remove',
    method: 'delete',
    data
  })
}
export function passVolunteerVerification(data) {
  return request({
    url: '/background-management/volunteer/pass',
    method: 'post',
    data
  }) 
}