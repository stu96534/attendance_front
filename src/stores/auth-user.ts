import { ref, computed } from "vue";
import { defineStore } from "pinia";
import usersAPI from "../apis/users"


export const useAuthUserStore = defineStore("auth/user", () => {
  const currentUser = ref({} as any);
  const isAuthenticated = ref(false);

  function setCurrentUser(User: object) {
    currentUser.value = {
      ...User
    }

    isAuthenticated.value = true
  }

  const revokeAuthentication = () => {
    currentUser.value = {}
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }

  const fetchCurrentUser =  async () => {
    try {
      const { data } = await usersAPI.getCurrentUser()
      const { id, name, email, image, isAdmin } = data

      setCurrentUser({
        id,
        name,
        email,
        image,
        isAdmin
      })

      return true
    } catch (error) {
      console.log('error', error)
      console.error('can not fetch user information')
      return false
    }
  }

  return { currentUser, isAuthenticated, setCurrentUser, revokeAuthentication, fetchCurrentUser };
});
