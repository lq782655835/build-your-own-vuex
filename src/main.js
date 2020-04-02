import Vue from 'vue'
import App from './App.vue'
import Vuex from './vuex'
Vue.use(Vuex)


let store = new Vuex.Store({
  state: {
      count: 0
  },
  actions: {
      countPlusSix(context) {
          context.commit('plusSix');
      }
  },
  mutations: {
      incrementFive(state) {
          state.count = state.count + 5;
      },
      plusSix(state) {
          state.count = state.count + 6;
      }
  },
  getters: {
      getStatePlusOne(state) {
          return state.count + 1
      }
  }

});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
