import { createStore } from "vuex";
import usersAPI from "../apis/users"

const store = createStore({
  state: {
    currentUser: { },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser, //將api取得的 currentUser 覆蓋
        ...currentUser
      },
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, email, image, isAdmin, isDistance } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin,
          isDistance
        })
        return true
      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
        return false
      }
    }
  },
  getters: {
    currentUser: (state) => state.currentUser,
    isAuthenticated: (state) => state.isAuthenticated
  },
});

export default store;
