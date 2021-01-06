import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import admin from './modules/admin'

Vue.use(Vuex) // 挂载vuex

const store = new Vuex.Store({ // 创建vuex对象
  modules: {
    app,
    settings,
    user, // 存放的键值对就是要管理的状态
    admin
  },
  getters
})

export default store
