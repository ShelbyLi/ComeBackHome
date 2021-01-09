import request from '@/utils/request'

export function fetchEventsList(query) {
  return request({
    url: '/background-management/missing-event/list',
    method: 'get',
    params: query
  })
}

export function fetchEventDetail(id) {
  return request({ 
    url: '/background-management/missing-event/detail',
    method: 'get',
    params: { id }
  })
}

export function createEvent(data) {
  return request({
    url: '/background-management/missing-event/create',
    method: 'post',
    data
  })
}

export function updateEvent(data) {
  return request({
    url: '/background-management/missing-event/update',
    method: 'post',
    data
  })
}

export function deleteEvent(data) {
  return request({
    url: '/background-management/missing-event/remove',
    method: 'delete',
    data
  })
}

export function startTask(data) {
  return request({
    url: '/background-management/missing-event/start-task',
    method: 'post',
    data
  })
}

// 线索
export function fetchClues(query) {
  return request({
    url: '/background-management/missing-event/clue/list',
    method: 'get',
    params: query
  })
}

export function deleteClue(data) {
  return request({
    url: '/background-management/missing-event/clue/remove',
    method: 'post',
    data
  })
}

export function updateClueLevel(data) {
  return request({
    url: '/background-management/missing-event/clue/update',
    method: 'post',
    data
  })
}

export function getOptionData(type) {
  return request({
    url: '/background-management/missing-event/visualization/data',
    method: 'get',
    params: { type }
  })
}