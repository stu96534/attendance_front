import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  getUsers() {
    return apiHelper.get(`/admin/users`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  unlockUser({ userId }: { userId: number }) {
    return apiHelper.put(`/admin/users/${userId}/unlock`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  addUser({ name, email }: { name: string; email: string }) {
    return apiHelper.post(`/admin/users`,  {
      name, 
      email,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};
