import { login, register, getInfo, logout } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    phoneNumber: '',
    nickname: '',
    role: [],
    // password: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PHONE_NUMBER: (state, phoneNumber) => {
    state.phoneNumber = phoneNumber
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_BRIEF_INFO: (state, briefInfo) => {
    state.briefInfo = briefInfo
  },
  // SET_PASSWORD: (state, password) => {
  //   state.password = password
  // }
  // SET_HEAD_PORTRAIT: (state, avatar) => {
  //   state.avatar = avatar
  // }
}

const actions = {

  login ({ commit }, userInfo) {
    const { phoneNumber, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log('hr')
      login({ phoneNumber: phoneNumber, password: password }).then(response => {
        const { data } = response
        // console.log(data)
        commit('SET_TOKEN', data.token) // 修改登录状态 存令牌
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  register ({ commit }, userInfo) {
    const { name, phoneNumber, idNumber, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log('hr')
      register({ name: name, phoneNumber: phoneNumber, idNumber: idNumber, password: password }).then(response => { // api的register
        const { data } = response
        // console.log(data)
        commit('SET_TOKEN', data.token) // 修改登录状态 存令牌
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('账号验证信息失效, 请重新登录')
        }

        // roles must be a non-empty array
        console.log('roles:' + data.roles)
        if (!data.roles || data.roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        // const { name, avatar } = data

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        console.log(data.briefInfo)
        commit('SET_NAME', data.name)
        commit('SET_PHONE_NUMBER', data.phoneNumber)
        commit('SET_NICKNAME', data.nickname)
        commit('SET_AVATAR', data.headPortrait)
        commit('SET_ROLES', data.roles)
        commit('SET_BRIEF_INFO', data.briefInfo)
        // commit('SET_PASSWORD', data.password)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
