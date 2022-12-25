import { createStore } from "vuex";
import usersAPI from "../apis/users"

const store = createStore({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser, //將api取得的 currentUser 覆蓋
        ...currentUser
      },
      state.isAuthenticated = true
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getUser()
        const { email } = data

        commit('setCurrentUser', {
          email
        })
      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
      }
    }
  },
  getters: {
    currentUser: (state) => state.currentUser,
    isAuthenticated: (state) => state.isAuthenticated
  },
});

export default store;
