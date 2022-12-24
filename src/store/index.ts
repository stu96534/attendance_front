import { createStore } from "vuex";

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
  getters: {
    currentUser: (state) => state.currentUser,
    isAuthenticated: (state) => state.isAuthenticated
  },
});

export default store;
