import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
//持久化  
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    components: [],
  },
  getters: {
    components: (state) => state.components,
  },
  mutations: {
    setComponents(state, components) {
      state.components = components;
    },
  },
  actions: {
    setComponents({ commit }, components) {
      commit("setComponents", components);
    },
  },
});

export default store;
