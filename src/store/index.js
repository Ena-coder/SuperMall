import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutaions'
import actions from './actions'
import getters from './getters'
// 1.安装vuex
Vue.use(Vuex)

// 2.创建vuex对象
const state = {
  cartList:[]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 3.挂载
export default store


